import mongoose from "mongoose";

const schema = mongoose.Schema
const Model = new schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true 
    }
})

const TodoModel =  mongoose.model("TodoModel",Model)
export default TodoModel