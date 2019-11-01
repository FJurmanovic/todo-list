import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import AddIcon from '@material-ui/icons/Add';
import cookie from "react-cookie";

import './app.css';


class TodoItem extends React.Component {
  render(){
    return(
      <div key={this.props.id} className='item'>
        <Paper className='Paper'>
            <Checkbox
                className="cb"
                checked={this.props.checkbox}
                value="checkedA"
                inputProps={{ 'aria-label': 'Checkbox A' }}
                onChange={this.props.cboxChagne}
            />
            <div className='text'>
              {this.props.todo}
              <div className='tooltiptext'>{this.props.todo}</div>
            </div>
            <IconButton className="ib" aria-label="delete" onClick={this.props.deleteItem}>
                <DeleteIcon fontSize="small" />
            </IconButton>
        </Paper>
      </div>
    );
  }
}

class Todo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      todolist: [{
        id: 1,
        todo: "Who",
        checkbox: false
      }],
      completelist: [{
        id: 1,
        todo: "Me",
        checkbox: true
      }],
      textvalue: "",
    }
  }

  componentDidMount() {
    const todolistData = JSON.parse( localStorage.getItem( "todolist" ) );
    const completelistData = JSON.parse( localStorage.getItem( "completelist" ) );
    if (localStorage.getItem("todolist") || localStorage.getItem("completelist")){
      this.setState( { todolist: todolistData } );
      this.setState( { completelist: completelistData } );
    }
  }

  updatingLocal(){
    console.log(this.state.todolist);
    console.log(this.state.completelist);
    localStorage.setItem("todolist", JSON.stringify(this.state.todolist));
    localStorage.setItem("completelist", JSON.stringify(this.state.completelist));
  }

  clearLocal(){
    localStorage.clearItem("todolist");
    localStorage.clearItem("completelist");
  }

  deleteItem = indexToDelete => {
    this.setState(({ todolist }) => ({
      todolist: todolist.filter((key, index) => index !== indexToDelete)
    }), this.updatingLocal);
  }
  deleteItem2 = indexToDelete => {
    this.setState(({ completelist }) => ({
      completelist: completelist.filter((key, index) => index !== indexToDelete)
    }), this.updatingLocal);
  }

  handleChange = (e) => {
    this.setState ( {
      textvalue: e.target.value,
    });
  }

  addFunc(){
      this.setState (prevState => (
        {
          todolist: [...prevState.todolist, {id: this.state.todolist.length +1, todo: this.state.textvalue, checkbox: false}]
        }
      ), this.updatingLocal);
  }

  cboxChange = (e) => {
    let todolistCopy = JSON.parse(JSON.stringify(this.state.todolist))
    todolistCopy[e].checkbox = !todolistCopy[e].checkbox
    this.setState({
      todolist: todolistCopy 
    }) 
    if (todolistCopy[e].checkbox == true){
      this.setState (prevState => (
        {
          completelist: [...prevState.completelist, {id: this.state.completelist.length +1, todo: todolistCopy[e].todo, checkbox: true}]
        }
      ),this.deleteItem(e), this.updatingLocal);
      
    }
  }

  cbox2Change = (e) => {
    let completelistCopy = JSON.parse(JSON.stringify(this.state.completelist))
    completelistCopy[e].checkbox = !completelistCopy[e].checkbox
    this.setState({
      completelist: completelistCopy 
    }) 
    if (completelistCopy[e].checkbox == false){
      this.setState (prevState => (
        {
          todolist: [...prevState.todolist, {id: this.state.todolist.length +1, todo: completelistCopy[e].todo, checkbox: false}]
        }
      ),this.deleteItem2(e), this.updatingLocal);
      
    }
  }

  render(){
    return(
      <div>
          <div className="add">
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
          </div>
          <br />
          <div className="alignmain">
            <div className="main">
              <div className="todo">
                  {this.state.todolist.map((item, key) => {
                    return <TodoItem
                      key={key}
                      todo={item.todo}
                      deleteItem={this.deleteItem.bind(this, key)}
                      checkbox={item.checkbox}
                      cboxChagne={this.cboxChange.bind(this, key)}
                    />
                  }
                )}
              </div>
              <div className="complete">
                  {this.state.completelist.map((item, key) => {
                    return <TodoItem
                      key={key}
                      todo={item.todo}
                      deleteItem={this.deleteItem2.bind(this, key)}
                      checkbox={item.checkbox}
                      cboxChagne={this.cbox2Change.bind(this, key)}
                    />
                  }
                )}
              </div>
            </div>
          </div>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return(
      <div>
        <Todo />
      </div>
    );
  }
}

export default App;
