// Ищем элементы на странице
const form = document.querySelector('#form')
const formInput = document.querySelector('#formInput')
const list = document.querySelector('#list')
const buttonAdd = document.querySelector('#buttonAdd')
const buttonDel = document.querySelector('.button__del')

let tasks = []

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'))
    console.log(tasks)
}
tasks.forEach(function (task) {
    //Формируем CSS класс
    const ccsClass = task.done ? 'item__text item__text_through' : 'item__text'

    const itemHTML = `<li id="${task.id}" class="item">
    <span class="${ccsClass}">${task.text}</span>
    <button class="button button__del">del</button>
   
    </li>`

    list.insertAdjacentHTML('beforeend', itemHTML)
})
//Добавление задачи
form.addEventListener('submit', addTask)

//Удаление задачи
list.addEventListener('click', delTask)

//Отмечаем задачу завершенной
list.addEventListener('click', doneTask)

//Функции
function addTask(e) {
    e.preventDefault()
    //Добавляем текст задачи из поля ввода
    const formText = formInput.value
    //Описываем задачу в виде объекта
    const newTask = {
        id: Date.now(),
        text: formText,
        done: false
    }
    //Добавляем задачу в массив с задачами
    tasks.push(newTask)
    saveToLocalStorage()
    //Формируем CSS класс
    const ccsClass = newTask.done ? 'item__text item__text_through' : 'item__text'

    const itemHTML = `<li id="${newTask.id}" class="item">
    <span class="${ccsClass}">${newTask.text}</span>
    <button class="button button__del">del</button>
   
    </li>`

    if (formText != "") {
        list.insertAdjacentHTML('beforeend', itemHTML)
    }
    formInput.value = ''
    formInput.focus()
}

function delTask(e) {
    if (e.target.classList.contains('button__del')) {
        const parentItem = e.target.closest('.item')

        //Определяем ID задачи
        const id = Number(parentItem.id)

        //Находим индекс задачи в массиве
        const index = tasks.findIndex((task) => task.id === id)

        //Удаляем задачу из массива с задачами
        tasks.splice(index, 1)
        saveToLocalStorage()
        parentItem.remove()
    }
}
function doneTask(e) {
    if (e.target.classList.contains('item__text')) {
        const parentNode = e.target.closest('.item')

        //Определяем ID задачи
        const id = Number(parentNode.id)
        //Находим индекс задачи в массиве
        const task = tasks.find((task) => task.id === id)
        task.done = !task.done
        saveToLocalStorage()
        const taskText = parentNode.querySelector('.item__text')
        taskText.classList.toggle('item__text_through')
    }
}
function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}