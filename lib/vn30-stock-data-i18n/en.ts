import type { Vn30Translation } from "./index";

/**
 * Bản tiếng Anh của danh sách công ty công nghệ và bể tin ngành.
 *
 * Tên doanh nghiệp dùng TÊN CHÍNH THỨC của chính doanh nghiệp đó, không dịch
 * từng chữ. Doanh nghiệp vốn đã mang tên quốc tế (NVIDIA, Microsoft, GitLab)
 * thì giữ nguyên - dịch chúng là đặt cho doanh nghiệp một cái tên không tồn tại.
 *
 * `sectors` phải phủ ĐỦ 17 ngành. Thiếu một ngành thì cả cổ phiếu và tin ngành
 * của ngành đó giữ tiếng Việt - không vỡ phép ghép, nhưng người đọc tiếng Anh
 * thấy một ô tiếng Việt giữa bảng. Bộ kiểm đi kèm bắt buộc đủ 17.
 */
export const vn30En: Vn30Translation = {
  sectors: {
    "Phần mềm & dịch vụ CNTT": "Software & IT services",
    "Nền tảng số & giải trí": "Digital platforms & entertainment",
    "Logistics công nghệ": "Tech-enabled logistics",
    "Thiết bị mạng & viễn thông": "Network & telecom equipment",
    "Bán dẫn & chip": "Semiconductors & chips",
    "Điện toán đám mây": "Cloud computing",
    "Thương mại điện tử": "E-commerce",
    "Dữ liệu & phân tích": "Data & analytics",
    "Giám sát & vận hành": "Monitoring & operations",
    "Cơ sở dữ liệu": "Databases",
    "An toàn thông tin": "Security",
    "Mạng phân phối & CDN": "Delivery networks & CDN",
    "Ảo hoá & hạ tầng": "Virtualisation & infrastructure",
    "Mã nguồn mở doanh nghiệp": "Enterprise open source",
    "Công cụ lập trình": "Developer tooling",
    "Nền tảng API": "API platforms",
    "Trí tuệ nhân tạo": "Artificial intelligence",
  },

  stocks: {
    FPT: {
      name: "FPT Corporation",
      description: "Vietnam's leading software exporter, digital transformation and engineer training.",
    },
    VNG: {
      name: "VNG Corporation",
      description: "Zalo, online games and domestic cloud services.",
    },
    CMG: {
      name: "CMC Technology",
      description: "Systems integration, information security and datacenters.",
    },
    VTP: {
      name: "Viettel Post",
      description: "Smart warehousing infrastructure and automated parcel sorting.",
    },
    ELC: {
      name: "Elcom",
      description: "Telecom infrastructure equipment and intelligent transport systems.",
    },
    ITD: {
      name: "Tien Phong Technology",
      description: "Traffic control and industrial automation solutions.",
    },
    NVDA: {
      name: "NVIDIA",
      description: "Graphics chips and accelerators for training AI models.",
    },
    AMD: {
      name: "AMD",
      description: "Server processors and graphics chips competing head-on.",
    },
    TSM: {
      name: "TSMC",
      description: "The world's largest chip foundry, on sub-5nm processes.",
    },
    MSFT: {
      name: "Microsoft",
      description: "Azure, the Office suite and enterprise developer platforms.",
    },
    AMZN: {
      name: "Amazon",
      description: "AWS leads cloud infrastructure, alongside global e-commerce.",
    },
    GOOG: {
      name: "Alphabet",
      description: "Google Cloud, search and the Android operating system.",
    },
    SHOP: {
      name: "Shopify",
      description: "A platform for small merchants to build online stores.",
    },
    SE: {
      name: "Sea Group",
      description: "Shopee, Garena and digital wallets across South-East Asia.",
    },
    MELI: {
      name: "MercadoLibre",
      description: "Latin America's largest marketplace and digital payments network.",
    },
    SNOW: {
      name: "Snowflake",
      description: "A cloud data warehouse that separates compute from storage.",
    },
    DDOG: {
      name: "Datadog",
      description: "Monitoring, logging and tracing for distributed systems.",
    },
    MDB: {
      name: "MongoDB",
      description: "A document database and the Atlas managed cloud service.",
    },
    ORCL: {
      name: "Oracle",
      description: "Enterprise databases and OCI cloud infrastructure.",
    },
    CRWD: {
      name: "CrowdStrike",
      description: "Endpoint protection and real-time intrusion detection.",
    },
    PANW: {
      name: "Palo Alto Networks",
      description: "Next-generation firewalls and cloud infrastructure security.",
    },
    NET: {
      name: "Cloudflare",
      description: "CDN, DDoS protection and functions that run at the edge.",
    },
    AKAM: {
      name: "Akamai",
      description: "A long-established content delivery network and edge computing.",
    },
    VMW: {
      name: "Broadcom VMware",
      description: "Server virtualisation and enterprise infrastructure platforms.",
    },
    RHT: {
      name: "Red Hat",
      description: "Enterprise Linux, Kubernetes and long-term support.",
    },
    GTLB: {
      name: "GitLab",
      description: "Source control, CI/CD and security in a single platform.",
    },
    TEAM: {
      name: "Atlassian",
      description: "Jira, Confluence and collaboration tooling for engineering teams.",
    },
    TWLO: {
      name: "Twilio",
      description: "APIs for messaging, voice and authentication in applications.",
    },
    STRP: {
      name: "Stripe Payments",
      description: "Payment API infrastructure for online platforms.",
    },
    OPAI: {
      name: "OpenAI Platform",
      description: "Language-model APIs and tooling for building AI applications.",
    },
  },

  news: [
    {
      headline: "📢 Chip demand surges on the wave of AI model training",
      explanation: "Accelerator orders are booked out two years ahead, lifting margins at both foundries and chip designers.",
    },
    {
      headline: "📊 Enterprise cloud infrastructure spending up 18% year on year",
      explanation: "Budgets shift from self-managed servers to rented services, raising recurring revenue across the infrastructure group.",
    },
    {
      headline: "🛡️ A large breach gets security budgets approved in a hurry",
      explanation: "After a major incident, security spending is one of the few lines approved quickly, because the risk has become a concrete number.",
    },
    {
      headline: "🌐 A core network fault disrupts many services for four hours",
      explanation: "A wide outage pushes large customers to demand multi-provider plans, slowing the pace of new contracts.",
    },
    {
      headline: "🛒 Peak-season e-commerce sales beat forecasts by 12%",
      explanation: "Higher order volumes lift both delivery volume and the number of payment API calls.",
    },
    {
      headline: "⚠️ With rates staying high, unprofitable tech companies get repriced",
      explanation: "Cash flows far in the future are discounted harder, so unprofitable growth names come under pressure first.",
    },
  ],
};
