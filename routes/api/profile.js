const express =require('express');
const router=express.Router();

// router GET api/profile

router.get('/',(req,res)=>res.send('profile route'));

module.exports=router;