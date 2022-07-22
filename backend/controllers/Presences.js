
import Presence from "../models/PresenceModel.js";

export const getPresence = async (req, res) => {
  try {
    const presence = await Presence.findAll({
      where: {
        user_id: req.body.user_id,
        session_code: req.cookies.session_code,
      },
      attributes: ['id', 'user_id', 'session_code','img_presence','reason','status','validation'],
    });
    res.json(presence);
  } catch (error) {
    console.log(error);
  }
};

export const CreatePresence = async (req, res) => {
  const {user_id, session_code} = req.body;
  try {
    await Presence.create({
      user_id: user_id,
      session_code: session_code,
    });
    res.json({msg: 'Presence Berhasil Dibuat'});
  } catch (error) {
    console.log(error);
  }
};

export const updateReason = async(req, res) => {
  try {
    await Presence.update({img_presence: null ,reason: req.body.reason, },{
      where: {
        user_id: req.body.user_id,
        session_code: req.body.session_code,
      }    });
      res.json({msg: 'Data Berhasil Diupdate'});
  } catch (error) {
    console.log(error);
  }
}

export const updateIMGPresence = async(req, res) => {
  try {
    await Presence.update({img_presence: req.body.img_presence, reason:null},{
      where: {
        user_id: req.body.user_id,
        session_code: req.cookies.sessionCode,
      }    });
      res.json({msg: 'Data Berhasil Diupdate'});
  } catch (error) {
    console.log(error);
  }
}