import React, {Component} from "react";
import elephant from "./animals/elephant.svg";
import croc from "./animals/croc.svg"
import giraffe from "./animals/giraffe.svg";
import gorilla from "./animals/gorilla.svg";
import koala from "./animals/koala.svg";
import tiger from "./animals/tiger.svg";
import whale from "./animals/whale.svg";
import polarbear from "./animals/polar-bear.svg";
import cow from "./animals/cow.jpg";
import goat from "./animals/goat.jpg";
import lion from "./animals/lion.jpg";
import parrot from "./animals/parrot.jpg";
import rabbit from "./animals/rabbit.jpg";
import bear from "./animals/bear.jpg";
import duck from "./animals/duck.jfif";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";
import http from "./httpService";

class KQQuestions extends Component{
    state={
        show:0,
        name:"",
        err:"",
        text: "What is the name of the animal in above picture ?",
        questions: [],
        qindex:0,
        errcount:0,
        data:[],
        date:"",
        time:"",
        datetime:""
           
    }
    async fetchdata(){
        let response=await http.get(`/allQuestions`);
        let {data}=response;
        this.setState({questions:data});
        console.log(this.state.questions);
    }
    async componentDidMount(){
        this.fetchdata();
    }
    handleChange=(e)=>{
        const {currentTarget: input}=e;
        let s1={...this.state};
        s1[input.name]=input.value;
        this.setState(s1);
    }
    handleenter=()=>{
        let s1={...this.state};
        if(s1.name==""){
            s1.err="First Enter your Name"
        }else{
            s1.err="";
            for(;;){
                if(s1.data.length>=5)break;
               let len=s1.questions.length;
               let index=Math.floor(Math.random() * len);
               let fnd=s1.data.find(a=>a===s1.questions[index]);
               if(!fnd)s1.data.push(s1.questions[index]);
             }
             s1.datetime=Date();
            console.log(s1.datetime)
            let index1=-1;
            for(let i=14;i<s1.datetime.length;i++){
                if(s1.datetime[i]===" "&&i<25){
                    index1=i;
                    s1.time=s1.datetime.substring(16,index1);
                }
            }
            console.log(s1.time)
            let index2=-1;
            for(let i=12;i<s1.datetime.length;i++){
                if(s1.datetime[i]===" "&&i<18){
                    index2=i;
                    s1.date=s1.datetime.substring(0,index2);
                }
            }
            console.log(s1.date)
            s1.show=1;
        }
        this.setState(s1);
    }
    setdata=()=>{
        let newdata={name:this.state.name,count:this.state.errcount,date:this.state.date,time:this.state.time}
        http.post(`/newData`,newdata);
        console.log(newdata);
    }
    handlebtn=(index)=>{
        let s1={...this.state};
        if(index+1===s1.data[s1.qindex].answer){
            console.log(s1.qindex);
            if(s1.qindex<4){
            s1.err=""
            s1.qindex++;
            }else{
                s1.show=2;
                this.setdata();
            }
        }else{
            s1.err="Your Answer is incorrect";
            s1.errcount++;
        }
        this.setState(s1);
    }
    
    handlerestart=()=>{
        let s1={...this.state};
        s1.name="";
        s1.err="";
        s1.errcount=0;
        s1.qindex=0;
        s1.show=0;
        s1.data=[];
        this.setState(s1);
    }
    render(){
        let {questions,show,name,err,qindex,errcount,text,data}=this.state;
        if(questions.length>0){
            questions[0].image=elephant;
            questions[1].image=croc;
            questions[2].image=giraffe;
            questions[3].image=gorilla;
            questions[4].image=koala;
            questions[5].image=tiger;
            questions[6].image=whale;
            questions[7].image=polarbear;
            questions[8].image=cow;
            questions[9].image=goat;
            questions[10].image=lion;
            questions[11].image=parrot;
            questions[12].image=rabbit;
            questions[13].image=bear;
            questions[14].image=duck;
        }
        if(show==0){
            return(
                <div className="container text-center p-4">
                    <h4>Welcome in Kids Quizz</h4>
                    <div className="form-group">
                            <input type="text" className="form-control" id="name" name="name" placeholder="Enter Name" value={name} onChange={this.handleChange} />
                    </div>
                    {err && <span className="text-danger">{err}</span>}
                    <br/>
                    <button className="btn btn-primary" onClick={()=>this.handleenter(0,questions.length-1)}>Enter</button>
                </div>
            )
        }else if(show==1){
            return(
            <div className="container text-center p-4">
                <Container style={{maxWidth:400,maxHeight:400,minHeight:200,minWidth:200}}>
                    <img className="img-fluid" alt="amimal" src={data[qindex].image} >
                    </img>
                </Container><br/>
                {text}<br/>
                {err&&<span className="text-danger">{err}</span>}<br/><br/>
                {data[qindex].options.map((opt,index)=>(
                    <button className="btn btn-primary mx-4" 
                    onClick={()=>this.handlebtn(index)}>{opt}<br/></button>
                    
                ))}
                <br/>
            </div>
            )
        }else{
            return(
                <div className="container text-center p-4">
                    <h4>Result Screen of {name}</h4>
                    <h5>Error Count : <span className="text-danger">{errcount}</span></h5>
                    <button className="btn btn-primary" onClick={()=>this.handlerestart()}>Restart</button>
                </div>
            )
        }
    }
}
export default KQQuestions;