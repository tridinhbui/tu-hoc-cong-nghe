import type { FlashcardAlbumTranslation } from "./index";

/**
 * Bản tiếng Anh của 5 album thẻ ghi nhớ.
 *
 * Luật cho `term`, và nó khác nhau theo từng dạng tên ở tệp gốc:
 *
 * - Tên đã kèm tiếng Anh trong ngoặc thì bản tiếng Anh CHÍNH LÀ phần trong
 *   ngoặc, bỏ ngoặc đi: "Biến (Variable)" -> "Variable". Dịch lại từ đầu sẽ ra
 *   một cách gọi khác với chính chữ người học vừa thấy ở bản tiếng Việt.
 * - Tên vốn đã là tiếng Anh ("Primary Key", "JSON", "Runbook") thì
 *   KHÔNG ghi lại ở đây. Ghi lại là tạo ra một `alsoKnownAs` rỗng nghĩa đi qua
 *   cả đường nhập thẻ.
 * - Tên thuần tiếng Việt ("Mã trạng thái 4xx") thì dịch bằng thuật ngữ
 *   chuẩn của ngành, không dịch từng chữ.
 *
 * Công thức trong `definition` đã là tiếng Anh ở tệp gốc và phải giữ NGUYÊN ký
 * tự: "Availability = MTBF / (MTBF + MTTR)" là thứ người học phải nhớ
 * đúng từng chữ.
 */
export const flashcardAlbumsEn: Record<string, FlashcardAlbumTranslation> = {
  "sre-reliability-terms": {
    title: "SRE & reliability - Terms & formulas",
    description: "The core English-Vietnamese term set for running systems in production (SLI, SLO, MTTR, error budget, postmortem...)",
    cards: [
      {
        definition:
          "A measured value for one aspect of a service - for example the share of successful requests, or p99 latency.",
      },
      {
        definition:
          "An internal target for an SLI over a time window, e.g. 99.9% of requests succeeding over 30 days.",
      },
      {
        definition:
          "A commitment to customers with consequences (credits, penalties) when missed - usually set looser than the SLO.",
      },
      {
        definition:
          "Error budget = 1 − SLO - the failure you are allowed to spend before releases stop in favour of stability work.",
      },
      {
        definition:
          "Availability = MTBF / (MTBF + MTTR) - the share of time the system can actually serve its users.",
      },
      {
        definition:
          "MTTR = Total recovery time / Number of incidents - how quickly the system is brought back after a failure.",
      },
      {
        definition:
          "A = A1 × A2 × ... × An - a chain of components in series is always less available than its weakest link.",
      },
      {
        definition:
          "The latency that 99% of requests beat - it exposes the tail that an average hides.",
      },
      {
        definition:
          "An incident write-up that focuses on systems and process rather than on blaming a person.",
      },
      {
        definition:
          "A step-by-step document for handling a known kind of incident or operational task.",
      },
    ],
  },

  "lap-trinh-co-ban": {
    title: "Programming basics",
    description: "The foundational terms for reading your first lines of code",
    cards: [
      {
        term: "Variable",
        definition:
          "A name bound to a value in memory, so the program can read and change it later.",
      },
      {
        term: "Function",
        definition:
          "A named block of code that takes inputs and returns a result - written once, called many times.",
      },
      {
        term: "Loop",
        definition:
          "A construct that repeats a block of statements until a stopping condition is met.",
      },
      {
        term: "Conditional",
        definition:
          "Branches the program on a true/false condition (if/else).",
      },
      {
        term: "Array",
        definition:
          "An ordered list of elements, accessed by an index that starts at 0.",
      },
      {
        term: "Object",
        definition:
          "A set of key-value pairs describing one thing, such as a user with a name and an email.",
      },
      {
        term: "Data type",
        definition:
          "The kind of value a variable holds - number, string, boolean... - which decides which operations are valid.",
      },
      {
        term: "Debugging",
        definition:
          "Finding and fixing the cause of a program behaving differently from what you expected.",
      },
      {
        term: "Library",
        definition:
          "Code someone else has written and packaged, so you can call it instead of writing it from scratch.",
      },
      {
        term: "Compiler",
        definition:
          "A program that translates source code into a form the machine can run, before it executes.",
      },
    ],
  },

  "web-va-api": {
    title: "Web & APIs",
    description: "The concepts everyone who builds for the web needs by heart",
    cards: [
      {
        definition:
          "The request-response protocol between a browser (or any client) and a web server.",
      },
      {
        definition:
          "An API design style built around resources with their own URLs and the GET, POST, PUT and DELETE methods.",
      },
      {
        definition:
          "The most common key-value text format for exchanging data between client and server.",
      },
      {
        term: "4xx status codes",
        definition:
          "A client-side error - a bad request, missing permission or a resource that does not exist (400, 401, 403, 404).",
      },
      {
        term: "5xx status codes",
        definition:
          "A server-side error - the request was valid but the server could not handle it (500, 502, 503).",
      },
      {
        definition:
          "A small piece of data the server hands the browser, sent back with every later request - usually holding the login session.",
      },
      {
        definition:
          "The browser mechanism that blocks requests to another origin unless the target server allows it with headers.",
      },
      {
        definition:
          "Calling an operation several times has the same effect as calling it once - the precondition for a safe retry.",
      },
      {
        definition:
          "Capping how many requests a client may send in a time window, to protect the server.",
      },
      {
        definition:
          "The other server calls your URL when an event happens, instead of you polling it over and over.",
      },
    ],
  },

  "co-so-du-lieu-hot": {
    title: "Databases & SQL",
    description: "The concepts data people use every day",
    cards: [
      {
        definition:
          "The column (or set of columns) that uniquely identifies each row in a table - never duplicated, never null.",
      },
      {
        definition:
          "A column pointing at another table's primary key, keeping the relationship between the two tables valid.",
      },
      {
        definition:
          "An auxiliary structure that finds rows without scanning the whole table - faster reads, paid for with slower writes.",
      },
      {
        definition:
          "Combines rows from two tables on a condition, usually a foreign key equal to a primary key.",
      },
      {
        definition:
          "A group of operations that is applied completely or not at all.",
      },
      {
        definition:
          "Atomicity, Consistency, Isolation, Durability - the four guarantees of a trustworthy transaction.",
      },
      {
        term: "Normalization",
        definition:
          "Splitting data across tables so each fact is stored in one place, avoiding updates that drift apart.",
      },
      {
        definition:
          "The performance bug of fetching a list and then running one extra query for each of its items.",
      },
    ],
  },

  "cong-cu-lap-trinh-vien": {
    title: "Developer tools",
    description: "The groundwork toolkit before you start on a real project",
    cards: [
      {
        term: "Repository",
        definition:
          "Where a project's source code lives, together with the history of every change to it.",
      },
      {
        term: "Branch",
        definition:
          "A separate line of development for working on a feature without touching the main code.",
      },
      {
        term: "Pull request",
        definition:
          "A proposal to merge changes from a branch into the main one, with a colleague review step.",
      },
      {
        term: "Continuous integration (CI)",
        definition:
          "Automatically building and running the tests every time a change is pushed to the repository.",
      },
      {
        definition:
          "Packages an application with all its dependencies so it runs the same on every machine.",
      },
      {
        term: "Environment variable",
        definition:
          "A configuration value kept outside the code - API keys, database URLs - so the same code runs in several environments.",
      },
    ],
  },
};
