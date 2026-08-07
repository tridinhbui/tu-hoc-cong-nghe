/** Nội dung dữ liệu (không phải chuỗi UI) cho bốn phòng ở Khu Nghề Nghiệp.
 *
 *  Các file lib/three-statement-model.ts, lib/teach-back.ts, lib/cash-cycle.ts
 *  và lib/portfolio-risk.ts giữ mọi thứ CẤU TRÚC (id, số, dấu, chỉ số đáp án
 *  đúng, thứ tự) và gọi vào đây để lấy chuỗi hiển thị. Xem AGENTS.md, mục
 *  "Translating the UI" - đây là một trong những module dữ liệu mà
 *  scripts/i18n-coverage.mjs không nhìn thấy, vì nó chỉ chấm các vị trí hiển
 *  thị trong .tsx.
 *
 *  QUAN TRỌNG: `t.districtContent` chưa được nối vào cây Dictionary chính -
 *  việc đó do một tác vụ khác làm ở lib/i18n/dictionaries/sections/index.ts.
 *  Đừng tự nối; đợi tsc báo lỗi "Property 'districtContent' does not exist"
 *  là đúng, không phải lỗi cần sửa ở đây. */

export const districtContentVi = {
  districtContent: {
    threeStatement: {
      impacts: {
        depreciation: {
          label: "Khấu hao tăng 100",
          question: "Khấu hao là chi phí. Vậy tiền mặt tăng hay giảm?",
          income: "Khấu hao +100 → EBIT −100 → lợi nhuận sau thuế −80 (thuế 20% gánh đỡ 20).",
          balance: "Tài sản cố định −100, vốn chủ −80 theo lợi nhuận, và tiền mặt +20.",
          cashflow: "CFO = LNST (−80) + khấu hao cộng lại (+100) = +20. Khấu hao không chi tiền.",
          punchline:
            "Tiền mặt TĂNG 20 chứ không giảm: khấu hao chỉ làm giảm thuế phải nộp, còn bản thân nó không ra khỏi két.",
        },
        "revenue-credit": {
          label: "Bán chịu thêm 200",
          question: "Doanh thu +200 nhưng khách chưa trả tiền. Tiền mặt đi đâu?",
          income: "Doanh thu +200 → LNST +160. Kết quả kinh doanh trông rất đẹp.",
          balance: "Phải thu +200, vốn chủ +160.",
          cashflow: "CFO = LNST (+160) − tăng phải thu (−200) = −40. Tiền GIẢM.",
          punchline: "Lãi tăng mà tiền giảm. Đây là cách một doanh nghiệp đang có lãi vẫn chết vì hết tiền.",
        },
        "buy-ppe": {
          label: "Mua máy 300 bằng tiền",
          question: "Chi 300 mua tài sản. Lợi nhuận năm nay giảm bao nhiêu?",
          income: "Không đổi một đồng. Mua tài sản không phải chi phí - nó đổi hình dạng của tài sản.",
          balance: "Tài sản cố định +300, tiền mặt −300. Tổng tài sản không đổi.",
          cashflow: "CFI = −300. Tiền ra khỏi két đủ 300 ngay hôm nay.",
          punchline:
            "Lợi nhuận không giảm đồng nào, nhưng tiền mất 300. Chi phí sẽ đến dần qua khấu hao các năm sau.",
        },
        "take-debt": {
          label: "Vay thêm 400",
          question: "Vay 400 về két. Phần thuộc về chủ sở hữu tăng bao nhiêu?",
          income: "Không đổi lúc vay. Lãi vay mới sẽ ăn vào lợi nhuận các kỳ sau.",
          balance: "Tiền mặt +400, nợ vay +400. Vốn chủ không đổi một đồng.",
          cashflow: "CFF = +400. Không có dòng nào của CFO hay CFI nhúc nhích - tiền này là tiền đi vay.",
          punchline: "Tiền trong két tăng 400 nhưng phần của chủ sở hữu không đổi - vay không làm ai giàu lên.",
        },
      },
    },
    teachBack: {
      topics: {
        "loi-nhuan-vs-tien": {
          label: "Lãi mà vẫn chết vì hết tiền",
          audience: "một người bạn mở quán ăn, chưa học tài chính bao giờ",
          prompt: "Bạn của bạn nói: 'Quán tôi tháng nào cũng lãi, sao tài khoản cứ cạn?' Giải thích cho họ.",
          points: {
            "ghi-nhan": {
              label: "Doanh thu được ghi khi bán, không phải khi tiền về",
              markers: ["ghi nhận", "ghi nhan", "bán chịu", "ban chiu", "công nợ", "cong no", "chưa thu", "chua thu", "phải thu", "phai thu"],
            },
            "von-luu-dong": {
              label: "Tiền kẹt trong hàng tồn và khoản phải thu",
              markers: ["tồn kho", "ton kho", "hàng tồn", "hang ton", "vốn lưu động", "von luu dong", "nhập hàng", "nhap hang"],
            },
            "chi-khong-vao-lai": {
              label: "Có khoản chi tiền mà không nằm trong lãi lỗ",
              markers: ["trả nợ", "tra no", "mua máy", "mua may", "đầu tư", "dau tu", "tài sản cố định", "tai san co dinh", "gốc vay", "goc vay"],
            },
            "khau-hao": {
              label: "Ngược lại, có chi phí không hề chi tiền",
              markers: ["khấu hao", "khau hao", "không chi tiền", "khong chi tien", "không ra khỏi két", "khong ra khoi ket"],
            },
          },
        },
        "lai-kep": {
          label: "Vì sao lãi kép mạnh muộn chứ không mạnh sớm",
          audience: "em họ 18 tuổi vừa đi làm thêm",
          prompt: "Em họ hỏi: 'Gửi 1 triệu mỗi tháng thì bao giờ mới thành nhiều?' Giải thích vì sao thời gian quan trọng hơn số tiền.",
          points: {
            "lai-tren-lai": {
              label: "Lãi sinh ra lãi, chứ không chỉ vốn sinh ra lãi",
              markers: ["lãi trên lãi", "lai tren lai", "lãi mẹ", "lai me", "lãi chồng lãi", "lai chong lai", "tái đầu tư", "tai dau tu", "cộng dồn", "cong don"],
            },
            "phi-tuyen": {
              label: "Đường đi cong lên, không phải đường thẳng",
              markers: ["cấp số nhân", "cap so nhan", "hàm mũ", "ham mu", "đường cong", "duong cong", "không tuyến tính", "khong tuyen tinh", "gấp đôi", "gap doi"],
            },
            "phan-lon-o-cuoi": {
              label: "Phần lớn số tiền đến ở những năm cuối",
              markers: ["năm cuối", "nam cuoi", "về sau", "ve sau", "cuối chặng", "cuoi chang", "10 năm cuối", "10 nam cuoi", "giai đoạn sau", "giai doan sau"],
            },
            "bat-dau-som": {
              label: "Nên bắt đầu sớm quan trọng hơn bắt đầu nhiều",
              markers: ["bắt đầu sớm", "bat dau som", "càng sớm", "cang som", "thời gian", "thoi gian", "tuổi", "tuoi"],
            },
          },
        },
        "da-dang-hoa": {
          label: "Vì sao trộn hai thứ lại ít rủi ro hơn",
          audience: "một đồng nghiệp đang định dồn hết tiền vào một cổ phiếu",
          prompt: "Đồng nghiệp nói: 'Chia tiền ra làm gì, tôi chọn đúng một mã là được.' Bạn nói lại thế nào để họ thấy trộn lại an toàn hơn mà không mất lợi nhuận?",
          points: {
            "khong-cung-xuong": {
              label: "Hai tài sản không cùng xuống một lúc",
              markers: ["tương quan", "tuong quan", "cùng lúc", "cung luc", "ngược chiều", "nguoc chieu", "bù nhau", "bu nhau", "không cùng", "khong cung"],
            },
            "duoi-trung-binh": {
              label: "Rủi ro danh mục nằm dưới trung bình rủi ro hai phần",
              markers: ["dưới trung bình", "duoi trung binh", "thấp hơn trung bình", "thap hon trung binh", "ít hơn trung bình", "it hon trung binh"],
            },
            "loi-nhuan-khong-mat": {
              label: "Mà lợi nhuận kỳ vọng thì không mất đi",
              markers: ["lợi nhuận vẫn", "loi nhuan van", "không mất", "khong mat", "giữ nguyên", "giu nguyen", "vẫn bằng", "van bang", "trung bình có trọng số", "trung binh co trong so"],
            },
            "gioi-han": {
              label: "Nhưng nếu chúng đi khít nhau thì không được gì",
              markers: ["cùng ngành", "cung nganh", "giống nhau", "giong nhau", "khít", "khit", "cùng chiều", "cung chieu", "không được gì", "khong duoc gi"],
            },
          },
        },
      },
    },
    cashCycle: {
      scenarios: {
        "xay-dung": {
          label: "Nhà thầu xây dựng",
          question: "Thu tiền sau 120 ngày, trả nhà cung cấp sau 60. Cần sẵn bao nhiêu ngày doanh thu?",
          why: "Chủ đầu tư nghiệm thu xong mới trả, và giữ lại một phần bảo hành. Vật tư thì phải mua trước.",
          punchline:
            "105 ngày doanh thu nằm ngoài két. Nhà thầu có lãi trên giấy vẫn phải đi vay để trả lương - và đó là lý do ngành này sống bằng vốn vay.",
        },
        "san-xuat": {
          label: "Nhà máy sản xuất",
          question: "Hàng nằm kho 60 ngày. Rút kho xuống 30 thì tiền đổi bao nhiêu?",
          why: "Bán buôn cho đại lý nên có công nợ, và phải trữ nguyên liệu để chạy máy liên tục.",
          punchline:
            "Vòng quay 65 ngày. Rút kho từ 60 xuống 30 là kéo nó còn 35 - mỗi ngày rút khỏi kho trả về két đúng một ngày doanh thu. Giảm kho không phải việc của thủ kho, nó là quyết định tài chính.",
        },
        "ban-le": {
          label: "Chuỗi siêu thị",
          question: "Khách trả tiền ngay, nhà cung cấp đợi 55 ngày. Vòng quay bằng bao nhiêu?",
          why: "Bán lẻ thu tiền mặt tại quầy, còn nhà cung cấp phải chịu công nợ để được lên kệ.",
          punchline:
            "ÂM 28 ngày. Siêu thị cầm tiền của khách gần một tháng trước khi phải trả nhà cung cấp - mở thêm cửa hàng TẠO ra tiền chứ không ngốn tiền.",
        },
        "thue-bao": {
          label: "Phần mềm thuê bao",
          question: "Thu trước cả năm, không có kho. Vòng quay bằng bao nhiêu?",
          why: "Khách trả trước khi dùng, và sản phẩm là bản sao nên không có hàng tồn.",
          punchline:
            "ÂM 30 ngày, và đó là trước khi tính tiền thu trước cả năm. Tăng trưởng tự nuôi chính nó - lý do mô hình thuê bao được định giá cao hơn.",
        },
      },
    },
    portfolioRisk: {
      stocksLabel: "Cổ phiếu",
      bondsLabel: "Trái phiếu",
      rhoCases: {
        am: {
          label: "Ngược chiều (−0,5)",
          question: "Hai tài sản thường đi ngược nhau. Danh mục 50/50 dao động bao nhiêu?",
          meaning:
            "Cái này xuống thì cái kia thường lên. Đây là điều người ta mong đợi ở trái phiếu khi cổ phiếu sập, và là lý do danh mục 60/40 tồn tại.",
        },
        khong: {
          label: "Không liên quan (0)",
          question: "Hai tài sản không liên quan gì nhau. Rủi ro có xuống dưới trung bình không?",
          meaning:
            "Không cái nào nói gì về cái kia. Ngay cả ở đây - không cần chúng đi ngược nhau - rủi ro vẫn xuống dưới trung bình.",
        },
        "cung-yeu": {
          label: "Cùng chiều vừa (0,5)",
          question: "Hai tài sản thường cùng lên cùng xuống. Còn được lợi gì không?",
          meaning: "Cùng chiều nhưng chưa khít. Lợi ích nhỏ lại nhưng chưa mất - đây mới là mức thường gặp thật ngoài đời.",
        },
        khit: {
          label: "Khít hoàn toàn (1)",
          question: "Hai tài sản đi khít nhau từng nhịp. Đa dạng hoá còn cho gì?",
          meaning:
            "Đi khít nhau từng nhịp thì thực ra chỉ là một tài sản mang hai cái tên. Đây là trường hợp DUY NHẤT đa dạng hoá không cho gì cả.",
        },
      },
      verdictNoGain: "Đa dạng hoá không cho gì: hai tài sản khít nhau thì trộn kiểu gì rủi ro cũng đúng bằng trung bình.",
      verdictGain: "Rủi ro nằm DƯỚI trung bình có trọng số, còn lợi nhuận thì đúng bằng trung bình. Chênh lệch đó là thứ duy nhất trong tài chính được cho không.",
    },
  },
};

