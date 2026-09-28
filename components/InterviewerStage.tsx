"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n/context";

/** Người phỏng vấn, dựng to như đang ngồi đối diện.
 *
 *  Trước đó câu hỏi là một hộp xám có nhãn "Interviewer asks" ở trên - đúng
 *  thông tin, nhưng không có ai trong phòng. Trang này bán một thứ rất cụ thể
 *  ("luyện như một vòng phỏng vấn analyst thật"), và thứ duy nhất làm nó thật
 *  là có một người đối diện đang hỏi.
 *
 *  Ảnh lấy từ public/careers - đây là bộ ảnh 3D đã có sẵn của app, không thêm
 *  tài nguyên mới. Chọn theo `round` để mỗi vòng là một người khác: vòng dễ là
 *  người sàng lọc, vòng khó là người ngồi ghế cuối.
 *
 *  Bong bóng thoại có ĐUÔI trỏ về phía ảnh. Thiếu cái đuôi thì hai khối chỉ là
 *  hai hộp nằm cạnh nhau, và cả hiệu ứng "người này đang nói" biến mất - đó là
 *  toàn bộ thứ khối này tồn tại để tạo ra. */

export type InterviewRound = "de" | "trung-binh" | "kho" | "tat-ca";

/** Cảnh 3D nạp trễ và KHÔNG dựng ở server: nó kéo theo three.js, và three.js
 *  trong bundle của một trang mà phần lớn người dùng chỉ đọc câu hỏi rồi bấm
 *  đáp án là trả giá cho thứ chưa chắc được nhìn. `ssr: false` vì canvas cần
 *  DOM thật. */
const InterviewRoomScene = dynamic(() => import("@/components/interview/InterviewRoomScene"), {
  ssr: false,
  loading: () => null,
});

const INTERVIEWERS: Record<InterviewRound, { src: string; nameKey: "roundScreen" | "roundAnalyst" | "roundPressure" | "roundMixed" }> = {
  de: { src: "/careers/cat_accounting_3d.jpg", nameKey: "roundScreen" },
  "trung-binh": { src: "/careers/cat_investment_3d.jpg", nameKey: "roundAnalyst" },
  kho: { src: "/careers/cat_banking_3d.jpg", nameKey: "roundPressure" },
  "tat-ca": { src: "/careers/cat_advisory_3d.jpg", nameKey: "roundMixed" },
};

/** Chữ hiện ra từng ký tự, như người đối diện đang nói dở.
 *
 *  Không có state nào bị đặt THẲNG trong thân effect - chỉ đặt trong callback
 *  của interval. Đó là khác biệt mà `react-hooks/set-state-in-effect` quan tâm,
 *  và là lý do bản trước của khối này bị eslint chặn.
 *
 *  Reset khi đổi câu làm bằng `key` ở chỗ gọi, không phải bằng một effect ghi
 *  lại state - remount thì state mới tự khắc là 0.
 *
 *  `prefers-reduced-motion` không tắt hiệu ứng bằng một nhánh render (sẽ lệch
 *  hydrate) mà bằng cách nhảy nguyên chuỗi trong nhịp đầu tiên. */
