//event of dark or light mode that toggle the css href
const darkLight = document.getElementById("dark-light");
const theme = document.querySelector("#theme-link");
darkLight.addEventListener("click", () => {
  if (theme.getAttribute("href") == "light.css") {
    theme.href = "dark.css";
    localStorage.setItem("mode", "dark");
    darkLight.innerText = "light";
  } else {
    theme.href = "light.css";
    localStorage.setItem("mode", "light");
    darkLight.innerText = "dark";
  }
});
if (localStorage.getItem("mode") === "dark") {
  // saving the loacl storage mode
  theme.href = "dark.css";
  darkLight.innerText = "light";
}
const textInput = document.getElementById("text-input"); //text input
const addButton = document.getElementById("add-button"); //add button
const sortButton = document.getElementById("sort-button"); // sort button
const viewSection = document.getElementById("view-section"); //the view section
const countText = document.getElementById("counter"); // the counter tasks
const searchButton = document.getElementById("search-button"); //the search button
let todoContainers = document.getElementsByClassName("todo-container");
let taskArr = [];
const loader = document.getElementById("loader");

document.addEventListener("DOMConetentLoaded", getPersistent());

//event of add button
addButton.addEventListener("click", () => {
  const pin = document.createElement("div"); //making the pin with random color
  pin.className = "pin";
  var randomColor = Math.floor(Math.random() * 16777215).toString(16);
  pin.style.backgroundColor = `#${randomColor}`;
  const task = textInput.value;
  if (!task.trim()) {
    //if the input is empty - get out from the function
    alert("Please enter your task and prioirity");
    return;
  }
  textInput.value = ""; //make the input empty again
  let priority = document.getElementById("priority-selector").value;
  const todoContainer = document.createElement("div");
  todoContainer.className = "todo-container";
  const color = colorTask(priority); //paint the task backgorund div for each priority
  todoContainer.style.backgroundColor = color;
  const priorityDiv = document.createElement("div"); //making priority div
  priorityDiv.innerHTML = priority;
  priorityDiv.className = "todo-priority";
  const createdAtDiv = document.createElement("div"); //making date div
  createdAtDiv.innerHTML = new Date().toDateString();
  createdAtDiv.className = "todo-created-at";
  const textDiv = document.createElement("div"); //created task div
  textDiv.innerHTML = task;
  textDiv.className = "todo-text";
  todoContainer.append(pin, priorityDiv, createdAtDiv, textDiv);
  viewSection.appendChild(todoContainer);
  taskArr.push({
    //push the task to the main arr
    priority: priority,
    date: new Date().toDateString(),
    text: task,
  });
  setPersistent(taskArr); //set the taskArr in the JSON bin
  countText.innerText = taskArr.length;
});

let isSorted = false;
//event of the sort button and unsort
sortButton.addEventListener("click", () => {
  if (isSorted === false) {
    isSorted = true;
    const newArr = [];
    for (let j = 5; j >= 1; j--) {
      for (let i = 0; i < taskArr.length; i++) {
        if (Number(taskArr[i].priority) === j) {
          newArr.push(taskArr[i]);
        }
      }
    }
    printViewSection(newArr);
  } else {
    isSorted = false;
    printViewSection(taskArr);
  }
});

//function that gets the type of arr that we have in JSON bin => arr of objects
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
    textDiv.innerHTML = arr[i].text;
    textDiv.className = "todo-text";
    todoContainer.append(pin, priorityDiv, createdAtDiv, textDiv);
    viewSection.appendChild(todoContainer);
  }
}

//function that get a number of prioirity and returns a color
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

//event that delete an item in the view section and JSON bin
document.addEventListener("click", (e) => {
  if (e.target.className !== "pin") {
    //if you dont click on the pin
    return;
  }
  const tooltipDelete = document.getElementById("tooltip-delete");
  e.target.parentNode.remove();
  tooltipDelete.hidden = true;
  savingChanges();
});

//event of a delete pin tooltip
document.addEventListener("mouseover", (e) => {
  if (e.target.className !== "pin") {
    return;
  }
  const tooltipDelete = document.getElementById("tooltip-delete");
  tooltipDelete.style.top = e.target.getBoundingClientRect().top - 40 + "px";
  tooltipDelete.style.left = e.target.getBoundingClientRect().left - 10 + "px";
  tooltipDelete.hidden = false;
});
//and mouseout for the tooltip
document.addEventListener("mouseout", (e) => {
  if (e.target.className !== "pin") {
    return;
  }
  const tooltipDelete = document.getElementById("tooltip-delete");
  tooltipDelete.hidden = true;
});

//event of a edit tooltip
document.addEventListener("mouseover", (e) => {
  if (e.target.className !== "todo-text") {
    return;
  }
  const tooltipEdit = document.getElementById("tooltip-edit");
  tooltipEdit.style.top = e.target.getBoundingClientRect().top - 40 + "px";
  tooltipEdit.style.left = e.target.getBoundingClientRect().left + 0 + "px";
  tooltipEdit.hidden = false;
});
//and mouseout for the tooltip
document.addEventListener("mouseout", (e) => {
  if (e.target.className !== "todo-text") {
    return;
  }
  const tooltipEdit = document.getElementById("tooltip-edit");
  tooltipEdit.hidden = true;
});

//double click on .todo-text div for edit
document.addEventListener("dblclick", (e) => {
  const task = e.target.innerHTML;
  if (e.target.className !== "todo-text") {
    return;
  }
  e.target.contentEditable = true;
  //CTRL to save the edit task
  document.addEventListener("keydown", (event) => {
    if (event.ctrlKey) {
      // you cant save an empty task
      if (e.target.innerHTML === "") {
        e.target.innerHTML = task;
      }
      e.target.contentEditable = false;
      savingChanges();
    }
  });
  e.target.innerHTML = task;
});

//function that saving all the tasks in JSON bin
function savingChanges() {
  let arr = document.getElementsByClassName("todo-container");
  taskArr = [];
  for (const task of arr) {
    const priority = task.childNodes[1].innerHTML;
    const date = task.childNodes[2].innerHTML;
    const taskInner = task.childNodes[3].innerHTML;
    taskArr.push({
      priority: priority,
      date: date,
      text: taskInner,
    });
  }
  countText.innerText = taskArr.length;
  setPersistent(taskArr);
}

// event of search button that paint the font of the searched task
searchButton.addEventListener("click", () => {
  const searchInput = textInput.value;
  if (!searchInput.trim()) {
    //if the input is empty - do nothing
    return;
  }
  textInput.value = "";
  const arr = document.querySelectorAll(".todo-text");
  for (const task of arr) {
    if (task.innerHTML.search(searchInput) !== -1) {
      task.style.color = "red";
    } else {
      task.style.color = "#444444";
    }
  }
});
