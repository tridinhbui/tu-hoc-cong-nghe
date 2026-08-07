import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { LESSON_ROOM_LINKS, linkForLesson, roomHref } from "@/lib/lesson-room-links";
import { civicRoomsOf, districtRoomsOf } from "@/components/career-district/district-space";
import { vi as viDict } from "@/lib/i18n/dictionaries/vi";

const CIVIC_ROOMS = civicRoomsOf(viDict);
const DISTRICT_ROOMS = districtRoomsOf(viDict);

/** Người đối chiếu cho một bảng viết tay.
 *
 *  Đêm nay bảo tàng ra đời với bốn hiện vật do tôi tự nghĩ slug, và ba trong
 *  bốn dẫn tới trang 404 - trong khi mọi test khác vẫn xanh và cảnh 3D vẫn
 *  dựng bình thường. Một danh sách viết tay trỏ sang dữ liệu khác thì phải có
 *  người đối chiếu, và người đó không nên là người vừa viết nó. */

function lessonSlugs(): Set<string> {
  const raw = JSON.parse(readFileSync("lib/lessons-data/_index.json", "utf8"));
  const list: Array<{ slug: string }> = Array.isArray(raw) ? raw : raw.lessons ?? Object.values(raw)[0];
  return new Set(list.map((l) => l.slug));
}

describe("nối bài học sang phòng 3D", () => {
  it("mọi slug đều là bài có thật", () => {
    const real = lessonSlugs();
    for (const slug of Object.keys(LESSON_ROOM_LINKS)) {
      expect(real.has(slug), `${slug} không phải bài học có thật`).toBe(true);
    }
  });

  it("mọi phòng đều là phòng có thật, và đều là phòng DẠY", () => {
    // Nối sang cửa hàng hay bảng vàng thì cái nút chỉ là quảng cáo. Chỉ nối
    // sang phòng dân sự, tức những căn có bục đứng mở nội dung ra.
    const civic = new Set(CIVIC_ROOMS.map((c) => c.id as string));
    for (const [slug, link] of Object.entries(LESSON_ROOM_LINKS)) {
      expect(DISTRICT_ROOMS[link.room], `${slug} → ${link.room} không tồn tại`).toBeTruthy();
      expect(civic.has(link.room), `${slug} → ${link.room} không phải phòng dân sự`).toBe(true);
    }
  });

  it("phòng nào cũng vào được từ ít nhất một bài học", () => {
    // Sáu phòng dạy mà chỉ ba phòng có đường vào thì ba phòng kia vẫn cụt như
    // trước. Bài này là lý do cả bảng tồn tại.
    const teaching = ["vong-quay-tien", "phan-bo-rui-ro", "ban-tron", "ba-bao-cao"];
    const linked = new Set(Object.values(LESSON_ROOM_LINKS).map((l) => l.room));
    for (const room of teaching) {
      expect(linked.has(room as never), `${room} không có bài học nào dẫn vào`).toBe(true);
    }
  });

  it("mỗi cái nối nói được căn phòng làm gì, không chỉ 'xem thêm'", () => {
    for (const [slug, link] of Object.entries(LESSON_ROOM_LINKS)) {
      expect(link.cta.length, slug).toBeGreaterThan(12);
      expect(link.why.length, slug).toBeGreaterThan(60);
      // "Xem thêm về X" là dấu hiệu cái nối này không có lý do tồn tại: nếu
      // căn phòng không nói được điều gì trang bài học không nói được thì đừng
      // gửi người học đi.
      expect(link.why.toLowerCase()).not.toContain("xem thêm");
    }
  });

  it("hai bài nối vào cùng một phòng thì được dùng chung lời, nhưng phải nhất quán", () => {
    // cash-conversion-cycle và cash-conversion-cycle-2 là hai bản của cùng một
    // bài, nên chúng dùng chung câu chữ. Nếu ai đó sửa một chỗ mà quên chỗ kia
    // thì hai bài nói khác nhau về cùng một căn phòng.
    const a = LESSON_ROOM_LINKS["cash-conversion-cycle"];
    const b = LESSON_ROOM_LINKS["cash-conversion-cycle-2"];
    expect(a).toEqual(b);
  });

  it("đường dẫn trỏ đúng route và mang theo phòng", () => {
    expect(roomHref("vong-quay-tien")).toBe("/pho-nghe?phong=vong-quay-tien");
  });

  it("bài không có trong bảng thì trả về null, không nổ", () => {
    expect(linkForLesson("khong-ton-tai-dau-ca")).toBeNull();
  });
});

describe("kiểm tham số ?phong=", () => {
  /** Đúng phép kiểm mà app/(app)/pho-nghe/page.tsx dùng. */
  const accepted = (v: string) => Object.hasOwn(DISTRICT_ROOMS, v);

  it("nhận phòng có thật", () => {
    expect(accepted("vong-quay-tien")).toBe(true);
    expect(accepted("street")).toBe(true);
  });

  it("từ chối tên trên chuỗi nguyên mẫu", () => {
    // Bản đầu dùng `phong in DISTRICT_ROOMS`, và `in` đi cả chuỗi nguyên mẫu:
    // ba chuỗi dưới đây đều LỌT QUA, rồi đưa một hàm của Object vào chỗ đáng
    // ra là một căn phòng. DISTRICT_ROOMS dựng bằng Object.fromEntries nên nó
    // vẫn kế thừa Object.prototype.
    for (const evil of ["constructor", "toString", "valueOf", "__proto__", "hasOwnProperty"]) {
      expect(evil in DISTRICT_ROOMS, `${evil} nằm trên chuỗi nguyên mẫu`).toBe(true);
      expect(accepted(evil), `${evil} phải bị từ chối`).toBe(false);
    }
  });

  it("từ chối chuỗi vô nghĩa", () => {
    expect(accepted("")).toBe(false);
    expect(accepted("khong-co-phong-nay")).toBe(false);
  });
});
