import * as Yup from 'yup';
import { Op } from 'sequelize';
import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const query = req.query.q ? `%${req.query.q}%` : '%';
    const students = await Student.findAll({
      where: {
        name: {
          [Op.iLike]: query,
        },
      },
    });
    return res.json(students);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const { email } = req.body;
    const studentExist = await Student.findOne({ where: { email } });

    if (studentExist) {
      return res.status(400).json({ error: 'Student already exists!' });
    }

    const student = await Student.create(req.body);
    return res.json(student);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number(),
      weight: Yup.number(),
      height: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json({ error: "Student's Id not provided!" });
    }

    const student = await Student.findByPk(studentId);

    const { email } = req.body;

    if (email !== student.email) {
      const studentExist = await Student.findOne({ where: { email } });

      if (studentExist) {
        return res.status(400).json({ error: 'Student already exists!' });
      }
    }

    const studentUpdated = await student.update(req.body);

    return res.json(studentUpdated);
  }

  async delete(req, res) {
    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json({ error: "Student's Id not provided!" });
    }

    const student = await Student.findByPk(studentId);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exits' });
    }

    await student.destroy();

    return res.json();
  }
}

export default new StudentController();
