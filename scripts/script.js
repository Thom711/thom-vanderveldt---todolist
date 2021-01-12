async function addTask() {
    const addTaskValue = document.querySelector('#add-task');

    if(addTaskValue.value) {
        const data = {
            description: addTaskValue.value,
            done: false
        };

        updateToDoList(data);

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

const fillToDoListItem = (toDoList, item) => {
    element = document.createElement('div');
    element.classList.add('to-do-list-item');
    element.id = `${item._id}-container`;
    element.innerHTML = generateToDoListItem(item);

    toDoList.appendChild(element);
    

    const checkbox = document.getElementById(`${item._id}-checkbox`);
    checkbox.addEventListener('click', async function() {
        const data = {
            description: item.description,
            done: checkbox.checked
        };

        const innerParapgraph = document.getElementById(`${item._id}-input`);

        innerParapgraph.classList.toggle('strike-through');

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

            const innerParapgraph = document.getElementById(`${item._id}-input`);
            innerParapgraph.textContent = newDescription;
            
            await putData(data, item._id);

            fillToDoList();
        };
    });

    const trashcan = document.getElementById(`${item._id}-trashcan`);
    trashcan.addEventListener('click', async function() {
        const removeElement = document.getElementById(`${item._id}-container`);
        removeElement.remove();

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
    getData().then((data) => {
        const toDoList = document.querySelector('.to-do-list');
        emptyToDoList(toDoList);

        data.forEach((item) => {
            fillToDoListItem(toDoList, item);
        });
    });
};

const updateToDoList = (data) => {
    const toDoList = document.querySelector('.to-do-list');
    element = document.createElement('div');
    element.classList.add('to-do-list-item');
    element.innerHTML = `<div class="checkbox">
        <input type="checkbox">
        </div>
        <div class="text-field">
            <p>${data.description}</p>
        </div>
        <div class="trashcan">
            <i class="fas fa-trash-alt orange"></i>
        </div>`;

    toDoList.prepend(element);
};

addEventListeners();
fillToDoList();