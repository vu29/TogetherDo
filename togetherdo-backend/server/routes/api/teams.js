const {Router} = require('express')
const {Member,Team} = require('../../models')
const router = Router();

router.post('/create_team',async (req,res)=>{
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

module.exports = router;