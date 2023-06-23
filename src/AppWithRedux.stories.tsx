import type { Meta, StoryObj } from '@storybook/react';
import {AppWithRedux, AppWithReduxPropsType} from './AppWithRedux';
import React from "react";
import {Provider} from "react-redux";
import {store} from "./state/store";
import {ReduxStoreProviderDecorator} from "./stories/assets/ReduxStoreProviderDecorator";


const meta: Meta<typeof AppWithRedux> = {
  title: 'TODOLISTS/AppWithRedux',
  component: AppWithRedux,

  tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator]


};
export default meta;
type Story = StoryObj<typeof AppWithRedux>;


export const AppWithReduxStories: Story = {

}
