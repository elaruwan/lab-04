import React from 'react';
import useGet from './hooks/useGet';
import axios from 'axios';

const AppContext = React.createContext({
    todos: []
});

function AppContextProvider({ children }) {

    // Sets up the app to fetch the articles from a REST API.
    const {
        data: todos,
        isLoading: todosLoading,
        reFetch: reFetchToDo
    } = useGet('/api/todos', []);

    /**
     * First, uploads the given image to the server, and retrieves the URL pointing to that image.
     * Then, saves the article itself, and returns the server representation of the article which
     * will ahve the id and date assigned.
     * 
     * TODO Error handling...
     */
    async function deleteToDo(todo){
        const todoConfig = {
            headers: {
                'content-type': 'application/json'
            }
        };  
        console.log("deeeeeelllleeeeting"+todo.title);
        const todoResponse = await axios.delete('/api/todos/'+todo._id);
        reFetchToDo();
        return todoResponse.data;

    };
    async function addToDo(title, description,createdDate,dueDate,completed) {

        const todoConfig = {
            headers: {
                'content-type': 'application/json'
            }
        };   

        const todoToUpload = {
            title,
            description,
            createdDate,
            dueDate,
            completed           
        };

        const todoResponse = await axios.post('/api/todos', todoToUpload,todoConfig);
        reFetchToDo();
        return todoResponse.data;
    }

    // The context value that will be supplied to any descendants of this component.
    const context = {
        todos,
        todosLoading,
        addToDo,
        deleteToDo
    }

    // Wraps the given child components in a Provider for the above context.
    return (
        <AppContext.Provider value={context}>
            {children}
        </AppContext.Provider>
    );
}

export {
    AppContext,
    AppContextProvider
};