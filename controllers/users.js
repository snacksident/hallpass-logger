const express = require('express')
const router = express.Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const cryptojs = require('crypto-js')
require('dotenv').config()

//GET /users/new
router.get('/new', (req,res)=>{
    res.render('users/new.ejs')
})

//POST /users
router.post('/', async (req,res)=>{
    const [newUser, created] = await db.user.findOrCreate({
        where: {email: req.body.email}
    })
    if(!created){
        console.log('user already exists')
        // render login page and send appropriate message
    }else{
        const hashedPassword = bcrypt.hashSync(req.body.password, 10)
        newUser.password = hashedPassword
        await newUser.save()

        //encrypt the user id via AES
        const encryptedUserId = cryptojs.AES.encrypt(newUser.id.toString(),process.env.SECRET)
        const encryptedUserIdString = encryptedUserId.toString()
        //store the encrypted id in the cookie of the response object
        res.cookie('userId', encryptedUserIdString)
        //redirect home
        res.redirect('/')
    }
})

router.get('/login', (req,res)=>{
    res.render('users/login.ejs')
})

router.post('/login', async (req,res)=>{
    const user = await db.user.findOne({ where: {email:req.body.email} })
    if(!user){
        console.log('user not found')
        res.render('users/login.ejs', {error: 'invalid email/pass'})
    }else if(!bcrypt.compareSync(req.body.password, user.password)){
        console.log('incorrect password')
        res.render('users/login.ejs',{error: 'invalid email/password'})
    }else{
        console.log('logging in the user')
        //encrypt the user id via AES
        const encryptedUserId = cryptojs.AES.encrypt(user.id.toString(),process.env.SECRET)
        const encryptedUserIdString = encryptedUserId.toString()
        //store the encrypted id in the cookie of the response object
        res.cookie('userId', encryptedUserIdString)
        //redirect home
        res.redirect('/')
    }
})

router.get('/logout', (req,res)=>{
    console.log('logging out')
    res.clearCookie('userId')
    res.redirect('/')
})

// export all routes to the entry point file
module.exports = router