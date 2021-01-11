const addTaskButton = document.querySelector('#add-task-button');
const addTaskValue = document.querySelector('#add-task');
const toDoList = document.querySelector('.to-do-list');

const addTask = () => {
    if(addTaskValue.value) {
        const data = {
            description: addTaskValue.value,
            done: false
        };
    
        postData(data, apiUri).then(
            fillToDoList()
        );
    };

    addTaskValue.value = '';
};

const generateToDoListItem = (item) => {
    if(item.done == false) {
        checked = '';
        strike = ``;
    } else {
        checked = `checked="true"`;
        strike = `strike-through`;
    };

    return `<div class="checkbox">
            <input type="checkbox" id="${item._id}-checkbox" ${checked}>
        </div>
        <div class="text-field" id="${item._id}-textfield">
            <p class="${strike}" id="${item._id}-input">${item.description}</p>
        </div>
        <div class="trashcan">
            <i class="fas fa-trash-alt orange" id="${item._id}-trashcan"></i>
        </div>`;
};

const fillToDoListItem = (item) => {
    element = document.createElement('div');
    element.classList.add('to-do-list-item');
    element.innerHTML = generateToDoListItem(item);

    toDoList.appendChild(element);

    const checkbox = document.getElementById(`${item._id}-checkbox`);
    checkbox.addEventListener('click', function() {
        const data = {
            description: item.description,
            done: checkbox.checked
        };

        putDataChecked(data, apiUri, item._id).then(
            fillToDoList()
        );
    });

    const textfield = document.getElementById(`${item._id}-textfield`);
    textfield.addEventListener('click', function() {
        const newDescription = prompt('New message for task:');

        if(newDescription) {
            const data = {
                description: newDescription,
                done: item.done
            };
            
            putDataDescription(data, apiUri, item._id).then(
                fillToDoList()
            );
        };
    });

    const trashcan = document.getElementById(`${item._id}-trashcan`);
    trashcan.addEventListener('click', function() {
        deleteData(apiUri, item._id).then(
            fillToDoList()
        );
    });
};

const addEventListeners = () => {
    addTaskButton.addEventListener('click', addTask);
};

const emptyToDoList = () => {
    toDoList.innerHTML = '';
};

const fillToDoList = () => {
    emptyToDoList();

    getData(apiUri).then((data) => {
        data.forEach((item) => {
            fillToDoListItem(item);
        });
    });
};

addEventListeners();
fillToDoList();