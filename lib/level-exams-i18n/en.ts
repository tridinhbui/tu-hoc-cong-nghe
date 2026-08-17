// Bản dịch tiếng Anh của kỳ thi thăng cấp. Xem ./index.ts cho các quy tắc -
// đáng nhắc lại một điều: `options` là POSITIONAL, phần tử i ở đây phải dịch
// phần tử i của `lib/level-exams.ts`. Không có `correctIndex` trong file này.
import type { LevelExamTranslations } from "./index";

export const LEVEL_EXAMS_EN: LevelExamTranslations = {
  2: {
    title: "Entry Exam - Level 2: Technology Student",
    questions: {
      l2_q1: {
        question: "What does `pwd` do at the command line?",
        options: [
          "Prints the full path of the directory you are standing in",
          "Lists every file contained in the current directory",
          "Changes the password of the account you signed in with",
          "Moves you up into the parent of the current directory",
        ],
        explanation:
          "pwd is short for \"print working directory\": it answers only \"where am I\". Listing files is ls, changing directory is cd, and pwd touches no password despite what the three letters suggest.",
      },
      l2_q2: {
        question: "How does an absolute path differ from a relative one?",
        options: [
          "It starts at the root, so it holds wherever you happen to be",
          "It is shorter to type, which helps in day-to-day work",
          "It only works inside your own personal home directory",
          "It always begins with a dot to mark the current position",
        ],
        explanation:
          "An absolute path starts at / so it names exactly one place regardless of the current directory. The relative path is the shorter one that starts with . or .., and its meaning shifts with where you stand.",
      },
      l2_q3: {
        question: "Where does `cd ..` take you?",
        options: [
          "Up to the parent directory, one level back out",
          "Straight to the root directory of the whole disk",
          "To the home directory of the signed-in user",
          "Back to the directory you were in just before",
        ],
        explanation:
          "Two dots always mean the parent, exactly one level up. Root is cd /, home is cd ~, and the previous directory is cd - - three commands that get mixed up constantly.",
      },
      l2_q4: {
        question: "What does `rwx` on a file mean?",
        options: [
          "Read the contents, overwrite the contents, and run the file",
          "Read it, write it, and delete it out of the directory",
          "Read it, rewrite it, and rename it to something else",
          "Read it, write it, and grant that access to other people",
        ],
        explanation:
          "r is read, w is write, x is execute. Deleting and renaming are NOT governed by permissions on the file itself but by write permission on the DIRECTORY holding it - the most common confusion here, because both operations edit the directory listing rather than the file.",
      },
      l2_q5: {
        question: "What is the core job of an operating system?",
        options: [
          "Sharing the machine's resources among programs running at once",
          "Raising the processing speed of the processor inside the machine",
          "Translating a programmer's source code into a running program",
          "Storing user data so that it survives the machine shutting down",
        ],
        explanation:
          "The operating system sits between hardware and programs, handing out CPU, memory and devices to several programs at a time. It does not make the CPU faster, compiling is a compiler's job, and storing data is what the disk does.",
      },
      l2_q6: {
        question: "Why does RAM lose its contents at shutdown while a disk does not?",
        options: [
          "RAM needs a constant supply of power to hold what is in it",
          "RAM is small, so it has to be cleared out after every session",
          "The operating system wipes RAM deliberately to protect privacy",
          "RAM only holds a temporary copy; the original lives on the disk",
        ],
        explanation:
          "RAM is volatile memory: its circuits need power to keep their state, so cutting power loses the contents. This is a physical property rather than a policy the operating system chose, and it has nothing to do with capacity.",
      },
      l2_q7: {
        question: "How does `ls -a` differ from `ls`?",
        options: [
          "It also shows files whose names begin with a dot",
          "It also shows the size and modified date of each file",
          "It also shows files inside the subdirectories below",
          "It sorts files alphabetically rather than at random",
        ],
        explanation:
          "A leading dot is the convention for a hidden file, and -a (all) drops that convention. Size and date come from -l, descending into subdirectories is -R, and ls already sorts alphabetically.",
      },
      l2_q8: {
        question: "What is a variable for in a program?",
        options: [
          "Naming a value so you can reuse it in several places later",
          "Holding values that are certain to change while it runs",
          "Declaring up front how much memory the program will need",
          "Marking a block of code so the machine knows what runs first",
        ],
        explanation:
          "A variable is a name bound to a value, and the biggest benefit is that changing it in one place changes every use of that name. The word \"variable\" suggests the value must change, but plenty of variables are assigned once and left alone.",
      },
      l2_q9: {
        question: "Why does `\"5\" + \"3\"` produce `\"53\"` rather than `8` in many languages?",
        options: [
          "Because both are strings, and plus joins strings together",
          "Because plus only adds whole numbers, not other kinds of number",
          "Because the machine reads strings as codes and adds the codes",
          "Because a missing bracket made the addition happen out of order",
        ],
        explanation:
          "The quotation marks make 5 and 3 strings, and for strings + means concatenate. To get 8 you drop the quotes or convert to a number first. This is a type error, not an operator-precedence one.",
      },
      l2_q10: {
        question: "What problem does a loop solve?",
        options: [
          "Running the same block many times while writing it once",
          "Running several different blocks at once to save time",
          "Returning to the start of the program on error to run again",
          "Repeating an old result so it need not be computed again",
        ],
        explanation:
          "A loop lets you write once and run many times, usually walking through each element of a list. Doing several things at once is concurrency, and keeping an old result to reuse is caching.",
      },
      l2_q11: {
        question: "What does an `if` statement do?",
        options: [
          "Runs a block only when the tested expression comes out true",
          "Stops the program altogether when the tested expression is false",
          "Compares two values and returns whichever of the two is larger",
          "Prints an error to the screen when the input data is not valid",
        ],
        explanation:
          "if is a fork: true runs the inner branch, false skips it and carries on - it does not halt the program. Reporting an error or picking the larger value is something you write INSIDE that branch yourself.",
      },
      l2_q12: {
        question: "Why pull a repeated block of code out into its own function?",
        options: [
          "Fixing it in one place fixes it everywhere that calls it",
          "The program runs faster because the source gets much shorter",
          "The machine loads that block into memory exactly once only",
          "The compiler can skip duplicated sections while translating",
        ],
        explanation:
          "The point of a function is having a single place to change, so one bug is patched once instead of in five copies. Calling a function actually costs a little at run time - you trade that for code you can change safely.",
      },
      l2_q13: {
        question: "How does a syntax error differ from a logic error?",
        options: [
          "A syntax error stops the program from running in the first place",
          "A syntax error only shows up when the input data is unusual",
          "A syntax error lives in an outside library rather than your code",
          "A syntax error only slows the program without changing results",
        ],
        explanation:
          "A syntax error breaks the grammar of the language, so the machine refuses to run it - you find out immediately. A logic error runs perfectly and returns the wrong answer, which is exactly why it is far harder to find.",
      },
      l2_q14: {
        question: "What belongs in a comment in your source code?",
        options: [
          "Why the code is written this way, which the code cannot say",
          "Each step the code performs, restated in ordinary language",
          "The author's name and the date of the most recent change",
          "A list of the other functions that call into this block",
        ],
        explanation:
          "The code already states WHAT it does; what it cannot state is WHY - why this approach, what else was tried, how that failed. A comment restating each step goes stale the moment the code changes, and git already keeps names and dates.",
      },
      l2_q15: {
        question: "What does `mv old.txt new.txt` do?",
        options: [
          "Renames old.txt to new.txt inside the same directory",
          "Makes a copy called new.txt and keeps old.txt as it was",
          "Appends the contents of old.txt to the end of new.txt",
          "Moves old.txt into a directory that is named new.txt",
        ],
        explanation:
          "mv is both move and rename: when the target is a filename in the same directory, it is a rename, and the old name is gone. Use cp to keep the original, and >> to append contents.",
      },
      l2_q16: {
        question: "What does the `.txt` extension mean on Linux?",
        options: [
          "A convention letting people and software guess the contents",
          "A requirement; without it the system cannot open the file",
          "A rule deciding which programs are allowed to write to it",
          "A marker saying the file is text, so the system compresses it",
        ],
        explanation:
          "On Linux the extension is just part of the name - the system looks at the contents, not the suffix, to tell what a file is. Renaming .txt to .jpg breaks nothing; it only misleads readers and some applications.",
      },
      l2_q17: {
        question: "Why is the command line still used when a graphical interface exists?",
        options: [
          "Because what you type is recorded and can be replayed exactly",
          "Because it runs faster with nothing to draw on the screen",
          "Because a graphical interface cannot perform operations on files",
          "Because it is the only way to work with a machine over the network",
        ],
        explanation:
          "What the command line does that a mouse cannot is leave a record: a sequence of commands saved to a file replays exactly and can be handed to someone else. Remote machines can have graphical interfaces too - they just rarely do.",
      },
      l2_q18: {
        question: "What is a process?",
        options: [
          "A program that is running, along with its own memory",
          "A program file already installed on the machine's disk",
          "A task the operating system schedules to run at a set time",
          "A sub-thread of execution living inside a larger program",
        ],
        explanation:
          "A program sitting on disk is a file; loaded into memory and running, it becomes a process. Opening the same program twice gives two separate processes. A thread lives INSIDE a process.",
      },
      l2_q19: {
        question: "Why keep a backup somewhere other than the same disk?",
        options: [
          "Because a failed disk takes the original and the copy together",
          "Because sharing one disk noticeably slows the machine down",
          "Because the operating system forbids copying within one disk",
          "Because a copy on the same disk gets overwritten in time",
        ],
        explanation:
          "A backup exists to survive losing what you have, and a disk failure loses everything on that disk. A same-disk copy only rescues you from deleting a file by accident, not from hardware failure or a stolen machine.",
      },
      l2_q20: {
        question: "What does `|` between two commands do?",
        options: [
          "Feeds the output of the first command into the second one",
          "Runs both commands at once and merges what they produce",
          "Runs the second command only if the first one had no error",
          "Writes the first command's output to a file named after it",
        ],
        explanation:
          "A pipe connects one command's output to the next one's input, so ls | wc -l counts files. Running only on success is &&, and writing to a file is > - three symbols that get swapped for each other.",
      },
    },
  },
  3: {
    title: "Comprehension Exam - Level 3: Working Programmer",
    questions: {
      l3_q1: {
        question: "What does `git add` do before you commit?",
        options: [
          "Puts changes in a staging area so you pick what the commit holds",
          "Writes the change into the repository history at that moment",
          "Uploads the change to the shared repository for teammates to see",
          "Makes a backup copy of the file before you carry on editing",
        ],
        explanation:
          "git add moves changes into the staging area, where you choose exactly what goes into the next commit. Writing history is git commit and publishing is git push - keeping those three steps separate is the thing people confuse.",
      },
      l3_q2: {
        question: "What should a good commit contain?",
        options: [
          "One complete change you can explain in a single sentence",
          "Everything you did that day, gathered up to keep history short",
          "Exactly one file, so each file's history is easy to follow",
          "Only the code that already works, leaving the rest for later",
        ],
        explanation:
          "The unit of a commit is a coherent change, not a file or a day. Squashing a whole day removes the ability to revert one piece; splitting by file scatters a single change that touched three files across three commits.",
      },
      l3_q3: {
        question: "What is a branch in Git for?",
        options: [
          "Separating a line of work without disturbing the main branch",
          "Keeping a backup of the repository as it was when you made it",
          "Splitting the repository into parts each person is responsible for",
          "Marking a released version so it can be found again later",
        ],
        explanation:
          "A branch lets work sit half-finished while the main branch stays in a state that runs. It is not a backup - every branch shares one history - and marking a release is what a tag does.",
      },
      l3_q4: {
        question: "When does a merge conflict happen?",
        options: [
          "Two branches edit the same spot and Git cannot pick a side",
          "Two branches edit the same file, even in entirely separate places",
          "The branch you merge into has moved far ahead of your own branch",
          "You forgot to pull the latest version from the shared repository",
        ],
        explanation:
          "Git merges cleanly when each side touched a different region, even within one file. It only stops to ask when the edits OVERLAP - at that point no answer can be derived mechanically.",
      },
      l3_q5: {
        question: "What is `.gitignore` for?",
        options: [
          "Listing files Git should not track, such as build output",
          "Removing files from the repository that were committed earlier",
          "Hiding certain files from teammates browsing the shared repository",
          "Marking files read-only so nobody edits the contents by accident",
        ],
        explanation:
          "gitignore stops Git from tracking new files matching a pattern - usually build directories, node_modules, environment files. For a file ALREADY tracked it has no effect; you must untrack it with git rm --cached.",
      },
      l3_q6: {
        question: "How does `git pull` differ from `git fetch`?",
        options: [
          "pull downloads and merges into your branch; fetch only downloads",
          "pull takes every branch, while fetch takes the current one only",
          "pull needs a network connection, while fetch reads a saved copy",
          "pull overwrites local changes, while fetch leaves them untouched",
        ],
        explanation:
          "fetch updates your knowledge of the remote without touching the code you are working on; pull is fetch plus a merge. So fetch is always safe, and pull is the step that can raise a conflict.",
      },
      l3_q7: {
        question: "Why write small pull requests instead of bundling several jobs?",
        options: [
          "Reviewers read them properly, so genuine bugs actually get caught",
          "Automated test servers run faster when there are fewer files",
          "Git merges branches faster when the number of changed lines is small",
          "Repository history stays tidier because fewer commits are created",
        ],
        explanation:
          "The real limit is the reviewer: past a few hundred lines, review quality collapses and people start approving to be done. Small pull requests create MORE commits, not fewer, so tidy history is not the reason.",
      },
      l3_q8: {
        question: "How does returning a value differ from printing to the screen?",
        options: [
          "A returned value can be used further; printing is only for a reader",
          "A returned value is faster because nothing is drawn on the screen",
          "A returned value can be used once and is then dropped from memory",
          "A returned value is compulsory, while printing is entirely optional",
        ],
        explanation:
          "A function that returns gives the caller a result to carry on with; a function that only prints loses the result into the screen. This is why a calculating function should return rather than print - a very common beginner mistake.",
      },
      l3_q9: {
        question: "What is the scope of a variable declared inside a function?",
        options: [
          "It exists only inside that function and vanishes when it ends",
          "It exists until the program has finished running completely",
          "It is usable in any function called after the declaring one",
          "It exists only in the enclosing block rather than the whole function",
        ],
        explanation:
          "A local variable is born when the function runs and dies when it returns. That is a good thing: two functions using the same variable name do not tread on each other. Some languages narrow scope to each block, but the function boundary is the common case.",
      },
      l3_q10: {
        question: "Why is catching an error with `try/catch` better than letting it stop the program?",
        options: [
          "The program can handle the failure and tell the user something useful",
          "The error gets written to a log so developers can find it more easily",
          "The program skips the broken section and carries on as if nothing happened",
          "An error inside try does not slow down the rest of the program",
        ],
        explanation:
          "try/catch gives you a place to decide what failure means: retry, fall back to a default, or show a sentence the user understands. The danger is catching and then silently ignoring - the fault is still there, just invisible.",
      },
      l3_q11: {
        question: "What does a good unit test check?",
        options: [
          "One specific behaviour, so a failure points straight at the fault",
          "The whole path from input to output through the entire program",
          "That the function finishes without throwing an error along the way",
          "That as many lines of code as possible are exercised by the run",
        ],
        explanation:
          "The value of a unit test is narrowing the search: one test per behaviour means a red test names the broken thing. A test that only checks \"nothing was thrown\" stays green while the function returns the wrong answer.",
      },
      l3_q12: {
        question: "Why does 100% test coverage not prove the code is correct?",
        options: [
          "Running a line says nothing about whether you checked its result",
          "Coverage only counts lines inside functions that are exported outward",
          "Coverage tools routinely miss the branches of complex conditionals",
          "Code can still break through an outside library, which is not counted",
        ],
        explanation:
          "Coverage measures which lines RAN, not whether you asserted anything about them. A test that calls every function and asserts nothing still reports 100%. Read the number as a minimum floor, not as evidence.",
      },
      l3_q13: {
        question: "Why name a variable `orderCount` rather than `n`?",
        options: [
          "A later reader understands it without tracing back up the file",
          "The compiler optimises better when names carry clear meaning",
          "A longer name avoids clashing with other names in the same scope",
          "Naming conventions require it in most modern programming languages",
        ],
        explanation:
          "Code is read far more often than written, and the reader is usually you six months later. Variable names have no effect on speed - the compiler discards them. Short names are fine only where the scope is tiny, like i in a loop.",
      },
      l3_q14: {
        question: "When a program misbehaves, what is the sensible first step?",
        options: [
          "Reproduce the fault reliably before changing anything at all",
          "Reread the surrounding code looking for a mistake in the syntax",
          "Try changing a few suspect spots and rerun to see if it clears",
          "Wrap the suspect section in try/catch so it stops crashing",
        ],
        explanation:
          "Without a reliable reproduction you cannot tell whether you fixed it or merely hid it, and you have no way to confirm you are done. Guess-and-change and wrapping in try/catch both remove the fault from view rather than from the code.",
      },
      l3_q15: {
        question: "How does a list differ from a dictionary?",
        options: [
          "A list is looked up by position, a dictionary by a key you choose",
          "A list preserves order, whereas a dictionary does not keep any order",
          "A list holds one type only, while a dictionary holds several types",
          "A list is faster because its data sits contiguously in memory",
        ],
        explanation:
          "The essential difference is how you look things up: a numeric index versus a key you name. Dictionaries in most modern languages DO preserve insertion order, so that is no longer the distinguishing point older books claim.",
      },
      l3_q16: {
        question: "Why avoid copying a block of code into several places?",
        options: [
          "Fixing one bug means remembering every copy, and one gets missed",
          "The source file grows, which slows the program down at startup",
          "The compiler raises an error when it finds two identical blocks",
          "Each copy occupies extra memory for the whole time it runs",
        ],
        explanation:
          "The cost of a copy is paid when you CHANGE it, not when you run it: the bug gets patched in three places and missed in the fourth, so two different behaviours now coexist. File size is negligible next to that.",
      },
      l3_q17: {
        question: "What does `git log` tell you?",
        options: [
          "The history of commits so far, with who made them and when",
          "The list of files currently changed but not yet committed",
          "The diagnostic log Git writes when its commands fail",
          "A detailed comparison between your branch and the main one",
        ],
        explanation:
          "git log reads the recorded history. Files changed but uncommitted is git status, and comparisons are git diff. The word \"log\" makes people expect a tool error log, but Git keeps no such thing.",
      },
      l3_q18: {
        question: "Why should a file with a password or API key never be committed?",
        options: [
          "It stays in the repository history even after you delete it",
          "Git refuses to push when it spots a string resembling a secret",
          "Secret files make the repository heavier and slower to clone",
          "A key stops working the moment it is written into a plain file",
        ],
        explanation:
          "Deleting the file only adds another commit; the old commit remains and anyone with the repository can read it. A key that was ever committed must be treated as leaked and rotated, not merely deleted.",
      },
      l3_q19: {
        question: "A program works on your machine and fails on another. Why, usually?",
        options: [
          "The environment differs: versions, libraries or configuration",
          "The source code was corrupted while travelling across the network",
          "The other machine is weaker and lacks the resources to run it",
          "Each operating system translates the same code in a different way",
        ],
        explanation:
          "It is nearly always the environment: a different language version, a missing library, or an environment variable that only exists on your machine. This is precisely the problem dependency manifests and containers were invented to solve.",
      },
      l3_q20: {
        question: "Why run the tests before opening a pull request?",
        options: [
          "To catch faults while they are cheap, not at review or in production",
          "Because the shared repository rejects pull requests with no test run",
          "Because tests run considerably faster on your machine than on a server",
          "Because reviewers can then skip the parts the tests already cover",
        ],
        explanation:
          "A fault gets more expensive the further it travels: minutes on your machine, a whole release once users hit it. Reviewers still read tested code - tests say what the code does, not whether it should do that.",
      },
    },
  },
  4: {
    title: "Depth Exam - Level 4: Web Engineer",
    questions: {
      l4_q1: {
        question: "How does a semantic tag like `<nav>` beat a plain `<div>`?",
        options: [
          "Screen readers and search engines understand the block's role",
          "The browser paints it faster since it knows the layout in advance",
          "It carries built-in styling, so less CSS has to be written for it",
          "It prevents other tags from being nested inside it by mistake",
        ],
        explanation:
          "A semantic tag states the FUNCTION of a block, which div does not. Screen reader users jump straight to the navigation because of it. Paint speed is identical, and nav has almost no default styling.",
      },
      l4_q2: {
        question: "How does `id` differ from `class` in HTML?",
        options: [
          "An id must be unique on the page; a class can repeat freely",
          "An id is for JavaScript, while a class is only for CSS styling",
          "An id has lower priority than a class when both set a property",
          "An id can only go on block tags, while a class goes on any tag",
        ],
        explanation:
          "The real constraint is uniqueness: an id may appear only once per page. Both work for CSS and for JavaScript alike, and an id has HIGHER specificity than a class, not lower.",
      },
      l4_q3: {
        question: "In the CSS box model, how does `padding` differ from `margin`?",
        options: [
          "Padding sits inside the border; margin sits outside and pushes others",
          "Padding is measured in pixels, while margin is a percentage of width",
          "Padding applies only to block tags, while margin applies to any tag",
          "Padding takes the tag's background; margin takes the page background",
        ],
        explanation:
          "Padding is the cushion inside the border, so it carries the element's background colour; margin is empty space outside the border and is always transparent. That is why adding a background tints the padding but never the margin.",
      },
      l4_q4: {
        question: "What does `display: flex` on an element do?",
        options: [
          "Lets its children be laid out along an axis, sharing the space",
          "Makes the element resize itself to suit the viewer's screen size",
          "Lets children overflow outside without the excess being clipped",
          "Places the element into a grid with a preset number of rows and columns",
        ],
        explanation:
          "flex turns an element into a layout container FOR ITS CHILDREN, along one axis. The element itself does not resize with the screen - that is the job of relative units and media queries.",
      },
      l4_q5: {
        question: "What is the `alt` attribute on `<img>` for?",
        options: [
          "Describing the image for people who cannot see the image",
          "Showing a small caption below the image when the pointer hovers",
          "Naming a fallback file the browser loads if the main image fails",
          "Supplying keywords so search engines rank the page more highly",
        ],
        explanation:
          "alt is the text alternative for screen readers, and it also appears when the image fails to load. The hover caption is the title attribute - a different thing - and stuffing keywords into alt is an abuse of it, not its purpose.",
      },
      l4_q6: {
        question: "When two CSS rules set the same property, which one wins?",
        options: [
          "The more specific selector, and if equal, whichever is written later",
          "Whichever is declared later, no matter how specific the selectors are",
          "Whichever sits in the stylesheet loaded later in the document head",
          "Whichever is set directly on the tag, since inline style always wins",
        ],
        explanation:
          "Specificity is judged first; order only breaks ties. This is why adding a line at the end of your stylesheet sometimes changes nothing: an existing rule has a more specific selector. Inline style is strong but still loses to !important.",
      },
      l4_q7: {
        question: "What is the DOM?",
        options: [
          "The tree of page elements that JavaScript can read and change",
          "The original HTML file the server sent down to the browser",
          "The set of rules deciding which tags may nest inside which others",
          "The area the browser uses to store data belonging to each page",
        ],
        explanation:
          "The browser reads the HTML and builds a tree of objects in memory; that is the DOM, and JavaScript edits this tree rather than the original file. Which is why viewing page source does not show what JavaScript added.",
      },
      l4_q8: {
        question: "What does `addEventListener` on a button do?",
        options: [
          "Registers a function to run each time that event fires on the button",
          "Runs a function once immediately and remembers the result for later",
          "Checks whether the user has ever clicked that particular button",
          "Stops the button submitting a form until the fields are filled in",
        ],
        explanation:
          "It attaches a function to an event, and the function runs only when the event happens. The classic beginner slip is writing onClick={handle()} - the parentheses run the function AT ATTACH TIME, and what gets attached is its return value.",
      },
      l4_q9: {
        question: "What does `const` guarantee in JavaScript?",
        options: [
          "That the name will not be reassigned to a different value later",
          "That the value inside cannot be altered in any way whatsoever",
          "That the variable exists only within the block that declared it",
          "That the value is computed once at compile time, so it runs faster",
        ],
        explanation:
          "const locks REASSIGNMENT, not contents. An array declared const can still be pushed to and an object can still have properties changed - the most common misunderstanding about const. Block scope applies to let as well.",
      },
      l4_q10: {
        question: "What does HTTP status 404 mean?",
        options: [
          "The server received the request but has no such resource",
          "The server hit an internal fault while handling your request",
          "The browser could not reach the server to send the request at all",
          "You are not signed in, so you may not view that resource",
        ],
        explanation:
          "404 means the server answered - so the connection is fine - but the path points at nothing. An internal server fault is 500, not signed in is 401, and failing to connect produces no status code at all.",
      },
      l4_q11: {
        question: "What is JSON for?",
        options: [
          "Representing structured data as text so it can be sent around",
          "Declaring the types of variables inside a JavaScript program",
          "Compressing data to make it smaller before crossing the network",
          "Running JavaScript code that arrived inside a server's response",
        ],
        explanation:
          "JSON is a text format two parties use to exchange data, and every language reads it - not just JavaScript. It compresses nothing; JSON is usually longer than the equivalent binary format.",
      },
      l4_q12: {
        question: "What is a CSS media query for?",
        options: [
          "Applying a different set of rules when the display meets a condition",
          "Loading image and video files sized to suit the device in use",
          "Asking the browser which kind of device the user is on right now",
          "Delaying the page paint until the screen dimensions are known",
        ],
        explanation:
          "A media query is a condition on display characteristics, most often width. It does not detect a \"device type\" - a narrowed desktop browser window matches the same condition a phone does.",
      },
      l4_q13: {
        question: "Why should validation in the browser never be trusted?",
        options: [
          "Users can alter or bypass it, so the server has to check again",
          "JavaScript may be switched off, so the validation will not run",
          "Older browsers do not support all the modern validation rules",
          "Validating in the browser makes the page heavier and slower to load",
        ],
        explanation:
          "Anything running on the user's machine can be edited, and a request can be sent straight to the server without going through the page at all. Browser validation gives fast feedback; server validation is what actually protects you.",
      },
      l4_q14: {
        question: "How does `localStorage` differ from a cookie?",
        options: [
          "localStorage is not attached automatically to every server request",
          "localStorage is cleared when the tab closes, while a cookie persists",
          "localStorage stores only numbers, while a cookie stores any type",
          "localStorage is shared across different domains, unlike a cookie",
        ],
        explanation:
          "A cookie rides along with every request to the same domain, which suits a login session but adds weight to each request. localStorage stays in the browser, survives closing the tab, and holds strings only.",
      },
      l4_q15: {
        question: "Why prefer relative units over fixed pixels?",
        options: [
          "Text and layout scale with the font size the user has chosen",
          "The browser paints faster with no sizes left to recalculate",
          "Relative units make the stylesheet lighter when rules are numerous",
          "Pixels do not work on screens with a high pixel density",
        ],
        explanation:
          "Users change their default font size because they need to, and a fixed unit ignores that choice. Pixels work fine on high-density screens - the browser converts them - so that is not the reason.",
      },
      l4_q16: {
        question: "When a page loads slowly, what is worth measuring first?",
        options: [
          "Where the time goes: fetching files, waiting on the server, or painting",
          "The combined size of every file the page has to download",
          "The number of network requests the page issues on first load",
          "The time the server takes to handle the page's first request",
        ],
        explanation:
          "Those three causes need three completely different fixes, so guessing wrong means optimising the wrong thing. File size and request count are USEFUL numbers, but only after you know where the time actually goes.",
      },
      l4_q17: {
        question: "What does `git checkout -b feature-name` do?",
        options: [
          "Creates a new branch and switches you onto it in one step",
          "Switches to an existing branch that already carries that name",
          "Copies the current branch into an entirely new repository",
          "Renames the current branch to the new name you supplied",
        ],
        explanation:
          "The -b flag means \"create then switch\", collapsing two steps into one. Without it the command only switches to an existing branch and errors if the name is new. Renaming a branch is git branch -m.",
      },
      l4_q18: {
        question: "Where does `position: absolute` place an element?",
        options: [
          "Relative to the nearest ancestor whose position is not static",
          "Relative to the top-left corner of the browser window on screen",
          "Relative to where it would have sat before it was shifted",
          "Relative to its immediate parent, whatever that parent is set to",
        ],
        explanation:
          "absolute walks up looking for the nearest ancestor with a position other than static and uses that as its origin; failing that, the whole page. Anchoring to the window is fixed, and shifting from its own spot is relative.",
      },
      l4_q19: {
        question: "Why put CSS in a separate file rather than inline on the tag?",
        options: [
          "Several pages reuse it, and the browser caches that file",
          "Inline styles do not support all the modern CSS properties",
          "The browser paints faster with styling outside the HTML document",
          "Inline styles are ignored entirely by screen reading software",
        ],
        explanation:
          "A separate file is shared and cached, so the second page load does not fetch it again. Inline styles support every property - their problems are repetition on every tag and being very hard to override, given their high specificity.",
      },
      l4_q20: {
        question: "What does HTTPS add over HTTP?",
        options: [
          "Encryption in transit and proof the server is who it claims",
          "Compression, so pages arrive faster over a weak connection",
          "A scan of the page contents for malicious code before display",
          "A requirement that users sign in before the content is shown",
        ],
        explanation:
          "HTTPS wraps HTTP in encryption, and the certificate confirms you are talking to the server that owns that domain. It says nothing about the contents - a fraudulent site carries the same padlock.",
      },
    },
  },
  5: {
    title: "Advanced Exam - Level 5: JavaScript Developer",
    questions: {
      l5_q1: {
        question: "How does `===` differ from `==` in JavaScript?",
        options: [
          "`===` compares type too; `==` converts type first, then compares",
          "`===` compares character by character; `==` compares only lengths",
          "`===` is for objects, while `==` is for numbers and strings",
          "`===` runs faster because it skips the value-checking step",
        ],
        explanation:
          "`==` coerces before comparing, so `\"1\" == 1` is true while `\"1\" === 1` is false. That implicit coercion is what produces surprising results, so default to `===` and reach for `==` only when you actually want coercion.",
      },
      l5_q2: {
        question: "How does `map` differ from `forEach` on an array?",
        options: [
          "`map` returns a new array, while `forEach` returns nothing at all",
          "`map` edits the original array in place, while `forEach` leaves it",
          "`map` runs in parallel, while `forEach` walks elements in sequence",
          "`map` skips empty slots, while `forEach` visits every one of them",
        ],
        explanation:
          "`map` builds a new array of the same length from what you return; `forEach` just runs a function per element and yields `undefined`. Neither touches the original, and both run in sequence.",
      },
      l5_q3: {
        question: "What does `await` before an async call do?",
        options: [
          "Pauses the current function until a result arrives, without blocking all",
          "Locks the whole browser up until the call has finished returning",
          "Runs that call on a separate thread away from the main one",
          "Guarantees the call succeeds by retrying it whenever it fails",
        ],
        explanation:
          "`await` suspends only the containing function and hands control back; other work continues. It creates no thread and does not retry - a failed call makes `await` throw, so you still need `try/catch`.",
      },
      l5_q4: {
        question: "What does binary search require?",
        options: [
          "The data must already be sorted by the key you search on",
          "The data must sit contiguously in memory rather than scattered",
          "The element count must be a power of two so halving stays even",
          "The values must be numbers; it does not work with text strings",
        ],
        explanation:
          "It halves and discards the side that cannot hold the answer - reasoning that only holds on sorted data. On unsorted data the result is wrong, not slow. Strings work fine given an ordering.",
      },
      l5_q5: {
        question: "Why is a hash map lookup faster than scanning an array?",
        options: [
          "The key is hashed into a position, so you jump straight there",
          "A hash map always fits entirely inside the processor's cache",
          "A hash map keeps data sorted, so binary search applies directly",
          "A hash map compresses data, so fewer elements must be walked",
        ],
        explanation:
          "A hash function turns the key into an index, so cost barely depends on size. A hash map does NOT keep sorted order - that is what separates it from a search tree, and why range queries are not possible.",
      },
      l5_q6: {
        question: "How does a stack differ from a queue?",
        options: [
          "A stack removes the last item added; a queue removes the first",
          "A stack has a fixed size, while a queue can grow as required",
          "A stack holds numbers only, while a queue holds any data type",
          "A stack lives in memory, while a queue is written down to disk",
        ],
        explanation:
          "The only difference is removal order: last in first out versus first in first out. Neither constrains the data type or where the structure is stored.",
      },
      l5_q7: {
        question: "Two nested loops each running n times give what complexity?",
        options: [
          "O(n squared), since the step count grows with the square of n",
          "O(2n), since exactly two loops run over the very same data",
          "O(n), since each element is still touched exactly once",
          "O(log n), since each loop halves the data it works through",
        ],
        explanation:
          "The outer runs n times and the inner runs n times per outer pass, so n by n steps. Two loops SIDE BY SIDE would be n plus n, that is O(n); nesting multiplies rather than adds - the commonest slip here.",
      },
      l5_q8: {
        question: "What must every recursive function have?",
        options: [
          "A stopping condition, so it does not call itself forever",
          "A counter of calls made, to cap how deep it is allowed to go",
          "A return value at every call, including the intermediate ones",
          "An array parameter, since recursion only suits sequence data",
        ],
        explanation:
          "Without a base case the function calls itself until the stack overflows. A counter is one way to implement a base case rather than a requirement, and recursion works with any data type.",
      },
      l5_q9: {
        question: "You write `const b = a` then modify `b`. What happens to `a`?",
        options: [
          "It changes too, because both names point at the same array",
          "It stays as it was, because assignment always makes a fresh copy",
          "It stays as it was, because `const` forbids editing the contents",
          "An error is raised on modification, because `b` was declared const",
        ],
        explanation:
          "Assignment copies the REFERENCE, so both names point at one array. For a real copy use `[...a]` or `slice()`. `const` only forbids rebinding the name, never editing what it points to.",
      },
      l5_q10: {
        question: "What is a closure in JavaScript?",
        options: [
          "A function that remembers the variables where it was defined",
          "A function that calls itself immediately after being declared",
          "A function passed into another function to be called back later",
          "A function that runs exactly once and is then freed from memory",
        ],
        explanation:
          "A closure is a function retaining access to the scope it was born in, even after the enclosing function has returned. A function passed to another is a callback, and one that runs on declaration is an IIFE - three separate ideas.",
      },
      l5_q11: {
        question: "What does event bubbling in the DOM mean?",
        options: [
          "The event runs from the touched element outward up to its parents",
          "The event runs from the outermost element inward to the touched one",
          "Events are queued up and then handled together in a single pass",
          "The event repeats several times if the user clicks too quickly",
        ],
        explanation:
          "Bubbling travels inside out, so one listener on a parent catches clicks on all its children - the event delegation technique. The opposite direction, outside in, is called capture.",
      },
      l5_q12: {
        question: "How does `null` differ from `undefined` in JavaScript?",
        options: [
          "`null` is emptiness you assigned; `undefined` means nothing was set",
          "`null` is for objects, while `undefined` is for numbers and strings",
          "`null` signals an error, while `undefined` is a valid variable state",
          "`null` occupies memory, while `undefined` occupies none at all",
        ],
        explanation:
          "`undefined` is the default for an unassigned variable or a missing property; `null` is a developer saying \"deliberately empty here\". Keeping them apart lets a reader tell an oversight from an intention.",
      },
      l5_q13: {
        question: "What does debouncing a keystroke handler achieve?",
        options: [
          "It runs only after the user has stopped typing for a set interval",
          "It caps the function at a maximum of one run per fixed interval",
          "It gathers several keystrokes into a batch handled in one go",
          "It ignores keys that do not change the contents of the input",
        ],
        explanation:
          "Debounce pushes the run to the end of a burst: type continuously and nothing fires; stop and it fires once. Capping to one run per interval is throttling - two techniques whose names get swapped.",
      },
      l5_q14: {
        question: "Why store the result of `document.querySelector` in a variable?",
        options: [
          "Each call walks the DOM tree again, which is wasted work",
          "The returned result can be used only once before being released",
          "Calling repeatedly creates several copies of the same element",
          "The browser limits how many times a page may query the DOM",
        ],
        explanation:
          "Every call searches from scratch, and inside a loop that cost multiplies. The returned value is a reference to the live element and can be reused as often as you like.",
      },
      l5_q15: {
        question: "What happens when `JSON.parse` receives invalid input?",
        options: [
          "It throws, so wrap it in `try/catch` when the data is not certain",
          "It returns `null` so the caller can check and handle it onward",
          "It returns the part it could read and drops the broken remainder",
          "It returns the original string because nothing could be parsed",
        ],
        explanation:
          "It throws a `SyntaxError` rather than returning anything. That is why every call on data from the network or from `localStorage` should be wrapped - data outside your control can always be malformed.",
      },
      l5_q16: {
        question: "Why is the language's built-in sort usually better than your own?",
        options: [
          "It is optimised and tested across every kind of input imaginable",
          "It runs directly on the hardware, so it beats any hand-written code",
          "It always preserves the original order of elements that compare equal",
          "It uses no extra memory because it sorts in place on the original",
        ],
        explanation:
          "The standard library has survived millions of uses and every edge case. Stability and sorting in place vary by language - not universal guarantees, so do not rely on them without reading the documentation.",
      },
      l5_q17: {
        question: "How does `arr.push(x)` differ from `arr = [...arr, x]`?",
        options: [
          "`push` mutates the original; the other builds an entirely new array",
          "`push` adds only one element, while the other can add several",
          "`push` is slower because memory has to be reallocated each time",
          "`push` returns nothing, so it cannot be used inside an expression",
        ],
        explanation:
          "`push` changes in place, while spreading creates a fresh array - a crucial difference when something else holds a reference to the old one. `push` accepts several arguments and returns the new length.",
      },
      l5_q18: {
        question: "Why avoid editing the DOM inside a long loop?",
        options: [
          "Each edit can force the browser to recompute the whole page layout",
          "The browser caps how many elements may be added in one pass",
          "The changes overwrite each other so only the last one takes effect",
          "The loop runs before the DOM tree has finished being built",
        ],
        explanation:
          "Interleaving reads and writes forces repeated layout recalculation, known as layout thrashing. Build in memory and insert once, or group all reads apart from all writes.",
      },
      l5_q19: {
        question: "How does an array differ from a linked list?",
        options: [
          "An array indexes instantly; a list must walk node by node",
          "An array holds one type only, while a list holds several types",
          "An array lives in memory, while a linked list lives on disk",
          "An array has a fixed size, while a linked list has no limit",
        ],
        explanation:
          "An array is contiguous, so the address of element i is computed directly; a linked list follows pointers. In exchange, inserting into the middle of a list is cheap because nothing has to shift.",
      },
      l5_q20: {
        question: "Why avoid global variables in a large program?",
        options: [
          "Any code at all can write to them, so faults are hard to trace",
          "Global variables occupy memory for the entire run of the program",
          "Reading a global variable is markedly slower than reading a local",
          "Modern languages no longer permit declaring globals at all",
        ],
        explanation:
          "The problem is blast radius: a wrong value with a thousand lines able to write it cannot be narrowed down. Memory and access cost are negligible next to that.",
      },
    },
  },
  6: {
    title: "Advanced Exam - Level 6: API Integration Engineer",
    questions: {
      l6_q1: {
        question: "What distinguishes `GET` from `POST` in meaning?",
        options: [
          "`GET` only reads and can repeat; `POST` changes state on the server",
          "`GET` sends less data, while `POST` can carry large file uploads",
          "`GET` is faster because the request body needs no encoding",
          "`GET` requires no sign-in, whereas `POST` always needs authentication",
        ],
        explanation:
          "The core difference is semantics: `GET` is safe and repeating it changes nothing, so browsers and proxies may cache or replay it freely. Size limits are a technical consequence, not the distinction.",
      },
      l6_q2: {
        question: "What does an idempotent endpoint mean?",
        options: [
          "Calling it repeatedly with the same input leaves the same state",
          "Calling it repeatedly makes the server reject the later attempts",
          "Calling it always returns exactly the same content every time",
          "Calling it from several clients at once produces no conflicts",
        ],
        explanation:
          "Idempotency describes the STATE afterwards, not the response body. It is the property that makes retrying safe - if the network drops mid-call, calling again creates no second record.",
      },
      l6_q3: {
        question: "How does 401 differ from 403?",
        options: [
          "401 means you are unidentified; 403 means known but not permitted",
          "401 means a wrong password, while 403 means the account is locked",
          "401 is caused by the client, while 403 comes from server misconfiguration",
          "401 means the session expired, while 403 means you never signed in",
        ],
        explanation:
          "401 says \"tell me who you are\" - signing in may fix it. 403 says \"I know who you are, and you may not\" - signing in again achieves nothing; you need a permission granted.",
      },
      l6_q4: {
        question: "How do 4xx and 5xx codes differ?",
        options: [
          "4xx means the request was faulty; 5xx means the server broke",
          "4xx is a temporary fault, while 5xx is permanent and unfixable",
          "4xx comes from a flaky network, while 5xx comes from wrong logic",
          "4xx should be retried at once, while 5xx should be shown to users",
        ],
        explanation:
          "4xx points at the caller: missing parameter, wrong permission, wrong path - resending the same request fails again. 5xx points at the server, and that is the class worth retrying because it may be transient.",
      },
      l6_q5: {
        question: "What does status 429 signal?",
        options: [
          "You have called too many times within the permitted window",
          "Your request carries data larger than the server's size limit",
          "The server is overloaded and temporarily refusing new requests",
          "Your account has exhausted the quota on its paid plan",
        ],
        explanation:
          "429 is a rate limit applied to you specifically, usually with a `Retry-After` header saying when to return. An overloaded server is 503 and an oversized body is 413 - three situations needing three responses.",
      },
      l6_q6: {
        question: "Why send an API key in a header rather than a URL parameter?",
        options: [
          "URLs get written into server logs and browser history",
          "Headers are encrypted, whereas the URL travels in the clear",
          "URL parameters have a length cap, so a long key gets truncated",
          "Servers read headers faster and so respond a little sooner",
        ],
        explanation:
          "Under HTTPS both the URL and the headers are encrypted in transit - the difference is that URLs are RECORDED: server logs, browser history, the `Referer` header sent to other sites. The key leaks in those places.",
      },
      l6_q7: {
        question: "Why should retries back off rather than fire immediately?",
        options: [
          "Hammering a struggling service makes recovery even harder for it",
          "The server bans your IP address after too many rapid requests",
          "Backing off keeps requests in the order they were originally sent",
          "A longer wait makes the next attempt more likely to succeed",
        ],
        explanation:
          "A slow service being retried instantly by thousands of clients sees its load rise - the mechanism that turns a small wobble into an outage. Back off and add random jitter so clients do not synchronise.",
      },
      l6_q8: {
        question: "Why should every outbound call carry a timeout?",
        options: [
          "Without one the call hangs forever, holding your own resources",
          "Without one the other server treats the request as malformed",
          "Without one the networking library picks a very short default",
          "Without one the call is never written into the system logs",
        ],
        explanation:
          "A hanging call holds a connection and a worker of YOURS; enough of them and there is no room to accept anything new. Many libraries default to NO timeout, so this is something you must set by hand.",
      },
      l6_q9: {
        question: "What is CORS blocking a browser request for?",
        options: [
          "Stopping this site reading data from a different domain unbidden",
          "Stopping the server accepting requests from unfamiliar addresses",
          "Stopping sensitive data being sent before it has been encrypted",
          "Stopping users calling the API directly without the interface",
        ],
        explanation:
          "CORS is a BROWSER rule protecting the user: a malicious page cannot read data from a site you are signed into. It does not protect the server - `curl` or another server calls straight through.",
      },
      l6_q10: {
        question: "What problem does pagination on a list endpoint solve?",
        options: [
          "It stops responses growing so large they slow down both ends",
          "It allows results to be sorted by several different criteria",
          "It guarantees each record is returned exactly once and no more",
          "It reduces how many times the client must call the server",
        ],
        explanation:
          "Pagination keeps each response a predictable size. It INCREASES the number of calls rather than reducing them - many small calls traded against never having to swallow a million records at once.",
      },
      l6_q11: {
        question: "How does a webhook differ from repeated polling?",
        options: [
          "The other side calls you when there is news, sparing empty checks",
          "A webhook uses its own protocol, so it beats ordinary HTTP for speed",
          "A webhook cannot lose events, whereas polling may miss some",
          "A webhook needs no authentication since the sender is known ahead",
        ],
        explanation:
          "Polling asks repeatedly and mostly hears nothing new; a webhook reverses direction so traffic only exists when there is work. But a webhook is still HTTP and can be lost if you are down - so you need a catch-up path too.",
      },
      l6_q12: {
        question: "What should an API error response contain?",
        options: [
          "A machine-readable code plus a sentence a person can understand",
          "The full stack trace so the caller knows precisely which line broke",
          "Only the HTTP status code, with an empty body to keep it light",
          "An English description, since error codes are a server-side matter",
        ],
        explanation:
          "The caller needs a stable code to branch on and a sentence to show a user. Stack traces must never leave the building - they expose internal structure and are a gift to an attacker.",
      },
      l6_q13: {
        question: "What is the `ETag` header for?",
        options: [
          "Letting a client ask again and get 304 if nothing has changed",
          "Marking which version of the API the server is currently running",
          "Signing the response body so the client can detect tampering",
          "Declaring the data type carried in the body of the response",
        ],
        explanation:
          "An ETag is a fingerprint of the content. Next time the client sends `If-None-Match`, and if nothing changed the server answers 304 with an empty body - saving bandwidth while still guaranteeing freshness.",
      },
      l6_q14: {
        question: "Why should an access token have a short lifetime?",
        options: [
          "A leaked token then does damage for only a short window of time",
          "A short-lived token is smaller in size, so it is lighter to send",
          "The server saves memory by not having to store tokens for long",
          "Users must sign in again, so their profile details stay current",
        ],
        explanation:
          "There is no way to withdraw an issued token instantly unless it expires. Short lifetimes plus a refresh token bound the damage window without forcing constant re-authentication.",
      },
      l6_q15: {
        question: "Why attach an identifier to every request?",
        options: [
          "It lets you follow one request across several services end to end",
          "It stops the same request being processed twice in a row",
          "It lets the server order requests exactly as they were received",
          "It lets the server recognise requests from the same user",
        ],
        explanation:
          "When a request crosses five services, a shared identifier is the only thing stitching scattered log lines into one story. Preventing double processing needs an idempotency key - a different mechanism.",
      },
      l6_q16: {
        question: "Why version an API as v1, v2 and so on?",
        options: [
          "To make breaking changes without breaking existing callers",
          "To let several servers run with different configurations at once",
          "To signal how stable each part is so callers know what to trust",
          "To let the server pick a data format suited to each caller",
        ],
        explanation:
          "You do not control when callers update, so changing the contract in place breaks their applications. Versioning lets two contracts coexist while everyone migrates.",
      },
      l6_q17: {
        question: "What does `Content-Type: application/json` declare?",
        options: [
          "That the body of this message is written in the JSON format",
          "That the server accepts only JSON in requests sent to it",
          "That the data was validated before it was sent on its way",
          "That the response will be compressed before crossing the network",
        ],
        explanation:
          "It only declares the body's format so the receiver knows how to read it. To say what you WANT BACK you use the `Accept` header - two headers that get confused. It is no guarantee the data is valid.",
      },
      l6_q18: {
        question: "How should partial failure across several services be handled?",
        options: [
          "Decide which parts are essential and which can be missing for now",
          "Return an error to the user whenever any single service fails",
          "Always retry every call until every part has finally succeeded",
          "Call them in sequence so a failure stops the later ones running",
        ],
        explanation:
          "A product page without recommendations still works; without a price it does not. Treating every call as essential lets one minor service take down the page, and retrying forever turns slow into stuck.",
      },
      l6_q19: {
        question: "Why should data sent by a client never be trusted?",
        options: [
          "Anyone can send whatever request they like straight to the server",
          "Data may be corrupted while travelling across the network",
          "Older browsers encode data in ways the server cannot read",
          "The client cannot know the business rules the system enforces",
        ],
        explanation:
          "The web interface is only one way to call the API; `curl` calls it directly and is bound by none of the interface's rules. So every security-relevant check must live on the server, even when the interface already checks.",
      },
      l6_q20: {
        question: "Why move secrets into environment variables?",
        options: [
          "Code can be shared without the secrets travelling along with it",
          "Environment variables are encrypted by the operating system",
          "A secret held there expires automatically after each session",
          "Programs read environment variables faster than they read files",
        ],
        explanation:
          "Separating secrets from code lets one codebase run in several environments with different keys, and code pushed to a shared repository carries no secrets. Environment variables are NOT encrypted - anyone who can read the process can read them.",
      },
    },
  },
  7: {
    title: "Advanced Exam - Level 7: Data & Operations Engineer",
    questions: {
      l7_q1: {
        question: "What does a primary key guarantee about a table?",
        options: [
          "Each row carries a distinct value that is never repeated or empty",
          "Rows are always stored in ascending order of that key's value",
          "The column is indexed, so every query against the table is faster",
          "Nobody can delete a row while another table still references it",
        ],
        explanation:
          "A primary key is an identity promise: unique and never null. It usually brings an index along, but that only helps queries FILTERING ON THAT KEY. Blocking deletes with references is a foreign key's job.",
      },
      l7_q2: {
        question: "What does an index trade away?",
        options: [
          "Faster reads, at the cost of slower writes and extra storage",
          "Faster reads, at the cost of results that may be slightly stale",
          "Faster writes, at the cost of periodically re-sorting the table",
          "Faster reads, but only ever on tables with very few rows",
        ],
        explanation:
          "Every insert, update and delete must maintain the index too, so writes slow down. That is why indexing every column backfires - index only the columns that genuinely appear in filters and sorts.",
      },
      l7_q3: {
        question: "Why avoid `SELECT *` in production code?",
        options: [
          "It fetches unused columns and breaks when a column is added",
          "It forces the database to scan the whole table instead of an index",
          "The query cannot reuse results that were cached earlier on",
          "The server rejects the query if the table has too many columns",
        ],
        explanation:
          "`SELECT *` moves more data than needed and ties your code to the table's current shape - adding one large column silently makes the query heavier. Whether the table is scanned is decided by the `WHERE` clause, not the column list.",
      },
      l7_q4: {
        question: "What is the N+1 query problem?",
        options: [
          "Fetching a list then looping one more query for each row",
          "A query returning more rows than the caller was expecting",
          "A nested query making the database execute two passes",
          "An index with one extra column so the query cannot use it",
        ],
        explanation:
          "One query fetches 100 orders, then a loop issues 100 more to get each customer name - 101 round trips instead of one. It hides with three rows of test data and shows up loudly in production.",
      },
      l7_q5: {
        question: "What does a database transaction guarantee?",
        options: [
          "Several operations all take effect, or none of them do",
          "Operations run in exactly the order in which you wrote them",
          "Nobody can read the data while the operations are under way",
          "Operations are written to disk rather than held in memory",
        ],
        explanation:
          "Atomicity: debiting account A and crediting B must live or die together. Blocking other readers is the isolation level - a separate, tunable property, not something a transaction implicitly promises.",
      },
      l7_q6: {
        question: "Why is building a query by concatenating user input dangerous?",
        options: [
          "Users can inject SQL syntax and change what the query means",
          "An over-long string makes the database reject the query outright",
          "An apostrophe in a surname causes the query to fail on syntax",
          "Concatenation is much slower than passing parameters in",
        ],
        explanation:
          "This is SQL injection: data gets read as code. A parameterised query sends the statement and the data separately, so data is never interpreted as syntax - and it handles the apostrophe problem as a side effect.",
      },
      l7_q7: {
        question: "What is a foreign key for?",
        options: [
          "Constraining a column's value to exist in the referenced table",
          "Indexing that column so joins against it run more quickly",
          "Copying data across from the other table to avoid joining",
          "Marking which columns are permitted to appear in a join clause",
        ],
        explanation:
          "A foreign key is the database promising no child row points at a parent that does not exist. Joins work perfectly well without one - it is an integrity constraint, not a syntax requirement.",
      },
      l7_q8: {
        question: "How does `WHERE` differ from `HAVING`?",
        options: [
          "`WHERE` filters rows before grouping; `HAVING` filters after",
          "`WHERE` is for numeric columns, while `HAVING` is for text ones",
          "`WHERE` runs on the base table; `HAVING` runs on a new temp table",
          "`WHERE` takes one condition, while `HAVING` combines several",
        ],
        explanation:
          "The order is filter rows, group, then filter groups. So a condition on an aggregate like `COUNT(*) > 5` must sit in `HAVING` - when `WHERE` runs there are no groups yet to count.",
      },
      l7_q9: {
        question: "What is a backup that has never been restored?",
        options: [
          "Not yet a backup, since nobody knows whether it can be used",
          "Still safe, provided the backup file is the expected size",
          "Only risky if the database version changed since it was taken",
          "Still usable, though restoring it will take a long time",
        ],
        explanation:
          "Backups fail quietly in many ways: a missing table, a wrong character encoding, a corrupt archive, or a file that runs and writes nothing. Restoring is the only way to know - and finding out when you need it is too late.",
      },
      l7_q10: {
        question: "What are database migrations for?",
        options: [
          "Turning schema changes into code that replays in every environment",
          "Moving data from an old server to a new one during an upgrade",
          "Backing up the schema before anybody alters the table structure",
          "Synchronising data between the test and production environments",
        ],
        explanation:
          "Migrations put the schema in the repository alongside the application, so test and production certainly share a structure. Editing by hand on a server is the fastest way to let two environments drift apart unnoticed.",
      },
      l7_q11: {
        question: "What does a DNS A record point a domain at?",
        options: [
          "A specific IP address of the machine serving that domain",
          "Another domain name, so both names lead to the same place",
          "The mail server that receives email for that domain",
          "The list of name servers authoritative for that domain",
        ],
        explanation:
          "An A record maps a name to an IP address. Pointing at another name is CNAME, mail is MX, and name servers are NS - four record types that get used in each other's place.",
      },
      l7_q12: {
        question: "Why is SSH key authentication safer than a password?",
        options: [
          "The private key never leaves your machine, so nothing is sent to leak",
          "A key is longer than a password, so cracking it takes more time",
          "A key rotates after each sign-in, so it cannot be reused later",
          "A key only works from the IP address registered in advance",
        ],
        explanation:
          "The server holds the public key and sends a challenge; your machine signs it without transmitting the key. So there is no secret to intercept, and nothing to guess one attempt at a time.",
      },
      l7_q13: {
        question: "What should a firewall's default be?",
        options: [
          "Deny everything, then open only the ports genuinely required",
          "Allow everything, then close the ports known to be risky",
          "Deny ports below 1024 and allow everything above them",
          "Allow by IP address rather than by individual port number",
        ],
        explanation:
          "Deny by default means a new service opening a port by accident still cannot reach the internet. Allow by default requires you to know every dangerous thing in advance - a list that is never complete.",
      },
      l7_q14: {
        question: "Why should a staging environment resemble production?",
        options: [
          "Faults caused by environment differences surface before users hit them",
          "Users can try new features there before they are released widely",
          "It relieves production because part of the traffic goes there instead",
          "It allows a fast rollback by redirecting traffic to the other one",
        ],
        explanation:
          "Most release incidents come from the two environments differing: library versions, configuration values, real data versus sample data. The closer they are, the more faults get caught where they are cheap.",
      },
      l7_q15: {
        question: "Why should every release have a way back?",
        options: [
          "Restore the service first and investigate once it is stable again",
          "A new version always needs a trial period before it can be trusted",
          "Rolling back costs less than running a full test suite beforehand",
          "Users should be able to keep using the older version if they prefer",
        ],
        explanation:
          "While a service is broken, the priority is making it work rather than understanding why. Fixing in haste under pressure tends to create a second fault; rolling back returns the system to a state known to be good.",
      },
      l7_q16: {
        question: "What is database normalisation for?",
        options: [
          "Each fact lives in exactly one place, so one edit is enough",
          "Reducing storage by compressing the duplicated tables together",
          "Speeding queries up because far fewer tables must be read",
          "Ensuring each column carries a data type suited to its contents",
        ],
        explanation:
          "Normalisation removes duplication so a customer's address cannot be updated in one table while another keeps the old value. In exchange it SLOWS reads by requiring joins - which is exactly why people sometimes denormalise on purpose.",
      },
      l7_q17: {
        question: "How does `LEFT JOIN` differ from `INNER JOIN`?",
        options: [
          "`LEFT JOIN` keeps every left row even when nothing matches",
          "`LEFT JOIN` is faster because only one table has to be scanned",
          "`LEFT JOIN` permits joining on a column that carries no index",
          "`LEFT JOIN` returns fewer rows because duplicates are removed",
        ],
        explanation:
          "`LEFT JOIN` keeps the whole left table and fills the missing side with `NULL`; `INNER JOIN` keeps only rows matching on both sides. So `LEFT JOIN` returns at least as many rows, never fewer.",
      },
      l7_q18: {
        question: "Why does an HTTPS server need a certificate?",
        options: [
          "To prove the server really owns the domain the user typed",
          "To supply the encryption algorithm the two sides will use",
          "To hold the private key for the browser to download and use",
          "To record encrypted sessions so they can be audited later",
        ],
        explanation:
          "Encryption without knowing who you are talking to is meaningless - a man in the middle encrypts too. The certificate, signed by a trusted third party, binds the domain to the server. The private key never leaves the server.",
      },
      l7_q19: {
        question: "Why not sign in to a server as the administrator day to day?",
        options: [
          "A mistyped command then does far more damage than it needs to",
          "The administrator account signs in more slowly due to extra checks",
          "The system only writes logs for ordinary accounts, not administrators",
          "The administrator account locks automatically if used too frequently",
        ],
        explanation:
          "Least privilege bounds the damage from both slips and stolen accounts. Elevating temporarily also forces a pause before a dangerous command - and that pause is the point.",
      },
      l7_q20: {
        question: "What should system logs avoid recording?",
        options: [
          "Passwords, keys and users' personal data",
          "The identifier of the request being processed at the time",
          "How long the slow steps in a flow took to complete",
          "The function and file where the log line was written",
        ],
        explanation:
          "Logs are usually centralised, retained for a long time and read by many people - so a secret landing there spreads furthest. The other three are exactly what makes a log useful during an investigation.",
      },
    },
  },
  8: {
    title: "Master Exam - Level 8: Cloud Infrastructure Engineer",
    questions: {
      l8_q1: {
        question: "What is cloud computing really?",
        options: [
          "Renting someone else's machines and services, paying for what you use",
          "A network splitting work across thousands of machines at once",
          "A distributed storage technology that makes data loss impossible",
          "Software running in a browser rather than installed on a machine",
        ],
        explanation:
          "Strip the marketing away and the cloud is somebody else's servers, in their data centre, billed by the hour. Understanding it that way explains why it still fails, still has latency and still costs money.",
      },
      l8_q2: {
        question: "Why do cloud bills spike unexpectedly?",
        options: [
          "Resources switched on and forgotten, plus charges for outbound data",
          "The provider revises its server rental prices from month to month",
          "Servers upgrade themselves automatically when they detect high load",
          "Storage charges climb the longer data sits on the system",
        ],
        explanation:
          "The two biggest leaks are both invisible: a test machine left running for six months, and the fee for moving data OUT of the provider - very cheap coming in and surprisingly expensive going out.",
      },
      l8_q3: {
        question: "How does a region differ from an availability zone?",
        options: [
          "A region is a geographic area holding several separate data centres",
          "A region is for servers, while an availability zone is for storage",
          "A region is chosen by the provider, a zone is chosen by the customer",
          "A region holds the primary copy, while a zone only holds backups",
        ],
        explanation:
          "Zones within one region have independent power and networking, so losing one does not take the other - the cheapest failure protection available. Two REGIONS survive a wide disaster, at the cost of latency.",
      },
      l8_q4: {
        question: "Why put servers in a region near your users?",
        options: [
          "Signals still travel through cable, so distance becomes latency",
          "The provider charges less for the region closest to the customer",
          "Many countries legally require data to remain inside the country",
          "Servers in a nearby region receive priority in resource allocation",
        ],
        explanation:
          "Light in fibre takes roughly 100 milliseconds to cross half the planet one way, and no software optimisation shortens that. Data residency rules are a separate reason, real but distinct.",
      },
      l8_q5: {
        question: "What does autoscaling NOT solve?",
        options: [
          "A badly written query, which stays bad on every machine you add",
          "Traffic spiking during the busiest hours of the working day",
          "A server failing in hardware and needing to be replaced",
          "Money wasted while the system sits idle overnight",
        ],
        explanation:
          "Scaling replicates the problem rather than fixing it: a query missing an index becomes ten slow queries and one overloaded database. It only solves a genuine shortage of processing capacity.",
      },
      l8_q6: {
        question: "What does serverless trade away?",
        options: [
          "No servers to manage, but the first call after idling is slow",
          "Lower cost, but data is not encrypted while it is stored",
          "Faster deployment, but asynchronous code cannot be run",
          "Unlimited scaling, but only in one specific language",
        ],
        explanation:
          "A function that is not running costs nothing, but it is also not ready - the first call must rebuild its environment, known as a cold start. Fine for background work, very visible on an API a user waits on.",
      },
      l8_q7: {
        question: "What happens when a cron job runs longer than its own interval?",
        options: [
          "The next run starts on top of the previous one unless you lock",
          "The system postpones the next run until the previous one finishes",
          "The previous run is halted midway to make room for the new one",
          "Cron reports an error and suspends the schedule until someone acts",
        ],
        explanation:
          "Cron only knows that the time has come; it does not check whether the last run finished. Two runs processing one queue is where duplicate data and deadlocks come from, so a periodic script needs its own lock.",
      },
      l8_q8: {
        question: "Why should a shell script begin with `set -e`?",
        options: [
          "The script stops on the first failing command rather than continuing",
          "Every command is printed before running so it is easy to follow",
          "An undeclared variable becomes an error instead of an empty string",
          "The script runs under any shell rather than only the current one",
        ],
        explanation:
          "By default a shell carries on regardless of failure, so a failed `cd` can leave a later `rm` deleting the wrong directory. Printing commands is `set -x`, and erroring on undeclared variables is `set -u`.",
      },
      l8_q9: {
        question: "Why should a deployment script be safe to run again?",
        options: [
          "A run that failed halfway can be repeated without breaking more",
          "Repeated runs help surface faults that only appear at random",
          "The system reruns the script automatically whenever it detects change",
          "Several people on the team can then run it without colliding",
        ],
        explanation:
          "Deployments failing at step seven of ten are ordinary, and at that point you need to start again. A script whose step three errors with \"already exists\" on the second run forces manual cleanup under pressure.",
      },
      l8_q10: {
        question: "What problem do containers solve?",
        options: [
          "Packaging code with its dependencies so it runs the same anywhere",
          "Isolating an application completely from the host operating system",
          "Dividing a host's resources among applications by fixed proportions",
          "Letting an application run on any processor architecture at all",
        ],
        explanation:
          "A container carries its libraries and configuration, turning \"works on my machine\" into \"works everywhere\". It SHARES the kernel with the host rather than isolating fully - which is also why it cannot change processor architecture.",
      },
      l8_q11: {
        question: "Why keep container images small?",
        options: [
          "They pull and start faster, and carry less software to be attacked",
          "The provider charges by image size stored in the registry",
          "Large images will not run on hosts with limited memory",
          "Smaller images allow more containers per host machine",
        ],
        explanation:
          "A small image crosses the network faster on every deployment, and each unnecessary package is another vulnerability to track. How many containers fit is decided by runtime memory, not image size.",
      },
      l8_q12: {
        question: "What should a service health check verify?",
        options: [
          "Whether it can genuinely serve, including its essential dependencies",
          "Whether the process is still alive or has exited from memory",
          "Whether memory and processor use have crossed a set threshold",
          "Whether the running version matches the one just deployed",
        ],
        explanation:
          "A live process that has lost its database still accepts requests and fails them all, while the load balancer believes it is healthy. But do not check too deeply, or one minor dependency drops the whole fleet.",
      },
      l8_q13: {
        question: "What does a canary release mean?",
        options: [
          "Giving the new version to a small slice of users, then widening",
          "Running two versions side by side and comparing their results",
          "Releasing during quiet hours so the fewest people are affected",
          "Keeping the old version running so traffic can switch back at once",
        ],
        explanation:
          "A canary bounds how many people meet a fault while the fault still exists: 1% first, watch the metrics, then increase. Keeping both versions ready for an instant switch is blue-green - same aim, different mechanism.",
      },
      l8_q14: {
        question: "What should an alert be based on?",
        options: [
          "A symptom users feel, and one somebody must act on right now",
          "Every metric crossing a threshold, so nothing is ever missed",
          "Server resource usage such as memory and processor load",
          "Error counts in the logs exceeding the daily average",
        ],
        explanation:
          "An alert nobody must act on immediately teaches the on-call engineer to ignore alerts - and then the important one is ignored too. CPU at 90% may be perfectly normal; \"users cannot place orders\" is not.",
      },
      l8_q15: {
        question: "How does an SLO differ from an SLA?",
        options: [
          "An SLO is an internal target; an SLA is a binding customer promise",
          "An SLO measures availability, while an SLA measures response speed",
          "An SLO is set by engineering, while an SLA is set by the provider",
          "An SLO is measured monthly, while an SLA runs on a financial year",
        ],
        explanation:
          "An SLO is what you aim at internally and is usually stricter; an SLA is a contract term with consequences when breached. Setting the SLO tighter leaves room to react before the commitment is touched.",
      },
      l8_q16: {
        question: "Why centralise logs from every server?",
        options: [
          "One incident crosses many machines; reading each apart joins nothing",
          "Logs on a server are deleted automatically after a period of time",
          "Centralising saves storage by removing lines that are duplicated",
          "Only centralised logs get backed up on a regular schedule",
        ],
        explanation:
          "When servers are created and destroyed constantly, signing into each to read logs is impossible - and a destroyed machine takes its logs with it. Centralising is also the only way to search by request identifier.",
      },
      l8_q17: {
        question: "What does the 3-2-1 backup rule say?",
        options: [
          "Three copies, on two kinds of media, with one kept elsewhere",
          "Three copies daily, kept two weeks, with one retained forever",
          "Three full backups, two incremental ones, and one weekly check",
          "Three people able to restore, two to approve, and one to run it",
        ],
        explanation:
          "Three copies survive random corruption, two media types survive a systematic fault in one kind, and the off-site copy survives fire or ransomware sweeping the local network. Each number defends against a different kind of loss.",
      },
      l8_q18: {
        question: "Why is depending too deeply on one provider a risk?",
        options: [
          "Leaving becomes so costly that you lose all negotiating power",
          "The provider is able to read the data you store on their systems",
          "Proprietary services are typically less stable than open-source ones",
          "You cannot control when your systems are upgraded by the provider",
        ],
        explanation:
          "The issue is not service quality but the cost of exit: when a rewrite takes six months, any price increase must simply be paid. That is why people keep the core in a portable form.",
      },
      l8_q19: {
        question: "Why have an error budget?",
        options: [
          "It permits calculated risk instead of avoiding every change",
          "It helps forecast the cost of incident recovery in the annual plan",
          "It forces the development team to cut defects below a set level",
          "It reveals which team causes the most incidents in a quarter",
        ],
        explanation:
          "100% availability is impossible and not worth buying. An error budget turns \"do not break things\" into a number: budget remaining means ship; budget spent means stop feature work and go fix stability.",
      },
      l8_q20: {
        question: "What does infrastructure as code give you?",
        options: [
          "Rebuildable identical infrastructure, with every change in history",
          "Infrastructure that scales with load without anyone intervening",
          "Lower cost because resources are provisioned more precisely",
          "No need to sign in to servers to run administrative commands",
        ],
        explanation:
          "Declaring infrastructure in files puts it in the repository: reviewable, revertable, and reproducible as a second identical environment. Clicking in a console leaves nobody knowing who changed what and when.",
      },
    },
  },
  9: {
    title: "Master Exam - Level 9: Security & Career",
    questions: {
      l9_q1: {
        question: "What does two-factor authentication protect you from?",
        options: [
          "Someone who knows your password but does not hold the second device",
          "Spyware recording every key you press on your own machine",
          "A site you use leaking its entire user database to the public",
          "An attacker guessing your password by trying millions of combinations",
        ],
        explanation:
          "The second factor makes a leaked password insufficient on its own. It does not save you if your machine is already compromised - the one-time code is read too - and guessing is stopped by attempt limits.",
      },
      l9_q2: {
        question: "Why use a password manager?",
        options: [
          "A different password everywhere, so one leak does not spread",
          "Passwords are encrypted so the website cannot read the contents",
          "You never type the password, so key-logging software is defeated",
          "The manager rotates your passwords on every site periodically",
        ],
        explanation:
          "The biggest damage from a breach is password reuse: the attacker tries that pair at your bank and your email. A manager makes a long unique password per site practical - that is the real value.",
      },
      l9_q3: {
        question: "What is the most telling sign of a phishing email?",
        options: [
          "It presses you to act at once and leads to a sign-in page",
          "It comes from an address on a domain you have never seen before",
          "It contains spelling mistakes and phrasing that reads unnaturally",
          "It carries an attachment that you never asked anybody to send",
        ],
        explanation:
          "Urgency plus a page asking for a password is the core pair - the sense of haste is what stops people checking. Spelling was once a good signal but no longer is, since fraudulent mail is now written well.",
      },
      l9_q4: {
        question: "You suspect an account is compromised. What comes first?",
        options: [
          "Sign out every open session, then change the password and add 2FA",
          "Change the password immediately so the attacker cannot get back in",
          "Review the sign-in logs to establish where the attacker came from",
          "Notify the provider and wait for them to lock the account down",
        ],
        explanation:
          "Changing a password without ending sessions leaves the attacker's open session alive - many services do not invalidate old sessions. So cut sessions first, then change the password and add the second factor.",
      },
      l9_q5: {
        question: "How should passwords be stored in a database?",
        options: [
          "Hashed with a deliberately slow algorithm and a per-user salt",
          "Encrypted with a system key so they can be decrypted when needed",
          "Hashed with a fast algorithm so signing in does not become slow",
          "Stored as written, with read access to that table tightly limited",
        ],
        explanation:
          "Hashing is one-way, so a leak exposes no passwords; the salt makes two identical passwords hash differently; and SLOWNESS is the feature - it makes trying billions of combinations impractical.",
      },
      l9_q6: {
        question: "Why track vulnerabilities in the libraries you use?",
        options: [
          "A published vulnerability is a map for everyone, attackers included",
          "Older libraries run noticeably slower than the newest releases",
          "The maintainer withdraws support so the application stops working",
          "Older versions stop being compatible with other project libraries",
        ],
        explanation:
          "Disclosure comes with a description of how to exploit it, and automated scanners sweep the internet within hours. Most of the code in your application was written by other people, so this is the largest attack surface you have.",
      },
      l9_q7: {
        question: "Why is hiding how a system works not a security measure?",
        options: [
          "Attackers work it out anyway, while you cannot see your own gaps",
          "Source code always leaks eventually on any project of any size",
          "Users need to understand a system before they will trust using it",
          "Concealment makes maintenance and debugging considerably harder",
        ],
        explanation:
          "The only secret worth relying on is a key, because a key can be rotated when leaked. Architecture can be probed out, and when it is the only thing between an attacker and the data, you have no defence at all.",
      },
      l9_q8: {
        question: "What should a code reviewer look for above all?",
        options: [
          "Places the code betrays its promise, and edge cases left unhandled",
          "Places where naming is inconsistent with the rest of the project",
          "Places that could be shorter using newer language syntax",
          "Places missing a comment explaining what the code is doing",
        ],
        explanation:
          "Correctness first, style second - and most style belongs to an automatic formatter anyway. A review spent entirely on variable names while an unhandled error branch slips past is a review wasted.",
      },
      l9_q9: {
        question: "Why is it hard to spot faults in your own code?",
        options: [
          "You read what you meant to write rather than what you wrote",
          "You know the code so well that you read too fast and skip lines",
          "You no longer remember all the original requirements afterwards",
          "You are biased toward your own work and reluctant to admit flaws",
        ],
        explanation:
          "The brain fills gaps with your intention, so a wrong line still reads as right. That is why another reader is valuable, and why reading aloud or leaving it a day works better than staring harder.",
      },
      l9_q10: {
        question: "What should project documentation prioritise?",
        options: [
          "How to get it running, and why the key decisions were made",
          "A detailed description of what every function in the code does",
          "A complete architecture diagram covering every system component",
          "A list of finished features and the ones still outstanding",
        ],
        explanation:
          "A newcomer needs to run it first, and an old hand needs to know why it was built this way - neither is stated by the code. Per-function documentation goes stale after a few edits and usually just restates the name.",
      },
      l9_q11: {
        question: "What matters most when handing a project over?",
        options: [
          "The receiver can run and deploy it alone, without asking anybody",
          "A thorough meeting explaining the entire system architecture",
          "A detailed document describing every component of the project",
          "Contact details for the previous owner to ask when stuck",
        ],
        explanation:
          "The only trustworthy test is the receiver doing it while the previous owner stays silent. Meetings and documents create a feeling of handover; only doing it reveals which steps existed solely in someone's head.",
      },
      l9_q12: {
        question: "When should technical debt be repaid?",
        options: [
          "When it is slowing down the very work you are about to do",
          "As soon as it is found, since the cost only grows over time",
          "At the end of each development cycle, with time set aside",
          "When the team has run out of new work and has spare capacity",
        ],
        explanation:
          "Not all debt is worth repaying - ugly code nobody touches can stay. Debt worth repaying is debt charging interest: the part you must edit this time and next time too. Waiting for spare capacity means waiting forever.",
      },
      l9_q13: {
        question: "Why are developers' time estimates usually short?",
        options: [
          "They estimate the writing and forget review, fixes and deployment",
          "They deliberately understate so the work gets approved more easily",
          "Requirements always change after the estimate has been given",
          "Nobody measures actual time afterwards, so no lessons are drawn",
        ],
        explanation:
          "The question in your head is \"how long to write it\", but real time includes review, addressing comments, testing, deploying and patching afterwards. That forgotten part is often as large as the writing.",
      },
      l9_q14: {
        question: "What does an open-source library's licence decide?",
        options: [
          "On what terms you may use, modify and redistribute it",
          "Whether the library will be maintained and supported long term",
          "Whether you must pay to use it for commercial purposes",
          "Who is liable if the library causes harm to your users",
        ],
        explanation:
          "A licence sets the terms of use, and some require you to open your own source when you distribute - which can sink a closed product if nobody read it first. Nearly every licence disclaims all liability.",
      },
      l9_q15: {
        question: "What should a developer's CV emphasise?",
        options: [
          "Work done and measurable outcomes, rather than a list of technologies",
          "Every language and tool ever touched, so that nothing is left out",
          "The learning path taken and the certifications passed in the field",
          "Length of tenure at each company, to demonstrate stability",
        ],
        explanation:
          "A technology list cannot separate someone who read a book from someone who ran it at real scale. \"Cut page load from 4 seconds to 1\" says more than ten lines of library names.",
      },
      l9_q16: {
        question: "Why think aloud during a technical interview?",
        options: [
          "The interviewer is judging how you think, not just the final answer",
          "Speaking helps you catch flaws in your own reasoning sooner",
          "The interviewer will hint when they see you heading the wrong way",
          "Long silences are read as a sign of low confidence at work",
        ],
        explanation:
          "The puzzle is a pretext; what is being measured is how you decompose a problem and handle being stuck - because that is the daily job. Silence followed by a correct answer conveys far less.",
      },
      l9_q17: {
        question: "How does working at an outsourcing firm differ from a product company?",
        options: [
          "Outsourcing means many short projects; product means depth in one",
          "Outsourcing pays less but offers more flexible working hours",
          "Outsourcing uses older technology, while product work is always current",
          "Outsourcing offers no path into management positions later on",
        ],
        explanation:
          "The essential difference is breadth versus depth: hand over and move on, or live with the consequences of a decision you made two years ago. Pay and technology depend on the company, not the model.",
      },
      l9_q18: {
        question: "What is an early sign of professional burnout?",
        options: [
          "Still putting in the hours while work slows and starting feels hard",
          "Working overtime continuously for many weeks without a break",
          "Frequent disagreements with colleagues about how to work",
          "Losing interest in new technology and avoiding learning more",
        ],
        explanation:
          "Burnout arrives before it is recognised, and it shows in output rather than hours - still at the desk, but every task now takes twice as long. Overtime is a common cause, not a symptom.",
      },
      l9_q19: {
        question: "What is the most effective way to learn a new technology?",
        options: [
          "Get something small working, then read the docs where you got stuck",
          "Read the official documentation right through before starting",
          "Watch a full video course and rebuild the sample project exactly",
          "Read the library's source code to understand how it operates",
        ],
        explanation:
          "Knowledge sticks when it attaches to a problem you actually have. Reading everything before having any questions mostly evaporates, and rebuilding a sample gives a feeling of understanding you cannot verify.",
      },
      l9_q20: {
        question: "How should you begin contributing to an open-source project?",
        options: [
          "Fix a small bug or the documentation to learn the project's process",
          "Propose a large feature you believe the project is currently missing",
          "Read the whole source before submitting your first contribution",
          "Ask the maintainer which part they would like you to work on first",
        ],
        explanation:
          "A first contribution should be small so you learn the process - running the tests, commit conventions, the review cycle - without much at stake. Large features proposed cold are usually declined as off-direction.",
      },
    },
  },
  10: {
    title: "Legend Exam - Level 10: Technology Legend",
    questions: {
      l10_q1: {
        question: "Under the CAP theorem, what must a distributed system choose when the network partitions?",
        options: [
          "Between answering with possibly stale data, and refusing to answer",
          "Between fast responses, and durability of the data already written",
          "Between spreading load evenly, and keeping data in one place",
          "Between encrypting traffic, and cutting latency between data centres",
        ],
        explanation:
          "A partition happens to you rather than being chosen, so the real choice is only between consistency and availability. A system choosing availability still answers but may be stale; one choosing consistency returns an error.",
      },
      l10_q2: {
        question: "What does eventual consistency mean?",
        options: [
          "Replicas converge on one value if writing stops for long enough",
          "Every read sees the newest write after a fixed, known delay",
          "Data is flushed to disk before success is reported to the caller",
          "Replicas synchronise instantly thanks to batched transmission",
        ],
        explanation:
          "The only promise is convergence, with no time bound attached. So code that reads after writing must tolerate a stale value - not seeing the record you just created is very common.",
      },
      l10_q3: {
        question: "What does an idempotency key on a payment API solve?",
        options: [
          "A dropped connection retried does not create a second transaction",
          "Several users at once cannot overwrite each other's transactions",
          "Transactions are processed in the order the client submitted them",
          "The server refuses requests arriving too quickly from one source",
        ],
        explanation:
          "A client cannot distinguish \"the server never received it\" from \"it succeeded but the response was lost\". The key lets the server recognise the repeat and return the earlier result rather than charging again.",
      },
      l10_q4: {
        question: "What is the core problem with a transaction spanning several services?",
        options: [
          "No single authority can guarantee they all succeed or all fail",
          "Network latency pushes total processing past the allowed limit",
          "Each service uses a different database with different syntax",
          "The number of calls grows exponentially as services are added",
        ],
        explanation:
          "Within one database the transaction handles it; across five services nothing spans all five. That is why people use sagas: a sequence of steps with compensating steps, accepting a period of being half done.",
      },
      l10_q5: {
        question: "How does the circuit breaker pattern work?",
        options: [
          "It stops calling a failing service for a while, then probes gently",
          "It redirects calls to a standby service that is currently healthy",
          "It caps how many calls may be in flight to one service at a time",
          "It retries failed calls with a wait that grows with each attempt",
        ],
        explanation:
          "Once a service is down, continuing to call wastes resources on both sides and lengthens its recovery. The breaker opens so calls fail fast, then half-opens to test. Capping concurrency is a bulkhead; growing waits are backoff.",
      },
      l10_q6: {
        question: "Why should a service be stateless when running several copies?",
        options: [
          "Any request can go to any copy, so copies are easy to add or remove",
          "Each copy's memory is released after every request has been handled",
          "A service without state runs considerably faster than one with it",
          "State held in memory is easily lost when the process restarts",
        ],
        explanation:
          "Keeping a session in memory forces a user back to the copy that served them, which destroys the freedom to add copies or restart any of them. Pushing state outside is the precondition for scaling out.",
      },
      l10_q7: {
        question: "What is the main benefit of a message queue?",
        options: [
          "The sender need not wait, and traffic peaks get smoothed out",
          "Messages are guaranteed to be processed exactly once and in order",
          "The receiver processes faster because data is already in memory",
          "Neither side needs to know the other's network address",
        ],
        explanation:
          "A queue decouples the pace of the two sides: submit ten thousand jobs in a second, process them over ten minutes. Exactly-once is what most queues do NOT promise - they promise at least once, so the receiver must be idempotent.",
      },
      l10_q8: {
        question: "Why are microservices not always the right answer?",
        options: [
          "You trade independence for network latency and much harder debugging",
          "Microservices need more servers, so infrastructure costs rise sharply",
          "Each service has to be written in a different language to suit it",
          "Databases must be split, so data ends up duplicated in many places",
        ],
        explanation:
          "An in-process call always succeeds and takes nanoseconds; over the network there is latency, failure and timeout. A team of ten splitting into twenty services usually manufactures more work than it removes.",
      },
      l10_q9: {
        question: "How does event sourcing differ from storing current state?",
        options: [
          "It stores the sequence of changes and rebuilds state, rather than overwriting",
          "It keeps state in memory and writes it down to disk periodically",
          "It keeps several copies of the state in case one becomes corrupt",
          "It stores state with a timestamp showing the most recent edit",
        ],
        explanation:
          "The source of truth is the sequence of events that happened, and state is merely the result of replaying them. You gain full history and the ability to build new views from old data - at the cost of much harder querying.",
      },
      l10_q10: {
        question: "What does backpressure mean in a streaming system?",
        options: [
          "The receiver signals the sender to slow when it cannot keep up",
          "The sender slows itself when it detects network latency rising",
          "The system discards messages once the queue passes a threshold",
          "Older messages are evicted to make room for newer arrivals",
        ],
        explanation:
          "Without a channel back, the sender keeps pushing until the receiver runs out of memory. Discarding messages is a way of COPING without backpressure, not the mechanism itself.",
      },
      l10_q11: {
        question: "Why separate the read and write paths under heavy load?",
        options: [
          "The two have entirely different load shapes and tuning needs",
          "The write path needs higher security, so it runs on its own machines",
          "Separating lets each side use a programming language that suits it",
          "A database cannot handle reads and writes on one table at once",
        ],
        explanation:
          "Reads are often a hundred times writes and tolerate data a few seconds old; writes are fewer but need consistency. Separating lets you replicate reads freely without touching the write path - the idea behind CQRS.",
      },
      l10_q12: {
        question: "What is a cache stampede?",
        options: [
          "One key expires and thousands of requests hit the source at once",
          "The cache fills, so old keys are evicted before they expire",
          "Cached data drifts from the source because an update failed",
          "Several processes write one key and corrupt its stored value",
        ],
        explanation:
          "A hot key expiring during peak traffic means thousands of requests all miss and all call the database. The fix is letting one request fetch while the rest wait, or spreading expiry times randomly.",
      },
      l10_q13: {
        question: "What does database sharding trade away?",
        options: [
          "More write capacity, at the cost of expensive cross-shard queries",
          "Faster reads, at the cost of data a few seconds behind the source",
          "More capacity, at the cost of accepting data loss during failures",
          "Lower cost, at the cost of needing specialised hardware to operate",
        ],
        explanation:
          "Splitting data across machines raises write capacity, but any query not filtering on the shard key must ask every shard and merge. Choosing the wrong shard key is very hard to undo later.",
      },
      l10_q14: {
        question: "What does a read replica NOT solve?",
        options: [
          "A primary overloaded by writes, since every write still goes there",
          "Read traffic climbing during the busiest hours of the working day",
          "High latency for users far from the main data centre",
          "The risk of losing data when the primary's disk fails completely",
        ],
        explanation:
          "Replicas take reads only; every write still passes through the primary, so no number of replicas raises write capacity. For that you must shard or change the data model.",
      },
      l10_q15: {
        question: "Why is pessimistic locking dangerous under heavy load?",
        options: [
          "Transactions queue behind each other, so one slow spot blocks all",
          "Locks are not released if the process holding one stops abruptly",
          "The database must keep an extra table tracking every held lock",
          "Locks only work within one server rather than across machines",
        ],
        explanation:
          "A lock turns parallel access into serial access, so throughput is capped by the slowest transaction. Optimistic locking - check a version at write time and retry on collision - usually suits better when conflicts are rare.",
      },
      l10_q16: {
        question: "Why design a system to fail fast?",
        options: [
          "The fault surfaces at its source rather than spreading as bad state",
          "Failing fast saves server resources during an incident",
          "Users prefer an error message to waiting for a long time",
          "The system can restart itself as soon as a fault is detected",
        ],
        explanation:
          "Swallowing an error and continuing with a default sends wrong data far from its origin, surfacing three layers later somewhere unrelated. Stopping on the spot keeps cause and symptom close together.",
      },
      l10_q17: {
        question: "Why are machine clocks unreliable for ordering events in a distributed system?",
        options: [
          "Clocks drift between machines, so two events can be ordered wrongly",
          "Clocks run progressively slower if a machine is never restarted",
          "Different time zones across data centres introduce large errors",
          "The system clock resets whenever the server software is updated",
        ],
        explanation:
          "Even with NTP synchronisation, a few milliseconds of skew is enough to invert two events a millisecond apart. So distributed systems use logical clocks or version numbers instead of absolute timestamps.",
      },
      l10_q18: {
        question: "What does the bulkhead pattern mean in system design?",
        options: [
          "Splitting resources into compartments so one failure cannot spread",
          "Placing a barrier between the internal network and outside connections",
          "Backing data up to several places to survive losing one data centre",
          "Capping each message's size to stop the transport being congested",
        ],
        explanation:
          "The name comes from a ship's sealed compartments: flood one and the ship floats. In software it means a separate connection pool per dependency, so one slow service cannot consume every thread in the application.",
      },
      l10_q19: {
        question: "Why set resource limits on each container?",
        options: [
          "One container leaking memory then cannot drag down the whole host",
          "The scheduler needs the limits to place containers on the right hosts",
          "Limits allow accurate costing of what each service consumes",
          "A container over its limit is automatically replicated with a new copy",
        ],
        explanation:
          "Without limits a leaking process consumes the host's RAM and the operating system starts killing other processes indiscriminately. Limits turn a whole-machine incident into a single-service one.",
      },
      l10_q20: {
        question: "What is chaos engineering for?",
        options: [
          "Breaking things deliberately while staffed, to expose wrong assumptions",
          "Checking how many requests per second the system can withstand",
          "Finding security holes by simulating genuine attacks on the system",
          "Generating random data to test rare edge cases in the code",
        ],
        explanation:
          "Distributed systems always fail; the question is when. Breaking them on purpose in daylight with people ready reveals what you believed you could survive and actually cannot - before it happens at three in the morning.",
      },
      l10_q21: {
        question: "Why separate configuration from application source code?",
        options: [
          "One build then runs in every environment without being rebuilt",
          "Configuration changes often, so it needs faster storage to read",
          "Source code compresses smaller when it carries no configuration",
          "Operators do not have access to the project's code repository",
        ],
        explanation:
          "Building once and carrying that exact artefact from test to production is the only way to be sure what you tested is what runs. Configuration inside the code means a different build per environment.",
      },
      l10_q22: {
        question: "What is an API gateway in front of many services for?",
        options: [
          "Centralising authentication, rate limiting and routing in one place",
          "Caching every service's responses to reduce load on the system",
          "Converting data between the formats each service happens to use",
          "Monitoring service health and restarting them when they fail",
        ],
        explanation:
          "Without a gateway every service implements authentication, rate limiting and logging itself - twenty slightly different versions. In exchange the gateway becomes a single point of failure unless carefully replicated.",
      },
      l10_q23: {
        question: "Why set a deadline for a whole call chain rather than each call?",
        options: [
          "Five calls waiting two seconds each becomes ten seconds for the user",
          "A total deadline lets the system prioritise the important requests",
          "Per-call deadlines set by each service will conflict with each other",
          "Per-call deadlines cannot be applied to asynchronous calls",
        ],
        explanation:
          "A user waits for the total, not each hop, so the time budget must be divided and passed down: 300 milliseconds left means the service below knows not to spend more. Without it, deadlines simply add up.",
      },
      l10_q24: {
        question: "Why are distributed locks hard to get right?",
        options: [
          "The holder can stall and the lease expire while it is still running",
          "No database offers locking that spans several server machines",
          "The network cost makes acquiring a lock slower than the work itself",
          "Many processes requesting a lock at once will cause a deadlock",
        ],
        explanation:
          "You believe you still hold the lock, but one garbage-collection pause longer than the lease means it has passed to someone else while you keep writing. Distributed locks therefore need fencing with an increasing version number.",
      },
      l10_q25: {
        question: "Why use percentiles rather than an average to measure performance?",
        options: [
          "An average hides the tail, where the worst experience actually lives",
          "An average is hard to compute accurately once samples grow numerous",
          "Percentiles better reflect the speed of an average server machine",
          "An average shifts sharply whenever new samples join the data set",
        ],
        explanation:
          "One percent of users waiting ten seconds dissolves completely into a 200-millisecond average - and one percent at scale is thousands of people a day. p99 looks straight at that group.",
      },
      l10_q26: {
        question: "Why measure before optimising?",
        options: [
          "Intuition about slowness is usually wrong, so effort gets wasted",
          "Before-and-after figures are evidence to report to management",
          "Automated profilers indicate precisely which code to rewrite",
          "Unmeasured optimisation makes code harder to read for no clear gain",
        ],
        explanation:
          "The most complicated-looking part is rarely the expensive one; a trivial N+1 query usually eats more than the algorithm you are worried about. Measure so the effort lands where the time actually goes.",
      },
      l10_q27: {
        question: "Why does adding threads not always increase throughput?",
        options: [
          "When the bottleneck is a shared resource, more threads add contention",
          "The operating system caps how many threads one process may create",
          "Each thread uses memory, so RAM runs out before speed improves",
          "Threads only run truly in parallel on machines with several processors",
        ],
        explanation:
          "If every thread waits on the same database or the same lock, more threads only lengthen the queue and raise context-switching cost. Find the bottleneck before raising concurrency.",
      },
      l10_q28: {
        question: "Why cap the size of a database connection pool?",
        options: [
          "A database performs best at one concurrency level and worse beyond",
          "Each connection uses a network port and a machine has a finite number",
          "Idle connections are still billed by the hour on cloud services",
          "Many connections make establishing a new one noticeably slower",
        ],
        explanation:
          "Too many concurrent connections make the database spend its time context switching and contending for locks rather than working - throughput falls as load rises. A pool keeps concurrency in the productive range.",
      },
      l10_q29: {
        question: "Why avoid a network call inside a loop?",
        options: [
          "Per-round-trip cost multiplies, and one failure spoils the whole loop",
          "The loop holds connections open long enough for the server to close them",
          "Asynchronous code inside a loop cannot actually run in parallel",
          "Networking libraries do not guarantee response order between calls",
        ],
        explanation:
          "A hundred round trips at twenty milliseconds each is two seconds, nearly all of it waiting. Batch into one call, or run in parallel with a limit - this is the network version of the N+1 problem.",
      },
      l10_q30: {
        question: "Why compress data before sending it over a wide-area network?",
        options: [
          "Bandwidth is usually the bottleneck, and compression costs little CPU",
          "Compressed data encrypts better, so it is safer while in transit",
          "The receiving server decompresses faster than it receives the data",
          "Providers charge by packet count rather than by data volume",
        ],
        explanation:
          "Over long distances, pushing bytes down the wire takes far longer than compressing and decompressing them, so the trade is nearly always favourable. Inside one data centre reconsider, since bandwidth there is much cheaper.",
      },
      l10_q31: {
        question: "Why does skewed training data make a model learn the wrong thing?",
        options: [
          "The model learns exactly what it saw, and what it saw is not reality",
          "Skewed data makes the training process converge more slowly",
          "The model raises an error when it meets data unlike the training set",
          "The optimiser gets trapped in a poor local minimum during training",
        ],
        explanation:
          "A model knows nothing beyond the data you gave it; if the training set holds one group of users it will be excellent for them and poor for everyone else - while overall accuracy still looks fine.",
      },
      l10_q32: {
        question: "How does overfitting show itself?",
        options: [
          "Excellent on the training data but markedly worse on new data",
          "Poor on the training data and on the test data alike",
          "Results swinging widely between separate training runs",
          "Training taking much longer than originally anticipated",
        ],
        explanation:
          "The model memorised the noise in the training set instead of the general rule. Poor on both sides is underfitting - the opposite problem with the opposite remedy, so diagnosing it wrongly sends you in exactly the wrong direction.",
      },
      l10_q33: {
        question: "Why hold the test set out before doing anything else?",
        options: [
          "Touching it while choosing a model leaks the answers into your process",
          "The test set must be normalised differently from the training set",
          "Its size has to be fixed before the total data volume is known",
          "Test data usually arrives later, so you must wait to gather it",
        ],
        explanation:
          "Each time you look at the test score and adjust, a little of that information seeps into your choices. After twenty rounds the number no longer says anything about data the model has never seen.",
      },
      l10_q34: {
        question: "Why is accuracy a poor metric on imbalanced data?",
        options: [
          "Always guessing the majority class scores high while detecting nothing",
          "Accuracy cannot be computed when there are more than two classes",
          "Accuracy shifts sharply with the classification threshold chosen",
          "Accuracy can only be measured on the test set, not the training set",
        ],
        explanation:
          "If one percent of transactions are fraudulent, a model always saying \"not fraud\" is 99% accurate and catches zero cases. Imbalanced data needs precision, recall and a confusion matrix.",
      },
      l10_q35: {
        question: "What is data leakage in machine learning?",
        options: [
          "A feature carrying information only available after the outcome",
          "Users' personal data escaping during the training process",
          "The training and test sets sharing some identical records",
          "The model memorising training data and reciting it back verbatim",
        ],
        explanation:
          "The classic case is predicting churn with a \"cancellation date\" feature. The model scores 99% in testing and is useless in production, because at prediction time that feature does not yet exist.",
      },
      l10_q36: {
        question: "Why must a deployed model be re-evaluated periodically?",
        options: [
          "The world changes, so the data drifts away from what it trained on",
          "The model loses accuracy as errors accumulate over many predictions",
          "Library updates alter how the computations produce their results",
          "The weights degrade if the model runs continuously for too long",
        ],
        explanation:
          "The weights do not change; what changes is the data arriving. User behaviour, seasonality, a new competitor - all shift the distribution, and the model keeps answering confidently while no longer being right.",
      },
      l10_q37: {
        question: "Why can a large language model be confidently wrong?",
        options: [
          "It generates likely text rather than looking facts up to verify them",
          "It is limited by its training data, so much information is missing",
          "It favours a fast answer and skips the step of checking its work",
          "It cannot distinguish a difficult question from an easy one",
        ],
        explanation:
          "The mechanism is predicting a plausible next token, and a fabricated sentence is perfectly plausible as language. No step in that process compares against reality, so fluency says nothing about correctness.",
      },
      l10_q38: {
        question: "Why log the inputs and outputs of a model used in a product?",
        options: [
          "Without them you cannot trace why a wrong result was produced",
          "The provider requires logs in order to bill by number of calls",
          "The logged data becomes the training set for the next version",
          "Logging reveals when the model responds more slowly than usual",
        ],
        explanation:
          "The model is a black box, so the exact input at the time is the only clue when a complaint arrives. But these logs hold user data, so retention and privacy need deciding deliberately.",
      },
      l10_q39: {
        question: "Why have a fallback when calling an external model service?",
        options: [
          "It is a network dependency, so it will be slow, failing or rate limited",
          "The external model may change version without any prior notice",
          "Model calls are expensive, so the number of calls must be reduced",
          "Model results are unstable between calls on the same input",
        ],
        explanation:
          "A model service is just an HTTP API and carries every risk of one - plus much higher latency and tighter quotas. A feature depending on it must degrade gracefully rather than take the screen down.",
      },
      l10_q40: {
        question: "How does an analytics warehouse differ from an operational database?",
        options: [
          "It is tuned for wide scans; the other for writing and reading single rows",
          "It stores older data, while the operational database keeps only recent",
          "It forbids editing data, while the operational one allows it freely",
          "It uses its own query language rather than SQL like the other",
        ],
        explanation:
          "The two workloads differ completely: fetching one order by id, versus scanning three years to compute a total. Running heavy reports straight against the operational database is how you slow the product down.",
      },
      l10_q41: {
        question: "Why is columnar storage faster for analytical queries?",
        options: [
          "Only the needed columns are read, not whole rows of unused fields",
          "Column data stays in the processor cache longer than row data does",
          "Each column carries its own index, so lookups are always faster",
          "The column format lets a query run in parallel across many machines",
        ],
        explanation:
          "Summing one column of a fifty-column table forces a row store to read all fifty. Column storage also compresses far better because values in a column tend to be alike - two benefits compounding.",
      },
      l10_q42: {
        question: "Why should a data pipeline be re-runnable over a past window?",
        options: [
          "A logic fault found late requires recomputing days already processed",
          "Source data usually arrives late, so everything must be redone",
          "Re-running checks whether the pipeline is still working correctly",
          "The storage system requires data to be rewritten periodically",
        ],
        explanation:
          "Mistakes in a transformation typically surface weeks later, and then you need to recompute exactly that window without disturbing the rest. A pipeline that only runs for today turns the fix into a disaster.",
      },
      l10_q43: {
        question: "Why check data quality inside the pipeline itself?",
        options: [
          "Bad data spreads into every report and model downstream of it",
          "Early checks speed the pipeline up by discarding fewer records",
          "The source will correct itself if told as soon as a fault appears",
          "Regulations require every data anomaly to be formally recorded",
        ],
        explanation:
          "A column that suddenly goes entirely empty flows quietly into reports and models, and people only notice when a decision goes wrong. Stopping it at the door is far cheaper than tracing back from the result.",
      },
      l10_q44: {
        question: "How does batch processing differ from stream processing?",
        options: [
          "Batch gathers data and runs periodically; streams process on arrival",
          "Batch runs across many machines, while a stream runs on just one",
          "Batch suits large data, while streams suit smaller data volumes",
          "Batch guarantees no data loss, while streaming accepts some loss",
        ],
        explanation:
          "The difference is the latency you can accept: a daily report is simpler and cheaper as a batch; fraud detection has to be a stream. Both run distributed and both can guarantee delivery.",
      },
      l10_q45: {
        question: "Why keep raw data alongside the processed version?",
        options: [
          "Transformations can be wrong, and only raw data allows redoing them",
          "Raw data occupies less space than the processed version does",
          "Regulations require the original of all collected data to be kept",
          "Raw data queries faster because it has not been transformed yet",
        ],
        explanation:
          "When you discover a formula was wrong six months ago, raw data is the only thing that lets you rebuild. It usually costs MORE space and queries more slowly - that is the price of being able to go back.",
      },
      l10_q46: {
        question: "Why anonymise personal data in test environments?",
        options: [
          "Test environments are less controlled while the data is just as real",
          "Anonymised data makes the test environment run faster than production",
          "The reduced data volume saves a considerable amount on storage",
          "Developers are not permitted to see the data of genuine users",
        ],
        explanation:
          "Copying the production database into testing is the most common way personal data leaks: identical sensitivity, fewer protections, more people with access, and routinely forgotten at cleanup time.",
      },
      l10_q47: {
        question: "Why is honouring a deletion request difficult?",
        options: [
          "The record has been copied into backups, logs and the warehouse",
          "Databases cannot delete permanently, only mark rows as deleted",
          "Removing a row breaks the foreign key constraints of other tables",
          "Users cannot usually identify precisely which data is theirs",
        ],
        explanation:
          "A record rarely lives in one place: it is in a three-month-old backup, in logs, in the analytics warehouse and in a cache. Designing for deletion must happen up front; it cannot be retrofitted.",
      },
      l10_q48: {
        question: "Why put a limit on how long data is retained?",
        options: [
          "Data no longer needed remains a liability if it ever leaks",
          "Databases slow down once the row count passes a threshold",
          "Storage is the largest single cost of most running systems",
          "Old data skews analysis away from the current situation",
        ],
        explanation:
          "Data you do not hold cannot be stolen. That is why a retention lifecycle counts as a security control rather than merely as housekeeping.",
      },
      l10_q49: {
        question: "Why define a business metric in exactly one place?",
        options: [
          "Teams computing it separately produce different numbers for one name",
          "Central computation speeds queries up by reusing earlier results",
          "Reporting tools can only read definitions from a single source",
          "A central definition reduces the storage the warehouse consumes",
        ],
        explanation:
          "\"Active users\" over seven days or thirty, counting trial accounts or not - each team choosing gives two reports with one name and two numbers, and the meeting becomes an argument about data.",
      },
      l10_q50: {
        question: "Why fix the sample size before running an A/B test?",
        options: [
          "Stopping the moment results look good is a way of fooling yourself",
          "The sample size determines the infrastructure the test will need",
          "Without it users cannot be divided evenly between the two groups",
          "A larger sample lets the test finish sooner than expected",
        ],
        explanation:
          "Watching continuously and stopping at significance almost always finds a \"result\", even between two identical groups. Fixing the size and duration up front is what keeps the number meaningful.",
      },
      l10_q51: {
        question: "What does correlation not implying causation mean in practice?",
        options: [
          "Two metrics rising together may both be caused by a third thing",
          "Observational data is always less trustworthy than experimental data",
          "A high correlation usually indicates an error somewhere in the data",
          "Causation can only be demonstrated with a very large sample size",
        ],
        explanation:
          "Heavy users retain better - but perhaps because they liked the product already, not because usage causes loyalty. Pushing people to use it more may improve nothing at all.",
      },
      l10_q52: {
        question: "Why measure by cohort rather than in aggregate?",
        options: [
          "New arrivals mask existing users quietly leaving the product",
          "Splitting into groups makes queries run faster on large data",
          "Aggregates cannot be computed when users have several devices",
          "Cohorts allow comparison against competitors in the same industry",
        ],
        explanation:
          "Total active users climbs steadily while every cohort churns quickly - you only need to recruit fast enough. Cohorts are the only way to see whether the product actually holds people.",
      },
      l10_q53: {
        question: "Why can a badly chosen metric cause harm?",
        options: [
          "The team will optimise that number even where it damages the product",
          "A wrong metric makes collecting the data more expensive than needed",
          "Reports will contradict the other metrics currently being tracked",
          "Leadership will lose confidence in the data team over time",
        ],
        explanation:
          "Measure time spent in the app and people will make it harder to use so users stay longer. A metric that becomes a target stops being a good measure - and that happens fast.",
      },
      l10_q54: {
        question: "Why sample when exploring an enormous data set?",
        options: [
          "An approximate answer in ten seconds beats an exact one in half an hour",
          "Sampling makes outliers easier to spot than the full data would",
          "Querying everything can damage the index on the source table",
          "Results on a sample are more accurate because noise is removed",
        ],
        explanation:
          "While hunting for a hypothesis you need a fast loop, not a final number. Run on one percent to eliminate nine wrong hypotheses, then run fully on the one that survives.",
      },
      l10_q55: {
        question: "Why version both the model and its training data?",
        options: [
          "Without it you cannot reproduce the result a given model produced",
          "Versioning saves space by storing only the differences between runs",
          "Several models running in parallel must be told apart from each other",
          "Deployment tooling requires every component to carry a version",
        ],
        explanation:
          "A model behaving oddly cannot be investigated if you do not know which data, which code and which parameters produced it. Code has git, but data and weights need their own mechanism.",
      },
      l10_q56: {
        question: "Why is batch inference cheaper than per-request inference?",
        options: [
          "The fixed cost of each invocation is shared across many records",
          "The model is more accurate when handling many records together",
          "Batch results are cached, so the next run need not recompute",
          "Graphics processors only operate in batch mode at all",
        ],
        explanation:
          "Loading the model, moving data to the device and starting the compute kernels cost roughly the same for one record as for a thousand. You pay for it in latency, so it only suits work nobody is waiting on.",
      },
      l10_q57: {
        question: "Why keep a human in the loop for high-stakes decisions?",
        options: [
          "A model cannot be accountable, while the consequences are very real",
          "Humans handle the cases the model has never encountered before",
          "Regulations forbid automating these decisions entirely in all cases",
          "Human judgements become training data for the following version",
        ],
        explanation:
          "Refusing a loan or flagging an account for fraud affects someone's life, and the model's error rate is not zero. How much you automate should fall as the harm from being wrong rises.",
      },
      l10_q58: {
        question: "Why monitor the input distribution of a running model?",
        options: [
          "Drifting inputs are an early signal, before poor results become visible",
          "The input distribution determines the server resources to provision",
          "Monitoring inputs reveals users submitting deliberately harmful data",
          "The model must be retrained whenever its inputs change at all",
        ],
        explanation:
          "True labels arrive very late - whether a loan defaults takes months. But you can see today that the average age of applicants has shifted, and that is a signal you can act on.",
      },
      l10_q59: {
        question: "Why start with a simple solution before reaching for machine learning?",
        options: [
          "Simple rules are often good enough, and they set the baseline to beat",
          "Machine learning only works once a large volume of data exists",
          "A simple solution ships sooner, so the product launches earlier",
          "Machine learning models cost far more to operate than rules do",
        ],
        explanation:
          "Without a baseline, \"85% accurate\" says nothing - a three-line rule might score 84%. And if it does, the entire operating cost of the model buys one percentage point.",
      },
      l10_q60: {
        question: "Why does explainability of a model matter?",
        options: [
          "Those affected need a reason, and you need one to fix it when wrong",
          "Explainable models are always more accurate than opaque ones",
          "Explanations shorten training time on subsequent runs",
          "Only explainable models can be deployed into production at all",
        ],
        explanation:
          "When a model refuses someone, \"the model said so\" does not work for the user, for legal, or for you while debugging. Explainability usually costs some accuracy.",
      },
      l10_q61: {
        question: "What does an XSS attack exploit?",
        options: [
          "A page rendering user input without neutralising the code within it",
          "A server not checking permissions before returning sensitive data",
          "An attacker guessing another user's session identifier correctly",
          "A browser attaching cookies when a user clicks through to another site",
        ],
        explanation:
          "User-supplied content is embedded into the page and becomes code running in the victim's browser with the full rights of their session. The defence is escaping on output, not filtering on input.",
      },
      l10_q62: {
        question: "What essentially separates CSRF from XSS?",
        options: [
          "CSRF borrows an existing session; XSS runs code in the victim's page",
          "CSRF targets the server, while XSS only affects the browser",
          "CSRF needs the victim's password, while XSS needs nothing at all",
          "CSRF works only with forms, while XSS works on any page",
        ],
        explanation:
          "CSRF reads nothing - it merely causes the victim's browser to send a request carrying existing cookies. Which is why an anti-CSRF token works: the attacker can trigger a request but cannot read the token to attach.",
      },
      l10_q63: {
        question: "Why does the SameSite cookie attribute reduce CSRF risk?",
        options: [
          "The browser stops attaching the cookie to requests from other sites",
          "The cookie gets an extra layer of encryption before transmission",
          "The cookie becomes readable only by JavaScript on that same domain",
          "The cookie expires as soon as the user navigates away from the site",
        ],
        explanation:
          "SameSite cuts exactly the mechanism CSRF depends on: cookies riding along automatically. Blocking JavaScript access is `HttpOnly` and requiring HTTPS is `Secure` - three attributes for three separate risks.",
      },
      l10_q64: {
        question: "Why not write your own encryption algorithm?",
        options: [
          "Subtle flaws never surface in testing, only under real attack",
          "A hand-written algorithm runs far slower than the standard library",
          "Regulations require using algorithms approved by an authority",
          "A custom algorithm will not interoperate with partners' systems",
        ],
        explanation:
          "Broken encryption still produces random-looking output and still decrypts correctly - every test passes. The weakness only shows to someone who knows how to analyse it, and by then the data is long gone.",
      },
      l10_q65: {
        question: "How is a man-in-the-middle attack prevented?",
        options: [
          "By verifying the server's identity with a certificate a trusted party signed",
          "By encrypting all data before it is sent across the network",
          "By using a password long enough that an attacker cannot guess it",
          "By checking the server's IP address before each connection is made",
        ],
        explanation:
          "Encryption alone is not enough - the man in the middle establishes an encrypted channel with both sides. What stops it is authentication: the certificate proving the far end owns that domain, which is precisely what is skipped when people disable certificate checks.",
      },
      l10_q66: {
        question: "Why filter with an allow list rather than a deny list?",
        options: [
          "A deny list is always incomplete, since you must foresee every attack",
          "An allow list is shorter, so the system checks it more quickly",
          "A deny list must be updated constantly as new threats emerge",
          "An allow list is easier for a newcomer to read in the configuration",
        ],
        explanation:
          "A deny list asks you to enumerate everything bad - a list that is never finished, and each gap is a way in. An allow list asks you to enumerate the good, which is what you actually know.",
      },
      l10_q67: {
        question: "Why rotate secrets on a schedule?",
        options: [
          "A key leaked unnoticed loses its access when the rotation happens",
          "A key used for a long time is rejected by the encryption algorithm",
          "Rotation makes it possible to tell who used the key and when",
          "Regulations require every key to be replaced each period",
        ],
        explanation:
          "Most key leaks are never detected. Rotation puts an expiry on every copy in circulation, including copies you do not know exist - turning an open-ended incident into a bounded one.",
      },
      l10_q68: {
        question: "Why can server-side validation not be replaced by checks in a mobile app?",
        options: [
          "The app sits on the user's device, so it can be decompiled and altered",
          "A mobile app lacks the resources to run thorough validation",
          "Older app versions will not carry the newest validation rules",
          "A flaky network makes validation results untrustworthy",
        ],
        explanation:
          "The installation package can be downloaded, opened and edited, and requests can be crafted by hand without the app at all. Everything running on a user's device is under their control.",
      },
      l10_q69: {
        question: "What does certificate pinning protect against?",
        options: [
          "A certificate authority being compromised and signing a fake certificate",
          "The server's certificate expiring before anyone renews it",
          "An attacker intercepting and reading already-encrypted packets",
          "A user installing a counterfeit app from an unofficial source",
        ],
        explanation:
          "Browsers trust hundreds of certificate authorities; compromising any one of them yields a valid certificate for your domain. Pinning narrows that trust down to the certificate you nominate.",
      },
      l10_q70: {
        question: "Why divide a network into separate zones?",
        options: [
          "Compromising one machine does not mean reaching the database",
          "Traffic is distributed more evenly, so network performance improves",
          "Each zone can use its own address range for easier administration",
          "Zoning reduces the cost of transferring data between servers",
        ],
        explanation:
          "The correct assumption is that a machine will be compromised eventually. Segmentation decides how far the attacker gets - a web server sharing a zone with the database means one flaw loses everything.",
      },
      l10_q71: {
        question: "Why disable password authentication for SSH?",
        options: [
          "A port open to the internet is subjected to automated guessing constantly",
          "Passwords sent over SSH are not encrypted the way public keys are",
          "Password sign-in is slower because the server has to verify it",
          "Passwords are not written to logs, so tracing afterwards is harder",
        ],
        explanation:
          "Any server exposing port 22 receives thousands of attempts a day from botnets. Public keys make guessing pointless. Passwords ARE encrypted in transit - that is not the issue.",
      },
      l10_q72: {
        question: "Why run services under a low-privilege account?",
        options: [
          "A flaw in the service grants the attacker only that account's rights",
          "A low-privilege account consumes fewer system resources",
          "The operating system logs low-privilege accounts in more detail",
          "Services running as root are limited by the system in connections",
        ],
        explanation:
          "Remote code execution as administrator loses the machine; under an account that can only read the application directory the damage is bounded. This is also why containers should not run as root.",
      },
      l10_q73: {
        question: "Why write audit logs somewhere the application cannot delete?",
        options: [
          "An attacker with control will erase traces stored in the same place",
          "Audit logs are large, so they need separate storage anyway",
          "Slow log writing would otherwise degrade the main service",
          "Regulations require logs to be stored in several locations",
        ],
        explanation:
          "The first thing an attacker with privileges does is clear the logs. Append-only writes to a separate system the application cannot delete from is what preserves the story after everything else is lost.",
      },
      l10_q74: {
        question: "Why rehearse security incident response?",
        options: [
          "Under real pressure nobody reads documents; people do what they practised",
          "Rehearsal uncovers vulnerabilities not previously known about",
          "Regulations require organisations to rehearse annually",
          "Rehearsal is the cheapest way to train new staff in security",
        ],
        explanation:
          "A real incident happens at midnight with incomplete information and high pressure - exactly when the ability to read documentation is zero. Rehearsal also exposes gaps like nobody knowing the provider's phone number.",
      },
      l10_q75: {
        question: "How does zero trust differ from the perimeter model?",
        options: [
          "Every request is authenticated, including those from the internal network",
          "No device is permitted to connect to the company network at all",
          "All data is encrypted even when stored on internal machines",
          "Staff reach systems only through one tightly controlled gateway",
        ],
        explanation:
          "The perimeter model treats the internal network as safe, so compromising one laptop grants free movement inside. Zero trust drops that assumption: network location is no longer evidence of permission.",
      },
      l10_q76: {
        question: "Why scan dependencies in continuous integration?",
        options: [
          "New vulnerabilities are published for libraries you have long used",
          "Scanning finds libraries that nobody is maintaining any more",
          "A growing dependency count makes builds progressively slower",
          "A library's licence may change between one version and the next",
        ],
        explanation:
          "Your code does not change but its safety does, every day, as vulnerabilities are disclosed for libraries already in the project. Automated scanning is the only way to learn that.",
      },
      l10_q77: {
        question: "Why encrypt data at rest as well?",
        options: [
          "A stolen disk or backup then still cannot be read by anyone",
          "Encryption at rest detects when data has been tampered with",
          "Regulations require all data to be encrypted in every state",
          "Encrypted data takes less space because it is compressed too",
        ],
        explanation:
          "Transport encryption protects data only while it moves. Disks get replaced, backups end up on public storage, machine images get copied - those are the leak paths only at-rest encryption closes.",
      },
      l10_q78: {
        question: "Why limit the lifetime of an administrative session?",
        options: [
          "An abandoned or stolen machine is dangerous only for a short window",
          "Long sessions consume server memory holding the session state",
          "The administrator must sign in again so new permissions apply",
          "Short sessions reveal administrator accounts nobody uses",
        ],
        explanation:
          "The higher the privilege, the narrower the risk window must be. An administrative session left open all week on a laptop is the keys to the system sitting outside your control that whole time.",
      },
      l10_q79: {
        question: "Why should error messages not reveal technical detail?",
        options: [
          "That detail lets an attacker map out the system's internals",
          "Users generally do not understand the technical terms involved",
          "Long messages break the layout on small screens",
          "Printing detail to the screen slows the application down",
        ],
        explanation:
          "Table names, library versions and file paths in an error are the pieces for reconstructing the architecture and finding known holes. Detail belongs in internal logs; the user gets a reference code.",
      },
      l10_q80: {
        question: "Why must brute-force protection live at the application layer?",
        options: [
          "A network firewall cannot tell a successful sign-in from a failed one",
          "Brute-force attacks usually come from legitimate registered addresses",
          "The network layer cannot encrypt the contents of a sign-in request",
          "The application knows which passwords are weak so it can warn users",
        ],
        explanation:
          "To the network layer, a thousand failed sign-ins look identical to a thousand successful ones - only the application knows the outcome. So attempt limits, progressive delays and temporary locks belong there.",
      },
      l10_q81: {
        question: "Why separate signing keys from encryption keys?",
        options: [
          "One key one job, so leaking one does not compromise the other",
          "Signing and encryption algorithms use different key lengths",
          "Signing keys need rotating more often than encryption keys",
          "Key management systems forbid one key having two purposes",
        ],
        explanation:
          "Sharing a key across purposes widens the blast radius when it leaks, and occasionally creates attacks because two protocols interact unexpectedly. One key, one job is the basic rule.",
      },
      l10_q82: {
        question: "Why treat every third-party library as attack surface?",
        options: [
          "Their code runs with the full privileges of the application you wrote",
          "Libraries are generally tested less thoroughly than your own code",
          "Popular libraries are the most heavily probed for vulnerabilities",
          "A new version of a library may break backwards compatibility",
        ],
        explanation:
          "An installed package can read environment variables, open network connections and write files - there is no boundary. Which is why supply-chain attacks work so well: compromise one small package and reach thousands of projects.",
      },
      l10_q83: {
        question: "Why sign builds and container images?",
        options: [
          "Whoever deploys can verify that what they run is what you built",
          "Signatures compress container images to a smaller size",
          "Signing records who created the build and at what time",
          "Registries only accept images signed with a valid key",
        ],
        explanation:
          "Between building and running sit a registry, a network and several pairs of hands. A signature is the only proof nobody inserted anything in between - especially when images travel over infrastructure you do not control.",
      },
      l10_q84: {
        question: "Why is capping upload size a security measure?",
        options: [
          "Without a cap, one large enough request exhausts server resources",
          "Large files are more likely to contain malicious code than small ones",
          "The server cannot verify the format of a very large file",
          "Storage costs climb quickly when users upload oversized files",
        ],
        explanation:
          "A request of a few gigabytes is enough to consume the memory and disk of the handling process - denial of service without needing a botnet. The limit must apply before reading, not after receiving.",
      },
      l10_q85: {
        question: "Why invalidate a token the moment a user signs out?",
        options: [
          "A token still within its lifetime works if someone copied it earlier",
          "An uncleared token occupies server memory until it finally expires",
          "The user needs a fresh token issued at each subsequent sign-in",
          "An old token conflicts with the new one when the same user returns",
        ],
        explanation:
          "Signing out on the client merely deletes the token from the browser; a stolen copy stays valid until expiry. For sign-out to mean anything, the server must keep a revocation list.",
      },
      l10_q86: {
        question: "Why check permissions at the data layer and not only in the interface?",
        options: [
          "Hiding a button does not stop anyone calling the API underneath",
          "The interface cannot know all of the complex permission rules",
          "Checking at the data layer runs faster by being nearer the data",
          "The interface updates more slowly, so its rules become outdated",
        ],
        explanation:
          "Hiding a button is user experience, not security. The most common vulnerability in bug reports is changing an id in a URL to view somebody else's data - a URL the interface never displayed.",
      },
      l10_q87: {
        question: "Why compare secret strings in constant time?",
        options: [
          "Comparison stops early on a mismatch, and that timing reveals characters",
          "Ordinary comparison can be wrong when the two strings differ in length",
          "The standard comparison cannot handle strings with special characters",
          "Constant-time comparison runs faster on strings that are very long",
        ],
        explanation:
          "A normal comparison returns as soon as characters differ, so a guess sharing more leading characters takes marginally longer. Measure enough times and each character can be recovered - a timing side channel.",
      },
      l10_q88: {
        question: "Why limit the scope of an access token?",
        options: [
          "A leaked token then opens only its granted part, not everything",
          "A narrow-scope token is smaller, so it travels more quickly",
          "The server processes narrow tokens faster with fewer rights to check",
          "Users understand better what the application is permitted to do",
        ],
        explanation:
          "A read-write-everything token issued to a read-only feature multiplies the damage when it leaks. Narrow scope also makes revocation less disruptive, since it affects exactly one area.",
      },
      l10_q89: {
        question: "Why is SMS two-factor weaker than an authenticator app?",
        options: [
          "A phone number can be seized through the carrier without the device",
          "Messages arrive late, so users often enter an expired code",
          "Codes in messages are shorter and therefore easier to guess",
          "Carriers store message contents, so codes could be read again",
        ],
        explanation:
          "A SIM swap is an administrative procedure an attacker performs with forged documents or bribery - no contact with the victim's phone required. An authenticator app is bound to the device, so that path does not exist.",
      },
      l10_q90: {
        question: "Why assume the system will be breached?",
        options: [
          "The design then focuses on early detection and limiting damage",
          "The assumption helps persuade leadership to fund more security",
          "No system has ever withstood every attack directed at it",
          "A pessimistic assumption keeps the security team alert at all times",
        ],
        explanation:
          "If every effort goes into prevention, then when a breach happens you have nothing: no detection, no containment, no trail. Segmentation, least privilege and audit logs all follow from this assumption.",
      },
      l10_q91: {
        question: "What does a cross-platform app trade against a native one?",
        options: [
          "Write once run twice, at the cost of reaching newest features late",
          "Faster on weak devices, at the cost of a less attractive interface",
          "A smaller install size, at the cost of consuming more battery",
          "Quicker releases, at the cost of not reaching the app stores",
        ],
        explanation:
          "The big saving is one team and one codebase. The price is always being behind: a new operating-system feature waits for the framework, and anything touching hardware deeply still needs native code.",
      },
      l10_q92: {
        question: "Why must a mobile app handle being offline?",
        options: [
          "Patchy mobile networks are the normal condition, not an exception",
          "The operating system closes an app that waits on the network too long",
          "App stores reject applications that do not work offline",
          "Users often disable connectivity to save on their data allowance",
        ],
        explanation:
          "In a lift, on a train, in poor coverage - being offline is a permanent state rather than a rare fault. An app assuming the network is always there fails precisely when the user needs it most.",
      },
      l10_q93: {
        question: "Why limit background work on a mobile device?",
        options: [
          "The system kills battery-hungry apps, and users uninstall them too",
          "Background work cannot access the application's own stored data",
          "Mobile devices cannot run several processes at the same time",
          "Background work is always deferred until the app is reopened",
        ],
        explanation:
          "A mobile operating system puts battery ahead of your app: it suspends, defers and throttles background processes. And users see the battery-usage list in settings - that list is a death row.",
      },
      l10_q94: {
        question: "Why plan the release lifecycle of a mobile app?",
        options: [
          "Users do not update immediately, so old versions live a long time",
          "App stores only allow releases on a fixed monthly schedule",
          "Every release waits weeks in review before it can be published",
          "Users uninstall an app that updates itself too frequently",
        ],
        explanation:
          "Unlike the web, you cannot push a fix to everyone - some users run a version a year old. So the API must stay backwards compatible for a long time, and you need a forced-update path for serious faults.",
      },
      l10_q95: {
        question: "Why is storing a secret inside a mobile app wrong?",
        options: [
          "The package can be downloaded and decompiled, exposing the string",
          "Device storage is unencrypted, so anyone holding the phone can read it",
          "App stores scan submissions and reject apps containing secret keys",
          "Secrets leak when the app sends an automatic crash report",
        ],
        explanation:
          "The app lives on somebody else's device. Decompilation tools are free and available, so every string in the package must be treated as public - even after obfuscation.",
      },
      l10_q96: {
        question: "What problem does a blockchain solve?",
        options: [
          "Parties who distrust each other agreeing on one shared ledger",
          "Storing data at lower cost than a traditional database does",
          "Querying data faster because it is replicated in many places",
          "Securing data better because every record is encrypted",
        ],
        explanation:
          "The problem is consensus without an intermediary. If the parties already trust each other, or one can coordinate, a database is cheaper, faster and far easier to operate.",
      },
      l10_q97: {
        question: "Why is losing a wallet's private key a permanent loss?",
        options: [
          "No party holds a copy or can reissue the key to you",
          "The key stops being valid after a period of no activity",
          "The network reassigns assets if a wallet stays dormant too long",
          "The key only works on the device that originally generated it",
        ],
        explanation:
          "The very property that gives it value - no intermediary - also means there is nobody to call. No password reset, no support desk, no recovery path.",
      },
      l10_q98: {
        question: "Why must a smart contract be audited before deployment?",
        options: [
          "Deployed code cannot be changed, and a fault costs real money",
          "Execution cost depends on the quality of the source code",
          "Networks reject contracts that have not been independently audited",
          "Contracts must be compatible with several protocol versions",
        ],
        explanation:
          "Ordinary software gets patched; a deployed contract is immutable, and the assets can be drained immediately. Combining immutability with real value makes the cost of a fault unusually high.",
      },
      l10_q99: {
        question: "Why should most projects not use a blockchain?",
        options: [
          "They have a trusted coordinator, so they pay the price for nothing",
          "Transaction costs are too high for ordinary consumer users",
          "The technology is not yet mature enough for production use",
          "Regulation in most countries does not yet permit such applications",
        ],
        explanation:
          "A blockchain pays dearly in speed, cost and complexity to buy exactly one thing: no need for a trusted intermediary. If you already have one - and most projects do - you pay and buy nothing.",
      },
      l10_q100: {
        question: "What is the clearest warning sign of a digital-asset scam?",
        options: [
          "Promising high guaranteed returns and pressing you to recruit others",
          "The development team not disclosing their real identities",
          "The project's source code not being published for the public",
          "The asset's value swinging sharply over very short periods",
        ],
        explanation:
          "Guaranteed high return is a financial contradiction, and rewarding recruitment is the definition of a pyramid scheme. The other three are suspicious but also true of many genuine projects.",
      },
      l10_q101: {
        question: "Why do software projects run late?",
        options: [
          "The unknown parts only appear once work starts, but estimates come first",
          "Developers deliberately quote short so the work gets assigned to them",
          "Business requirements always change partway through the project",
          "The team is short-staffed, so the workload piles up over time",
        ],
        explanation:
          "You can estimate what you understand; what you have not understood you do not yet know you have not. Which is why slicing small and tackling the risky part early beats estimating more carefully.",
      },
      l10_q102: {
        question: "Why does adding people to a late project make it later?",
        options: [
          "Existing staff stop to teach, and communication paths multiply",
          "Newcomers need equipment and accounts, which takes time to arrange",
          "The budget is split, so critical work no longer has enough funding",
          "Newcomers write code that does not follow the project's conventions",
        ],
        explanation:
          "Newcomers are unproductive for weeks and consume the time of the people who were productive. The number of pairs who must coordinate grows with the square, so a larger team manufactures its own overhead.",
      },
      l10_q103: {
        question: "Why release a small version early?",
        options: [
          "Real feedback beats any amount of speculation in a meeting room",
          "Releasing early captures the market before a competitor arrives",
          "A small version has fewer defects, so releasing carries less risk",
          "Investors need to see something running before funding continues",
        ],
        explanation:
          "The largest risk is not building it wrong but building the wrong thing. Six months of building in silence is six months betting on an assumption nobody has tested.",
      },
      l10_q104: {
        question: "Why write architecture decision records?",
        options: [
          "Later readers see why it was chosen rather than assuming carelessness",
          "The document helps persuade management to approve the approach",
          "The development process requires documentation for major changes",
          "It helps newcomers understand the whole structure of the system",
        ],
        explanation:
          "Six months on, even you have forgotten what was weighed. Without that context the next person either leaves it alone out of fear or changes it and falls into the same hole - and the rejected options are the most valuable part.",
      },
      l10_q105: {
        question: "Why does working code still need reworking over time?",
        options: [
          "Requirements change, so yesterday's sensible structure gets in the way",
          "Language updates mean the older syntax will no longer run",
          "Old code gets slower as the volume of data keeps increasing",
          "Dependencies stop being supported, forcing a rewrite from scratch",
        ],
        explanation:
          "Code structure reflects what you knew when you wrote it. When the product moves in another direction, the old structure starts resisting every change - and that is when reworking is cheaper than enduring.",
      },
      l10_q106: {
        question: "What is the main benefit of a feature flag?",
        options: [
          "Separating deploying the code from enabling it for users",
          "Allowing a faster rollback of source code when a fault appears",
          "Reducing deployments by shipping several features together",
          "Letting each user choose which features they wish to use",
        ],
        explanation:
          "Code reaches production switched off, so you can deploy continuously without exposing unfinished work, enable for 1% then 10%, and switch off in seconds without redeploying. The cost is the debt of cleaning up old flags.",
      },
      l10_q107: {
        question: "Why automate the deployment process?",
        options: [
          "People doing it by hand make mistakes exactly when pressure is highest",
          "Automation deploys considerably faster than doing it manually",
          "An automated process needs no approval before it runs",
          "Servers only accept deployments from an automated system",
        ],
        explanation:
          "Twelve manual steps at midnight after an incident is a recipe for error. Automation makes the process repeatable and reviewable - speed is a consequence rather than the main reason.",
      },
      l10_q108: {
        question: "Why write blameless incident reviews?",
        options: [
          "People only tell the truth when unafraid, and truth is what fixes things",
          "Assigning blame slows down the writing of the incident report",
          "Incidents are mostly caused by systems rather than by people",
          "A good company culture requires never criticising employees",
        ],
        explanation:
          "If speaking up means being disciplined, the report becomes vague and the real cause is buried. Blamelessness is not leniency - it is the condition for getting the information needed to fix the system.",
      },
      l10_q109: {
        question: "Why measure work in progress across a team?",
        options: [
          "Running many things at once lengthens the time every one of them takes",
          "The count reflects each person's genuine productivity accurately",
          "Managers need the figure to allocate staff between projects",
          "Work left open too long becomes outdated against current requirements",
        ],
        explanation:
          "Five items running in parallel all finish late, and every context switch costs the effort of reloading the problem. Capping work in progress finishes things sooner even though total volume is unchanged.",
      },
      l10_q110: {
        question: "Why is reading other people's code a skill worth practising?",
        options: [
          "Most of the job is understanding existing code, not writing new code",
          "Reading others' code teaches new programming techniques",
          "Reviewers must read quickly so as not to hold up the team",
          "Other people's code is usually written in a harder-to-read style",
        ],
        explanation:
          "Real work is almost always adding a feature to something with hundreds of thousands of existing lines. Whoever reads quickly and accurately edits in the right place; whoever cannot rewrites what already exists.",
      },
      l10_q111: {
        question: "Why ask for help early when stuck?",
        options: [
          "Struggling is useful, but past a threshold it is only waste",
          "Colleagues think well of people who communicate proactively",
          "Experienced people always solve problems faster than newcomers",
          "Asking early reveals which parts of the documentation are missing",
        ],
        explanation:
          "Struggling for a while is how you learn; struggling for three days on something the person beside you solves in ten minutes is not. Many teams set an explicit rule - try for thirty minutes, then ask.",
      },
      l10_q112: {
        question: "Why restate the problem in your own words before starting?",
        options: [
          "A misreading surfaces immediately rather than after the work is done",
          "Restating helps you remember the requirements while working",
          "The restatement becomes the description for later related work",
          "The requester needs confirmation that you received the request",
        ],
        explanation:
          "The most expensive kind of mistake is doing perfectly something nobody asked for. Restating and sending it back takes five minutes and catches the misunderstanding before it becomes two weeks of effort.",
      },
      l10_q113: {
        question: "Why does writing matter for a developer?",
        options: [
          "Most technical decisions are won in prose, not in code",
          "Good documentation reduces the questions other teams ask",
          "Writing well makes commit messages and pull requests clearer",
          "Companies assess performance through written work reports",
        ],
        explanation:
          "Architecture proposals, incident reviews, pull request descriptions - that is where ideas are accepted or ignored. A clear writer has far more influence than an equally skilled colleague who cannot express it.",
      },
      l10_q114: {
        question: "Why build a portfolio of personal projects?",
        options: [
          "It is verifiable evidence, unlike a self-description on a CV",
          "Personal projects teach new technology faster than a course does",
          "Employers require candidates to have an open-source account",
          "A personal project can become a second source of income later",
        ],
        explanation:
          "Anyone can write \"proficient\" on a CV. Something that runs, with readable code, solving a real problem, can be verified by an interviewer in five minutes - and gives you both something to talk about.",
      },
      l10_q115: {
        question: "Why understand the business context of the product you build?",
        options: [
          "Without it you optimise the right technique toward the wrong goal",
          "Understanding the business is a condition for promotion into management",
          "The business context decides which technologies you may use",
          "People who understand the business estimate time more accurately",
        ],
        explanation:
          "Two approaches can both be technically correct, and only context says which is worth doing: a product still searching for customers values speed of experiment; a settled one values reliability.",
      },
      l10_q116: {
        question: "Why keep a steady learning habit rather than cramming?",
        options: [
          "The field keeps moving, and spaced learning sticks far better",
          "Cramming takes more total hours than the same learning spread out",
          "Companies usually require a number of learning hours each year",
          "Steady learning keeps you current with the newest technology",
        ],
        explanation:
          "Knowledge reviewed at intervals is retained far better than the same hours packed into one sitting - that is the main reason. Chasing every new technology is the opposite, and usually a waste.",
      },
      l10_q117: {
        question: "Why assess people risk in a project?",
        options: [
          "One person holding all knowledge of a part is a single point of failure",
          "Staff leaving raises the project's recruitment costs",
          "Larger teams have more conflict during the course of the work",
          "Leadership pays more attention to people risk than technical risk",
        ],
        explanation:
          "Systems have redundancy, but \"only he knows how that works\" does not. That person taking leave during an incident stops the project - and the cure is rotation and documentation, not retention bonuses.",
      },
      l10_q118: {
        question: "Why refuse some feature requests?",
        options: [
          "Every feature added is a permanent maintenance cost thereafter",
          "Too many features make the application heavy and slow to load",
          "The development team lacks the people to build everything requested",
          "Rarely used features clutter the interface and confuse users",
        ],
        explanation:
          "The true cost of a feature is not the first writing but every subsequent edit, test and migration - for the life of the product. That is why a rarely used feature is still expensive.",
      },
      l10_q119: {
        question: "Why measure the impact of a feature after release?",
        options: [
          "Many features change nothing, and only measurement reveals that",
          "Post-release figures help report results to leadership",
          "Measurement uncovers technical faults that testing did not reveal",
          "Users want to see the product improving continually over time",
        ],
        explanation:
          "Most ideas produce no measurable change - a consistent finding wherever anyone measures. Without measuring you keep building on the assumption that everything shipped helped, and that assumption is nearly always wrong.",
      },
      l10_q120: {
        question: "Why treat health as part of professional capability?",
        options: [
          "This work runs on concentration, the first thing burnout destroys",
          "Companies require staff to have annual health check-ups",
          "Healthier people work longer hours and so finish more work",
          "Sitting at a computer causes well-known occupational illnesses",
        ],
        explanation:
          "The output of this job is decisions and attention, not hours in a chair. Poor sleep and exhaustion strike exactly that - and working longer hours to compensate is the spiral that makes it worse.",
      },
    },
  },
  11: {
    title: "Hedge Fund Manager Exam (Level 11)",
    questions: {
      l11_q1: {
        question: "How does a market-neutral strategy keep the portfolio positioned?",
        options: [
          "Balancing long and short positions so portfolio beta sits near zero",
          "Holding only long positions with the fund's entire capital",
          "Trading only derivatives on gold and precious metals",
          "Holding everything in cash and opening no positions at all",
        ],
        explanation:
          "Cancelling beta leaves profit coming only from the spread between the longs and the shorts - from selection skill, not from market direction.",
      },
      l11_q2: {
        question: "How does the Black-Litterman model improve on modern portfolio theory?",
        options: [
          "It blends the market's equilibrium allocation with the manager's own views",
          "It removes risk from the optimisation problem entirely",
          "It applies only to portfolios of cryptocurrencies",
          "It always allocates everything to long-dated government bonds",
        ],
        explanation:
          "Pure Markowitz is hypersensitive to the expected returns you feed it and spits out extreme weights. Anchoring on the market equilibrium makes the result far more stable.",
      },
      l11_q3: {
        question: "What is central bank yield curve control?",
        options: [
          "Buying and selling bonds to pin a target maturity's yield at a set level",
          "Raising property taxes to cool the real estate market",
          "Banning trading in bank stocks during volatile periods",
          "Fixing the domestic gold price at a level the state announces",
        ],
        explanation:
          "Unlike quantitative easing, which fixes the quantity purchased, yield curve control fixes the price and buys however much the market demands.",
      },
      l11_q4: {
        question: "What does a positive Jensen's alpha say about a fund manager?",
        options: [
          "The fund returned more than its systematic risk can explain",
          "The fund is losing money against its benchmark index",
          "The fund is using leverage beyond its mandate",
          "The fund charges investors no management fee at all",
        ],
        explanation:
          "Alpha is what remains after subtracting the return that would have come from simply accepting market risk, which makes it a genuine measure of skill.",
      },
      l11_q5: {
        question: "What advantage does high-frequency trading exploit?",
        options: [
          "Execution speed in microseconds, and automated algorithms",
          "Deep fundamental analysis of a company over many years",
          "Reading and synthesising the daily financial press",
          "Hand-drawing and analysing candlestick patterns on charts",
        ],
        explanation:
          "The edge is infrastructure, not insight: servers colocated at the exchange, dedicated lines, and algorithms reacting before a human can even see the price.",
      },
      l11_q6: {
        question: "What does a global macro strategy focus on?",
        options: [
          "Forecasting global macro shifts and trading them across asset classes",
          "Buying only domestic retail companies' shares",
          "Analysing one single company's financial statements very deeply",
          "Short-term trading of very low-priced stocks",
        ],
        explanation:
          "Rates, currencies, commodities and politics are all variables, and the fund expresses its view through whichever instrument reflects it most cheaply.",
      },
      l11_q7: {
        question: "What does maximum drawdown measure?",
        options: [
          "The deepest peak-to-trough fall over a period",
          "The highest return the fund has ever achieved",
          "How many investors withdrew in the latest reporting period",
          "Total operating costs the fund paid in a financial year",
        ],
        explanation:
          "It measures real pain: it answers how much someone who bought exactly at the top had to endure before recovering.",
      },
      l11_q8: {
        question: "How do a long/short fund's gross and net exposure differ?",
        options: [
          "Gross adds both sides together, net is the difference between long and short",
          "Gross is at market value, net at original cost",
          "Gross counts only longs, net counts only shorts",
          "The two are always equal for a fund using leverage",
        ],
        explanation:
          "Net exposure says how much directional market risk is carried; gross exposure says how much leverage is really in place. A fund at zero net can still be very risky.",
      },
      l11_q9: {
        question: "What is the biggest risk in a pairs trading strategy?",
        options: [
          "The historical relationship between the two names can break permanently",
          "Trading costs rise because two offsetting positions must be opened",
          "Profit is capped at the spread between the two names at entry",
          "It cannot be applied to stocks listed on the same exchange",
        ],
        explanation:
          "The strategy bets the spread will narrow again. When one of the two businesses changes in nature, the spread can widen forever.",
      },
      l11_q10: {
        question: "What does a high-water mark clause in a fee structure achieve?",
        options: [
          "It stops the fund charging performance fees twice on the same gain",
          "It guarantees investors a minimum promised return",
          "It caps the total management fee chargeable in a year",
          "It lets the manager withdraw their own capital ahead of investors",
        ],
        explanation:
          "After a losing year the fund has to climb back to its old peak before performance fees resume, otherwise investors pay twice for the same profit.",
      },
      l11_q11: {
        question: "Why does a successful strategy usually run into a capacity limit?",
        options: [
          "The larger the capital, the more market impact on entry and exit erodes the return",
          "Regulators cap the assets a single fund may raise",
          "Operating costs rise exponentially once the fund passes a size threshold",
          "Institutional investors may not place more than a set share in one fund",
        ],
        explanation:
          "Opportunities in the market have a finite size. This is why many good funds close to new money rather than take more and get worse.",
      },
      l11_q12: {
        question: "How does a margin spiral work in a crisis?",
        options: [
          "Falling prices force liquidation, and the selling drives prices lower still",
          "Banks cut margin lending rates in unison to support the market",
          "Investors post more margin, so market liquidity rises",
          "Regulators halt trading until prices return to previous levels",
        ],
        explanation:
          "This is the positive feedback loop that turns an ordinary fall into a collapse, and it is why leverage raises risk non-linearly rather than proportionally.",
      },
      l11_q13: {
        question: "Where does an event-driven strategy make its money?",
        options: [
          "Price gaps around corporate events such as mergers or restructurings",
          "The long-run trend of the whole equity market over many years",
          "Interest rate differences between countries with different policies",
          "Seasonal cycles in basic commodity prices",
        ],
        explanation:
          "The main risk is not market direction but deal breakage: if the transaction is blocked, the spread that was narrowing blows straight back out.",
      },
      l11_q14: {
        question: "Why must a hedge fund care about its prime brokerage terms?",
        options: [
          "The prime broker can change margin terms at the tightest possible moment",
          "The prime broker decides which strategies the fund may run",
          "The prime broker compensates the fund for losses beyond a threshold",
          "The prime broker is the only party permitted to value the fund's assets",
        ],
        explanation:
          "Funding can be pulled exactly when it is needed most. Many funds collapse not because the bet was wrong but because the financing vanished before the thesis had time to be right.",
      },
      l11_q15: {
        question: "Which two positions does convertible arbitrage usually combine?",
        options: [
          "Buying the convertible bond and shorting the matching underlying stock",
          "Buying preferred shares and shorting government bonds of the same maturity",
          "Buying a call and selling a put on the same underlying",
          "Buying corporate bonds and selling index futures",
        ],
        explanation:
          "A convertible bond contains an embedded call. Shorting the underlying neutralises the directional risk, leaving the fund with the option's mispricing and the coupon stream.",
      },
      l11_q16: {
        question: "Why do hedge funds impose lock-up and redemption restrictions?",
        options: [
          "To stop a rush of withdrawals forcing fire sales of illiquid assets",
          "To guarantee investors the minimum return promised in the contract",
          "To avoid periodic disclosure obligations to the regulator",
          "To allow management fees above the regulatory cap",
        ],
        explanation:
          "Lock-ups solve a liquidity mismatch: the assets need time to exit while investors want out now. Without them, a panicked redemption wave manufactures the very loss everyone fears.",
      },
      l11_q17: {
        question: "Why does leverage raise the risk of ruin even when a strategy has positive expected return?",
        options: [
          "Because a temporary losing streak can trigger margin calls and force positions closed",
          "Because leverage cuts the strategy's expected return below the risk-free rate",
          "Because current rules forbid funds from leveraging beyond twice their capital",
          "Because the interest cost of leverage always exceeds the strategy's gross profit",
        ],
        explanation:
          "This is path-dependent ruin: a long-run expectation cannot save a position closed out midway. Leverage shortens the distance between an ordinary swing and the point where the position can no longer be held.",
      },
      l11_q18: {
        question: "Why should hedge fund returns be quoted on survivorship-adjusted data?",
        options: [
          "Because funds that closed after losses have vanished from the database",
          "Because regulators require every fund to publish inflation-adjusted data",
          "Because unadjusted data misstates management and performance fees",
          "Because new funds lack the history to compare against a benchmark",
        ],
        explanation:
          "Industry indices aggregate only the funds still alive, so the failures have been erased from the sample. The average performance observed is therefore higher than what investors actually lived through.",
      },
      l11_q19: {
        question: "When does basis risk arise in a hedged position?",
        options: [
          "When the hedging instrument and the asset being protected do not move in lockstep",
          "When the hedge contract size exceeds the underlying holding",
          "When the hedge expires on the same day the underlying is sold",
          "When the hedge counterparty is downgraded",
        ],
        explanation:
          "Hedges are rarely perfect: using Brent futures to protect a different crude, or a sector index to protect one stock. Whatever difference remains is basis risk.",
      },
      l11_q20: {
        question: "Why can a two-and-twenty fee structure encourage excessive risk-taking?",
        options: [
          "Because the manager takes a large share of the gains but none of the losses",
          "Because a two percent management fee forces the fund to target a very high return",
          "Because performance fees are only paid after ten continuous years of operation",
          "Because investors can demand fees back if the fund loses money in a year",
        ],
        explanation:
          "A performance fee is structured like a call option granted to the manager: the upside is theirs, the downside is not. A high-water mark and personal capital alongside investors are the two usual ways to soften that misalignment.",
      },
    },
  },
  12: {
    title: "Strategic Portfolio Management Exam (Level 12)",
    questions: {
      l12_q1: {
        question: "How does strategic asset allocation differ from tactical?",
        options: [
          "Strategic is the long-run weighting; tactical is a temporary tilt around it",
          "Strategic applies to equities and tactical to bonds",
          "Strategic is set by the investor and tactical by the regulator",
          "Strategic is reviewed quarterly while tactical is fixed for the year",
        ],
        explanation:
          "Research shows most of the long-run variation in returns comes from the strategic weights, not from tactical adjustments.",
      },
      l12_q2: {
        question: "What does liability-driven investing put first?",
        options: [
          "Matching the cash flows and rate sensitivity of assets to future obligations",
          "Maximising the portfolio's absolute return each financial year",
          "Cutting management costs to the lowest among comparable funds",
          "Tracking a chosen benchmark index as closely as possible",
        ],
        explanation:
          "For a pension fund or insurer, the real risk is the gap between assets and liabilities, not the volatility of the assets on their own.",
      },
      l12_q3: {
        question: "What advantage does threshold rebalancing have over calendar rebalancing?",
        options: [
          "It only trades when weights have genuinely drifted far, so it costs less",
          "It keeps the portfolio exactly on target weights at every moment",
          "It removes any need to monitor the portfolio between review dates",
          "It ensures the portfolio outperforms its benchmark over the long run",
        ],
        explanation:
          "Calendar rebalancing can trade when nothing needs trading, or miss a large drift between two dates. A threshold ties the action to the actual drift.",
      },
      l12_q4: {
        question: "What does a portfolio's tracking error measure?",
        options: [
          "The standard deviation of the return difference against the benchmark",
          "The absolute distance between portfolio return and the risk-free rate",
          "How often the portfolio has to be rebalanced in a year",
          "The gap between the portfolio's book value and its market value",
        ],
        explanation:
          "Low tracking error means the portfolio hugs the index. It says nothing about whether the portfolio is good - only how far it differs.",
      },
      l12_q5: {
        question: "How does the information ratio differ from the Sharpe ratio?",
        options: [
          "It measures excess return over the index against tracking error, not total risk",
          "It leaves risk out of the calculation entirely",
          "It applies only to passive index portfolios",
          "It uses pre-fee returns while Sharpe uses post-fee returns",
        ],
        explanation:
          "Sharpe asks whether the portfolio was worth it against a deposit. The information ratio asks whether the active manager was worth it against simply buying the index.",
      },
      l12_q6: {
        question: "On what principle does a risk parity strategy allocate capital?",
        options: [
          "Each asset class contributes an equal share of the portfolio's risk",
          "Each asset class receives an equal share of capital by value",
          "Absolute priority goes to the class with the highest expected return",
          "Weights follow each class's market capitalisation",
        ],
        explanation:
          "A traditional 60/40 looks balanced by capital while almost all its risk comes from equities. Risk parity fixes exactly that, usually by levering the bonds.",
      },
      l12_q7: {
        question: "Where does the liquidity premium in private investing come from?",
        options: [
          "Investors demand a higher return for having capital locked up for years",
          "Unlisted companies always grow faster than listed ones",
          "Private funds are exempt from most tax on investment gains",
          "Private assets are marked to market every day",
        ],
        explanation:
          "Part of the apparent excess return on private assets is also a statistical illusion: infrequent valuation makes measured volatility artificially low.",
      },
      l12_q8: {
        question: "What should the currency hedging decision for an international portfolio rest on?",
        options: [
          "Whether the currency adds risk without a matching expected return",
          "The research team's forecast for the exchange rate next year",
          "The hedging cost the counterparty bank is quoting on forwards",
          "Whether foreign assets have passed half the portfolio",
        ],
        explanation:
          "For foreign bonds, currency moves usually exceed the yield itself, so hedging is close to mandatory; for equities the argument is far weaker.",
      },
      l12_q9: {
        question: "What question does performance attribution answer?",
        options: [
          "Whether the excess return came from sector choice, stock choice or another factor",
          "Whether the portfolio hit the absolute return promised to investors",
          "What share of assets went to trading costs in the period",
          "Whether the manager complied with the mandate's investment limits",
        ],
        explanation:
          "Without attribution you cannot separate a manager who is good at picking stocks from one who simply happened to be overweight the sector that won.",
      },
      l12_q10: {
        question: "How does a pension glide path work over the life of the plan?",
        options: [
          "Equity weight is reduced steadily as retirement approaches",
          "Equity weight is raised steadily to recover returns lost earlier",
          "Asset class weights are held constant for the plan's whole life",
          "Everything moves to cash once the member turns fifty",
        ],
        explanation:
          "Someone with many working years left can absorb volatility because they have time to recover and income still coming in. Someone near retirement has neither.",
      },
      l12_q11: {
        question: "What does tax-loss harvesting achieve?",
        options: [
          "Realising a loss to offset against taxable capital gains in the period",
          "Reducing the management fee the investor pays the fund company",
          "Raising the portfolio's pre-tax return by restructuring losing positions",
          "Eliminating capital gains tax entirely over the long run",
        ],
        explanation:
          "This is deferral, not forgiveness: the new cost basis is lower, so the tax comes back when the position is finally sold.",
      },
      l12_q12: {
        question: "Why does picking the right benchmark matter so much?",
        options: [
          "The wrong index makes measured alpha reflect style drift rather than skill",
          "The index sets the maximum management fee the fund may charge",
          "The index determines the list of assets the fund must hold",
          "The index directly affects the end investor's tax liability",
        ],
        explanation:
          "A small-cap fund measured against a large-cap index will look like it has alpha through every stretch that small caps win, with no skill involved at all.",
      },
      l12_q13: {
        question: "Besides the number of holdings, where does concentration risk show up?",
        options: [
          "Different names all exposed to the same underlying risk factor",
          "How many trades the portfolio makes each month",
          "The cash weight routinely held in the portfolio",
          "The bid-ask spread on the assets held",
        ],
        explanation:
          "Thirty stocks all sensitive to interest rates are no more diversified than five. Diversification has to be counted in risk factors, not in tickers.",
      },
      l12_q14: {
        question: "Why is an investor's return usually below the return of the fund they own?",
        options: [
          "Because money flows in and out at the wrong times: buying after rises, selling after falls",
          "Because the fund deducts its management fee before publishing the return",
          "Because fund returns are always pre-tax while investors are taxed",
          "Because retail investors pay higher trading costs than institutions",
        ],
        explanation:
          "This gap has been measured many times and usually runs to several percentage points a year - it is the cost of behaviour, not of the product.",
      },
      l12_q15: {
        question: "How should past performance be used when selecting a fund manager?",
        options: [
          "As a fact that the process must be able to explain, not as proof of skill",
          "As the single most important criterion, since it proves demonstrated ability",
          "Ignored completely, since past performance carries no information at all",
          "Only when the evaluation window is shorter than the last three years",
        ],
        explanation:
          "Given how noisy markets are, separating skill from luck takes many years of data. Understanding the process that produced the result gets you there far faster.",
      },
      l12_q16: {
        question: "In an allocation framework, what role is a defensive asset expected to play?",
        options: [
          "Holding value or rising when risk assets fall hard, softening the drawdown",
          "Producing the highest expected return of any class in the portfolio",
          "Removing any chance of a negative annual return",
          "Replacing the need to hold cash for short-term spending",
        ],
        explanation:
          "A defensive asset's value is not in its expected return but in when it pays: exactly while the rest of the portfolio is taking its heaviest damage.",
      },
      l12_q17: {
        question: "Why can the correlation between equities and government bonds flip from negative to positive?",
        options: [
          "Because when inflation dominates, rising rates hit both at once",
          "Because regulators adjust the maximum holdings funds may carry",
          "Because government bonds lose their top credit rating",
          "Because government bond issuance exceeds the equity market's capitalisation",
        ],
        explanation:
          "In a growth-dominated regime, bad economic news pushes equities down and bonds up. When inflation dominates, rising rates hit both at once - the diversification shield fails exactly when it is needed most.",
      },
      l12_q18: {
        question: "What is implementation slippage in trade execution?",
        options: [
          "The gap between the price expected at the decision and the price actually filled",
          "The fixed brokerage commission charged on each order",
          "The income tax arising when a profitable asset is sold",
          "The gap between today's close and tomorrow's open",
        ],
        explanation:
          "Slippage is hidden but usually exceeds commission on large orders, because the act of trading itself pushes the price the wrong way.",
      },
      l12_q19: {
        question: "Why does a fund with long-dated obligations favour long-dated bonds?",
        options: [
          "Because the assets' duration then matches the liabilities' duration",
          "Because long bonds always yield more, guaranteeing enough to pay out",
          "Because long bonds are less price-volatile than short ones",
          "Because the law forbids pension funds from holding assets under five years",
        ],
        explanation:
          "A pension obligation far in the future is as rate-sensitive as a long bond. Matching duration on both sides means a rate move does not tear open the gap between assets and liabilities.",
      },
      l12_q20: {
        question: "Why distinguish time-weighted from money-weighted return?",
        options: [
          "Because time-weighted measures skill, money-weighted measures the actual experience",
          "Because time-weighted applies to open-ended funds and money-weighted to closed-ended",
          "Because the two always give identical answers when there are no cash flows",
          "Because international standards recognise only money-weighted return in reports",
        ],
        explanation:
          "A manager does not control when investors put money in or take it out, so time-weighted is the fair measure of skill. Money-weighted includes the effect of that timing, which is what the investor actually received.",
      },
    },
  },
  13: {
    title: "Market Mastery Exam (Level 13)",
    questions: {
      l13_q1: {
        question: "What cost does the bid-ask spread on the order book represent?",
        options: [
          "The immediate cost of demanding a fill right now",
          "The brokerage commission charged on each trade",
          "The income tax owed on the gain when securities are sold",
          "The custody fee charged on the portfolio held",
        ],
        explanation:
          "Whoever sends a market order pays that spread to the market maker; whoever posts a limit order earns it, at the price of not being sure of a fill.",
      },
      l13_q2: {
        question: "What is a market maker's inventory risk?",
        options: [
          "The price moving against them while they hold a position from filling clients",
          "Clients cancelling orders before they reach the book",
          "The rising cost of colocated server infrastructure",
          "Regulators requiring full disclosure of positions held",
        ],
        explanation:
          "This is why spreads widen as volatility rises: the maker demands more compensation for carrying inventory in a market that is hard to read.",
      },
      l13_q3: {
        question: "What does the volatility surface reveal that Black-Scholes does not assume?",
        options: [
          "Implied volatility varies by strike and by maturity",
          "Option prices always exceed intrinsic value at every moment",
          "The risk-free rate moves continuously over the contract's life",
          "The underlying pays no dividend while the option is held",
        ],
        explanation:
          "The model assumes a single volatility. The market instead prices far-from-the-money options higher, producing the volatility smile - evidence of fat tails.",
      },
      l13_q4: {
        question: "Buying a call and a put at the same strike is a bet on what?",
        options: [
          "A large price move, in either direction",
          "The price rising steadily throughout the holding period",
          "The price staying nearly still until expiry",
          "Implied volatility falling below realised volatility",
        ],
        explanation:
          "The position wins when the price travels far either way, and loses when it stands still, because the time value of both options decays together.",
      },
      l13_q5: {
        question: "Where does gamma scalping make its money?",
        options: [
          "Rebalancing continuously to harvest the underlying's oscillation",
          "Holding options to expiry to collect the full intrinsic value",
          "The price gap for one option listed on two different exchanges",
          "The premium collected from writing contracts to other investors",
        ],
        explanation:
          "An option buyer is long gamma, so every rebalance buys low and sells high. That gain has to exceed the time value lost each day.",
      },
      l13_q6: {
        question: "Why do correlations between asset classes shift with the market regime?",
        options: [
          "In a crisis, the need for cash drives prices more than each asset's own character",
          "Exchanges adjust price limits when markets turn volatile",
          "Institutions are required to hold the same basket of assets",
          "Benchmarks are recomputed on new weights each quarter",
        ],
        explanation:
          "When the reason for selling has nothing to do with the asset itself, everything gets sold - and diversification disappears exactly when it is needed.",
      },
      l13_q7: {
        question: "When does a short squeeze occur?",
        options: [
          "Short sellers are forced to buy back, and that buying pushes the price higher still",
          "The company issues new shares, diluting existing ownership",
          "The regulator suspends short selling across the whole market",
          "Institutions sell in unison and liquidity dries up fast",
        ],
        explanation:
          "A short position has unlimited loss, so the pressure to close creates a positive feedback loop that carries the price far from any fundamental value.",
      },
      l13_q8: {
        question: "Why do stocks often move sharply around index rebalancing dates?",
        options: [
          "Index funds must buy and sell to the new weights at the same moment",
          "Companies usually publish results on exactly that day",
          "The exchange widens price limits during the rebalancing session",
          "Retail investors tend to trade more at quarter end",
        ],
        explanation:
          "The demand comes from a constraint, not from a view on value, so it creates temporary price pressure that other funds try to exploit.",
      },
      l13_q9: {
        question: "What underlying assumption separates momentum investing from value investing?",
        options: [
          "Momentum assumes trends persist; value assumes prices revert to fair",
          "Momentum applies only to equities and value only to corporate bonds",
          "Momentum rests on financial statements and value on past price data",
          "Momentum requires long holding periods and value requires frequent trading",
        ],
        explanation:
          "The two assumptions contradict each other yet both have empirical support, and they tend to win in different periods - which is why many funds hold both.",
      },
      l13_q10: {
        question: "What is a market circuit breaker for?",
        options: [
          "Pausing trading so participants have time to reassess the information",
          "Ensuring share prices never fall below the company's book value",
          "Stopping foreign investors from net selling beyond a set share",
          "Forcing funds to disclose their positions during the session",
        ],
        explanation:
          "The argument for it is that it stops a panic-driven selling spiral; the argument against is that it merely pushes the selling into the next session and worsens liquidity.",
      },
      l13_q11: {
        question: "What risk does market positioning crowded on one side create?",
        options: [
          "Even a small contrary headline can trigger a wave of simultaneous unwinding",
          "Liquidity increases and spreads narrow",
          "The cost of borrowing stock to short falls unusually low",
          "Implied volatility drops far below realised volatility",
        ],
        explanation:
          "Once everyone is on the same side there are no new buyers left, and any move the other way is amplified by the exit itself.",
      },
      l13_q12: {
        question: "What does an upward-sloping implied volatility term structure say?",
        options: [
          "The market expects higher volatility at longer maturities",
          "Short-dated options are priced above long-dated ones",
          "The underlying will rise over the remaining life of the contract",
          "The risk-free rate is expected to fall across future maturities",
        ],
        explanation:
          "This is the normal shape in calm markets. It inverts in a crisis, when short-dated volatility spikes above the long end.",
      },
      l13_q13: {
        question: "Why does macro liquidity affect the valuation of every asset class?",
        options: [
          "It changes the discount rate and the risk appetite of the whole market",
          "It directly affects the accounting profit of listed companies",
          "It determines the sector weights index funds must hold",
          "It sets the minimum bid-ask spread allowed on exchanges",
        ],
        explanation:
          "The same future cash flow is worth something quite different once rates and the risk premium move, and that applies across every asset class at once.",
      },
      l13_q14: {
        question: "What is the trade-off between a limit order and a market order?",
        options: [
          "Certainty about price, but no certainty of being filled",
          "Certainty of a fill, but at a higher trading fee",
          "Priority ahead of every other order at the same price",
          "Validity only in the opening and closing auctions",
        ],
        explanation:
          "Non-execution risk is real and expensive: missing a large move usually costs far more than the spread the limit order saved.",
      },
      l13_q15: {
        question: "Why does implied volatility usually exceed the volatility that follows?",
        options: [
          "Option sellers demand a premium for the risk they carry for the buyer",
          "Option pricing models have a systematic one-directional error",
          "Retail investors always estimate volatility above institutions",
          "Exchanges set a minimum volatility when listing options",
        ],
        explanation:
          "This is the volatility risk premium, and it is why option-selling strategies have positive expectancy - paid for with rare but very deep losses.",
      },
      l13_q16: {
        question: "Why does market liquidity tend to evaporate exactly as volatility spikes?",
        options: [
          "Because market makers widen spreads and shrink their quoted size",
          "Because exchanges shorten the trading session during volatile periods",
          "Because limit orders are automatically cancelled once volatility crosses a threshold",
          "Because retail investors are restricted from placing orders in volatile sessions",
        ],
        explanation:
          "Market makers earn the spread but carry inventory risk. High volatility makes that risk jump, so they pull depth and widen quotes - liquidity thins exactly when it is needed most.",
      },
      l13_q17: {
        question: "What does the volatility smile in the options market show?",
        options: [
          "Options far from the current strike carry higher implied volatility than at-the-money ones",
          "Implied volatility is identical at every strike, exactly as Black-Scholes assumes",
          "Implied volatility always declines as the contract's maturity lengthens",
          "Option prices do not depend on the strike chosen",
        ],
        explanation:
          "The market prices extreme moves as more probable than a normal distribution allows, so options at both ends are relatively dear. It is empirical evidence that the Black-Scholes assumption does not match reality.",
      },
      l13_q18: {
        question: "Buying out-of-the-money options on both sides is a bet on what?",
        options: [
          "A very large move in the underlying, direction irrelevant",
          "The underlying trading sideways until expiry",
          "Implied volatility falling below realised volatility",
          "The issuer paying a higher dividend than expected",
        ],
        explanation:
          "The position is cheaper than buying at the money but needs a bigger move to pay. Its enemies are time and calm - time value erodes both legs if the market does not move.",
      },
      l13_q19: {
        question: "Why can the growing share of passive money affect the market's price structure?",
        options: [
          "Because buying to index weights allocates capital regardless of valuation",
          "Because passive funds are legally barred from holding small caps",
          "Because passive funds always trade more frequently than active ones",
          "Because passive funds may only buy and never sell",
        ],
        explanation:
          "Index flows allocate by market-cap weight rather than by valuation, so large stocks receive more money simply for being large. The worry is that price discovery weakens once the passive share gets high enough.",
      },
      l13_q20: {
        question: "What problem does gap risk create for a stop-loss order?",
        options: [
          "The price can jump straight past the stop and fill far below it",
          "The exchange automatically cancels stop orders when the market gaps",
          "Stop orders only trigger after the session has closed",
          "Stop orders cannot be used on highly liquid stocks",
        ],
        explanation:
          "A stop is a trigger instruction, not a guarantee of price. Bad news overnight opens the market far below the stop, and the market order fills right there.",
      },
    },
  },
  14: {
    title: "Supreme Financial Leadership Exam (Level 14)",
    questions: {
      l14_q1: {
        question: "What is the founding principle of corporate capital allocation?",
        options: [
          "Capital flows to wherever the return most exceeds the cost of capital",
          "Split evenly across divisions to keep things fair internally",
          "Absolute priority to whichever division brings in the most revenue",
          "Keep last year's split, to maintain stability",
        ],
        explanation:
          "Allocating by history or by internal political weight is the most common way a company destroys value without anyone noticing.",
      },
      l14_q2: {
        question: "When does a buyback create more value than a dividend?",
        options: [
          "When the shares trade below management's estimate of intrinsic value",
          "When the company wants to signal a commitment to steady payouts",
          "When the company needs to retain cash to expand production",
          "When a major shareholder's stake must be held at its current level",
        ],
        explanation:
          "Buying back above intrinsic value transfers value from the shareholders who stay to the ones who sell - which happens often, because companies tend to buy when cash is plentiful.",
      },
      l14_q3: {
        question: "What does a company targeting a particular credit rating give up?",
        options: [
          "Part of the tax shield, in exchange for cheaper debt and reliable market access",
          "A higher cost of equity, in exchange for a lower debt level",
          "Its dividend payout, reduced to the minimum for years",
          "Any ability to pursue mergers and acquisitions",
        ],
        explanation:
          "The theoretically optimal capital structure usually implies more debt than a safe rating allows - this is a deliberate trade-off, not a mistake.",
      },
      l14_q4: {
        question: "Why do internal hurdle rates usually sit above WACC?",
        options: [
          "To offset the systematic optimism in the proposing division's forecasts",
          "Because regulators require a minimum discount rate",
          "Because WACC only applies to tangible fixed-asset projects",
          "To ensure every project pays back within three years",
        ],
        explanation:
          "Setting the hurdle too high then kills good projects. The cleaner fix is repairing the forecasting process rather than compensating with an arbitrary number.",
      },
      l14_q5: {
        question: "What should a company whose ROIC sits below its WACC do?",
        options: [
          "Shrink rather than grow, because growth destroys more value",
          "Push revenue growth to gain scale and improve margins",
          "Borrow cheaply to pull the blended cost of capital below ROIC",
          "Pay out all profit and stop investing entirely",
        ],
        explanation:
          "Every extra dong invested in an activity returning less than the cost of capital leaves shareholders poorer, so growth here destroys value faster.",
      },
      l14_q6: {
        question: "Why is working capital an underrated financial lever?",
        options: [
          "Improving it releases cash without raising a single dong externally",
          "It does not appear in the financial statements, so investors do not examine it",
          "The tax authority allows it to be fully deducted from taxable income",
          "It grows automatically with revenue without any intervention",
        ],
        explanation:
          "Shortening collection days and lengthening payment days can free up as much as a funding round - with no interest and no dilution.",
      },
      l14_q7: {
        question: "What should a corporate FX hedging policy start from?",
        options: [
          "The genuine cash flow exposure and the tolerance for volatility",
          "Treasury's forecast for the exchange rate over the next twelve months",
          "The price the counterparty bank is quoting on forward contracts",
          "The hedging convention peers in the industry are following",
        ],
        explanation:
          "Hedging based on an exchange-rate forecast is organised speculation. Good policy starts from how much volatility the business can actually absorb.",
      },
      l14_q8: {
        question: "Why does managing loan covenants matter so much?",
        options: [
          "Breaching one covenant can make the entire loan fall due immediately",
          "Covenants determine the interest rate the company pays",
          "They let the bank sit directly on the board",
          "They set the order of repayment in a bankruptcy",
        ],
        explanation:
          "Cross-default clauses between agreements mean a small breach on one loan can pull the entire debt structure due at the same moment.",
      },
      l14_q9: {
        question: "Where does discipline in M&A show up most clearly?",
        options: [
          "Willingness to walk away once the price passes what the thesis can support",
          "Completing the deal on the timetable promised to the market",
          "Hiring the most reputable financial adviser available",
          "Ensuring the deal is accretive to earnings per share in year one",
        ],
        explanation:
          "The sunk cost of due diligence and the pressure of a public announcement make walking away psychologically very hard - which is exactly when discipline is worth the most.",
      },
      l14_q10: {
        question: "How should investor relations handle bad news?",
        options: [
          "Disclose early and fully, with a concrete plan to address it",
          "Wait until there is enough information to present a complete picture",
          "Release it alongside good news to balance the market's reaction",
          "Brief the largest shareholders privately before disclosing widely",
        ],
        explanation:
          "The last option also breaches fair disclosure. Credibility is built over years and lost the moment the market discovers something was withheld.",
      },
      l14_q11: {
        question: "What is the risk of tying executive pay to EPS?",
        options: [
          "It encourages buybacks and borrowing instead of creating real value",
          "It makes management too cautious and costs them growth opportunities",
          "It pushes compensation beyond what the company can afford",
          "It forces the company to report quarterly instead of annually",
        ],
        explanation:
          "EPS can be lifted by shrinking the denominator or borrowing cheaply, with no improvement in the business. Tying pay to ROIC or economic value added is far harder to game.",
      },
      l14_q12: {
        question: "How does scenario planning differ from point forecasting?",
        options: [
          "It prepares for several futures instead of betting on one number",
          "It uses more historical data, so its results are more accurate",
          "It applies only to plans beyond five years, not to budgets",
          "It removes the need to make any assumptions about the future",
        ],
        explanation:
          "The value lies in having the response to each scenario ready in advance, so decisions are made before time pressure and emotion arrive.",
      },
      l14_q13: {
        question: "What is the board's core role in corporate governance?",
        options: [
          "Overseeing management on the shareholders' behalf, not managing for them",
          "Taking part directly in the company's day-to-day operating decisions",
          "Representing the interests of the largest shareholder bloc",
          "Approving every contract above an internal threshold",
        ],
        explanation:
          "A board that drifts into managing loses the ability to oversee itself. Independent directors exist precisely to defend that boundary.",
      },
      l14_q14: {
        question: "How should the cost of capital be set for a project outside the core business?",
        options: [
          "On the risk of that field itself, not on the company's WACC",
          "On the company's WACC, since that is the cost actually being borne",
          "On the bank rate charged for the loan funding the project",
          "On the average return the company has achieved historically",
        ],
        explanation:
          "Using one blended WACC accepts every high-risk project and rejects every low-risk one - a bias that accumulates into a portfolio nobody intended.",
      },
      l14_q15: {
        question: "What must a group's cash policy balance?",
        options: [
          "Resilience to shocks against the opportunity cost of idle cash",
          "Short-term deposit yields against the tax owed on that interest",
          "The cash balance against inventory value at each quarter end",
          "Cash as a share of equity, against the industry convention",
        ],
        explanation:
          "Holding too much cash is punished by investors because it returns less than the cost of capital; holding too little means one liquidity shock can end the company.",
      },
      l14_q16: {
        question: "Which metric best evaluates management over the long run?",
        options: [
          "Return on invested capital against the cost of capital, across cycles",
          "Revenue growth achieved against industry peers",
          "The share price at the end of each financial year",
          "Earnings per share as reported in the quarterly statements",
        ],
        explanation:
          "The share price is driven largely by the market as a whole, and both revenue and EPS can rise without value being created. The ROIC-to-WACC gap cannot be gamed.",
      },
      l14_q17: {
        question: "Why should a company review its business portfolio periodically?",
        options: [
          "Because each arm must be tested for whether it still earns above the cost of capital",
          "Because accounting standards require every business line to be revalued annually",
          "Because competition regulators cap how many industries one company may enter",
          "Because divesting always creates more value than continuing to operate",
        ],
        explanation:
          "Capital sitting in a business that earns below its cost of capital is capital being destroyed. A periodic review forces the hard question: if we did not own this today, would we buy it?",
      },
      l14_q18: {
        question: "Why does a steady dividend signal something different from a buyback?",
        options: [
          "Because cutting a dividend is punished heavily, so maintaining one is a commitment",
          "Because the law allows buybacks only once a year",
          "Because dividends are untaxed while buybacks are not",
          "Because buybacks do not change the number of shares outstanding",
        ],
        explanation:
          "Management knows a dividend cut provokes a fierce reaction, so they only raise the dividend when they believe the cash flow will last. A buyback is flexible, and therefore carries far less commitment.",
      },
      l14_q19: {
        question: "When a company weighs issuing new shares, which factor deserves the closest scrutiny?",
        options: [
          "The dilution against the return on the project the money will fund",
          "How many brokerages are willing to underwrite the issue",
          "Whether the issue clashes with the reporting season",
          "The par value printed on the share certificate",
        ],
        explanation:
          "An equity issue only creates value if the project it funds returns more than the existing shareholders give up in dilution. Selling shares cheaply to fund a mediocre project is the fastest way to destroy value.",
      },
      l14_q20: {
        question: "Why should management be careful about making revenue growth the headline target?",
        options: [
          "Because revenue can be bought by sacrificing margin",
          "Because revenue is the one figure independent auditors do not verify",
          "Because the tax authority taxes the incremental revenue directly",
          "Because revenue growth cannot be measured objectively",
        ],
        explanation:
          "Revenue is easy to buy with discounts, looser credit terms or expensive acquisitions. Growth only means something when it comes with a return on invested capital above the cost of capital.",
      },
    },
  },
  15: {
    title: "Wall Street Grand Captain Exam (Level 15)",
    questions: {
      l15_q1: {
        question: "What is systemic risk in the financial-stability sense?",
        options: [
          "One institution's failure spreading until the whole system seizes up",
          "Broad market risk that diversification cannot remove",
          "The risk of one company failing to pay its debts as they fall due",
          "The risk of rate moves changing the value of a bond portfolio",
        ],
        explanation:
          "This is one of the most confused pairs of terms: systematic risk in portfolio theory is the second option, an entirely different idea from this one.",
      },
      l15_q2: {
        question: "What is Tier 1 capital in the Basel framework for?",
        options: [
          "Absorbing losses while the bank keeps operating normally",
          "Paying depositors if the bank goes bankrupt",
          "Ensuring the bank can always meet short-term withdrawals",
          "Funding the bank's long-term lending",
        ],
        explanation:
          "An important distinction: capital absorbs losses while the bank is alive, while the third option describes the liquidity ratios - two tools for two different problems.",
      },
      l15_q3: {
        question: "Why are banks structurally fragile?",
        options: [
          "They fund short and lend long, creating an inherent maturity mismatch",
          "Regulators cap the deposit rate they may offer",
          "They must hold a high share of government bonds in total assets",
          "They are not permitted to use derivatives to hedge",
        ],
        explanation:
          "Maturity transformation is a bank's economic function, not a flaw. But it also means a perfectly sound bank can still collapse from a loss of confidence.",
      },
      l15_q4: {
        question: "What does central clearing do to counterparty risk in derivatives?",
        options: [
          "Concentrates it in one node, at the cost of making that node critical",
          "Removes counterparty risk from the financial system entirely",
          "Transfers the risk onto the state regulator",
          "Spreads the risk evenly across every market participant",
        ],
        explanation:
          "A clearing house cuts the tangled web of bilateral obligations, but it becomes the point whose failure would have consequences nobody can model.",
      },
      l15_q5: {
        question: "Why is shadow banking a concern?",
        options: [
          "It performs bank-like functions outside the supervisory perimeter",
          "It lends at rates far above commercial banks",
          "It serves only low-credit-quality borrowers",
          "It operates mainly in countries with weak legal systems",
        ],
        explanation:
          "Maturity transformation and leverage still happen, but without deposit insurance, without a lender of last resort, and usually without capital requirements.",
      },
      l15_q6: {
        question: "How does the balance-sheet contagion channel work?",
        options: [
          "One institution fire-sells assets, the price falls, and another's balance sheet worsens",
          "One bank fails and depositors run on a different bank",
          "Regulators tighten rules across the board after one institution stumbles",
          "Institutions hold cross-shareholdings in one another",
        ],
        explanation:
          "This is contagion needing no contractual link between the two: it is enough that they hold the same kind of asset and both mark it to market.",
      },
      l15_q7: {
        question: "On what principle should the lender-of-last-resort role be exercised?",
        options: [
          "Lend freely at a penalty rate, against good collateral",
          "Lend without limit at favourable rates to any institution in difficulty",
          "Lend only to the largest banks in the system",
          "Buy up all the bad assets of the institution in trouble",
        ],
        explanation:
          "Bagehot's principle separates illiquidity from insolvency: support the first and let the second fail - a distinction that is very hard to draw in a crisis.",
      },
      l15_q8: {
        question: "How does moral hazard show up in financial bailouts?",
        options: [
          "Institutions take more risk because they expect to be rescued",
          "Management hides unfavourable information from the regulator",
          "Depositors withdraw en masse on hearing a rumour about their bank",
          "Shareholders dump the stock at the first sign of trouble",
        ],
        explanation:
          "This is the long-run cost of every bailout, and the reason modern resolution frameworks try to force creditors to take the loss instead of taxpayers.",
      },
      l15_q9: {
        question: "How does macroprudential policy differ from microprudential?",
        options: [
          "It targets the stability of the whole system, not each institution alone",
          "It applies only to the largest banks in the economy",
          "It is issued by the central bank while microprudential comes from the finance ministry",
          "It focuses on liquidity risk while microprudential focuses on credit risk",
        ],
        explanation:
          "Behaviour that is sensible for one bank can be disastrous for the system: every bank selling assets to repair its capital ratio collapses the price for all of them.",
      },
      l15_q10: {
        question: "On what principle does a countercyclical capital buffer work?",
        options: [
          "Build capital in the good years so it can be released in the downturn",
          "Raise capital requirements in a downturn to protect depositors better",
          "Hold capital flat through every phase of the cycle, for stability",
          "Let banks set their own capital level from internal models",
        ],
        explanation:
          "It works against credit's natural tendency to boom in good times and contract in bad ones - which deepens the cycle in both directions.",
      },
      l15_q11: {
        question: "What inherent weakness does stress test design carry?",
        options: [
          "Banks can optimise to pass exactly the scenario that was published",
          "Results are not made public, so they lack deterrent effect",
          "It covers only credit risk and ignores market risk",
          "It is so costly it can only be run every few years",
        ],
        explanation:
          "This is Goodhart's law at system level: once the scenario becomes the target, it stops measuring genuine resilience.",
      },
      l15_q12: {
        question: "What role does the repo market play in the financial system?",
        options: [
          "It is the secured short-term funding channel for most large institutions",
          "It is where central banks issue base money into the economy",
          "It is the primary market in which governments raise debt",
          "It is the clearing mechanism for listed securities trades",
        ],
        explanation:
          "It is modern finance's plumbing: nearly invisible until it blocks, and when it blocks everything above it stops at once.",
      },
      l15_q13: {
        question: "What risk does a chain of collateral rehypothecation create?",
        options: [
          "One asset backs several obligations, so one break spreads down the chain",
          "Collateral is valued below its true market price",
          "The original owner loses any right to reclaim the asset",
          "Regulators cannot determine who legally owns the asset",
        ],
        explanation:
          "The chain raises capital efficiency in calm times and turns into a contagion channel in a crisis, when everyone demands their collateral back at once.",
      },
      l15_q14: {
        question: "What does regulatory arbitrage between markets lead to?",
        options: [
          "Risk migrating to wherever supervision is lightest, rather than disappearing",
          "Countries being forced to adopt one identical rulebook",
          "Compliance costs rising for institutions in every market",
          "Retail investors being better protected through competition between countries",
        ],
        explanation:
          "This is why international coordination is a precondition for regulation to bite, and also why it is so hard to reach when national interests diverge.",
      },
      l15_q15: {
        question: "What does a modern resolution regime aim for?",
        options: [
          "Letting the institution fail without interrupting its critical services",
          "Ensuring every large institution is rescued to prevent market panic",
          "Transferring all the institution's assets into state ownership",
          "Compensating shareholders and creditors in full",
        ],
        explanation:
          "The idea is to separate the critical services from the shareholders and creditors: the operations keep running while those who took the risk take the loss.",
      },
      l15_q16: {
        question: "What is the core trade-off in financial regulation?",
        options: [
          "System stability against the capacity to allocate capital and take risk",
          "Protecting small investors against the profits of large institutions",
          "Information transparency against transaction processing speed",
          "Compliance costs against lower taxes for the financial sector",
        ],
        explanation:
          "A system that never fails is also a system that never funds risk worth taking. The real question is always how much of the trade-off, not whether.",
      },
      l15_q17: {
        question: "Why is the maturity mismatch between assets and funding the root of bank liquidity risk?",
        options: [
          "Because banks fund short-term and lend long-term",
          "Because short-term funding rates always exceed long-term lending rates",
          "Because long-term loans are not counted as risk-weighted assets",
          "Because banks are barred from holding assets longer-dated than their funding",
        ],
        explanation:
          "Maturity transformation is a bank's core economic function and also its structural weakness: assets cannot be turned into cash as fast as depositors can withdraw once confidence wavers.",
      },
      l15_q18: {
        question: "What does the Basel liquidity coverage ratio require of a bank?",
        options: [
          "Holding enough high-quality liquid assets to survive thirty days of stress",
          "Keeping equity over total assets above a minimum level",
          "Capping exposure to one customer below a share of own funds",
          "Provisioning for credit risk by classified loan category",
        ],
        explanation:
          "The liquidity coverage ratio is a liquidity standard, not a capital one: it forces the bank to hold immediately sellable assets sufficient to live through a month of crisis rather than depending on the interbank market.",
      },
      l15_q19: {
        question: "Why does herding behaviour among financial institutions amplify systemic risk?",
        options: [
          "Because many institutions holding the same position will sell at the same moment",
          "Because the law obliges institutions to follow the same investment strategy",
          "Because regulators can only supervise one institution at a time",
          "Because identical behaviour reduces secondary market volume",
        ],
        explanation:
          "When risk models, regulations and benchmarks are the same, institutions are pushed towards the same exit. Individually rational action produces a collectively catastrophic outcome - the core paradox of macroprudential policy.",
      },
      l15_q20: {
        question: "Why were credit rating agencies criticised after the global financial crisis?",
        options: [
          "Because the agencies are paid by the very issuers they rate",
          "Because ratings may not be published to retail investors",
          "Because agencies rate only government bonds and ignore corporate ones",
          "Because rules forbid using ratings in investment decisions",
        ],
        explanation:
          "The issuer-pays model creates a plain conflict of interest: the agency has an incentive to keep the client. Combined with structured-product models built on wrong correlation assumptions, the result was a wave of collapsing AAA ratings.",
      },
    },
  },
};
