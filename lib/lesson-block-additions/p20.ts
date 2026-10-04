import type { LessonSectionBlock } from "../lesson-types";

// Khối thêm cho bài track professional / bonus - đợt 20. Một người viết cho một tệp.
export const P20_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "ra-soat-ma": [
    {
      type: "exercise",
      language: "python",
      title: "Đếm bình luận chặn, đừng đếm bình luận",
      task:
        "Một lần rà soát để lại năm bình luận, mỗi bình luận mở đầu bằng mức độ: chặn, gợi ý hoặc ghi chú. Đếm số bình luận theo từng mức và kết luận: chỉ cần còn một mục chặn là chưa duyệt. Mã đang tính mọi bình luận là chặn; sửa để tác giả chỉ phải làm đúng những gì bắt buộc.",
      starter: `binh_luan = [
    "chặn: thiếu kiểm tra khi danh sách rỗng",
    "gợi ý: đổi tên biến cho rõ nghĩa",
    "ghi chú: đoạn này viết gọn, hay",
    "chặn: truy vấn nằm trong vòng lặp",
    "gợi ý: tách phần này thành hàm riêng",
]

dem = {"chặn": 0, "gợi ý": 0, "ghi chú": 0}
for bl in binh_luan:
    # TODO: lấy mức độ ở trước dấu ":" rồi cộng đúng mức đó
    dem["chặn"] += 1

print("Chặn:", dem["chặn"])
print("Gợi ý:", dem["gợi ý"])
print("Ghi chú:", dem["ghi chú"])
if dem["chặn"] > 0:
    print("Kết luận: chưa duyệt, cần sửa", dem["chặn"], "mục chặn")
else:
    print("Kết luận: duyệt")
`,
      solution: `binh_luan = [
    "chặn: thiếu kiểm tra khi danh sách rỗng",
    "gợi ý: đổi tên biến cho rõ nghĩa",
    "ghi chú: đoạn này viết gọn, hay",
    "chặn: truy vấn nằm trong vòng lặp",
    "gợi ý: tách phần này thành hàm riêng",
]

dem = {"chặn": 0, "gợi ý": 0, "ghi chú": 0}
for bl in binh_luan:
    muc = bl.split(":")[0]
    dem[muc] += 1

print("Chặn:", dem["chặn"])
print("Gợi ý:", dem["gợi ý"])
print("Ghi chú:", dem["ghi chú"])
if dem["chặn"] > 0:
    print("Kết luận: chưa duyệt, cần sửa", dem["chặn"], "mục chặn")
else:
    print("Kết luận: duyệt")
`,
      expectedOutput: `Chặn: 2
Gợi ý: 2
Ghi chú: 1
Kết luận: chưa duyệt, cần sửa 2 mục chặn`,
      hints: [
        "bl.split(\":\")[0] lấy phần đứng trước dấu hai chấm đầu tiên.",
        "Dùng chính chuỗi đó làm khoá: dem[muc] += 1.",
      ],
    },
    {
      type: "chart",
      title: "Thay đổi càng lớn, bình luận càng nông",
      caption:
        "Số liệu minh hoạ, không phải đo thật: kéo ngưỡng người rà soát còn giữ nổi ngữ cảnh để thấy bình luận về thiết kế biến mất trước, còn bình luận về đặt tên thì ở lại.",
      kind: "line",
      xLabel: "Số dòng thay đổi",
      yLabel: "Số bình luận (minh hoạ)",
      x: { from: 50, to: 800, step: 50 },
      params: [{ id: "k", label: "Ngưỡng người rà soát còn giữ nổi ngữ cảnh", min: 100, max: 400, step: 50, value: 200, unit: "dòng" }],
      series: [
        { label: "Bình luận về thiết kế", expr: "max(0, 10 - x / k * 4)" },
        { label: "Bình luận về đặt tên, dấu cách", expr: "min(6, 1 + x / k * 1.5)" },
      ],
    },
  ],

  "nhanh-va-gop-ma": [
    {
      type: "sim",
      tool: "terminal",
      mission: "git-branch",
      title: "Mở một nhánh ngắn để làm một việc nhỏ",
      task:
        "Tạo một kho mới bằng git init, tạo một tệp và commit đầu tiên, rồi mở nhánh riêng và chuyển sang nó (ví dụ git switch -c sua-ten-nut). Đây là kiểu nhánh bài nói tới: một việc nhỏ, sống một hai ngày rồi gộp lại.",
    },
    {
      type: "chart",
      title: "Chi phí gộp lớn dần theo từng ngày chờ",
      caption:
        "Số liệu minh hoạ, không phải đo thật: giả sử nhánh chính nhận thêm c thay đổi chạm vùng chung mỗi ngày, và khoảng cách giãn nhanh hơn tuyến tính vì có tệp bị đổi tên hay viết lại. Gộp mỗi ngày thì mỗi lần chỉ giải đúng một ngày khoảng cách.",
      kind: "line",
      xLabel: "Số ngày nhánh đã sống",
      yLabel: "Chỗ chạm nhau phải giải (minh hoạ)",
      x: { from: 0, to: 21, step: 1 },
      params: [{ id: "c", label: "Thay đổi chạm vùng chung của nhánh chính mỗi ngày", min: 1, max: 5, step: 1, value: 2, unit: "chỗ" }],
      series: [
        { label: "Một lần gộp sau x ngày", expr: "x * c * (1 + x / 7)" },
        { label: "Mỗi lần khi gộp hằng ngày", expr: "c" },
      ],
    },
  ],

  "co-tinh-nang": [
    {
      type: "exercise",
      language: "javascript",
      title: "Bật cờ cho một phần người dùng, không đổi ý giữa chừng",
      task:
        "Cờ được bật theo phần trăm người dùng, dựa vào số cuối của mã người dùng (mã chia dư cho 100). Mã đang so thẳng mã người dùng với tỷ lệ nên người có mã lớn hơn 100 không bao giờ được bật. Sửa lại, rồi xem ở 30% và 50% có bao nhiêu người thấy tính năng, và người đã thấy ở 30% có còn thấy ở 50% không.",
      starter: `const ids = [5, 17, 28, 30, 41, 99, 105, 264, 317];

function batCho(id, pct) {
  return id < pct; // TODO: dùng phần dư của id khi chia cho 100
}

const a = ids.filter((id) => batCho(id, 30));
const b = ids.filter((id) => batCho(id, 50));
const giu = a.every((id) => b.includes(id));

console.log("Bật 30%: " + a.length + " người");
console.log("Bật 50%: " + b.length + " người");
console.log("Giữ nguyên người đã thấy: " + (giu ? "có" : "không"));
`,
      solution: `const ids = [5, 17, 28, 30, 41, 99, 105, 264, 317];

function batCho(id, pct) {
  return id % 100 < pct;
}

const a = ids.filter((id) => batCho(id, 30));
const b = ids.filter((id) => batCho(id, 50));
const giu = a.every((id) => b.includes(id));

console.log("Bật 30%: " + a.length + " người");
console.log("Bật 50%: " + b.length + " người");
console.log("Giữ nguyên người đã thấy: " + (giu ? "có" : "không"));
`,
      expectedOutput: `Bật 30%: 5 người
Bật 50%: 7 người
Giữ nguyên người đã thấy: có`,
      hints: [
        "Toán tử % cho phần dư: 105 % 100 là 5.",
        "Cùng một người luôn rơi vào cùng một ô từ 0 đến 99, nên nâng tỷ lệ chỉ thêm người chứ không đổi người đã thấy.",
        "Hệ thống thật thường băm mã người dùng thay vì lấy số cuối, nhưng nguyên tắc giữ người ở yên một ô là như nhau.",
      ],
    },
    {
      type: "flow",
      title: "Một tính năng đi từ lúc viết xong tới lúc xoá cờ",
      steps: [
        { label: "Mã vào nhánh chính, cờ tắt", detail: "Thay đổi được gộp ngay khi xong, với cờ mặc định tắt. Nhánh không sống lâu, và mã chưa chạm tới người dùng nào." },
        { label: "Triển khai lên máy chủ", detail: "Mã chạy trong môi trường thật, chịu tải thật, nhưng đường đi mới chưa ai đi vào. Một lần triển khai thường, không kèm quyết định sản phẩm." },
        { label: "Bật cho nội bộ", detail: "Đội mình dùng thử trên dữ liệu thật trước khi ai ngoài đội thấy. Lỗi hiện ra khi người bị ảnh hưởng là đồng nghiệp." },
        { label: "Tăng dần theo tỷ lệ", detail: "Từ vài phần trăm lên nhiều hơn, mỗi nấc chờ xem chỉ số chính. Phát hành là đổi một giá trị cấu hình, không phải triển khai lại." },
        { label: "Có vấn đề thì tắt cờ", detail: "Đổi giá trị về tắt, vài giây là hết ảnh hưởng và các thay đổi khác trong cùng bản vẫn chạy bình thường." },
        { label: "Xoá cờ đúng ngày hẹn", detail: "Khi đã bật hết và ổn, xoá cờ cùng nhánh mã cũ. Ngày xoá được ghi từ lúc tạo cờ, nếu không nó thành một nhánh rẽ vĩnh viễn." },
      ],
    },
  ],

  "trien-khai-khong-gian-doan": [
    {
      type: "exercise",
      language: "javascript",
      title: "Số liệu nói tiếp tục hay quay lui",
      task:
        "Bản mới nhận 400 trong số 4400 yêu cầu, bản cũ nhận 4000. Quy ước của đội: nếu tỷ lệ lỗi bản mới vượt gấp đôi bản cũ thì quay lui. Hàm tiLe đang trả về số lỗi thay vì tỷ lệ nên quyết định bị lệch. Sửa để mỗi bản in đúng tỷ lệ lỗi và quyết định.",
      starter: `const cu = { yeuCau: 4000, loi: 12 };
const moi = { yeuCau: 400, loi: 6 };

function tiLe(nhom) {
  return nhom.loi; // TODO: tỷ lệ lỗi = lỗi chia cho số yêu cầu
}

const a = tiLe(cu);
const b = tiLe(moi);

console.log("Bản cũ: " + (a * 100).toFixed(2) + "%");
console.log("Bản mới: " + (b * 100).toFixed(2) + "%");
console.log("Quyết định: " + (b <= a * 2 ? "tiếp tục tăng lưu lượng" : "quay lui"));
`,
      solution: `const cu = { yeuCau: 4000, loi: 12 };
const moi = { yeuCau: 400, loi: 6 };

function tiLe(nhom) {
  return nhom.loi / nhom.yeuCau;
}

const a = tiLe(cu);
const b = tiLe(moi);

console.log("Bản cũ: " + (a * 100).toFixed(2) + "%");
console.log("Bản mới: " + (b * 100).toFixed(2) + "%");
console.log("Quyết định: " + (b <= a * 2 ? "tiếp tục tăng lưu lượng" : "quay lui"));
`,
      expectedOutput: `Bản cũ: 0.30%
Bản mới: 1.50%
Quyết định: quay lui`,
      hints: [
        "So số lỗi thô giữa hai nhóm không có nghĩa khi hai nhóm có số yêu cầu khác nhau: 6 lỗi trên 400 yêu cầu khác xa 12 lỗi trên 4000.",
        "Tỷ lệ là nhom.loi / nhom.yeuCau.",
      ],
    },
    {
      type: "chart",
      title: "Lỗi cộng dồn: một phần lưu lượng so với tất cả",
      caption:
        "Số liệu minh hoạ, không phải đo thật: giả sử hệ thống nhận 1000 yêu cầu mỗi phút và bản mới làm hỏng 20% số yêu cầu nó nhận. Kéo tỷ lệ lưu lượng ban đầu để thấy thiệt hại dừng ở nhóm nhỏ nếu bạn phát hiện và chuyển về kịp.",
      kind: "line",
      xLabel: "Phút kể từ lúc đưa bản mới lên",
      yLabel: "Yêu cầu hỏng cộng dồn (minh hoạ)",
      x: { from: 0, to: 15, step: 1 },
      params: [{ id: "p", label: "Tỷ lệ lưu lượng cho bản mới ban đầu", min: 5, max: 50, step: 5, value: 10, unit: "%" }],
      series: [
        { label: "Đưa lên từng phần", expr: "x * 1000 * (p / 100) * 0.2" },
        { label: "Thay hết một lần", expr: "x * 1000 * 0.2" },
      ],
    },
  ],

  "di-tru-du-lieu-khi-trien-khai": [
    {
      type: "exercise",
      language: "python",
      title: "Điền cột mới trước khi chuyển đường đọc",
      task:
        "Bạn đang tách cột ho_ten thành cột ten mới, theo bốn bước của bài. Hai hàng đã được mã mới ghi cả hai cột, hai hàng cũ thì chưa có cột ten. Viết bước chuyển dữ liệu cũ: với mỗi hàng thiếu ten, lấy từ cuối cùng của ho_ten. Chỉ sau đó mới an toàn để đọc từ cột mới.",
      starter: `hang = [
    {"id": 1, "ho_ten": "Lan Anh"},
    {"id": 2, "ho_ten": "Minh Tuấn", "ten": "Tuấn"},
    {"id": 3, "ho_ten": "Bảo Châu"},
    {"id": 4, "ho_ten": "Quốc Việt", "ten": "Việt"},
]

def dem_thieu(ds):
    return sum(1 for h in ds if "ten" not in h)

print("Thiếu cột mới trước khi chuyển:", dem_thieu(hang))

for h in hang:
    # TODO: nếu hàng chưa có "ten" thì điền từ từ cuối của ho_ten
    pass

print("Thiếu sau khi chuyển:", dem_thieu(hang))
print("Đọc từ cột mới: id 1 ->", hang[0].get("ten"))
`,
      solution: `hang = [
    {"id": 1, "ho_ten": "Lan Anh"},
    {"id": 2, "ho_ten": "Minh Tuấn", "ten": "Tuấn"},
    {"id": 3, "ho_ten": "Bảo Châu"},
    {"id": 4, "ho_ten": "Quốc Việt", "ten": "Việt"},
]

def dem_thieu(ds):
    return sum(1 for h in ds if "ten" not in h)

print("Thiếu cột mới trước khi chuyển:", dem_thieu(hang))

for h in hang:
    if "ten" not in h:
        h["ten"] = h["ho_ten"].split()[-1]

print("Thiếu sau khi chuyển:", dem_thieu(hang))
print("Đọc từ cột mới: id 1 ->", hang[0].get("ten"))
`,
      expectedOutput: `Thiếu cột mới trước khi chuyển: 2
Thiếu sau khi chuyển: 0
Đọc từ cột mới: id 1 -> Anh`,
      hints: [
        "h[\"ho_ten\"].split()[-1] lấy từ cuối cùng của họ tên.",
        "Không xoá ho_ten: ở bước này mã cũ vẫn đọc nó, và xoá là một lần triển khai riêng.",
      ],
    },
    {
      type: "flow",
      title: "Tách cột họ tên mà luôn lui được",
      steps: [
        { label: "Thêm cột ten, giữ ho_ten", detail: "Cột mới rỗng nằm cạnh cột cũ. Lui về bản trước vẫn chạy được vì không ai xoá gì, nên đây là bước rẻ nhất." },
        { label: "Ghi cả hai cột", detail: "Mã mới ghi ho_ten lẫn ten, mã cũ chỉ ghi ho_ten. Hàng mới tạo từ giờ luôn đủ hai cột, còn hàng cũ thì chưa." },
        { label: "Điền cho hàng cũ", detail: "Chạy việc điền ten cho mọi hàng thiếu, rồi đếm lại xem còn hàng nào trống. Phải về không trước khi đọc từ cột mới." },
        { label: "Chuyển đường đọc", detail: "Mã đọc từ ten, theo dõi tỷ lệ lỗi và dữ liệu lệch. Đổi ý thì chuyển về đọc ho_ten, vì nó vẫn còn nguyên và vẫn đang được ghi." },
        { label: "Ngừng ghi, rồi mới xoá", detail: "Ngừng ghi ho_ten ở một lần triển khai, xoá nó ở lần sau nữa. Chỉ bước cuối này mới không lui được, và nó đứng một mình." },
      ],
    },
  ],

  "quan-sat-he-thong-dang-chay": [
    {
      type: "exercise",
      language: "javascript",
      title: "Trung bình nói một đằng, phân vị nói một nẻo",
      task:
        "Mười yêu cầu đo được độ trễ như trong mã, trong đó có một yêu cầu bị kẹt. Viết hàm phanVi(mang, p) trả về phân vị theo cách xếp hạng gần nhất: sắp xếp tăng dần rồi lấy phần tử thứ ceil(p/100 × n). Mã đang trả về trung bình cho mọi phân vị; sửa để p50 phản ánh người dùng điển hình và p95 phản ánh yêu cầu chậm.",
      starter: `const doTre = [120, 110, 130, 125, 115, 118, 122, 128, 119, 2400];

function phanVi(mang, p) {
  // TODO: sắp xếp tăng dần (sort cần hàm so sánh số) rồi lấy phần tử xếp hạng p%
  return mang.reduce((t, x) => t + x, 0) / mang.length;
}

const tb = doTre.reduce((t, x) => t + x, 0) / doTre.length;
console.log("Trung bình: " + tb + " ms");
console.log("p50: " + phanVi(doTre, 50) + " ms");
console.log("p95: " + phanVi(doTre, 95) + " ms");
`,
      solution: `const doTre = [120, 110, 130, 125, 115, 118, 122, 128, 119, 2400];

function phanVi(mang, p) {
  const s = [...mang].sort((a, b) => a - b);
  return s[Math.ceil((p / 100) * s.length) - 1];
}

const tb = doTre.reduce((t, x) => t + x, 0) / doTre.length;
console.log("Trung bình: " + tb + " ms");
console.log("p50: " + phanVi(doTre, 50) + " ms");
console.log("p95: " + phanVi(doTre, 95) + " ms");
`,
      expectedOutput: `Trung bình: 348.7 ms
p50: 120 ms
p95: 2400 ms`,
      hints: [
        "sort() không có tham số sắp xếp theo chuỗi; dùng sort((a, b) => a - b) để sắp xếp theo số.",
        "Chỉ số mảng là Math.ceil((p / 100) * s.length) - 1 vì mảng đếm từ 0.",
        "Trung bình 348.7 ms không khớp với bất kỳ yêu cầu nào: chín yêu cầu quanh 120 ms và một yêu cầu 2400 ms.",
      ],
    },
    {
      type: "feynman",
      title: "Ba loại tín hiệu, nhìn như bệnh viện",
      intro:
        "Hệ thống đang chạy giống một bệnh nhân nằm viện: bạn không mở ra xem bên trong, mà đọc những gì nó để lại. Mỗi loại ghi chép trả lời một câu hỏi khác.",
      columns: ["Tín hiệu", "Trong bệnh viện", "Trong hệ thống"],
      rows: [
        ["Chỉ số", "Bảng theo dõi cạnh giường: nhịp tim, nhiệt độ theo thời gian", "Số đơn thành công mỗi phút. Trả lời có gì lệch khỏi bình thường không"],
        ["Nhật ký", "Bệnh án ghi từng lần khám cùng hoàn cảnh lúc đó", "Dòng sự kiện của đúng một yêu cầu. Trả lời chuyện gì đã xảy ra với nó"],
        ["Vết", "Lộ trình bệnh nhân đi qua các khoa và thời gian ở mỗi nơi", "Một yêu cầu đi qua nhiều dịch vụ. Trả lời thời gian đã đi đâu"],
      ],
      oneLiner: "Chỉ số cho biết có chuyện, nhật ký cho biết chuyện gì, vết cho biết chậm ở đâu, và không loại nào làm thay việc của loại khác.",
    },
  ],

  "canh-bao-va-truc-he-thong": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Danh sách cảnh báo do một trợ lý đề xuất",
      task:
        "Bạn nhờ một trợ lý soạn danh sách cảnh báo cho dịch vụ đặt hàng. Mỗi dòng đều nghe hợp lý, nhưng một số sẽ đánh thức người trực vì những chuyện không cần làm gì. Bấm các dòng đi ngược hai câu hỏi của bài (có ai bị ảnh hưởng không, có việc cụ thể để làm ngay không) rồi nộp.",
      segments: [
        { text: "Gọi người trực khi tỷ lệ đặt hàng thành công tụt dưới ngưỡng trong mười phút, kèm hướng dẫn xử lý ngắn trong nội dung cảnh báo." },
        {
          text: "Gọi người trực ngay khi bộ xử lý vượt tám mươi phần trăm, vì đây là dấu hiệu sắp sập.",
          error: "Mức dùng bộ xử lý cao có thể vô hại, và hệ thống có thể hỏng mà bộ xử lý vẫn bình thường. Đây là cảnh báo theo nguyên nhân: hay kêu khi không ai bị ảnh hưởng.",
        },
        { text: "Khi đĩa đầy tới bảy mươi phần trăm, tạo việc trong hàng đợi để xử lý trong giờ làm, chưa cần gọi ai." },
        {
          text: "Gọi điện mỗi lần có một dòng lỗi bất kỳ trong nhật ký, để không bỏ sót chuyện gì.",
          error: "Phần lớn dòng lỗi không làm ai bị ảnh hưởng và không có việc nào để làm. Người trực bị gọi ba lần một đêm sẽ không còn tỉnh táo cho lần thật.",
        },
        {
          text: "Cảnh báo mới thì cứ thêm thoải mái, vì càng nhiều cảnh báo thì hệ thống càng an toàn.",
          error: "Khả năng phản ứng của người là hữu hạn. Mỗi cảnh báo thêm vào phải đáng một lần đánh thức, và số lượng nhiều làm cảnh báo thật chìm đi.",
        },
        { text: "Mỗi quý rà soát danh sách và xoá những cảnh báo chưa từng dẫn tới hành động nào." },
      ],
    },
    {
      type: "flow",
      title: "Một tín hiệu đi tới đâu thì được phép đánh thức người",
      steps: [
        { label: "Tín hiệu vượt ngưỡng", detail: "Ví dụ tỷ lệ đặt hàng thành công tụt từ 98% xuống 90% (số minh hoạ). Chưa gọi ai, mới chỉ là một con số bất thường." },
        { label: "Hỏi: có ai đang bị ảnh hưởng?", detail: "Đơn thật đang thất bại thì có, còn bộ xử lý hơi cao mà đơn vẫn qua thì chưa. Chưa ai bị ảnh hưởng thì việc này chờ tới sáng được." },
        { label: "Hỏi: có việc làm ngay không?", detail: "Có bản vừa triển khai để quay lui, có cờ để tắt thì có. Nếu chỉ để nhìn một con số thì đánh thức người là phí." },
        { label: "Chọn kênh theo mức gấp", detail: "Gấp và có việc cụ thể thì gọi người trực. Không gấp thì tạo việc trong hàng đợi, đọc trong giờ làm." },
        { label: "Nội dung cảnh báo kèm hướng dẫn", detail: "Ghi triệu chứng, nơi xem biểu đồ, và hai ba bước đầu nên thử. Người ngái ngủ lúc ba giờ sáng không nên phải nhớ ra." },
        { label: "Rà soát định kỳ", detail: "Cảnh báo nào chưa từng dẫn tới hành động thì xoá. Danh sách ngắn thì mỗi tiếng chuông còn nghĩa." },
      ],
    },
  ],

  "xu-ly-su-co": [
    {
      type: "scenario",
      title: "Mười bốn giờ năm phút, đơn hàng đang hỏng",
      start: "s1",
      nodes: {
        s1: {
          text: "Cảnh báo kêu: 40% đơn đặt hàng thất bại, bắt đầu ngay sau bản triển khai lúc 14 giờ. Bạn là người trực và vừa liếc thấy một dòng nhật ký đáng ngờ. Bạn gần như chắc lỗi nằm ở đâu.",
          choices: [
            { label: "Tắt cờ của thay đổi vừa phát hành, điều tra sau khi hồi phục", next: "s2" },
            { label: "Viết bản vá ngay vì đã biết chắc lỗi ở đâu và triển khai nó", next: "bad_patch" },
          ],
        },
        bad_patch: {
          text: "Bản vá viết vội chưa qua kiểm thử, và nó chạm thêm một đường khác khiến thanh toán cũng lỗi. Sự cố kéo từ 6 phút thành gần 50 phút, và giờ có hai lỗi chồng lên nhau.",
          ending: "bad",
        },
        s2: {
          text: "Sau 4 phút tỷ lệ đặt hàng thành công về bình thường. Cả đội đang chờ cập nhật, và còn khách hỏi vì sao đơn của họ không thành công.",
          choices: [
            { label: "Ghi dòng thời gian, những gì đã thử, và báo bên ngoài đội", next: "good" },
            { label: "Đóng phiên cho mọi người nghỉ rồi hôm sau mới nhớ lại", next: "bad_close" },
          ],
        },
        bad_close: {
          text: "Hôm sau không ai nhớ chính xác phút nào làm gì, nhật ký lệnh đã bị đẩy mất, và bộ phận chăm sóc khách hàng vẫn chưa biết nên trả lời gì. Buổi phân tích sau sự cố phải dựng lại từ trí nhớ.",
          ending: "bad",
        },
        good: {
          text: "Người điều phối giữ dòng thời gian, người liên lạc báo cho bên chăm sóc khách hàng, và nguyên nhân được điều tra bình tĩnh vào buổi chiều, trên dịch vụ đã khôi phục.",
          ending: "good",
        },
      },
    },
    {
      type: "chart",
      title: "Khôi phục trước hay điều tra trước",
      caption:
        "Số liệu minh hoạ, không phải đo thật: giả sử mỗi phút có 50 người dùng bị ảnh hưởng. Kéo thời gian khôi phục và thời gian điều tra để thấy người bị ảnh hưởng dừng tăng ngay khi dịch vụ hồi phục, bất kể bạn hiểu nguyên nhân chưa.",
      kind: "line",
      xLabel: "Phút kể từ lúc sự cố bắt đầu",
      yLabel: "Người bị ảnh hưởng cộng dồn (minh hoạ)",
      x: { from: 0, to: 120, step: 10 },
      params: [
        { id: "r", label: "Thời gian khôi phục (quay lui, tắt cờ)", min: 5, max: 30, step: 5, value: 10, unit: "phút" },
        { id: "i", label: "Thời gian tìm ra nguyên nhân", min: 30, max: 120, step: 30, value: 60, unit: "phút" },
      ],
      series: [
        { label: "Khôi phục trước", expr: "50 * min(x, r)" },
        { label: "Điều tra trước", expr: "50 * min(x, i)" },
      ],
    },
  ],

  "hau-su-co-khong-do-loi": [
    {
      type: "exercise",
      language: "python",
      title: "Hành động nào thật sự sẽ xảy ra",
      task:
        "Buổi phân tích sau sự cố ghi ra bốn hành động. Theo bài, hành động chỉ tính khi có tên một người và một ngày hạn. Mã đang chỉ kiểm có nội dung công việc nên coi cả bốn là hợp lệ. Sửa để mã in ra những dòng bị loại và số hành động hợp lệ.",
      starter: `hanh_dong = [
    {"viec": "Thêm bước hỏi lại trước khi xoá", "nguoi": "Hà", "han": "2026-11-02"},
    {"viec": "Cẩn thận hơn khi thao tác", "nguoi": "", "han": ""},
    {"viec": "Giới hạn phạm vi lệnh xoá theo môi trường", "nguoi": "Nam", "han": ""},
    {"viec": "Đo thời gian khôi phục từ bản sao lưu", "nguoi": "Linh", "han": "2026-11-09"},
]

hop_le = 0
for h in hanh_dong:
    if h["viec"]:  # TODO: hợp lệ khi có cả người lẫn hạn
        hop_le += 1
    else:
        print("Loại:", h["viec"])

print("Hợp lệ:", hop_le, "/", len(hanh_dong))
`,
      solution: `hanh_dong = [
    {"viec": "Thêm bước hỏi lại trước khi xoá", "nguoi": "Hà", "han": "2026-11-02"},
    {"viec": "Cẩn thận hơn khi thao tác", "nguoi": "", "han": ""},
    {"viec": "Giới hạn phạm vi lệnh xoá theo môi trường", "nguoi": "Nam", "han": ""},
    {"viec": "Đo thời gian khôi phục từ bản sao lưu", "nguoi": "Linh", "han": "2026-11-09"},
]

hop_le = 0
for h in hanh_dong:
    if h["nguoi"] and h["han"]:
        hop_le += 1
    else:
        print("Loại:", h["viec"])

print("Hợp lệ:", hop_le, "/", len(hanh_dong))
`,
      expectedOutput: `Loại: Cẩn thận hơn khi thao tác
Loại: Giới hạn phạm vi lệnh xoá theo môi trường
Hợp lệ: 2 / 4`,
      hints: [
        "Chuỗi rỗng trong Python được coi là sai, nên if h[\"nguoi\"] and h[\"han\"] đòi cả hai đều có chữ.",
        "Dòng Cẩn thận hơn khi thao tác bị loại cả vì thiếu người lẫn hạn, và cả vì nó không đổi được xác suất của lỗi nào.",
      ],
    },
    {
      type: "feynman",
      title: "Cầu dao điện và câu hỏi sau sự cố",
      intro:
        "Nhà bạn có người cắm nhầm ổ điện và bị giật. Nhắc cả nhà cẩn thận hơn thì lần sau vẫn có người nhầm. Lắp cầu dao tự ngắt mới đổi được kết cục.",
      columns: ["Tình huống", "Hỏi ai làm", "Hỏi vì sao được phép"],
      rows: [
        ["Lệnh xoá chạy nhầm cửa sổ", "Ai gõ lệnh? Nhắc người đó đọc kỹ hơn", "Vì sao hai cửa sổ trông giống nhau và lệnh xoá không hỏi lại?"],
        ["Người trong đội thấy một sự cố suýt xảy ra", "Im lặng, vì báo ra có thể bị quy lỗi", "Báo sớm, vì biên bản chỉ ra thay đổi cần làm chứ không chỉ người"],
        ["Cuối buổi họp", "Biên bản ghi một người đã sai", "Danh sách thay đổi, mỗi mục có tên và hạn"],
      ],
      oneLiner: "Con người sẽ nhầm, nên điều đáng sửa là hệ thống để cú nhầm đó không còn gây ra sự cố.",
    },
  ],

  "no-ky-thuat": [
    {
      type: "scenario",
      title: "Hai tuần trước mốc ra mắt",
      start: "s1",
      nodes: {
        s1: {
          text: "Mốc ra mắt còn hai tuần và phần tính giá chưa xong. Bạn có cách viết tạm chạy được ngay, nhưng sẽ khó mở rộng. Đội đồng ý làm tạm để kịp mốc.",
          choices: [
            { label: "Viết bản tạm, ghi vào danh sách việc kèm lý do và điều kiện dọn", next: "s2" },
            { label: "Viết bản tạm, định bụng sẽ nhớ để quay lại dọn sau", next: "bad_unrecorded" },
          ],
        },
        bad_unrecorded: {
          text: "Sáu tháng sau có người mới vào đội, nhìn đoạn mã tạm và tưởng đó là cách chuẩn nên viết thêm ba tính năng dựa trên nó. Khoản vay ban đầu sinh thêm ba khoản vay, và không ai nhớ rằng nó từng là tạm.",
          ending: "bad",
        },
        s2: {
          text: "Sáu tháng sau, vùng tính giá bị sửa mỗi tuần, và mỗi lần sửa tốn thêm vài giờ đọc và kiểm chứng. Khoản vay vẫn nằm trong danh sách, và đã đến lúc xếp việc dọn.",
          choices: [
            { label: "Xếp dọn đúng vùng tính giá, đo thời gian mỗi lần sửa trước sau", next: "good" },
            { label: "Dành một tháng dọn khắp kho mã vì chỗ nào cũng khó chịu", next: "bad_everywhere" },
          ],
        },
        bad_everywhere: {
          text: "Một tháng trôi qua mà không tính năng mới nào ra mắt. Phần lớn mã được dọn là vùng ít ai sửa nên lãi ở đó gần như bằng không, còn vùng tính giá vẫn chậm và không ai chứng minh được tháng ấy đáng giá.",
          ending: "bad",
        },
        good: {
          text: "Mỗi lần sửa vùng tính giá giờ mất ít giờ hơn và đội có con số để chứng minh việc dọn đáng giá. Lần sau người ta xếp việc trả nợ cạnh tính năng mới mà không phải cãi.",
          ending: "good",
        },
      },
    },
    {
      type: "chart",
      title: "Khi nào trả nợ rẻ hơn trả lãi",
      caption:
        "Số liệu minh hoạ, không phải đo thật: giả sử dọn một vùng mã tốn 40 giờ một lần, còn để lại thì mỗi lần sửa vùng đó tốn thêm một số giờ. Kéo hai thanh trượt để thấy điểm hoà vốn dịch chuyển ra sao.",
      kind: "line",
      xLabel: "Tháng kể từ bây giờ",
      yLabel: "Giờ làm việc cộng dồn (minh hoạ)",
      x: { from: 0, to: 12, step: 1 },
      params: [
        { id: "h", label: "Giờ tốn thêm mỗi lần sửa vùng này", min: 1, max: 6, step: 1, value: 3, unit: "giờ" },
        { id: "n", label: "Số lần sửa vùng này mỗi tháng", min: 1, max: 8, step: 1, value: 4, unit: "lần" },
      ],
      series: [
        { label: "Để lại, trả lãi mỗi tháng", expr: "x * h * n" },
        { label: "Dọn một lần (giả định 40 giờ)", expr: "40" },
      ],
    },
  ],

  "tai-lieu-va-ban-giao-hieu-biet": [
    {
      type: "aiLab",
      mode: "prompt",
      title: "Nhờ AI soạn ghi chú quyết định cho người sau",
      task:
        "Đội vừa chọn dùng hàng đợi thay vì gọi trực tiếp giữa hai dịch vụ. Bạn nhờ AI soạn ghi chú để sáu tháng sau người lạ đọc vẫn hiểu. Chọn từng phần của yêu cầu để ghi chú trả lời được câu hỏi vì sao.",
      parts: [
        {
          id: "noi-dung",
          label: "Ghi chú nên chứa gì",
          options: [
            {
              text: "Vì sao chọn cách này, phương án đã loại và điều kiện để xem xét lại",
              good: true,
              feedback: "Đây là thứ mã không tự nói ra. Người đọc sau cần đúng ba thứ này để biết có nên đổi hay không.",
            },
            {
              text: "Mô tả từng bước mã đang làm, theo thứ tự các hàm được gọi",
              feedback: "Mã đã nói chính xác điều này. Đoạn mô tả lặp lại sẽ lỗi thời trong một tuần mà không ai nhận ra.",
            },
            {
              text: "Ghi ngắn rằng cả nhóm đã thống nhất dùng hàng đợi",
              feedback: "Biết là đã thống nhất không giúp ai quyết định đổi hay giữ, vì lý do và điều kiện đều vắng.",
            },
          ],
        },
        {
          id: "vi-tri",
          label: "Đặt ghi chú ở đâu",
          options: [
            {
              text: "Ngay cạnh mã, trong cùng thay đổi nên được rà soát cùng",
              good: true,
              feedback: "Ghi chú đi cùng mã nên khi mã đổi, người rà soát nhìn thấy nó và bị nhắc sửa theo.",
            },
            {
              text: "Một trang wiki chung của cả công ty để mọi người tìm được",
              feedback: "Hệ thống tách riêng thì lệch dần khỏi mã, và không ai phải sửa nó khi mã đổi.",
            },
            {
              text: "Tin nhắn ghim trong kênh chat của đội, tìm lại bằng ô tìm kiếm",
              feedback: "Tin nhắn trôi mất theo thời gian và người mới vào đội không biết đi tìm ở đó.",
            },
          ],
        },
        {
          id: "cap-nhat",
          label: "Khi quyết định đã đổi",
          options: [
            {
              text: "Đánh dấu bản cũ là lịch sử và trỏ tới bản mới",
              good: true,
              feedback: "Người đọc biết cái nào còn đúng, và vẫn thấy được lý do cũ để không lặp lại sai lầm cũ.",
            },
            {
              text: "Xoá bản cũ cho gọn",
              feedback: "Mất luôn phần giải thích vì sao cách cũ không còn hợp, và người sau dễ đề xuất lại đúng cách đó.",
            },
            {
              text: "Để nguyên cả hai, ai đọc sẽ tự đoán được bản nào mới hơn",
              feedback: "Một trang sai nằm cạnh trang đúng dẫn người đọc đi lạc, và họ tin vì nó nằm ở chỗ đáng tin.",
            },
          ],
        },
      ],
      responses: [
        {
          requires: ["noi-dung", "vi-tri", "cap-nhat"],
          text: "Ghi chú nằm cạnh mã, nêu rõ vì sao dùng hàng đợi, phương án gọi trực tiếp đã loại vì sao, và điều kiện xem xét lại là khi lưu lượng giảm đủ thấp. Bản cũ được đánh dấu lịch sử. Sáu tháng sau người lạ đọc vẫn quyết được có đổi hay không.",
        },
        {
          requires: ["noi-dung", "vi-tri"],
          text: "Nội dung đúng và nằm cạnh mã, nhưng khi quyết định đổi sau này, bản cũ bị để lẫn hoặc xoá mất. Người đọc phải đoán trang nào còn hiệu lực.",
        },
        {
          text: "Ghi chú dài nhưng chủ yếu chép lại những gì mã đã nói, nằm ở chỗ ít ai mở. Sáu tháng sau nó lệch khỏi mã, và người đọc tin nó nhầm hoặc bỏ qua hoàn toàn.",
        },
      ],
    },
    {
      type: "flow",
      title: "Một quyết định đi vào tài liệu sống được lâu",
      steps: [
        { label: "Quyết định được đưa ra", detail: "Đội chọn hàng đợi thay vì gọi trực tiếp. Lúc này mọi người nhớ lý do, và sáu tháng sau thì không ai nhớ." },
        { label: "Viết ba dòng", detail: "Bối cảnh lúc đó, phương án đã loại cùng lý do, và điều kiện nào thì nên xem xét lại. Không cần dài, cần đúng ba thứ này." },
        { label: "Đặt cạnh mã", detail: "Một tệp ngắn ngay cạnh phần mã nó giải thích, nằm trong cùng thay đổi. Nó không sống ở một hệ thống riêng để lệch dần." },
        { label: "Rà soát cùng mã", detail: "Người rà soát đọc cả ghi chú. Mã đổi mà ghi chú không đổi thì bình luận chặn xuất hiện đúng lúc." },
        { label: "Sáu tháng sau", detail: "Người mới đọc mã thấy kỳ lạ, mở tệp cạnh nó và biết ngay vì sao. Họ khỏi phải đoán, và khỏi phải xoá nhầm một phần chủ ý." },
        { label: "Khi điều kiện đổi", detail: "Viết ghi chú mới, đánh dấu ghi chú cũ là lịch sử. Không xoá, không để hai bản cùng đứng như đang đúng." },
      ],
    },
  ],

  "on-tap-tu-ma-nguon-toi-nguoi-dung": [
    {
      type: "scenario",
      title: "Chiều thứ Sáu, một thay đổi đã qua mọi cổng",
      start: "s1",
      nodes: {
        s1: {
          text: "Thay đổi cách tính phí vận chuyển đã qua kiểm thử, được rà soát, và nằm sau một cái cờ. Bây giờ là 16 giờ chiều thứ Sáu và bạn muốn đưa nó ra.",
          choices: [
            { label: "Đưa cho 5% người dùng, so tỷ lệ lỗi và độ trễ hai bản", next: "s2" },
            { label: "Đưa cho tất cả luôn vì nó đã qua mọi cổng tự động", next: "bad_all" },
          ],
        },
        bad_all: {
          text: "Một trường hợp địa chỉ nước ngoài mà kiểm thử không phủ làm phí vận chuyển ra 0 đồng cho một số đơn. Cả hệ thống nhận bản mới, và cuối tuần bạn mất hai ngày hoàn tác đơn hàng.",
          ending: "bad",
        },
        s2: {
          text: "Một giờ sau, nhóm 5% có tỷ lệ lỗi gấp ba nhóm còn lại. Bạn chưa biết vì sao, và chiều thứ Sáu đang hết dần.",
          choices: [
            { label: "Tắt cờ cho nhóm đó, rồi mới xem nhật ký để tìm lý do", next: "s3" },
            { label: "Giữ nguyên 5% chạy tiếp để thu thêm dữ liệu rồi mới quyết", next: "bad_wait" },
          ],
        },
        bad_wait: {
          text: "Trong hai giờ chờ, nhóm 5% vẫn gặp lỗi và vài khách đã bỏ giỏ hàng. Bạn có thêm dữ liệu nhưng người dùng phải trả giá cho việc thu nó, và phần còn lại của tuần vẫn không nhẹ hơn.",
          ending: "bad",
        },
        s3: {
          text: "Cờ tắt, tỷ lệ lỗi về bình thường trong vài giây. Nguyên nhân là phí cần một cột mới lưu quốc gia nhận hàng. Bạn định thêm cột cho thay đổi tiếp theo.",
          choices: [
            { label: "Thêm cột mới bên cạnh cột cũ, ghi cả hai, chuyển đọc sau", next: "good" },
            { label: "Đổi tên cột cũ ngay trong lần triển khai đó cho gọn", next: "bad_rename" },
          ],
        },
        bad_rename: {
          text: "Lần triển khai gặp lỗi và bạn quay lui mã, nhưng cột đã đổi tên nên mã cũ không còn đọc được dữ liệu. Đường lui duy nhất là sửa dữ liệu bằng tay, ngay giữa tối thứ Sáu.",
          ending: "bad",
        },
        good: {
          text: "Từng bước nhỏ lần lượt lên, mỗi bước lui được. Thứ Hai bạn mở bảng theo dõi, thấy nhóm lỗi đã quay về mức cũ, và ghi vào biên bản ba thay đổi đã học được từ chiều thứ Sáu.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Một dòng mã đi tới người dùng, rồi quay lại với bạn",
      steps: [
        { label: "Dựng", detail: "Mã thành sản phẩm chạy được từ phụ thuộc đã ghim và môi trường khai báo. Cùng một đầu vào cho cùng một kết quả trên máy bạn và máy chủ." },
        { label: "Kiểm", detail: "Kiểm thử nhiều tầng và cổng tự động chạy trên mỗi thay đổi. Rà soát mã để lại những câu hỏi không có luật, ví dụ thay đổi này có hợp với phần còn lại không." },
        { label: "Gộp nhỏ, sau cờ", detail: "Nhánh sống ngắn, thay đổi vào nhánh chính ở trạng thái tắt. Mã đã lên máy chủ nhưng chưa thay đổi gì với người dùng." },
        { label: "Đưa lên từng phần", detail: "Một phần nhỏ lưu lượng đi vào bản mới và hai bản được so bằng số liệu. Dữ liệu đổi cấu trúc thì chia theo bước để đường lui còn nguyên." },
        { label: "Quan sát và cảnh báo", detail: "Chỉ số về việc người dùng làm được, nhật ký, vết. Cảnh báo theo triệu chứng đánh thức người đúng lúc, vì việc đáng thức." },
        { label: "Khôi phục rồi điều tra", detail: "Có sự cố thì quay lui hoặc tắt cờ trước, hiểu nguyên nhân sau. Một người điều phối ghi lại những gì đã thử." },
        { label: "Rút bài học", detail: "Buổi phân tích hỏi vì sao hệ thống cho phép, ra danh sách thay đổi có người và hạn, và vòng này bắt đầu lại với lô nhỏ hơn." },
      ],
    },
  ],

  "do-cai-gi-o-san-pham": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Báo cáo tuần do một trợ lý tóm tắt",
      task:
        "Một trợ lý đọc bảng số liệu và viết báo cáo tuần cho sản phẩm. Số liệu là thật, nhưng một số kết luận nhảy quá xa. Bấm các câu coi một chỉ số hoạt động như bằng chứng của một kết quả, rồi nộp.",
      segments: [
        { text: "Lượt xem trang tăng gấp đôi so với tuần trước, trong khi số người dùng gần như không đổi." },
        {
          text: "Điều này chứng tỏ sản phẩm hấp dẫn hơn và nên đầu tư thêm vào các trang đó.",
          error: "Lượt xem gấp đôi cũng có thể do người dùng phải bấm qua bấm lại mới tìm được thứ cần. Cùng một con số, hai cách đọc cho hành động ngược nhau.",
        },
        { text: "Cần xem thêm số đơn hoàn tất, vì đó là kết quả, còn lượt xem chỉ mô tả hoạt động." },
        {
          text: "Thời gian trên mỗi trang tăng, nên người dùng đang hài lòng hơn.",
          error: "Thời gian trên trang tăng có thể là người đang lạc, không hiểu cách làm. Không có kết quả đi kèm thì không biết đó là tốt hay xấu.",
        },
        {
          text: "Chỉ số nào tăng đều là tin tốt, nên bảng theo dõi nên giữ tất cả cho đẹp.",
          error: "Nhiều chỉ số tăng được ngay cả khi sản phẩm tệ đi. Một chỉ số không dẫn tới quyết định nào chỉ đang chiếm chỗ trên bảng.",
        },
        { text: "Với mỗi chỉ số, hỏi: nếu nó tăng gấp đôi thì ta sẽ làm gì khác đi?" },
      ],
    },
    {
      type: "flow",
      title: "Chọn một chỉ số đáng lên bảng theo dõi",
      steps: [
        { label: "Gọi tên điều nó thay mặt", detail: "Viết bằng lời: đơn hoàn tất thay mặt cho việc khách mua được hàng. Nếu không viết nổi một câu thì chưa nên đo." },
        { label: "Hoạt động hay kết quả?", detail: "Lượt xem, lượt bấm là hoạt động. Đơn hoàn tất, vấn đề được giải quyết là kết quả, và chỉ cái sau dùng để đánh giá." },
        { label: "Phép thử một câu", detail: "Nếu chỉ số này tăng gấp đôi thì ta làm gì khác? Không trả lời được thì nó không dẫn tới quyết định nào." },
        { label: "Thử đọc theo chiều xấu", detail: "Tìm một lý do sản phẩm tệ đi mà chỉ số vẫn tăng. Tìm được dễ dàng thì chỉ số đó chỉ nên dùng để giải thích." },
        { label: "Lên bảng hoặc bỏ", detail: "Chỉ số kết quả đi lên bảng, chỉ số hoạt động nằm bên dưới làm lời giải thích. Cái nào không qua phép thử thì bỏ." },
      ],
    },
  ],

  "chi-so-phu-phiem": [
    {
      type: "exercise",
      language: "javascript",
      title: "Cộng dồn tăng, người hoạt động thì đang giảm",
      task:
        "Bốn tháng đầu, mỗi tháng có số người đăng ký mới và số người rời đi như trong mã. Người hoạt động tháng này bằng người hoạt động tháng trước cộng người mới trừ người rời đi. Mã đang lấy số đăng ký cộng dồn làm số hoạt động nên không bao giờ thấy được tin xấu. Sửa và in tháng nào số hoạt động giảm.",
      starter: `const moi = [1000, 800, 600, 400];
const roiDi = [0, 300, 700, 900];

let congDon = 0;
let hoatDong = 0;
let truoc = 0;
const giam = [];

for (let i = 0; i < moi.length; i++) {
  congDon += moi[i];
  hoatDong = congDon; // TODO: hoạt động = hoạt động trước + người mới - người rời đi
  if (hoatDong < truoc) giam.push(i + 1);
  truoc = hoatDong;
  console.log("Tháng " + (i + 1) + ": cộng dồn " + congDon + ", hoạt động " + hoatDong);
}
console.log("Hoạt động giảm ở tháng: " + giam.join(", "));
`,
      solution: `const moi = [1000, 800, 600, 400];
const roiDi = [0, 300, 700, 900];

let congDon = 0;
let hoatDong = 0;
let truoc = 0;
const giam = [];

for (let i = 0; i < moi.length; i++) {
  congDon += moi[i];
  hoatDong = hoatDong + moi[i] - roiDi[i];
  if (hoatDong < truoc) giam.push(i + 1);
  truoc = hoatDong;
  console.log("Tháng " + (i + 1) + ": cộng dồn " + congDon + ", hoạt động " + hoatDong);
}
console.log("Hoạt động giảm ở tháng: " + giam.join(", "));
`,
      expectedOutput: `Tháng 1: cộng dồn 1000, hoạt động 1000
Tháng 2: cộng dồn 1800, hoạt động 1500
Tháng 3: cộng dồn 2400, hoạt động 1400
Tháng 4: cộng dồn 2800, hoạt động 900
Hoạt động giảm ở tháng: 3, 4`,
      hints: [
        "Biến hoatDong giữ giá trị của tháng trước giữa các vòng lặp, nên hoatDong = hoatDong + moi[i] - roiDi[i] dùng được ngay.",
        "Số cộng dồn chỉ cộng không bao giờ trừ, nên cột đó không thể giảm. Đó chính là khuyết điểm bài nói tới.",
      ],
    },
    {
      type: "chart",
      title: "Đăng ký cộng dồn che đi người bỏ đi",
      caption:
        "Số liệu minh hoạ, không phải đo thật: giả sử mỗi tháng có 1000 người đăng ký mới và một tỷ lệ cố định rời đi mỗi tháng. Kéo tỷ lệ rời đi để thấy tổng cộng dồn vẫn đi lên thẳng trong khi số người hoạt động chững lại ở một mức thấp.",
      kind: "line",
      xLabel: "Tháng",
      yLabel: "Số người (minh hoạ)",
      x: { from: 0, to: 12, step: 1 },
      params: [{ id: "p", label: "Tỷ lệ người rời đi mỗi tháng", min: 5, max: 50, step: 5, value: 25, unit: "%" }],
      series: [
        { label: "Tổng đăng ký cộng dồn", expr: "1000 * x" },
        { label: "Người còn hoạt động", expr: "1000 * (1 - (1 - p / 100) ^ x) / (p / 100)" },
      ],
    },
  ],

  "phan-tich-theo-nhom-cohort": [
    {
      type: "exercise",
      language: "python",
      title: "So các nhóm ở cùng một mốc ba mươi ngày",
      task:
        "Ba nhóm người dùng bắt đầu ở ba tháng khác nhau. Với mỗi nhóm bạn biết số người bắt đầu và số người còn hoạt động sau 30 ngày. Mã đang in số người còn lại, nên nhóm sau luôn có vẻ tốt hơn vì nó lớn hơn. Sửa để in tỷ lệ giữ lại (làm tròn xuống theo phần trăm) và xem cả hai xu hướng.",
      starter: `nhom = {
    "Tháng 1": (1000, 400),
    "Tháng 2": (2000, 700),
    "Tháng 3": (4000, 1000),
}

ti_le = []
con_lai = []
for ten, (dau, con) in nhom.items():
    r = con // dau  # TODO: tỷ lệ phần trăm = con * 100 // dau
    ti_le.append(r)
    con_lai.append(con)
    print(ten + ":", str(r) + "%")

tang_con = all(con_lai[i] < con_lai[i + 1] for i in range(len(con_lai) - 1))
tang_ti_le = all(ti_le[i] < ti_le[i + 1] for i in range(len(ti_le) - 1))
print("Tổng người còn lại tăng:", "có" if tang_con else "không")
print("Tỷ lệ giữ lại tăng:", "có" if tang_ti_le else "không")
`,
      solution: `nhom = {
    "Tháng 1": (1000, 400),
    "Tháng 2": (2000, 700),
    "Tháng 3": (4000, 1000),
}

ti_le = []
con_lai = []
for ten, (dau, con) in nhom.items():
    r = con * 100 // dau
    ti_le.append(r)
    con_lai.append(con)
    print(ten + ":", str(r) + "%")

tang_con = all(con_lai[i] < con_lai[i + 1] for i in range(len(con_lai) - 1))
tang_ti_le = all(ti_le[i] < ti_le[i + 1] for i in range(len(ti_le) - 1))
print("Tổng người còn lại tăng:", "có" if tang_con else "không")
print("Tỷ lệ giữ lại tăng:", "có" if tang_ti_le else "không")
`,
      expectedOutput: `Tháng 1: 40%
Tháng 2: 35%
Tháng 3: 25%
Tổng người còn lại tăng: có
Tỷ lệ giữ lại tăng: không`,
      hints: [
        "con * 100 // dau nhân trước rồi mới chia nguyên, nếu không kết quả luôn bằng 0.",
        "Tổng người còn lại tăng vì nhóm sau đông hơn, nhưng tỷ lệ giữ lại giảm dần: sản phẩm đang tệ đi.",
      ],
    },
    {
      type: "feynman",
      title: "Số tổng và số theo nhóm, nhìn như trường học",
      intro:
        "Hãy hình dung một trường mở thêm lớp mỗi năm. Số học sinh đang có mặt tăng đều, nhưng điều đó chưa cho biết các khoá sau học tốt hơn hay tệ hơn khoá trước.",
      columns: ["Cách nhìn", "Ví dụ ở trường", "Trong sản phẩm"],
      rows: [
        ["Nhìn tổng", "Đếm mọi học sinh đang có mặt hôm nay", "Số người hoạt động tháng này, tăng được chỉ bằng cách chi thêm quảng cáo"],
        ["Nhìn theo nhóm", "Hỏi từng khoá bao nhiêu phần trăm còn học sau một năm", "Mỗi nhóm bắt đầu cùng tháng, so ở cùng độ tuổi như 30 ngày"],
        ["Khi nào lộ vấn đề", "Trường đông hơn nhờ mở lớp, dù mỗi khoá bỏ học nhiều hơn", "Tổng tăng nhờ người mới trong khi tỷ lệ giữ lại giảm dần"],
      ],
      oneLiner: "Con số tổng lẫn quy mô với chất lượng, còn nhìn theo nhóm tách hai thứ đó ra.",
    },
  ],

  "pheu-va-cho-roi": [
    {
      type: "exercise",
      language: "python",
      title: "Tìm bước làm rơi nhiều người nhất",
      task:
        "Phễu thanh toán có năm bước với số người ở mỗi bước. Với mỗi cặp bước liên tiếp, tính phần trăm người đi tiếp so với bước ngay trước (làm tròn xuống) và tìm cặp giữ lại ít nhất. Mã đang so mọi bước với bước đầu tiên nên cú rơi bị trải đều và cặp tìm ra bị lệch.",
      starter: `buoc = [
    ("Vào trang", 1000),
    ("Xem sản phẩm", 800),
    ("Thêm vào giỏ", 600),
    ("Nhập địa chỉ", 150),
    ("Thanh toán", 120),
]

thap = 101
cap = ""
for i in range(1, len(buoc)):
    ten_truoc, n_truoc = buoc[i - 1]
    ten, n = buoc[i]
    giu = n * 100 // buoc[0][1]  # TODO: so với bước ngay trước, không phải bước đầu
    print(ten_truoc, "->", ten + ": giữ", str(giu) + "%")
    if giu < thap:
        thap = giu
        cap = ten_truoc + " -> " + ten

print("Rơi nhiều nhất:", cap)
`,
      solution: `buoc = [
    ("Vào trang", 1000),
    ("Xem sản phẩm", 800),
    ("Thêm vào giỏ", 600),
    ("Nhập địa chỉ", 150),
    ("Thanh toán", 120),
]

thap = 101
cap = ""
for i in range(1, len(buoc)):
    ten_truoc, n_truoc = buoc[i - 1]
    ten, n = buoc[i]
    giu = n * 100 // n_truoc
    print(ten_truoc, "->", ten + ": giữ", str(giu) + "%")
    if giu < thap:
        thap = giu
        cap = ten_truoc + " -> " + ten

print("Rơi nhiều nhất:", cap)
`,
      expectedOutput: `Vào trang -> Xem sản phẩm: giữ 80%
Xem sản phẩm -> Thêm vào giỏ: giữ 75%
Thêm vào giỏ -> Nhập địa chỉ: giữ 25%
Nhập địa chỉ -> Thanh toán: giữ 80%
Rơi nhiều nhất: Thêm vào giỏ -> Nhập địa chỉ`,
      hints: [
        "Mẫu số là số người ở bước ngay trước, tức n_truoc.",
        "So với bước đầu thì hai bước cuối chỉ chênh vài phần trăm, nên cú rơi thật ở giữa bị che mất.",
      ],
    },
    {
      type: "chart",
      title: "Cùng một phễu, hai thiết bị, hai bức tranh",
      caption:
        "Số liệu minh hoạ, không phải đo thật: cùng 1000 người vào trang ở mỗi thiết bị. Hai phễu giống nhau tới bước thêm vào giỏ, rồi bước nhập địa chỉ làm rơi hầu hết người trên điện thoại. Gộp chung thì cú rơi này chỉ còn là một vết mờ.",
      kind: "bar",
      xLabel: "Bước trong hành trình",
      yLabel: "Số người còn lại (minh hoạ)",
      data: [
        { label: "Vào trang", values: [1000, 1000] },
        { label: "Xem sản phẩm", values: [800, 780] },
        { label: "Thêm vào giỏ", values: [620, 590] },
        { label: "Nhập địa chỉ", values: [500, 150] },
        { label: "Thanh toán", values: [400, 120] },
      ],
      seriesLabels: ["Máy tính", "Điện thoại"],
    },
  ],
};
