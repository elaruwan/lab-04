/**
 * This program should be run in order to populate the database with dummy data for testing purposes.
 */

import mongoose from 'mongoose';
import connectToDatabase from './db-connect';
import { ToDo } from './todos-schema';

main();

async function main() {
    await connectToDatabase();
    console.log('Connected to database!');
    console.log();

    await clearDatabase();
    console.log();

    await addData();
    console.log("added data");

    // Disconnect when complete
    await mongoose.disconnect();
    console.log('Disconnected from database!');
}

// TODO Exercise Two: Complete the clearDatabase() and addData() functions below.

async function clearDatabase() {
    const totoDeleted = await ToDo.deleteMany({});
    console.log('Cleared Database removed '+totoDeleted.deletedCount);
}

async function addData() {
    const fs = require('fs');
    const dummyjson = require('dummy-json');
    const template = fs.readFileSync('src/db/template.hbs', {encoding: 'utf8'});
    const result = dummyjson.parse(template);
    const todos = JSON.parse(result);
    for (let todo of todos.toDos){
        //console.log(todo);
        const newToDo = new ToDo(todo);
        await newToDo.save();
        console.log('Saving rubbish to the db = '+newToDo._id);
    }
    var newToDo = new ToDo({'title': 'shortdescription', 'description': 'short' , 'createdDate':'1111/11/11', 'dueDate':'1111/11/11', 'completed': true}); 
    await newToDo.save();
    newToDo = new ToDo({'title': 'overdue', 'description': 'short', 'createdDate': '1111/11/11', 'dueDate': '1110/11/11', 'completed': false});
    await newToDo.save();
    newToDo = new ToDo({'title': 'nodesc', 'createdDate': '2012/12/12', 'dueDate': '2012/11/21', 'completed': false});
    await newToDo.save(); 
}