$(document).ready(function(){
/** event to hide not confirm invitees **/
$(".wrapper-responded").on('change','input',(e) => {
   const check  = e.target.checked;
   const listChild = $('ul').children();   
   if(check){
   	  listChild.each((index)=>{
   	  let listActual = listChild[index];
      if(listActual.className === 'responded'){
        listActual.style.display = ''; 
      }else{
      	listActual.style.display = 'none';
      }
   	})
   }else{
   	listChild.each((index)=>{
		let listActual = listChild[index];
   		listActual.style.display = '';
   	})
   }
})
function createLi(name){
 //check for submit
 if(name !== "" && isNaN(name) === true ){
   function createElement(elementName,property,value){
    const element = document.createElement(elementName);
    element[property] = value;
    return element;
   }
   function appendToLi(elementName,property,value){
   	const element  = createElement(elementName,property,value);
    li.append(element)
    return element;
   }   
   const li =  document.createElement('li');
   appendToLi('span','textContent',name);
   appendToLi('label','textContent','Confirmed').
   append(createElement('input','type','checkbox'))
   appendToLi('button','textContent','edit');
   appendToLi('button','textContent','remove');
   return li;
 }
}
/**event to check confirm invtee **/
$('ul').on('change','label input',(e) => {
 const button = e.target;
 const check = button.checked;
 const parent = button.parentNode.parentNode;
 if(check){
 	parent.className = "responded";
 }else{
 	parent.className = "";
 }
})
/*event to click button list*/
$('ul').on('click','button',(e) => {
 const button = e.target;
 const li = button.parentNode;
 const ul = li.parentNode;
 const action = button.textContent;

 /** action to change the name --> save and edit**/
 function change(elementNew,contentButton,color,typeValue = null){
  const elementActual = li.firstElementChild;
  const newElement = document.createElement(elementNew);
  if(elementNew === "input"){
  	newElement.type = typeValue;
  	newElement.value = elementActual.textContent;
  }else{
    newElement.textContent = elementActual.value;
  }   
  li.insertBefore(newElement,elementActual);
  li.removeChild(elementActual);
  button.textContent = contentButton;
  button.style.backgroundColor = `${color}`;
 }
 //actions to button
 const  nameActions = {
   remove : () => {
   ul.removeChild(li);
   }, 
   edit : () => {
    change('input','save',"#28a745",'text');
   },
   save:() => {
    change('span','edit',"#58b7cd");
   }
 }
  // call to action
  nameActions[action]();
})
//submit action user
$("form").submit((e) =>{
e.preventDefault();
//default value checked
let check = $(".wrapper-responded input")
check[0].checked = false;
//text input form
const text = $("#invitee").val();
$("#invitee").val("");
const li =createLi(text);
$('ul').append(li);
});
});