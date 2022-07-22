import Users from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(401);
        const user = await Users.findAll({
            where:{
                refresh_token: refreshToken
            }
        });
        if(!user[0]) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const userId = user[0].id;
            const first_name = user[0].first_name;
            const last_name = user[0].last_name;
            const email = user[0].email;
            const birth_date = user[0].birth_date;
            const gender = user[0].gender;
            const role = user[0].role;
            const accessToken = jwt.sign({userId, first_name, last_name, email, birth_date, gender, role}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '20s'
            });
            res.json({ accessToken });
        });
    } catch (error) {
        console.log(error);
    }
}