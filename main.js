var btns = document.querySelectorAll(".btns button"),
  showChange = document.querySelector(".showChange"),
  penTaskFilter = document.querySelector("#penTaskFilter"),
  comTaskFilter = document.querySelector("#comTaskFilter"),
  pendingTodos = document.querySelector(".pendingTodos"),
  completeTodos = document.querySelector(".completeTodos"),
  todoList = document.querySelectorAll(".todoList"),
  addInputField = document.querySelector(".addInputField"),
  editInputField = document.querySelector(".editInputField"),
  addTaskBtn = document.querySelector(".addTask"),
  saveTaskBtn = document.querySelector(".saveTask");
(pending = document.querySelector(".pending")),
  (completeTasks = document.querySelector(".completeTask"));
(notification = document.querySelector(".notification")),
  (deleteAllPenTodos = document.querySelector(".penTodos button")),
  (deleteAllComTodos = document.querySelector(".comTodos button"));
(pendingNum = document.querySelector(".pendingNum")),
  (completeNum = document.querySelector(".completeNum"));

btns[0].addEventListener("click", () => {
  showChange.style.left = "0";
  btns[0].style.pointerEvents = "none";
  btns[1].style.pointerEvents = "auto";
  penTaskFilter.style.display = "block";
  comTaskFilter.style.display = "none";
  pendingTodos.style.display = "block";
  completeTodos.style.display = "none";
  todoList.forEach((todo) => {
    todo.offsetHeight >= 320
      ? todo.classList.add("overflow")
      : todo.classList.remove("overflow");
  });
});

btns[1].addEventListener("click", () => {
  showChange.style.left = "50%";
  btns[0].style.pointerEvents = "auto";
  btns[1].style.pointerEvents = "none";
  penTaskFilter.style.display = "none";
  comTaskFilter.style.display = "block";
  pendingTodos.style.display = "none";
  completeTodos.style.display = "block";
  todoList.forEach((todo) => {
    todo.offsetHeight >= 320
      ? todo.classList.add("overflow")
      : todo.classList.remove("overflow");
  });
});

addInputField.addEventListener("keyup", () => {
  var inputVal = addInputField.value;
  if (inputVal.trim() != 0) {
    addTaskBtn.classList.add("active");
  } else {
    addTaskBtn.classList.remove("active");
  }
});

function showNotification(text, id) {
  notification.textContent = text;
  notification.classList.add(`${id}`);
  setTimeout(() => {
    notification.textContent = "";
    notification.classList.remove(`${id}`);
  }, 1500);
}

showtask();

// function for saving data to local storage.
addTaskBtn.onclick = () => {
  let userData = addInputField.value;

  let getLocalStorage = localStorage.getItem("Pending Todos");
  if (getLocalStorage == null) {
    listArr = []; // create a blank array
  } else {
    listArr = JSON.parse(getLocalStorage); // transforming json string into a js object
  }

  listArr.push(userData); // pusing or adding userdata in listArr
  localStorage.setItem("Pending Todos", JSON.stringify(listArr));
  showtask();
  addTaskBtn.classList.remove("active");
  showNotification("ToDo is Added Successfully", "success");
};

// function for showing data to display from local storage
function showtask() {
  let getLocalStorage = localStorage.getItem("Pending Todos");
  if (getLocalStorage == null) {
    listArr = []; // create a blank array
  } else {
    listArr = JSON.parse(getLocalStorage); // transforming json string into a js object
  }

  pendingNum.textContent = listArr.length;

  if (listArr.length > 1) {
    deleteAllPenTodos.classList.add("active");
  } else {
    deleteAllPenTodos.classList.remove("active");
  }

  let newTodos = "";

  listArr.forEach((element, index) => {
    newTodos += `<li>${element} <div class="action"><button onclick = "editTask(${index})"><i class="fa-solid fa-pen-to-square"></i></button><button onclick = "completeTask(${index})"><i class="fa-regular fa-square-check"></i></button><button onclick = "deleteTask(${index})"><i class="fa-solid fa-trash"></i></button></div></li>`;
  });

  pending.innerHTML = newTodos; // adding new li tag inside ul tag.
  addInputField.value = "";

  todoList.forEach((todo) => {
    todo.offsetHeight >= 320
      ? todo.classList.add("overflow")
      : todo.classList.remove("overflow");
  });
}

// function for deleting todo...
function deleteTask(index) {
  if (confirm("Are you sure want to delete?")) {
    let getLocalStorage = localStorage.getItem("Pending Todos");
    let listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1); // delete or remove particular index

    // after removing the li again update the local storage.
    localStorage.setItem("Pending Todos", JSON.stringify(listArr));
    showtask();
    showNotification("Task is Deleted Successfully", "danger");
  }
}

// function for deleting all todos...
deleteAllPenTodos.addEventListener("click", () => {
  if (confirm("Are you sure want to delete all pending task?")) {
    listArr = [];

    // after deleting all pending todos again update the local storage...
    localStorage.setItem("Pending Todos", JSON.stringify(listArr));
    showtask();
    showNotification("Deleted All Pending Task Successfully", "danger");
  }
});

