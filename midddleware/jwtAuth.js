const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

dotenv.config()
priveat_key = process.env.PRIVEAT_KEY

const jwtTokenVerify = (req,res,next) =>{
 try{
    const token = req.headers['access_key']
    const verfiedToken = jwt.verify(token,priveat_key)
    next()

 }
 catch{
    res.status(400).json({
        message:'token not valid'

    })
 }
   

    

}
module.exports = jwtTokenVerify