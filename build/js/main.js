const taskList = document.getElementById('taskList')
const saveBtn = document.getElementById('saveBtn')
const taskContainer = document.getElementById('taskConteiner')

function loadPreviousList(){
    if(localStorage.getItem("isPrevious")){
        let storageLength = (localStorage.length - 1) / 2
        for (let index = 0; index < storageLength; index++) {
            let title = localStorage.getItem(`task${index}`)
            let desc = localStorage.getItem(`description${index}`)
            taskList.innerHTML += `
            <li class="text-black text-sm flex flex-col bg-gradient-to-t from-amber-700 to bg-amber-600 rounded-md shadow-lg shadow-amber-800 mb-10 w-fit max-w-xs h-fit md:text-lg">
                <div class="flex flex-row w-30 justify-between text-center">
                    <p class="my-auto font-bold px-4 ">${title}</p>
                    <div class="flex flex-col items-center justify-between h-90 justify-self-end">
                        <button title="Erase task" class="bg-transparent text-slate-700 text-2xl hover:bg-indigo-500 hover:text-emerald-500 rounded-full h-7 text-center transition-colors duration-500" onclick="eraseTask(this)">&#x268A;</button>
                        <button class="mx-4 text-xl font-bold mt-auto rounded-full px-2 py-0 w-fit h-fit bg-amber-600 transition-all duration-500 hover:rotate-180" title="Show Description" onclick="showDescription(this)">&uparrow;</button>
                    </div>
                </div>
                <div id="description" class="opacity-40 hidden w-full h-full text-center mt-4 bg-amber-500 rounded-lg p-2">
                    <p>
                        ${desc}
                    </p>
                </div>
            </li>
            `
        }

    
    } else {
        return
    }

    


}


function eraseTask(task){
    let taskElement = task.parentElement.parentElement.parentElement
    taskList.removeChild(taskElement)
}

function buildTask(){
    taskList.innerHTML += `
    <li class="text-black font-bold text-sm flex flex-col bg-gradient-to-t from-amber-700 to bg-amber-600 rounded-md shadow-lg shadow-amber-800 mb-10 w-fit max-w-xs h-fit md:text-lg">
        <div class="flex flex-row w-30 text-center p-2">
            <label for="title">Título:</label>
            <input maxlength="12" size="14" type="text" class=" font-bold w-36 ml-1 rounded-lg"></input>
            <div class="flex flex-col ml-auto items-center justify-between h-90 justify-self-end">
                <button title="Done" class="bg-transparent text-slate-700 text-2xl hover:bg-indigo-500 hover:text-emerald-500 rounded-full h-fit px-1 text-center transition-colors duration-500" onclick="makeTask(this)">&#x2714;</button>
            </div>
        </div>
        <div id="description" class="w-full h-full text-center mt-4 bg-amber-500 rounded-lg">
            <label for="description">Descrição: </label>
            <textarea type="text" class="rounded-md m-1">
            </textarea>
        </div>
    </li>
`
}

function makeTask(button){
    let titleDiv = button.parentElement.parentElement
    let descriptionDiv = button.parentElement.parentElement.nextElementSibling
    let title = titleDiv.children[1].value
    let description = descriptionDiv.children[1].value

    eraseTask(button)

    taskList.innerHTML += `
    <li class="text-black text-sm flex flex-col bg-gradient-to-t from-amber-700 to bg-amber-600 rounded-md shadow-lg shadow-amber-800 mb-10 w-fit max-w-xs h-fit md:text-lg">
        <div class="flex flex-row w-30 justify-between text-center">
            <p class="my-auto font-bold px-4 ">${title}</p>
            <div class="flex flex-col items-center justify-between h-90 justify-self-end">
                <button title="Erase task" class="bg-transparent text-slate-700 text-2xl hover:bg-indigo-500 hover:text-emerald-500 rounded-full h-7 text-center transition-colors duration-500" onclick="eraseTask(this)">&#x268A;</button>
                <button class="mx-4 text-xl font-bold mt-auto rounded-full px-2 py-0 w-fit h-fit bg-amber-600 transition-all duration-500 hover:rotate-180" title="Show Description" onclick="showDescription(this)">&uparrow;</button>
            </div>
        </div>
        <div id="description" class="opacity-40 hidden w-full h-full text-center mt-4 bg-amber-500 rounded-lg p-2">
            <p>
                ${description}
            </p>
        </div>
    </li>
    `
}

function showDescription(button){
    let fatherElement = button.parentElement.parentElement
    let description = fatherElement.nextElementSibling
    // debugger
    if(description.classList.contains('hidden')){
        description.classList.toggle('animate-open-description')
        if(description.classList.contains('animate-close-description')){
            description.classList.toggle('animate-close-description')
        }
        description.classList.toggle('hidden')
    } else {
        description.classList.toggle('animate-open-description')
        description.classList.toggle('animate-close-description')
        setTimeout(() => description.classList.toggle('hidden'), "500")
    }
    button.classList.toggle('rotate-180')
}

function saveTaskList() {
    localStorage.clear()
    let listChildren = taskList.children
    for (let index = 0; index < listChildren.length; index++) {
        localStorage.setItem(`task${index}`, listChildren[index].children[0].children[0].innerHTML)
        localStorage.setItem(`description${index}`, listChildren[index].children[1].children[0].innerHTML)
    }
    localStorage.setItem(`isPrevious`, true)
}

loadPreviousList()
