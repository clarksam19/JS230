document.addEventListener('DOMContentLoaded', () => {
  const contactsSection = document.getElementById('contacts');
  const createOrEditContact = document.getElementById('createOrEditContact');
  const searchResults = document.getElementById('searchResults');
  
  getContacts();

  const contactsTemplate = Handlebars.compile(document.getElementById('contactsTemplate').innerHTML);
  const createOrEditContactTemplate = Handlebars.compile(document.getElementById('createOrEditContactTemplate').innerHTML);
  const searchResultsTemplate = Handlebars.compile(document.getElementById('searchResultsTemplate').innerHTML);

  Handlebars.registerPartial('contactPartial', document.getElementById('contactPartial').innerHTML);
  Handlebars.registerPartial('displayMessagePartial', document.getElementById('displayMessagePartial').innerHTML);
  Handlebars.registerPartial('searchMessagePartial', document.getElementById('searchMessagePartial').innerHTML);
  Handlebars.registerHelper('any', (contacts) => {
    if (contacts) {
      return Object.keys(contacts).length > 0;
    } else {
      return false;
    }
  })
  createOrEditContact.innerHTML = createOrEditContactTemplate({method: 'POST', formType: 'Create'});

  document.body.addEventListener('click', (e) => {
    let addContactBtns = document.getElementsByClassName('addContact');
    let deleteBtns = document.getElementsByClassName('delete');
    let editBtns = document.getElementsByClassName('edit');
    let id = e.target.parentElement.dataset.id;
    if (isType(addContactBtns, e.target)) {
      createOrEditContact.innerHTML = createOrEditContactTemplate({method: 'POST', formType: 'Create'});
      show(createOrEditContact);
    } else if (isType(deleteBtns, e.target)) {
      deleteContact(id);
    } else if (isType(editBtns, e.target)) {
      createOrEditContact.innerHTML = createOrEditContactTemplate({method: 'PUT', formType: 'Edit', id: id});
      show(createOrEditContact);
    }
  });

  createOrEditContact.addEventListener('reset', () => {
    show(contactsSection);  
  });

  createOrEditContact.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let form = createOrEditContact.firstElementChild;
    
    let data = {};
    new FormData(form).forEach((value, key) => data[key] = value);
    
    let request = new XMLHttpRequest();
    
    let method = form.method === 'get' ? 'put' : form.method;
    
    request.open(method, form.action);
    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    request.addEventListener('load', () => {
      getContacts();
    });

    request.send(JSON.stringify(data));
  });

  
  function filterContactsBy(query) {
    let contactsDiv = contactsSection.getElementsByTagName('DIV')[0] || null;
    if (contactsDiv) {
      return [...contactsDiv.children].filter(div => {
        return div.firstElementChild.innerText.toLowerCase().includes(query);
      });
    } else {
      return [];
    }
    
  }
  
  
  document.querySelector('[type="search"]').addEventListener('keyup', (e) => {
    let searchedContacts = {};
    let query = e.target.value;
    let filteredContacts = filterContactsBy(query);
    let ids = filteredContacts.map(contact => contact.dataset.id);
    
    if (ids.length) {
      ids.forEach((id, idx) => getContactById(id, idx));
    } else {
      searchResults.innerHTML = searchResultsTemplate({query: query});
      show(searchResults);
    }
    
    function getContactById(id, index) {
      let request = new XMLHttpRequest();
      request.open('GET', `api/contacts/${id}`);
      request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
      
      request.addEventListener('load', () => {
        let contact = JSON.parse(request.response);
        searchedContacts[index] = contact;
        searchResults.innerHTML = searchResultsTemplate({results: searchedContacts});
        show(searchResults);
      });
  
      request.send();
    }
  })

  function isType(collection, target) {
    return [...collection].some(button => button.isSameNode(target));
  }

  function deleteContact(id) {
    let request = new XMLHttpRequest();
    request.open('DELETE', `/api/contacts/${id}`);
    request.addEventListener('load', () => {
      getContacts();
    });

    request.send();
  }

  function show(element) {
    if (element.isSameNode(contactsSection)) {
      contactsSection.classList.replace('hidden', 'active');
      createOrEditContact.classList.replace('active', 'hidden');
      searchResults.classList.replace('active', 'hidden');
    } else if (element.isSameNode(createOrEditContact)) {
      contactsSection.classList.replace('active', 'hidden');
      createOrEditContact.classList.replace('hidden', 'active');
      searchResults.classList.replace('active', 'hidden');
    } else if (element.isSameNode(searchResults)) {
      contactsSection.classList.replace('active', 'hidden');
      createOrEditContact.classList.replace('active', 'hidden');
      searchResults.classList.replace('hidden', 'active');
    }
  }

  function getContacts() {
    let request = new XMLHttpRequest();
    request.open('GET', 'api/contacts');
    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    
    request.addEventListener('load', () => {
      let contacts = JSON.parse(request.response);
      contactsSection.innerHTML = contactsTemplate({contacts: contacts});
      show(contactsSection);
    });

    request.send();
  }
});
