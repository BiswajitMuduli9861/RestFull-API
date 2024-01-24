const mongoose = require('mongoose');
const validator = require('validator');

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:3,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:[true, "Email is already present"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new error("Email is Invalid");
            }
        }
    },
    phone:{
        type:Number,
        min:10,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true
    }
})

const Student = new mongoose.model("Student",studentSchema);

module.exports = Student;