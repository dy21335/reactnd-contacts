import React, { Component } from 'react'
import ListContacts from './utils/ListContacts.js'
import * as ContactsAPI from './utils/ContactsAPI'
import CreateContact from './utils/CreateContact'

var contacts = [
    // {
    //   "id": 'ryan',
    //   "name": 'Ryan Florence',
    //   "email": 'ryan@reacttraining.com',
    //   "avatarURL":"http://localhost:5001/ryan.jpg"
    // },
    // {
    //   "id": 'michael',
    //   "name": 'Michael Jackson',
    //   "email": 'michael@reacttraining.com',
    //   "avatarURL": "http://localhost:5001/michael.jpg"
    // },
    // {
    //   "id": 'tyler',
    //   "name": 'Tyler McGinnis',
    //   "email": 'tyler@reacttraining.com',
    //   "avatarURL": "http://localhost:5001/tyler.jpg"
    // }
  ];


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      screen : 'list',
      contacts
    }
    this.removeContact = this.removeContact.bind(this);
  }

  removeContact(contact){
    this.setState((pre) => ({
      //es6箭头函数返回一个对象，要给对象加圆括号
     contacts : this.state.contacts.filter((c) => c.id !== contact.id)
    })
  )

    ContactsAPI.remove(contact)

  }

  componentDidMount(){
    ContactsAPI.getAll().then((contacts) => {
      this.setState(
        {contacts}
      )
    })
  }


  render() {
    //如果第一个表达式的值为true，运行第二表达式
    return (
      <div className='app'>

        {this.state.screen === 'list' && (
          <ListContacts
            onDeleteContact = {this.removeContact}
            contacts = {this.state.contacts}/>
        )}
        {this.state.screen === 'create' && (
          <CreateContact/>
        )}


      </div>

    )
  }
}

export default App;
