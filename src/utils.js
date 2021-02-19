// Gets data from persistent storage by the given key and returns it
function getPersistent() {
  updateSpinner("show");
  //
  const promise = fetch("http://localhost:3008/v3/b");
  const loadedData = promise.then((response) => {
    return response.json();
  });
  const data = loadedData.then((result) => {
    taskArr = result.data;
    updateSpinner("hide");
    printViewSection(taskArr);
  });
}

// Saves the given data into persistent storage by the given key.
// Returns 'true' on success.
function setPersistent(data) {
  updateSpinner("show");
  fetch("http://localhost:3008/v3/b", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => {
    updateSpinner("hide");
    // const finalRes = res.json().then((final) => {
    //   return final;
    // });
    // return finalRes;
  });
}

function deletePersistent(index) {
  let todoContainers = document.querySelectorAll(".todo-container");
  updateSpinner("show");
  //
  fetch(`http://localhost:3008/v3/b/${index}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  }).then(() => {
    updateSpinner("hide");
  });
}

function editPersistent(item, index) {
  let todoContainers = document.querySelectorAll(".todo-container");
  updateSpinner("show");
  //
  fetch(`http://localhost:3008/v3/b/${index}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  }).then(() => {
    updateSpinner("hide");
  });
}

function updateSpinner(stance) {
  let todoContainers = document.querySelectorAll(".todo-container");
  switch (stance) {
    case "hide":
      loader.hidden = true;
      for (const todo of todoContainers) {
        todo.hidden = false;
      }
      countText.innerText = JSON.stringify(taskArr.length);
      break;
    case "show":
      loader.hidden = false;
      for (const todo of todoContainers) {
        todo.hidden = true;
      }
      countText.innerText = "loading";
      break;
  }
}
