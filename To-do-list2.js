var ordlst =document.getElementById('mylist');
var bx=document.getElementById('box');
function itemList(itemtext,checked){
    var ls=document.createElement("li")  //create a li element
    var txt=document.createTextNode(itemtext);//create text for li element
    var mybox=document.createElement('input');//create the input tag
    mybox.setAttribute('type','checkbox');//add the type attribute of the input box
    ls.appendChild(txt)//append the text to the li
    ls.appendChild(mybox)//append the input elemnt to li
    ordlst.appendChild(ls)//append li to ordered list "ol"
    if(checked){//use checked to check if box is checked or not
        ls.classList.add("checked")
    }
    ls.onclick=function clicker(){
        if (this.classList.contains("checked")){
            this.classList.remove("checked")
        }else{
            this.classList.add("checked")
        }
    }
}
document.getElementById('add').onclick=function addinitiator(){ // function for add button
    var itemtext=bx.value;
    itemList(itemtext,false);
    return false;
}
document.getElementById('clear').onclick=function clearcompleted(){//function for clear complted button
    var completeditem=ordlst.getElementsByClassName("checked");//check for items with class "checked" hat is,those tht are checked
    while(completeditem.length>0){
        completeditem.item(0).remove()
    }
}
document.getElementById('empty').onclick=function emptylist(){//function for empty list button
    while(ordlst.children.length>0){
        ordlst.children.item(0).remove()
    }
}
document.getElementById('save').onclick=function savelist(){//function for savlist button
    var itemsarray=[];//create an array
    for(var i=0;i<ordlst.children.length;i++){ //loop through children of ordered list
        var items=ordlst.children.item(i);//get each item
        var itemsobj={"task":items.innerText,"checked":items.classList.contains("checked")}//create an object to take in each item text and  value for checked or not
        itemsarray.push(itemsobj)//push object into array
    }
    localStorage.setItem("itemsarray",JSON.stringify(itemsarray));//store into local storage with the key added and the value also(converted to string since local storage only takes in string)
}
function loadlist(){ //load the saved list
    if(localStorage.getItem("itemsarray")!=null){ //check if the local storage is not null
        var itemsbktoarray=JSON.parse(localStorage.getItem("itemsarray"))//if it isn't,convert the string inside back to array it was before.
        for(var i=0;i<itemsbktoarray.length;i++){ //loop through the array 
            var itemsarray=itemsbktoarray[i] //get each item of the object inside the array
            itemList(itemsarray.task,itemsarray.checked) //now let the arguments for itemList function respectively be the itemtext and value for checked in each objects.
        }
    }
}
loadlist() //function to load saved list