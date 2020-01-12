import * as Yup from 'yup';
import {
  addMonths,
  parseISO,
  isPast,
  areIntervalsOverlapping,
  format,
} from 'date-fns';

import { Op } from 'sequelize';

import Registration from '../models/Registration';
import Student from '../models/Student';
import Plan from '../models/Plan';

import RegistrationMail from '../jobs/RegistrationMail';
import Queue from '../../lib/Queue';

class RegistrationController {
  async index(req, res) {
    const registrations = await Registration.findAll({
      order: ['student_id', 'start_date'],
    });
    return res.json(registrations);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const { student_id, plan_id, start_date } = req.body;

    const startOfRegistration = parseISO(start_date);

    if (isPast(startOfRegistration)) {
      return res
        .status(400)
        .json({ error: 'You can not register in a past date' });
    }

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists!' });
    }

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exists!' });
    }

    const endOfRegistration = addMonths(startOfRegistration, plan.duration);

    const today = new Date();

    const savedRegistrations = await Registration.findAll({
      where: {
        student_id,
        end_date: {
          [Op.gte]: today,
        },
      },
    });

    if (savedRegistrations.length > 0) {
      const alreadyRegistred = savedRegistrations.some(registration => {
        return areIntervalsOverlapping(
          { start: registration.start_date, end: registration.end_date },
          { start: startOfRegistration, end: endOfRegistration }
        );
      });

      if (alreadyRegistred) {
        return res
          .status(400)
          .json({ error: 'Student already registered in period!' });
      }
    }

    const registration = await Registration.create({
      student_id,
      plan_id,
      start_date,
      end_date: endOfRegistration,
      price: plan.price * plan.duration,
    });

    Queue.add(RegistrationMail.key, {
      student,
      plan,
      registration,
    });

    return res.json(registration);
  }

  async update(req, res) {
    const registration = await Registration.findByPk(req.params.registrationId);

    if (!registration) {
      return res.status(401).json({ error: 'Registration does not exists!' });
    }

    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const { student_id, plan_id, start_date } = req.body;

    const startOfRegistration = parseISO(start_date);

    if (isPast(startOfRegistration)) {
      return res
        .status(400)
        .json({ error: 'You can not register in a past date' });
    }

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists!' });
    }

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exists!' });
    }

    const endOfRegistration = addMonths(startOfRegistration, plan.duration);

    const today = new Date();

    const savedRegistrations = await Registration.findAll({
      where: {
        student_id,
        end_date: {
          [Op.gte]: today,
        },
      },
    });

    if (savedRegistrations.length > 0) {
      const alreadyRegistred = savedRegistrations.some(registration => {
        return areIntervalsOverlapping(
          { start: registration.start_date, end: registration.end_date },
          { start: startOfRegistration, end: endOfRegistration }
        );
      });

      if (alreadyRegistred) {
        return res
          .status(400)
          .json({ error: 'Student already registered in period!' });
      }
    }

    const registrationUpdated = registration.update({
      student_id,
      plan_id,
      start_date,
      end_date: endOfRegistration,
      price: plan.price * plan.duration,
    });

    return res.json(registrationUpdated);
  }

  async delete(req, res) {
    const registration = await Registration.findByPk(req.params.registrationId);

    if (!registration) {
      return res.status(401).json({ error: 'Registration does not exists!' });
    }

    await registration.destroy();

    return res.json();
  }
}

export default new RegistrationController();
