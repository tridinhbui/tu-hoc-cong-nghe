import type { TechCareer } from "./types";

/**
 * Các nghề có câu hỏi phỏng vấn riêng. Mỗi nghề một tệp câu hỏi trong thư mục
 * này, và một dải id riêng để hai tệp viết song song không bao giờ đụng nhau:
 *
 *   frontend 1001-1999 · backend 2001-2999 · data 3001-3999 · devops 4001-4999
 *   ai-engineer 5001-5999 · qa 6001-6999 · mobile 7001-7999 · hành vi 9001-9999
 */
export const TECH_CAREERS: TechCareer[] = [
  {
    id: "frontend",
    title: "Lập trình viên Frontend",
    englishTitle: "Frontend Developer",
    description: "Giao diện web: HTML, CSS, JavaScript, React, hiệu năng và khả năng truy cập.",
  },
  {
    id: "backend",
    title: "Lập trình viên Backend",
    englishTitle: "Backend Developer",
    description: "API, cơ sở dữ liệu, xác thực, hàng đợi và thiết kế dịch vụ.",
  },
  {
    id: "data",
    title: "Chuyên viên phân tích dữ liệu",
    englishTitle: "Data Analyst",
    description: "SQL, thống kê cơ bản, chỉ số sản phẩm, thử nghiệm A/B và dashboard.",
  },
  {
    id: "devops",
    title: "Kỹ sư DevOps / Cloud",
    englishTitle: "DevOps / Cloud Engineer",
    description: "Linux, mạng, container, CI/CD, hạ tầng đám mây và vận hành sự cố.",
  },
  {
    id: "ai-engineer",
    title: "Kỹ sư AI ứng dụng",
    englishTitle: "AI Engineer",
    description: "Mô hình ngôn ngữ, RAG, agent, đánh giá chất lượng và chi phí khi đưa AI vào sản phẩm.",
  },
  {
    id: "qa",
    title: "Kỹ sư kiểm thử (QA)",
    englishTitle: "QA Engineer",
    description: "Thiết kế ca kiểm thử, kiểm thử tự động, báo lỗi và chất lượng phát hành.",
  },
  {
    id: "mobile",
    title: "Lập trình viên Mobile",
    englishTitle: "Mobile Developer",
    description: "Ứng dụng iOS/Android: vòng đời, trạng thái, mạng không ổn định và phát hành lên kho.",
  },
];
