import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class HelpOrderController {
  async index(req, res) {
    const student = await Student.findByPk(req.params.studentId);

    if (!student) {
      return res.status(401).json({ error: 'Student does not exists!' });
    }

    const helpOrders = await HelpOrder.findAll({
      where: {
        student_id: student.id,
      },
    });

    return res.json(helpOrders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { question } = req.body;

    const student = await Student.findByPk(req.params.studentId);

    if (!student) {
      return res.status(401).json({ error: 'Student does not exists!' });
    }

    const helpOrder = await HelpOrder.create({
      student_id: student.id,
      question,
    });

    return res.json(helpOrder);
  }
}

export default new HelpOrderController();
