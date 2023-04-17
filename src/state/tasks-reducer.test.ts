import {TasksStateType} from "../App";

import {v1} from "uuid";
import {addTaskAC, ChangeStatusTaskAC, ChangeTitleTaskAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";


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
test("task`s title should be changed correct", () => {
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

    const endState = tasksReducer(startState, ChangeTitleTaskAC(
            todolistID2,
            "2",
            "New title"))

    expect(endState[todolistID2][1].title).toBe("New title");

})

test("new property with new array should be added when new todo is added", () => {
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

    const endState = tasksReducer(startState, addTodolistAC("title no matter"))
    const  keys = Object.keys(endState);
    const newKey = keys.find(k => k != todolistID1 && k != todolistID2)
    if (!newKey) {
        throw Error("new key was not found")
    }
    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])

})
test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState,action )


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).toBeUndefined()
})



