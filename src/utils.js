// Gets data from persistent storage by the given key and returns it
function getPersistent() {
  for (const todo of todoContainers) {
    todo.hidden = true;
  }
  loader.hidden = false;
  const promise = fetch(
    "https://api.jsonbin.io/v3/b/602a718799ac3873a349c2b4/latest"
  );
  const loadedData = promise.then((response) => {
    return response.json();
  });
  const data = loadedData.then((result) => {
    taskArr = result.record["my-todo"];
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
  for (const todo of todoContainers) {
    todo.hidden = true;
  }
  loader.hidden = false;
  fetch("https://api.jsonbin.io/v3/b/602a718799ac3873a349c2b4", {
    method: "put",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ "my-todo": data }),
  }).then((res) => {
    loader.hidden = true;
    for (const todo of todoContainers) {
      todo.hidden = false;
    }
    return res.json();
  });
}
