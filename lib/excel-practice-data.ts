// Bài tập Excel gõ được ngay trong bài học.
//
// Mỗi bộ bài tập gắn với đúng một bài trong chặng Excel và chỉ dùng những hàm
// mà bài đó đã dạy. Lưới dữ liệu cố ý nhỏ - vừa một màn hình điện thoại - vì
// mục tiêu là gõ đúng công thức chứ không phải cuộn qua dữ liệu.
//
// Ô đích để trống trong `cells`; học viên gõ công thức vào đó và `ExcelPractice`
// chấm bằng bộ máy ở `lib/mini-spreadsheet.ts`. Đáp án được kiểm bằng giá trị
// tính ra, không bằng so chuỗi công thức - nhiều cách viết đúng đều được nhận.
// `mustUse` / `mustAvoid` chỉ dùng khi chính CÁCH viết là nội dung bài học:
// tham chiếu tuyệt đối, cấm số cứng, cấm VLOOKUP.

import { resultsMatch, runQuery, type Database } from "./mini-sql";
import {
  evaluateCell,
  formatValue,
  isError,
  normalizeRef,
  valuesMatch,
  type Sheet,
} from "./mini-spreadsheet";

export type ExcelTask = {
  /** Ô học viên phải điền. */
  target: string;
  prompt: string;
  /** Giá trị đúng. Chuỗi bắt đầu bằng "#" được hiểu là mã lỗi. */
  expect: number | string;
  /** Chuỗi bắt buộc có trong công thức, khi cách viết chính là bài học. */
  mustUse?: { text: string; why: string }[];
  /** Chuỗi bị cấm, kèm lý do hiện ra khi học viên dùng. */
  mustAvoid?: { text: string; why: string }[];
  hint: string;
  /** Ô đích đã có sẵn nội dung SAI mà học viên phải viết lại. Mặc định mọi ô
   *  đích để trống; cờ này bắt lời khai đó phải khớp với dữ liệu thật. */
  prefilled?: true;
  /** Khi bài tập là tìm lỗi trong DỮ LIỆU chứ không trong công thức: công thức
   *  mẫu chỉ ra đúng đáp án sau khi ô này được sửa. Học viên sửa được mọi ô
   *  trên lưới, đúng như trong Excel. */
  dataFix?: { ref: string; value: string };
  /** Công thức mẫu. Được kiểm bằng test là thực sự cho ra `expect` và thực sự
   *  thoả mọi ràng buộc `mustUse`/`mustAvoid` của chính nhiệm vụ đó. */
  solution: string;
  /** Hiện sau khi làm đúng - nói điều mà việc gõ đúng chưa nói. */
  explain: string;
};

export type StepTask = {
  prompt: string;
  /** Các bước theo đúng thứ tự phải xếp. */
  steps: string[];
  explain: string;
};

export type SqlTask = {
  prompt: string;
  /** Truy vấn mẫu. Kết quả của nó LÀ đáp án - không có bảng đáp án chép tay
   *  nào phải giữ đồng bộ với dữ liệu. */
  solution: string;
  /** Thứ tự dòng có tính không: chỉ đúng khi đề bài yêu cầu ORDER BY. */
  ordered?: boolean;
  hint: string;
  explain: string;
};

export type ExcelPracticeSet =
  | {
      kind: "grid";
      title: string;
      intro: string;
      columns: string[];
      rows: number;
      cells: Sheet;
      tasks: ExcelTask[];
    }
  | {
      kind: "sql";
      title: string;
      intro: string;
      db: Database;
      tasks: SqlTask[];
    }
  | {
      kind: "steps";
      title: string;
      intro: string;
      task: StepTask;
    };

const n = (value: number) => ({ value });
const t = (value: string) => ({ value });

/* ------------------------------------------------------------------ *
 * Bài 1 - Kỷ luật bàn phím: vùng dữ liệu và tham chiếu tuyệt đối
 * ------------------------------------------------------------------ */

const REVENUE = [100, 105, 98, 112, 120, 118, 125, 130, 127, 140, 135, 150];

const shortcutsCells: Sheet = {
  A1: t("Tháng"),
  B1: t("Lượt gọi"),
  C1: t("Dự phóng"),
  E1: t("Giả định"),
  E2: t("Tăng trưởng"),
  F2: n(0.08),
  E4: t("Tổng năm"),
  E5: t("Số tháng > 120"),
  ...Object.fromEntries(
    REVENUE.flatMap((v, i) => [
      [`A${i + 2}`, t(`T${i + 1}`)],
      [`B${i + 2}`, n(v)],
    ]),
  ),
};

