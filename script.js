document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const list = document.getElementById("todo-list");
  const clearCompletedBtn = document.getElementById("clear-completed");
  const emptyListBtn = document.getElementById("empty-list");

  function saveListToLocalStorage() {
    const items = [];
    document.querySelectorAll("#todo-list li").forEach(li => {
      const span = li.querySelector("span");
      items.push({
        text: span.textContent,
        completed: li.classList.contains("completed"),
        deadline: li.querySelector("small")?.textContent.replace("Due: ", "") || "",
        category: li.querySelector(".category")?.textContent.replace("#", "") || ""
      });
    });
    localStorage.setItem("todoList", JSON.stringify(items));
  }

  function createListItem(text, completed = false, deadline = "", category ="") {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    if (completed) li.classList.add("completed");

    const taskTextDiv = document.createElement("div");
    taskTextDiv.classList.add("task-text");

    const spanText = document.createElement("span");
    spanText.textContent = text;

    const deadlineSmall = document.createElement("small");
    deadlineSmall.classList.add("deadline");
    if (deadline) {
      deadlineSmall.textContent = `Due: ${deadline}`;
    }

    taskTextDiv.appendChild(spanText);
    taskTextDiv.appendChild(deadlineSmall);

    const taskInfoDiv = document.createElement("div");
    taskInfoDiv.classList.add("task-info");

    const categorySpan = document.createElement("span");
    categorySpan.classList.add("category");
    if (category) {
      categorySpan.textContent = `#${category}`;
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function () {
      li.remove();
      saveListToLocalStorage();
    });

    taskInfoDiv.appendChild(categorySpan);
    taskInfoDiv.appendChild(deleteBtn);

    
    li.addEventListener("dblclick", function () {
      li.classList.toggle("completed");
      saveListToLocalStorage();
    });

    li.appendChild(taskTextDiv);
    li.appendChild(taskInfoDiv);

    return li;
  }

  function loadListFromLocalStorage() {
    const items = JSON.parse(localStorage.getItem("todoList")) || [];
    items.forEach(item => {
      const li = createListItem(item.text, item.completed, item.deadline, item.category);
      list.appendChild(li);
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const newItemText = input.value.trim();
    const dateInput = document.getElementById("todo-date");
    const deadline = dateInput.value;
    const categoryInput = document.getElementById("todo-category");
    const category = categoryInput.value;
    if (newItemText !== "") {
      const li = createListItem(newItemText, false, deadline, category);
      list.appendChild(li);
      input.value = "";
      dateInput.value = ""; 
      saveListToLocalStorage();
    }
  });

  clearCompletedBtn.addEventListener("click", function () {
    const completedItems = document.querySelectorAll("#todo-list .completed");
    completedItems.forEach(function (item) {
      item.remove();
    });
    saveListToLocalStorage();
  });

  emptyListBtn.addEventListener("click", function () {
    list.innerHTML = "";
    saveListToLocalStorage();
  });

  loadListFromLocalStorage();
});
