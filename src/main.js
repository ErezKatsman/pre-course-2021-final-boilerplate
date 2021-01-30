const textInput = document.getElementById("text-input");
const addButton = document.getElementById("add-button");
const sortButton = document.getElementById("sort-button");
const viewSection = document.getElementById("view-section");

//if the local storage is empty set empty tasks array else save in the LS
if (localStorage.getItem("taskArr") === null) {
  localStorage.setItem("taskArr", "[]");
} else {
  let priority = document.getElementById("priority-selector").value;
  printViewSection(JSON.parse(localStorage.getItem("taskArr")));
}

const countText = document.getElementById("counter");
countText.innerText = `${JSON.parse(localStorage.getItem("taskArr")).length}`;

addButton.addEventListener("click", () => {
  const pin = document.createElement("div");
  pin.className = "pin";
  var randomColor = Math.floor(Math.random() * 16777215).toString(16);
  pin.style.backgroundColor = `#${randomColor}`;
  const task = textInput.value;
  if (task === "" || task === " ") {
    return;
  }
  textInput.value = "";

  let priority = document.getElementById("priority-selector").value;
  const todoContainer = document.createElement("div");
  todoContainer.className = "todo-container";

  const color = colorTask(priority);
  todoContainer.style.backgroundColor = color;

  const priorityDiv = document.createElement("div");
  priorityDiv.innerHTML = priority;
  priorityDiv.className = "todo-priority";

  colorTask;

  const createdAtDiv = document.createElement("div");
  createdAtDiv.innerHTML = new Date().toDateString();
  createdAtDiv.className = "todo-created-at";

  const textDiv = document.createElement("div");
  textDiv.innerHTML = task;
  textDiv.className = "todo-text";

  todoContainer.append(pin, priorityDiv, createdAtDiv, textDiv);
  viewSection.appendChild(todoContainer);

  let newArr = JSON.parse(localStorage.getItem("taskArr"));

  newArr.push({
    priority: priority,
    date: new Date().toDateString(),
    task: task,
  });

  localStorage.setItem("taskArr", JSON.stringify(newArr));
  countText.innerText = `${JSON.parse(localStorage.getItem("taskArr")).length}`;
});

sortButton.addEventListener("click", () => {
  const newArr = [];
  //
  const taskArr = JSON.parse(localStorage.getItem("taskArr"));
  //
  for (let j = 5; j >= 1; j--) {
    for (let i = 0; i < taskArr.length; i++) {
      if (Number(taskArr[i].priority) === j) {
        newArr.push(taskArr[i]);
      }
    }
  }
  printViewSection(newArr);
});

function printViewSection(arr) {
  viewSection.innerText = "";

  for (let i = 0; i < arr.length; i++) {
    const pin = document.createElement("div");
    pin.className = "pin";
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    pin.style.backgroundColor = `#${randomColor}`;
    const todoContainer = document.createElement("div");
    todoContainer.className = "todo-container";

    const priorityDiv = document.createElement("div");
    priorityDiv.innerHTML = arr[i].priority;
    priorityDiv.className = "todo-priority";

    const color = colorTask(arr[i].priority);
    todoContainer.style.backgroundColor = color;

    const createdAtDiv = document.createElement("div");
    createdAtDiv.innerHTML = arr[i].date;
    createdAtDiv.className = "todo-created-at";

    const textDiv = document.createElement("div");
    textDiv.innerHTML = arr[i].task;
    textDiv.className = "todo-text";
    todoContainer.append(pin, priorityDiv, createdAtDiv, textDiv);
    viewSection.appendChild(todoContainer);
  }
}

function colorTask(numStr) {
  switch (numStr) {
    case "1":
      return "#faa7ff";
      break;
    case "2":
      return "#9fff67";
      break;
    case "3":
      return "#fffe93";
      break;
    case "4":
      return "#ffc76b";
      break;
    case "5":
      return "#7efff3";
      break;
  }
}

document.addEventListener("click", (e) => {
  if (e.target.className !== "pin") {
    return;
  }
  e.target.parentNode.remove();
  let taskArr = document.getElementsByClassName("todo-container");
  let newArr = [];
  for (const task of taskArr) {
    const priority = task.childNodes[1].innerHTML;
    const date = task.childNodes[2].innerHTML;
    const taskInner = task.childNodes[3].innerHTML;
    newArr.push({
      priority: priority,
      date: date,
      task: taskInner,
    });
  }
  localStorage.setItem("taskArr", JSON.stringify(newArr));
  countText.innerText = `${JSON.parse(localStorage.getItem("taskArr")).length}`;
});

// document.addEventListener("mousemove", (e) => {
//   if (e.target.className !== "pin") {
//     return;
//   }
//   tooltipElem = document.createElement("div");
//   tooltipElem.className = "tooltip";

// });

// const darkLight = document.getElementById("dark-light");
// const them;
// darkLight.addEventListener("click", (e) => {});
