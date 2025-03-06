const mongoose = require('mongoose');
require('dotenv').config();
const dbConnect = () =>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{
        console.log("Database Connected Successfully!!");
    })
    .catch((err)=>{
        console.log("Error Connecting To Database.");
        console.error(err);
        process.exit(1);
    })

}
module.exports = dbConnect;