/* ------------------------------------------------------------------ *
 * Bài 2 - Tra cứu: INDEX/MATCH, XLOOKUP, SUMIFS, và một khoá bẩn
 * ------------------------------------------------------------------ */

// "CDN " có một khoảng trắng ở cuối. Đây không phải lỗi đánh máy trong file
// này - nó là dữ liệu thật xuất từ một hệ thống khác, và là cả nội dung của
// nhiệm vụ số 3.
const lookupCells: Sheet = {
  A1: t("Mã"),
  B1: t("Nhóm"),
  C1: t("Đơn giá"),
  A2: t("API"),
  B2: t("Cổng vào"),
  C2: n(120),
  A3: t("CDN "),
  B3: t("Phân phối"),
  C3: n(27),
  A4: t("SSO"),
  B4: t("Danh tính"),
  C4: n(68),
  A5: t("JOB"),
  B5: t("Chạy nền"),
  C5: n(56),
  A6: t("LOG"),
  B6: t("Ghi nhật ký"),
  C6: n(31),
  E1: t("Dịch vụ dùng"),
  F1: t("Số lượt"),
  G1: t("Đơn giá ghép được"),
  E2: t("SSO"),
  F2: n(1000),
  E3: t("JOB"),
  F3: n(500),
  // Một dòng đã làm sẵn để bạn thấy dạng công thức trước khi tự viết.
  G3: { formula: "=INDEX(C2:C6, MATCH(E3, A2:A6, 0))" },
  E4: t("CDN"),
  F4: n(2000),
  E5: t("MSG"),
  F5: n(300),
  I1: t("Tổng chi phí"),
};

/* ------------------------------------------------------------------ *
 * Bài 3 - Ba bảng nối nhau: liên kết, vòng lặp chi phí co giãn, ô cân đối
 * ------------------------------------------------------------------ */

const modelCells: Sheet = {
  A1: t("Ngân sách vận hành"),
  A2: t("Hạn mức tính toán"),
  B2: n(1000),
  A3: t("Tải nền"),
  B3: n(-620),
  A4: t("Tải phụ trợ & giám sát"),
  B4: n(-180),
  A5: t("Dư địa trước co giãn"),
  A6: t("Chi phí co giãn"),
  A7: t("Dư địa sau co giãn"),
  A8: t("Hao phí 20%"),
  A9: t("Dư địa thực"),

  D1: t("Máy chủ thuê thêm"),
  D2: t("Số máy đầu kỳ"),
  E2: n(400),
  D3: t("Thuê thêm trong kỳ"),
  E3: n(100),
  D4: t("Số máy cuối kỳ"),
  D5: t("Số máy bình quân"),
  D6: t("Đơn giá mỗi máy"),
  E6: n(0.09),
  D8: t("Công tắc phá vòng lặp"),
  E8: n(0),

  G1: t("Ô kiểm tra"),
  G2: t("Chi phí co giãn khớp bảng máy"),
};

/* ------------------------------------------------------------------ *
 * Bài 4 - Kiểm tra và dò lỗi: dòng kiểm tra và số cứng
 * ------------------------------------------------------------------ */

// Bảng phân bổ dung lượng này lệch. Con số 1.200 trong bài học là ví dụ; ở đây độ lệch
// là 60 và nguyên nhân là một số cứng trong ô C4 - học viên phải tự tìm ra.
const auditCells: Sheet = {
  A1: t("Đã cấp phát"),
  A2: t("Bộ nhớ"),
  B2: n(150),
  A3: t("Đĩa"),
  B3: n(320),
  A4: t("CPU"),
  B4: n(890),
  A5: t("Tổng đã cấp"),

  D1: t("Nguồn cấp"),
  D2: t("Cụm A"),
  E2: n(260),
  D3: t("Cụm B"),
  E3: n(400),
  D4: t("Cụm C"),
  E4: n(640),
  D5: t("Tổng nguồn cấp"),

  A7: t("Lượt gọi"),
  B7: n(1000),
  A8: t("Tỷ lệ lỗi"),
  B8: n(0.12),
  A9: t("Số lỗi (đang sai)"),
  B9: { formula: "=1000*0.12" },

  G1: t("Ô kiểm tra"),
  G2: t("Cân đối"),
  G3: t("Số lỗi không số cứng"),
  G4: t("Tỷ lệ trên mỗi đơn vị"),
};

