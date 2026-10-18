import type { LessonSectionBlock } from "../lesson-types";

// Dự án xuyên suốt của Chặng 67: "giỏ hàng quán cà phê Hẻm", viết bằng JavaScript.
//
// Mỗi bài trong chặng (id 2740-2749) có đúng MỘT bước dự án, là một bài tập
// `exercise` chấm theo ĐẦU RA (xem lib/code-runner/grade.ts) - nên chấm lặp lại
// được, không gọi LLM, không phụ thuộc mạng. Bước sau dùng lại các hàm đã xong
// của bước trước, nên mã khởi đầu của bài sau chứa bản ĐÚNG của hàm bài trước:
//
//   2740 bản giao việc (yeuCau)      2745 đọc mã: đoán đầu ra tomTatGio
//   2741 tongTien                    2746 soi mã AI viết: tìm 3 dòng lỗi
//   2742 apGiamGia (giữ nguyên tongTien)   2747 đọc git diff: phanTich
//   2743 phiGiao                     2748 sửa kiemTraDon cho đủ bộ thử
//   2744 viết ca thử cho kiemTraDon  2749 nghiệm thu datHang
//
// Tiến độ lưu theo từng bước nhờ cơ chế có sẵn: `recordExercisePass(bài, vị trí
// khối)` chỉ chạy khi bài tập đạt (components/LessonSections.tsx). Bảng tiến độ
// ở lib/vibecode-project.ts đọc lại đúng các bản ghi đó, nên PROJECT_STEPS ở đó
// phải khớp vị trí khối - lib/__tests__/vibecode-project.test.ts giữ chúng khớp.
//
// Quy ước tên: không dấu cho mã định danh (giống các bài tập khác trong kho);
// chữ in ra màn hình thì có dấu.

type ExerciseBlock = Extract<LessonSectionBlock, { type: "exercise" }>;

const MENU = `const MENU = { "ca-phe-den": 25000, "ca-phe-sua": 29000, "tra-dao": 34500, "banh-mi": 20000 };`;

const TONG_TIEN = `function tongTien(gio) {
  let tong = 0;
  for (const dong of gio) tong += MENU[dong.mon] * dong.soLuong;
  return tong;
}`;

const AP_GIAM_GIA = `function apGiamGia(tong, ma) {
  if (ma === "GIAM10" && tong >= 100000) return tong - tong / 10;
  return tong;
}`;

const PHI_GIAO = `function phiGiao(tong) {
  if (tong < 0) return "tổng tiền không hợp lệ";
  if (tong >= 500000) return 0;
  return 30000;
}`;

const KIEM_TRA_DON = `function kiemTraDon(don) {
  if (don.ten.trim() === "") return "thiếu tên";
  if (!/^0\\d{9}$/.test(don.sdt)) return "số điện thoại không hợp lệ";
  if (don.gio < 7 || don.gio > 21) return "ngoài giờ nhận";
  return "ok";
}`;

// ── 2740: bản giao việc ────────────────────────────────────────────────────
const step1: ExerciseBlock = {
  type: "exercise",
  language: "javascript",
  title: "Bước 1 của dự án: viết bản giao việc cho trang quán cà phê",
  task: "Quán cà phê Hẻm cần một trang giới thiệu. Bạn là người giao việc cho AI. Điền bản giao việc vào ba chỗ trống: mục đích (để làm gì), người dùng (ai dùng, bằng gì) và kết quả (những thứ kiểm tra được). Chương trình kiểm xem bản của bạn có đủ ba điều không: khách xem bằng điện thoại, trang phải có giờ mở cửa và nút gọi, và không dùng tính từ chung chung như \"đẹp\" hay \"chuyên nghiệp\".",
  starter: `// Điền ba chỗ trống bên dưới. Phần kiểm tra ở dưới, không cần sửa.
const yeuCau = {
  mucDich: "",
  nguoiDung: "",
  ketQua: [],
};

function kiemTra(y) {
  const loi = [];
  if (y.mucDich.trim().length < 15) loi.push("mục đích quá ngắn hoặc để trống");
  if (!y.nguoiDung.toLowerCase().includes("điện thoại")) loi.push("chưa nói khách xem bằng điện thoại");
  const ds = y.ketQua.map((k) => k.toLowerCase());
  if (!ds.some((k) => k.includes("giờ mở cửa"))) loi.push("thiếu: giờ mở cửa");
  if (!ds.some((k) => k.includes("nút gọi"))) loi.push("thiếu: nút gọi");
  if (ds.some((k) => ["đẹp", "hiện đại", "chuyên nghiệp"].some((t) => k.includes(t)))) {
    loi.push("có tính từ chung chung: hãy nêu thứ kiểm tra được");
  }
  return loi;
}

const loi = kiemTra(yeuCau);
console.log(loi.length === 0 ? "Bản giao việc đạt: AI có đủ ba điều để làm sát ý." : "Chưa đạt:");
for (const l of loi) console.log("- " + l);`,
  solution: `const yeuCau = {
  mucDich: "Giới thiệu quán cà phê nhỏ để khách biết giờ mở cửa và chỗ ngồi",
  nguoiDung: "Khách quanh khu phố, mở trang bằng điện thoại khi đang đi trên đường",
  ketQua: ["Có giờ mở cửa ở đầu trang", "Có nút gọi điện to, dễ chạm", "Chữ lớn, nền sáng"],
};

function kiemTra(y) {
  const loi = [];
  if (y.mucDich.trim().length < 15) loi.push("mục đích quá ngắn hoặc để trống");
  if (!y.nguoiDung.toLowerCase().includes("điện thoại")) loi.push("chưa nói khách xem bằng điện thoại");
  const ds = y.ketQua.map((k) => k.toLowerCase());
  if (!ds.some((k) => k.includes("giờ mở cửa"))) loi.push("thiếu: giờ mở cửa");
  if (!ds.some((k) => k.includes("nút gọi"))) loi.push("thiếu: nút gọi");
  if (ds.some((k) => ["đẹp", "hiện đại", "chuyên nghiệp"].some((t) => k.includes(t)))) {
    loi.push("có tính từ chung chung: hãy nêu thứ kiểm tra được");
  }
  return loi;
}

const loi = kiemTra(yeuCau);
console.log(loi.length === 0 ? "Bản giao việc đạt: AI có đủ ba điều để làm sát ý." : "Chưa đạt:");
for (const l of loi) console.log("- " + l);`,
  expectedOutput: "Bản giao việc đạt: AI có đủ ba điều để làm sát ý.",
  hints: [
    "Chạy trước: chương trình liệt kê từng điều còn thiếu, cứ xử lý từng dòng một.",
    "Kết quả là một danh sách chữ, ví dụ: [\"Có giờ mở cửa ở đầu trang\", ...]. Mỗi mục nói một thứ bạn nhìn vào là biết đúng hay sai.",
    "Tránh các từ \"đẹp\", \"hiện đại\", \"chuyên nghiệp\" trong phần kết quả.",
  ],
};

