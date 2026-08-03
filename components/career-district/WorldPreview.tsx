"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import DistrictShell from "./DistrictShell";
import { DISTRICT_ROOMS, getRoom, type DistrictRoomId } from "./district-space";
import { CAREER_CATEGORY_ORDER, type CareerCategory } from "@/lib/career-categories";
import DistrictScene from "./DistrictScene";
import { createWalkState } from "@/components/world-controls/easy-walk";
import CityStreet from "@/components/lobby/CityStreet";
import { daylightAt } from "@/components/lobby/daylight";
import { RIVER_Z0 } from "@/components/lobby/world";

/** Bàn đo cảnh 3D: chọn phòng, đọc chi phí thật.
 *
 *  Ba thứ trang này phải làm được mà `/pho-nghe` không làm được:
 *
 *  1. Vào được khi chưa đăng nhập - để soát bố cục mà không phải gõ mật khẩu.
 *  2. Chạy `frameloop="always"` vô điều kiện. Cảnh thật dừng vẽ khi tab bị ẩn
 *     (đúng đắn, tiết kiệm pin), nhưng khung xem của công cụ LUÔN báo là ẩn,
 *     nên qua đường đó không đo được gì cả.
 *  3. Đọc gl.info thật thay vì đếm thẻ <mesh> trong mã nguồn. Một component
 *     dùng sáu lần chỉ đếm một lần trong mã - con số đó nói dối.
 *
 *  Dữ liệu là dữ liệu giả cố định. Trang này để nhìn HÌNH HỌC; nội dung thật
 *  đã có test riêng và không cần một trình duyệt để kiểm. */

/** Đọc chi phí khung hình.
 *
 *  `gl.info.autoReset` mặc định là true, tức bộ đếm bị xoá TRƯỚC mỗi khung
 *  hình, nên đọc lúc nào cũng ra 0. Bản đầu của trang đo in đúng
 *  "draw calls: 0" và suýt được ghi lại thành kết luận. Phải tự tắt autoReset
 *  rồi tự reset SAU khi đọc. */
function Meter({ onRead }: { onRead: (line: string) => void }) {
  const { gl } = useThree();

  useEffect(() => {
    // Sửa thẳng vào đối tượng của three.js là ĐÚNG việc của effect: đồng bộ
    // một hệ thống bên ngoài React với trạng thái của React. react-hooks/
    // immutability không phân biệt được nó với việc sửa một giá trị của React,
    // nên phải nói ra ở đây.
    // eslint-disable-next-line react-hooks/immutability -- gl.info là đối tượng của three.js, không phải trạng thái React
    gl.info.autoReset = false;
    return () => {
      gl.info.autoReset = true;
    };
  }, [gl]);

  useFrame(() => {
    const r = gl.info.render;
    if (r.calls > 0) {
      onRead(
        `draw call: ${r.calls} · tam giác: ${r.triangles.toLocaleString("vi-VN")}` +
          ` · geometry: ${gl.info.memory.geometries} · texture: ${gl.info.memory.textures}`
      );
    }
    gl.info.reset();
  });

  return null;
}

/** Đặt máy quay nhìn RA phía sông.
 *
 *  `<Canvas camera={…}>` chỉ nhận vị trí, còn hướng nhìn thì luôn là gốc toạ
 *  độ - tức là luôn nhìn vào thư viện. Với cảnh trong phòng thì đúng, nhưng bờ
 *  sông nằm cách gốc hơn 150 m nên nó rơi khỏi mép trên khung hình: đứng trên
 *  cao nhìn xuống gốc thì đường chân trời ở đâu đó phía trên đầu. Ở đây phải
 *  tự ngắm ra xa. */
function LookOut({ at }: { at: [number, number, number] }) {
  const { camera } = useThree();
  useEffect(() => {
    camera.lookAt(at[0], at[1], at[2]);
    camera.updateProjectionMatrix();
  }, [camera, at]);
  return null;
}

const NO_SLUGS = new Set<string>();
const NO_SEATS = new Set<number>();
const NOOP = () => {};

