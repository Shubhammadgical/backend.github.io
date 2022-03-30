const  {Client} = require('pg');

const client = new Client({
    host:"localhost",
    user:"postgres",
    port:5432,
    password: "Shubham@123",
    database:"postgres"
})

client.connect();

function getdata(req,res){
    client.query('Select * from questions',(err,result)=>{
    if(!err){
        if(result.rows.length>1){
        res.send(result.rows)
        console.log(result.rows);
        }else{
            res.send("empty")
        }
    }else{
        console.log(err.message);
        res.status(404).send("Error in fetching data")
    }
    })
}
function getplayersdata(req,res){
    client.query('Select * from players',(err,result)=>{
    if(!err){
        res.send(result.rows)
        console.log(result.rows);
    }else{
        console.log(err.message);
        res.status(404).send("Error in fetching data")
    }
    })
}
function insertdata(req,res){
    let {id,opt1,opt2,opt3,answer,image}=req.body;
    client.query("INSERT INTO questions(id,opt1,opt2,opt3,answer,image) VALUES ($1, $2, $3, $4, $5, $6)",[id,opt1,opt2,opt3,answer,image],(err,result)=>{
    if(!err){
        console.log(result);
        res.status(201).send(`Question added `)
    }else{
        console.log(err.message);
        res.status(404).send("Error in inserting data")
    }
    })
}

function insertplayerdata(req,res){
    const {name,errcount,date,time} = req.body;
    console.log(req.body)
    client.query("INSERT INTO players(name,errcount,date,time) VALUES ($1, $2 ,$3 ,$4)",[name,errcount,date,time],(err,result)=>{
    if(!err){
        console.log(result);
        res.status(201).send(`Player added `)
    }else{
        console.log(err.message);
        res.status(404).send("Error in inserting data")
    }
    })
}
function updatedata(){
    client.query("UPDATE questions SET answer=3 WHERE id=3",(err,result)=>{
    if(!err){
        console.log(result.rows);
    }else{
        console.log(err.message);
    }
    })
}
function deletedata(){
    client.query("DELETE FROM questions WHERE id=3",(err,result)=>{
    if(!err){
        console.log(result.rows);
    }else{
        console.log(err.message);
    }
    })
}



function truncate(req,res){
    client.query("TRUNCATE TABLE questions RESTART IDENTITY",(err,result)=>{
        if(!err){
            console.log("Deletion Success");
            let {questions} = require("./newdata.js");
            for(let i=0;i<questions.length;i++){
                client.query("INSERT INTO questions(opt1,opt2,opt3,answer,image) VALUES ($1, $2, $3, $4, $5)",
                    [questions[i].opt1,questions[i].opt2,questions[i].opt3,questions[i].answer,questions[i].image],(err,result)=>{
                    if(err){
                        console.log(err);
                        console.log("Error in inserting data")
                    }else{
                        console.log(result);
                    }
                })
            }
        }else{
            console.log(err.message);
        }
    })
}



module.exports = {getdata,insertdata,deletedata,updatedata,getplayersdata,insertplayerdata};
//deletedata();
//truncate();
//getdata();
//updatedata();
//insertdata();
//truncate();
//getplayersdata();