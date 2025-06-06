const recipesModel= require('../models/recipes')


const getAllRecipes= async(req,res)=>{
    try {
        const recipes= await recipesModel.getAllRecipes()
        res.json(recipes)
    } catch (error) {
        console.error("Error al obtener recetas:", error);
     res.status(500).json({ message: "Error al obtener reccetas" });
    }
}




const createRecipe= async(req,res)=>{
    const { title, description, steps, user_id,ingredients } = req.body;

  if (!title || !description || !steps || !user_id||!ingredients) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const newRecipe = await recipesModel.createRecipe({ title, description, steps, user_id,ingredients });
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error('Error al crear receta:', error);
    res.status(500).json({ message: 'Error al crear receta' });
  }
}


const updateRecipe= async(req,res)=>{
    const { id } = req.params;
  const { title,description,steps,ingredients } = req.body;

  if (!title || !description || !steps||!ingredients) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const updatedRecipe = await recipesModel.updateRecipe({ id, title,description,steps,ingredients });
    res.json(updatedRecipe);
  } catch (error) {
    console.error("Error al actualizar receta:", error);
    res.status(500).json({ message: "Error al actualizar receta" });
  }
}


const deleteRecipe= async(req,res)=>{
    const { id } = req.params;
  console.log("ID a eliminar:", id);

  try {
    const deletedRecipe= await recipesModel.deleteRecipe(id) 
    res.status(204).send();
  } catch (error) {
   console.error('Error al eliminar receta:', error);
    res.status(500).json({ message: 'Error al eliminar receta' });
  }

}

const getRecipesByUser = async (req, res) => {
    const user_id = req.params.id;

  try {
    console.log("User ID recibido:", user_id);

    const recipes = await recipesModel.getRecipesByUser(user_id);

    console.log("Recetas encontradas:", recipes);

    if (!recipes || recipes.length === 0) {
      return res.status(404).json({ message: "No se encontraron recetas para este usuario" });
    }

    res.json(recipes);
  } catch (error) {
    console.error("Error al obtener las recetas del usuario:", error);
    res.status(500).json({ message: "Error al obtener las recetas del usuario" });
  }
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await recipesModel.getRecipeById(id);
    if (!recipe) {
      return res.status(404).json({ message: "Receta no encontrada" });
    }
    res.json(recipe);
  } catch (error) {
    console.error("Error al obtener la rectea:", error);
    res.status(500).json({ message: "Error al obtener la receta" });
  }
};

module.exports={
    getAllRecipes,
  getRecipesByUser,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe
}