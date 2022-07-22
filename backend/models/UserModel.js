import {Sequelize} from 'sequelize';
import db from '../config/Database.js';

const {DataTypes} = Sequelize;

const Users = db.define(
  'users',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    birth_date: {
      type: DataTypes.DATEONLY,
    },
    gender: {
      type: DataTypes.ENUM('laki-laki', 'perempuan'),
    },
    img_profile: {
      type: DataTypes.BLOB,
    },
    instance: {
      type: DataTypes.STRING,
    },
    student_id: {
      type: DataTypes.INTEGER,
    },
    role: {
      type: DataTypes.ENUM('siswa', 'guru'),
    },
    password: {
      type: DataTypes.STRING,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Users;
