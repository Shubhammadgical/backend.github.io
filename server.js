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
var port = process.env.PORT || 2410;
app.listen(port, ()=> console.log(`Node app listening on port ${port}!`));

let db=require("./connection.js");

app.get("/allPlayers",db.getplayersdata);

app.get("/allQuestions",db.getdata);

app.post("/newData",db.insertplayerdata);