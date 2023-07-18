import type { Meta, StoryObj } from '@storybook/react';
import {App, AppWithReduxPropsType} from './App';
import React from "react";
import {ReduxStoreProviderDecorator} from "../stories/assets/ReduxStoreProviderDecorator";



const meta: Meta<typeof App> = {
  title: 'TODOLISTS/App',
  component: App,

  tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator]


};
export default meta;
type Story = StoryObj<typeof App>;


export const AppStories: Story = {

}
