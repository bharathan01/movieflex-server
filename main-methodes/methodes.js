const movieDataModel = require("../data-models/moviedatamodel.js")

getMovieDetails = () =>{
   return movieDataModel.find().then(data =>{
     return{
        statusCode:200,
        data
     }
   })
}
getSingleMovieDetails =(movieId) =>{
   
   return movieDataModel.findById(movieId).then(data => {
      if(data){
         return{
            data,
            status:true
         }
      }
      else{
         return{
            status:false
         }
      }
   })
}
module.exports={
    getMovieDetails,getSingleMovieDetails   
}