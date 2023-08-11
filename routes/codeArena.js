const express = require('express')
const router = express.Router()

// 데이터베이스 연결
const db = require('../config/database')
let conn = db.init()

router.post('/codeStart',(req,res)=>{
    let sql = 'SELECT * FROM TB_RESULT;'
    conn.connect()
    conn.query(sql,(err,result)=>{
        if(err){
            console.log('정답확인 쿼리문 에러')
        }
        else{
            res.json(JSON.stringify(result))
        }
        
    })
    
})


module.exports = router