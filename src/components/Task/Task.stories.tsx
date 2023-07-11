import type { Meta, StoryObj } from '@storybook/react';
import {Task, TaskPropsType} from './Task';
import { action } from '@storybook/addon-actions';
import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";


// const meta: Meta<typeof Task> = {
//   title: 'TODOLISTS/Task',
//   component: Task,
//
//   tags: ['autodocs'],
//
//   args: {
//     todolistId: "asas" ,
//     task: {id: "12wsdewfijdei", title: "JS", isDone: true},
//     removeTask: action("removeTask"),
//     changeTaskTitle: action("changeTaskTitle"),
//     changeTaskStatus: action("changeTaskStatus")
//   },
//
// };
// export default meta;
// type Story = StoryObj<typeof Task>;
//
//
// export const TaskIsDoneStories: Story = {
//
//   // args: {
//   //   todolistId: "asas" ,
//   //   task: {id: "12wsdewfijdei", title: "JS", isDone: true},
//   //   removeTask: action("removeTask"),
//   //   changeTaskTitle: action("changeTaskTitle"),
//   //   changeTaskStatus: action("changeTaskStatus")
//   // }
// }
// export const TaskIsNoDoneStories: Story = {
//   args: {
//     task: {id: "12wsdewfijdei", title: "JS", isDone: false}
//   }
// }