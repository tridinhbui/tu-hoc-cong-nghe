// UI copy for the small calculators under components/tools/ and the
// standalone Interactive* widgets embedded in lesson content. Not wired into
// the main dictionary yet - see AGENTS.md "Translating the UI".

export const toolsSectionVi = {
  profitCalc: {
    title: "Thử nghiệm: Dư địa trên giấy vs dư địa thật",
    subtitle: "Kéo để thay đổi số liệu và xem điều gì xảy ra",
    revenueLabel: "Công suất danh nghĩa được cấp",
    costLabel: "Phần đã bị chiếm cố định",
    cashReceivedLabel: "Công suất thật sự dùng được ở giờ cao điểm",
    millionUnit: "{value} đơn vị",
    remainingReceivable: "Còn {amount} đơn vị chỉ có trên giấy, không dùng được lúc cao điểm",
    profitResultLabel: "Dư địa trên giấy",
    cashResultLabel: "Dư địa thật",
    profitPositiveNote: "Còn chỗ",
    profitNegativeNote: "Đã vượt",
    cashPositiveNote: "Đủ chỗ",
    cashNegativeNote: "Thiếu chỗ",
    shortOfCashTitle: "Đây rồi!",
    shortOfCashBody: "Dư địa trên giấy dương (+{profit} đơn vị) nhưng dư địa thật âm ({cash} đơn vị). Đây chính xác là trường hợp bảng theo dõi báo còn chỗ mà hệ thống vẫn vỡ ở giờ cao điểm - vì {receivable} đơn vị kia chỉ tồn tại trong con số được cấp, không tồn tại lúc cần.",
    fullPaymentBody: "Khi công suất được cấp dùng được trọn vẹn ở mọi thời điểm, dư địa trên giấy bằng dư địa thật. Nhưng thực tế ít khi vậy!",
  },


};

export const toolsSectionEn: typeof toolsSectionVi = {
  profitCalc: {
    title: "Experiment: Paper headroom vs real headroom",
    subtitle: "Drag the sliders to change the numbers and see what happens",
    revenueLabel: "Nominal capacity provisioned",
    costLabel: "Baseline already consumed",
    cashReceivedLabel: "Capacity actually usable at peak",
    millionUnit: "{value} units",
    remainingReceivable: "{amount} units exist on paper only, unusable at peak",
    profitResultLabel: "Paper headroom",
    cashResultLabel: "Real headroom",
    profitPositiveNote: "Room left",
    profitNegativeNote: "Over capacity",
    cashPositiveNote: "Enough room",
    cashNegativeNote: "Short on room",
    shortOfCashTitle: "There it is!",
    shortOfCashBody: "Paper headroom is positive (+{profit} units) but real headroom is negative ({cash} units). This is exactly the case where the dashboard says there is room and the system still falls over at peak - those {receivable} units exist only in the provisioned number, not at the moment you need them.",
    fullPaymentBody: "When provisioned capacity is fully usable at every moment, paper headroom equals real headroom. In practice that is rare!",
  },


};
