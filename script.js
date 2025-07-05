document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const list = document.getElementById("todo-list");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const newItemText = input.value.trim();
    if (newItemText !== "") {
      const li = document.createElement("li");
      li.classList.add("todo-item");
      const spanText = document.createElement("span");
      spanText.textContent = newItemText;
      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
      deleteBtn.classList.add("delete-btn");
      deleteBtn.addEventListener("click", function () {
        li.remove();
      });
      li.addEventListener("dblclick", function () {
        li.classList.toggle("completed");
      });
      li.appendChild(spanText);
      li.appendChild(deleteBtn);
      list.appendChild(li);
      input.value = "";
      saveListToLocalStorage();
    const clearCompletedBtn = document.getElementById("clear-completed");
    clearCompletedBtn.addEventListener("click", function () {
      const completedItems = document.querySelectorAll("#todo-list .completed");
      completedItems.forEach(function (item) {
        item.remove();
      });
    });
      saveListToLocalStorage();
    const emptyListBtn = document.getElementById("empty-list");
    emptyListBtn.addEventListener("click", function () {
      const allItems = document.querySelectorAll("#todo-list li");
      allItems.forEach(function (item) {
        item.remove();
      });
    });
      saveListToLocalStorage();
    }
  });
  function saveListToLocalStorage() {
    const items = [];
    document.querySelectorAll("#todo-list li").forEach(li => {
        items.push({
            text: li.firstChild.textContent.trim(),
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("todoList", JSON.stringify(items));
  }
  function loadListFromLocalStorage() {
    const items = JSON.parse(localStorage.getItem("todoList")) || [];
    items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.text;
        if (item.completed) {
            li.classList.add("completed");
        }
        
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => {
            li.remove();
            saveListToLocalStorage();
        });

        li.appendChild(deleteBtn);
        
        li.addEventListener("dblclick", () => {
            li.classList.toggle("completed");
            saveListToLocalStorage();
        });

        list.appendChild(li);
    });
  }

  loadListFromLocalStorage();
});