// ── 2741: tongTien ─────────────────────────────────────────────────────────
const step2: ExerciseBlock = {
  type: "exercise",
  language: "javascript",
  title: "Bước 2 của dự án: một việc nhỏ - tính tổng tiền giỏ hàng",
  task: "Việc nhỏ đầu tiên của giỏ hàng: hàm tongTien cộng giá từng món nhân số lượng. AI mới chỉ viết khung hàm. Hoàn thành hàm rồi chạy ba giỏ thử: giỏ trống, một ly và hai món. Chỉ khi cả ba đạt mới sang bước tiếp.",
  starter: `${MENU}

function tongTien(gio) {
  // gio là danh sách các dòng { mon, soLuong }. Cộng giá món nhân số lượng.
  return 0;
}

const gioThu = [
  { ten: "giỏ trống", gio: [], mong: 0 },
  { ten: "một ly", gio: [{ mon: "ca-phe-sua", soLuong: 1 }], mong: 29000 },
  { ten: "hai món", gio: [{ mon: "ca-phe-den", soLuong: 2 }, { mon: "banh-mi", soLuong: 1 }], mong: 70000 },
];
for (const c of gioThu) {
  const that = tongTien(c.gio);
  console.log(c.ten + ": " + (that === c.mong ? "đạt" : "sai (nhận " + that + ", mong " + c.mong + ")"));
}`,
  solution: `${MENU}

${TONG_TIEN}

const gioThu = [
  { ten: "giỏ trống", gio: [], mong: 0 },
  { ten: "một ly", gio: [{ mon: "ca-phe-sua", soLuong: 1 }], mong: 29000 },
  { ten: "hai món", gio: [{ mon: "ca-phe-den", soLuong: 2 }, { mon: "banh-mi", soLuong: 1 }], mong: 70000 },
];
for (const c of gioThu) {
  const that = tongTien(c.gio);
  console.log(c.ten + ": " + (that === c.mong ? "đạt" : "sai (nhận " + that + ", mong " + c.mong + ")"));
}`,
  expectedOutput: `giỏ trống: đạt
một ly: đạt
hai món: đạt`,
  hints: [
    "Chạy trước khi sửa: giỏ trống đã đạt vì 0 là kết quả đúng, hai giỏ còn lại thì sai.",
    "Dùng một biến tong bắt đầu từ 0, rồi với mỗi dòng cộng thêm MENU[dong.mon] * dong.soLuong.",
    "Kết thúc hàm bằng return tong.",
  ],
};

