import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Mail from '../../lib/Mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    // console.log('A fila executou');

    const { student, plan, registration } = data;
    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Matrícula realizada',
      template: 'registration',
      context: {
        student: student.name,
        plan: plan.title,
        start: format(parseISO(registration.start_date), "dd 'de' MMMM", {
          locale: ptBR,
        }),
        end: format(parseISO(registration.end_date), "dd 'de' MMMM", {
          locale: ptBR,
        }),
        total: `R$ ${registration.price}`,
      },
    });
  }
}

export default new RegistrationMail();