/* ------------------------------------------------------------------ *
 * Bộ bài tập
 * ------------------------------------------------------------------ */

export const EXCEL_PRACTICE_SETS: Record<string, ExcelPracticeSet> = {
  "excel-shortcuts": {
    kind: "grid",
    title: "Vùng dữ liệu và ô giả định",
    intro:
      "Cột B có 12 tháng lượt gọi. Trong Excel thật bạn tìm dòng cuối bằng Ctrl + Shift + mũi tên xuống thay vì cuộn chuột; ở đây bạn gõ thẳng vùng đó ra. Ô F2 là giả định duy nhất - mọi công thức phải trỏ về nó chứ không được chép giá trị của nó.",
    columns: ["A", "B", "C", "E", "F"],
    rows: 13,
    cells: shortcutsCells,
    tasks: [
      {
        target: "F4",
        prompt: "Tính tổng lượt gọi cả năm.",
        expect: REVENUE.reduce((s, x) => s + x, 0),
        mustAvoid: [
          {
            text: "B2+B3",
            why: "Cộng tay từng ô sẽ hỏng ngay khi thêm một tháng. Dùng vùng.",
          },
        ],
        hint: "=SUM(vùng dữ liệu từ B2 đến B13)",
        solution: "=SUM(B2:B13)",
        explain:
          "Trong Excel, cách gõ vùng này nhanh nhất là đứng ở B2 rồi Ctrl + Shift + mũi tên xuống. Nếu tổ hợp đó dừng lại giữa chừng, bạn vừa phát hiện một ô trống trong dữ liệu mà mắt thường không thấy.",
      },
      {
        target: "F5",
        prompt: "Đếm số tháng có lượt gọi lớn hơn 120.",
        expect: REVENUE.filter((v) => v > 120).length,
        hint: '=COUNTIF(vùng, ">120")',
        solution: "=COUNTIF(B2:B13, \">120\")",
        explain:
          "Điều kiện đặt trong dấu ngoặc kép vì Excel đọc nó như một chuỗi mô tả phép so sánh, không phải như một biểu thức.",
      },
      {
        target: "C2",
        prompt:
          "Ô C2: dự phóng lượt gọi tháng 1 của năm sau, bằng lượt gọi tháng 1 nhân với tăng trưởng ở F2. Viết sao cho kéo xuống cả cột vẫn đúng.",
        expect: 108,
        mustUse: [
          {
            text: "$F$2",
            why: "Không khoá F2 thì khi kéo xuống, tham chiếu trôi sang F3, F4 - toàn ô trống - và cả cột về 0.",
          },
        ],
        mustAvoid: [
          {
            text: "0.08",
            why: "Gõ thẳng 0,08 vào công thức là chôn một giả định. Đổi giả định sau này sẽ phải sửa 12 ô thay vì 1.",
          },
          { text: "1.08", why: "Cùng một vấn đề: con số này phải đến từ ô F2." },
        ],
        hint: "=B2*(1+$F$2)",
        solution: "=B2*(1+$F$2)",
        explain:
          "F4 là phím thêm dấu $ trong Excel. Đây là lý do bài kiểm tra dữ liệu chấm cả cách bạn viết chứ không chỉ kết quả: một công thức kéo được cho cả cột là một công thức, còn 12 ô gõ tay là 12 cơ hội sai.",
      },
    ],
  },

  "excel-lookup": {
    kind: "grid",
    title: "Ghép đơn giá vào bảng dịch vụ",
    intro:
      "Bảng A:C là bảng đơn giá xuất từ hệ thống tính tiền. Bảng E:F là các dịch vụ bạn đang dùng. Nhiệm vụ là ghép đơn giá vào bảng dịch vụ - và phát hiện ra dòng không ghép được trước khi nó đi vào báo cáo.",
    columns: ["A", "B", "C", "E", "F", "G", "I"],
    rows: 6,
    cells: lookupCells,
    tasks: [
      {
        target: "G2",
        prompt: "Ghép đơn giá của SSO vào bảng dịch vụ. Ô G3 đã làm sẵn cho JOB - làm theo dạng đó.",
        expect: 68,
        mustAvoid: [
          {
            text: "VLOOKUP",
            why: "VLOOKUP chôn số thứ tự cột vào công thức. Chèn thêm một cột vào bảng nguồn là nó lấy sai dữ liệu mà không báo lỗi.",
          },
          { text: "=68", why: "Gõ thẳng đáp án thì công thức không cập nhật khi đơn giá đổi." },
        ],
        hint: "=INDEX(C2:C6, MATCH(E2, A2:A6, 0)) - đọc từ trong ra ngoài",
        solution: "=INDEX(C2:C6, MATCH(E2, A2:A6, 0))",
        explain:
          "MATCH trả về SSO nằm ở dòng thứ mấy, INDEX lấy giá trị ở đúng dòng đó. Hai hàm tách rời nhau nên bảng nguồn đổi cấu trúc thế nào công thức vẫn đúng.",
      },
      {
        target: "G4",
        prompt:
          "Ghép đơn giá cho CDN theo đúng dạng đó. Công thức viết đúng vẫn ra #N/A - đừng sửa công thức, hãy tìm ra vì sao rồi sửa dữ liệu trong bảng nguồn.",
        expect: 27,
        dataFix: { ref: "A3", value: "CDN" },
        hint: "Bấm vào từng ô ở cột A và nhìn kỹ nội dung. Có một ký tự bạn không thấy được.",
        solution: "=INDEX(C2:C6, MATCH(E4, A2:A6, 0))",
        explain:
          "Ô A3 chứa 'CDN ' với một khoảng trắng ở cuối. Đây là nguyên nhân số một của lỗi tra cứu trong công việc thật, và nó luôn xuất hiện khi dữ liệu đi qua nhiều hệ thống. Ở quy mô lớn, cách xử lý đúng là chuẩn hoá cả cột bằng TRIM một lần, không phải sửa từng dòng.",
      },
      {
        target: "G5",
        prompt:
          "MSG không có trong bảng đơn giá. Ghép đơn giá cho nó bằng XLOOKUP, và cho công thức trả về 0 khi không tìm thấy thay vì mã lỗi.",
        expect: 0,
        mustUse: [{ text: "XLOOKUP", why: "Bài này luyện đúng tham số thứ tư của XLOOKUP." }],
        hint: "=XLOOKUP(E5, A2:A6, C2:C6, 0) - tham số thứ tư là giá trị khi không tìm thấy",
        solution: "=XLOOKUP(E5, A2:A6, C2:C6, 0)",
        explain:
          "Tham số thứ tư là lý do XLOOKUP an toàn hơn VLOOKUP bọc trong IFERROR: IFERROR nuốt mọi loại lỗi, kể cả lỗi bạn cần thấy, còn tham số này chỉ xử lý đúng trường hợp không tìm thấy.",
      },
      {
        target: "I2",
        prompt: "Tổng chi phí: số lượt nhân đơn giá, cộng cả bốn dịch vụ.",
        expect: 1000 * 68 + 500 * 56 + 2000 * 27,
        hint: "=F2*G2+F3*G3+F4*G4+F5*G5",
        solution: "=F2*G2+F3*G3+F4*G4+F5*G5",
        explain:
          "Để ý điều vừa xảy ra: 300 lượt gọi MSG đóng góp đúng 0 đồng vào tổng, và không có gì báo cho bạn biết. Giá trị thay thế 0 đã biến một dòng thiếu dữ liệu thành một dòng trông như đã tính xong. Vì vậy sau mỗi lần ghép phải có phép đối chiếu số dòng khớp được với số dòng cần khớp - nếu không bạn chỉ đang hy vọng.",
      },
    ],
  },

  "excel-three-statement": {
    kind: "grid",
    title: "Vòng lặp chi phí co giãn và ô cân đối",
    intro:
      "Đây là lát cắt nhỏ nhất của một bảng ba tầng có vòng lặp thật: chi phí co giãn phụ thuộc số máy, số máy phụ thuộc phần tải phải gánh thêm, phần tải ấy lại phụ thuộc dư địa còn lại sau chi phí co giãn. Bạn sẽ dựng nó, nhìn Excel báo tham chiếu vòng, rồi phá vòng bằng công tắc E8.",
    columns: ["A", "B", "D", "E", "G", "H"],
    rows: 9,
    cells: modelCells,
    tasks: [
      {
        target: "B5",
        prompt: "Dư địa trước co giãn = hạn mức trừ tải nền và tải phụ trợ. Lưu ý B3 và B4 đã mang dấu âm.",
        expect: 200,
        hint: "=SUM(B2:B4)",
        solution: "=SUM(B2:B4)",
        explain:
          "Quy ước ghi phần tải chiếm chỗ bằng số âm rồi cộng tất cả lại tốt hơn là trừ đi từng dòng: thêm một dòng tải mới chỉ cần nằm trong vùng, không cần sửa công thức.",
      },
      {
        target: "E4",
        prompt: "Số máy cuối kỳ = số máy đầu kỳ cộng thuê thêm.",
        expect: 500,
        hint: "=E2+E3",
        solution: "=E2+E3",
        explain:
          "Bảng máy chủ luôn dựng theo dạng cuộn chiếu: đầu kỳ, cộng phần thêm mới, trừ phần gỡ bỏ, ra cuối kỳ. Dạng này cho bạn một phép kiểm tra sẵn ở mọi kỳ.",
      },
      {
        target: "E5",
        prompt: "Số máy bình quân = trung bình của đầu kỳ và cuối kỳ.",
        expect: 450,
        hint: "=AVERAGE(E2,E4)",
        solution: "=AVERAGE(E2,E4)",
        explain:
          "Tính chi phí trên số máy bình quân thay vì số máy cuối kỳ chính là thứ tạo ra vòng lặp - và cũng là thứ khiến con số chi phí đúng hơn khi hệ thống bật thêm máy giữa kỳ.",
      },
      {
        target: "B6",
        prompt:
          "Chi phí co giãn = âm của số máy bình quân nhân đơn giá, NHƯNG nếu công tắc E8 bằng 1 thì chi phí phải bằng 0.",
        expect: -40.5,
        mustUse: [
          { text: "E8", why: "Không có công tắc thì bạn không có cách nào phá vòng lặp khi bảng tính rơi vào lỗi." },
        ],
        hint: "=IF(E8=1, 0, -E5*E6)",
        solution: "=IF(E8=1, 0, -E5*E6)",
        explain:
          "Công tắc này là thứ mọi bảng tính có vòng lặp đều phải có. Khi Excel rơi vào trạng thái lỗi lan khắp file, bạn bật công tắc, mọi thứ trở lại tính được, sửa xong thì tắt đi. Không có nó, cách duy nhất là đóng file không lưu.",
      },
      {
        target: "H2",
        prompt:
          "Ô kiểm tra: hiệu giữa chi phí co giãn trên bảng ngân sách và chi phí tính từ bảng máy chủ. Phải ra 0.",
        expect: 0,
        hint: "=B6-(-E5*E6) - hoặc bất kỳ cách nào diễn tả cùng phép so sánh đó",
        solution: "=B6-(-E5*E6)",
        explain:
          "Ô kiểm tra không phải thủ tục trang trí: nó là thứ báo cho bạn biết bảng tính vừa hỏng, ngay lúc nó hỏng. Một file tốt gom mọi ô kiểm tra về một ô tổng ở đầu sheet, và ô đó luôn phải bằng 0.",
      },
    ],
  },

  "excel-audit": {
    kind: "grid",
    title: "Dòng kiểm tra và số cứng",
    intro:
      "Bảng phân bổ này không cân, và ô B9 chứa một số cứng. Cả hai lỗi đều không làm Excel báo gì cả - đó chính là lý do phải tự dựng dòng kiểm tra.",
    columns: ["A", "B", "D", "E", "G", "H"],
    rows: 9,
    cells: auditCells,
    tasks: [
      {
        target: "B5",
        prompt: "Tổng đã cấp phát.",
        expect: 1360,
        hint: "=SUM(B2:B4)",
        solution: "=SUM(B2:B4)",
        explain:
          "Cộng bằng vùng chứ không phải =B2+B3+B4: một dòng tài nguyên chèn thêm vào giữa sẽ tự động nằm trong vùng, còn phép cộng từng ô thì bỏ quên nó và không báo gì cả. Đây là dạng lỗi im lặng phổ biến nhất trong các bảng tính được nhiều người sửa.",
      },
      {
        target: "E5",
        prompt: "Tổng nguồn cấp.",
        expect: 1300,
        hint: "=SUM(E2:E4)",
        solution: "=SUM(E2:E4)",
        explain:
          "Hai tổng này đáng lẽ phải bằng nhau, và ở đây chúng không bằng - nhưng bạn chưa nhìn ra điều đó chỉ bằng cách đọc hai con số. Đó chính là lý do của nhiệm vụ tiếp theo: mắt người không so được số, một ô kiểm tra thì so được, mọi lần, tự động.",
      },
      {
        target: "H2",
        prompt:
          "Ô kiểm tra cân đối: tổng đã cấp trừ tổng nguồn cấp. Cứ điền công thức đúng - kết quả ra khác 0 là bình thường ở bước này.",
        expect: 60,
        hint: "=B5-E5",
        solution: "=B5-E5",
        explain:
          "Lệch 60. Việc cần làm bây giờ là tìm khoản 60 đã vào một phía mà chưa vào phía kia. Việc TUYỆT ĐỐI không được làm là cộng 60 vào cụm C cho cân - đó là biến một lỗi nhìn thấy được thành một lỗi vĩnh viễn không ai tìm ra.",
      },
      {
        target: "B9",
        prompt:
          "Ô B9 đang là =1000*0.12, hai con số cứng. Viết lại sao cho nó trỏ về ô lượt gọi và ô tỷ lệ lỗi.",
        expect: 120,
        prefilled: true,
        mustAvoid: [
          { text: "1000", why: "Lượt gọi đã có ở B7. Chép lại nó là tạo ra một bản sao sẽ lệch đi." },
          { text: "0.12", why: "Tỷ lệ lỗi đã có ở B8." },
        ],
        hint: "=B7*B8",
        solution: "=B7*B8",
        explain:
          "Cả hai công thức đều cho 120 hôm nay. Khác biệt lộ ra vào ngày ai đó sửa lượt gọi ở B7: bản trỏ ô cập nhật theo, bản số cứng thì không, và không có gì báo cho bạn biết. Bật chế độ hiện công thức bằng Ctrl + ` là cách quét cả sheet tìm loại ô này trong vài giây.",
      },
      {
        target: "H4",
        prompt:
          "Số lỗi trên mỗi đơn vị đã cấp, viết sao cho nếu tổng đã cấp bằng 0 thì ra 0 thay vì mã lỗi.",
        expect: 120 / 1360,
        mustUse: [{ text: "IFERROR", why: "Bài này luyện đúng chỗ nên bọc lỗi và chỗ không nên." }],
        hint: "=IFERROR(B9/B5, 0)",
        solution: "=IFERROR(B9/B5, 0)",
        explain:
          "Đây là chỗ IFERROR dùng đúng: một phép chia có thể gặp mẫu số 0 hợp lệ. Chỗ dùng sai là bọc IFERROR quanh cả một công thức tra cứu, vì khi đó nó nuốt luôn cả #N/A - thứ đang cố nói với bạn rằng dữ liệu bị thiếu.",
      },
    ],
  },

  "excel-sql": {
    kind: "sql",
    title: "Lấy đúng dữ liệu mình cần",
    intro:
      "Hai bảng trong kho dữ liệu: dich_vu là các dịch vụ đang chạy, don_gia là bảng đơn giá tính tiền. Gõ truy vấn thật vào ô bên dưới. Bảng don_gia thiếu một mã - nhiệm vụ cuối là tìm ra nó trước khi nó làm sai mọi tỷ trọng.",
    db: {
      dich_vu: {
        name: "dich_vu",
        columns: ["ma", "nhom", "so_luot"],
        rows: [
          { ma: "API", nhom: "Cong vao", so_luot: 1000 },
          { ma: "CDN", nhom: "Phan phoi", so_luot: 2000 },
          { ma: "SSO", nhom: "Danh tinh", so_luot: 500 },
          { ma: "JOB", nhom: "Chay nen", so_luot: 800 },
          { ma: "LOG", nhom: "Ghi nhat ky", so_luot: 1500 },
          { ma: "MSG", nhom: "Hang doi", so_luot: 300 },
        ],
      },
      don_gia: {
        name: "don_gia",
        columns: ["ma", "don_gia"],
        rows: [
          { ma: "API", don_gia: 120 },
          { ma: "CDN", don_gia: 27 },
          { ma: "SSO", don_gia: 68 },
          { ma: "JOB", don_gia: 56 },
          { ma: "LOG", don_gia: 31 },
        ],
      },
    },
    tasks: [
      {
        prompt: "Lấy mã và số lượt của những dịch vụ từ 1000 lượt gọi trở lên.",
        solution: "SELECT ma, so_luot FROM dich_vu WHERE so_luot >= 1000",
        hint: "SELECT cột, cột FROM bảng WHERE điều kiện",
        explain:
          "Điều kiện lọc chạy ở phía cơ sở dữ liệu, nên thứ đi qua đường truyền về máy bạn chỉ là ba dòng chứ không phải cả bảng. Ở quy mô vài triệu dòng, khác biệt này là khác biệt giữa một truy vấn hai giây và một bảng tính treo.",
      },
      {
        prompt: "Tổng số lượt gọi, gom theo nhóm dịch vụ, sắp xếp giảm dần.",
        solution: "SELECT nhom, SUM(so_luot) AS tong FROM dich_vu GROUP BY nhom ORDER BY tong DESC",
        ordered: true,
        hint: "SELECT nhom, SUM(so_luot) AS tong FROM ... GROUP BY nhom ORDER BY tong DESC",
        explain:
          "GROUP BY quyết định mỗi dòng kết quả đại diện cho cái gì. Mọi cột trong SELECT phải hoặc nằm trong GROUP BY, hoặc nằm trong một hàm tổng hợp - nếu không, cơ sở dữ liệu không biết phải lấy giá trị nào trong nhóm.",
      },
      {
        prompt:
          "Ghép hai bảng và tính tổng chi phí: số lượt nhân đơn giá, cộng tất cả. Dùng JOIN thường.",
        solution: "SELECT SUM(d.so_luot * g.don_gia) AS chi_phi FROM dich_vu d JOIN don_gia g ON d.ma = g.ma",
        hint: "SELECT SUM(d.so_luot * g.don_gia) FROM dich_vu d JOIN don_gia g ON d.ma = g.ma",
        explain:
          "Con số này SAI, và không có gì báo cho bạn biết. Bảng dịch vụ có sáu mã, bảng đơn giá có năm - JOIN thường là INNER JOIN, nên mã thiếu đơn giá bị loại khỏi kết quả cùng với toàn bộ chi phí của nó. Tổng vẫn ra một con số trông hoàn toàn hợp lý. Nhiệm vụ cuối là cách phát hiện ra chuyện này.",
      },
      {
        prompt: "Tìm ra chính xác những mã dịch vụ không có đơn giá trong bảng don_gia.",
        solution: "SELECT d.ma FROM dich_vu d LEFT JOIN don_gia g ON d.ma = g.ma WHERE g.don_gia IS NULL",
        hint: "LEFT JOIN giữ đủ dòng bên trái; chỗ không ghép được sẽ là NULL. Lọc bằng IS NULL.",
        explain:
          "LEFT JOIN buộc phần dữ liệu thiếu phải hiện ra thay vì biến mất. Chú ý phải viết IS NULL chứ không phải = NULL: trong SQL, NULL không bằng bất cứ thứ gì, kể cả chính nó, nên = NULL luôn trả về rỗng.\n\nĐây là phép kiểm tra nên chạy sau MỌI lần ghép bảng: so số dòng trước và sau, và nếu lệch thì tìm cho ra lệch ở đâu. Công cụ mạnh hơn không thay thế được việc kiểm tra.",
      },
    ],
  },

  "excel-power-query": {
    kind: "steps",
    title: "Dựng quy trình làm sạch",
    intro:
      "Mỗi tháng bạn nhận cùng một file nhật ký xuất từ hệ thống: bốn dòng tiêu đề rác ở trên, mỗi tháng một cột, mã dịch vụ dính khoảng trắng. Hãy xếp các bước Power Query theo đúng thứ tự chạy. Thứ tự sai vẫn ra kết quả, nhưng ra kết quả sai.",
    task: {
      prompt: "Kéo các bước về đúng thứ tự trong quy trình.",
      steps: [
        "Kết nối tới thư mục chứa file của tất cả các tháng",
        "Xoá bốn dòng rác ở đầu và đặt dòng đầu tiên làm tiêu đề",
        "Cắt khoảng trắng thừa ở cột mã dịch vụ",
        "Đặt đúng kiểu dữ liệu cho từng cột",
        "Unpivot các cột tháng thành hai cột: tháng và số lượt",
        "Ghép thêm cột cụm máy chủ từ bảng khai báo dịch vụ theo mã",
        "Nạp kết quả ra bảng tính để làm báo cáo",
      ],
      explain:
        "Hai chỗ quyết định: cắt khoảng trắng phải xong TRƯỚC khi ghép theo mã, nếu không phép ghép sẽ âm thầm bỏ sót các dòng có mã bẩn - đúng loại lỗi im lặng bài 2 đã nói. Và unpivot phải xong trước khi ghép, vì bảng còn ở dạng mỗi tháng một cột thì không có khoá để ghép theo dòng.\n\nGiá trị thật của quy trình này không nằm ở lần đầu. Nó nằm ở tháng sau, khi bạn chỉ bấm Làm mới và bảy bước chạy lại y hệt - không phải gần giống, mà y hệt. Đó là điều kiện để số liệu giữa các kỳ thực sự so sánh được với nhau.",
    },
  },
};

