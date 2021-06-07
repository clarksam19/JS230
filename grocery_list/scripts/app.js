let listTemplateSource = document.getElementById('list').innerHTML;
let knownPartialSource = document.getElementById('knownQuantity').innerHTML;
let unknownPartialSournce = document.getElementById('unknownQuantity').innerHTML;

let listTemplateFunction = Handlebars.compile(listTemplateSource);
Handlebars.registerPartial('knownQuantity', knownPartialSource);
Handlebars.registerPartial('unknownQuantity', unknownPartialSournce);

Handlebars.registerHelper('add', (groceries, options) => {
  let out = '';
  for (let item in groceries) {
    if (groceries[item].quantity) {
      out += options.fn(groceries[item]);
    } else {
      out += options.inverse(groceries[item]);
    }
  }

  return out;
});

let list = document.querySelector('ul'); 
let form = document.querySelector('form');
let name = document.getElementById('name');
let quantity = document.getElementById('quantity');

let groceries = [];

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (name.value.trim().length > 0) {
    let item = {};
    item.name = name.value;
    item.quantity = quantity.value;
    groceries.push(item);
    list.innerHTML = listTemplateFunction({groceries: groceries});
    form.reset();
  } else {
    return;
  }
});

