import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { districtRoomsOf } from "@/components/career-district/district-space";
import { vi as viDict } from "@/lib/i18n/dictionaries/vi";

const DISTRICT_ROOMS = districtRoomsOf(viDict);

/** Chi phí dựng cảnh, đo bằng số vật thể chứ không bằng cảm giác.
 *
 *  Ba thế giới đã lên gần 13.000 dòng và chưa ai đo lần nào. Bài này không đo
 *  FPS - việc đó cần trình duyệt thật - mà đo thứ QUYẾT ĐỊNH FPS và đọc được
 *  tĩnh: mỗi mesh không dùng instancing là một draw call, và con phố là căn
 *  phòng ai cũng vào đầu tiên.
 *
 *  Trần đặt ở mức hiện trạng vừa tối ưu xong, đúng cách các gate nội dung
 *  trong repo này làm: chặn phình thêm, không tạo nợ cho những gì đã có.
 *
 *  SỐ ĐO THẬT (gl.info, 800x450, sau khi instancing đã vào). Đo bằng một trang
 *  tạm dựng thẳng DistrictShell cho từng phòng - số mesh trong mã nguồn KHÔNG
 *  phải số draw call: một component dùng sáu lần chỉ đếm một lần trong mã.
 *
 *    phòng          draw call   tam giác   texture
 *    street              173       6.024        15
 *    investment          124       1.158        22
 *    quan-ca-phe         123       5.902         4
 *    cong-vien            64       1.350         1
 *    khu-game             58       1.988         2
 *    thap-lai-kep         33         468         2
 *
 *  Và cảnh NGOÀI TRỜI của thế giới thư viện, đo sau khi thêm bờ sông - nặng
 *  gấp rưỡi con phố và là cảnh đắt nhất trong cả ba thế giới:
 *
 *    ngoài trời (ngày)   298      27.320         7
 *    ngoài trời (đêm)    294      27.272         7
 *
 *  Cùng số draw call giữa ngày và đêm là điều đáng chờ đợi: đèn đường bật lên
 *  không thêm mesh, chỉ đổi vật liệu. Chênh 4 lệnh vẽ là mấy chiếc xe đang ở
 *  ngoài khung lúc đo.
 *
 *  Kết luận quan trọng hơn từng con số: tam giác KHÔNG phải nút thắt. Phòng
 *  nặng nhất mới 6.024 tam giác - một cái ghế trong game thật còn nhiều hơn.
 *  Nút thắt là draw call, và cách duy nhất hạ nó là gộp/instancing, không phải
 *  giảm số cạnh hay thêm LOD. Đừng tối ưu hình học ở thế giới này. */

function meshCount(file: string): number {
  const src = readFileSync(file, "utf8");
  // Đếm cả <mesh> lẫn <instancedMesh>; cái sau chỉ tốn một draw call cho mọi
  // bản sao, nên nó được đếm riêng ở bài dưới.
  return (src.match(/<mesh\b/g) ?? []).length;
}

/** Đếm số NHÓM dùng instancing, không đếm thẻ <instancedMesh>.
 *
 *  Bản đầu của bài này đếm thẻ và báo 1 trong khi có ba nhóm - vì cả ba đi qua
 *  cùng một component bọc. Thứ đáng đo là "có bao nhiêu nhóm vật thể lặp lại
 *  đã được gộp", và trong file này nó hiện ra ở chỗ gọi. */
function instancedGroups(file: string): number {
  return (readFileSync(file, "utf8").match(/<Instances\b/g) ?? []).length;
}

describe("chi phí dựng cảnh", () => {
  it("con phố không vượt trần mesh", () => {
    // Con phố dựng 5 nhà nghề + tháp + nhà thi đấu + 6 nhà dân sự + cây + xe +
    // đèn. Đây là phòng vào đầu tiên, nên nó là chỗ đắt nhất được phép đắt.
    const street = meshCount("components/career-district/DistrictShell.tsx");
    expect(street, "DistrictShell phình thêm - cân nhắc instancing trước khi nâng trần").toBeLessThanOrEqual(200);
  });

  it("dùng instancing cho những thứ lặp lại nhiều", () => {
    // Cây, cột đèn, xe máy, bục game: mỗi loại chục bản sao giống hệt nhau.
    const instanced = instancedGroups("components/career-district/DistrictShell.tsx");
    expect(instanced, "chưa dùng instancedMesh cho vật thể lặp lại ngoài phố").toBeGreaterThanOrEqual(3);
  });
});

describe("chi phí hình học của phòng", () => {
  it("không phòng nào có quá nhiều vật cản", () => {
    // Vật cản được duyệt tuyến tính mỗi khung hình cho mỗi người trong phòng.
    // Vài chục thì không đáng kể; vài trăm thì bắt đầu thấy, và đó là dấu hiệu
    // căn phòng cần chia nhỏ chứ không phải cần tối ưu.
    for (const room of Object.values(DISTRICT_ROOMS)) {
      expect(room.obstacles.length, `${room.id}`).toBeLessThanOrEqual(40);
    }
  });

  it("tổng vật thể tương tác của cả khu phố nằm trong tầm kiểm soát", () => {
    const rooms = Object.values(DISTRICT_ROOMS);
    const interactive = rooms.reduce(
      (n, r) => n + r.desks.length + r.portals.length + r.doorways.length + (r.seats?.length ?? 0),
      0
    );
    // Con số này chỉ tăng khi có phòng mới; nó ở đây để việc tăng là một quyết
    // định có người nhìn thấy.
    expect(interactive).toBeLessThanOrEqual(140);
  });
});
