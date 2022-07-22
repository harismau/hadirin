import {Sequelize} from "sequelize";
import fs from "fs";
import path from "path";

// const db = new Sequelize('hadirin_db','hadirin@hadirin-database','Admin123',{
//     host: "hadirin-database.mysql.database.azure.com",
//     dialect: "mysql",
//     dialectOptions: {
//         ssl: {
//             ca: fs.readFileSync(path.resolve('config/BaltimoreCyberTrustRoot.crt.pem'))
//         }
//     }
// });

const db = new Sequelize('hadirin_db','root','',{
    host: "localhost",
    dialect: "mysql"
});

export default db;