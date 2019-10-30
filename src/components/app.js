import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import AddIcon from '@material-ui/icons/Add';

import './app.css';


class TodoItem extends React.Component {
  render(){
    return(
      <div key={this.props.id}>
            <Checkbox
                value="checkedA"
                inputProps={{ 'aria-label': 'Checkbox A' }}
            />
            <span>{this.props.todo}</span>
            <IconButton aria-label="delete">
                <DeleteIcon fontSize="small" />
            </IconButton>
          </div>
    );
  }
}

class Todo extends React.Component{
    render(){
      return(
        <div className="ToDo-Content">
            {this.props.todolist.map((item, key) => {
              return <TodoItem
                key={key}
                todo={item.todo}
              />
            }
          )}
        </div>
      );
    }
  };
  
class Add extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      todolist: [
        {id: 1, todo: "First Todo"},
        {id: 2, todo: "Second Todo"},
        {id: 3, todo: "Welcome to the jungle, cuz this ain't sahara desert"}
      ],
      textvalue: "",
    }
  }

  handleChange = (e) => {
    this.setState ( {
      textvalue: e.target.value,
    });
  }

  addFunc(){
      this.setState (prevState => (
        {
          todolist: [...prevState.todolist, {id: this.state.todolist.length +1, todo: this.state.textvalue}]
        }
      ));
      console.log(this.state.todolist);
  }
  render(){
    return(
      <div>
        <Paper className="root">
          <InputBase
            className="input"
            placeholder="Add new todo"
            inputProps={{ 'aria-label': 'add todo' }}
            onChange={this.handleChange}
          />
          <IconButton className="iconButton" aria-label="add" onClick={() => this.addFunc()}>
            <AddIcon />
          </IconButton>
        </Paper>
        <Todo todolist={this.state.todolist} />
      </div>
    );
  }
}

class App extends React.Component {
    render() {
        return(
            <div>
                <Add />
            </div>
        );
    }
}

export default App;