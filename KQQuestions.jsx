import React, {Component} from "react";
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
        datetime:"",
        error:2           
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
     setdata=async()=>{
         try{
        let newdata={name:this.state.name,errcount:this.state.errcount,date:this.state.date,time:this.state.time}
        let response=await http.post(`/newData`,newdata);
        console.log(response.status);
         }catch(err){
            this.setState({show:3});
            console.log(this.state.show)
             this.setState({error:1});
            console.log(this.state.error)
         }
    }
    handlebtn=(opt)=>{
        console.log(opt);
        let s1={...this.state};
        if(opt===s1.data[s1.qindex].answer){
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
        let {questions,show,name,err,qindex,errcount,text,data,error}=this.state;
        console.log(error);
        console.log(show)
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
        }else if(show==1&& questions.length>0){
            return(
            <div className="container text-center p-4">
                {console.log(data[qindex].image)}
                <Container style={{maxWidth:400,maxHeight:400,minHeight:200,minWidth:200}}>
                    <img className="img-fluid" alt="Please check your connection."  src={data[qindex].image} >
                    </img><br/>
                    
                </Container><br/>
                {text}<br/>
                {err&&<span className="text-danger">{err}</span>}<br/><br/>
                <button className="btn btn-primary mx-4" 
                    onClick={()=>this.handlebtn(data[qindex].opt1)}>{data[qindex].opt1}<br/></button>
                <button className="btn btn-primary mx-4" 
                    onClick={()=>this.handlebtn(data[qindex].opt2)}>{data[qindex].opt2}<br/></button>
                    <button className="btn btn-primary mx-4" 
                    onClick={()=>this.handlebtn(data[qindex].opt3)}>{data[qindex].opt3}<br/></button>
                <br/>
               
            </div>
            )
        }else if(show==2 && error!=1){
            return(
                <div className="container text-center p-4">
                    <h4>Result Screen of {name}</h4>
                    <h5>Error Count : <span className="text-danger">{errcount}</span></h5>
                    <button className="btn btn-primary" onClick={()=>this.handlerestart()}>Restart</button>
                </div>
            )
        }else{
            return(
                <h4 className="text-center p-4">Error in Fetching Data, Please check your connection.</h4>
            )
        }
    }
}
export default KQQuestions;
