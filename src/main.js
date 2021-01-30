const textInput = document.getElementById("text-input"); //text input
const addButton = document.getElementById("add-button"); //add button
const sortButton = document.getElementById("sort-button"); // sort button
const viewSection = document.getElementById("view-section"); //the view section
const countText = document.getElementById("counter"); // the counter tasks

//if the local storage is empty set empty tasks array else save in the LS
if (localStorage.getItem("taskArr") === null) {
  localStorage.setItem("taskArr", "[]");
} else {
  printViewSection(JSON.parse(localStorage.getItem("taskArr")));
}
countText.innerText = `${JSON.parse(localStorage.getItem("taskArr")).length}`;

//event of add button that add to local storage and to view section
addButton.addEventListener("click", () => {
  const pin = document.createElement("div"); //making the pin with random color
  pin.className = "pin";
  var randomColor = Math.floor(Math.random() * 16777215).toString(16);
  pin.style.backgroundColor = `#${randomColor}`;

  const task = textInput.value;
  if (task === "" || task === " ") {
    //if the input is empty - get out from the function
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

  let newArr = JSON.parse(localStorage.getItem("taskArr")); //push to the local storage the new task
  newArr.push({
    priority: priority,
    date: new Date().toDateString(),
    task: task,
  });
  localStorage.setItem("taskArr", JSON.stringify(newArr));
  countText.innerText = `${JSON.parse(localStorage.getItem("taskArr")).length}`;
});

//event of the sort button
sortButton.addEventListener("click", () => {
  const newArr = [];
  const taskArr = JSON.parse(localStorage.getItem("taskArr"));
  for (let j = 5; j >= 1; j--) {
    for (let i = 0; i < taskArr.length; i++) {
      if (Number(taskArr[i].priority) === j) {
        newArr.push(taskArr[i]);
      }
    }
  }
  printViewSection(newArr);
});

//function that gets the type of arr that we have in local storage => arr of objects
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

//event that delete an item in the view section and loacl storage
document.addEventListener("click", (e) => {
  if (e.target.className !== "pin") {
    //if you dont click on the pin
    return;
  }
  e.target.parentNode.remove();
  const tooltipElem = document.getElementById("tooltip-delete");
  tooltipElem.hidden = true;
  tooltipElem.hidden = true;
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

//event of a delete pin tooltip
document.addEventListener("mouseover", (e) => {
  if (e.target.className !== "pin") {
    return;
  }
  const tooltipElem = document.getElementById("tooltip-delete");
  tooltipElem.style.top = e.target.getBoundingClientRect().top - 40 + "px";
  tooltipElem.style.left = e.target.getBoundingClientRect().left - 10 + "px";
  tooltipElem.hidden = false;
});
//and mouseout for the tooltip
document.addEventListener("mouseout", (e) => {
  if (e.target.className !== "pin") {
    return;
  }
  const tooltipElem = document.getElementById("tooltip-delete");
  tooltipElem.hidden = true;
});

//event of dark or light mode that toggle the css href
const darkLight = document.getElementById("dark-light");
const theme = document.querySelector("#theme-link");
darkLight.addEventListener("click", () => {
  if (theme.getAttribute("href") == "style.css") {
    theme.href = "dark.css";
    localStorage.setItem("mode", "dark");
    darkLight.innerText = "light";
  } else {
    theme.href = "style.css";
    localStorage.setItem("mode", "light");
    darkLight.innerText = "dark";
  }
});
if (localStorage.getItem("mode") === "dark") {
  // saving the loacl storage mode
  theme.href = "dark.css";
  darkLight.innerText = "light";
}
