//Immediately Invoked Function
var budgetController = (function(){

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage ;
    };

    Expense.prototype.calcPercentage = function(totalInc){
        if(totalInc > 0){
            this.percentage = Math.round((this.value/totalInc) * 100);
        }else{
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercentage = function(){
        return this.percentage;
    };
    

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal = function(type){
        var sum = 0;
        data.allItems[type].forEach( function(current) {
            sum += current.value;
        });
        data.totals[type] = sum;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget : 0,
        percentage : -1
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

        deleteItem : function(type,id){
            
            
            var ids = data.allItems[type].map(function(current){
                return current.id;
            }); // maps works same as 
            
            index = ids.indexOf(id);
            
            if(index !== -1){
                data.allItems[type].splice(index,1);
            }
            
        },
    
        calculateBudget : function(){

            //Calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');
            // Calculate the budget :
            data.budget = data.totals['inc'] - data.totals['exp'];
            //Calculate the percentage of income
            if(data.totals['inc'] > 0){
                data.percentage = Math.round(data.totals['exp'] / data.totals['inc'] * 100);
            }else{
                data.percentage = -1;
            }
        },

        calculatePercentages : function(){
            
            data.allItems.exp.forEach(function(current){
                current.calcPercentage(data.totals.inc);
            });
        },

        getPercentages : function(){
            var allPerc = data.allItems.exp.map(function(cur){
                return cur.getPercentage();
            });
            return allPerc;
        },

        getBudget : function(){
            return {
                budget : data.budget,
                totalInc : data.totals.inc,
                totalExp : data.totals.exp,
                percentage : data.percentage
            };
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
        expenseContainer :'.expenses__list',
        budgetLabel : '.budget__value',
        incomeLabel : '.budget__income--value',
        expenseLabel : '.budget__expenses--value',
        percentageLabel : '.budget__expenses--percentage',
        container   : '.container',
        expensesPercLabel : '.item__percentage'
    };

    var formatNumber = function(num,type){
        var numSplit,dec,int;

        num = Math.abs(num);
        num = num.toFixed(2); // Rounded to two decimal number and returns a string of number
        numSplit = num.split('.')

        int = numSplit[0];
        if(int.length > 3){
            int.substr(0,int.length - 3) + ',' +  int.substr(int.length-3,3);
        }
        dec = numSplit[1];

        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' +dec ; 
    };

    var nodelistForEach = function(list,callback){
        for(var i = 0;i<list.length;i++){
            callback(list[i],i);
        }
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
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }else if(type === 'exp'){
                element = DomStrings.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div> <div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            
            newHtml = html.replace("%id%",obj.id);
            newHtml = newHtml.replace("%description%",obj.description);
            newHtml = newHtml.replace("%value%",formatNumber(obj.value,type));

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
        
        deleteListItem : function(selectorID){
            
            //for removing an HTML element fro DOM
            var ele = document.getElementById(selectorID);
            ele.parentNode.removeChild(ele);
            
        },
    
        displayBudget : function(obj){

            var type;
            obj.budget > 0 ? type = 'inc' : type = 'exp';

            document.querySelector(DomStrings.budgetLabel).textContent = formatNumber(obj.budget,type);
            document.querySelector(DomStrings.incomeLabel).textContent = formatNumber(obj.totalInc,'inc');
            document.querySelector(DomStrings.expenseLabel).textContent = formatNumber(obj.totalExp,'exp');
            
            if(obj.percentage > 0){
                document.querySelector(DomStrings.percentageLabel).textContent = obj.percentage + '%';
            }else{
                document.querySelector(DomStrings.percentageLabel).textContent = '----';
            }
        },

        displayPercentages : function(percentages){

            var fields = document.querySelectorAll(DomStrings.expensesPercLabel);

            nodelistForEach(fields,function(current,index){
                if(percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                }else{
                    current.textContent = '----';
                }
            });

        },
        displayMonth : function(){
            var now,month,year;
            now = new Date();
            year = now.getFullYear();
            month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            document.querySelector('.budget__title--month').textContent = month[now.getMonth()] + ' ' +year;
        },

        changedType : function(){
            
            var fields = document.querySelectorAll(
                DomStrings.inputType + ',' + DomStrings.inputDescription + ',' + DomStrings.inputValue
            );

            nodelistForEach(fields,function(cur){
                cur.classList.toggle('red-focus');
            });
            document.querySelector(DomStrings.inputBut).classList.toggle('red');
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
        document.querySelector(DOM .inputBut).addEventListener('click',ctrlAddItem);
        document.addEventListener('keypress',function(event){ //the event is always assosciated with the event Listener.
            
            if(event.keyCode == 13){
                //same code as the controller function above. So to avoid repetation we will make another function (ctrlAddItem) and use it everywhere.
                ctrlAddItem();
            }
        }); 
        
        document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem);
        document.querySelector(DOM.inputType).addEventListener('change',UICtrl.changedType);
    };



    var updateBudget = function(){
        //5. Calculate the Budget
        budgetCtrl.calculateBudget();
        //6. Return the Budget
        var budget = budgetCtrl.getBudget();
        //6.Display the budget on the UI
        UICtrl.displayBudget(budget);
    }

    var updatePercentages = function(){
       
        //1. Cal %age
       budgetCtrl.calculatePercentages();
       
        //2. Read %age
        var percentages = budgetCtrl.getPercentages();

        //3. Update the UI
        UICtrl.displayPercentages(percentages);    
    };
    
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

            //6.Update %ages
            updatePercentages();
        } 
    }
 
    var ctrlDeleteItem = function(event){
        var itemID,splitID,type,ID;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if(itemID){
              splitID = itemID.split('-');
              type = splitID[0];
              ID = parseInt(splitID[1]);

              //1. Delete the item from data structure
            budgetCtrl.deleteItem(type,ID);
            
              //2. Delete the item from the UI
            UICtrl.deleteListItem(itemID);
            
            
            //3. Update and show the budget
            updateBudget();

            //4.Update %age
            updatePercentages();
        }
    };

    return {
        init : function(){
            console.log('Application has started');
            UICtrl.displayBudget({
                budget : 0,
                totalInc : 0,
                totalExp : 0,
                percentage : -1
            });
            setupEventListener();
            UICtrl.displayMonth();
        }
    };

})(budgetController,UIController);

controller.init()