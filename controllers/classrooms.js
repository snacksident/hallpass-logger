const express = require('express')
const app = new express()
const router = express.Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const cryptojs = require('crypto-js')
const { user } = require('pg/lib/defaults')
require('dotenv').config()

//middleware
app.use(express.urlencoded({extended: false})) //body parser to make req.body work

// GET /classrooms
router.get('/', async (req,res)=>{
    //load up classrooms index
    //TODO  currently pulls all classes.  need to join tables and get only classes by current user.
    const classList = await db.classroom.findAll({
        where: {
            userId: res.locals.user.id
        }
    })
    
    //populate with all created classrooms for this user
    res.render('classrooms/index.ejs',{classList})
})

//POST /classrooms
router.post('/', async (req,res)=>{
    //need to set userId on classroom table when created.  userId currently is set to null when each classroom is created
    // const currentUser = await db.user.findOne({
    //     where: {id: res.locals.user.id}
    // })
    
    const [newClassroom, created] = await db.classroom.findOrCreate({
        where: {
            class_name: req.body.classroom_name,
            userId: res.locals.user.id
        }
    })
    // newClassroom.userId = res.locals.user.id
    console.log(`user is ${res.locals.user.id}`)
    console.log(`newClassroom userId is set to: ${newClassroom.userId}`)
    if(!created){
        console.log('classroom already exists')
    }else{
        
        res.redirect('/classrooms')
    }
})

// GET /classrooms/new
router.get('/new',(req,res)=>{
    res.render('classrooms/new.ejs')
})

// GET /classrooms/:id
router.get('/:id',async (req,res)=>{
    let studentsInClass = await db.classroom.findAll({
        // where: {id: req.params.id},
        // include: [db.students]
    })
    res.render('classrooms/show.ejs')
})


module.exports = router