// ── 2742: apGiamGia, giữ nguyên tongTien ───────────────────────────────────
const step3: ExerciseBlock = {
  type: "exercise",
  language: "javascript",
  title: "Bước 3 của dự án: thêm mã giảm giá mà không đổi phần đang chạy",
  task: "Bạn nhờ AI thêm mã GIAM10 (giảm 10% cho đơn từ 100000 đồng) và dặn \"giữ nguyên tongTien\". Bản AI trả về làm đúng một nửa: nó sửa luôn tongTien (làm tròn xuống nghìn) và đặt sai mốc 100000. Hãy đối chiếu kết quả với phạm vi đã dặn, rồi khôi phục tongTien và sửa mốc trong apGiamGia. Chỉ hai chỗ cần đổi.",
  starter: `${MENU}

function tongTien(gio) {
  let tong = 0;
  for (const dong of gio) tong += MENU[dong.mon] * dong.soLuong;
  return Math.floor(tong / 1000) * 1000;
}

function apGiamGia(tong, ma) {
  if (ma === "GIAM10" && tong > 100000) return tong - tong / 10;
  return tong;
}

const kiem = [
  ["tongTien giữ nguyên hành vi cũ", tongTien([{ mon: "tra-dao", soLuong: 1 }]), 34500],
  ["GIAM10 với đơn 200000", apGiamGia(200000, "GIAM10"), 180000],
  ["GIAM10 với đơn đúng 100000", apGiamGia(100000, "GIAM10"), 90000],
  ["GIAM10 với đơn 99000", apGiamGia(99000, "GIAM10"), 99000],
  ["không mã", apGiamGia(200000, ""), 200000],
];
for (const [ten, that, mong] of kiem) {
  console.log(ten + ": " + (that === mong ? "đạt" : "sai (nhận " + that + ", mong " + mong + ")"));
}`,
  solution: `${MENU}

${TONG_TIEN}

${AP_GIAM_GIA}

const kiem = [
  ["tongTien giữ nguyên hành vi cũ", tongTien([{ mon: "tra-dao", soLuong: 1 }]), 34500],
  ["GIAM10 với đơn 200000", apGiamGia(200000, "GIAM10"), 180000],
  ["GIAM10 với đơn đúng 100000", apGiamGia(100000, "GIAM10"), 90000],
  ["GIAM10 với đơn 99000", apGiamGia(99000, "GIAM10"), 99000],
  ["không mã", apGiamGia(200000, ""), 200000],
];
for (const [ten, that, mong] of kiem) {
  console.log(ten + ": " + (that === mong ? "đạt" : "sai (nhận " + that + ", mong " + mong + ")"));
}`,
  expectedOutput: `tongTien giữ nguyên hành vi cũ: đạt
GIAM10 với đơn 200000: đạt
GIAM10 với đơn đúng 100000: đạt
GIAM10 với đơn 99000: đạt
không mã: đạt`,
  hints: [
    "Chạy trước và đọc dòng đầu: 1 trà đào giá 34500 nhưng tongTien đang trả ra 34000. Dòng nào của AI gây ra chuyện đó?",
    "Phần cần giữ nguyên là tongTien: xoá dòng làm tròn, để hàm kết thúc bằng return tong.",
    "\"Từ 100000 đồng\" nghĩa là lớn hơn hoặc bằng: đổi dấu > thành >= trong apGiamGia.",
  ],
};

// ── 2743: phiGiao ──────────────────────────────────────────────────────────
const step4: ExerciseBlock = {
  type: "exercise",
  language: "javascript",
  title: "Bước 4 của dự án: nghiệm thu hàm phí giao hàng bằng bốn đơn thử",
  task: "AI báo đã sửa xong: đơn từ 500000 đồng trở lên được miễn phí giao, còn lại tính 30000 đồng. Chương trình dưới đây chạy bốn đơn thử và in kết quả. Bạn chạy nó, đối chiếu với điều mong đợi, rồi sửa hàm phiGiao: đơn đúng 500000 phải miễn phí, và tổng tiền âm phải in ra \"tổng tiền không hợp lệ\". Bạn không cần viết lại từ đầu, chỉ sửa hai chỗ trong hàm.",
  starter: `function phiGiao(tong) {
  if (tong > 500000) return 0;
  return 30000;
}

const donThu = [200000, 500000, 800000, -1000];
for (const tong of donThu) {
  console.log(tong + " -> " + phiGiao(tong));
}`,
  solution: `${PHI_GIAO}

const donThu = [200000, 500000, 800000, -1000];
for (const tong of donThu) {
  console.log(tong + " -> " + phiGiao(tong));
}`,
  expectedOutput: `200000 -> 30000
500000 -> 0
800000 -> 0
-1000 -> tổng tiền không hợp lệ`,
  hints: [
    "Chạy trước khi sửa: dòng của đơn 500000 đang in ra gì, và bạn mong đợi gì?",
    "Dấu > nghĩa là lớn hơn hẳn; dấu >= nghĩa là lớn hơn hoặc bằng.",
    "Thêm một dòng đầu hàm: nếu tong nhỏ hơn 0 thì trả về chữ \"tổng tiền không hợp lệ\".",
  ],
};

