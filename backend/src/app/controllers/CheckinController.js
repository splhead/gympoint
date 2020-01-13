import { Op } from 'sequelize';
import { subDays } from 'date-fns';
import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  async index(req, res) {
    const student = await Student.findByPk(req.params.studentId);

    if (!student) {
      return res.status(404).json({ error: 'Student does not exist!' });
    }

    const checkins = await Checkin.findAll({
      where: {
        student_id: student.id,
      },
    });

    return res.json(checkins);
  }

  async store(req, res) {
    const student = await Student.findByPk(req.params.studentId);

    if (!student) {
      return res.status(404).json({ error: 'Student does not exist!' });
    }

    const today = new Date();

    const sevenDaysBefore = subDays(today, 7);

    const checkinsInSevenDay = await Checkin.count({
      where: {
        student_id: student.id,
        created_at: {
          [Op.between]: [sevenDaysBefore, today],
        },
      },
    });

    if (checkinsInSevenDay >= 5) {
      return res
        .status(401)
        .json({ error: 'You can t do more than 5 check ins in a week!' });
    }

    const checkin = await Checkin.create({
      student_id: student.id,
    });

    return res.json(checkin);
  }
}

export default new CheckinController();
