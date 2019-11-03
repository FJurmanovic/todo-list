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
  constructor() {
    super();

  }

  handleChange = (e) => {
    event.preventDefault();
    this.props.handleStateChange(e.target.value)
    
  }

  handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      this.props.getOffEditMode();
    }
  }

  render(){
    return(
      <div  className='item'>
        <Paper className='Paper'>
            <Checkbox
                className="cb"
                checked={this.props.checkbox}
                value="checkedA"
                inputProps={{ 'aria-label': 'Checkbox A' }}
                onChange={this.props.cboxChagne}
            />
            <div className="section" onClick={this.props.getIntoEditMode}>
              {this.props.onEditMode ? (
                <InputBase
                  className="inputb"  
                  autoFocus
                  placeholder="Add new todo"
                  inputProps={{ 'aria-label': 'add todo' }}
                  onChange={this.handleChange}
                  onKeyPress={this.handleEnterKey}
                  onBlur={this.props.getOffEditMode}
                  defaultValue={this.props.todo}
                />
                ) : (
                <div className='text'>
                  {this.props.todo}
                  <div className='tooltiptext'>{this.props.todo}</div>
                </div>
                )}
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
    this.handleStateChange = this.handleStateChange.bind(this);
    this.state = {
      todolist: [],
      completelist: [],
      textvalue: "",
      textvalueAdd: "",
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

  handleStateChange(value){
    event.preventDefault();
    let textvalue = this.state.textvalue;
    textvalue = value;
    this.setState({ textvalue : textvalue })
  }

  getIntoEditMode = (e) => {
    let todolistCopy = JSON.parse(JSON.stringify(this.state.todolist))
    todolistCopy[e].onEditMode = true
    this.setState({
      todolist: todolistCopy,
      textvalue: todolistCopy[e].todo
    }) 
  };
  getIntoEditMode2 = (e) => {
    let completelistCopy = JSON.parse(JSON.stringify(this.state.completelist))
    completelistCopy[e].onEditMode = true
    this.setState({
      completelist: completelistCopy,
      textvalue: completelistCopy[e].todo
    }) 
  };
  
  getOffEditMode = (e) => {
    let todolistCopy = JSON.parse(JSON.stringify(this.state.todolist))
    todolistCopy[e].todo = this.state.textvalue
    todolistCopy[e].onEditMode = false
    this.setState({
      todolist: todolistCopy,
      textvalue: ""
    }, this.updatingLocal) 
  };

  getOffEditMode2 = (e) => {
    let completelistCopy = JSON.parse(JSON.stringify(this.state.completelist))
    completelistCopy[e].todo = this.state.textvalue
    completelistCopy[e].onEditMode = false
    this.setState({
      completelist: completelistCopy ,
      textvalue: ""
    }, this.updatingLocal) 
  };

  updatingLocal(){
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

  handleChangeAdd = (e) => {
    this.setState ( {
      textvalueAdd: e.target.value,
    });
  }

  addFunc(){
      this.setState (prevState => (
        {
          todolist: [...prevState.todolist, {todo: this.state.textvalueAdd, checkbox: false, onEditMode: false}]
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
          completelist: [...prevState.completelist, {todo: todolistCopy[e].todo, checkbox: true, onEditMode: false}]
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
          todolist: [...prevState.todolist, {todo: completelistCopy[e].todo, checkbox: false, onEditMode: false}]
        }
      ),this.deleteItem2(e), this.updatingLocal);
      
    }
  }

  handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      this.addFunc()
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
                onChange={this.handleChangeAdd}
                onKeyPress={this.handleEnterKey}
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
                      getOffEditMode={this.getOffEditMode.bind(this, key)}
                      getIntoEditMode={this.getIntoEditMode.bind(this, key)}
                      handleChange={this.handleChange.bind(this, key)}
                      onEditMode={item.onEditMode}
                      handleStateChange = {this.handleStateChange}
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
                      getOffEditMode={this.getOffEditMode2.bind(this, key)}
                      getIntoEditMode={this.getIntoEditMode2.bind(this, key)}
                      handleChange={this.handleChange.bind(this, key)}
                      onEditMode={item.onEditMode}
                      handleStateChange = {this.handleStateChange}
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
        {console.log("Version 1.0.0")}
      </div>
    );
  }
}

export default App;
