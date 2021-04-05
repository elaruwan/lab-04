import express from 'express';
import {updateTodo,createTodo,retrieveTodo,retrieveAllTodos,deleteTodo} from '../../db/todos-dao';

// const HTTP_OK = 200; // Not really needed; this is the default if you don't set something else.
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;

const router = express.Router();
// Create new todo
router.post('/', async (req, res) =>{
    
    const newToDo = await createTodo({
        title: req.body.title,
        description: req.body.description,
        createdDate: req.body.createdDate,
        dueDate: req.body.dueDate,
        completed: req.body.completed

    });
    if (newToDo){res.status(HTTP_CREATED).header('Location','/api/todos/'+newToDo._id).json(newToDo);}
    else {res.sendStatus(400)}
    

})

router.get('/', async (req,res) => {
    console.log("get request")
    res.json(await retrieveAllTodos());
})

router.get('/:id', async (req,res) =>{
    console.log("id request")
    const { id } = req.params;
    const todo = await retrieveTodo(id);
    console.log("THIS TODO CAME BACK"+todo);
    if (todo)
    {
        res.json(todo);
    }
    else{
        res.sendStatus(HTTP_NOT_FOUND);
    }
})

router.put('/:id', async (req, res) =>{
    const { id } = req.params;
    const todo = req.body;
    todo._id = id;
    const success = await updateTodo(todo);
    res.sendStatus(success ? HTTP_NO_CONTENT : HTTP_NOT_FOUND);
})

router.delete('/:id', async (req,res) =>{
    const { id } = req.params;
    console.log("DELETE"+id);
    await deleteTodo(id);
    res.sendStatus(HTTP_NO_CONTENT);
})

// TODO Exercise Four: Add your RESTful routes here.

export default router;