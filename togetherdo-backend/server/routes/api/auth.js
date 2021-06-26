const {Router} = require('express')
const {Op} = require('sequelize');
const{User, Member, Task, Team} = require('../../models')
const bcrypt = require('bcryptjs');
const { route } = require('./task');
const router = Router();

router.get('/',(req,res)=>{
    res.send('working');
})

router.post('/register',async (req,res)=>{

    if (!(req.body.username && req.body.password && req.body.email)){
        return res.status(400).json({
            success : false,
            data : null,
            error : {
                msg : "bad request : parameters missing"
            }
        })
    }

    const usernameExists = await User.findOne({ where : {username : req.body.username} });

    if(usernameExists){
        return res.json({
            success : false,
            data : null,
            error : {
                msg : "username already taken"
            }
        })
    }

    const emailExists = await User.findOne({ where : {email : req.body.email} });

    if(emailExists){
        return res.json({
            success : false,
            data : null,
            error : {
                msg : "email already taken"
            }
        })
    }


    // create user
    const userPasswordHash = await bcrypt.hash(req.body.password,7);

    try{
        const createdUser = await User.create({
            username : req.body.username,
            email : req.body.email,
            passwordHash : userPasswordHash
        });
        return res.status(201).json({
            success : true,
            data : {
                user_id : createdUser.id,
            },
            error : null
        })
    }
    catch(err){
        return res.status(500).json({
            success : false,
            data : null,
            error : {
                message : err.message
            }
        });
    }

    

})



module.exports = router;