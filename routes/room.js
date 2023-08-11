const express = require('express')
const router = express.Router()

// 데이터베이스 연결
const db = require('../config/database')
const { stringify } = require('qs')
let conn = db.init()

// 방 생성시 생성한 사용자 정보 응답
router.get('/createRoom',(req,res)=>{
    let checkEnd = req.session.userName
    res.send(JSON.stringify(checkEnd))
})

// 유저 접속시 인원수 카운트 증가
router.post('/enterRoom',(req,res)=>{
    let checkEnd = req.session.userName
    let roomNum = req.body.roomNum
    console.log('실행되나?', roomNum)
    let sql = 'UPDATE TB_ARENAROOM SET USER_COUNT = USER_COUNT+1 WHERE ROOM_NUMBER=?;'
    let conutSql = 'SELECT * FROM TB_ARENAROOM;'
    conn.connect()
    conn.query(sql,[roomNum],(err,result)=>{
        if(err){
            console.log('유저수 카운트 추가 쿼리문 에러')
        }
        else{
            conn.query(conutSql,(err,result)=>{
                if(err){
                    console.log('실패')
                }
                else{
                    res.json(JSON.stringify({result:result, name:checkEnd}))
                }
            })
        }
    })

    // res.send(JSON.stringify(checkEnd))
})

// 방에서 유저 접속 종료시 카운트 감소
router.post('/leave',(req,res)=>{
    let roomNum = req.body.data.room_number
    let sql = 'UPDATE TB_ARENAROOM SET USER_COUNT = USER_COUNT-1 WHERE ROOM_NUMBER=?;'
    let conutSql = 'SELECT * FROM TB_ARENAROOM;'
    let deleteRoom = 'DELETE FROM TB_ARENAROOM WHERE USER_COUNT=0'
    conn.connect()
    conn.query(sql,[roomNum],(err,result)=>{
        if(err){
            console.log('유저수 카운트 감소 쿼리문 에러')
        }
        else{
            conn.query(deleteRoom,(err,result)=>{
                if(err){
                    console.log('채팅방 행 삭제 쿼리문 에러',err)
                    conn.query(conutSql,(err,result)=>{
                        if(err){
                            console.log('실패')
                        }
                        else{
                            res.json(JSON.stringify({result:result}))
                        }
                    })
                }
                else{
                    conn.query(conutSql,(err,result)=>{
                        if(err){
                            console.log('실패')
                        }
                        else{
                            res.json(JSON.stringify({result:result}))
                        }
                    })
                }
            })
        }
    })
})



// 방 생성시 방 정보 database에 저장
router.post('/updateroom',(req,res)=>{
    let roomInfo = req.body.updateRooms[0]
    let number = roomInfo.room_number
    let name = roomInfo.room_name
    let method = roomInfo.chatRoomMethod
    let lang = roomInfo.dev_lang
    let host = roomInfo.createdBy
    let count = roomInfo.userCount

    let sql = 'INSERT INTO TB_ARENAROOM (ROOM_NUMBER, ROOM_NAME, ROOM_LANG, ROOM_HOST, USER_COUNT) VALUES(?,?,?,?,?)'
    let findRoom = 'SELECT * FROM TB_ARENAROOM WHERE ROOM_NUMBER =?'
    conn.connect()
    conn.query(sql,[number,name,lang,host,count],(err,result)=>{
        if(err){
            console.log('방생성 쿼리문 오류',err)
        }
        else{
         conn.query(findRoom,[number],(err,result)=>{
            res.json(JSON.stringify(result[0]))
         })
        }
    })
})

// arena chat namespace 입장시 요청
router.get('/arenaList',(req,res)=>{
    let sql = 'SELECT * FROM TB_ARENAROOM;'

    conn.connect()
    conn.query(sql,(err,result)=>{
        // console.log('이거도보자',result)
        res.json(JSON.stringify(result))
    })
})

router.post('/connectUser',(req,res)=>{
    let userName = req.session.userName
    let roomNum = req.body.roomNum
    console.log(roomNum)
    let sql = 'INSERT INTO ARENA_USER VALUES(?,?);'
    let sql2 = 'SELECT * FROM ARENA_USER;'
    conn.connect()
    conn.query(sql,[roomNum, userName],(err,result)=>{
        if(err){
            console.log('유저이름 추가 쿼리문 에러')
        }
        else{
            conn.query(sql2,(err,result)=>{
                if(err){
                    console.log('테이블 불러오기 실패')
                }
                else{
                    res.json(JSON.stringify(result))
                }
            })
        }
    })
})


router.post('/disconnectUser',(req,res)=>{
    let data = req.body.data
    let userName = data.user_name
    let roomNum = data.room_number
    console.log('뭐더라',data)
    let sql = 'DELETE FROM ARENA_USER WHERE CONN_USER=? AND ROOM_NUMBER =?;'
    let sql2 = 'SELECT * FROM ARENA_USER;'
    conn.connect()
    conn.query(sql,[userName,roomNum],(err,result)=>{
        if(err){
            console.log('삭제 쿼리문 오류',err)
        }
        else{
            conn.query(sql2,(err,result)=>{
                if(err){
                    console.log('에바지')
                }
                else{
                    res.json(JSON.stringify(result))
                }
            })
        }
    })
})
module.exports = router