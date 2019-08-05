//Immediately Invoked Function
var budgetController = (function(){

    var Expense = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;    
    }

    var data = {
        itemsAll : {
            expense : [],
            income : []
        },
        totals : {
            expense : 0,
            income : 0
        }
    }
})()



var UIController = (function () {
    // It is used to take input values.

    var DomStrings = {
        inputType : '.add__type',
        inputDescription : '.add__description',
        inputValue : '.add__value',
        inputBut : '.add__btn'
    };

    return {
        getinput : function(){
            return {
                type : document.querySelector(DomStrings.inputType).value , // the values will be either inc or exp;
                description : document.querySelector(DomStrings.inputDescription).value,
                value : document.querySelector(DomStrings.inputValue).value
            };
        },

        getDomStrings : function(){
            return DomStrings;
        }

    }
})();

//Setting the Event Listener
var controller = (function(budgetCtrl,UICtrl){

    var setupEventListener = function(){
        var DOM = UIController.getDomStrings();
        document.querySelector("#btn_add").addEventListener('click',ctrlAddItem);
        document.addEventListener('keypress',function(event){
            
            if(event.keyCode == 13){
                //same code as the controller function above. So to avoid repetation we will make another function (ctrlAddItem) and use it everywhere.
                ctrlAddItem();
            }
        });    
    }
    
    var ctrlAddItem = function(){ 
            // This function will contain all the functionality and will be used everywhere.
        //console.log("Enter Pressed")
        var input = UIController.getinput();
        console.log(input);
    }

    return {
        init : function(){
            console.log('Application has started');
            setupEventListener();
        }
    };

})(budgetController,UIController);

controller.init()