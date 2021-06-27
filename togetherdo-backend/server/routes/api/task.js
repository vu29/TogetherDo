const {Router} = require('express');
const { route } = require('./auth');
const {Task} = require('../../models')
const router = Router();

router.get('/my_tasks',async (req,res)=>{    
    // TODO : userID issue
    const userID = req.query.userID;
    try{
        const tasks = await Task.findAll({
            where : {
                userId : userID
            }
        });

        res.json(tasks);

    }catch(err){
        res.json({
            success : false,
            error : {
                message : err.message
            }
        })
    }
});

router.post('/crate_task', async (req,res)=>{
    // TODO : username issue
    if(!(req.body.title && req.body.taskType && req.body.teamID && req.body.userID && req.body.expireAt)){
        
        let content = req.body.content || null;

        try{
            const task = await Task.create({
                title : req.body.title,
                content : content,
                taskType : Boolean(parseInt(req.body.taskType)),
                teamId : req.body.teamID,
                userId : req.body.userID,
                createdById : req.body.userID,
                expireAt : req.body.expireAt
            });

            res.status(201).json({
                success : true,
                error : null
            });

        }
        catch(err){
            res.json({
                success : false,
                error : {
                    message : err.message
                }
            });            
        }
    }
})

router.delete('/remove_task', async(req,res)=>{
    if(!(req.body.userID && req.body.taskID)){
        res.status(400)
            .end();
    }

    const task = await Task.findOne({
        where : {id : req.body.taskID}
    });


    if(!task){
        return res.status(404)
            .end();
    }

    if(task.createdById != req.body.userID){
        return res.status(401)
            .end();
    }

    try {
        await task.destroy();
        res.json({
            success : true,
            error : false
        })
    } catch (err) {
        res.json({
            success : false,
            error : {
                message : err.message
            }
        })
    }


})

module.exports = router;