// ── 2744: viết ca thử trước khi nhờ AI ─────────────────────────────────────
const CHAM_DON = `// ---- Phần chấm điểm, không cần đọc hay sửa ----
const chuan = (d) =>
  d.ten.trim() === "" ? "lỗi"
  : !/^0\\d{9}$/.test(d.sdt) ? "lỗi"
  : d.gio < 7 || d.gio > 21 ? "lỗi" : "ok";
const banLoi = [
  ["nhận sai giờ 21", (d) => (d.ten.trim() === "" || !/^0\\d{9}$/.test(d.sdt) || d.gio < 7 || d.gio >= 21 ? "lỗi" : "ok")],
  ["nhận số điện thoại 11 chữ số", (d) => (d.ten.trim() === "" || !/^0\\d{9,10}$/.test(d.sdt) || d.gio < 7 || d.gio > 21 ? "lỗi" : "ok")],
  ["nhận tên toàn khoảng trắng", (d) => (!d.ten || !/^0\\d{9}$/.test(d.sdt) || d.gio < 7 || d.gio > 21 ? "lỗi" : "ok")],
  ["nhận số không bắt đầu bằng 0", (d) => (d.ten.trim() === "" || !/^\\d{10}$/.test(d.sdt) || d.gio < 7 || d.gio > 21 ? "lỗi" : "ok")],
  ["nhận sai giờ 22", (d) => (d.ten.trim() === "" || !/^0\\d{9}$/.test(d.sdt) || d.gio < 7 || d.gio > 22 ? "lỗi" : "ok")],
];
const quaHet = (f) => caThu.every(([don, mong]) => f(don) === mong);
console.log("Bản chuẩn qua mọi ca của bạn: " + (quaHet(chuan) ? "có" : "không"));
for (const [ten, f] of banLoi) {
  console.log("Bản lỗi (" + ten + "): " + (quaHet(f) ? "lọt" : "bị bắt"));
}`;

const step5: ExerciseBlock = {
  type: "exercise",
  language: "javascript",
  title: "Bước 5 của dự án: viết ca thử trước khi nhờ AI làm tính năng nhận đơn",
  task: "Tính năng mới: nhận đơn đặt món. Quy tắc: tên không để trống (toàn khoảng trắng cũng tính là trống); số điện thoại gồm đúng 10 chữ số và bắt đầu bằng 0; giờ nhận từ 7 đến 21 (cả 7 và 21 đều được nhận). Trước khi nhờ AI viết, bạn viết các ca thử: mỗi ca là [đơn, kết quả mong đợi], kết quả là \"ok\" hoặc \"lỗi\". Chương trình chấm bằng cách chạy ca của bạn qua một bản chuẩn và năm bản AI viết lỗi: ca thử tốt thì bản chuẩn qua hết, còn cả năm bản lỗi đều bị bắt.",
  starter: `// Mỗi ca: [đơn, "ok" hoặc "lỗi"]. Thêm ca cho tới khi cả năm bản lỗi bị bắt.
const caThu = [
  [{ ten: "An", sdt: "0901234567", gio: 9 }, "ok"],
];

${CHAM_DON}`,
  solution: `const caThu = [
  [{ ten: "An", sdt: "0901234567", gio: 9 }, "ok"],
  [{ ten: "An", sdt: "0901234567", gio: 7 }, "ok"],
  [{ ten: "An", sdt: "0901234567", gio: 21 }, "ok"],
  [{ ten: "An", sdt: "0901234567", gio: 6 }, "lỗi"],
  [{ ten: "An", sdt: "0901234567", gio: 22 }, "lỗi"],
  [{ ten: "An", sdt: "09012345678", gio: 9 }, "lỗi"],
  [{ ten: "An", sdt: "1901234567", gio: 9 }, "lỗi"],
  [{ ten: "   ", sdt: "0901234567", gio: 9 }, "lỗi"],
];

${CHAM_DON}`,
  expectedOutput: `Bản chuẩn qua mọi ca của bạn: có
Bản lỗi (nhận sai giờ 21): bị bắt
Bản lỗi (nhận số điện thoại 11 chữ số): bị bắt
Bản lỗi (nhận tên toàn khoảng trắng): bị bắt
Bản lỗi (nhận số không bắt đầu bằng 0): bị bắt
Bản lỗi (nhận sai giờ 22): bị bắt`,
  hints: [
    "Chạy trước: một ca đúng không bắt được bản lỗi nào. Mỗi bản lỗi cần ít nhất một ca nhắm đúng chỗ nó sai.",
    "Nhắm vào các mốc: giờ 7 và 21 (nhận), giờ 6 và 22 (từ chối).",
    "Với số điện thoại và tên: thử số 11 chữ số, số bắt đầu bằng 1, và tên chỉ có khoảng trắng. Nhớ ghi \"lỗi\" cho những ca không được nhận.",
  ],
};

