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
    const [newClassroom, created] = await db.classroom.findOrCreate({
        where: {
            class_name: req.body.classroom_name,
            //associate newly created classroom with current user
            userId: res.locals.user.id
        }
    })
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
    res.render('classrooms/show.ejs')
})


module.exports = router