import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
}));

const todolist = [
  {id: 1, todo: "First Todo"},
  {id: 2, todo: "Second Todo"},
  {id: 3, todo: "Welcome to the jungle, cuz this ain't sahara desert"}
];

function Add(){
  var textvalue;
  function handleChange(e) {
    textvalue = e.target.value;
  }

  function addFunc(){
    todolist.push({id: todolist.length +1, todo: textvalue});
    console.log(todolist);
  }
  const classes = useStyles();
  return(
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Add new todo"
        inputProps={{ 'aria-label': 'add todo' }}
        onChange={handleChange}
      />
      <IconButton className={classes.iconButton} aria-label="add" onClick={addFunc}>
        <AddIcon />
      </IconButton>
    </Paper>
  );
}

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


class App extends Component {
    render() {
        return(
            <div>
                <Add />
                <Todo todolist={todolist} />
            </div>
        );
    }
}

export default App;