// ── 2745: đọc mã, đoán đầu ra ──────────────────────────────────────────────
const step6: ExerciseBlock = {
  type: "exercise",
  language: "javascript",
  title: "Bước 6 của dự án: đọc hàm AI viết và đoán nó in ra gì",
  task: "AI viết hàm tomTatGio để hiện tóm tắt giỏ hàng cho khách. Bạn không cần tự viết hàm, nhưng phải đọc được nó. Đọc từng bước (lọc, đổi, nối), rồi điền vào mảng doan kết quả bạn nghĩ hàm trả về cho bốn lời gọi. Chương trình chạy hàm thật và cho biết bạn đoán đúng hay sai từng lần, không tiết lộ đáp án.",
  starter: `const TEN = { "ca-phe-den": "Cà phê đen", "ca-phe-sua": "Cà phê sữa", "tra-dao": "Trà đào", "banh-mi": "Bánh mì" };

// Hàm do AI viết. Đọc từng bước, đừng sửa.
function tomTatGio(gio) {
  return gio
    .filter((d) => d.soLuong > 0)
    .map((d) => d.soLuong + " x " + TEN[d.mon])
    .join(", ") || "giỏ trống";
}

const lanGoi = [
  [{ mon: "ca-phe-sua", soLuong: 2 }, { mon: "banh-mi", soLuong: 0 }],
  [],
  [{ mon: "tra-dao", soLuong: 1 }, { mon: "ca-phe-den", soLuong: 3 }],
  [{ mon: "banh-mi", soLuong: 0 }],
];

// Điền bốn kết quả bạn đoán, đúng chữ, theo đúng thứ tự bốn lời gọi.
const doan = ["", "", "", ""];

lanGoi.forEach((gio, i) => {
  console.log("Lần " + (i + 1) + ": " + (tomTatGio(gio) === doan[i] ? "đúng" : "sai"));
});`,
  solution: `const TEN = { "ca-phe-den": "Cà phê đen", "ca-phe-sua": "Cà phê sữa", "tra-dao": "Trà đào", "banh-mi": "Bánh mì" };

function tomTatGio(gio) {
  return gio
    .filter((d) => d.soLuong > 0)
    .map((d) => d.soLuong + " x " + TEN[d.mon])
    .join(", ") || "giỏ trống";
}

const lanGoi = [
  [{ mon: "ca-phe-sua", soLuong: 2 }, { mon: "banh-mi", soLuong: 0 }],
  [],
  [{ mon: "tra-dao", soLuong: 1 }, { mon: "ca-phe-den", soLuong: 3 }],
  [{ mon: "banh-mi", soLuong: 0 }],
];

const doan = ["2 x Cà phê sữa", "giỏ trống", "1 x Trà đào, 3 x Cà phê đen", "giỏ trống"];

lanGoi.forEach((gio, i) => {
  console.log("Lần " + (i + 1) + ": " + (tomTatGio(gio) === doan[i] ? "đúng" : "sai"));
});`,
  expectedOutput: `Lần 1: đúng
Lần 2: đúng
Lần 3: đúng
Lần 4: đúng`,
  hints: [
    "filter giữ lại những dòng có soLuong lớn hơn 0; map biến mỗi dòng thành một câu; join nối các câu bằng dấu phẩy.",
    "Lần 4: sau khi lọc không còn dòng nào, join trên danh sách rỗng cho chuỗi rỗng. Chuỗi rỗng thì || thay bằng vế sau.",
    "Chữ phải khớp từng ký tự, kể cả dấu và chữ hoa.",
  ],
};

// ── 2746: soi mã AI viết, tìm dòng lỗi ─────────────────────────────────────
const step7: ExerciseBlock = {
  type: "exercise",
  language: "javascript",
  title: "Bước 7 của dự án: soi bản xuLyDon của AI và chỉ ra các dòng có lỗi",
  task: "AI ghép các hàm đã xong thành xuLyDon: kiểm đơn, tính tiền, giảm giá, phí giao. Quy tắc của quán: phí giao tính theo số tiền SAU khi giảm giá; giờ nhận từ 7 đến 21 (cả 7 và 21 đều được); và chỉ dùng những hàm có thật. Bản AI có ba dòng sai. Đọc từng dòng, ghi số dòng bạn nghi vào mảng dongLoi. Chương trình cho biết bạn tìm đúng bao nhiêu và có nhầm dòng lành không.",
  starter: `const maAI = [
  "function xuLyDon(don, gio, ma) {",
  "  const tong = tongTien(gio);",
  "  const phi = phiGiao(tong);",
  "  const sauGiam = apGiamGia(tong, ma);",
  "  const tamTinh = sauGiam + phi;",
  "  if (don.gio <= 7 || don.gio > 21) return 'ngoài giờ nhận';",
  "  return Math.roundTo(tamTinh, 1000);",
  "}",
];
maAI.forEach((dong, i) => console.log((i + 1) + "| " + dong));

// Ghi số dòng bạn cho là có lỗi, ví dụ [2, 5].
const dongLoi = [];

// ---- Phần chấm điểm, không cần đọc hay sửa ----
const thatSu = { 3: "tính phí giao trước khi giảm giá", 6: "loại nhầm giờ 7, vì <= thay cho <", 7: "Math.roundTo không có thật" };
let dung = 0;
let nham = 0;
for (const n of new Set(dongLoi)) {
  if (thatSu[n]) dung++;
  else nham++;
}
console.log("Tìm đúng " + dung + "/3 lỗi, nhầm " + nham + " dòng lành.");
for (const n of [...new Set(dongLoi)].sort((a, b) => a - b)) {
  if (thatSu[n]) console.log("Dòng " + n + ": " + thatSu[n]);
}`,
  solution: `const maAI = [
  "function xuLyDon(don, gio, ma) {",
  "  const tong = tongTien(gio);",
  "  const phi = phiGiao(tong);",
  "  const sauGiam = apGiamGia(tong, ma);",
  "  const tamTinh = sauGiam + phi;",
  "  if (don.gio <= 7 || don.gio > 21) return 'ngoài giờ nhận';",
  "  return Math.roundTo(tamTinh, 1000);",
  "}",
];
maAI.forEach((dong, i) => console.log((i + 1) + "| " + dong));

const dongLoi = [3, 6, 7];

const thatSu = { 3: "tính phí giao trước khi giảm giá", 6: "loại nhầm giờ 7, vì <= thay cho <", 7: "Math.roundTo không có thật" };
let dung = 0;
let nham = 0;
for (const n of new Set(dongLoi)) {
  if (thatSu[n]) dung++;
  else nham++;
}
console.log("Tìm đúng " + dung + "/3 lỗi, nhầm " + nham + " dòng lành.");
for (const n of [...new Set(dongLoi)].sort((a, b) => a - b)) {
  if (thatSu[n]) console.log("Dòng " + n + ": " + thatSu[n]);
}`,
  expectedOutput: `1| function xuLyDon(don, gio, ma) {
2|   const tong = tongTien(gio);
3|   const phi = phiGiao(tong);
4|   const sauGiam = apGiamGia(tong, ma);
5|   const tamTinh = sauGiam + phi;
6|   if (don.gio <= 7 || don.gio > 21) return 'ngoài giờ nhận';
7|   return Math.roundTo(tamTinh, 1000);
8| }
Tìm đúng 3/3 lỗi, nhầm 0 dòng lành.
Dòng 3: tính phí giao trước khi giảm giá
Dòng 6: loại nhầm giờ 7, vì <= thay cho <
Dòng 7: Math.roundTo không có thật`,
  hints: [
    "Ba loại lỗi hay gặp ở mã AI viết: sai ở mốc (dùng <= thay cho <), làm sai thứ tự các bước, và gọi hàm không có thật.",
    "Đối chiếu từng dòng với quy tắc của quán trong đề: dòng nào làm việc đúng thứ tự, dòng nào dùng hàm lạ?",
    "Đừng đánh dấu dòng nào bạn không chắc: mỗi dòng lành bị nhầm sẽ hiện trong phần \"nhầm\".",
  ],
};

