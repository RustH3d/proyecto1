const express= require('express')
const router=  express.Router()
const groupsController= require('../controllers/groups')

router.get('/',groupsController.getAllGroups)
router.get('/user/user:id',groupsController.getGroupsByUser)
router.post('/',groupsController.createGroup)
router.put('/:id',groupsController.UpdateGroup)

router.delete('/:id',groupsController.deleteGroup)





module.exports=router