const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/eventhub");

const User = mongoose.model("User", {
    username:String,
    password:String
});

app.post("/register", async (req,res)=>{
    const {username,password} = req.body;
    const hash = await bcrypt.hash(password,10);

    await new User({username,password:hash}).save();
    res.send("OK");
});

app.post("/login", async (req,res)=>{
    const {username,password} = req.body;

    const user = await User.findOne({username});
    if(!user) return res.status(400).send();

    const ok = await bcrypt.compare(password,user.password);
    if(!ok) return res.status(400).send();

    res.send({username});
});

app.listen(3000,()=>console.log("Server chạy 3000"));