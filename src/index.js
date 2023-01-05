const express = require("express");
const mongoose  = require("mongoose");
const {admin} = require('./Controller/admin')
const route = require("./routes/route.js");
const app = express();


app.use(express.json()); // tells the system that you want json to be used
let flag = true
// mongoDb connection
mongoose
  .connect(
    "mongodb+srv://Manasvi29:bharat2909@cluster0.r7a9dpa.mongodb.net/unikwork-ecommerce?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then(() =>{
    if(flag == true){
        admin()
    }
    console.log("MongoDb connected")})
    .catch((err) => console.log(err));
    flag = false
// Initial route
app.use("/", route);

// port
app.listen(process.env.PORT || 3000, function () {
  console.log("Express app running on port " + (process.env.PORT || 3000));
});