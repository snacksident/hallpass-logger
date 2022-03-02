//IMPORTS
const express = require('express')
const app = new express()
const methodOverride = require('method-override')
const ejsLayouts = require('express-ejs-layouts')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const cryptoJS = require('crypto-js')
const db = require('./models/index.js')

//MIDDLEWARE
app.set('view engine', 'ejs') //set view engine to ejs
app.use(ejsLayouts) //tell express we want to use layouts
app.use(cookieParser()) // gives access to req.cookies
app.use(express.urlencoded({extended: false})) //body parser to make req.body work
app.use(methodOverride('_method'))

//CUSTOM LOGIN MIDDLEWARE
app.use(async (req, res, next)=>{
    if(req.cookies.userId){
        //decrypting incoming user id from cookie
        const decryptedId = cryptoJS.AES.decrypt(req.cookies.userId,process.env.SECRET)
        //convert decrypted id into readable string
        const decryptedIdString = decryptedId.toString(cryptoJS.enc.Utf8)
        //query database for the decrypted id
        const user = await db.user.findByPk(decryptedIdString)
        //assign found user to res.locals.user to create global var
        res.locals.user = user
    }else res.locals.user = null
    next()
})

//CONTROLLERS
app.use('/users', require('./controllers/users.js'))
app.use('/classrooms', require('./controllers/classrooms.js'))
app.use('/students', require('./controllers/students.js'))


//ROUTES
app.get('/', (req,res)=>{
    res.render('home.ejs')
})


const PORT = process.env.PORT || 8000
app.listen(PORT, ()=>{
    console.log(`now hooked up to port ${PORT}`)
})

