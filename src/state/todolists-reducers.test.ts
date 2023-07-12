import {v1} from 'uuid';
import {
    addTodolistAC,
    changeTodolistStatusAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC,
    todolistsReducer, TodolistType
} from "./todolists-reducer";

let todolistID1:string
let todolistID2:string


let startState: TodolistType[];
beforeEach(() => {
     todolistID1 = v1();
     todolistID2 = v1();

     startState = [
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"}
    ]
})

test("todolist should be removed correct", () => {

        const endState = todolistsReducer(startState, removeTodolistAC(todolistID1))

        expect(endState.length).toBe(1);
        expect(endState[0].id).toBe(todolistID2);
})

test("todolist should be added correct", () => {

    let newTodolistTitle = "New Todolist"

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle)

})

test("title of todo should be change correct", () => {
    let newTodolistTitle = "New Todolist"

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistID2,newTodolistTitle ))
    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
})

test("todolist`s status should be change correct", () => {

    let newFilter: FilterValuesType = "completed"
    let newTodolistTitle = "New Todolist"
    const endState = todolistsReducer(startState, changeTodolistStatusAC(todolistID2, newFilter))

    expect(endState[1].filter).toBe(newFilter);
})