/** Chuỗi hiển thị cho ba module dữ liệu không gian 3D:
 *  components/career-district/district-space.ts,
 *  components/lobby/stations.ts, và app/api/world-boss/route.ts.
 *
 *  Cấu trúc (id, toạ độ, kích thước, HP, phần thưởng) vẫn nằm nguyên ở ba nơi
 *  đó; file này chỉ mang chữ. Xem AGENTS.md, mục "Translating the UI".
 *
 *  QUAN TRỌNG: `t.worldSpaces` chưa được nối vào cây Dictionary chính - việc
 *  đó do một tác vụ khác làm ở lib/i18n/dictionaries/sections/index.ts. Đợi
 *  tsc báo lỗi "Property 'worldSpaces' does not exist" là đúng, không phải
 *  lỗi cần sửa ở đây. */

export const worldSpacesVi = {
  worldSpaces: {
    district: {
      exitToStreet: "Ra phố",
      towerLobby: "Tháp Tự Học",
      stageFloor: "Sảnh chặng học",
      towerStopStreet: "Sảnh · ra phố",
      towerStopStage: "Chặng học tài chính",
      gameSquare: "Quảng trường Game Tài chính",
      gameSquareShort: "Quảng trường Game",
      park: "Công viên Bến Nghé",
      parkShort: "Công viên",
      center: "Quảng trường Trung tâm",
      cafe: "Cà phê Số & Sách",
      street: "Phố nghề Sài Gòn",
      /** format({ level }) - nối sau subtitle của một địa điểm trong Quảng
       *  trường Game, ví dụ "Định giá & Câu hỏi mưu lược · cần cấp 5". */
      levelRequirement: "cần cấp {level}",
      library: {
        label: "Thư viện Sài Gòn",
        blurb: "Phòng đọc chung, gặp người khác đang học",
      },
      studyGroup: {
        label: "Phòng học nhóm",
        blurb: "Bàn tám ghế, phiên học 25 phút cùng nhóm",
      },
      civic: {
        baBaoCao: {
          label: "Phòng Ba Báo Cáo",
          blurb: "Chạm một khoản, nhìn nó chạy qua cả ba bảng",
        },
        thapLaiKep: {
          label: "Tháp Lãi Kép",
          blurb: "Mỗi tầng một năm - leo để thấy lãi kép",
        },
        phongLbo: {
          label: "Phòng Tầng Vốn",
          blurb: "Nợ ưu tiên dưới, vốn chủ trên - ai mất trước",
        },
        cuaHang: {
          label: "Cửa hàng & Gương thử đồ",
          blurb: "Thử đồ lên người trước khi mua",
        },
        bangVang: {
          label: "Sảnh Bảng vàng",
          blurb: "Ai đang dẫn đầu từng năng lực",
        },
        phongThi: {
          label: "Phòng thi",
          blurb: "Đề thi thử CFA, FRM và kiểm tra chặng",
        },
        canHo: {
          label: "Căn hộ của bạn",
          blurb: "Chuỗi ngày, cúp và mục tiêu nghề của riêng bạn",
        },
        baoTang: {
          label: "Bảo tàng Tài chính",
          blurb: "1929, 2008, lạm phát - và bài học đằng sau",
        },
        nhaBanBe: {
          label: "Khu nhà bạn bè",
          blurb: "Ghé thăm chuỗi ngày và tủ cúp của bạn bè",
        },
        vongQuayTien: {
          label: "Phòng Vòng Quay Tiền",
          blurb: "Tiền về trước hay tiền đi trước - và ai đang tài trợ cho ai",
        },
        phanBoRuiRo: {
          label: "Phòng Rủi Ro & Phân Bổ",
          blurb: "Vì sao trộn hai thứ lại ít rủi ro hơn trung bình của chúng",
        },
        banTron: {
          label: "Bàn Tròn Giảng Lại",
          blurb: "Giải thích bằng lời của bạn - chỗ duy nhất biết bạn có thật sự hiểu",
        },
      },
    },
    lobbyStations: {
      hocBai: {
        room: "Phòng học hôm nay",
        blurb: "Bài kế tiếp trong lộ trình của bạn",
        formula: "FV = PV × (1 + r)ⁿ",
        note: "Lãi kép - nền của mọi thứ còn lại trong tài chính",
      },
      kiemTra: {
        room: "Phòng luyện đề",
        blurb: "Kiểm tra theo chặng, chấm điểm ngay",
        formula: "NPV = Σ CFₜ / (1 + r)ᵗ − C₀",
        note: "Dự án đáng làm khi NPV > 0",
      },
      onTap: {
        room: "Phòng ôn câu sai",
        blurb: "Những câu bạn đã trả lời sai, quay lại đúng lúc",
        formula: "R(t) ≈ e^(−t / S)",
        note: "Đường cong quên: không ôn lại thì trí nhớ rơi theo hàm mũ",
      },
      congCu: {
        room: "Phòng công cụ",
        blurb: "Máy tính DCF, WACC, lãi kép",
        formula: "EV = Σ FCFₜ/(1+w)ᵗ + TV/(1+w)ⁿ",
        note: "Chiết khấu dòng tiền - cách định giá một doanh nghiệp",
      },
      cfa: {
        room: "Phòng CFA",
        blurb: "Ba cấp độ, theo giáo trình chính thức",
        formula: "WACC = E/V × Rₑ + D/V × R_d × (1 − t)",
        note: "Chi phí vốn bình quân, đã trừ lá chắn thuế của nợ",
      },
      frm: {
        room: "Phòng FRM",
        blurb: "Quản trị rủi ro tài chính",
        formula: "VaR = μ − z_α × σ",
        note: "Mức lỗ tệ nhất trong α% trường hợp xấu",
      },
      phongVan: {
        room: "Phòng phỏng vấn",
        blurb: "Câu hỏi kỹ thuật IB, trả lời có chấm",
        formula: "EV = Vốn hoá + Nợ − Tiền mặt",
        note: "Giá trị doanh nghiệp - câu hỏi mở màn của mọi buổi phỏng vấn IB",
      },
      suNghiep: {
        room: "Phòng nghề nghiệp",
        blurb: "Bạn đang cách nghề mình muốn bao xa",
        formula: "ROE = Biên LN × Vòng quay TS × Đòn bẩy",
        note: "Phân rã DuPont: ba nguồn duy nhất tạo ra ROE",
      },
    },
    worldBoss: {
      fallbackName: "Bạo Chúa Khủng Hoảng Tài Chính (Financial Crisis Titan)",
      fallbackDescription:
        "Trùm World Boss Server hàng tuần cực mạnh sở hữu 1.000.000 HP. Toàn bộ người học trên server cùng nhau gây sát thương để giải cứu thị trường!",
      defaultLeaderboardNames: ["Sói Già Phố Wall", "Thầy Giáo Định Giá", "Chiến Thần CFA"],
      defaultWarriorName: "Chiến binh Server",
      questions: [
        {
          prompt: "Khủng hoảng nợ dưới chuẩn (Subprime Mortgage) năm 2008 khởi nguồn chính từ đâu?",
          options: [
            "Nợ xấu chứng khoán hóa quá đà & Định giá tín nhiệm sai lầm",
            "Giá dầu mỏ giảm đột ngột",
            "Lạm phát tiền tệ ở Châu Âu",
          ],
        },
        {
          prompt:
            "Khi Ngân hàng Trung ương liên tục nâng lãi suất điều hành (Hawk Policy), thị trường tài sản thường có xu hướng nào?",
          options: [
            "Biến động giảm do chi phí vốn tăng & định giá chiết khấu giảm",
            "Tăng trưởng bùng nổ ngay lập tức",
            "Không ảnh hưởng",
          ],
        },
        {
          prompt: "Chỉ số VIX (Volatility Index) trên thị trường tài chính thường đại diện cho điều gì?",
          options: [
            "Chỉ số đo lường mức độ sợ hãi/biến động của thị trường",
            "Tỷ lệ lạm phát mục tiêu",
            "Tỷ lệ thất nghiệp",
          ],
        },
        {
          prompt:
            "Trong mô hình Black-Scholes định giá quyền chọn, biến số nào tác động mạnh nhất đến Giá trị Thời gian (Time Value)?",
          options: [
            "Độ biến động lịch sử/nội hàm (Implied Volatility)",
            "Số dư tiền gửi",
            "Mệnh giá cổ phiếu",
          ],
        },
        {
          prompt:
            "Chiến lược Hedging (Phòng hộ) bằng hợp đồng Tương lai (Futures Contract) giúp doanh nghiệp đạt mục tiêu gì?",
          options: [
            "Cố định chi phí/doanh thu rủi ro biến động giá trong tương lai",
            "Gia tăng nợ vay ngân hàng",
            "Trốn thuế doanh nghiệp",
          ],
        },
        {
          prompt:
            "Khi lợi suất trái phiếu chính phủ Mỹ kỳ hạn 10 năm tăng mạnh, định giá cổ phiếu tăng trưởng thường chịu áp lực vì sao?",
          options: [
            "Tỷ lệ chiết khấu tăng làm giá trị hiện tại của dòng tiền tương lai giảm",
            "Doanh thu của doanh nghiệp tự động giảm ngay",
            "Cổ tức bắt buộc phải bị cắt",
          ],
        },
        {
          prompt:
            "Một ngân hàng có tỷ lệ nợ xấu (NPL) tăng mạnh nhưng vẫn báo lợi nhuận đẹp. Nhà phân tích nên nghi ngờ điều gì đầu tiên?",
          options: [
            "Khả năng trích lập dự phòng chưa đủ hoặc ghi nhận lợi nhuận chưa phản ánh rủi ro tín dụng",
            "Ngân hàng chắc chắn đang tăng trưởng bền vững",
            "Chỉ số NPL không liên quan gì đến chất lượng lợi nhuận",
          ],
        },
        {
          prompt: "Trong khủng hoảng thanh khoản, tài sản nào thường bị bán đầu tiên trong danh mục tổ chức?",
          options: [
            "Tài sản thanh khoản cao, dễ bán nhanh để lấy tiền mặt",
            "Tài sản vô hình không thể giao dịch",
            "Các khoản chi phí trả trước",
          ],
        },
        {
          prompt: "Nếu spread tín dụng doanh nghiệp (credit spread) nới rộng đột ngột, tín hiệu phổ biến nhất là gì?",
          options: [
            "Thị trường đang yêu cầu premium rủi ro cao hơn vì lo ngại tín dụng/xác suất vỡ nợ tăng",
            "Doanh nghiệp tự động được nâng hạng tín nhiệm",
            "Chi phí vốn cổ phần giảm ngay",
          ],
        },
        {
          prompt: "Một quỹ dùng đòn bẩy cao để ôm tài sản dài hạn nhưng tài trợ bằng vốn ngắn hạn. Rủi ro lớn nhất là gì?",
          options: [
            "Rủi ro mismatch kỳ hạn và bị ép thanh lý khi nguồn vốn ngắn hạn rút đi",
            "Rủi ro này luôn tốt vì ROE tăng",
            "Không có rủi ro nếu tài sản đang tăng giá",
          ],
        },
        {
          prompt: "Khi thị trường rơi vào panic selling, chỉ báo nào thường phản ánh nhu cầu trú ẩn tăng lên?",
          options: [
            "Giá trái phiếu chính phủ tăng và lợi suất giảm",
            "P/E toàn thị trường mở rộng mạnh vì ai cũng lạc quan",
            "Margin lending tăng vọt do tâm lý hưng phấn",
          ],
        },
        {
          prompt: "Trong phân tích khủng hoảng doanh nghiệp, chỉ số nào cảnh báo sớm áp lực thanh khoản ngắn hạn?",
          options: [
            "Current ratio và dòng tiền từ hoạt động kinh doanh suy yếu",
            "Số lượng nhân viên không đổi",
            "Logo thương hiệu mới",
          ],
        },
        {
          prompt: "Một doanh nghiệp báo EBITDA tăng nhưng CFO âm kéo dài. Với boss tài chính, đây thường là dấu hiệu gì?",
          options: [
            "Lợi nhuận kế toán chưa chuyển hóa thành tiền mặt, cần soi chất lượng earnings",
            "Doanh nghiệp chắc chắn rẻ hơn",
            "Không ảnh hưởng gì đến rủi ro",
          ],
        },
        {
          prompt: "Khi FED pivot từ hawkish sang dovish, nhóm tài sản nào thường phản ứng tích cực sớm nhất?",
          options: [
            "Tài sản nhạy cảm lãi suất như cổ phiếu tăng trưởng và trái phiếu dài hạn",
            "Tiền mặt không sinh lời",
            "Các khoản phải thu khách hàng",
          ],
        },
        {
          prompt: "Một cú short squeeze xảy ra khi nào?",
          options: [
            "Người bán khống buộc phải mua lại cổ phiếu vì giá tăng mạnh, làm giá càng bị đẩy lên",
            "Doanh nghiệp mua lại toàn bộ nợ vay",
            "Lợi nhuận gộp giảm do giá nguyên liệu tăng",
          ],
        },
      ],
    },
  },
};

