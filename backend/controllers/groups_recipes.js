const model = require('../models/groups_recipes');

const addRecipeToGroup = async (req, res) => {
  const { recipe_id, group_id } = req.body;

  if (!recipe_id || !group_id) {
    return res.status(400).json({ message: 'Faltan datos necesarios' });
  }

  try {
    const relation = await model.addRecipeToGroup(recipe_id, group_id);
    res.status(201).json(relation);
  } catch (error) {
    console.error('Error al asociar receta con grupo:', error);
    res.status(500).json({ message: 'Error al asociar receta con grupo' });
  }
};

module.exports = {
  addRecipeToGroup
};
