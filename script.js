document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const list = document.getElementById("todo-list");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const newItemText = input.value.trim();
    if (newItemText !== "") {
      const li = document.createElement("li");
      li.textContent = newItemText;
      console.log("item dibuat");
      li.addEventListener("dblclick", function () {
        console.log("item diklik 2x");
        li.classList.toggle("completed");
      });
      list.appendChild(li);
      input.value = "";
    const clearCompletedBtn = document.getElementById("clear-completed");
    clearCompletedBtn.addEventListener("click", function () {
      const completedItems = document.querySelectorAll("#todo-list .completed");
      completedItems.forEach(function (item) {
        item.remove();
      });
    });
    const emptyListBtn = document.getElementById("empty-list");
    emptyListBtn.addEventListener("click", function () {
      const allItems = document.querySelectorAll("#todo-list li");
      allItems.forEach(function (item) {
        item.remove();
      });
    });
    }
  });
});