export const worldSpacesEn: typeof worldSpacesVi = {
  worldSpaces: {
    district: {
      exitToStreet: "Back to the street",
      towerLobby: "Self-Study Tower",
      stageFloor: "Stage lobby",
      towerStopStreet: "Lobby · back to the street",
      towerStopStage: "Finance learning stages",
      gameSquare: "Finance Game Square",
      gameSquareShort: "Game Square",
      park: "Ben Nghe Park",
      parkShort: "Park",
      center: "Central Plaza",
      cafe: "Digits & Books Cafe",
      street: "Saigon Career Street",
      levelRequirement: "requires level {level}",
      library: {
        label: "Saigon Library",
        blurb: "A shared reading room - meet others who are studying",
      },
      studyGroup: {
        label: "Group study room",
        blurb: "An eight-seat table, 25-minute sessions with your group",
      },
      civic: {
        baBaoCao: {
          label: "Three Statements Room",
          blurb: "Touch one line item and watch it flow through all three statements",
        },
        thapLaiKep: {
          label: "Compound Interest Tower",
          blurb: "One floor per year - climb it to see compounding at work",
        },
        phongLbo: {
          label: "Capital Stack Room",
          blurb: "Senior debt at the bottom, equity on top - who loses first",
        },
        cuaHang: {
          label: "Shop & Fitting Mirror",
          blurb: "Try gear on before you buy it",
        },
        bangVang: {
          label: "Hall of Fame",
          blurb: "Who's leading in each competency",
        },
        phongThi: {
          label: "Exam room",
          blurb: "CFA and FRM mock exams, plus stage checkpoints",
        },
        canHo: {
          label: "Your apartment",
          blurb: "Your streak, trophies, and career goals",
        },
        baoTang: {
          label: "Museum of Finance",
          blurb: "1929, 2008, inflation - and the lesson behind each one",
        },
        nhaBanBe: {
          label: "Friends' block",
          blurb: "Visit your friends' streaks and trophy cases",
        },
        vongQuayTien: {
          label: "Cash Cycle Room",
          blurb: "Does cash arrive before it goes out - and who's financing whom",
        },
        phanBoRuiRo: {
          label: "Risk & Allocation Room",
          blurb: "Why mixing two assets can be less risky than either one's average",
        },
        banTron: {
          label: "Teach-Back Round Table",
          blurb: "Explain it in your own words - the only place that knows if you truly understood",
        },
      },
    },
    lobbyStations: {
      hocBai: {
        room: "Today's lesson room",
        blurb: "The next lesson in your path",
        formula: "FV = PV × (1 + r)ⁿ",
        note: "Compound interest - the foundation everything else in finance builds on",
      },
      kiemTra: {
        room: "Practice test room",
        blurb: "Stage-by-stage tests, scored instantly",
        formula: "NPV = Σ CFₜ / (1 + r)ᵗ − C₀",
        note: "A project is worth doing when NPV > 0",
      },
      onTap: {
        room: "Wrong-answer review room",
        blurb: "The questions you got wrong, resurfaced at the right time",
        formula: "R(t) ≈ e^(−t / S)",
        note: "The forgetting curve: without review, memory decays exponentially",
      },
      congCu: {
        room: "Tools room",
        blurb: "DCF, WACC and compound-interest calculators",
        formula: "EV = Σ FCFₜ/(1+w)ᵗ + TV/(1+w)ⁿ",
        note: "Discounted cash flow - how a business gets valued",
      },
      cfa: {
        room: "CFA room",
        blurb: "All three levels, following the official curriculum",
        formula: "WACC = E/V × Rₑ + D/V × R_d × (1 − t)",
        note: "Weighted average cost of capital, net of debt's tax shield",
      },
      frm: {
        room: "FRM room",
        blurb: "Financial risk management",
        formula: "VaR = μ − z_α × σ",
        note: "The worst loss expected in α% of cases",
      },
      phongVan: {
        room: "Interview room",
        blurb: "Technical IB questions, scored as you answer",
        formula: "EV = Market cap + Debt − Cash",
        note: "Enterprise value - the opening question of every IB interview",
      },
      suNghiep: {
        room: "Career room",
        blurb: "How far you are from the career you want",
        formula: "ROE = Net margin × Asset turnover × Leverage",
        note: "The DuPont breakdown: the only three sources of ROE",
      },
    },
    worldBoss: {
      fallbackName: "Financial Crisis Titan",
      fallbackDescription:
        "A massive weekly Server World Boss with 1,000,000 HP. Every learner on the server deals damage together to rescue the market!",
      defaultLeaderboardNames: ["Wall Street Old Wolf", "The Valuation Teacher", "CFA War God"],
      defaultWarriorName: "Server Warrior",
      questions: [
        {
          prompt: "What was the main origin of the 2008 subprime mortgage crisis?",
          options: [
            "Excessive mortgage securitization and mispriced credit ratings",
            "A sudden drop in oil prices",
            "Currency inflation in Europe",
          ],
        },
        {
          prompt: "When a central bank keeps raising its policy rate (a hawkish stance), asset markets tend to do what?",
          options: [
            "Fall in value, since higher funding costs lower discounted valuations",
            "Boom immediately",
            "Stay unaffected",
          ],
        },
        {
          prompt: "What does the VIX (Volatility Index) typically represent in financial markets?",
          options: [
            "A gauge of the market's fear or volatility level",
            "The target inflation rate",
            "The unemployment rate",
          ],
        },
        {
          prompt: "In the Black-Scholes option pricing model, which variable most strongly drives Time Value?",
          options: [
            "Historical/implied volatility",
            "Cash account balance",
            "Share par value",
          ],
        },
        {
          prompt: "What goal does hedging with futures contracts help a business achieve?",
          options: [
            "Locking in costs or revenue against future price swings",
            "Increasing bank borrowing",
            "Evading corporate tax",
          ],
        },
        {
          prompt: "When the US 10-year Treasury yield rises sharply, why do growth stock valuations usually come under pressure?",
          options: [
            "A higher discount rate lowers the present value of future cash flows",
            "Company revenue automatically drops right away",
            "Dividends are forced to be cut",
          ],
        },
        {
          prompt: "A bank's non-performing loan (NPL) ratio is rising sharply but it still reports strong profit. What should an analyst suspect first?",
          options: [
            "Provisions may be insufficient, or reported profit isn't reflecting credit risk",
            "The bank is certainly growing sustainably",
            "The NPL ratio has nothing to do with earnings quality",
          ],
        },
        {
          prompt: "During a liquidity crisis, which assets in an institutional portfolio tend to get sold first?",
          options: [
            "Highly liquid assets that can be sold quickly for cash",
            "Intangible assets that can't be traded",
            "Prepaid expenses",
          ],
        },
        {
          prompt: "If corporate credit spreads widen suddenly, what is the most common signal?",
          options: [
            "The market is demanding a higher risk premium on rising credit/default concerns",
            "The company is automatically upgraded",
            "The cost of equity drops right away",
          ],
        },
        {
          prompt: "A fund uses high leverage to hold long-term assets funded by short-term borrowing. What is the biggest risk?",
          options: [
            "Maturity mismatch risk, forcing a fire sale when short-term funding is pulled",
            "This is always fine because it boosts ROE",
            "There's no risk as long as asset prices keep rising",
          ],
        },
        {
          prompt: "During panic selling, which indicator typically reflects rising demand for safe havens?",
          options: [
            "Government bond prices rise and yields fall",
            "Market-wide P/E expands sharply because everyone turns optimistic",
            "Margin lending surges on euphoric sentiment",
          ],
        },
        {
          prompt: "In analyzing a corporate crisis, which metric gives an early warning of short-term liquidity pressure?",
          options: [
            "A weakening current ratio and operating cash flow",
            "An unchanged headcount",
            "A new company logo",
          ],
        },
        {
          prompt: "A company reports rising EBITDA but persistently negative operating cash flow. For a finance boss, what does this usually signal?",
          options: [
            "Accounting profit hasn't converted into cash yet - earnings quality needs scrutiny",
            "The company is definitely cheap",
            "It has no bearing on risk at all",
          ],
        },
        {
          prompt: "When the Fed pivots from hawkish to dovish, which asset group tends to react positively first?",
          options: [
            "Rate-sensitive assets like growth stocks and long-duration bonds",
            "Cash, which earns no return",
            "Accounts receivable",
          ],
        },
        {
          prompt: "When does a short squeeze happen?",
          options: [
            "Short sellers are forced to buy back shares as the price surges, pushing it up further",
            "A company buys back all of its debt",
            "Gross margin falls because input costs rise",
          ],
        },
      ],
    },
  },
};
