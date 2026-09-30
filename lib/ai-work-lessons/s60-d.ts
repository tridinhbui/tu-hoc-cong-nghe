import type { Lesson } from "../lesson-types";

// Chặng 60, bài 16-20. Giáo trình: scripts/curriculum/stage-60.json.
// Nội dung viết tay, không dựa vào tính năng riêng của công cụ nào; số liệu trong biểu đồ là số liệu minh hoạ.
export const S60_D_LESSONS: Lesson[] = [
  {
    "id": 2615,
    "slug": "cham-diem-bot-bang-bang-dung-sai-thieu-nguy-hiem",
    "title": "Chặng 60, Bài 16: Chấm bot bằng bảng: đúng, sai, thiếu, nguy hiểm",
    "subtitle": "Chấm bài kiểm tra cho bot: mỗi câu một dòng, mỗi dòng một nhóm.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "📝",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Đọc lướt vài câu trả lời rồi thấy ổn là cách chắc chắn nhất để bỏ sót câu sai nặng. Một cái bảng bốn nhóm giúp bạn biết chỗ nào sửa trước, và lần sau sửa xong còn so được bot đã khá hơn thật hay chưa.",
    "openingQuestion": "Bạn cho bot của shop trả lời thử 25 câu khách hay hỏi. Đọc xong, bạn thấy hầu hết trông ổn. Bước hợp lý tiếp theo là gì?",
    "openingOptions": [
      "Cho bot gặp khách thật, có gì khách phản ánh thì sửa",
      "Ghi từng câu vào một nhóm: đúng, sai, thiếu hoặc nguy hiểm",
      "Hỏi chính bot xem nó tự chấm mình được mấy điểm",
      "Chọn 3 câu trả lời hay nhất và dùng làm mẫu cho cả bot sau này"
    ],
    "correctOption": 1,
    "explanation": "Cảm giác 'trông ổn' đến từ việc câu trả lời viết trôi chảy, không phải từ việc nó khớp tài liệu của shop. Khi ghi từng câu vào bảng, bạn buộc phải đối chiếu với bảng giá hay chính sách thật, nên câu sai giá hay câu hứa quá tay lộ ra. Cho khách thật thử trước là để khách chịu hậu quả. Hỏi bot tự chấm thì nó có thể khen chính nó, và chọn ba câu hay nhất bỏ qua 22 câu còn lại.",
    "diagram": [
      {
        "label": "Chạy 25 câu qua bot",
        "arrow": true
      },
      {
        "label": "Ghi mỗi câu vào một nhóm",
        "arrow": true
      },
      {
        "label": "Đếm từng nhóm trong bảng",
        "arrow": true
      },
      {
        "label": "Sửa nhóm nguy hiểm, rồi sai, rồi thiếu",
        "arrow": true
      },
      {
        "label": "Chạy lại đúng 25 câu và so"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: shop mỹ phẩm tự bán hàng online",
      "description": "Chị chủ shop chạy 25 câu qua bot và ghi vào bảng bốn nhóm. Số liệu minh hoạ: 17 câu đúng, 3 câu sai giá, 4 câu thiếu phí ship và 1 câu nguy hiểm, vì bot hứa hoàn tiền thay chị. Chị sửa câu nguy hiểm trước, rồi chạy lại cả 25 câu để chắc không có câu mới hỏng."
    },
    "quiz": [
      {
        "question": "Bot báo giá một chiếc áo là 290.000đ, còn bảng giá của shop ghi 250.000đ. Câu này thuộc nhóm nào?",
        "options": [
          "Nhóm sai, vì nói trái bảng giá",
          "Thiếu, vì bot vẫn nêu giá như khách cần biết",
          "Đúng, vì có nêu giá và giọng lịch sự",
          "Nguy hiểm, vì mọi câu nói về tiền đều nguy hiểm"
        ],
        "correct": 0,
        "explanation": "Nhóm sai là bot nói một điều trái với tài liệu của shop, như giá 290.000đ thay cho 250.000đ. Không phải thiếu, vì nó đưa ra thông tin chứ không bỏ sót. Không phải đúng, vì con số lệch. Nguy hiểm dành cho câu hứa hay tư vấn vượt quyền, không phải mọi câu có tiền."
      },
      {
        "question": "Khách hỏi \"mua một áo tổng hết bao nhiêu\". Bot chỉ báo giá áo, không nhắc phí ship 25.000đ của shop. Câu này thuộc nhóm nào?",
        "options": [
          "Sai, vì tổng bot báo nhỏ hơn thực tế",
          "Thiếu, vì đúng nhưng bỏ sót phí ship",
          "Đúng, vì giá áo bot nói vẫn khớp bảng giá",
          "Nguy hiểm, vì khách có thể bực khi thanh toán"
        ],
        "correct": 1,
        "explanation": "Bot không nói điều gì trái tài liệu, nó chỉ bỏ ra một phần khách cần để biết tổng tiền, nên là nhóm thiếu. Xếp vào sai sẽ làm bạn đi sửa dữ liệu giá vốn đã đúng. Xếp vào đúng là bỏ qua việc khách sẽ bất ngờ lúc thanh toán. Sẽ bực mình chưa đủ để gọi nguy hiểm."
      },
      {
        "question": "Khách phàn nàn hàng lỗi, bot trả lời \"Em hoàn tiền toàn bộ cho chị ngay bây giờ nhé\", dù chỉ chủ shop mới quyết định hoàn tiền. Nhóm nào?",
        "options": [
          "Sai, vì lời hứa hoàn tiền không có trong bảng giá của shop",
          "Thiếu, vì bot chưa hỏi mã đơn hàng của khách",
          "Nguy hiểm, vì bot cam kết điều shop chưa cho phép",
          "Đúng, vì bot xin lỗi và xử lý nhanh như khách mong muốn"
        ],
        "correct": 2,
        "explanation": "Lời hứa hoàn tiền là một cam kết mà chỉ người có quyền mới được đưa ra, nên gây thiệt hại thật nếu khách giữ bot lại lời đó. Nhóm sai dành cho thông tin lệch tài liệu. Thiếu mã đơn là lỗi nhỏ so với việc hứa tiền. Nhanh và lịch sự không làm cho một lời hứa vượt quyền thành đúng."
      },
      {
        "question": "Bảng chấm của bạn ra: 1 câu nguy hiểm, 3 câu sai, 6 câu thiếu, 15 câu đúng. Nên sửa nhóm nào trước?",
        "options": [
          "Nhóm thiếu, vì có 6 câu, nhiều nhất trong các nhóm lỗi",
          "Nhóm sai, vì 3 câu sai nhiều hơn 1 câu nguy hiểm",
          "Nhóm đúng, vì 15 câu đang tốt",
          "Nhóm nguy hiểm, dù chỉ có 1 câu"
        ],
        "correct": 3,
        "explanation": "Ưu tiên theo hậu quả, không theo số lượng: một lời hứa vượt quyền có thể làm shop mất tiền ngay, còn sáu câu thiếu chỉ làm khách phải hỏi thêm. Sau nhóm nguy hiểm mới đến nhóm sai, rồi thiếu. Nhóm đúng là phần để kiểm lại sau khi sửa, không phải phần cần sửa."
      },
      {
        "question": "Bot trả lời đúng 23 trong 25 câu thử, tức 92% (23 ÷ 25). Kết luận nào hợp lý nhất?",
        "options": [
          "Mới thấy được dạng lỗi, chưa đủ để nói chắc mức đúng với mọi khách",
          "Bot đúng khoảng 92% với mọi câu khách hỏi nên có thể mở ngay",
          "Bot sai 8%, nhỏ nên bỏ qua, không cần xem 2 câu sai là loại nào",
          "Bot đúng hơn 90% nên chỉ cần thử thêm đúng 1 câu nữa là xong"
        ],
        "correct": 0,
        "explanation": "25 câu là mẫu nhỏ: nó cho bạn thấy bot hay hỏng ở đâu, nhưng chưa đủ để coi 92% là mức thật với mọi khách. Quan trọng hơn là 2 câu sai thuộc nhóm nào: nếu có câu nguy hiểm thì 92% vẫn chưa đủ tốt. Thử thêm một câu không thay đổi được bản chất mẫu nhỏ."
      }
    ],
    "keyTakeaways": [
      "Chạy cùng một bộ 25 câu và ghi mỗi câu vào đúng một nhóm: đúng, sai, thiếu, nguy hiểm.",
      "Sai là nói trái tài liệu; thiếu là đúng nhưng bỏ sót ý khách cần; nguy hiểm là hứa hoặc khuyên vượt quyền của bot.",
      "Sửa theo thứ tự hậu quả: nguy hiểm, sai, thiếu, không theo số lượng.",
      "Sau mỗi lần sửa chạy lại đúng 25 câu đó để so, vì sửa chỗ này có thể làm hỏng chỗ khác.",
      "Tỷ lệ đúng trên 25 câu là mẫu nhỏ: nhìn loại lỗi quan trọng hơn nhìn phần trăm."
    ],
    "practicePrompt": {
      "question": "Trong bảng chấm có câu: khách hỏi 'da nhạy cảm dùng kem này có bị mụn không', bot đáp 'Chắc chắn không, kem rất an toàn cho mọi loại da'. Nhóm và cách xử lý nào hợp lý?",
      "options": [
        "Sai: sửa lại cho câu trả lời nhẹ nhàng hơn và nói kem ít gây mụn",
        "Thiếu: thêm thành phần của kem vào câu trả lời cho đầy đủ hơn",
        "Nguy hiểm: bot đang hứa về sức khoẻ da, cần sửa để bot không cam kết mà mời khách hỏi người tư vấn",
        "Đúng: khách cần được trấn an nên câu này tốt cho việc bán hàng"
      ],
      "correct": 2,
      "explanation": "Câu 'chắc chắn không bị mụn' là một cam kết về sức khoẻ mà bot và cả chủ shop đều không thể bảo đảm cho mọi người, nên thuộc nhóm nguy hiểm. Làm nhẹ câu chữ hay thêm thành phần vẫn để bot tự đưa ra nhận định. Cách sửa đúng là bot nói rõ mình không tư vấn tình trạng da và chuyển cho người."
    },
    "summary": {
      "keyIdea": "Chấm bot bằng bảng bốn nhóm thì biết sửa gì trước, thay vì cảm giác 'trông ổn'.",
      "formula": "25 câu → mỗi câu một nhóm → sửa nguy hiểm, sai, thiếu → chạy lại 25 câu.",
      "commonMistake": "Chỉ nhìn tỷ lệ phần trăm đúng mà bỏ qua việc câu sai duy nhất lại là câu hứa vượt quyền.",
      "action": "Lập bảng 4 cột trong Excel hoặc Sheets và chấm 10 câu đầu tiên của bot."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy 10 câu khách hay hỏi của shop bạn, cho bot (hoặc một bản nháp trả lời do bạn nhờ AI viết) trả lời từng câu. Kẻ bảng 4 cột: đúng, sai, thiếu, nguy hiểm, rồi ghi số thứ tự câu vào cột phù hợp. Cuối cùng khoanh câu đầu tiên cần sửa và viết một dòng vì sao.",
      "secondary": "Chụp lại bảng. Ngày mai bạn sẽ được hỏi bạn đã chấm được mấy câu và có câu nào thuộc nhóm nguy hiểm không."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Cuối tuần bạn thử bot của shop bằng vài câu, thấy trả lời trôi chảy nên yên tâm. Thứ Hai khách nhắn: bot nói giá cũ, và hứa giao hôm sau trong khi shop nghỉ lễ. Bài này dạy bạn chấm bot bằng một cái bảng, để lỗi lộ ra trước khách."
      },
      {
        "type": "feynman",
        "title": "Chấm bot đơn giản hơn bạn nghĩ",
        "intro": "Hình dung bạn chấm bài kiểm tra của một nhân viên mới. Bạn không chỉ nhìn bài có đẹp không, mà đối chiếu từng câu với đáp án rồi gạch chân chỗ sai.",
        "columns": [
          "Khâu",
          "Chấm bài nhân viên mới",
          "Chấm bot"
        ],
        "rows": [
          [
            "Đáp án chuẩn",
            "Sổ tay và bảng giá của shop",
            "Tài liệu gốc bạn đã cho bot đọc"
          ],
          [
            "Đối chiếu",
            "Từng câu với sổ tay, không chỉ cảm giác",
            "Từng câu với tài liệu, ghi vào bảng"
          ],
          [
            "Lỗi nặng nhất",
            "Hứa với khách điều chưa được phép",
            "Câu nguy hiểm: cam kết vượt quyền"
          ],
          [
            "Sau khi sửa",
            "Cho làm lại bài để xem đã khá hơn chưa",
            "Chạy lại đúng 25 câu và so số liệu"
          ]
        ],
        "oneLiner": "Chấm bot giống chấm bài nhân viên mới: đối chiếu từng câu với đáp án, và lỗi hứa vượt quyền là lỗi nặng nhất."
      },
      {
        "type": "heading",
        "text": "Bốn nhóm, mỗi câu một nhóm"
      },
      {
        "type": "paragraph",
        "text": "Bạn chỉ cần bốn nhóm. Đúng: khớp tài liệu và đủ ý. Sai: nói trái tài liệu, như báo 290.000đ khi bảng giá ghi 250.000đ. Thiếu: không sai nhưng bỏ sót điều khách cần, như quên phí ship khi khách hỏi tổng tiền. Nguy hiểm: bot cam kết hay khuyên điều mà shop chưa cho phép, như hứa hoàn tiền hay bảo đảm an toàn sức khoẻ."
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Chép 25 câu khách hay hỏi, có cả câu khó và câu cụt.",
          "Bước 2 - Cho bot trả lời từng câu, dán câu trả lời cạnh câu hỏi.",
          "Bước 3 - Đối chiếu với tài liệu gốc và chọn đúng một nhóm cho mỗi câu.",
          "Bước 4 - Đếm mỗi nhóm, rồi sửa theo thứ tự nguy hiểm, sai, thiếu."
        ]
      },
      {
        "type": "chart",
        "title": "Thử bao nhiêu câu thì bắt được lỗi",
        "caption": "Số liệu minh hoạ: nếu bot sai thật p% số câu, thử x câu thì trung bình bạn bắt được khoảng x × p ÷ 100 câu sai. Kéo thanh trượt để thấy vì sao thử 5 câu thì dễ bỏ sót.",
        "kind": "line",
        "xLabel": "Số câu đem thử",
        "yLabel": "Câu sai kỳ vọng bắt được",
        "x": {
          "from": 5,
          "to": 50,
          "step": 5
        },
        "params": [
          {
            "id": "p",
            "label": "Tỷ lệ câu bot sai thật",
            "min": 2,
            "max": 40,
            "step": 1,
            "value": 10,
            "unit": "%"
          }
        ],
        "series": [
          {
            "label": "Số câu sai bắt được",
            "expr": "x * p / 100"
          }
        ]
      },
      {
        "type": "paragraph",
        "text": "Ở mức sai 10%, thử 5 câu chỉ kỳ vọng bắt được nửa câu sai, tức nhiều khi là không câu nào. Thử 25 câu thì kỳ vọng khoảng 2,5 câu. Vì vậy bộ câu thử cần đủ dài, và cần có cả câu khó, không chỉ câu dễ."
      },
      {
        "type": "flow",
        "title": "Một vòng chấm và sửa",
        "steps": [
          {
            "label": "Chạy bộ 25 câu",
            "detail": "Cho bot trả lời từng câu và dán câu trả lời cạnh câu hỏi trong một bảng tính."
          },
          {
            "label": "Đối chiếu tài liệu",
            "detail": "Mở bảng giá, chính sách và so từng câu trả lời. Đừng chỉ đọc xem nó nghe có hợp lý không."
          },
          {
            "label": "Chọn một nhóm",
            "detail": "Mỗi câu vào đúng một trong bốn nhóm: đúng, sai, thiếu, nguy hiểm."
          },
          {
            "label": "Sửa theo hậu quả",
            "detail": "Sửa nhóm nguy hiểm trước, sau đó nhóm sai, rồi nhóm thiếu, dù nhóm thiếu có thể đông nhất."
          },
          {
            "label": "Chạy lại và so",
            "detail": "Chạy lại đúng 25 câu cũ. Nếu câu đúng hôm qua thành sai hôm nay, bạn vừa sửa hỏng chỗ khác."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Nhìn thoáng rồi thấy ổn",
          "text": "Đọc vài câu đầu, thấy giọng lịch sự thì yên tâm. Không ghi lại, không đếm được, tuần sau không biết bot đã khá hơn hay tệ hơn."
        },
        "right": {
          "label": "Chấm bằng bảng",
          "text": "Mỗi câu một dòng, một nhóm. Đếm được số lỗi từng loại, sửa có thứ tự, và so được hai lần chạy với nhau."
        }
      },
      {
        "type": "callout",
        "label": "Lưu ý: nguy hiểm đứng trên sai",
        "text": "Một câu nguy hiểm đáng sửa trước cả chục câu thiếu. Nếu bạn phân vân một câu là sai hay nguy hiểm, hãy hỏi: khách có thể giữ shop lại lời này không? Nếu có, hãy xếp nó vào nhóm nguy hiểm."
      },
      {
        "type": "scenario",
        "title": "Chấm xong 25 câu, bảng ra kết quả lộn xộn",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn chấm xong bảng: 15 câu đúng, 6 câu thiếu, 3 câu sai giá, và 1 câu bot hứa 'hoàn tiền ngay' khi khách phàn nàn. Bạn có buổi tối để sửa.",
            "choices": [
              {
                "label": "Sửa 6 câu thiếu trước vì đó là nhóm lỗi đông nhất",
                "next": "bad_count"
              },
              {
                "label": "Sửa câu hứa hoàn tiền trước, rồi 3 câu sai giá, rồi mới tới 6 câu thiếu",
                "next": "s2"
              }
            ]
          },
          "bad_count": {
            "text": "Bạn bổ sung phí ship và thời gian giao vào 6 câu thiếu. Sáng hôm sau một khách phàn nàn hàng lỗi, bot vẫn hứa hoàn tiền ngay, và khách chụp màn hình lời hứa đó gửi shop.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn sửa tài liệu để bot không hứa hoàn tiền mà chuyển khách cho chủ shop, rồi chỉnh giá. Giờ bạn cần chạy lại.",
            "choices": [
              {
                "label": "Chỉ chạy lại 4 câu vừa sửa, cho nhanh",
                "next": "bad_partial"
              },
              {
                "label": "Chạy lại cả 25 câu và chấm lại toàn bộ bảng",
                "next": "good"
              }
            ]
          },
          "bad_partial": {
            "text": "4 câu đó giờ đúng. Nhưng thay đổi ở tài liệu làm bot trả lời sai một câu về đổi size mà bạn không chạy lại, và câu đó đã từng đúng.",
            "ending": "bad"
          },
          "good": {
            "text": "Bảng mới: 0 nguy hiểm, 0 sai, 4 câu thiếu, 21 đúng. Bạn thấy hai câu đúng hôm qua nay thành thiếu, sửa nốt, và ghi ngày chấm vào bảng để tuần sau so tiếp.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Chấm bot bằng bảng: mỗi câu một nhóm, nguy hiểm sửa trước, sửa xong chạy lại cả bộ.",
          "Bài sau: khách thật hỏi khác xa câu bạn tự nghĩ, và đó là chỗ bảng chấm của bạn cần học thêm."
        ]
      }
    ]
  },
  {
    "id": 2616,
    "slug": "tin-nhan-cua-khach-that-hoi-khac-cau-ban-tu-nghi",
    "title": "Chặng 60, Bài 17: Khách thật hỏi khác câu bạn tự nghĩ: học từ cuộc chat mẫu",
    "subtitle": "Bạn soạn câu hỏi đẹp đẽ, còn khách thì nhắn cụt, sai chính tả và gửi ảnh.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "💬",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bộ câu thử do bạn tự nghĩ thường lịch sự và đủ ý, còn khách thật nhắn 'còn ko', 'gia?', hoặc chỉ gửi một bức ảnh. Nếu bạn chỉ thử bằng câu đẹp, bot đậu trong phòng thi nhưng rớt ngoài đời.",
    "openingQuestion": "Bộ 25 câu thử của bạn toàn câu đầy đủ như 'Cho tôi hỏi áo này còn size M không ạ?'. Khách thật hay nhắn 'còn k', 'ib giá', hay gửi ảnh không chữ. Vấn đề chính ở đâu?",
    "openingOptions": [
      "Bộ thử quá sạch, nên bot chưa bị thử với cách nhắn thật",
      "Khách nhắn sai chính tả nên cần yêu cầu khách viết đầy đủ trước",
      "Bot chỉ hiểu câu đầy đủ, nên không bao giờ dùng được cho khách",
      "Câu cụt thì ít quan trọng, bộ thử chỉ cần vài câu khó là đủ"
    ],
    "correctOption": 0,
    "explanation": "Bộ thử là bài kiểm tra bot, và nếu bài kiểm tra chỉ chứa câu sạch thì kết quả đẹp không nói lên gì về ngoài đời. Khách thật nhắn cụt, viết tắt, hỏi hai ý một lúc, gửi ảnh. Bắt khách viết lại cho đủ câu sẽ làm khách bỏ đi. Nói bot không dùng được là kết luận vội, vì bạn mới chưa thử nó với tin nhắn thật. Câu cụt lại là loại hay gặp nhất.",
    "diagram": [
      {
        "label": "Lấy 8 tin nhắn khách thật",
        "arrow": true
      },
      {
        "label": "Ghi dạng khác câu bạn nghĩ",
        "arrow": true
      },
      {
        "label": "Thêm dạng đó vào bộ câu thử",
        "arrow": true
      },
      {
        "label": "Chạy lại bộ thử và chấm bảng"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: cửa hàng đồ gia dụng nhỏ",
      "description": "Chủ cửa hàng chép 8 tin nhắn thật từ ứng dụng nhắn tin: 'nồi này còn k', 'ship ha noi bn', một bức ảnh hộp nồi kèm dấu hỏi. Bộ thử cũ của chị chỉ có câu đầy đủ. Chị thêm các dạng cụt, không dấu và ảnh vào bộ thử, rồi thấy bot hụt ở ba dạng mà trước đó chưa từng thử."
    },
    "quiz": [
      {
        "question": "Khách nhắn đúng ba chữ: \"còn k shop\". Điều gì đúng về câu này khi thử bot?",
        "options": [
          "Nên sửa thành câu đầy đủ trước khi thử, để bot dễ trả lời đúng",
          "Nên đưa nguyên văn vào bộ thử, vì đó là cách khách thật nhắn",
          "Nên bỏ qua vì câu cụt không đủ thông tin để bot trả lời",
          "Nên chỉ dùng khi đã thử hết các câu dài, đầy đủ của bộ thử"
        ],
        "correct": 1,
        "explanation": "Mục đích của bộ thử là xem bot xử lý thế nào với tin nhắn thật, nên giữ nguyên văn, kể cả chữ 'k' thay cho 'không'. Sửa cho đủ câu làm mất chính điều bạn muốn kiểm tra. Bỏ qua vì thiếu thông tin là cách khách thật bị bỏ rơi. Thử sau cùng cũng là xếp nó vào hàng thứ yếu dù đây là dạng hay gặp nhất."
      },
      {
        "question": "Khách gửi một ảnh chụp hộp sản phẩm kèm chữ \"cái này giá sao\". Nếu bot của shop chỉ đọc được chữ, điều hợp lý nhất cần có là gì?",
        "options": [
          "Bot đoán sản phẩm theo chữ rồi báo giá luôn cho khách",
          "Bot bỏ qua tin nhắn cho tới khi khách gõ lại đủ chữ",
          "Bot nói rõ chưa xem được ảnh và hỏi tên sản phẩm",
          "Bot báo giá của sản phẩm bán chạy nhất để khách dễ quyết"
        ],
        "correct": 2,
        "explanation": "Khi bot không xem được ảnh mà vẫn đoán sản phẩm, nó có thể báo nhầm giá, tức là lỗi sai. Im lặng hoặc bắt gõ lại khiến khách bỏ đi. Báo giá sản phẩm bán chạy là bịa theo số đông. Nói rõ giới hạn và hỏi tên sản phẩm vừa an toàn vừa giữ khách ở lại."
      },
      {
        "question": "Khách nhắn: \"chi phi van chuyen ha noi, co giao cod k\" (không dấu). Bot nên được thử thế nào?",
        "options": [
          "Thử bản có dấu vì bot thường hiểu tốt hơn khi có dấu",
          "Chỉ thử ý đầu về phí ship, còn ý COD hỏi lại sau",
          "Bỏ câu này vì không dấu là lỗi gõ, hiếm khi gặp ở khách",
          "Thử nguyên văn không dấu và kiểm bot trả lời đủ cả hai ý"
        ],
        "correct": 3,
        "explanation": "Có hai điều cần kiểm: bot hiểu được chữ không dấu, và trả lời đủ hai ý là phí ship và COD. Thử bản có dấu che mất điều thứ nhất. Chỉ thử ý đầu bỏ sót lỗi 'thiếu' ở ý thứ hai. Gõ không dấu khá phổ biến khi nhắn nhanh trên điện thoại, không phải lỗi hiếm."
      },
      {
        "question": "Bạn có 8 tin nhắn thật, trong đó 5 tin cụt hoặc không dấu, còn bộ thử cũ có 25 câu đầy đủ. Cách cập nhật nào hợp lý?",
        "options": [
          "Thêm các tin thật vào bộ thử, rồi chạy lại cả bộ",
          "Thay cả 25 câu cũ bằng 8 tin thật vì chúng sát thực tế hơn",
          "Chỉ chạy 8 tin thật một lần rồi bỏ",
          "Sửa 8 tin thật thành câu đầy đủ rồi nhập vào bộ cũ cho đồng đều"
        ],
        "correct": 0,
        "explanation": "Bộ cũ vẫn có giá trị vì kiểm các câu khó và câu đầy đủ, nên thêm chứ đừng thay. Chạy 8 tin thật một lần rồi bỏ thì tuần sau không còn để so. Sửa cho đầy đủ làm mất đúng dạng cụt mà bạn mới học được từ khách."
      },
      {
        "question": "Chỉ 8 tin nhắn thật là rất ít. Điều nào là cách dùng đúng của chúng?",
        "options": [
          "Dùng để kết luận tỷ lệ bot đúng với mọi khách của shop",
          "Dùng để thấy dạng nhắn thật, rồi gom dần thêm mỗi tuần",
          "Dùng để quyết định bot đã đủ tốt và có thể mở cho khách",
          "Dùng làm toàn bộ tài liệu để bot học cách trả lời câu hỏi"
        ],
        "correct": 1,
        "explanation": "Tám tin chỉ đủ để thấy các dạng nhắn mà bạn chưa nghĩ tới, chưa đủ để đo tỷ lệ đúng với mọi khách. Quyết định mở bot cần bộ thử rộng hơn và có cả câu khó. Tin nhắn thật cũng không phải tài liệu: đáp án vẫn phải đến từ bảng giá và chính sách của shop."
      }
    ],
    "keyTakeaways": [
      "Bộ thử toàn câu đẹp cho kết quả đẹp nhưng không nói gì về ngoài đời.",
      "Khách thật nhắn cụt, viết tắt, không dấu, hỏi hai ý một lúc, hoặc gửi ảnh.",
      "Giữ nguyên văn tin nhắn thật khi đưa vào bộ thử, đừng sửa cho đẹp.",
      "Nếu bot không xem được ảnh, nó cần nói rõ và hỏi lại, không đoán.",
      "Tám tin nhắn thật chưa đủ để đo, nhưng đủ để thấy dạng mới: gom thêm mỗi tuần."
    ],
    "practicePrompt": {
      "question": "Khách nhắn: 'ib gia + ship q9'. Bot trả lời: 'Dạ áo giá 250.000đ ạ' và không nói gì về ship quận 9. Đây là lỗi gì, và bước sửa đầu tiên là gì?",
      "options": [
        "Sai giá; sửa bảng giá trong tài liệu rồi chạy lại cho bot",
        "Thiếu ý ship; thêm tin này vào bộ thử và kiểm bot trả lời đủ cả giá lẫn ship",
        "Nguy hiểm; tắt bot cho tới khi người thật trả lời được tin này",
        "Không có lỗi; khách nhắn cụt nên bot trả lời một ý là chấp nhận được, vì khách chỉ hỏi một ý"
      ],
      "correct": 1,
      "explanation": "Khách hỏi hai ý là giá và phí ship, bot trả lời đúng một ý và bỏ ý còn lại nên là lỗi thiếu, không phải sai vì 250.000đ vẫn khớp bảng giá. Không cần tắt bot vì chưa có cam kết vượt quyền. Nhắn cụt không có nghĩa là hỏi ít: khách cụt vẫn mong nhận đủ hai câu trả lời."
    },
    "summary": {
      "keyIdea": "Bộ thử phải mang dáng vẻ tin nhắn thật, nếu không bot chỉ đậu trong phòng thi.",
      "formula": "8 tin nhắn thật → ghi dạng khác câu bạn nghĩ → thêm nguyên văn vào bộ thử → chạy lại và chấm.",
      "commonMistake": "Sửa tin nhắn thật cho đầy đủ, dễ đọc rồi mới thử, làm mất đúng thứ cần thử.",
      "action": "Chép 8 tin khách thật và đánh dấu cụt, không dấu, hai ý hoặc có ảnh."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở tin nhắn của shop hoặc công việc và chép nguyên văn 8 tin khách gửi (xoá tên và số điện thoại trước khi chép). Gắn nhãn mỗi tin: cụt, không dấu, hai ý, có ảnh, hay đầy đủ. Chọn 3 tin khác câu bạn tự nghĩ nhất và thêm vào bộ câu thử của bạn.",
      "secondary": "Ngày mai bạn sẽ được hỏi: trong 8 tin đó, bao nhiêu tin khác dạng bạn tự nghĩ."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn soạn câu thử rất cẩn thận: chữ hoa đầu câu, có 'ạ', đủ chủ ngữ. Rồi bạn mở tin nhắn thật của khách và thấy 'còn k', 'gia?', một bức ảnh không chữ. Bài này dạy bạn học từ chính những tin nhắn đó."
      },
      {
        "type": "feynman",
        "title": "Bộ câu thử sát thực tế đơn giản hơn bạn nghĩ",
        "intro": "Hình dung một thầy dạy lái xe chỉ cho học viên chạy trong sân tập vắng rồi cho thi bằng. Sân đẹp, nhưng đường thật có xe máy cắt ngang và người đi bộ.",
        "columns": [
          "Thành phần",
          "Sân tập vắng",
          "Bộ thử toàn câu đẹp"
        ],
        "rows": [
          [
            "Điều kiện",
            "Đường vắng, có vạch rõ",
            "Câu đầy đủ, có dấu, đủ chủ ngữ"
          ],
          [
            "Kết quả",
            "Học viên thi đậu dễ dàng",
            "Bot trả lời đúng gần hết"
          ],
          [
            "Ngoài đời",
            "Xe máy cắt ngang, người băng qua",
            "Câu cụt, viết tắt, không dấu, ảnh"
          ],
          [
            "Cách sửa",
            "Tập thêm trên đường phố thật",
            "Thêm nguyên văn tin khách thật"
          ]
        ],
        "oneLiner": "Bộ thử toàn câu đẹp giống sân tập vắng: dễ đậu, nhưng ngoài đời vẫn gặp những tình huống chưa thử."
      },
      {
        "type": "heading",
        "text": "Tám tin nhắn, bốn dạng khác câu bạn nghĩ"
      },
      {
        "type": "paragraph",
        "text": "Nhìn tám tin nhắn thật, bạn thường thấy các dạng lặp lại: câu cụt ('còn k'), không dấu ('gia ship q9'), hai ý dồn một tin ('giá + ship'), và ảnh không chữ. Mỗi dạng là một loại lỗi tiềm ẩn của bot, nên mỗi dạng cần có ít nhất một tin trong bộ thử."
      },
      {
        "type": "flow",
        "title": "Từ tin nhắn thật đến bộ thử tốt hơn",
        "steps": [
          {
            "label": "Chép nguyên văn",
            "detail": "Mở tin nhắn cũ của shop, chép 8 tin khách gửi, xoá tên và số điện thoại. Không sửa chính tả hay thêm dấu."
          },
          {
            "label": "Gắn nhãn dạng",
            "detail": "Mỗi tin ghi một nhãn: cụt, không dấu, hai ý, có ảnh hoặc đầy đủ. Đếm xem dạng nào nhiều nhất."
          },
          {
            "label": "Thêm vào bộ thử",
            "detail": "Mỗi dạng thêm ít nhất một tin nguyên văn, giữ nguyên các câu khó đang có."
          },
          {
            "label": "Chạy lại và chấm",
            "detail": "Cho bot trả lời cả bộ, chấm bằng bảng bốn nhóm ở bài trước, rồi sửa tài liệu ở chỗ hụt."
          }
        ]
      },
      {
        "type": "heading",
        "text": "Bot không xem được ảnh thì sao?"
      },
      {
        "type": "paragraph",
        "text": "Nhiều bot chỉ đọc chữ. Khi khách gửi ảnh, câu trả lời an toàn là nói rõ: 'Em chưa xem được ảnh, anh chị cho em tên sản phẩm nhé'. Nếu bot cố đoán từ chữ đi kèm, nó có thể báo giá sản phẩm khác và bạn có thêm một câu sai."
      },
      {
        "type": "comparison",
        "left": {
          "label": "Bộ thử tự nghĩ",
          "text": "Câu đầy đủ, đúng ngữ pháp, một ý mỗi câu. Kết quả đẹp, dễ yên tâm, nhưng chưa thử bot với cách khách thật nhắn."
        },
        "right": {
          "label": "Bộ thử có tin thật",
          "text": "Có câu cụt, không dấu, hai ý dồn một tin, ảnh. Kết quả xấu hơn lúc đầu, nhưng là phép thử gần với ngày bot gặp khách thật."
        }
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát bản nhật ký: bot đã trả lời 4 tin nhắn cụt như thế nào",
        "task": "Bạn đưa 4 tin nhắn cụt của khách cho bot và nhận về bản ghi dưới đây. Shop bán nồi chiên; tài liệu ghi: nồi 5 lít giá 1.200.000đ, còn hàng màu đen; chưa có màu trắng; ship nội thành 25.000đ. Đánh dấu câu trả lời bot bịa hoặc vượt quyền.",
        "segments": [
          {
            "text": "Khách: 'con noi 5l con k' - Bot: Dạ nồi 5 lít còn màu đen ạ."
          },
          {
            "text": "Khách: 'gia' - Bot: Dạ giá nồi 5 lít là 1.200.000đ ạ."
          },
          {
            "text": "Khách: 'mau trang co k' - Bot: Dạ màu trắng còn hàng và shop đang giảm 10% cho khách hôm nay ạ.",
            "error": "Tài liệu ghi chưa có màu trắng và không nhắc giảm 10%. Bot bịa cả việc còn hàng và khuyến mãi."
          },
          {
            "text": "Khách: 'ship q1' - Bot: Dạ ship nội thành 25.000đ ạ."
          },
          {
            "text": "Khách: 'mai co nhan dc k' - Bot: Dạ shop cam kết giao trước 10 giờ sáng mai ạ.",
            "error": "Tài liệu không có giờ giao cụ thể. Bot hứa một mốc giờ mà shop chưa cam kết."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Dấu hiệu cần thêm câu thử",
        "text": "Khi bạn thấy khách 'hỏi lại' hoặc gọi người vì bot trả lời không đúng ý, hãy chép nguyên văn tin đó vào bộ thử. Mỗi tin như vậy là một lỗi bạn chưa biết."
      },
      {
        "type": "scenario",
        "title": "Sáng thứ Hai, bạn cập nhật bộ thử từ chat thật",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn có 8 tin khách vừa chép, 5 tin cụt hoặc không dấu. Bộ thử cũ có 25 câu đầy đủ. Bạn định làm gì?",
            "choices": [
              {
                "label": "Sửa 8 tin thành câu đầy đủ, có dấu, rồi thêm vào bộ thử",
                "next": "bad_clean"
              },
              {
                "label": "Thêm 8 tin nguyên văn vào bộ thử, giữ 25 câu cũ",
                "next": "s2"
              }
            ]
          },
          "bad_clean": {
            "text": "Bộ thử giờ có 33 câu sạch sẽ. Bot đậu hết. Tuần sau khách nhắn 'ship q9 bn' và bot trả lời sai vì chưa từng bị thử với dạng đó.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn chạy 33 câu. Bot hụt ở 3 tin cụt: một câu chỉ trả lời nửa ý, một câu đoán sai sản phẩm, một câu không hiểu chữ viết tắt.",
            "choices": [
              {
                "label": "Bổ sung vào tài liệu cách gọi khác của sản phẩm và phí ship theo quận, rồi chạy lại",
                "next": "good"
              },
              {
                "label": "Bảo bot 'hãy hiểu cả tin nhắn cụt' rồi coi như đã xong",
                "next": "bad_wish"
              }
            ]
          },
          "bad_wish": {
            "text": "Bạn chỉ dặn chung chung, không đổi tài liệu, không chạy lại. Hai hôm sau bot vẫn hụt đúng các tin cụt đó.",
            "ending": "bad"
          },
          "good": {
            "text": "Bot trả lời được cả ba tin cụt. Bạn ghi vào sổ ngày thêm câu thử và lý do, để tuần sau bổ sung tiếp từ tin khách mới.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Khách thật nhắn không giống câu bạn tự nghĩ: đưa nguyên văn tin thật vào bộ thử.",
          "Bài sau: khi bảng giá đổi, làm sao giữ cho bot không nói giá cũ."
        ]
      }
    ]
  },
  {
    "id": 2617,
    "slug": "khi-shop-doi-bang-gia-cap-nhat-noi-dung-bot-the-nao",
    "title": "Chặng 60, Bài 18: Shop đổi bảng giá cuối tháng: quy trình cập nhật nội dung bot",
    "subtitle": "Giá mới có từ ngày 1, nhưng bot vẫn nói giá tháng trước.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🔄",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bot không tự biết shop vừa đổi giá: nó nói đúng những gì nằm trong tài liệu, kể cả tài liệu đã cũ. Mỗi ngày giá cũ còn nằm đó là một ngày khách được báo sai, và sai giá là loại lỗi khách nhớ lâu nhất.",
    "openingQuestion": "Shop đổi bảng giá vào ngày 1. Bạn chỉ sửa tệp giá trên máy rồi tưởng bot đã biết giá mới. Sáng mùng 3 khách vẫn được báo giá cũ. Điều gì đã xảy ra?",
    "openingOptions": [
      "Bot cần vài ngày để tự học giá mới từ các cuộc trò chuyện",
      "Bot cố ý giữ giá cũ vì nhớ giá lâu hơn tài liệu mới",
      "Bot đọc tài liệu bot đang dùng, mà tài liệu đó chưa được thay bằng bản mới",
      "Khách nhắn sai cách nên bot trả lời theo giá của tháng trước"
    ],
    "correctOption": 2,
    "explanation": "Bot không tự học từ cuộc trò chuyện để đổi bảng giá: nó trả lời theo tài liệu được đưa vào, nên nếu bản bot đang đọc còn giá cũ thì nó nói giá cũ rất tự tin. Sửa một tệp trên máy mà không thay tài liệu bot dùng thì bot không thấy thay đổi. Bot không có chuyện cố ý giữ giá cũ. Cách khách nhắn cũng không đổi được con số nằm trong tài liệu.",
    "diagram": [
      {
        "label": "Sửa tài liệu gốc (bảng giá)",
        "arrow": true
      },
      {
        "label": "Đưa bản mới cho bot thay bản cũ",
        "arrow": true
      },
      {
        "label": "Chạy lại bộ câu thử về giá",
        "arrow": true
      },
      {
        "label": "Ghi ngày đổi và người đổi"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: tiệm bánh đặt qua tin nhắn",
      "description": "Tiệm bánh đổi giá bánh kem vào ngày 1. Chủ tiệm sửa bảng giá trên điện thoại nhưng quên thay tài liệu cho bot. Số liệu minh hoạ: 12 khách hỏi giá mỗi ngày, mỗi khách bị báo chênh 20.000đ. Sau ba ngày, tiệm đã mất khoảng 720.000đ giá trị chênh lệch cần đính chính với khách, chưa kể sự tin tưởng."
    },
    "quiz": [
      {
        "question": "Giá mới có hiệu lực ngày 1. Theo đúng thứ tự, việc đầu tiên khi cập nhật bot là gì?",
        "options": [
          "Nhắn cho bot biết giá mới trong một cuộc chat riêng",
          "Chạy lại bộ câu thử trước",
          "Sửa tài liệu gốc chứa bảng giá",
          "Báo khách hàng quen biết trước khi sửa tài liệu"
        ],
        "correct": 2,
        "explanation": "Tài liệu gốc là nơi bot lấy giá, nên sửa ở đó trước. Nhắn riêng cho bot trong một cuộc chat thường không đổi được tài liệu nó đọc. Chạy bộ thử trước khi sửa chỉ cho ra kết quả giá cũ. Báo khách trước khi bot còn nói giá cũ tạo ra hai nguồn giá mâu thuẫn."
      },
      {
        "question": "Bạn đã sửa tài liệu. Tại sao vẫn phải chạy lại bộ câu thử, nhất là các câu về giá?",
        "options": [
          "Vì bot cần nghe lại câu hỏi để ghi nhớ giá mới vào trí nhớ",
          "Vì luật yêu cầu phải chạy thử mỗi lần đổi bảng giá của shop",
          "Vì chạy lại bộ thử làm bot tự cập nhật giá ở mọi tài liệu",
          "Để chắc bot đã dùng giá mới và các câu khác không bị hỏng"
        ],
        "correct": 3,
        "explanation": "Chạy lại bộ thử là cách kiểm: giá mới đã tới bot chưa, và việc sửa không làm hỏng câu khác, ví dụ câu đổi trả. Bot không 'ghi nhớ' qua việc nghe lại câu hỏi. Không có quy định nào như vậy ở đây, đây là thói quen nghề. Chạy thử chỉ kiểm tra chứ không tự cập nhật tài liệu."
      },
      {
        "question": "Shop đổi giá nhưng chỉ sửa trong bảng giá, còn trang 'khuyến mãi tháng' vẫn ghi giá cũ và bot đọc cả hai. Điều gì có thể xảy ra?",
        "options": [
          "Bot có thể báo giá cũ hoặc giá mới tuỳ câu hỏi",
          "Bot luôn chọn giá mới vì nó có trong bảng giá chính",
          "Bot luôn hỏi khách chọn giá nào vì thấy hai giá khác nhau",
          "Bot sẽ tự tính giá trung bình của hai giá để báo khách"
        ],
        "correct": 0,
        "explanation": "Khi hai tài liệu mâu thuẫn, bot không có cách nào tự biết cái nào mới hơn, nên câu trả lời có thể lúc đúng lúc sai tuỳ đoạn nào được dùng. Nó không luôn chọn bảng giá chính, không tự hỏi lại, và càng không lấy trung bình. Vì vậy mỗi thông tin chỉ nên nằm ở một nơi."
      },
      {
        "question": "Mỗi ngày 12 khách hỏi giá và mỗi khách bị báo chênh 20.000đ so với giá mới. Ba ngày chưa cập nhật thì tổng chênh lệch là bao nhiêu?",
        "options": [
          "240.000đ (12 × 20.000, mới chỉ tính một ngày)",
          "720.000đ (12 × 20.000 × 3)",
          "60.000đ (20.000 × 3, quên nhân số khách mỗi ngày)",
          "36.000đ (12 × 3)"
        ],
        "correct": 1,
        "explanation": "Chênh lệch mỗi ngày là 12 × 20.000 = 240.000đ, nhân 3 ngày được 720.000đ. 240.000đ chỉ là một ngày. 60.000đ thiếu số khách, còn 36.000đ thiếu mức chênh. Đây là số liệu minh hoạ, nhưng cho thấy chi phí tăng tuyến tính theo từng ngày chưa cập nhật."
      },
      {
        "question": "Sổ ghi 'ngày đổi, người đổi, đổi gì' giúp gì nhất khi bot bắt đầu báo giá sai?",
        "options": [
          "Tự động sửa giá sai cho bot mà không cần mở tài liệu",
          "Báo cho khách biết giá nào là mới nhất trong các tin nhắn",
          "Biết lần đổi gần nhất để khoanh vùng nguyên nhân nhanh",
          "Thay thế việc chạy lại bộ câu thử sau mỗi lần cập nhật"
        ],
        "correct": 2,
        "explanation": "Sổ ghi lại thay đổi giúp bạn hỏi ngay: giá sai bắt đầu từ sau lần đổi nào, do ai, ở tệp nào. Bản thân sổ không sửa được gì và không báo được khách. Nó cũng không thay việc chạy lại bộ thử, vì chỉ bộ thử mới cho biết bot đang trả lời thế nào."
      }
    ],
    "keyTakeaways": [
      "Bot nói đúng những gì nằm trong tài liệu nó đọc, kể cả khi tài liệu đã cũ.",
      "Quy trình ba bước: sửa tài liệu gốc, chạy lại bộ câu thử, ghi ngày đổi.",
      "Mỗi thông tin (như giá) chỉ nên nằm ở một nơi, để hai tài liệu không mâu thuẫn nhau.",
      "Chi phí của giá cũ tăng theo từng ngày chưa cập nhật: số khách hỏi × mức chênh × số ngày.",
      "Chỉ định một người phụ trách và một ngày cố định, ví dụ đầu mỗi tháng, để không ai tưởng người khác đã làm."
    ],
    "practicePrompt": {
      "question": "Cuối tháng tiệm đổi giá hai sản phẩm. Bạn đã sửa bảng giá, nhưng còn một tệp 'câu hỏi thường gặp' có nhắc giá cũ của một sản phẩm đó. Bước tiếp theo hợp lý là gì?",
      "options": [
        "Bỏ qua tệp câu hỏi thường gặp vì bảng giá chính đã đúng",
        "Xoá hết tài liệu cũ và nhập lại từ đầu cho chắc chắn",
        "Chạy lại bộ câu thử ngay và chỉ sửa khi khách thật phản ánh",
        "Tìm mọi nơi nhắc giá cũ, sửa hoặc bỏ giá trong đó, rồi chạy lại bộ câu thử về giá"
      ],
      "correct": 3,
      "explanation": "Giá cũ còn nằm trong tệp khác thì bot vẫn có thể dùng nó, nên cần tìm và sửa hoặc bỏ giá ở đó, rồi kiểm lại bằng bộ câu thử. Bỏ qua vì bảng chính đúng là chính tình huống hai tài liệu mâu thuẫn. Xoá hết nhập lại tốn công và dễ làm mất nội dung đã đúng. Chờ khách phản ánh nghĩa là khách là người phát hiện lỗi."
    },
    "summary": {
      "keyIdea": "Bot chỉ biết giá mới khi tài liệu nó đọc đã đổi, nên đổi giá là phải đổi cả bot.",
      "formula": "Sửa tài liệu gốc → chạy lại bộ câu thử về giá → ghi ngày, người đổi và đổi gì.",
      "commonMistake": "Sửa giá ở một nơi nhưng quên tệp khác còn nhắc giá cũ, để bot đọc hai con số.",
      "action": "Viết ba bước trên lên một tờ giấy và ghi tên người phụ trách."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở tài liệu bạn định cho bot đọc (bảng giá, chính sách, câu hỏi thường gặp). Tìm mọi chỗ nhắc một con số hay ngày có thể đổi, ví dụ giá, phí ship, giờ mở cửa, và liệt kê vào bảng: con số, nằm ở tệp nào. Nếu một con số xuất hiện ở hai nơi, chọn một nơi duy nhất để giữ. Viết ba bước cập nhật và tên người phụ trách.",
      "secondary": "Ngày mai bạn sẽ được hỏi: có con số nào xuất hiện ở hai nơi không, và bạn chọn nơi nào để giữ."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Mùng 3, một khách nhắn: 'Bên em báo giá 250 nghìn mà trên bảng ghi 270 nghìn, sao vậy?'. Bạn mở bot và thấy nó vẫn nói giá tháng trước. Bài này dạy bạn quy trình ba bước để chuyện đó không lặp lại mỗi lần đổi giá."
      },
      {
        "type": "feynman",
        "title": "Cập nhật bot đơn giản hơn bạn nghĩ",
        "intro": "Hình dung menu in sẵn dán ở cửa quán. Chủ quán đổi giá ly cà phê trong sổ thu ngân, nhưng không in lại menu, nên khách vẫn đọc giá cũ trên tường.",
        "columns": [
          "Khâu",
          "Menu dán cửa quán",
          "Bot của shop"
        ],
        "rows": [
          [
            "Nơi khách nhìn",
            "Tờ menu trên tường",
            "Tài liệu mà bot đọc"
          ],
          [
            "Khi đổi giá",
            "Phải in lại menu mới",
            "Phải thay tài liệu bot đọc"
          ],
          [
            "Nếu quên",
            "Khách thấy giá cũ, nhân viên phải giải thích",
            "Bot báo giá cũ rất tự tin"
          ],
          [
            "Kiểm tra",
            "Đi ra cửa đọc lại menu",
            "Chạy lại bộ câu thử về giá"
          ]
        ],
        "oneLiner": "Sửa sổ thu ngân mà quên in menu thì khách vẫn thấy giá cũ: sửa giá là phải sửa cả chỗ bot đọc."
      },
      {
        "type": "heading",
        "text": "Bot không tự biết shop đổi giá"
      },
      {
        "type": "paragraph",
        "text": "Bot không đọc tin tức của shop. Nó trả lời theo tài liệu đã đưa cho nó, nên giá cũ trong tài liệu sẽ được nói lại với mọi khách, đều đặn và rất lịch sự. Lỗi này là lỗi sai, thuộc loại nặng vì nó lặp lại cho mọi khách hỏi."
      },
      {
        "type": "chart",
        "title": "Mỗi ngày chưa cập nhật, chênh lệch tích lại bao nhiêu",
        "caption": "Số liệu minh hoạ: khách hỏi giá mỗi ngày × mức báo chênh × số ngày chưa cập nhật. Kéo thanh trượt để thay bằng số liệu của shop bạn.",
        "kind": "line",
        "xLabel": "Số ngày chưa cập nhật",
        "yLabel": "Tổng chênh lệch (nghìn đồng)",
        "x": {
          "from": 0,
          "to": 30,
          "step": 1
        },
        "params": [
          {
            "id": "khach",
            "label": "Khách hỏi giá mỗi ngày",
            "min": 1,
            "max": 40,
            "step": 1,
            "value": 12,
            "unit": "khách"
          },
          {
            "id": "lech",
            "label": "Mức báo chênh mỗi khách",
            "min": 5,
            "max": 100,
            "step": 5,
            "value": 20,
            "unit": "nghìn đồng"
          }
        ],
        "series": [
          {
            "label": "Chênh lệch cộng dồn",
            "expr": "x * khach * lech"
          }
        ]
      },
      {
        "type": "paragraph",
        "text": "Với 12 khách mỗi ngày và mức chênh 20 nghìn đồng, chỉ ba ngày đã là 720 nghìn đồng, và con số tăng thẳng lên theo số ngày. Đó là lý do cập nhật nên nằm trong danh sách việc của ngày đổi giá chứ không để tuần sau."
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Sửa tài liệu gốc: bảng giá, rồi tìm mọi tệp khác nhắc giá cũ.",
          "Bước 2 - Đưa bản mới cho bot thay bản cũ, rồi chạy lại bộ câu thử về giá và đổi trả.",
          "Bước 3 - Ghi vào sổ: ngày đổi, người đổi, đổi gì, và kết quả chạy thử."
        ]
      },
      {
        "type": "callout",
        "label": "Một nơi cho mỗi con số",
        "text": "Nếu giá nằm ở ba tệp, lần sau đổi giá bạn phải nhớ sửa ba nơi, và sớm muộn sẽ quên một nơi. Cách chắc hơn là chỉ giữ giá trong bảng giá, còn các tài liệu khác chỉ trỏ tới bảng giá mà không ghi lại con số."
      },
      {
        "type": "comparison",
        "left": {
          "label": "Đổi giá không có quy trình",
          "text": "Chủ shop sửa ở một nơi, nhớ tới đâu làm tới đó. Giá cũ còn trong tài liệu khác, bot nói lúc giá cũ lúc giá mới, không ai biết tệp nào đã đổi."
        },
        "right": {
          "label": "Đổi giá có ba bước",
          "text": "Sửa tài liệu gốc, chạy lại bộ câu thử, ghi ngày đổi. Có một người phụ trách, nên nếu bot sai thì biết nhìn vào đâu."
        }
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát ghi chú cập nhật của một người phụ trách",
        "task": "Một bạn nhân viên ghi lại việc cập nhật sau khi shop đổi giá. Shop đổi giá áo từ 250.000đ lên 270.000đ; bảng giá đã được sửa, nhưng bộ câu thử chưa chạy lại. Đánh dấu câu nào trong ghi chú chưa đúng với sự thật.",
        "segments": [
          {
            "text": "Ngày 1: Shop đổi giá áo thun từ 250.000đ lên 270.000đ."
          },
          {
            "text": "Đã sửa bảng giá tài liệu gốc."
          },
          {
            "text": "Đã chạy lại 25 câu thử và bot báo giá mới đúng ở mọi câu.",
            "error": "Theo nhật ký, bộ câu thử chưa được chạy lại. Câu này ghi một kết quả chưa từng xảy ra."
          },
          {
            "text": "Trang 'câu hỏi thường gặp' vẫn nhắc giá cũ 250.000đ, cần sửa."
          },
          {
            "text": "Bot đã được kiểm và không còn nói giá cũ ở bất kỳ tài liệu nào.",
            "error": "Trang câu hỏi thường gặp vẫn còn giá cũ, nên khẳng định này trái với chính ghi chú ngay phía trên."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Ngày 1 đầu tháng: shop đổi giá, bạn làm gì đầu tiên",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Sếp nhắn: 'Từ hôm nay áo thun tăng lên 270 nghìn, em cập nhật bot nhé.' Bạn đang có tệp bảng giá và một tệp câu hỏi thường gặp.",
            "choices": [
              {
                "label": "Sửa bảng giá, rồi gõ vào khung chat của bot: 'Từ nay áo thun 270 nghìn'",
                "next": "bad_chat"
              },
              {
                "label": "Sửa bảng giá, tìm mọi tệp nhắc giá áo thun, rồi thay tài liệu cho bot",
                "next": "s2"
              }
            ]
          },
          "bad_chat": {
            "text": "Bot trả lời 'Dạ em đã ghi nhận' trong cuộc chat đó. Nhưng khách khác vẫn được báo 250 nghìn, vì tài liệu nó đọc không đổi. Đến cuối tuần có sáu khách phản ánh.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn thấy tệp câu hỏi thường gặp nhắc 250 nghìn, sửa luôn. Giờ bạn sắp đóng máy.",
            "choices": [
              {
                "label": "Đóng máy, ghi chú 'xong' vì đã sửa hết tệp có giá",
                "next": "bad_noverify"
              },
              {
                "label": "Chạy lại bộ câu thử về giá và đổi trả, rồi ghi ngày, người đổi, kết quả vào sổ",
                "next": "good"
              }
            ]
          },
          "bad_noverify": {
            "text": "Hôm sau bot vẫn báo 250 nghìn cho một câu hỏi về combo hai áo, vì có một tệp khuyến mãi bạn chưa nhớ ra. Không có bộ thử nên không ai phát hiện.",
            "ending": "bad"
          },
          "good": {
            "text": "Chạy thử phát hiện một câu về combo hai áo vẫn báo giá cũ. Bạn tìm ra tệp khuyến mãi và sửa ngay trong buổi chiều. Sổ ghi ngày đổi giúp tuần sau ai cũng biết lần cập nhật gần nhất.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Đổi giá là đổi cả tài liệu bot đọc: sửa gốc, chạy lại bộ thử, ghi sổ.",
          "Bài sau: mỗi thứ Hai dành 15 phút đọc nhật ký hội thoại để tìm câu bot trả lời hụt."
        ]
      }
    ]
  },
  {
    "id": 2618,
    "slug": "doc-nhat-ky-hoi-thoai-hang-tuan-tim-cau-bot-tra-loi-hut",
    "title": "Chặng 60, Bài 19: Đọc nhật ký hội thoại mỗi tuần để tìm câu bot trả lời hụt",
    "subtitle": "Mười lăm phút sáng thứ Hai cho biết tuần qua bot hụt ở đâu.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🔍",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bộ câu thử chỉ chứa những gì bạn nghĩ tới từ trước. Nhật ký hội thoại cho thấy khách thật hỏi gì mà bot chịu thua. Mỗi tuần đọc mười lăm phút là cách rẻ nhất để bot khá lên mà không phải đoán.",
    "openingQuestion": "Bot của shop chạy được hai tuần. Bạn muốn biết nên bổ sung gì cho nó. Nguồn thông tin đáng tin nhất là gì?",
    "openingOptions": [
      "Những câu bạn đoán khách có thể hỏi sau khi ngồi nghĩ một giờ",
      "Những câu hỏi khách nhắn nhiều nhất mà bot đã trả lời đúng",
      "Ý kiến của đối thủ về những điều khách của họ hay hỏi",
      "Những câu khách phải hỏi lại hoặc được chuyển cho người trong nhật ký"
    ],
    "correctOption": 3,
    "explanation": "Nhật ký ghi chính những lần bot hụt: khách hỏi lại, khách bỏ đi, hay bot phải chuyển cho người. Đó là các chỗ tài liệu đang thiếu, nên bổ sung ở đây cho hiệu quả cao nhất. Câu bạn tự đoán chỉ phản ánh điều bạn đã nghĩ tới. Câu bot đã trả lời đúng thì không cần thêm. Đối thủ có khách khác với khách của bạn.",
    "diagram": [
      {
        "label": "Mở nhật ký hội thoại tuần qua",
        "arrow": true
      },
      {
        "label": "Lọc câu khách hỏi lại hoặc chuyển người",
        "arrow": true
      },
      {
        "label": "Gom câu giống nhau và đếm",
        "arrow": true
      },
      {
        "label": "Ghi cần thêm gì vào tài liệu",
        "arrow": true
      },
      {
        "label": "Sửa tài liệu rồi chạy lại bộ thử"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: cửa hàng thú cưng nhỏ",
      "description": "Mỗi thứ Hai chủ cửa hàng mở nhật ký 15 phút và lọc các câu bot phải chuyển cho người. Số liệu minh hoạ: tuần đầu có 28 câu chuyển, trong đó 11 câu hỏi giờ mở cửa dịp lễ, một thông tin bot chưa có. Chị thêm lịch mở cửa vào tài liệu, và tuần sau số câu chuyển giảm còn 15."
    },
    "quiz": [
      {
        "question": "Bạn nên lọc dấu hiệu nào trong nhật ký hội thoại để tìm chỗ bot hụt?",
        "options": [
          "Câu trả lời có dùng nhiều chữ 'dạ' và 'ạ' nhất",
          "Những cuộc chat dài nhất trong tuần của cả shop",
          "Những cuộc chat có nhiều tin khách nhắn vào giờ vàng",
          "Khách hỏi lại cùng ý, hoặc bot chuyển cho người"
        ],
        "correct": 3,
        "explanation": "Khách phải hỏi lại cùng một ý nghĩa là câu trả lời đầu chưa đáp ứng, còn chuyển người nghĩa là bot không trả lời được. Cả hai trực tiếp chỉ vào chỗ hụt. Số chữ 'dạ' chỉ là giọng nói. Chat dài hoặc giờ cao điểm có thể chỉ là khách đông, chưa chắc bot sai."
      },
      {
        "question": "Trong tuần có 28 câu bị chuyển cho người, 11 câu cùng hỏi giờ mở cửa dịp lễ. Nên làm gì trước?",
        "options": [
          "Thêm lịch mở cửa dịp lễ vào tài liệu",
          "Tăng tốc độ phản hồi của bot cho 11 câu đó",
          "Bỏ qua vì 11 câu chỉ chiếm phần nhỏ của cả tuần",
          "Nhắn cho 11 khách xin lỗi, còn tài liệu thì giữ nguyên"
        ],
        "correct": 0,
        "explanation": "11 câu cùng một ý cho thấy một thông tin đang thiếu trong tài liệu, nên thêm đúng thông tin đó là hiệu quả nhất. Tăng tốc độ không giúp bot có câu trả lời. 11 trong 28 là gần 40% số câu chuyển, không phải phần nhỏ. Xin lỗi từng khách mà không sửa gốc thì tuần sau vẫn lặp lại."
      },
      {
        "question": "Nhật ký có hai câu: 'có giảm giá không' được hỏi 9 lần, 'ship Cần Thơ' được hỏi 2 lần, cả hai bot đều chuyển cho người. Câu nào nên xử lý trước?",
        "options": [
          "Câu về Cần Thơ, vì tỉnh xa thường phức tạp hơn",
          "Câu về giảm giá, vì được hỏi 9 lần so với 2 lần",
          "Cả hai cùng lúc, bỏ thì hai câu đều có ít người hỏi",
          "Không câu nào, vì cả hai đều đã được chuyển cho người"
        ],
        "correct": 1,
        "explanation": "Xử lý theo tần suất trước: câu hỏi 9 lần tiết kiệm nhiều lượt chuyển người hơn câu hỏi 2 lần. Độ khó của tỉnh xa không đổi việc câu kia đông hơn. Làm cả hai không sai, nhưng 'bỏ thì đều ít' là lý do sai. Được chuyển cho người là dấu hiệu bot hụt, chứ không phải là giải pháp."
      },
      {
        "question": "Nhật ký ghi 2 cuộc chat khách hỏi đòi bồi thường vì hàng lỗi, bot đều chuyển cho chủ shop. Bạn đọc thấy gì?",
        "options": [
          "Bot hụt, vì cần thêm tài liệu để bot tự bồi thường",
          "Bot hụt, vì chỉ nên xin lỗi rồi dừng",
          "Bot làm đúng, vì đòi bồi thường là việc của người",
          "Bot làm sai, vì mọi cuộc chat phải tự kết thúc trong bot"
        ],
        "correct": 2,
        "explanation": "Bồi thường là quyết định tiền bạc mà bot không có quyền, nên chuyển cho người là đúng. Thêm tài liệu để bot tự bồi thường sẽ tạo ra lỗi nguy hiểm. Chỉ xin lỗi rồi dừng khiến khách bị bỏ rơi. Mục tiêu không phải mọi cuộc chat kết thúc trong bot."
      },
      {
        "question": "Tuần 1 bạn thấy 28 câu chuyển cho người. Tuần 2 còn 15 câu sau khi bổ sung tài liệu. Bạn nên rút ra điều gì?",
        "options": [
          "Bot giờ đã đủ tốt, không cần đọc nhật ký hằng tuần nữa",
          "Số câu chuyển giảm 13 (28 − 15), tức bot giỏi hơn 13%",
          "Nhật ký tuần 1 không còn dùng được nên có thể xoá luôn",
          "Bổ sung có tác dụng, nhưng cần đọc tiếp xem 15 câu còn lại là gì"
        ],
        "correct": 3,
        "explanation": "Số câu chuyển giảm là dấu hiệu tốt, nhưng 15 câu còn lại vẫn là các chỗ hụt mới hoặc cũ cần đọc, và khách mới sẽ có câu hỏi mới. 13 là số câu giảm, không phải phần trăm: 13 ÷ 28 ≈ 46%. Nhật ký tuần 1 nên giữ để so sánh giữa các tuần."
      }
    ],
    "keyTakeaways": [
      "Nhật ký hội thoại cho biết khách thật hỏi gì mà bot chịu thua.",
      "Lọc hai dấu hiệu: khách hỏi lại cùng một ý, và bot chuyển cho người.",
      "Gom câu giống nhau, đếm, và xử lý câu hỏi nhiều lần nhất trước.",
      "Chuyển cho người không phải lúc nào cũng là lỗi: bồi thường hay khiếu nại là việc của người.",
      "Ghi số câu chuyển người mỗi tuần để thấy xu hướng và so sánh trước, sau khi sửa tài liệu."
    ],
    "practicePrompt": {
      "question": "Bạn đọc nhật ký tuần qua: 14 câu hỏi giờ mở cửa, 6 câu hỏi có nhận đổi size không, 3 câu khách phàn nàn giao chậm. Bạn chỉ có 20 phút. Nên làm gì?",
      "options": [
        "Bổ sung cả ba nhóm để bot tự xử lý khiếu nại giao chậm cho nhanh",
        "Bổ sung giờ mở cửa và chính sách đổi size vào tài liệu; để khiếu nại giao chậm cho người xử lý",
        "Chỉ bổ sung nhóm khiếu nại, vì khiếu nại là nhóm ảnh hưởng khách nhất",
        "Không bổ sung gì, chờ thêm vài tháng nhật ký rồi quyết định một lần"
      ],
      "correct": 1,
      "explanation": "Giờ mở cửa và đổi size là thông tin có sẵn mà tài liệu đang thiếu, nên thêm vào là cách tiết kiệm nhiều lượt chuyển người nhất. Khiếu nại giao chậm có thể kèm đền bù hay điều tra, là việc của người. Thêm tự xử lý khiếu nại là nguy hiểm. Chờ vài tháng để khách tiếp tục bị hụt là mất công bằng chứng đã có."
    },
    "summary": {
      "keyIdea": "Mười lăm phút đọc nhật ký mỗi tuần cho biết bot hụt ở đâu, theo cách khách thật hỏi.",
      "formula": "Lọc câu hỏi lại hoặc chuyển người → gom câu giống nhau → sửa câu nhiều nhất → ghi số câu chuyển tuần đó.",
      "commonMistake": "Đọc nhật ký rồi bổ sung cả những việc lẽ ra phải để cho người, như bồi thường hay khiếu nại.",
      "action": "Đặt lịch 15 phút sáng thứ Hai và mở nhật ký tuần qua."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở lịch sử tin nhắn của shop tuần qua (hoặc 20 cuộc chat gần nhất của bạn với khách). Đánh dấu các cuộc khách phải hỏi lại hoặc bạn phải tự trả lời vì tài liệu thiếu. Gom các câu giống nhau vào bảng 3 cột: câu hỏi, số lần, cần thêm gì vào tài liệu. Chọn một dòng nhiều lần nhất và viết đoạn thêm vào tài liệu.",
      "secondary": "Ngày mai bạn sẽ được hỏi: câu nào xuất hiện nhiều nhất, và bạn đã thêm gì."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Thứ Hai, bạn mở nhật ký và thấy khách hỏi 'giờ mở cửa Tết' chín lần trong tuần, chín lần bot đều chuyển cho người. Không ai dặn bot điều đó cả. Bài này dạy bạn thói quen mười lăm phút mỗi tuần để biết bot hụt ở đâu."
      },
      {
        "type": "feynman",
        "title": "Đọc nhật ký hội thoại đơn giản hơn bạn nghĩ",
        "intro": "Hình dung bạn mở hộp thư góp ý của quán cuối tuần. Bạn không đoán khách muốn gì, mà đọc điều khách thật viết, rồi chọn điều nhiều người nhắc nhất để sửa trước.",
        "columns": [
          "Khâu",
          "Hộp thư góp ý của quán",
          "Nhật ký hội thoại của bot"
        ],
        "rows": [
          [
            "Nguồn",
            "Giấy khách viết tay",
            "Các cuộc chat thật giữa khách và bot"
          ],
          [
            "Cần tìm",
            "Điều khách phàn nàn hay hỏi lại",
            "Câu khách hỏi lại hoặc bot chuyển người"
          ],
          [
            "Xử lý",
            "Sửa điều nhiều người nhắc nhất",
            "Bổ sung tài liệu cho câu hỏi nhiều nhất"
          ],
          [
            "Nhịp",
            "Đọc đều mỗi tuần",
            "15 phút mỗi sáng thứ Hai"
          ]
        ],
        "oneLiner": "Đọc nhật ký giống đọc hộp thư góp ý: nghe điều khách thật nói, rồi sửa điều nhiều người nhắc nhất."
      },
      {
        "type": "heading",
        "text": "Hai dấu hiệu đáng lọc"
      },
      {
        "type": "paragraph",
        "text": "Bạn không cần đọc hết nhật ký. Hãy lọc hai dấu hiệu. Thứ nhất, khách hỏi lại cùng một ý sau khi bot đã trả lời: câu trả lời chưa đáp ứng. Thứ hai, bot chuyển cho người: bot không trả lời được hoặc không được phép trả lời."
      },
      {
        "type": "chart",
        "title": "Số câu bị chuyển cho người theo tuần",
        "caption": "Số liệu minh hoạ của một cửa hàng nhỏ. Tuần 1 chưa bổ sung tài liệu; từ tuần 2 mỗi thứ Hai chủ cửa hàng đọc nhật ký và bổ sung các câu hỏi nhiều nhất.",
        "kind": "bar",
        "xLabel": "Tuần",
        "yLabel": "Số câu chuyển cho người",
        "data": [
          {
            "label": "Tuần 1",
            "values": [
              28
            ]
          },
          {
            "label": "Tuần 2",
            "values": [
              15
            ]
          },
          {
            "label": "Tuần 3",
            "values": [
              12
            ]
          },
          {
            "label": "Tuần 4",
            "values": [
              13
            ]
          },
          {
            "label": "Tuần 5",
            "values": [
              9
            ]
          }
        ],
        "seriesLabels": [
          "Câu chuyển cho người"
        ]
      },
      {
        "type": "paragraph",
        "text": "Đường đi xuống không thẳng: tuần 4 số câu tăng nhẹ vì shop có thêm sản phẩm mới mà tài liệu chưa kịp theo. Đó là lý do đọc nhật ký là việc lặp lại mỗi tuần, không phải việc làm một lần."
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Mở nhật ký tuần qua và lọc câu khách hỏi lại hoặc chuyển người.",
          "Bước 2 - Gom các câu giống nhau vào một bảng, đếm số lần.",
          "Bước 3 - Với câu nhiều nhất: bổ sung thông tin vào tài liệu gốc, nếu đó là thông tin bot được phép nói.",
          "Bước 4 - Ghi số câu chuyển tuần này để tuần sau so."
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Thêm vào tài liệu",
          "text": "Giờ mở cửa dịp lễ, chính sách đổi size, phí ship theo khu vực: thông tin có thật, bot được phép nói, chỉ là tài liệu đang thiếu."
        },
        "right": {
          "label": "Để cho người",
          "text": "Đòi bồi thường, khiếu nại chất lượng, khách đang bực, câu hỏi về sức khoẻ: quyết định và cảm xúc cần con người xử lý."
        }
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI gom các câu khách hỏi trong nhật ký",
        "task": "Bạn dán 20 câu khách hỏi tuần qua (đã xoá tên, số điện thoại) và muốn AI gom giúp. Lắp prompt để AI gom nhóm đúng mà không bịa thêm câu hỏi.",
        "parts": [
          {
            "id": "data",
            "label": "Dữ liệu đưa vào",
            "options": [
              {
                "text": "Gom giúp tôi các câu khách hỏi tuần này.",
                "feedback": "Bạn không đưa dữ liệu nên AI có thể tự nghĩ ra các câu hỏi phổ biến rồi gom."
              },
              {
                "text": "Dưới đây là 20 tin nhắn khách (đã xoá tên, số điện thoại) kèm số thứ tự. Chỉ dùng các tin này.",
                "good": true,
                "feedback": "Có dữ liệu thật, có số thứ tự để đối chiếu và dặn chỉ dùng các tin này."
              }
            ]
          },
          {
            "id": "task",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Gom các tin cùng ý vào một nhóm, đặt tên nhóm, và ghi số thứ tự tin thuộc nhóm đó.",
                "good": true,
                "feedback": "Bạn kiểm được từng nhóm bằng số thứ tự, biết AI có gom đúng hay không."
              },
              {
                "text": "Cho tôi biết khách đang nghĩ gì về shop.",
                "feedback": "AI sẽ suy diễn cảm xúc khách từ vài tin, dễ bịa ra kết luận không có thật."
              }
            ]
          },
          {
            "id": "format",
            "label": "Khuôn dạng",
            "options": [
              {
                "text": "Viết thành một bài phân tích dài cho sếp đọc.",
                "feedback": "Bài dài che mất số đếm, bạn không chọn được nhóm đông nhất để xử lý trước."
              },
              {
                "text": "Trả về bảng 3 cột: tên nhóm, số tin, số thứ tự các tin. Sắp xếp nhóm đông nhất lên đầu.",
                "good": true,
                "feedback": "Bảng có số đếm, sắp theo nhóm đông nhất, đúng thứ bạn cần để chọn việc xử lý trước."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "data",
              "task",
              "format"
            ],
            "text": "| Nhóm | Số tin | Các tin |\n| Giờ mở cửa dịp lễ | 6 | 1, 4, 7, 11, 15, 19 |\n| Đổi size | 4 | 2, 8, 13, 17 |\n| Phí ship theo khu vực | 3 | 3, 9, 16 |\n| Khác | 7 | 5, 6, 10, 12, 14, 18, 20 |\n\nBạn đối chiếu được từng số thứ tự với tin gốc."
          },
          {
            "requires": [
              "data"
            ],
            "text": "Khách của bạn chủ yếu quan tâm tới giờ mở cửa, đổi size và giá ship, đồng thời thể hiện mong muốn được phản hồi nhanh.\n\n(Không có số đếm hay số thứ tự, và câu cuối là suy diễn không có trong dữ liệu.)"
          },
          {
            "text": "Khách hay hỏi: còn hàng không, giảm giá không, có giao quốc tế không, bảo hành bao lâu, có quà tặng kèm không...\n\n(AI không có dữ liệu nên tự liệt kê các câu hỏi thường gặp của một cửa hàng bất kỳ, không phải của shop bạn.)"
          }
        ]
      },
      {
        "type": "callout",
        "label": "Đừng dán thông tin cá nhân của khách",
        "text": "Trước khi dán nhật ký vào bất kỳ công cụ AI nào, xoá tên, số điện thoại, địa chỉ. Chỉ dùng công cụ mà công ty hoặc shop của bạn đã quyết định cho phép."
      },
      {
        "type": "scenario",
        "title": "Sáng thứ Hai, 15 phút đọc nhật ký",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Nhật ký tuần qua có 28 câu bot chuyển cho người. Bạn thấy 11 câu hỏi giờ mở cửa dịp lễ, 9 câu hỏi có giảm giá không, 5 câu khách bực về giao chậm, 3 câu khác.",
            "choices": [
              {
                "label": "Dừng đọc, vì 28 câu nhiều quá, để tuần sau đọc kỹ",
                "next": "bad_skip"
              },
              {
                "label": "Gom thành nhóm, đếm số lần và bắt đầu từ nhóm giờ mở cửa dịp lễ",
                "next": "s2"
              }
            ]
          },
          "bad_skip": {
            "text": "Tuần sau nhật ký có 41 câu chuyển, vì 11 khách hỏi giờ mở cửa lại hỏi thêm lần nữa. Bạn mất thêm một tuần để làm đúng việc của tuần trước.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn thêm lịch mở cửa vào tài liệu. Còn nhóm 5 câu khách bực về giao chậm.",
            "choices": [
              {
                "label": "Viết thêm cho bot cách xin lỗi và hứa giao lại trong ngày mai",
                "next": "bad_promise"
              },
              {
                "label": "Để bot chuyển các câu này cho người, rồi ghi số lần để sếp xem",
                "next": "good"
              }
            ]
          },
          "bad_promise": {
            "text": "Bot bắt đầu hứa 'giao lại trong ngày mai' với mọi khách bực, kể cả khi kho chưa có hàng. Hai khách chụp màn hình lời hứa đó khi hàng không tới.",
            "ending": "bad"
          },
          "good": {
            "text": "Tuần sau số câu chuyển giảm từ 28 xuống 17, phần lớn là nhóm khiếu nại mà người vẫn xử lý. Bạn ghi con số vào sổ vận hành.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Mười lăm phút đọc nhật ký mỗi tuần: bổ sung thông tin còn thiếu, còn quyết định và khiếu nại thì để người xử lý.",
          "Bài cuối: ghép tất cả thành một bot đã thử, có giới hạn và kèm sổ tay vận hành một trang."
        ]
      }
    ]
  },
  {
    "id": 2619,
    "slug": "du-an-cuoi-bot-hoi-dap-cho-shop-cua-ban-kem-so-tay-van-hanh",
    "title": "Chặng 60, Bài 20: Dự án cuối: bot hỏi-đáp cho shop của bạn kèm sổ tay vận hành một trang",
    "subtitle": "Một bot chỉ tốt khi người nhận biết phải làm gì với nó vào thứ Hai tuần sau.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🏁",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Làm được bot chưa đủ: người tiếp quản cần biết bot được trả lời gì, khi nào chuyển cho người, ai cập nhật và bao lâu một lần. Một trang sổ tay vận hành là khác biệt giữa bot chạy được tháng đầu và bot còn đúng sau sáu tháng.",
    "openingQuestion": "Bạn sắp nghỉ phép hai tuần, và một bạn nhân viên sẽ trông bot của shop. Bạn chỉ có 20 phút để chuẩn bị. Thứ hữu ích nhất để lại là gì?",
    "openingOptions": [
      "Một trang ghi ai cập nhật gì, bao lâu một lần, khi nào chuyển người",
      "Toàn bộ nhật ký hội thoại hai tháng qua để bạn ấy tự đọc rồi tự rút ra",
      "Một lời dặn miệng rằng bot ổn và bạn ấy cứ để nó chạy",
      "Mật khẩu của mọi công cụ để bạn ấy muốn sửa gì cũng được"
    ],
    "correctOption": 0,
    "explanation": "Người trông bot cần biết các việc lặp lại: ai cập nhật gì, bao lâu một lần, câu nào phải chuyển người, và liên hệ ai khi có sự cố. Một trang ngắn ghi đủ những điều đó dễ làm theo. Nhật ký dài hai tháng chỉ cho dữ liệu, không cho biết phải làm gì. Lời dặn miệng bị quên ngay tuần đầu. Đưa toàn bộ mật khẩu để sửa tuỳ ý còn làm tăng rủi ro có thay đổi không ai biết.",
    "diagram": [
      {
        "label": "Bot đã thử bằng bảng và tin thật",
        "arrow": true
      },
      {
        "label": "Ghi giới hạn và đường chuyển người",
        "arrow": true
      },
      {
        "label": "Ghi ai cập nhật gì, bao lâu một lần",
        "arrow": true
      },
      {
        "label": "Bàn giao một trang sổ tay"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: tiệm hoa nhận đặt qua tin nhắn",
      "description": "Chủ tiệm hoa viết sổ tay một trang: bot chỉ trả lời giá, giờ mở cửa và cách đặt; đòi hoàn tiền thì chuyển chị; giá đổi vào ngày 1 do chị cập nhật; thứ Hai đọc nhật ký 15 phút. Khi chị nghỉ phép, bạn nhân viên làm theo trang này mà không phải gọi hỏi."
    },
    "quiz": [
      {
        "question": "Sổ tay vận hành một trang cho bot của shop nên bắt đầu bằng mục nào?",
        "options": [
          "Bot được và không được trả lời những gì",
          "Lịch sử các phiên bản mô hình AI mà shop đã từng dùng",
          "Danh sách toàn bộ khách đã chat với bot trong tháng",
          "Giải thích nguyên lý hoạt động của mô hình ngôn ngữ"
        ],
        "correct": 0,
        "explanation": "Người tiếp quản cần biết phạm vi bot trước hết: nó được trả lời gì và không được trả lời gì, để biết khi nào can thiệp. Lịch sử mô hình và nguyên lý kỹ thuật không giúp xử lý việc hằng ngày. Danh sách khách lại chứa dữ liệu cá nhân mà sổ tay không cần."
      },
      {
        "question": "Trong sổ tay, mục 'khi nào chuyển cho người' nên ghi như thế nào?",
        "options": [
          "Ghi 'chuyển khi nào thấy cần' để người trực tự đánh giá",
          "Liệt kê cụ thể: đòi hoàn tiền, khiếu nại, hỏi sức khoẻ, khách đang bực",
          "Ghi 'không bao giờ chuyển' để bot xử lý hết mọi câu",
          "Ghi 'chuyển mọi cuộc chat có trên năm tin nhắn'"
        ],
        "correct": 1,
        "explanation": "Danh sách tình huống cụ thể giúp cả bot lẫn người trực làm giống nhau mỗi lần. 'Khi nào thấy cần' mỗi người hiểu một kiểu. 'Không bao giờ chuyển' làm bot tự quyết định việc vượt quyền. Số tin nhắn là tiêu chí sai: hoàn tiền có thể chỉ cần hai tin, còn hỏi giờ mở cửa có thể kéo dài nhiều tin."
      },
      {
        "question": "Sổ tay cần ghi 'ai cập nhật giá và khi nào'. Ví dụ tốt nhất là gì?",
        "options": [
          "Ai thấy giá đổi thì tự sửa bất cứ lúc nào họ nhớ ra",
          "Bộ phận IT tự cập nhật giá giúp shop mỗi quý một lần",
          "Chị Hoa cập nhật bảng giá trong ngày đổi giá, rồi chạy lại bộ thử",
          "Bot sẽ tự cập nhật giá khi có khách hỏi giá mới"
        ],
        "correct": 2,
        "explanation": "Một người cụ thể, một mốc cụ thể và một việc kiểm đi kèm: đó là điều sổ tay cần. 'Ai cũng sửa, lúc nào cũng được' nghĩa là không ai chịu trách nhiệm. Quý một lần là quá thưa so với giá đổi theo tháng. Bot không tự cập nhật giá từ câu hỏi của khách."
      },
      {
        "question": "Bạn viết sổ tay xong và chưa cho ai đọc. Kiểm tra hợp lý nhất trước khi bàn giao là gì?",
        "options": [
          "Tự đọc lại một lần vì bạn là người hiểu bot nhất",
          "Gửi cho cả nhóm và chờ ai phản hồi thì sửa",
          "Dịch sổ tay sang tiếng Anh để thấy còn thiếu gì",
          "Nhờ một người chưa biết bot làm theo sổ tay một việc thật"
        ],
        "correct": 3,
        "explanation": "Người viết dễ bỏ qua điều 'hiển nhiên' vì đã biết sẵn, nên cần một người mới thử làm theo từng bước: chỗ họ vấp là chỗ sổ tay thiếu. Tự đọc lại không cho thấy điều đó. Chờ phản hồi có thể không ai đọc. Dịch sang tiếng Anh không liên quan đến việc người thật có làm được hay không."
      },
      {
        "question": "Sổ tay ghi: thứ Hai đọc nhật ký 15 phút, đầu tháng cập nhật giá, mỗi lần đổi giá chạy lại 25 câu. Trung bình một tháng có 4 thứ Hai và 1 lần đổi giá. Tổng thời gian chạy lại bộ thử là bao lâu nếu mỗi lần mất 10 phút?",
        "options": [
          "10 phút (1 lần đổi giá × 10 phút)",
          "40 phút (4 thứ Hai × 10 phút, nhầm với lịch đọc nhật ký)",
          "60 phút (4 × 15 phút, tính thời gian đọc nhật ký)",
          "70 phút (4 × 15 + 10, cộng cả nhật ký và bộ thử)"
        ],
        "correct": 0,
        "explanation": "Bộ thử chỉ chạy lại khi đổi giá: 1 lần × 10 phút = 10 phút. 40 phút nhầm lịch chạy thử với lịch đọc nhật ký. 60 phút là riêng thời gian đọc nhật ký, không phải bộ thử. 70 phút là tổng cả hai việc, không phải tổng thời gian chạy bộ thử như câu hỏi."
      }
    ],
    "keyTakeaways": [
      "Bàn giao bot là bàn giao một trang sổ tay, không chỉ bàn giao tệp hay tài khoản.",
      "Sổ tay có bốn mục: bot được và không được trả lời gì, khi nào chuyển người, ai cập nhật gì và bao lâu một lần, liên hệ ai khi có sự cố.",
      "Mục chuyển người liệt kê tình huống cụ thể: hoàn tiền, khiếu nại, sức khoẻ, khách đang bực.",
      "Mỗi việc lặp lại có một người và một mốc thời gian cụ thể.",
      "Nhờ một người chưa biết bot làm thử theo sổ tay trước khi bàn giao."
    ],
    "practicePrompt": {
      "question": "Bạn đang soạn mục 'khi bot hụt' của sổ tay. Cách ghi nào giúp người trực tuần sau làm đúng?",
      "options": [
        "Nếu bot trả lời chưa tốt thì người trực tự quyết định cách xử lý",
        "Nếu bot hụt thì tắt bot và nhắn khách đợi chủ shop quay lại",
        "Nếu bot chuyển người hoặc khách hỏi lại hai lần, người trực trả lời khách và ghi câu đó vào bảng thứ Hai",
        "Nếu bot hụt thì sửa tài liệu ngay lập tức không cần hỏi ai"
      ],
      "correct": 2,
      "explanation": "Quy tắc cụ thể gồm dấu hiệu (chuyển người hoặc hỏi lại hai lần), việc cần làm (trả lời khách) và nơi ghi lại (bảng thứ Hai). 'Tự quyết định' bỏ lại người trực không có hướng dẫn. Tắt bot khiến mọi khách khác mất hỗ trợ vì một câu hụt. Sửa tài liệu ngay không hỏi ai có thể thêm thông tin sai hoặc thông tin mà bot không được phép nói."
    },
    "summary": {
      "keyIdea": "Một bot chỉ hữu ích lâu dài khi có một trang sổ tay để người khác vận hành tiếp.",
      "formula": "Bot đã thử + giới hạn + đường chuyển người + ai cập nhật gì, bao lâu một lần = bàn giao được.",
      "commonMistake": "Bàn giao tài khoản và tệp nhưng không ghi khi nào chuyển người và ai chịu trách nhiệm cập nhật.",
      "action": "Viết bốn mục của sổ tay vào một trang và nhờ một người làm thử."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Soạn sổ tay một trang cho bot của shop bạn (hoặc bot giả định) với bốn mục: 1) bot được và không được trả lời gì; 2) khi nào chuyển cho người, liệt kê ít nhất 4 tình huống; 3) ai cập nhật gì và bao lâu một lần, ghi tên người và mốc thời gian; 4) khi có sự cố liên hệ ai. Sau đó nhờ một người chưa biết bot đọc và nói họ sẽ làm gì vào thứ Hai.",
      "secondary": "Ngày mai bạn sẽ được hỏi: người đọc thử vấp ở mục nào, và bạn đã sửa thế nào."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn sắp nghỉ phép hai tuần. Bot đã chạy ổn, nhưng chỉ bạn biết giá đổi ở đâu, câu nào phải chuyển cho chủ shop, và khi nào đọc nhật ký. Bài cuối là bài bạn gom các bài trước vào một trang để người khác có thể tiếp quản."
      },
      {
        "type": "feynman",
        "title": "Sổ tay vận hành đơn giản hơn bạn nghĩ",
        "intro": "Hình dung một quán cà phê giao chìa khóa cho ca sáng. Người mới không cần hiểu cách máy pha cà phê hoạt động, họ cần một tờ ghi: mở máy lúc mấy giờ, hết sữa gọi ai, khách khiếu nại thì báo chủ.",
        "columns": [
          "Khâu",
          "Tờ hướng dẫn của quán",
          "Sổ tay của bot"
        ],
        "rows": [
          [
            "Việc lặp lại",
            "Mở máy, kiểm tồn kho đầu ca",
            "Cập nhật giá, đọc nhật ký thứ Hai"
          ],
          [
            "Giới hạn",
            "Không tự giảm giá quá mức cho khách",
            "Bot không hứa hoàn tiền, không tư vấn sức khoẻ"
          ],
          [
            "Khi có chuyện",
            "Khách khiếu nại thì báo chủ quán",
            "Đòi hoàn tiền, khách bực thì chuyển người"
          ],
          [
            "Liên hệ",
            "Số điện thoại chủ quán và thợ máy",
            "Tên người chịu trách nhiệm và kênh liên hệ"
          ]
        ],
        "oneLiner": "Sổ tay giống tờ hướng dẫn ca sáng: người mới không cần hiểu bot, chỉ cần biết việc lặp lại, giới hạn và khi nào gọi ai."
      },
      {
        "type": "heading",
        "text": "Gom lại những gì bạn đã làm"
      },
      {
        "type": "paragraph",
        "text": "Trong chặng này bạn đã chép câu khách hay hỏi, nhóm chúng thành ba ngăn, viết câu trả lời mẫu, cho bot đọc tài liệu, đặt giới hạn và đường chuyển người, rồi chấm bot bằng bảng, học từ tin nhắn thật và giữ tài liệu luôn mới. Sổ tay một trang là chỗ ghi tất cả những điều đó theo thứ tự người tiếp quản cần."
      },
      {
        "type": "flow",
        "title": "Bốn mục của sổ tay một trang",
        "steps": [
          {
            "label": "Bot làm gì, không làm gì",
            "detail": "Liệt kê loại câu bot được trả lời (giá, giờ mở cửa, cách đặt hàng) và loại bot không được (hoàn tiền, sức khoẻ, khiếu nại)."
          },
          {
            "label": "Khi nào chuyển cho người",
            "detail": "Viết các tình huống cụ thể: đòi hoàn tiền, khiếu nại, hỏi sức khoẻ, khách đang bực. Ghi ai nhận và nhận qua kênh nào."
          },
          {
            "label": "Ai cập nhật gì, khi nào",
            "detail": "Mỗi việc lặp lại có một tên và một mốc: đổi giá thì cập nhật trong ngày, đọc nhật ký sáng thứ Hai, chạy lại 25 câu sau mỗi lần sửa."
          },
          {
            "label": "Khi có sự cố",
            "detail": "Ghi liên hệ của người phụ trách và cách tạm dừng bot nếu thấy nó nói sai điều nghiêm trọng."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Một trang, không hơn",
        "text": "Sổ tay dài hai mươi trang thì không ai đọc. Nếu bạn cần nhiều hơn một trang, hãy cắt: người tiếp quản chỉ cần việc lặp lại, giới hạn, và khi nào gọi ai."
      },
      {
        "type": "comparison",
        "left": {
          "label": "Bàn giao không có sổ tay",
          "text": "Đưa tài khoản và tệp, dặn miệng vài câu. Người tiếp quản không biết giá đổi ở đâu, câu nào phải chuyển, nên hoặc không làm gì hoặc sửa nhầm chỗ."
        },
        "right": {
          "label": "Bàn giao có sổ tay",
          "text": "Một trang ghi phạm vi bot, khi nào chuyển người, ai cập nhật gì, liên hệ ai. Người tiếp quản làm theo được ngay từ thứ Hai."
        }
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI soạn nháp sổ tay một trang",
        "task": "Bạn có sẵn ghi chú về bot của shop hoa: bot trả lời giá, giờ mở cửa, cách đặt; đòi hoàn tiền thì chuyển chị Hoa; chị Hoa cập nhật giá ngày 1 hằng tháng; thứ Hai đọc nhật ký 15 phút. Lắp prompt để AI soạn nháp sổ tay.",
        "parts": [
          {
            "id": "data",
            "label": "Dữ liệu đưa vào",
            "options": [
              {
                "text": "Soạn sổ tay vận hành bot cho một shop hoa.",
                "feedback": "Không có thông tin của shop, AI sẽ bịa tên người, lịch cập nhật và quy trình không có thật."
              },
              {
                "text": "Đây là ghi chú của tôi: bot trả lời giá, giờ mở cửa, cách đặt; đòi hoàn tiền chuyển chị Hoa; chị Hoa cập nhật giá ngày 1; thứ Hai đọc nhật ký. Chỉ dùng các ý này.",
                "good": true,
                "feedback": "Có dữ kiện thật của shop và dặn chỉ dùng các ý này, nên AI khó bịa thêm quy trình."
              }
            ]
          },
          {
            "id": "task",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Viết thành sổ tay hay, đầy đủ, chuyên nghiệp như công ty lớn.",
                "feedback": "Yêu cầu mơ hồ làm AI viết dài, thêm các quy trình mà shop không có."
              },
              {
                "text": "Sắp xếp các ý thành bốn mục: phạm vi bot, khi nào chuyển người, ai cập nhật gì, liên hệ khi có sự cố. Mục nào thiếu thông tin thì ghi 'cần bổ sung'.",
                "good": true,
                "feedback": "Bốn mục rõ ràng và cho phép AI ghi 'cần bổ sung' thay vì tự bịa."
              }
            ]
          },
          {
            "id": "format",
            "label": "Khuôn dạng",
            "options": [
              {
                "text": "Gạch đầu dòng ngắn, vừa một trang giấy, không dùng thuật ngữ kỹ thuật.",
                "good": true,
                "feedback": "Ngắn, một trang, dùng chữ người tiếp quản hiểu được."
              },
              {
                "text": "Viết thành bài báo cáo dài có phần mở đầu và kết luận.",
                "feedback": "Bài dài khiến người tiếp quản không đọc, và không thành sổ tay một trang."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "data",
              "task",
              "format"
            ],
            "text": "SỔ TAY VẬN HÀNH BOT - SHOP HOA\n1. Bot được: trả lời giá, giờ mở cửa, cách đặt hoa.\n2. Chuyển người: đòi hoàn tiền -> chị Hoa. Khiếu nại khác: cần bổ sung.\n3. Cập nhật: chị Hoa cập nhật giá ngày 1 hằng tháng; thứ Hai đọc nhật ký 15 phút.\n4. Sự cố: liên hệ cần bổ sung."
          },
          {
            "requires": [
              "data"
            ],
            "text": "SỔ TAY VẬN HÀNH BOT\nBot của shop được phát triển nhằm nâng cao trải nghiệm khách hàng, đồng thời tối ưu hoá quy trình vận hành một cách toàn diện...\n\n(Có dữ kiện nhưng giọng báo cáo dài, chưa chia bốn mục và chưa chỉ ra phần còn thiếu.)"
          },
          {
            "text": "SỔ TAY VẬN HÀNH BOT - SHOP HOA\nAnh Nam cập nhật giá vào thứ Sáu hằng tuần, nhóm kỹ thuật kiểm tra bot lúc 8 giờ sáng mỗi ngày, hotline sự cố: 1900 xxxx.\n\n(AI không có dữ liệu nên bịa tên người, lịch và số hotline mà shop chưa hề có.)"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Hai ngày trước kỳ nghỉ, bàn giao bot",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn có thể viết sổ tay một trang hoặc dặn miệng. Bạn Linh sẽ trông bot hai tuần và chưa từng đọc nhật ký hay sửa tài liệu.",
            "choices": [
              {
                "label": "Dặn Linh miệng trong 5 phút và gửi tất cả mật khẩu",
                "next": "bad_verbal"
              },
              {
                "label": "Viết sổ tay một trang với bốn mục và nhờ Linh đọc thử",
                "next": "s2"
              }
            ]
          },
          "bad_verbal": {
            "text": "Tuần 2 shop đổi giá nhưng Linh không biết mình phải cập nhật. Bot báo giá cũ suốt ba ngày, và Linh tự sửa một tệp khác vì nghĩ đó là tệp giá.",
            "ending": "bad"
          },
          "s2": {
            "text": "Linh đọc xong và hỏi: 'Nếu khách đòi hoàn tiền mà chị Hoa không nghe điện thoại thì em làm gì?'. Sổ tay chưa ghi trường hợp này.",
            "choices": [
              {
                "label": "Trả lời miệng và không cập nhật sổ tay vì Linh đã hiểu",
                "next": "bad_noupdate"
              },
              {
                "label": "Thêm một dòng vào mục chuyển người: ghi lại tin, nhắn khách rằng chủ shop sẽ phản hồi trong ngày",
                "next": "good"
              }
            ]
          },
          "bad_noupdate": {
            "text": "Tuần sau thêm một bạn mới vào nhóm và cũng hỏi đúng câu đó. Không có gì để đưa, bạn phải trả lời lại từ đầu.",
            "ending": "bad"
          },
          "good": {
            "text": "Linh làm theo sổ tay suốt hai tuần: cập nhật giá ngày 1, chạy lại bộ thử, ghi nhật ký. Khi bạn quay lại, bảng số câu chuyển người đã đầy đủ hai tuần.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Bot tốt là bot đã thử, có giới hạn, có đường chuyển người, và có một trang ghi ai làm gì mỗi tuần.",
          "Bạn đã xong chặng 60: từ 20 câu khách hay hỏi đến một bot bàn giao được."
        ]
      }
    ]
  }
];
