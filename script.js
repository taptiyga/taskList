// Ищем элементы на странице
const form = document.querySelector('#form')
const formInput = document.querySelector('#formInput')
const list = document.querySelector('#list')
const buttonAdd = document.querySelector('#buttonAdd')
const buttonDel = document.querySelector('.button__del')

//Добавление задачи
form.addEventListener('submit', addTask)

//Удаление задачи
list.addEventListener('click', delTask)

//Отмечаем задачу завершенной
list.addEventListener('click', doneTask)

//Функции
function addTask(e) {
    e.preventDefault()
    const formText = formInput.value
    const itemHTML = `<li class="item">
    <span class="item__text">${formText}</span>
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
        parentItem.remove()
    }
}
function doneTask(e) {
    if (e.target.classList.contains('item__text')) {
        const parentNode = e.target.closest('.item')
        const taskText = parentNode.querySelector('.item__text')
        taskText.classList.toggle('item__text_through')
    }
}