import type { CaseStudyTranslation } from "./index";

/**
 * Bản dịch tiếng Anh của 3 case study, khoá theo `id`.
 *
 * Cả ba là tình huống kỹ thuật GIẢ ĐỊNH (không gắn với doanh nghiệp có thật),
 * nên `company` ghi rõ "hypothetical scenario" như bản tiếng Việt.
 *
 * `options` là mảng THEO VỊ TRÍ: phần tử i dịch đúng phần tử i của bản gốc, vì
 * `correct` đọc từ phía tiếng Việt. Con số giữ nguyên, chỉ đổi dấu thập phân
 * sang dấu chấm, cùng luật với lessons-i18n.
 */
export const caseStudiesEn: Record<string, CaseStudyTranslation> = {
  "flash-sale-scaling": {
    title: "Getting the System Ready for an 11.11 Flash Sale",
    company: "E-commerce marketplace (hypothetical scenario)",
    sector: "E-commerce & Infrastructure",
    description:
      "Traffic is expected to jump twentyfold during a two-hour sale. Find the bottleneck, take load off the database, stop overselling and keep the system standing when an outside service slows down.",
    relatedLessonTitles: ["Tail latency - why the average lies", "Deep-dive case: cache hit rate"],
    questions: [
      {
        prompt: "Traffic is expected to rise twentyfold during the two-hour flash sale. Which preparation step comes first?",
        options: [
          "Multiply the web servers by 20, since load also rises exactly 20 times",
          "Run a load test with simulated traffic to find the real bottleneck",
          "Re-optimise all the front-end code so pages load faster than before",
        ],
        explanation:
          "Systems do not scale linearly: usually one component (the database, one dependency) chokes first. A load test tells you which one, so money and effort go to the right place instead of multiplying everything evenly.",
      },
      {
        prompt: "The database chokes when thousands of people view the same product page. What is the most effective way to cut the load?",
        options: [
          "Cache the product page, since that data rarely changes",
          "Add an index on every column of the products table to speed up queries",
          "Upgrade the database server to the biggest machine money can buy",
        ],
        explanation:
          "A product page is read constantly but rarely changes, so a cache answers most requests without touching the database. Indexing every column slows writes while every read still reaches the database; a bigger machine has a ceiling and costs a lot.",
      },
      {
        prompt: "There are only 1,000 deeply discounted units in stock. How do you avoid selling more than you have?",
        options: [
          "Read the stock count, check it is positive, then write the new count in a separate step",
          "Check the stock in the browser before letting the user press the buy button",
          "Decrement stock with one atomic operation conditioned on quantity > 0",
        ],
        explanation:
          "Read-then-write in two steps is the textbook race condition: two requests both read 1 and both decrement. A single atomic statement such as UPDATE ... SET qty = qty - 1 WHERE qty > 0 lets the database guarantee it. A browser-side check is something the user can edit.",
      },
      {
        prompt: "The third-party payment service starts slowing down. What stops it from taking the whole system down?",
        options: [
          "Raise the timeout so every request can wait until a response arrives",
          "Put a short timeout and a circuit breaker around the payment call",
          "Retry immediately every time a payment call fails",
        ],
        explanation:
          "Waiting longer holds worker threads until they run out, and instant retries multiply the load on the very service that is struggling. A short timeout plus a circuit breaker isolates the failure: payment requests fail fast and the rest of the site keeps working.",
      },
      {
        prompt: "After the sale, p50 latency is steady at 120 ms but customers still complain it is slow. Which number should you look at?",
        options: [
          "p99 latency, because the tail is what the slowest group actually experiences",
          "Average latency, because it already counts every request in the sale",
          "CPU usage, because low CPU means the system is serving well",
        ],
        explanation:
          "p50 only describes the user in the middle. If 1% of requests take 5 seconds the average barely moves, yet thousands of customers still hit a hanging page. Low CPU does not rule out requests waiting on a lock or on another service.",
      },
    ],
  },
  "saas-zero-downtime-migration": {
    title: "Migrating a Database Without Downtime",
    company: "SaaS point-of-sale software (hypothetical scenario)",
    sector: "SaaS software & Data",
    description:
      "The product has to move 2 TB of data onto a new database cluster while customers keep using it. Change the schema safely, sync data that is still changing, verify the copy and keep a way back.",
    relatedLessonTitles: ["Deployment: replacing a running machine without anyone noticing", "Versioning: living with several generations of clients"],
    questions: [
      {
        prompt: "You need to rename the column `phone` to `phone_number` in a live table. Which approach is safe?",
        options: [
          "Rename the column in one migration and deploy the new code at the same time",
          "Take the service down for a few minutes at midnight, when usage is lowest",
          "Add the new column, write to both, switch reads, then drop the old one",
        ],
        explanation:
          "During a rollout the old and new code run side by side: rename at once and the old version reads a column that no longer exists. Expand-then-contract keeps both versions working at every moment, with no downtime needed.",
      },
      {
        prompt: "While you copy to the new cluster, the old data keeps changing. How do you keep the two in step?",
        options: [
          "Copy an initial snapshot, then replay the change stream (CDC) until it catches up",
          "Copy all the data twice and assume the second pass caught up with the first",
          "Copy once and switch straight away; the difference will sync itself later",
        ],
        explanation:
          "The snapshot gives a consistent starting point; change data capture replays every write that happens afterwards. A second full copy still misses whatever changes while it runs, and nothing syncs the difference on its own.",
      },
      {
        prompt: "How do you know the data on the new cluster matches before moving traffic over?",
        options: [
          "Compare row counts per table; equal counts mean the data matches",
          "Compare checksums per key range between the two clusters",
          "Run a few common queries and see whether the results look sensible",
        ],
        explanation:
          "Equal row counts can still hide truncated rows or wrong values. Checksums per key range compare the content, and when they differ they point to exactly the range to re-copy instead of starting over.",
      },
      {
        prompt: "Right after moving 100% of traffic to the new cluster, errors spike. What should the plan have included?",
        options: [
          "Fix the bug quickly on the new cluster, since going back means admitting failure",
          "Cut over 100% from the start to shorten the period of running both",
          "Shift traffic gradually and keep the old cluster in sync so you can roll back",
        ],
        explanation:
          "Shifting in steps (1%, 10%, 50%...) surfaces errors while they touch only a small share of users. Keeping the old cluster receiving reverse sync means rollback takes minutes - rushing a fix on a burning environment often causes a second failure.",
      },
    ],
  },
  "ride-hailing-peak-outage": {
    title: "Ride-Hailing App Outage at Rush Hour",
    company: "Ride-hailing app (hypothetical scenario)",
    sector: "Mobile apps & Operations",
    description:
      "6 p.m. on a Friday, failed bookings jump to 40%. Work from the first alert through restoring service and isolating the cause to the postmortem.",
    relatedLessonTitles: ["SLI, SLO and SLA - three things people mix up", "Feature flags: separating deploy from release"],
    questions: [
      {
        prompt: "Alerts show the error rate spiking right after the 5:45 p.m. release. What do you do first?",
        options: [
          "Read the logs to find the exact faulty line before touching the system",
          "Roll back the release to restore service, and find the cause afterwards",
          "Add servers, because rush hour is usually what causes errors",
        ],
        explanation:
          "When an incident lines up with a change that just shipped, rolling back is the fastest way to stop the damage: restore first, investigate second. Hunting for the faulty line can take hours while customers still cannot book.",
      },
      {
        prompt: "After the rollback, errors are still at 15%. Which sign points to an external dependency as the cause?",
        options: [
          "Errors cluster on requests that call the maps service; other flows are fine",
          "App server CPU is high, so the bug must be in our own code",
          "Errors began exactly at rush hour, so the cause can only be load",
        ],
        explanation:
          "Errors concentrated on exactly the requests that pass through one dependency is the strongest isolating signal. High CPU can itself be the result of constant retries against the maps service; coinciding with rush hour is correlation, not yet a cause.",
      },
      {
        prompt: "The slow maps service is making the booking flow hang. Which temporary mitigation is sensible?",
        options: [
          "Switch booking off entirely until the maps service is stable again",
          "Have the app retry continuously until the maps service answers",
          "Degrade gracefully: estimate fares by straight-line distance, skip the map",
        ],
        explanation:
          "Graceful degradation keeps the core function running at lower accuracy, and the fare can be corrected when the trip ends. Switching booking off turns a partial outage into a total one; continuous retries pile more load on a service that is already weak.",
      },
      {
        prompt: "When writing the postmortem, what makes it most valuable?",
        options: [
          "Pinpointing exactly which engineer shipped the bad release, to prevent a repeat",
          "Remediation actions that each have an owner and a due date",
          "A very detailed timeline; the longer it is, the more serious it looks",
        ],
        explanation:
          "A postmortem is only worth something if it changes the system: every action has an owner and a deadline. Hunting for someone to blame makes people hide information next time; a long timeline fixes nothing by itself.",
      },
    ],
  },
};
