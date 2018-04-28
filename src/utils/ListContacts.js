import React, { Component } from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListContacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
    this.updateQuery = this.updateQuery.bind(this);
    this.clearQuery = this.clearQuery.bind(this);

  }

  updateQuery(query){
    this.setState({query: query.trim()})
  }

  clearQuery(){
    this.setState({ query : '' })
  }


    render()
    {
      const { contacts, onDeleteContact } = this.props;
      const { query } = this.state;


      let showingContacts;
      if (query){
          const match = new RegExp(escapeRegExp(query),'i');
          //escapeRegExp表示忽略特殊字符，i表示忽略大小写
          showingContacts = contacts.filter((contact) => match.test(contact.name))
      }else{
        showingContacts = contacts
      }

      showingContacts.sort(sortBy('name'));

      return (
        <div className='list-contacts'>
          {JSON.stringify(this.state)}
          <div className='list-contacts-top'>
            <input
              className='search-contacts'
              type='text'
              placeholder='Search contacts'
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
            <a
              className='add-contact'
              herf = "#create"
              onClick={() => {}}
            ></a>
          </div>




          {showingContacts.length !== contacts.length && (
            <div className='showing-contacts'>
              <span>Now showing {showingContacts.length} of {contacts.length} total</span>
              <button onClick={this.clearQuery}>Show all</button>

            </div>
          )}


          <ol className='contact-list'>
            {showingContacts.map((contact) =>
              <li key={contact.id} className='contact-list-item'>
                <div className='contact-avatar' style={{
                  backgroundImage: `url(${contact.avatarURL})`
                }
                }/>
                <div className='contact-details'>
                  <p>{contact.name}</p>
                  <p>{contact.email}</p>
                </div>
                <button onClick={() => onDeleteContact(contact)} className='contact-remove'>
                  Remove
                </button>
              </li>
            )}
          </ol>
        </div>
      )
    }

}

ListContacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired
}

export default ListContacts
