/**
 * This file contains functions which interact with MongoDB, via mongoose, to perform Todo-related
 * CRUD operations.
 */

import { ToDo } from "./todos-schema";


// TODO Exercise Three: Implement the five functions below.


export async function createTodo(todo) {
    const newToDo = new ToDo(todo);
    await newToDo.save();
    return newToDo;
}

export async function retrieveAllTodos() {
    return await ToDo.find();
}

export async function retrieveTodo(id) {
    console.log(id);
    const returnable = await ToDo.findById(id)
    console.log(returnable)
    if (returnable){return returnable;}
    else{return false;}
}

export async function updateTodo(todo) {

    const oldToDo = await ToDo.findById(todo._id);
    
    if (oldToDo)
    {
        oldToDo.title = todo.title;
        oldToDo.description = todo.description;
        oldToDo.createdDate = todo.createdDate;
        oldToDo.dueDate = todo.dueDate;
        oldToDo.completed = todo.completed;

        await oldToDo.save();
        return true;
    }
    return false;
    

}

export async function deleteTodo(id) {
    await ToDo.deleteOne({_id:id});

}