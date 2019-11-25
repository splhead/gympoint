import Sequelize, { Model } from 'sequelize';

export default class Plan extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        duration: Sequelize.INTEGER,
        price: Sequelize.NUMBER,
      },
      {
        sequelize,
      }
    );
  }
}
