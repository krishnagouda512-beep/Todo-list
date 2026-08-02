let btn = document.querySelector("#addtaskbtn");
let ul = document.querySelector("ul");
let input = document.querySelector("#textspace");
let popup = document.querySelector("#popup");
let taskEdit = document.querySelector("#task-edit");
let updateBtn = document.querySelector("#update");
let cancelBtn = document.querySelector("#cancel");
let switchBtn = document.querySelector(".switch input"); //dark mode
let delAll = document.querySelector("#remove");
let delpopup = document.querySelector("#delpopup");
let delpopupCancel = document.querySelector("#delcancel");
let delAllTask = document.querySelector("#delupdate");
let currentTaskspan = null;
//Add tasks with date and time
btn.addEventListener("click", function () {
  if (input.value.trim() !== "") {
    let li = document.createElement("li");

    let header = document.createElement("div");
    header.classList.add("header");

    let body = document.createElement("div");
    body.classList.add("text-body");

    let date = new Date(); //Creat resent dates
    let taskdate = document.createElement("p");
    taskdate.innerText = date.toLocaleDateString();

    let taskText = document.createElement("span");
    taskText.classList.add("task"); //user task input value
    taskText.innerText = input.value;
    //remove only this task
    let delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    delBtn.title = "delete";
    delBtn.onclick = function () {
      li.remove();
    };
    //edit task
    let editBtn = document.createElement("button");
    editBtn.classList.add("edit");
    editBtn.innerText = "✏️";
    editBtn.onclick = function () {
      popup.style.display = "flex";
      overlay.style.display = "block";
      currentTaskspan = taskText;
      taskEdit.value = taskText.innerText;
    };
    //update task
    // updateBtn.addEventListener("click", function () {
    //   if (currentTaskspan) {
    //     taskText.innerText = taskEdit.value;
    //   }
    //   popup.style.display = "none";
    // });

    let checkbox = document.createElement("input");
    checkbox.classList.add("checkbox");
    checkbox.type = "checkbox";

    //child element
    header.appendChild(checkbox);
    header.appendChild(taskdate);
    header.appendChild(editBtn);
    header.appendChild(delBtn);

    body.appendChild(taskText);

    li.appendChild(header);
    li.appendChild(body);

    ul.appendChild(li);
    input.value = "";
  }
});
//delete all task
delAll.addEventListener("click", function () {
  delpopup.style.display = "flex";
  overlay.style.display = "block";
});
delAllTask.addEventListener("click", function () {
  ul.innerHTML = "";
  delpopup.style.display = "none";
  overlay.style.display = "none";
});
delpopupCancel.addEventListener("click", function () {
  delpopup.style.display = "none";
  overlay.style.display = "none";
});

switchBtn.onchange = function () {
  if (switchBtn.checked) {
    document.body.style.backgroundColor = "#5d6364";
    document.querySelector("#outer").style.backgroundColor = "#333E40";
    document.querySelector(".inner").style.backgroundColor = "#333E40";
    localStorage.setItem("theme", "dark");
  } else {
    document.body.style.backgroundColor = "white";
    document.querySelector("#outer").style.backgroundColor = "ghostwhite";
    document.querySelector(".inner").style.backgroundColor = "white";
    localStorage.setItem("theme", "light");
  }
};
let theme = localStorage.getItem("theme");
if (theme === "dark") {
  switchBtn.checked = true;
  document.body.style.backgroundColor = "#5d6364";
  document.querySelector("#outer").style.backgroundColor = "#333E40";
  document.querySelector(".inner").style.backgroundColor = "#333E40";
  localStorage.setItem("theme", "dark");
} else {
  switchBtn.checked = false;
  document.body.style.backgroundColor = "white";
  document.querySelector("#outer").style.backgroundColor = "ghostwhite";
  document.querySelector(".inner").style.backgroundColor = "white";
  localStorage.setItem("theme", "light");
}

let allchecked = document.querySelector("#allchecked");

allchecked.addEventListener("change", function () {
  let checkbox = document.querySelectorAll(".checkbox");

  checkbox.forEach(function (box) {
    box.checked = allchecked.checked;
  });
});

//task saved in local storage
let savebtn = document.querySelector("#save");

savebtn.addEventListener("click", function () {
  let checkBoxes = document.querySelectorAll(".checkbox:checked");
  let saveTask = [];
  checkBoxes.forEach(function (box) {
    let li = box.closest("li");
    let task = li.querySelector(".task").innerText;
    let taskdate = li.querySelector("p").innerText;
    saveTask.push({ task, date: taskdate });
  });
  // console.log("saveTask");
  localStorage.setItem("saveTask", JSON.stringify(saveTask));
});
let savedTask = JSON.parse(localStorage.getItem("saveTask")) || [];

// console.log(savedTask);
savedTask.forEach(function (task) {
  let li = document.createElement("li");

  let header = document.createElement("div");
  header.classList.add("header");

  let body = document.createElement("div");
  body.classList.add("text-body");

  // let date = new Date(); //Creat resent dates
  let taskdate = document.createElement("p");
  taskdate.innerText = task.date;

  let taskText = document.createElement("span");
  taskText.classList.add("task");
  taskText.innerText = task.task;
  //remove individual task
  let delBtn = document.createElement("button");
  delBtn.innerText = "❌";
  delBtn.onclick = function () {
    li.remove();
  };

  let editBtn = document.createElement("button");
  editBtn.classList.add("edit");
  editBtn.innerText = "✏️";

  editBtn.onclick = function () {
    popup.style.display = "flex";
    overlay.style.display = "block";
    currentTaskspan = taskText;
    taskEdit.value = taskText.innerText;
  };
   
   //cancle edit popup
  cancelBtn.addEventListener("click", function () {
    popup.style.display = "none";
    overlay.style.display = "none";
  });
  //update task
  updateBtn.addEventListener("click", function () {
    if (currentTaskspan) {
      currentTaskspan.innerText = taskEdit.value;
    }
    popup.style.display = "none";
    overlay.style.display = "none";
  });
  let checkbox = document.createElement("input");
  checkbox.classList.add("checkbox");
  checkbox.type = "checkbox";

  //delete all task
    delAll.addEventListener("click", function () {
    delpopup.style.display = "flex";
    overlay.style.display = "block";
  });
  delAllTask.addEventListener("click", function () {
    li.remove();
    delpopup.style.display = "none";
    overlay.style.display = "none";
  });
  delpopupCancel.addEventListener("click", function () {
    delpopup.style.display = "none";
    overlay.style.display = "none";
  });

  header.appendChild(checkbox);
  header.appendChild(taskdate);
  header.appendChild(editBtn);
  header.appendChild(delBtn);

  body.appendChild(taskText);

  li.appendChild(header);
  li.appendChild(body);

  ul.appendChild(li);
});
