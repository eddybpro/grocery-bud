const form = document.querySelector('.grocery-form')
const alert = document.querySelector('.alert');
const grocery = document.querySelector('.grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.result-container')
const list = document.querySelector('.list');
const clearBtn = document.querySelector('.clear-btn');

// set variables
let editElement;
let editFlag = false;
let editID = '';


// add events listeners
form.addEventListener('submit', addItem);
clearBtn.addEventListener('click', clearItems);
window.addEventListener('DOMContentLoaded', setupItems)

// functions

function addItem(e){
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString();

    if(value && !editFlag){
        const element = document.createElement('li');
        const attr = document.createAttribute('data-id');
        attr.value = id;
        element.setAttributeNode(attr)
        element.classList.add('grocery-item')

        element.innerHTML=`<p>${value}</p>
        <div>
        <i class="edit fa-solid fa-pen"></i>
        <i class="remove fa-solid fa-trash-can"></i></div>`
        
        const deleteBtn = element.querySelector('.remove');
        deleteBtn.addEventListener('click', deleteItem)
        const editBtn = element.querySelector('.edit')
        editBtn.addEventListener('click', editItem);


        list.appendChild(element)
        container.classList.add('show-container')

        alertFun('item added to the list', 'success')

        // add to local storage
        addToLocalStorage(id, value);

        // set to default 
        setToDefault();
    }
    else if(value && editFlag){
        editElement.innerHTML = value;
        alertFun('item changed', 'success')

        editLocalStorage(editID, value)
        setToDefault()

    }else{
        alertFun('please enter value!', 'danger')
    }
    

}

function clearItems(){
    const items = document.querySelectorAll('.grocery-item');

    if (items.length) {
        items.forEach(item=>{
            list.removeChild(item)
        })
    }
    container.classList.remove('show-container')
    alertFun('empty list', 'danger')
    setToDefault();
    localStorage.removeItem('list');
}

function alertFun(text, action){
    alert.textContent = text;
    alert.classList.add(action);

    setTimeout(()=>{
        alert.textContent ='',
        alert.classList.remove(action)
    },1000)
}

function deleteItem(e){
    const item = e.target.parentElement.parentElement;
    const id = item.dataset.id;

    list.removeChild(item)
    alertFun('item removed', 'danger')


    if(!list.children.length){
        container.classList.remove('show-container')
        alertFun('empty list', 'danger')
    }
    removeFromLocalStorage(id);
    setToDefault()
}

function editItem(e){
    const item = e.target.parentElement.parentElement;
    editElement = e.target.parentElement.previousElementSibling;
    
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = item.dataset.id;

    submitBtn.textContent = 'edit';
}

function setToDefault(){
    grocery.value = '';
    editFlag = false;
    editID = '';
    submitBtn.textContent = 'submit';
}

// *  Local storage ****

function addToLocalStorage(id, value){
    const grocery = {id, value};
    let items = getLocalStorage();
    items.push(grocery);
    localStorage.setItem('list', JSON.stringify(items));
}

function getLocalStorage(){
    return localStorage.getItem('list')? JSON.parse(localStorage.getItem('list')):[];
}

function removeFromLocalStorage(id){
    let items = getLocalStorage();

    items = items.filter(item=>{if(item.id !== id)return item});

    localStorage.setItem('list', JSON.stringify(items))
}

function editLocalStorage(id, value){
    let items = getLocalStorage();
    items = items.map(item=>{
        if(item.id === id)item.value = value;
        return item;
    })

    localStorage.setItem('list', JSON.stringify(items))
}

function setupItems(){
    let items = getLocalStorage();

    if(items.length){
        items.forEach(item=>{
            createListItem(item.id, item.value)
        })
        container.classList.add('show-container')
    }
}

function createListItem(id, value){
    const element = document.createElement('li');
    const attr = document.createAttribute('data-id');
    attr.value = id;
    element.setAttributeNode(attr)
    element.classList.add('grocery-item')

    element.innerHTML=`<p>${value}</p>
    <div>
    <i class="edit fa-solid fa-pen"></i>
    <i class="remove fa-solid fa-trash-can"></i></div>`

    const deleteBtn = element.querySelector('.remove');
    deleteBtn.addEventListener('click', deleteItem)
    const editBtn = element.querySelector('.edit')
    editBtn.addEventListener('click', editItem);

    list.appendChild(element)
}





























































