export type ExcelPracticeKey = keyof typeof EXCEL_PRACTICE_SETS;

export function getExcelPracticeSet(key: string): ExcelPracticeSet | null {
  return EXCEL_PRACTICE_SETS[key] ?? null;
}

/* ------------------------------------------------------------------ *
 * Chấm bài
 * ------------------------------------------------------------------ */

export type Grade = {
  ok: boolean;
  /** Vì sao chưa đạt - dùng để chọn giọng phản hồi, không chỉ để hiện chữ. */
  kind: "empty" | "rule" | "error" | "value" | "ok";
  message: string;
};

/**
 * Chấm bằng GIÁ TRỊ tính ra chứ không bằng so chuỗi công thức: `=SUM(B2:B13)`
 * và `=B2+B3+...` cùng ra một số và đều được nhận. Chỉ khi chính cách viết là
 * nội dung bài học - khoá tham chiếu, cấm số cứng, cấm VLOOKUP - thì mới có
 * thêm ràng buộc, và ràng buộc đó luôn kèm lý do để phản hồi dạy được điều gì.
 */
export function gradeTask(sheet: Sheet, task: ExcelTask): Grade {
  const ref = normalizeRef(task.target);
  const raw = sheet[ref]?.formula ?? (sheet[ref]?.value !== undefined ? String(sheet[ref]?.value) : "");
  if (!raw.trim()) return { ok: false, kind: "empty", message: `Ô ${ref} còn trống.` };

  const norm = raw.toUpperCase().replace(/\s/g, "");
  // Xét điều CẤM trước điều BẮT BUỘC: thứ học viên vừa gõ ra là thứ cụ thể
  // nhất để nói tới, còn "thiếu $F$2" là một lời nhắc trừu tượng hơn.
  for (const rule of task.mustAvoid ?? []) {
    if (norm.includes(rule.text.toUpperCase().replace(/\s/g, ""))) {
      return { ok: false, kind: "rule", message: `Bỏ ${rule.text} ra khỏi công thức. ${rule.why}` };
    }
  }
  for (const rule of task.mustUse ?? []) {
    if (!norm.includes(rule.text.toUpperCase().replace(/\s/g, ""))) {
      return { ok: false, kind: "rule", message: `Công thức cần dùng ${rule.text}. ${rule.why}` };
    }
  }

  const value = evaluateCell(sheet, ref);
  const expectsError = typeof task.expect === "string" && task.expect.startsWith("#");
  if (isError(value) && !expectsError) {
    const detail = value.code === "#CIRC!" ? ` Vòng lặp: ${value.detail}` : value.detail ? ` ${value.detail}` : "";
    return { ok: false, kind: "error", message: `Ô ${ref} đang trả về ${value.code}.${detail}` };
  }
  if (valuesMatch(value, task.expect)) return { ok: true, kind: "ok", message: task.explain };
  return {
    ok: false,
    kind: "value",
    message: `Ô ${ref} ra ${formatValue(value)}, chưa phải kết quả cần tìm.`,
  };
}

