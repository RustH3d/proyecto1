const express= require('express')
const app= express()
const cors= require('cors')
const usersRoutes= require('./routes/users')
const recipesRoutes= require('./routes/recipes')
const PORT= process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/users',usersRoutes)
app.use('/recipes',recipesRoutes)

app.get('/',(req,res)=>{
    res.send('Backend funcionando')
})

app.listen(PORT,()=>{
    console.log(`Corriendo en el puerto http://localhost:${PORT}`)
})