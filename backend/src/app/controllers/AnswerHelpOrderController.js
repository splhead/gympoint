import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';

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

    const helpOrder = await HelpOrder.findByPk(req.params.helpOrderId);

    if (!helpOrder) {
      return res.status(401).json({ error: 'Help-order does not exists!' });
    }

    const helpOrderAswered = await helpOrder.update({
      answer,
      answered_at: new Date(),
    });

    return res.json(helpOrderAswered);
  }
}

export default new HelpOrderController();
