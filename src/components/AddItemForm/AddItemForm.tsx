import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {RequestStatusType} from "../../app/app-reducer";


export type AddItemFormPropsType = {
    disabled: boolean
    addItem: (title: string) => void


}

export const AddItemForm = memo(function (props: AddItemFormPropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
// noinspection DuplicatedCode
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            addItem();
        }
    }

    return <div>
        <input value={title}
               onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler}
               className={error ? "error" : ""}
               disabled={props.disabled}
        />
        <button onClick={addItem} disabled={props.disabled}>+</button>

        {error && <div className="error-message">{error}</div>}
    </div>
})