// ── 2747: đọc git diff ─────────────────────────────────────────────────────
const step8: ExerciseBlock = {
  type: "exercise",
  language: "javascript",
  title: "Bước 8 của dự án: đọc git diff và bắt thay đổi ngoài phạm vi",
  task: "Bạn dặn AI chỉ sửa nut-gui.js. Nó trả về một git diff: dòng bắt đầu bằng + là dòng thêm, bắt đầu bằng - là dòng xoá, còn \"+++ b/tên-tệp\" cho biết tệp nào đang được đổi. Hàm phanTich mới đếm dòng và chưa biết tên tệp: nó đếm cả hai dòng tiêu đề \"+++\" và \"---\" như dòng thay đổi thật, và chưa báo tệp nào ngoài phạm vi. Sửa hàm để in đúng số dòng thêm, số dòng xoá, danh sách tệp đổi và tệp nằm ngoài phạm vi.",
  starter: `const diff = [
  "--- a/gia-tien.js",
  "+++ b/gia-tien.js",
  "@@ -3,1 +3,2 @@",
  "-  return tong;",
  "+  return Math.floor(tong / 1000) * 1000;",
  "+  // làm tròn",
  "--- a/nut-gui.js",
  "+++ b/nut-gui.js",
  "@@ -10,1 +10,2 @@",
  "-  nut.onclick = null;",
  "+  nut.onclick = guiDon;",
  "+  nut.disabled = false;",
];
const duocSua = ["nut-gui.js"];

function phanTich(dong) {
  let them = 0;
  let xoa = 0;
  const tep = [];
  for (const d of dong) {
    // 1. Chỉ đếm dòng thay đổi thật: bỏ qua dòng tiêu đề bắt đầu bằng +++ hoặc ---.
    if (d.startsWith("+")) them++;
    else if (d.startsWith("-")) xoa++;
    // 2. Với dòng "+++ b/tên-tệp", lấy tên tệp (bỏ 6 ký tự đầu) và thêm vào tep.
  }
  return { them, xoa, tep };
}

const kq = phanTich(diff);
console.log("Thêm " + kq.them + " dòng, xoá " + kq.xoa + " dòng");
console.log("Tệp thay đổi: " + kq.tep.join(", "));
console.log("Ngoài phạm vi: " + kq.tep.filter((t) => !duocSua.includes(t)).join(", "));`,
  solution: `const diff = [
  "--- a/gia-tien.js",
  "+++ b/gia-tien.js",
  "@@ -3,1 +3,2 @@",
  "-  return tong;",
  "+  return Math.floor(tong / 1000) * 1000;",
  "+  // làm tròn",
  "--- a/nut-gui.js",
  "+++ b/nut-gui.js",
  "@@ -10,1 +10,2 @@",
  "-  nut.onclick = null;",
  "+  nut.onclick = guiDon;",
  "+  nut.disabled = false;",
];
const duocSua = ["nut-gui.js"];

function phanTich(dong) {
  let them = 0;
  let xoa = 0;
  const tep = [];
  for (const d of dong) {
    if (d.startsWith("+++")) tep.push(d.slice(6));
    else if (d.startsWith("---")) continue;
    else if (d.startsWith("+")) them++;
    else if (d.startsWith("-")) xoa++;
  }
  return { them, xoa, tep };
}

const kq = phanTich(diff);
console.log("Thêm " + kq.them + " dòng, xoá " + kq.xoa + " dòng");
console.log("Tệp thay đổi: " + kq.tep.join(", "));
console.log("Ngoài phạm vi: " + kq.tep.filter((t) => !duocSua.includes(t)).join(", "));`,
  expectedOutput: `Thêm 4 dòng, xoá 2 dòng
Tệp thay đổi: gia-tien.js, nut-gui.js
Ngoài phạm vi: gia-tien.js`,
  hints: [
    "Chạy trước: thêm 6, xoá 4 là sai vì hai dòng \"+++\" và hai dòng \"---\" bị đếm nhầm là dòng thay đổi.",
    "Kiểm tra dòng bắt đầu bằng \"+++\" hoặc \"---\" TRƯỚC khi kiểm tra \"+\" hoặc \"-\".",
    "\"+++ b/nut-gui.js\".slice(6) cho ra \"nut-gui.js\".",
  ],
};

