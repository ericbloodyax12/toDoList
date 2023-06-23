import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';


export type AddItemFormPropsType = {
    addItem: (title: string) => void

}

export const AddItemForm = memo(function (props: AddItemFormPropsType) {
    console.log("Additem form called")
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
        />
        <button onClick={addItem}>+</button>

        {error && <div className="error-message">{error}</div>}
    </div>
})
