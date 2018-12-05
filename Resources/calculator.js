var txtObj;
var calValue = Ti.UI.createTextField({
	value: 0,
	visible: false,
});;
var maxInputLength = 9;

exports.calculatorView = function(){
	
	var renew = true;
	var nextOperator = '';
	var decimalPointConcatenated = false;
	
	//var textObject;

	var wrapperView    = Ti.UI.createView({
		visible : false, zIndex: 300,
	}); // Full screen
	var backgroundView = Ti.UI.createView({  // Also full screen
	    backgroundColor : '#000',
	    opacity         : 0.5
	});
	var containerView  = Ti.UI.createView({  // Set height appropriately
	    top:'15%',
		bottom:'15%',
		left:'3%',
		right:'3%',
		width:'94%',
		backgroundColor:'#fff',
	});
	
	var display = Ti.UI.createTextField({
			color:'#EEEEEE',
	        backgroundColor: '#444444',
	        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	        maxLength:maxInputLength,
	        enabled: false,
	        value:calValue.value,
	        top: '2%',
	        left: '3%',
	        right:'3%',
	        height:'16%',
	        width:'94%',
	        textAlign: 'right',	        
	        font:{fontSize:35,},
	}); 
	
	var keypad = Ti.UI.createView({
			width: '96%',
		    height: '78%',
		    top: '20%',
		    bottom:'2%',		    
		    left: '2%',
	        right:'2%',   
		    backgroundColor:'#0A0A0A',
	});
	
	var textColor = '#0F0F0F';
	var backColor = '#C3C3C3';
	var sysBackColor = '#FFE3E0';
	var btnBackTouch = '#A6A6A6';
	var btnSysTouch = '#FFC1BA';
	var radius = 5;
	
	//buttons
	button7 = Ti.UI.createButton({
        color: textColor,
        backgroundColor: backColor,
        backgroundSelectedColor:btnBackTouch,
        borderRadius: radius,
        title:'7',
        top: '1%',     
        height:'18.8%',
        left: '1%',
        width:'18.8%'
   });
   
   button8 = Ti.UI.createButton({
        color: textColor,
        backgroundColor: backColor,
        backgroundSelectedColor:btnBackTouch,
        borderRadius: radius,
        title:'8',
        top: '1%',        
        height:'18.8%',
        left: '20.8%',
        width:'18.8%'
   });
   
   button9 = Ti.UI.createButton({
        color: textColor,
        backgroundColor: backColor,
        backgroundSelectedColor:btnBackTouch,
        borderRadius: radius,
        title:'9',
        top: '1%',        
        height:'18.8%',
        left: '40.6%',
        width:'18.8%'
   });
   
   buttonDivide = Ti.UI.createButton({
        color: textColor,
        backgroundColor: backColor,
        backgroundSelectedColor:btnBackTouch,
        borderRadius: radius,
        title:'/',
        top: '1%',        
        height:'18.8%',
        left: '60.4%',
        width:'18.8%'
   });
    
   buttonC = Ti.UI.createButton({
        color: textColor,
        backgroundColor: sysBackColor,
        backgroundSelectedColor:btnSysTouch,
        borderRadius: radius,
        title:'C',
        top: '1%',        
        height:'18.8%',
        left: '80.2%',
        width:'18.8%'
   });
   
   //button line 2
   button4 = Ti.UI.createButton({
        color: textColor,
        backgroundColor: backColor,
        backgroundSelectedColor:btnBackTouch,
        borderRadius: radius,
        title:'4',
        top: '20.8%',     
        height:'18.8%',
        left: '1%',
        width:'18.8%'
   });
   
   button5 = Ti.UI.createButton({
        color: textColor,
        backgroundColor: backColor,
        backgroundSelectedColor:btnBackTouch,
        borderRadius: radius,
        title:'5',
        top: '20.8%',        
        height:'18.8%',
        left: '20.8%',
        width:'18.8%'
   });
   
   button6 = Ti.UI.createButton({
        color: textColor,
        backgroundColor: backColor,
        backgroundSelectedColor:btnBackTouch,
        borderRadius: radius,
        title:'6',
        top: '20.8%',        
        height:'18.8%',
        left: '40.6%',
        width:'18.8%'
   });
   
   buttonmulti = Ti.UI.createButton({
        color: textColor,
        backgroundColor: backColor,
        backgroundSelectedColor:btnBackTouch,
        borderRadius: radius,
        title:'x',
        top: '20.8%',        
        height:'18.8%',
        left: '60.4%',
        width:'18.8%'
   });
    
   buttonBack = Ti.UI.createButton({
        color: textColor,
        backgroundColor: sysBackColor,
       	backgroundSelectedColor:btnSysTouch,
        borderRadius: radius,
        title:'<-',
        top: '20.8%',        
        height:'18.8%',
        left: '80.2%',
        width:'18.8%'
   });
   
   //button line 3
   button1 = Ti.UI.createButton({
        color: textColor,
        backgroundColor: backColor,
        backgroundSelectedColor:btnBackTouch,
        borderRadius: radius,
        title:'1',
        top: '40.6%',     
        height:'18.8%',
        left: '1%',
        width:'18.8%'
   });
   
   button2 = Ti.UI.createButton({
        color: textColor,
        backgroundColor: backColor,
        backgroundSelectedColor:btnBackTouch,
        borderRadius: radius,
        title:'2',
        top: '40.6%',        
        height:'18.8%',
        left: '20.8%',
        width:'18.8%'
   });
   
   button3 = Ti.UI.createButton({
        color: textColor,
        backgroundColor: backColor,
        backgroundSelectedColor:btnBackTouch,
        borderRadius: radius,
        title:'3',
        top: '40.6%',        
        height:'18.8%',
        left: '40.6%',
        width:'18.8%'
   });
   
   buttonminus = Ti.UI.createButton({
        color: textColor,
        backgroundColor: backColor,
        backgroundSelectedColor:btnBackTouch,
        borderRadius: radius,
        title:'-',
        top: '40.6%',        
        height:'18.8%',
        left: '60.4%',
        width:'18.8%'
   });
    
   buttonEqual = Ti.UI.createButton({
        color: textColor,
        backgroundColor: sysBackColor,
        backgroundSelectedColor:btnSysTouch,
        borderRadius: radius,
        title:'=',
        top: '40.6%',        
        height:'38.6%',
        left: '80.2%',
        width:'18.8%',
        font:{fontSize:35,}
   });
   
   //button line 4
   button0 = Ti.UI.createButton({
        color: textColor,
        backgroundColor: backColor,
        backgroundSelectedColor:btnBackTouch,
        borderRadius: radius,
        title:'0',
        top: '60.4%',     
        height:'18.8%',
        left: '1%',
        width:'18.8%'
   });
   
   button00 = Ti.UI.createButton({
        color: textColor,
        backgroundColor: backColor,
        backgroundSelectedColor:btnBackTouch,
        borderRadius: radius,
        title:'00',
        top: '60.4%',        
        height:'18.8%',
        left: '20.8%',
        width:'18.8%'
   });
   
   buttonDecimalPoint = Ti.UI.createButton({
        color: textColor,
        backgroundColor: backColor,
        backgroundSelectedColor:btnBackTouch,
        borderRadius: radius,
        title:'.',
        top: '60.4%',        
        height:'18.8%',
        left: '40.6%',
        width:'18.8%'
   });
   
   buttonPlus = Ti.UI.createButton({
        color: textColor,
        backgroundColor: backColor,
        backgroundSelectedColor:btnBackTouch,
        borderRadius: radius,
        title:'+',
        top: '60.4%',        
        height:'18.8%',
        left: '60.4%',
        width:'18.8%'
   });
    
	//System button	
	buttonOk = Ti.UI.createButton({
        color: textColor,
        backgroundColor: backColor,
        backgroundSelectedColor:btnBackTouch,
        borderRadius: radius,
        title:'OK',
        top: '80.2%',        
        height:'18.8%',
        left: '50.5%',
        width:'48.5%'
   });
   
   buttonCancel = Ti.UI.createButton({
        color: textColor,
        backgroundColor: backColor,
        backgroundSelectedColor:btnBackTouch,
        borderRadius: radius,
        title:'Cancel',
        top: '80.2%',        
        height:'18.8%',
        left: '1%',
        width:'48.5%'
   });
   
   
    
   //add button to keypad
    keypad.add(button7);
    keypad.add(button8);
    keypad.add(button9);
    keypad.add(buttonDivide);
    keypad.add(buttonC);
    // line2
    keypad.add(button4);
    keypad.add(button5);
    keypad.add(button6);
    keypad.add(buttonmulti);
    keypad.add(buttonBack);
    // line3
    keypad.add(button1);
    keypad.add(button2);
    keypad.add(button3);
    keypad.add(buttonminus);
    keypad.add(buttonEqual);
    // line4
    keypad.add(button0);
    keypad.add(button00);
    keypad.add(buttonDecimalPoint);
    keypad.add(buttonPlus);
    
    //system button line 5 
    keypad.add(buttonOk);
    keypad.add(buttonCancel);
    
    keypad.add(calValue);
	

// 	add display and keypad to mainview
	containerView.add(display);
	containerView.add(keypad);
	
	function buttonFunction(expression)
	{
		Ti.API.info(typeof expression);
		if ( renew )
		{
			renew = false;
			display.value = expression.toString();
		}
		else display.value = display.value + expression.toString();
	}
	
	function doOperation(operator, current)
	{
		current = parseFloat(current);
		
		if ( nextOperator.length == 0 ) 
		{
			
			nextOperator = operator;
			answer = current;
			current = '';
			
		}
		
		else
		{
			
			switch ( nextOperator )
			{
				
				case '+': if(nextOperator!=operator) answer = answer + current; break;
				case '-': if(nextOperator!=operator) answer = answer - current; break;
				case '*': if(nextOperator!=operator) answer = answer * current; break;
				case '/': if(nextOperator!=operator) answer = answer / current; break;
				case '=': if(nextOperator!=operator) answer = current; break;
				
			}
			nextOperator = '';
		}
		
		
		
		//display.value = answer.toString();
		display.value = answer.toPrecision(8)*1;
		
		nextOperator = operator;
		
		decimalPointConcatenated = false;
	}
	
	
	
	/* This is the listener for the Clear Button. */
	buttonC.addEventListener('click', function(e) {	
		
		display.value = '0'; // Resets the textbox to '0'
		renew = true; 		 // Indicate that a new expression should be made
		nextOperator = '';   // Resets so that there was no previous operation to do
		decimalPointConcatenated = false; // Indicate that a decimal point can now be added
	});
	
	buttonBack.addEventListener('click', function(e) {
	  	var desply_val = display.value;
	  	var json_val = desply_val.split("");
	  	var lastdeltekey = json_val[json_val.length-1];
	  	
	  	if(desply_val!=0 || json_val.length != 1){
	  		
		  	data = json_val.slice(0,-1);
		  	data_val = data.join('');
		  	
		  	if(data_val.length!=0){
		  		display.value = data_val;
		  	}
		  	else{
		  		display.value = '0';
		  		renew = true;
		  	}
		  	
		  	if(lastdeltekey=='.'){
		  		decimalPointConcatenated = false;
		  	}
	  	}
	  	
	  	
	});
	
	button0.addEventListener('click', function(e) {
	  	desply_val = display.value;
	  	json_val = desply_val.split("");
	  	
	  	if(desply_val!=0 || json_val.length != 1){
	  		buttonFunction('0');
	  	}
	  	
	  	
	});
	
	button1.addEventListener('click', function(e) {
	  	buttonFunction('1');	  	
	});
	
	button2.addEventListener('click', function(e) {
	  	buttonFunction('2');
	});
	
	button3.addEventListener('click', function(e) {
	  	buttonFunction('3');
	});
	
	button4.addEventListener('click', function(e) {
	  	buttonFunction('4');
	});
	
	button5.addEventListener('click', function(e) {
	  	buttonFunction('5');
	});
	
	button6.addEventListener('click', function(e) {
	  	buttonFunction('6');
	});
	
	button7.addEventListener('click', function(e) {
	  	buttonFunction('7');
	});
	
	button8.addEventListener('click', function(e) {
	  	buttonFunction('8');
	});
	
	button9.addEventListener('click', function(e) {
	  	buttonFunction('9');
	});
	
	button00.addEventListener('click', function(e) {
	  	desply_val = display.value;
	  	json_val = desply_val.split("");
	  	
	  	if(desply_val!=0 || json_val.length != 1){
	  		buttonFunction('00');
	  	}	  	
	  	
	});
	
	buttonDecimalPoint.addEventListener('click', function(e) {
		  if ( decimalPointConcatenated ) ;
		  else{
		  		decimalPointConcatenated = true;
		  		buttonFunction('.');
		  }
	});
	
	//Openartion Button
	buttonPlus.addEventListener('click', function(e) {			  	
	  	renew = true;
		doOperation('+', display.value);		
		
	});
	
	buttonminus.addEventListener('click', function(e) {
	  	
	  	var Disval = parseFloat(display.value);
	  	//alert(Disval);
	  	if(Disval != 0){
	  		renew = true;
	  		doOperation('-',display.value);
	  	}else{
	  		renew = false;
	  		display.value = "-";
	  	}
	  	
	});
	
	buttonmulti.addEventListener('click', function(e) {
	  	
	  	dispalyVal = display.value;
	  	if (dispalyVal.length!=0) {
	  		renew = true;
	  		doOperation('*',display.value);
	  	}
	  	
	});
	
	buttonDivide.addEventListener('click', function(e) {
	  	renew = true;
	  	doOperation('/',display.value);	  	
	});
	
	buttonEqual.addEventListener('click', function(e) {
	  	renew = true;
	  	doOperation('=',display.value);
	});
	
	
	buttonOk.addEventListener('click', function () {
		
		txtObj.value = toDecimalFormatWithoutCurrency(parseFloat(display.value));
	    wrapperView.hide();
	    
	    display.value = '0'; // Resets the textbox to '0'
		renew = true; 		 // Indicate that a new expression should be made
		nextOperator = '';   // Resets so that there was no previous operation to do
		decimalPointConcatenated = false; // Indicate that a decimal point can now be added
	});
	
	buttonCancel.addEventListener('click', function () {
	    wrapperView.hide();
	    display.value = '0'; // Resets the textbox to '0'
		renew = true; 		 // Indicate that a new expression should be made
		nextOperator = '';   // Resets so that there was no previous operation to do
		decimalPointConcatenated = false; // Indicate that a decimal point can now be added
	});
	
	backgroundView.addEventListener('click', function () {
	    wrapperView.hide();
	    display.value = '0'; // Resets the textbox to '0'
		renew = true; 		 // Indicate that a new expression should be made
		nextOperator = '';   // Resets so that there was no previous operation to do
		decimalPointConcatenated = false; // Indicate that a decimal point can now be added
	    
	});
	
	calValue.addEventListener('change', function(){
		//alert('changed');
		display.value = calValue.value;
	});
	
	wrapperView.add(backgroundView);
	wrapperView.add(containerView);
	
	return wrapperView;
};

exports.setTxtObj = function(obj){
	txtObj = obj;
	if(obj.value == undefined || obj.value =='' ){
		calValue.value = 0;
	}else{
		var txtValue = obj.value;
		calValue.value = txtValue.replace(/,/g, '');
	}
// 	
};

function setDisplyZero(){
	this.display.value = '0'; // Resets the textbox to '0'
	this.renew = true; 		 // Indicate that a new expression should be made
	this.nextOperator = '';   // Resets so that there was no previous operation to do
	this.decimalPointConcatenated = false; // Indicate that a decimal point can now be added
};
