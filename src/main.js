const textInput = document.getElementById("text-input");
const addButton = document.getElementById("add-button");
const viewSection = document.getElementById("view-section");
let taskArr = [];

if (localStorage.getItem("taskArr") === null) {
  localStorage.setItem("taskArr", "[]");
} else {
  let priority = document.getElementById("priority-selector").value;
  taskArr = JSON.parse(localStorage.getItem("taskArr"));
  for (let i = 0; i < taskArr.length; i++) {
    const todoContainer = document.createElement("div");
    todoContainer.className = "todo-container";

    const priorityDiv = document.createElement("div");
    priorityDiv.innerHTML = taskArr[i].priority;
    priorityDiv.className = "todo-priority";

    const createdAtDiv = document.createElement("div");
    createdAtDiv.innerHTML = taskArr[i].date;
    createdAtDiv.className = "todo-created-at";

    const textDiv = document.createElement("div");
    textDiv.innerHTML = taskArr[i].task;
    textDiv.className = "todo-text";

    todoContainer.append(priorityDiv, createdAtDiv, textDiv);
    viewSection.appendChild(todoContainer);
  }
}

const countText = document.getElementById("counter");
countText.innerText = `${JSON.parse(localStorage.getItem("taskArr")).length}`;

addButton.addEventListener("click", () => {
  const task = textInput.value;
  if (!task) {
    return;
  }
  textInput.value = "";

  let priority = document.getElementById("priority-selector").value;
  const todoContainer = document.createElement("div");
  todoContainer.className = "todo-container";

  const priorityDiv = document.createElement("div");
  priorityDiv.innerHTML = priority;
  priorityDiv.className = "todo-priority";

  const createdAtDiv = document.createElement("div");
  createdAtDiv.innerHTML = new Date().toDateString();
  createdAtDiv.className = "todo-created-at";

  const textDiv = document.createElement("div");
  textDiv.innerHTML = task;
  textDiv.className = "todo-text";

  todoContainer.append(priorityDiv, createdAtDiv, textDiv);
  viewSection.appendChild(todoContainer);

  let newArr = JSON.parse(localStorage.getItem("taskArr"));
  console.log(newArr);
  newArr.push({
    priority: priority,
    date: new Date().toDateString(),
    task: task,
  });

  localStorage.setItem("taskArr", JSON.stringify(newArr));
  countText.innerText = `${
    JSON.parse(localStorage.getItem("taskArr")).length
  } tasks`;
  console.log(priority);
});
