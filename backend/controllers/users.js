const usersModel= require('../models/users')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAllUsers= async(req,res)=>{
    try {
        const users= await usersModel.getAllUsers()
        res.json(users)
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
     res.status(500).json({ message: "Error al obtener usuarios" });
    }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", { email, password });

  try {
    const user = await usersModel.getUserByEmail(email);
    console.log("User found:", user);
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", passwordMatch);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    res.status(200).json({ id: user.id, username: user.username, email: user.email });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error en login" });
  }
};


const createUser= async(req,res)=>{
    const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  const emailRegex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(!emailRegex.test(email)){
     return res.status(400).json({ message: 'Ingrese un correo valido' });
  }

  if(username.lenght<3||username.lenght>8){
     return res.status(400).json({ message: 'El nombre de usuario debe tener entre 3 y 8 caracteres' })
  }

  if(password.lenght<5){
     return res.status(400).json({ message: 'La contrase;a debe tener al menos 5 caracteres' })
  }

  try {
    const existingUser = await usersModel.getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'El correo ya está registrado' });
    }

    
    const newUser = await usersModel.createUser({ username, email, password });

    res.status(201).json({ id: newUser.id, username: newUser.username, email: newUser.email });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ message: 'Error al crear usuario' });
  }
}


const updateUser= async(req,res)=>{
    const { id } = req.params;
  const { username, email } = req.body;

  try {
    const updatedUser = await usersModel.updateUser({ id, username, email });
    res.json(updatedUser);
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ message: "Error al actualizar usuario" });
  }
}


const deleteUser= async(req,res)=>{
    const { id } = req.params;
  console.log("ID a eliminar:", id);

  try {
    await usersModel.deleteUser(parseInt(id));
    res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ message: "Error al eliminar usuario" });
  }

}

const getUserByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await usersModel.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error al obtener usuario por email:", error);
    res.status(500).json({ message: "Error al obtener usuario" });
  }
};

module.exports={
    createUser,
    updateUser,
    deleteUser,
    getAllUsers,
    getUserByEmail,
    loginUser
}