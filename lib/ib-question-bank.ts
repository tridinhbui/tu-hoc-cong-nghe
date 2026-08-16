import { IB_QUESTION_OVERRIDES } from "@/lib/ib-question-overrides";

export interface IbQuestion {
  id: number;
  category: string;
  difficulty: "de" | "trung-binh" | "kho";
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface IbCategoryCount {
  /** Cleaned for display - a handful of categories (e.g. "Career Changer")
   *  carry literal quote characters in the source data as emphasis; those
   *  read as a formatting glitch once rendered as a chip, so strip them. */
  label: string;
  count: number;
}

/** Categories whose questions have no single correct answer - "Walk me
 *  through your resume", "Why banking?", "Tell me about a failure". Forcing
 *  these into a 4-option multiple choice makes the drill dishonest: it has to
 *  invent three "wrong" ways to describe your own career. They're served as
 *  un-scored prep cards instead (question + the coaching framework that lives
 *  in `explanation`), and are excluded from every scored drill. */
export const IB_BEHAVIORAL_CATEGORIES: ReadonlySet<string> = new Set([
  "Analytical / Attention to Detail",
  "Background / Personal",
  '"Career Changer"',
  "Commitment",
  "Culture",
  '"Future"',
  "Strengths / Weaknesses",
  "Team / Leadership",
  "Understanding Banking",
  '"Warren Buffett"',
  '"Why Banking?"',
  '"Failure"',
  '"Outside the Box"',
  "Discussing Transaction Experience",
]);

export function isBehavioralCategory(category: string): boolean {
  return IB_BEHAVIORAL_CATEGORIES.has(category);
}

/** Strips the literal quote characters a few categories carry as emphasis. */
export function formatCategoryLabel(category: string): string {
  return category.replace(/^"|"$/g, "");
}

/** Question count per category, largest first. Pass a question list to scope
 *  it - the technical drill and the behavioral prep surface each show their
 *  own sections rather than one combined list that no single mode serves. */
export function getIbCategoryCounts(questions: IbQuestion[] = IB_QUESTION_BANK): IbCategoryCount[] {
  const counts = new Map<string, number>();
  for (const q of questions) {
    const label = formatCategoryLabel(q.category);
    counts.set(label, (counts.get(label) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);
}

// Raw scraped data. Not exported - consumers get IB_QUESTION_BANK below,
// which has the hand-authored option rewrites applied on top (see
// lib/ib-question-overrides.ts for why those are needed).
const RAW_IB_QUESTION_BANK: IbQuestion[] = [
  {
    "id": 1,
    "category": "Analytical / Attention to Detail",
    "difficulty": "trung-binh",
    "question": "I see you've done mostly journalism and research internships before. Can you discuss your quantitative skills?",
    "options": [
      "It's unrealistic to claim that you're perfect and have never done this. Instead, briefly mention a time when you made a careless mistake and then spend the majority of time in your answer discussing what you learned and how you improved, citing another specific example of how you...",
      "Combine the answers to questions #1 and #4 for this one - the key is to use specific examples rather than just saying, \"I got a high math SAT score!\" Personal financial experience, classes, self-study courses and independent study work well.",
      "You should respond by discussing specific times when you had to analyze numbers and/or use logic....",
      "In keeping with our theme of specificity, give a concrete example of a time when you were working on multiple projects at the same time - work, school, or activities work equally well for this one...."
    ],
    "correct": 2,
    "explanation": "You should respond by discussing specific times when you had to analyze numbers and/or use logic. Good examples might include: your personal portfolio, any math/science classes you've taken, any type of budgeting process you've been through, any type of research you've done that involved numbers."
  },
  {
    "id": 2,
    "category": "Analytical / Attention to Detail",
    "difficulty": "trung-binh",
    "question": "In your last internship, you analyzed portfolios and recommended investments to clients. Can you walk me through your thought process for analyzing the returns of a client portfolio?",
    "options": [
      "You should either present a list of self-study courses or certifications such as the CFA that you've obtained, or speak about your own work studying independently from textbooks, self-study courses and other sources....",
      "The key is to break everything down into steps and be very specific about what you did....",
      "A journal, student publication or anything similar could be good to mention here, as could anything shown to a client or multiple clients in your work experience or in an internship....",
      "Combine the answers to questions #1 and #4 for this one - the key is to use specific examples rather than just saying, \"I got a high math SAT score!\" Personal financial experience, classes, self-study courses and independent study work well."
    ],
    "correct": 1,
    "explanation": "The key is to break everything down into steps and be very specific about what you did. So you might say that \"Step 1\" was getting a list of when they bought each investment and how much they invested / how many shares they acquired; \"Step 2\" was finding a list of when they sold each investment, and what they sold them for; and \"Step 3\" was aggregating this data over the years in-between for each investment to calculate the compound return."
  },
  {
    "id": 3,
    "category": "Analytical / Attention to Detail",
    "difficulty": "trung-binh",
    "question": "Can you tell me about the process you used to analyze space requirements for the building designs you worked on this past summer?",
    "options": [
      "Combine the answers to questions #1 and #4 for this one - the key is to use specific examples rather than just saying, \"I got a high math SAT score!\" Personal financial experience, classes, self-study courses and independent study work well.",
      "Once again, it's best to point to something specific - \"During my junior year, I was taking 5 classes at once as well as working part-time and running my business fraternity - and I still got A's in all of them.\" Not everyone has a perfect answer, but try to think about the most...",
      "Similar to the reasoning above, break it into steps and start by discussing how you made the initial estimates, then how you refined them and made them more exact over time while staying within budget and collaborating with your team.",
      "You should either present a list of self-study courses or certifications such as the CFA that you've obtained, or speak about your own work studying independently from textbooks, self-study courses and other sources...."
    ],
    "correct": 2,
    "explanation": "Similar to the reasoning above, break it into steps and start by discussing how you made the initial estimates, then how you refined them and made them more exact over time while staying within budget and collaborating with your team."
  },
  {
    "id": 4,
    "category": "Analytical / Attention to Detail",
    "difficulty": "trung-binh",
    "question": "You've been working as a lawyer for the past 3 years - what initiative have you taken on your own to learn more about finance?",
    "options": [
      "You should either present a list of self-study courses or certifications such as the CFA that you've obtained, or speak about your own work studying independently from textbooks, self-study courses and other sources....",
      "The key is to break everything down into steps and be very specific about what you did....",
      "Similar to the reasoning above, break it into steps and start by discussing how you made the initial estimates, then how you refined them and made them more exact over time while staying within budget and collaborating with your team.",
      "You should respond by discussing specific times when you had to analyze numbers and/or use logic...."
    ],
    "correct": 0,
    "explanation": "You should either present a list of self-study courses or certifications such as the CFA that you've obtained, or speak about your own work studying independently from textbooks, self-study courses and other sources. Be conservative with how much you claim to know - re-iterate that you're \"not an expert\" but that you have taken the initiative to learn something on your own."
  },
  {
    "id": 5,
    "category": "Analytical / Attention to Detail",
    "difficulty": "trung-binh",
    "question": "You were an English major - how do you know you can handle the quantitative rigor required in investment banking?",
    "options": [
      "A journal, student publication or anything similar could be good to mention here, as could anything shown to a client or multiple clients in your work experience or in an internship....",
      "Once again, it's best to point to something specific - \"During my junior year, I was taking 5 classes at once as well as working part-time and running my business fraternity - and I still got A's in all of them.\" Not everyone has a perfect answer, but try to think about the most...",
      "Combine the answers to questions #1 and #4 for this one - the key is to use specific examples rather than just saying, \"I got a high math SAT score!\" Personal financial experience, classes, self-study courses and independent study work well.",
      "Similar to the reasoning above, break it into steps and start by discussing how you made the initial estimates, then how you refined them and made them more exact over time while staying within budget and collaborating with your team."
    ],
    "correct": 2,
    "explanation": "Combine the answers to questions #1 and #4 for this one - the key is to use specific examples rather than just saying, \"I got a high math SAT score!\" Personal financial experience, classes, self-study courses and independent study work well."
  },
  {
    "id": 6,
    "category": "Analytical / Attention to Detail",
    "difficulty": "trung-binh",
    "question": "Can you tell me about a time when you submitted a report or project with misspellings or grammatical mistakes?",
    "options": [
      "In keeping with our theme of specificity, give a concrete example of a time when you were working on multiple projects at the same time - work, school, or activities work equally well for this one....",
      "You should either present a list of self-study courses or certifications such as the CFA that you've obtained, or speak about your own work studying independently from textbooks, self-study courses and other sources....",
      "It's unrealistic to claim that you're perfect and have never done this. Instead, briefly mention a time when you made a careless mistake and then spend the majority of time in your answer discussing what you learned and how you improved, citing another specific example of how you...",
      "Once again, it's best to point to something specific - \"During my junior year, I was taking 5 classes at once as well as working part-time and running my business fraternity - and I still got A's in all of them.\" Not everyone has a perfect answer, but try to think about the most..."
    ],
    "correct": 2,
    "explanation": "It's unrealistic to claim that you're perfect and have never done this. Instead, briefly mention a time when you made a careless mistake and then spend the majority of time in your answer discussing what you learned and how you improved, citing another specific example of how you improved the second time around."
  },
  {
    "id": 7,
    "category": "Analytical / Attention to Detail",
    "difficulty": "trung-binh",
    "question": "What's the most number of classes you ever took at once and how well did you do in each of them?",
    "options": [
      "You should respond by discussing specific times when you had to analyze numbers and/or use logic....",
      "You should either present a list of self-study courses or certifications such as the CFA that you've obtained, or speak about your own work studying independently from textbooks, self-study courses and other sources....",
      "The key is to break everything down into steps and be very specific about what you did....",
      "Once again, it's best to point to something specific - \"During my junior year, I was taking 5 classes at once as well as working part-time and running my business fraternity - and I still got A's in all of them.\" Not everyone has a perfect answer, but try to think about the most..."
    ],
    "correct": 3,
    "explanation": "Once again, it's best to point to something specific - \"During my junior year, I was taking 5 classes at once as well as working part-time and running my business fraternity - and I still got A's in all of them.\" Not everyone has a perfect answer, but try to think about the most stressful time in your academic life and use that as a reference for your answer. State the \"challenge\" first, then how you responded, and then how well you did."
  },
  {
    "id": 8,
    "category": "Analytical / Attention to Detail",
    "difficulty": "trung-binh",
    "question": "How well can you multi-task?",
    "options": [
      "In keeping with our theme of specificity, give a concrete example of a time when you were working on multiple projects at the same time - work, school, or activities work equally well for this one....",
      "It's unrealistic to claim that you're perfect and have never done this. Instead, briefly mention a time when you made a careless mistake and then spend the majority of time in your answer discussing what you learned and how you improved, citing another specific example of how you...",
      "A journal, student publication or anything similar could be good to mention here, as could anything shown to a client or multiple clients in your work experience or in an internship....",
      "Once again, it's best to point to something specific - \"During my junior year, I was taking 5 classes at once as well as working part-time and running my business fraternity - and I still got A's in all of them.\" Not everyone has a perfect answer, but try to think about the most..."
    ],
    "correct": 0,
    "explanation": "In keeping with our theme of specificity, give a concrete example of a time when you were working on multiple projects at the same time - work, school, or activities work equally well for this one. Also emphasize that despite the considerable demands, you pulled off everything successfully. Anything involving teamwork or collaboration is also good to use in this response."
  },
  {
    "id": 9,
    "category": "Analytical / Attention to Detail",
    "difficulty": "trung-binh",
    "question": "Have you ever worked on a project or report that was shown to a large number of people?",
    "options": [
      "In keeping with our theme of specificity, give a concrete example of a time when you were working on multiple projects at the same time - work, school, or activities work equally well for this one....",
      "A journal, student publication or anything similar could be good to mention here, as could anything shown to a client or multiple clients in your work experience or in an internship....",
      "Similar to the reasoning above, break it into steps and start by discussing how you made the initial estimates, then how you refined them and made them more exact over time while staying within budget and collaborating with your team.",
      "Combine the answers to questions #1 and #4 for this one - the key is to use specific examples rather than just saying, \"I got a high math SAT score!\" Personal financial experience, classes, self-study courses and independent study work well."
    ],
    "correct": 1,
    "explanation": "A journal, student publication or anything similar could be good to mention here, as could anything shown to a client or multiple clients in your work experience or in an internship. If you don't have something like this, the best approach is to come as close possible by saying, for example, \"I haven't worked on a widely circulated publication, but I did work on such-and-such…, which required that all the details were perfect and that there were no mistakes…\" You could even cite lab or medical work - even if it wasn't widely circulated, anything requiring strong attention to detail suffices."
  },
  {
    "id": 10,
    "category": "Background / Personal",
    "difficulty": "trung-binh",
    "question": "Walk me through your resume.",
    "options": [
      "There are 2 common mistakes: 1. Saying something like Wall Street, American Psycho, or Liar's Poker that indicates you're a boring person. 2. Saying something like Harry Potter that indicates you're borderline illiterate. Pick something in the middle - above p...",
      "Be prepared for this if you list any common languages on your resume (Spanish, French, Italian, German, Chinese, Japanese, etc.) or if you happen to \"get lucky\" and your interviewer is a native speaker in one of the languages you've listed....",
      "Start at \"the beginning\" - if you're in college, that might be where you grew up or where you went to high school....",
      "Say that you looked at a lot of places, but settled on wherever you went due to its excellent academic reputation, its strong business/finance/economics program, or something of that nature...."
    ],
    "correct": 2,
    "explanation": "Start at \"the beginning\" - if you're in college, that might be where you grew up or where you went to high school. For anyone in business school or beyond, it might be where you went to undergraduate, your first job, or even where you went to business school. Then, go through how you first became interested in finance/business, how your interest developed over the years via the specific internships / jobs / other experiences you had and conclude with a strong statement about why you're interviewing today. Aim for 2-3 minutes - if you go on longer than this, the interviewer may get bored or impatient. Also, do not look at your resume when going through your \"story.\" The 4 most important points: 1. Be chronological. 2. Show how each experience along the way led you in the direction of finance. 3. State why you're here interviewing today. 4. Aim for 2-3 minutes. What are the most common mistakes with the \"Walk me through your resume\" question? 1. Going out of order chronologically. 2. Too much exposition - don't start off by saying, \"I've had a lot of great experiences.\" 3. Being too short (under 1 minute) or too long (over 5 minutes). 4. Not sounding certain you want to do banking/finance. 5. Listing your experiences rather than giving a logical transition between each one."
  },
  {
    "id": 11,
    "category": "Background / Personal",
    "difficulty": "trung-binh",
    "question": "Why did you attend [Your University / Business School]? I'm sure you had many options. / Why did you transfer to [University Name]?",
    "options": [
      "There are 2 common mistakes: 1. Saying something like Wall Street, American Psycho, or Liar's Poker that indicates you're a boring person. 2. Saying something like Harry Potter that indicates you're borderline illiterate. Pick something in the middle - above p...",
      "Be prepared for this if you list any common languages on your resume (Spanish, French, Italian, German, Chinese, Japanese, etc.) or if you happen to \"get lucky\" and your interviewer is a native speaker in one of the languages you've listed....",
      "Say that you looked at a lot of places, but settled on wherever you went due to its excellent academic reputation, its strong business/finance/economics program, or something of that nature....",
      "I would not say anything economics/finance-related - it sounds too artificial. Tell them about something you were actually interested in - even if it's not directly related to banking...."
    ],
    "correct": 2,
    "explanation": "Say that you looked at a lot of places, but settled on wherever you went due to its excellent academic reputation, its strong business/finance/economics program, or something of that nature. If you were interested in something specific it offered (e.g. you were an athlete and went to Stanford on scholarship, or you went to UChicago because of its excellent liberal arts program) you can mention that as well. Try to sound like you made a thoughtful decision rather than deciding randomly. If you transferred elsewhere, a similar strategy applies but make sure to emphasize it was for academic reasons. For example, don't say you wanted to get out of Massachusetts and move to southern California for an \"improved lifestyle!\""
  },
  {
    "id": 12,
    "category": "Background / Personal",
    "difficulty": "trung-binh",
    "question": "I noticed you studied abroad in [Location]. Can you tell me about that experience and why you went there?",
    "options": [
      "Obviously, don't say anything illegal or questionable/controversial. If you have anything interesting or not very common (hang gliding, directing movies, bungee jumping) you should bring that up....",
      "Start at \"the beginning\" - if you're in college, that might be where you grew up or where you went to high school....",
      "I would not say anything economics/finance-related - it sounds too artificial. Tell them about something you were actually interested in - even if it's not directly related to banking....",
      "Emphasize you did a lot academically rather than partying 24/7. Many study abroad programs do, in fact, involve partying 24/7, but you don't want to admit this...."
    ],
    "correct": 3,
    "explanation": "Emphasize you did a lot academically rather than partying 24/7. Many study abroad programs do, in fact, involve partying 24/7, but you don't want to admit this. You can mention something about the fun you had, trips you went on, and anything interesting you did (climbing Mt. Fuji, starring in a Korean soap opera, excavating ruins in Troy, etc.) but don't over-do it and make them think you did nothing constructive while you were there. Think \"Work hard and play hard\" for this one."
  },
  {
    "id": 13,
    "category": "Background / Personal",
    "difficulty": "trung-binh",
    "question": "Why did you major in [Your Major]?",
    "options": [
      "Say that you looked at a lot of places, but settled on wherever you went due to its excellent academic reputation, its strong business/finance/economics program, or something of that nature....",
      "If it was something related to business/economics, you can discuss your interest in those fields; for other majors, you can emphasize how you liked the challenge and/or had a personal interest in the field, but also took the time to learn the basics of business/finance on your ow...",
      "Be prepared for this if you list any common languages on your resume (Spanish, French, Italian, German, Chinese, Japanese, etc.) or if you happen to \"get lucky\" and your interviewer is a native speaker in one of the languages you've listed....",
      "Obviously, don't say anything illegal or questionable/controversial. If you have anything interesting or not very common (hang gliding, directing movies, bungee jumping) you should bring that up...."
    ],
    "correct": 1,
    "explanation": "If it was something related to business/economics, you can discuss your interest in those fields; for other majors, you can emphasize how you liked the challenge and/or had a personal interest in the field, but also took the time to learn the basics of business/finance on your own."
  },
  {
    "id": 14,
    "category": "Background / Personal",
    "difficulty": "trung-binh",
    "question": "Where else did you apply for school? Did you get in anywhere else?",
    "options": [
      "I would not say anything economics/finance-related - it sounds too artificial. Tell them about something you were actually interested in - even if it's not directly related to banking....",
      "Start at \"the beginning\" - if you're in college, that might be where you grew up or where you went to high school....",
      "You applied to a number of top schools and got in at other places, but you went through a careful decision-making process and settled on your school for a very good reason....",
      "Emphasize you did a lot academically rather than partying 24/7. Many study abroad programs do, in fact, involve partying 24/7, but you don't want to admit this...."
    ],
    "correct": 2,
    "explanation": "You applied to a number of top schools and got in at other places, but you went through a careful decision-making process and settled on your school for a very good reason. Show that you're \"in-demand\" by others and you always become more attractive - whether it's to the bank you're interviewing at or to the schools you're applying to."
  },
  {
    "id": 15,
    "category": "Background / Personal",
    "difficulty": "trung-binh",
    "question": "I see you wrote here that you're fluent in [Language]. Can you tell me about your most recent internship in [Language]?",
    "options": [
      "If it was something related to business/economics, you can discuss your interest in those fields; for other majors, you can emphasize how you liked the challenge and/or had a personal interest in the field, but also took the time to learn the basics of business/finance on your ow...",
      "Be prepared for this if you list any common languages on your resume (Spanish, French, Italian, German, Chinese, Japanese, etc.) or if you happen to \"get lucky\" and your interviewer is a native speaker in one of the languages you've listed....",
      "Obviously, don't say anything illegal or questionable/controversial. If you have anything interesting or not very common (hang gliding, directing movies, bungee jumping) you should bring that up....",
      "Start at \"the beginning\" - if you're in college, that might be where you grew up or where you went to high school...."
    ],
    "correct": 1,
    "explanation": "Be prepared for this if you list any common languages on your resume (Spanish, French, Italian, German, Chinese, Japanese, etc.) or if you happen to \"get lucky\" and your interviewer is a native speaker in one of the languages you've listed. I would suggest some practice discussing your work experience in whatever language(s) you've listed and making sure you can speak intelligently, at least briefly, about what you've done. If you really don't know much, just tell them upfront rather than making a fool of yourself and trying to talk about EBITDA when you don't know the word for it - I speak from experience on this one."
  },
  {
    "id": 16,
    "category": "Background / Personal",
    "difficulty": "trung-binh",
    "question": "What do you do for fun?",
    "options": [
      "Emphasize you did a lot academically rather than partying 24/7. Many study abroad programs do, in fact, involve partying 24/7, but you don't want to admit this....",
      "Obviously, don't say anything illegal or questionable/controversial. If you have anything interesting or not very common (hang gliding, directing movies, bungee jumping) you should bring that up....",
      "There are 2 common mistakes: 1. Saying something like Wall Street, American Psycho, or Liar's Poker that indicates you're a boring person. 2. Saying something like Harry Potter that indicates you're borderline illiterate. Pick something in the middle - above p...",
      "Start at \"the beginning\" - if you're in college, that might be where you grew up or where you went to high school...."
    ],
    "correct": 1,
    "explanation": "Obviously, don't say anything illegal or questionable/controversial. If you have anything interesting or not very common (hang gliding, directing movies, bungee jumping) you should bring that up. Otherwise, just be honest and if you really like watching football (North American football for international readers) or other sports, just talk about your interest in those."
  },
  {
    "id": 17,
    "category": "Background / Personal",
    "difficulty": "trung-binh",
    "question": "What was your favorite class in college / business school?",
    "options": [
      "There are 2 common mistakes: 1. Saying something like Wall Street, American Psycho, or Liar's Poker that indicates you're a boring person. 2. Saying something like Harry Potter that indicates you're borderline illiterate. Pick something in the middle - above p...",
      "Obviously, don't say anything illegal or questionable/controversial. If you have anything interesting or not very common (hang gliding, directing movies, bungee jumping) you should bring that up....",
      "You applied to a number of top schools and got in at other places, but you went through a careful decision-making process and settled on your school for a very good reason....",
      "I would not say anything economics/finance-related - it sounds too artificial. Tell them about something you were actually interested in - even if it's not directly related to banking...."
    ],
    "correct": 3,
    "explanation": "I would not say anything economics/finance-related - it sounds too artificial. Tell them about something you were actually interested in - even if it's not directly related to banking. They want to see who you are as a person, not whether or not you know all the Excel shortcuts in the book."
  },
  {
    "id": 18,
    "category": "Background / Personal",
    "difficulty": "trung-binh",
    "question": "What are your favorite movies / books?",
    "options": [
      "Obviously, don't say anything illegal or questionable/controversial. If you have anything interesting or not very common (hang gliding, directing movies, bungee jumping) you should bring that up....",
      "Say that you looked at a lot of places, but settled on wherever you went due to its excellent academic reputation, its strong business/finance/economics program, or something of that nature....",
      "There are 2 common mistakes: 1. Saying something like Wall Street, American Psycho, or Liar's Poker that indicates you're a boring person. 2. Saying something like Harry Potter that indicates you're borderline illiterate. Pick something in the middle - above p...",
      "If it was something related to business/economics, you can discuss your interest in those fields; for other majors, you can emphasize how you liked the challenge and/or had a personal interest in the field, but also took the time to learn the basics of business/finance on your ow..."
    ],
    "correct": 2,
    "explanation": "There are 2 common mistakes: 1. Saying something like Wall Street, American Psycho, or Liar's Poker that indicates you're a boring person. 2. Saying something like Harry Potter that indicates you're borderline illiterate. Pick something in the middle - above pop literature/film but not something that has to do with finance specifically. That just sounds weird."
  },
  {
    "id": 19,
    "category": "Background / Personal",
    "difficulty": "trung-binh",
    "question": "Tell me something interesting about you that's not listed on your resume.",
    "options": [
      "I would not say anything economics/finance-related - it sounds too artificial. Tell them about something you were actually interested in - even if it's not directly related to banking....",
      "Emphasize you did a lot academically rather than partying 24/7. Many study abroad programs do, in fact, involve partying 24/7, but you don't want to admit this....",
      "Again, don't say anything illegal/inappropriate - use common sense. Talking about that trip to Easter Island or your Brazilian Jiu-Jitsu championship both work well.",
      "Be prepared for this if you list any common languages on your resume (Spanish, French, Italian, German, Chinese, Japanese, etc.) or if you happen to \"get lucky\" and your interviewer is a native speaker in one of the languages you've listed...."
    ],
    "correct": 2,
    "explanation": "Again, don't say anything illegal/inappropriate - use common sense. Talking about that trip to Easter Island or your Brazilian Jiu-Jitsu championship both work well."
  },
  {
    "id": 20,
    "category": "\"Career Changer\"",
    "difficulty": "trung-binh",
    "question": "You've had tons of engineering experience and you've worked at many tech companies. Why do you want to be an investment banker now?",
    "options": [
      "Talk about how you dislike the limited advancement opportunities and how your work didn't affect the world at large - only what that specific company was doing....",
      "Yes. Although you worked at McKinsey, you realized you didn't like consulting because of the wishy-washy nature of the work (making reports and billing by the hour rather than billing by the result) and the constant travel and lack of quantitative skills/learn...",
      "Because your accounting work was boring and mundane, and because there were limited advancement opportunities....",
      "You don't view things in those terms. Although you did well, there's always room to learn and banking would be a great learning opportunity for you...."
    ],
    "correct": 0,
    "explanation": "Talk about how you dislike the limited advancement opportunities and how your work didn't affect the world at large - only what that specific company was doing. You want to do finance because you like the business aspect of technology more than the technology aspect of technology and because you want to make an impact with your work and become an investor or advisor one day."
  },
  {
    "id": 21,
    "category": "\"Career Changer\"",
    "difficulty": "trung-binh",
    "question": "You've done Big 4 accounting for the past year - why would you want a job that's a lot more stressful with twice the hours?",
    "options": [
      "You didn't like the culture of trading, and wanted to have more of an impact by advising companies on major strategic decisions rather than just making small trades and investments each day....",
      "Because your accounting work was boring and mundane, and because there were limited advancement opportunities....",
      "You don't view things in those terms. Although you did well, there's always room to learn and banking would be a great learning opportunity for you....",
      "Talk about how you dislike the limited advancement opportunities and how your work didn't affect the world at large - only what that specific company was doing...."
    ],
    "correct": 1,
    "explanation": "Because your accounting work was boring and mundane, and because there were limited advancement opportunities. Finance is faster-paced and you've realized that after speaking with a lot of friends and doing your own research that it's just more suited to your personality."
  },
  {
    "id": 22,
    "category": "\"Career Changer\"",
    "difficulty": "trung-binh",
    "question": "I see you've practiced law at Wilson Sonsini for the past 4 years - if you've been there that long, you're probably on Partner-track by now. Why would you want to leave a lucrative career in law and go back to being an entry-level Associate in banking?",
    "options": [
      "You didn't like the culture of trading, and wanted to have more of an impact by advising companies on major strategic decisions rather than just making small trades and investments each day....",
      "Yes. Although you worked at McKinsey, you realized you didn't like consulting because of the wishy-washy nature of the work (making reports and billing by the hour rather than billing by the result) and the constant travel and lack of quantitative skills/learn...",
      "You don't view things in those terms. Although you did well, there's always room to learn and banking would be a great learning opportunity for you....",
      "Emphasize how business people never respect lawyers and view them as nuisances rather than as a critical part of the team - as a banker, you'd be making deals happen and actually advising companies rather than just proofreading documents and doing \"Find-and-Replace\" in Word...."
    ],
    "correct": 3,
    "explanation": "Emphasize how business people never respect lawyers and view them as nuisances rather than as a critical part of the team - as a banker, you'd be making deals happen and actually advising companies rather than just proofreading documents and doing \"Find-and-Replace\" in Word. Of course, you do a lot of this in banking anyway but this angle still works because bankers really do look down on lawyers."
  },
  {
    "id": 23,
    "category": "\"Career Changer\"",
    "difficulty": "trung-binh",
    "question": "I see you worked at McKinsey one summer and then went to Citi investment banking the next year. Are you sure you want to do investment banking?",
    "options": [
      "Yes. Although you worked at McKinsey, you realized you didn't like consulting because of the wishy-washy nature of the work (making reports and billing by the hour rather than billing by the result) and the constant travel and lack of quantitative skills/learn...",
      "You didn't like the culture of trading, and wanted to have more of an impact by advising companies on major strategic decisions rather than just making small trades and investments each day....",
      "Emphasize how business people never respect lawyers and view them as nuisances rather than as a critical part of the team - as a banker, you'd be making deals happen and actually advising companies rather than just proofreading documents and doing \"Find-and-Replace\" in Word....",
      "Because your accounting work was boring and mundane, and because there were limited advancement opportunities...."
    ],
    "correct": 0,
    "explanation": "Yes. Although you worked at McKinsey, you realized you didn't like consulting because of the wishy-washy nature of the work (making reports and billing by the hour rather than billing by the result) and the constant travel and lack of quantitative skills/learning. You enjoyed your Citi internship much more and realized you wanted to be in banking rather than consulting."
  },
  {
    "id": 24,
    "category": "\"Career Changer\"",
    "difficulty": "trung-binh",
    "question": "Wow. I must be honest, I rarely see people who have accomplished as much as you have at your age. You sold your own company for over $1 million within 2 years of starting it, and became a leading real estate investor in Asia at the same time. Why would you ever want to work for other people in banking if you've been so successful on your own?",
    "options": [
      "Talk about how you dislike the limited advancement opportunities and how your work didn't affect the world at large - only what that specific company was doing....",
      "You didn't like the culture of trading, and wanted to have more of an impact by advising companies on major strategic decisions rather than just making small trades and investments each day....",
      "You don't view things in those terms. Although you did well, there's always room to learn and banking would be a great learning opportunity for you....",
      "Yes. Although you worked at McKinsey, you realized you didn't like consulting because of the wishy-washy nature of the work (making reports and billing by the hour rather than billing by the result) and the constant travel and lack of quantitative skills/learn..."
    ],
    "correct": 2,
    "explanation": "You don't view things in those terms. Although you did well, there's always room to learn and banking would be a great learning opportunity for you. You've spoken with many friends in the industry and have been impressed by what you've heard, and you want to broaden your experience and knowledge so that you can move into higher- stakes business."
  },
  {
    "id": 25,
    "category": "\"Career Changer\"",
    "difficulty": "trung-binh",
    "question": "You've worked at a few prop trading firms and also in Sales & Trading. They get paid pretty well and work market hours - so they have it a lot better than us. Why would you want to switch to investment banking?",
    "options": [
      "You didn't like the culture of trading, and wanted to have more of an impact by advising companies on major strategic decisions rather than just making small trades and investments each day....",
      "Yes. Although you worked at McKinsey, you realized you didn't like consulting because of the wishy-washy nature of the work (making reports and billing by the hour rather than billing by the result) and the constant travel and lack of quantitative skills/learn...",
      "Because your accounting work was boring and mundane, and because there were limited advancement opportunities....",
      "Emphasize how business people never respect lawyers and view them as nuisances rather than as a critical part of the team - as a banker, you'd be making deals happen and actually advising companies rather than just proofreading documents and doing \"Find-and-Replace\" in Word...."
    ],
    "correct": 0,
    "explanation": "You didn't like the culture of trading, and wanted to have more of an impact by advising companies on major strategic decisions rather than just making small trades and investments each day. Banking excites you more because of the broader range of opportunities and experiences it gives you."
  },
  {
    "id": 26,
    "category": "Commitment",
    "difficulty": "trung-binh",
    "question": "Where else are you interviewing? Is it just banking? Consulting? Other companies?",
    "options": [
      "You looked into investing but realized you don't like the nature of the work - there's too much due diligence and \"looking at deals\" rather than taking action and actually doing deals....",
      "Just banking. You're not interested in consulting / other options and don't want to waste recruiters' time. You need to say this even if you're so uncertain that you're deciding between opening a zebra ranch, going on a spiritual journey to Nepal, going back t...",
      "\"Show it to me and I'll sign and accept it right now.\" Some people think this is \"unethical\" if you're really not certain, but keep in mind that until you've signed something in writing you can do whatever you want....",
      "The key with this type of question is to bring up a \"failure\" briefly and then to spend most of your time talking about what you've learned from it and how you've improved rather than dwelling on the failure itself."
    ],
    "correct": 1,
    "explanation": "Just banking. You're not interested in consulting / other options and don't want to waste recruiters' time. You need to say this even if you're so uncertain that you're deciding between opening a zebra ranch, going on a spiritual journey to Nepal, going back to McKinsey or starting a laundromat with your roommate's uncle."
  },
  {
    "id": 27,
    "category": "Commitment",
    "difficulty": "trung-binh",
    "question": "Are you mostly interviewing at larger banks like us? What kinds of options within banking are you considering?",
    "options": [
      "\"Show it to me and I'll sign and accept it right now.\" Some people think this is \"unethical\" if you're really not certain, but keep in mind that until you've signed something in writing you can do whatever you want....",
      "The key with this type of question is to bring up a \"failure\" briefly and then to spend most of your time talking about what you've learned from it and how you've improved rather than dwelling on the failure itself.",
      "Just banking. You're not interested in consulting / other options and don't want to waste recruiters' time. You need to say this even if you're so uncertain that you're deciding between opening a zebra ranch, going on a spiritual journey to Nepal, going back t...",
      "Mostly larger banks, but you have received some interest from other places so you're looking at a couple options...."
    ],
    "correct": 3,
    "explanation": "Mostly larger banks, but you have received some interest from other places so you're looking at a couple options. If you can mention specific names, that makes your answer even better. If you're interviewing in a group like M&A or Healthcare, talk about how you're mostly speaking with similar groups to show you're serious about that one area."
  },
  {
    "id": 28,
    "category": "Commitment",
    "difficulty": "trung-binh",
    "question": "Before you entered business school, I see you switched jobs about once a year. How do I know that you're here to stay for the long-term?",
    "options": [
      "Just banking. You're not interested in consulting / other options and don't want to waste recruiters' time. You need to say this even if you're so uncertain that you're deciding between opening a zebra ranch, going on a spiritual journey to Nepal, going back t...",
      "You looked into investing but realized you don't like the nature of the work - there's too much due diligence and \"looking at deals\" rather than taking action and actually doing deals....",
      "The key with this type of question is to bring up a \"failure\" briefly and then to spend most of your time talking about what you've learned from it and how you've improved rather than dwelling on the failure itself.",
      "Although you switched jobs pre-MBA, it's quite common to move when better opportunity arises...."
    ],
    "correct": 3,
    "explanation": "Although you switched jobs pre-MBA, it's quite common to move when better opportunity arises. However, you've done a lot of research, spoken with friends, alumni and other connections and are certain banking is for you after doing your own due diligence. You've actually looked into other career options and nothing is as attractive to you as banking."
  },
  {
    "id": 29,
    "category": "Commitment",
    "difficulty": "trung-binh",
    "question": "Recently some Analysts and Associates have left \"early\" and jumped to hedge funds or private equity. If the opportunity comes up, why would you stay here instead?",
    "options": [
      "\"Yes, show me the dotted line and I'd sign it right now.\" Even if this is a lie, you still have to say it in an interview or you won't get an offer.",
      "You looked into investing but realized you don't like the nature of the work - there's too much due diligence and \"looking at deals\" rather than taking action and actually doing deals....",
      "Just banking. You're not interested in consulting / other options and don't want to waste recruiters' time. You need to say this even if you're so uncertain that you're deciding between opening a zebra ranch, going on a spiritual journey to Nepal, going back t...",
      "Mostly larger banks, but you have received some interest from other places so you're looking at a couple options...."
    ],
    "correct": 1,
    "explanation": "You looked into investing but realized you don't like the nature of the work - there's too much due diligence and \"looking at deals\" rather than taking action and actually doing deals. As a result, after all your research speaking with alumni and other connections, you're set on banking."
  },
  {
    "id": 30,
    "category": "Commitment",
    "difficulty": "trung-binh",
    "question": "Tell me about a time when you failed to honor a commitment.",
    "options": [
      "The key with this type of question is to bring up a \"failure\" briefly and then to spend most of your time talking about what you've learned from it and how you've improved rather than dwelling on the failure itself.",
      "Although you switched jobs pre-MBA, it's quite common to move when better opportunity arises....",
      "You looked into investing but realized you don't like the nature of the work - there's too much due diligence and \"looking at deals\" rather than taking action and actually doing deals....",
      "\"Show it to me and I'll sign and accept it right now.\" Some people think this is \"unethical\" if you're really not certain, but keep in mind that until you've signed something in writing you can do whatever you want...."
    ],
    "correct": 0,
    "explanation": "The key with this type of question is to bring up a \"failure\" briefly and then to spend most of your time talking about what you've learned from it and how you've improved rather than dwelling on the failure itself."
  },
  {
    "id": 31,
    "category": "Commitment",
    "difficulty": "trung-binh",
    "question": "If I gave you an offer right now on the spot would you take it?",
    "options": [
      "\"Show it to me and I'll sign and accept it right now.\" Some people think this is \"unethical\" if you're really not certain, but keep in mind that until you've signed something in writing you can do whatever you want....",
      "You looked into investing but realized you don't like the nature of the work - there's too much due diligence and \"looking at deals\" rather than taking action and actually doing deals....",
      "\"Yes, show me the dotted line and I'd sign it right now.\" Even if this is a lie, you still have to say it in an interview or you won't get an offer.",
      "Although you switched jobs pre-MBA, it's quite common to move when better opportunity arises...."
    ],
    "correct": 2,
    "explanation": "\"Yes, show me the dotted line and I'd sign it right now.\" Even if this is a lie, you still have to say it in an interview or you won't get an offer."
  },
  {
    "id": 32,
    "category": "Commitment",
    "difficulty": "trung-binh",
    "question": "Let's say that we were to give you an offer - how long would you need to decide whether or not to accept it?",
    "options": [
      "Mostly larger banks, but you have received some interest from other places so you're looking at a couple options....",
      "Although you switched jobs pre-MBA, it's quite common to move when better opportunity arises....",
      "You looked into investing but realized you don't like the nature of the work - there's too much due diligence and \"looking at deals\" rather than taking action and actually doing deals....",
      "\"Show it to me and I'll sign and accept it right now.\" Some people think this is \"unethical\" if you're really not certain, but keep in mind that until you've signed something in writing you can do whatever you want...."
    ],
    "correct": 3,
    "explanation": "\"Show it to me and I'll sign and accept it right now.\" Some people think this is \"unethical\" if you're really not certain, but keep in mind that until you've signed something in writing you can do whatever you want. No, they won't like you if you verbally accept and then renege, but it's not the end of the world - just the end of your relationship with that bank."
  },
  {
    "id": 33,
    "category": "Culture",
    "difficulty": "trung-binh",
    "question": "You spent this last summer working at Morgan Stanley's investment banking division. It seems like you'd be crazy not to go back - why would you want to work for a smaller firm in our M&A group?",
    "options": [
      "You're most likely to get this one if you didn't get a return offer - let's be honest, who really goes from Morgan Stanley to a boutique?...",
      "With this type of question - whenever a certain area is depressed at the moment or is not doing well - you want to highlight your long-term view of the market and how things recover in time....",
      "It's always good to be positive about your experience, but at the same time you also want to give a good reason as to why you're moving elsewhere....",
      "This is a silly question, but I can't say I've never heard it before. In a normal \"weaknesses\" question it's best to say something real and then indicate how you've improved on it, but in this case it's better to say something more innocuous and maybe point to a \"weakness\" like n..."
    ],
    "correct": 0,
    "explanation": "You're most likely to get this one if you didn't get a return offer - let's be honest, who really goes from Morgan Stanley to a boutique? It's a tough sell, but you'll have to emphasize how you like the smaller environment where you get more responsibility and work more closely with clients. The banker probably won't believe you, but it's better than outright admitting you didn't get an offer. If the topic does arise, just say your lack of offer was because they were not hiring, because the group did poorly or because of the general economic climate."
  },
  {
    "id": 34,
    "category": "Culture",
    "difficulty": "trung-binh",
    "question": "Since you worked at Bank of America this past year, you probably have the chance to go to a lot of different large banks - why are you interested in us specifically?",
    "options": [
      "There's rarely a \"great\" way to answer this question, so I would recommend either referencing someone you've spoken with at the bank and what they've told you OR if you don't have any kind of experience like that, you can just give the usual generic reasons given for each bank....",
      "This is a silly question, but I can't say I've never heard it before. In a normal \"weaknesses\" question it's best to say something real and then indicate how you've improved on it, but in this case it's better to say something more innocuous and maybe point to a \"weakness\" like n...",
      "This is another silly question that is designed to test your knowledge of the industry more than anything else....",
      "You're most likely to get this one if you didn't get a return offer - let's be honest, who really goes from Morgan Stanley to a boutique?..."
    ],
    "correct": 0,
    "explanation": "There's rarely a \"great\" way to answer this question, so I would recommend either referencing someone you've spoken with at the bank and what they've told you OR if you don't have any kind of experience like that, you can just give the usual generic reasons given for each bank. This question often reflects a lazy interviewer more than anything else - the real reason you're interviewing with any bank is because they've given you an interview!"
  },
  {
    "id": 35,
    "category": "Culture",
    "difficulty": "trung-binh",
    "question": "When you were working at that boutique this past summer, you mentioned how you liked the smaller team and more hands-on environment. Why not just go back there? Why do you want to move to a large bank?",
    "options": [
      "There's rarely a \"great\" way to answer this question, so I would recommend either referencing someone you've spoken with at the bank and what they've told you OR if you don't have any kind of experience like that, you can just give the usual generic reasons given for each bank....",
      "It's always good to be positive about your experience, but at the same time you also want to give a good reason as to why you're moving elsewhere....",
      "Say that you want to gain solid technical and modeling skills and be exposed to a wide variety of industries and different markets....",
      "You're most likely to get this one if you didn't get a return offer - let's be honest, who really goes from Morgan Stanley to a boutique?..."
    ],
    "correct": 1,
    "explanation": "It's always good to be positive about your experience, but at the same time you also want to give a good reason as to why you're moving elsewhere. If you're moving from a smaller bank to larger one, you want to emphasize learning about how larger / major deals happen, how you want to learn from the best and perhaps even how bankers at your old firm recommended that you go somewhere bigger at the beginning of your career."
  },
  {
    "id": 36,
    "category": "Culture",
    "difficulty": "trung-binh",
    "question": "Why are you interested in our M&A division rather than our industry groups? Our Tech, Healthcare and Energy teams have been really successful this year.",
    "options": [
      "This is another silly question that is designed to test your knowledge of the industry more than anything else....",
      "This is a silly question, but I can't say I've never heard it before. In a normal \"weaknesses\" question it's best to say something real and then indicate how you've improved on it, but in this case it's better to say something more innocuous and maybe point to a \"weakness\" like n...",
      "It's always good to be positive about your experience, but at the same time you also want to give a good reason as to why you're moving elsewhere....",
      "Say that you want to gain solid technical and modeling skills and be exposed to a wide variety of industries and different markets...."
    ],
    "correct": 3,
    "explanation": "Say that you want to gain solid technical and modeling skills and be exposed to a wide variety of industries and different markets. Depending on the interviewer, it may also be appropriate to mention your interest in private equity (if you're planning to go that route) and how M&A will get you there. M&A bankers love to think they're superior to others because of their \"in-depth technical knowledge and negotiation skills,\" so you should play off that and use it to your advantage."
  },
  {
    "id": 37,
    "category": "Culture",
    "difficulty": "trung-binh",
    "question": "Why do you want to work in Capital Markets? There's hardly any market activity these days.",
    "options": [
      "There's rarely a \"great\" way to answer this question, so I would recommend either referencing someone you've spoken with at the bank and what they've told you OR if you don't have any kind of experience like that, you can just give the usual generic reasons given for each bank....",
      "With this type of question - whenever a certain area is depressed at the moment or is not doing well - you want to highlight your long-term view of the market and how things recover in time....",
      "You're most likely to get this one if you didn't get a return offer - let's be honest, who really goes from Morgan Stanley to a boutique?...",
      "This is another silly question that is designed to test your knowledge of the industry more than anything else...."
    ],
    "correct": 1,
    "explanation": "With this type of question - whenever a certain area is depressed at the moment or is not doing well - you want to highlight your long-term view of the market and how things recover in time. For Capital Markets specifically, you can talk about your interest in the markets since you were much younger and how you've always been fascinated by IPOs, secondary offerings and such - as always, specific examples are the key to success."
  },
  {
    "id": 38,
    "category": "Culture",
    "difficulty": "trung-binh",
    "question": "What do you think our bank's greatest weaknesses are?",
    "options": [
      "This is a silly question, but I can't say I've never heard it before. In a normal \"weaknesses\" question it's best to say something real and then indicate how you've improved on it, but in this case it's better to say something more innocuous and maybe point to a \"weakness\" like n...",
      "It's always good to be positive about your experience, but at the same time you also want to give a good reason as to why you're moving elsewhere....",
      "Say that you want to gain solid technical and modeling skills and be exposed to a wide variety of industries and different markets....",
      "There's rarely a \"great\" way to answer this question, so I would recommend either referencing someone you've spoken with at the bank and what they've told you OR if you don't have any kind of experience like that, you can just give the usual generic reasons given for each bank...."
    ],
    "correct": 0,
    "explanation": "This is a silly question, but I can't say I've never heard it before. In a normal \"weaknesses\" question it's best to say something real and then indicate how you've improved on it, but in this case it's better to say something more innocuous and maybe point to a \"weakness\" like not being strong in Europe/Asia, or not having as much experience in one industry as another bank - but then indicate how it doesn't matter to you because you're more concerned with other aspects of the firm."
  },
  {
    "id": 39,
    "category": "Culture",
    "difficulty": "trung-binh",
    "question": "Which of our competitors do you admire the most?",
    "options": [
      "This is another silly question that is designed to test your knowledge of the industry more than anything else....",
      "Say that you want to gain solid technical and modeling skills and be exposed to a wide variety of industries and different markets....",
      "It's always good to be positive about your experience, but at the same time you also want to give a good reason as to why you're moving elsewhere....",
      "This is a silly question, but I can't say I've never heard it before. In a normal \"weaknesses\" question it's best to say something real and then indicate how you've improved on it, but in this case it's better to say something more innocuous and maybe point to a \"weakness\" like n..."
    ],
    "correct": 0,
    "explanation": "This is another silly question that is designed to test your knowledge of the industry more than anything else. The best way to answer: briefly point to a competitor and state a widely known trait about them that you admire and then explain how the bank you're interviewing with also has that quality and might even be better at it. For example, Goldman Sachs is known for its \"one firm\" culture and emphasis on teamwork, while the former Bear Stearns was known for its more \"entrepreneurial\" environment. You could reference these types of qualities and then state how they're also seen in the bank you're interviewing with."
  },
  {
    "id": 40,
    "category": "\"Future\"",
    "difficulty": "trung-binh",
    "question": "I realize it's still early in your career - you haven't even graduated yet - but have you given any thought to your long-term plans? Do you think you'll stick with",
    "options": [
      "This might be my least favorite question of all time, but some lazy interviewers will ask you anyway....",
      "Analysts can, and arguably should, be more uncertain, while business school graduates need to be confident about their career choice.",
      "Since this question is given to an MBA candidate, you'll want to be more certain and show more direction in terms of your plans....",
      "investment banking? If you're interviewing for an Analyst position, you can be more uncertain about your future and just state you don't know 100% where you'll be yet, but banking is what excites you most and is what will give you the skills you need to succee..."
    ],
    "correct": 3,
    "explanation": "investment banking? If you're interviewing for an Analyst position, you can be more uncertain about your future and just state you don't know 100% where you'll be yet, but banking is what excites you most and is what will give you the skills you need to succeed. For prospective Associates, you need to be more certain about your career path and show some commitment - indicate you've done your homework, spoken with many people and really want to make a career out of it."
  },
  {
    "id": 41,
    "category": "\"Future\"",
    "difficulty": "trung-binh",
    "question": "You've had quite diverse experience prior to business school. After you complete your degree, where do you think you'll be going in the long-term?",
    "options": [
      "Since this question is given to an MBA candidate, you'll want to be more certain and show more direction in terms of your plans....",
      "Analysts can, and arguably should, be more uncertain, while business school graduates need to be confident about their career choice.",
      "investment banking? If you're interviewing for an Analyst position, you can be more uncertain about your future and just state you don't know 100% where you'll be yet, but banking is what excites you most and is what will give you the skills you need to succee...",
      "This might be my least favorite question of all time, but some lazy interviewers will ask you anyway...."
    ],
    "correct": 0,
    "explanation": "Since this question is given to an MBA candidate, you'll want to be more certain and show more direction in terms of your plans. State that you do want to pursue investment banking as a career, after having done extensive research on your own (and hopefully, having had a previous internship or other experience in the field that you can point to)."
  },
  {
    "id": 42,
    "category": "\"Future\"",
    "difficulty": "trung-binh",
    "question": "What is your career goal?",
    "options": [
      "This might be my least favorite question of all time, but some lazy interviewers will ask you anyway....",
      "Since this question is given to an MBA candidate, you'll want to be more certain and show more direction in terms of your plans....",
      "Analysts can, and arguably should, be more uncertain, while business school graduates need to be confident about their career choice.",
      "investment banking? If you're interviewing for an Analyst position, you can be more uncertain about your future and just state you don't know 100% where you'll be yet, but banking is what excites you most and is what will give you the skills you need to succee..."
    ],
    "correct": 0,
    "explanation": "This might be my least favorite question of all time, but some lazy interviewers will ask you anyway. Again, at the undergraduate level you can afford to be more vague and just indicate you want to do something in business/finance and advance to a high level; MBA candidates should indicate that they're in banking for the long-term."
  },
  {
    "id": 43,
    "category": "\"Future\"",
    "difficulty": "trung-binh",
    "question": "Looking into the future 10 years, do you think you'll still be an investment banker?",
    "options": [
      "This might be my least favorite question of all time, but some lazy interviewers will ask you anyway....",
      "Since this question is given to an MBA candidate, you'll want to be more certain and show more direction in terms of your plans....",
      "investment banking? If you're interviewing for an Analyst position, you can be more uncertain about your future and just state you don't know 100% where you'll be yet, but banking is what excites you most and is what will give you the skills you need to succee...",
      "Analysts can, and arguably should, be more uncertain, while business school graduates need to be confident about their career choice."
    ],
    "correct": 3,
    "explanation": "Analysts can, and arguably should, be more uncertain, while business school graduates need to be confident about their career choice."
  },
  {
    "id": 44,
    "category": "Strengths / Weaknesses",
    "difficulty": "trung-binh",
    "question": "In your internship this past summer, what feedback did you receive?",
    "options": [
      "This is a variant of the \"strengths and weaknesses\" question. The most common mistake is being vague and just saying you performed well and they liked you, and then failing to give weaknesses / areas for improvement....",
      "As with any \"weaknesses\" question, you need to use a specific story - such as an exam where you did not do well, a project that did not go as planned, or a work situation that did not turn out well - and show what you learned from it and how you've improved since then....",
      "This is a disguised \"tell me your strengths and weaknesses\" question, so you should follow the advice given above....",
      "This is just, \"Tell me your strengths\" in disguise, but you need to narrow it down to 3 words...."
    ],
    "correct": 0,
    "explanation": "This is a variant of the \"strengths and weaknesses\" question. The most common mistake is being vague and just saying you performed well and they liked you, and then failing to give weaknesses / areas for improvement. The right way to answer this question is to state specific qualities about you that they liked - such as ambition, drive, attention to detail, or willingness to go the extra mile for the team - and then give some specific examples of times when you demonstrated those qualities. Your all-nighters, the times you stayed the weekend working on a presentation, or the time you caught mistakes someone else above you missed are all good to mention. The other critical part is mentioning weaknesses / areas for improvement as well - talk about real weaknesses and how you've worked to improve them (see more on this in #2 below)."
  },
  {
    "id": 45,
    "category": "Strengths / Weaknesses",
    "difficulty": "trung-binh",
    "question": "What were a few areas that your team said you should try to improve upon?",
    "options": [
      "As with any \"weaknesses\" question, you need to use a specific story - such as an exam where you did not do well, a project that did not go as planned, or a work situation that did not turn out well - and show what you learned from it and how you've improved since then....",
      "This is just a disguised \"weaknesses\" question. However, since it involves someone else this time, it's better to give a weakness such as being stubborn and holding too rigidly to your own views rather than some of the other faults you could state....",
      "The 2 most important points to remember with the \"weaknesses\" / \"failure\" question: 1....",
      "This is a variant of the \"strengths and weaknesses\" question. The most common mistake is being vague and just saying you performed well and they liked you, and then failing to give weaknesses / areas for improvement...."
    ],
    "correct": 2,
    "explanation": "The 2 most important points to remember with the \"weaknesses\" / \"failure\" question: 1. Give a real weakness rather than saying you \"work too hard.\" 2. Show how you improved on it, using specific examples. What are \"real\" weaknesses you could give? Maybe you weren't as communicative with the team as you should have been at the start; maybe you got lost in the details sometimes and failed to see the big picture; maybe you were too impatient with others or did not delegate tasks appropriately. The point is to say something that is a real weakness but which is also not a \"deal- breaker\" - like saying you don't like to work hard or can't stand working in teams. After that, state how you're working to improve your weakness. Perhaps you gave more regular updates to your superiors; or maybe you started leveraging other peoples' knowledge or the administrative staff at your work more often."
  },
  {
    "id": 46,
    "category": "Strengths / Weaknesses",
    "difficulty": "trung-binh",
    "question": "Did you get an offer to return to where you worked last summer?",
    "options": [
      "This one is a bit tricky because it's so direct. You could attempt to make a joke out of this one and say something like, \"If you decided you weren't hiring at all!\" but that may not go well if your interviewer doesn't appreciate humor....",
      "The 2 most important points to remember with the \"weaknesses\" / \"failure\" question: 1....",
      "If you did get an offer, this is an easy question: \"yes.\" If you did not receive an offer, I would strongly recommend against lying about it - state that you did not receive an offer, and it was due to the economy, because your group was not hiring or due to other forces beyond y...",
      "This is just a disguised \"weaknesses\" question. However, since it involves someone else this time, it's better to give a weakness such as being stubborn and holding too rigidly to your own views rather than some of the other faults you could state...."
    ],
    "correct": 2,
    "explanation": "If you did get an offer, this is an easy question: \"yes.\" If you did not receive an offer, I would strongly recommend against lying about it - state that you did not receive an offer, and it was due to the economy, because your group was not hiring or due to other forces beyond your control. The danger with lying is that finance is a very small world and it's quite easy to ask a friend or a friend of a friend what really happened."
  },
  {
    "id": 47,
    "category": "Strengths / Weaknesses",
    "difficulty": "trung-binh",
    "question": "After going through the accounting program at PricewaterhouseCoopers for the past year, what sort of end-of-year review did you get?",
    "options": [
      "This is a disguised \"tell me your strengths and weaknesses\" question, so you should follow the advice given above....",
      "If you did get an offer, this is an easy question: \"yes.\" If you did not receive an offer, I would strongly recommend against lying about it - state that you did not receive an offer, and it was due to the economy, because your group was not hiring or due to other forces beyond y...",
      "The 2 most important points to remember with the \"weaknesses\" / \"failure\" question: 1....",
      "This is a variant of the \"strengths and weaknesses\" question. The most common mistake is being vague and just saying you performed well and they liked you, and then failing to give weaknesses / areas for improvement...."
    ],
    "correct": 0,
    "explanation": "This is a disguised \"tell me your strengths and weaknesses\" question, so you should follow the advice given above. Since it's in relation to a full-time position you've held, you should be a bit more thoughtful about what you say; generic answers won't work as well if they ask about your performance in a specific job."
  },
  {
    "id": 48,
    "category": "Strengths / Weaknesses",
    "difficulty": "trung-binh",
    "question": "Let's imagine that your best friend is describing you in 3 words - which words would he/she use and why?",
    "options": [
      "This is just, \"Tell me your strengths\" in disguise, but you need to narrow it down to 3 words....",
      "If you did get an offer, this is an easy question: \"yes.\" If you did not receive an offer, I would strongly recommend against lying about it - state that you did not receive an offer, and it was due to the economy, because your group was not hiring or due to other forces beyond y...",
      "This is yet another variation of the \"strengths\" question. But rather than giving generic strengths, you should highlight any unique experiences you've had....",
      "This is a disguised \"tell me your strengths and weaknesses\" question, so you should follow the advice given above...."
    ],
    "correct": 0,
    "explanation": "This is just, \"Tell me your strengths\" in disguise, but you need to narrow it down to 3 words. Since it's your friend describing you, you don't want to say, \"Driven, attentive to detail and a team player!\" You do want to convey the same ideas - that you can work hard, play well in teams, and get things done no matter what obstacles you face - but you should pick your own language to get this across. For each word you list you should also give 1-2 sentences to back up what you say, using a specific example for each one."
  },
  {
    "id": 49,
    "category": "Strengths / Weaknesses",
    "difficulty": "trung-binh",
    "question": "Imagine that I'm speaking to someone with whom you have not gotten along in the past - what would he/she say about you?",
    "options": [
      "This is yet another variation of the \"strengths\" question. But rather than giving generic strengths, you should highlight any unique experiences you've had....",
      "This one is a bit tricky because it's so direct. You could attempt to make a joke out of this one and say something like, \"If you decided you weren't hiring at all!\" but that may not go well if your interviewer doesn't appreciate humor....",
      "If you did get an offer, this is an easy question: \"yes.\" If you did not receive an offer, I would strongly recommend against lying about it - state that you did not receive an offer, and it was due to the economy, because your group was not hiring or due to other forces beyond y...",
      "This is just a disguised \"weaknesses\" question. However, since it involves someone else this time, it's better to give a weakness such as being stubborn and holding too rigidly to your own views rather than some of the other faults you could state...."
    ],
    "correct": 3,
    "explanation": "This is just a disguised \"weaknesses\" question. However, since it involves someone else this time, it's better to give a weakness such as being stubborn and holding too rigidly to your own views rather than some of the other faults you could state. Weaknesses related to team/group settings are better here. And once again, you need to emphasize how you've worked to improve whatever it is that you did not do well at the time. Don't say something like, \"I get along with everyone!\" as that sounds unrealistic."
  },
  {
    "id": 50,
    "category": "Strengths / Weaknesses",
    "difficulty": "trung-binh",
    "question": "Why would we decide not to give you an offer today?",
    "options": [
      "This is just a disguised \"weaknesses\" question. However, since it involves someone else this time, it's better to give a weakness such as being stubborn and holding too rigidly to your own views rather than some of the other faults you could state....",
      "As with any \"weaknesses\" question, you need to use a specific story - such as an exam where you did not do well, a project that did not go as planned, or a work situation that did not turn out well - and show what you learned from it and how you've improved since then....",
      "This is a disguised \"tell me your strengths and weaknesses\" question, so you should follow the advice given above....",
      "This one is a bit tricky because it's so direct. You could attempt to make a joke out of this one and say something like, \"If you decided you weren't hiring at all!\" but that may not go well if your interviewer doesn't appreciate humor...."
    ],
    "correct": 3,
    "explanation": "This one is a bit tricky because it's so direct. You could attempt to make a joke out of this one and say something like, \"If you decided you weren't hiring at all!\" but that may not go well if your interviewer doesn't appreciate humor. Otherwise, the best response may be to turn this around and say, \"I see no reason why you wouldn't - I'm your best choice because….\" and then give your strengths instead. If they really press you on this, you can admit a weakness and then say how you've been working to improve it."
  },
  {
    "id": 51,
    "category": "Strengths / Weaknesses",
    "difficulty": "trung-binh",
    "question": "Tell me why we should hire you in 3 sentences.",
    "options": [
      "If you did get an offer, this is an easy question: \"yes.\" If you did not receive an offer, I would strongly recommend against lying about it - state that you did not receive an offer, and it was due to the economy, because your group was not hiring or due to other forces beyond y...",
      "As with any \"weaknesses\" question, you need to use a specific story - such as an exam where you did not do well, a project that did not go as planned, or a work situation that did not turn out well - and show what you learned from it and how you've improved since then....",
      "The 2 most important points to remember with the \"weaknesses\" / \"failure\" question: 1....",
      "This is yet another variation of the \"strengths\" question. But rather than giving generic strengths, you should highlight any unique experiences you've had...."
    ],
    "correct": 3,
    "explanation": "This is yet another variation of the \"strengths\" question. But rather than giving generic strengths, you should highlight any unique experiences you've had. So maybe you haven't had banking internships before - but you have had unique experience abroad, in an unusual setting, or doing something not many others have done, or you've overcome unusual hardship - and those make you particularly well-qualified. Try to make your answer some variant of \"I'm smart because of [School / Academics], I can do the work because of [Internships / Previous Jobs], and I'm an interesting person and fun to be around because of [Unique Experience].\""
  },
  {
    "id": 52,
    "category": "Strengths / Weaknesses",
    "difficulty": "trung-binh",
    "question": "What was your greatest failure?",
    "options": [
      "This is a variant of the \"strengths and weaknesses\" question. The most common mistake is being vague and just saying you performed well and they liked you, and then failing to give weaknesses / areas for improvement....",
      "This is yet another variation of the \"strengths\" question. But rather than giving generic strengths, you should highlight any unique experiences you've had....",
      "As with any \"weaknesses\" question, you need to use a specific story - such as an exam where you did not do well, a project that did not go as planned, or a work situation that did not turn out well - and show what you learned from it and how you've improved since then....",
      "This is a disguised \"tell me your strengths and weaknesses\" question, so you should follow the advice given above...."
    ],
    "correct": 2,
    "explanation": "As with any \"weaknesses\" question, you need to use a specific story - such as an exam where you did not do well, a project that did not go as planned, or a work situation that did not turn out well - and show what you learned from it and how you've improved since then. Don't say something fake like, \"My greatest failure was getting into Yale and Princeton but not Harvard\" - that makes you look silly. It's better to give something real and then show how you've used the failure to develop."
  },
  {
    "id": 53,
    "category": "Team / Leadership",
    "difficulty": "trung-binh",
    "question": "Can you talk about a team project or some kind of group activity you've worked on before?",
    "options": [
      "soldier\" that can also work as long as you worked long hours, were attentive to detail and/or came through in the end to save the team in some way.",
      "Ideally, you will talk about something that was a success rather than a failure....",
      "Resist the urge to say \"leader\" and instead talk about how you can function as both a leader and another member of the team, depending on what the situation calls for....",
      "No, the team makes the team. The leader can provide direction and unify everyone, but 1 person alone is not a \"team.\" A leader can make things better and turn around a dysfunctional team, but it's equally important for everyone to pull their own weight. You ca..."
    ],
    "correct": 1,
    "explanation": "Ideally, you will talk about something that was a success rather than a failure. You should use the following 3-point structure for these questions: 1. State upfront what the problem was - Maximizing returns? Attracting more donors for your nonprofit? Winning more customers?"
  },
  {
    "id": 54,
    "category": "Team / Leadership",
    "difficulty": "trung-binh",
    "question": "Talk about the team you worked in, who did what, and what your role was. Did you manage people or delegate tasks? Those are best, but if you were a \"foot",
    "options": [
      "This is one of the fundamental questions that you need to be prepared for, because it will almost always come up in some form in interviews....",
      "Point out how you stayed calm and collected in the face of a challenging situation, and how your cool decision-making process led to a positive outcome....",
      "A \"moderate\" answer works best here. You're responsible and can make sure things get done, but at the same time you don't annoy your teammates by micro-managing....",
      "soldier\" that can also work as long as you worked long hours, were attentive to detail and/or came through in the end to save the team in some way."
    ],
    "correct": 3,
    "explanation": "soldier\" that can also work as long as you worked long hours, were attentive to detail and/or came through in the end to save the team in some way."
  },
  {
    "id": 55,
    "category": "Team / Leadership",
    "difficulty": "trung-binh",
    "question": "State the results - Did your brand awareness go up? Did you get more funding? More members for your organization?",
    "options": [
      "This is the classic \"burn the midnight oil\" question, and you should definitely have something prepared for this one....",
      "Ideally, you will talk about something that was a success rather than a failure....",
      "This is one of the fundamental questions that you need to be prepared for, because it will almost always come up in some form in interviews....",
      "No, the team makes the team. The leader can provide direction and unify everyone, but 1 person alone is not a \"team.\" A leader can make things better and turn around a dysfunctional team, but it's equally important for everyone to pull their own weight. You ca..."
    ],
    "correct": 2,
    "explanation": "This is one of the fundamental questions that you need to be prepared for, because it will almost always come up in some form in interviews. 2. Can you describe a situation where a team did not work as intended? Whose fault was it? This is another variant of the \"failure\" question. I would recommend starting with a situation where your team did work as intended and talk about how it wasn't working at first and what you did to fix it. Never blame someone specific - instead, say that there were \"personality conflicts\" and that you worked to resolve them. To make things even easier, you could re-use the story you told in question #1 but instead position it as a failed team situation that turned into a successful one. 3. Can you discuss an ethical challenge you were confronted with and how you responded? If you've already worked full-time, any ethical challenges you faced at work or any whistle-blowing you've done are best to discuss; otherwise, you could talk about how you stopped funds in a student group from being used illegally or how you caught someone cheating. Just make sure you don't over-dramatize it - your life is not a soap opera and you shouldn't go on for 10 minutes about your internal conflict deciding whether to turn someone in for their wrongdoing."
  },
  {
    "id": 56,
    "category": "Team / Leadership",
    "difficulty": "trung-binh",
    "question": "What was the most difficult situation you faced as a leader and how did you respond?",
    "options": [
      "Ideally, you will talk about something that was a success rather than a failure....",
      "A \"moderate\" answer works best here. You're responsible and can make sure things get done, but at the same time you don't annoy your teammates by micro-managing....",
      "Resist the urge to say \"leader\" and instead talk about how you can function as both a leader and another member of the team, depending on what the situation calls for....",
      "Point out how you stayed calm and collected in the face of a challenging situation, and how your cool decision-making process led to a positive outcome...."
    ],
    "correct": 3,
    "explanation": "Point out how you stayed calm and collected in the face of a challenging situation, and how your cool decision-making process led to a positive outcome. Maybe 2 of your subordinates couldn't get along and you had to arbitrate; maybe you were 3 months behind on a project and had to get a team together to finish it in 2 weeks; maybe you were an RA in a dorm and you had to prevent 2 residents from harassing each other. Just make sure that it's a real problem, as opposed to only getting an A- when you should have gotten an A."
  },
  {
    "id": 57,
    "category": "Team / Leadership",
    "difficulty": "trung-binh",
    "question": "Can you discuss a time where you had to sacrifice your time for the sake of a team project?",
    "options": [
      "This is the classic \"burn the midnight oil\" question, and you should definitely have something prepared for this one....",
      "Point out how you stayed calm and collected in the face of a challenging situation, and how your cool decision-making process led to a positive outcome....",
      "This is one of the fundamental questions that you need to be prepared for, because it will almost always come up in some form in interviews....",
      "soldier\" that can also work as long as you worked long hours, were attentive to detail and/or came through in the end to save the team in some way."
    ],
    "correct": 0,
    "explanation": "This is the classic \"burn the midnight oil\" question, and you should definitely have something prepared for this one. There are 2 key points: 1. Whatever you did had to involve long hours - 60-70 hours per week or more 2. It had to have been over an extended time period - so Final Exam week at school would be a poor example. Aim for something that took place over weeks or months instead. Maybe you were working full-time and also leading your volunteer group to build shelters; maybe you were taking 6 classes, running a fraternity, and then got called upon to direct that huge Cinco de Mayo festival. It doesn't matter too much what it was as long as your story is detailed and convincing."
  },
  {
    "id": 58,
    "category": "Team / Leadership",
    "difficulty": "trung-binh",
    "question": "Do you work better as a leader or a follower?",
    "options": [
      "Point out how you stayed calm and collected in the face of a challenging situation, and how your cool decision-making process led to a positive outcome....",
      "Resist the urge to say \"leader\" and instead talk about how you can function as both a leader and another member of the team, depending on what the situation calls for....",
      "No, the team makes the team. The leader can provide direction and unify everyone, but 1 person alone is not a \"team.\" A leader can make things better and turn around a dysfunctional team, but it's equally important for everyone to pull their own weight. You ca...",
      "This is the classic \"burn the midnight oil\" question, and you should definitely have something prepared for this one...."
    ],
    "correct": 1,
    "explanation": "Resist the urge to say \"leader\" and instead talk about how you can function as both a leader and another member of the team, depending on what the situation calls for. You don't want to hog the spotlight or do everything, but if leadership is required, you can step up and handle it. Specific examples to back up the above points are also required."
  },
  {
    "id": 59,
    "category": "Team / Leadership",
    "difficulty": "trung-binh",
    "question": "What is your leadership style?",
    "options": [
      "No, the team makes the team. The leader can provide direction and unify everyone, but 1 person alone is not a \"team.\" A leader can make things better and turn around a dysfunctional team, but it's equally important for everyone to pull their own weight. You ca...",
      "A \"moderate\" answer works best here. You're responsible and can make sure things get done, but at the same time you don't annoy your teammates by micro-managing....",
      "Point out how you stayed calm and collected in the face of a challenging situation, and how your cool decision-making process led to a positive outcome....",
      "Ideally, you will talk about something that was a success rather than a failure...."
    ],
    "correct": 1,
    "explanation": "A \"moderate\" answer works best here. You're responsible and can make sure things get done, but at the same time you don't annoy your teammates by micro-managing. If you're interviewing for an Analyst or Associate position, you do want to be a bit more \"hands-on\" and point out that you often go in and correct mistakes to make sure everything's perfect - since you'll be spending around 50% of your time doing this. Again, a specific example is needed once you've stated in general terms what your style is."
  },
  {
    "id": 60,
    "category": "Team / Leadership",
    "difficulty": "trung-binh",
    "question": "Does the leader make the team?",
    "options": [
      "No, the team makes the team. The leader can provide direction and unify everyone, but 1 person alone is not a \"team.\" A leader can make things better and turn around a dysfunctional team, but it's equally important for everyone to pull their own weight. You ca...",
      "Point out how you stayed calm and collected in the face of a challenging situation, and how your cool decision-making process led to a positive outcome....",
      "Ideally, you will talk about something that was a success rather than a failure....",
      "This is the classic \"burn the midnight oil\" question, and you should definitely have something prepared for this one...."
    ],
    "correct": 0,
    "explanation": "No, the team makes the team. The leader can provide direction and unify everyone, but 1 person alone is not a \"team.\" A leader can make things better and turn around a dysfunctional team, but it's equally important for everyone to pull their own weight. You can often re-use some of your other \"leadership\" or \"team\" stories you've used and spin them differently."
  },
  {
    "id": 61,
    "category": "Understanding Banking",
    "difficulty": "trung-binh",
    "question": "You've never worked in finance before. How much do you know about what bankers actually do?",
    "options": [
      "This one is bank-dependent and will differ for boutiques, middle-market firms and bulge brackets - so you need to research it before your interview....",
      "ECM and DCM are both more \"markets-based\" than M&A. In M&A your job is to execute sell-side and buy-side transactions, whereas in ECM/DCM most of your tasks are related to staying on top of the market, following current trends, and making recommendations to industry and product g...",
      "You should acknowledge that although you haven't worked in the field before, you've done a lot of research on your own and have spoken with many friends in the industry....",
      "It's similar to the IPO process: 1. Meet with the client and gather basic financial, industry, and customer information...."
    ],
    "correct": 2,
    "explanation": "You should acknowledge that although you haven't worked in the field before, you've done a lot of research on your own and have spoken with many friends in the industry. Based on that, you know that bankers advise companies on transactions - buying and selling other companies, and raising capital. They are \"agents\" that connect a company with the appropriate buyer, seller, or investor. The day-to-day work involves creating presentations, financial analysis and marketing materials such as Executive Summaries."
  },
  {
    "id": 62,
    "category": "Understanding Banking",
    "difficulty": "trung-binh",
    "question": "Let's say I'm working on an IPO for a client. Can you describe briefly what I would do?",
    "options": [
      "First, you meet with the client and gather basic information - such as their financial details, an industry overview, and who their customers are....",
      "This is similar to many of the other questions we've been over - once again, emphasize that you not only worked long hours, but also did it over several weeks or several months....",
      "This one is bank-dependent and will differ for boutiques, middle-market firms and bulge brackets - so you need to research it before your interview....",
      "\"Put the name of the company in the header, then divide the slide into 4 equal parts...."
    ],
    "correct": 0,
    "explanation": "First, you meet with the client and gather basic information - such as their financial details, an industry overview, and who their customers are. Next, you meet with other bankers and the lawyers to draft the S-1 registration statement - which describes the company's business and markets it to investors. You receive some comments from the SEC and keep revising the document until it's acceptable. Then, you spend a few weeks going on a \"road show\" where you present the company to institutional investors and convince them to invest. Afterwards, the company begins trading on an exchange once you've raised the capital from investors."
  },
  {
    "id": 63,
    "category": "Understanding Banking",
    "difficulty": "trung-binh",
    "question": "How much do you know about the lifestyle in this industry? Do you know how many hours you're going to work each week?",
    "options": [
      "This one is bank-dependent and will differ for boutiques, middle-market firms and bulge brackets - so you need to research it before your interview....",
      "They're similar but Leveraged Finance is more \"modeling-intensive\" and does more of the deal execution with industry and M&A groups on LBOs and debt financings....",
      "Say that you've done your homework and you understand it's going to be an 80-100 hour per week job....",
      "\"Put the name of the company in the header, then divide the slide into 4 equal parts...."
    ],
    "correct": 2,
    "explanation": "Say that you've done your homework and you understand it's going to be an 80-100 hour per week job. It helps if you can reference specific times when you worked that much and how you dealt with it, whether it was in a summer internship or a previous job you've held."
  },
  {
    "id": 64,
    "category": "Understanding Banking",
    "difficulty": "trung-binh",
    "question": "I see you were an English major in college, and had time to participate in a lot of different activities. Can you talk about a time when you had to work long hours and make sacrifices?",
    "options": [
      "This is usually based on relationships - banks develop relationships with companies over the years before they need anything, and then when it comes time to do a deal, the company calls different banks it has spoken with and asks them to \"pitch\" for the business....",
      "1. Spend a lot of time upfront doing research on dozens or hundreds of potential acquisition targets, and go through multiple cycles of selection and filtering with the company you're representing. 2. Narrow down the list based on their feedback and decide whi...",
      "It depends on the type of deal the bank is pitching for, but the most common structure is: 1....",
      "This is similar to many of the other questions we've been over - once again, emphasize that you not only worked long hours, but also did it over several weeks or several months...."
    ],
    "correct": 3,
    "explanation": "This is similar to many of the other questions we've been over - once again, emphasize that you not only worked long hours, but also did it over several weeks or several months. One point that makes this question different: because of the way it was framed, you probably want to discuss something outside extracurricular activities."
  },
  {
    "id": 65,
    "category": "Understanding Banking",
    "difficulty": "trung-binh",
    "question": "Can you tell me about the different product and industry groups at our bank?",
    "options": [
      "This is usually based on relationships - banks develop relationships with companies over the years before they need anything, and then when it comes time to do a deal, the company calls different banks it has spoken with and asks them to \"pitch\" for the business....",
      "This one is bank-dependent and will differ for boutiques, middle-market firms and bulge brackets - so you need to research it before your interview....",
      "At a high-level, first you'd want to see what their expansion goals are and how they can best achieve them - whether it's by partnering with another company, expanding with a merger or acquisition, or expanding organically with new products....",
      "It's similar to the IPO process: 1. Meet with the client and gather basic financial, industry, and customer information...."
    ],
    "correct": 1,
    "explanation": "This one is bank-dependent and will differ for boutiques, middle-market firms and bulge brackets - so you need to research it before your interview. Typical product groups include Mergers & Acquisitions (M&A), Leveraged Finance (LevFin) and Restructuring; you could also consider Equity Capital Markets and Debt Capital Markets \"product groups\" but that one is debatable. Common industry groups include Healthcare, Retail, Industrials, Energy, Natural Resources, Financial Institutions, Gaming, Real Estate and Technology, Media & Telecom (TMT). Not all banks are structured this way - Goldman Sachs, for example, does not have product groups and instead handles all types of deals in its industry groups. Meanwhile, most bulge bracket banks do not have Restructuring groups at all - that is something that only middle-market and boutique firms do. Finally, a lot of boutiques focus only on M&A and/or Restructuring and ones that are small enough are not even split into industry groups."
  },
  {
    "id": 66,
    "category": "Understanding Banking",
    "difficulty": "trung-binh",
    "question": "What's in a pitch book?",
    "options": [
      "It depends on the type of deal the bank is pitching for, but the most common structure is: 1....",
      "It's when a company (public or private) decides to sell off a specific division rather than sell the entire company....",
      "First, you meet with the client and gather basic information - such as their financial details, an industry overview, and who their customers are....",
      "It's similar to the IPO process: 1. Meet with the client and gather basic financial, industry, and customer information...."
    ],
    "correct": 0,
    "explanation": "It depends on the type of deal the bank is pitching for, but the most common structure is: 1. Bank \"credentials\" (similar deals they've done to \"prove\" their expertise). 2. Summary of a company's options (\"strategic alternatives\" in banker-speak). 3. Valuation and appropriate financial models (for example, if you're pitching for an IPO you might show where the IPO proceeds would go). 4. Potential acquisition targets (buy-side M&A deal) or potential buyers (sell-side M&A deal). This is not applicable for equity/debt deals. 5. Summary and key recommendations."
  },
  {
    "id": 67,
    "category": "Understanding Banking",
    "difficulty": "trung-binh",
    "question": "How do companies select the bankers they work with?",
    "options": [
      "This is similar to many of the other questions we've been over - once again, emphasize that you not only worked long hours, but also did it over several weeks or several months....",
      "This is usually based on relationships - banks develop relationships with companies over the years before they need anything, and then when it comes time to do a deal, the company calls different banks it has spoken with and asks them to \"pitch\" for the business....",
      "It's when a company (public or private) decides to sell off a specific division rather than sell the entire company....",
      "ECM and DCM are both more \"markets-based\" than M&A. In M&A your job is to execute sell-side and buy-side transactions, whereas in ECM/DCM most of your tasks are related to staying on top of the market, following current trends, and making recommendations to industry and product g..."
    ],
    "correct": 1,
    "explanation": "This is usually based on relationships - banks develop relationships with companies over the years before they need anything, and then when it comes time to do a deal, the company calls different banks it has spoken with and asks them to \"pitch\" for the business. This is called a \"bake-off\" and the company selects the \"winner\" afterward."
  },
  {
    "id": 68,
    "category": "Understanding Banking",
    "difficulty": "trung-binh",
    "question": "Walk me through the process of a typical sell-side M&A deal.",
    "options": [
      "\"Put the name of the company in the header, then divide the slide into 4 equal parts....",
      "You should acknowledge that although you haven't worked in the field before, you've done a lot of research on your own and have spoken with many friends in the industry....",
      "A typical sell-side M&A deal with many potential buyers would look like this: 1....",
      "They're similar but Leveraged Finance is more \"modeling-intensive\" and does more of the deal execution with industry and M&A groups on LBOs and debt financings...."
    ],
    "correct": 2,
    "explanation": "A typical sell-side M&A deal with many potential buyers would look like this: 1. Meet with company, create initial marketing materials like the Executive Summary and Offering Memorandum (OM), and decide on potential buyers. 2. Send out Executive Summary to potential buyers to gauge interest. 3. Send NDAs (Non-Disclosure Agreements) to interested buyers along with more detailed information like the Offering Memorandum, and respond to any follow- up due diligence requests from the buyers. 4. Set a \"bid deadline\" and solicit written Indications of Interest (IOIs) from buyers. 5. Select which buyers advance to the next round. 6. Continue responding to information requests and setting up due diligence meetings between the company and potential buyers. 7. Set another bid deadline and pick the \"winner.\" 8. Negotiate terms of the Purchase Agreement with the winner and announce the deal."
  },
  {
    "id": 69,
    "category": "Understanding Banking",
    "difficulty": "trung-binh",
    "question": "Walk me through the process of a typical buy-side M&A deal.",
    "options": [
      "A typical sell-side M&A deal with many potential buyers would look like this: 1....",
      "ECM and DCM are both more \"markets-based\" than M&A. In M&A your job is to execute sell-side and buy-side transactions, whereas in ECM/DCM most of your tasks are related to staying on top of the market, following current trends, and making recommendations to industry and product g...",
      "First, you meet with the client and gather basic information - such as their financial details, an industry overview, and who their customers are....",
      "1. Spend a lot of time upfront doing research on dozens or hundreds of potential acquisition targets, and go through multiple cycles of selection and filtering with the company you're representing. 2. Narrow down the list based on their feedback and decide whi..."
    ],
    "correct": 3,
    "explanation": "1. Spend a lot of time upfront doing research on dozens or hundreds of potential acquisition targets, and go through multiple cycles of selection and filtering with the company you're representing. 2. Narrow down the list based on their feedback and decide which ones to approach. 3. Conduct meetings and gauge the receptivity of each potential seller. 4. As discussions with the most likely seller become more serious, conduct more in- depth due diligence and figure out your offer price. 5. Negotiate the price and key terms of the Purchase Agreement and then announce the transaction."
  },
  {
    "id": 70,
    "category": "Understanding Banking",
    "difficulty": "trung-binh",
    "question": "Walk me through a debt issuance deal.",
    "options": [
      "It's similar to the IPO process: 1. Meet with the client and gather basic financial, industry, and customer information....",
      "A typical sell-side M&A deal with many potential buyers would look like this: 1....",
      "This is similar to many of the other questions we've been over - once again, emphasize that you not only worked long hours, but also did it over several weeks or several months....",
      "You should acknowledge that although you haven't worked in the field before, you've done a lot of research on your own and have spoken with many friends in the industry...."
    ],
    "correct": 0,
    "explanation": "It's similar to the IPO process: 1. Meet with the client and gather basic financial, industry, and customer information. 2. Work closely with DCM / Leveraged Finance to develop a debt financing or LBO model for the company and figure out what kind of leverage, coverage ratios, and covenants might be appropriate. 3. Create an investor memorandum describing all of this. 4. Go out to potential debt investors and win commitments from them to finance the deal. The main differences vs. an IPO: there are fewer banks involved, and you don't need SEC approval to do any of this because debt is not sold to the \"general public\" but rather to sophisticated institutional investors and funds."
  },
  {
    "id": 71,
    "category": "Understanding Banking",
    "difficulty": "trung-binh",
    "question": "How are Equity Capital Markets (ECM) and Debt Capital Markets (DCM) different from M&A or industry groups?",
    "options": [
      "It depends on the type of deal the bank is pitching for, but the most common structure is: 1....",
      "ECM and DCM are both more \"markets-based\" than M&A. In M&A your job is to execute sell-side and buy-side transactions, whereas in ECM/DCM most of your tasks are related to staying on top of the market, following current trends, and making recommendations to industry and product g...",
      "First, you meet with the client and gather basic information - such as their financial details, an industry overview, and who their customers are....",
      "This is similar to many of the other questions we've been over - once again, emphasize that you not only worked long hours, but also did it over several weeks or several months...."
    ],
    "correct": 1,
    "explanation": "ECM and DCM are both more \"markets-based\" than M&A. In M&A your job is to execute sell-side and buy-side transactions, whereas in ECM/DCM most of your tasks are related to staying on top of the market, following current trends, and making recommendations to industry and product groups for clients and pitch books. In ECM/DCM you go more in-depth on certain parts of the deal process, but you don't get as broad a view as you might in other groups."
  },
  {
    "id": 72,
    "category": "Understanding Banking",
    "difficulty": "trung-binh",
    "question": "What's the difference between DCM and Leveraged Finance?",
    "options": [
      "This one is bank-dependent and will differ for boutiques, middle-market firms and bulge brackets - so you need to research it before your interview....",
      "You should acknowledge that although you haven't worked in the field before, you've done a lot of research on your own and have spoken with many friends in the industry....",
      "Say that you've done your homework and you understand it's going to be an 80-100 hour per week job....",
      "They're similar but Leveraged Finance is more \"modeling-intensive\" and does more of the deal execution with industry and M&A groups on LBOs and debt financings...."
    ],
    "correct": 3,
    "explanation": "They're similar but Leveraged Finance is more \"modeling-intensive\" and does more of the deal execution with industry and M&A groups on LBOs and debt financings. DCM, by contrast, is more closely tied to the markets and tracks trends and relevant data. But there's always overlap and some banks have just 1 of these groups, some have both, and some divide it differently altogether."
  },
  {
    "id": 73,
    "category": "Understanding Banking",
    "difficulty": "trung-binh",
    "question": "Explain what a divestiture is.",
    "options": [
      "They're similar but Leveraged Finance is more \"modeling-intensive\" and does more of the deal execution with industry and M&A groups on LBOs and debt financings....",
      "It's when a company (public or private) decides to sell off a specific division rather than sell the entire company....",
      "You should acknowledge that although you haven't worked in the field before, you've done a lot of research on your own and have spoken with many friends in the industry....",
      "This is similar to many of the other questions we've been over - once again, emphasize that you not only worked long hours, but also did it over several weeks or several months...."
    ],
    "correct": 1,
    "explanation": "It's when a company (public or private) decides to sell off a specific division rather than sell the entire company. The process is very similar to the sell-side M&A process above, but it tends to be \"messier\" because you're dealing with a part of one company rather than the whole thing. Creating a \"standalone operating model\" for the particular division they're selling is extremely important, and the transaction structure and valuation are more complex than they would be for a \"plain-vanilla\" M&A deal."
  },
  {
    "id": 74,
    "category": "Understanding Banking",
    "difficulty": "trung-binh",
    "question": "Imagine you want to draft a 1-slide company profile for an investor. What would you put there?",
    "options": [
      "\"Put the name of the company in the header, then divide the slide into 4 equal parts....",
      "Say that you've done your homework and you understand it's going to be an 80-100 hour per week job....",
      "It's when a company (public or private) decides to sell off a specific division rather than sell the entire company....",
      "This is usually based on relationships - banks develop relationships with companies over the years before they need anything, and then when it comes time to do a deal, the company calls different banks it has spoken with and asks them to \"pitch\" for the business...."
    ],
    "correct": 0,
    "explanation": "\"Put the name of the company in the header, then divide the slide into 4 equal parts. The top-left is for the business description, headquarters, and key executives. Put a stock chart and the key historical and projected financial metrics and multiples on the top right. The bottom left can have descriptions of products and services, and the bottom right should have key geographies with a color-coded map to make it look pretty.\""
  },
  {
    "id": 75,
    "category": "Understanding Banking",
    "difficulty": "trung-binh",
    "question": "Let's say you're hired as the financial advisor for a company. What value could you add for them if they ask you about their suggested growth / M&A strategy?",
    "options": [
      "At a high-level, first you'd want to see what their expansion goals are and how they can best achieve them - whether it's by partnering with another company, expanding with a merger or acquisition, or expanding organically with new products....",
      "It's similar to the IPO process: 1. Meet with the client and gather basic financial, industry, and customer information....",
      "ECM and DCM are both more \"markets-based\" than M&A. In M&A your job is to execute sell-side and buy-side transactions, whereas in ECM/DCM most of your tasks are related to staying on top of the market, following current trends, and making recommendations to industry and product g...",
      "It depends on the type of deal the bank is pitching for, but the most common structure is: 1...."
    ],
    "correct": 0,
    "explanation": "At a high-level, first you'd want to see what their expansion goals are and how they can best achieve them - whether it's by partnering with another company, expanding with a merger or acquisition, or expanding organically with new products. As the investment banker, you could provide value by making introductions to potential M&A targets and partners, and then advising on the best negotiation strategy, what companies would be most receptive, what type of price to expect, and how to manage the entire process."
  },
  {
    "id": 76,
    "category": "\"Warren Buffett\"",
    "difficulty": "trung-binh",
    "question": "Let's say you had $10 million to invest in anything. What would you do with it?",
    "options": [
      "You want to say who the buyer and seller were - and include background information if they are not household names - as well as the price and the multiples (Purchase Price / Revenue, Purchase Price / EBITDA) if they are readily available....",
      "Always ask for the investor's goals first. Are they looking to have big capital gains over 30- 40 years?...",
      "To assess whether it's \"viable,\" you have to determine whether you can make a profit with the business....",
      "You'll want to ask follow-up questions to see if the interviewer is looking for something more specific, because this one is wide open...."
    ],
    "correct": 1,
    "explanation": "Always ask for the investor's goals first. Are they looking to have big capital gains over 30- 40 years? Are they looking for tax-free retirement income? What types of assets interest them? Based on the response, you can give an appropriate answer. So if they're investing over 30-40 years and going for high capital gains, a well-diversified portfolio is probably best; if they are more concerned with tax-free income, maybe you should tell them about municipal bonds."
  },
  {
    "id": 77,
    "category": "\"Warren Buffett\"",
    "difficulty": "trung-binh",
    "question": "If you owned a small business and were approached by a larger company about an acquisition, how would you think about the offer, and how would you make a decision on what to do?",
    "options": [
      "You'll want to ask follow-up questions to see if the interviewer is looking for something more specific, because this one is wide open....",
      "The key terms to consider would be: 1. Price 2....",
      "This is very common if you're interviewing for any industry group - I recommend doing some research beforehand and being able to speak about trends in that market....",
      "Always ask for the investor's goals first. Are they looking to have big capital gains over 30- 40 years?..."
    ],
    "correct": 1,
    "explanation": "The key terms to consider would be: 1. Price 2. Form of payment - cash, stock, or debt 3. Future plans for the company vis-à-vis your own plans. Of course, there is much more to an M&A deal than this - you could list literally hundreds of different terms. But those are the key ones. To make a decision you'd have to weigh each one - there's no \"magical\" way to decide. You might also point out that if something is particularly important to you - such as retaining a role in the company - then a difference of intentions there could be a \"deal-breaker.\""
  },
  {
    "id": 78,
    "category": "\"Warren Buffett\"",
    "difficulty": "trung-binh",
    "question": "We do most of our work with technology companies. Can you talk about a trend or company in the industry that has piqued your interest lately?",
    "options": [
      "Always ask for the investor's goals first. Are they looking to have big capital gains over 30- 40 years?...",
      "This is very common if you're interviewing for any industry group - I recommend doing some research beforehand and being able to speak about trends in that market....",
      "You want to say who the buyer and seller were - and include background information if they are not household names - as well as the price and the multiples (Purchase Price / Revenue, Purchase Price / EBITDA) if they are readily available....",
      "You'll want to ask follow-up questions to see if the interviewer is looking for something more specific, because this one is wide open...."
    ],
    "correct": 1,
    "explanation": "This is very common if you're interviewing for any industry group - I recommend doing some research beforehand and being able to speak about trends in that market. It's easy to find this information for Technology and anything that sells to consumers, but it's a bit harder for something like Chemicals. Most interviewees make 3 mistakes with this question: 1. They describe something that is not recent or relevant. Don't talk about the emergence of the Internet - talk about how companies are shifting their software to the Internet. 2. They don't explain the \"why\" - they're shifting to the web because it's cheaper and lower maintenance for them. 3. They don't explain the impact on the market as a whole - such companies are growing very quickly while more traditional companies are either struggling or shifting to that model."
  },
  {
    "id": 79,
    "category": "\"Warren Buffett\"",
    "difficulty": "trung-binh",
    "question": "Let's say you could start any type of business you wanted, and you had $1 million in initial funds. What would you do?",
    "options": [
      "Always ask for the investor's goals first. Are they looking to have big capital gains over 30- 40 years?...",
      "You'll want to ask follow-up questions to see if the interviewer is looking for something more specific, because this one is wide open....",
      "The key terms to consider would be: 1. Price 2....",
      "To assess whether it's \"viable,\" you have to determine whether you can make a profit with the business...."
    ],
    "correct": 1,
    "explanation": "You'll want to ask follow-up questions to see if the interviewer is looking for something more specific, because this one is wide open. If no further direction is provided, you probably want to say that you'd think about some type of niche business with high margins that requires little startup capital ($1 million is not enough to build 10 factories) and ongoing maintenance - those make it harder to turn a profit and sell the business one day. (This is one reason why some private equity investors focus on software companies). It's better to focus on a niche market because most broad, horizontal markets are already dominated by major companies (Microsoft, Goldman Sachs, Exxon Mobil, etc.). You should also explain your reasoning on why this type of business would be attractive and how it could grow with minimal future investment."
  },
  {
    "id": 80,
    "category": "\"Warren Buffett\"",
    "difficulty": "trung-binh",
    "question": "Can you talk about a company you admire and what makes them attractive to you?",
    "options": [
      "Do not say something commonly known. Saying Google or Apple, for example, would be bad....",
      "To assess whether it's \"viable,\" you have to determine whether you can make a profit with the business....",
      "The key terms to consider would be: 1. Price 2....",
      "You want to say who the buyer and seller were - and include background information if they are not household names - as well as the price and the multiples (Purchase Price / Revenue, Purchase Price / EBITDA) if they are readily available...."
    ],
    "correct": 0,
    "explanation": "Do not say something commonly known. Saying Google or Apple, for example, would be bad. Instead, go more obscure and pick a company no one knows so that they can tell you've done your research and so that they're less likely to ask probing questions. You don't necessarily need to give financial details, but if the company is public and you can easily find the information, it definitely helps. When you talk about what makes the firm attractive, emphasize qualities that investors would find appealing, such as a great and well-diversified customer base, a unique competitive advantage in the market or a high-margin business model. Don't say that you like them because your new iPhone is awesome."
  },
  {
    "id": 81,
    "category": "\"Warren Buffett\"",
    "difficulty": "trung-binh",
    "question": "Let's assume you are going to start a laundry machine business. How would you analyze whether it's viable?",
    "options": [
      "To assess whether it's \"viable,\" you have to determine whether you can make a profit with the business....",
      "You want to say who the buyer and seller were - and include background information if they are not household names - as well as the price and the multiples (Purchase Price / Revenue, Purchase Price / EBITDA) if they are readily available....",
      "You'll want to ask follow-up questions to see if the interviewer is looking for something more specific, because this one is wide open....",
      "Always ask for the investor's goals first. Are they looking to have big capital gains over 30- 40 years?..."
    ],
    "correct": 0,
    "explanation": "To assess whether it's \"viable,\" you have to determine whether you can make a profit with the business. For a laundry machine operation, you'd start by looking at the location (the most important part of any retail business), estimate how many customers you could get, how frequently they do laundry and how much they pay each time to do their laundry. Those variables give you an idea of monthly / annual revenue. On the expense side, the biggest cost would be the upfront construction and/or purchase of the building and the machines. You would probably need a loan for this unless you had a spare $500K in your bank account. You would also have to take into account the cost of maintaining and servicing the machines, building maintenance, and hiring someone to collect cash, clean, and open/close the building each day. Overall, location plays the biggest role in the success of this type of business - if you put your new company next to an apartment complex where everyone has laundry machines, you're doomed from the beginning. Incidentally, laundry machines happen to be very profitable businesses if run correctly - mostly because they are not labor intensive and do not require huge investments after you've gotten started. So you could even use this as an example for the \"What kind of business would you start with $1 million?\" question."
  },
  {
    "id": 82,
    "category": "\"Warren Buffett\"",
    "difficulty": "trung-binh",
    "question": "Tell me about an M&A deal that interested you recently.",
    "options": [
      "You'll want to ask follow-up questions to see if the interviewer is looking for something more specific, because this one is wide open....",
      "Always ask for the investor's goals first. Are they looking to have big capital gains over 30- 40 years?...",
      "This is very common if you're interviewing for any industry group - I recommend doing some research beforehand and being able to speak about trends in that market....",
      "You want to say who the buyer and seller were - and include background information if they are not household names - as well as the price and the multiples (Purchase Price / Revenue, Purchase Price / EBITDA) if they are readily available...."
    ],
    "correct": 3,
    "explanation": "You want to say who the buyer and seller were - and include background information if they are not household names - as well as the price and the multiples (Purchase Price / Revenue, Purchase Price / EBITDA) if they are readily available. Read the relevant Wall Street Journal article on it, and discuss the dynamics of the deal - how it developed, if anyone else was interested, and what implications it has for the industry. You don't need to be an expert, but you do need to sound intelligent and know the basics. If they start asking for information you don't know, just admit upfront that you don't know whatever they've asked for. 8. Pitch me a stock. You can refer to #5 in this section - the company you admire - because both these questions are quite similar. One difference is that if the question is \"pitch me a stock,\" you need to mention specific financial figures. Since the company is public, it shouldn't be too hard to find those. Even if you can't get Revenue or EBITDA multiples, looking up its P/E multiple and saying whether it's higher or lower than competitors is a step in the right direction. The 2 most common mistakes: 1. Failing to list specific financial figures. 2. Saying how the company stacks up relative to its competition, and why its prospects are more favorable. Structure your answer with the following 5 points in mind: 1. Give the name and summarize what the company does. 2. Give a brief overview of its financials to indicate its size and how profitable it is. 3. State how it's undervalued or more attractive than its rivals, due to any competitive advantages it has. 4. Say how there is a long-term trend in its favor - it's not just looking good in the past month. 5. Talk about how the next 5-10 years will be really good for the company. 9. Can you explain to me, in simple terms, the subprime crisis? In simple terms, banks made mortgage loans to people who were in no position to pay them off - or even meet monthly payments. Since interest rates were at historical lows, borrowing was easy. At the same time, mortgages were no longer just loans made to individuals - they were sliced up, combined and \"packaged\" into securities that banks traded, acquired and sold to investors. A typical \"package\" might contain mortgages given to both \"credible\" borrowers as well as mortgages granted to more risky borrowers - the more risky ones were labeled \"subprime.\" Banks acquired these \"packaged\" assets on the argument that even if one \"piece\" of the asset was risky or likely to default, the rest still had value. As it turns out, this was false and no one knew what any of these mortgage-related assets were worth - but as unqualified homeowners began defaulting, buyers disappeared overnight and the value of these assets plummeted to $0. As a result, the value of many banks also approached $0 and quite a few failed or went bankrupt in the process - all because the securities were so complex that no one understood their value or the true risks involved. 10. Do you agree with the $700 billion bank bailout? Your specific answer doesn't matter too much - just make sure you actually give an answer (\"yes\" or \"no\") and that you back it up with solid reasoning. These days, it's probably better to say \"yes\" because, as we witnessed with the bankruptcy of Lehman Brothers, if a financial institution that's large enough collapses, it can have ripple effects and bring down the rest of the economy and financial markets along with it."
  },
  {
    "id": 83,
    "category": "\"Why Banking?\"",
    "difficulty": "trung-binh",
    "question": "You have a long-term view of your career and are fine making a sacrifice in the short-term.",
    "options": [
      "Almost anything could work for this one - just make sure it's not too recent. Otherwise it looks like you became interested on a whim....",
      "You're looking for something faster-paced where there's a better learning opportunity and more of a chance to make an impact....",
      "1. I see you have no relevant finance experience - why should we hire you over someone who's had a previous banking internship? Talk about how banking is about what skills you bring to the table and what kind of person you are rather than how many internships...",
      "This is the key question asked of many career changers and anyone else at the VP-level (or above) at a company who is looking to switch into banking as an Associate...."
    ],
    "correct": 2,
    "explanation": "1. I see you have no relevant finance experience - why should we hire you over someone who's had a previous banking internship? Talk about how banking is about what skills you bring to the table and what kind of person you are rather than how many internships you've had. Discuss how you've worked long hours / in teams / paid attention to details before and succeeded at whatever you've done. If you're feeling bold, you can also point out that although someone might have had a banking internship, that doesn't mean he/she did well in it - and that you may be better equipped based on your own experience. 2. I see you've worked mostly in wealth management before - why are you looking to switch into banking now? You want to understand the bigger picture and how and why large companies make decisions rather than just working with individual investors. Working on transactions and making an impact is more interesting to you than giving individual advice to high net worth individuals (or institutions)."
  },
  {
    "id": 84,
    "category": "\"Why Banking?\"",
    "difficulty": "trung-binh",
    "question": "You're a smart guy/girl with a lot of options, and right now the economy is not doing well and lots of banks have failed. Why are you still interested in banking when you could do anything else?",
    "options": [
      "1. I see you have no relevant finance experience - why should we hire you over someone who's had a previous banking internship? Talk about how banking is about what skills you bring to the table and what kind of person you are rather than how many internships...",
      "The reverse of question #3, you can apply a similar strategy here but instead of discussing how it's an equally good time to start out in banking, just say that you hold a long-term view and haven't just become interested overnight....",
      "Talk about your long-term view and how a downturn could be an even better time to enter the industry because you'll know how to work when times are both good and bad....",
      "This is the key question asked of many career changers and anyone else at the VP-level (or above) at a company who is looking to switch into banking as an Associate...."
    ],
    "correct": 2,
    "explanation": "Talk about your long-term view and how a downturn could be an even better time to enter the industry because you'll know how to work when times are both good and bad. In addition, you've been interested in finance for a long time and are not going to let short-term difficulties deter you from entering the field - you've explored other options and concluded that this is the best one for you."
  },
  {
    "id": 85,
    "category": "\"Why Banking?\"",
    "difficulty": "trung-binh",
    "question": "The economy has been improving lately, and more people are \"getting interested\" in finance. How do I know you're serious and not just following everyone else?",
    "options": [
      "The reverse of question #3, you can apply a similar strategy here but instead of discussing how it's an equally good time to start out in banking, just say that you hold a long-term view and haven't just become interested overnight....",
      "Almost anything could work for this one - just make sure it's not too recent. Otherwise it looks like you became interested on a whim....",
      "1. I see you have no relevant finance experience - why should we hire you over someone who's had a previous banking internship? Talk about how banking is about what skills you bring to the table and what kind of person you are rather than how many internships...",
      "This is the key question asked of many career changers and anyone else at the VP-level (or above) at a company who is looking to switch into banking as an Associate...."
    ],
    "correct": 0,
    "explanation": "The reverse of question #3, you can apply a similar strategy here but instead of discussing how it's an equally good time to start out in banking, just say that you hold a long-term view and haven't just become interested overnight. Being able to point to specific evidence of your interest - your own portfolio, the finance/business club you're in, or even day trading - also helps."
  },
  {
    "id": 86,
    "category": "\"Why Banking?\"",
    "difficulty": "trung-binh",
    "question": "Where did your interest in finance begin?",
    "options": [
      "1. I see you have no relevant finance experience - why should we hire you over someone who's had a previous banking internship? Talk about how banking is about what skills you bring to the table and what kind of person you are rather than how many internships...",
      "The reverse of question #3, you can apply a similar strategy here but instead of discussing how it's an equally good time to start out in banking, just say that you hold a long-term view and haven't just become interested overnight....",
      "Talk about your long-term view and how a downturn could be an even better time to enter the industry because you'll know how to work when times are both good and bad....",
      "Almost anything could work for this one - just make sure it's not too recent. Otherwise it looks like you became interested on a whim...."
    ],
    "correct": 3,
    "explanation": "Almost anything could work for this one - just make sure it's not too recent. Otherwise it looks like you became interested on a whim. Also be sure to explain how your initial interest led you into the internships, activities or jobs you pursued and how those have led you to where you are today."
  },
  {
    "id": 87,
    "category": "\"Why Banking?\"",
    "difficulty": "trung-binh",
    "question": "If you enjoyed your last internship and got an offer to come back, why are you trying to switch into investment banking now?",
    "options": [
      "You're looking for something faster-paced where there's a better learning opportunity and more of a chance to make an impact....",
      "Almost anything could work for this one - just make sure it's not too recent. Otherwise it looks like you became interested on a whim....",
      "1. I see you have no relevant finance experience - why should we hire you over someone who's had a previous banking internship? Talk about how banking is about what skills you bring to the table and what kind of person you are rather than how many internships...",
      "Talk about your long-term view and how a downturn could be an even better time to enter the industry because you'll know how to work when times are both good and bad...."
    ],
    "correct": 0,
    "explanation": "You're looking for something faster-paced where there's a better learning opportunity and more of a chance to make an impact. You've also been interested all along and realize you really do want to do it now, after having explored other alternatives and not liked them. If this is a small company to big company move (or vice versa) you can also say something about that, using the standard reasons we went through before - small means more responsibility and client interaction, and big means working on more major deals and learning more technical skills."
  },
  {
    "id": 88,
    "category": "\"Why Banking?\"",
    "difficulty": "trung-binh",
    "question": "You've advanced into a high-paying position at your current company - why would you want to move here, take a pay cut, and work twice the hours?",
    "options": [
      "The reverse of question #3, you can apply a similar strategy here but instead of discussing how it's an equally good time to start out in banking, just say that you hold a long-term view and haven't just become interested overnight....",
      "This is the key question asked of many career changers and anyone else at the VP-level (or above) at a company who is looking to switch into banking as an Associate....",
      "1. I see you have no relevant finance experience - why should we hire you over someone who's had a previous banking internship? Talk about how banking is about what skills you bring to the table and what kind of person you are rather than how many internships...",
      "Almost anything could work for this one - just make sure it's not too recent. Otherwise it looks like you became interested on a whim...."
    ],
    "correct": 1,
    "explanation": "This is the key question asked of many career changers and anyone else at the VP-level (or above) at a company who is looking to switch into banking as an Associate. Here are the major points to emphasize: 1. You've done your homework and spoken with a lot of people about this move - and you like the finance work you've done before. 2. Banking is faster-paced and appeals to you more because you make more of an impact. 3. You're fine with the pay cut and additional hours because of the improved opportunities to make an impact and advance."
  },
  {
    "id": 89,
    "category": "\"Failure\"",
    "difficulty": "trung-binh",
    "question": "What's your greatest fear about investment banking?",
    "options": [
      "Do not give an actual, legitimate fear (losing your friends/significant other, gaining weight, working too much, hating your life, getting laid off, etc.)....",
      "\"I realize I don't fit the typical profile of someone applying to banking - but that also comes with some advantages....",
      "For this one it sounds like you're making an excuse if you say something like, \"The market was bad\" or \"They didn't give out any offers\" - even if both of those are true....",
      "Bankers hire people who 1) Are smart 2) Can do the work and 3) Are likeable. In addition to meeting all of those criteria, you've also done well in the real-world and have stellar recommendations to back you up - plus, since you don't come from a \"blue- chip\" background you're mo..."
    ],
    "correct": 0,
    "explanation": "Do not give an actual, legitimate fear (losing your friends/significant other, gaining weight, working too much, hating your life, getting laid off, etc.). Instead, it's best to go with something more innocuous like, \"Doing a lot of work on deals and not always getting to see them through to the conclusion because anything could cause a large transaction to collapse\" or having concerns about the deal flow if the market is poor."
  },
  {
    "id": 90,
    "category": "\"Failure\"",
    "difficulty": "trung-binh",
    "question": "What's your \"Plan B\" if you can't get into investment banking this year?",
    "options": [
      "The key here is to spin whatever you've done in a positive light. So don't just say you were out of work / laid off / looking for work at the time - just mention that briefly and then say that you were also doing something else constructive with your time, such as education, trav...",
      "You'll do something finance-related, in a field like corporate finance / strategy or maybe something else at a bank / financial firm....",
      "For this one, if it's a bank you have NOT interviewed with before it's best to say you haven't participated in recruiting so they don't see you as \"damaged goods.\" But if you're on the record as having interviewed there before, you need to admit the truth....",
      "\"I realize I don't fit the typical profile of someone applying to banking - but that also comes with some advantages...."
    ],
    "correct": 1,
    "explanation": "You'll do something finance-related, in a field like corporate finance / strategy or maybe something else at a bank / financial firm. You also want to point any offers you have, especially if they're in finance or consulting. \"If I have absolutely no way to get into banking at your firm this year, then I'd go work in the Valuations group at one of the Big 4 firms where I already have an offer - or to the 2 boutiques that keep inviting me in for interviews.\""
  },
  {
    "id": 91,
    "category": "\"Failure\"",
    "difficulty": "trung-binh",
    "question": "That guy over there has a 4.0 from Wharton/Harvard - why should I hire you over him, given that you're much less impressive?",
    "options": [
      "No - unless it happens to come up in the meeting, in which case you speak only if the MD asks you about it....",
      "Bankers hire people who 1) Are smart 2) Can do the work and 3) Are likeable. In addition to meeting all of those criteria, you've also done well in the real-world and have stellar recommendations to back you up - plus, since you don't come from a \"blue- chip\" background you're mo...",
      "For this one it sounds like you're making an excuse if you say something like, \"The market was bad\" or \"They didn't give out any offers\" - even if both of those are true....",
      "Don't even try to make up an excuse unless it's a REALLY good one (e.g. your parents both passed away that semester) - just admit it and then point out what you've learned and how you've improved since then...."
    ],
    "correct": 1,
    "explanation": "Bankers hire people who 1) Are smart 2) Can do the work and 3) Are likeable. In addition to meeting all of those criteria, you've also done well in the real-world and have stellar recommendations to back you up - plus, since you don't come from a \"blue- chip\" background you're more motivated to succeed than the Harvard guy. \"He does have impressive credentials. But at a bank, you want someone who's smart, can do the work, and is easy to get along with. I've done well in school and am working on an Honors Thesis right now, and I have great recommendations from my 2 previous bosses in my Sales & Trading internships. And I spend most of my free time sky diving and going on adventures in different countries. So while he may be qualified on paper, in banking it all comes down to real-world experience and what kind of camaraderie you have with everyone. I'm confident that I excel in both of those areas - and since I'm not from a privileged background, I'm even more motivated to succeed than someone who is.\""
  },
  {
    "id": 92,
    "category": "\"Failure\"",
    "difficulty": "trung-binh",
    "question": "Let's say your MD is meeting with a client and you have been invited. As he's presenting, you notice a mistake in the materials - do you point it out?",
    "options": [
      "No - unless it happens to come up in the meeting, in which case you speak only if the MD asks you about it....",
      "You'll do something finance-related, in a field like corporate finance / strategy or maybe something else at a bank / financial firm....",
      "Don't even try to make up an excuse unless it's a REALLY good one (e.g. your parents both passed away that semester) - just admit it and then point out what you've learned and how you've improved since then....",
      "Do not give an actual, legitimate fear (losing your friends/significant other, gaining weight, working too much, hating your life, getting laid off, etc.)...."
    ],
    "correct": 0,
    "explanation": "No - unless it happens to come up in the meeting, in which case you speak only if the MD asks you about it. In that case you should just briefly acknowledge it and then move to a different topic. It's bad if you make a mistake like that, but it's even worse if you embarrass your MD by pointing it out in broad daylight - chances are that no one will notice anyway since they barely read pitch books in meetings."
  },
  {
    "id": 93,
    "category": "\"Failure\"",
    "difficulty": "trung-binh",
    "question": "I see you have a big gap in your work experience over the past few months / few years / I see you have a gap of 2-3 years a few years ago - what happened there?",
    "options": [
      "Bankers hire people who 1) Are smart 2) Can do the work and 3) Are likeable. In addition to meeting all of those criteria, you've also done well in the real-world and have stellar recommendations to back you up - plus, since you don't come from a \"blue- chip\" background you're mo...",
      "Even if you really do prefer New York or London, you can't say this in an interview with a regional office because your #1 goal has to be getting AN offer - not getting the perfect offer in the perfect location....",
      "The key here is to spin whatever you've done in a positive light. So don't just say you were out of work / laid off / looking for work at the time - just mention that briefly and then say that you were also doing something else constructive with your time, such as education, trav...",
      "For this one, if it's a bank you have NOT interviewed with before it's best to say you haven't participated in recruiting so they don't see you as \"damaged goods.\" But if you're on the record as having interviewed there before, you need to admit the truth...."
    ],
    "correct": 2,
    "explanation": "The key here is to spin whatever you've done in a positive light. So don't just say you were out of work / laid off / looking for work at the time - just mention that briefly and then say that you were also doing something else constructive with your time, such as education, travel, volunteering, or a respectable hobby. If you've had some other type of gap because of school, economic hardship, or something similar, you need to find the strength in whatever weakness you had - this is really just a disguised \"weakness\" question. So if you had to wait tables for 1-2 years to pay for family expenses or support yourself / pay for tuition, talk about what that taught you in terms of work ethic and what you learned about yourself in the process. As with any other \"Why don't you have a blue-chip background?\" question, you have to tie everything back to the \"banker-like\" qualities. \"The truth is, my family went through some financial hardships back then and I was forced to take a leave of absence from school for awhile, and spend most of my time working to help them pay the bills. Initially I was pretty upset, but I learned a lot about time management, work ethic, and how to juggle 5 different major responsibilities at once. I lost some time on my peers, but I came out more motivated than before, helped my family get back on their feet, and got started with independent study to help myself catch up.\""
  },
  {
    "id": 94,
    "category": "\"Failure\"",
    "difficulty": "trung-binh",
    "question": "Why did you get a C in accounting? (Or other bad grade in highly relevant class)",
    "options": [
      "For this one it sounds like you're making an excuse if you say something like, \"The market was bad\" or \"They didn't give out any offers\" - even if both of those are true....",
      "No - unless it happens to come up in the meeting, in which case you speak only if the MD asks you about it....",
      "Bankers hire people who 1) Are smart 2) Can do the work and 3) Are likeable. In addition to meeting all of those criteria, you've also done well in the real-world and have stellar recommendations to back you up - plus, since you don't come from a \"blue- chip\" background you're mo...",
      "Don't even try to make up an excuse unless it's a REALLY good one (e.g. your parents both passed away that semester) - just admit it and then point out what you've learned and how you've improved since then...."
    ],
    "correct": 3,
    "explanation": "Don't even try to make up an excuse unless it's a REALLY good one (e.g. your parents both passed away that semester) - just admit it and then point out what you've learned and how you've improved since then. Maybe you took it upon yourself to do additional self-study - or you changed your approach to studying and did much better in subsequent Accounting classes."
  },
  {
    "id": 95,
    "category": "\"Failure\"",
    "difficulty": "trung-binh",
    "question": "Why did you NOT receive a return offer from your internship?",
    "options": [
      "The key here is to spin whatever you've done in a positive light. So don't just say you were out of work / laid off / looking for work at the time - just mention that briefly and then say that you were also doing something else constructive with your time, such as education, trav...",
      "Even if you really do prefer New York or London, you can't say this in an interview with a regional office because your #1 goal has to be getting AN offer - not getting the perfect offer in the perfect location....",
      "For this one, if it's a bank you have NOT interviewed with before it's best to say you haven't participated in recruiting so they don't see you as \"damaged goods.\" But if you're on the record as having interviewed there before, you need to admit the truth....",
      "For this one it sounds like you're making an excuse if you say something like, \"The market was bad\" or \"They didn't give out any offers\" - even if both of those are true...."
    ],
    "correct": 3,
    "explanation": "For this one it sounds like you're making an excuse if you say something like, \"The market was bad\" or \"They didn't give out any offers\" - even if both of those are true. It's a better bet to say something like, \"I did well in my internship and got positive reviews, but I didn't fit in with the group's culture. From those I've spoken with so far at your firm, I think this is a much better fit for me.\" It's hard to argue with doing the work well but just not fitting in with the group."
  },
  {
    "id": 96,
    "category": "\"Failure\"",
    "difficulty": "trung-binh",
    "question": "You graduated last year and don't have anything listed on your resume since then - what have you been doing, and did you participate in recruiting last year?",
    "options": [
      "No - unless it happens to come up in the meeting, in which case you speak only if the MD asks you about it....",
      "For this one, if it's a bank you have NOT interviewed with before it's best to say you haven't participated in recruiting so they don't see you as \"damaged goods.\" But if you're on the record as having interviewed there before, you need to admit the truth....",
      "Even if you really do prefer New York or London, you can't say this in an interview with a regional office because your #1 goal has to be getting AN offer - not getting the perfect offer in the perfect location....",
      "\"I realize I don't fit the typical profile of someone applying to banking - but that also comes with some advantages...."
    ],
    "correct": 1,
    "explanation": "For this one, if it's a bank you have NOT interviewed with before it's best to say you haven't participated in recruiting so they don't see you as \"damaged goods.\" But if you're on the record as having interviewed there before, you need to admit the truth. You probably want to say something like, \"I did some interviewing last year, but I was not focused 100% due to a family situation. I had to spend a few months after graduation attending to that, so I missed out on recruiting, but I did some independent study / additional research / [something else that sounds productive] and am now more focused than ever on banking.\" Remember, almost anything could be a \"family situation\" and no one will call you on it if you say something like this. You also want to convey that your time since graduating has not been unproductive and that you're now better-prepared / more focused."
  },
  {
    "id": 97,
    "category": "\"Failure\"",
    "difficulty": "trung-binh",
    "question": "Why are we your first choice? Wouldn't you like London or New York more?",
    "options": [
      "You'll do something finance-related, in a field like corporate finance / strategy or maybe something else at a bank / financial firm....",
      "\"I realize I don't fit the typical profile of someone applying to banking - but that also comes with some advantages....",
      "Bankers hire people who 1) Are smart 2) Can do the work and 3) Are likeable. In addition to meeting all of those criteria, you've also done well in the real-world and have stellar recommendations to back you up - plus, since you don't come from a \"blue- chip\" background you're mo...",
      "Even if you really do prefer New York or London, you can't say this in an interview with a regional office because your #1 goal has to be getting AN offer - not getting the perfect offer in the perfect location...."
    ],
    "correct": 3,
    "explanation": "Even if you really do prefer New York or London, you can't say this in an interview with a regional office because your #1 goal has to be getting AN offer - not getting the perfect offer in the perfect location. It's best to say something like, \"I realize it is unusual and that are other places are sometimes more popular, but I'm most interested in [Location] because it's the best place for [Industry You Like], I have a lot of friends and family here, and on top of all that the cost of living also beats New York.\" This way you acknowledge their \"objection\" upfront but also point out solid reasons for picking this location."
  },
  {
    "id": 98,
    "category": "\"Failure\"",
    "difficulty": "trung-binh",
    "question": "Why are you so old? (Stated more tactfully)",
    "options": [
      "Even if you really do prefer New York or London, you can't say this in an interview with a regional office because your #1 goal has to be getting AN offer - not getting the perfect offer in the perfect location....",
      "For this one, if it's a bank you have NOT interviewed with before it's best to say you haven't participated in recruiting so they don't see you as \"damaged goods.\" But if you're on the record as having interviewed there before, you need to admit the truth....",
      "\"I realize I don't fit the typical profile of someone applying to banking - but that also comes with some advantages....",
      "The key here is to spin whatever you've done in a positive light. So don't just say you were out of work / laid off / looking for work at the time - just mention that briefly and then say that you were also doing something else constructive with your time, such as education, trav..."
    ],
    "correct": 2,
    "explanation": "\"I realize I don't fit the typical profile of someone applying to banking - but that also comes with some advantages. I've been around longer and explored different industries, so I have a better of what I want, and I'm going to be more committed than someone just out of school. I've also had a lot more leadership experience and understand how to get things done in a large company - and I've climbed up steep learning curves plenty of times over the years.\" One of the interviewer's key concerns for older candidates is how well you can learn new things and work long hours - so you should have specific examples on-hand to address both of these \"objections.\""
  },
  {
    "id": 99,
    "category": "\"Outside the Box\"",
    "difficulty": "trung-binh",
    "question": "What type of animal / vegetable would you be?",
    "options": [
      "With this type of question you can show more \"banker-like\" traits such as ambition and hard work - but you shouldn't take it too seriously....",
      "Some interviewees take this as a cue to tie your choice back to being a team player, hard worker, or such but that's not the best approach....",
      "Don't say, \"I would start my own business…\" or \"I would invest it in…\" - many people completely ignore the actual question here....",
      "\"Q: What was the best part of Playboy's IPO? A: The pitch book.\" If you have a female interviewer or someone else who might get offended, then try the following corny but impossible to offend joke instead: \"A dog goes into an investment banking job interview, and the banker says..."
    ],
    "correct": 1,
    "explanation": "Some interviewees take this as a cue to tie your choice back to being a team player, hard worker, or such but that's not the best approach. For \"creativity\"-type questions, interviewers want you to be… creative. So think about your real personality and say something that matches that. Example: Maybe you'd be a \"hedgehog\" because it looks like you have \"spikes\" on the outside to an observer, but you're actually warm and fuzzy on the inside."
  },
  {
    "id": 100,
    "category": "\"Outside the Box\"",
    "difficulty": "trung-binh",
    "question": "Let's say that in the future your name turns up as the front page headline of a newspaper one day - what would the story be about?",
    "options": [
      "With this type of question you can show more \"banker-like\" traits such as ambition and hard work - but you shouldn't take it too seriously....",
      "\"Q: What was the best part of Playboy's IPO? A: The pitch book.\" If you have a female interviewer or someone else who might get offended, then try the following corny but impossible to offend joke instead: \"A dog goes into an investment banking job interview, and the banker says...",
      "Don't say, \"I would start my own business…\" or \"I would invest it in…\" - many people completely ignore the actual question here....",
      "Don't say \"cocaine\" or any other drug / porn-like / illegal activity (this should be common sense but you wouldn't believe the emails I get)...."
    ],
    "correct": 0,
    "explanation": "With this type of question you can show more \"banker-like\" traits such as ambition and hard work - but you shouldn't take it too seriously. So maybe the headline states that you climbed Mt. Everest, sold your company in an IPO, or became a best-selling author - you want \"ambition + creativity / coolness\" for this type of question. Hopefully the headline wasn't about your indictment for insider trading."
  },
  {
    "id": 101,
    "category": "\"Outside the Box\"",
    "difficulty": "trung-binh",
    "question": "Tell me a joke.",
    "options": [
      "Don't say, \"I would start my own business…\" or \"I would invest it in…\" - many people completely ignore the actual question here....",
      "\"Beta\" in the Capital Asset Pricing Model (CAPM) measures expected return and expected risk....",
      "\"Q: What was the best part of Playboy's IPO? A: The pitch book.\" If you have a female interviewer or someone else who might get offended, then try the following corny but impossible to offend joke instead: \"A dog goes into an investment banking job interview, and the banker says...",
      "With this type of question you can show more \"banker-like\" traits such as ambition and hard work - but you shouldn't take it too seriously...."
    ],
    "correct": 2,
    "explanation": "\"Q: What was the best part of Playboy's IPO? A: The pitch book.\" If you have a female interviewer or someone else who might get offended, then try the following corny but impossible to offend joke instead: \"A dog goes into an investment banking job interview, and the banker says to him, 'You've got the job, but only if you can do three things. First, you have to be able complete an LBO model in 30 minutes.' So the dog runs to a computer and astoundingly creates a full model in 30 minutes. That's very nice! Next, you must be able to spread 10 comps manually in under an hour. Immediately, the dog sits down at the computer and completes everything in only 30 minutes. 'That's perfect! Lastly, you must be bilingual.' So then the dog says, 'Meow!' \""
  },
  {
    "id": 102,
    "category": "\"Outside the Box\"",
    "difficulty": "trung-binh",
    "question": "What's your personal Beta?",
    "options": [
      "Don't say, \"I would start my own business…\" or \"I would invest it in…\" - many people completely ignore the actual question here....",
      "Some interviewees take this as a cue to tie your choice back to being a team player, hard worker, or such but that's not the best approach....",
      "\"Q: What was the best part of Playboy's IPO? A: The pitch book.\" If you have a female interviewer or someone else who might get offended, then try the following corny but impossible to offend joke instead: \"A dog goes into an investment banking job interview, and the banker says...",
      "\"Beta\" in the Capital Asset Pricing Model (CAPM) measures expected return and expected risk...."
    ],
    "correct": 3,
    "explanation": "\"Beta\" in the Capital Asset Pricing Model (CAPM) measures expected return and expected risk. Higher Beta means a higher potential return, but also more risk. You probably want to say above 1.0, but not too much above it - you're much more ambitious than the average person, which causes you to try lots of new things and achieve quite a bit, so that inevitably carries some risk. But you're not so reckless that you take careless risks - it's all about moderation. Don't go over 2.0. Bankers like to think of themselves as \"entrepreneurial\" even though banking is extremely different from entrepreneurship, so you should take advantage of this line of thinking and indulge them."
  },
  {
    "id": 103,
    "category": "\"Outside the Box\"",
    "difficulty": "trung-binh",
    "question": "What's the riskiest thing you've ever done?",
    "options": [
      "Don't say \"cocaine\" or any other drug / porn-like / illegal activity (this should be common sense but you wouldn't believe the emails I get)....",
      "Some interviewees take this as a cue to tie your choice back to being a team player, hard worker, or such but that's not the best approach....",
      "With this type of question you can show more \"banker-like\" traits such as ambition and hard work - but you shouldn't take it too seriously....",
      "\"Beta\" in the Capital Asset Pricing Model (CAPM) measures expected return and expected risk...."
    ],
    "correct": 0,
    "explanation": "Don't say \"cocaine\" or any other drug / porn-like / illegal activity (this should be common sense but you wouldn't believe the emails I get). But you also can't say, \"I sat next to the unpopular kid one day…\" because that's not risky at all. Try to discuss an internship or job experience you had that you never expected to get, or some type of extracurricular/leadership experience that was somewhat random and turned out to be great - and talk about how it was a calculated risk and that you got a lot out of the decision you made. If you can point to something you had to be proactive to get, this is a good time to bring it up."
  },
  {
    "id": 104,
    "category": "\"Outside the Box\"",
    "difficulty": "trung-binh",
    "question": "Let's say that you have $1 million, but you are NOT allowed to invest it or otherwise use it to create more money. What would you spend the capital on instead?",
    "options": [
      "With this type of question you can show more \"banker-like\" traits such as ambition and hard work - but you shouldn't take it too seriously....",
      "Don't say, \"I would start my own business…\" or \"I would invest it in…\" - many people completely ignore the actual question here....",
      "Some interviewees take this as a cue to tie your choice back to being a team player, hard worker, or such but that's not the best approach....",
      "\"Q: What was the best part of Playboy's IPO? A: The pitch book.\" If you have a female interviewer or someone else who might get offended, then try the following corny but impossible to offend joke instead: \"A dog goes into an investment banking job interview, and the banker says..."
    ],
    "correct": 1,
    "explanation": "Don't say, \"I would start my own business…\" or \"I would invest it in…\" - many people completely ignore the actual question here. It's best to tie this back to whatever your interests and passions are - so you might use the money to support volunteer work you've done, extended travel that you've always wanted to take, or maybe even to buy that race car you've always wanted. Just make sure your answer is believable - if you have never worked at a non-profit or in a volunteer group in your life, don't suddenly try to be a saint. If you love cars, say you would think about buying a car you've always wanted… among other things."
  },
  {
    "id": 105,
    "category": "Discussing Transaction Experience",
    "difficulty": "trung-binh",
    "question": "Walk me through one of the deals listed on your resume.",
    "options": [
      "• Try to pick an M&A deal rather than an equity/debt financing and aim for more \"unique\" deal types like divestitures or distressed M&A; also try to pick something that's either \"high-profile\" or a deal where you contributed a lot. • Don't go into too much detail for an \"opening...",
      "This is a common scenario for summer interns or if you worked at a small boutique where financial modeling was not as common....",
      "One of the most difficult and most important questions you can get. For this one, you have to be careful to not exaggerate too much and claim that you generated millions of dollars for your bank - but you should also try to say something more than, \"I made these graphs look prett...",
      "For potential targets, focus on financial, industry, and geographical criteria; for potential investors, talk about what they've invested in before, how much synergy or \"fit\" there is, and whether or not they have complementary portfolio companies (for PE firms)...."
    ],
    "correct": 0,
    "explanation": "• Try to pick an M&A deal rather than an equity/debt financing and aim for more \"unique\" deal types like divestitures or distressed M&A; also try to pick something that's either \"high-profile\" or a deal where you contributed a lot. • Don't go into too much detail for an \"opening question\" like this - just give a brief overview and then let them ask the questions. • Describe the company, give approximate financial (revenue, EBITDA, market cap) figures, and say what they wanted to do. Here's how you might describe a sell-side M&A deal you worked on: \"One of the deals I worked on was the sale of a $1 billion market cap consumer retail company. They specialized in food and beverages and sold to the US and European markets. Their revenue was around $800 million with $200 million EBITDA, growing at around 5% per year. They were interested in selling because of a string of recent acquisitions in their market, and felt they could get a premium valuation. They engaged us to run a broad sell-side process with financial and strategic buyers.\" Here's how you might describe an IPO: \"One deal I worked on was the $200 million IPO of a Chinese Internet company on the Hong Kong stock exchange. They had revenue of around $50 million, EBITDA of $10 million, and were growing very quickly, around 50% per year. They were going public to raise funds so that they could expand beyond China and get into other markets, and we were the lead underwriter on the deal.\" After you finish your \"introduction\" the interviewer will start asking follow-up questions based on what you said."
  },
  {
    "id": 106,
    "category": "Discussing Transaction Experience",
    "difficulty": "trung-binh",
    "question": "Did you do anything quantitative for this deal? It looks like it just involved research.",
    "options": [
      "The most important items here are the company's financial statements, contracts (with customers, employees, and suppliers), and then tax, legal, environmental, IP, and regulatory issues....",
      "This is a common scenario for summer interns or if you worked at a small boutique where financial modeling was not as common....",
      "Maybe they received an unsolicited offer, maybe there were a string of recent acquisitions in their market, maybe the founder wanted to exit the business, or maybe the PE firm that owned the company wanted to exit its investment....",
      "• Try to pick an M&A deal rather than an equity/debt financing and aim for more \"unique\" deal types like divestitures or distressed M&A; also try to pick something that's either \"high-profile\" or a deal where you contributed a lot. • Don't go into too much detail for an \"opening..."
    ],
    "correct": 1,
    "explanation": "This is a common scenario for summer interns or if you worked at a small boutique where financial modeling was not as common. Don't say that you did nothing quantitative, but also don't make it seem like you know everything there is to know about valuation or modeling. If you didn't build the model yourself, just point out how you contributed to it. Here's how you might respond: \"A lot of what I worked on was qualitative and involved researching potential buyers to see what the best fit might be. Our team did some valuation and financial modeling work as well, but since I was an intern I supported the other Analyst and Associate by finding relevant facts and figures and then going through their models, figuring out how they worked, and then making sure the information was correct.\""
  },
  {
    "id": 107,
    "category": "Discussing Transaction Experience",
    "difficulty": "trung-binh",
    "question": "Why did the company you were representing want to sell?",
    "options": [
      "Maybe they received an unsolicited offer, maybe there were a string of recent acquisitions in their market, maybe the founder wanted to exit the business, or maybe the PE firm that owned the company wanted to exit its investment....",
      "• Try to pick an M&A deal rather than an equity/debt financing and aim for more \"unique\" deal types like divestitures or distressed M&A; also try to pick something that's either \"high-profile\" or a deal where you contributed a lot. • Don't go into too much detail for an \"opening...",
      "For potential targets, focus on financial, industry, and geographical criteria; for potential investors, talk about what they've invested in before, how much synergy or \"fit\" there is, and whether or not they have complementary portfolio companies (for PE firms)....",
      "For this one you need to talk about what specific type of other company they wanted to buy...."
    ],
    "correct": 0,
    "explanation": "Maybe they received an unsolicited offer, maybe there were a string of recent acquisitions in their market, maybe the founder wanted to exit the business, or maybe the PE firm that owned the company wanted to exit its investment. You might say something like the following: \"They wanted to sell because larger companies in the market had recently acquired their closest competitors, and they felt that they could no longer thrive as a standalone entity. Additionally, they had received informal offers from a few of the larger companies before, and felt that the timing was right to explore a sale once again.\""
  },
  {
    "id": 108,
    "category": "Discussing Transaction Experience",
    "difficulty": "trung-binh",
    "question": "Why did the company you were representing want to buy another company?",
    "options": [
      "For this one you need to talk about what specific type of other company they wanted to buy....",
      "Don't feel \"pressured\" to say that the deal closed or that the IPO priced before you left....",
      "This is a common scenario for summer interns or if you worked at a small boutique where financial modeling was not as common....",
      "• Try to pick an M&A deal rather than an equity/debt financing and aim for more \"unique\" deal types like divestitures or distressed M&A; also try to pick something that's either \"high-profile\" or a deal where you contributed a lot. • Don't go into too much detail for an \"opening..."
    ],
    "correct": 0,
    "explanation": "For this one you need to talk about what specific type of other company they wanted to buy. Did they want to expand into new geographies? Get into a new industry? Pursue a \"hot\" start-up that was receiving a lot of attention? Here's an example: \"Our client was interested in expanding from midstream oil & gas production and wanted to get into the upstream market as well, especially in North America. They had tried to do so before, but lacked the expertise and industry contacts - so they wanted to acquire a sizable company that had already done it so they could grow their top-line and also diversify their business.\""
  },
  {
    "id": 109,
    "category": "Discussing Transaction Experience",
    "difficulty": "trung-binh",
    "question": "Describe the deal process.",
    "options": [
      "Just take the standard valuation methodologies and talk about how you applied them to the company you worked with....",
      "These could be anything from disagreements on price to legal issues to problems with retaining the management team....",
      "Don't feel \"pressured\" to say that the deal closed or that the IPO priced before you left....",
      "This one is completely dependent on what type of deal you worked on - but no matter what you say, don't go into an excruciating level of detail here...."
    ],
    "correct": 3,
    "explanation": "This one is completely dependent on what type of deal you worked on - but no matter what you say, don't go into an excruciating level of detail here. Focus on whether it was a broad or targeted process for M&A deals, and what kinds of buyers/sellers you approached; for debt and equity financings just go through the key points in the registration statements or investor memos, and what the investor reaction was. \"We ran a broad sell-side auction process for our client. They had in mind around 10-20 strategic buyers that might have been interested, and we added around 30 financial sponsors to their list. We got serious interest from about 5 of the companies we approached, which led to 1 strategic buyer and 1 financial sponsor ultimately competing to win the deal.\""
  },
  {
    "id": 110,
    "category": "Discussing Transaction Experience",
    "difficulty": "trung-binh",
    "question": "What were the major selling points of your client? What was attractive about it?",
    "options": [
      "These could be anything from disagreements on price to legal issues to problems with retaining the management team....",
      "This one applies for both sell-side deals and equity/debt financings - good points to raise might include financial performance, market and industry trends, any competitive advantages it enjoyed, and anything positive about its customer base....",
      "Focus on the major trends and how the company you represented compared to the competition....",
      "Just take the standard valuation methodologies and talk about how you applied them to the company you worked with...."
    ],
    "correct": 1,
    "explanation": "This one applies for both sell-side deals and equity/debt financings - good points to raise might include financial performance, market and industry trends, any competitive advantages it enjoyed, and anything positive about its customer base. Stay away from talking about the strength of the management team, because that is very difficult to \"explain\" in an interview. \"The Swedish healthcare company we were representing had been growing at around 15% year-over-year, vs. 5% average growth for the industry as a whole. It also had higher margins than other companies in the industry because it focused on higher-end and more profitable medical care. The market as a whole was also very favorable because the Swedish population was aging and demand for healthcare could only rise in years to come.\""
  },
  {
    "id": 111,
    "category": "Discussing Transaction Experience",
    "difficulty": "trung-binh",
    "question": "What about its weaknesses? Why might investors be hesitant?",
    "options": [
      "This one applies for both sell-side deals and equity/debt financings - good points to raise might include financial performance, market and industry trends, any competitive advantages it enjoyed, and anything positive about its customer base....",
      "For this one you need to talk about what specific type of other company they wanted to buy....",
      "These could be anything from disagreements on price to legal issues to problems with retaining the management team....",
      "You could talk about unfavorable market trends, increased competition, uncertain financial projections, or the threat of new regulation harming the company...."
    ],
    "correct": 3,
    "explanation": "You could talk about unfavorable market trends, increased competition, uncertain financial projections, or the threat of new regulation harming the company. \"Although our client had performed well in the European healthcare market, its financial projections depended on expanding into the US and Asia, and it had no track record there. Also, massive healthcare reform in the US might make it significantly more difficult to enter that market in the future.\""
  },
  {
    "id": 112,
    "category": "Discussing Transaction Experience",
    "difficulty": "trung-binh",
    "question": "What were the major obstacles to getting the deal done? What happened?",
    "options": [
      "These could be anything from disagreements on price to legal issues to problems with retaining the management team....",
      "Focus on the major trends and how the company you represented compared to the competition....",
      "For this one you need to talk about what specific type of other company they wanted to buy....",
      "This one applies for both sell-side deals and equity/debt financings - good points to raise might include financial performance, market and industry trends, any competitive advantages it enjoyed, and anything positive about its customer base...."
    ],
    "correct": 0,
    "explanation": "These could be anything from disagreements on price to legal issues to problems with retaining the management team. If you can point to any obstacles that you played a role in resolving, bring them up here. \"We ran into issues because the private equity firm we were in discussions with wanted to make the deal contingent on the debt financing, which the CEO could not go along with. We also ran into problems with valuation, because the PE firm discounted our projections by about 20%. Eventually we compromised on both points, and on the second issue I helped create a more detailed revenue model for the company that validated some of our assumptions, so the PE firm agreed to meet us halfway.\""
  },
  {
    "id": 113,
    "category": "Discussing Transaction Experience",
    "difficulty": "trung-binh",
    "question": "What kind of standalone operating model did you create for your client?",
    "options": [
      "For this one you need to talk about what specific type of other company they wanted to buy....",
      "For potential targets, focus on financial, industry, and geographical criteria; for potential investors, talk about what they've invested in before, how much synergy or \"fit\" there is, and whether or not they have complementary portfolio companies (for PE firms)....",
      "For this one, you don't need to explain how to link the 3 statements together - focus on how you created the revenue model and the expense model....",
      "This one applies for both sell-side deals and equity/debt financings - good points to raise might include financial performance, market and industry trends, any competitive advantages it enjoyed, and anything positive about its customer base...."
    ],
    "correct": 2,
    "explanation": "For this one, you don't need to explain how to link the 3 statements together - focus on how you created the revenue model and the expense model. Usually you do this by looking at revenue in terms of units sold, factories, or production, and you analyze expenses by fixed costs and employees. \"On the revenue side, we looked at our client's existing, proven oil reserves and used their historical exploration & production figures to project how much they would be adding each year vs. what would be depleted. Then we combined that with projections for oil prices to estimate their yearly revenue. On the expense side, the majority of costs were tied to how many oil fields were operational, so we linked numbers for transportation, technology, and drilling costs to those.\""
  },
  {
    "id": 114,
    "category": "Discussing Transaction Experience",
    "difficulty": "trung-binh",
    "question": "What was the status of this deal when you left your bank?",
    "options": [
      "• Try to pick an M&A deal rather than an equity/debt financing and aim for more \"unique\" deal types like divestitures or distressed M&A; also try to pick something that's either \"high-profile\" or a deal where you contributed a lot. • Don't go into too much detail for an \"opening...",
      "Don't feel \"pressured\" to say that the deal closed or that the IPO priced before you left....",
      "This one is completely dependent on what type of deal you worked on - but no matter what you say, don't go into an excruciating level of detail here....",
      "This is a common scenario for summer interns or if you worked at a small boutique where financial modeling was not as common...."
    ],
    "correct": 1,
    "explanation": "Don't feel \"pressured\" to say that the deal closed or that the IPO priced before you left. It's fine to say that it was still up in the air - and even if the deal actually fell apart, you're better off pretending that it's still pending and that there hasn't been an announcement yet (unless it was a huge deal that very publicly fell apart). \"When I left, both sides did not agree 100% on price. They were moving closer and had resolved management retention and had come to agreement on the reps and warranties, but they were still locking down the final details, so the deal is pending right now.\""
  },
  {
    "id": 115,
    "category": "Discussing Transaction Experience",
    "difficulty": "trung-binh",
    "question": "What did you look at in the due diligence process?",
    "options": [
      "For this one, you don't need to explain how to link the 3 statements together - focus on how you created the revenue model and the expense model....",
      "The most important items here are the company's financial statements, contracts (with customers, employees, and suppliers), and then tax, legal, environmental, IP, and regulatory issues....",
      "One of the most difficult and most important questions you can get. For this one, you have to be careful to not exaggerate too much and claim that you generated millions of dollars for your bank - but you should also try to say something more than, \"I made these graphs look prett...",
      "Maybe they received an unsolicited offer, maybe there were a string of recent acquisitions in their market, maybe the founder wanted to exit the business, or maybe the PE firm that owned the company wanted to exit its investment...."
    ],
    "correct": 1,
    "explanation": "The most important items here are the company's financial statements, contracts (with customers, employees, and suppliers), and then tax, legal, environmental, IP, and regulatory issues. Note that as an investment banker you don't really \"look at\" much in the due diligence process for any deal - you just process requests. For IPOs, this changes and you're responsible for conducting customer due diligence calls - so you need to talk about that and what customers told you directly. \"We looked at all the standard items, including the company's audit reports and financial statements, and then brought in specialists to look at the contracts, legal, and intellectual property issues. I came up with lists of questions for the customer due diligence calls we conducted, which was important because investors at the time were reluctant to invest in IPOs in emerging markets like Brazil - and by speaking with customers we were able to assess the risk for ourselves.\""
  },
  {
    "id": 116,
    "category": "Discussing Transaction Experience",
    "difficulty": "trung-binh",
    "question": "Tell me about the market your client was in.",
    "options": [
      "The most important items here are the company's financial statements, contracts (with customers, employees, and suppliers), and then tax, legal, environmental, IP, and regulatory issues....",
      "One of the most difficult and most important questions you can get. For this one, you have to be careful to not exaggerate too much and claim that you generated millions of dollars for your bank - but you should also try to say something more than, \"I made these graphs look prett...",
      "Focus on the major trends and how the company you represented compared to the competition....",
      "For this one, you don't need to explain how to link the 3 statements together - focus on how you created the revenue model and the expense model...."
    ],
    "correct": 2,
    "explanation": "Focus on the major trends and how the company you represented compared to the competition. Don't go into every single detail - just pick the 1-2 major points and focus on how it affected the deal and/or valuation. \"Our client was in the mainframe software market, which had existed for over 20 years and had consolidated significantly in recent years, with IBM acquiring many of the smaller independent vendors. It was a slow-growing market and most of the sales came from existing customers upgrading - as a result, we couldn't find many interested strategic buyers, and most of the interest came from financial sponsors that were attracted to our company's high margins and recurring revenue.\""
  },
  {
    "id": 117,
    "category": "Discussing Transaction Experience",
    "difficulty": "trung-binh",
    "question": "How did you narrow down potential targets (or potential investors)?",
    "options": [
      "Focus on the major trends and how the company you represented compared to the competition....",
      "For this one, you don't need to explain how to link the 3 statements together - focus on how you created the revenue model and the expense model....",
      "For potential targets, focus on financial, industry, and geographical criteria; for potential investors, talk about what they've invested in before, how much synergy or \"fit\" there is, and whether or not they have complementary portfolio companies (for PE firms)....",
      "• Try to pick an M&A deal rather than an equity/debt financing and aim for more \"unique\" deal types like divestitures or distressed M&A; also try to pick something that's either \"high-profile\" or a deal where you contributed a lot. • Don't go into too much detail for an \"opening..."
    ],
    "correct": 2,
    "explanation": "For potential targets, focus on financial, industry, and geographical criteria; for potential investors, talk about what they've invested in before, how much synergy or \"fit\" there is, and whether or not they have complementary portfolio companies (for PE firms). \"We picked potential investors mostly based on size and acquisition activity in our market in the past. There were a lot of healthcare acquisitions recently, but we wanted to focus on firms that were active in the North American market specifically, and ones that had acquired firms worth over $500 million. We looked at some financial sponsors as well, but focused on ones that had sizable healthcare companies in their portfolios.\""
  },
  {
    "id": 118,
    "category": "Discussing Transaction Experience",
    "difficulty": "trung-binh",
    "question": "How did you value your client?",
    "options": [
      "Just take the standard valuation methodologies and talk about how you applied them to the company you worked with....",
      "This is a common scenario for summer interns or if you worked at a small boutique where financial modeling was not as common....",
      "For this one, you don't need to explain how to link the 3 statements together - focus on how you created the revenue model and the expense model....",
      "You could talk about unfavorable market trends, increased competition, uncertain financial projections, or the threat of new regulation harming the company...."
    ],
    "correct": 0,
    "explanation": "Just take the standard valuation methodologies and talk about how you applied them to the company you worked with. Note that for IPOs, you only care about public company comparables - for other types of deals you look at a wider range of methodologies. \"We used public company comparables, precedent transactions, and a DCF. For public comps, we picked a set of software companies with over $1 billion revenue, for precedent transactions, we looked at software deals worth over $500 million, and we used the standard DCF but looked at a few different scenarios because our client's projections were aggressive. We didn't look at other methodologies because this was a standard M&A deal and they were almost certainly going to sell to a strategic buyer.\""
  },
  {
    "id": 119,
    "category": "Discussing Transaction Experience",
    "difficulty": "trung-binh",
    "question": "How did you personally contribute to this deal?",
    "options": [
      "For this one you need to talk about what specific type of other company they wanted to buy....",
      "Maybe they received an unsolicited offer, maybe there were a string of recent acquisitions in their market, maybe the founder wanted to exit the business, or maybe the PE firm that owned the company wanted to exit its investment....",
      "One of the most difficult and most important questions you can get. For this one, you have to be careful to not exaggerate too much and claim that you generated millions of dollars for your bank - but you should also try to say something more than, \"I made these graphs look prett...",
      "Just take the standard valuation methodologies and talk about how you applied them to the company you worked with...."
    ],
    "correct": 2,
    "explanation": "One of the most difficult and most important questions you can get. For this one, you have to be careful to not exaggerate too much and claim that you generated millions of dollars for your bank - but you should also try to say something more than, \"I made these graphs look pretty in PowerPoint.\" Here's an example: \"As the intern, I helped some of the Analysts track down hard-to-find numbers to use for assumptions in our models. This played an important role in the deal, because buyers analyzed our operating model of the company and found everything more believable since we had laid out such detailed assumptions behind all the numbers.\""
  },
  {
    "id": 120,
    "category": "Restructuring / Distressed M&A",
    "difficulty": "kho",
    "question": "How much do you know about what you actually do in Restructuring?",
    "options": [
      "Technically, the answer is \"it depends\" but practically speaking most of the time the answer is \"no.\" If a company is truly distressed, the value of its debts and obligations most likely exceed the value of its assets - so equity investors rarely get much out of a bankruptcy or d...",
      "A Chapter 7 bankruptcy is also known as a \"liquidation bankruptcy\" - the company is too far past the point of reorganization and must instead sell off its assets and pay off creditors....",
      "Restructuring bankers advised distressed companies - businesses going bankrupt, in the midst of bankruptcy, or getting out of bankruptcy - and help them change their capital structure to get out of bankruptcy, avoid it in the first place, or assist with a sale of the company depe...",
      "1. New debtor-in-possession (DIP) lenders (see explanation above) 2. Secured creditors (revolvers and \"bank debt\") 3. Unsecured creditors (\"high-yield\" bonds) 4. Subordinated debt investors (similar to high-yield bonds) 5. Mezzanine investors (convertibles, co..."
    ],
    "correct": 2,
    "explanation": "Restructuring bankers advised distressed companies - businesses going bankrupt, in the midst of bankruptcy, or getting out of bankruptcy - and help them change their capital structure to get out of bankruptcy, avoid it in the first place, or assist with a sale of the company depending on the scenario."
  },
  {
    "id": 121,
    "category": "Restructuring / Distressed M&A",
    "difficulty": "kho",
    "question": "What are the 2 different \"sides\" of a Restructuring deal? Do you know which one we usually advise?",
    "options": [
      "See above. In addition to the legal and \"better technical skills\" angles, you can also use the experience to work at a Distressed Investments or Special Situations Fund, which most people outside Restructuring don't have access to. Or you could just go back to...",
      "Bankers can advise either the debtor (the company itself) or the creditors (anyone that has lent the company) money....",
      "Here are the most common adjustments: • Adjust Cost of Goods Sold for higher vendor costs due to lack of trust from suppliers. • Add back non-recurring legal / other professional fees associated with the restructuring and/or distressed sale process. • Add back excess lease expens...",
      "They rise and the average AP Days might go well beyond what's \"normal\" for the industry - this is because a distressed company has trouble paying its vendors and suppliers."
    ],
    "correct": 1,
    "explanation": "Bankers can advise either the debtor (the company itself) or the creditors (anyone that has lent the company) money. It's similar to sell-side vs. buy-side M&A - in one you're advising the company trying to sell or get out of the mess it's in, and in the other you're advising buyers and lenders that are trying to take what they can from the company. Note that the \"creditors\" are often multiple parties since it's anyone who loaned the company money. There are also \"operational advisors\" that help with the actual turnaround. You need to research which bank does what, but typically Blackstone and Lazard advise the debtor and Houlihan Lokey advises the creditors (these 3 are commonly as the top groups in the field)."
  },
  {
    "id": 122,
    "category": "Restructuring / Distressed M&A",
    "difficulty": "kho",
    "question": "Why are you interested in Restructuring besides the fact that it's a \"hot\" area currently?",
    "options": [
      "Here are the most common adjustments: • Adjust Cost of Goods Sold for higher vendor costs due to lack of trust from suppliers. • Add back non-recurring legal / other professional fees associated with the restructuring and/or distressed sale process. • Add back excess lease expens...",
      "Other possible outcomes: • Foreclosure (either official or unofficial) • General assignment (faster alternative to bankruptcy) • Section 363 asset sale (a faster, less risky version of a normal asset sale) • Chapter 11 bankruptcy • Chapter 7 bankruptcy",
      "You gain a very specialized skill set (and therefore become more valuable / employable) and much of the work is actually more technical / interesting than M&A, for example....",
      "1. Timing is often quick since the company needs to sell or else they'll go bankrupt. 2. Sometimes you'll produce fewer \"upfront\" marketing materials (Information Memoranda, Management Presentations, etc.) in the interest of speed. 3. Creditors often initiate..."
    ],
    "correct": 2,
    "explanation": "You gain a very specialized skill set (and therefore become more valuable / employable) and much of the work is actually more technical / interesting than M&A, for example. You also get broader exposure because you see both the bright sides and not-so-bright sides of companies. If you're coming in with any legal background or have aspirations of doing that in the future, there's a ton of overlap with Restructuring because you have to operate within a legal framework and attorneys are involved at every step of the process - so that can be one of your selling points as well."
  },
  {
    "id": 123,
    "category": "Restructuring / Distressed M&A",
    "difficulty": "kho",
    "question": "How are you going to use your experience in Restructuring for your future career goals?",
    "options": [
      "Yes - in a distressed sale you have almost no negotiating leverage because you represent a company that's about to die....",
      "In most cases it will be higher because you're adjusting for higher-than-normal salaries, one-time legal and restructuring charges, and more.",
      "See above. In addition to the legal and \"better technical skills\" angles, you can also use the experience to work at a Distressed Investments or Special Situations Fund, which most people outside Restructuring don't have access to. Or you could just go back to...",
      "They are more complex, involve more parties, require more specialized/technical skills, and have to follow the Bankruptcy legal code - unlike most other types of deals bankers work on...."
    ],
    "correct": 2,
    "explanation": "See above. In addition to the legal and \"better technical skills\" angles, you can also use the experience to work at a Distressed Investments or Special Situations Fund, which most people outside Restructuring don't have access to. Or you could just go back to M&A or normal investing too, and still have superior technical knowledge to other bankers. There's no \"wrong\" answer as long as you don't say you have no interest in it in the future."
  },
  {
    "id": 124,
    "category": "Restructuring / Distressed M&A",
    "difficulty": "kho",
    "question": "How would a distressed company select its Restructuring bankers?",
    "options": [
      "These mirror the options that are available to the company itself in a distressed scenario: 1....",
      "\"Restructuring\" is one possible outcome of a Distressed M&A deal. A company can be \"distressed\" for many reasons, but the solution is not always to restructure its debt obligations - it might declare bankruptcy, it might liquidate and sell off its assets, or it might sell 100% of...",
      "Yes - in a distressed sale you have almost no negotiating leverage because you represent a company that's about to die....",
      "More so than M&A or IPO processes, Restructuring / Distressed M&A requires extremely specialized knowledge and relationships...."
    ],
    "correct": 3,
    "explanation": "More so than M&A or IPO processes, Restructuring / Distressed M&A requires extremely specialized knowledge and relationships. There are only a few banks with good practices, and they are selected on the basis of their experience doing similar deals in the industry as well as their relationships with all the other parties that will be involved in the deal process. Remember that a Restructuring involves many more parties than a normal M&A or financing deal does - there are lawyers, shareholders, debt investors, suppliers, directors, management, and crisis managers, and managing everyone can be like herding cats. Lawyers can also be a major source of business, since they're heavily involved with any type of Restructuring / Distressed scenario."
  },
  {
    "id": 125,
    "category": "Restructuring / Distressed M&A",
    "difficulty": "kho",
    "question": "Why would company go bankrupt in the first place?",
    "options": [
      "It is money borrowed by the distressed company that has repayment priority over all other existing secured/unsecured debt, equity, and other claims, and is considered \"safe\" by lenders because it is subject to stricter terms than other forms of financing....",
      "Here are a few of the more common ones: • A company cannot meet its debt obligations / interest payments. • Creditors can accelerate debt payments and force the company into bankruptcy. • An acquisition has gone poorly or a company has just written down the value of its assets st...",
      "They rise and the average AP Days might go well beyond what's \"normal\" for the industry - this is because a distressed company has trouble paying its vendors and suppliers.",
      "You'd have to look at the yields of bonds or the spreads of credit default swaps of comparable companies to get a sense of this...."
    ],
    "correct": 1,
    "explanation": "Here are a few of the more common ones: • A company cannot meet its debt obligations / interest payments. • Creditors can accelerate debt payments and force the company into bankruptcy. • An acquisition has gone poorly or a company has just written down the value of its assets steeply and needs extra capital to stay afloat (see: investment banking industry). • There is a liquidity crunch and the company cannot afford to pay its vendors or suppliers."
  },
  {
    "id": 126,
    "category": "Restructuring / Distressed M&A",
    "difficulty": "kho",
    "question": "What options are available to a distressed compa ny that can't meet debt obligations?",
    "options": [
      "In a lot of cases, aggressive creditors force this to happen - if they won't agree to the restructuring of its obligations or they can't finalize a sale outside court, they might force a company into Chapter 11 by accelerating debt payments.",
      "No. In fact, with distressed companies it's really important to analyze cash flows on a debt-free basis precisely because they might have higher-than-normal debt expenses.",
      "1. Refinance and obtain fresh debt / equity. 2. Sell the company (either as a whole or in pieces in an asset sale). 3. Restructure its financial obligations to lower interest payments / debt repayments, or issue debt with PIK interest to reduce the cash intere...",
      "• You use the same methodologies most of the time (public company comparables, precedent transactions, DCF)… • Except you look more at the lower range of the multiples and make all the accounting adjustments we went through above. • You also use lower projections for a DCF and an..."
    ],
    "correct": 2,
    "explanation": "1. Refinance and obtain fresh debt / equity. 2. Sell the company (either as a whole or in pieces in an asset sale). 3. Restructure its financial obligations to lower interest payments / debt repayments, or issue debt with PIK interest to reduce the cash interest expense. 4. File for bankruptcy and use that opportunity to obtain additional financing, restructure its obligations, and be freed of onerous contracts."
  },
  {
    "id": 127,
    "category": "Restructuring / Distressed M&A",
    "difficulty": "kho",
    "question": "What are the advantages and disadvantages of each option?",
    "options": [
      "This happens even outside distressed sales - generally the company does it if they want more bids / want to increase competition and drive a higher purchase price.",
      "What about the seller? In a stock purchase, you acquire 100% of a company's shares as well as all its assets and liabilities (on and off-balance sheet). In an asset purchase, you acquire only certain assets of a company and assume only certain liabilities - so...",
      "Yes - in a distressed sale you have almost no negotiating leverage because you represent a company that's about to die....",
      "1. Refinance - Advantages: Least disruptive to company and would help revive confidence; Disadvantages: Difficult to attract investors to a company on the verge of going bankrupt. 2. Sale - Advantages: Shareholders could get some value and creditors would be l..."
    ],
    "correct": 3,
    "explanation": "1. Refinance - Advantages: Least disruptive to company and would help revive confidence; Disadvantages: Difficult to attract investors to a company on the verge of going bankrupt. 2. Sale - Advantages: Shareholders could get some value and creditors would be less infuriated, knowing that funds are coming; Disadvantages: Unlikely to obtain a good valuation in a distressed sale, so company might sell for a fraction of its true worth 3. Restructuring - Advantages: Could resolve problems quickly without 3rd party involvement; Disadvantages: Lenders are often reluctant to increase their exposure to the company and management/lenders usually don't see eye-to-eye 4. Bankruptcy - Advantages: Could be the best way to negotiate with lenders, reduce obligations, and get additional financing; Disadvantages: Significant business disruptions and lack of confidence from customers, and equity investors would likely lose all their money"
  },
  {
    "id": 128,
    "category": "Restructuring / Distressed M&A",
    "difficulty": "kho",
    "question": "From the perspective of the creditors, what different strategies do they have available to recover their capital in a distressed situation?",
    "options": [
      "They rise and the average AP Days might go well beyond what's \"normal\" for the industry - this is because a distressed company has trouble paying its vendors and suppliers.",
      "Trick question. Remember, MARKET CAP DOES NOT EQUAL SHAREHOLDERS' EQUITY. You might be tempted to say something like, \"Shareholders' equity falls!\" but the share price of the company does not affect shareholders' equity, which is a book value. What actually ha...",
      "These mirror the options that are available to the company itself in a distressed scenario: 1....",
      "No. In fact, with distressed companies it's really important to analyze cash flows on a debt-free basis precisely because they might have higher-than-normal debt expenses."
    ],
    "correct": 2,
    "explanation": "These mirror the options that are available to the company itself in a distressed scenario: 1. Lend additional capital / grant equity to company. 2. Conditional financing - Only agree to invest if the company cuts expenses, stops losing money, and agrees to other terms and covenants. 3. Sale - Force the company to hire an investment bank to sell itself, or parts of itself. 4. Foreclosure - Bank seizes collateral and forces a bankruptcy filing."
  },
  {
    "id": 129,
    "category": "Restructuring / Distressed M&A",
    "difficulty": "kho",
    "question": "How are Restructuring deals different from other types of transactions?",
    "options": [
      "They are more complex, involve more parties, require more specialized/technical skills, and have to follow the Bankruptcy legal code - unlike most other types of deals bankers work on....",
      "Here are a few of the more common ones: • A company cannot meet its debt obligations / interest payments. • Creditors can accelerate debt payments and force the company into bankruptcy. • An acquisition has gone poorly or a company has just written down the value of its assets st...",
      "• Debt: Sometimes if the company is too small or if investors don't believe it has a credible turnaround plan, they will simply refuse to lend it any sort of capital. • Equity: Same as above, but worse - since equity investors have lower priority than debt investors....",
      "You'd have to look at the yields of bonds or the spreads of credit default swaps of comparable companies to get a sense of this...."
    ],
    "correct": 0,
    "explanation": "They are more complex, involve more parties, require more specialized/technical skills, and have to follow the Bankruptcy legal code - unlike most other types of deals bankers work on. The debtor advisor, for example, might have to work with creditors during a forbearance period and then work with lawyers to determine collateral recoveries for each tranche of debt. Also, unlike most standard M&A deals the negotiation extends beyond two \"sides\" - it's not just the creditors negotiating with the debtors, but also the different creditors negotiating with each other. Distressed sales can happen very quickly if the company is on the brink of bankruptcy, but those are different from Bankruptcy scenarios."
  },
  {
    "id": 130,
    "category": "Restructuring / Distressed M&A",
    "difficulty": "kho",
    "question": "What's the difference between Chapter 7 and Chapter 11 bankruptcy?",
    "options": [
      "A Chapter 7 bankruptcy is also known as a \"liquidation bankruptcy\" - the company is too far past the point of reorganization and must instead sell off its assets and pay off creditors....",
      "When you acquire the assets of a distressed company, you get literally just the assets....",
      "A restructuring does not change the amount of debt outstanding in and of itself - instead, it changes the terms of the debt, such as interest payments, monthly/quarterly principal repayment requirements, and the covenants.",
      "Yes - in a distressed sale you have almost no negotiating leverage because you represent a company that's about to die...."
    ],
    "correct": 0,
    "explanation": "A Chapter 7 bankruptcy is also known as a \"liquidation bankruptcy\" - the company is too far past the point of reorganization and must instead sell off its assets and pay off creditors. A trustee ensures that all this happens according to plan. Chapter 11 is more of a \"reorganization\" - the company doesn't die, but instead changes the terms on its debt and renegotiates everything to lower interest payments and the dollar value of debt repayments. If we pretend a distressed company is a cocaine addict, Chapter 7 would be like a heart attack and Chapter 11 would be like rehab."
  },
  {
    "id": 131,
    "category": "Restructuring / Distressed M&A",
    "difficulty": "kho",
    "question": "What is debtor-in-possession (DIP) financing and how is it used with distressed companies?",
    "options": [
      "It is money borrowed by the distressed company that has repayment priority over all other existing secured/unsecured debt, equity, and other claims, and is considered \"safe\" by lenders because it is subject to stricter terms than other forms of financing....",
      "In a lot of cases, aggressive creditors force this to happen - if they won't agree to the restructuring of its obligations or they can't finalize a sale outside court, they might force a company into Chapter 11 by accelerating debt payments.",
      "minus Liabilities? In a Liquidation Valuation you need to adjust the values of the assets to reflect how much you could get if you sold them off separately. You might assume, for example, that you can only recover 50% of the book value of a company's inventory...",
      "Restructuring bankers advised distressed companies - businesses going bankrupt, in the midst of bankruptcy, or getting out of bankruptcy - and help them change their capital structure to get out of bankruptcy, avoid it in the first place, or assist with a sale of the company depe..."
    ],
    "correct": 0,
    "explanation": "It is money borrowed by the distressed company that has repayment priority over all other existing secured/unsecured debt, equity, and other claims, and is considered \"safe\" by lenders because it is subject to stricter terms than other forms of financing. Theoretically, this makes it easier for distressed companies to emerge from the bankruptcy process - though some argue that DIP financing is actually harmful on an empirical basis. Some DIP lending firms are known for trying to take over companies at a significant discount due to the huge amount of collateral they have. One reason companies might choose to file for (Chapter 11) bankruptcy is to get access to DIP financing."
  },
  {
    "id": 132,
    "category": "Restructuring / Distressed M&A",
    "difficulty": "kho",
    "question": "How would you adjust the 3 financial statements for a distressed company when you're doing valuation or modeling work?",
    "options": [
      "Trick question. Remember, MARKET CAP DOES NOT EQUAL SHAREHOLDERS' EQUITY. You might be tempted to say something like, \"Shareholders' equity falls!\" but the share price of the company does not affect shareholders' equity, which is a book value. What actually ha...",
      "• Debt: Sometimes if the company is too small or if investors don't believe it has a credible turnaround plan, they will simply refuse to lend it any sort of capital. • Equity: Same as above, but worse - since equity investors have lower priority than debt investors....",
      "Here are the most common adjustments: • Adjust Cost of Goods Sold for higher vendor costs due to lack of trust from suppliers. • Add back non-recurring legal / other professional fees associated with the restructuring and/or distressed sale process. • Add back excess lease expens...",
      "In most cases it will be higher because you're adjusting for higher-than-normal salaries, one-time legal and restructuring charges, and more."
    ],
    "correct": 2,
    "explanation": "Here are the most common adjustments: • Adjust Cost of Goods Sold for higher vendor costs due to lack of trust from suppliers. • Add back non-recurring legal / other professional fees associated with the restructuring and/or distressed sale process. • Add back excess lease expenses (again due to lack of trust) to Operating Income as well as excess salaries (often done so private company owners can save on taxes). • Working Capital needs to be adjusted for receivables unlikely to turn into cash, overvalued/insufficient inventory, and insufficient payables. • CapEx spending is often off (if it's too high that might be why they're going bankrupt, if it's too low they might be doing that artificially to save money)."
  },
  {
    "id": 133,
    "category": "Restructuring / Distressed M&A",
    "difficulty": "kho",
    "question": "Would those adjustments differ for public companies vs. private companies?",
    "options": [
      "Most of the above would apply to public companies as well, but the point about excess salaries does not hold true - it's much tougher for public companies to manipulate the system like that and pay abnormal salaries.",
      "Bankers can advise either the debtor (the company itself) or the creditors (anyone that has lent the company) money....",
      "• Debt: Sometimes if the company is too small or if investors don't believe it has a credible turnaround plan, they will simply refuse to lend it any sort of capital. • Equity: Same as above, but worse - since equity investors have lower priority than debt investors....",
      "This varies A LOT by industry, company and the specific assets, but some rough guidelines: • Cash: Probably close to 100% because it's the most liquid asset. • Investments: Varies a lot by what they are and how liquid they are - you might get close to 100% for the ones closest to..."
    ],
    "correct": 0,
    "explanation": "Most of the above would apply to public companies as well, but the point about excess salaries does not hold true - it's much tougher for public companies to manipulate the system like that and pay abnormal salaries."
  },
  {
    "id": 134,
    "category": "Restructuring / Distressed M&A",
    "difficulty": "kho",
    "question": "If the market value of a distressed company's debt is greater than the company's assets, what happens to its equity?",
    "options": [
      "The SHAREHOLDERS' EQUITY goes negative (which is actually not that uncommon and happens all the time in LBOs and when a company is unprofitable)....",
      "The motivation is simple: use excess balance sheet cash to buy back debt on-the-cheap and sharply reduce interest expense and obligations going forward....",
      "You'd have to look at the yields of bonds or the spreads of credit default swaps of comparable companies to get a sense of this....",
      "What about the seller? In a stock purchase, you acquire 100% of a company's shares as well as all its assets and liabilities (on and off-balance sheet). In an asset purchase, you acquire only certain assets of a company and assume only certain liabilities - so..."
    ],
    "correct": 0,
    "explanation": "The SHAREHOLDERS' EQUITY goes negative (which is actually not that uncommon and happens all the time in LBOs and when a company is unprofitable). A company's EQUITY MARKET CAP (which is different - that's just shares outstanding * share price) would remain positive, though, as that can never be negative."
  },
  {
    "id": 135,
    "category": "Restructuring / Distressed M&A",
    "difficulty": "kho",
    "question": "In a bankruptcy, what is the order of claims on a company's assets?",
    "options": [
      "1. New debtor-in-possession (DIP) lenders (see explanation above) 2. Secured creditors (revolvers and \"bank debt\") 3. Unsecured creditors (\"high-yield\" bonds) 4. Subordinated debt investors (similar to high-yield bonds) 5. Mezzanine investors (convertibles, co...",
      "They rise and the average AP Days might go well beyond what's \"normal\" for the industry - this is because a distressed company has trouble paying its vendors and suppliers.",
      "Technically, the answer is \"it depends\" but practically speaking most of the time the answer is \"no.\" If a company is truly distressed, the value of its debts and obligations most likely exceed the value of its assets - so equity investors rarely get much out of a bankruptcy or d...",
      "\"Restructuring\" is one possible outcome of a Distressed M&A deal. A company can be \"distressed\" for many reasons, but the solution is not always to restructure its debt obligations - it might declare bankruptcy, it might liquidate and sell off its assets, or it might sell 100% of..."
    ],
    "correct": 0,
    "explanation": "1. New debtor-in-possession (DIP) lenders (see explanation above) 2. Secured creditors (revolvers and \"bank debt\") 3. Unsecured creditors (\"high-yield\" bonds) 4. Subordinated debt investors (similar to high-yield bonds) 5. Mezzanine investors (convertibles, convertible preferred stock, preferred stock, PIK) 6. Shareholders (equity investors) \"Secured\" means that the lender's claims are protected by specific assets or collateral; unsecured means anyone who has loaned the company money without collateral. For more on the different types of debt, see the LBO section where we have a chart showing the differences between everything."
  },
  {
    "id": 136,
    "category": "Restructuring / Distressed M&A",
    "difficulty": "kho",
    "question": "How do you measure the cost of debt for a company if it is too distressed to issue additional debt (i.e. investors won't buy any debt from them)?",
    "options": [
      "They are more complex, involve more parties, require more specialized/technical skills, and have to follow the Bankruptcy legal code - unlike most other types of deals bankers work on....",
      "These mirror the options that are available to the company itself in a distressed scenario: 1....",
      "They rise and the average AP Days might go well beyond what's \"normal\" for the industry - this is because a distressed company has trouble paying its vendors and suppliers.",
      "You'd have to look at the yields of bonds or the spreads of credit default swaps of comparable companies to get a sense of this...."
    ],
    "correct": 3,
    "explanation": "You'd have to look at the yields of bonds or the spreads of credit default swaps of comparable companies to get a sense of this. You could also just use the current yields on a company's existing debt to estimate this, though it may be difficult if the existing debt is illiquid."
  },
  {
    "id": 137,
    "category": "Restructuring / Distressed M&A",
    "difficulty": "kho",
    "question": "How would valuation change for a distressed company?",
    "options": [
      "Most likely over-levered companies - ones with too much debt - that were acquired by PE firms in leveraged buyouts during the boom years, and now face interest payments they have trouble meeting, along with excess cash.",
      "• You use the same methodologies most of the time (public company comparables, precedent transactions, DCF)… • Except you look more at the lower range of the multiples and make all the accounting adjustments we went through above. • You also use lower projections for a DCF and an...",
      "See above. In addition to the legal and \"better technical skills\" angles, you can also use the experience to work at a Distressed Investments or Special Situations Fund, which most people outside Restructuring don't have access to. Or you could just go back to...",
      "Most of the above would apply to public companies as well, but the point about excess salaries does not hold true - it's much tougher for public companies to manipulate the system like that and pay abnormal salaries."
    ],
    "correct": 1,
    "explanation": "• You use the same methodologies most of the time (public company comparables, precedent transactions, DCF)… • Except you look more at the lower range of the multiples and make all the accounting adjustments we went through above. • You also use lower projections for a DCF and anything else that needs projections because you assume a turnaround period is required. • You might pay more attention to revenue multiples if the company is EBIT/EBITDA/EPS-negative. • You also look at a liquidation valuation under the assumption that the company's assets will be sold off and used to pay its obligations. • Sometimes you look at valuations on both an assets-only basis and a current liabilities-assumed basis. This distinction exists because you need to make big adjustments to liabilities with distressed companies."
  },
  {
    "id": 138,
    "category": "Restructuring / Distressed M&A",
    "difficulty": "kho",
    "question": "How would a DCF analysis be different in a distressed scenario?",
    "options": [
      "Trick question. Remember, MARKET CAP DOES NOT EQUAL SHAREHOLDERS' EQUITY. You might be tempted to say something like, \"Shareholders' equity falls!\" but the share price of the company does not affect shareholders' equity, which is a book value. What actually ha...",
      "Other possible outcomes: • Foreclosure (either official or unofficial) • General assignment (faster alternative to bankruptcy) • Section 363 asset sale (a faster, less risky version of a normal asset sale) • Chapter 11 bankruptcy • Chapter 7 bankruptcy",
      "Even more of the value would come from the terminal value since you normally assume a few years of cash flow-negative turnaround....",
      "They are more complex, involve more parties, require more specialized/technical skills, and have to follow the Bankruptcy legal code - unlike most other types of deals bankers work on...."
    ],
    "correct": 2,
    "explanation": "Even more of the value would come from the terminal value since you normally assume a few years of cash flow-negative turnaround. You might also do a sensitivity table on hitting or missing earnings projections, and also add a premium to WACC to make it higher and account for operating distress."
  },
  {
    "id": 139,
    "category": "Restructuring / Distressed M&A",
    "difficulty": "kho",
    "question": "Let's say a distressed company approaches you and wants to hire your bank to sell it in a distressed sale - how would the M&A process be different than it would for a healthy company?",
    "options": [
      "Most of the above would apply to public companies as well, but the point about excess salaries does not hold true - it's much tougher for public companies to manipulate the system like that and pay abnormal salaries.",
      "Restructuring bankers advised distressed companies - businesses going bankrupt, in the midst of bankruptcy, or getting out of bankruptcy - and help them change their capital structure to get out of bankruptcy, avoid it in the first place, or assist with a sale of the company depe...",
      "1. Timing is often quick since the company needs to sell or else they'll go bankrupt. 2. Sometimes you'll produce fewer \"upfront\" marketing materials (Information Memoranda, Management Presentations, etc.) in the interest of speed. 3. Creditors often initiate...",
      "Here are a few of the more common ones: • A company cannot meet its debt obligations / interest payments. • Creditors can accelerate debt payments and force the company into bankruptcy. • An acquisition has gone poorly or a company has just written down the value of its assets st..."
    ],
    "correct": 2,
    "explanation": "1. Timing is often quick since the company needs to sell or else they'll go bankrupt. 2. Sometimes you'll produce fewer \"upfront\" marketing materials (Information Memoranda, Management Presentations, etc.) in the interest of speed. 3. Creditors often initiate the process rather than the company itself. 4. Unlike normal M&A deals, distressed sales can't \"fail\" - they result in a sale, a bankruptcy or sometimes a restructuring."
  },
  {
    "id": 140,
    "category": "Restructuring / Distressed M&A",
    "difficulty": "kho",
    "question": "Normally in a sell-side M&A process, you always want to have multiple bidders to increase competition. Is there any reason they'd be especially important in a distressed sale?",
    "options": [
      "Trick question. Remember, MARKET CAP DOES NOT EQUAL SHAREHOLDERS' EQUITY. You might be tempted to say something like, \"Shareholders' equity falls!\" but the share price of the company does not affect shareholders' equity, which is a book value. What actually ha...",
      "A restructuring does not change the amount of debt outstanding in and of itself - instead, it changes the terms of the debt, such as interest payments, monthly/quarterly principal repayment requirements, and the covenants.",
      "Yes - in a distressed sale you have almost no negotiating leverage because you represent a company that's about to die....",
      "Here are a few of the more common ones: • A company cannot meet its debt obligations / interest payments. • Creditors can accelerate debt payments and force the company into bankruptcy. • An acquisition has gone poorly or a company has just written down the value of its assets st..."
    ],
    "correct": 2,
    "explanation": "Yes - in a distressed sale you have almost no negotiating leverage because you represent a company that's about to die. The only real way to improve price for your client is to have multiple bidders."
  },
  {
    "id": 141,
    "category": "Restructuring / Distressed M&A",
    "difficulty": "kho",
    "question": "The 2 basic ways you can buy a company are through a stock purchase and an asset purchase. What's the difference, and what would a buyer in a distressed sale prefer?",
    "options": [
      "What about the seller? In a stock purchase, you acquire 100% of a company's shares as well as all its assets and liabilities (on and off-balance sheet). In an asset purchase, you acquire only certain assets of a company and assume only certain liabilities - so...",
      "\"Restructuring\" is one possible outcome of a Distressed M&A deal. A company can be \"distressed\" for many reasons, but the solution is not always to restructure its debt obligations - it might declare bankruptcy, it might liquidate and sell off its assets, or it might sell 100% of...",
      "Yes - in a distressed sale you have almost no negotiating leverage because you represent a company that's about to die....",
      "Trick question. Remember, MARKET CAP DOES NOT EQUAL SHAREHOLDERS' EQUITY. You might be tempted to say something like, \"Shareholders' equity falls!\" but the share price of the company does not affect shareholders' equity, which is a book value. What actually ha..."
    ],
    "correct": 0,
    "explanation": "What about the seller? In a stock purchase, you acquire 100% of a company's shares as well as all its assets and liabilities (on and off-balance sheet). In an asset purchase, you acquire only certain assets of a company and assume only certain liabilities - so you can pick and choose exactly what you're getting. Companies typically use asset purchases for divestitures, distressed M&A, and smaller private companies; anything large, public, and healthy generally needs to be acquired via a stock purchase. A buyer almost always prefers an asset purchase so it can avoid assumption of unknown liabilities (there are also tax advantages for the buyer). A (distressed) seller almost always prefers a stock purchase so it can be rid of all its liabilities and because it gets taxed more heavily when selling assets vs. selling the entire business."
  },
  {
    "id": 142,
    "category": "Restructuring / Distressed M&A",
    "difficulty": "kho",
    "question": "Sometimes a distressed sale does not end in a conventional stock/asset purchase - what are some other possible outcomes?",
    "options": [
      "This varies A LOT by industry, company and the specific assets, but some rough guidelines: • Cash: Probably close to 100% because it's the most liquid asset. • Investments: Varies a lot by what they are and how liquid they are - you might get close to 100% for the ones closest to...",
      "Yes - in a distressed sale you have almost no negotiating leverage because you represent a company that's about to die....",
      "• You use the same methodologies most of the time (public company comparables, precedent transactions, DCF)… • Except you look more at the lower range of the multiples and make all the accounting adjustments we went through above. • You also use lower projections for a DCF and an...",
      "Other possible outcomes: • Foreclosure (either official or unofficial) • General assignment (faster alternative to bankruptcy) • Section 363 asset sale (a faster, less risky version of a normal asset sale) • Chapter 11 bankruptcy • Chapter 7 bankruptcy"
    ],
    "correct": 3,
    "explanation": "Other possible outcomes: • Foreclosure (either official or unofficial) • General assignment (faster alternative to bankruptcy) • Section 363 asset sale (a faster, less risky version of a normal asset sale) • Chapter 11 bankruptcy • Chapter 7 bankruptcy"
  },
  {
    "id": 143,
    "category": "Restructuring / Distressed M&A",
    "difficulty": "kho",
    "question": "Normally M&A processes are kept confidential - is there any reason why a distressed company would want to announce the involvement of a banker in a sale process?",
    "options": [
      "Technically, the answer is \"it depends\" but practically speaking most of the time the answer is \"no.\" If a company is truly distressed, the value of its debts and obligations most likely exceed the value of its assets - so equity investors rarely get much out of a bankruptcy or d...",
      "Bankers can advise either the debtor (the company itself) or the creditors (anyone that has lent the company) money....",
      "A Chapter 7 bankruptcy is also known as a \"liquidation bankruptcy\" - the company is too far past the point of reorganization and must instead sell off its assets and pay off creditors....",
      "This happens even outside distressed sales - generally the company does it if they want more bids / want to increase competition and drive a higher purchase price."
    ],
    "correct": 3,
    "explanation": "This happens even outside distressed sales - generally the company does it if they want more bids / want to increase competition and drive a higher purchase price."
  },
  {
    "id": 144,
    "category": "Restructuring / Distressed M&A",
    "difficulty": "kho",
    "question": "Are shareholders likely to receive any compensation in a distressed sale or bankruptcy?",
    "options": [
      "1. Refinance and obtain fresh debt / equity. 2. Sell the company (either as a whole or in pieces in an asset sale). 3. Restructure its financial obligations to lower interest payments / debt repayments, or issue debt with PIK interest to reduce the cash intere...",
      "Technically, the answer is \"it depends\" but practically speaking most of the time the answer is \"no.\" If a company is truly distressed, the value of its debts and obligations most likely exceed the value of its assets - so equity investors rarely get much out of a bankruptcy or d...",
      "No. In fact, with distressed companies it's really important to analyze cash flows on a debt-free basis precisely because they might have higher-than-normal debt expenses.",
      "The SHAREHOLDERS' EQUITY goes negative (which is actually not that uncommon and happens all the time in LBOs and when a company is unprofitable)...."
    ],
    "correct": 1,
    "explanation": "Technically, the answer is \"it depends\" but practically speaking most of the time the answer is \"no.\" If a company is truly distressed, the value of its debts and obligations most likely exceed the value of its assets - so equity investors rarely get much out of a bankruptcy or distressed sale, especially when it ends in liquidation."
  },
  {
    "id": 145,
    "category": "Restructuring / Distressed M&A",
    "difficulty": "kho",
    "question": "Let's say a company wants to sell itself or simply restructure its obligations - why might it be forced into a Chapter 11 bankruptcy?",
    "options": [
      "In a lot of cases, aggressive creditors force this to happen - if they won't agree to the restructuring of its obligations or they can't finalize a sale outside court, they might force a company into Chapter 11 by accelerating debt payments.",
      "This happens even outside distressed sales - generally the company does it if they want more bids / want to increase competition and drive a higher purchase price.",
      "Even more of the value would come from the terminal value since you normally assume a few years of cash flow-negative turnaround....",
      "Most likely over-levered companies - ones with too much debt - that were acquired by PE firms in leveraged buyouts during the boom years, and now face interest payments they have trouble meeting, along with excess cash."
    ],
    "correct": 0,
    "explanation": "In a lot of cases, aggressive creditors force this to happen - if they won't agree to the restructuring of its obligations or they can't finalize a sale outside court, they might force a company into Chapter 11 by accelerating debt payments."
  },
  {
    "id": 146,
    "category": "Restructuring / Distressed M&A",
    "difficulty": "kho",
    "question": "Recently, there has been news of distressed companies like GM \"buying back\" their debt for 50 cents on the dollar. What's the motivation for doing this and how does it work accounting-wise?",
    "options": [
      "The motivation is simple: use excess balance sheet cash to buy back debt on-the-cheap and sharply reduce interest expense and obligations going forward....",
      "• Debt: Sometimes if the company is too small or if investors don't believe it has a credible turnaround plan, they will simply refuse to lend it any sort of capital. • Equity: Same as above, but worse - since equity investors have lower priority than debt investors....",
      "1. Refinance - Advantages: Least disruptive to company and would help revive confidence; Disadvantages: Difficult to attract investors to a company on the verge of going bankrupt. 2. Sale - Advantages: Shareholders could get some value and creditors would be l...",
      "You'd have to look at the yields of bonds or the spreads of credit default swaps of comparable companies to get a sense of this...."
    ],
    "correct": 0,
    "explanation": "The motivation is simple: use excess balance sheet cash to buy back debt on-the-cheap and sharply reduce interest expense and obligations going forward. It works because the foregone interest on cash is lower than whatever interest rate they're paying on debt - so they reduce their net interest expense no matter what. Many companies are faced with huge debt obligations that have declined significantly in value but which still have relatively high interest rates, so they're using the opportunity to rid themselves of excess cash and cancel out their existing debt. Accounting-wise, it's simple: Balance Sheet cash goes down and debt on the Liabilities & Equity side goes down by the same amount to make it balance."
  },
  {
    "id": 147,
    "category": "Restructuring / Distressed M&A",
    "difficulty": "kho",
    "question": "What kind of companies would most likely enact debt buy-backs?",
    "options": [
      "They rise and the average AP Days might go well beyond what's \"normal\" for the industry - this is because a distressed company has trouble paying its vendors and suppliers.",
      "Most likely over-levered companies - ones with too much debt - that were acquired by PE firms in leveraged buyouts during the boom years, and now face interest payments they have trouble meeting, along with excess cash.",
      "The purpose of an LBO model here is not to determine the private equity firm's IRR, but rather to figure out how quickly the company can pay off its debt obligations as well as what kind of IRR any new debt/equity investors can expect....",
      "Other possible outcomes: • Foreclosure (either official or unofficial) • General assignment (faster alternative to bankruptcy) • Section 363 asset sale (a faster, less risky version of a normal asset sale) • Chapter 11 bankruptcy • Chapter 7 bankruptcy"
    ],
    "correct": 1,
    "explanation": "Most likely over-levered companies - ones with too much debt - that were acquired by PE firms in leveraged buyouts during the boom years, and now face interest payments they have trouble meeting, along with excess cash."
  },
  {
    "id": 148,
    "category": "Restructuring / Distressed M&A",
    "difficulty": "kho",
    "question": "Why might a creditor might have to take a loss on the debt it loaned to a distressed company?",
    "options": [
      "1. Timing is often quick since the company needs to sell or else they'll go bankrupt. 2. Sometimes you'll produce fewer \"upfront\" marketing materials (Information Memoranda, Management Presentations, etc.) in the interest of speed. 3. Creditors often initiate...",
      "1. New debtor-in-possession (DIP) lenders (see explanation above) 2. Secured creditors (revolvers and \"bank debt\") 3. Unsecured creditors (\"high-yield\" bonds) 4. Subordinated debt investors (similar to high-yield bonds) 5. Mezzanine investors (convertibles, co...",
      "This happens to lower-priority creditors all the time. Remember, secured creditors always come first and get first claim to all the proceeds from a sale or series of asset sales; if a creditor is lower on the totem pole, they only get what's left of the proceeds so they have to t...",
      "Most of the above would apply to public companies as well, but the point about excess salaries does not hold true - it's much tougher for public companies to manipulate the system like that and pay abnormal salaries."
    ],
    "correct": 2,
    "explanation": "This happens to lower-priority creditors all the time. Remember, secured creditors always come first and get first claim to all the proceeds from a sale or series of asset sales; if a creditor is lower on the totem pole, they only get what's left of the proceeds so they have to take a loss on their loans / obligations."
  },
  {
    "id": 149,
    "category": "Restructuring / Distressed M&A",
    "difficulty": "kho",
    "question": "What is the end goal of a given financial restructuring?",
    "options": [
      "Restructuring bankers advised distressed companies - businesses going bankrupt, in the midst of bankruptcy, or getting out of bankruptcy - and help them change their capital structure to get out of bankruptcy, avoid it in the first place, or assist with a sale of the company depe...",
      "A restructuring does not change the amount of debt outstanding in and of itself - instead, it changes the terms of the debt, such as interest payments, monthly/quarterly principal repayment requirements, and the covenants.",
      "See above. In addition to the legal and \"better technical skills\" angles, you can also use the experience to work at a Distressed Investments or Special Situations Fund, which most people outside Restructuring don't have access to. Or you could just go back to...",
      "1. Refinance and obtain fresh debt / equity. 2. Sell the company (either as a whole or in pieces in an asset sale). 3. Restructure its financial obligations to lower interest payments / debt repayments, or issue debt with PIK interest to reduce the cash intere..."
    ],
    "correct": 1,
    "explanation": "A restructuring does not change the amount of debt outstanding in and of itself - instead, it changes the terms of the debt, such as interest payments, monthly/quarterly principal repayment requirements, and the covenants."
  },
  {
    "id": 150,
    "category": "Restructuring / Distressed M&A",
    "difficulty": "kho",
    "question": "What's the difference between a Distressed M&A deal and a Restructuring deal?",
    "options": [
      "You'd have to look at the yields of bonds or the spreads of credit default swaps of comparable companies to get a sense of this....",
      "\"Restructuring\" is one possible outcome of a Distressed M&A deal. A company can be \"distressed\" for many reasons, but the solution is not always to restructure its debt obligations - it might declare bankruptcy, it might liquidate and sell off its assets, or it might sell 100% of...",
      "It is money borrowed by the distressed company that has repayment priority over all other existing secured/unsecured debt, equity, and other claims, and is considered \"safe\" by lenders because it is subject to stricter terms than other forms of financing....",
      "The SHAREHOLDERS' EQUITY goes negative (which is actually not that uncommon and happens all the time in LBOs and when a company is unprofitable)...."
    ],
    "correct": 1,
    "explanation": "\"Restructuring\" is one possible outcome of a Distressed M&A deal. A company can be \"distressed\" for many reasons, but the solution is not always to restructure its debt obligations - it might declare bankruptcy, it might liquidate and sell off its assets, or it might sell 100% of itself to another company. \"Restructuring\" just refers to what happens when the distressed company in question decides it wants to change around its debt obligations so that it can better repay them in the future."
  },
  {
    "id": 151,
    "category": "Restructuring / Distressed M&A",
    "difficulty": "kho",
    "question": "What's the difference between acquiring just the assets of a company and acquiring it on a \"current liabilities assumed\" basis?",
    "options": [
      "This varies A LOT by industry, company and the specific assets, but some rough guidelines: • Cash: Probably close to 100% because it's the most liquid asset. • Investments: Varies a lot by what they are and how liquid they are - you might get close to 100% for the ones closest to...",
      "Here are a few of the more common ones: • A company cannot meet its debt obligations / interest payments. • Creditors can accelerate debt payments and force the company into bankruptcy. • An acquisition has gone poorly or a company has just written down the value of its assets st...",
      "1. New debtor-in-possession (DIP) lenders (see explanation above) 2. Secured creditors (revolvers and \"bank debt\") 3. Unsecured creditors (\"high-yield\" bonds) 4. Subordinated debt investors (similar to high-yield bonds) 5. Mezzanine investors (convertibles, co...",
      "When you acquire the assets of a distressed company, you get literally just the assets...."
    ],
    "correct": 3,
    "explanation": "When you acquire the assets of a distressed company, you get literally just the assets. But when you acquire the current liabilities as well, you need to make adjustments to account for the fact that a distressed company's working capital can be extremely skewed. Specifically, \"owed expense\" line items like Accounts Payable and Accrued Expenses are often much higher than they would be for a healthy company, so you need to subtract the difference if you're assuming the current liabilities. This results in a deduction to your valuation - so in most cases the valuation is lower if you're assuming current liabilities."
  },
  {
    "id": 152,
    "category": "Restructuring / Distressed M&A",
    "difficulty": "kho",
    "question": "How could a decline in a company's share price cause it to go bankrupt?",
    "options": [
      "Here are a few of the more common ones: • A company cannot meet its debt obligations / interest payments. • Creditors can accelerate debt payments and force the company into bankruptcy. • An acquisition has gone poorly or a company has just written down the value of its assets st...",
      "Trick question. Remember, MARKET CAP DOES NOT EQUAL SHAREHOLDERS' EQUITY. You might be tempted to say something like, \"Shareholders' equity falls!\" but the share price of the company does not affect shareholders' equity, which is a book value. What actually ha...",
      "In a lot of cases, aggressive creditors force this to happen - if they won't agree to the restructuring of its obligations or they can't finalize a sale outside court, they might force a company into Chapter 11 by accelerating debt payments.",
      "Most of the above would apply to public companies as well, but the point about excess salaries does not hold true - it's much tougher for public companies to manipulate the system like that and pay abnormal salaries."
    ],
    "correct": 1,
    "explanation": "Trick question. Remember, MARKET CAP DOES NOT EQUAL SHAREHOLDERS' EQUITY. You might be tempted to say something like, \"Shareholders' equity falls!\" but the share price of the company does not affect shareholders' equity, which is a book value. What actually happens: as a result of the share price drop, customers, vendors, suppliers, and lenders would be more reluctant to do business with the distressed company - so its revenue might fall and its Accounts Payable and Accrued Expenses line items might climb to unhealthy levels. All of that might cause the company to fail or require more capital, but the share price decline itself does not lead to bankruptcy. In the case of Bear Stearns in 2008, overnight lenders lost confidence as a result of the sudden share price declines and it completely ran out of liquidity as a result - which is a big problem when your entire business depends on overnight lending."
  },
  {
    "id": 153,
    "category": "Restructuring / Distressed M&A",
    "difficulty": "kho",
    "question": "What happens to Accounts Payable Days with a distressed company?",
    "options": [
      "This happens to lower-priority creditors all the time. Remember, secured creditors always come first and get first claim to all the proceeds from a sale or series of asset sales; if a creditor is lower on the totem pole, they only get what's left of the proceeds so they have to t...",
      "1. New debtor-in-possession (DIP) lenders (see explanation above) 2. Secured creditors (revolvers and \"bank debt\") 3. Unsecured creditors (\"high-yield\" bonds) 4. Subordinated debt investors (similar to high-yield bonds) 5. Mezzanine investors (convertibles, co...",
      "They rise and the average AP Days might go well beyond what's \"normal\" for the industry - this is because a distressed company has trouble paying its vendors and suppliers.",
      "Bankers can advise either the debtor (the company itself) or the creditors (anyone that has lent the company) money...."
    ],
    "correct": 2,
    "explanation": "They rise and the average AP Days might go well beyond what's \"normal\" for the industry - this is because a distressed company has trouble paying its vendors and suppliers."
  },
  {
    "id": 154,
    "category": "Restructuring / Distressed M&A",
    "difficulty": "kho",
    "question": "Let's say a distressed company wants to raise debt or equity to fix its financial problems rather than selling or declaring bankruptcy. Why might it not be able to do this?",
    "options": [
      "Most of the above would apply to public companies as well, but the point about excess salaries does not hold true - it's much tougher for public companies to manipulate the system like that and pay abnormal salaries.",
      "• Debt: Sometimes if the company is too small or if investors don't believe it has a credible turnaround plan, they will simply refuse to lend it any sort of capital. • Equity: Same as above, but worse - since equity investors have lower priority than debt investors....",
      "1. Refinance - Advantages: Least disruptive to company and would help revive confidence; Disadvantages: Difficult to attract investors to a company on the verge of going bankrupt. 2. Sale - Advantages: Shareholders could get some value and creditors would be l...",
      "minus Liabilities? In a Liquidation Valuation you need to adjust the values of the assets to reflect how much you could get if you sold them off separately. You might assume, for example, that you can only recover 50% of the book value of a company's inventory..."
    ],
    "correct": 1,
    "explanation": "• Debt: Sometimes if the company is too small or if investors don't believe it has a credible turnaround plan, they will simply refuse to lend it any sort of capital. • Equity: Same as above, but worse - since equity investors have lower priority than debt investors. Plus, for a distressed company getting \"enough\" equity can mean selling 100% or near 100% of the company due to its depressed market cap."
  },
  {
    "id": 155,
    "category": "Restructuring / Distressed M&A",
    "difficulty": "kho",
    "question": "Will the adjusted EBITDA of a distressed company be higher or lower than the value you would get from its financial statements?",
    "options": [
      "In most cases it will be higher because you're adjusting for higher-than-normal salaries, one-time legal and restructuring charges, and more.",
      "The motivation is simple: use excess balance sheet cash to buy back debt on-the-cheap and sharply reduce interest expense and obligations going forward....",
      "It is money borrowed by the distressed company that has repayment priority over all other existing secured/unsecured debt, equity, and other claims, and is considered \"safe\" by lenders because it is subject to stricter terms than other forms of financing....",
      "• You use the same methodologies most of the time (public company comparables, precedent transactions, DCF)… • Except you look more at the lower range of the multiples and make all the accounting adjustments we went through above. • You also use lower projections for a DCF and an..."
    ],
    "correct": 0,
    "explanation": "In most cases it will be higher because you're adjusting for higher-than-normal salaries, one-time legal and restructuring charges, and more."
  },
  {
    "id": 156,
    "category": "Restructuring / Distressed M&A",
    "difficulty": "kho",
    "question": "Would you use Levered Cash Flow for a distressed company in a DCF since it might be encumbered with debt?",
    "options": [
      "1. Refinance - Advantages: Least disruptive to company and would help revive confidence; Disadvantages: Difficult to attract investors to a company on the verge of going bankrupt. 2. Sale - Advantages: Shareholders could get some value and creditors would be l...",
      "Even more of the value would come from the terminal value since you normally assume a few years of cash flow-negative turnaround....",
      "No. In fact, with distressed companies it's really important to analyze cash flows on a debt-free basis precisely because they might have higher-than-normal debt expenses.",
      "When you acquire the assets of a distressed company, you get literally just the assets...."
    ],
    "correct": 2,
    "explanation": "No. In fact, with distressed companies it's really important to analyze cash flows on a debt-free basis precisely because they might have higher-than-normal debt expenses."
  },
  {
    "id": 157,
    "category": "Restructuring / Distressed M&A",
    "difficulty": "kho",
    "question": "Let's say we're doing a Liquidation Valuation for a distressed company. Why can't we just use the Shareholders' Equity number for its value? Isn't that equal to Assets",
    "options": [
      "This happens even outside distressed sales - generally the company does it if they want more bids / want to increase competition and drive a higher purchase price.",
      "They are more complex, involve more parties, require more specialized/technical skills, and have to follow the Bankruptcy legal code - unlike most other types of deals bankers work on....",
      "minus Liabilities? In a Liquidation Valuation you need to adjust the values of the assets to reflect how much you could get if you sold them off separately. You might assume, for example, that you can only recover 50% of the book value of a company's inventory...",
      "The SHAREHOLDERS' EQUITY goes negative (which is actually not that uncommon and happens all the time in LBOs and when a company is unprofitable)...."
    ],
    "correct": 2,
    "explanation": "minus Liabilities? In a Liquidation Valuation you need to adjust the values of the assets to reflect how much you could get if you sold them off separately. You might assume, for example, that you can only recover 50% of the book value of a company's inventory if you tried to sell it off separately. Shareholders' Equity is equal to Assets minus Liabilities, but in a Liquidation Valuation we change the values of all the Assets so we can't just use the Shareholders' Equity number."
  },
  {
    "id": 158,
    "category": "Restructuring / Distressed M&A",
    "difficulty": "kho",
    "question": "What kind of recovery can you expect for different assets in a Liquidation Valuation?",
    "options": [
      "Technically, the answer is \"it depends\" but practically speaking most of the time the answer is \"no.\" If a company is truly distressed, the value of its debts and obligations most likely exceed the value of its assets - so equity investors rarely get much out of a bankruptcy or d...",
      "What about the seller? In a stock purchase, you acquire 100% of a company's shares as well as all its assets and liabilities (on and off-balance sheet). In an asset purchase, you acquire only certain assets of a company and assume only certain liabilities - so...",
      "This varies A LOT by industry, company and the specific assets, but some rough guidelines: • Cash: Probably close to 100% because it's the most liquid asset. • Investments: Varies a lot by what they are and how liquid they are - you might get close to 100% for the ones closest to...",
      "1. Refinance and obtain fresh debt / equity. 2. Sell the company (either as a whole or in pieces in an asset sale). 3. Restructure its financial obligations to lower interest payments / debt repayments, or issue debt with PIK interest to reduce the cash intere..."
    ],
    "correct": 2,
    "explanation": "This varies A LOT by industry, company and the specific assets, but some rough guidelines: • Cash: Probably close to 100% because it's the most liquid asset. • Investments: Varies a lot by what they are and how liquid they are - you might get close to 100% for the ones closest to cash, but significantly less than that for equity investments in other companies. • Accounts Receivable: Less than what you'd get for cash because many customers might just not \"pay\" a distressed company. • Inventory: Less than Cash or AR because inventory is of little use to a different company. • PP&E: Similar to cash for land and buildings, and less than that for equipment. • Intangible Assets: 0%. No one will pay you anything for Goodwill or the value of a brand name - or if they will, it's near-impossible to quantify."
  },
  {
    "id": 159,
    "category": "Restructuring / Distressed M&A",
    "difficulty": "kho",
    "question": "How would an LBO model for a distressed company be different?",
    "options": [
      "1. Timing is often quick since the company needs to sell or else they'll go bankrupt. 2. Sometimes you'll produce fewer \"upfront\" marketing materials (Information Memoranda, Management Presentations, etc.) in the interest of speed. 3. Creditors often initiate...",
      "The purpose of an LBO model here is not to determine the private equity firm's IRR, but rather to figure out how quickly the company can pay off its debt obligations as well as what kind of IRR any new debt/equity investors can expect....",
      "\"Restructuring\" is one possible outcome of a Distressed M&A deal. A company can be \"distressed\" for many reasons, but the solution is not always to restructure its debt obligations - it might declare bankruptcy, it might liquidate and sell off its assets, or it might sell 100% of...",
      "Bankers can advise either the debtor (the company itself) or the creditors (anyone that has lent the company) money...."
    ],
    "correct": 1,
    "explanation": "The purpose of an LBO model here is not to determine the private equity firm's IRR, but rather to figure out how quickly the company can pay off its debt obligations as well as what kind of IRR any new debt/equity investors can expect. Other than that, it's not much different from the \"standard\" LBO model - the mechanics are the same, but you have different kinds of debt (e.g. Debtor-in-Possession), possibly more tranches, and the returns will probably be lower because it's a distressed company, though occasionally \"bargain\" deals can turn out to be very profitable. One structural difference is that a distressed company LBO is more likely to take the form of an asset purchase rather than a stock purchase. Technical Questions & Answers Technical Questions no longer consist entirely of \"How would you value a company?\" and \"How does Depreciation going up by $10 affect all the statements?\" Sure, you may still get these questions - and we do cover them in detail below. But these days interviewers are going beyond the basics that everyone knows and asking questions that make you think instead. There are an infinite number of Technical Questions and it's impossible to list everything you might encounter here - but these are the most common basic and advanced questions you might get. For Technical Questions there is almost always a \"right answer\" so we'll go through exact answers here as well. If you find yourself not knowing the answer to a Technical Question, you shouldn't try to fake it - just admit that you don't know rather than stumbling through the answer. There are a few exceptions - you really do need to know the basic concepts, like simple accounting and valuation. For more advanced modeling, there's more leeway to say that you don't have much experience or don't know the specific answer."
  },
  {
    "id": 160,
    "category": "Accounting - Basic",
    "difficulty": "de",
    "question": "Walk me through the 3 financial statements.",
    "options": [
      "Accounts receivable has not yet been collected in cash from customers, whereas deferred revenue has been....",
      "\"The 3 major financial statements are the Income Statement, Balance Sheet and Cash Flow Statement....",
      "Income Statement: Revenue is up by $20 and COGS is up by $10, so Gross Profit is up by $10 and Operating Income is up by $10 as well....",
      "Income Statement: Revenue; Cost of Goods Sold; SG&A (Selling, General & Administrative Expenses); Operating Income; Pretax Income; Net Income...."
    ],
    "correct": 1,
    "explanation": "\"The 3 major financial statements are the Income Statement, Balance Sheet and Cash Flow Statement. The Income Statement gives the company's revenue and expenses, and goes down to Net Income, the final line on the statement. The Balance Sheet shows the company's Assets - its resources - such as Cash, Inventory and PP&E, as well as its Liabilities - such as Debt and Accounts Payable - and Shareholders' Equity. Assets must equal Liabilities plus Shareholders' Equity. The Cash Flow Statement begins with Net Income, adjusts for non-cash expenses and working capital changes, and then lists cash flow from investing and financing activities; at the end, you see the company's net change in cash.\""
  },
  {
    "id": 161,
    "category": "Accounting - Basic",
    "difficulty": "de",
    "question": "Can you give examples of major line items on each of the financial statements?",
    "options": [
      "Income Statement: Revenue; Cost of Goods Sold; SG&A (Selling, General & Administrative Expenses); Operating Income; Pretax Income; Net Income....",
      "This is counter-intuitive. When a liability is written down you record it as a gain on the Income Statement (with an asset write-down, it's a loss) - so Pre-Tax Income goes up by $100 due to this write-down. Assuming a 40% tax rate, Net Income is up by $60. On...",
      "First, confirm what type of \"bailout\" this is - Debt? Equity?...",
      "If the asset has a useful life of over 1 year, it is capitalized (put on the Balance Sheet rather than shown as an expense on the Income Statement)...."
    ],
    "correct": 0,
    "explanation": "Income Statement: Revenue; Cost of Goods Sold; SG&A (Selling, General & Administrative Expenses); Operating Income; Pretax Income; Net Income. Balance Sheet: Cash; Accounts Receivable; Inventory; Plants, Property & Equipment (PP&E); Accounts Payable; Accrued Expenses; Debt; Shareholders' Equity. Cash Flow Statement: Net Income; Depreciation & Amortization; Stock-Based Compensation; Changes in Operating Assets & Liabilities; Cash Flow From Operations; Capital Expenditures; Cash Flow From Investing; Sale/Purchase of Securities; Dividends Issued; Cash Flow From Financing."
  },
  {
    "id": 162,
    "category": "Accounting - Basic",
    "difficulty": "de",
    "question": "How do the 3 statements link together?",
    "options": [
      "Usually this happens when a company has been acquired and the acquirer re-assesses its intangible assets (such as customers, brand, and intellectual property) and finds that they are worth significantly less than they originally thought....",
      "\"To tie the statements together, Net Income from the Income Statement flows into Shareholders' Equity on the Balance Sheet, and into the top line of the Cash Flow Statement....",
      "Yes. It is common to see this in 2 scenarios: 1. Leveraged Buyouts with dividend recapitalizations - it means that the owner of the company has taken out a large portion of its equity (usually in the form of cash), which can sometimes turn the number negative....",
      "If the asset has a useful life of over 1 year, it is capitalized (put on the Balance Sheet rather than shown as an expense on the Income Statement)...."
    ],
    "correct": 1,
    "explanation": "\"To tie the statements together, Net Income from the Income Statement flows into Shareholders' Equity on the Balance Sheet, and into the top line of the Cash Flow Statement. Changes to Balance Sheet items appear as working capital changes on the Cash Flow Statement, and investing and financing activities affect Balance Sheet items such as PP&E, Debt and Shareholders' Equity. The Cash and Shareholders' Equity items on the Balance Sheet act as \"plugs,\" with Cash flowing in from the final line on the Cash Flow Statement.\""
  },
  {
    "id": 163,
    "category": "Accounting - Basic",
    "difficulty": "de",
    "question": "If I were stranded on a desert island, only had 1 statement and I wanted to review the overall health of a company - which statement would I use and why?",
    "options": [
      "You would use the Cash Flow Statement because it gives a true picture of how much cash the company is actually generating, independent of all the non-cash expenses you might have....",
      "Generally the accounts receivable days are in the 40-50 day range, though it's higher for companies selling high-end items and it might be lower for smaller, lower transaction- value companies.",
      "Usually this happens when a company has been acquired and the acquirer re-assesses its intangible assets (such as customers, brand, and intellectual property) and finds that they are worth significantly less than they originally thought....",
      "Usually it goes into the Deferred Revenue balance on the Balance Sheet under Liabilities...."
    ],
    "correct": 0,
    "explanation": "You would use the Cash Flow Statement because it gives a true picture of how much cash the company is actually generating, independent of all the non-cash expenses you might have. And that's the #1 thing you care about when analyzing the overall financial health of any business - its cash flow."
  },
  {
    "id": 164,
    "category": "Accounting - Basic",
    "difficulty": "de",
    "question": "Let's say I could only look at 2 statements to assess a company's prospects - which 2 would I use and why?",
    "options": [
      "Not necessarily. It depends on the type of company and the specific situation - here are a few different things it could mean: 1. Some companies with subscriptions or longer-term contracts often have negative Working Capital because of high Deferred Revenue ba...",
      "Income Statement: Revenue is up by $20 and COGS is up by $10, so Gross Profit is up by $10 and Operating Income is up by $10 as well....",
      "Usually this happens when a company has been acquired and the acquirer re-assesses its intangible assets (such as customers, brand, and intellectual property) and finds that they are worth significantly less than they originally thought....",
      "You would pick the Income Statement and Balance Sheet, because you can create the Cash Flow Statement from both of those (assuming, of course that you have \"before\" and \"after\" versions of the Balance Sheet that correspond to the same period the Income Statement is tracking)."
    ],
    "correct": 3,
    "explanation": "You would pick the Income Statement and Balance Sheet, because you can create the Cash Flow Statement from both of those (assuming, of course that you have \"before\" and \"after\" versions of the Balance Sheet that correspond to the same period the Income Statement is tracking)."
  },
  {
    "id": 165,
    "category": "Accounting - Basic",
    "difficulty": "de",
    "question": "Walk me through how Depreciation going up by $10 would affect the statements.",
    "options": [
      "After a year has passed, Apple must pay interest expense and must record the depreciation....",
      "Income Statement: Operating Income would decline by $10 and assuming a 40% tax rate, Net Income would go down by $6....",
      "Income Statement: Revenue is up by $20 and COGS is up by $10, so Gross Profit is up by $10 and Operating Income is up by $10 as well....",
      "Income Statement: Revenue; Cost of Goods Sold; SG&A (Selling, General & Administrative Expenses); Operating Income; Pretax Income; Net Income...."
    ],
    "correct": 1,
    "explanation": "Income Statement: Operating Income would decline by $10 and assuming a 40% tax rate, Net Income would go down by $6. Cash Flow Statement: The Net Income at the top goes down by $6, but the $10 Depreciation is a non-cash expense that gets added back, so overall Cash Flow from Operations goes up by $4. There are no changes elsewhere, so the overall Net Change in Cash goes up by $4. Balance Sheet: Plants, Property & Equipment goes down by $10 on the Assets side because of the Depreciation, and Cash is up by $4 from the changes on the Cash Flow Statement. Overall, Assets is down by $6. Since Net Income fell by $6 as well, Shareholders' Equity on the Liabilities & Shareholders' Equity side is down by $6 and both sides of the Balance Sheet balance. Note: With this type of question I always recommend going in the order: 1. Income Statement 2. Cash Flow Statement 3. Balance Sheet This is so you can check yourself at the end and make sure the Balance Sheet balances. Remember that an Asset going up decreases your Cash Flow, whereas a Liability going up increases your Cash Flow."
  },
  {
    "id": 166,
    "category": "Accounting - Basic",
    "difficulty": "de",
    "question": "If Depreciation is a non-cash expense, why does it affect the cash balance?",
    "options": [
      "After a year has passed, Apple must pay interest expense and must record the depreciation....",
      "Three examples come to mind: 1. Web-based subscription software 2. Cell phone carriers that cell annual contracts 3. Magazine publishers that sell subscriptions Companies that agree to services in the future often collect cash upfront to ensure stable revenue...",
      "Although Depreciation is a non-cash expense, it is tax-deductible. Since taxes are a cash expense, Depreciation affects cash by reducing the amount of taxes you pay.",
      "First, on the Income Statement, the $100 write-down shows up in the Pre-Tax Income line...."
    ],
    "correct": 2,
    "explanation": "Although Depreciation is a non-cash expense, it is tax-deductible. Since taxes are a cash expense, Depreciation affects cash by reducing the amount of taxes you pay."
  },
  {
    "id": 167,
    "category": "Accounting - Basic",
    "difficulty": "de",
    "question": "Where does Depreciation usually show up on the Income Statement?",
    "options": [
      "Income Statement: Operating Income would decline by $10 and assuming a 40% tax rate, Net Income would go down by $6....",
      "This is counter-intuitive. When a liability is written down you record it as a gain on the Income Statement (with an asset write-down, it's a loss) - so Pre-Tax Income goes up by $100 due to this write-down. Assuming a 40% tax rate, Net Income is up by $60. On...",
      "It could be in a separate line item, or it could be embedded in Cost of Goods Sold or Operating Expenses - every company does it differently....",
      "No changes to the Income Statement. Cash Flow Statement - Inventory is up by $10, so Cash Flow from Operations decreases by $10...."
    ],
    "correct": 2,
    "explanation": "It could be in a separate line item, or it could be embedded in Cost of Goods Sold or Operating Expenses - every company does it differently. Note that the end result for accounting questions is the same: Depreciation always reduces Pre-Tax Income."
  },
  {
    "id": 168,
    "category": "Accounting - Basic",
    "difficulty": "de",
    "question": "What happens when Accrued Compensation goes up by $10?",
    "options": [
      "After 2 years, the value of the factories is now $80 if we go with the 10% depreciation per year assumption....",
      "For this question, confirm that the accrued compensation is now being recognized as an expense (as opposed to just changing non-accrued to accrued compensation)....",
      "In cash-based accounting, the revenue would not show up until the company charges the customer's credit card, receives authorization, and deposits the funds in its bank account - at which point it would show up as both Revenue on the Income Statement and Cash on the Balance Sheet...",
      "Technically Goodwill can increase if the company re-assesses its value and finds that it is worth more, but that is rare...."
    ],
    "correct": 1,
    "explanation": "For this question, confirm that the accrued compensation is now being recognized as an expense (as opposed to just changing non-accrued to accrued compensation). Assuming that's the case, Operating Expenses on the Income Statement go up by $10, Pre-Tax Income falls by $10, and Net Income falls by $6 (assuming a 40% tax rate). On the Cash Flow Statement, Net Income is down by $6, and Accrued Compensation will increase Cash Flow by $10, so overall Cash Flow from Operations is up by $4 and the Net Change in Cash at the bottom is up by $4. On the Balance Sheet, Cash is up by $4 as a result, so Assets are up by $4. On the Liabilities & Equity side, Accrued Compensation is a liability so Liabilities are up by $10 and Retained Earnings are down by $6 due to the Net Income, so both sides balance."
  },
  {
    "id": 169,
    "category": "Accounting - Basic",
    "difficulty": "de",
    "question": "What happens when Inventory goes up by $10, assuming you pay for it with cash?",
    "options": [
      "Usually it goes into the Deferred Revenue balance on the Balance Sheet under Liabilities....",
      "No changes to the Income Statement. On the Cash Flow Statement, Inventory is an asset so that decreases your Cash Flow from Operations - it goes down by $10, as does the Net Change in Cash at the bottom....",
      "Working Capital = Current Assets - Current Liabilities. If it's positive, it means a company can pay off its short-term liabilities with its short- term assets....",
      "Several possibilities: 1. The company is spending too much on Capital Expenditures - these are not reflected at all in EBITDA, but it could still be cash-flow negative. 2. The company has high interest expense and is no longer able to afford its debt. 3. The c..."
    ],
    "correct": 1,
    "explanation": "No changes to the Income Statement. On the Cash Flow Statement, Inventory is an asset so that decreases your Cash Flow from Operations - it goes down by $10, as does the Net Change in Cash at the bottom. On the Balance Sheet under Assets, Inventory is up by $10 but Cash is down by $10, so the changes cancel out and Assets still equals Liabilities & Shareholders' Equity."
  },
  {
    "id": 170,
    "category": "Accounting - Basic",
    "difficulty": "de",
    "question": "Why is the Income Statement not affected by changes in Inventory?",
    "options": [
      "This is a common interview mistake - incorrectly stating that Working Capital changes show up on the Income Statement....",
      "If the asset has a useful life of over 1 year, it is capitalized (put on the Balance Sheet rather than shown as an expense on the Income Statement)....",
      "\"To tie the statements together, Net Income from the Income Statement flows into Shareholders' Equity on the Balance Sheet, and into the top line of the Cash Flow Statement....",
      "It could be in a separate line item, or it could be embedded in Cost of Goods Sold or Operating Expenses - every company does it differently...."
    ],
    "correct": 0,
    "explanation": "This is a common interview mistake - incorrectly stating that Working Capital changes show up on the Income Statement. In the case of Inventory, the expense is only recorded when the goods associated with it are sold - so if it's just sitting in a warehouse, it does not count as a Cost of Good Sold or Operating Expense until the company manufactures it into a product and sells it."
  },
  {
    "id": 171,
    "category": "Accounting - Basic",
    "difficulty": "de",
    "question": "Let's say Apple is buying $100 worth of new iPod factories with debt. How are all 3 statements affected at the start of \"Year 1,\" before anything else happens?",
    "options": [
      "At the start of \"Year 1,\" before anything else has happened, there would be no changes on Apple's Income Statement (yet)....",
      "Usually it goes into the Deferred Revenue balance on the Balance Sheet under Liabilities....",
      "Generally the accounts receivable days are in the 40-50 day range, though it's higher for companies selling high-end items and it might be lower for smaller, lower transaction- value companies.",
      "Yes. It is common to see this in 2 scenarios: 1. Leveraged Buyouts with dividend recapitalizations - it means that the owner of the company has taken out a large portion of its equity (usually in the form of cash), which can sometimes turn the number negative...."
    ],
    "correct": 0,
    "explanation": "At the start of \"Year 1,\" before anything else has happened, there would be no changes on Apple's Income Statement (yet). On the Cash Flow Statement, the additional investment in factories would show up under Cash Flow from Investing as a net reduction in Cash Flow (so Cash Flow is down by $100 so far). And the additional $100 worth of debt raised would show up as an addition to Cash Flow, canceling out the investment activity. So the cash number stays the same. On the Balance Sheet, there is now an additional $100 worth of factories in the Plants, Property & Equipment line, so PP&E is up by $100 and Assets is therefore up by $100. On the other side, debt is up by $100 as well and so both sides balance."
  },
  {
    "id": 172,
    "category": "Accounting - Basic",
    "difficulty": "de",
    "question": "Now let's go out 1 year, to the start of Year 2. Assume the debt is high-yield so no principal is paid off, and assume an interest rate of 10%. Also assume the factories depreciate at a rate of 10% per year. What happens?",
    "options": [
      "Income Statement: Operating Income would decline by $10 and assuming a 40% tax rate, Net Income would go down by $6....",
      "Usually it goes into the Deferred Revenue balance on the Balance Sheet under Liabilities....",
      "After a year has passed, Apple must pay interest expense and must record the depreciation....",
      "At the start of \"Year 1,\" before anything else has happened, there would be no changes on Apple's Income Statement (yet)...."
    ],
    "correct": 2,
    "explanation": "After a year has passed, Apple must pay interest expense and must record the depreciation. Operating Income would decrease by $10 due to the 10% depreciation charge each year, and the $10 in additional Interest Expense would decrease the Pre-Tax Income by $20 altogether ($10 from the depreciation and $10 from Interest Expense). Assuming a tax rate of 40%, Net Income would fall by $12. On the Cash Flow Statement, Net Income at the top is down by $12. Depreciation is a non-cash expense, so you add it back and the end result is that Cash Flow from Operations is down by $2. That's the only change on the Cash Flow Statement, so overall Cash is down by $2. On the Balance Sheet, under Assets, Cash is down by $2 and PP&E is down by $10 due to the depreciation, so overall Assets are down by $12. On the other side, since Net Income was down by $12, Shareholders' Equity is also down by $12 and both sides balance. Remember, the debt number under Liabilities does not change since we've assumed none of the debt is actually paid back."
  },
  {
    "id": 173,
    "category": "Accounting - Basic",
    "difficulty": "de",
    "question": "At the start of Year 3, the factories all break down and the value of the equipment is written down to $0. The loan must also be paid back now. Walk me through the 3 statements.",
    "options": [
      "After 2 years, the value of the factories is now $80 if we go with the 10% depreciation per year assumption....",
      "For this question, confirm that the accrued compensation is now being recognized as an expense (as opposed to just changing non-accrued to accrued compensation)....",
      "This is counter-intuitive. When a liability is written down you record it as a gain on the Income Statement (with an asset write-down, it's a loss) - so Pre-Tax Income goes up by $100 due to this write-down. Assuming a 40% tax rate, Net Income is up by $60. On...",
      "Generally the accounts receivable days are in the 40-50 day range, though it's higher for companies selling high-end items and it might be lower for smaller, lower transaction- value companies."
    ],
    "correct": 0,
    "explanation": "After 2 years, the value of the factories is now $80 if we go with the 10% depreciation per year assumption. It is this $80 that we will write down in the 3 statements. First, on the Income Statement, the $80 write-down shows up in the Pre-Tax Income line. With a 40% tax rate, Net Income declines by $48. On the Cash Flow Statement, Net Income is down by $48 but the write-down is a non- cash expense, so we add it back - and therefore Cash Flow from Operations increases by $32. There are no changes under Cash Flow from Investing, but under Cash Flow from Financing there is a $100 charge for the loan payback - so Cash Flow from Investing falls by $100. Overall, the Net Change in Cash falls by $68. On the Balance Sheet, Cash is now down by $68 and PP&E is down by $80, so Assets have decreased by $148 altogether. On the other side, Debt is down $100 since it was paid off, and since Net Income was down by $48, Shareholders' Equity is down by $48 as well. Altogether, Liabilities & Shareholders' Equity are down by $148 and both sides balance."
  },
  {
    "id": 174,
    "category": "Accounting - Basic",
    "difficulty": "de",
    "question": "Now let's look at a different scenario and assume Apple is ordering $10 of additional iPod inventory, using cash on hand. They order the inventory, but they have not manufactured or sold anything yet - what happens to the 3 statements?",
    "options": [
      "Income Statement: Revenue; Cost of Goods Sold; SG&A (Selling, General & Administrative Expenses); Operating Income; Pretax Income; Net Income....",
      "No changes to the Income Statement. Cash Flow Statement - Inventory is up by $10, so Cash Flow from Operations decreases by $10....",
      "Yes. It is common to see this in 2 scenarios: 1. Leveraged Buyouts with dividend recapitalizations - it means that the owner of the company has taken out a large portion of its equity (usually in the form of cash), which can sometimes turn the number negative....",
      "You would use the Cash Flow Statement because it gives a true picture of how much cash the company is actually generating, independent of all the non-cash expenses you might have...."
    ],
    "correct": 1,
    "explanation": "No changes to the Income Statement. Cash Flow Statement - Inventory is up by $10, so Cash Flow from Operations decreases by $10. There are no further changes, so overall Cash is down by $10. On the Balance Sheet, Inventory is up by $10 and Cash is down by $10 so the Assets number stays the same and the Balance Sheet remains in balance."
  },
  {
    "id": 175,
    "category": "Accounting - Basic",
    "difficulty": "de",
    "question": "Now let's say they sell the iPods for revenue of $20, at a cost of $10. Walk me through the 3 statements under this scenario.",
    "options": [
      "If the asset has a useful life of over 1 year, it is capitalized (put on the Balance Sheet rather than shown as an expense on the Income Statement)....",
      "After a year has passed, Apple must pay interest expense and must record the depreciation....",
      "Income Statement: Revenue is up by $20 and COGS is up by $10, so Gross Profit is up by $10 and Operating Income is up by $10 as well....",
      "Usually it goes into the Deferred Revenue balance on the Balance Sheet under Liabilities...."
    ],
    "correct": 2,
    "explanation": "Income Statement: Revenue is up by $20 and COGS is up by $10, so Gross Profit is up by $10 and Operating Income is up by $10 as well. Assuming a 40% tax rate, Net Income is up by $6. Cash Flow Statement: Net Income at the top is up by $6 and Inventory has decreased by $10 (since we just manufactured the inventory into real iPods), which is a net addition to cash flow - so Cash Flow from Operations is up by $16 overall. These are the only changes on the Cash Flow Statement, so Net Change in Cash is up by $16. On the Balance Sheet, Cash is up by $16 and Inventory is down by $10, so Assets is up by $6 overall. On the other side, Net Income was up by $6 so Shareholders' Equity is up by $6 and both sides balance."
  },
  {
    "id": 176,
    "category": "Accounting - Basic",
    "difficulty": "de",
    "question": "Could you ever end up with negative shareholders' equity? What does it mean?",
    "options": [
      "First, on the Income Statement, the $100 write-down shows up in the Pre-Tax Income line....",
      "Yes. It is common to see this in 2 scenarios: 1. Leveraged Buyouts with dividend recapitalizations - it means that the owner of the company has taken out a large portion of its equity (usually in the form of cash), which can sometimes turn the number negative....",
      "Cash-based accounting recognizes revenue and expenses when cash is actually received or paid out; accrual accounting recognizes revenue when collection is reasonably certain (i.e. after a customer has ordered the product) and recognizes expenses when they are incurred rather than...",
      "This is a common interview mistake - incorrectly stating that Working Capital changes show up on the Income Statement...."
    ],
    "correct": 1,
    "explanation": "Yes. It is common to see this in 2 scenarios: 1. Leveraged Buyouts with dividend recapitalizations - it means that the owner of the company has taken out a large portion of its equity (usually in the form of cash), which can sometimes turn the number negative. 2. It can also happen if the company has been losing money consistently and therefore has a declining Retained Earnings balance, which is a portion of Shareholders' Equity. It doesn't \"mean\" anything in particular, but it can be a cause for concern and possibly demonstrate that the company is struggling (in the second scenario). Note: Shareholders' equity never turns negative immediately after an LBO - it would only happen following a dividend recap or continued net losses."
  },
  {
    "id": 177,
    "category": "Accounting - Basic",
    "difficulty": "de",
    "question": "What is working capital? How is it used?",
    "options": [
      "\"The 3 major financial statements are the Income Statement, Balance Sheet and Cash Flow Statement....",
      "Income Statement: Revenue; Cost of Goods Sold; SG&A (Selling, General & Administrative Expenses); Operating Income; Pretax Income; Net Income....",
      "No changes to the Income Statement. Cash Flow Statement - Inventory is up by $10, so Cash Flow from Operations decreases by $10....",
      "Working Capital = Current Assets - Current Liabilities. If it's positive, it means a company can pay off its short-term liabilities with its short- term assets...."
    ],
    "correct": 3,
    "explanation": "Working Capital = Current Assets - Current Liabilities. If it's positive, it means a company can pay off its short-term liabilities with its short- term assets. It is often presented as a financial metric and its magnitude and sign (negative or positive) tells you whether or not the company is \"sound.\" Bankers look at Operating Working Capital more commonly in models, and that is defined as (Current Assets - Cash & Cash Equivalents) - (Current Liabilities - Debt)."
  },
  {
    "id": 178,
    "category": "Accounting - Basic",
    "difficulty": "de",
    "question": "What does negative Working Capital mean? Is that a bad sign?",
    "options": [
      "Not necessarily. It depends on the type of company and the specific situation - here are a few different things it could mean: 1. Some companies with subscriptions or longer-term contracts often have negative Working Capital because of high Deferred Revenue ba...",
      "After a year has passed, Apple must pay interest expense and must record the depreciation....",
      "If the asset has a useful life of over 1 year, it is capitalized (put on the Balance Sheet rather than shown as an expense on the Income Statement)....",
      "For this question, confirm that the accrued compensation is now being recognized as an expense (as opposed to just changing non-accrued to accrued compensation)...."
    ],
    "correct": 0,
    "explanation": "Not necessarily. It depends on the type of company and the specific situation - here are a few different things it could mean: 1. Some companies with subscriptions or longer-term contracts often have negative Working Capital because of high Deferred Revenue balances. 2. Retail and restaurant companies like Amazon, Wal-Mart, and McDonald's often have negative Working Capital because customers pay upfront - so they can use the cash generated to pay off their Accounts Payable rather than keeping a large cash balance on-hand. This can be a sign of business efficiency. 3. In other cases, negative Working Capital could point to financial trouble or possible bankruptcy (for example, when customers don't pay quickly and upfront and the company is carrying a high debt balance)."
  },
  {
    "id": 179,
    "category": "Accounting - Basic",
    "difficulty": "de",
    "question": "Recently, banks have been writing down their assets and taking huge quarterly losses. Walk me through what happens on the 3 statements when there's a write- down of $100.",
    "options": [
      "Income Statement: Revenue is up by $20 and COGS is up by $10, so Gross Profit is up by $10 and Operating Income is up by $10 as well....",
      "First, on the Income Statement, the $100 write-down shows up in the Pre-Tax Income line....",
      "In cash-based accounting, the revenue would not show up until the company charges the customer's credit card, receives authorization, and deposits the funds in its bank account - at which point it would show up as both Revenue on the Income Statement and Cash on the Balance Sheet...",
      "If the asset has a useful life of over 1 year, it is capitalized (put on the Balance Sheet rather than shown as an expense on the Income Statement)...."
    ],
    "correct": 1,
    "explanation": "First, on the Income Statement, the $100 write-down shows up in the Pre-Tax Income line. With a 40% tax rate, Net Income declines by $60. On the Cash Flow Statement, Net Income is down by $60 but the write-down is a non- cash expense, so we add it back - and therefore Cash Flow from Operations increases by $40. Overall, the Net Change in Cash rises by $40. On the Balance Sheet, Cash is now up by $40 and an asset is down by $100 (it's not clear which asset since the question never stated the specific asset to write-down). Overall, the Assets side is down by $60. On the other side, since Net Income was down by $60, Shareholders' Equity is also down by $60 - and both sides balance."
  },
  {
    "id": 180,
    "category": "Accounting - Basic",
    "difficulty": "de",
    "question": "Walk me through a $100 \"bailout\" of a company and how it affects the 3 statements.",
    "options": [
      "First, confirm what type of \"bailout\" this is - Debt? Equity?...",
      "Cash-based accounting recognizes revenue and expenses when cash is actually received or paid out; accrual accounting recognizes revenue when collection is reasonably certain (i.e. after a customer has ordered the product) and recognizes expenses when they are incurred rather than...",
      "For this question, confirm that the accrued compensation is now being recognized as an expense (as opposed to just changing non-accrued to accrued compensation)....",
      "Generally the accounts receivable days are in the 40-50 day range, though it's higher for companies selling high-end items and it might be lower for smaller, lower transaction- value companies."
    ],
    "correct": 0,
    "explanation": "First, confirm what type of \"bailout\" this is - Debt? Equity? A combination? The most common scenario here is an equity investment from the government, so here's what happens: No changes to the Income Statement. On the Cash Flow Statement, Cash Flow from Financing goes up by $100 to reflect the government's investment, so the Net Change in Cash is up by $100. On the Balance Sheet, Cash is up by $100 so Assets are up by $100; on the other side, Shareholders' Equity would go up by $100 to make it balance."
  },
  {
    "id": 181,
    "category": "Accounting - Basic",
    "difficulty": "de",
    "question": "Walk me through a $100 write-down of debt - as in OWED debt, a liability - on a company's balance sheet and how it affects the 3 statements.",
    "options": [
      "This is counter-intuitive. When a liability is written down you record it as a gain on the Income Statement (with an asset write-down, it's a loss) - so Pre-Tax Income goes up by $100 due to this write-down. Assuming a 40% tax rate, Net Income is up by $60. On...",
      "Usually this happens when a company has been acquired and the acquirer re-assesses its intangible assets (such as customers, brand, and intellectual property) and finds that they are worth significantly less than they originally thought....",
      "\"To tie the statements together, Net Income from the Income Statement flows into Shareholders' Equity on the Balance Sheet, and into the top line of the Cash Flow Statement....",
      "Not necessarily. It depends on the type of company and the specific situation - here are a few different things it could mean: 1. Some companies with subscriptions or longer-term contracts often have negative Working Capital because of high Deferred Revenue ba..."
    ],
    "correct": 0,
    "explanation": "This is counter-intuitive. When a liability is written down you record it as a gain on the Income Statement (with an asset write-down, it's a loss) - so Pre-Tax Income goes up by $100 due to this write-down. Assuming a 40% tax rate, Net Income is up by $60. On the Cash Flow Statement, Net Income is up by $60, but we need to subtract that debt write-down - so Cash Flow from Operations is down by $40, and Net Change in Cash is down by $40. On the Balance Sheet, Cash is down by $40 so Assets are down by $40. On the other side, Debt is down by $100 but Shareholders' Equity is up by $60 because the Net Income was up by $60 - so Liabilities & Shareholders' Equity is down by $40 and it balances. If this seems strange to you, you're not alone - see this Forbes article for more on why writing down debt actually benefits companies accounting-wise: http://www.forbes.com/2009/07/31/fair-value-accounting-markets-equities-fasb.html"
  },
  {
    "id": 182,
    "category": "Accounting - Basic",
    "difficulty": "de",
    "question": "When would a company collect cash from a customer and not record it as revenue?",
    "options": [
      "After 2 years, the value of the factories is now $80 if we go with the 10% depreciation per year assumption....",
      "First, confirm what type of \"bailout\" this is - Debt? Equity?...",
      "Three examples come to mind: 1. Web-based subscription software 2. Cell phone carriers that cell annual contracts 3. Magazine publishers that sell subscriptions Companies that agree to services in the future often collect cash upfront to ensure stable revenue...",
      "In cash-based accounting, the revenue would not show up until the company charges the customer's credit card, receives authorization, and deposits the funds in its bank account - at which point it would show up as both Revenue on the Income Statement and Cash on the Balance Sheet..."
    ],
    "correct": 2,
    "explanation": "Three examples come to mind: 1. Web-based subscription software 2. Cell phone carriers that cell annual contracts 3. Magazine publishers that sell subscriptions Companies that agree to services in the future often collect cash upfront to ensure stable revenue - this makes investors happy as well since they can better predict a company's performance. Per the rules of GAAP (Generally Accepted Accounting Principles), you only record revenue when you actually perform the services - so the company would not record everything as revenue right away."
  },
  {
    "id": 183,
    "category": "Accounting - Basic",
    "difficulty": "de",
    "question": "If cash collected is not recorded as revenue, what happens to it?",
    "options": [
      "Usually it goes into the Deferred Revenue balance on the Balance Sheet under Liabilities....",
      "This is a common interview mistake - incorrectly stating that Working Capital changes show up on the Income Statement....",
      "Usually this happens when a company has been acquired and the acquirer re-assesses its intangible assets (such as customers, brand, and intellectual property) and finds that they are worth significantly less than they originally thought....",
      "Although Depreciation is a non-cash expense, it is tax-deductible. Since taxes are a cash expense, Depreciation affects cash by reducing the amount of taxes you pay."
    ],
    "correct": 0,
    "explanation": "Usually it goes into the Deferred Revenue balance on the Balance Sheet under Liabilities. Over time, as the services are performed, the Deferred Revenue balance \"turns into\" real revenue on the Income Statement."
  },
  {
    "id": 184,
    "category": "Accounting - Basic",
    "difficulty": "de",
    "question": "What's the difference between accounts receivable and deferred revenue?",
    "options": [
      "Usually it goes into the Deferred Revenue balance on the Balance Sheet under Liabilities....",
      "Accounts receivable has not yet been collected in cash from customers, whereas deferred revenue has been....",
      "This is a common interview mistake - incorrectly stating that Working Capital changes show up on the Income Statement....",
      "You would use the Cash Flow Statement because it gives a true picture of how much cash the company is actually generating, independent of all the non-cash expenses you might have...."
    ],
    "correct": 1,
    "explanation": "Accounts receivable has not yet been collected in cash from customers, whereas deferred revenue has been. Accounts receivable represents how much revenue the company is waiting on, whereas deferred revenue represents how much it is waiting to record as revenue."
  },
  {
    "id": 185,
    "category": "Accounting - Basic",
    "difficulty": "de",
    "question": "How long does it usually take for a company to collect its accounts receivable balance?",
    "options": [
      "Generally the accounts receivable days are in the 40-50 day range, though it's higher for companies selling high-end items and it might be lower for smaller, lower transaction- value companies.",
      "In cash-based accounting, the revenue would not show up until the company charges the customer's credit card, receives authorization, and deposits the funds in its bank account - at which point it would show up as both Revenue on the Income Statement and Cash on the Balance Sheet...",
      "\"The 3 major financial statements are the Income Statement, Balance Sheet and Cash Flow Statement....",
      "Not necessarily. It depends on the type of company and the specific situation - here are a few different things it could mean: 1. Some companies with subscriptions or longer-term contracts often have negative Working Capital because of high Deferred Revenue ba..."
    ],
    "correct": 0,
    "explanation": "Generally the accounts receivable days are in the 40-50 day range, though it's higher for companies selling high-end items and it might be lower for smaller, lower transaction- value companies."
  },
  {
    "id": 186,
    "category": "Accounting - Basic",
    "difficulty": "de",
    "question": "What's the difference between cash-based and accrual accounting?",
    "options": [
      "Accounts receivable has not yet been collected in cash from customers, whereas deferred revenue has been....",
      "It could be in a separate line item, or it could be embedded in Cost of Goods Sold or Operating Expenses - every company does it differently....",
      "Cash-based accounting recognizes revenue and expenses when cash is actually received or paid out; accrual accounting recognizes revenue when collection is reasonably certain (i.e. after a customer has ordered the product) and recognizes expenses when they are incurred rather than...",
      "\"The 3 major financial statements are the Income Statement, Balance Sheet and Cash Flow Statement...."
    ],
    "correct": 2,
    "explanation": "Cash-based accounting recognizes revenue and expenses when cash is actually received or paid out; accrual accounting recognizes revenue when collection is reasonably certain (i.e. after a customer has ordered the product) and recognizes expenses when they are incurred rather than when they are paid out in cash. Most large companies use accrual accounting because paying with credit cards and lines of credit is so prevalent these days; very small businesses may use cash-based accounting to simplify their financial statements."
  },
  {
    "id": 187,
    "category": "Accounting - Basic",
    "difficulty": "de",
    "question": "Let's say a customer pays for a TV with a credit card. What would this look like under cash-based vs. accrual accounting?",
    "options": [
      "Cash-based accounting recognizes revenue and expenses when cash is actually received or paid out; accrual accounting recognizes revenue when collection is reasonably certain (i.e. after a customer has ordered the product) and recognizes expenses when they are incurred rather than...",
      "Working Capital = Current Assets - Current Liabilities. If it's positive, it means a company can pay off its short-term liabilities with its short- term assets....",
      "You would pick the Income Statement and Balance Sheet, because you can create the Cash Flow Statement from both of those (assuming, of course that you have \"before\" and \"after\" versions of the Balance Sheet that correspond to the same period the Income Statement is tracking).",
      "In cash-based accounting, the revenue would not show up until the company charges the customer's credit card, receives authorization, and deposits the funds in its bank account - at which point it would show up as both Revenue on the Income Statement and Cash on the Balance Sheet..."
    ],
    "correct": 3,
    "explanation": "In cash-based accounting, the revenue would not show up until the company charges the customer's credit card, receives authorization, and deposits the funds in its bank account - at which point it would show up as both Revenue on the Income Statement and Cash on the Balance Sheet. In accrual accounting, it would show up as Revenue right away but instead of appearing in Cash on the Balance Sheet, it would go into Accounts Receivable at first. Then, once the cash is actually deposited in the company's bank account, it would \"turn into\" Cash."
  },
  {
    "id": 188,
    "category": "Accounting - Basic",
    "difficulty": "de",
    "question": "How do you decide when to capitalize rather than expense a purchase?",
    "options": [
      "Usually it goes into the Deferred Revenue balance on the Balance Sheet under Liabilities....",
      "After a year has passed, Apple must pay interest expense and must record the depreciation....",
      "If the asset has a useful life of over 1 year, it is capitalized (put on the Balance Sheet rather than shown as an expense on the Income Statement)....",
      "At the start of \"Year 1,\" before anything else has happened, there would be no changes on Apple's Income Statement (yet)...."
    ],
    "correct": 2,
    "explanation": "If the asset has a useful life of over 1 year, it is capitalized (put on the Balance Sheet rather than shown as an expense on the Income Statement). Then it is depreciated (tangible assets) or amortized (intangible assets) over a certain number of years. Purchases like factories, equipment and land all last longer than a year and therefore show up on the Balance Sheet. Employee salaries and the cost of manufacturing products (COGS) only cover a short period of operations and therefore show up on the Income Statement as normal expenses instead."
  },
  {
    "id": 189,
    "category": "Accounting - Basic",
    "difficulty": "de",
    "question": "Why do companies report both GAAP and non-GAAP (or \"Pro Forma\") earnings?",
    "options": [
      "These days, many companies have \"non-cash\" charges such as Amortization of Intangibles, Stock-Based Compensation, and Deferred Revenue Write-down in their Income Statements....",
      "Working Capital = Current Assets - Current Liabilities. If it's positive, it means a company can pay off its short-term liabilities with its short- term assets....",
      "You would pick the Income Statement and Balance Sheet, because you can create the Cash Flow Statement from both of those (assuming, of course that you have \"before\" and \"after\" versions of the Balance Sheet that correspond to the same period the Income Statement is tracking).",
      "Usually this happens when a company has been acquired and the acquirer re-assesses its intangible assets (such as customers, brand, and intellectual property) and finds that they are worth significantly less than they originally thought...."
    ],
    "correct": 0,
    "explanation": "These days, many companies have \"non-cash\" charges such as Amortization of Intangibles, Stock-Based Compensation, and Deferred Revenue Write-down in their Income Statements. As a result, some argue that Income Statements under GAAP no longer reflect how profitable most companies truly are. Non-GAAP earnings are almost always higher because these expenses are excluded."
  },
  {
    "id": 190,
    "category": "Accounting - Basic",
    "difficulty": "de",
    "question": "A company has had positive EBITDA for the past 10 years, but it recently went bankrupt. How could this happen?",
    "options": [
      "This is counter-intuitive. When a liability is written down you record it as a gain on the Income Statement (with an asset write-down, it's a loss) - so Pre-Tax Income goes up by $100 due to this write-down. Assuming a 40% tax rate, Net Income is up by $60. On...",
      "Yes. It is common to see this in 2 scenarios: 1. Leveraged Buyouts with dividend recapitalizations - it means that the owner of the company has taken out a large portion of its equity (usually in the form of cash), which can sometimes turn the number negative....",
      "Not necessarily. It depends on the type of company and the specific situation - here are a few different things it could mean: 1. Some companies with subscriptions or longer-term contracts often have negative Working Capital because of high Deferred Revenue ba...",
      "Several possibilities: 1. The company is spending too much on Capital Expenditures - these are not reflected at all in EBITDA, but it could still be cash-flow negative. 2. The company has high interest expense and is no longer able to afford its debt. 3. The c..."
    ],
    "correct": 3,
    "explanation": "Several possibilities: 1. The company is spending too much on Capital Expenditures - these are not reflected at all in EBITDA, but it could still be cash-flow negative. 2. The company has high interest expense and is no longer able to afford its debt. 3. The company's debt all matures on one date and it is unable to refinance it due to a \"credit crunch\" - and it runs out of cash completely when paying back the debt. 4. It has significant one-time charges (from litigation, for example) and those are high enough to bankrupt the company. Remember, EBITDA excludes investment in (and depreciation of) long-term assets, interest and one-time charges - and all of these could end up bankrupting the company."
  },
  {
    "id": 191,
    "category": "Accounting - Basic",
    "difficulty": "de",
    "question": "Normally Goodwill remains constant on the Balance Sheet - why would it be impaired and what does Goodwill Impairment mean?",
    "options": [
      "Income Statement: Revenue is up by $20 and COGS is up by $10, so Gross Profit is up by $10 and Operating Income is up by $10 as well....",
      "First, confirm what type of \"bailout\" this is - Debt? Equity?...",
      "Usually this happens when a company has been acquired and the acquirer re-assesses its intangible assets (such as customers, brand, and intellectual property) and finds that they are worth significantly less than they originally thought....",
      "No changes to the Income Statement. Cash Flow Statement - Inventory is up by $10, so Cash Flow from Operations decreases by $10...."
    ],
    "correct": 2,
    "explanation": "Usually this happens when a company has been acquired and the acquirer re-assesses its intangible assets (such as customers, brand, and intellectual property) and finds that they are worth significantly less than they originally thought. It often happens in acquisitions where the buyer \"overpaid\" for the seller and can result in a large net loss on the Income Statement (see: eBay/Skype). It can also happen when a company discontinues part of its operations and must impair the associated goodwill."
  },
  {
    "id": 192,
    "category": "Accounting - Basic",
    "difficulty": "de",
    "question": "Under what circumstances would Goodwill increase?",
    "options": [
      "These days, many companies have \"non-cash\" charges such as Amortization of Intangibles, Stock-Based Compensation, and Deferred Revenue Write-down in their Income Statements....",
      "Three examples come to mind: 1. Web-based subscription software 2. Cell phone carriers that cell annual contracts 3. Magazine publishers that sell subscriptions Companies that agree to services in the future often collect cash upfront to ensure stable revenue...",
      "Technically Goodwill can increase if the company re-assesses its value and finds that it is worth more, but that is rare....",
      "For this question, confirm that the accrued compensation is now being recognized as an expense (as opposed to just changing non-accrued to accrued compensation)...."
    ],
    "correct": 2,
    "explanation": "Technically Goodwill can increase if the company re-assesses its value and finds that it is worth more, but that is rare. What usually happens is 1 of 2 scenarios: 1. The company gets acquired or bought out and Goodwill changes as a result, since it's an accounting \"plug\" for the purchase price in an acquisition. 2. The company acquires another company and pays more than what its assets are worth - this is then reflected in the Goodwill number."
  },
  {
    "id": 193,
    "category": "Accounting - Advanced",
    "difficulty": "kho",
    "question": "How is GAAP accounting different from tax accounting?",
    "options": [
      "There are 2 ways you could do this: a bottoms-up build and a tops-down build. • Bottoms-Up: Start with individual products / customers, estimate the average sale value or customer value, and then the growth rate in sales and sale values to tie everything together. • Tops-Down: St...",
      "1. GAAP is accrual-based but tax is cash-based. 2. GAAP uses straight-line depreciation or a few other methods whereas tax accounting is different (accelerated depreciation). 3. GAAP is more complex and more accurately tracks assets/liabilities whereas tax acc...",
      "To do a true bottoms-up build, you start with each different department of a company, the # of employees in each, the average salary, bonuses, and benefits, and then make assumptions on those going forward....",
      "Normally you make very simple assumptions here and assume these are percentages of revenue, operating expenses, or cost of goods sold...."
    ],
    "correct": 1,
    "explanation": "1. GAAP is accrual-based but tax is cash-based. 2. GAAP uses straight-line depreciation or a few other methods whereas tax accounting is different (accelerated depreciation). 3. GAAP is more complex and more accurately tracks assets/liabilities whereas tax accounting is only concerned with revenue/expenses in the current period and what income tax you owe."
  },
  {
    "id": 194,
    "category": "Accounting - Advanced",
    "difficulty": "kho",
    "question": "What are deferred tax assets/liabilities and how do they arise?",
    "options": [
      "This statement shows everything we went through above - the major items that comprise Shareholders' Equity, and how we arrive at each of them using the numbers elsewhere in the statement....",
      "Use estimates. For the revenue if you don't have enough information to look at separate product lines or divisions of the company, you can just assume a simple growth rate into future years. For the expenses, if you don't have employee-level information then y...",
      "Retained Earnings = Old Retained Earnings Balance + Net Income - Dividends Issued If you're calculating Retained Earnings for the current year, take last year's Retained Earnings number, add this year's Net Income, and subtract however much the company paid out in dividends.",
      "They arise because of temporary differences between what a company can deduct for cash tax purposes vs. what they can deduct for book tax purposes...."
    ],
    "correct": 3,
    "explanation": "They arise because of temporary differences between what a company can deduct for cash tax purposes vs. what they can deduct for book tax purposes. Deferred Tax Liabilities arise when you have a tax expense on the Income Statement but haven't actually paid that tax in cold, hard cash yet; Deferred Tax Assets arise when you pay taxes in cash but haven't expensed them on the Income Statement yet. The most common way they occur is with asset write-ups and write-downs in M&A deals - an asset write-up will produce a deferred tax liability while a write-down will produce a deferred tax asset (see the Merger Model section for more on this)."
  },
  {
    "id": 195,
    "category": "Accounting - Advanced",
    "difficulty": "kho",
    "question": "Walk me through how you create a revenue model for a company.",
    "options": [
      "There are 2 ways you could do this: a bottoms-up build and a tops-down build. • Bottoms-Up: Start with individual products / customers, estimate the average sale value or customer value, and then the growth rate in sales and sale values to tie everything together. • Tops-Down: St...",
      "To do a true bottoms-up build, you start with each different department of a company, the # of employees in each, the average salary, bonuses, and benefits, and then make assumptions on those going forward....",
      "• Restructuring Charges • Goodwill Impairment • Asset Write-Downs • Bad Debt Expenses • Legal Expenses • Disaster Expenses • Change in Accounting Procedures Note that to be an \"add-back\" or \"non-recurring\" charge for EBITDA / EBIT purposes, it needs to affect Operating Income on...",
      "Use estimates. For the revenue if you don't have enough information to look at separate product lines or divisions of the company, you can just assume a simple growth rate into future years. For the expenses, if you don't have employee-level information then y..."
    ],
    "correct": 0,
    "explanation": "There are 2 ways you could do this: a bottoms-up build and a tops-down build. • Bottoms-Up: Start with individual products / customers, estimate the average sale value or customer value, and then the growth rate in sales and sale values to tie everything together. • Tops-Down: Start with \"big-picture\" metrics like overall market size, then estimate the company's market share and how that will change in coming years, and multiply to get to their revenue. Of these two methods, bottoms-up is more common and is taken more seriously because estimating \"big-picture\" numbers is almost impossible."
  },
  {
    "id": 196,
    "category": "Accounting - Advanced",
    "difficulty": "kho",
    "question": "Walk me through how you create an expense model for a company.",
    "options": [
      "To do a true bottoms-up build, you start with each different department of a company, the # of employees in each, the average salary, bonuses, and benefits, and then make assumptions on those going forward....",
      "• Restructuring Charges • Goodwill Impairment • Asset Write-Downs • Bad Debt Expenses • Legal Expenses • Disaster Expenses • Change in Accounting Procedures Note that to be an \"add-back\" or \"non-recurring\" charge for EBITDA / EBIT purposes, it needs to affect Operating Income on...",
      "Operating leases are used for short-term leasing of equipment and property, and do not involve ownership of anything....",
      "Use estimates. For the revenue if you don't have enough information to look at separate product lines or divisions of the company, you can just assume a simple growth rate into future years. For the expenses, if you don't have employee-level information then y..."
    ],
    "correct": 0,
    "explanation": "To do a true bottoms-up build, you start with each different department of a company, the # of employees in each, the average salary, bonuses, and benefits, and then make assumptions on those going forward. Usually you assume that the number of employees is tied to revenue, and then you assume growth rates for salary, bonuses, benefits, and other metrics. Cost of Goods Sold should be tied directly to Revenue and each \"unit\" produced should incur an expense. Other items such as rent, Capital Expenditures, and miscellaneous expenses are either linked to the company's internal plans for building expansion plans (if they have them), or to Revenue for a more simple model."
  },
  {
    "id": 197,
    "category": "Accounting - Advanced",
    "difficulty": "kho",
    "question": "Let's say we're trying to create these models but don't have enough information or the company doesn't tell us enough in its filings - what do we do?",
    "options": [
      "They arise because of temporary differences between what a company can deduct for cash tax purposes vs. what they can deduct for book tax purposes....",
      "To do a true bottoms-up build, you start with each different department of a company, the # of employees in each, the average salary, bonuses, and benefits, and then make assumptions on those going forward....",
      "APIC = Old APIC + Stock-Based Compensation + Stock Created by Option Exercises If you're calculating it, take the balance from last year, add this year's stock-based compensation number, and then add in however much new stock was created by employees exercising options this year.",
      "Use estimates. For the revenue if you don't have enough information to look at separate product lines or divisions of the company, you can just assume a simple growth rate into future years. For the expenses, if you don't have employee-level information then y..."
    ],
    "correct": 3,
    "explanation": "Use estimates. For the revenue if you don't have enough information to look at separate product lines or divisions of the company, you can just assume a simple growth rate into future years. For the expenses, if you don't have employee-level information then you can just assume that major expenses like SG&A are a percent of revenue and carry that assumption forward."
  },
  {
    "id": 198,
    "category": "Accounting - Advanced",
    "difficulty": "kho",
    "question": "Walk me through the major items in Shareholders' Equity.",
    "options": [
      "Operating leases are used for short-term leasing of equipment and property, and do not involve ownership of anything....",
      "Common items include: • Common Stock - Simply the par value of however much stock the company has issued. • Retained Earnings - How much of the company's Net Income it has \"saved up\" over time. • Additional Paid in Capital - This keeps track of how much stock-based compensation h...",
      "Retained Earnings = Old Retained Earnings Balance + Net Income - Dividends Issued If you're calculating Retained Earnings for the current year, take last year's Retained Earnings number, add this year's Net Income, and subtract however much the company paid out in dividends.",
      "APIC = Old APIC + Stock-Based Compensation + Stock Created by Option Exercises If you're calculating it, take the balance from last year, add this year's stock-based compensation number, and then add in however much new stock was created by employees exercising options this year."
    ],
    "correct": 1,
    "explanation": "Common items include: • Common Stock - Simply the par value of however much stock the company has issued. • Retained Earnings - How much of the company's Net Income it has \"saved up\" over time. • Additional Paid in Capital - This keeps track of how much stock-based compensation has been issued and how much new stock employees exercising options have created. It also includes how much over par value a company raises in an IPO or other equity offering. • Treasury Stock - The dollar amount of shares that the company has bought back. • Accumulated Other Comprehensive Income - This is a \"catch-all\" that includes other items that don't fit anywhere else, like the effect of foreign currency exchange rates changing."
  },
  {
    "id": 199,
    "category": "Accounting - Advanced",
    "difficulty": "kho",
    "question": "Walk me through what flows into Retained Earnings.",
    "options": [
      "• Restructuring Charges • Goodwill Impairment • Asset Write-Downs • Bad Debt Expenses • Legal Expenses • Disaster Expenses • Change in Accounting Procedures Note that to be an \"add-back\" or \"non-recurring\" charge for EBITDA / EBIT purposes, it needs to affect Operating Income on...",
      "Retained Earnings = Old Retained Earnings Balance + Net Income - Dividends Issued If you're calculating Retained Earnings for the current year, take last year's Retained Earnings number, add this year's Net Income, and subtract however much the company paid out in dividends.",
      "Operating leases are used for short-term leasing of equipment and property, and do not involve ownership of anything....",
      "This statement shows everything we went through above - the major items that comprise Shareholders' Equity, and how we arrive at each of them using the numbers elsewhere in the statement...."
    ],
    "correct": 1,
    "explanation": "Retained Earnings = Old Retained Earnings Balance + Net Income - Dividends Issued If you're calculating Retained Earnings for the current year, take last year's Retained Earnings number, add this year's Net Income, and subtract however much the company paid out in dividends."
  },
  {
    "id": 200,
    "category": "Accounting - Advanced",
    "difficulty": "kho",
    "question": "Walk me through what flows into Additional Paid-In Capital (APIC).",
    "options": [
      "Operating leases are used for short-term leasing of equipment and property, and do not involve ownership of anything....",
      "APIC = Old APIC + Stock-Based Compensation + Stock Created by Option Exercises If you're calculating it, take the balance from last year, add this year's stock-based compensation number, and then add in however much new stock was created by employees exercising options this year.",
      "The simple way: project each one as a % of revenue or previous PP&E balance. The more complex way: create a PP&E schedule that splits out different assets by their useful lives, assumes straight-line depreciation over each asset's useful life, and then assumes capital expenditure...",
      "• Restructuring Charges • Goodwill Impairment • Asset Write-Downs • Bad Debt Expenses • Legal Expenses • Disaster Expenses • Change in Accounting Procedures Note that to be an \"add-back\" or \"non-recurring\" charge for EBITDA / EBIT purposes, it needs to affect Operating Income on..."
    ],
    "correct": 1,
    "explanation": "APIC = Old APIC + Stock-Based Compensation + Stock Created by Option Exercises If you're calculating it, take the balance from last year, add this year's stock-based compensation number, and then add in however much new stock was created by employees exercising options this year."
  },
  {
    "id": 201,
    "category": "Accounting - Advanced",
    "difficulty": "kho",
    "question": "What is the Statement of Shareholders' Equity and why do we use it?",
    "options": [
      "This statement shows everything we went through above - the major items that comprise Shareholders' Equity, and how we arrive at each of them using the numbers elsewhere in the statement....",
      "To do a true bottoms-up build, you start with each different department of a company, the # of employees in each, the average salary, bonuses, and benefits, and then make assumptions on those going forward....",
      "This happens if D&A is embedded in other Income Statement line items. When this happens, you need to use the Cash Flow Statement number to arrive at EBITDA because otherwise you're undercounting D&A.",
      "There are 2 ways you could do this: a bottoms-up build and a tops-down build. • Bottoms-Up: Start with individual products / customers, estimate the average sale value or customer value, and then the growth rate in sales and sale values to tie everything together. • Tops-Down: St..."
    ],
    "correct": 0,
    "explanation": "This statement shows everything we went through above - the major items that comprise Shareholders' Equity, and how we arrive at each of them using the numbers elsewhere in the statement. You don't use it too much, but it can be helpful for analyzing companies with unusual stock-based compensation and stock option situations."
  },
  {
    "id": 202,
    "category": "Accounting - Advanced",
    "difficulty": "kho",
    "question": "What are examples of non-recurring charges we need to add back to a company's EBIT / EBITDA when looking at its financial statements?",
    "options": [
      "• Restructuring Charges • Goodwill Impairment • Asset Write-Downs • Bad Debt Expenses • Legal Expenses • Disaster Expenses • Change in Accounting Procedures Note that to be an \"add-back\" or \"non-recurring\" charge for EBITDA / EBIT purposes, it needs to affect Operating Income on...",
      "This statement shows everything we went through above - the major items that comprise Shareholders' Equity, and how we arrive at each of them using the numbers elsewhere in the statement....",
      "This happens if D&A is embedded in other Income Statement line items. When this happens, you need to use the Cash Flow Statement number to arrive at EBITDA because otherwise you're undercounting D&A.",
      "The \"quick and dirty\" way to do this: reduce the Taxable Income by the portion of the NOLs that you can use each year, apply the same tax rate, and then subtract that new Tax number from your old Pretax Income number (which should stay the same)...."
    ],
    "correct": 0,
    "explanation": "• Restructuring Charges • Goodwill Impairment • Asset Write-Downs • Bad Debt Expenses • Legal Expenses • Disaster Expenses • Change in Accounting Procedures Note that to be an \"add-back\" or \"non-recurring\" charge for EBITDA / EBIT purposes, it needs to affect Operating Income on the Income Statement. So if you have one of these charges \"below the line\" then you do not add it back for the EBITDA / EBIT calculation. Also note that you do add back Depreciation, Amortization, and sometimes Stock-Based Compensation for EBITDA / EBIT, but that these are not \"non-recurring charges\" because all companies have them every year - these are just non-cash charges."
  },
  {
    "id": 203,
    "category": "Accounting - Advanced",
    "difficulty": "kho",
    "question": "How do you project Balance Sheet items like Accounts Receivable and Accrued Expenses in a 3-statement model?",
    "options": [
      "This statement shows everything we went through above - the major items that comprise Shareholders' Equity, and how we arrive at each of them using the numbers elsewhere in the statement....",
      "Normally you make very simple assumptions here and assume these are percentages of revenue, operating expenses, or cost of goods sold....",
      "There are 2 ways you could do this: a bottoms-up build and a tops-down build. • Bottoms-Up: Start with individual products / customers, estimate the average sale value or customer value, and then the growth rate in sales and sale values to tie everything together. • Tops-Down: St...",
      "1. GAAP is accrual-based but tax is cash-based. 2. GAAP uses straight-line depreciation or a few other methods whereas tax accounting is different (accelerated depreciation). 3. GAAP is more complex and more accurately tracks assets/liabilities whereas tax acc..."
    ],
    "correct": 1,
    "explanation": "Normally you make very simple assumptions here and assume these are percentages of revenue, operating expenses, or cost of goods sold. Examples: • Accounts Receivable: % of revenue. • Deferred Revenue: % of revenue. • Accounts Payable: % of COGS. • Accrued Expenses: % of operating expenses or SG&A. Then you either carry the same percentages across in future years or assume slight changes depending on the company."
  },
  {
    "id": 204,
    "category": "Accounting - Advanced",
    "difficulty": "kho",
    "question": "How should you project Depreciation & Capital Expenditures?",
    "options": [
      "This happens if D&A is embedded in other Income Statement line items. When this happens, you need to use the Cash Flow Statement number to arrive at EBITDA because otherwise you're undercounting D&A.",
      "Use estimates. For the revenue if you don't have enough information to look at separate product lines or divisions of the company, you can just assume a simple growth rate into future years. For the expenses, if you don't have employee-level information then y...",
      "The simple way: project each one as a % of revenue or previous PP&E balance. The more complex way: create a PP&E schedule that splits out different assets by their useful lives, assumes straight-line depreciation over each asset's useful life, and then assumes capital expenditure...",
      "They arise because of temporary differences between what a company can deduct for cash tax purposes vs. what they can deduct for book tax purposes...."
    ],
    "correct": 2,
    "explanation": "The simple way: project each one as a % of revenue or previous PP&E balance. The more complex way: create a PP&E schedule that splits out different assets by their useful lives, assumes straight-line depreciation over each asset's useful life, and then assumes capital expenditures based on what the company has invested historically."
  },
  {
    "id": 205,
    "category": "Accounting - Advanced",
    "difficulty": "kho",
    "question": "How do Net Operating Losses (NOLs) affect a company's 3 statements?",
    "options": [
      "Common items include: • Common Stock - Simply the par value of however much stock the company has issued. • Retained Earnings - How much of the company's Net Income it has \"saved up\" over time. • Additional Paid in Capital - This keeps track of how much stock-based compensation h...",
      "The \"quick and dirty\" way to do this: reduce the Taxable Income by the portion of the NOLs that you can use each year, apply the same tax rate, and then subtract that new Tax number from your old Pretax Income number (which should stay the same)....",
      "Normally you make very simple assumptions here and assume these are percentages of revenue, operating expenses, or cost of goods sold....",
      "This happens if D&A is embedded in other Income Statement line items. When this happens, you need to use the Cash Flow Statement number to arrive at EBITDA because otherwise you're undercounting D&A."
    ],
    "correct": 1,
    "explanation": "The \"quick and dirty\" way to do this: reduce the Taxable Income by the portion of the NOLs that you can use each year, apply the same tax rate, and then subtract that new Tax number from your old Pretax Income number (which should stay the same). The way you should do this: create a book vs. cash tax schedule where you calculate the Taxable Income based on NOLs, and then look at what you would pay in taxes without the NOLs. Then you book the difference as an increase to the Deferred Tax Liability on the Balance Sheet. This method reflects the fact that you're saving on cash flow - since the DTL, a liability, is rising - but correctly separates the NOL impact into book vs. cash taxes."
  },
  {
    "id": 206,
    "category": "Accounting - Advanced",
    "difficulty": "kho",
    "question": "What's the difference between capital leases and operating leases?",
    "options": [
      "This happens if D&A is embedded in other Income Statement line items. When this happens, you need to use the Cash Flow Statement number to arrive at EBITDA because otherwise you're undercounting D&A.",
      "Normally you make very simple assumptions here and assume these are percentages of revenue, operating expenses, or cost of goods sold....",
      "Retained Earnings = Old Retained Earnings Balance + Net Income - Dividends Issued If you're calculating Retained Earnings for the current year, take last year's Retained Earnings number, add this year's Net Income, and subtract however much the company paid out in dividends.",
      "Operating leases are used for short-term leasing of equipment and property, and do not involve ownership of anything...."
    ],
    "correct": 3,
    "explanation": "Operating leases are used for short-term leasing of equipment and property, and do not involve ownership of anything. Operating lease expenses show up as operating expenses on the Income Statement. Capital leases are used for longer-term items and give the lessee ownership rights; they depreciate and incur interest payments, and are counted as debt. A lease is a capital lease if any one of the following 4 conditions is true: 1. If there's a transfer of ownership at the end of the term. 2. If there's an option to purchase the asset at a bargain price at the end of the term. 3. If the term of the lease is greater than 75% of the useful life of the asset. 4. If the present value of the lease payments is greater than 90% of the asset's fair market value."
  },
  {
    "id": 207,
    "category": "Accounting - Advanced",
    "difficulty": "kho",
    "question": "Why would the Depreciation & Amortization number on the Income Statement be different from what's on the Cash Flow Statement?",
    "options": [
      "The simple way: project each one as a % of revenue or previous PP&E balance. The more complex way: create a PP&E schedule that splits out different assets by their useful lives, assumes straight-line depreciation over each asset's useful life, and then assumes capital expenditure...",
      "This happens if D&A is embedded in other Income Statement line items. When this happens, you need to use the Cash Flow Statement number to arrive at EBITDA because otherwise you're undercounting D&A.",
      "APIC = Old APIC + Stock-Based Compensation + Stock Created by Option Exercises If you're calculating it, take the balance from last year, add this year's stock-based compensation number, and then add in however much new stock was created by employees exercising options this year.",
      "• Restructuring Charges • Goodwill Impairment • Asset Write-Downs • Bad Debt Expenses • Legal Expenses • Disaster Expenses • Change in Accounting Procedures Note that to be an \"add-back\" or \"non-recurring\" charge for EBITDA / EBIT purposes, it needs to affect Operating Income on..."
    ],
    "correct": 1,
    "explanation": "This happens if D&A is embedded in other Income Statement line items. When this happens, you need to use the Cash Flow Statement number to arrive at EBITDA because otherwise you're undercounting D&A."
  },
  {
    "id": 208,
    "category": "Enterprise / Equity Value - Basic",
    "difficulty": "de",
    "question": "Why do we look at both Enterprise Value and Equity Value?",
    "options": [
      "Yes. It means that the company has an extremely large cash balance, or an extremely low market capitalization (or both). You see it with: 1. Companies on the brink of bankruptcy. 2. Financial institutions, such as banks, that have large cash balances. These da...",
      "Enterprise Value, because that's how much an acquirer really \"pays\" and includes the often mandatory debt repayment.",
      "Its basic equity value is $1,000 (100 * $10 = $1,000). To calculate the dilutive effect of the options, first you note that the options are all \"in-the-money\" - their exercise price is less than the current share price....",
      "Enterprise Value represents the value of the company that is attributable to all investors; Equity Value only represents the portion available to shareholders (equity investors)...."
    ],
    "correct": 3,
    "explanation": "Enterprise Value represents the value of the company that is attributable to all investors; Equity Value only represents the portion available to shareholders (equity investors). You look at both because Equity Value is the number the public-at-large sees, while Enterprise Value represents its true value."
  },
  {
    "id": 209,
    "category": "Enterprise / Equity Value - Basic",
    "difficulty": "de",
    "question": "When looking at an acquisition of a company, do you pay more attention to Enterprise or Equity Value?",
    "options": [
      "Equity Value is the market value and Shareholders' Equity is the book value. Equity Value can never be negative because shares outstanding and share prices can never be negative, whereas Shareholders' Equity could be any value....",
      "Enterprise Value, because that's how much an acquirer really \"pays\" and includes the often mandatory debt repayment.",
      "$1,000. In this case the options' exercise price is above the current share price, so they have no dilutive effect.",
      "Yes. It means that the company has an extremely large cash balance, or an extremely low market capitalization (or both). You see it with: 1. Companies on the brink of bankruptcy. 2. Financial institutions, such as banks, that have large cash balances. These da..."
    ],
    "correct": 1,
    "explanation": "Enterprise Value, because that's how much an acquirer really \"pays\" and includes the often mandatory debt repayment."
  },
  {
    "id": 210,
    "category": "Enterprise / Equity Value - Basic",
    "difficulty": "de",
    "question": "What's the formula for Enterprise Value?",
    "options": [
      "In most cases, yes, because the terms of a debt agreement usually say that debt must be refinanced in an acquisition....",
      "EV = Equity Value + Debt + Preferred Stock + Minority Interest - Cash (This formula does not tell the whole story and can get more complex - see the Advanced Questions....",
      "Preferred Stock pays out a fixed dividend, and preferred stock holders also have a higher claim to a company's assets than equity investors do....",
      "Its basic equity value is $1,000 (100 * $10 = $1,000). To calculate the dilutive effect of the options, first you note that the options are all \"in-the-money\" - their exercise price is less than the current share price...."
    ],
    "correct": 1,
    "explanation": "EV = Equity Value + Debt + Preferred Stock + Minority Interest - Cash (This formula does not tell the whole story and can get more complex - see the Advanced Questions. Most of the time you can get away with stating this formula in an interview, though)."
  },
  {
    "id": 211,
    "category": "Enterprise / Equity Value - Basic",
    "difficulty": "de",
    "question": "Why do you need to add Minority Interest to Enterprise Value?",
    "options": [
      "Whenever a company owns over 50% of another company, it is required to report the financial performance of the other company as part of its own performance....",
      "$1,000. In this case the options' exercise price is above the current share price, so they have no dilutive effect.",
      "No. This is not possible because you cannot have a negative share count and you cannot have a negative share price.",
      "EV = Equity Value + Debt + Preferred Stock + Minority Interest - Cash (This formula does not tell the whole story and can get more complex - see the Advanced Questions...."
    ],
    "correct": 0,
    "explanation": "Whenever a company owns over 50% of another company, it is required to report the financial performance of the other company as part of its own performance. So even though it doesn't own 100%, it reports 100% of the majority-owned subsidiary's financial performance. In keeping with the \"apples-to-apples\" theme, you must add Minority Interest to get to Enterprise Value so that your numerator and denominator both reflect 100% of the majority-owned subsidiary."
  },
  {
    "id": 212,
    "category": "Enterprise / Equity Value - Basic",
    "difficulty": "de",
    "question": "How do you calculate fully diluted shares?",
    "options": [
      "Yes. It means that the company has an extremely large cash balance, or an extremely low market capitalization (or both). You see it with: 1. Companies on the brink of bankruptcy. 2. Financial institutions, such as banks, that have large cash balances. These da...",
      "Preferred Stock pays out a fixed dividend, and preferred stock holders also have a higher claim to a company's assets than equity investors do....",
      "Equity Value is the market value and Shareholders' Equity is the book value. Equity Value can never be negative because shares outstanding and share prices can never be negative, whereas Shareholders' Equity could be any value....",
      "Take the basic share count and add in the dilutive effect of stock options and any other dilutive securities, such as warrants, convertible debt or convertible preferred stock...."
    ],
    "correct": 3,
    "explanation": "Take the basic share count and add in the dilutive effect of stock options and any other dilutive securities, such as warrants, convertible debt or convertible preferred stock. To calculate the dilutive effect of options, you use the Treasury Stock Method (detail on this below)."
  },
  {
    "id": 213,
    "category": "Enterprise / Equity Value - Basic",
    "difficulty": "de",
    "question": "Let's say a company has 100 shares outstanding, at a share price of $10 each. It also has 10 options outstanding at an exercise price of $5 each - what is its fully diluted equity value?",
    "options": [
      "Yes. It means that the company has an extremely large cash balance, or an extremely low market capitalization (or both). You see it with: 1. Companies on the brink of bankruptcy. 2. Financial institutions, such as banks, that have large cash balances. These da...",
      "EV = Equity Value + Debt + Preferred Stock + Minority Interest - Cash (This formula does not tell the whole story and can get more complex - see the Advanced Questions....",
      "The \"official\" reason: Cash is subtracted because it's considered a non-operating asset and because Equity Value implicitly accounts for it....",
      "Its basic equity value is $1,000 (100 * $10 = $1,000). To calculate the dilutive effect of the options, first you note that the options are all \"in-the-money\" - their exercise price is less than the current share price...."
    ],
    "correct": 3,
    "explanation": "Its basic equity value is $1,000 (100 * $10 = $1,000). To calculate the dilutive effect of the options, first you note that the options are all \"in-the-money\" - their exercise price is less than the current share price. When these options are exercised, there will be 10 new shares created - so the share count is now 110 rather than 100. However, that doesn't tell the whole story. In order to exercise the options, we had to \"pay\" the company $5 for each option (the exercise price). As a result, it now has $50 in additional cash, which it now uses to buy back 5 of the new shares we created. So the fully diluted share count is 105, and the fully diluted equity value is $1,050."
  },
  {
    "id": 214,
    "category": "Enterprise / Equity Value - Basic",
    "difficulty": "de",
    "question": "Let's say a company has 100 shares outstanding, at a share price of $10 each. It also has 10 options outstanding at an exercise price of $15 each - what is its fully diluted equity value?",
    "options": [
      "Enterprise Value represents the value of the company that is attributable to all investors; Equity Value only represents the portion available to shareholders (equity investors)....",
      "$1,000. In this case the options' exercise price is above the current share price, so they have no dilutive effect.",
      "No. This is not possible because you cannot have a negative share count and you cannot have a negative share price.",
      "Take the basic share count and add in the dilutive effect of stock options and any other dilutive securities, such as warrants, convertible debt or convertible preferred stock...."
    ],
    "correct": 1,
    "explanation": "$1,000. In this case the options' exercise price is above the current share price, so they have no dilutive effect."
  },
  {
    "id": 215,
    "category": "Enterprise / Equity Value - Basic",
    "difficulty": "de",
    "question": "Why do you subtract cash in the formula for Enterprise Value? Is that always accurate?",
    "options": [
      "Equity Value is the market value and Shareholders' Equity is the book value. Equity Value can never be negative because shares outstanding and share prices can never be negative, whereas Shareholders' Equity could be any value....",
      "This gets confusing because of the different units involved. First, note that these convertible bonds are in-the-money because the company's share price is $100, but the conversion price is $50....",
      "The \"official\" reason: Cash is subtracted because it's considered a non-operating asset and because Equity Value implicitly accounts for it....",
      "Its basic equity value is $1,000 (100 * $10 = $1,000). To calculate the dilutive effect of the options, first you note that the options are all \"in-the-money\" - their exercise price is less than the current share price...."
    ],
    "correct": 2,
    "explanation": "The \"official\" reason: Cash is subtracted because it's considered a non-operating asset and because Equity Value implicitly accounts for it. The way I think about it: In an acquisition, the buyer would \"get\" the cash of the seller, so it effectively pays less for the company based on how large its cash balance is. Remember, Enterprise Value tells us how much you'd really have to \"pay\" to acquire another company. It's not always accurate because technically you should be subtracting only excess cash - the amount of cash a company has above the minimum cash it requires to operate."
  },
  {
    "id": 216,
    "category": "Enterprise / Equity Value - Basic",
    "difficulty": "de",
    "question": "Is it always accurate to add Debt to Equity Value when calculating Enterprise Value?",
    "options": [
      "Take the basic share count and add in the dilutive effect of stock options and any other dilutive securities, such as warrants, convertible debt or convertible preferred stock....",
      "In most cases, yes, because the terms of a debt agreement usually say that debt must be refinanced in an acquisition....",
      "No. This is not possible because you cannot have a negative share count and you cannot have a negative share price.",
      "Enterprise Value, because that's how much an acquirer really \"pays\" and includes the often mandatory debt repayment."
    ],
    "correct": 1,
    "explanation": "In most cases, yes, because the terms of a debt agreement usually say that debt must be refinanced in an acquisition. And in most cases a buyer will pay off a seller's debt, so it is accurate to say that any debt \"adds\" to the purchase price. However, there could always be exceptions where the buyer does not pay off the debt. These are rare and I've personally never seen it, but once again \"never say never\" applies."
  },
  {
    "id": 217,
    "category": "Enterprise / Equity Value - Basic",
    "difficulty": "de",
    "question": "Could a company have a negative Enterprise Value? What would that mean?",
    "options": [
      "Preferred Stock pays out a fixed dividend, and preferred stock holders also have a higher claim to a company's assets than equity investors do....",
      "This gets confusing because of the different units involved. First, note that these convertible bonds are in-the-money because the company's share price is $100, but the conversion price is $50....",
      "Whenever a company owns over 50% of another company, it is required to report the financial performance of the other company as part of its own performance....",
      "Yes. It means that the company has an extremely large cash balance, or an extremely low market capitalization (or both). You see it with: 1. Companies on the brink of bankruptcy. 2. Financial institutions, such as banks, that have large cash balances. These da..."
    ],
    "correct": 3,
    "explanation": "Yes. It means that the company has an extremely large cash balance, or an extremely low market capitalization (or both). You see it with: 1. Companies on the brink of bankruptcy. 2. Financial institutions, such as banks, that have large cash balances. These days, there's a lot of overlap in these 2 categories…"
  },
  {
    "id": 218,
    "category": "Enterprise / Equity Value - Basic",
    "difficulty": "de",
    "question": "Could a company have a negative Equity Value? What would that mean?",
    "options": [
      "$1,000. In this case the options' exercise price is above the current share price, so they have no dilutive effect.",
      "No. This is not possible because you cannot have a negative share count and you cannot have a negative share price.",
      "Preferred Stock pays out a fixed dividend, and preferred stock holders also have a higher claim to a company's assets than equity investors do....",
      "Take the basic share count and add in the dilutive effect of stock options and any other dilutive securities, such as warrants, convertible debt or convertible preferred stock...."
    ],
    "correct": 1,
    "explanation": "No. This is not possible because you cannot have a negative share count and you cannot have a negative share price."
  },
  {
    "id": 219,
    "category": "Enterprise / Equity Value - Basic",
    "difficulty": "de",
    "question": "Why do we add Preferred Stock to get to Enterprise Value?",
    "options": [
      "Preferred Stock pays out a fixed dividend, and preferred stock holders also have a higher claim to a company's assets than equity investors do....",
      "Enterprise Value represents the value of the company that is attributable to all investors; Equity Value only represents the portion available to shareholders (equity investors)....",
      "No. This is not possible because you cannot have a negative share count and you cannot have a negative share price.",
      "Equity Value is the market value and Shareholders' Equity is the book value. Equity Value can never be negative because shares outstanding and share prices can never be negative, whereas Shareholders' Equity could be any value...."
    ],
    "correct": 0,
    "explanation": "Preferred Stock pays out a fixed dividend, and preferred stock holders also have a higher claim to a company's assets than equity investors do. As a result, it is seen as more similar to debt than common stock."
  },
  {
    "id": 220,
    "category": "Enterprise / Equity Value - Basic",
    "difficulty": "de",
    "question": "How do you account for convertible bonds in the Enterprise Value formula?",
    "options": [
      "Enterprise Value represents the value of the company that is attributable to all investors; Equity Value only represents the portion available to shareholders (equity investors)....",
      "Enterprise Value, because that's how much an acquirer really \"pays\" and includes the often mandatory debt repayment.",
      "This gets confusing because of the different units involved. First, note that these convertible bonds are in-the-money because the company's share price is $100, but the conversion price is $50....",
      "If the convertible bonds are in-the-money, meaning that the conversion price of the bonds is below the current share price, then you count them as additional dilution to the Equity Value; if they're out-of-the-money then you count the face value of the convertibles as part of the..."
    ],
    "correct": 3,
    "explanation": "If the convertible bonds are in-the-money, meaning that the conversion price of the bonds is below the current share price, then you count them as additional dilution to the Equity Value; if they're out-of-the-money then you count the face value of the convertibles as part of the company's Debt."
  },
  {
    "id": 221,
    "category": "Enterprise / Equity Value - Basic",
    "difficulty": "de",
    "question": "A company has 1 million shares outstanding at a value of $100 per share. It also has $10 million of convertible bonds, with par value of $1,000 and a conversion price of $50. How do I calculate diluted shares outstanding?",
    "options": [
      "This gets confusing because of the different units involved. First, note that these convertible bonds are in-the-money because the company's share price is $100, but the conversion price is $50....",
      "$1,000. In this case the options' exercise price is above the current share price, so they have no dilutive effect.",
      "Its basic equity value is $1,000 (100 * $10 = $1,000). To calculate the dilutive effect of the options, first you note that the options are all \"in-the-money\" - their exercise price is less than the current share price....",
      "If the convertible bonds are in-the-money, meaning that the conversion price of the bonds is below the current share price, then you count them as additional dilution to the Equity Value; if they're out-of-the-money then you count the face value of the convertibles as part of the..."
    ],
    "correct": 0,
    "explanation": "This gets confusing because of the different units involved. First, note that these convertible bonds are in-the-money because the company's share price is $100, but the conversion price is $50. So we count them as additional shares rather than debt. Next, we need to divide the value of the convertible bonds - $10 million - by the par value - $1,000 - to figure out how many individual bonds we get: $10 million / $1,000 = 10,000 convertible bonds. Next, we need to figure out how many shares this number represents. The number of shares per bond is the par value divided by the conversion price: $1,000 / $50 = 20 shares per bond. So we have 200,000 new shares (20 * 10,000) created by the convertibles, giving us 1.2 million diluted shares outstanding. We do not use the Treasury Stock Method with convertibles because the company is not \"receiving\" any cash from us."
  },
  {
    "id": 222,
    "category": "Enterprise / Equity Value - Basic",
    "difficulty": "de",
    "question": "What's the difference between Equity Value and Shareholders' Equity?",
    "options": [
      "Yes. It means that the company has an extremely large cash balance, or an extremely low market capitalization (or both). You see it with: 1. Companies on the brink of bankruptcy. 2. Financial institutions, such as banks, that have large cash balances. These da...",
      "Equity Value is the market value and Shareholders' Equity is the book value. Equity Value can never be negative because shares outstanding and share prices can never be negative, whereas Shareholders' Equity could be any value....",
      "No. This is not possible because you cannot have a negative share count and you cannot have a negative share price.",
      "Whenever a company owns over 50% of another company, it is required to report the financial performance of the other company as part of its own performance...."
    ],
    "correct": 1,
    "explanation": "Equity Value is the market value and Shareholders' Equity is the book value. Equity Value can never be negative because shares outstanding and share prices can never be negative, whereas Shareholders' Equity could be any value. For healthy companies, Equity Value usually far exceeds Shareholders' Equity."
  },
  {
    "id": 223,
    "category": "Enterprise / Equity Value - Advanced",
    "difficulty": "kho",
    "question": "Are there any problems with the Enterprise Value formula you just gave me?",
    "options": [
      "• Debt: Sometimes if the company is too small or if investors don't believe it has a credible turnaround plan, they will simply refuse to lend it any sort of capital. • Equity: Same as above, but worse - since equity investors have lower priority than debt investors....",
      "\"Q: What was the best part of Playboy's IPO? A: The pitch book.\" If you have a female interviewer or someone else who might get offended, then try the following corny but impossible to offend joke instead: \"A dog goes into an investment banking job interview, and the banker says...",
      "Normally you use the country's long-term GDP growth rate, the rate of inflation, or something similarly conservative....",
      "Yes - it's too simple. There are lots of other things you need to add into the formula with real companies: • Net Operating Losses - Should be valued and arguably added in, similar to cash. • Long-Term Investments - These should be counted, similar to cash. •..."
    ],
    "correct": 3,
    "explanation": "Yes - it's too simple. There are lots of other things you need to add into the formula with real companies: • Net Operating Losses - Should be valued and arguably added in, similar to cash. • Long-Term Investments - These should be counted, similar to cash. • Equity Investments - Any investments in other companies should also be added in, similar to cash (though they might be discounted). • Capital Leases - Like debt, these have interest payments - so they should be added in like debt. • (Some) Operating Leases - Sometimes you need to convert operating leases to capital leases and add them as well. • Pension Obligations - Sometimes these are counted as debt as well. So a more \"correct\" formula would be Enterprise Value = Equity Value - Cash + Debt + Preferred Stock + Minority Interest - NOLs - Investments + Capital Leases + Pension Obligations… In interviews, usually you can get away with saying \"Enterprise Value = Equity Value - Cash + Debt + Preferred Stock + Minority Interest\" I mention this here because in more advanced interviews you might get questions on this topic."
  },
  {
    "id": 224,
    "category": "Enterprise / Equity Value - Advanced",
    "difficulty": "kho",
    "question": "Should you use the book value or market value of each item when calculating Enterprise Value?",
    "options": [
      "Trick question. If the convertible debt is in-the-money then you do not count it as debt but instead assume that it contributes to dilution, so the company's Equity Value is higher. If it's out-of-the-money then you count it as debt and use the interest rate o...",
      "Generally the accounts receivable days are in the 40-50 day range, though it's higher for companies selling high-end items and it might be lower for smaller, lower transaction- value companies.",
      "Technically, you should use market value for everything. In practice, however, you usually use market value only for the Equity Value portion, because it's almost impossible to establish market values for the rest of the items in the formula - so you just take the numbers from th...",
      "\"Beta\" in the Capital Asset Pricing Model (CAPM) measures expected return and expected risk...."
    ],
    "correct": 2,
    "explanation": "Technically, you should use market value for everything. In practice, however, you usually use market value only for the Equity Value portion, because it's almost impossible to establish market values for the rest of the items in the formula - so you just take the numbers from the company's Balance Sheet."
  },
  {
    "id": 225,
    "category": "Enterprise / Equity Value - Advanced",
    "difficulty": "kho",
    "question": "What percentage dilution in Equity Value is \"too high?\"",
    "options": [
      "P / E depends on the company's capital structure whereas EV / EBIT and EV / EBITDA are capital structure-neutral....",
      "There's no strict \"rule\" here but most bankers would say that anything over 10% is odd....",
      "I would not say anything economics/finance-related - it sounds too artificial. Tell them about something you were actually interested in - even if it's not directly related to banking....",
      "Here's a handy chart to explain all of this. Note that this chart does not cover every single feature or every single type of debt in the universe - just the most important ones, and what you're likely to be asked about in finance interviews: Debt Type Revolver Term Loan A Term L..."
    ],
    "correct": 1,
    "explanation": "There's no strict \"rule\" here but most bankers would say that anything over 10% is odd. If your basic Equity Value is $100 million and the diluted Equity Value is $115 million, you might want to check your calculations - it's not necessarily wrong, but over 10% dilution is unusual for most companies."
  },
  {
    "id": 226,
    "category": "Valuation - Basic",
    "difficulty": "de",
    "question": "What are the 3 major valuation methodologies?",
    "options": [
      "dollar amounts and everything else is held constant. You would pay more for the one where you lease the machines....",
      "EBITDA is available to all investors in the company - rather than just equity holders....",
      "Comparable Companies, Precedent Transactions and Discounted Cash Flow Analysis.",
      "Trick question. For Unlevered Free Cash Flow, you would use Enterprise Value, but for Levered Free Cash Flow you would use Equity Value. Remember, Unlevered Free Cash Flow excludes Interest and thus represents money available to all investors, whereas Levered..."
    ],
    "correct": 2,
    "explanation": "Comparable Companies, Precedent Transactions and Discounted Cash Flow Analysis."
  },
  {
    "id": 227,
    "category": "Valuation - Basic",
    "difficulty": "de",
    "question": "Rank the 3 valuation methodologies from highest to lowest expected value.",
    "options": [
      "Trick question - there is no ranking that always holds. In general, Precedent Transactions will be higher than Comparable Companies due to the Control Premium built into acquisitions....",
      "• Past transactions are rarely 100% comparable - the transaction structure, size of the company, and market sentiment all have huge effects. • Data on precedent transactions is generally more difficult to find than it is for public company comparables, especially for acquisitions...",
      "You use the same methodologies as with public companies: public company comparables, precedent transactions, and DCF....",
      "You use Enterprise Value because those scientists or subscribers are \"available\" to all the investors (both debt and equity) in a company...."
    ],
    "correct": 0,
    "explanation": "Trick question - there is no ranking that always holds. In general, Precedent Transactions will be higher than Comparable Companies due to the Control Premium built into acquisitions. Beyond that, a DCF could go either way and it's best to say that it's more variable than other methodologies. Often it produces the highest value, but it can produce the lowest value as well depending on your assumptions."
  },
  {
    "id": 228,
    "category": "Valuation - Basic",
    "difficulty": "de",
    "question": "When would you not use a DCF in a Valuation?",
    "options": [
      "• No company is 100% comparable to another company. • The stock market is \"emotional\" - your multiples might be dramatically higher or lower on certain dates depending on the market's movements. • Share prices for small companies with thinly-traded stocks may not reflect their fu...",
      "• Past transactions are rarely 100% comparable - the transaction structure, size of the company, and market sentiment all have huge effects. • Data on precedent transactions is generally more difficult to find than it is for public company comparables, especially for acquisitions...",
      "Warren Buffett once famously said, \"Does management think the tooth fairy pays for capital expenditures?\" He dislikes EBITDA because it excludes the often sizable Capital Expenditures companies make and hides how much cash they are actually using to finance their operations....",
      "You do not use a DCF if the company has unstable or unpredictable cash flows (tech or bio-tech startup) or when debt and working capital serve a fundamentally different role...."
    ],
    "correct": 3,
    "explanation": "You do not use a DCF if the company has unstable or unpredictable cash flows (tech or bio-tech startup) or when debt and working capital serve a fundamentally different role. For example, banks and financial institutions do not re-invest debt and working capital is a huge part of their Balance Sheets - so you wouldn't use a DCF for such companies."
  },
  {
    "id": 229,
    "category": "Valuation - Basic",
    "difficulty": "de",
    "question": "What other Valuation methodologies are there?",
    "options": [
      "The most common multiples are EV/Revenue, EV/EBITDA, EV/EBIT, P/E (Share Price / Earnings per Share), and P/BV (Share Price / Book Value).",
      "Other methodologies include: • Liquidation Valuation - Valuing a company's assets, assuming they are sold off and then subtracting liabilities to determine how much capital, if any, equity investors receive • Replacement Value - Valuing a company based on the cost of replacing it...",
      "The 3 main ways to select companies and transactions: 1. Industry classification 2....",
      "Sometimes this happens when there is a substantial mismatch between the M&A market and the public market...."
    ],
    "correct": 1,
    "explanation": "Other methodologies include: • Liquidation Valuation - Valuing a company's assets, assuming they are sold off and then subtracting liabilities to determine how much capital, if any, equity investors receive • Replacement Value - Valuing a company based on the cost of replacing its assets • LBO Analysis - Determining how much a PE firm could pay for a company to hit a \"target\" IRR, usually in the 20-25% range • Sum of the Parts - Valuing each division of a company separately and adding them together at the end • M&A Premiums Analysis - Analyzing M&A deals and figuring out the premium that each buyer paid, and using this to establish what your company is worth • Future Share Price Analysis - Projecting a company's share price based on the P / E multiples of the public company comparables, then discounting it back to its present value"
  },
  {
    "id": 230,
    "category": "Valuation - Basic",
    "difficulty": "de",
    "question": "When would you use a Liquidation Valuation?",
    "options": [
      "This is highly unusual, but it could happen if a company had substantial hard assets but the market was severely undervaluing it for a specific reason (such as an earnings miss or cyclicality)....",
      "This is most common in bankruptcy scenarios and is used to see whether equity shareholders will receive any capital after the company's debts have been paid off....",
      "Sometimes this happens when there is a substantial mismatch between the M&A market and the public market....",
      "Comparable Companies, Precedent Transactions and Discounted Cash Flow Analysis."
    ],
    "correct": 1,
    "explanation": "This is most common in bankruptcy scenarios and is used to see whether equity shareholders will receive any capital after the company's debts have been paid off. It is often used to advise struggling businesses on whether it's better to sell off assets separately or to try and sell the entire company."
  },
  {
    "id": 231,
    "category": "Valuation - Basic",
    "difficulty": "de",
    "question": "When would you use Sum of the Parts?",
    "options": [
      "Sometimes this simple fact gets lost in discussion of Valuation methodologies. You take the median multiple of a set of companies or transactions, and then multiply it by the relevant metric from the company you're valuing....",
      "There's no \"rule\" that you have to do this, but in most cases you do because you want to use values from the middle range of the set....",
      "Usually you use a \"football field\" chart where you show the valuation range implied by each methodology....",
      "This is most often used when a company has completely different, unrelated divisions - a conglomerate like General Electric, for example...."
    ],
    "correct": 3,
    "explanation": "This is most often used when a company has completely different, unrelated divisions - a conglomerate like General Electric, for example. If you have a plastics division, a TV and entertainment division, an energy division, a consumer financing division and a technology division, you should not use the same set of Comparable Companies and Precedent Transactions for the entire company. Instead, you should use different sets for each division, value each one separately, and then add them together to get the Combined Value."
  },
  {
    "id": 232,
    "category": "Valuation - Basic",
    "difficulty": "de",
    "question": "When do you use an LBO Analysis as part of your Valuation?",
    "options": [
      "Obviously you use this whenever you're looking at a Leveraged Buyout - but it is also used to establish how much a private equity firm could pay, which is usually lower than what companies will pay....",
      "This is highly unusual, but it could happen if a company had substantial hard assets but the market was severely undervaluing it for a specific reason (such as an earnings miss or cyclicality)....",
      "The same way you would value a company: by looking at what comparable apple trees are worth (relative valuation) and the value of the apple tree's cash flows (intrinsic valuation)....",
      "• No company is 100% comparable to another company. • The stock market is \"emotional\" - your multiples might be dramatically higher or lower on certain dates depending on the market's movements. • Share prices for small companies with thinly-traded stocks may not reflect their fu..."
    ],
    "correct": 0,
    "explanation": "Obviously you use this whenever you're looking at a Leveraged Buyout - but it is also used to establish how much a private equity firm could pay, which is usually lower than what companies will pay. It is often used to set a \"floor\" on a possible Valuation for the company you're looking at."
  },
  {
    "id": 233,
    "category": "Valuation - Basic",
    "difficulty": "de",
    "question": "What are the most common multiples used in Valuation?",
    "options": [
      "The most common multiples are EV/Revenue, EV/EBITDA, EV/EBIT, P/E (Share Price / Earnings per Share), and P/BV (Share Price / Book Value).",
      "Technically it could go either way, but in most cases the LBO will give you a lower valuation....",
      "EBITDA is available to all investors in the company - rather than just equity holders....",
      "There's no \"rule\" that you have to do this, but in most cases you do because you want to use values from the middle range of the set...."
    ],
    "correct": 0,
    "explanation": "The most common multiples are EV/Revenue, EV/EBITDA, EV/EBIT, P/E (Share Price / Earnings per Share), and P/BV (Share Price / Book Value)."
  },
  {
    "id": 234,
    "category": "Valuation - Basic",
    "difficulty": "de",
    "question": "What are some examples of industry-specific multiples?",
    "options": [
      "Sometimes this happens when there is a substantial mismatch between the M&A market and the public market....",
      "Warren Buffett once famously said, \"Does management think the tooth fairy pays for capital expenditures?\" He dislikes EBITDA because it excludes the often sizable Capital Expenditures companies make and hides how much cash they are actually using to finance their operations....",
      "Technology (Internet): EV / Unique Visitors, EV / Pageviews Retail / Airlines: EV / EBITDAR (Earnings Before Interest, Taxes, Depreciation, Amortization & Rent) Energy: P / MCFE, P / MCFE / D (MCFE = 1 Million Cubic Foot Equivalent, MCFE/D = MCFE per Day), P / NAV (Share Price /...",
      "Usually you use a \"football field\" chart where you show the valuation range implied by each methodology...."
    ],
    "correct": 2,
    "explanation": "Technology (Internet): EV / Unique Visitors, EV / Pageviews Retail / Airlines: EV / EBITDAR (Earnings Before Interest, Taxes, Depreciation, Amortization & Rent) Energy: P / MCFE, P / MCFE / D (MCFE = 1 Million Cubic Foot Equivalent, MCFE/D = MCFE per Day), P / NAV (Share Price / Net Asset Value) Real Estate Investment Trusts (REITs): Price / FFO, Price / AFFO (Funds From Operations, Adjusted Funds From Operations) Technology and Energy should be straightforward - you're looking at traffic and energy reserves as value drivers rather than revenue or profit. For Retail / Airlines, you often remove Rent because it is a major expense and one that varies significantly between different types of companies. For REITs, Funds From Operations is a common metric that adds back Depreciation and subtracts gains on the sale of property. Depreciation is a non-cash yet extremely large expense in real estate, and gains on sales of properties are assumed to be non-recurring, so FFO is viewed as a \"normalized\" picture of the cash flow the REIT is generating."
  },
  {
    "id": 235,
    "category": "Valuation - Basic",
    "difficulty": "de",
    "question": "When you're looking at an industry-specific multiple like EV / Scientists or EV / Subscribers, why do you use Enterprise Value rather than Equity Value?",
    "options": [
      "This could happen for a number of reasons: • The company has just reported earnings well-above expectations and its stock price has risen recently. • It has some type of competitive advantage not reflected in its financials, such as a key patent or other intellectual property. •...",
      "P / E depends on the company's capital structure whereas EV / EBIT and EV / EBITDA are capital structure-neutral....",
      "You would use Comparable Companies and Precedent Transactions and look at more \"creative\" multiples such as EV/Unique Visitors and EV/Pageviews rather than EV/Revenue or EV/EBITDA....",
      "You use Enterprise Value because those scientists or subscribers are \"available\" to all the investors (both debt and equity) in a company...."
    ],
    "correct": 3,
    "explanation": "You use Enterprise Value because those scientists or subscribers are \"available\" to all the investors (both debt and equity) in a company. The same logic doesn't apply to everything, though - you need to think through the multiple and see which investors the particular metric is \"available\" to."
  },
  {
    "id": 236,
    "category": "Valuation - Basic",
    "difficulty": "de",
    "question": "Would an LBO or DCF give a higher valuation?",
    "options": [
      "Technically it could go either way, but in most cases the LBO will give you a lower valuation....",
      "• No company is 100% comparable to another company. • The stock market is \"emotional\" - your multiples might be dramatically higher or lower on certain dates depending on the market's movements. • Share prices for small companies with thinly-traded stocks may not reflect their fu...",
      "There's no discount because with precedent transactions, you're acquiring the entire company - and once it's acquired, the shares immediately become illiquid....",
      "This could happen for a number of reasons: • The company has just reported earnings well-above expectations and its stock price has risen recently. • It has some type of competitive advantage not reflected in its financials, such as a key patent or other intellectual property. •..."
    ],
    "correct": 0,
    "explanation": "Technically it could go either way, but in most cases the LBO will give you a lower valuation. Here's the easiest way to think about it: with an LBO, you do not get any value from the cash flows of a company in between Year 1 and the final year - you're only valuing it based on its terminal value. With a DCF, by contrast, you're taking into account both the company's cash flows in between and its terminal value, so values tend to be higher. Note: Unlike a DCF, an LBO model by itself does not give a specific valuation. Instead, you set a desired IRR and determine how much you could pay for the company (the valuation) based on that."
  },
  {
    "id": 237,
    "category": "Valuation - Basic",
    "difficulty": "de",
    "question": "How would you present these Valuation methodologies to a company or its investors?",
    "options": [
      "There's no \"rule\" that you have to do this, but in most cases you do because you want to use values from the middle range of the set....",
      "Obviously you use this whenever you're looking at a Leveraged Buyout - but it is also used to establish how much a private equity firm could pay, which is usually lower than what companies will pay....",
      "Other methodologies include: • Liquidation Valuation - Valuing a company's assets, assuming they are sold off and then subtracting liabilities to determine how much capital, if any, equity investors receive • Replacement Value - Valuing a company based on the cost of replacing it...",
      "Usually you use a \"football field\" chart where you show the valuation range implied by each methodology...."
    ],
    "correct": 3,
    "explanation": "Usually you use a \"football field\" chart where you show the valuation range implied by each methodology. You always show a range rather than one specific number. As an example, see page 10 of this document (a Valuation done by Credit Suisse for the Leveraged Buyout of Sungard Data Systems in 2005): http://edgar.sec.gov/Archives/edgar/data/789388/000119312505074184/dex99c2.htm"
  },
  {
    "id": 238,
    "category": "Valuation - Basic",
    "difficulty": "de",
    "question": "How would you value an apple tree?",
    "options": [
      "This is highly unusual, but it could happen if a company had substantial hard assets but the market was severely undervaluing it for a specific reason (such as an earnings miss or cyclicality)....",
      "Other methodologies include: • Liquidation Valuation - Valuing a company's assets, assuming they are sold off and then subtracting liabilities to determine how much capital, if any, equity investors receive • Replacement Value - Valuing a company based on the cost of replacing it...",
      "You use Enterprise Value because those scientists or subscribers are \"available\" to all the investors (both debt and equity) in a company....",
      "The same way you would value a company: by looking at what comparable apple trees are worth (relative valuation) and the value of the apple tree's cash flows (intrinsic valuation)...."
    ],
    "correct": 3,
    "explanation": "The same way you would value a company: by looking at what comparable apple trees are worth (relative valuation) and the value of the apple tree's cash flows (intrinsic valuation). Yes, you could do a DCF for anything - even an apple tree."
  },
  {
    "id": 239,
    "category": "Valuation - Basic",
    "difficulty": "de",
    "question": "Why can't you use Equity Value / EBITDA as a multiple rather than Enterprise Value / EBITDA?",
    "options": [
      "Sometimes this happens when there is a substantial mismatch between the M&A market and the public market....",
      "EBITDA is available to all investors in the company - rather than just equity holders....",
      "Usually you use a \"football field\" chart where you show the valuation range implied by each methodology....",
      "Possible reasons: 1. One process was more competitive and had a lot more companies bidding on the target. 2. One company had recent bad news or a depressed stock price so it was acquired at a discount. 3. They were in industries with different median multiples..."
    ],
    "correct": 1,
    "explanation": "EBITDA is available to all investors in the company - rather than just equity holders. Similarly, Enterprise Value is also available to all shareholders so it makes sense to pair them together. Equity Value / EBITDA, however, is comparing apples to oranges because Equity Value does not reflect the company's entire capital structure - only the part available to equity investors."
  },
  {
    "id": 240,
    "category": "Valuation - Basic",
    "difficulty": "de",
    "question": "When would a Liquidation Valuation produce the highest value?",
    "options": [
      "The 3 main ways to select companies and transactions: 1. Industry classification 2....",
      "Sometimes this simple fact gets lost in discussion of Valuation methodologies. You take the median multiple of a set of companies or transactions, and then multiply it by the relevant metric from the company you're valuing....",
      "This is highly unusual, but it could happen if a company had substantial hard assets but the market was severely undervaluing it for a specific reason (such as an earnings miss or cyclicality)....",
      "Usually you use it in pitch books and in client presentations when you're providing updates and telling them what they should expect for their own valuation...."
    ],
    "correct": 2,
    "explanation": "This is highly unusual, but it could happen if a company had substantial hard assets but the market was severely undervaluing it for a specific reason (such as an earnings miss or cyclicality). As a result, the company's Comparable Companies and Precedent Transactions would likely produce lower values as well - and if its assets were valued highly enough, Liquidation Valuation might give a higher value than other methodologies."
  },
  {
    "id": 241,
    "category": "Valuation - Basic",
    "difficulty": "de",
    "question": "Let's go back to 2004 and look at Facebook back when it had no profit and no revenue. How would you value it?",
    "options": [
      "EBITDA is available to all investors in the company - rather than just equity holders....",
      "This is most often used when a company has completely different, unrelated divisions - a conglomerate like General Electric, for example....",
      "Sometimes this simple fact gets lost in discussion of Valuation methodologies. You take the median multiple of a set of companies or transactions, and then multiply it by the relevant metric from the company you're valuing....",
      "You would use Comparable Companies and Precedent Transactions and look at more \"creative\" multiples such as EV/Unique Visitors and EV/Pageviews rather than EV/Revenue or EV/EBITDA...."
    ],
    "correct": 3,
    "explanation": "You would use Comparable Companies and Precedent Transactions and look at more \"creative\" multiples such as EV/Unique Visitors and EV/Pageviews rather than EV/Revenue or EV/EBITDA. You would not use a \"far in the future DCF\" because you can't reasonably predict cash flows for a company that is not even making money yet. This is a very common wrong answer given by interviewees. When you can't predict cash flow, use other metrics - don't try to predict cash flow anyway!"
  },
  {
    "id": 242,
    "category": "Valuation - Basic",
    "difficulty": "de",
    "question": "What would you use in conjunction with Free Cash Flow multiples - Equity Value or Enterprise Value?",
    "options": [
      "Trick question. For Unlevered Free Cash Flow, you would use Enterprise Value, but for Levered Free Cash Flow you would use Equity Value. Remember, Unlevered Free Cash Flow excludes Interest and thus represents money available to all investors, whereas Levered...",
      "This is highly unusual, but it could happen if a company had substantial hard assets but the market was severely undervaluing it for a specific reason (such as an earnings miss or cyclicality)....",
      "Other methodologies include: • Liquidation Valuation - Valuing a company's assets, assuming they are sold off and then subtracting liabilities to determine how much capital, if any, equity investors receive • Replacement Value - Valuing a company based on the cost of replacing it...",
      "You use Enterprise Value because those scientists or subscribers are \"available\" to all the investors (both debt and equity) in a company...."
    ],
    "correct": 0,
    "explanation": "Trick question. For Unlevered Free Cash Flow, you would use Enterprise Value, but for Levered Free Cash Flow you would use Equity Value. Remember, Unlevered Free Cash Flow excludes Interest and thus represents money available to all investors, whereas Levered already includes Interest and the money is therefore only available to equity investors. Debt investors have already \"been paid\" with the interest payments they received."
  },
  {
    "id": 243,
    "category": "Valuation - Basic",
    "difficulty": "de",
    "question": "You never use Equity Value / EBITDA, but are there any cases where you might use Equity Value / Revenue?",
    "options": [
      "Never say never. It's very rare to see this, but sometimes large financial institutions with big cash balances have negative Enterprise Values - so you might use Equity Value / Revenue instead. You might see Equity Value / Revenue if you've listed a set of fin...",
      "• No company is 100% comparable to another company. • The stock market is \"emotional\" - your multiples might be dramatically higher or lower on certain dates depending on the market's movements. • Share prices for small companies with thinly-traded stocks may not reflect their fu...",
      "Comparable Companies, Precedent Transactions and Discounted Cash Flow Analysis.",
      "You do not use a DCF if the company has unstable or unpredictable cash flows (tech or bio-tech startup) or when debt and working capital serve a fundamentally different role...."
    ],
    "correct": 0,
    "explanation": "Never say never. It's very rare to see this, but sometimes large financial institutions with big cash balances have negative Enterprise Values - so you might use Equity Value / Revenue instead. You might see Equity Value / Revenue if you've listed a set of financial and non- financial companies on a slide, you're showing Revenue multiples for the non-financial companies, and you want to show something similar for the financials. Note, however, that in most cases you would be using other multiples such as P/E and P/BV with banks anyway."
  },
  {
    "id": 244,
    "category": "Valuation - Basic",
    "difficulty": "de",
    "question": "How do you select Comparable Companies / Precedent Transactions?",
    "options": [
      "Usually you use a \"football field\" chart where you show the valuation range implied by each methodology....",
      "The 3 main ways to select companies and transactions: 1. Industry classification 2....",
      "You do not use a DCF if the company has unstable or unpredictable cash flows (tech or bio-tech startup) or when debt and working capital serve a fundamentally different role....",
      "Other methodologies include: • Liquidation Valuation - Valuing a company's assets, assuming they are sold off and then subtracting liabilities to determine how much capital, if any, equity investors receive • Replacement Value - Valuing a company based on the cost of replacing it..."
    ],
    "correct": 1,
    "explanation": "The 3 main ways to select companies and transactions: 1. Industry classification 2. Financial criteria (Revenue, EBITDA, etc.) 3. Geography For Precedent Transactions, you often limit the set based on date and only look at transactions within the past 1-2 years. The most important factor is industry - that is always used to screen for companies/transactions, and the rest may or may not be used depending on how specific you want to be. Here are a few examples: Comparable Company Screen: Oil & gas producers with market caps over $5 billion Comparable Company Screen: Digital media companies with over $100 million in revenue Precedent Transaction Screen: Airline M&A transactions over the past 2 years involving sellers with over $1 billion in revenue Precedent Transaction Screen: Retail M&A transactions over the past year"
  },
  {
    "id": 245,
    "category": "Valuation - Basic",
    "difficulty": "de",
    "question": "How do you apply the 3 valuation methodologies to actually get a value for the company you're looking at?",
    "options": [
      "dollar amounts and everything else is held constant. You would pay more for the one where you lease the machines....",
      "Trick question. For Unlevered Free Cash Flow, you would use Enterprise Value, but for Levered Free Cash Flow you would use Equity Value. Remember, Unlevered Free Cash Flow excludes Interest and thus represents money available to all investors, whereas Levered...",
      "Sometimes this simple fact gets lost in discussion of Valuation methodologies. You take the median multiple of a set of companies or transactions, and then multiply it by the relevant metric from the company you're valuing....",
      "Trick question - there is no ranking that always holds. In general, Precedent Transactions will be higher than Comparable Companies due to the Control Premium built into acquisitions...."
    ],
    "correct": 2,
    "explanation": "Sometimes this simple fact gets lost in discussion of Valuation methodologies. You take the median multiple of a set of companies or transactions, and then multiply it by the relevant metric from the company you're valuing. Example: If the median EBITDA multiple from your set of Precedent Transactions is 8x and your company's EBITDA is $500 million, the implied Enterprise Value would be $4 billion. To get the \"football field\" valuation graph you often see, you look at the minimum, maximum, 25th percentile and 75th percentile in each set as well and create a range of values based on each methodology."
  },
  {
    "id": 246,
    "category": "Valuation - Basic",
    "difficulty": "de",
    "question": "What do you actually use a valuation for?",
    "options": [
      "Usually you use it in pitch books and in client presentations when you're providing updates and telling them what they should expect for their own valuation....",
      "Other methodologies include: • Liquidation Valuation - Valuing a company's assets, assuming they are sold off and then subtracting liabilities to determine how much capital, if any, equity investors receive • Replacement Value - Valuing a company based on the cost of replacing it...",
      "Sometimes this happens when there is a substantial mismatch between the M&A market and the public market....",
      "This is most common in bankruptcy scenarios and is used to see whether equity shareholders will receive any capital after the company's debts have been paid off...."
    ],
    "correct": 0,
    "explanation": "Usually you use it in pitch books and in client presentations when you're providing updates and telling them what they should expect for their own valuation. It's also used right before a deal closes in a Fairness Opinion, a document a bank creates that \"proves\" the value their client is paying or receiving is \"fair\" from a financial point of view. Valuations can also be used in defense analyses, merger models, LBO models, DCFs (because terminal multiples are based off of comps), and pretty much anything else in finance."
  },
  {
    "id": 247,
    "category": "Valuation - Basic",
    "difficulty": "de",
    "question": "Why would a company with similar growth and profitability to its Comparable Companies be valued at a premium?",
    "options": [
      "• No company is 100% comparable to another company. • The stock market is \"emotional\" - your multiples might be dramatically higher or lower on certain dates depending on the market's movements. • Share prices for small companies with thinly-traded stocks may not reflect their fu...",
      "This could happen for a number of reasons: • The company has just reported earnings well-above expectations and its stock price has risen recently. • It has some type of competitive advantage not reflected in its financials, such as a key patent or other intellectual property. •...",
      "You use Enterprise Value because those scientists or subscribers are \"available\" to all the investors (both debt and equity) in a company....",
      "The 3 main ways to select companies and transactions: 1. Industry classification 2...."
    ],
    "correct": 1,
    "explanation": "This could happen for a number of reasons: • The company has just reported earnings well-above expectations and its stock price has risen recently. • It has some type of competitive advantage not reflected in its financials, such as a key patent or other intellectual property. • It has just won a favorable ruling in a major lawsuit. • It is the market leader in an industry and has greater market share than its competitors."
  },
  {
    "id": 248,
    "category": "Valuation - Basic",
    "difficulty": "de",
    "question": "What are the flaws with public company comparables?",
    "options": [
      "Comparable Companies, Precedent Transactions and Discounted Cash Flow Analysis.",
      "Usually you use a \"football field\" chart where you show the valuation range implied by each methodology....",
      "• No company is 100% comparable to another company. • The stock market is \"emotional\" - your multiples might be dramatically higher or lower on certain dates depending on the market's movements. • Share prices for small companies with thinly-traded stocks may not reflect their fu...",
      "This could happen for a number of reasons: • The company has just reported earnings well-above expectations and its stock price has risen recently. • It has some type of competitive advantage not reflected in its financials, such as a key patent or other intellectual property. •..."
    ],
    "correct": 2,
    "explanation": "• No company is 100% comparable to another company. • The stock market is \"emotional\" - your multiples might be dramatically higher or lower on certain dates depending on the market's movements. • Share prices for small companies with thinly-traded stocks may not reflect their full value."
  },
  {
    "id": 249,
    "category": "Valuation - Basic",
    "difficulty": "de",
    "question": "How do you take into account a company's competitive advantage in a valuation?",
    "options": [
      "This is most often used when a company has completely different, unrelated divisions - a conglomerate like General Electric, for example....",
      "This is most common in bankruptcy scenarios and is used to see whether equity shareholders will receive any capital after the company's debts have been paid off....",
      "The 3 main ways to select companies and transactions: 1. Industry classification 2....",
      "1. Look at the 75th percentile or higher for the multiples rather than the Medians. 2. Add in a premium to some of the multiples. 3. Use more aggressive projections for the company. In practice you rarely do all of the above - these are just possibilities."
    ],
    "correct": 3,
    "explanation": "1. Look at the 75th percentile or higher for the multiples rather than the Medians. 2. Add in a premium to some of the multiples. 3. Use more aggressive projections for the company. In practice you rarely do all of the above - these are just possibilities."
  },
  {
    "id": 250,
    "category": "Valuation - Basic",
    "difficulty": "de",
    "question": "Do you ALWAYS use the median multiple of a set of public company comparables or precedent transactions?",
    "options": [
      "P / E depends on the company's capital structure whereas EV / EBIT and EV / EBITDA are capital structure-neutral....",
      "Sometimes this happens when there is a substantial mismatch between the M&A market and the public market....",
      "This could happen for a number of reasons: • The company has just reported earnings well-above expectations and its stock price has risen recently. • It has some type of competitive advantage not reflected in its financials, such as a key patent or other intellectual property. •...",
      "There's no \"rule\" that you have to do this, but in most cases you do because you want to use values from the middle range of the set...."
    ],
    "correct": 3,
    "explanation": "There's no \"rule\" that you have to do this, but in most cases you do because you want to use values from the middle range of the set. But if the company you're valuing is distressed, is not performing well, or is at a competitive disadvantage, you might use the 25th percentile or something in the lower range instead - and vice versa if it's doing well."
  },
  {
    "id": 251,
    "category": "Valuation - Basic",
    "difficulty": "de",
    "question": "You mentioned that Precedent Transactions usually produce a higher value than Comparable Companies - can you think of a situation where this is not the case?",
    "options": [
      "This could happen for a number of reasons: • The company has just reported earnings well-above expectations and its stock price has risen recently. • It has some type of competitive advantage not reflected in its financials, such as a key patent or other intellectual property. •...",
      "This is most often used when a company has completely different, unrelated divisions - a conglomerate like General Electric, for example....",
      "Sometimes this happens when there is a substantial mismatch between the M&A market and the public market....",
      "Usually you use it in pitch books and in client presentations when you're providing updates and telling them what they should expect for their own valuation...."
    ],
    "correct": 2,
    "explanation": "Sometimes this happens when there is a substantial mismatch between the M&A market and the public market. For example, no public companies have been acquired recently but there have been a lot of small private companies acquired at extremely low valuations. For the most part this generalization is true but keep in mind that there are exceptions to almost every \"rule\" in finance."
  },
  {
    "id": 252,
    "category": "Valuation - Basic",
    "difficulty": "de",
    "question": "What are some flaws with precedent transactions?",
    "options": [
      "Usually you use it in pitch books and in client presentations when you're providing updates and telling them what they should expect for their own valuation....",
      "The 3 main ways to select companies and transactions: 1. Industry classification 2....",
      "• Past transactions are rarely 100% comparable - the transaction structure, size of the company, and market sentiment all have huge effects. • Data on precedent transactions is generally more difficult to find than it is for public company comparables, especially for acquisitions...",
      "You use the same methodologies as with public companies: public company comparables, precedent transactions, and DCF...."
    ],
    "correct": 2,
    "explanation": "• Past transactions are rarely 100% comparable - the transaction structure, size of the company, and market sentiment all have huge effects. • Data on precedent transactions is generally more difficult to find than it is for public company comparables, especially for acquisitions of small private companies."
  },
  {
    "id": 253,
    "category": "Valuation - Basic",
    "difficulty": "de",
    "question": "Two companies have the exact same financial profile and are bought by the same acquirer, but the EBITDA multiple for one transaction is twice the multiple of the other transaction - how could this happen?",
    "options": [
      "This is highly unusual, but it could happen if a company had substantial hard assets but the market was severely undervaluing it for a specific reason (such as an earnings miss or cyclicality)....",
      "Trick question. For Unlevered Free Cash Flow, you would use Enterprise Value, but for Levered Free Cash Flow you would use Equity Value. Remember, Unlevered Free Cash Flow excludes Interest and thus represents money available to all investors, whereas Levered...",
      "Possible reasons: 1. One process was more competitive and had a lot more companies bidding on the target. 2. One company had recent bad news or a depressed stock price so it was acquired at a discount. 3. They were in industries with different median multiples...",
      "There's no \"rule\" that you have to do this, but in most cases you do because you want to use values from the middle range of the set...."
    ],
    "correct": 2,
    "explanation": "Possible reasons: 1. One process was more competitive and had a lot more companies bidding on the target. 2. One company had recent bad news or a depressed stock price so it was acquired at a discount. 3. They were in industries with different median multiples."
  },
  {
    "id": 254,
    "category": "Valuation - Basic",
    "difficulty": "de",
    "question": "Why does Warren Buffett prefer EBIT multiples to EBITDA multiples?",
    "options": [
      "Warren Buffett once famously said, \"Does management think the tooth fairy pays for capital expenditures?\" He dislikes EBITDA because it excludes the often sizable Capital Expenditures companies make and hides how much cash they are actually using to finance their operations....",
      "This could happen for a number of reasons: • The company has just reported earnings well-above expectations and its stock price has risen recently. • It has some type of competitive advantage not reflected in its financials, such as a key patent or other intellectual property. •...",
      "Trick question. For Unlevered Free Cash Flow, you would use Enterprise Value, but for Levered Free Cash Flow you would use Equity Value. Remember, Unlevered Free Cash Flow excludes Interest and thus represents money available to all investors, whereas Levered...",
      "• No company is 100% comparable to another company. • The stock market is \"emotional\" - your multiples might be dramatically higher or lower on certain dates depending on the market's movements. • Share prices for small companies with thinly-traded stocks may not reflect their fu..."
    ],
    "correct": 0,
    "explanation": "Warren Buffett once famously said, \"Does management think the tooth fairy pays for capital expenditures?\" He dislikes EBITDA because it excludes the often sizable Capital Expenditures companies make and hides how much cash they are actually using to finance their operations. In some industries there is also a large gap between EBIT and EBITDA - anything that is very capital-intensive, for example, will show a big disparity."
  },
  {
    "id": 255,
    "category": "Valuation - Basic",
    "difficulty": "de",
    "question": "The EV / EBIT, EV / EBITDA, and P / E multiples all measure a company's profitability. What's the difference between them, and when do you use each one?",
    "options": [
      "dollar amounts and everything else is held constant. You would pay more for the one where you lease the machines....",
      "P / E depends on the company's capital structure whereas EV / EBIT and EV / EBITDA are capital structure-neutral....",
      "The 3 main ways to select companies and transactions: 1. Industry classification 2....",
      "Sometimes this simple fact gets lost in discussion of Valuation methodologies. You take the median multiple of a set of companies or transactions, and then multiply it by the relevant metric from the company you're valuing...."
    ],
    "correct": 1,
    "explanation": "P / E depends on the company's capital structure whereas EV / EBIT and EV / EBITDA are capital structure-neutral. Therefore, you use P / E for banks, financial institutions, and other companies where interest payments / expenses are critical. EV / EBIT includes Depreciation & Amortization whereas EV / EBITDA excludes it - you're more likely to use EV / EBIT in industries where D&A is large and where capital expenditures and fixed assets are important (e.g. manufacturing), and EV / EBITDA in industries where fixed assets are less important and where D&A is comparatively smaller (e.g. Internet companies)."
  },
  {
    "id": 256,
    "category": "Valuation - Basic",
    "difficulty": "de",
    "question": "If you were buying a vending machine business, would you pay a higher multiple for a business where you owned the machines and they depreciated normally, or one in which you leased the machines? The cost of depreciation and lease are the same",
    "options": [
      "dollar amounts and everything else is held constant. You would pay more for the one where you lease the machines....",
      "Possible reasons: 1. One process was more competitive and had a lot more companies bidding on the target. 2. One company had recent bad news or a depressed stock price so it was acquired at a discount. 3. They were in industries with different median multiples...",
      "Never say never. It's very rare to see this, but sometimes large financial institutions with big cash balances have negative Enterprise Values - so you might use Equity Value / Revenue instead. You might see Equity Value / Revenue if you've listed a set of fin...",
      "There's no discount because with precedent transactions, you're acquiring the entire company - and once it's acquired, the shares immediately become illiquid...."
    ],
    "correct": 0,
    "explanation": "dollar amounts and everything else is held constant. You would pay more for the one where you lease the machines. Enterprise Value would be the same for both companies, but with the depreciated situation the charge is not reflected in EBITDA - so EBITDA is higher, and the EV / EBITDA multiple is lower as a result. For the leased situation, the lease would show up in SG&A so it would be reflected in EBITDA, making EBITDA lower and the EV / EBITDA multiple higher."
  },
  {
    "id": 257,
    "category": "Valuation - Basic",
    "difficulty": "de",
    "question": "How do you value a private company?",
    "options": [
      "You use the same methodologies as with public companies: public company comparables, precedent transactions, and DCF....",
      "Comparable Companies, Precedent Transactions and Discounted Cash Flow Analysis.",
      "You would use Comparable Companies and Precedent Transactions and look at more \"creative\" multiples such as EV/Unique Visitors and EV/Pageviews rather than EV/Revenue or EV/EBITDA....",
      "The 3 main ways to select companies and transactions: 1. Industry classification 2...."
    ],
    "correct": 0,
    "explanation": "You use the same methodologies as with public companies: public company comparables, precedent transactions, and DCF. But there are some differences: • You might apply a 10-15% (or more) discount to the public company comparable multiples because the private company you're valuing is not as \"liquid\" as the public comps. • You can't use a premiums analysis or future share price analysis because a private company doesn't have a share price. • Your valuation shows the Enterprise Value for the company as opposed to the implied per-share price as with public companies. • A DCF gets tricky because a private company doesn't have a market capitalization or Beta - you would probably just estimate WACC based on the public comps' WACC rather than trying to calculate it."
  },
  {
    "id": 258,
    "category": "Valuation - Basic",
    "difficulty": "de",
    "question": "Let's say we're valuing a private company. Why might we discount the public company comparable multiples but not the precedent transaction multiples?",
    "options": [
      "There's no discount because with precedent transactions, you're acquiring the entire company - and once it's acquired, the shares immediately become illiquid....",
      "Sometimes this happens when there is a substantial mismatch between the M&A market and the public market....",
      "Trick question - there is no ranking that always holds. In general, Precedent Transactions will be higher than Comparable Companies due to the Control Premium built into acquisitions....",
      "Comparable Companies, Precedent Transactions and Discounted Cash Flow Analysis."
    ],
    "correct": 0,
    "explanation": "There's no discount because with precedent transactions, you're acquiring the entire company - and once it's acquired, the shares immediately become illiquid. But shares - the ability to buy individual \"pieces\" of a company rather than the whole thing - can be either liquid (if it's public) or illiquid (if it's private). Since shares of public companies are always more liquid, you would discount public company comparable multiples to account for this."
  },
  {
    "id": 259,
    "category": "Valuation - Basic",
    "difficulty": "de",
    "question": "Can you use private companies as part of your valuation?",
    "options": [
      "Only in the context of precedent transactions - it would make no sense to include them for public company comparables or as part of the Cost of Equity / WACC calculation in a DCF because they are not public and therefore have no values for market cap or Beta.",
      "• Past transactions are rarely 100% comparable - the transaction structure, size of the company, and market sentiment all have huge effects. • Data on precedent transactions is generally more difficult to find than it is for public company comparables, especially for acquisitions...",
      "Technically it could go either way, but in most cases the LBO will give you a lower valuation....",
      "Usually you use it in pitch books and in client presentations when you're providing updates and telling them what they should expect for their own valuation...."
    ],
    "correct": 0,
    "explanation": "Only in the context of precedent transactions - it would make no sense to include them for public company comparables or as part of the Cost of Equity / WACC calculation in a DCF because they are not public and therefore have no values for market cap or Beta."
  },
  {
    "id": 260,
    "category": "Valuation - Advanced",
    "difficulty": "kho",
    "question": "How do you value banks and financial institutions differently from other companies?",
    "options": [
      "You use the same methodologies, except: • You look at industry-specific multiples like P / MCFE and P / NAV in addition to the more standard ones. • You need to project the prices of commodities like oil and natural gas, and also the company's reserves to determine its revenue an...",
      "This varies by bank and group, but two common methods: 1. You pick the report with the most detailed information....",
      "You mostly use the same methodologies, except: • You look at P / E and P / BV (Book Value) multiples rather than EV / Revenue, EV / EBITDA, and other \"normal\" multiples, since banks have unique capital structures. • You pay more attention to bank-specific metrics like NAV (Net As...",
      "The \"formula\" to calendarize financial statements is as follows: TTM = Most Recent Fiscal Year + New Partial Period - Old Partial Period So in the example above, we would take the company's Q1 numbers, add the most recent fiscal year's numbers, and then subtract the Q1 numbers fr..."
    ],
    "correct": 2,
    "explanation": "You mostly use the same methodologies, except: • You look at P / E and P / BV (Book Value) multiples rather than EV / Revenue, EV / EBITDA, and other \"normal\" multiples, since banks have unique capital structures. • You pay more attention to bank-specific metrics like NAV (Net Asset Value) and you might screen companies and precedent transactions based on those instead. • Rather than a DCF, you use a Dividend Discount Model (DDM) which is similar but is based on the present value of the company's dividends rather than its free cash flows. You need to use these methodologies and multiples because interest is a critical component of a bank's revenue and because debt is part of its business model rather than just a way to finance acquisitions or expand the business."
  },
  {
    "id": 261,
    "category": "Valuation - Advanced",
    "difficulty": "kho",
    "question": "Walk me through an IPO valuation for a company that's about to go public.",
    "options": [
      "1. Unlike normal valuations, for an IPO valuation we only care about public company comparables. 2. After picking the public company comparables we decide on the most relevant multiple to use and then estimate our company's Enterprise Value based on that. 3. O...",
      "The purpose of this analysis is to project what a company's share price might be 1 or 2 years from now and then discount it back to its present value....",
      "Similar to energy, real estate is asset-intensive and a company's value depends on how much cash flow specific properties generate. • You look at Price / FFO (Funds From Operations) and Price / AFFO (Adjusted Funds From Operations), which add back Depreciation and subtract gains...",
      "1. Search online and see if you can find press releases or articles in the financial press with these numbers. 2. Failing that, look in equity research for the buyer around the time of the transaction and see if any of the analysts estimate the seller's number..."
    ],
    "correct": 0,
    "explanation": "1. Unlike normal valuations, for an IPO valuation we only care about public company comparables. 2. After picking the public company comparables we decide on the most relevant multiple to use and then estimate our company's Enterprise Value based on that. 3. Once we have the Enterprise Value, we work backward to get to Equity Value and also subtract the IPO proceeds because this is \"new\" cash. 4. Then we divide by the total number of shares (old and newly created) to get its per-share price. When people say \"An IPO priced at…\" this is what they're referring to. If you were using P / E or any other \"Equity Value-based multiple\" for the multiple in step #2 here, then you would get to Equity Value instead and then subtract the IPO proceeds from there."
  },
  {
    "id": 262,
    "category": "Valuation - Advanced",
    "difficulty": "kho",
    "question": "I'm looking at financial data for a public company comparable, and it's April (Q2) right now. Walk me through how you would \"calendarize\" this company's financial statements to show the Trailing Twelve Months as opposed to just the last Fiscal Year.",
    "options": [
      "The \"formula\" to calendarize financial statements is as follows: TTM = Most Recent Fiscal Year + New Partial Period - Old Partial Period So in the example above, we would take the company's Q1 numbers, add the most recent fiscal year's numbers, and then subtract the Q1 numbers fr...",
      "• All the sellers in the M&A premiums analysis must be public. • Usually we use a broader set of transactions for M&A premiums - we might use fewer than 10 precedent transactions but we might have dozens of M&A premiums....",
      "This varies by bank and group, but two common methods: 1. You pick the report with the most detailed information....",
      "1. Search online and see if you can find press releases or articles in the financial press with these numbers. 2. Failing that, look in equity research for the buyer around the time of the transaction and see if any of the analysts estimate the seller's number..."
    ],
    "correct": 0,
    "explanation": "The \"formula\" to calendarize financial statements is as follows: TTM = Most Recent Fiscal Year + New Partial Period - Old Partial Period So in the example above, we would take the company's Q1 numbers, add the most recent fiscal year's numbers, and then subtract the Q1 numbers from that most recent fiscal year. For US companies you can find these quarterly numbers in the 10-Q; for international companies they're in the \"interim\" reports."
  },
  {
    "id": 263,
    "category": "Valuation - Advanced",
    "difficulty": "kho",
    "question": "Walk me through an M&A premiums analysis.",
    "options": [
      "1. Unlike normal valuations, for an IPO valuation we only care about public company comparables. 2. After picking the public company comparables we decide on the most relevant multiple to use and then estimate our company's Enterprise Value based on that. 3. O...",
      "The purpose of this analysis is to look at similar transactions and see the premiums that buyers have paid to sellers' share prices when acquiring them....",
      "You use the same methodologies, except: • You look at industry-specific multiples like P / MCFE and P / NAV in addition to the more standard ones. • You need to project the prices of commodities like oil and natural gas, and also the company's reserves to determine its revenue an...",
      "In a Sum-of-the-Parts analysis, you value each division of a company using separate comparables and transactions, get to separate multiples, and then add up each division's value to get the total for the company...."
    ],
    "correct": 1,
    "explanation": "The purpose of this analysis is to look at similar transactions and see the premiums that buyers have paid to sellers' share prices when acquiring them. For example, if a company is trading at $10.00/share and the buyer acquires it for $15.00/share, that's a 50% premium. 1. First, select the precedent transactions based on industry, date (past 2-3 years for example), and size (example: over $1 billion market cap). 2. For each transaction, get the seller's share price 1 day, 20 days, and 60 days before the transaction was announced (you can also look at even longer intervals, or 30 days, 45 days, etc.). 3. Then, calculate the 1-day premium, 20-day premium, etc. by dividing the per- share purchase price by the appropriate share prices on each day. 4. Get the medians for each set, and then apply them to your company's current share price, share price 20 days ago, etc. to estimate how much of a premium a buyer might pay for it. Note that you only use this analysis when valuing public companies because private companies don't have share prices. Sometimes the set of companies here is exactly the same as your set of precedent transactions but typically it is broader."
  },
  {
    "id": 264,
    "category": "Valuation - Advanced",
    "difficulty": "kho",
    "question": "Walk me through a future share price analysis.",
    "options": [
      "Usually you look at the TTM (Trailing Twelve Months) period for both sets, and then you look forward either 1 or 2 years....",
      "The purpose of this analysis is to project what a company's share price might be 1 or 2 years from now and then discount it back to its present value....",
      "This varies by bank and group, but two common methods: 1. You pick the report with the most detailed information....",
      "1. Unlike normal valuations, for an IPO valuation we only care about public company comparables. 2. After picking the public company comparables we decide on the most relevant multiple to use and then estimate our company's Enterprise Value based on that. 3. O..."
    ],
    "correct": 1,
    "explanation": "The purpose of this analysis is to project what a company's share price might be 1 or 2 years from now and then discount it back to its present value. 1. Get the median historical (usually TTM) P / E of your public company comparables. 2. Apply this P / E multiple to your company's 1-year forward or 2-year forward projected EPS to get its implied future share price. 3. Then, discount this back to its present value by using a discount rate in-line with the company's Cost of Equity figures. You normally look at a range of P / E multiples as well as a range of discount rates for this type of analysis, and make a sensitivity table with these as inputs."
  },
  {
    "id": 265,
    "category": "Valuation - Advanced",
    "difficulty": "kho",
    "question": "Both M&A premiums analysis and precedent transactions involve looking at previous M&A transactions. What's the difference in how we select them?",
    "options": [
      "Usually you look at the TTM (Trailing Twelve Months) period for both sets, and then you look forward either 1 or 2 years....",
      "This varies by bank and group, but two common methods: 1. You pick the report with the most detailed information....",
      "1. Search online and see if you can find press releases or articles in the financial press with these numbers. 2. Failing that, look in equity research for the buyer around the time of the transaction and see if any of the analysts estimate the seller's number...",
      "• All the sellers in the M&A premiums analysis must be public. • Usually we use a broader set of transactions for M&A premiums - we might use fewer than 10 precedent transactions but we might have dozens of M&A premiums...."
    ],
    "correct": 3,
    "explanation": "• All the sellers in the M&A premiums analysis must be public. • Usually we use a broader set of transactions for M&A premiums - we might use fewer than 10 precedent transactions but we might have dozens of M&A premiums. The industry and financial screens are usually less stringent. • Aside from those, the screening criteria is similar - financial, industry, geography, and date."
  },
  {
    "id": 266,
    "category": "Valuation - Advanced",
    "difficulty": "kho",
    "question": "Walk me through a Sum-of-the-Parts analysis.",
    "options": [
      "In a Sum-of-the-Parts analysis, you value each division of a company using separate comparables and transactions, get to separate multiples, and then add up each division's value to get the total for the company....",
      "You mostly use the same methodologies, except: • You look at P / E and P / BV (Book Value) multiples rather than EV / Revenue, EV / EBITDA, and other \"normal\" multiples, since banks have unique capital structures. • You pay more attention to bank-specific metrics like NAV (Net As...",
      "You use the same methodologies, except: • You look at industry-specific multiples like P / MCFE and P / NAV in addition to the more standard ones. • You need to project the prices of commodities like oil and natural gas, and also the company's reserves to determine its revenue an...",
      "• All the sellers in the M&A premiums analysis must be public. • Usually we use a broader set of transactions for M&A premiums - we might use fewer than 10 precedent transactions but we might have dozens of M&A premiums...."
    ],
    "correct": 0,
    "explanation": "In a Sum-of-the-Parts analysis, you value each division of a company using separate comparables and transactions, get to separate multiples, and then add up each division's value to get the total for the company. Example: We have a manufacturing division with $100 million EBITDA, an entertainment division with $50 million EBITDA and a consumer goods division with $75 million EBITDA. We've selected comparable companies and transactions for each division, and the median multiples come out to 5x EBITDA for manufacturing, 8x EBITDA for entertainment, and 4x EBITDA for consumer goods. Our calculation would be $100 * 5x + $50 * 8x + $75 * 4x = $1.2 billion for the company's total value."
  },
  {
    "id": 267,
    "category": "Valuation - Advanced",
    "difficulty": "kho",
    "question": "How do you value Net Operating Losses and take them into account in a valuation?",
    "options": [
      "• All the sellers in the M&A premiums analysis must be public. • Usually we use a broader set of transactions for M&A premiums - we might use fewer than 10 precedent transactions but we might have dozens of M&A premiums....",
      "You value NOLs based on how much they'll save the company in taxes in future years, and then take the present value of the sum of tax savings in future years....",
      "This varies by bank and group, but two common methods: 1. You pick the report with the most detailed information....",
      "The purpose of this analysis is to project what a company's share price might be 1 or 2 years from now and then discount it back to its present value...."
    ],
    "correct": 1,
    "explanation": "You value NOLs based on how much they'll save the company in taxes in future years, and then take the present value of the sum of tax savings in future years. Two ways to assess the tax savings in future years: 1. Assume that a company can use its NOLs to completely offset its taxable income until the NOLs run out. 2. In an acquisition scenario, use Section 382 and multiply the adjusted long-term rate (http://pmstax.com/afr/exemptAFR.shtml) by the equity purchase price of the seller to determine the maximum allowed NOL usage in each year - and then use that to figure out the offset to taxable income. You might look at NOLs in a valuation but you rarely add them in - if you did, they would be similar to cash and you would subtract NOLs to go from Equity Value to Enterprise Value, and vice versa."
  },
  {
    "id": 268,
    "category": "Valuation - Advanced",
    "difficulty": "kho",
    "question": "I have a set of public company comparables and need to get the projections from equity research. How do I select which report to use?",
    "options": [
      "This varies by bank and group, but two common methods: 1. You pick the report with the most detailed information....",
      "Similar to energy, real estate is asset-intensive and a company's value depends on how much cash flow specific properties generate. • You look at Price / FFO (Funds From Operations) and Price / AFFO (Adjusted Funds From Operations), which add back Depreciation and subtract gains...",
      "1. Unlike normal valuations, for an IPO valuation we only care about public company comparables. 2. After picking the public company comparables we decide on the most relevant multiple to use and then estimate our company's Enterprise Value based on that. 3. O...",
      "Usually you look at the TTM (Trailing Twelve Months) period for both sets, and then you look forward either 1 or 2 years...."
    ],
    "correct": 0,
    "explanation": "This varies by bank and group, but two common methods: 1. You pick the report with the most detailed information. 2. You pick the report with numbers in the middle of the range. Note that you do not pick reports based on which bank they're coming from. So if you're at Goldman Sachs, you would not pick all Goldman Sachs equity research - in fact that would be bad because then your valuation would not be objective."
  },
  {
    "id": 269,
    "category": "Valuation - Advanced",
    "difficulty": "kho",
    "question": "I have a set of precedent transactions but I'm missing information like EBITDA for a lot of the companies - how can I find it if it's not available via public sources?",
    "options": [
      "1. Search online and see if you can find press releases or articles in the financial press with these numbers. 2. Failing that, look in equity research for the buyer around the time of the transaction and see if any of the analysts estimate the seller's number...",
      "This varies by bank and group, but two common methods: 1. You pick the report with the most detailed information....",
      "The purpose of this analysis is to project what a company's share price might be 1 or 2 years from now and then discount it back to its present value....",
      "The purpose of this analysis is to look at similar transactions and see the premiums that buyers have paid to sellers' share prices when acquiring them...."
    ],
    "correct": 0,
    "explanation": "1. Search online and see if you can find press releases or articles in the financial press with these numbers. 2. Failing that, look in equity research for the buyer around the time of the transaction and see if any of the analysts estimate the seller's numbers. 3. Also look on online sources like Capital IQ and Factset and see if any of them disclose numbers or give estimates."
  },
  {
    "id": 270,
    "category": "Valuation - Advanced",
    "difficulty": "kho",
    "question": "How far back and forward do we usually go for public company comparable and precedent transaction multiples?",
    "options": [
      "Usually you look at the TTM (Trailing Twelve Months) period for both sets, and then you look forward either 1 or 2 years....",
      "Similar to energy, real estate is asset-intensive and a company's value depends on how much cash flow specific properties generate. • You look at Price / FFO (Funds From Operations) and Price / AFFO (Adjusted Funds From Operations), which add back Depreciation and subtract gains...",
      "1. Search online and see if you can find press releases or articles in the financial press with these numbers. 2. Failing that, look in equity research for the buyer around the time of the transaction and see if any of the analysts estimate the seller's number...",
      "You value NOLs based on how much they'll save the company in taxes in future years, and then take the present value of the sum of tax savings in future years...."
    ],
    "correct": 0,
    "explanation": "Usually you look at the TTM (Trailing Twelve Months) period for both sets, and then you look forward either 1 or 2 years. You're more likely to look backward more than 1 year and go forward more than 2 years for public company comparables; for precedent transactions it's odd to go forward more than 1 year because your information is more limited."
  },
  {
    "id": 271,
    "category": "Valuation - Advanced",
    "difficulty": "kho",
    "question": "I have one company with a 40% EBITDA margin trading at 8x EBITDA, and another company with a 10% EBITDA margin trading at 16x EBITDA. What's the problem with comparing these two valuations directly?",
    "options": [
      "There's no \"rule\" that says this is wrong or not allowed, but it can be misleading to compare companies with dramatically different margins....",
      "You use the same methodologies, except: • You look at industry-specific multiples like P / MCFE and P / NAV in addition to the more standard ones. • You need to project the prices of commodities like oil and natural gas, and also the company's reserves to determine its revenue an...",
      "1. Unlike normal valuations, for an IPO valuation we only care about public company comparables. 2. After picking the public company comparables we decide on the most relevant multiple to use and then estimate our company's Enterprise Value based on that. 3. O...",
      "Similar to energy, real estate is asset-intensive and a company's value depends on how much cash flow specific properties generate. • You look at Price / FFO (Funds From Operations) and Price / AFFO (Adjusted Funds From Operations), which add back Depreciation and subtract gains..."
    ],
    "correct": 0,
    "explanation": "There's no \"rule\" that says this is wrong or not allowed, but it can be misleading to compare companies with dramatically different margins. Due to basic arithmetic, the 40% margin company will usually have a lower multiple - whether or not its actual value is lower. In this situation, we might consider screening based on margins and remove the outliers - you would never try to \"normalize\" the EBITDA multiples based on margins."
  },
  {
    "id": 272,
    "category": "Valuation - Advanced",
    "difficulty": "kho",
    "question": "Walk me through how we might value an oil & gas company and how it's different from a \"standard\" company.",
    "options": [
      "The purpose of this analysis is to look at similar transactions and see the premiums that buyers have paid to sellers' share prices when acquiring them....",
      "The purpose of this analysis is to project what a company's share price might be 1 or 2 years from now and then discount it back to its present value....",
      "• All the sellers in the M&A premiums analysis must be public. • Usually we use a broader set of transactions for M&A premiums - we might use fewer than 10 precedent transactions but we might have dozens of M&A premiums....",
      "You use the same methodologies, except: • You look at industry-specific multiples like P / MCFE and P / NAV in addition to the more standard ones. • You need to project the prices of commodities like oil and natural gas, and also the company's reserves to determine its revenue an..."
    ],
    "correct": 3,
    "explanation": "You use the same methodologies, except: • You look at industry-specific multiples like P / MCFE and P / NAV in addition to the more standard ones. • You need to project the prices of commodities like oil and natural gas, and also the company's reserves to determine its revenue and cash flows in future years. • Rather than a DCF, you use a NAV (Net Asset Value) model - it's similar, but everything flows from the company's reserves rather than simple revenue growth / EBITDA margin projections. In addition to all of the above, there are also some accounting complications with energy companies and you need to think about what a \"proven\" reserve is vs. what is more speculative."
  },
  {
    "id": 273,
    "category": "Valuation - Advanced",
    "difficulty": "kho",
    "question": "Walk me through how we would value a REIT (Real Estate Investment Trust) and how it differs from a \"normal\" company.",
    "options": [
      "Similar to energy, real estate is asset-intensive and a company's value depends on how much cash flow specific properties generate. • You look at Price / FFO (Funds From Operations) and Price / AFFO (Adjusted Funds From Operations), which add back Depreciation and subtract gains...",
      "The purpose of this analysis is to project what a company's share price might be 1 or 2 years from now and then discount it back to its present value....",
      "This varies by bank and group, but two common methods: 1. You pick the report with the most detailed information....",
      "The purpose of this analysis is to look at similar transactions and see the premiums that buyers have paid to sellers' share prices when acquiring them...."
    ],
    "correct": 0,
    "explanation": "Similar to energy, real estate is asset-intensive and a company's value depends on how much cash flow specific properties generate. • You look at Price / FFO (Funds From Operations) and Price / AFFO (Adjusted Funds From Operations), which add back Depreciation and subtract gains on property sales; NAV (Net Asset Value) is also important. • You value properties by dividing Net Operating Income (NOI) (Property's Gross Income - Operating Expenses) by the capitalization rate (based on market data). • Replacement Valuation is more common because you can actually estimate the cost of buying new land and building new properties. • A DCF is still a DCF, but it flows from specific properties and it might be useless depending on what kind of company you're valuing."
  },
  {
    "id": 274,
    "category": "Discounted Cash Flow - Basic",
    "difficulty": "de",
    "question": "Walk me through a DCF.",
    "options": [
      "\"A DCF values a company based on the Present Value of its Cash Flows and the Present Value of its Terminal Value....",
      "Example sensitivities: • Revenue Growth vs. Terminal Multiple • EBITDA Margin vs....",
      "Levered Free Cash Flow gives you Equity Value rather than Enterprise Value, since the cash flow is only available to equity investors (debt investors have already been \"paid\" with the interest payments).",
      "Normally you use the country's long-term GDP growth rate, the rate of inflation, or something similarly conservative...."
    ],
    "correct": 0,
    "explanation": "\"A DCF values a company based on the Present Value of its Cash Flows and the Present Value of its Terminal Value. First, you project out a company's financials using assumptions for revenue growth, expenses and Working Capital; then you get down to Free Cash Flow for each year, which you then sum up and discount to a Net Present Value, based on your discount rate - usually the Weighted Average Cost of Capital. Once you have the present value of the Cash Flows, you determine the company's Terminal Value, using either the Multiples Method or the Gordon Growth Method, and then also discount that back to its Net Present Value using WACC. Finally, you add the two together to determine the company's Enterprise Value.\""
  },
  {
    "id": 275,
    "category": "Discounted Cash Flow - Basic",
    "difficulty": "de",
    "question": "Walk me through how you get from Revenue to Free Cash Flow in the projections.",
    "options": [
      "Banks use debt differently than other companies and do not re-invest it in the business - they use it to create products instead....",
      "Subtract COGS and Operating Expenses to get to Operating Income (EBIT). Then, multiply by (1 - Tax Rate), add back Depreciation and other non-cash charges, and subtract Capital Expenditures and the change in Working Capital....",
      "It should be higher for the $500 million company, because all else being equal, smaller companies are expected to outperform large companies in the stock market (and therefore be \"more risky\")....",
      "You should start by saying, \"it depends\" but most of the time the 10% difference in revenue will have more of an impact...."
    ],
    "correct": 1,
    "explanation": "Subtract COGS and Operating Expenses to get to Operating Income (EBIT). Then, multiply by (1 - Tax Rate), add back Depreciation and other non-cash charges, and subtract Capital Expenditures and the change in Working Capital. Note: This gets you to Unlevered Free Cash Flow since you went off EBIT rather than EBT. You might want to confirm that this is what the interviewer is asking for."
  },
  {
    "id": 276,
    "category": "Discounted Cash Flow - Basic",
    "difficulty": "de",
    "question": "What's an alternate way to calculate Free Cash Flow aside from taking Net Income, adding back Depreciation, and subtracting Changes in Operating Assets / Liabilities and CapEx?",
    "options": [
      "Take Cash Flow From Operations and subtract CapEx - that gets you to Levered Cash Flow....",
      "A technology company, because technology is viewed as a \"riskier\" industry than manufacturing.",
      "Normally you use WACC (Weighted Average Cost of Capital), though you might also use Cost of Equity depending on how you've set up the DCF.",
      "You can either apply an exit multiple to the company's Year 5 EBITDA, EBIT or Free Cash Flow (Multiples Method) or you can use the Gordon Growth method to estimate its value based on its growth rate into perpetuity...."
    ],
    "correct": 0,
    "explanation": "Take Cash Flow From Operations and subtract CapEx - that gets you to Levered Cash Flow. To get to Unlevered Cash Flow, you then need to add back the tax-adjusted Interest Expense and subtract the tax-adjusted Interest Income."
  },
  {
    "id": 277,
    "category": "Discounted Cash Flow - Basic",
    "difficulty": "de",
    "question": "Why do you use 5 or 10 years for DCF projections?",
    "options": [
      "Again, keep in mind our \"apples-to-apples\" theme. When you look up the Betas on Bloomberg (or from whatever source you're using) they will be levered to reflect the debt already assumed by each company....",
      "This is a bit of a trick question because it depends on whether or not the capital structure is the same for both companies....",
      "That's usually about as far as you can reasonably predict into the future. Less than 5 years would be too short to be useful, and over 10 years is too difficult to predict for most companies.",
      "You can either apply an exit multiple to the company's Year 5 EBITDA, EBIT or Free Cash Flow (Multiples Method) or you can use the Gordon Growth method to estimate its value based on its growth rate into perpetuity...."
    ],
    "correct": 2,
    "explanation": "That's usually about as far as you can reasonably predict into the future. Less than 5 years would be too short to be useful, and over 10 years is too difficult to predict for most companies."
  },
  {
    "id": 278,
    "category": "Discounted Cash Flow - Basic",
    "difficulty": "de",
    "question": "What do you usually use for the discount rate?",
    "options": [
      "You would use the Cost of Equity rather than WACC since we're not concerned with Debt or Preferred Stock in this case - we're calculating Equity Value, not Enterprise Value.",
      "Normally you use WACC (Weighted Average Cost of Capital), though you might also use Cost of Equity depending on how you've set up the DCF.",
      "Banks use debt differently than other companies and do not re-invest it in the business - they use it to create products instead....",
      "Take Cash Flow From Operations and subtract CapEx - that gets you to Levered Cash Flow...."
    ],
    "correct": 1,
    "explanation": "Normally you use WACC (Weighted Average Cost of Capital), though you might also use Cost of Equity depending on how you've set up the DCF."
  },
  {
    "id": 279,
    "category": "Discounted Cash Flow - Basic",
    "difficulty": "de",
    "question": "How do you calculate WACC?",
    "options": [
      "The formula is: Cost of Equity * (% Equity) + Cost of Debt * (% Debt) * (1 - Tax Rate) + Cost of Preferred * (% Preferred)....",
      "You can either apply an exit multiple to the company's Year 5 EBITDA, EBIT or Free Cash Flow (Multiples Method) or you can use the Gordon Growth method to estimate its value based on its growth rate into perpetuity....",
      "Take Cash Flow From Operations and subtract CapEx - that gets you to Levered Cash Flow....",
      "In this case the discount rate is likely to have a bigger impact on the valuation, though the correct answer should start with, \"It could go either way, but most of the time…\""
    ],
    "correct": 0,
    "explanation": "The formula is: Cost of Equity * (% Equity) + Cost of Debt * (% Debt) * (1 - Tax Rate) + Cost of Preferred * (% Preferred). In all cases, the percentages refer to how much of the company's capital structure is taken up by each component. For Cost of Equity, you can use the Capital Asset Pricing Model (CAPM - see the next question) and for the others you usually look at comparable companies/debt issuances and the interest rates and yields issued by similar companies to get estimates."
  },
  {
    "id": 280,
    "category": "Discounted Cash Flow - Basic",
    "difficulty": "de",
    "question": "How do you calculate the Cost of Equity?",
    "options": [
      "More debt means that the company is more risky, so the company's Levered Beta will be higher - all else being equal, additional debt would raise the Cost of Equity, and less debt would lower the Cost of Equity.",
      "\"A DCF values a company based on the Present Value of its Cash Flows and the Present Value of its Terminal Value....",
      "The \"standard\" answer: if significantly more than 50% of the company's Enterprise Value comes from its Terminal Value, your DCF is probably too dependent on future assumptions....",
      "Cost of Equity = Risk-Free Rate + Beta * Equity Risk Premium The risk-free rate represents how much a 10-year or 20-year US Treasury should yield; Beta is calculated based on the \"riskiness\" of Comparable Companies and the Equity Risk Premium is the % by which stocks are expected..."
    ],
    "correct": 3,
    "explanation": "Cost of Equity = Risk-Free Rate + Beta * Equity Risk Premium The risk-free rate represents how much a 10-year or 20-year US Treasury should yield; Beta is calculated based on the \"riskiness\" of Comparable Companies and the Equity Risk Premium is the % by which stocks are expected to out-perform \"risk-less\" assets. Normally you pull the Equity Risk Premium from a publication called Ibbotson's. Note: This formula does not tell the whole story. Depending on the bank and how precise you want to be, you could also add in a \"size premium\" and \"industry premium\" to account for how much a company is expected to out-perform its peers is according to its market cap or industry. Small company stocks are expected to out-perform large company stocks and certain industries are expected to out-perform others, and these premiums reflect these expectations."
  },
  {
    "id": 281,
    "category": "Discounted Cash Flow - Basic",
    "difficulty": "de",
    "question": "How do you get to Beta in the Cost of Equity calculation?",
    "options": [
      "You can take a few different approaches: • You can create your own projections. • You can modify management's projections downward to make them more conservative. • You can show a sensitivity table based on different growth rates and margins and show the values assuming managemen...",
      "dividend yield into the formula? Trick question. Dividend yields are already factored into Beta, because Beta describes returns in excess of the market as a whole - and those returns include dividends.",
      "You look up the Beta for each Comparable Company (usually on Bloomberg), un-lever each one, take the median of the set and then lever it based on your company's capital structure....",
      "Again, keep in mind our \"apples-to-apples\" theme. When you look up the Betas on Bloomberg (or from whatever source you're using) they will be levered to reflect the debt already assumed by each company...."
    ],
    "correct": 2,
    "explanation": "You look up the Beta for each Comparable Company (usually on Bloomberg), un-lever each one, take the median of the set and then lever it based on your company's capital structure. Then you use this Levered Beta in the Cost of Equity calculation. For your reference, the formulas for un-levering and re-levering Beta are below: Un-Levered Beta = Levered Beta / (1 + ((1 - Tax Rate) x (Total Debt/Equity))) Levered Beta = Un-Levered Beta x (1 + ((1 - Tax Rate) x (Total Debt/Equity)))"
  },
  {
    "id": 282,
    "category": "Discounted Cash Flow - Basic",
    "difficulty": "de",
    "question": "Why do you have to un-lever and re-lever Beta?",
    "options": [
      "Take Cash Flow From Operations and subtract CapEx - that gets you to Levered Cash Flow....",
      "This is problematic because private companies don't have market caps or Betas. In this case you would most likely just estimate WACC based on work done by auditors or valuation specialists, or based on what WACC for comparable public companies is.",
      "Again, keep in mind our \"apples-to-apples\" theme. When you look up the Betas on Bloomberg (or from whatever source you're using) they will be levered to reflect the debt already assumed by each company....",
      "It should be higher for the $500 million company, because all else being equal, smaller companies are expected to outperform large companies in the stock market (and therefore be \"more risky\")...."
    ],
    "correct": 2,
    "explanation": "Again, keep in mind our \"apples-to-apples\" theme. When you look up the Betas on Bloomberg (or from whatever source you're using) they will be levered to reflect the debt already assumed by each company. But each company's capital structure is different and we want to look at how \"risky\" a company is regardless of what % debt or equity it has. To get that, we need to un-lever Beta each time. But at the end of the calculation, we need to re-lever it because we want the Beta used in the Cost of Equity calculation to reflect the true risk of our company, taking into account its capital structure this time."
  },
  {
    "id": 283,
    "category": "Discounted Cash Flow - Basic",
    "difficulty": "de",
    "question": "Would you expect a manufacturing company or a technology company to have a higher Beta?",
    "options": [
      "More debt means that the company is more risky, so the company's Levered Beta will be higher - all else being equal, additional debt would raise the Cost of Equity, and less debt would lower the Cost of Equity.",
      "That's usually about as far as you can reasonably predict into the future. Less than 5 years would be too short to be useful, and over 10 years is too difficult to predict for most companies.",
      "Banks use debt differently than other companies and do not re-invest it in the business - they use it to create products instead....",
      "A technology company, because technology is viewed as a \"riskier\" industry than manufacturing."
    ],
    "correct": 3,
    "explanation": "A technology company, because technology is viewed as a \"riskier\" industry than manufacturing."
  },
  {
    "id": 284,
    "category": "Discounted Cash Flow - Basic",
    "difficulty": "de",
    "question": "Let's say that you use Levered Free Cash Flow rather than Unlevered Free Cash Flow in your DCF - what is the effect?",
    "options": [
      "Levered Free Cash Flow gives you Equity Value rather than Enterprise Value, since the cash flow is only available to equity investors (debt investors have already been \"paid\" with the interest payments).",
      "Again, keep in mind our \"apples-to-apples\" theme. When you look up the Betas on Bloomberg (or from whatever source you're using) they will be levered to reflect the debt already assumed by each company....",
      "Example sensitivities: • Revenue Growth vs. Terminal Multiple • EBITDA Margin vs....",
      "You would use the Cost of Equity rather than WACC since we're not concerned with Debt or Preferred Stock in this case - we're calculating Equity Value, not Enterprise Value."
    ],
    "correct": 0,
    "explanation": "Levered Free Cash Flow gives you Equity Value rather than Enterprise Value, since the cash flow is only available to equity investors (debt investors have already been \"paid\" with the interest payments)."
  },
  {
    "id": 285,
    "category": "Discounted Cash Flow - Basic",
    "difficulty": "de",
    "question": "If you use Levered Free Cash Flow, what should you use as the Discount Rate?",
    "options": [
      "It should be higher for the $500 million company, because all else being equal, smaller companies are expected to outperform large companies in the stock market (and therefore be \"more risky\")....",
      "More debt means that the company is more risky, so the company's Levered Beta will be higher - all else being equal, additional debt would raise the Cost of Equity, and less debt would lower the Cost of Equity.",
      "\"A DCF values a company based on the Present Value of its Cash Flows and the Present Value of its Terminal Value....",
      "You would use the Cost of Equity rather than WACC since we're not concerned with Debt or Preferred Stock in this case - we're calculating Equity Value, not Enterprise Value."
    ],
    "correct": 3,
    "explanation": "You would use the Cost of Equity rather than WACC since we're not concerned with Debt or Preferred Stock in this case - we're calculating Equity Value, not Enterprise Value."
  },
  {
    "id": 286,
    "category": "Discounted Cash Flow - Basic",
    "difficulty": "de",
    "question": "How do you calculate the Terminal Value?",
    "options": [
      "You can either apply an exit multiple to the company's Year 5 EBITDA, EBIT or Free Cash Flow (Multiples Method) or you can use the Gordon Growth method to estimate its value based on its growth rate into perpetuity....",
      "There is an alternate formula: Cost of Equity = (Dividends per Share / Share Price) + Growth Rate of Dividends This is less common than the \"standard\" formula but sometimes you use it for companies where dividends are more important or when you lack proper information on Beta and...",
      "In banking, you almost always use the Multiples Method to calculate Terminal Value in a DCF....",
      "Trick question. You don't account for this at all in a DCF, because paying off debt principal shows up in Cash Flow from Financing on the Cash Flow Statement - but we only go down to Cash Flow from Operations and then subtract Capital Expenditures to get to Fr..."
    ],
    "correct": 0,
    "explanation": "You can either apply an exit multiple to the company's Year 5 EBITDA, EBIT or Free Cash Flow (Multiples Method) or you can use the Gordon Growth method to estimate its value based on its growth rate into perpetuity. The formula for Terminal Value using Gordon Growth is: Terminal Value = Year 5 Free Cash Flow * (1 + Growth Rate) / (Discount Rate - Growth Rate)."
  },
  {
    "id": 287,
    "category": "Discounted Cash Flow - Basic",
    "difficulty": "de",
    "question": "Why would you use Gordon Growth rather than the Multiples Method to calculate the Terminal Value?",
    "options": [
      "Banks use debt differently than other companies and do not re-invest it in the business - they use it to create products instead....",
      "In banking, you almost always use the Multiples Method to calculate Terminal Value in a DCF....",
      "Normally you use WACC (Weighted Average Cost of Capital), though you might also use Cost of Equity depending on how you've set up the DCF.",
      "Normally you look at the Comparable Companies and pick the median of the set, or something close to it...."
    ],
    "correct": 1,
    "explanation": "In banking, you almost always use the Multiples Method to calculate Terminal Value in a DCF. It's much easier to get appropriate data for exit multiples since they are based on Comparable Companies - picking a long-term growth rate, by contrast, is always a shot in the dark. However, you might use Gordon Growth if you have no good Comparable Companies or if you have reason to believe that multiples will change significantly in the industry several years down the road. For example, if an industry is very cyclical you might be better off using long-term growth rates rather than exit multiples."
  },
  {
    "id": 288,
    "category": "Discounted Cash Flow - Basic",
    "difficulty": "de",
    "question": "What's an appropriate growth rate to use when calculating the Terminal Value?",
    "options": [
      "Normally you use the country's long-term GDP growth rate, the rate of inflation, or something similarly conservative....",
      "You look up the Beta for each Comparable Company (usually on Bloomberg), un-lever each one, take the median of the set and then lever it based on your company's capital structure....",
      "It's hard to generalize because both are highly dependent on the assumptions you make....",
      "You would use the Cost of Equity rather than WACC since we're not concerned with Debt or Preferred Stock in this case - we're calculating Equity Value, not Enterprise Value."
    ],
    "correct": 0,
    "explanation": "Normally you use the country's long-term GDP growth rate, the rate of inflation, or something similarly conservative. For companies in mature economies, a long-term growth rate over 5% would be quite aggressive since most developed economies are growing at less than 5% per year."
  },
  {
    "id": 289,
    "category": "Discounted Cash Flow - Basic",
    "difficulty": "de",
    "question": "How do you select the appropriate exit multiple when calculating Terminal Value?",
    "options": [
      "Normally you look at the Comparable Companies and pick the median of the set, or something close to it....",
      "The \"standard\" answer: if significantly more than 50% of the company's Enterprise Value comes from its Terminal Value, your DCF is probably too dependent on future assumptions....",
      "Cost of Equity = Risk-Free Rate + Beta * Equity Risk Premium The risk-free rate represents how much a 10-year or 20-year US Treasury should yield; Beta is calculated based on the \"riskiness\" of Comparable Companies and the Equity Risk Premium is the % by which stocks are expected...",
      "This is problematic because private companies don't have market caps or Betas. In this case you would most likely just estimate WACC based on work done by auditors or valuation specialists, or based on what WACC for comparable public companies is."
    ],
    "correct": 0,
    "explanation": "Normally you look at the Comparable Companies and pick the median of the set, or something close to it. As with almost anything else in finance, you always show a range of exit multiples and what the Terminal Value looks like over that range rather than picking one specific number. So if the median EBITDA multiple of the set were 8x, you might show a range of values using multiples from 6x to 10x."
  },
  {
    "id": 290,
    "category": "Discounted Cash Flow - Basic",
    "difficulty": "de",
    "question": "Which method of calculating Terminal Value will give you a higher valuation?",
    "options": [
      "dividend yield into the formula? Trick question. Dividend yields are already factored into Beta, because Beta describes returns in excess of the market as a whole - and those returns include dividends.",
      "It's hard to generalize because both are highly dependent on the assumptions you make....",
      "It should be higher for the $500 million company, because all else being equal, smaller companies are expected to outperform large companies in the stock market (and therefore be \"more risky\")....",
      "Take Cash Flow From Operations and subtract CapEx - that gets you to Levered Cash Flow...."
    ],
    "correct": 1,
    "explanation": "It's hard to generalize because both are highly dependent on the assumptions you make. In general, the Multiples Method will be more variable than the Gordon Growth method because exit multiples tend to span a wider range than possible long-term growth rates."
  },
  {
    "id": 291,
    "category": "Discounted Cash Flow - Basic",
    "difficulty": "de",
    "question": "What's the flaw with basing terminal multiples on what public company comparables are trading at?",
    "options": [
      "The median multiples may change greatly in the next 5-10 years so it may no longer be accurate by the end of the period you're looking at....",
      "You can either apply an exit multiple to the company's Year 5 EBITDA, EBIT or Free Cash Flow (Multiples Method) or you can use the Gordon Growth method to estimate its value based on its growth rate into perpetuity....",
      "You can take a few different approaches: • You can create your own projections. • You can modify management's projections downward to make them more conservative. • You can show a sensitivity table based on different growth rates and margins and show the values assuming managemen...",
      "Trick question. You don't account for this at all in a DCF, because paying off debt principal shows up in Cash Flow from Financing on the Cash Flow Statement - but we only go down to Cash Flow from Operations and then subtract Capital Expenditures to get to Fr..."
    ],
    "correct": 0,
    "explanation": "The median multiples may change greatly in the next 5-10 years so it may no longer be accurate by the end of the period you're looking at. This is why you normally look at a wide range of multiples and do a sensitivity to see how the valuation changes over that range. This method is particularly problematic with cyclical industries (e.g. semiconductors)."
  },
  {
    "id": 292,
    "category": "Discounted Cash Flow - Basic",
    "difficulty": "de",
    "question": "How do you know if your DCF is too dependent on future assumptions?",
    "options": [
      "The \"standard\" answer: if significantly more than 50% of the company's Enterprise Value comes from its Terminal Value, your DCF is probably too dependent on future assumptions....",
      "In banking, you almost always use the Multiples Method to calculate Terminal Value in a DCF....",
      "In this case the discount rate is likely to have a bigger impact on the valuation, though the correct answer should start with, \"It could go either way, but most of the time…\"",
      "This is a bit of a trick question because it depends on whether or not the capital structure is the same for both companies...."
    ],
    "correct": 0,
    "explanation": "The \"standard\" answer: if significantly more than 50% of the company's Enterprise Value comes from its Terminal Value, your DCF is probably too dependent on future assumptions. In reality, almost all DCFs are \"too dependent on future assumptions\" - it's actually quite rare to see a case where the Terminal Value is less than 50% of the Enterprise Value. But when it gets to be in the 80-90% range, you know that you may need to re-think your assumptions…"
  },
  {
    "id": 293,
    "category": "Discounted Cash Flow - Basic",
    "difficulty": "de",
    "question": "Should Cost of Equity be higher for a $5 billion or $500 million market cap company?",
    "options": [
      "Banks use debt differently than other companies and do not re-invest it in the business - they use it to create products instead....",
      "In this case the discount rate is likely to have a bigger impact on the valuation, though the correct answer should start with, \"It could go either way, but most of the time…\"",
      "It should be higher for the $500 million company, because all else being equal, smaller companies are expected to outperform large companies in the stock market (and therefore be \"more risky\")....",
      "\"A DCF values a company based on the Present Value of its Cash Flows and the Present Value of its Terminal Value...."
    ],
    "correct": 2,
    "explanation": "It should be higher for the $500 million company, because all else being equal, smaller companies are expected to outperform large companies in the stock market (and therefore be \"more risky\"). Using a Size Premium in your calculation would also ensure that Cost of Equity is higher for the $500 million company."
  },
  {
    "id": 294,
    "category": "Discounted Cash Flow - Basic",
    "difficulty": "de",
    "question": "What about WACC - will it be higher for a $5 billion or $500 million company?",
    "options": [
      "It's hard to generalize because both are highly dependent on the assumptions you make....",
      "You look up the Beta for each Comparable Company (usually on Bloomberg), un-lever each one, take the median of the set and then lever it based on your company's capital structure....",
      "This is a bit of a trick question because it depends on whether or not the capital structure is the same for both companies....",
      "Cost of Equity = Risk-Free Rate + Beta * Equity Risk Premium The risk-free rate represents how much a 10-year or 20-year US Treasury should yield; Beta is calculated based on the \"riskiness\" of Comparable Companies and the Equity Risk Premium is the % by which stocks are expected..."
    ],
    "correct": 2,
    "explanation": "This is a bit of a trick question because it depends on whether or not the capital structure is the same for both companies. If the capital structure is the same in terms of percentages and interest rates and such, then WACC should be higher for the $500 million company for the same reasons as mentioned above. If the capital structure is not the same, then it could go either way depending on how much debt/preferred stock each one has and what the interest rates are."
  },
  {
    "id": 295,
    "category": "Discounted Cash Flow - Basic",
    "difficulty": "de",
    "question": "What's the relationship between debt and Cost of Equity?",
    "options": [
      "It's hard to generalize because both are highly dependent on the assumptions you make....",
      "More debt means that the company is more risky, so the company's Levered Beta will be higher - all else being equal, additional debt would raise the Cost of Equity, and less debt would lower the Cost of Equity.",
      "Normally you use WACC (Weighted Average Cost of Capital), though you might also use Cost of Equity depending on how you've set up the DCF.",
      "This is a bit of a trick question because it depends on whether or not the capital structure is the same for both companies...."
    ],
    "correct": 1,
    "explanation": "More debt means that the company is more risky, so the company's Levered Beta will be higher - all else being equal, additional debt would raise the Cost of Equity, and less debt would lower the Cost of Equity."
  },
  {
    "id": 296,
    "category": "Discounted Cash Flow - Basic",
    "difficulty": "de",
    "question": "Cost of Equity tells us what kind of return an equity investor can expect for investing in a given company - but what about dividends? Shouldn't we factor",
    "options": [
      "dividend yield into the formula? Trick question. Dividend yields are already factored into Beta, because Beta describes returns in excess of the market as a whole - and those returns include dividends.",
      "In this case the discount rate is likely to have a bigger impact on the valuation, though the correct answer should start with, \"It could go either way, but most of the time…\"",
      "You would use the Cost of Equity rather than WACC since we're not concerned with Debt or Preferred Stock in this case - we're calculating Equity Value, not Enterprise Value.",
      "You can take a few different approaches: • You can create your own projections. • You can modify management's projections downward to make them more conservative. • You can show a sensitivity table based on different growth rates and margins and show the values assuming managemen..."
    ],
    "correct": 0,
    "explanation": "dividend yield into the formula? Trick question. Dividend yields are already factored into Beta, because Beta describes returns in excess of the market as a whole - and those returns include dividends."
  },
  {
    "id": 297,
    "category": "Discounted Cash Flow - Basic",
    "difficulty": "de",
    "question": "How can we calculate Cost of Equity WITHOUT using CAPM?",
    "options": [
      "That's usually about as far as you can reasonably predict into the future. Less than 5 years would be too short to be useful, and over 10 years is too difficult to predict for most companies.",
      "You look up the Beta for each Comparable Company (usually on Bloomberg), un-lever each one, take the median of the set and then lever it based on your company's capital structure....",
      "There is an alternate formula: Cost of Equity = (Dividends per Share / Share Price) + Growth Rate of Dividends This is less common than the \"standard\" formula but sometimes you use it for companies where dividends are more important or when you lack proper information on Beta and...",
      "Normally you use the country's long-term GDP growth rate, the rate of inflation, or something similarly conservative...."
    ],
    "correct": 2,
    "explanation": "There is an alternate formula: Cost of Equity = (Dividends per Share / Share Price) + Growth Rate of Dividends This is less common than the \"standard\" formula but sometimes you use it for companies where dividends are more important or when you lack proper information on Beta and the other variables that go into calculating Cost of Equity with CAPM."
  },
  {
    "id": 298,
    "category": "Discounted Cash Flow - Basic",
    "difficulty": "de",
    "question": "Two companies are exactly the same, but one has debt and one does not - which one will have the higher WACC?",
    "options": [
      "This is tricky - the one without debt will have a higher WACC up to a certain point, because debt is \"less expensive\" than equity....",
      "It should be higher for the $500 million company, because all else being equal, smaller companies are expected to outperform large companies in the stock market (and therefore be \"more risky\")....",
      "That's usually about as far as you can reasonably predict into the future. Less than 5 years would be too short to be useful, and over 10 years is too difficult to predict for most companies.",
      "Again, keep in mind our \"apples-to-apples\" theme. When you look up the Betas on Bloomberg (or from whatever source you're using) they will be levered to reflect the debt already assumed by each company...."
    ],
    "correct": 0,
    "explanation": "This is tricky - the one without debt will have a higher WACC up to a certain point, because debt is \"less expensive\" than equity. Why? • Interest on debt is tax-deductible (hence the (1 - Tax Rate) multiplication in the WACC formula). • Debt is senior to equity in a company's capital structure - debt holders would be paid first in a liquidation or bankruptcy. • Intuitively, interest rates on debt are usually lower than the Cost of Equity numbers you see (usually over 10%). As a result, the Cost of Debt portion of WACC will contribute less to the total figure than the Cost of Equity portion will. However, the above is true only to a certain point. Once a company's debt goes up high enough, the interest rate will rise dramatically to reflect the additional risk and so the Cost of Debt would start to increase - if it gets high enough, it might become higher than Cost of Equity and additional debt would increase WACC. It's a \"U-shape\" curve where debt decreases WACC to a point, then starts increasing it."
  },
  {
    "id": 299,
    "category": "Discounted Cash Flow - Basic",
    "difficulty": "de",
    "question": "Which has a greater impact on a company's DCF valuation - a 10% change in revenue or a 1% change in the discount rate?",
    "options": [
      "Subtract COGS and Operating Expenses to get to Operating Income (EBIT). Then, multiply by (1 - Tax Rate), add back Depreciation and other non-cash charges, and subtract Capital Expenditures and the change in Working Capital....",
      "You should start by saying, \"it depends\" but most of the time the 10% difference in revenue will have more of an impact....",
      "The median multiples may change greatly in the next 5-10 years so it may no longer be accurate by the end of the period you're looking at....",
      "Levered Free Cash Flow gives you Equity Value rather than Enterprise Value, since the cash flow is only available to equity investors (debt investors have already been \"paid\" with the interest payments)."
    ],
    "correct": 1,
    "explanation": "You should start by saying, \"it depends\" but most of the time the 10% difference in revenue will have more of an impact. That change in revenue doesn't affect only the current year's revenue, but also the revenue/EBITDA far into the future and even the terminal value."
  },
  {
    "id": 300,
    "category": "Discounted Cash Flow - Basic",
    "difficulty": "de",
    "question": "What about a 1% change in revenue vs. a 1% change in the discount rate?",
    "options": [
      "You can take a few different approaches: • You can create your own projections. • You can modify management's projections downward to make them more conservative. • You can show a sensitivity table based on different growth rates and margins and show the values assuming managemen...",
      "In this case the discount rate is likely to have a bigger impact on the valuation, though the correct answer should start with, \"It could go either way, but most of the time…\"",
      "Cost of Equity = Risk-Free Rate + Beta * Equity Risk Premium The risk-free rate represents how much a 10-year or 20-year US Treasury should yield; Beta is calculated based on the \"riskiness\" of Comparable Companies and the Equity Risk Premium is the % by which stocks are expected...",
      "The formula is: Cost of Equity * (% Equity) + Cost of Debt * (% Debt) * (1 - Tax Rate) + Cost of Preferred * (% Preferred)...."
    ],
    "correct": 1,
    "explanation": "In this case the discount rate is likely to have a bigger impact on the valuation, though the correct answer should start with, \"It could go either way, but most of the time…\""
  },
  {
    "id": 301,
    "category": "Discounted Cash Flow - Basic",
    "difficulty": "de",
    "question": "How do you calculate WACC for a private company?",
    "options": [
      "This is problematic because private companies don't have market caps or Betas. In this case you would most likely just estimate WACC based on work done by auditors or valuation specialists, or based on what WACC for comparable public companies is.",
      "Cost of Equity = Risk-Free Rate + Beta * Equity Risk Premium The risk-free rate represents how much a 10-year or 20-year US Treasury should yield; Beta is calculated based on the \"riskiness\" of Comparable Companies and the Equity Risk Premium is the % by which stocks are expected...",
      "Take Cash Flow From Operations and subtract CapEx - that gets you to Levered Cash Flow....",
      "You look up the Beta for each Comparable Company (usually on Bloomberg), un-lever each one, take the median of the set and then lever it based on your company's capital structure...."
    ],
    "correct": 0,
    "explanation": "This is problematic because private companies don't have market caps or Betas. In this case you would most likely just estimate WACC based on work done by auditors or valuation specialists, or based on what WACC for comparable public companies is."
  },
  {
    "id": 302,
    "category": "Discounted Cash Flow - Basic",
    "difficulty": "de",
    "question": "What should you do if you don't believe management's projections for a DCF model?",
    "options": [
      "You can take a few different approaches: • You can create your own projections. • You can modify management's projections downward to make them more conservative. • You can show a sensitivity table based on different growth rates and margins and show the values assuming managemen...",
      "You can either apply an exit multiple to the company's Year 5 EBITDA, EBIT or Free Cash Flow (Multiples Method) or you can use the Gordon Growth method to estimate its value based on its growth rate into perpetuity....",
      "Cost of Equity = Risk-Free Rate + Beta * Equity Risk Premium The risk-free rate represents how much a 10-year or 20-year US Treasury should yield; Beta is calculated based on the \"riskiness\" of Comparable Companies and the Equity Risk Premium is the % by which stocks are expected...",
      "You would use the Cost of Equity rather than WACC since we're not concerned with Debt or Preferred Stock in this case - we're calculating Equity Value, not Enterprise Value."
    ],
    "correct": 0,
    "explanation": "You can take a few different approaches: • You can create your own projections. • You can modify management's projections downward to make them more conservative. • You can show a sensitivity table based on different growth rates and margins and show the values assuming managements' projections and assuming a more conservative set of numbers. In reality, you'd probably do all of these if you had unrealistic projections."
  },
  {
    "id": 303,
    "category": "Discounted Cash Flow - Basic",
    "difficulty": "de",
    "question": "Why would you not use a DCF for a bank or other financial institution?",
    "options": [
      "This is tricky - the one without debt will have a higher WACC up to a certain point, because debt is \"less expensive\" than equity....",
      "Cost of Equity = Risk-Free Rate + Beta * Equity Risk Premium The risk-free rate represents how much a 10-year or 20-year US Treasury should yield; Beta is calculated based on the \"riskiness\" of Comparable Companies and the Equity Risk Premium is the % by which stocks are expected...",
      "The median multiples may change greatly in the next 5-10 years so it may no longer be accurate by the end of the period you're looking at....",
      "Banks use debt differently than other companies and do not re-invest it in the business - they use it to create products instead...."
    ],
    "correct": 3,
    "explanation": "Banks use debt differently than other companies and do not re-invest it in the business - they use it to create products instead. Also, interest is a critical part of banks' business models and working capital takes up a huge part of their Balance Sheets - so a DCF for a financial institution would not make much sense. For financial institutions, it's more common to use a dividend discount model for valuation purposes."
  },
  {
    "id": 304,
    "category": "Discounted Cash Flow - Basic",
    "difficulty": "de",
    "question": "What types of sensitivity analyses would we look at in a DCF?",
    "options": [
      "It should be higher for the $500 million company, because all else being equal, smaller companies are expected to outperform large companies in the stock market (and therefore be \"more risky\")....",
      "You would use the Cost of Equity rather than WACC since we're not concerned with Debt or Preferred Stock in this case - we're calculating Equity Value, not Enterprise Value.",
      "Example sensitivities: • Revenue Growth vs. Terminal Multiple • EBITDA Margin vs....",
      "This is problematic because private companies don't have market caps or Betas. In this case you would most likely just estimate WACC based on work done by auditors or valuation specialists, or based on what WACC for comparable public companies is."
    ],
    "correct": 2,
    "explanation": "Example sensitivities: • Revenue Growth vs. Terminal Multiple • EBITDA Margin vs. Terminal Multiple • Terminal Multiple vs. Discount Rate • Long-Term Growth Rate vs. Discount Rate And any combination of these (except Terminal Multiple vs. Long-Term Growth Rate, which would make no sense)."
  },
  {
    "id": 305,
    "category": "Discounted Cash Flow - Basic",
    "difficulty": "de",
    "question": "A company has a high debt load and is paying off a significant portion of its principal each year. How do you account for this in a DCF?",
    "options": [
      "There is an alternate formula: Cost of Equity = (Dividends per Share / Share Price) + Growth Rate of Dividends This is less common than the \"standard\" formula but sometimes you use it for companies where dividends are more important or when you lack proper information on Beta and...",
      "dividend yield into the formula? Trick question. Dividend yields are already factored into Beta, because Beta describes returns in excess of the market as a whole - and those returns include dividends.",
      "Trick question. You don't account for this at all in a DCF, because paying off debt principal shows up in Cash Flow from Financing on the Cash Flow Statement - but we only go down to Cash Flow from Operations and then subtract Capital Expenditures to get to Fr...",
      "In this case the discount rate is likely to have a bigger impact on the valuation, though the correct answer should start with, \"It could go either way, but most of the time…\""
    ],
    "correct": 2,
    "explanation": "Trick question. You don't account for this at all in a DCF, because paying off debt principal shows up in Cash Flow from Financing on the Cash Flow Statement - but we only go down to Cash Flow from Operations and then subtract Capital Expenditures to get to Free Cash Flow. If we were looking at Levered Free Cash Flow, then our interest expense would decline in future years due to the principal being paid off - but we still wouldn't count the principal repayments themselves anywhere."
  },
  {
    "id": 306,
    "category": "Discounted Cash Flow - Advanced",
    "difficulty": "kho",
    "question": "Explain why we would use the mid-year convention in a DCF.",
    "options": [
      "You use it to represent the fact that a company's cash flow does not come 100% at the end of each year - instead, it comes in evenly throughout each year....",
      "In this scenario, you would add CapEx spending of $100 in year 4 of the DCF, which would reduce Free Cash Flow for that year by $100....",
      "Trick question. If the convertible debt is in-the-money then you do not count it as debt but instead assume that it contributes to dilution, so the company's Equity Value is higher. If it's out-of-the-money then you count it as debt and use the interest rate o...",
      "The mechanics are the same as a DCF, but we use dividends rather than free cash flows: 1...."
    ],
    "correct": 0,
    "explanation": "You use it to represent the fact that a company's cash flow does not come 100% at the end of each year - instead, it comes in evenly throughout each year. In a DCF without mid-year convention, we would use discount period numbers of 1 for the first year, 2 for the second year, 3 for the third year, and so on. With mid-year convention, we would instead use 0.5 for the first year, 1.5 for the second year, 2.5 for the third year, and so on."
  },
  {
    "id": 307,
    "category": "Discounted Cash Flow - Advanced",
    "difficulty": "kho",
    "question": "What discount period numbers would I use for the mid-year convention if I have a stub period - e.g. Q4 of Year 1 - in my DCF?",
    "options": [
      "The mechanics are the same as a DCF, but we use dividends rather than free cash flows: 1....",
      "In this scenario, you would add CapEx spending of $100 in year 4 of the DCF, which would reduce Free Cash Flow for that year by $100....",
      "Once you get to Enterprise Value, ADD cash and then subtract debt, preferred stock, and minority interest (and any other debt-like items) to get to Equity Value....",
      "The rule is that you divide the stub discount period by 2, and then you simply subtract 0.5 from the \"normal\" discount periods for the future years...."
    ],
    "correct": 3,
    "explanation": "The rule is that you divide the stub discount period by 2, and then you simply subtract 0.5 from the \"normal\" discount periods for the future years. Example for a Q4 stub: Q4 Year 1 Year 2 Year 3 Year 4 Year 5 Normal Discount Periods with Stub: 0 . 2 5 1 . 2 5 2 . 2 5 3 . 2 5 4 . 2 5 5 . 2 5 Mid-Year Discount Periods with Stub: 0 . 1 2 5 0 . 7 5 1 . 7 5 2 . 7 5 3 . 7 5 4 . 7 5"
  },
  {
    "id": 308,
    "category": "Discounted Cash Flow - Advanced",
    "difficulty": "kho",
    "question": "How does the terminal value calculation change when we use the mid-year convention?",
    "options": [
      "When you're discounting the terminal value back to the present value, you use different numbers for the discount period depending on whether you're using the Multiples Method or Gordon Growth Method: • Multiples Method: You add 0.5 to the final year discount number to reflect the...",
      "Once you get to Enterprise Value, ADD cash and then subtract debt, preferred stock, and minority interest (and any other debt-like items) to get to Equity Value....",
      "The mechanics are the same as a DCF, but we use dividends rather than free cash flows: 1....",
      "The rule is that you divide the stub discount period by 2, and then you simply subtract 0.5 from the \"normal\" discount periods for the future years...."
    ],
    "correct": 0,
    "explanation": "When you're discounting the terminal value back to the present value, you use different numbers for the discount period depending on whether you're using the Multiples Method or Gordon Growth Method: • Multiples Method: You add 0.5 to the final year discount number to reflect the fact that you're assuming the company gets sold at the end of the year. • Gordon Growth Method: You use the final year discount number as is, because you're assuming the cash flows grow into perpetuity and that they are still received throughout the year rather than just at the end."
  },
  {
    "id": 309,
    "category": "Discounted Cash Flow - Advanced",
    "difficulty": "kho",
    "question": "If I'm working with a public company in a DCF, how do I calculate its per-share value?",
    "options": [
      "When you're discounting the terminal value back to the present value, you use different numbers for the discount period depending on whether you're using the Multiples Method or Gordon Growth Method: • Multiples Method: You add 0.5 to the final year discount number to reflect the...",
      "In this scenario, you would add CapEx spending of $100 in year 4 of the DCF, which would reduce Free Cash Flow for that year by $100....",
      "Once you get to Enterprise Value, ADD cash and then subtract debt, preferred stock, and minority interest (and any other debt-like items) to get to Equity Value....",
      "You use it to represent the fact that a company's cash flow does not come 100% at the end of each year - instead, it comes in evenly throughout each year...."
    ],
    "correct": 2,
    "explanation": "Once you get to Enterprise Value, ADD cash and then subtract debt, preferred stock, and minority interest (and any other debt-like items) to get to Equity Value. Then, you need to use a circular calculation that takes into account the basic shares outstanding, options, warrants, convertibles, and other dilutive securities. It's circular because the dilution from these depends on the per-share price - but the per-share price depends on number of shares outstanding, which depends on the per-share price. To resolve this, you need to enable iterative calculations in Excel so that it can cycle through to find an approximate per-share price."
  },
  {
    "id": 310,
    "category": "Discounted Cash Flow - Advanced",
    "difficulty": "kho",
    "question": "Walk me through a Dividend Discount Model (DDM) that you would use in place of a normal DCF for financial institutions.",
    "options": [
      "The mechanics are the same as a DCF, but we use dividends rather than free cash flows: 1....",
      "The rule is that you divide the stub discount period by 2, and then you simply subtract 0.5 from the \"normal\" discount periods for the future years....",
      "Trick question. If the convertible debt is in-the-money then you do not count it as debt but instead assume that it contributes to dilution, so the company's Equity Value is higher. If it's out-of-the-money then you count it as debt and use the interest rate o...",
      "You use it to represent the fact that a company's cash flow does not come 100% at the end of each year - instead, it comes in evenly throughout each year...."
    ],
    "correct": 0,
    "explanation": "The mechanics are the same as a DCF, but we use dividends rather than free cash flows: 1. Project out the company's earnings, down to earnings per share (EPS). 2. Assume a dividend payout ratio - what percentage of the EPS actually gets paid out to shareholders in the form of dividends - based on what the firm has done historically and how much regulatory capital it needs. 3. Use this to calculate dividends over the next 5-10 years. 4. Discount each dividend to its present value based on Cost of Equity - NOT WACC - and then sum these up. 5. Calculate terminal value based on P / E and EPS in the final year, and then discount this to its present value based on Cost of Equity. 6. Sum the present value of the terminal value and the present values of the dividends to get the company's net present per-share value."
  },
  {
    "id": 311,
    "category": "Discounted Cash Flow - Advanced",
    "difficulty": "kho",
    "question": "When you're calculating WACC, let's say that the company has convertible debt. Do you count this as debt when calculating Levered Beta for the company?",
    "options": [
      "The mechanics are the same as a DCF, but we use dividends rather than free cash flows: 1....",
      "You use it to represent the fact that a company's cash flow does not come 100% at the end of each year - instead, it comes in evenly throughout each year....",
      "The rule is that you divide the stub discount period by 2, and then you simply subtract 0.5 from the \"normal\" discount periods for the future years....",
      "Trick question. If the convertible debt is in-the-money then you do not count it as debt but instead assume that it contributes to dilution, so the company's Equity Value is higher. If it's out-of-the-money then you count it as debt and use the interest rate o..."
    ],
    "correct": 3,
    "explanation": "Trick question. If the convertible debt is in-the-money then you do not count it as debt but instead assume that it contributes to dilution, so the company's Equity Value is higher. If it's out-of-the-money then you count it as debt and use the interest rate on the convertible for Cost of Debt."
  },
  {
    "id": 312,
    "category": "Discounted Cash Flow - Advanced",
    "difficulty": "kho",
    "question": "We're creating a DCF for a company that is planning to buy a factory for $100 in cash (no debt or other financing) in Year 4. Currently the present value of its Enterprise Value according to the DCF is $200. How would we change the DCF to account for the factory purchase, and what would our new Enterprise Value be?",
    "options": [
      "Trick question. If the convertible debt is in-the-money then you do not count it as debt but instead assume that it contributes to dilution, so the company's Equity Value is higher. If it's out-of-the-money then you count it as debt and use the interest rate o...",
      "Once you get to Enterprise Value, ADD cash and then subtract debt, preferred stock, and minority interest (and any other debt-like items) to get to Equity Value....",
      "In this scenario, you would add CapEx spending of $100 in year 4 of the DCF, which would reduce Free Cash Flow for that year by $100....",
      "The mechanics are the same as a DCF, but we use dividends rather than free cash flows: 1...."
    ],
    "correct": 2,
    "explanation": "In this scenario, you would add CapEx spending of $100 in year 4 of the DCF, which would reduce Free Cash Flow for that year by $100. The Enterprise Value, in turn, would fall by the present value of that $100 decrease in Free Cash Flow. The actual math here is messy but you would calculate the present value by dividing $100 by ((1 + Discount Rate)^4) - the \"4\" just represents year 4 here. Then you would subtract this amount from the Enterprise Value."
  },
  {
    "id": 313,
    "category": "Merger Model - Basic",
    "difficulty": "de",
    "question": "Walk me through a basic merger model.",
    "options": [
      "\"A merger model is used to analyze the financial profiles of 2 companies, the purchase price and how the purchase is made, and determines whether the buyer's EPS increases or decreases....",
      "Generally you would look at Comparable Companies/ Precedent Transactions to determine this....",
      "There's always a buyer and a seller in any M&A deal - the difference between \"merger\" and \"acquisition\" is more semantic than anything....",
      "Yes. You could also have a Purchased In-Process R&D Write-off and a Deferred Revenue Write-off. The first refers to any Research & Development projects that were purchased in the acquisition but which have not been completed yet. The logic is that unfinished R..."
    ],
    "correct": 0,
    "explanation": "\"A merger model is used to analyze the financial profiles of 2 companies, the purchase price and how the purchase is made, and determines whether the buyer's EPS increases or decreases. Step 1 is making assumptions about the acquisition - the price and whether it was cash, stock or debt or some combination of those. Next, you determine the valuations and shares outstanding of the buyer and seller and project out an Income Statement for each one. Finally, you combine the Income Statements, adding up line items such as Revenue and Operating Expenses, and adjusting for Foregone Interest on Cash and Interest Paid on Debt in the Combined Pre-Tax Income line; you apply the buyer's Tax Rate to get the Combined Net Income, and then divide by the new share count to determine the combined EPS.\""
  },
  {
    "id": 314,
    "category": "Merger Model - Basic",
    "difficulty": "de",
    "question": "What's the difference between a merger and an acquisition?",
    "options": [
      "Generally you would look at Comparable Companies/ Precedent Transactions to determine this....",
      "In an all-stock deal, if the buyer has a higher P/E than the seller, it will be accretive; if the buyer has a lower P/E, it will be dilutive....",
      "There's always a buyer and a seller in any M&A deal - the difference between \"merger\" and \"acquisition\" is more semantic than anything....",
      "Trick question. You can't tell unless you also know that it's an all-stock deal. If it's an all-cash or all-debt deal, the P/E multiples of the buyer and seller don't matter because no stock is being issued. Sure, generally getting more earnings for less is go..."
    ],
    "correct": 2,
    "explanation": "There's always a buyer and a seller in any M&A deal - the difference between \"merger\" and \"acquisition\" is more semantic than anything. In a merger the companies are close to the same size, whereas in an acquisition the buyer is significantly larger."
  },
  {
    "id": 315,
    "category": "Merger Model - Basic",
    "difficulty": "de",
    "question": "Why would a company want to acquire another company?",
    "options": [
      "Several possible reasons: • The buyer wants to gain market share by buying a competitor. • The buyer needs to grow more quickly and sees an acquisition as a way to do that. • The buyer believes the seller is undervalued. • The buyer wants to acquire the seller's customers so it c...",
      "Goodwill typically stays the same over many years and is not amortized. It changes only if there's goodwill impairment (or another acquisition)....",
      "Trick question. You can't tell unless you also know that it's an all-stock deal. If it's an all-cash or all-debt deal, the P/E multiples of the buyer and seller don't matter because no stock is being issued. Sure, generally getting more earnings for less is go...",
      "Like so many things, M&A is \"easier said than done.\" In practice it's very difficult to acquire and integrate a different company, actually realize synergies and also turn the acquired company into a profitable division...."
    ],
    "correct": 0,
    "explanation": "Several possible reasons: • The buyer wants to gain market share by buying a competitor. • The buyer needs to grow more quickly and sees an acquisition as a way to do that. • The buyer believes the seller is undervalued. • The buyer wants to acquire the seller's customers so it can up-sell and cross-sell to them. • The buyer thinks the seller has a critical technology, intellectual property or some other \"secret sauce\" it can use to significantly enhance its business. • The buyer believes it can achieve significant synergies and therefore make the deal accretive for its shareholders."
  },
  {
    "id": 316,
    "category": "Merger Model - Basic",
    "difficulty": "de",
    "question": "Why would an acquisition be dilutive?",
    "options": [
      "The model is used as a sanity check and is used to test various assumptions. A company would never decide to do a deal based on the output of a model....",
      "An acquisition is dilutive if the additional amount of Net Income the seller contributes is not enough to offset the buyer's foregone interest on cash, additional interest paid on debt, and the effects of issuing additional shares....",
      "It might be saving its cash for something else or it might be concerned about running low if business takes a turn for the worst; its stock may also be trading at an all-time high and it might be eager to use that instead (in finance terms this would be \"more expensive\" but a lot...",
      "Revenue Synergies: Normally you add these to the Revenue figure for the combined company and then assume a certain margin on the Revenue - this additional Revenue then flows through the rest of the combined Income Statement...."
    ],
    "correct": 1,
    "explanation": "An acquisition is dilutive if the additional amount of Net Income the seller contributes is not enough to offset the buyer's foregone interest on cash, additional interest paid on debt, and the effects of issuing additional shares. Acquisition effects - such as amortization of intangibles - can also make an acquisition dilutive."
  },
  {
    "id": 317,
    "category": "Merger Model - Basic",
    "difficulty": "de",
    "question": "Is there a rule of thumb for calculating whether an acquisition will be accretive or dilutive?",
    "options": [
      "No one in M&A takes revenue synergies seriously because they're so hard to predict....",
      "If the deal involves just cash and debt, you can sum up the interest expense for debt and the foregone interest on cash, then compare it against the seller's Pre-Tax Income....",
      "An acquisition is dilutive if the additional amount of Net Income the seller contributes is not enough to offset the buyer's foregone interest on cash, additional interest paid on debt, and the effects of issuing additional shares....",
      "Yes. You could also have a Purchased In-Process R&D Write-off and a Deferred Revenue Write-off. The first refers to any Research & Development projects that were purchased in the acquisition but which have not been completed yet. The logic is that unfinished R..."
    ],
    "correct": 1,
    "explanation": "If the deal involves just cash and debt, you can sum up the interest expense for debt and the foregone interest on cash, then compare it against the seller's Pre-Tax Income. And if it's an all-stock deal you can use a shortcut to assess whether it is accretive (see question #5). But if the deal involves cash, stock, and debt, there's no quick rule-of-thumb you can use unless you're lightning fast with mental math."
  },
  {
    "id": 318,
    "category": "Merger Model - Basic",
    "difficulty": "de",
    "question": "A company with a higher P/E acquires one with a lower P/E - is this accretive or dilutive?",
    "options": [
      "The model is used as a sanity check and is used to test various assumptions. A company would never decide to do a deal based on the output of a model....",
      "Trick question. You can't tell unless you also know that it's an all-stock deal. If it's an all-cash or all-debt deal, the P/E multiples of the buyer and seller don't matter because no stock is being issued. Sure, generally getting more earnings for less is go...",
      "Goodwill typically stays the same over many years and is not amortized. It changes only if there's goodwill impairment (or another acquisition)....",
      "In an all-stock deal, if the buyer has a higher P/E than the seller, it will be accretive; if the buyer has a lower P/E, it will be dilutive...."
    ],
    "correct": 1,
    "explanation": "Trick question. You can't tell unless you also know that it's an all-stock deal. If it's an all-cash or all-debt deal, the P/E multiples of the buyer and seller don't matter because no stock is being issued. Sure, generally getting more earnings for less is good and is more likely to be accretive but there's no hard-and-fast rule unless it's an all-stock deal."
  },
  {
    "id": 319,
    "category": "Merger Model - Basic",
    "difficulty": "de",
    "question": "What is the rule of thumb for assessing whether an M&A deal will be accretive or dilutive?",
    "options": [
      "Yes. You could also have a Purchased In-Process R&D Write-off and a Deferred Revenue Write-off. The first refers to any Research & Development projects that were purchased in the acquisition but which have not been completed yet. The logic is that unfinished R...",
      "If the deal involves just cash and debt, you can sum up the interest expense for debt and the foregone interest on cash, then compare it against the seller's Pre-Tax Income....",
      "\"A merger model is used to analyze the financial profiles of 2 companies, the purchase price and how the purchase is made, and determines whether the buyer's EPS increases or decreases....",
      "In an all-stock deal, if the buyer has a higher P/E than the seller, it will be accretive; if the buyer has a lower P/E, it will be dilutive...."
    ],
    "correct": 3,
    "explanation": "In an all-stock deal, if the buyer has a higher P/E than the seller, it will be accretive; if the buyer has a lower P/E, it will be dilutive. On an intuitive level if you're paying more for earnings than what the market values your own earnings at, you can guess that it will be dilutive; and likewise, if you're paying less for earnings than what the market values your own earnings at, you can guess that it would be accretive."
  },
  {
    "id": 320,
    "category": "Merger Model - Basic",
    "difficulty": "de",
    "question": "What are the complete effects of an acquisition?",
    "options": [
      "It might be saving its cash for something else or it might be concerned about running low if business takes a turn for the worst; its stock may also be trading at an all-time high and it might be eager to use that instead (in finance terms this would be \"more expensive\" but a lot...",
      "Yes. You could also have a Purchased In-Process R&D Write-off and a Deferred Revenue Write-off. The first refers to any Research & Development projects that were purchased in the acquisition but which have not been completed yet. The logic is that unfinished R...",
      "1. Foregone Interest on Cash - The buyer loses the Interest it would have otherwise earned if it uses cash for the acquisition. 2. Additional Interest on Debt - The buyer pays additional Interest Expense if it uses debt. 3. Additional Shares Outstanding - If t...",
      "These represent the value over the \"fair market value\" of the seller that the buyer has paid...."
    ],
    "correct": 2,
    "explanation": "1. Foregone Interest on Cash - The buyer loses the Interest it would have otherwise earned if it uses cash for the acquisition. 2. Additional Interest on Debt - The buyer pays additional Interest Expense if it uses debt. 3. Additional Shares Outstanding - If the buyer pays with stock, it must issue additional shares. 4. Combined Financial Statements - After the acquisition, the seller's financials are added to the buyer's. 5. Creation of Goodwill & Other Intangibles - These Balance Sheet items that represent a \"premium\" paid to a company's \"fair value\" also get created. Note: There's actually more than this (see the advanced questions), but this is usually sufficient to mention in interviews."
  },
  {
    "id": 321,
    "category": "Merger Model - Basic",
    "difficulty": "de",
    "question": "If a company were capable of paying 100% in cash for another company, why would it choose NOT to do so?",
    "options": [
      "No one in M&A takes revenue synergies seriously because they're so hard to predict....",
      "1. Foregone Interest on Cash - The buyer loses the Interest it would have otherwise earned if it uses cash for the acquisition. 2. Additional Interest on Debt - The buyer pays additional Interest Expense if it uses debt. 3. Additional Shares Outstanding - If t...",
      "Revenue Synergies: Normally you add these to the Revenue figure for the combined company and then assume a certain margin on the Revenue - this additional Revenue then flows through the rest of the combined Income Statement....",
      "It might be saving its cash for something else or it might be concerned about running low if business takes a turn for the worst; its stock may also be trading at an all-time high and it might be eager to use that instead (in finance terms this would be \"more expensive\" but a lot..."
    ],
    "correct": 3,
    "explanation": "It might be saving its cash for something else or it might be concerned about running low if business takes a turn for the worst; its stock may also be trading at an all-time high and it might be eager to use that instead (in finance terms this would be \"more expensive\" but a lot of executives value having a safety cushion in the form of a large cash balance)."
  },
  {
    "id": 322,
    "category": "Merger Model - Basic",
    "difficulty": "de",
    "question": "Why would a strategic acquirer typically be willing to pay more for a company than a private equity firm would?",
    "options": [
      "The buyer's share price would fall by whatever per-share dollar amount corresponds to the $50 million loss in value....",
      "Several possible reasons: • The buyer wants to gain market share by buying a competitor. • The buyer needs to grow more quickly and sees an acquisition as a way to do that. • The buyer believes the seller is undervalued. • The buyer wants to acquire the seller's customers so it c...",
      "Because the strategic acquirer can realize revenue and cost synergies that the private equity firm cannot unless it combines the company with a complementary portfolio company....",
      "The model is used as a sanity check and is used to test various assumptions. A company would never decide to do a deal based on the output of a model...."
    ],
    "correct": 2,
    "explanation": "Because the strategic acquirer can realize revenue and cost synergies that the private equity firm cannot unless it combines the company with a complementary portfolio company. Those synergies boost the effective valuation for the target company."
  },
  {
    "id": 323,
    "category": "Merger Model - Basic",
    "difficulty": "de",
    "question": "Why do Goodwill & Other Intangibles get created in an acquisition?",
    "options": [
      "These represent the value over the \"fair market value\" of the seller that the buyer has paid....",
      "An acquisition is dilutive if the additional amount of Net Income the seller contributes is not enough to offset the buyer's foregone interest on cash, additional interest paid on debt, and the effects of issuing additional shares....",
      "The buyer's share price would fall by whatever per-share dollar amount corresponds to the $50 million loss in value....",
      "If the deal involves just cash and debt, you can sum up the interest expense for debt and the foregone interest on cash, then compare it against the seller's Pre-Tax Income...."
    ],
    "correct": 0,
    "explanation": "These represent the value over the \"fair market value\" of the seller that the buyer has paid. You calculate the number by subtracting the book value of a company from its equity purchase price. More specifically, Goodwill and Other Intangibles represent things like the value of customer relationships, brand names and intellectual property - valuable, but not true financial Assets that show up on the Balance Sheet."
  },
  {
    "id": 324,
    "category": "Merger Model - Basic",
    "difficulty": "de",
    "question": "What is the difference between Goodwill and Other Intangible Assets?",
    "options": [
      "In an all-stock deal, if the buyer has a higher P/E than the seller, it will be accretive; if the buyer has a lower P/E, it will be dilutive....",
      "If the deal involves just cash and debt, you can sum up the interest expense for debt and the foregone interest on cash, then compare it against the seller's Pre-Tax Income....",
      "Trick question. You can't tell unless you also know that it's an all-stock deal. If it's an all-cash or all-debt deal, the P/E multiples of the buyer and seller don't matter because no stock is being issued. Sure, generally getting more earnings for less is go...",
      "Goodwill typically stays the same over many years and is not amortized. It changes only if there's goodwill impairment (or another acquisition)...."
    ],
    "correct": 3,
    "explanation": "Goodwill typically stays the same over many years and is not amortized. It changes only if there's goodwill impairment (or another acquisition). Other Intangible Assets, by contrast, are amortized over several years and affect the Income Statement by hitting the Pre-Tax Income line. There's also a difference in terms of what they each represent, but bankers rarely go into that level of detail - accountants and valuation specialists worry about assigning each one to specific items."
  },
  {
    "id": 325,
    "category": "Merger Model - Basic",
    "difficulty": "de",
    "question": "Is there anything else \"intangible\" besides Goodwill & Other Intangibles that could also impact the combined company?",
    "options": [
      "Several possible reasons: • The buyer wants to gain market share by buying a competitor. • The buyer needs to grow more quickly and sees an acquisition as a way to do that. • The buyer believes the seller is undervalued. • The buyer wants to acquire the seller's customers so it c...",
      "Trick question. You can't tell unless you also know that it's an all-stock deal. If it's an all-cash or all-debt deal, the P/E multiples of the buyer and seller don't matter because no stock is being issued. Sure, generally getting more earnings for less is go...",
      "No one in M&A takes revenue synergies seriously because they're so hard to predict....",
      "Yes. You could also have a Purchased In-Process R&D Write-off and a Deferred Revenue Write-off. The first refers to any Research & Development projects that were purchased in the acquisition but which have not been completed yet. The logic is that unfinished R..."
    ],
    "correct": 3,
    "explanation": "Yes. You could also have a Purchased In-Process R&D Write-off and a Deferred Revenue Write-off. The first refers to any Research & Development projects that were purchased in the acquisition but which have not been completed yet. The logic is that unfinished R&D projects require significant resources to complete, and as such, the \"expense\" must be recognized as part of the acquisition. The second refers to cases where the seller has collected cash for a service but not yet recorded it as revenue, and the buyer must write-down the value of the Deferred Revenue to avoid \"double-counting\" revenue."
  },
  {
    "id": 326,
    "category": "Merger Model - Basic",
    "difficulty": "de",
    "question": "What are synergies, and can you provide a few examples?",
    "options": [
      "You use the same Valuation methodologies we already discussed. If the seller is a public company, you would pay more attention to the premium paid over the current share price to make sure it's \"sufficient\" (generally in the 15-30% range) to win shareholder approval....",
      "Synergies refer to cases where 2 + 2 = 5 (or 6, or 7…) in an acquisition. Basically, the buyer gets more value than out of an acquisition than what the financials would predict....",
      "There's always a buyer and a seller in any M&A deal - the difference between \"merger\" and \"acquisition\" is more semantic than anything....",
      "1. Foregone Interest on Cash - The buyer loses the Interest it would have otherwise earned if it uses cash for the acquisition. 2. Additional Interest on Debt - The buyer pays additional Interest Expense if it uses debt. 3. Additional Shares Outstanding - If t..."
    ],
    "correct": 1,
    "explanation": "Synergies refer to cases where 2 + 2 = 5 (or 6, or 7…) in an acquisition. Basically, the buyer gets more value than out of an acquisition than what the financials would predict. There are 2 types: revenue synergies and cost (or expense) synergies. • Revenue Synergies: The combined company can cross-sell products to new customers or up-sell new products to existing customers. It might also be able to expand into new geographies as a result of the deal. • Cost Synergies: The combined company can consolidate buildings and administrative staff and can lay off redundant employees. It might also be able to shut down redundant stores or locations."
  },
  {
    "id": 327,
    "category": "Merger Model - Basic",
    "difficulty": "de",
    "question": "How are synergies used in merger models?",
    "options": [
      "There would be an incredibly high amount of Goodwill & Other Intangibles created if the price is far above the fair market value of the company....",
      "Revenue Synergies: Normally you add these to the Revenue figure for the combined company and then assume a certain margin on the Revenue - this additional Revenue then flows through the rest of the combined Income Statement....",
      "If the deal involves just cash and debt, you can sum up the interest expense for debt and the foregone interest on cash, then compare it against the seller's Pre-Tax Income....",
      "No one in M&A takes revenue synergies seriously because they're so hard to predict...."
    ],
    "correct": 1,
    "explanation": "Revenue Synergies: Normally you add these to the Revenue figure for the combined company and then assume a certain margin on the Revenue - this additional Revenue then flows through the rest of the combined Income Statement. Cost Synergies: Normally you reduce the combined COGS or Operating Expenses by this amount, which in turn boosts the combined Pre-Tax Income and thus Net Income, raising the EPS and making the deal more accretive."
  },
  {
    "id": 328,
    "category": "Merger Model - Basic",
    "difficulty": "de",
    "question": "Are revenue or cost synergies more important?",
    "options": [
      "The buyer's share price would fall by whatever per-share dollar amount corresponds to the $50 million loss in value....",
      "No one in M&A takes revenue synergies seriously because they're so hard to predict....",
      "Several possible reasons: • The buyer wants to gain market share by buying a competitor. • The buyer needs to grow more quickly and sees an acquisition as a way to do that. • The buyer believes the seller is undervalued. • The buyer wants to acquire the seller's customers so it c...",
      "Assuming the buyer had unlimited resources, it would always prefer to use cash when buying another company...."
    ],
    "correct": 1,
    "explanation": "No one in M&A takes revenue synergies seriously because they're so hard to predict. Cost synergies are taken a bit more seriously because it's more straightforward to see how buildings and locations might be consolidated and how many redundant employees might be eliminated. That said, the chances of any synergies actually being realized are almost 0 so few take them seriously at all."
  },
  {
    "id": 329,
    "category": "Merger Model - Basic",
    "difficulty": "de",
    "question": "All else being equal, which method would a company prefer to use when acquiring another company - cash, stock, or debt?",
    "options": [
      "Revenue Synergies: Normally you add these to the Revenue figure for the combined company and then assume a certain margin on the Revenue - this additional Revenue then flows through the rest of the combined Income Statement....",
      "Assuming the buyer had unlimited resources, it would always prefer to use cash when buying another company....",
      "Yes. You could also have a Purchased In-Process R&D Write-off and a Deferred Revenue Write-off. The first refers to any Research & Development projects that were purchased in the acquisition but which have not been completed yet. The logic is that unfinished R...",
      "It might be saving its cash for something else or it might be concerned about running low if business takes a turn for the worst; its stock may also be trading at an all-time high and it might be eager to use that instead (in finance terms this would be \"more expensive\" but a lot..."
    ],
    "correct": 1,
    "explanation": "Assuming the buyer had unlimited resources, it would always prefer to use cash when buying another company. Why? • Cash is \"cheaper\" than debt because interest rates on cash are usually under 5% whereas debt interest rates are almost always higher than that. Thus, foregone interest on cash is almost always less than additional interest paid on debt for the same amount of cash/debt. • Cash is also less \"risky\" than debt because there's no chance the buyer might fail to raise sufficient funds from investors. • It's hard to compare the \"cost\" directly to stock, but in general stock is the most \"expensive\" way to finance a transaction - remember how the Cost of Equity is almost always higher than the Cost of Debt? That same principle applies here. • Cash is also less risky than stock because the buyer's share price could change dramatically once the acquisition is announced."
  },
  {
    "id": 330,
    "category": "Merger Model - Basic",
    "difficulty": "de",
    "question": "How much debt could a company issue in a merger or acquisition?",
    "options": [
      "An acquisition is dilutive if the additional amount of Net Income the seller contributes is not enough to offset the buyer's foregone interest on cash, additional interest paid on debt, and the effects of issuing additional shares....",
      "These represent the value over the \"fair market value\" of the seller that the buyer has paid....",
      "Generally you would look at Comparable Companies/ Precedent Transactions to determine this....",
      "Assuming the buyer had unlimited resources, it would always prefer to use cash when buying another company...."
    ],
    "correct": 2,
    "explanation": "Generally you would look at Comparable Companies/ Precedent Transactions to determine this. You would use the combined company's LTM (Last Twelve Months) EBITDA figure, find the median Debt/EBITDA ratio of whatever companies you're looking at, and apply that to your own EBITDA figure to get a rough idea of how much debt you could raise. You would also look at \"Debt Comps\" for companies in the same industry and see what types of debt and how many tranches they have used."
  },
  {
    "id": 331,
    "category": "Merger Model - Basic",
    "difficulty": "de",
    "question": "How do you determine the Purchase Price for the target company in an acquisition?",
    "options": [
      "It might be saving its cash for something else or it might be concerned about running low if business takes a turn for the worst; its stock may also be trading at an all-time high and it might be eager to use that instead (in finance terms this would be \"more expensive\" but a lot...",
      "There would be an incredibly high amount of Goodwill & Other Intangibles created if the price is far above the fair market value of the company....",
      "You use the same Valuation methodologies we already discussed. If the seller is a public company, you would pay more attention to the premium paid over the current share price to make sure it's \"sufficient\" (generally in the 15-30% range) to win shareholder approval....",
      "The most common variables to look at are Purchase Price, % Stock/Cash/Debt, Revenue Synergies, and Expense Synergies...."
    ],
    "correct": 2,
    "explanation": "You use the same Valuation methodologies we already discussed. If the seller is a public company, you would pay more attention to the premium paid over the current share price to make sure it's \"sufficient\" (generally in the 15-30% range) to win shareholder approval. For private sellers, more weight is placed on the traditional methodologies."
  },
  {
    "id": 332,
    "category": "Merger Model - Basic",
    "difficulty": "de",
    "question": "Let's say a company overpays for another company - what typically happens afterwards and can you give any recent examples?",
    "options": [
      "Revenue Synergies: Normally you add these to the Revenue figure for the combined company and then assume a certain margin on the Revenue - this additional Revenue then flows through the rest of the combined Income Statement....",
      "Assuming the buyer had unlimited resources, it would always prefer to use cash when buying another company....",
      "Yes. You could also have a Purchased In-Process R&D Write-off and a Deferred Revenue Write-off. The first refers to any Research & Development projects that were purchased in the acquisition but which have not been completed yet. The logic is that unfinished R...",
      "There would be an incredibly high amount of Goodwill & Other Intangibles created if the price is far above the fair market value of the company...."
    ],
    "correct": 3,
    "explanation": "There would be an incredibly high amount of Goodwill & Other Intangibles created if the price is far above the fair market value of the company. Depending on how the acquisition goes, there might be a large goodwill impairment charge later on if the company decides it overpaid. A recent example is the eBay / Skype deal, in which eBay paid a huge premium and extremely high multiple for Skype. It created excess Goodwill & Other Intangibles, and eBay later ended up writing down much of the value and taking a large quarterly loss as a result."
  },
  {
    "id": 333,
    "category": "Merger Model - Basic",
    "difficulty": "de",
    "question": "A buyer pays $100 million for the seller in an all-stock deal, but a day later the market decides it's only worth $50 million. What happens?",
    "options": [
      "The buyer's share price would fall by whatever per-share dollar amount corresponds to the $50 million loss in value....",
      "Trick question. You can't tell unless you also know that it's an all-stock deal. If it's an all-cash or all-debt deal, the P/E multiples of the buyer and seller don't matter because no stock is being issued. Sure, generally getting more earnings for less is go...",
      "It might be saving its cash for something else or it might be concerned about running low if business takes a turn for the worst; its stock may also be trading at an all-time high and it might be eager to use that instead (in finance terms this would be \"more expensive\" but a lot...",
      "An acquisition is dilutive if the additional amount of Net Income the seller contributes is not enough to offset the buyer's foregone interest on cash, additional interest paid on debt, and the effects of issuing additional shares...."
    ],
    "correct": 0,
    "explanation": "The buyer's share price would fall by whatever per-share dollar amount corresponds to the $50 million loss in value. Note that it would not necessarily be cut in half. Depending on how the deal was structured, the seller would effectively only be receiving half of what it had originally negotiated. This illustrates one of the major risks of all-stock deals: sudden changes in share price could dramatically impact valuation."
  },
  {
    "id": 334,
    "category": "Merger Model - Basic",
    "difficulty": "de",
    "question": "Why do most mergers and acquisitions fail?",
    "options": [
      "Goodwill typically stays the same over many years and is not amortized. It changes only if there's goodwill impairment (or another acquisition)....",
      "It might be saving its cash for something else or it might be concerned about running low if business takes a turn for the worst; its stock may also be trading at an all-time high and it might be eager to use that instead (in finance terms this would be \"more expensive\" but a lot...",
      "Like so many things, M&A is \"easier said than done.\" In practice it's very difficult to acquire and integrate a different company, actually realize synergies and also turn the acquired company into a profitable division....",
      "There would be an incredibly high amount of Goodwill & Other Intangibles created if the price is far above the fair market value of the company...."
    ],
    "correct": 2,
    "explanation": "Like so many things, M&A is \"easier said than done.\" In practice it's very difficult to acquire and integrate a different company, actually realize synergies and also turn the acquired company into a profitable division. Many deals are also done for the wrong reasons, such as CEO ego or pressure from shareholders. Any deal done without both parties' best interests in mind is likely to fail."
  },
  {
    "id": 335,
    "category": "Merger Model - Basic",
    "difficulty": "de",
    "question": "What role does a merger model play in deal negotiations?",
    "options": [
      "The model is used as a sanity check and is used to test various assumptions. A company would never decide to do a deal based on the output of a model....",
      "It might be saving its cash for something else or it might be concerned about running low if business takes a turn for the worst; its stock may also be trading at an all-time high and it might be eager to use that instead (in finance terms this would be \"more expensive\" but a lot...",
      "Trick question. You can't tell unless you also know that it's an all-stock deal. If it's an all-cash or all-debt deal, the P/E multiples of the buyer and seller don't matter because no stock is being issued. Sure, generally getting more earnings for less is go...",
      "Synergies refer to cases where 2 + 2 = 5 (or 6, or 7…) in an acquisition. Basically, the buyer gets more value than out of an acquisition than what the financials would predict...."
    ],
    "correct": 0,
    "explanation": "The model is used as a sanity check and is used to test various assumptions. A company would never decide to do a deal based on the output of a model. It might say, \"Ok, the model tells us this deal could work and be moderately accretive - it's worth exploring more.\" It would never say, \"Aha! This model predicts 21% accretion - we should definitely acquire them now!\" Emotions, ego and personalities play a far bigger role in M&A (and any type of negotiation) than numbers do."
  },
  {
    "id": 336,
    "category": "Merger Model - Basic",
    "difficulty": "de",
    "question": "What types of sensitivities would you look at in a merger model? What variables would you look at?",
    "options": [
      "The most common variables to look at are Purchase Price, % Stock/Cash/Debt, Revenue Synergies, and Expense Synergies....",
      "No one in M&A takes revenue synergies seriously because they're so hard to predict....",
      "It might be saving its cash for something else or it might be concerned about running low if business takes a turn for the worst; its stock may also be trading at an all-time high and it might be eager to use that instead (in finance terms this would be \"more expensive\" but a lot...",
      "In an all-stock deal, if the buyer has a higher P/E than the seller, it will be accretive; if the buyer has a lower P/E, it will be dilutive...."
    ],
    "correct": 0,
    "explanation": "The most common variables to look at are Purchase Price, % Stock/Cash/Debt, Revenue Synergies, and Expense Synergies. Sometimes you also look at different operating sensitivities, like Revenue Growth or EBITDA Margin, but it's more common to build these into your model as different scenarios instead. You might look at sensitivity tables showing the EPS accretion/dilution at different ranges for the Purchase Price vs. Cost Synergies, Purchase Price vs. Revenue Synergies, or Purchase Price vs. % Cash (and so on)."
  },
  {
    "id": 337,
    "category": "Merger Model - Advanced",
    "difficulty": "kho",
    "question": "What's the difference between Purchase Accounting and Pooling Accounting in an M&A deal?",
    "options": [
      "In purchase accounting the seller's shareholders' equity number is wiped out and the premium paid over that value is recorded as Goodwill on the combined balance sheet post-acquisition....",
      "The exact treatment depends on the terms of the Purchase Agreement - the buyer might assume them or it might allow the seller to \"cash them out\" assuming that the per-share purchase price is above the exercise prices of these dilutive securities....",
      "An Earnout is a form of \"deferred payment\" in an M&A deal - it's most common with private companies and start-ups, and is highly unusual with public sellers....",
      "A Section 338(h)(10) election blends the benefits of a stock purchase and an asset purchase: • Legally it is a stock purchase, but accounting-wise it's treated like an asset purchase. • The seller is still subject to double-taxation - on its assets that have appreciated and on th..."
    ],
    "correct": 0,
    "explanation": "In purchase accounting the seller's shareholders' equity number is wiped out and the premium paid over that value is recorded as Goodwill on the combined balance sheet post-acquisition. In pooling accounting, you simply combine the 2 shareholders' equity numbers rather than worrying about Goodwill and the related items that get created. There are specific requirements for using pooling accounting, so in 99% of M&A deals you will use purchase accounting."
  },
  {
    "id": 338,
    "category": "Merger Model - Advanced",
    "difficulty": "kho",
    "question": "Walk me through a concrete example of how to calculate revenue synergies.",
    "options": [
      "\"Let's say that Microsoft still wants to acquire Yahoo!. Microsoft has 5,000 SG&A-related employees, whereas Yahoo has around 1,000....",
      "To do this, you would set the EPS accretion / dilution to $0.00 and then back-solve in Excel to get the required synergies to make the deal neutral to EPS....",
      "\"Let's say that Microsoft is going to acquire Yahoo. Yahoo makes money from search advertising online, and they make a certain amount of revenue per search (RPS)....",
      "You create a book vs. cash tax schedule and figure out what the company owes in taxes based on the Pretax Income on its books, and then you determine what it actually pays in cash taxes based on its NOLs and newly created amortization and depreciation expenses (from any asset wri..."
    ],
    "correct": 2,
    "explanation": "\"Let's say that Microsoft is going to acquire Yahoo. Yahoo makes money from search advertising online, and they make a certain amount of revenue per search (RPS). Let's say this RPS is $0.10 right now. If Microsoft acquired it, we might assume that they could boost this RPS by $0.01 or $0.02 because of their superior monetization. So to calculate the additional revenue from this synergy, we would multiply this $0.01 or $0.02 by Yahoo's total # of searches, get the total additional revenue, and then select a margin on it to determine how much flows through to the combined company's Operating Income.\""
  },
  {
    "id": 339,
    "category": "Merger Model - Advanced",
    "difficulty": "kho",
    "question": "Walk me through an example of how to calculate expense synergies.",
    "options": [
      "You take them into account with everything else when calculating the amount of Goodwill & Other Intangibles to create on your pro-forma balance sheet....",
      "To do this, you would set the EPS accretion / dilution to $0.00 and then back-solve in Excel to get the required synergies to make the deal neutral to EPS....",
      "\"Let's say that Microsoft still wants to acquire Yahoo!. Microsoft has 5,000 SG&A-related employees, whereas Yahoo has around 1,000....",
      "There are dozens, but here are the most important ones: • Purchase Price: Stated as a per-share amount for public companies. • Form of Consideration: Cash, Stock, Debt… • Transaction Structure: Stock, Asset, or 338(h)(10) • Treatment of Options: Assumed by the buyer?..."
    ],
    "correct": 2,
    "explanation": "\"Let's say that Microsoft still wants to acquire Yahoo!. Microsoft has 5,000 SG&A-related employees, whereas Yahoo has around 1,000. Microsoft calculates that post-transaction, it will only need about 200 of Yahoo's SG&A employees, and its existing employees can take over the rest of the work. To calculate the Operating Expenses the combined company would save, we would multiply these 800 employees Microsoft is going to fire post-transaction by their average salary.\""
  },
  {
    "id": 340,
    "category": "Merger Model - Advanced",
    "difficulty": "kho",
    "question": "How do you take into account NOLs in an M&A deal?",
    "options": [
      "There are dozens, but here are the most important ones: • Purchase Price: Stated as a per-share amount for public companies. • Form of Consideration: Cash, Stock, Debt… • Transaction Structure: Stock, Asset, or 338(h)(10) • Treatment of Options: Assumed by the buyer?...",
      "\"Let's say that Microsoft is going to acquire Yahoo. Yahoo makes money from search advertising online, and they make a certain amount of revenue per search (RPS)....",
      "You take them into account with everything else when calculating the amount of Goodwill & Other Intangibles to create on your pro-forma balance sheet....",
      "You apply Section 382 to determine how much of the seller's NOLs are usable each year...."
    ],
    "correct": 3,
    "explanation": "You apply Section 382 to determine how much of the seller's NOLs are usable each year. Allowable NOLs = Equity Purchase Price * Highest of Past 3 Months' Adjusted Long Term Rates So if our equity purchase price were $1 billion and the highest adjusted long-term rate were 5%, then we could use $1 billion * 5% = $50 million of NOLs each year. If the seller had $250 million in NOLs, then the combined company could use $50 million of them each year for 5 years to offset its taxable income. You can look at long-term rates right here: http://pmstax.com/afr/exemptAFR.shtml"
  },
  {
    "id": 341,
    "category": "Merger Model - Advanced",
    "difficulty": "kho",
    "question": "Why do deferred tax liabilities (DTLs) and deferred tax assets (DTAs) get created in M&A deals?",
    "options": [
      "In purchase accounting the seller's shareholders' equity number is wiped out and the premium paid over that value is recorded as Goodwill on the combined balance sheet post-acquisition....",
      "These get created when you write up assets - both tangible and intangible - and when you write down assets in a transaction....",
      "Stock Purchase, Asset Purchase, and 338(h)(10) Election. The basic differences: Stock Purchase: • Buyer acquires all asset and liabilities of the seller as well as off-balance sheet items. • The seller is taxed at the capital gains tax rate. • The buyer receives no step-up tax ba...",
      "\"Let's say that Microsoft is going to acquire Yahoo. Yahoo makes money from search advertising online, and they make a certain amount of revenue per search (RPS)...."
    ],
    "correct": 1,
    "explanation": "These get created when you write up assets - both tangible and intangible - and when you write down assets in a transaction. An asset write-up creates a deferred tax liability, and an asset write-down creates a deferred tax asset. You write down and write up assets because their book value - what's on the balance sheet - often differs substantially from their \"fair market value.\" An asset write-up creates a deferred tax liability because you'll have a higher depreciation expense on the new asset, which means you save on taxes in the short-term - but eventually you'll have to pay them back, hence the liability. The opposite applies for an asset write-down and a deferred tax asset."
  },
  {
    "id": 342,
    "category": "Merger Model - Advanced",
    "difficulty": "kho",
    "question": "How do DTLs and DTAs affect the Balance Sheet Adjustment in an M&A deal?",
    "options": [
      "You take them into account with everything else when calculating the amount of Goodwill & Other Intangibles to create on your pro-forma balance sheet....",
      "The mechanics are the same, but the transaction structure is more likely to be an asset purchase or 338(h)(10) election; private sellers also don't have Earnings Per Share so you would only project down to Net Income on the seller's Income Statement....",
      "\"Let's say that Microsoft still wants to acquire Yahoo!. Microsoft has 5,000 SG&A-related employees, whereas Yahoo has around 1,000....",
      "No, because in an asset purchase the book basis of assets always matches the tax basis...."
    ],
    "correct": 0,
    "explanation": "You take them into account with everything else when calculating the amount of Goodwill & Other Intangibles to create on your pro-forma balance sheet. The formulas are as follows: Deferred Tax Asset = Asset Write-Down * Tax Rate Deferred Tax Liability = Asset Write-Up * Tax Rate So let's say you were buying a company for $1 billion with half-cash and half-debt, and you had a $100 million asset write-up and a tax rate of 40%. In addition, the seller has total assets of $200 million, total liabilities of $150 million, and shareholders' equity of $50 million. Here's what would happen to the combined company's balance sheet (ignoring transaction/financing fees): • First, you simply add the seller's Assets and Liabilities (but NOT Shareholders' Equity - it is wiped out) to the buyer's to get your \"initial\" balance sheet. Assets are up by $200 million and Liabilities are down by $150 million. • Then, Cash on the Assets side goes down by $500 million. • Debt on the Liabilities & Equity side goes up by $500 million. • You get a new Deferred Tax Liability of $40 million ($100 million * 40%) on the Liabilities & Equity side. • Assets are down by $300 million total and Liabilities & Shareholders' Equity are up by $690 million ($500 + $40 + $150). • So you need Goodwill & Intangibles of $990 million on the Assets side to make both sides balance."
  },
  {
    "id": 343,
    "category": "Merger Model - Advanced",
    "difficulty": "kho",
    "question": "Could you get DTLs or DTAs in an asset purchase?",
    "options": [
      "No, because in an asset purchase the book basis of assets always matches the tax basis....",
      "\"Let's say that Microsoft still wants to acquire Yahoo!. Microsoft has 5,000 SG&A-related employees, whereas Yahoo has around 1,000....",
      "You apply Section 382 to determine how much of the seller's NOLs are usable each year....",
      "An exchange ratio is an alternate way of structuring a 100% stock M&A deal, or any M&A deal with a portion of stock involved...."
    ],
    "correct": 0,
    "explanation": "No, because in an asset purchase the book basis of assets always matches the tax basis. They get created in a stock purchase because the book values of assets are written up or written down, but the tax values are not."
  },
  {
    "id": 344,
    "category": "Merger Model - Advanced",
    "difficulty": "kho",
    "question": "How do you account for DTLs in forward projections in a merger model?",
    "options": [
      "No, because in an asset purchase the book basis of assets always matches the tax basis....",
      "Stock Purchase, Asset Purchase, and 338(h)(10) Election. The basic differences: Stock Purchase: • Buyer acquires all asset and liabilities of the seller as well as off-balance sheet items. • The seller is taxed at the capital gains tax rate. • The buyer receives no step-up tax ba...",
      "You create a book vs. cash tax schedule and figure out what the company owes in taxes based on the Pretax Income on its books, and then you determine what it actually pays in cash taxes based on its NOLs and newly created amortization and depreciation expenses (from any asset wri...",
      "A contribution analysis compares how much revenue, EBITDA, Pre-Tax Income, cash, and possibly other items the buyer and seller are \"contributing\" to estimate what the ownership of the combined company should be...."
    ],
    "correct": 2,
    "explanation": "You create a book vs. cash tax schedule and figure out what the company owes in taxes based on the Pretax Income on its books, and then you determine what it actually pays in cash taxes based on its NOLs and newly created amortization and depreciation expenses (from any asset write-ups). Anytime the \"cash\" tax expense exceeds the \"book\" tax expense you record this as an decrease to the Deferred Tax Liability on the Balance Sheet; if the \"book\" expense is higher, then you record that as an increase to the DTL."
  },
  {
    "id": 345,
    "category": "Merger Model - Advanced",
    "difficulty": "kho",
    "question": "Explain the complete formula for how to calculate Goodwill in an M&A deal.",
    "options": [
      "To do this, you would set the EPS accretion / dilution to $0.00 and then back-solve in Excel to get the required synergies to make the deal neutral to EPS....",
      "An exchange ratio is an alternate way of structuring a 100% stock M&A deal, or any M&A deal with a portion of stock involved....",
      "A seller almost always prefers a stock purchase to avoid double taxation and to get rid of all its liabilities....",
      "Goodwill = Equity Purchase Price - Seller Book Value + Seller's Existing Goodwill - Asset Write-Ups - Seller's Existing Deferred Tax Liability + Write-Down of Seller's Existing Deferred Tax Asset + Newly Created Deferred Tax Liability A couple notes here: • Seller Book Value is j..."
    ],
    "correct": 3,
    "explanation": "Goodwill = Equity Purchase Price - Seller Book Value + Seller's Existing Goodwill - Asset Write-Ups - Seller's Existing Deferred Tax Liability + Write-Down of Seller's Existing Deferred Tax Asset + Newly Created Deferred Tax Liability A couple notes here: • Seller Book Value is just the Shareholders' Equity number. • You add the Seller's Existing Goodwill because it gets written down to $0 in an M&A deal. • You subtract the Asset Write-Ups because these are additions to the Assets side of the Balance Sheet - Goodwill is also an asset, so effectively you need less Goodwill to \"plug the hole.\" • Normally you assume 100% of the Seller's existing DTL is written down. • The seller's existing DTA may or may not be written down completely (see the next question)."
  },
  {
    "id": 346,
    "category": "Merger Model - Advanced",
    "difficulty": "kho",
    "question": "Explain why we would write down the seller's existing Deferred Tax Asset in an M&A deal.",
    "options": [
      "A contribution analysis compares how much revenue, EBITDA, Pre-Tax Income, cash, and possibly other items the buyer and seller are \"contributing\" to estimate what the ownership of the combined company should be....",
      "A seller almost always prefers a stock purchase to avoid double taxation and to get rid of all its liabilities....",
      "You write it down to reflect the fact that Deferred Tax Assets include NOLs, and that you might use these NOLs post-transaction to offset the combined entity's taxable income....",
      "In purchase accounting the seller's shareholders' equity number is wiped out and the premium paid over that value is recorded as Goodwill on the combined balance sheet post-acquisition...."
    ],
    "correct": 2,
    "explanation": "You write it down to reflect the fact that Deferred Tax Assets include NOLs, and that you might use these NOLs post-transaction to offset the combined entity's taxable income. In an asset or 338(h)(10) purchase you assume that the entire NOL balance goes to $0 in the transaction, and then you write down the existing Deferred Tax Asset by this NOL write-down. In a stock purchase the formula is: DTA Write-Down = Buyer Tax Rate * MAX(0, NOL Balance - Allowed Annual NOL Usage * Expiration Period in Years) This formula is saying, \"If we're going to use up all these NOLs post transaction, let's not write anything down. Otherwise, let's write down the portion that we cannot actually use post-transaction, i.e. whatever our existing NOL balance is minus the amount we can use per year times the number of years.\""
  },
  {
    "id": 347,
    "category": "Merger Model - Advanced",
    "difficulty": "kho",
    "question": "What's a Section 338(h)(10) election and why might a company want to use it in an M&A deal?",
    "options": [
      "An exchange ratio is an alternate way of structuring a 100% stock M&A deal, or any M&A deal with a portion of stock involved....",
      "A Section 338(h)(10) election blends the benefits of a stock purchase and an asset purchase: • Legally it is a stock purchase, but accounting-wise it's treated like an asset purchase. • The seller is still subject to double-taxation - on its assets that have appreciated and on th...",
      "You write it down to reflect the fact that Deferred Tax Assets include NOLs, and that you might use these NOLs post-transaction to offset the combined entity's taxable income....",
      "In the \"old days\" you used to capitalize these expenses and then amortize them; with the new accounting rules, you're supposed to expense transaction and miscellaneous fees upfront, but capitalize the financing fees and amortize them over the life of the debt...."
    ],
    "correct": 1,
    "explanation": "A Section 338(h)(10) election blends the benefits of a stock purchase and an asset purchase: • Legally it is a stock purchase, but accounting-wise it's treated like an asset purchase. • The seller is still subject to double-taxation - on its assets that have appreciated and on the proceeds from the sale. • But the buyer receives a step-up tax basis on the new assets it acquires, and it can depreciate/amortize them so it saves on taxes. Even though the seller still gets taxed twice, buyers will often pay more in a 338(h)(10) deal because of the tax-savings potential. It's particularly helpful for: • Sellers with high NOL balances (more tax-savings for the buyer because this NOL balance will be written down completely - and so more of the excess purchase price can be allocated to asset write-ups). • If the company has been an S-corporation for over 10 years - in this case it doesn't have to pay a tax on the appreciation of its assets. The requirements to use 338(h)(10) are complex and bankers don't deal with this - that is the role of lawyers and tax accountants."
  },
  {
    "id": 348,
    "category": "Merger Model - Advanced",
    "difficulty": "kho",
    "question": "What is an exchange ratio and when would companies use it in an M&A deal?",
    "options": [
      "An Earnout is a form of \"deferred payment\" in an M&A deal - it's most common with private companies and start-ups, and is highly unusual with public sellers....",
      "Stock Purchase, Asset Purchase, and 338(h)(10) Election. The basic differences: Stock Purchase: • Buyer acquires all asset and liabilities of the seller as well as off-balance sheet items. • The seller is taxed at the capital gains tax rate. • The buyer receives no step-up tax ba...",
      "No, because in an asset purchase the book basis of assets always matches the tax basis....",
      "An exchange ratio is an alternate way of structuring a 100% stock M&A deal, or any M&A deal with a portion of stock involved...."
    ],
    "correct": 3,
    "explanation": "An exchange ratio is an alternate way of structuring a 100% stock M&A deal, or any M&A deal with a portion of stock involved. Let's say you were going to buy a company for $100 million in an all-stock deal. Normally you would determine how much stock to issue by dividing the $100 million by the buyer's stock price, and using that to get the new share count. With an exchange ratio, by contrast, you would tie the number of new shares to the buyer's own shares - so the seller might receive 1.5 shares of the buyer's shares for each of its shares, rather than shares worth a specific dollar amount. Buyers might prefer to do this if they believe their stock price is going to decline post- transaction - sellers, on the other hand, would prefer a fixed dollar amount in stock unless they believe the buyer's share price will rise after the transaction."
  },
  {
    "id": 349,
    "category": "Merger Model - Advanced",
    "difficulty": "kho",
    "question": "Walk me through the most important terms of a Purchase Agreement in an M&A deal.",
    "options": [
      "You combine the Income Statements like you normally would (see the previous question on this), and then you do the following: 1....",
      "You take them into account with everything else when calculating the amount of Goodwill & Other Intangibles to create on your pro-forma balance sheet....",
      "There are dozens, but here are the most important ones: • Purchase Price: Stated as a per-share amount for public companies. • Form of Consideration: Cash, Stock, Debt… • Transaction Structure: Stock, Asset, or 338(h)(10) • Treatment of Options: Assumed by the buyer?...",
      "The mechanics are the same, but the transaction structure is more likely to be an asset purchase or 338(h)(10) election; private sellers also don't have Earnings Per Share so you would only project down to Net Income on the seller's Income Statement...."
    ],
    "correct": 2,
    "explanation": "There are dozens, but here are the most important ones: • Purchase Price: Stated as a per-share amount for public companies. • Form of Consideration: Cash, Stock, Debt… • Transaction Structure: Stock, Asset, or 338(h)(10) • Treatment of Options: Assumed by the buyer? Cashed out? Ignored? • Employee Retention: Do employees have to sign non-solicit or non-compete agreements? What about management? • Reps & Warranties: What must the buyer and seller claim is true about their respective businesses? • No-Shop / Go-Shop: Can the seller \"shop\" this offer around and try to get a better deal, or must it stay exclusive to this buyer?"
  },
  {
    "id": 350,
    "category": "Merger Model - Advanced",
    "difficulty": "kho",
    "question": "What's an Earnout and why would a buyer offer it to a seller in an M&A deal?",
    "options": [
      "An Earnout is a form of \"deferred payment\" in an M&A deal - it's most common with private companies and start-ups, and is highly unusual with public sellers....",
      "You create a book vs. cash tax schedule and figure out what the company owes in taxes based on the Pretax Income on its books, and then you determine what it actually pays in cash taxes based on its NOLs and newly created amortization and depreciation expenses (from any asset wri...",
      "No, because in an asset purchase the book basis of assets always matches the tax basis....",
      "An exchange ratio is an alternate way of structuring a 100% stock M&A deal, or any M&A deal with a portion of stock involved...."
    ],
    "correct": 0,
    "explanation": "An Earnout is a form of \"deferred payment\" in an M&A deal - it's most common with private companies and start-ups, and is highly unusual with public sellers. It is usually contingent on financial performance or other goals - for example, the buyer might say, \"We'll give you an additional $10 million in 3 years if you can hit $100 million in revenue by then.\" Buyers use it to incentivize sellers to continue to perform well and to discourage management teams from taking the money and running off to an island in the South Pacific once the deal is done."
  },
  {
    "id": 351,
    "category": "Merger Model - Advanced",
    "difficulty": "kho",
    "question": "How would an accretion / dilution model be different for a private seller?",
    "options": [
      "\"Let's say that Microsoft still wants to acquire Yahoo!. Microsoft has 5,000 SG&A-related employees, whereas Yahoo has around 1,000....",
      "A Section 338(h)(10) election blends the benefits of a stock purchase and an asset purchase: • Legally it is a stock purchase, but accounting-wise it's treated like an asset purchase. • The seller is still subject to double-taxation - on its assets that have appreciated and on th...",
      "The mechanics are the same, but the transaction structure is more likely to be an asset purchase or 338(h)(10) election; private sellers also don't have Earnings Per Share so you would only project down to Net Income on the seller's Income Statement....",
      "You combine the Income Statements like you normally would (see the previous question on this), and then you do the following: 1...."
    ],
    "correct": 2,
    "explanation": "The mechanics are the same, but the transaction structure is more likely to be an asset purchase or 338(h)(10) election; private sellers also don't have Earnings Per Share so you would only project down to Net Income on the seller's Income Statement. Note that accretion / dilution makes no sense if you have a private buyer because private companies do not have Earnings Per Share."
  },
  {
    "id": 352,
    "category": "Merger Model - Advanced",
    "difficulty": "kho",
    "question": "How would I calculate \"break-even synergies\" in an M&A deal and what does the number mean?",
    "options": [
      "You combine the Income Statements like you normally would (see the previous question on this), and then you do the following: 1....",
      "These get created when you write up assets - both tangible and intangible - and when you write down assets in a transaction....",
      "The exact treatment depends on the terms of the Purchase Agreement - the buyer might assume them or it might allow the seller to \"cash them out\" assuming that the per-share purchase price is above the exercise prices of these dilutive securities....",
      "To do this, you would set the EPS accretion / dilution to $0.00 and then back-solve in Excel to get the required synergies to make the deal neutral to EPS...."
    ],
    "correct": 3,
    "explanation": "To do this, you would set the EPS accretion / dilution to $0.00 and then back-solve in Excel to get the required synergies to make the deal neutral to EPS. It's important because you want an idea of whether or not a deal \"works\" mathematically, and a high number for the break-even synergies tells you that you're going to need a lot of cost savings or revenue synergies to make it work."
  },
  {
    "id": 353,
    "category": "Merger Model - Advanced",
    "difficulty": "kho",
    "question": "Normally in an accretion / dilution model you care most about combining both companies' Income Statements. But let's say I want to combine all 3 financial statements - how would I do this?",
    "options": [
      "A contribution analysis compares how much revenue, EBITDA, Pre-Tax Income, cash, and possibly other items the buyer and seller are \"contributing\" to estimate what the ownership of the combined company should be....",
      "There are dozens, but here are the most important ones: • Purchase Price: Stated as a per-share amount for public companies. • Form of Consideration: Cash, Stock, Debt… • Transaction Structure: Stock, Asset, or 338(h)(10) • Treatment of Options: Assumed by the buyer?...",
      "To do this, you would set the EPS accretion / dilution to $0.00 and then back-solve in Excel to get the required synergies to make the deal neutral to EPS....",
      "You combine the Income Statements like you normally would (see the previous question on this), and then you do the following: 1...."
    ],
    "correct": 3,
    "explanation": "You combine the Income Statements like you normally would (see the previous question on this), and then you do the following: 1. Combine the buyer's and seller's balance sheets (except for the seller's Shareholders' Equity number). 2. Make the necessary Pro-Forma Adjustments (cash, debt, goodwill/intangibles, etc.). 3. Project the combined Balance Sheet using standard assumptions for each item (see the Accounting section). 4. Then project the Cash Flow Statement and link everything together as you normally would with any other 3-statement model."
  },
  {
    "id": 354,
    "category": "Merger Model - Advanced",
    "difficulty": "kho",
    "question": "How do you handle options, convertible debt, and other dilutive securities in a merger model?",
    "options": [
      "A Section 338(h)(10) election blends the benefits of a stock purchase and an asset purchase: • Legally it is a stock purchase, but accounting-wise it's treated like an asset purchase. • The seller is still subject to double-taxation - on its assets that have appreciated and on th...",
      "An exchange ratio is an alternate way of structuring a 100% stock M&A deal, or any M&A deal with a portion of stock involved....",
      "You combine the Income Statements like you normally would (see the previous question on this), and then you do the following: 1....",
      "The exact treatment depends on the terms of the Purchase Agreement - the buyer might assume them or it might allow the seller to \"cash them out\" assuming that the per-share purchase price is above the exercise prices of these dilutive securities...."
    ],
    "correct": 3,
    "explanation": "The exact treatment depends on the terms of the Purchase Agreement - the buyer might assume them or it might allow the seller to \"cash them out\" assuming that the per-share purchase price is above the exercise prices of these dilutive securities. If you assume they're exercised, then you calculate dilution to the equity purchase price in the same way you normally would - Treasury Stock Method for options, and assume that convertibles convert into normal shares using the conversion price."
  },
  {
    "id": 355,
    "category": "Merger Model - Advanced",
    "difficulty": "kho",
    "question": "What are the main 3 transaction structures you could use to acquire another company?",
    "options": [
      "In purchase accounting the seller's shareholders' equity number is wiped out and the premium paid over that value is recorded as Goodwill on the combined balance sheet post-acquisition....",
      "To do this, you would set the EPS accretion / dilution to $0.00 and then back-solve in Excel to get the required synergies to make the deal neutral to EPS....",
      "These get created when you write up assets - both tangible and intangible - and when you write down assets in a transaction....",
      "Stock Purchase, Asset Purchase, and 338(h)(10) Election. The basic differences: Stock Purchase: • Buyer acquires all asset and liabilities of the seller as well as off-balance sheet items. • The seller is taxed at the capital gains tax rate. • The buyer receives no step-up tax ba..."
    ],
    "correct": 3,
    "explanation": "Stock Purchase, Asset Purchase, and 338(h)(10) Election. The basic differences: Stock Purchase: • Buyer acquires all asset and liabilities of the seller as well as off-balance sheet items. • The seller is taxed at the capital gains tax rate. • The buyer receives no step-up tax basis for the newly acquired assets, and it can't depreciate/amortize them for tax purposes. • A Deferred Tax Liability gets created as a result of the above. • Most common for public companies and larger private companies. Asset Purchase: • Buyer acquires only certain assets and assumes only certain liabilities of the seller and gets nothing else. • Seller is taxed on the amount its assets have appreciated (what the buyer is paying for each one minus its book value) and also pays a capital gains tax on the proceeds. • The buyer receives a step-up tax basis for the newly acquired assets, and it can depreciate/amortize them for tax purposes. • No Deferred Tax Liability is created as a result of the above. • Most common for private companies, divestitures, and distressed public companies. Section 338(h)(10) Election: • Buyer acquires all asset and liabilities of the seller as well as off-balance sheet items. • Seller is taxed on the amount its assets have appreciated (what the buyer is paying for each one minus its book value) and also pays a capital gains tax on the proceeds. • The buyer receives a step-up tax basis for the newly acquired assets, and it can depreciate/amortize them for tax purposes. • No Deferred Tax Liability is created as a result of the above. • Most common for private companies, divestitures, and distressed public companies. • To compensate for the buyer's favorable tax treatment, the buyer usually agrees to pay more than it would in an Asset Purchase."
  },
  {
    "id": 356,
    "category": "Merger Model - Advanced",
    "difficulty": "kho",
    "question": "Would a seller prefer a stock purchase or an as set purchase? What about the buyer?",
    "options": [
      "A seller almost always prefers a stock purchase to avoid double taxation and to get rid of all its liabilities....",
      "The exact treatment depends on the terms of the Purchase Agreement - the buyer might assume them or it might allow the seller to \"cash them out\" assuming that the per-share purchase price is above the exercise prices of these dilutive securities....",
      "In purchase accounting the seller's shareholders' equity number is wiped out and the premium paid over that value is recorded as Goodwill on the combined balance sheet post-acquisition....",
      "You write it down to reflect the fact that Deferred Tax Assets include NOLs, and that you might use these NOLs post-transaction to offset the combined entity's taxable income...."
    ],
    "correct": 0,
    "explanation": "A seller almost always prefers a stock purchase to avoid double taxation and to get rid of all its liabilities. The buyer almost always prefers an asset deal so it can be more careful about what it acquires and to get the tax benefit from being able to deduct depreciation and amortization of asset write-ups for tax purposes."
  },
  {
    "id": 357,
    "category": "Merger Model - Advanced",
    "difficulty": "kho",
    "question": "Explain what a contribution analysis is and why we might look at it in a merger model.",
    "options": [
      "A seller almost always prefers a stock purchase to avoid double taxation and to get rid of all its liabilities....",
      "A contribution analysis compares how much revenue, EBITDA, Pre-Tax Income, cash, and possibly other items the buyer and seller are \"contributing\" to estimate what the ownership of the combined company should be....",
      "You take them into account with everything else when calculating the amount of Goodwill & Other Intangibles to create on your pro-forma balance sheet....",
      "No, because in an asset purchase the book basis of assets always matches the tax basis...."
    ],
    "correct": 1,
    "explanation": "A contribution analysis compares how much revenue, EBITDA, Pre-Tax Income, cash, and possibly other items the buyer and seller are \"contributing\" to estimate what the ownership of the combined company should be. For example, let's say that the buyer is set to own 50% of the new company and the seller is set to own 50%. But the buyer has $100 million of revenue and the seller has $50 million of revenue - a contribution analysis would tell us that the buyer \"should\" own 66% instead because it's contributing 2/3 of the combined revenue. It's most common to look at this with merger of equals scenarios, and less common when the buyer is significantly larger than the seller."
  },
  {
    "id": 358,
    "category": "Merger Model - Advanced",
    "difficulty": "kho",
    "question": "How do you account for transaction costs, financing fees, and miscellaneous expenses in a merger model?",
    "options": [
      "\"Let's say that Microsoft is going to acquire Yahoo. Yahoo makes money from search advertising online, and they make a certain amount of revenue per search (RPS)....",
      "In the \"old days\" you used to capitalize these expenses and then amortize them; with the new accounting rules, you're supposed to expense transaction and miscellaneous fees upfront, but capitalize the financing fees and amortize them over the life of the debt....",
      "The exact treatment depends on the terms of the Purchase Agreement - the buyer might assume them or it might allow the seller to \"cash them out\" assuming that the per-share purchase price is above the exercise prices of these dilutive securities....",
      "A contribution analysis compares how much revenue, EBITDA, Pre-Tax Income, cash, and possibly other items the buyer and seller are \"contributing\" to estimate what the ownership of the combined company should be...."
    ],
    "correct": 1,
    "explanation": "In the \"old days\" you used to capitalize these expenses and then amortize them; with the new accounting rules, you're supposed to expense transaction and miscellaneous fees upfront, but capitalize the financing fees and amortize them over the life of the debt. Expensed transaction fees come out of Retained Earnings when you adjust the Balance Sheet, while capitalized financing fees appear as a new Asset on the Balance Sheet and are amortized each year according to the tenor of the debt."
  },
  {
    "id": 359,
    "category": "LBO Model - Basic",
    "difficulty": "de",
    "question": "Walk me through a basic LBO model.",
    "options": [
      "\"In an LBO Model, Step 1 is making assumptions about the Purchase Price, Debt/Equity ratio, Interest Rate on Debt and other variables; you might also assume something about the company's operations, such as Revenue Growth or Margins, depending on how much information you have....",
      "To boost your return. Remember, any debt you use in an LBO is not \"your money\" - so if you're paying $5 billion for a company, it's easier to earn a high return on $2 billion of your own money and $3 billion borrowed from elsewhere vs. $3 billion of your own m...",
      "If the PE firm or the company is concerned about meeting interest payments and wants a lower-cost option, they might use bank debt; they might also use bank debt if they are planning on major expansion or Capital Expenditures and don't want to be restricted by incurrence covenant...",
      "Although technology is more \"risky\" than other markets, remember that there are mature, cash flow-stable companies in almost every industry...."
    ],
    "correct": 0,
    "explanation": "\"In an LBO Model, Step 1 is making assumptions about the Purchase Price, Debt/Equity ratio, Interest Rate on Debt and other variables; you might also assume something about the company's operations, such as Revenue Growth or Margins, depending on how much information you have. Step 2 is to create a Sources & Uses section, which shows how you finance the transaction and what you use the capital for; this also tells you how much Investor Equity is required. Step 3 is to adjust the company's Balance Sheet for the new Debt and Equity figures, and also add in Goodwill & Other Intangibles on the Assets side to make everything balance. In Step 4, you project out the company's Income Statement, Balance Sheet and Cash Flow Statement, and determine how much debt is paid off each year, based on the available Cash Flow and the required Interest Payments. Finally, in Step 5, you make assumptions about the exit after several years, usually assuming an EBITDA Exit Multiple, and calculate the return based on how much equity is returned to the firm.\""
  },
  {
    "id": 360,
    "category": "LBO Model - Basic",
    "difficulty": "de",
    "question": "Why would you use leverage when buying a company?",
    "options": [
      "\"Ideal\" candidates have stable and predictable cash flows, low-risk businesses, not much need for ongoing investments such as Capital Expenditures, as well as an opportunity for expense reductions to boost their margins....",
      "Purchase and exit multiples have the biggest impact on the returns of a model. After that, the amount of leverage (debt) used also has a significant impact, followed by operational characteristics such as revenue growth and EBITDA margins.",
      "To boost your return. Remember, any debt you use in an LBO is not \"your money\" - so if you're paying $5 billion for a company, it's easier to earn a high return on $2 billion of your own money and $3 billion borrowed from elsewhere vs. $3 billion of your own m...",
      "This is completely dependent on the company, the industry, and the leverage and coverage ratios for comparable LBO transactions...."
    ],
    "correct": 2,
    "explanation": "To boost your return. Remember, any debt you use in an LBO is not \"your money\" - so if you're paying $5 billion for a company, it's easier to earn a high return on $2 billion of your own money and $3 billion borrowed from elsewhere vs. $3 billion of your own money and $2 billion of borrowed money. A secondary benefit is that the firm also has more capital available to purchase other companies because they've used leverage."
  },
  {
    "id": 361,
    "category": "LBO Model - Basic",
    "difficulty": "de",
    "question": "What variables impact an LBO model the most?",
    "options": [
      "No changes to the Income Statement. On the Balance Sheet, Debt would go up and Shareholders' Equity would go down and they would cancel each other out so that everything remained in balance....",
      "Remember, these both represent the premium paid to the \"fair market value\" of the company....",
      "Purchase and exit multiples have the biggest impact on the returns of a model. After that, the amount of leverage (debt) used also has a significant impact, followed by operational characteristics such as revenue growth and EBITDA margins.",
      "Yes, there are shortcuts and you don't necessarily need to project all 3 statements...."
    ],
    "correct": 2,
    "explanation": "Purchase and exit multiples have the biggest impact on the returns of a model. After that, the amount of leverage (debt) used also has a significant impact, followed by operational characteristics such as revenue growth and EBITDA margins."
  },
  {
    "id": 362,
    "category": "LBO Model - Basic",
    "difficulty": "de",
    "question": "How do you pick purchase multiples and exit multiples in an LBO model?",
    "options": [
      "If the PE firm or the company is concerned about meeting interest payments and wants a lower-cost option, they might use bank debt; they might also use bank debt if they are planning on major expansion or Capital Expenditures and don't want to be restricted by incurrence covenant...",
      "The same way you do it anywhere else: you look at what comparable companies are trading at, and what multiples similar LBO transactions have had....",
      "To boost your return. Remember, any debt you use in an LBO is not \"your money\" - so if you're paying $5 billion for a company, it's easier to earn a high return on $2 billion of your own money and $3 billion borrowed from elsewhere vs. $3 billion of your own m...",
      "Purchase and exit multiples have the biggest impact on the returns of a model. After that, the amount of leverage (debt) used also has a significant impact, followed by operational characteristics such as revenue growth and EBITDA margins."
    ],
    "correct": 1,
    "explanation": "The same way you do it anywhere else: you look at what comparable companies are trading at, and what multiples similar LBO transactions have had. As always, you also show a range of purchase and exit multiples using sensitivity tables. Sometimes you set purchase and exit multiples based on a specific IRR target that you're trying to achieve - but this is just for valuation purposes if you're using an LBO model to value the company."
  },
  {
    "id": 363,
    "category": "LBO Model - Basic",
    "difficulty": "de",
    "question": "What is an \"ideal\" candidate for an LBO?",
    "options": [
      "First, the Liabilities & Equities side is adjusted - the new debt is added on, and the Shareholders' Equity is \"wiped out\" and replaced by however much equity the private equity firm is contributing....",
      "\"Ideal\" candidates have stable and predictable cash flows, low-risk businesses, not much need for ongoing investments such as Capital Expenditures, as well as an opportunity for expense reductions to boost their margins....",
      "To boost your return. Remember, any debt you use in an LBO is not \"your money\" - so if you're paying $5 billion for a company, it's easier to earn a high return on $2 billion of your own money and $3 billion borrowed from elsewhere vs. $3 billion of your own m...",
      "\"In an LBO Model, Step 1 is making assumptions about the Purchase Price, Debt/Equity ratio, Interest Rate on Debt and other variables; you might also assume something about the company's operations, such as Revenue Growth or Margins, depending on how much information you have...."
    ],
    "correct": 1,
    "explanation": "\"Ideal\" candidates have stable and predictable cash flows, low-risk businesses, not much need for ongoing investments such as Capital Expenditures, as well as an opportunity for expense reductions to boost their margins. A strong management team also helps, as does a base of assets to use as collateral for debt. The most important part is stable cash flow."
  },
  {
    "id": 364,
    "category": "LBO Model - Basic",
    "difficulty": "de",
    "question": "How do you use an LBO model to value a company, and why do we sometimes say that it sets the \"floor valuation\" for the company?",
    "options": [
      "Usually you would look at Comparable LBOs and see the terms of the debt and how many tranches each of them used....",
      "This is completely dependent on the company, the industry, and the leverage and coverage ratios for comparable LBO transactions....",
      "Remember, these both represent the premium paid to the \"fair market value\" of the company....",
      "You use it to value a company by setting a targeted IRR (for example, 25%) and then back-solving in Excel to determine what purchase price the PE firm could pay to achieve that IRR...."
    ],
    "correct": 3,
    "explanation": "You use it to value a company by setting a targeted IRR (for example, 25%) and then back-solving in Excel to determine what purchase price the PE firm could pay to achieve that IRR. This is sometimes called a \"floor valuation\" because PE firms almost always pay less for a company than strategic acquirers would."
  },
  {
    "id": 365,
    "category": "LBO Model - Basic",
    "difficulty": "de",
    "question": "Give an example of a \"real-life\" LBO.",
    "options": [
      "In a dividend recap, the company takes on new debt solely to pay a special dividend out to the PE firm that bought it....",
      "\"In an LBO Model, Step 1 is making assumptions about the Purchase Price, Debt/Equity ratio, Interest Rate on Debt and other variables; you might also assume something about the company's operations, such as Revenue Growth or Margins, depending on how much information you have....",
      "This means that the interest a firm pays on debt is tax-deductible - so they save money on taxes and therefore increase their cash flow as a result of having debt from the LBO....",
      "The most common example is taking out a mortgage when you buy a house. Here's how the analogy works: • Down Payment: Investor Equity in an LBO • Mortgage: Debt in an LBO • Mortgage Interest Payments: Debt Interest in an LBO • Mortgage Repayments: Debt Principal Repayments in an L..."
    ],
    "correct": 3,
    "explanation": "The most common example is taking out a mortgage when you buy a house. Here's how the analogy works: • Down Payment: Investor Equity in an LBO • Mortgage: Debt in an LBO • Mortgage Interest Payments: Debt Interest in an LBO • Mortgage Repayments: Debt Principal Repayments in an LBO • Selling the House: Selling the Company / Taking It Public in an LBO"
  },
  {
    "id": 366,
    "category": "LBO Model - Basic",
    "difficulty": "de",
    "question": "Can you explain how the Balance Sheet is adjusted in an LBO model?",
    "options": [
      "This is a simplification, but broadly speaking there are 2 \"types\" of debt: \"bank debt\" and \"high-yield debt.\" There are many differences, but here are a few of the most important ones: • High-yield debt tends to have higher interest rates than bank debt (hence the name \"high-yie...",
      "No changes to the Income Statement. On the Balance Sheet, Debt would go up and Shareholders' Equity would go down and they would cancel each other out so that everything remained in balance....",
      "Purchase and exit multiples have the biggest impact on the returns of a model. After that, the amount of leverage (debt) used also has a significant impact, followed by operational characteristics such as revenue growth and EBITDA margins.",
      "First, the Liabilities & Equities side is adjusted - the new debt is added on, and the Shareholders' Equity is \"wiped out\" and replaced by however much equity the private equity firm is contributing...."
    ],
    "correct": 3,
    "explanation": "First, the Liabilities & Equities side is adjusted - the new debt is added on, and the Shareholders' Equity is \"wiped out\" and replaced by however much equity the private equity firm is contributing. On the Assets side, Cash is adjusted for any cash used to finance the transaction, and then Goodwill & Other Intangibles are used as a \"plug\" to make the Balance Sheet balance. Depending on the transaction, there could be other effects as well - such as capitalized financing fees added to the Assets side."
  },
  {
    "id": 367,
    "category": "LBO Model - Basic",
    "difficulty": "de",
    "question": "Why are Goodwill & Other Intangibles created in an LBO?",
    "options": [
      "This is completely dependent on the company, the industry, and the leverage and coverage ratios for comparable LBO transactions....",
      "It's a different scenario because: 1. The PE firm does not intend to hold the company for the long-term - it usually sells it after a few years, so it is less concerned with the \"expense\" of cash vs. debt and more concerned about using leverage to boost its returns by reducing th...",
      "Remember, these both represent the premium paid to the \"fair market value\" of the company....",
      "You use it to value a company by setting a targeted IRR (for example, 25%) and then back-solving in Excel to determine what purchase price the PE firm could pay to achieve that IRR...."
    ],
    "correct": 2,
    "explanation": "Remember, these both represent the premium paid to the \"fair market value\" of the company. In an LBO, they act as a \"plug\" and ensure that the changes to the Liabilities & Equity side are balanced by changes to the Assets side."
  },
  {
    "id": 368,
    "category": "LBO Model - Basic",
    "difficulty": "de",
    "question": "We saw that a strategic acquirer will usually prefer to pay for another company in cash - if that's the case, why would a PE firm want to use debt in an LBO?",
    "options": [
      "It's a different scenario because: 1. The PE firm does not intend to hold the company for the long-term - it usually sells it after a few years, so it is less concerned with the \"expense\" of cash vs. debt and more concerned about using leverage to boost its returns by reducing th...",
      "Remember, these both represent the premium paid to the \"fair market value\" of the company....",
      "You use it to value a company by setting a targeted IRR (for example, 25%) and then back-solving in Excel to determine what purchase price the PE firm could pay to achieve that IRR....",
      "This is a simplification, but broadly speaking there are 2 \"types\" of debt: \"bank debt\" and \"high-yield debt.\" There are many differences, but here are a few of the most important ones: • High-yield debt tends to have higher interest rates than bank debt (hence the name \"high-yie..."
    ],
    "correct": 0,
    "explanation": "It's a different scenario because: 1. The PE firm does not intend to hold the company for the long-term - it usually sells it after a few years, so it is less concerned with the \"expense\" of cash vs. debt and more concerned about using leverage to boost its returns by reducing the amount of capital it has to contribute upfront. 2. In an LBO, the debt is \"owned\" by the company, so they assume much of the risk. Whereas in a strategic acquisition, the buyer \"owns\" the debt so it is more risky for them."
  },
  {
    "id": 369,
    "category": "LBO Model - Basic",
    "difficulty": "de",
    "question": "Do you need to project all 3 statements in an LBO model? Are there any \"shortcuts?\"",
    "options": [
      "Remember, these both represent the premium paid to the \"fair market value\" of the company....",
      "Yes, there are shortcuts and you don't necessarily need to project all 3 statements....",
      "First, the Liabilities & Equities side is adjusted - the new debt is added on, and the Shareholders' Equity is \"wiped out\" and replaced by however much equity the private equity firm is contributing....",
      "The same way you do it anywhere else: you look at what comparable companies are trading at, and what multiples similar LBO transactions have had...."
    ],
    "correct": 1,
    "explanation": "Yes, there are shortcuts and you don't necessarily need to project all 3 statements. For example, you do not need to create a full Balance Sheet - bankers sometimes skip this if they are in a rush. You do need some form of Income Statement, something to track how the Debt balances change and some type of Cash Flow Statement to show how much cash is available to repay debt. But a full-blown Balance Sheet is not strictly required, because you can just make assumptions on the Net Change in Working Capital rather than looking at each item individually."
  },
  {
    "id": 370,
    "category": "LBO Model - Basic",
    "difficulty": "de",
    "question": "How would you determine how much debt can be raised in an LBO and how many tranches there would be?",
    "options": [
      "If the PE firm intends to refinance the company at some point or they don't believe their returns are too sensitive to interest payments, they might use high-yield debt....",
      "Usually you would look at Comparable LBOs and see the terms of the debt and how many tranches each of them used....",
      "\"Ideal\" candidates have stable and predictable cash flows, low-risk businesses, not much need for ongoing investments such as Capital Expenditures, as well as an opportunity for expense reductions to boost their margins....",
      "Remember, these both represent the premium paid to the \"fair market value\" of the company...."
    ],
    "correct": 1,
    "explanation": "Usually you would look at Comparable LBOs and see the terms of the debt and how many tranches each of them used. You would look at companies in a similar size range and industry and use those criteria to determine the debt your company can raise."
  },
  {
    "id": 371,
    "category": "LBO Model - Basic",
    "difficulty": "de",
    "question": "Let's say we're analyzing how much debt a company can take on, and what the terms of the debt should be. What are reasonable leverage and coverage ratios?",
    "options": [
      "This is completely dependent on the company, the industry, and the leverage and coverage ratios for comparable LBO transactions....",
      "If the PE firm intends to refinance the company at some point or they don't believe their returns are too sensitive to interest payments, they might use high-yield debt....",
      "\"In an LBO Model, Step 1 is making assumptions about the Purchase Price, Debt/Equity ratio, Interest Rate on Debt and other variables; you might also assume something about the company's operations, such as Revenue Growth or Margins, depending on how much information you have....",
      "Primarily to boost returns. Remember, all else being equal, more leverage means a higher return to the firm. With a dividend recap, the PE firm is \"recovering\" some of its equity investment in the company - and as we saw earlier, the lower the equity investmen..."
    ],
    "correct": 0,
    "explanation": "This is completely dependent on the company, the industry, and the leverage and coverage ratios for comparable LBO transactions. To figure out the numbers, you would look at \"debt comps\" showing the types, tranches, and terms of debt that similarly sized companies in the industry have used recently. There are some general rules: for example, you would never lever a company at 50x EBITDA, and even during the bubble leverage rarely exceeded 5-10x EBITDA."
  },
  {
    "id": 372,
    "category": "LBO Model - Basic",
    "difficulty": "de",
    "question": "What is the difference between bank debt and high-yield debt?",
    "options": [
      "This is a simplification, but broadly speaking there are 2 \"types\" of debt: \"bank debt\" and \"high-yield debt.\" There are many differences, but here are a few of the most important ones: • High-yield debt tends to have higher interest rates than bank debt (hence the name \"high-yie...",
      "\"Ideal\" candidates have stable and predictable cash flows, low-risk businesses, not much need for ongoing investments such as Capital Expenditures, as well as an opportunity for expense reductions to boost their margins....",
      "1. Lower the Purchase Price in the model. 2. Raise the Exit Multiple / Exit Price. 3. Increase the Leverage (debt) used. 4. Increase the company's growth rate (organically or via acquisitions). 5. Increase margins by reducing expenses (cutting employees, conso...",
      "If the PE firm or the company is concerned about meeting interest payments and wants a lower-cost option, they might use bank debt; they might also use bank debt if they are planning on major expansion or Capital Expenditures and don't want to be restricted by incurrence covenant..."
    ],
    "correct": 0,
    "explanation": "This is a simplification, but broadly speaking there are 2 \"types\" of debt: \"bank debt\" and \"high-yield debt.\" There are many differences, but here are a few of the most important ones: • High-yield debt tends to have higher interest rates than bank debt (hence the name \"high-yield\"). • High-yield debt interest rates are usually fixed, whereas bank debt interest rates are \"floating\" - they change based on LIBOR or the Fed interest rate. • High-yield debt has incurrence covenants while bank debt has maintenance covenants. The main difference is that incurrence covenants prevent you from doing something (such as selling an asset, buying a factory, etc.) while maintenance covenants require you to maintain a minimum financial performance (for example, the Debt/EBITDA ratio must be below 5x at all times). • Bank debt is usually amortized - the principal must be paid off over time - whereas with high-yield debt, the entire principal is due at the end (bullet maturity). Usually in a sizable Leveraged Buyout, the PE firm uses both types of debt. Again, there are many different types of debt - this is a simplification, but it's enough for entry-level interviews."
  },
  {
    "id": 373,
    "category": "LBO Model - Basic",
    "difficulty": "de",
    "question": "Why might you use bank debt rather than high-yield debt in an LBO?",
    "options": [
      "Primarily to boost returns. Remember, all else being equal, more leverage means a higher return to the firm. With a dividend recap, the PE firm is \"recovering\" some of its equity investment in the company - and as we saw earlier, the lower the equity investmen...",
      "Purchase and exit multiples have the biggest impact on the returns of a model. After that, the amount of leverage (debt) used also has a significant impact, followed by operational characteristics such as revenue growth and EBITDA margins.",
      "No changes to the Income Statement. On the Balance Sheet, Debt would go up and Shareholders' Equity would go down and they would cancel each other out so that everything remained in balance....",
      "If the PE firm or the company is concerned about meeting interest payments and wants a lower-cost option, they might use bank debt; they might also use bank debt if they are planning on major expansion or Capital Expenditures and don't want to be restricted by incurrence covenant..."
    ],
    "correct": 3,
    "explanation": "If the PE firm or the company is concerned about meeting interest payments and wants a lower-cost option, they might use bank debt; they might also use bank debt if they are planning on major expansion or Capital Expenditures and don't want to be restricted by incurrence covenants."
  },
  {
    "id": 374,
    "category": "LBO Model - Basic",
    "difficulty": "de",
    "question": "Why would a PE firm prefer high-yield debt instead?",
    "options": [
      "If the PE firm intends to refinance the company at some point or they don't believe their returns are too sensitive to interest payments, they might use high-yield debt....",
      "\"Ideal\" candidates have stable and predictable cash flows, low-risk businesses, not much need for ongoing investments such as Capital Expenditures, as well as an opportunity for expense reductions to boost their margins....",
      "This is a simplification, but broadly speaking there are 2 \"types\" of debt: \"bank debt\" and \"high-yield debt.\" There are many differences, but here are a few of the most important ones: • High-yield debt tends to have higher interest rates than bank debt (hence the name \"high-yie...",
      "This means that the interest a firm pays on debt is tax-deductible - so they save money on taxes and therefore increase their cash flow as a result of having debt from the LBO...."
    ],
    "correct": 0,
    "explanation": "If the PE firm intends to refinance the company at some point or they don't believe their returns are too sensitive to interest payments, they might use high-yield debt. They might also use the high-yield option if they don't have plans for major expansion or selling off the company's assets."
  },
  {
    "id": 375,
    "category": "LBO Model - Basic",
    "difficulty": "de",
    "question": "Why would a private equity firm buy a company in a \"risky\" industry, such as technology?",
    "options": [
      "Although technology is more \"risky\" than other markets, remember that there are mature, cash flow-stable companies in almost every industry....",
      "No changes to the Income Statement. On the Balance Sheet, Debt would go up and Shareholders' Equity would go down and they would cancel each other out so that everything remained in balance....",
      "First, the Liabilities & Equities side is adjusted - the new debt is added on, and the Shareholders' Equity is \"wiped out\" and replaced by however much equity the private equity firm is contributing....",
      "\"Ideal\" candidates have stable and predictable cash flows, low-risk businesses, not much need for ongoing investments such as Capital Expenditures, as well as an opportunity for expense reductions to boost their margins...."
    ],
    "correct": 0,
    "explanation": "Although technology is more \"risky\" than other markets, remember that there are mature, cash flow-stable companies in almost every industry. There are some PE firms that specialize in very specific goals, such as: • Industry consolidation - buying competitors in a similar market and combining them to increase efficiency and win more customers. • Turnarounds - taking struggling companies and making them function properly again. • Divestitures - selling off divisions of a company or taking a division and turning it into a strong stand-alone entity. So even if a company isn't doing well or seems risky, the firm might buy it if it falls into one of these categories."
  },
  {
    "id": 376,
    "category": "LBO Model - Basic",
    "difficulty": "de",
    "question": "How could a private equity firm boost its return in an LBO?",
    "options": [
      "This means that the interest a firm pays on debt is tax-deductible - so they save money on taxes and therefore increase their cash flow as a result of having debt from the LBO....",
      "\"Ideal\" candidates have stable and predictable cash flows, low-risk businesses, not much need for ongoing investments such as Capital Expenditures, as well as an opportunity for expense reductions to boost their margins....",
      "1. Lower the Purchase Price in the model. 2. Raise the Exit Multiple / Exit Price. 3. Increase the Leverage (debt) used. 4. Increase the company's growth rate (organically or via acquisitions). 5. Increase margins by reducing expenses (cutting employees, conso...",
      "If the PE firm intends to refinance the company at some point or they don't believe their returns are too sensitive to interest payments, they might use high-yield debt...."
    ],
    "correct": 2,
    "explanation": "1. Lower the Purchase Price in the model. 2. Raise the Exit Multiple / Exit Price. 3. Increase the Leverage (debt) used. 4. Increase the company's growth rate (organically or via acquisitions). 5. Increase margins by reducing expenses (cutting employees, consolidating buildings, etc.). Note that these are all \"theoretical\" and refer to the model rather than reality - in practice it's hard to actually implement these."
  },
  {
    "id": 377,
    "category": "LBO Model - Basic",
    "difficulty": "de",
    "question": "What is meant by the \"tax shield\" in an LBO?",
    "options": [
      "This means that the interest a firm pays on debt is tax-deductible - so they save money on taxes and therefore increase their cash flow as a result of having debt from the LBO....",
      "In a dividend recap, the company takes on new debt solely to pay a special dividend out to the PE firm that bought it....",
      "Usually you would look at Comparable LBOs and see the terms of the debt and how many tranches each of them used....",
      "Although technology is more \"risky\" than other markets, remember that there are mature, cash flow-stable companies in almost every industry...."
    ],
    "correct": 0,
    "explanation": "This means that the interest a firm pays on debt is tax-deductible - so they save money on taxes and therefore increase their cash flow as a result of having debt from the LBO. Note, however, that their cash flow is still lower than it would be without the debt - saving on taxes helps, but the added interest expenses still reduces Net Income over what it would be for a debt-free company."
  },
  {
    "id": 378,
    "category": "LBO Model - Basic",
    "difficulty": "de",
    "question": "What is a dividend recapitalization (\"dividend recap\")?",
    "options": [
      "Purchase and exit multiples have the biggest impact on the returns of a model. After that, the amount of leverage (debt) used also has a significant impact, followed by operational characteristics such as revenue growth and EBITDA margins.",
      "In a dividend recap, the company takes on new debt solely to pay a special dividend out to the PE firm that bought it....",
      "Usually you would look at Comparable LBOs and see the terms of the debt and how many tranches each of them used....",
      "You use it to value a company by setting a targeted IRR (for example, 25%) and then back-solving in Excel to determine what purchase price the PE firm could pay to achieve that IRR...."
    ],
    "correct": 1,
    "explanation": "In a dividend recap, the company takes on new debt solely to pay a special dividend out to the PE firm that bought it. It would be like if you made your friend take out a personal loan just so he/she could pay you a lump sum of cash with the loan proceeds. As you might guess, dividend recaps have developed a bad reputation, though they're still commonly used."
  },
  {
    "id": 379,
    "category": "LBO Model - Basic",
    "difficulty": "de",
    "question": "Why would a PE firm choose to do a dividend recap of one of its portfolio companies?",
    "options": [
      "If the PE firm intends to refinance the company at some point or they don't believe their returns are too sensitive to interest payments, they might use high-yield debt....",
      "This is a simplification, but broadly speaking there are 2 \"types\" of debt: \"bank debt\" and \"high-yield debt.\" There are many differences, but here are a few of the most important ones: • High-yield debt tends to have higher interest rates than bank debt (hence the name \"high-yie...",
      "Primarily to boost returns. Remember, all else being equal, more leverage means a higher return to the firm. With a dividend recap, the PE firm is \"recovering\" some of its equity investment in the company - and as we saw earlier, the lower the equity investmen...",
      "This is completely dependent on the company, the industry, and the leverage and coverage ratios for comparable LBO transactions...."
    ],
    "correct": 2,
    "explanation": "Primarily to boost returns. Remember, all else being equal, more leverage means a higher return to the firm. With a dividend recap, the PE firm is \"recovering\" some of its equity investment in the company - and as we saw earlier, the lower the equity investment, the better, since it's easier to earn a higher return on a smaller amount of capital."
  },
  {
    "id": 380,
    "category": "LBO Model - Basic",
    "difficulty": "de",
    "question": "How would a dividend recap impact the 3 financial statements in an LBO?",
    "options": [
      "This means that the interest a firm pays on debt is tax-deductible - so they save money on taxes and therefore increase their cash flow as a result of having debt from the LBO....",
      "No changes to the Income Statement. On the Balance Sheet, Debt would go up and Shareholders' Equity would go down and they would cancel each other out so that everything remained in balance....",
      "This is a simplification, but broadly speaking there are 2 \"types\" of debt: \"bank debt\" and \"high-yield debt.\" There are many differences, but here are a few of the most important ones: • High-yield debt tends to have higher interest rates than bank debt (hence the name \"high-yie...",
      "Remember, these both represent the premium paid to the \"fair market value\" of the company...."
    ],
    "correct": 1,
    "explanation": "No changes to the Income Statement. On the Balance Sheet, Debt would go up and Shareholders' Equity would go down and they would cancel each other out so that everything remained in balance. On the Cash Flow Statement, there would be no changes to Cash Flow from Operations or Investing, but under Financing the additional Debt raised would cancel out the Cash paid out to the investors, so Net Change in Cash would not change."
  },
  {
    "id": 381,
    "category": "LBO Model - Advanced",
    "difficulty": "kho",
    "question": "Tell me about all the different kinds of debt you could use in an LBO and the differences between everything.",
    "options": [
      "First, note that you only look at optional repayments for Revolvers and Term Loans - high-yield debt doesn't have a prepayment option, so effectively it's always $0....",
      "You use a Revolver when the cash required for your Mandatory Debt Repayments exceeds the cash flow you have available to repay them....",
      "Here's a handy chart to explain all of this. Note that this chart does not cover every single feature or every single type of debt in the universe - just the most important ones, and what you're likely to be asked about in finance interviews: Debt Type Revolver Term Loan A Term L...",
      "Unlike \"normal\" debt, a PIK loan does not require the borrower to make cash interest payments - instead, the interest just accrues to the loan principal, which keeps going up over time...."
    ],
    "correct": 2,
    "explanation": "Here's a handy chart to explain all of this. Note that this chart does not cover every single feature or every single type of debt in the universe - just the most important ones, and what you're likely to be asked about in finance interviews: Debt Type Revolver Term Loan A Term Loan B Senior Notes Subordinated Notes Mezzanine Interest Rate: Lowest Low Higher Higher Higher Highest Floating / Fixed? Floating Fixed Cash Pay? Yes Cash / PIK Tenor: 3-5 years 4-6 years 4-8 years 7-10 years 8-10 years 8-12 years Amortization: None Straight Line Minimal Bullet Prepayment? Yes No Investors: Conservative Banks HFs, Merchant Banks, Mezzanine Funds Seniority Senior Secured Senior Unsecured Senior Subordinated Equity Secured? Yes Sometimes No Call Protection? No Sometimes Yes Covenants: Maintenance Incurrence \"Tenor\" is just the fancy word for \"How many years will this loan be outstanding?\" Each type of debt is arranged in order of rising interest rates - so a revolver has the lowest interest rate, Term Loan A is slightly higher, B is slightly higher, Senior Notes are higher than Term Loan B, and so on. \"Seniority\" refers to the order of claims on a company's assets in a bankruptcy - the Senior Secured holders are first in line, followed by Senior Unsecured, Senior Subordinated, and then Equity Investors. \"Floating\" or \"Fixed\" Interest Rates: A \"floating\" interest rate is tied to LIBOR. For example, L + 100 means that the interest rate of the loan is whatever LIBOR is at currently, plus 100 basis points (1.0%). A fixed interest rate, on the other hand, would be 11%. It doesn't \"float\" with LIBOR or any other rate. Amortization: \"straight line\" means the company pays off the principal in equal installments each year, while \"bullet\" means that the entire principal is due at the end of the loan's lifecycle. \"Minimal\" just means a low percentage of the principal each year, usually in the 1-5% range. Call Protection: Is the company prohibited from \"calling back\" - paying off or redeeming - the security for a certain period? This is beneficial for investors because they are guaranteed a certain number of interest payments."
  },
  {
    "id": 382,
    "category": "LBO Model - Advanced",
    "difficulty": "kho",
    "question": "How would an asset write-up or write-down affect an LBO model? / Walk me through how you adjust the Balance Sheet in an LBO model.",
    "options": [
      "For the debt investors, you need to calculate the interest and principal payments they receive from the company each year....",
      "First, note that you only look at optional repayments for Revolvers and Term Loans - high-yield debt doesn't have a prepayment option, so effectively it's always $0....",
      "Yes, and it happens more commonly than you'd think. Remember, high-yield debt investors often get interest rates of 10-15% or more - which effectively guarantees an IRR in that range for them....",
      "All of this is very similar to what you would see in a merger model - you calculate Goodwill, Other Intangibles, and the rest of the write-ups in the same way, and then the Balance Sheet adjustments (e.g. subtracting cash, adding in capitalized financing fees, writing up assets..."
    ],
    "correct": 3,
    "explanation": "All of this is very similar to what you would see in a merger model - you calculate Goodwill, Other Intangibles, and the rest of the write-ups in the same way, and then the Balance Sheet adjustments (e.g. subtracting cash, adding in capitalized financing fees, writing up assets, wiping out goodwill, adjusting the deferred tax assets / liabilities, adding in new debt, etc.) are almost the same. The key differences: • In an LBO model you assume that the existing Shareholders' Equity is wiped out and replaced by the equity the private equity firm contributes to buy the company; you may also add in Preferred Stock, Management Rollover, or Rollover from Option Holders to this number as well depending on what you're assuming for transaction financing. • In an LBO model you'll usually be adding a lot more tranches of debt vs. what you would see in a merger model. • In an LBO model you're not combining two companies' Balance Sheets."
  },
  {
    "id": 383,
    "category": "LBO Model - Advanced",
    "difficulty": "kho",
    "question": "Normally we care about the IRR for the equity investors in an LBO - the PE firm that buys the company - but how do we calculate the IRR for the debt investors?",
    "options": [
      "First, note that you only look at optional repayments for Revolvers and Term Loans - high-yield debt doesn't have a prepayment option, so effectively it's always $0....",
      "For the debt investors, you need to calculate the interest and principal payments they receive from the company each year....",
      "The most common adjustments: • Cost Savings - Often you assume the PE firm cuts costs by laying off employees, which could affect COGS, Operating Expenses, or both. • New Depreciation Expense - This comes from any PP&E write-ups in the transaction. • New Amortization Expense - Th...",
      "You use a Revolver when the cash required for your Mandatory Debt Repayments exceeds the cash flow you have available to repay them...."
    ],
    "correct": 1,
    "explanation": "For the debt investors, you need to calculate the interest and principal payments they receive from the company each year. Then you simply use the IRR function in Excel and start with the negative amount of the original debt for \"Year 0,\" assume that the interest and principal payments each year are your \"cash flows\" and then assume that the remaining debt balance in the final year is your \"exit value.\" Most of the time, returns for debt investors will be lower than returns for the equity investors - but if the deal goes poorly or the PE firm can't sell the company for a good price, the reverse could easily be true."
  },
  {
    "id": 384,
    "category": "LBO Model - Advanced",
    "difficulty": "kho",
    "question": "Why might a private equity firm allot some of a company's new equity in an LBO to a management option pool, and how would this affect the model?",
    "options": [
      "You use a Revolver when the cash required for your Mandatory Debt Repayments exceeds the cash flow you have available to repay them....",
      "This is done for the same reason you have an Earnout in an M&A deal: the PE firm wants to incentivize the management team and keep everyone on-board until they exit the investment....",
      "Here's a handy chart to explain all of this. Note that this chart does not cover every single feature or every single type of debt in the universe - just the most important ones, and what you're likely to be asked about in finance interviews: Debt Type Revolver Term Loan A Term L...",
      "The most common adjustments: • Cost Savings - Often you assume the PE firm cuts costs by laying off employees, which could affect COGS, Operating Expenses, or both. • New Depreciation Expense - This comes from any PP&E write-ups in the transaction. • New Amortization Expense - Th..."
    ],
    "correct": 1,
    "explanation": "This is done for the same reason you have an Earnout in an M&A deal: the PE firm wants to incentivize the management team and keep everyone on-board until they exit the investment. The difference is that there's no technical limit on how much management might receive from such an option pool: if they hit it out of the park, maybe they'll all become millionaires. In your LBO model, you would need to calculate a per-share purchase price when the PE firm exits the investment, and then calculate how much of the proceeds go to the management team based on the Treasury Stock Method. An option pool by itself would reduce the PE firm's return, but this is offset by the fact that the company should perform better with this incentive in place."
  },
  {
    "id": 385,
    "category": "LBO Model - Advanced",
    "difficulty": "kho",
    "question": "Why you would you use PIK (Payment In Kind) debt rather than other types of debt, and how does it affect the debt schedules and the other statements?",
    "options": [
      "Unlike \"normal\" debt, a PIK loan does not require the borrower to make cash interest payments - instead, the interest just accrues to the loan principal, which keeps going up over time....",
      "You use a Revolver when the cash required for your Mandatory Debt Repayments exceeds the cash flow you have available to repay them....",
      "Incurrence Covenants: • Company cannot take on more than $2 billion of total debt. • Proceeds from any asset sales must be earmarked to repay debt. • Company cannot make acquisitions of over $200 million in size. • Company cannot spend more than $100 million on CapEx each year....",
      "The most common adjustments: • Cost Savings - Often you assume the PE firm cuts costs by laying off employees, which could affect COGS, Operating Expenses, or both. • New Depreciation Expense - This comes from any PP&E write-ups in the transaction. • New Amortization Expense - Th..."
    ],
    "correct": 0,
    "explanation": "Unlike \"normal\" debt, a PIK loan does not require the borrower to make cash interest payments - instead, the interest just accrues to the loan principal, which keeps going up over time. A PIK \"toggle\" allows the company to choose whether to pay the interest in cash or have it accrue to the principal (these have disappeared since the credit crunch). PIK is more risky than other forms of debt and carries with it a higher interest rate than traditional bank debt or high yield debt. Adding it to the debt schedules is similar to adding high-yield debt with a bullet maturity - except instead of assuming cash interest payments, you assume that the interest accrues to the principal instead. You should then include this interest on the Income Statement, but you need to add back any PIK interest on the Cash Flow Statement because it's a non-cash expense."
  },
  {
    "id": 386,
    "category": "LBO Model - Advanced",
    "difficulty": "kho",
    "question": "What are some examples of incurrence covenants? Maintenance covenants?",
    "options": [
      "Incurrence Covenants: • Company cannot take on more than $2 billion of total debt. • Proceeds from any asset sales must be earmarked to repay debt. • Company cannot make acquisitions of over $200 million in size. • Company cannot spend more than $100 million on CapEx each year....",
      "Unlike \"normal\" debt, a PIK loan does not require the borrower to make cash interest payments - instead, the interest just accrues to the loan principal, which keeps going up over time....",
      "All of this is very similar to what you would see in a merger model - you calculate Goodwill, Other Intangibles, and the rest of the write-ups in the same way, and then the Balance Sheet adjustments (e.g. subtracting cash, adding in capitalized financing fees, writing up assets...",
      "Yes, and it happens more commonly than you'd think. Remember, high-yield debt investors often get interest rates of 10-15% or more - which effectively guarantees an IRR in that range for them...."
    ],
    "correct": 0,
    "explanation": "Incurrence Covenants: • Company cannot take on more than $2 billion of total debt. • Proceeds from any asset sales must be earmarked to repay debt. • Company cannot make acquisitions of over $200 million in size. • Company cannot spend more than $100 million on CapEx each year. Maintenance Covenants: • Total Debt / EBITDA cannot exceed 3.0 x • Senior Debt / EBITDA cannot exceed 2.0 x • (Total Cash Payable Debt + Capitalized Leases) / EBITDAR cannot exceed 4.0 x • EBITDA / Interest Expense cannot fall below 5.0 x • EBITDA / Cash Interest Expense cannot fall below 3.0 x • (EBITDA - CapEx) / Interest Expense cannot fall below 2.0 x"
  },
  {
    "id": 387,
    "category": "LBO Model - Advanced",
    "difficulty": "kho",
    "question": "Just like a normal M&A deal, you can structure an LBO either as a stock purchase or as an asset purchase. Can you also use Section 338(h)(10) election?",
    "options": [
      "Unlike \"normal\" debt, a PIK loan does not require the borrower to make cash interest payments - instead, the interest just accrues to the loan principal, which keeps going up over time....",
      "For the debt investors, you need to calculate the interest and principal payments they receive from the company each year....",
      "This is done for the same reason you have an Earnout in an M&A deal: the PE firm wants to incentivize the management team and keep everyone on-board until they exit the investment....",
      "In most cases, no - because one of the requirements for Section 338(h)(10) is that the buyer must be a C corporation...."
    ],
    "correct": 3,
    "explanation": "In most cases, no - because one of the requirements for Section 338(h)(10) is that the buyer must be a C corporation. Most private equity firms are organized as LLCs or Limited Partnerships, and when they acquire companies in an LBO, they create an LLC shell company that \"acquires\" the company on paper."
  },
  {
    "id": 388,
    "category": "LBO Model - Advanced",
    "difficulty": "kho",
    "question": "Walk me through how you calculate optional repayments on debt in an LBO model.",
    "options": [
      "Here's a handy chart to explain all of this. Note that this chart does not cover every single feature or every single type of debt in the universe - just the most important ones, and what you're likely to be asked about in finance interviews: Debt Type Revolver Term Loan A Term L...",
      "Incurrence Covenants: • Company cannot take on more than $2 billion of total debt. • Proceeds from any asset sales must be earmarked to repay debt. • Company cannot make acquisitions of over $200 million in size. • Company cannot spend more than $100 million on CapEx each year....",
      "First, note that you only look at optional repayments for Revolvers and Term Loans - high-yield debt doesn't have a prepayment option, so effectively it's always $0....",
      "Yes, and it happens more commonly than you'd think. Remember, high-yield debt investors often get interest rates of 10-15% or more - which effectively guarantees an IRR in that range for them...."
    ],
    "correct": 2,
    "explanation": "First, note that you only look at optional repayments for Revolvers and Term Loans - high-yield debt doesn't have a prepayment option, so effectively it's always $0. First, you check how much cash flow you have available based on your Beginning Cash Balance, Minimum Cash Balance, Cash Flow Available for Debt Repayment from the Cash Flow Statement, and how much you use to make Mandatory Debt Repayments. Then, if you've used your Revolver at all you pay off the maximum amount that you can with the cash flow you have available. Next, for Term Loan A you assume that you pay off the maximum you can, taking into account that you've lost any cash flow you used to pay down the Revolver. You also need to take into account that you might have paid off some of Term Loan A's principal as part of the Mandatory Repayments. Finally, you do the same thing for Term Loan B, subtracting from the \"cash flow available for debt repayment\" what you've already used up on the Revolver and Term Loan A. And just like Term Loan A, you need to take into account any Mandatory Repayments you've made so that you don't pay off more than the entire Term Loan B balance. The formulas here get very messy and depend on how your model is set up, but this is the basic idea for optional debt repayments."
  },
  {
    "id": 389,
    "category": "LBO Model - Advanced",
    "difficulty": "kho",
    "question": "Explain how a Revolver is used in an LBO model.",
    "options": [
      "You use a Revolver when the cash required for your Mandatory Debt Repayments exceeds the cash flow you have available to repay them....",
      "Unlike \"normal\" debt, a PIK loan does not require the borrower to make cash interest payments - instead, the interest just accrues to the loan principal, which keeps going up over time....",
      "Incurrence Covenants: • Company cannot take on more than $2 billion of total debt. • Proceeds from any asset sales must be earmarked to repay debt. • Company cannot make acquisitions of over $200 million in size. • Company cannot spend more than $100 million on CapEx each year....",
      "First, note that you only look at optional repayments for Revolvers and Term Loans - high-yield debt doesn't have a prepayment option, so effectively it's always $0...."
    ],
    "correct": 0,
    "explanation": "You use a Revolver when the cash required for your Mandatory Debt Repayments exceeds the cash flow you have available to repay them. The formula is: Revolver Borrowing = MAX(0, Total Mandatory Debt Repayment - Cash Flow Available to Repay Debt). The Revolver starts off \"undrawn,\" meaning that you don't actually borrow money and don't accrue a balance unless you need it - similar to how credit cards work. You add any required Revolver Borrowing to your running total for cash flow available for debt repayment before you calculate Mandatory and Optional Debt Repayments. Within the debt repayments themselves, you assume that any Revolver Borrowing from previous years is paid off first with excess cash flow before you pay off any Term Loans."
  },
  {
    "id": 390,
    "category": "LBO Model - Advanced",
    "difficulty": "kho",
    "question": "How would you adjust the Income Statement in an LBO model?",
    "options": [
      "First, note that you only look at optional repayments for Revolvers and Term Loans - high-yield debt doesn't have a prepayment option, so effectively it's always $0....",
      "For the debt investors, you need to calculate the interest and principal payments they receive from the company each year....",
      "The most common adjustments: • Cost Savings - Often you assume the PE firm cuts costs by laying off employees, which could affect COGS, Operating Expenses, or both. • New Depreciation Expense - This comes from any PP&E write-ups in the transaction. • New Amortization Expense - Th...",
      "All of this is very similar to what you would see in a merger model - you calculate Goodwill, Other Intangibles, and the rest of the write-ups in the same way, and then the Balance Sheet adjustments (e.g. subtracting cash, adding in capitalized financing fees, writing up assets..."
    ],
    "correct": 2,
    "explanation": "The most common adjustments: • Cost Savings - Often you assume the PE firm cuts costs by laying off employees, which could affect COGS, Operating Expenses, or both. • New Depreciation Expense - This comes from any PP&E write-ups in the transaction. • New Amortization Expense - This includes both the amortization from written- up intangibles and from capitalized financing fees. • Interest Expense on LBO Debt - You need to include both cash and PIK interest here. • Sponsor Management Fees - Sometimes PE firms charge a \"management fee\" to a company to account for the time and effort they spend managing it. • Common Stock Dividend - Although private companies don't pay dividends to shareholders, they could pay out a dividend recap to the PE investors. • Preferred Stock Dividend - If Preferred Stock is used as a form of financing in the transaction, you need to account for Preferred Stock Dividends on the Income Statement. Cost Savings and new Depreciation / Amortization hit the Operating Income line; Interest Expense and Sponsor Management Fees hit Pre-Tax Income; and you need to subtract the dividend items from your Net Income number."
  },
  {
    "id": 391,
    "category": "LBO Model - Advanced",
    "difficulty": "kho",
    "question": "In an LBO model, is it possible for debt investors to get a higher return than the PE firm? What does it tell us about the company we're modeling?",
    "options": [
      "Yes, and it happens more commonly than you'd think. Remember, high-yield debt investors often get interest rates of 10-15% or more - which effectively guarantees an IRR in that range for them....",
      "You use a Revolver when the cash required for your Mandatory Debt Repayments exceeds the cash flow you have available to repay them....",
      "All of this is very similar to what you would see in a merger model - you calculate Goodwill, Other Intangibles, and the rest of the write-ups in the same way, and then the Balance Sheet adjustments (e.g. subtracting cash, adding in capitalized financing fees, writing up assets...",
      "In most cases, no - because one of the requirements for Section 338(h)(10) is that the buyer must be a C corporation...."
    ],
    "correct": 0,
    "explanation": "Yes, and it happens more commonly than you'd think. Remember, high-yield debt investors often get interest rates of 10-15% or more - which effectively guarantees an IRR in that range for them. So no matter what happens to the company or the market, that debt gets repaid and the debt investors get the interest payments. But let's say that the median EBITDA multiples contract, or that the company fails to grow or actually shrinks - in these cases the PE firm could easily get an IRR below what the debt investors get. 12. Most of the time, increased leverage means an increased IRR. Explain how increasing the leverage could reduce the IRR. This scenario is admittedly rare, but it could happen if the increase leverage increases interest payments or debt repayments to very high levels, preventing the company from using its cash flow for other purposes. Sometimes in LBO models, increasing the leverage increases the IRR up to a certain point - but then after that the IRR starts falling as the interest payments or principal repayments become \"too big.\" For this scenario to happen you would need a \"perfect storm\" of: 1. Relative lack of cash flow / EBITDA growth. 2. High interest payments and principal repayments relative to cash flow. 3. Relatively high purchase premium or purchase multiple to make it more difficult to get a high IRR in the first place."
  },
  {
    "id": 392,
    "category": "Brain Teaser",
    "difficulty": "kho",
    "question": "A car drives 60 miles at an average speed of 30 miles per hour. How fast should the driver drive to travel the same 60 miles in the same time period, but at an average of 60 miles per hour?",
    "options": [
      "142.5 degrees. If we just think of the clock hour hand at 1 and the minute hand at the 45 position (near 9 o'clock), that is 120 degrees since they are 4 \"numbers\" apart, and each number on the clock represents 30 degrees (360/12). However, recall that the hou...",
      "You can take coins from a stack in any amount and in any order and place them in your hand....",
      "This is not possible. To travel 60 miles at an average speed of 30 miles per hour, 2 hours are required; to travel at an average of 60 miles per hour in those same 2 hours, you'd need to go 120 miles rather than 60 miles. The most common mistake is to respond...",
      "First, fill the 3 liter bucket and pour it into the 5 liter one. Then, re-fill the 3 liter bucket and pour it into the 5 liter bucket until it's full - that leaves 1 liter in the 3 liter bucket and 5 in the 5 liter bucket...."
    ],
    "correct": 2,
    "explanation": "This is not possible. To travel 60 miles at an average speed of 30 miles per hour, 2 hours are required; to travel at an average of 60 miles per hour in those same 2 hours, you'd need to go 120 miles rather than 60 miles. The most common mistake is to respond with 90 miles per hour or 120 miles per hour - if you get a question like this in an interview, be sure to ask clarifying questions that could point you in the right direction. In this case, for example, we might have reframed the question and asked if it was really, \"How do you travel 60 miles in 2 hours at an average speed of 60 miles per hour?\" If he said yes, we'd instantly know it was not possible."
  },
  {
    "id": 393,
    "category": "Brain Teaser",
    "difficulty": "kho",
    "question": "What is the angle formed by the hands of the clock when it is 1:45?",
    "options": [
      "You can take coins from a stack in any amount and in any order and place them in your hand....",
      "142.5 degrees. If we just think of the clock hour hand at 1 and the minute hand at the 45 position (near 9 o'clock), that is 120 degrees since they are 4 \"numbers\" apart, and each number on the clock represents 30 degrees (360/12). However, recall that the hou...",
      "First, fill the 3 liter bucket and pour it into the 5 liter one. Then, re-fill the 3 liter bucket and pour it into the 5 liter bucket until it's full - that leaves 1 liter in the 3 liter bucket and 5 in the 5 liter bucket....",
      "This is not possible. To travel 60 miles at an average speed of 30 miles per hour, 2 hours are required; to travel at an average of 60 miles per hour in those same 2 hours, you'd need to go 120 miles rather than 60 miles. The most common mistake is to respond..."
    ],
    "correct": 1,
    "explanation": "142.5 degrees. If we just think of the clock hour hand at 1 and the minute hand at the 45 position (near 9 o'clock), that is 120 degrees since they are 4 \"numbers\" apart, and each number on the clock represents 30 degrees (360/12). However, recall that the hour hand has already moved by the time the minute hand has reached the 45 position - it is now closer to 2 o'clock. 45 represent ¾ of an hour, so the hour hand will have moved ¾ of 30 degrees, or 22.5 degrees. If we add them together, we see that 120 + 22.5 = 142.5 The most common mistake is to state the original number we arrived at - 120 degrees - rather than finishing the calculation. Sometimes with this type of question the interviewer will lead you in the right direction if you have a basic idea of how to solve it."
  },
  {
    "id": 394,
    "category": "Brain Teaser",
    "difficulty": "kho",
    "question": "You have stacks of quarters, dimes, nickels and pennies (these represent $0.25, $0.10, $0.05 and $0.01, respectively, in the US monetary system for anyone international). There are an unlimited number of coins in each stack.",
    "options": [
      "This is not possible. To travel 60 miles at an average speed of 30 miles per hour, 2 hours are required; to travel at an average of 60 miles per hour in those same 2 hours, you'd need to go 120 miles rather than 60 miles. The most common mistake is to respond...",
      "You can take coins from a stack in any amount and in any order and place them in your hand....",
      "142.5 degrees. If we just think of the clock hour hand at 1 and the minute hand at the 45 position (near 9 o'clock), that is 120 degrees since they are 4 \"numbers\" apart, and each number on the clock represents 30 degrees (360/12). However, recall that the hou...",
      "First, fill the 3 liter bucket and pour it into the 5 liter one. Then, re-fill the 3 liter bucket and pour it into the 5 liter bucket until it's full - that leaves 1 liter in the 3 liter bucket and 5 in the 5 liter bucket...."
    ],
    "correct": 1,
    "explanation": "You can take coins from a stack in any amount and in any order and place them in your hand. What is the greatest dollar value in coins you can have in your hands without being able to make change for a dollar? $1.19. There are a few ways to think about this, but the easiest is to start with the largest coin - quarters - first and then work your way down. 4 quarters equals $1.00, so we clearly can't do that - but 3 quarters are ok because that's only $0.75. Next, we have dimes. Recall that we can use any combination of coins to make change for a dollar - if we were to have 5 dimes and put them together with the 2 quarters, that would make $1.00. So we'll use 4 instead - there's no combination there that would result in $1.00 when added to the quarters. Nickels are next. Here, we can't have any - because even a single nickel, $0.05, would add up to $1.00 when added to the 3 quarters we have ($0.75) and the 2 dimes ($0.20). Finally, for pennies we know that we can't have 5 pennies ($0.05) because we could then get to $1.00 using the same logic as we saw for the nickels. So 4 is the maximum here. With that, we see that 3 Quarters + 4 Dimes + 4 Pennies = $1.19 The most common mistake is not realizing you can use any combination of your existing coins to add up to a dollar - most people understand that you can't have 4 quarters, but sometimes interviewees forget that 2 quarters + 5 dimes = $1.00 as well. This is another case where asking clarifying questions - such as whether 2 quarters + 5 dimes would count as $1.00 - really helps."
  },
  {
    "id": 395,
    "category": "Brain Teaser",
    "difficulty": "kho",
    "question": "You have a hose along with a 3 liter bucket and a 5 liter bucket. How do you get exactly 4 liters of water?",
    "options": [
      "You can take coins from a stack in any amount and in any order and place them in your hand....",
      "First, fill the 3 liter bucket and pour it into the 5 liter one. Then, re-fill the 3 liter bucket and pour it into the 5 liter bucket until it's full - that leaves 1 liter in the 3 liter bucket and 5 in the 5 liter bucket....",
      "142.5 degrees. If we just think of the clock hour hand at 1 and the minute hand at the 45 position (near 9 o'clock), that is 120 degrees since they are 4 \"numbers\" apart, and each number on the clock represents 30 degrees (360/12). However, recall that the hou...",
      "This is not possible. To travel 60 miles at an average speed of 30 miles per hour, 2 hours are required; to travel at an average of 60 miles per hour in those same 2 hours, you'd need to go 120 miles rather than 60 miles. The most common mistake is to respond..."
    ],
    "correct": 1,
    "explanation": "First, fill the 3 liter bucket and pour it into the 5 liter one. Then, re-fill the 3 liter bucket and pour it into the 5 liter bucket until it's full - that leaves 1 liter in the 3 liter bucket and 5 in the 5 liter bucket. Then, pour out the 5 liter bucket so nothing is left and pour the 1 liter of water from the 3 liter bucket into the 5 liter bucket. Finally, fill the 3 liter bucket completely and pour it into the 5 liter bucket - since it already has 1 liter of water, you'll get exactly 4 liters. For this type of question, it's easiest to use deductive reasoning to get the answer. You know you can't possibly get 4 liters of water in the 3 liter bucket - it has to be in the 5 liter bucket. Since you can easily get 3 liters of water, that tells you that the \"trick\" will involve isolating the remaining 1 liter and getting it into the 5 liter bucket. So then the question comes down to how to get the 1 liter of water in the 3 liter bucket. You know it has to involve pouring water into the 5 liter bucket, and that leads you in the right direction."
  }
];

/** The bank consumers actually read: raw scraped questions with any
 *  hand-authored option rewrite applied. `explanation` is never overridden -
 *  it survived the scrape intact and stays the teaching content shown after
 *  the learner answers. Ids without an override fall back to the raw options
 *  unchanged, so rewriting the bank can proceed batch by batch. */
export const IB_QUESTION_BANK: IbQuestion[] = RAW_IB_QUESTION_BANK.map((q) => {
  const override = IB_QUESTION_OVERRIDES[q.id];
  if (!override) return q;
  return {
    ...q,
    options: override.options,
    correct: override.correct,
    ...(override.question ? { question: override.question } : {}),
  };
});

/** Technical questions - the ones with a single defensible right answer, so
 *  the only ones a scored multiple-choice drill may draw from. */
export const IB_TECHNICAL_QUESTIONS: IbQuestion[] = IB_QUESTION_BANK.filter(
  (q) => !isBehavioralCategory(q.category)
);

/** Fit/behavioral questions, served as un-scored prep cards. `options` and
 *  `correct` on these are meaningless scrape artifacts and must not be
 *  rendered - only `question` and `explanation` (the coaching framework). */
export const IB_BEHAVIORAL_QUESTIONS: IbQuestion[] = IB_QUESTION_BANK.filter((q) =>
  isBehavioralCategory(q.category)
);

/** How many *technical* questions still carry the machine-truncated scraped
 *  options - the remaining rewrite backlog. Behavioral questions are excluded
 *  because their options are never shown, so rewriting them is pointless. */
export const IB_REWRITE_PENDING_COUNT = IB_TECHNICAL_QUESTIONS.filter(
  (q) => !IB_QUESTION_OVERRIDES[q.id]
).length;
