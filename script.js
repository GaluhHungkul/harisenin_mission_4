const form = document.querySelector("form");
const root = document.getElementById("root");
const navigation = document.getElementById("navigation");

let isNowTasks = true;

let tasks = [
  {
    date: {
      full : "30/3/2025, 13.54.15",
      day : "Senin"
    },
    done: false,
    name: "galuh",
    position: "CEO",
    priority: "High",
    task: "jangan lupa sholat",
  },
  {
    date: {
      full : "30/3/2025, 13.54.15",
      day : "Senin"
    },
    done: false,
    name: "Emiya Shirou",
    position: "Master",
    priority: "Low",
    task: "cook for saber",
  },
  {
    date: {
      full : "30/3/2025, 13.54.15",
      day : "Senin"
    },
    done: true,
    name: "Emiya Shirou",
    position: "Master",
    priority: "Low",
    task: "cook for saber",
  },
  {
    date: {
      full : "30/3/2025, 13.54.15",
      day : "Senin"
    },
    done: true,
    name: "Diarmuid",
    position: "Servant",
    priority: "Medium",
    task: "defeat saber",
  },
  {
    date: {
      full : "30/3/2025, 13.54.15",
      day : "Senin"
    },
    done: false,
    name: "galuh",
    position: "CEO",
    priority: "High",
    task: "jangan lupa sholat",
  },
  {
    date: {
      full : "30/3/2025, 21.28.21",
      day : "Senin"
    },
    done: false,
    name: "galuh",
    position: "CEO",
    priority: "Medium",
    task: "hahahha kamu sangatlah mkcaok amianidnadiasd asndlaldadda adla d lqoi oiroai oiae aoe oao oua kcak gaming hahhahaha wlalalaldsalkak",
  },
];

let completedTasks = tasks.filter(a => a.done);

const render = () => {
  let currentLists = isNowTasks ? tasks : completedTasks;

  navigation.innerHTML = `
    <div class="flex text-sm gap-2">
        <button onclick="changeList(${true})" class=" w-1/2 py-1 font-bold duration-300 ${
    isNowTasks ? "text-black bg-white" : "border  hover:bg-white/30"
  } rounded cursor-pointer">Tasks</button>
        <button onclick="changeList(${false})"  class=" w-1/2 py-1 font-bold duration-300 ${
    !isNowTasks
      ? "text-black bg-white"
      : "border  hover:bg-white/30"
  } rounded cursor-pointer">Completed Tasks</button>
    </div>
    <button onclick="handleDeleteAll()" class="  bg-red-500  cursor-pointer  font-bold px-4 p-1 rounded hover:bg-red-600 active:bg-red-700 ">DELETE ALL <i class="fa-solid fa-trash fa-lg ml-2 "></i></button>
    `;

  if (!currentLists.length) {
    root.innerHTML = `
        <p class="text-center content-center min-h-72 font-bold text-2xl">${
          isNowTasks
            ? "Tidak ada tasks tersedia 😴"
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
            <div class="border text-sm py-2 px-4 flex gap-2 flex-col  ${task.done ? "bg-zinc-400" : "odd:bg-zinc-200 even:bg-zinc-300"} rounded  ">
                <section class=" ">
                    <p class="text-end mb-2">${task.date.day}, ${task.date.full}</p>
                    <div class="flex gap-10 ">
                        <p class="font-semibold"><span class="font-bold">Name</span> : ${
                          task.name
                        }</p>
                        <p class="font-semibold"><span class="font-bold">Position</span> : ${
                          task.position
                        }</p>
                    </div>
                </section>
                <section class="flex items-center justify-between gap-4">
                    <p class="font-bold w-max">Priority : <span class="px-3 py-1 rounded   ${colorPriority} text-white">${
        task.priority
      }</span></p> 
                    <div class="flex items-center">
                    ${
                      isNowTasks
                        ? `
                    <label for="done" class=" font-semibold">
                        Done 
                    </label>
                    <input class="size-5 mr-5 ml-1 " ${
                      task.done && "checked"
                    } type="checkbox" name="done" id="done" onclick="handleDoneToggle(${index})">
                        `
                        : ""
                    }
                   ${
                     isNowTasks
                       ? `<button onclick="handleDelete(${index})" class="cursor-pointer group text-red-500 hover:text-red-600 active:text-red-700"><i class="fa-solid fa-trash fa-lg "></i></button>`
                       : ""
                   }
                    </div>
                    
                    
                </section>            
                <section class="text-zinc-600 font-semibold ">
                    <p class="font-bold">Task : <br /><span class=" ${
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
  tasks = [];
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
