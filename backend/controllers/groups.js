const { group } = require('console');
const groupsModel= require('../models/groups')


const getAllGroups= async(req,res)=>{
try {
    const groups = await groupsModel.getAllGroups();
    res.json(groups);
  } catch (error) {
    console.error('Error al obtener todos los grupos:', error);
    res.status(500).json({ message: 'Error al obtener grupos' });
  }
}

const createGroup= async(req,res)=>{
    const { name,user_id } = req.body;

  if (!name || !user_id) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const newGroup= await groupsModel.createGroup({name,user_id})
    res.status(201).json(newGroup)
  } catch (error) {
    console.error('Error al crear grupo:', error);
    res.status(500).json({ message: 'Error al crear grupo' });
  }
}


const updateGroup = async (req, res) => {
 const { id } = req.params;
  const { name } = req.body;

  console.log('ID recibido:', id);
  console.log('Name recibido:', name);

  try {
    const group = await groupsModel.updateGroup(id, name);
    console.log('Resultado desde modelo:', group);

    res.status(200).json(group);
  } catch (error) {
    console.error('Error al actualizar grupo:', error);
    res.status(500).json({ error: 'Error al actualizar grupo' });
  }
};



const deleteGroup= async(req,res)=>{
   const { id } = req.params;

  try {
    const deletedGroup = await groupsModel.deleteGroup(id);
    if (!deletedGroup) {
      return res.status(404).json({ message: 'Grupo no encontrado' });
    }

    res.json({
      message: 'Grupo eliminado correctamente (junto con las recetas asociadas)',
      deletedGroup
    });
  } catch (error) {
    console.error('Error al eliminar grupo:', error);
    res.status(500).json({ message: 'Error al eliminar grupo' });
  }
}

const getGroupsById = async (req, res) => {
   const {id}=req.params

  try {
    const group = await groupsModel.getGroupById(group);
    if (!group) {
      return res.status(404).json({ message: "Grupo no encontrado" });
    }
    res.json(group);
  } catch (error) {
    console.error("Error al obtener el grupo", error);
    res.status(500).json({ message: "Error al obtener el grupo" });
  }
};

const getGroupsByUser = async (req, res) => {
   const { userId } = req.params;

  try {
    const groups = await groupsModel.getGroupsByUser(userId);
    res.json(groups);
  } catch (error) {
    console.error('Error al obtener grupos del usuario:', error);
    res.status(500).json({ message: 'Error al obtener grupos' });
  }
};

const getRecipesByGroupId = async (req, res) => {
  const { id } = req.params;

  try {
    const recipes = await groupsModel.getRecipesByGroupId(id);

    if (!recipes || recipes.length === 0) {
      return res.status(404).json({ message: 'No se encontraron recetas en este grupo' });
    }

    res.json(recipes);
  } catch (error) {
    console.error('Error al obtener recetas del grupo:', error);
    res.status(500).json({ message: 'Error al obtener recetas del grupo' });
  }
};


module.exports={
    createGroup,
    updateGroup,
    deleteGroup,
    getAllGroups,
    getGroupsByUser,
    getGroupsById,
    getRecipesByGroupId
}