
import {v1} from "uuid";
import {addTaskAC, ChangeTitleTaskAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";
import {TasksStateType} from "../AppWithRedux";


let todolistID1: string;
let todolistID2: string;
let startState: TasksStateType
// beforeEach(() => {
//     todolistID1 = v1();
//     todolistID2 = v1();
//     startState = {
//         [todolistID1]: [
//             {id: "1", title: "HTML&CSS", isDone: true},
//             {id: "2", title: "JS", isDone: true}
//         ],
//         [todolistID2]: [
//             {id: "1", title: "Milk", isDone: true},
//             {id: "2", title: "React Book", isDone: true},
//             {id: "3", title: "New Book", isDone: true}
//         ]
//     };
//
// })
//
// test("task should be removed correct", () => {
//
//
//     const endState = tasksReducer(startState, removeTaskAC(todolistID2, "2"))
//
//     expect(endState[todolistID2].every(t => t.id !== "2")).toBeTruthy();// .toBe(true)
//     expect(endState[todolistID2].length).toBe(2);
//     expect(endState[todolistID1].length).toBe(2);
// })
// test("task should be added correct", () => {
//
//
//     const endState = tasksReducer(startState, addTaskAC(todolistID2, task))
//
//     expect(endState[todolistID2][3].title).toBe("juice");
//     expect(endState[todolistID2][3].completed).toBe(false);
//     expect(endState[todolistID2][3].id).toBeDefined();
//     expect(endState[todolistID2].length).toBe(4);
//     expect(endState[todolistID1].length).toBe(2);
// })
// test("task`s status should be changed correct", () => {
//
//
//     const endState = tasksReducer(startState, ChangeStatusTaskAC({id:"2", isDone:false, todolistId:todolistID2}));
//
//     expect(endState[todolistID2][1].completed).toBeFalsy(); //toBe(false)
//     expect(endState[todolistID1][1].completed).toBeTruthy();
//     expect(endState[todolistID2].length).toBe(3);
//     expect(endState[todolistID1].length).toBe(2);
// })
// test("task`s title should be changed correct", () => {
//
//
//     const endState = tasksReducer(startState, ChangeTitleTaskAC(todolistID2, "2", "New title"))
//     expect(endState[todolistID2][1].title).toBe("New title");
// })
//
// test("new property with new array should be added when new todo is added", () => {
//     const endState = tasksReducer(startState, addTodolistAC("title no matter"))
//     const keys = Object.keys(endState);
//     const newKey = keys.find(k => k != todolistID1 && k != todolistID2)
//     if (!newKey) {
//         throw Error("new key was not found")
//     }
//     expect(keys.length).toBe(3)
//     expect(endState[newKey]).toEqual([])
//
// })
// test('property with todolistId should be deleted', () => {
//
//
//     const action = removeTodolistAC(todolistID2)
//     const endState = tasksReducer(startState, action)
//     const keys = Object.keys(endState)
//     expect(keys.length).toBe(1)
//     expect(endState['todolistId2']).toBeUndefined()
// })
//
//
//