/** Cảnh ĐI ĐƯỢC, không phải cảnh tĩnh.
 *
 *  DistrictShell chỉ dựng hình; mọi thứ có thể sai về ĐIỀU KHIỂN - xoay
 *  camera, lăn chuột phóng to, chạm để đi tới, va chạm, kẹt góc - nằm ở
 *  DistrictScene. Trước khi có chế độ này, cách duy nhất kiểm chúng là đăng
 *  nhập rồi đi bộ thật, nên một phiên hết hạn đăng nhập là mất luôn khả năng
 *  kiểm - đúng tình huống vừa xảy ra sau khi sửa năm chỗ trong mã đi lại.
 *
 *  Presence Supabase bên trong tự hỏng lành khi chưa đăng nhập: không có ai
 *  khác trong phòng, và đó đúng là thứ cần cho việc kiểm điều khiển. */
function WalkableScene({ id }: { id: DistrictRoomId }) {
  // Dùng createWalkState() chứ không tự dựng hình dạng: bản đầu tôi gõ tay
  // `{ input: { x: 0, z: 0 }, ... }` và sai cả hai chỗ - trục thứ hai của
  // MoveInput là `y` chứ không phải `z`, và `keys` bị bỏ quên.
  const walkRef = useRef(createWalkState());
  const playerRef = useRef({ x: 0, z: 0 });
  const room = getRoom(id);
  if (!room) return null;
  return (
    <DistrictScene
      roomId={id}
      userId="dev-preview"
      gear={{}}
      streak={0}
      doneToday={false}
      onPeerCount={NOOP}
      selfSpeech={null}
      entry={{ x: 0, z: room.bounds.maxZ - 2, ry: 0 }}
      name="Xem thử"
      color="#38bdf8"
      avatarUrl={null}
      level={1}
      lessonTitles={room.desks.map((_, i) => `Bài mẫu ${i + 1}`)}
      walkRef={walkRef}
      onDeskChange={NOOP}
      onDoorChange={NOOP}
      onPortalChange={NOOP}
      onLiftChange={NOOP}
      onStopChange={NOOP}
      onSeatChange={NOOP}
      onStandChange={NOOP}
      onWalkingChange={NOOP}
      playerRef={playerRef}
      onPeersChange={NOOP}
      doneSlugs={NO_SLUGS}
      dueSlugs={NO_SLUGS}
      progressByCategory={FAKE_PROGRESS}
      seatTaken={NO_SEATS}
      daylight={1}
      forceRender
    />
  );
}

/** Ngoài trời thư viện là một thế giới KHÁC khu phố nghề, và cũng nằm sau
 *  tường đăng nhập. Hai mục này để soi cảnh ngoài trời ở hai giờ khác nhau:
 *  bờ sông và dãy nhà bên kia đường đổi hẳn diện mạo khi trời tối, và đó đúng
 *  là chỗ không nhìn thì không biết là sai. */
const CITY_VIEWS = ["sanh-ngoai-troi", "sanh-ngoai-troi-dem"] as const;
type ViewId = DistrictRoomId | (typeof CITY_VIEWS)[number];
/** Ngắm vào giữa mặt sông, không ngắm vào thư viện. */
const CITY_TARGET: [number, number, number] = [0, 0, RIVER_Z0 + 30];

const FAKE_PROGRESS = Object.fromEntries(
  CAREER_CATEGORY_ORDER.map((c, i) => [c, { done: i, total: 8 }])
) as Record<CareerCategory, { done: number; total: number }>;

