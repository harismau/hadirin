import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async(req, res) => {
    try {
        const users = await Users.findAll({
            attributes:['id','first_name', 'last_name', 'email', 'birth_date', 'gender', 'role', 'img_profile', 'instance', 'student_id']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

export const Register = async(req, res) => {
    const { first_name, last_name, email, birth_date, gender, role, password, confPassword } = req.body;
    const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    const passwordRegex = /^[0-9a-zA-Z]{8,}$/;
    const emailValid = emailRegex.test(email);
    const passwordValid = passwordRegex.test(password);
    if (!emailValid) return res.status(400).json({msg: "Harap gunakan format email yang tepat"});
    if (!passwordValid) return res.status(400).json({msg: "Kata sandi terdiri dari angka dan huruf minimal 8 karakter"});
    const user = await Users.findAll({
        where:{
            email: email
        }
    });
    if(user[0]) return res.status(400).json({msg: "Email telah digunakan"});
    if(password !== confPassword) return res.status(400).json({msg: "Kata sandi tidak cocok"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            first_name: first_name,
            last_name: last_name,
            email: email,
            birth_date: birth_date,
            gender: gender,
            role: role,
            password: hashPassword
        });
        res.json({msg: "Pendaftaran Berhasil"});
    } catch (error) {
        console.log(error);
    }
}

export const Login = async(req, res) => {
    try {
        const user = await Users.findAll({
            where:{
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({msg: "Kata sandi salah"});
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
        const refreshToken = jwt.sign({userId, first_name, last_name, email, birth_date, gender, role}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await Users.update({refresh_token: refreshToken},{
            where:{
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(404).json({msg:"Email tidak ditemukan"});
    }
}

export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}