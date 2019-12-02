import { addMonths } from 'date-fns';

import Registration from '../models/Registration';
import Student from '../models/Student';
import Plan from '../models/Plan';

class RegistrationController {
  async store(req, res) {
    const { student_id, plan_id, start_date } = req.body;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists!' });
    }

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exists!' });
    }

    const registration = await Registration.create({
      student_id,
      plan_id,
      start_date,
      end_date: addMonths(start_date, plan.duration),
      price: plan.price * plan.duration,
    });

    return res.json(registration);
  }
}

export default new RegistrationController();
