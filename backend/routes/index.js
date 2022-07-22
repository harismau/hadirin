import express from "express";
import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { CreateClasses, getClasseById, getClasses } from "../controllers/Classes.js";
import { CreateSession, getSession} from "../controllers/Sessions.js";
import { CreatePresence, getPresence, updateIMGPresence, updateReason } from "../controllers/Presences.js";

const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
router.post('/classes', CreateClasses);
router.get('/classes', getClasses);
router.get('/classes/:id', getClasseById);
router.post('/session/:id', CreateSession);
router.get('/session/:id', getSession);
router.post('/presence', CreatePresence);
router.get('/presence', getPresence);
router.put('/presenceupdatereason', updateReason);
router.put('/presenceupdateimg', updateIMGPresence);

export default router;