// ── 2748: sửa lỗi cho tới khi bộ thử qua ───────────────────────────────────
const BO_THU_DON = `const boThu = [
  ["đơn bình thường", { ten: "An", sdt: "0901234567", gio: 9 }, "ok"],
  ["đúng giờ 7", { ten: "An", sdt: "0901234567", gio: 7 }, "ok"],
  ["đúng giờ 21", { ten: "An", sdt: "0901234567", gio: 21 }, "ok"],
  ["giờ 22", { ten: "An", sdt: "0901234567", gio: 22 }, "ngoài giờ nhận"],
  ["tên toàn khoảng trắng", { ten: "   ", sdt: "0901234567", gio: 9 }, "thiếu tên"],
  ["số điện thoại 9 chữ số", { ten: "An", sdt: "090123456", gio: 9 }, "số điện thoại không hợp lệ"],
];`;

const step9: ExerciseBlock = {
  type: "exercise",
  language: "javascript",
  title: "Bước 9 của dự án: sửa lỗi bằng cách đọc bộ thử, từng chỗ một",
  task: "AI viết kiemTraDon cho tính năng nhận đơn, nhưng bộ thử cho thấy nó chưa đạt. Dán kết quả chạy làm \"báo lỗi\": mỗi dòng ✗ là một ca sai. Sửa kiemTraDon từng chỗ một, chạy lại sau mỗi lần sửa, cho tới khi cả sáu ca qua. Ba hàm tongTien, apGiamGia, phiGiao đã xong từ trước: chương trình cũng kiểm xem bạn có lỡ làm đổi chúng không.",
  starter: `${MENU}

${TONG_TIEN}

${AP_GIAM_GIA}

${PHI_GIAO}

// Hàm do AI viết. Bộ thử cho biết nó sai ở đâu.
function kiemTraDon(don) {
  if (!don.ten) return "thiếu tên";
  if (!/^0\\d{9}$/.test(don.sdt)) return "số điện thoại không hợp lệ";
  if (don.gio < 7 || don.gio >= 21) return "ngoài giờ nhận";
  return "ok";
}

${BO_THU_DON}

let qua = 0;
for (const [ten, don, mong] of boThu) {
  const that = kiemTraDon(don);
  if (that === mong) qua++;
  else console.log("✗ " + ten + ": nhận \\"" + that + "\\", mong \\"" + mong + "\\"");
}
console.log("Qua " + qua + "/" + boThu.length);

// ---- Kiểm các hàm đã xong có bị đổi không, không cần sửa ----
const nguyenVen =
  tongTien([{ mon: "tra-dao", soLuong: 1 }]) === 34500 &&
  apGiamGia(100000, "GIAM10") === 90000 &&
  phiGiao(500000) === 0;
console.log("Các hàm đã xong còn nguyên: " + (nguyenVen ? "có" : "không"));`,
  solution: `${MENU}

${TONG_TIEN}

${AP_GIAM_GIA}

${PHI_GIAO}

function kiemTraDon(don) {
  if (don.ten.trim() === "") return "thiếu tên";
  if (!/^0\\d{9}$/.test(don.sdt)) return "số điện thoại không hợp lệ";
  if (don.gio < 7 || don.gio > 21) return "ngoài giờ nhận";
  return "ok";
}

${BO_THU_DON}

let qua = 0;
for (const [ten, don, mong] of boThu) {
  const that = kiemTraDon(don);
  if (that === mong) qua++;
  else console.log("✗ " + ten + ": nhận \\"" + that + "\\", mong \\"" + mong + "\\"");
}
console.log("Qua " + qua + "/" + boThu.length);

const nguyenVen =
  tongTien([{ mon: "tra-dao", soLuong: 1 }]) === 34500 &&
  apGiamGia(100000, "GIAM10") === 90000 &&
  phiGiao(500000) === 0;
console.log("Các hàm đã xong còn nguyên: " + (nguyenVen ? "có" : "không"));`,
  expectedOutput: `Qua 6/6
Các hàm đã xong còn nguyên: có`,
  hints: [
    "Chạy trước: hai dòng ✗ cho bạn biết ca nào sai và kết quả nhận được khác mong đợi ra sao. Sửa từng ca một.",
    "Tên toàn khoảng trắng vẫn là \"có tên\" với !don.ten. Cắt khoảng trắng hai đầu bằng .trim() trước khi so sánh.",
    "\"Nhận từ 7 đến 21\" nghĩa là 21 vẫn được nhận: chỉ từ chối khi giờ lớn hơn 21.",
  ],
};

