const express = require('express');
const cors = require('cors');
const app = express();
const dbConnect = require("./config/database");
const router = require('./routes/employee');
const adminRouter = require('./routes/admin');
const createProject = require('./routes/project');
dbConnect();

app.use(cors({ origin: "*" })); // Allow all origins





app.use(express.json());
app.use("/api/v1", router, adminRouter ,createProject);
require('dotenv').config();
const PORT = process.env.PORT || 4000 ;
app.listen(PORT,()=>{
    console.log(`Server Started At Port No. ${PORT}`);
});
app.get("/api/v1/quote", async (req, res) => {
  try {
    const response = await fetch("https://zenquotes.io/api/random");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching quote:", error.message);
    res.status(500).json({ error: "Failed to fetch quote" });
  }
});

app.get("/",(req,res)=>{
    res.send("<h1>Hello Jee </h1>");
});
