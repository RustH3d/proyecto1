const db= require('../db')
const bcrypt= require('bcrypt')

const getAllUsers= async ()=>{
    const result= await db.query("SELECT * FROM users ORDER BY username ASC")
    return result.rows
}

const createUser = async ({ username, email, password }) => {
 const hashedPassword = await bcrypt.hash(password, 10);
  const result = await db.query(
    'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING id, username, email',
    [username, hashedPassword, email]
  );
  return result.rows[0];
};




const getUserByEmail= async(email)=>{
    const result= await db.query(
        "SELECT * FROM users WHERE email = $1", [email]
    )
     return result.rows[0]
}

const deleteUser= async(id)=>{
    const result= await db.query(
        "DELETE FROM users WHERE id = $1", [id]
    )
}

const updateUser= async({ id, username, email })=>{
   const result = await db.query(
    "UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING id, username, email",
    [username, email, id]
  );
  return result.rows[0];
}


module.exports={
    getAllUsers,
    createUser,
    getUserByEmail,
    updateUser,
    deleteUser

}