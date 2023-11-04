import React, { useState } from "react";

function FindTask(props) {

    const [name, setName] = useState("");


    function handleChange(e) {
        setName(e.target.value);
    }

    function handleFind(e) {
        e.preventDefault();
        props.findTask(name);
        setName("");
    }

    return (
        <form onSubmit={handleFind}>
        <input
            type="text"
            id="new-todo-input"
            className="input input__lg"
            name="add"
            autoComplete="off"
            value={name}
            onChange={handleChange}
        />
        <button type="submit" className="btn btn__primary btn__lg">
            Find
        </button>
        </form>
    );
};

export default FindTask;