// function for editing todos...
function editTask(index) {
  editInputField.value = index;
  let getLocalStorage = localStorage.getItem("Pending Todos");
  let listArr = JSON.parse(getLocalStorage);

  addInputField.value = listArr[index];
  addTaskBtn.style.display = "none";
  saveTaskBtn.style.display = "block";
}

// save todo after editing...
saveTaskBtn.addEventListener("click", () => {
  let getLocalStorage = localStorage.getItem("Pending Todos");
  let listArr = JSON.parse(getLocalStorage);

  let val = editInputField.value;

  listArr[val] = addInputField.value;

  addTaskBtn.style.display = "block";
  saveTaskBtn.style.display = "none";

  // after editing todo again update the local storage...
  localStorage.setItem("Pending Todos", JSON.stringify(listArr));
  addInputField.value = "";
  addTaskBtn.classList.remove("active");
  showtask();
  showNotification("Task is Editted Successfully", "success");
});

showCompleteTask();

// completed task function...
function completeTask(index) {
  let getLocalStorage = localStorage.getItem("Pending Todos");
  let listArr = JSON.parse(getLocalStorage);

  let comp = listArr.splice(index, 1);

  // after rmoving the li from Pending Todos againg update the Pending Todos.
  localStorage.setItem("Pending Todos", JSON.stringify(listArr));
  showtask();

  comp.forEach((com) => {
    comArr.push(com); // comArr is another array for showing the completed task.
  });

  localStorage.setItem("Complete Todos", JSON.stringify(comArr));
  showCompleteTask();
  showNotification("You have successfully Completed one Task", "success");
}

function showCompleteTask() {
  let getLocalStorage = localStorage.getItem("Complete Todos");

  if (getLocalStorage == null) {
    comArr = [];
  } else {
    comArr = JSON.parse(getLocalStorage);
  }

  completeNum.textContent = comArr.length;

  if (comArr.length > 1) {
    deleteAllComTodos.classList.add("active");
  } else {
    deleteAllComTodos.classList.remove("active");
  }

  let completeTask = "";

  comArr.forEach((element, index) => {
    completeTask += `<li>${element} <div class="action com"><button onclick = "back(${index})"><i class="fa-solid fa-xmark"></i></button><button onclick = "comDeleteTask(${index})"><i class="fa-solid fa-trash"></i></button></div></li>`;
  });

  completeTasks.innerHTML = completeTask;
}

// delete completeTodo
function comDeleteTask(index) {
  if (confirm("Are you sure want to delete?")) {
    let getLocalStorage = localStorage.getItem("Complete Todos");
    let comArr = JSON.parse(getLocalStorage);
    comArr.splice(index, 1);

    // after deleting li again update the local storage
    localStorage.setItem("Complete Todos", JSON.stringify(comArr));
    showCompleteTask();
    showNotification("Deleted one Task from Completed Task", "danger");
  }
}

// delete all todos from completeTodos
deleteAllComTodos.addEventListener("click", () => {
  if (confirm("Are you sure want to delete all completed task?")) {
    comArr = [];

    // after deleting all task again update the local storage...
    localStorage.setItem("Complete Todos", JSON.stringify(comArr));
    showCompleteTask();
    showNotification("Deleted All Tasks from Completed Task", "danger");
  }
});

// back todo from completeTask to PendingTask...
function back(index) {
  let getLocalStorage = localStorage.getItem("Complete Todos");
  let comArr = JSON.parse(getLocalStorage);
  let backTodo = comArr.splice(index, 1);

  // after deleting all task again update the local storage...
  localStorage.setItem("Complete Todos", JSON.stringify(comArr));
  showCompleteTask();

  backTodo.forEach((back) => {
    listArr.push(back);
  });

  localStorage.setItem("Pending Todos", JSON.stringify(listArr));
  showtask();
}

// filter Pending Task
function filterPenTask() {
  let filterInput = document
    .querySelector("#penTaskFilter")
    .value.toUpperCase();
  let li = pending.querySelectorAll("li");

  li.forEach((todo) => {
    if (todo) {
      let textValue = todo.textContent || todo.innerHTML;
      if (textValue.toUpperCase().indexOf(filterInput) > -1) {
        todo.style.display = "";
      } else {
        todo.style.display = "none";
      }
    }
  });
}

// filter Complete Task
function filterCompleteTask() {
  let filterInput = document
    .querySelector("#comTaskFilter")
    .value.toUpperCase();
  let li = completeTasks.querySelectorAll("li");

  li.forEach((todo) => {
    if (todo) {
      let textValue = todo.textContent || todo.innerHTML;
      if (textValue.toUpperCase().indexOf(filterInput) > -1) {
        todo.style.display = "";
      } else {
        todo.style.display = "none";
      }
    }
  });
}
