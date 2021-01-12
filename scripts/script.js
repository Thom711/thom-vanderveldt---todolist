async function addTask() {
    const addTaskValue = document.querySelector('#add-task');

    if(addTaskValue.value) {
        const data = {
            description: addTaskValue.value,
            done: false
        };

        await postData(data);
        
        fillToDoList();
    };

    addTaskValue.value = '';
};

const generateToDoListItem = (item) => {
    if(item.done == false) {
        checked = '';
        strike = '';
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

async function fillToDoListItem(toDoList, item) {
    element = document.createElement('div');
    element.classList.add('to-do-list-item');
    element.innerHTML = generateToDoListItem(item);

    toDoList.appendChild(element);

    const checkbox = document.getElementById(`${item._id}-checkbox`);
    checkbox.addEventListener('click', async function() {
        const data = {
            description: item.description,
            done: checkbox.checked
        };

        await putData(data, item._id);

        fillToDoList();
    });

    const textfield = document.getElementById(`${item._id}-textfield`);
    textfield.addEventListener('click', async function() {
        const newDescription = prompt('New message for task:');

        if(newDescription) {
            const data = {
                description: newDescription,
                done: item.done
            };
            
            await putData(data, item._id);

            fillToDoList();
        };
    });

    const trashcan = document.getElementById(`${item._id}-trashcan`);
    trashcan.addEventListener('click', async function() {
        await deleteData(item._id);

        fillToDoList();
    });
};

const addEventListeners = () => {
    const addTaskButton = document.querySelector('#add-task-button');
    addTaskButton.addEventListener('click', addTask);
};

const emptyToDoList = (toDoList) => {
    toDoList.innerHTML = '';
};

const fillToDoList = () => {
    const toDoList = document.querySelector('.to-do-list');

    emptyToDoList(toDoList);

    getData().then((data) => {
        data.forEach((item) => {
            fillToDoListItem(toDoList, item);
        });
    });
};

addEventListeners();
fillToDoList();