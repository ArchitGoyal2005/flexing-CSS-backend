const addQuestions = (user) => {
  const questions = [];
  const usedQuestionsEasy = new Set();
  const usedQuestionsMedium = new Set();

  for (let i = 0; i < 15; i++) {
    let questionId;
    let randomNum;

    if (i < 3 || i === 13 || i === 14) {
      do {
        randomNum = Math.floor(Math.random() * 17) + 1;
        questionId = `easy_${randomNum}`;
      } while (usedQuestionsEasy.has(questionId));
      usedQuestionsEasy.add(questionId);
    } else {
      do {
        randomNum = Math.floor(Math.random() * 12) + 1;
        questionId = `medium_${randomNum}`;
      } while (usedQuestionsMedium.has(questionId));
      usedQuestionsMedium.add(questionId);
    }

    questions.push(questionId);
  }

  user.questions = questions;
};

export default addQuestions;
