const {Router} = require('express');
const { Op } = require('sequelize-cockroachdb');
const {User,Member,Team} = require('../../models');
const { route } = require('./task');
const router = Router();

router.post('/create_team',async (req,res)=>{
    // TODO: use session for getting userID 
    if(!(req.body.teamName && req.body.userID)){
        return res.status(400).json({
            success : false,
            data : null,
            error : {
                msg : "bad request : parameters missing"
            }
        });
    }

    try{
        const team = await Team.create({
            teamName : req.body.teamName
        });

        const member = await Member.create({
            admin : true,
            userId : req.body.userID,
            teamId : team.id
        });
        

        // on Success 
        return res.status(201).json({
            success : true,
            data : {
                teamId : team.id
            },
            error : null
        });
    }
    catch(err){
        res.status(500).json({
            success : false,
            error : {
                msg : err.message
            }
        });
    }
});

router.get('/get_team', async (req,res)=>{
    // TODO: use session for getting userID 
    if(!req.query.userID)
        return res.json({
            success : false
        });

    try{
        const user = await User.findOne({
            where : {id : req.query.userID},
            include : Team
        });

        return res.json({
            success : true,
            data : {
                teams : user.teams
            },
            error : null
        });
    }
    catch(err){
        res.status(500).json({
            success : false,
            data : null,
            error : {
                messgage : err.message
            }
        });
    }
})

router.get('/join_team', async (req,res)=>{
    // TODO : settle userID issue
    if(!(req.query.teamID && req.query.userID))
        return res.json({
            success : false,
            error : {
                message : "bad request : insufficient parameters"
            }
        });
    
    const user = await User.findOne({where : { id : req.query.userID}});
    const team = await Team.findOne({where : { id : req.query.teamID }});

    if(!user){
        res.json({
            success : false,
            error : {
                message : "User does not exist"
            }
        })
    }

    if(!team){
        res.json({
            success : false,
            error : {
                message : "Incorrect teamID"
            }
        })
    }

    try{
        await Member.create({
            admin : false,
            userId : req.query.userID,
            teamId : team.id
        });
        
        // on Success 
        return res.json({
            success : true,
            data : {
                message : "user addded"
            },
            error : null
        });
    }
    catch(err){
        res.status(500).json({
            success : false,
            error : {
                msg : err.message
            }
        });
    }


})

router.delete('delete_team', async(req,res)=>{
    if(!(req.query.teamID && req.query.userID))
        return res.json({
            success : false,
            error : {
                message : "bad request : insufficient parameters"
            }
        });
    
    const user = await User.findOne({where : { id : req.query.userID}});
    const team = await Team.findOne({where : { id : req.query.teamID }});

    if(!user){
        res.json({
            success : false,
            error : {
                message : "User does not exist"
            }
        })
    }

    if(!team){
        res.json({
            success : false,
            error : {
                message : "Incorrect teamID"
            }
        })
    }

    const admin = Member.findOne({
        where : {
            [Op.and] : [
                {admin : true},
                {teamId : req.query.teamID}
            ]
        }
    });

    if(admin.userId != req.query.userID){
        res.status(401).json({
            success : false,
            error : {
                message : "unauthorized : user is not admin of the team"
            }
        });
    }

    // try {
            
    // } catch (err) {
    //     return res.status(500).json({
    //         success : false,
    //         error : {
    //             message : err.message
    //         }
    //     })
    // }


})


module.exports = router;