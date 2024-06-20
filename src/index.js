const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoRoutes = require('./todoRoutes');

const app = express();
const PORT = process.env.PORT || 5050;

app.use((req,res,next)=>{
    const time1 =new Date()
    const request = `${req.method}|${req.originalUrl}`  //${JSON.stringify(req.body)}
    res.on('finish' ,()=>{
        console.log(`${request} | ${new Date() - time1}ms |`,res.statusCode, new Date() )
    })
    next()
})


const connectToMongo = async () => {
    try {
       await mongoose.connect("mongodb://localhost:27017/todo-app")
       console.log("<-<-<-<-<-<-<-<- mongoDb successfully connected ->->->->->->->->")
    } catch (error) {
        console.log(">>>>>>>error", error)
    }
}

connectToMongo()

app.use(cors());
app.use(express.json());

app.use('/todos', todoRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
