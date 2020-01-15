import Mail from '../../lib/Mail';

class AnswerMail {
  get key() {
    return 'AnswerMail';
  }

  async handle({ data }) {
    // console.log('A fila executou');

    const { student, question, answer } = data;
    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Sua pergunta foi respondida',
      template: 'answer',
      context: {
        student: student.name,
        question,
        answer,
      },
    });
  }
}

export default new AnswerMail();
