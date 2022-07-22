import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Presence = db.define('presence',{
    user_id:{
        type: DataTypes.INTEGER
    },
    session_code:{
        type: DataTypes.STRING(6)
    },
    img_presence:{
        type: DataTypes.BLOB
    },
    reason:{
        type: DataTypes.TEXT
    },
    status:{
        type: DataTypes.ENUM('hadir','tidak hadir')
    },
    validation:{
        type: DataTypes.ENUM('tervalidasi','tidak tervalidasi')
    }
},{
    freezeTableName:true
})

export default Presence;