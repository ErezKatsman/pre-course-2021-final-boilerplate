const textInput = document.getElementById("text-input");
const addButton = document.getElementById("add-button");
const viewSection = document.getElementById("view-section");
const priority = document.getElementById("priority-selector").value;
let counter = 0;
const countText = document.getElementById("counter");
countText.innerText = `${counter} tasks`;

addButton.addEventListener("click", () => {
  const task = textInput.value;
  if (!task) {
    return;
  }
  textInput.value = "";

  counter++;
  countText.innerText = `${counter} tasks`;
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
});
