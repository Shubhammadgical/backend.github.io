let express=require("express");
let app = express();
app.use(express.json());
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-with, Content-Type, Accept"
    );
        next();
});
const port = 2410;
app.listen(port, ()=> console.log(`Node app listening on port ${port}!`));

let {playersData,questions}=require("./data.js");

app.get("/allDetails",function(req,res){
    res.send(playersData)
});
app.get("/allQuestions",function(req,res){
    res.send(questions)
});
app.post("/newData",function(req,res){
    let body=req.body;
    let newdata = {name:body.name,count: body.count,date:body.date,time:body.time};
    playersData.push(newdata)
    res.send(playersData)
});