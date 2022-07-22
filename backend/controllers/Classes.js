import Classes from '../models/ClassModel.js';

export const getClasses = async (req, res) => {
  try {
    const classe = await Classes.findAll({
      attributes: ['id', 'user_id', 'name', 'description', 'term', 'year'],
    });
    res.json(classe);
  } catch (error) {
    console.log(error);
  }
};

export const getClasseById = async (req, res) => {
  try {
    const response = await Classes.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

export const CreateClasses = async (req, res) => {
  const {user_id, name, description, term, year} = req.body;
  try {
    await Classes.create({
      user_id: user_id,
      name: name,
      description: description,
      term: term,
      year: year,
    });
    res.json({msg: 'Kelas Berhasil Dibuat'});
  } catch (error) {
    console.log(error);
  }
};
