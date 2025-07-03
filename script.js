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
      li.addEventListener("dblclick", function () {
        li.classList.toggle("completed");
      });
      list.appendChild(li);
      input.value = "";
    }
  });
});
