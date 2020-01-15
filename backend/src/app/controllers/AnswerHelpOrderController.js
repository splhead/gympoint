import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

import AnswerMail from '../jobs/AnswerMail';
import Queue from '../../lib/Queue';

class HelpOrderController {
  async index(req, res) {
    const unansweredHelpOrders = await HelpOrder.findAll({
      where: {
        answer: null,
      },
    });

    return res.json(unansweredHelpOrders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { answer } = req.body;

    const helpOrder = await HelpOrder.findByPk(req.params.helpOrderId, {
      include: [
        {
          model: Student,
          attributes: ['name', 'email'],
        },
      ],
    });

    if (!helpOrder) {
      return res.status(400).json({ error: 'Help-order does not exists!' });
    }

    if (helpOrder.answer) {
      return res.status(400).json({ error: 'Help-order already answered!' });
    }

    const helpOrderAswered = await helpOrder.update({
      answer,
      answered_at: new Date(),
    });

    Queue.add(AnswerMail.key, {
      student: helpOrder.Student,
      question: helpOrder.question,
      answer: helpOrder.answer,
    });

    return res.json(helpOrderAswered);
  }
}

export default new HelpOrderController();
