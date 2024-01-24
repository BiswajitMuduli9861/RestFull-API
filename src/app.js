const express = require('express');
require("../src/db/conn")
const Student = require("./models/students")
const app = express();
const port= process.env.PORT || 8000;

app.use(express.json())  //express.json() is a method inbuild in express to recognize the incoming request object as JSON Object.this method is called as a middleware in your application using the code: app.use(express.json());


// app.post("/students", (req,res)=>{
//     console.log(req.body)
//     const user = new Student(req.body)  
//     user.save().then(()=>{         //return promise
//         res.status(201).send(user);
//     }).catch((err)=>{
//         res.status(400).send(err);
//     })
        
     
// })

//Async and await
app.post("/students",async(req,res)=>{
    try {
        const user =new Student(req.body)  
           const createUser = await user.save();   //return promise
           res.status(201).send(createUser);
        
    } catch (err) {
        res.status(400).send(err);
    }
})

// read the data of registered Students
app.get("/students",async(req,res)=>{
    try{
        const studentsData= await  Student.find();
        res.send(studentsData);

    }catch(err){
        res.send(err);
    }
})

// get the individual Student data using id
    app.get("/students/:id",async(req,res)=>{
        try{
            const _id=req.params.id;
            // console.log(req.params.id);
           const  getEachStudentData= await Student.findById(_id);
            if(!getEachStudentData){
               return res.status(404).send();
            }
            else{
                 res.send(getEachStudentData);
                
             }   
        }catch(err){
            res.send(err);
        }

    })

//get the individual Student data using name
    app.get("/students/:name",async(req,res)=>{
        try{
            const studentName = req.params.name;
            console.log(req.params.name)
            const getNameData = await Student.findOne({name:studentName});
            if(!getNameData){
                return res.status(400).send('Student not found');
            }
            else{
                res.send(getNameData)
            }
                                        //not complete 
        }catch(err){
            res.send(err);
        }
    })     
//Update the students by it id
app.patch("/students/:id",async(req,res)=>{
    try{
        const _id = req.params.id;
        const updateStudent = await Student.findByIdAndUpdate(_id,req.body,{new:true} );
        res.send(updateStudent);
    }catch(err){
        res.status(400).send(err);
    }

})

//Delete the students by it id

app.delete("/students/:id",async(req,res)=>{
    try{
        const deleteStudent = await Student.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            return res.status(400).send();
        }
        else{

            res.send(deleteStudent)
        }
    }catch(err){
        res.status(500);
        res.send(err);
    }


})

app.listen(port, ()=>{
    console.log(`listing the port at ${port}`);
})