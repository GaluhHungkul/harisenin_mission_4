const form = document.querySelector("form")
const root = document.getElementById("root")


const tasks = []


const render = (task) => {
    if(!tasks.length) {
        root.innerHTML =
        `
        <p class="text-center content-center min-h-72 font-bold text-2xl">Tidak ada tasks tersedia 😴</p>
        `
    } else {
        let innerRoot = ""
        for(task of tasks) {
            let color;
            if(task.priority == "Low") color == 'bg-green-500/70'
            if(task.priority == "Medium") color == 'bg-orange-500/70'
            if(task.priority == "High") color == 'bg-red-500/70'
            innerRoot += 
            `
            <div class="border text-sm py-2 px-4 flex gap-2 flex-col bg-zinc-300 h-[75px] overflow-hidden rounded hover:min-h-30 ">
                <section class="flex justify-between ">
                    <div class="flex gap-10 ">
                        <p class="font-semibold"><span class="font-bold">Name</span> : ${task.name}</p>
                        <p class="font-semibold"><span class="font-bold">Position</span> : ${task.position}</p>
                    </div>
                    <p>${task.date}</p>
                </section>
                <section class="flex items-center gap-4">
                    <span class="px-6 py-1 rounded  font-bold ${color} text-white">${task.priority}</span>
                    <label for="done" class="text-lg font-semibold">
                        Done 
                    </label>
                    <input class="size-5" ${task.done && "checked"} type="checkbox" name="done" id="done" onclick="${handleDoneToggle(task.date)}">
                </section>            
                <section class="text-zinc-600 font-semibold ${task.done && "line-through"}">
                    <p>${task.task}</p>
                </section>
            </div>
            `
            root.innerHTML = innerRoot
        }
    }
}

const handleDoneToggle = (date) => {
   
}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const formList = e.target
    const { name, position, task, priority } = formList.elements
    const newTask = {
        name : name.value,
        position : position.value,
        task : task.value,
        priority : priority.value == "Select Priority" ? "Low" : priority.value,
        date : new Date().toLocaleString("id-ID"),
        done : false
    }
    tasks.push(newTask)
    render()
    form.reset()

})

render()