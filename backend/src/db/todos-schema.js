import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// TODO Exercise One: Model your schema here. Make sure to export it!

const todoSchema = new Schema({
        title:{ type: String, required:true},
        description: String,
        createdDate:{ type: Date, required:true},
        dueDate:{type: Date, required:true},
        completed:{type:Boolean, required:true}
}, {
    timestamps: {}
});

const ToDo = mongoose.model('ToDo',todoSchema);
export {ToDo};