function SpokenText({ text, speed = 16 }: { text: string; speed?: number }) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const step = reduced ? text.length : 1;
    const id = setInterval(() => {
      setShown((n) => {
        if (n >= text.length) {
          clearInterval(id);
          return n;
        }
        return n + step;
      });
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  const done = shown >= text.length;
  return (
    <>
      {text.slice(0, shown)}
      {/* Con trỏ nhấp nháy chỉ trong lúc còn đang nói. Để nó lại sau khi nói
          xong thì nó thành một lỗi hiển thị chứ không còn là dấu hiệu gì. */}
      {!done && <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-brand-300 align-middle" style={{ height: "1em" }} aria-hidden />}
    </>
  );
}

export default function InterviewerStage({
  round,
  question,
  explanation = null,
  verdict = null,
  questionKey,
  showCaption = false,
  bleed = true,
  maxHeightVh = 72,
}: {
  round: InterviewRound;
  question: string;
  /** Lời giải, truyền vào SAU khi người học nộp đáp án. Có nó thì người phỏng
   *  vấn nói tiếp phần giải thích thay vì để nó nằm ở một hộp riêng bên dưới -
   *  cùng một người, cùng một chỗ, nên nó đọc ra là câu trả lời cho vừa nãy
   *  chứ không phải một khối chú thích. */
  explanation?: string | null;
  verdict?: "correct" | "wrong" | null;
  /** Đổi giá trị này là bong bóng thoại chạy lại hoạt ảnh - dùng chỉ số câu
   *  chứ không dùng chính nội dung câu hỏi, vì hai câu trùng chữ vẫn là hai
   *  lượt hỏi khác nhau. */
  questionKey: string | number;
  /** Tắt dải phụ đề dưới khung khi NGƯỜI GỌI đã hiện câu hỏi to và chọn được ở
   *  ngay bên dưới - màn hình behavioral là đúng trường hợp đó.
   *
   *  Dải phụ đề tồn tại vì bong bóng 3D không cho chọn/copy chữ, không để tiện
   *  ích dịch đọc được, và thu nhỏ theo khung trên màn hẹp. Ở behavioral thì
   *  chính khối câu hỏi cỡ `text-2xl` bên dưới đang làm cả ba việc ấy, nên bật
   *  phụ đề nữa là câu hỏi hiện BA lần trong một màn. */
  showCaption?: boolean;
  /** Cho khung tràn ra sát mép thẻ bọc ngoài, bằng lề âm đúng bằng padding của
   *  thẻ đó (p-5 sm:p-6 ở trang technical). Mặc định BẬT vì đó là chỗ gọi chính
   *  và là chỗ khung cần to nhất.
   *
   *  BehavioralPrepPanel tắt nó: thẻ bọc bên đó chỉ có px-3 sm:px-4, nên cùng
   *  một lề âm sẽ đẩy khung lòi ra ngoài viền thẻ. Lề âm phải khớp ĐÚNG padding
   *  của chỗ gọi, nên nó là một lựa chọn chứ không phải mặc định cho mọi nơi. */
  bleed?: boolean;
  /** Trần chiều cao của khung, tính bằng vh. Mặc định 72 cho vòng technical,
   *  nơi khung là thứ duy nhất phía trên bốn đáp án.
   *
   *  Màn behavioral cần thấp hơn: dưới khung còn cả câu hỏi cỡ lớn, khối gợi ý
   *  và hai nút chuyển câu, nên một khung 58vh đẩy chính câu hỏi xuống dưới
   *  mép màn hình. Phần bong bóng thoại không hỏng theo: kích thước của nó
   *  tính bằng đơn vị THẾ GIỚI theo góc mở của camera, nên thu khung CSS lại
   *  chỉ làm mọi thứ nhỏ đều đi, không cắt mất chữ.
   *
   *  Là SỐ rồi đặt qua `style`, không phải một chuỗi class truyền vào. Tailwind
   *  chỉ sinh ra những class nó QUÉT THẤY trong mã nguồn; một class đến từ prop
   *  thì tuỳ chỗ gọi có viết đúng chuỗi đó ở dạng literal hay không - viết sai
   *  hoặc ghép chuỗi là class biến mất khỏi CSS và khung mất luôn trần chiều
   *  cao, im lặng. Kiểm trên CSS dev: `58vh` có mặt, `38vh` không, vì lúc đó
   *  38 mới chỉ nằm trong một prop. */
  maxHeightVh?: number;
}) {
  const { t } = useI18n();
  const person = INTERVIEWERS[round] ?? INTERVIEWERS["tat-ca"];

  // Đang nói câu hỏi, hay đang nói lời giải. Hai pha, và mỗi pha là một lượt
  // "nói" riêng: cảnh 3D gật lại từ đầu, chữ chạy lại từ đầu.
  const speech = explanation ?? question;
  const phase = explanation ? "explain" : "ask";
  const turnKey = `${questionKey}:${phase}`;



  return (
    // MỘT KHỐI, KHÔNG PHẢI HAI. Trước đó phòng là một ô 320px đứng cạnh một
    // bong bóng thoại - hai hộp ngang vai nhau, và căn phòng thành một tấm
    // hình minh hoạ chứ không phải nơi đang diễn ra chuyện gì.
    //
    // Giờ căn phòng chiếm trọn bề ngang và câu hỏi nằm TRONG nó, như phụ đề
    // trong một cuộc gọi. Người học nhìn vào một chỗ, không phải hai.
    <div
      className={`group relative overflow-hidden rounded-md border border-stone-800 bg-stone-950 ${
        bleed ? "-mx-5 sm:-mx-6" : ""
      }`}
    >
      {/* Tỉ lệ thay cho chiều cao cố định: trang này bị ghim đúng một màn hình
          (one-screen-pages.test.ts), nên một con số px sẽ đúng ở một cỡ màn và
          sai ở mọi cỡ còn lại. `max-h` chặn đầu trên để bốn đáp án bên dưới
          luôn còn chỗ.

          TO HƠN, và 21:9 bỏ đi. Vì `fov` của three.js là góc DỌC, khung càng
          dẹt thì phần thế giới nhìn thấy theo chiều dọc VẪN THẾ - chỉ là nó
          được vẽ trên ít pixel hơn, tức mọi thứ nhỏ đi. 21:9 nghĩa là trả toàn
          bộ chiều cao để lấy bề ngang mà cảnh không dùng tới: hai bên khung
          trong ảnh chụp màn hình là tường trống.
          16:9 cộng trần 58vh giữ nguyên vùng nhìn của camera nhưng vẽ nó to
          hơn rõ rệt - đúng thứ "không rõ" đang thiếu.

          RỒI TO THÊM MỘT NẤC NỮA, và cùng lập luận đó quyết định làm cách nào.
          Chiều cao ở đây do TỈ LỆ sinh ra chứ không do trần vh (trần chỉ chặn
          đầu trên), nên với một bề ngang cho trước thì tỉ lệ càng CAO khung
          càng lớn. 16:9 -> 3:2 kéo chiều cao lên khoảng một phần tư mà vùng
          nhìn của camera không đổi - tức mọi thứ trong phòng to lên đúng chừng
          ấy. Đi ngược lại (bẹt hơn) là thứ đã bị bác ở đoạn trên.

          Bề ngang thì lấy thêm bằng lề âm ở khung ngoài, không phải bằng tỉ lệ.
          Hai việc tách nhau: lề âm cho thêm pixel thật, đổi tỉ lệ chỉ chia lại
          số pixel đang có. */}
      <div className="relative aspect-[16/9] w-full sm:aspect-[16/6]" style={{ maxHeight: `${maxHeightVh}vh` }}>
        {/* Ảnh nền chờ trong lúc three.js tải, và là bản dự phòng nếu cảnh
            không dựng được - cùng cách DistrictWorld có `Fallback`. Mờ và tối
            đi để lúc cảnh hiện lên không thấy hai lớp đánh nhau. */}
        <Image
          src={person.src}
          alt={t.interview[person.nameKey]}
          fill
          sizes="(max-width: 640px) 100vw, 900px"
          className="object-cover opacity-35 blur-[3px]"
          priority
        />
        {/* `key={questionKey}` dựng lại cảnh mỗi câu, và đó là cách cảnh biết
            "đang nói": nó đọc đồng hồ của chính nó trong useFrame chứ không
            nhận một prop boolean do React hẹn giờ tắt. */}
        {/* `cursor-grab` và `touch-none` ở đây thay vì sửa `el.style` trong
            effect của cảnh: một chỗ quyết định hình dạng con trỏ, và `touch-none`
            là điều kiện để cú kéo trên điện thoại không bị trình duyệt hiểu
            thành cuộn trang. */}
        <div className="absolute inset-0 cursor-grab touch-none active:cursor-grabbing">
          <InterviewRoomScene key={questionKey} round={round} question={question} />
        </div>

        {/* Bảng tên ở góc, như thẻ tên trong một cuộc gọi. */}
        <div className="pointer-events-none absolute left-3 top-3 rounded-sm border border-white/15 bg-stone-950/85 px-2.5 py-1.5">
          <p className="text-[9px] font-black uppercase tracking-widest text-stone-400">
            {t.interview.interviewerAsks}
          </p>
          <p className="text-[11px] font-bold text-white">{t.interview[person.nameKey]}</p>
        </div>

        {/* Gợi ý kéo. Một cảnh kéo được mà không nói ra thì phần lớn người
            dùng sẽ không thử - và trước đây nó THẬT SỰ không kéo được, nên
            không ai có lý do để thử. Mờ đi khi trỏ chuột vào để không che cảnh
            lúc đang xem. */}
        <div className="pointer-events-none absolute right-3 top-3 rounded-sm border border-white/15 bg-stone-950/85 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-stone-300 transition-opacity duration-300 group-hover:opacity-0">
          {t.interview.dragHint}
        </div>

        {/* PHỤ ĐỀ, và giờ nó là bản DỰ PHÒNG chứ không phải bản chính.
            Câu hỏi đã nằm trong bong bóng thoại của người phỏng vấn ở trong
            cảnh; dòng này ở lại vì bong bóng 3D không làm được ba việc: cho
            chọn/copy chữ, cho tiện ích dịch của trình duyệt đọc được, và giữ
            chữ đủ lớn trên màn hình hẹp - ở đó một texture 512px thu nhỏ theo
            khung là không đọc nổi.
            Dải tối mỏng hơn hẳn bản trước (pt-14 -> pt-8, chữ lg -> sm): chính
            nó là thứ che mất nửa dưới căn phòng, và nửa dưới ấy là nơi người
            phỏng vấn ngồi. */}
        {showCaption && (
        <div className="absolute inset-x-0 bottom-0 border-t border-white/15 bg-stone-950/85 px-4 py-2.5 sm:px-6 sm:py-3">
          <motion.p
            key={questionKey}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="mx-auto max-w-3xl select-text text-center text-[13px] font-semibold leading-snug text-white/90 sm:text-sm"
          >
            {question}
          </motion.p>
        </div>
        )}
      </div>
    </div>
  );
}
