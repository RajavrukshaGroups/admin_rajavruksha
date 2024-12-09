const login =(req,res)=>{
    try {
        console.log(req.body,'incoming login');
        
    } catch (error) {
        console.log(error.message);
        
    }
}
module.exports={
    login
}