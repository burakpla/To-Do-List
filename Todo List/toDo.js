//Choose All Elements
const form=document.querySelector("#todo-form");
const todoInput=document.querySelector("#todo");
const todoList=document.querySelector(".list-group");
const firstCardBody=document.querySelectorAll(".card-body")[0];
const secondCardBody=document.querySelectorAll(".card-body")[1];
const filter=document.querySelector("#filter");
const clearButton=document.querySelector("#clear-todos");

eventListeners();
//All event listeners
function eventListeners(){
      form.addEventListener("submit",addTodo);
      document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
      secondCardBody.addEventListener("click",deleteTodo);
      filter.addEventListener("keyup",filterTodos);
      clearButton.addEventListener("click",clearAllTodos);
}
function clearAllTodos(e){
    //clear todos from uı
    if(confirm("Tümünü silmek için emin misiniz?")){
        todoList.innerHTML="";
    }
}
function filterTodos(e){
    const filterValue=e.target.value.toLowerCase();
    const listItems=document.querySelectorAll(".list-group-item");
    listItems.forEach(function(listItem){
        const text=listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue)===-1){
            listItem.setAttribute("style","display :none !important");
        }
        else{
            listItem.setAttribute("style","display :block");
        }

    })
}
function deleteTodo(e){
    console.log(e.target);
    if(e.target.className==="fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","başarıyla silindi");
    }
function deleteTodoFromStorage(deletetodo){
    let todos=getTodosFromStorage();
    todos.forEach(function(todo,index){
        if(todo===deletetodo){
            todos.splice(index,1);
            
        }
        localStorage.setItem("todos",JSON.stringify(todos));
    })
}
}
function loadAllTodosToUI(){
    let todos=getTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}
function addTodo(e){

const newTodo=todoInput.value.trim();
    if(newTodo===""){
        /*
        <div class="alert alert-warning" role="alert">
                        This is a warning alert—check it out!
                      </div>*/
        showAlert("danger","Lütfen bir todo girin");
       
    }
    else{
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo); 
        showAlert("success","Başarıyla eklendi");

    }
    e.preventDefault();
}
function getTodosFromStorage(){//taking all todos from storage
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));

    }
    return todos;
}
function addTodoToStorage(newTodo){
 let todos=getTodosFromStorage();
 todos.push(newTodo);
 localStorage.setItem("todos",JSON.stringify(todos));

}
function showAlert(type,message){
    const alert=document.createElement("div");
    alert.className=`alert alert-${type}`;
    alert.textContent=message;
    firstCardBody.appendChild(alert);
    setTimeout(function(){
        alert.remove();
    },1000)
}
function addTodoToUI(newTodo){//Adding string value to list item for UI
    const listItem=document.createElement("li");
    //Make List Item 
    console.log(listItem);
    //Make Links
    const link=document.createElement("a");
    link.href="#";
    link.className="delete-item"; 
    link.innerHTML="<i class='fa fa-remove'></i>";

    listItem.className="list-group-item d-flex justify-content-between";
    //text node app
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    //adding list item to todo list
todoList.appendChild(listItem);

todoInput.value="";

}
