import mongoose  from "mongoose";
const userSchema=new mongoose.Schema({
    name:" ",
    email:" ",
    phone:"",

},{timestamps:true})
const User=mongoose.model("User",userSchema);
export default User;