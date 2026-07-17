let btn = document.querySelector("button");
let ul = document.querySelector("ul");
let input = document.querySelector("input");
let delBtn = document.querySelector("#remove");
//Add tasks with indvidual delete
btn.addEventListener("click", function () {
  if (input.value.trim() !== "") {
    let li = document.createElement("li");
    li.innerText = input.value;

    //creat only this task
    let delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    delBtn.style.marginLeft = "100px";

    //delete only this task
    delBtn.addEventListener("click", function () {
      li.remove();
    });
    li.appendChild(delBtn);
    ul.appendChild(li);
    input.value = "";
  }
});
//delet all task
delBtn.addEventListener("click", function () {
  ul.innerText = "";
});
