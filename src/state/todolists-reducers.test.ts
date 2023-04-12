import {v1} from 'uuid';
import {FilterValuesType, TodolistType} from "../App";
import {
    AddTodolistAC,
    ChangeTodolistStatusAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./todolists-reducer";

test("todolist should be removed correct", () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

        const startState: TodolistType[] = [
            {id: todolistID1, title: "What to learn", filter: "all"},
            {id: todolistID2, title: "What to buy", filter: "all"}
        ]

        const endState = todolistsReducer(startState, RemoveTodolistAC(todolistID1))

        expect(endState.length).toBe(1);
        expect(endState[0].id).toBe(todolistID2);
})

test("todolist should be added correct", () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let newTodolistTitle = "New Todolist"
    const startState: TodolistType[] = [
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"}
    ]
    const endState = todolistsReducer(startState, AddTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle)

})

test("title of todo should be change correct", () => {
    let todolistID1 = v1();
    let todolistID2 = v1();


    let newTodolistTitle = "New Todolist"
    const startState: TodolistType[] = [
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistsReducer(startState, ChangeTodolistTitleAC(todolistID2,newTodolistTitle ))
    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
})

test("todolist`s status should be change correct", () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let newFilter: FilterValuesType = "completed"
    let newTodolistTitle = "New Todolist"
    const startState: TodolistType[] = [
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistsReducer(startState, ChangeTodolistStatusAC(todolistID2, newFilter))

    expect(endState[1].filter).toBe(newFilter);
})