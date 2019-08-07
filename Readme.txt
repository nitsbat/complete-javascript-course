MODULES

It is a part of program meaning divide the program into modules. Generally they are the regular functions we use in programming.
It keeps the units of code for a project neat and cleanly separated and organised.
Also Encapsulate some data into privacy.

e.g in our project there will be three kinds of module.

1.) UI MODULE
get input values
Add the new item to the UI
Update the UI

2.) DATA MODULE
add the new item to DS
Calculate budget

3.) CONTROLLER MODULE
Add event Handler.

We will use modules so that the variables can be made private and cannot be alterated by any other method or objects. Hence we will do data encapsulation
generally make a setupEventListener module in every web development project.

************************* Making an APP ****************************************************

EventListener - It performs some acion over an event.
For clicking of the mouse - document.querySelector('.add__btn').addEventListener('click',function()});
querySelector() takes the class or id tags. class is accessed by the .classid as example above.
For keypress i.e keyboard buttons - document.querySelector('.add__btn').addEventListener('keypress',function()});
Giving parameter to a function in keypress gives us power to play with which key is pressed in keyboard.

For inserting an html element from javascript we use the insertAdjacentHTML(). But for that we have to remove spaces from html command.
string.replace() removes a string with the second parameter.
    html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div> <div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
    newHtml = newHtml.replace("%value%",obj.value);
   document.querySelector(element).insertAdjacentHTML('beforeEnd',newHtml);

documents.querySelectorAll() returns a list. So we have to convert it into array for more functions. 
anyArray.slice(start,end) method takes input the array and returns the array from start to end -1. 

Array instances or objects are inherited from Array.prototype . Array.prototype actually contains all the array functions.

*****************************************************************************

EVENT BUBBLING - It means that if the event is triggere e.g from  abutton than its effect will be first on <p> , then on <section> , then on <body> and 
will continue till the <html>

The element from which the event is triggered is called the target element.

EVENT DELEGATION - The main html or section or body part can do any type of functionality when the EVENT BUBBLE happens. so its useful

*****************************************************************************

map function is similar to the foreach() . just it returns a brand new array.

************************************************************************************

To make a object constructor, we use object.prototype.functionname =  function(){};

****************************************************************************************
For inserting a css style script to an element just use the .classlist.add or .classlist.toggle 
e,g  document