export default function WorldPreview() {
  // Lấy id từ `room.id` chứ không từ Object.keys: DISTRICT_ROOMS khai báo là
  // Record<string, …> nên keys ra `string`, còn getRoom nhận DistrictRoomId.
  const ids = useMemo(
    (): ViewId[] => [
      ...Object.values(DISTRICT_ROOMS).map((r) => r.id).sort(),
      ...CITY_VIEWS,
    ],
    []
  );
  const [id, setId] = useState<ViewId>("street");
  const [line, setLine] = useState("đang dựng…");
  // Chế độ đi được: dựng DistrictScene thay cho DistrictShell. Mặc định TẮT vì
  // cảnh tĩnh rẻ hơn và là thứ cần cho việc soi hình học; bật lên khi cần kiểm
  // điều khiển.
  const [walk, setWalk] = useState(false);
  // Số đo nhảy mỗi khung hình; giữ trong ref rồi bơm ra state theo nhịp chậm
  // để chữ đọc được, thay vì nhấp nháy 60 lần một giây.
  const latest = useRef(line);

  useEffect(() => {
    const t = setInterval(() => setLine(latest.current), 500);
    return () => clearInterval(t);
  }, []);

  const isCity = (CITY_VIEWS as readonly string[]).includes(id);
  const room = isCity ? null : getRoom(id as DistrictRoomId);
  const cityHour = id === "sanh-ngoai-troi-dem" ? 21 : 10;

  return (
    // Xếp dọc chứ không chồng lớp: ở 375px danh sách 26 phòng xuống tới bảy
    // dòng, và bản đầu để dòng số đo ở `top-14` tuyệt đối nên nó nằm đè lên
    // giữa đám nút.
    <div className="fixed inset-0 flex flex-col bg-sky-300">
      <div className="flex shrink-0 flex-wrap gap-1 bg-stone-900 p-2">
        {ids.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => {
              setId(r);
              latest.current = "đang dựng…";
            }}
            className={`cursor-pointer rounded px-1.5 py-0.5 font-mono text-[10px] ${
              r === id ? "bg-cyan-400 text-stone-950" : "bg-stone-800/80 text-stone-200"
            }`}
          >
            {r}
          </button>
        ))}
      </div>
      <div className="flex shrink-0 items-center gap-2 bg-stone-950 px-2 py-1">
        <button
          type="button"
          onClick={() => setWalk((v) => !v)}
          disabled={isCity}
          className={`cursor-pointer rounded px-2 py-0.5 font-mono text-[10px] font-bold disabled:cursor-not-allowed disabled:opacity-40 ${
            walk ? "bg-emerald-400 text-stone-950" : "bg-stone-800 text-stone-300"
          }`}
        >
          {walk ? "đang đi được" : "cảnh tĩnh"}
        </button>
        {/* Ở chế độ đi được, Meter không được gắn (DistrictScene mang canvas
            của riêng nó), nên dòng số đo sẽ là số CŨ còn sót lại của cảnh
            tĩnh - đúng loại con số trông như đo được mà thật ra không. Nói
            thẳng ra thay vì để nó nằm đó. */}
        <p className="font-mono text-[11px] text-emerald-300">
          {id} — {walk && !isCity ? "đang đi được · không đo ở chế độ này" : line}
        </p>
      </div>

      <div className="min-h-0 flex-1">
        {/* DistrictScene TỰ MANG <Canvas> của nó, nên nó phải thay thế cả canvas
            của trang chứ không lồng vào trong. Lồng vào thì r3f báo "Canvas is
            not part of the THREE namespace" - bộ đối chiếu của r3f gặp một thẻ
            Canvas ở nơi nó chỉ chấp nhận đối tượng three.js. */}
        {walk && !isCity ? (
          <WalkableScene id={id as DistrictRoomId} />
        ) : (
        <Canvas
          key={id}
          frameloop="always"
          shadows
          // Cảnh ngoài trời phải nhìn từ TRÊN CAO và từ PHÍA SAU thư viện. Bờ
          // sông nằm cách cửa hơn 150 m, và đặt máy ở giữa quãng đó thì nó lọt
          // vào đúng giữa dãy nhà bên kia đường - khung hình chỉ còn hai bức
          // tường. Trên cao thì nhìn được cả trục: thềm, đường, dãy nhà, sông.
          camera={isCity ? { position: [0, 34, -46], fov: 60, far: 900 } : { position: [0, 14, 22], fov: 50 }}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 20, 10]} intensity={1.1} castShadow />
          <Meter onRead={(l) => (latest.current = l)} />
          {isCity ? (
            <>
              <LookOut at={CITY_TARGET} />
              <CityStreet day={daylightAt(cityHour)} />
            </>
          ) : (
            room && (
              <DistrictShell
                room={room}
                lessonTitles={room.desks.map((_, i) => `Bài mẫu ${i + 1}`)}
                doneSlugs={NO_SLUGS}
                dueSlugs={NO_SLUGS}
                progressByCategory={FAKE_PROGRESS}
                seatTaken={NO_SEATS}
              />
            )
          )}
        </Canvas>
        )}
      </div>
    </div>
  );
}