export const districtContentEn: typeof districtContentVi = {
  districtContent: {
    threeStatement: {
      impacts: {
        depreciation: {
          label: "Depreciation up by 100",
          question: "Depreciation is an expense. So does cash go up or down?",
          income: "Depreciation +100 → EBIT −100 → net income −80 (20% tax absorbs 20 of it).",
          balance: "Fixed assets −100, equity −80 following net income, and cash +20.",
          cashflow: "CFO = net income (−80) + depreciation added back (+100) = +20. Depreciation is not a cash outflow.",
          punchline:
            "Cash goes UP by 20, not down: depreciation only lowers the tax bill — it never leaves the vault itself.",
        },
        "revenue-credit": {
          label: "200 more in sales on credit",
          question: "Revenue +200 but the customer hasn't paid yet. Where does the cash go?",
          income: "Revenue +200 → net income +160. The results look great.",
          balance: "Receivables +200, equity +160.",
          cashflow: "CFO = net income (+160) − increase in receivables (−200) = −40. Cash goes DOWN.",
          punchline: "Profit rises while cash falls. This is how a profitable business still dies from running out of cash.",
        },
        "buy-ppe": {
          label: "Buy equipment for 300 in cash",
          question: "You spend 300 buying an asset. How much does this year's profit fall?",
          income: "Not a single unit. Buying an asset isn't an expense — it just changes the shape of the asset.",
          balance: "Fixed assets +300, cash −300. Total assets stay the same.",
          cashflow: "CFI = −300. The full 300 leaves the vault today.",
          punchline:
            "Profit doesn't fall at all, but cash drops by 300. The expense will arrive gradually through depreciation in later years.",
        },
        "take-debt": {
          label: "Borrow another 400",
          question: "You borrow 400 into the vault. How much does the owners' share increase?",
          income: "No change at the moment of borrowing. The new interest expense will eat into profit in later periods.",
          balance: "Cash +400, debt +400. Equity doesn't change by a single unit.",
          cashflow: "CFF = +400. Neither CFO nor CFI moves at all — this cash came from borrowing.",
          punchline: "Cash in the vault rises by 400, but the owners' share doesn't change — borrowing doesn't make anyone richer.",
        },
      },
    },
    teachBack: {
      topics: {
        "loi-nhuan-vs-tien": {
          label: "Profitable, yet dying from running out of cash",
          audience: "a friend who runs a restaurant and has never studied finance",
          prompt: "Your friend says: 'My restaurant is profitable every month, so why does the account keep running dry?' Explain it to them.",
          points: {
            "ghi-nhan": {
              label: "Revenue is recorded when sold, not when cash arrives",
              markers: ["recorded", "recognized", "recognised", "on credit", "receivable", "not yet collected", "not yet paid", "unpaid"],
            },
            "von-luu-dong": {
              label: "Cash is tied up in inventory and receivables",
              markers: ["inventory", "stock", "working capital", "receivables", "stocked up", "tied up"],
            },
            "chi-khong-vao-lai": {
              label: "Some cash outflows never show up in profit or loss",
              markers: ["loan repayment", "repay debt", "buy equipment", "capex", "investment", "fixed asset", "principal"],
            },
            "khau-hao": {
              label: "Conversely, some expenses never cost any cash at all",
              markers: ["depreciation", "non-cash", "doesn't cost cash", "no cash leaves", "not a cash outflow"],
            },
          },
        },
        "lai-kep": {
          label: "Why compound interest is strong late, not strong early",
          audience: "an 18-year-old cousin who just started their first job",
          prompt: "Your cousin asks: 'If I deposit 1 million a month, when does it actually become a lot?' Explain why time matters more than the amount.",
          points: {
            "lai-tren-lai": {
              label: "Interest earns interest, not just the principal earning interest",
              markers: ["interest on interest", "compounding", "compound", "reinvest", "accumulate"],
            },
            "phi-tuyen": {
              label: "The path curves upward, it isn't a straight line",
              markers: ["exponential", "curve", "not linear", "nonlinear", "doubles", "doubling"],
            },
            "phan-lon-o-cuoi": {
              label: "Most of the money arrives in the final years",
              markers: ["final years", "later years", "later on", "back-loaded", "last stretch", "last decade"],
            },
            "bat-dau-som": {
              label: "So starting early matters more than starting with more money",
              markers: ["start early", "earlier", "sooner", "time in the market", "age"],
            },
          },
        },
        "da-dang-hoa": {
          label: "Why mixing two assets lowers risk",
          audience: "a colleague about to put all their money into one stock",
          prompt: "Your colleague says: 'Why split it up, I just need to pick the right one stock.' How do you show them that mixing is safer without giving up return?",
          points: {
            "khong-cung-xuong": {
              label: "Two assets don't fall at the same time",
              markers: ["correlation", "correlated", "at the same time", "opposite direction", "offset", "not both", "uncorrelated"],
            },
            "duoi-trung-binh": {
              label: "Portfolio risk sits below the average of the two individual risks",
              markers: ["below average", "lower than average", "less than the average"],
            },
            "loi-nhuan-khong-mat": {
              label: "Yet expected return doesn't get lost at all",
              markers: ["return stays", "doesn't lose", "unchanged", "stays the same", "still equals", "weighted average return"],
            },
            "gioi-han": {
              label: "But if they move in lockstep, there's nothing to gain",
              markers: ["same industry", "identical", "lockstep", "same direction", "nothing to gain", "no benefit"],
            },
          },
        },
      },
    },
    cashCycle: {
      scenarios: {
        "xay-dung": {
          label: "Construction contractor",
          question: "You collect payment after 120 days, and pay suppliers after 60. How many days of revenue do you need on hand?",
          why: "The client only pays after sign-off, and withholds a retention amount. Materials have to be bought upfront.",
          punchline:
            "105 days of revenue sit outside the vault. A contractor can be profitable on paper and still need to borrow to make payroll — that's why this industry runs on debt.",
        },
        "san-xuat": {
          label: "Manufacturing plant",
          question: "Inventory sits for 60 days. If you cut it to 30, how much cash does that free up?",
          why: "It sells wholesale to distributors on credit, and has to stock raw materials to keep the line running.",
          punchline:
            "The cycle is 65 days. Cutting inventory from 60 to 30 brings it down to 35 — every day of inventory cut returns exactly one day of revenue to the vault. Cutting inventory isn't a warehouse decision, it's a financial one.",
        },
        "ban-le": {
          label: "Supermarket chain",
          question: "Customers pay instantly, suppliers wait 55 days. What is the cycle?",
          why: "Retail collects cash at the register, while suppliers carry the credit just to get shelf space.",
          punchline:
            "MINUS 28 days. The supermarket holds the customer's cash for almost a month before it has to pay suppliers — opening another store GENERATES cash instead of consuming it.",
        },
        "thue-bao": {
          label: "Subscription software",
          question: "You collect a full year upfront and carry no inventory. What is the cycle?",
          why: "Customers pay before they use the product, and the product is a copy, so there's no inventory at all.",
          punchline:
            "MINUS 30 days, and that's before even counting the year paid upfront. Growth feeds itself — why subscription models get priced higher.",
        },
      },
    },
    portfolioRisk: {
      stocksLabel: "Stocks",
      bondsLabel: "Bonds",
      rhoCases: {
        am: {
          label: "Negatively correlated (−0.5)",
          question: "The two assets usually move opposite each other. How much does a 50/50 portfolio swing?",
          meaning:
            "When one falls, the other usually rises. This is what people expect from bonds when stocks crash, and it's why the 60/40 portfolio exists.",
        },
        khong: {
          label: "Uncorrelated (0)",
          question: "The two assets have nothing to do with each other. Does risk still drop below the average?",
          meaning:
            "Neither one says anything about the other. Even here — with no need for them to move opposite each other — risk still drops below average.",
        },
        "cung-yeu": {
          label: "Mildly correlated (0.5)",
          question: "The two assets usually rise and fall together. Is there still any benefit?",
          meaning: "Same direction, but not in lockstep. The benefit shrinks but isn't gone — and this is actually the level most commonly seen in real life.",
        },
        khit: {
          label: "Perfectly correlated (1)",
          question: "The two assets move in lockstep, beat for beat. What does diversifying still give you?",
          meaning:
            "Moving in lockstep beat for beat means it's really just one asset wearing two names. This is the ONE AND ONLY case where diversification gives you nothing.",
        },
      },
      verdictNoGain: "Diversification gives you nothing: when two assets move in lockstep, no mix changes the risk from the average.",
      verdictGain: "Risk sits BELOW the weighted average, while return sits exactly AT it. That gap is the one thing finance ever gives you for free.",
    },
  },
};
