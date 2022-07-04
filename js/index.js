let taskObj = {
  addbtn: document.querySelector(".addbtn"),
  modal: document.querySelector(".modal"),
  backdrop: document.querySelector(".backdrop"),
  main: document.querySelector("main"),
  cancebtn: document.querySelector(".cancelbtn"),
  description: document.querySelector(".Description"),
  taskbox: document.querySelector(".taskbox"),
  form: document.querySelector("#form"),
  titleInput: document.querySelector(".titleInput"),
  date: document.querySelector("#deyt"),
  textArea: document.querySelector("#textArea"),
  add: document.querySelector(".add"),
  msg: document.querySelector(".msg"),
  task: document.querySelector("#task"),
  edit: document.querySelector("#edit"),
  date_time : document.querySelector('.time_date')
};


taskObj.addbtn.addEventListener("click", openMod);
taskObj.cancebtn.addEventListener("click", () => {
 
  if (taskObj.modal.style.display === "flex") {
    closeAll();
    resetModal();
  };
  resetModal();
});


taskObj.form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (taskObj.titleInput.value === "") {
    taskObj.msg.innerHTML = "please enter some data";
    console.log("please enter some data");
  } else {
    taskObj.msg.innerHTML = "";
    console.log("success");
    acceptData();
    closeAll();
    resetModal();
  }
};

let data = [{}];

let acceptData = () => {
  data.push({
    taskTitle: taskObj.titleInput.value,
    date: taskObj.date.value,
    description: taskObj.textArea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));
  //console.log(data);
  createTasks();
};

let createTasks = () => {
  taskObj.task.innerHTML = "";
  data.forEach((item, n) => {
    return (taskObj.task.innerHTML += `
      <div id="${n}" class="cont" onclick="show(this)">
        <div class="taskbox task1 flex flex-jc-sb"  >
          <p class="title" >${item.taskTitle} </p>
              <span flex flex-jc-c flex-ai-c>
                  <span class="date">${item.date} </span>
                  <i class="fa-regular fa-pen-to-square" onclick=Edit(this) ></i>
                  <i onclick=deleteTask(this) class="fa-solid fa-trash-can"></i>
              </span>
        </div>
        <div class="Description hide">${item.description}</div>
      </div>
    `);
  });
  resetModal();
};

let show = event => {
  //console.log(event.lastElementChild)
  let lastchild = event.lastElementChild.classList
  if(lastchild.contains('hide')){
    event.lastElementChild.classList.remove('hide')
  }else{
    event.lastElementChild.classList.add('hide')
  }

}
let deleteTask = event => {
  event.parentElement.parentElement.parentElement.remove();
// from gradparents delete 1 element  
  data.splice(event.parentElement.parentElement.parentElement, 1); 
//converts data from JS object to JSON String
  localStorage.setItem("data", JSON.stringify(data)); 
  console.log(data);
};

function closeAll() {
  taskObj.modal.style.display = "none";
  taskObj.main.classList.remove("index");
  taskObj.backdrop.style.display = "none";
}

function openMod() {
  taskObj.modal.style.display = "flex";
  taskObj.main.classList.add("index");
  taskObj.backdrop.style.display = "block";
}

function resetModal() {
  taskObj.msg.value = "";
  taskObj.titleInput.value = "";
  taskObj.date.value = "";
  taskObj.textArea.value = "";
  taskObj.msg.innerHTML = "";
}

function Edit(e) {
  //e.parentElement.parentElement.remove()
  openMod();
  let title = e.parentElement.parentElement.children[0].innerHTML;
  let d = e.parentElement.parentElement.children[1].firstElementChild.innerHTM;
  let dscrptn = taskObj.task.lastElementChild.lastElementChild.innerHTML;
  //console.log(dscrptn)
  taskObj.titleInput.value = title;
  taskObj.date.value = d;
  taskObj.textArea.value = dscrptn;

  // console.log(e.parentElement.parentElement.children[0].innerHTML)
  // console.log(e.parentElement.parentElement.children[1].firstElementChild.innerHTML)
  // console.log(taskObj.task.lastElementChild.innerHTML)
  deleteTask(e);
  //console.log(data);
}

//Automatically run then parse the JSON object to String or Array
(() => {
  //converts data from JSON String to JS Object
  data = JSON.parse(localStorage.getItem("data")) || [];
  //console.log(typeof data);
  createTasks();
})();

//moment of truth HSHSHS ILOVEYOU NA TALAGA
setInterval(()=>{
  taskObj.date_time.innerHTML = `${moment().format("ddd MMMM D YYYY h:mm:ss a")}`, 1000;
})


/*

in this eventlistener the event bubbling is present
because the click event is added to the parent and it goes in and out the parent element
taskObj.task.addEventListener("click",(event) => {
  //console.log(event.target.parentElement.lastElementChild)
  let sib = event.target.parentElement.lastElementChild;
  if (sib.classList.contains("hide")) {
    //console.log(sib)
    sib.classList.remove("hide");
  } else {
    sib.classList.add("hide");
  }
} );

function taskBox(){
  //  taskObj.taskbox.addEventListener('click', ()=>{
    if(taskObj.taskbox.classList.contains('hide')){
    stopPropagation()
    }else{
        taskObj.description.classList.add('hide')
    }
 //);
}
taskObj.taskbox.addEventListener('click', taskBox)

taskObj.edit.addEventListener('click', ()=>{
  openMod();
  console.log( taskObj.modal.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling)
  taskObj.modal.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.value = taskObj.taskbox.firstElementChild.innerHTML
  taskObj.date.value =  taskObj.modal.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.innerHTML
  taskObj.textArea.value = taskObj.taskbox.nextElementSibling.innerHTML
*/