import type { CfaEssayTranslation } from "./index";

/**
 * Bản dịch tiếng Anh của 4 đề tự luận, khoá theo `id`.
 *
 * BA LUẬT RIÊNG CHO TỆP NÀY:
 *
 * 1. DẤU THẬP PHÂN. "1,4 tỷ" thành "VND 1.4bn" - giữ nguyên dấu phẩy thì người
 *    đọc tiếng Anh hiểu thành một nghìn bốn. Đây là chỗ sai nguy hiểm nhất ở
 *    đây vì rubric bắt người học TÍNH: (1.4 − 0.18 − 0.4) / 42 ≈ 1.95%. Sai một
 *    dấu là cả phép tính vô nghĩa.
 *
 * 2. TÊN NGƯỜI GIỮ NGUYÊN, KÍNH NGỮ THÌ DỊCH. "Ông Trần" thành "Mr Trần", "Bà
 *    Lê" thành "Mrs Lê". Tình huống đặt ở Việt Nam và đó là một phần bối cảnh;
 *    đổi thành "Mr Smith" là viết lại đề chứ không phải dịch.
 *
 * 3. THUẬT NGỮ CFA GIỮ NGUYÊN DẠNG THI. "ability", "willingness",
 *    "disposition effect", "immunization", "composite" - bản tiếng Việt đã để
 *    chúng trong ngoặc vì đó là chữ người học phải nhận ra trong đề thi thật.
 *    Bản Anh dùng thẳng, không diễn giải.
 */
export const cfaEssaysEn: Record<string, CfaEssayTranslation> = {
  "es-ips-01": {
    topic: "Personal IPS",
    vignette:
      "Mr Trần, 58, has just sold his machining workshop for VND 42bn after tax. He plans to retire at 60 and needs to draw VND 1.4bn a year (in today's money) to live on. Beyond this portfolio he has a pension of VND 180m a year and a rental property bringing in VND 400m a year. His wife is 55 and in good health. He says: \"I can't stand seeing the account down more than 15% in a year.\"",
    prompt:
      "Determine Mr Trần's ability and willingness to take risk, and state the overall risk tolerance you would write into the IPS.",
    rubricTexts: [
      "Conclude that ability is above average - and give the basis, not just the assertion",
      "Compute the withdrawal rate: (1.4 − 0.18 − 0.4) / 42 ≈ 1.95%, low for the portfolio",
      "Note the long horizon (~30 years, counting his wife's life expectancy), which raises ability",
      "Conclude that willingness is low, citing his statement about a 15% drawdown directly",
      "Where the two diverge, take the lower - willingness - as the overall level",
    ],
    commonMistake:
      "Writing \"ability is high because he is wealthy\". Wealth is not the basis - the number is the withdrawal rate against portfolio size. VND 30bn drawn at 8% a year is low ability.",
  },

  "es-beh-01": {
    topic: "Behavioural finance",
    vignette:
      "Mrs Lê holds 62% of her portfolio in shares of the former employer she worked at for 20 years. She refuses to sell, saying \"I understand this company better than anyone\". She also sold out of an index fund entirely in March after it fell 9%, and is holding a 40% loss in a property stock because \"selling makes it real\".",
    prompt:
      "Identify two behavioural biases in Mrs Lê's behaviour, classify each as cognitive or emotional, and state the appropriate way to handle each type.",
    rubricTexts: [
      "Identify familiarity/overconfidence in the 62% holding of the former employer",
      "Identify the disposition effect: holding the 40% loss, cutting the position down 9%",
      "Classify correctly: familiarity is cognitive, disposition is emotional",
      "Cognitive biases are corrected with information and process discipline",
      "Emotional biases are adapted to rather than corrected - build the IPS around them",
    ],
    commonMistake:
      "Calling everything \"loss aversion\" and recommending \"client education\". Education does almost nothing for an emotional bias; the marks are for distinguishing moderate from adapt.",
  },

  "es-fi-01": {
    topic: "Fixed income",
    vignette:
      "A pension fund owes VND 500bn in exactly 7 years. Its current bond portfolio has a duration of 4.2 and a value of VND 340bn. The manager proposes moving to a bond basket with a duration of 7.0, the same present value as the liability, and greater convexity than the liability.",
    prompt:
      "State the three conditions for immunizing a single liability, and say whether the proposal satisfies them.",
    rubricTexts: [
      "Condition 1: the present value of the portfolio equals the present value of the liability",
      "Condition 2: the portfolio's money duration (or BPV) matches the liability's",
      "Condition 3: portfolio convexity is greater, but minimised, to reduce structural risk",
      "Conclude the proposal satisfies all three, and note it must be rebalanced as duration drifts",
    ],
    commonMistake:
      "Writing \"the more convexity the better\". Convexity above the liability's is needed, but too much spreads the cash flows and makes the portfolio more sensitive to changes in the shape of the curve - exactly what immunization is trying to avoid.",
  },

  "es-gips-01": {
    topic: "Ethics & GIPS",
    vignette:
      "An asset manager in Ho Chi Minh City advertises: \"GIPS compliant for our growth equity fund. Performance over the last 5 years: 18.4% a year, independently audited.\" The growth equity composite holds 12 accounts; three with unusually low fees were removed from the composite to \"avoid noise\".",
    prompt: "State two GIPS violations in this situation and explain why each is a violation.",
    rubricTexts: [
      "Violation 1: claiming compliance for part of the firm - GIPS applies to the whole firm",
      "Violation 2: removing accounts from the composite on discretionary grounds, which is cherry-picking",
      "Explain: every fee-paying account run to the same strategy must sit in the composite",
      "Note that \"audited\" is not the same as GIPS verification",
    ],
    commonMistake:
      "Catching only the cherry-picking and missing the product-level compliance claim. That is the most basic GIPS error and it almost always carries its own mark.",
  },
};
