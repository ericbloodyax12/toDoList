import {TasksStateType} from "../App";

import {v1} from "uuid";
import {addTaskAC, ChangeStatusTaskAC, removeTaskAC, tasksReducer} from "./tasks-reducer";


test("task should be removed correct", () => {
    let todolistID1 = v1();
    let todolistID2 = v1();
    const startState:TasksStateType = {
        [todolistID1]: [
            {id:"1", title: "HTML&CSS", isDone: true},
            {id:"2", title: "JS", isDone: true}
        ],
        [todolistID2]: [
            {id:"1", title: "Milk", isDone: true},
            {id:"2", title: "React Book", isDone: true},
            {id:"3", title: "New Book", isDone: true}
        ]
    };

    const endState = tasksReducer(startState, removeTaskAC(todolistID2,"2"))

    expect(endState[todolistID2].every(t => t.id !== "2")).toBeTruthy();// .toBe(true)
    expect(endState[todolistID2].length).toBe(2);
    expect(endState[todolistID1].length).toBe(2);
})
test("task should be added correct", () => {
    let todolistID1 = v1();
    let todolistID2 = v1();
    const startState:TasksStateType = {
        [todolistID1]: [
            {id:"1", title: "HTML&CSS", isDone: true},
            {id:"2", title: "JS", isDone: true}
        ],
        [todolistID2]: [
            {id:"1", title: "Milk", isDone: true},
            {id:"2", title: "React Book", isDone: true},
            {id:"3", title: "New Book", isDone: true}
        ]
    };

    const endState = tasksReducer(startState, addTaskAC(todolistID2 ,"juice"))

    expect(endState[todolistID2][3].title).toBe("juice");
    expect(endState[todolistID2][3].isDone).toBe(false);
    expect(endState[todolistID2][3].id).toBeDefined();
    expect(endState[todolistID2].length).toBe(4);
    expect(endState[todolistID1].length).toBe(2);
})
test("task`s status should be changed correct", () => {
    let todolistID1 = v1();
    let todolistID2 = v1();
    const startState:TasksStateType = {
        [todolistID1]: [
            {id:"1", title: "HTML&CSS", isDone: true},
            {id:"2", title: "JS", isDone: false}
        ],
        [todolistID2]: [
            {id:"1", title: "Milk", isDone: true},
            {id:"2", title: "React Book", isDone: false},
            {id:"3", title: "New Book", isDone: true}
        ]
    };

    const endState = tasksReducer(startState, ChangeStatusTaskAC({
        isDone:true,
        id:"2",
        todolistID:todolistID2
    }));

    expect(endState[todolistID2][1].isDone).toBeTruthy(); //toBe(true)
    expect(endState[todolistID1][1].isDone).toBeFalsy();
    expect(endState[todolistID2].length).toBe(3);
    expect(endState[todolistID1].length).toBe(2);
})






