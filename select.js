const container = document.getElementById('select');
var input;
var dropdown;

function searchBox() {
  input = document.createElement('input');
  input.classList = 'searchBox';
  input.setAttribute('placeholder', 'Select Country')
  input.addEventListener('click', toggleDropdown);
  input.addEventListener('keyup', onSearch);

  return input;
};

function select() {
  const select = document.createElement('div');
  select.appendChild(searchBox());
  select.appendChild(showDropdown());
  container.appendChild(select);
}

function clearItems() {
  while (dropdown.firstChild) {
    dropdown.removeChild(dropdown.firstChild);
  }
}

function appendItems(term) {
  clearItems()
  countries.forEach(c => {
    const { name, code } = c;
    if(term && name.search(new RegExp(term, 'i')) === -1  ) return
    
    const option = document.createElement('div');
    option.addEventListener('click', () => selectOption(name));
    option.setAttribute('id', code);
    const n = document.createElement('p');
    n.textContent = `${name}`;
    option.appendChild(n);
    dropdown.appendChild(option);
  });
  const option = document.createElement('div');
  const empty = document.createElement('p');
  empty.textContent = 'Nothing';
  option.classList = 'empty';
  option.appendChild(empty);
  dropdown.appendChild(option);
}

function showDropdown() {
  dropdown = document.createElement('div');
  dropdown.setAttribute('id', 'dropdown');
  dropdown.classList.add( 'hidden');
  appendItems()
  return dropdown;
};

function onSearch (e) {
  toggleDropdown(true)
  appendItems(input.value)
}

function toggleDropdown (show) {
  if(show===true) { 
    dropdown.classList.remove('hidden')
  } else {
    dropdown.classList.toggle('hidden');
  }
  if (!dropdown.classList.contains('hidden')){
    container.classList.add('open');
  } else {
    container.classList.remove('open');
  }
};

function selectOption (name) {
  input.value = name
  toggleDropdown();
};

select();