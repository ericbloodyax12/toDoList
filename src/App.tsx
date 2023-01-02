import React from 'react';
import './App.css';
import {ToDoList} from './ToDoList'
function App() {


    const shapka = "mune1"
    const tasks1 = [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false }
    ]
    const tasks2 = [
        { id: 1, title: "Hello world", isDone: true },
        { id: 2, title: "I am Happy", isDone: false },
        { id: 3, title: "Yo", isDone: false },
        { id: 4, title: "Yo", isDone: false }
    ]



    return (
        <div className="App">
            <ToDoList shapka={shapka} tasks={tasks1} />
            <ToDoList shapka={"mune2"} tasks={tasks2}/>
        </div>
    );
}

export default App;