/**
 * Chấm truy vấn SQL bằng cách so KẾT QUẢ với kết quả của truy vấn mẫu, chứ
 * không so chuỗi: `WHERE so_luot >= 1000` và `WHERE NOT so_luot < 1000` cùng
 * ra một bảng và đều đúng. Thứ tự dòng chỉ tính khi đề bài yêu cầu sắp xếp.
 */
export function gradeSqlTask(db: Database, task: SqlTask, sql: string): Grade {
  if (!sql.trim()) return { ok: false, kind: "empty", message: "Chưa có truy vấn nào." };
  let actual;
  try {
    actual = runQuery(db, sql);
  } catch (e) {
    return { ok: false, kind: "error", message: e instanceof Error ? e.message : "Truy vấn không chạy được." };
  }
  const expected = runQuery(db, task.solution);
  if (resultsMatch(actual, expected, task.ordered ?? false)) {
    return { ok: true, kind: "ok", message: task.explain };
  }
  const shape = `Truy vấn trả về ${actual.rows.length} dòng × ${actual.columns.length} cột; đáp án có ${expected.rows.length} dòng × ${expected.columns.length} cột.`;
  return {
    ok: false,
    kind: "value",
    message:
      actual.rows.length === expected.rows.length && actual.columns.length === expected.columns.length
        ? "Đúng hình dạng bảng nhưng sai nội dung. So lại điều kiện lọc và phép tính."
        : shape,
  };
}
