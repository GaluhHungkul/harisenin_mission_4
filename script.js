const form = document.querySelector("form");
const root = document.getElementById("root");
const navigation = document.getElementById("navigation");

let isNowTasks = true;


let tasks = [];

let completedTasks = tasks.filter(a => a.done);

const render = () => {
  let currentLists = isNowTasks ? tasks : completedTasks;

  navigation.innerHTML = `
    <div class="flex text-sm gap-2">
        <button onclick="changeList(${true})" class=" lg:text-xl w-1/2 py-1 font-bold duration-300 ${
    isNowTasks ? "text-slate-700 bg-slate-400 " : "border  hover:bg-slate-900/70"
  } rounded cursor-pointer">Tasks</button>
        <button onclick="changeList(${false})"  class=" lg:text-xl w-1/2 py-1 font-bold duration-300 ${
    !isNowTasks
      ? "text-slate-700 bg-slate-400 "
      : "border  hover:bg-slate-900/70"
  } rounded cursor-pointer">Completed Tasks</button>
    </div>
    <button onclick="handleDeleteAll()" class=" lg:text-xl  bg-gray-500  cursor-pointer  font-bold px-4 p-1 text-white rounded hover:bg-gray-600 active:bg-gray-700  lg:ml-auto hover:text-red-600 ">DELETE ALL <i class="fa-solid fa-trash fa-lg ml-2 "></i></button>
    `;

  if (!currentLists.length) {
    root.innerHTML = `
        <p class="text-center content-center min-h-72 font-bold text-2xl text-white border-2">${
          isNowTasks
            ? "Kamu belum membuat task apapun 😴"
            : "Tidak ada tasks yang sudah selesai 😴"
        }</p>
        `;
  } else {
    let innerRoot = "";
    currentLists.forEach((task, index) => {
      let colorPriority;
      if (task.priority == "Low") colorPriority = "bg-green-500/70";
      if (task.priority == "Medium") colorPriority = "bg-orange-500/70";
      if (task.priority == "High") colorPriority = "bg-red-500/70";
      innerRoot += `
            <div class="text-slate-400 text-sm py-2 px-4 ${task.done ? "bg-slate-900" : "odd:bg-slate-700 even:bg-slate-600"} rounded lg:hover:scale-105  duration-300 relative lg:text-base">
              <div class="space-y-4 mb-4 ">
                  <section class="">
                    <p class="text-end mb-2 text-slate-300">${task.date.day}, ${task.date.full}</p>
                    <div class="flex gap-10 ">
                        <p class="font-semibold">Name : <span class="font-bold text-slate-300 ">${task.name}</span></p>
                        <p class="font-semibold " >Position : <span class="font-bold text-slate-300">${task.position}</span></p>
                    </div>
                  </section>
                  <section class="flex items-center justify-between gap-4 ">
                    <p class="font-bold w-max">Priority : <span class="px-3 py-1 rounded   ${colorPriority} text-white">${task.priority}</span></p> 
                    <div class="flex items-center">
                    ${isNowTasks? `
                    <label for="done_${index}" class=" font-semibold">
                        Done 
                    </label>
                    <input class="size-5 mr-5 ml-1 " ${task.done && "checked"} type="checkbox" name="done" id="done_${index}"  onclick="handleDoneToggle(${index})">
                        `
                        : ""
                    }
                   ${isNowTasks
                       ? `<button onclick="handleDelete(${index})" class="cursor-pointer group text-red-500 hover:text-red-600 active:text-red-700"><i class="fa-solid fa-trash fa-lg "></i></button>`
                       : ""
                   }
                      </div>                 
                  </section>  
              </div>          
              <section class="text-slate-400 font-semibold ">
                    <p class="font-bold">Task : <br /><span class="text-slate-300 ${
                      task.done && "line-through"
                    }">${task.task}</span></p>
              </section>
            </div>
            `;
    });
    innerRoot += `
        
        `;
    root.innerHTML = innerRoot;
  }
};

const changeList = (value) => {
  isNowTasks = value;
  render();
};

const handleDoneToggle = (index) => {
  tasks[index].done = !tasks[index].done;
  completedTasks = tasks.filter((a) => a.done);
  render();
};

const handleDelete = (index) => {
  tasks.splice(index, 1);
  completedTasks.splice(index, 1);
  render();
};

const handleDeleteAll = () => {
  const confirm = window.confirm("Are you sure to delete all tasks?")
  if(!confirm) return 
  tasks = [];
  completedTasks = tasks.filter((a) => a.done);
  render();
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formList = e.target;
  const { name, position, task, priority } = formList.elements;
  const newTask = {
    name: name.value,
    position: position.value,
    task: task.value,
    priority: priority.value == "Select Priority" ? "Low" : priority.value,
    date: {
      full : new Date().toLocaleString("id-ID"),
      day : new Date().toLocaleDateString("id-ID", { weekday : "long" })
    },
    done: false,
  };
  console.log(newTask);
  tasks.push(newTask);
  render();
  form.reset();
});

render();
