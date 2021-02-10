const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text){
  localStorage.setItem(USER_LS , text);
}//fn_saveName

function handleSubmit(event){
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}//fn_handleSubmit

function askForName(){
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit)
}//fn_askForName

function paintGreeting(text){
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello ${text}`;
}//fn_paintGreeting

function loadName(){
  const currentUser = localStorage.getItem(USER_LS);
  if(currentUser === null){
    askForName();
  }else{
    paintGreeting(currentUser);
  }
}//fn_loadName

function init(){
  loadName();
}//fn_init

init();
