import {Sequelize} from 'sequelize';
import db from '../config/Database.js';

const {DataTypes} = Sequelize;

const Session = db.define(
  'session',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    class_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    session_code: {
      type: DataTypes.STRING(6),
      unique: true,
    },
    Session_date: {
      type: DataTypes.DATEONLY,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Session;
