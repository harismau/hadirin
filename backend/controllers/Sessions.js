import Session from '../models/SessionModel.js';

export const getSession = async (req, res) => {
  try {
    const session = await Session.findAll({
      where: {
        class_id: req.params.id,
      },
      attributes: ['id', 'class_id', 'session_code', 'session_date'],
    });
    res.json(session);
  } catch (error) {
    console.log(error);
  }
};

export const CreateSession = async (req, res) => {
  const session_date = req.body.session_date;
  var result = '';
  var length = 6;
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  try {
    await Session.create({
      class_id: req.params.id,
      session_code: result,
      session_date: session_date,
    });
    res.json({msg: 'Session Berhasil Dibuat'});
  } catch (error) {
    console.log(error);
  }
};
