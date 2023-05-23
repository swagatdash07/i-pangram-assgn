import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
        trim:true
    },
    hobbies:{
        type:String,
        trim:true
    },
    role:{
        type:Number,
        default:0
    },
    dept:{
        type:String,
        trim:true
    }
},{timestamps:true})


export default mongoose.model("Employee",userSchema)