// ── 2749: nghiệm thu cả dự án ──────────────────────────────────────────────
const step10: ExerciseBlock = {
  type: "exercise",
  language: "javascript",
  title: "Bước 10 của dự án: nghiệm thu cả quy trình đặt hàng trước khi đưa cho khách",
  task: "Bước cuối: datHang ghép bốn tính năng thành một quy trình đặt hàng. Bảng nghiệm thu có năm đơn thử: thường, đơn lớn không mã, đơn lớn có mã, số điện thoại sai và giỏ trống. Quy tắc phí giao: tính theo số tiền SAU khi giảm giá. Chạy bảng nghiệm thu, tìm đơn không đạt, sửa đúng một chỗ trong datHang, rồi chạy lại cho tới khi quy trình sẵn sàng giao khách.",
  starter: `${MENU}

${TONG_TIEN}

${AP_GIAM_GIA}

${PHI_GIAO}

${KIEM_TRA_DON}

function datHang(don, gio, ma) {
  const kq = kiemTraDon(don);
  if (kq !== "ok") return "từ chối: " + kq;
  if (gio.length === 0) return "từ chối: giỏ trống";
  const tong = tongTien(gio);
  const sauGiam = apGiamGia(tong, ma);
  const phi = phiGiao(tong);
  return sauGiam + phi;
}

const ai = { ten: "An", sdt: "0901234567", gio: 9 };
const donLon = [{ mon: "ca-phe-den", soLuong: 20 }, { mon: "banh-mi", soLuong: 1 }];
const bang = [
  ["đơn thường", datHang(ai, [{ mon: "ca-phe-sua", soLuong: 1 }], ""), 59000],
  ["đơn lớn, không mã", datHang(ai, donLon, ""), 520000],
  ["đơn lớn, có mã GIAM10", datHang(ai, donLon, "GIAM10"), 498000],
  ["số điện thoại sai", datHang({ ten: "An", sdt: "12345", gio: 9 }, donLon, ""), "từ chối: số điện thoại không hợp lệ"],
  ["giỏ trống", datHang(ai, [], ""), "từ chối: giỏ trống"],
];
let dat = 0;
for (const [ten, that, mong] of bang) {
  if (that === mong) dat++;
  else console.log("✗ " + ten + ": nhận " + that + ", mong " + mong);
}
console.log("Đạt " + dat + "/" + bang.length);
console.log("Sẵn sàng giao khách: " + (dat === bang.length ? "có" : "chưa"));`,
  solution: `${MENU}

${TONG_TIEN}

${AP_GIAM_GIA}

${PHI_GIAO}

${KIEM_TRA_DON}

function datHang(don, gio, ma) {
  const kq = kiemTraDon(don);
  if (kq !== "ok") return "từ chối: " + kq;
  if (gio.length === 0) return "từ chối: giỏ trống";
  const tong = tongTien(gio);
  const sauGiam = apGiamGia(tong, ma);
  const phi = phiGiao(sauGiam);
  return sauGiam + phi;
}

const ai = { ten: "An", sdt: "0901234567", gio: 9 };
const donLon = [{ mon: "ca-phe-den", soLuong: 20 }, { mon: "banh-mi", soLuong: 1 }];
const bang = [
  ["đơn thường", datHang(ai, [{ mon: "ca-phe-sua", soLuong: 1 }], ""), 59000],
  ["đơn lớn, không mã", datHang(ai, donLon, ""), 520000],
  ["đơn lớn, có mã GIAM10", datHang(ai, donLon, "GIAM10"), 498000],
  ["số điện thoại sai", datHang({ ten: "An", sdt: "12345", gio: 9 }, donLon, ""), "từ chối: số điện thoại không hợp lệ"],
  ["giỏ trống", datHang(ai, [], ""), "từ chối: giỏ trống"],
];
let dat = 0;
for (const [ten, that, mong] of bang) {
  if (that === mong) dat++;
  else console.log("✗ " + ten + ": nhận " + that + ", mong " + mong);
}
console.log("Đạt " + dat + "/" + bang.length);
console.log("Sẵn sàng giao khách: " + (dat === bang.length ? "có" : "chưa"));`,
  expectedOutput: `Đạt 5/5
Sẵn sàng giao khách: có`,
  hints: [
    "Chạy trước: chỉ một dòng ✗. Xem nó nhận bao nhiêu và mong bao nhiêu, rồi so với quy tắc phí giao.",
    "Đơn lớn có mã giảm xuống dưới 500000 thì phải trả phí giao 30000.",
    "Hàm phiGiao đang được gọi với số tiền nào? Quy tắc nói số tiền sau giảm giá.",
  ],
};

/** Bước dự án theo id bài. Các tệp s67-*.ts nhúng đúng khối này vào `sections`. */
export const VIBECODE_PROJECT_EXERCISE: Record<number, ExerciseBlock> = {
  2740: step1,
  2741: step2,
  2742: step3,
  2743: step4,
  2744: step5,
  2745: step6,
  2746: step7,
  2747: step8,
  2748: step9,
  2749: step10,
};
