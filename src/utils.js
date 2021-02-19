// Gets data from persistent storage by the given key and returns it
function getPersistent() {
  let todoContainers = document.querySelectorAll(".todo-container");
  for (const todo of todoContainers) {
    todo.hidden = true;
  }
  loader.hidden = false;
  //
  const promise = fetch("http://localhost:3008/v3/b");
  const loadedData = promise.then((response) => {
    return response.json();
  });
  const data = loadedData.then((result) => {
    console.log(result);
    taskArr = result;
    loader.hidden = true;
    for (const todo of todoContainers) {
      todo.hidden = false;
    }
    countText.innerText = JSON.stringify(taskArr.length);
    printViewSection(taskArr);
  });
}

// Saves the given data into persistent storage by the given key.
// Returns 'true' on success.
function setPersistent(data) {
  let todoContainers = document.querySelectorAll(".todo-container");
  for (const todo of todoContainers) {
    todo.hidden = true;
  }
  loader.hidden = false;
  fetch("http://localhost:3008/v3/b", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => {
    loader.hidden = true;
    for (const todo of todoContainers) {
      todo.hidden = false;
    }
    const finalRes = res.json().then((final) => {
      return final;
    });
    return finalRes;
  });
}

function deletePersistent(index) {
  let todoContainers = document.querySelectorAll(".todo-container");
  for (const todo of todoContainers) {
    todo.hidden = true;
  }
  loader.hidden = false;
  //
  fetch(`http://localhost:3008/v3/b/${index}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  loader.hidden = true;
  for (const todo of todoContainers) {
    todo.hidden = false;
  }
  countText.innerText = JSON.stringify(taskArr.length);
}
