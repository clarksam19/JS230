document.addEventListener('DOMContentLoaded', () => {
  const contactsSection = document.getElementById('contacts');
  const createOrEditContact = document.getElementById('createOrEditContact');
  
  getContacts();

  const contactsTemplate = Handlebars.compile(document.getElementById('contactsTemplate').innerHTML);
  const createOrEditContactTemplate = Handlebars.compile(document.getElementById('createOrEditContactTemplate').innerHTML);

  Handlebars.registerPartial('contactPartial', document.getElementById('contactPartial').innerHTML);
  Handlebars.registerPartial('displayMessagePartial', document.getElementById('displayMessagePartial').innerHTML);
  Handlebars.registerPartial('searchMessagePartial', document.getElementById('searchMessagePartial').innerHTML);
  
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
    
    let data = new FormData(form);
    let request = new XMLHttpRequest();
    
    let method = form.method === 'get' ? 'put' : form.method;
    
    request.open(method, form.action);
    
    request.addEventListener('load', () => {
      getContacts();
    });

    request.send(data);
  });

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
    } else if (element.isSameNode(createOrEditContact)) {
      contactsSection.classList.replace('active', 'hidden');
      createOrEditContact.classList.replace('hidden', 'active');
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
