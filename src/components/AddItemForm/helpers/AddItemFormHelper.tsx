import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import {AddItemFormPropsType} from "../AddItemForm";
import s from "../addItemForm.module.css";

export const AddItemErrorForm: FC<AddItemFormPropsType> = (args) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>("Title is required")

    const addItem = () => {
        if (title.trim() !== "") {
            args.addItem(title);
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
               className={error ? s.error : ""}
        />
        <button onClick={addItem}>+</button>

        {error && <div className= {s.errorMessage}>{error}</div>}
    </div>
}