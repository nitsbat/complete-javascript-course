//Immediately Invoked Function
var budgetController = (function(){

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };


    return {
        addItem: function(type, des, val) {
            var newItem, ID;
        
            // Create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            
            // Create new item based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            
            // Push it into our data structure
            data.allItems[type].push(newItem);
            
            // Return the new element
            return newItem;
        },
        testing : function(){
            console.log(data);
        }
    };

})()



var UIController = (function () {
    // It is used to take input values.

    var DomStrings = {
        inputType : '.add__type',
        inputDescription : '.add__description',
        inputValue : '.add__value',
        inputBut : '.add__btn',
        incomeContainer : '.income__list',
        expenseContainer :'.expenses__list'
    };

    return {
        getinput : function(){
            return {
                type : document.querySelector(DomStrings.inputType).value , // the values will be either inc or exp;
                description : document.querySelector(DomStrings.inputDescription).value,
                value : parseFloat(document.querySelector(DomStrings.inputValue).value)
            };
        },

        //add item to UI
        addListItem : function(obj,type){

            var html,element,newHtml;

            if(type === 'inc'){
                element = DomStrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }else if(type === 'exp'){
                element = DomStrings.expenseContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div> <div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            
            newHtml = html.replace("%id%",obj.id);
            newHtml = newHtml.replace("%description%",obj.description);
            newHtml = newHtml.replace("%value%",obj.value);

            document.querySelector(element).insertAdjacentHTML('beforeEnd',newHtml);


        },

        clearFields : function(){
            var docList = document.querySelectorAll(DomStrings.inputDescription + ', ' + DomStrings.inputValue);
            var fieldsArr = Array.prototype.slice.call(docList); //here fieldsarr[0] = DomStrings.description and fieldsarr[1] = value
            fieldsArr.forEach( function(current,index,value) {
                current.value = "";
            }); 

            fieldsArr[0].focus(); // It focus the input cursor to the field.
        },

        getDomStrings : function(){
            return DomStrings;
        }
    };
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

    var updateBudget = function(){
        //5. Calculate the Budget

        //6. Return the Budget

        //6.Display the budget on the UI

    }

    
    var ctrlAddItem = function(){ 
        // This function will contain all the functionality and will be used everywhere.
        var input , newItem ;
        
        
        //1. Get the input
        input = UIController.getinput();

        if(input.description !== "" && !isNaN(input.value) && input.value > 0){
            //2.Add the Item to the Budget Controller
            newItem = budgetController.addItem(input.type,input.description,input.value)
            // console.log(input);


            //3. Add the new Item to the UI
            UICtrl.addListItem(newItem,input.type);

            //4. Make input strings empty
            UICtrl.clearFields();

            //5. Calculate and Update Budget
            updateBudget();

        } 
    }

    return {
        init : function(){
            console.log('Application has started');
            setupEventListener();
        }
    };

})(budgetController,UIController);

controller.init()