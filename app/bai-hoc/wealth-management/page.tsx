"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 51, day: 83, accent: "violet",
  title: "Wealth Management là gì?",
  subtitle: "Tài sản ròng, phân bổ tài sản và danh mục kỳ vọng",
  duration: "8 phút", difficulty: "Trung bình", emoji: "💼",
  nextSlug: "modern-portfolio-theory", nextTitle: "Modern Portfolio Theory",
};

const quiz: QuizQuestion[] = [
  {
    question: "Net worth được tính như thế nào?",
    options: [
      "Tổng thu nhập hàng tháng",
      "Tổng tài sản trừ tổng nợ phải trả",
      "Giá trị chứng khoán trong tài khoản",
      "Lương nhân với số năm làm việc",
    ],
    correct: 1,
    explanation: "Net Worth = Tổng tài sản (Assets) − Tổng nợ (Liabilities). Không phải thu nhập - một người thu nhập cao nhưng tiêu hết và nợ nhiều có net worth thấp hơn người thu nhập vừa phải nhưng tiết kiệm và tích lũy đều đặn.",
  },
  {
    question: "Expected return của danh mục gồm 60% cổ phiếu (return kỳ vọng 10%) và 40% trái phiếu (return kỳ vọng 4%) là bao nhiêu?",
    options: ["4%", "7,6%", "10%", "14%"],
    correct: 1,
    explanation: "Expected Return = 0.6 × 10% + 0.4 × 4% = 6% + 1.6% = 7.6%. Đây là tính bình quân gia quyền theo tỷ trọng mỗi loại tài sản. Phân bổ tỷ trọng khác nhau sẽ tạo ra expected return và risk profile khác nhau.",
  },
  {
    question: "Tại sao thanh khoản (liquidity) lại là một tiêu chí trong asset allocation?",
    options: [
      "Vì tài sản thanh khoản cao bao giờ cũng sinh lời cao hơn",
      "Vì phải đảm bảo có tiền mặt cho nhu cầu ngắn hạn hoặc khẩn cấp",
      "Vì bất động sản luôn có thanh khoản tốt hơn cổ phiếu",
      "Vì thanh khoản không liên quan đến quản lý tài sản",
    ],
    correct: 1,
    explanation: "Liquidity là khả năng chuyển đổi tài sản thành tiền mặt nhanh mà không mất nhiều giá trị. Nếu toàn bộ tài sản là BĐS và cổ phiếu kém thanh khoản, khi có nhu cầu khẩn cấp có thể phải bán ở giá xấu. Một phần tài sản cần giữ dạng thanh khoản cao.",
  },
  {
    question: "Bước đầu tiên quan trọng nhất trong wealth management cá nhân là gì?",
    options: [
      "Mua ngay cổ phiếu tốt nhất",
      "Biết mình đang có gì - tài sản và nợ là bao nhiêu",
      "Tìm fund manager giỏi",
      "Đầu tư vào bất cứ thứ gì sinh lời cao nhất",
    ],
    correct: 1,
    explanation: "Không thể quản lý cái mình không đo được. Bước đầu tiên là lập bảng net worth: liệt kê toàn bộ tài sản (tiền mặt, chứng khoán, BĐS, xe, góp vốn...) và toàn bộ nợ (vay ngân hàng, nợ thẻ, nợ gia đình...). Từ đó mới có cơ sở để lập kế hoạch.",
  },
];

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">Wealth Management là gì?</h2>
      <p className="text-stone-500 text-sm mb-8">Quản lý tài sản không bắt đầu từ việc chọn cổ phiếu, mà bắt đầu từ việc biết mình đang sở hữu gì, nợ gì, và tiền đó phải phục vụ mục tiêu nào</p>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Wealth Management thực sự là gì?</h3>
        <p className="text-stone-600 leading-relaxed mb-4">
          Wealth management thường khiến người mới nghĩ đến private banker, quỹ đầu tư lớn, hay người rất giàu. Nhưng ở bản chất, wealth management chỉ là <strong>nghệ thuật sắp xếp toàn bộ tài sản của bạn để phục vụ cuộc đời bạn</strong>: tiền mặt, đầu tư, nợ, bảo hiểm, thuế, mục tiêu gia đình, và cả việc để lại tài sản sau này.
        </p>
        <p className="text-stone-600 leading-relaxed">
          Nói cách khác, đây không phải là môn "chọn asset hot nhất", mà là bài toán điều phối nguồn lực. Một người có 5 tỷ nhưng phân bổ sai có thể mong manh hơn người có 1 tỷ nhưng cấu trúc tài sản hợp lý, nợ thấp, quỹ khẩn cấp đủ và mục tiêu rõ ràng.
        </p>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Bước 1: Net worth là bảng điều khiển trung tâm</h3>
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 mb-4">
          <div className="text-stone-500 text-xs mb-3 uppercase tracking-wide font-bold">Công thức gốc</div>
          <div className="font-mono font-bold text-stone-800 text-base">Net Worth = Assets - Liabilities</div>
          <div className="mt-4 grid gap-2 text-sm text-stone-600 sm:grid-cols-2">
            <div>
              <div className="font-bold text-stone-800 mb-1">Assets</div>
              <div>Tiền mặt, tiền gửi, cổ phiếu, trái phiếu, quỹ, BĐS, góp vốn, xe, tài sản khác</div>
            </div>
            <div>
              <div className="font-bold text-stone-800 mb-1">Liabilities</div>
              <div>Vay mua nhà, vay mua xe, nợ thẻ tín dụng, vay tiêu dùng, nợ người thân</div>
            </div>
          </div>
        </div>
        <p className="text-stone-600 text-sm leading-relaxed mb-3">
          Net worth không nói bạn kiếm được bao nhiêu trong tháng; nó nói <strong>bạn thực sự sở hữu bao nhiêu sau khi trừ hết nghĩa vụ</strong>. Đây là điểm xuất phát bắt buộc, vì nếu không có bản đồ tài sản hiện tại, mọi quyết định đầu tư phía sau đều thiếu nền.
        </p>
        <p className="text-stone-600 text-sm leading-relaxed">
          Ví dụ, hai người cùng thu nhập 40 triệu/tháng có thể sống ở hai thế giới rất khác nhau: một người có 2 tỷ tài sản ròng và quỹ dự phòng 12 tháng; người kia có danh mục nhìn có vẻ lớn nhưng vay margin, nợ thẻ, và gần như không có tiền mặt. Thu nhập giống nhau, độ vững hoàn toàn khác nhau.
        </p>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Bước 2: Mục tiêu quyết định cấu trúc danh mục</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              title: "Ngắn hạn",
              body: "Mua xe, dự phòng 6-12 tháng, học phí. Tài sản nên ưu tiên thanh khoản cao, biến động thấp.",
            },
            {
              title: "Trung hạn",
              body: "Mua nhà, vốn mở kinh doanh, cho con đi học. Có thể chấp nhận một phần biến động nhưng không được để toàn bộ ở tài sản rủi ro.",
            },
            {
              title: "Dài hạn",
              body: "Tự do tài chính, hưu trí, để lại tài sản cho gia đình. Đây là nơi cổ phiếu, quỹ chỉ số, tài sản tăng trưởng có vai trò lớn hơn.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-stone-200 bg-white p-4">
              <p className="text-sm font-bold text-stone-900 mb-2">{item.title}</p>
              <p className="text-sm leading-relaxed text-stone-600">{item.body}</p>
            </div>
          ))}
        </div>
        <p className="text-stone-600 text-sm leading-relaxed mt-4">
          Cùng một người, nhưng tiền cho quỹ khẩn cấp và tiền cho hưu trí không nên được đầu tư theo cùng một cách. Khi asset allocation không gắn với thời gian và mục tiêu, danh mục dễ trở thành một đống tài sản mua ngẫu hứng, thay vì một hệ thống.
        </p>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Bước 3: Asset allocation là trái tim của wealth management</h3>
        <p className="text-stone-600 text-sm leading-relaxed mb-4">
          Asset allocation không phải câu hỏi "cổ phiếu nào tốt nhất", mà là "bao nhiêu % tài sản nên ở dạng nào". Quyết định này thường ảnh hưởng kết quả dài hạn nhiều hơn việc cố gắng chọn đúng một mã cụ thể.
        </p>
        <div className="space-y-3 text-sm text-stone-600">
          <div><strong className="text-stone-800">Cổ phiếu:</strong> tăng trưởng mạnh, biến động cao, phù hợp mục tiêu dài hạn.</div>
          <div><strong className="text-stone-800">Trái phiếu / thu nhập cố định:</strong> ổn định hơn, giúp cân danh mục và tạo cash flow.</div>
          <div><strong className="text-stone-800">Bất động sản:</strong> chống lạm phát tốt, nhưng thanh khoản thấp và cần quản trị đòn bẩy kỹ.</div>
          <div><strong className="text-stone-800">Tiền mặt:</strong> lợi suất thấp nhưng cực kỳ quan trọng cho an toàn, cơ hội và nhu cầu bất ngờ.</div>
        </div>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Ví dụ: hai danh mục khác nhau cho hai con người khác nhau</h3>
        <div className="overflow-x-auto rounded-xl border border-stone-200">
          <table className="w-full min-w-[680px] text-sm">
            <thead className="bg-stone-100 text-stone-700">
              <tr>
                <th className="px-4 py-3 text-left font-bold">Tài sản</th>
                <th className="px-4 py-3 text-left font-bold">Người A - 28 tuổi</th>
                <th className="px-4 py-3 text-left font-bold">Người B - 52 tuổi</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Tiền mặt", "10%", "20%"],
                ["Cổ phiếu / quỹ cổ phiếu", "65%", "35%"],
                ["Trái phiếu / tiền gửi dài hơn", "15%", "30%"],
                ["BĐS / tài sản thay thế", "10%", "15%"],
              ].map(([asset, a, b], index) => (
                <tr key={asset} className={index % 2 === 0 ? "bg-white" : "bg-stone-50/60"}>
                  <td className="px-4 py-3 font-medium text-stone-800">{asset}</td>
                  <td className="px-4 py-3 text-stone-600">{a}</td>
                  <td className="px-4 py-3 text-stone-600">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-stone-600 text-sm leading-relaxed mt-4">
          Người A còn nhiều thời gian để chịu biến động và tích lũy, nên danh mục thiên về tăng trưởng. Người B gần mục tiêu nghỉ hưu hơn, nên cần giảm xác suất bị drawdown lớn ngay trước lúc cần dùng tiền. Không có cấu trúc "đúng cho mọi người"; chỉ có cấu trúc hợp với từng hoàn cảnh.
        </p>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Expected return chỉ là một nửa câu chuyện</h3>
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 mb-4 font-mono text-sm">
          <div className="text-stone-500 text-xs mb-2">Ví dụ danh mục 60/40</div>
          <div className="space-y-1 text-stone-700">
            <div>60% cổ phiếu x 10% = 6.0%</div>
            <div>40% trái phiếu x 4% = 1.6%</div>
            <div className="mt-2 font-bold text-stone-900">Expected Return = 7.6%</div>
          </div>
        </div>
        <p className="text-stone-600 text-sm leading-relaxed mb-3">
          Công thức này hữu ích để hình dung lợi nhuận kỳ vọng, nhưng wealth management không dừng ở đó. Một danh mục 9% kỳ vọng mà bạn hoảng sợ bán tháo giữa drawdown thực tế còn tệ hơn danh mục 7% nhưng bạn giữ được kỷ luật suốt 15 năm.
        </p>
        <p className="text-stone-600 text-sm leading-relaxed">
          Vì vậy, quản lý tài sản không chỉ là tối đa hóa lợi nhuận; nó là <strong>cân bằng giữa lợi nhuận, rủi ro, thanh khoản và khả năng tâm lý của chính bạn</strong>.
        </p>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">3 sai lầm kinh điển</h3>
        <div className="space-y-3">
          {[
            {
              title: "Nhầm wealth management với picking stocks",
              body: "Đầu tư chỉ là một mảnh ghép. Nếu nợ xấu, thiếu bảo hiểm, không có tiền mặt dự phòng, danh mục cổ phiếu đẹp đến đâu cũng không cứu được cấu trúc tài chính yếu.",
            },
            {
              title: "Không tách tiền theo mục tiêu",
              body: "Tiền mua nhà trong 2 năm tới mà đem bỏ hoàn toàn vào cổ phiếu là đang dùng sai công cụ cho sai nhiệm vụ.",
            },
            {
              title: "Nhìn tổng tài sản mà quên nghĩa vụ nợ",
              body: "Nhiều người thấy mình 'có nhiều tài sản' nhưng phần lớn là tài sản kém thanh khoản đi kèm vay lớn. Wealth thật phải nhìn sau khi trừ nợ và tính đến khả năng xoay sở khi có biến.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-stone-200 bg-stone-50 p-4">
              <p className="text-sm font-bold text-stone-900 mb-1">{item.title}</p>
              <p className="text-sm leading-relaxed text-stone-600">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Khung nhớ cuối bài</h3>
        <div className="rounded-2xl bg-stone-900 p-5 text-white">
          <p className="font-bold mb-3">Wealth management cá nhân có thể tóm lại trong 3 câu hỏi:</p>
          <div className="space-y-2 text-sm text-stone-300">
            <div>1. Mình đang ở đâu? - đo bằng net worth và dòng tiền hiện tại.</div>
            <div>2. Mình muốn đi đâu? - định nghĩa mục tiêu, thời gian, mức sống mong muốn.</div>
            <div>3. Tài sản cần được sắp xếp thế nào để đi từ điểm 1 tới điểm 2? - đó là asset allocation.</div>
          </div>
        </div>
      </section>
    </LessonPageLayout>
  );
}
