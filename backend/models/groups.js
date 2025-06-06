const db = require('../db');


const getAllGroups= async ()=>{
    const result= await db.query(`SELECT * FROM "groups" ORDER BY name ASC`)
    return result.rows
}

const createGroup = async ({ name, user_id }) => {
  const query = `
    INSERT INTO "groups" (name, user_id)
    VALUES ($1, $2)
    RETURNING *`;
  const values = [name, user_id];
  const { rows } = await db.query(query, values);
  return rows[0];
};




const getGroupByUser= async(userId)=>{
   const query = `
    SELECT * FROM "groups"
    WHERE user_id = $1
    ORDER BY name ASC;
  `;
  const values = [userId];
  const { rows } = await pool.query(query, values);
  return rows;
}

const getGroupById= async(id)=>{
    const query = 'SELECT * FROM groups WHERE id = $1';
    const {rows}= await db.query(query,[id])
     return rows
}

const deleteGroup= async(id)=>{
    const query = 'DELETE FROM groups WHERE id = $1 RETURNING *';
  const { rows } = await db.query(query, [id]);
  return rows[0];
}

const updateGroup= async(id,name)=>{
   console.log(`Query: UPDATE "groups" SET name = $1 WHERE id = $2`);
  console.log('Valores:', name, id);

  const result = await db.query(
    `UPDATE "groups" SET name = $1 WHERE id = $2 RETURNING *`,
    [name, id]
  );

  console.log('Resultado de query:', result.rows[0]);
  return result.rows[0];

}

const getRecipesByGroupId = async (groupId) => {
  const query = `
    SELECT r.* FROM recipes r
    INNER JOIN recipe_groups rg ON r.id = rg.recipe_id
    WHERE rg.group_id = $1
    ORDER BY r.title ASC
  `;
  const { rows } = await db.query(query, [groupId]);
  return rows;
};



module.exports={
    createGroup,
    getAllGroups,
    getGroupById,
    getGroupByUser,
    updateGroup,
    deleteGroup,
    getRecipesByGroupId
}
