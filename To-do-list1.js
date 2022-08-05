var ordlst =document.getElementById('mylist');
var bx=document.getElementById('box');
function itemList(itemtext,completed){
    var ls=document.createElement("li")//create list tag
    var txt=document.createTextNode(itemtext);//create text for tht list 
    ls.appendChild(txt)//append the text to the list
    ordlst.appendChild(ls)//append the list to the ordered list
    if(completed){           //use class 'completed' to check if completed or not.That is,if the value for completed argument is true,then the ist is completd.
        ls.classList.add("completed")
    }
ls.ondblclick=function mydbclicker(){ //doubleclicker initiator --when you double click a list item means it is completed.
    if(this.classList.contains('completed')){ 
        this.classList.remove('completed')
    }else{
        this.classList.add('completed')
    }
}
}
document.getElementById('add').onclick=function addinitiator(){ //create function for add button
    var itemtext=bx.value;
    itemList(itemtext,false);
    return false;
}
document.getElementById('clear').onclick=function clearcompleted(){//clear items that are marked completed
    var completeditem=ordlst.getElementsByClassName('completed');
    while(completeditem.length>0){
        completeditem.item(0).remove()
    }
}
document.getElementById('empty').onclick=function emptylist(){
    while(ordlst.children.length>0){
        ordlst.children.item(0).remove()
    }
}
document.getElementById('save').onclick=function savelist(){//save list to localstorage
    var itemslisted=[]
    for(var i=0;i<ordlst.children.length;i++){//loop through the list
        var item=ordlst.children.item(i);//get each item
        var itemsobj={"task":item.innerText,"completed":item.classList.contains('completed')}//create an object containing the itemtext and value for completed or not
        itemslisted.push(itemsobj)//push object into array
    }
    localStorage.setItem('itemslisted',JSON.stringify(itemslisted))//save array to localstorage by indicating key and value(converted to string)
}
function loadlist(){//load saved list
    if(localStorage.getItem('itemslisted')!=null){ //check if localstorage isn't nul
        var itemarray=JSON.parse(localStorage.getItem('itemslisted'))//if it isn't,convert the string to array back
        for(var i=0;i<itemarray.length;i++){//loop throught the array
            var itemsobj=itemarray[i]//get each object inside
            itemList(itemsobj.task,itemsobj.completed)//get key and value and add as respective arguments for itemlist function.
        }
    }
}
loadlist()//call function to load saved list