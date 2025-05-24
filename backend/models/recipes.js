const db= require('../db')


const getAllRecipes= async ()=>{
    const result= await db.query("SELECT * FROM recipes ORDER BY title ASC")
    return result.rows
}

const createRecipe = async ({ user_id, title, ingredients,steps, description }) => {
  
  const result = await db.query(
    `
    INSERT INTO recipes (title, description, steps, ingredients, user_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `,
    [title, description, steps, ingredients, user_id]
  );
  return result.rows[0];
};




const getRecipeById= async(id)=>{
    const result= await db.query(
        "SELECT * FROM recipes WHERE id = $1", [id]
    )
     return result.rows[0]
}

const getRecipesByUser= async(user_id)=>{
    const result= await db.query(
       'SELECT * FROM recipes WHERE user_id = $1 ORDER BY title ASC', [user_id]
    )
     return result.rows
}

const deleteRecipe= async(id)=>{
    const result= await db.query(
        "DELETE FROM recipes WHERE id = $1", [id]
    )
}

const updateRecipe= async({ id, title, description, steps,ingredients })=>{
   const result = await db.query(
    `
    UPDATE recipes
    SET title = $1, description = $2, steps = $3, ingredients = $4
    WHERE id = $5
    RETURNING *;
  `,
   [title, description, steps,ingredients, id]
  );
  return result.rows[0];
}


module.exports={
    getAllRecipes,
    createRecipe,
    getRecipeById,
    getRecipesByUser,
    updateRecipe,
    deleteRecipe

}