const express = require('express')
const router = express.Router()
router.use(express.static('public'));

// 메인페이지 http://localhost:3000/page
router.get('/',(req,res)=>{
    let seName = req.session.userName
    let seLevel = req.session.userlevel
    let seLogin = req.session.login
    res.render('main',{login : seLogin, name : seName, level : seLevel})
    // res.render('main')    
})
// codeEditor http://localhost:3000/page/code
router.get('/code',(req,res)=>{
    res.render('codeEditor')
})

// 회원가입 및 로그인 http://localhost:3000/page/join
router.get('/join',(req,res)=>{
    res.render('join')
})

//Code Chat 채팅방 리스트 http://localhost:3000/page/CodeChat
router.get('/CodeChat',(req,res)=>{
    let seName = req.session.userName
    let seLevel = req.session.userlevel
    let seLogin = req.session.login
    res.render('codeChatList',{login : seLogin, name : seName, level : seLevel})
})

//Code Arena 채팅방 리스트 http://localhost:3000/page/CodeArena
router.get('/CodeArena',(req,res)=>{
    res.render('codeArenaList')
})

//main 이외의 페이지에서 code Chat 클릭시
router.get('/mainMove',(req,res)=>{
    res.render('main', {code : true})
})

//main 이외의 페이지에서 code Arena 클릭 시
router.get('/mainArena',(req,res)=>{
    res.render('main', {arena:true})
})



module.exports = router