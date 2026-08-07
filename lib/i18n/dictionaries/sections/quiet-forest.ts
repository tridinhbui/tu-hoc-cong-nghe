// Chữ cho khu rừng đi lại được ở /loi-nhan: ba tấm biển gỗ dựng trong cảnh
// (lib/quiet-forest-space.ts) và phần HUD quanh khung 3D.
//
// Biển "Giữ nhịp thở" nói 4-4-4-4 vì BreathingCircle đang chạy đúng nhịp thở
// hộp đó. Hai chỗ nói hai nhịp khác nhau trên cùng một trang thì người đọc
// không biết tin cái nào - và cái sai sẽ là cái họ đọc trước, tức là tấm biển.
// Xem AGENTS.md, mục "Translating the UI".

export const quietForestVi = {
  quietForestSigns: {
    breath: {
      title: "Giữ nhịp thở",
      lines: [
        "Hít vào 4 nhịp · giữ 4 · thở ra 4 · nghỉ 4.",
        "Đếm chậm hơn bạn nghĩ là phải đếm.",
        "Lạc nhịp thì bắt đầu lại, không phải làm lại từ đầu.",
      ],
    },
    setDown: {
      title: "Đặt xuống gánh nặng",
      lines: [
        "Thứ bạn đang mang không cần mang suốt đêm.",
        "Đặt nó cạnh đống lửa, ngồi một lát.",
        "Sáng mai nó vẫn ở đó nếu bạn còn cần - và nhẹ hơn.",
      ],
    },
    stay: {
      title: "Ở lại bao lâu cũng được",
      lines: [
        "Không có gì để hoàn thành ở đây.",
        "Không đếm giờ, không cộng điểm, không ai đang đợi.",
        "Đi vòng quanh, hoặc chỉ đứng yên nhìn lửa.",
      ],
    },
  },
  quietForest: {
    /** Nhãn nút mở rộng khung, và trạng thái ngược lại. */
    expand: "Mở rộng khu rừng",
    collapse: "Thu nhỏ lại",
    /** Chỉ dẫn duy nhất về việc có gì trong rừng. Một câu, rồi thôi. */
    signsHint: "Ba tấm biển dựng quanh đống lửa. Đi tới gần thì đọc được.",
    /** Nhãn cho người đọc bằng trình đọc màn hình. */
    sceneAria:
      "Khu rừng 3D quanh một đống lửa, đi lại được. Dùng W A S D để đi, hoặc cần điều khiển ở góc dưới bên phải. Nội dung ba tấm biển cũng có ở các mục bên dưới trang.",
  },
};

export const quietForestEn: typeof quietForestVi = {
  quietForestSigns: {
    breath: {
      title: "Keep the rhythm",
      lines: [
        "In for 4 · hold 4 · out for 4 · rest 4.",
        "Count slower than you think you should.",
        "Lose the count and just pick it up again - no starting over.",
      ],
    },
    setDown: {
      title: "Set the weight down",
      lines: [
        "What you are carrying does not have to be carried all night.",
        "Put it by the fire and sit a while.",
        "It will still be there tomorrow if you need it - and lighter.",
      ],
    },
    stay: {
      title: "Stay as long as you like",
      lines: [
        "There is nothing to finish here.",
        "No timer, no points, nobody waiting.",
        "Walk around, or just stand and watch the fire.",
      ],
    },
  },
  quietForest: {
    expand: "Open up the forest",
    collapse: "Make it smaller",
    signsHint: "Three signs stand around the fire. Walk up to one to read it.",
    sceneAria:
      "A walkable 3D forest around a campfire. Use W A S D to walk, or the stick at the bottom right. What the three signs say also appears in the sections below.",
  },
};
