require("dotenv").config()
require("./dbConnect").connect()
const express=require("express")
const app=express()
const fileupload=require("express-fileupload");
const cloudinary=require("cloudinary").v2


app.use(express.json())
app.use(express.urlencoded({extended:true}))


//it provides parsing the upcoming files from the request and puts in req.files
app.use(
    fileupload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    }));

//cloudinary api to connect 
cloudinary.config({
        cloud_name:process.env.CLOUD_NAME,
        api_key:process.env.API_KEY,
        api_secret:process.env.API_SECRET
    }) 
    
//route that takes the file from request.file and uploads with help of cloudinary 
//and provides the secure-url of the uploaded video link.
//we can do whatever we want with it like we can stream or if we want we can download it    
app.use("/uploadvideo",async (req,res)=>{
    try{
    const {videoData}=req.files 
    const response=await cloudinary.uploader.upload(
        videoData,
        {
            resource_type:"video",
            folder:"/videos"
        }
    )
   res.status(200).send(response.secure_url)
  }
  catch(e){
  next()
}
})




    

module.exports=app