import React, { Component } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';

function Todo(props) {
    const content = props.todolist.map((todolist) =>
      <div key={todolist.id}>
        <Checkbox
            value="checkedA"
            inputProps={{ 'aria-label': 'Checkbox A' }}
        />
        <span>{todolist.todo}</span>
        <IconButton aria-label="delete">
            <DeleteIcon fontSize="small" />
        </IconButton>
      </div>
    );
    return (
      <div>
        {content}
      </div>
    );
  }

const todolist = [
    {id: 1, todo: "First Todo"},
    {id: 2, todo: "Second Todo"},
    {id: 3, todo: "Welcome to the jungle, cuz this ain't sahara desert"}
];

class App extends Component {
    render() {
        return(
            <Todo todolist={todolist} />
        );
    }
}

export default App;