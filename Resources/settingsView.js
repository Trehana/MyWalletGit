exports.settingView = function(){
	// Function List
	var deviceHeight = Ti.Platform.displayCaps.platformHeight;
	
	function loadProjectList(){
		var sql = 'SELECT * FROM tbl_project WHERE enable=1 ORDER BY project_name COLLATE NOCASE ASC';
		var projectResultSet = db.execute(sql);
		var i = 1;
		var projectData = [];
		while(projectResultSet.isValidRow()){
			var rowpopupprojects = Ti.UI.createTableViewRow({
				className : 'forumEvent', // used to improve table performance
				backgroundSelectedColor : tablerowselectedBackgroundColor,
				rowIndex : i, // custom property, useful for determining the row during events
				height : 50,
				id: projectResultSet.fieldByName('id'),
			});
		
			var lblpopupprojectsname = Ti.UI.createLabel({
				color : '#576996',
				font : {
					fontFamily : customFont,
					fontSize : stylefontsize,
				},
				text : projectResultSet.fieldByName('project_name'),
				left : stylemargine,
				top : settingdropinnermargin,
				height : '90%',
			});
			
			var editIcon = Ti.UI.createImageView({
				image : '/images/edit.png',
				height: 25, width: 25,
				right : stylemargine,
				opacity: 0.5,
			});
			rowpopupprojects.add(lblpopupprojectsname);
			rowpopupprojects.add(editIcon);
			projectData.push(rowpopupprojects);
			projectResultSet.next();
			i++;
		}
		projectResultSet.close();
		popupprojectstableView.data = projectData;
	}
	
	function loadPayModeList(){
		var sql = 'SELECT * FROM tbl_payment_mode WHERE enable = 1 ORDER BY payment_mode ASC';
		var payModeResultSet = db.execute(sql);
		var i = 1;
		var payModeData = [];
		while(payModeResultSet.isValidRow()){
			var rowpopuppaymodes = Ti.UI.createTableViewRow({
				className : 'forumEvent', // used to improve table performance
				backgroundSelectedColor : tablerowselectedBackgroundColor,
				rowIndex : i, // custom property, useful for determining the row during events
				height : 50, id:payModeResultSet.fieldByName('id'),
			});
		
			var lblpopuppaymodesname = Ti.UI.createLabel({
				color : '#576996',
				font : {
					fontFamily : customFont,
					fontSize : stylefontsize,
				},
				text : payModeResultSet.fieldByName('payment_mode'),
				left : stylemargine,
				top : settingdropinnermargin,
				height : '90%',
			});
			var editIcon = Ti.UI.createImageView({
				image : '/images/edit.png',
				height: 25, width: 25,
				right : stylemargine,
				opacity: 0.5,
			});
			rowpopuppaymodes.add(lblpopuppaymodesname);
			rowpopuppaymodes.add(editIcon);
			payModeData.push(rowpopuppaymodes);
			payModeResultSet.next();
			i++;
		}
		payModeResultSet.close();
		popuppaymodestableView.data = payModeData;
	}
	
	function loadCustomerList(){
		var sql = 'SELECT * FROM tbl_customer WHERE enable = 1 ORDER BY full_name COLLATE NOCASE ASC';
		var customerResultSet = db.execute(sql);
		var customerData = [];
		var i = 1;
		while(customerResultSet.isValidRow()){
			var rowpopupcustomers = Ti.UI.createTableViewRow({
				className : 'forumEvent', // used to improve table performance
				backgroundSelectedColor : tablerowselectedBackgroundColor,
				rowIndex : i, // custom property, useful for determining the row during events
				height : 50,
				id:customerResultSet.fieldByName('id'),
			});
		
			var lblpopupcustomersname = Ti.UI.createLabel({
				color : '#576996',
				font : {
					fontFamily : customFont,
					fontSize : stylefontsize,
				},
				text : customerResultSet.fieldByName('full_name'),
				left : stylemargine,
				//right : '2%',
				top : settingdropinnermargin,
				//width : '77%',
				height : '90%',
			});
			var editIcon = Ti.UI.createImageView({
				image : '/images/edit.png',
				height: 25, width: 25,
				right : stylemargine,
				opacity: 0.5,
			});
			rowpopupcustomers.add(lblpopupcustomersname);
			rowpopupcustomers.add(editIcon);
			customerData.push(rowpopupcustomers);
			i++;
			customerResultSet.next();
		}
		customerResultSet.close();
		popupcustomerstableView.data = customerData;
	}
	
	function loadIncomeCategoryList(){
		var sql = 'SELECT * FROM tbl_income_category WHERE enable = 1 ORDER BY income_category COLLATE NOCASE ASC';
		var incomeCatRecordSet = db.execute(sql);
		var i = 1;
		var incomeCatData = [];
		while(incomeCatRecordSet.isValidRow()){
			var rowpopupincomecat = Ti.UI.createTableViewRow({
				className : 'forumEvent', // used to improve table performance
				backgroundSelectedColor : tablerowselectedBackgroundColor,
				rowIndex : i, // custom property, useful for determining the row during events
				height : 50, id:incomeCatRecordSet.fieldByName('id'),
			});
		
			var lblpopupincomecatname = Ti.UI.createLabel({
				color : '#576996',
				font : {
					fontFamily : customFont,
					fontSize : stylefontsize,
				},
				text : incomeCatRecordSet.fieldByName('income_category'),
				left : stylemargine,
				top : settingdropinnermargin,
				height : '90%',
			});
			
			var editIcon = Ti.UI.createImageView({
				image : '/images/edit.png',
				height: 25, width: 25,
				right : stylemargine,
				opacity: 0.5,
			});
			rowpopupincomecat.add(lblpopupincomecatname);
			rowpopupincomecat.add(editIcon);
			incomeCatData.push(rowpopupincomecat);
			incomeCatRecordSet.next();
			i++;
		}
		incomeCatRecordSet.close();
		
		popupincomecattableView.data = incomeCatData;
	}
	
	function getIncomeSubCategorByParentId(ParentId){
		var sql = 'SELECT * FROM tbl_income_sub_category WHERE parent_category='+ParentId+' AND enable=1 ORDER BY income_sub_category COLLATE NOCASE ASC';
		var subCatRecordSet = db.execute(sql);
		var incomeSubCatArray = [];
		var i =1;
		while(subCatRecordSet.isValidRow()){
			var rowpopupIncomeSubcat = Ti.UI.createTableViewRow({
				className : 'forumEvent', // used to improve table performance
				backgroundSelectedColor : tablerowselectedBackgroundColor,
				rowIndex : i, // custom property, useful for determining the row during events
				height : 50,
				id:subCatRecordSet.fieldByName('id'),
			});
		
			var lblpopupIncomeSubcatname = Ti.UI.createLabel({
				color : '#576996',
				font : {
					fontFamily : customFont,
					fontSize : stylefontsize,
				},
				text : subCatRecordSet.fieldByName('income_sub_category'),
				left : stylemargine,
				//right : '2%',
				top : settingdropinnermargin,
				width : '90%',
				height : '90%',
			});
			var editIcon = Ti.UI.createImageView({
				image : '/images/edit.png',
				height: 25, width: 25,
				right : stylemargine,
				opacity: 0.5,
			});
			rowpopupIncomeSubcat.add(lblpopupIncomeSubcatname);
			rowpopupIncomeSubcat.add(editIcon);
			incomeSubCatArray.push(rowpopupIncomeSubcat);
			i++;
			subCatRecordSet.next();
		}
		subCatRecordSet.close();
		popupincomesubcattableView.data = incomeSubCatArray;
	}
	
	// make picker empty
	function emptyPicker(picker){
		if (picker.columns[0]) {
            var _col = picker.columns[0];
            var len = _col.rowCount;
            for (var x = len - 1; x >= 0; x--) {
                var _row = _col.rows[x];
                _col.removeRow(_row);
            }
    	}
	}
	
	function loadIncomeSubCatParentList(){
    	emptyPicker(incomesubcatparentpopuppicker);
    	var sql = 'SELECT * FROM tbl_income_category WHERE enable = 1 ORDER BY income_category COLLATE NOCASE ASC';
		var incomeCatResultSet = db.execute(sql);
		var i = 1;
		var incomeParentCatData = [];
		incomeParentCatData[0] = Ti.UI.createPickerRow({title:'Please Select', table_id:'0'});
		while(incomeCatResultSet.isValidRow()){
			incomeParentCatData[i] = Ti.UI.createPickerRow({title: incomeCatResultSet.fieldByName('income_category'), table_id: incomeCatResultSet.fieldByName('id')});
			i++;
			incomeCatResultSet.next();
		}
		incomeCatResultSet.close();
		incomesubcatparentpopuppicker.add(incomeParentCatData);
		incomesubcatparentpopuppicker.selectionIndicator = true;
	}
	
	function getInvoiceSubCategorByParentId(parentId){
		var sql = 'SELECT * FROM tbl_invoice_sub_category WHERE parent_category='+parentId+' AND enable=1 ORDER BY invoice_sub_category COLLATE NOCASE ASC';
		var subCatRecordSet = db.execute(sql);
		var invoiceSubCatArray = [];
		var i =1;
		while(subCatRecordSet.isValidRow()){
			var rowpopupInvoiceSubCat = Ti.UI.createTableViewRow({
				className : 'forumEvent', // used to improve table performance
				backgroundSelectedColor : tablerowselectedBackgroundColor,
				rowIndex : i, // custom property, useful for determining the row during events
				height : 50,
				id:subCatRecordSet.fieldByName('id'),
			});
		
			var lblpopupInvoiceSubCatName = Ti.UI.createLabel({
				color : '#576996',
				font : {
					fontFamily : customFont,
					fontSize : stylefontsize,
				},
				text : subCatRecordSet.fieldByName('invoice_sub_category'),
				left : stylemargine,
				//right : '2%',
				top : settingdropinnermargin,
				width : '90%',
				height : '90%',
			});
			var editIcon = Ti.UI.createImageView({
				image : '/images/edit.png',
				height: 25, width: 25,
				right : stylemargine,
				opacity: 0.5,
			});
			rowpopupInvoiceSubCat.add(lblpopupInvoiceSubCatName);
			rowpopupInvoiceSubCat.add(editIcon);
			invoiceSubCatArray.push(rowpopupInvoiceSubCat);
			i++;
			subCatRecordSet.next();
		}
		subCatRecordSet.close();
		popupinvoicesubcattableView.data = invoiceSubCatArray;
	}

	function getVatValue(){
		var sql = "SELECT * FROM tbl_option WHERE id = 2";
		var resultSet = db.execute(sql);
		return resultSet.fieldByName('option_value');
	}
	// EOF function list
	
var settingsView = Ti.UI.createView({
	height: '100%', width: '100%',
	visible: false,
});

var view_title = Ti.UI.createView({
	height : deviceHeight * 0.075,
	top : '0%',
	backgroundColor : '#2980B9',
});

var lblback = Ti.UI.createImageView({
	image : '/images/backbtn.png',
	backgroundSelectedColor : '#999999',
	width : '13%',
	left : '0%',
});

lblback.addEventListener('click',function(){
	settingsView.hide();
});

var lbltitle = Ti.UI.createLabel({
	text : 'Wallet Settings',
	color : '#FFFFFF',
	font : {
		fontSize : stylefontsize + 4,
		fontFamily : customFont2,
	},
	width : '70%',
	right : stylemargine,
	left : '27.5%',
});

view_title.add(lblback);
view_title.add(lbltitle);
settingsView.add(view_title);

var settingsListView = Ti.UI.createScrollView({
  	top : deviceHeight * 0.075,
  	contentWidth: 'auto',
  	contentHeight: 'auto',
  	backgroundColor: '#EEEEEE',
  	showVerticalScrollIndicator: true,
  	//showHorizontalScrollIndicator: true,
  	height: deviceHeight * 0.925,
  	width: '100%',
  	layout : 'vertical',
	font : {
		fontFamily : customFont
	},
});

// --- Currency section ---
var btn_currency = Ti.UI.createView({
	backgroundColor : settingsbtncol,
	backgroundSelectedColor : settingsbtnselectedcol,
	left : '1%',
	right : '1%',
	// top : '1%',
	top : '0.5%',
	//height : deviceHeight * 0.11,
	height : settingOptionHeight,
});

var imgcurrency = Ti.UI.createImageView({
	image : '/images/currency.png',
	left : styleSettingsmargine,
	width : settingImageWidth+'%',
});

var lblcurrency = Ti.UI.createLabel({
	text : 'Currency',
	//width : '70%',
	color : settingsbtnfontcolor,
	left : settinglabelmargin,
	font : {
		fontFamily : customFont1,
		fontSize : stylefontsize + 2,
	},	
});

btn_currency.add(imgcurrency);
btn_currency.add(lblcurrency);

//currecy pop up view
var currencypopupcontainerView = Ti.UI.createView({// Set height appropriately
	layout : 'vertical',
	width : '100%',
	visible : false,
	height : '100%',
	backgroundColor : '#FFF'
});

var view_currencypopuptitle = Ti.UI.createView({
	height : deviceHeight * 0.075,
	backgroundColor : '#2980B9',
});

var lblcurrencypopuptitle = Ti.UI.createLabel({
	text : 'Currency',
	color : '#FFFFFF',
	font : {
		fontSize : stylefontsize + 2,
		fontFamily : customFont2,
	},
});

var imgcurrencypopupclose = Ti.UI.createImageView({
	image : '/images/backbtn.png',
	backgroundSelectedColor : '#999999',
	width : '13%',
	left : '0%',
});
view_currencypopuptitle.add(lblcurrencypopuptitle);
view_currencypopuptitle.add(imgcurrencypopupclose);
currencypopupcontainerView.add(view_currencypopuptitle);

var currencypopupinputview = Titanium.UI.createScrollView({
	layout : 'vertical',
	//backgroundColor : 'red',
	height : deviceHeight * 0.850,
});

var currencyTypeView = Ti.UI.createView({
	height: deviceHeight * 0.08,
	backgroundColor : settingsInputBackgroundColor,
});
var currencyTypeInputView = Ti.UI.createView({
	height: deviceHeight * 0.08,
	//backgroundColor: settingsbtnfontcolor,
});

var lblcurrencypopuptype = Ti.UI.createLabel({
	text : 'Select Currency',
	font : {
		fontFamily : customFont1,
		fontSize : stylefontsize,
	},
	color : settingsbtnfontcolor,
	top : '25%',
	left : stylemargine,
});

var currencypopuppicker = Ti.UI.createPicker({
	font : {
		fontFamily : customFont1,
		fontSize : stylefontsize - 2,
	},
	backgroundColor : settingsbtnfontcolor,
	color : '#111111', width: '75%',
	left : '2%',
	right : '2%',
	height: '100%',
});

var data = [];
data[0] = Ti.UI.createPickerRow({ title : 'EUR', currency_code: '€'});
data[1] = Ti.UI.createPickerRow({ title : 'USD', currency_code: '$'});
data[2] = Ti.UI.createPickerRow({ title : 'GBP', currency_code: '£'});
data[3] = Ti.UI.createPickerRow({ title : 'AUD', currency_code: '$' });
currencypopuppicker.add(data);
currencypopuppicker.selectionIndicator = true;

var currSelectionIndex = '';
switch(currencyType){
	case '€' :
		currSelectionIndex = 0;
		break;
	case '$' :
		currSelectionIndex = 1;
		break;
	case '£' :
		currSelectionIndex = 2;
		break;
	case 'Rs':
		currSelectionIndex = 3;
		break;
	case 'Rs':
		currSelectionIndex = 4;
		break;
	case '$':
		currSelectionIndex = 5;
		break;
}
currencypopuppicker.setSelectedRow(0, currSelectionIndex, false);


var editIconCurrency = Ti.UI.createImageView({
			image : '/images/edit.png',
			height: 25, width: 25,
			right : stylemargine,
			opacity: 0.5,
		});

var currencypopupbtnview = Titanium.UI.createView({
	layout : 'vertical',
	height : deviceHeight * 0.075,
});

var btnpopupcurrencysave = Ti.UI.createButton({
	title : 'Save',
	textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	backgroundColor:'#054e62',
	backgroundSelectedColor:'#0a7390',
	left : '0%',
	height : '100%',
	width: '100%',
	font : {
		fontSize : stylefontsize - 5,
		fontFamily : customFont1
	},
});

currencyTypeView.add(lblcurrencypopuptype);
currencyTypeInputView.add(currencypopuppicker);
currencyTypeInputView.add(editIconCurrency);
currencypopupinputview.add(currencyTypeView);
currencypopupinputview.add(currencyTypeInputView);

currencypopupbtnview.add(btnpopupcurrencysave);

currencypopupcontainerView.add(currencypopupinputview);
currencypopupcontainerView.add(currencypopupbtnview);


// EOF currency pop up view
btn_currency.addEventListener('click', function() {
	currencypopupcontainerView.show();
});
imgcurrencypopupclose.addEventListener('click', function() {
	currencypopupcontainerView.hide();
});
btnpopupcurrencysave.addEventListener('click', function(){
	var currSign = currencypopuppicker.getSelectedRow(0).currency_code;
	db.execute('UPDATE tbl_option SET option_value = "'+currSign+'" WHERE id = 1');
	currencyType = currSign;
	var toast = Ti.UI.createNotification({
		message:"Save Successful",
		duration: Ti.UI.NOTIFICATION_DURATION_SHORT
	});
	toast.show();
	currencyType = currSign;
	//Ti.App._restart();
});
// --- EOF Currency section ---

// --- Expence Categories section
var btn_expence = Ti.UI.createView({
	backgroundColor : settingsbtncol,
	backgroundSelectedColor : settingsbtnselectedcol,
	left : '1%',
	right : '1%',
	top : '0.5%',
	// height : deviceHeight * 0.11,
	height : settingOptionHeight,
});

////////////////////////////////////////
var expencepopupview    = Ti.UI.createView({
	visible : false,
}); // Full screen
var expencepopupbackgroundView = Ti.UI.createView({  // Also full screen
    backgroundColor : '#000',
    opacity         : 0.7
});
var expencepopupcontainerView  = Ti.UI.createView({  // Set height appropriately
    layout : 'vertical',
    width : '90%',
    height          : deviceHeight * 0.265,
    backgroundColor : '#FFF'
});

var view_expencetitle = Ti.UI.createView({
	height : deviceHeight * 0.075,
	backgroundColor : '#2980B9',
});

var lblexpencetitle = Ti.UI.createLabel({
	text : 'Expence',
	color : '#FFFFFF',
	font : {
		fontSize : stylefontsize + 2,
		fontFamily : customFont2,
	},
});

var imgexpencepopupclose = Ti.UI.createImageView({
	image : '/images/closebtn.png',
	backgroundSelectedColor : '#999999',
	width : '9%',
	right : '3%',
});

view_expencetitle.add(lblexpencetitle);
view_expencetitle.add(imgexpencepopupclose);
expencepopupcontainerView.add(view_expencetitle);

var btn_expencecat = Ti.UI.createView({
	backgroundColor : settingsbtncol,
	backgroundSelectedColor : settingsbtnselectedcol,
	left : '1%',
	right : '1%',
	top : '2%',
	bottom : '0.5%',
	height : settingOptionHeight,
	//height : settingOptionHeight,
});

var imgcurrency = Ti.UI.createImageView({
	image : '/images/expense.png',
	left : '5%',
	width : '15%',
});

var lblcurrency = Ti.UI.createLabel({
	text : 'Expence Category',
	//width : '70%',
	color : settingsbtnfontcolor,
	left : '25%',
	font : {
		fontFamily : customFont1,
		fontSize : stylefontsize,
	},	
});

btn_expencecat.add(imgcurrency);
btn_expencecat.add(lblcurrency);
expencepopupcontainerView.add(btn_expencecat);

var btn_expencesubcat = Ti.UI.createView({
	backgroundColor : settingsbtncol,
	backgroundSelectedColor : settingsbtnselectedcol,
	left : '1%',
	right : '1%',
	top : '1%',
	bottom : '0.5%',
	height : settingOptionHeight,
});

var imgcurrency = Ti.UI.createImageView({
	image : '/images/expense.png',
	left : '5%',
	width : '15%',
});

var lblcurrency = Ti.UI.createLabel({
	text : 'Expence Sub Category',
	//width : '70%',
	color : settingsbtnfontcolor,
	left : '25%',
	font : {
		fontFamily : customFont1,
		fontSize : stylefontsize,
	},	
});

btn_expencesubcat.add(imgcurrency);
btn_expencesubcat.add(lblcurrency);
expencepopupcontainerView.add(btn_expencesubcat);

// -- Expence Category add/edit view
var expencecatpopupcontainerView = Ti.UI.createView({// Set height appropriately
	layout : 'vertical', visible : false,
	width : '100%', height : '100%',
	backgroundColor : '#FFF',
});

var view_expencecatpopuptitle = Ti.UI.createView({
	height : deviceHeight * 0.075,
	backgroundColor : '#2980B9',
});

var lblexpencecatpopuptitle = Ti.UI.createLabel({
	text : 'Expence Category',
	color : '#FFFFFF',
	font : {
		fontSize : stylefontsize + 2,
		fontFamily : customFont2,
	},
});
var imgexpencecatpopupclose = Ti.UI.createImageView({
	image : '/images/backbtn.png',
	backgroundSelectedColor : '#999999',
	width : '13%',
	left : '0%',
});

view_expencecatpopuptitle.add(lblexpencecatpopuptitle);
view_expencecatpopuptitle.add(imgexpencecatpopupclose);
expencecatpopupcontainerView.add(view_expencecatpopuptitle);

function getExpenceCategoryDataSet(){
	var expenceCategories = [];
	var sql = 'SELECT * FROM tbl_expence_category WHERE enable=1 ORDER BY expence_category COLLATE NOCASE ASC';
	var resultSet = db.execute(sql);
	var i = 1;
	while(resultSet.isValidRow()){
		console.log('expence_category id >> '+resultSet.fieldByName('id'));
		console.log('expence_category name >> '+resultSet.fieldByName('expence_category'));
		var rowpopupexpencecat = Ti.UI.createTableViewRow({
			className : 'forumEvent', // used to improve table performance
			//backgroundSelectedColor : tablerowselectedBackgroundColor,
			//backgroundSelectedColor: '#f00',
			rowIndex : i, // custom property, useful for determining the row during events
			height : 50,
			id:resultSet.fieldByName('id'),
		});
	
		var lblpopupexpencecatname = Ti.UI.createLabel({
			color : '#576996',
			font : {
				fontFamily : customFont,
				fontSize : stylefontsize,
				//fontWeight : 'bold'
			},
			text : resultSet.fieldByName('expence_category'),
			left : stylemargine,
			//right : '2%',
			top : settingdropinnermargin,
			//width : '77%',
			height : '90%',
		});
		
		var editIcon = Ti.UI.createImageView({
			image : '/images/edit.png',
			height: 25, width: 25,
			right : stylemargine,
			opacity: 0.5,
		});
		
		rowpopupexpencecat.add(lblpopupexpencecatname);
		rowpopupexpencecat.add(editIcon);
		resultSet.next();
		expenceCategories.push(rowpopupexpencecat);
		i++;
	}
	resultSet.close();
	return expenceCategories;
}

var popupexpencecattableView = Ti.UI.createTableView({
	height : deviceHeight * 0.745,
	separatorColor : settingstableseparatorcolor,
	data : getExpenceCategoryDataSet(),
});
 
var expenceCategoryInputView = Titanium.UI.createView({
	// layout : 'vertical',
	// backgroundColor : settingsInputBackgroundColor,
	backgroundColor : settingsInputBackgroundColor,
	height : deviceHeight * 0.105,
});

var expenceCategoryBtn = Ti.UI.createView({
		height : deviceHeight * 0.075,  // **************
		backgroundColor : '#054e62',
	});

var inptpopupexpencecat = Ti.UI.createTextField({
	//width : '64%',
	bottom : '20%',
	font : {
		fontFamily : customFont,
		fontSize : stylefontsize ,
	},
	color : settingsbtnfontcolor,
	left : settingdropinnermargin,
	right : settingdropinnermargin,
	hintText : 'Add New',
	autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_WORDS,
	borderColor : "#489CE0",
	color : settingsbtnfontcolor, backgroundColor: settingsinputFeildBackgoundcolor,
	//right : settingdropinnermargin,
});

var btnSaveExpenceCategory = Titanium.UI.createButton({
	    title:'Save',
	    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	    backgroundColor:btnBackgroundColor,
	    backgroundSelectedColor:btnBackgroundSelectColor,
	    right : '0%',
	    height : '100%',
	    width: '50%',
	    	font : {
			fontSize : stylefontsize - 5,
			fontFamily : customFont1
		},
		enabled : false,
		backgroundDisabledColor: btnBackgroundDisabledColor,
	});
var btnDeleteExpenceCategory = Titanium.UI.createButton({
	    title:'Delete',
	    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	    backgroundColor:btnDeleteBackgroundColor,
	    backgroundSelectedColor:btnDeleteBackgroundSelectedColor,
	    height : '100%',
	    width:'34%',
	    	font : {
			fontSize : stylefontsize - 5,
			fontFamily : customFont1
		},
		enabled : false,
		backgroundDisabledColor: btnDeleteBackgroundDisableColor,
		color: btnTextColor,
	});
	
	var btnCancelExpenceCategory = Titanium.UI.createButton({
	    title:'Cancel',
	    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	    backgroundColor:btnBackgroundColor,
	    backgroundSelectedColor:btnBackgroundSelectColor,
	    left : '0%',
	    height : '100%',
	    width:'50%',
	    font : {
			fontSize : stylefontsize - 5,
			fontFamily : customFont1
		}, 
		enabled: false,
		backgroundDisabledColor: btnBackgroundDisabledColor,
	});
	
	var temp_cat_id_holder = Ti.UI.createLabel({
		visible: false,
		text:'',
	});

expencecatpopupcontainerView.add(popupexpencecattableView);

expenceCategoryInputView.add(inptpopupexpencecat);
expenceCategoryBtn.add(btnSaveExpenceCategory);
//expenceCategoryBtn.add(btnDeleteExpenceCategory);
expenceCategoryBtn.add(btnCancelExpenceCategory);
expencecatpopupcontainerView.add(expenceCategoryInputView);
expencecatpopupcontainerView.add(expenceCategoryBtn);
expencecatpopupcontainerView.add(temp_cat_id_holder);

popupexpencecattableView.addEventListener('click', function(e){
	var categoryResult = db.execute('SELECT expence_category FROM tbl_expence_category WHERE enable=1 AND id = '+e.rowData.id);
	temp_cat_id_holder.text = e.rowData.id;
	var Category = categoryResult.fieldByName('expence_category');
	inptpopupexpencecat.value = Category;
	btnSaveExpenceCategory.enabled = true;
	btnDeleteExpenceCategory.enabled = true;
	btnCancelExpenceCategory.enabled = true;
	btnSaveExpenceCategory.title = 'Update';
	inptpopupexpencecat.focus();
	//expenceCategoryInputView.backgroundColor = '#E3E3E3';
	
	expenceCategoryBtn.add(btnDeleteExpenceCategory);
	btnSaveExpenceCategory.width = '33%';
	btnCancelExpenceCategory.width = '33%';
	
	
	for(var i = 0; i <= popupexpencecattableView.data[0].rows.length-1; i++){
		popupexpencecattableView.data[0].rows[i].backgroundColor = '#fff';
	}
	
	this.sections[0].rows[e.rowData.rowIndex-1].backgroundColor = '#cdd6ff';
	
});



btnCancelExpenceCategory.addEventListener('click', function(){
	
	expenceCategoryBtn.remove(btnDeleteExpenceCategory);
	btnSaveExpenceCategory.width = '50%';
	btnCancelExpenceCategory.width = '50%';
	
	temp_cat_id_holder.text = '';
	inptpopupexpencecat.value = '';
	btnSaveExpenceCategory.enabled = false;
	btnDeleteExpenceCategory.enabled = false;
	btnCancelExpenceCategory.enabled = false;
	btnSaveExpenceCategory.title = 'Save';
	//expenceCategoryInputView.backgroundColor = '#E9E9E9';
	
	for(var i = 0; i <= popupexpencecattableView.data[0].rows.length-1; i++){
		popupexpencecattableView.data[0].rows[i].backgroundColor = '#fff';
	}
});

btnSaveExpenceCategory.addEventListener('click', function(){
	
	var newField = inptpopupexpencecat.value;
	// New Insert
	if(temp_cat_id_holder.text == ''){
		db.execute('INSERT INTO tbl_expence_category (expence_category,enable) VALUES ("'+newField+'",1)');
		
		var lastIDData = db.execute('SELECT MAX(id) as rowid FROM tbl_expence_category WHERE enable=1 ORDER BY expence_category COLLATE NOCASE ASC');
		var lastID = lastIDData.fieldByName('rowid');
		console.log('lastID >> ' +lastID);
		var insData = 'General';
		db.execute('INSERT INTO tbl_expence_sub_category (expence_sub_category,parent_category,enable) VALUES ("'+insData+'","'+lastID+'",1)');
		
		var toast = Ti.UI.createNotification({
			message:"Save Successful",
			duration: Ti.UI.NOTIFICATION_DURATION_SHORT
		});
		toast.show();
	} else {
		// update	
		db.execute('UPDATE tbl_expence_category SET expence_category = "'+newField+'" WHERE id='+temp_cat_id_holder.text);
		var toast = Ti.UI.createNotification({
			message:"Update Successful",
			duration: Ti.UI.NOTIFICATION_DURATION_SHORT
		});
		toast.show();
	}
	
	expenceCategoryBtn.remove(btnDeleteExpenceCategory);
	btnSaveExpenceCategory.width = '50%';
	btnCancelExpenceCategory.width = '50%';
	
	popupexpencecattableView.data = getExpenceCategoryDataSet();
	btnSaveExpenceCategory.enabled = false;
	btnDeleteExpenceCategory.enabled = false;
	btnCancelExpenceCategory.enabled = false;
	temp_cat_id_holder.text = '';
	inptpopupexpencecat.value = '';
	btnSaveExpenceCategory.title = 'Save';
	//expenceCategoryInputView.backgroundColor = '#E9E9E9';
});

btnDeleteExpenceCategory.addEventListener('click', function(){
	var sql = 'SELECT COUNT(*) AS rowcount FROM tbl_expence WHERE category_id = '+temp_cat_id_holder.text;
	var resultSet = db.execute(sql);
	if (resultSet.fieldByName('rowcount')!=0){
		var dialog1 = Ti.UI.createAlertDialog({
			title : 'Unable to Delete !',
			message : 'Category already using in expence record.',
			ok : 'Ok',
		});
		dialog1.show();
	}else{
		// delete confirmation record
		expenseCatagoryRecordDeleteConf.show();
	}
});

var expenseCatagoryRecordDeleteConf = Ti.UI.createAlertDialog({
    cancel: 1,
    buttonNames: ['Delete', 'Cancel'],
    message: 'Do you want to delete the record?',
    title: 'Delete Confirmation?'
});
expencecatpopupcontainerView.add(expenseCatagoryRecordDeleteConf);
expenseCatagoryRecordDeleteConf.addEventListener('click', function(e){
    console.log('temp_cat_id_holder.text ' +temp_cat_id_holder.text);
    if (e.index === e.source.cancel){
      	Ti.API.info('The cancel button was clicked');
    }else{
    	
    	db.execute('UPDATE tbl_expence_category SET enable = "0" WHERE id='+temp_cat_id_holder.text);
    	
    	//db.execute('DELETE FROM tbl_expence_category WHERE id='+temp_cat_id_holder.text);
    	popupexpencecattableView.data = getExpenceCategoryDataSet();
    	var toast = Ti.UI.createNotification({
			message:"Delete Successful",
			duration: Ti.UI.NOTIFICATION_DURATION_SHORT
		});
		toast.show();
		expenceCategoryBtn.remove(btnDeleteExpenceCategory);
		btnSaveExpenceCategory.width = '50%';
		btnCancelExpenceCategory.width = '50%';
	
		btnSaveExpenceCategory.enabled = false;
		btnDeleteExpenceCategory.enabled = false;
		btnCancelExpenceCategory.enabled = false;
		temp_cat_id_holder.text = '';
		inptpopupexpencecat.value = '';
		btnSaveExpenceCategory.title = 'Save';
		//expenceCategoryInputView.backgroundColor = '#E9E9E9';
    }
});

inptpopupexpencecat.addEventListener('change', function(e){
	
	if(inptpopupexpencecat.value.length == 0 && temp_cat_id_holder.text == ''){
		btnSaveExpenceCategory.enabled = false;
		btnCancelExpenceCategory.enabled = false;
		//expenceCategoryInputView.backgroundColor = '#E9E9E9';
	}else if(inptpopupexpencecat.value.length == 0){
		btnSaveExpenceCategory.enabled = false;
		//expenceCategoryInputView.backgroundColor = '#E3E3E3';
	}else{
		btnCancelExpenceCategory.enabled = true;
		btnSaveExpenceCategory.enabled = true;
		//expenceCategoryInputView.backgroundColor = '#E3E3E3';
	}
});

function resetExpenceCatListView(){
	expenceCategoryBtn.remove(btnDeleteExpenceCategory);
	btnSaveExpenceCategory.width = '50%';
	btnCancelExpenceCategory.width = '50%';
	
	expencecatpopupcontainerView.hide();
	btnSaveExpenceCategory.enabled = false;
	btnDeleteExpenceCategory.enabled = false;
	btnCancelExpenceCategory.enabled = false;
	temp_cat_id_holder.text = '';
	inptpopupexpencecat.value = '';
	btnSaveExpenceCategory.title = 'Save';
	//expenceCategoryInputView.backgroundColor = '#E9E9E9';
	for(var i = 0; i <= popupexpencecattableView.data[0].rows.length-1; i++){
		popupexpencecattableView.data[0].rows[i].backgroundColor = '#fff';
	}
}

imgexpencecatpopupclose.addEventListener('click', function(){
	resetExpenceCatListView();
});
// -- EOF Expence Category add/edit view

// --- Expence Sub Category add/edit view
var expencesubcatpopupcontainerView = Ti.UI.createView({// Set height appropriately
	layout : 'vertical', visible : false,
	width : '100%',
	height : '100%',
	backgroundColor : '#FFF',
});

var view_expencesubcatpopuptitle = Ti.UI.createView({
	height : deviceHeight * 0.075,
	backgroundColor : '#2980B9',
});

var lblexpencesubcatpopuptitle = Ti.UI.createLabel({
	text : 'Expence Sub Category',
	color : '#FFFFFF',
	font : {
		fontSize : stylefontsize + 2,
		fontFamily : customFont2,
	},
});

var imgexpencesubcatpopupclose = Ti.UI.createImageView({
	image : '/images/backbtn.png',
	backgroundSelectedColor : '#999999',
	width : '13%',
	left : '0%',
});

var popupexpencesubcatparentView = Ti.UI.createView({
	height : deviceHeight * 0.075,
	width : '100%',
	backgroundColor : '#E3E3E3',
});



var lblpopupexpencesubcatparent = Ti.UI.createLabel({
	text : 'Parent Category :',
	font : {
		fontFamily : customFont1,
		fontSize : stylefontsize,
	},
	color : settingsbtnfontcolor,
	width : '50%',
	left : settingdropinnermargin,
});


var expencesubcatparentpopuppicker = Ti.UI.createPicker({
	font : {
		fontFamily : customFont1,
		fontSize : stylefontsize - 2,
	},
	backgroundColor : settingsbtnfontcolor,
	color : '#111111',
	width : '50%',
	right : 0,//settingdropinnermargin,
	height : Ti.UI.FILL
});

loadExpenceSubCatParentList();

function loadExpenceSubCatParentList(){
	emptyPicker(expencesubcatparentpopuppicker);
	sql = 'SELECT * FROM tbl_expence_category WHERE enable=1 ORDER BY expence_category COLLATE NOCASE ASC';
	var expenceParentResultSet = db.execute(sql);
	var i = 1;
	var parentExpenceData = [];
	parentExpenceData[0] = Ti.UI.createPickerRow({title:'Please Select', table_id:'0'});
	while(expenceParentResultSet.isValidRow()){
		parentExpenceData[i] = Ti.UI.createPickerRow({title: expenceParentResultSet.fieldByName('expence_category'), table_id: expenceParentResultSet.fieldByName('id')});
		i++;
		expenceParentResultSet.next();
	}
	expenceParentResultSet.close();
	expencesubcatparentpopuppicker.add(parentExpenceData);
	expencesubcatparentpopuppicker.selectionIndicator = true;
}


var popupexpencesubcattableView = Ti.UI.createTableView({
	height : deviceHeight * 0.67,
	separatorColor : settingstableseparatorcolor,
	//data : tableData
});


var expenceSubCategoryInputView = Titanium.UI.createView({
	backgroundColor : settingsInputBackgroundColor,
	height : deviceHeight * 0.105,
});

var expenceSubCategoryBtn = Ti.UI.createView({
		height : deviceHeight * 0.075,  // **************
		backgroundColor : '#054e62',
	});

var inptpopupexpencesubcat = Ti.UI.createTextField({
	//width : '64%',
	bottom : '20%',
	font : {
		fontFamily : customFont,
		fontSize : stylefontsize,
	},
	color : settingsbtnfontcolor,
	left : settingdropinnermargin,
	right : settingdropinnermargin,
	borderColor : "#489CE0",
	hintText : 'Add New', editable: false, backgroundColor: settingsinputFeildBackgoundcolor,
	autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_WORDS,
	//right : settingdropinnermargin,
});

var btnSaveExpenceSubCategory = Titanium.UI.createButton({
	    title:'Save',
	    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	    backgroundColor:btnBackgroundColor,
	    backgroundSelectedColor:btnBackgroundSelectColor,
	    right : '0%',
	    height : '100%',
	    width: '50%',
	    	font : {
			fontSize : stylefontsize - 5,
			fontFamily : customFont1
		},
		enabled: false,
		backgroundDisabledColor: btnBackgroundDisabledColor,
	});
var btnDeleteExpenceSubCategory = Titanium.UI.createButton({
	    title:'Delete',
	    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	    backgroundColor:btnDeleteBackgroundColor,
	    backgroundSelectedColor:btnDeleteBackgroundSelectedColor,
	    height : '100%',
	    width:'34%',
	    	font : {
			fontSize : stylefontsize - 5,
			fontFamily : customFont1
		}, enabled: false,
	});
	
	var btnCancelExpenceSubCategory = Titanium.UI.createButton({
	    title:'Cancel',
	    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	    backgroundColor:btnBackgroundColor,
	    backgroundSelectedColor:btnBackgroundSelectColor,
	    left : '0%',
	    height : '100%',
	    width:'50%',
	    font : {
			fontSize : stylefontsize - 5,
			fontFamily : customFont1
		}, enabled: false,
		backgroundDisabledColor: btnBackgroundDisabledColor,
	});
	
var expenseSubCatagoryRecordDeleteConf = Ti.UI.createAlertDialog({
    cancel: 1,
    buttonNames: ['Delete', 'Cancel'],
    message: 'Do you want to delete the record?',
    title: 'Delete Confirmation?'
});

view_expencesubcatpopuptitle.add(lblexpencesubcatpopuptitle);
view_expencesubcatpopuptitle.add(imgexpencesubcatpopupclose);
expencesubcatpopupcontainerView.add(view_expencesubcatpopuptitle);
popupexpencesubcatparentView.add(expencesubcatparentpopuppicker);
popupexpencesubcatparentView.add(lblpopupexpencesubcatparent);
expencesubcatpopupcontainerView.add(popupexpencesubcatparentView);
expenceSubCategoryInputView.add(inptpopupexpencesubcat); // adding textfeild to the view
expenceSubCategoryBtn.add(btnSaveExpenceSubCategory); // add save buttong
// expenceSubCategoryBtn.add(btnDeleteExpenceSubCategory); // add delete buton
expenceSubCategoryBtn.add(btnCancelExpenceSubCategory); // add cancle button
expencesubcatpopupcontainerView.add(popupexpencesubcattableView); // adding table view
expencesubcatpopupcontainerView.add(expenceSubCategoryInputView); // adding text feild view to the main view
expencesubcatpopupcontainerView.add(expenceSubCategoryBtn); // adding button view to the main view
expencesubcatpopupcontainerView.add(expenseSubCatagoryRecordDeleteConf);

// Onclick Expence sub category table row 
popupexpencesubcattableView.addEventListener('click', function(e){
	var subCategoryResult = db.execute('SELECT expence_sub_category FROM tbl_expence_sub_category WHERE id = '+e.rowData.id);
	var Category = subCategoryResult.fieldByName('expence_sub_category');
	temp_cat_id_holder.text = e.rowData.id;
	inptpopupexpencesubcat.value = Category;
	btnSaveExpenceSubCategory.enabled = true;
	btnDeleteExpenceSubCategory.enabled = true;
	btnCancelExpenceSubCategory.enabled = true;
	btnSaveExpenceSubCategory.title = 'Update';
	
	expenceSubCategoryBtn.add(btnDeleteExpenceSubCategory);
	btnSaveExpenceSubCategory.width = '33%';
	btnCancelExpenceSubCategory.width = '33%';
	
	for(var i = 0; i <= popupexpencesubcattableView.data[0].rows.length-1; i++){
		popupexpencesubcattableView.data[0].rows[i].backgroundColor = '#fff';
	}
	this.sections[0].rows[e.rowData.rowIndex-1].backgroundColor = '#cdd6ff'; 
});
// EOF Onclick Expence sub category table row

// Click event on Expence Sub Category Cancel button 
btnCancelExpenceSubCategory.addEventListener('click', function(){
	
	expenceSubCategoryBtn.remove(btnDeleteExpenceSubCategory);
	btnSaveExpenceSubCategory.width = '50%';
	btnCancelExpenceSubCategory.width = '50%';
	
	temp_cat_id_holder.text = '';
	inptpopupexpencesubcat.value = '';
	btnSaveExpenceSubCategory.enabled = false;
	btnDeleteExpenceSubCategory.enabled = false;
	btnCancelExpenceSubCategory.enabled = false;
	btnSaveExpenceSubCategory.title = 'Save';
	
	for(var i = 0; i <= popupexpencesubcattableView.data[0].rows.length-1; i++){
		popupexpencesubcattableView.data[0].rows[i].backgroundColor = '#fff';
	}
});
// EOF Click event on Expence Sub Category Cancel button

// Click event on Expence Sub Category Save button
btnSaveExpenceSubCategory.addEventListener('click', function(){
	
	var newField = inptpopupexpencesubcat.value;
	var parentCat = expencesubcatparentpopuppicker.getSelectedRow(0).table_id;
	// New Insert
	if(temp_cat_id_holder.text == ''){
		db.execute('INSERT INTO tbl_expence_sub_category (expence_sub_category, parent_category, enable) VALUES ("'+newField+'","'+parentCat+'",1)');
		var toast = Ti.UI.createNotification({
			message:"Save Successful",
			duration: Ti.UI.NOTIFICATION_DURATION_SHORT
		});
		toast.show();
	} else {
		// update	
		db.execute('UPDATE tbl_expence_sub_category SET expence_sub_category = "'+newField+'" WHERE id='+temp_cat_id_holder.text);
		var toast = Ti.UI.createNotification({
			message:"Update Successful",
			duration: Ti.UI.NOTIFICATION_DURATION_SHORT
		});
		toast.show();
	}
	
	expenceSubCategoryBtn.remove(btnDeleteExpenceSubCategory);
	btnSaveExpenceSubCategory.width = '50%';
	btnCancelExpenceSubCategory.width = '50%';
	
	getExpenceSubCategorByParentId(parentCat);
	temp_cat_id_holder.text = '';
	inptpopupexpencesubcat.value = '';
	btnSaveExpenceSubCategory.enabled = false;
	btnDeleteExpenceSubCategory.enabled = false;
	btnCancelExpenceSubCategory.enabled = false;
	btnSaveExpenceSubCategory.title = 'Save';
});
// EOF Click event on Expence Sub Category SAVE button

// Click event on Expence Sub Category DELETE button
btnDeleteExpenceSubCategory.addEventListener('click', function(){
	var sql = 'SELECT COUNT(*) AS rowcount FROM tbl_expence WHERE sub_category_id = '+temp_cat_id_holder.text;
	var resultSet = db.execute(sql);
	//var resultSetGeneral = db.execute('SELECT count(id) as countid FROM tbl_expence_sub_category WHERE  expence_sub_category ="General Expense" AND id=' +temp_cat_id_holder.text);
	if (resultSet.fieldByName('rowcount')!=0){
		var dialog1 = Ti.UI.createAlertDialog({
			title : 'Unable to Delete !',
			message : 'Category already using in expence record.',
			ok : 'Ok',
		});
		dialog1.show();
	}	
	else{
		// delete confirmation record
		expenseSubCatagoryRecordDeleteConf.show();
	}
});
// EOF Click event on Expence Sub Category DELETE button

// Delete Confirmation
expenseSubCatagoryRecordDeleteConf.addEventListener('click', function(e) {
	var rowID = temp_cat_id_holder.text;
	if (e.index === e.source.cancel) {
		Ti.API.info('The cancel button was clicked');
	} else {

		db.execute('DELETE FROM tbl_expence_sub_category WHERE id=' + rowID);
		var parentCat = expencesubcatparentpopuppicker.getSelectedRow(0).table_id;
		getExpenceSubCategorByParentId(parentCat);
		var toast = Ti.UI.createNotification({
			message : "Delete Successful",
			duration : Ti.UI.NOTIFICATION_DURATION_SHORT
		});
		toast.show();

		expenceSubCategoryBtn.remove(btnDeleteExpenceSubCategory);
		btnSaveExpenceSubCategory.width = '50%';
		btnCancelExpenceSubCategory.width = '50%';

		temp_cat_id_holder.text = '';
		inptpopupexpencesubcat.value = '';
		btnSaveExpenceSubCategory.enabled = false;
		btnDeleteExpenceSubCategory.enabled = false;
		btnCancelExpenceSubCategory.enabled = false;
		btnSaveExpenceSubCategory.title = 'Save';
	}

}); 



// EOF Delete Confirmation

// enable buttons On change in Expence sub category Text; 
inptpopupexpencesubcat.addEventListener('change', function(e){
	
	if(inptpopupexpencesubcat.value.length == 0 && temp_cat_id_holder.text == ''){
		btnSaveExpenceSubCategory.enabled = false;
		btnCancelExpenceSubCategory.enabled = false;
	}else if(inptpopupexpencesubcat.value.length == 0){
		btnSaveExpenceSubCategory.enabled = false;
	}else{
		btnCancelExpenceSubCategory.enabled = true;
		btnSaveExpenceSubCategory.enabled = true;
	}
});
// enable buttons On change in Expence sub category Text;

// Get Expence Sub Category by Parent ID
function getExpenceSubCategorByParentId(parentID){
	// var parentID = expencesubcatparentpopuppicker.getSelectedRow(0).table_id;
	var sql = 'SELECT * FROM tbl_expence_sub_category WHERE parent_category='+parentID+' AND enable=1 AND expence_sub_category !="General" ORDER BY expence_sub_category COLLATE NOCASE ASC';
		var subCatRecordSet = db.execute(sql);
		var expenceSubCatArray = [];
		var i =1;
		while(subCatRecordSet.isValidRow()){
			//console.log('sub_category>> ' +subCatRecordSet.fieldByName('expence_sub_category'));
			var rowpopupexpencesubcat = Ti.UI.createTableViewRow({
				className : 'forumEvent', // used to improve table performance
				backgroundSelectedColor : tablerowselectedBackgroundColor,
				rowIndex : i, // custom property, useful for determining the row during events
				height : 50,
				id:subCatRecordSet.fieldByName('id'),
			});
		
			var lblpopupexpencesubcatname = Ti.UI.createLabel({
				color : '#576996',
				font : {
					fontFamily : customFont,
					fontSize : stylefontsize,
				},
				text : subCatRecordSet.fieldByName('expence_sub_category'),
				left : stylemargine,
				//right : '2%',
				top : settingdropinnermargin,
				//width : '90%',
				height : '90%',
			});
			var editIcon = Ti.UI.createImageView({
				image : '/images/edit.png',
				height: 25, width: 25,
				right : stylemargine,
				opacity: 0.5,
				//visible:true,
			});
			rowpopupexpencesubcat.add(lblpopupexpencesubcatname);
			rowpopupexpencesubcat.add(editIcon);
			expenceSubCatArray.push(rowpopupexpencesubcat);			
			i++;
			subCatRecordSet.next();
		}
		subCatRecordSet.close();
		popupexpencesubcattableView.data = expenceSubCatArray;
}
// EOF Get Expence Sub Category by Parent ID

function resetExpenceSubCatListView(){
	expencesubcatpopupcontainerView.hide();
	
	// remove highlited rows from sub category table rows
	var parentSelect = expencesubcatparentpopuppicker.getSelectedRow(0).table_id;
	if(parentSelect != '0'){
		for(var i = 0; i <= popupexpencesubcattableView.data[0].rows.length-1; i++){
			popupexpencesubcattableView.data[0].rows[i].backgroundColor = '#fff';
		}
	}
	
	expenceSubCategoryBtn.remove(btnDeleteExpenceSubCategory);
	btnSaveExpenceSubCategory.width = '50%';
	btnCancelExpenceSubCategory.width = '50%';
	
	temp_cat_id_holder.text = '';
	inptpopupexpencesubcat.value = '';
	btnSaveExpenceSubCategory.enabled = false;
	btnDeleteExpenceSubCategory.enabled = false;
	btnCancelExpenceSubCategory.enabled = false;
	btnSaveExpenceSubCategory.title = 'Save';
	expencesubcatparentpopuppicker.setSelectedRow(0, 0, false); // set default on Expence Parent Category list
}

// Close Event for Expence Sub Category list view
imgexpencesubcatpopupclose.addEventListener('click', function(){
	resetExpenceSubCatListView();	
});
// EOF Close Event for Expence Sub Category list view

expencesubcatparentpopuppicker.addEventListener('change', function(e){
	temp_cat_id_holder.text = '';
	inptpopupexpencesubcat.value = '';
	btnSaveExpenceSubCategory.enabled = false;
	btnDeleteExpenceSubCategory.enabled = false;
	btnCancelExpenceSubCategory.enabled = false;
	btnSaveExpenceSubCategory.title = 'Save';
	if(e.row.table_id == '0'){
		inptpopupexpencesubcat.editable = false;
		popupexpencesubcattableView.setData([]);
	}else{
		inptpopupexpencesubcat.editable = true;
		var sql = 'SELECT * FROM tbl_expence_sub_category WHERE parent_category='+e.row.table_id+' AND enable=1 AND expence_sub_category !="General" ORDER BY expence_sub_category COLLATE NOCASE ASC';
		var subCatRecordSet = db.execute(sql);
		var expenceSubCatArray = [];
		var i =1;
		while(subCatRecordSet.isValidRow()){
			var rowpopupexpencesubcat = Ti.UI.createTableViewRow({
				className : 'forumEvent', // used to improve table performance
				backgroundSelectedColor : tablerowselectedBackgroundColor,
				rowIndex : i, // custom property, useful for determining the row during events
				height : 50,
				id:subCatRecordSet.fieldByName('id'),
			});
		
			var lblpopupexpencesubcatname = Ti.UI.createLabel({
				color : '#576996',
				font : {
					fontFamily : customFont,
					fontSize : stylefontsize,
				},
				text : subCatRecordSet.fieldByName('expence_sub_category'),
				left : stylemargine,
				//right : '2%',
				top : settingdropinnermargin,
				//width : '90%',
				height : '90%',
			});
			var editIcon = Ti.UI.createImageView({
				image : '/images/edit.png',
				height: 25, width: 25,
				right : stylemargine,
				opacity: 0.5,
			});
			rowpopupexpencesubcat.add(lblpopupexpencesubcatname);
			rowpopupexpencesubcat.add(editIcon);
			expenceSubCatArray.push(rowpopupexpencesubcat);			
			i++;
			subCatRecordSet.next();
		}
		subCatRecordSet.close();
		popupexpencesubcattableView.data = expenceSubCatArray;
		
		temp_cat_id_holder.text = '';
		inptpopupexpencesubcat.value = '';
		btnSaveExpenceSubCategory.enabled = false;
		btnDeleteExpenceSubCategory.enabled = false;
		btnCancelExpenceSubCategory.enabled = false;
		btnSaveExpenceSubCategory.title = 'Save';
	}
});
// --- EOF Expence Sub Category add/edit view

imgexpencepopupclose.addEventListener('click', function() {
	expencepopupview.hide();
});

btn_expencecat.addEventListener('click', function () {
    expencecatpopupcontainerView.show();
    expencepopupview.hide();
});

btn_expencesubcat.addEventListener('click', function () {
	//emptyPicker(expencesubcatparentpopuppicker);
	
	loadExpenceSubCatParentList();
	expencesubcatpopupcontainerView.show();
    expencepopupview.hide();
});

expencepopupbackgroundView.addEventListener('click', function () {
    expencepopupview.hide();
});

btn_expence.addEventListener('click', function () {
    expencepopupview.show();
});


expencepopupview.add(expencepopupbackgroundView);
expencepopupview.add(expencepopupcontainerView);

//////////////////////////////////////////////
var imgcurrency = Ti.UI.createImageView({
	image : '/images/expense.png',
	left : styleSettingsmargine,
	width : settingImageWidth+'%',
});

var lblcurrency = Ti.UI.createLabel({
	text : 'Expence Category',
	//width : '70%',
	color : settingsbtnfontcolor,
	left : settinglabelmargin,
	font : {
		fontFamily : customFont1,
		fontSize : stylefontsize + 2,
	},	
});

btn_expence.add(imgcurrency);
btn_expence.add(lblcurrency);
// --- EOF Expence Categories section ---

// --- Account Section ---
var btn_accounts = Ti.UI.createView({
	backgroundColor : settingsbtncol,
	backgroundSelectedColor : settingsbtnselectedcol,
	left : '1%',
	right : '1%',
	top : '0.5%',
	height : settingOptionHeight,
});

var imgcurrency = Ti.UI.createImageView({
	image : '/images/accounts.png',
	left : styleSettingsmargine,
	width : settingImageWidth+'%',
});

var lblcurrency = Ti.UI.createLabel({
	text : 'Accounts',
	color : settingsbtnfontcolor,
	left : settinglabelmargin,
	font : {
		fontFamily : customFont1,
		fontSize : stylefontsize + 2,
	},	
});

btn_accounts.add(imgcurrency);
btn_accounts.add(lblcurrency);

// Account list view
var accountspopupcontainerView = Ti.UI.createView({// Set height appropriately
	layout : 'vertical', visible : false,
	width : '100%',
	//top : deviceHeight * 0.075,
	//height : deviceHeight * 0.9,
	height : '100%',
	backgroundColor : '#FFF',
});

var view_accountspopuptitle = Ti.UI.createView({
	height : deviceHeight * 0.075,
	backgroundColor : '#2980B9',
});

var lblaccountspopuptitle = Ti.UI.createLabel({
	text : 'Accounts',
	color : '#FFFFFF',
	font : {
		fontSize : stylefontsize + 2,
		fontFamily : customFont2,
	},
});

var imgaccountspopupclose = Ti.UI.createImageView({
	image : '/images/backbtn.png',
	backgroundSelectedColor : '#999999',
	width : '13%',
	left : '0%',
});

view_accountspopuptitle.add(lblaccountspopuptitle);
view_accountspopuptitle.add(imgaccountspopupclose);
accountspopupcontainerView.add(view_accountspopuptitle);

function loadAccountList(){
	sql = 'SELECT * FROM tbl_account WHERE enable = 1 ORDER BY account_name COLLATE NOCASE ASC';
	var accResultSet = db.execute(sql);
	var i = 0;
	var accoutDataSet = [];
	while(accResultSet.isValidRow()){
		var rowpopupaccounts = Ti.UI.createTableViewRow({
			className : 'forumEvent', // used to improve table performance
			backgroundSelectedColor : tablerowselectedBackgroundColor,
			rowIndex : i, // custom property, useful for determining the row during events
			height : 50,
			id: accResultSet.fieldByName('id'),
		});
	
		var lblpopupaccountsname = Ti.UI.createLabel({
			color : '#576996',
			font :{
				fontFamily : customFont,
				fontSize : stylefontsize,
			},
			text : accResultSet.fieldByName('account_name'),
			left : stylemargine, //width: '75%',
			top : settingdropinnermargin,
			height : '90%',
		});
		
		/*
		var lblpopupaccountShortCode = Ti.UI.createLabel({
			color : '#576996', textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
			font :{
				fontFamily : customFont1,
				fontSize : stylefontsize-4,
			},
			text : accResultSet.fieldByName('short_code'),
			right : stylemargine, height : '90%', //width: '25%',
			top : settingdropinnermargin,
		});*/
		var editIcon = Ti.UI.createImageView({
				image : '/images/edit.png',
				height: 25, width: 25,
				right : stylemargine,
				opacity: 0.5,
		});
		
		rowpopupaccounts.add(lblpopupaccountsname);
		//rowpopupaccounts.add(editIcon);
		Ti.API.info('ARE YOU INBUILT : ' + accResultSet.fieldByName('inbuilt'));
		if(accResultSet.fieldByName('inbuilt') !== 0){
			rowpopupaccounts.add(editIcon);
		}
		//rowpopupaccounts.add(lblpopupaccountShortCode);
		accoutDataSet.push(rowpopupaccounts);
		accResultSet.next();
		i++;
	}
	accResultSet.close();
	popupaccountstableView.data = accoutDataSet;
}


var popupaccountstableView = Ti.UI.createTableView({
	//height : deviceHeight * 0.925,
	height : deviceHeight * 0.850, 
	separatorColor : settingstableseparatorcolor,
});
loadAccountList();

var accountBtn = Ti.UI.createView({
		height : deviceHeight * 0.075,  // **************
		backgroundColor : '#054e62',
	});

var btnNewAccount = Titanium.UI.createButton({
	    title:'Add New',
	    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	    backgroundColor:'#054e62',
	    backgroundSelectedColor:'#0a7390',
	    left : '0%',
	    height : '100%',
	    width: '100%',
	    	font : {
			fontSize : stylefontsize - 3,
			fontFamily : customFont1
		},
	});

accountspopupcontainerView.add(popupaccountstableView);

btnNewAccount.addEventListener('click', function(){
	var objCreateaccountView = require('createaccount');
	var createaccountView = objCreateaccountView.createaccountRecord();
	settingsView.add(createaccountView);
	createaccountView.show();
	addAccountViewOpen = true;
});

Ti.App.addEventListener('refrishAccountsList', function(e){
	loadAccountList();
});

accountBtn.add(btnNewAccount);
accountspopupcontainerView.add(accountBtn);


// EOF Account list view
btn_accounts.addEventListener('click', function(){
	loadAccountList();
	accountspopupcontainerView.show();
});

Ti.App.addEventListener('showAccountList', function(e){
	console.log("Accout list listing.....");
	loadAccountList();
	accountspopupcontainerView.show();
});

imgaccountspopupclose.addEventListener('click', function(){
	accountspopupcontainerView.hide();
	
});

popupaccountstableView.addEventListener('click',function(e){
	//console.log('Row ID :'+e.row.id);
	var objEditAccount = require('createaccount');
	if(objEditAccount.isInbuilt(e.row.id) === false){
		objEditAccount.setAccountData(e.row.id);
		var editAccountView = objEditAccount.createaccountRecord();
		settingsView.add(editAccountView);
		editAccountView.show();
	} else {
		alert('This inbuilt account cannot be changed or deleted.');	
	}
});

// --- EOF Account Section ---

// --- Project section --
var btn_projects = Ti.UI.createView({
	backgroundColor : settingsbtncol,
	backgroundSelectedColor : settingsbtnselectedcol,
	left : '1%',
	right : '1%',
	top : '0.5%',
	// height : deviceHeight * 0.11,
	height : settingOptionHeight,
});

var imgcurrency = Ti.UI.createImageView({
	image : '/images/projects.png',
	left : styleSettingsmargine,
	width : settingImageWidth+'%',
});

var lblcurrency = Ti.UI.createLabel({
	text : "Internal Reference Numbers", //'Project',
	//width : '70%',
	color : settingsbtnfontcolor,
	left : settinglabelmargin,
	font : {
		fontFamily : customFont1,
		fontSize : stylefontsize + 2,
	},	
});

btn_projects.add(imgcurrency);
btn_projects.add(lblcurrency);

// Project list view
var projectspopupcontainerView = Ti.UI.createView({// Set height appropriately
	layout : 'vertical',
	width : '100%', visible : false,
	height : '100%',
	backgroundColor : '#FFF'
});

var view_projectspopuptitle = Ti.UI.createView({
	height : deviceHeight * 0.075,
	backgroundColor : '#2980B9',
});

var lblprojectspopuptitle = Ti.UI.createLabel({
	text : 'Internal Reference Numbers', //'Projects'
	color : '#FFFFFF',
	font : {
		fontSize : stylefontsize + 2,
		fontFamily : customFont2,
	},
});

var imgprojectspopupclose = Ti.UI.createImageView({
	image : '/images/backbtn.png',
	backgroundSelectedColor : '#999999',
	width : '13%',
	left : '0%',
});

view_projectspopuptitle.add(lblprojectspopuptitle);
view_projectspopuptitle.add(imgprojectspopupclose);
projectspopupcontainerView.add(view_projectspopuptitle);

var popupprojectstableView = Ti.UI.createTableView({
	backgroundColor : 'white',
	height : deviceHeight * 0.745,
	separatorColor : settingstableseparatorcolor,
	width : '100%',
	//data : projectData
});
loadProjectList();
projectspopupcontainerView.add(popupprojectstableView);

var projectInputView = Titanium.UI.createView({
	backgroundColor : settingsInputBackgroundColor,
	height : deviceHeight * 0.105,
});

var projectBtn = Ti.UI.createView({
		height : deviceHeight * 0.075,  // **************
		backgroundColor : '#054e62',
	});

var inptpopupProject = Ti.UI.createTextField({
	bottom : '20%',
	font : {
		fontFamily : customFont,
		fontSize : stylefontsize,
	},
	color : settingsbtnfontcolor,
	left : settingdropinnermargin,
	right : settingdropinnermargin,
	hintText : 'Add New', borderColor : "#489CE0",backgroundColor: settingsinputFeildBackgoundcolor,
	autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_WORDS,
	maxLength : 7,
});

var btnSaveProject = Titanium.UI.createButton({
	    title:'Save',
	    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	    backgroundColor:btnBackgroundColor,
	    backgroundSelectedColor:btnBackgroundSelectColor,
	    right : '0%',
	    height : '100%',
	    width:'50%',
	    font : {
			fontSize : stylefontsize - 5,
			fontFamily : customFont1
		}, enabled: false,
		backgroundDisabledColor: btnBackgroundDisabledColor,
	});
var btnDeleteProject = Titanium.UI.createButton({
	    title:'Delete',
	    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	    backgroundColor:'#F00',
	    backgroundSelectedColor:'#0a7390',
	    height : '100%',
	    width:'34%',
	    	font : {
			fontSize : stylefontsize - 5,
			fontFamily : customFont1
		}, enabled: false,
	});
	
var btnCancelProject = Titanium.UI.createButton({
	    title:'Cancel',
	    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	    backgroundColor:btnBackgroundColor,
	    backgroundSelectedColor:btnBackgroundSelectColor,
	    left : '0%',
	    height : '100%',
	    width:'50%',
	    font : {
			fontSize : stylefontsize - 5,
			fontFamily : customFont1
		}, enabled: false,
		backgroundDisabledColor: btnBackgroundDisabledColor,
	});
	
projectInputView.add(inptpopupProject);
projectBtn.add(btnSaveProject);
//projectBtn.add(btnDeleteProject);
projectBtn.add(btnCancelProject);
projectspopupcontainerView.add(projectInputView);
projectspopupcontainerView.add(projectBtn);

var projectRecordDeleteConf = Ti.UI.createAlertDialog({
    cancel: 1,
    buttonNames: ['Delete', 'Cancel'],
    message: 'Do you want to delete the record?',
    title: 'Delete Confirmation?'
});
projectspopupcontainerView.add(projectRecordDeleteConf);	
// EOF project list view

// Onclick Project table row 
popupprojectstableView.addEventListener('click', function(e){
	var projectResult = db.execute('SELECT project_name FROM tbl_project WHERE id = '+e.rowData.id);
	var projectName = projectResult.fieldByName('project_name');
	temp_cat_id_holder.text = e.rowData.id;
	inptpopupProject.value = projectName;
	btnSaveProject.enabled = true;
	btnDeleteProject.enabled = true;
	btnCancelProject.enabled = true;
	btnSaveProject.title = 'Update';
	
	projectBtn.add(btnDeleteProject);
	btnSaveProject.width = '33%';
	btnCancelProject.width = '33%';
	
	for(var i = 0; i <= popupprojectstableView.data[0].rows.length-1; i++){
		popupprojectstableView.data[0].rows[i].backgroundColor = '#fff';
	}
	this.sections[0].rows[e.rowData.rowIndex-1].backgroundColor = '#cdd6ff'; 
});
// EOF Onclick project table row

// Click event on project Cancel button 
btnCancelProject.addEventListener('click', function(){
	temp_cat_id_holder.text = '';
	inptpopupProject.value = '';
	btnSaveProject.enabled = false;
	btnDeleteProject.enabled = false;
	btnCancelProject.enabled = false;
	btnSaveProject.title = 'Save';
	
	projectBtn.remove(btnDeleteProject);
	btnSaveProject.width = '50%';
	btnCancelProject.width = '50%';
	
	for(var i = 0; i <= popupprojectstableView.data[0].rows.length-1; i++){
		popupprojectstableView.data[0].rows[i].backgroundColor = '#fff';
	}
});
// EOF Click event on projects Cancel button

// Click event on Project Save button
btnSaveProject.addEventListener('click', function(){
	
	var newField = inptpopupProject.value;
	// New Insert
	if(temp_cat_id_holder.text == ''){
		db.execute('INSERT INTO tbl_project (project_name, enable) VALUES ("'+newField+'",1)');
		var toast = Ti.UI.createNotification({
			message:"Save Successful",
			duration: Ti.UI.NOTIFICATION_DURATION_SHORT
		});
		toast.show();
	} else {
		// update	
		db.execute('UPDATE tbl_project SET project_name = "'+newField+'" WHERE id='+temp_cat_id_holder.text);
		var toast = Ti.UI.createNotification({
			message:"Update Successful",
			duration: Ti.UI.NOTIFICATION_DURATION_SHORT
		});
		toast.show();
	}
	loadProjectList();
	temp_cat_id_holder.text = '';
	inptpopupProject.value = '';
	btnSaveProject.enabled = false;
	btnDeleteProject.enabled = false;
	btnCancelProject.enabled = false;
	btnSaveProject.title = 'Save';
	
	projectBtn.remove(btnDeleteProject);
	btnSaveProject.width = '50%';
	btnCancelProject.width = '50%';
});
// EOF Click event on Project SAVE button

// Click event on Expence Sub Category DELETE button
btnDeleteProject.addEventListener('click', function(){
	var sql1 = 'SELECT COUNT(*) AS expencerowcount FROM tbl_expence WHERE project_id = '+temp_cat_id_holder.text;
	var sql2 = 'SELECT COUNT(*) AS incomerowcount FROM tbl_income WHERE project_id = '+temp_cat_id_holder.text;
	var resultSet1 = db.execute(sql1);
	var resultSet2 = db.execute(sql2);
	var totalRows = resultSet1.fieldByName('expencerowcount') + resultSet2.fieldByName('incomerowcount');
	if (totalRows!=0){
		var dialog1 = Ti.UI.createAlertDialog({
			title : 'Unable to Delete !',
			message : 'Project already in use',
			ok : 'Ok',
		});
		dialog1.show();
	}else{
		// delete confirmation record
		projectRecordDeleteConf.show();
	}
});
// EOF Click event on Expence Sub Category DELETE button

// Delete Confirmation
projectRecordDeleteConf.addEventListener('click', function(e){
    if (e.index === e.source.cancel){
      	Ti.API.info('The cancel button was clicked');
    }else{
    	var rowID = temp_cat_id_holder.text;
    	db.execute('DELETE FROM tbl_project WHERE id='+rowID);
    	loadProjectList();
    	var toast = Ti.UI.createNotification({
			message:"Delete Successful",
			duration: Ti.UI.NOTIFICATION_DURATION_SHORT
		});
		toast.show();
		temp_cat_id_holder.text = '';
		inptpopupProject.value = '';
		btnSaveProject.enabled = false;
		btnDeleteProject.enabled = false;
		btnCancelProject.enabled = false;
		btnSaveProject.title = 'Save';
		
		projectBtn.remove(btnDeleteProject);
		btnSaveProject.width = '50%';
		btnCancelProject.width = '50%';
    }
});
// EOF Delete Confirmation

// enable buttons On change in Project Text; 
inptpopupProject.addEventListener('change', function(e){
	if(inptpopupProject.value.length == 0 && temp_cat_id_holder.text == ''){
		btnSaveProject.enabled = false;
		btnCancelProject.enabled = false;
	}else if(inptpopupProject.value.length == 0){
		btnSaveProject.enabled = false;
	}else{
		btnCancelProject.enabled = true;
		btnSaveProject.enabled = true;
	}
});
// EOF enable buttons On change in Project Text;

function resetProjectListView(){
	projectspopupcontainerView.hide();
	temp_cat_id_holder.text = '';
	inptpopupProject.value = '';
	btnSaveProject.enabled = false;
	btnDeleteProject.enabled = false;
	btnCancelProject.enabled = false;
	btnSaveProject.title = 'Save';
	
	projectBtn.remove(btnDeleteProject);
	btnSaveProject.width = '50%';
	btnCancelProject.width = '50%';
	
	for(var i = 0; i <= popupprojectstableView.data[0].rows.length-1; i++){
		popupprojectstableView.data[0].rows[i].backgroundColor = '#fff';
	}
}
// On Project list view close
imgprojectspopupclose.addEventListener('click', function(){ // close project list view on exit button
	resetProjectListView();
});
btn_projects.addEventListener('click', function(){ // open projct list view on select from main list in settings
	projectspopupcontainerView.show();
});
// --- EOF Project Section ---

// --- Payment Modes Section ---
var btn_paymodes = Ti.UI.createView({
	backgroundColor : settingsbtncol,
	backgroundSelectedColor : settingsbtnselectedcol,
	left : '1%', right : '1%', 	top : '0.5%',
	height : settingOptionHeight,
});

var imgcurrency = Ti.UI.createImageView({
	image : '/images/pay_modes.png',
	left : styleSettingsmargine,
	width : settingImageWidth+'%',
});

var lblcurrency = Ti.UI.createLabel({
	text : 'Pay modes',
	color : settingsbtnfontcolor,
	left : settinglabelmargin,
	font : {
		fontFamily : customFont1,
		fontSize : stylefontsize + 2,
	},	
});

btn_paymodes.add(imgcurrency);
btn_paymodes.add(lblcurrency);

// payment modes list
var paymodespopupcontainerView = Ti.UI.createView({// Set height appropriately
	layout : 'vertical', visible : false,
	width : '100%',
	height : '100%',
	backgroundColor : '#FFF'
});

var view_paymodespopuptitle = Ti.UI.createView({
	height : deviceHeight * 0.075,
	backgroundColor : '#2980B9',
});

var lblpaymodespopuptitle = Ti.UI.createLabel({
	text : 'Pay Modes',
	color : '#FFFFFF',
	font : {
		fontSize : stylefontsize + 2,
		fontFamily : customFont2,
	},
});

var imgpaymodespopupclose = Ti.UI.createImageView({
	image : '/images/backbtn.png',
	backgroundSelectedColor : '#999999',
	width : '13%',
	left : '0%',
});

view_paymodespopuptitle.add(lblpaymodespopuptitle);
view_paymodespopuptitle.add(imgpaymodespopupclose);
paymodespopupcontainerView.add(view_paymodespopuptitle);


var popuppaymodestableView = Ti.UI.createTableView({
	backgroundColor : 'white',
	height : deviceHeight * 0.745,
	width : '100%',
	separatorColor : settingstableseparatorcolor,
	//data : payModeData
});
loadPayModeList(); // Load payment modes list
paymodespopupcontainerView.add(popuppaymodestableView);

var paymodeInputView = Titanium.UI.createView({
	backgroundColor : settingsInputBackgroundColor,
	height : deviceHeight * 0.105,
});

var paymodeBtn = Ti.UI.createView({
		height : deviceHeight * 0.075,  // **************
		backgroundColor : '#054e62',
	});

var inptpopupPaymode = Ti.UI.createTextField({
	bottom : '20%',
	font : {
		fontFamily : customFont,
		fontSize : stylefontsize,
	},
	color : settingsbtnfontcolor,
	left : settingdropinnermargin,
	right : settingdropinnermargin,
	hintText : 'Add New', borderColor : "#489CE0", backgroundColor: settingsinputFeildBackgoundcolor,
	autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_WORDS,
});

var btnSavePaymode = Titanium.UI.createButton({
	    title:'Save',
	    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	    backgroundColor:btnBackgroundColor,
	    backgroundSelectedColor:btnBackgroundSelectColor,
	    right : '0%',
	    height : '100%',
	    width:'50%',
	    font : {
			fontSize : stylefontsize - 5,
			fontFamily : customFont1
		}, enabled: false,
		backgroundDisabledColor: btnBackgroundDisabledColor,
	});
var btnDeletePaymode = Titanium.UI.createButton({
	    title:'Delete',
	    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	    backgroundColor:btnDeleteBackgroundColor,
	    backgroundSelectedColor:btnDeleteBackgroundSelectedColor,
	    height : '100%',
	    width:'34%',
	    	font : {
			fontSize : stylefontsize - 5,
			fontFamily : customFont1
		}, enabled: false,
	});
	
	var btnCancelPaymode = Titanium.UI.createButton({
	    title:'Cancel',
	    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	    backgroundColor:btnBackgroundColor,
	    backgroundSelectedColor:btnBackgroundSelectColor,
	    left : '0%',
	    height : '100%',
	    width:'50%',
	    font : {
			fontSize : stylefontsize - 5,
			fontFamily : customFont1
		}, enabled: false,
		backgroundDisabledColor: btnBackgroundDisabledColor,
	});

paymodeInputView.add(inptpopupPaymode);
paymodeBtn.add(btnSavePaymode);
//paymodeBtn.add(btnDeletePaymode);
paymodeBtn.add(btnCancelPaymode);
paymodespopupcontainerView.add(paymodeInputView);
paymodespopupcontainerView.add(paymodeBtn);
// EOF payment modes list

var payModeRecordDeleteConf = Ti.UI.createAlertDialog({
    cancel: 1,
    buttonNames: ['Delete', 'Cancel'],
    message: 'Do you want to delete the record?',
    title: 'Delete Confirmation?'
});
paymodespopupcontainerView.add(payModeRecordDeleteConf);	
// EOF project list view

// Onclick Payment Mode table row 
popuppaymodestableView.addEventListener('click', function(e){
	var projectResult = db.execute('SELECT payment_mode FROM tbl_payment_mode WHERE id = '+e.rowData.id);
	var paymentModeName = projectResult.fieldByName('payment_mode');
	temp_cat_id_holder.text = e.rowData.id;
	inptpopupPaymode.value = paymentModeName;
	btnSavePaymode.enabled = true;
	btnDeletePaymode.enabled = true;
	btnCancelPaymode.enabled = true;
	btnSavePaymode.title = 'Update';
	
	paymodeBtn.add(btnDeletePaymode);
	btnSavePaymode.width = '33%';
	btnCancelPaymode.width = '33%';
	
	for(var i = 0; i <= popuppaymodestableView.data[0].rows.length-1; i++){
		popuppaymodestableView.data[0].rows[i].backgroundColor = '#fff';
	}
	this.sections[0].rows[e.rowData.rowIndex-1].backgroundColor = '#cdd6ff'; 
});
// EOF Onclick Payment Mode table row

// Click event on Payment Mode Cancel button 
btnCancelPaymode.addEventListener('click', function(){
	temp_cat_id_holder.text = '';
	inptpopupPaymode.value = '';
	btnSavePaymode.enabled = false;
	btnDeletePaymode.enabled = false;
	btnCancelPaymode.enabled = false;
	btnSavePaymode.title = 'Save';
	
	paymodeBtn.remove(btnDeletePaymode);
	btnSavePaymode.width = '50%';
	btnCancelPaymode.width = '50%';
	
	for(var i = 0; i <= popuppaymodestableView.data[0].rows.length-1; i++){
		popuppaymodestableView.data[0].rows[i].backgroundColor = '#fff';
	}
});
// EOF Click event on Payment Mode Cancel button

// Click event on Payment Mode Save button
btnSavePaymode.addEventListener('click', function(){
	var newField = inptpopupPaymode.value;
	// New Insert
	if(temp_cat_id_holder.text == ''){
		db.execute('INSERT INTO tbl_payment_mode (payment_mode, enable) VALUES ("'+newField+'",1)');
		var toast = Ti.UI.createNotification({
			message:"Save Successful",
			duration: Ti.UI.NOTIFICATION_DURATION_SHORT
		});
		toast.show();
	} else {
		// update	
		db.execute('UPDATE tbl_payment_mode SET payment_mode = "'+newField+'" WHERE id='+temp_cat_id_holder.text);
		var toast = Ti.UI.createNotification({
			message:"Update Successful",
			duration: Ti.UI.NOTIFICATION_DURATION_SHORT
		});
		toast.show();
	}
	loadPayModeList();
	temp_cat_id_holder.text = '';
	inptpopupPaymode.value = '';
	btnSavePaymode.enabled = false;
	btnDeletePaymode.enabled = false;
	btnCancelPaymode.enabled = false;
	btnSavePaymode.title = 'Save';
	
	paymodeBtn.remove(btnDeletePaymode);
	btnSavePaymode.width = '50%';
	btnCancelPaymode.width = '50%';
});
// EOF Click event on Payment Mode SAVE button

// Click event on Payment Mode DELETE button
btnDeletePaymode.addEventListener('click', function(){
	var sql1 = 'SELECT COUNT(*) AS paymoderowcount FROM tbl_expence WHERE payment_mode_id = '+temp_cat_id_holder.text;
	var resultSet1 = db.execute(sql1);
	var totalRows = resultSet1.fieldByName('paymoderowcount');
	if (totalRows!=0){
		var dialog1 = Ti.UI.createAlertDialog({
			title : 'Unable to Delete !',
			message : 'Payment Mode already in use.',
			ok : 'Ok',
		});
		dialog1.show();
	}else{
		// delete confirmation record
		payModeRecordDeleteConf.show();
	}
});
// EOF Click event on Payment Mode DELETE button

// Payment Mode Delete Confirmation
payModeRecordDeleteConf.addEventListener('click', function(e){
    if (e.index === e.source.cancel){
      	Ti.API.info('The cancel button was clicked');
    }else{
    	var rowID = temp_cat_id_holder.text;
    	db.execute('DELETE FROM tbl_payment_mode WHERE id='+rowID);
    	loadPayModeList(); // Load new payment mode list
    	var toast = Ti.UI.createNotification({
			message:"Delete Successful",
			duration: Ti.UI.NOTIFICATION_DURATION_SHORT
		});
		toast.show();
		temp_cat_id_holder.text = '';
		inptpopupPaymode.value = '';
		btnSavePaymode.enabled = false;
		btnDeletePaymode.enabled = false;
		btnCancelPaymode.enabled = false;
		btnSavePaymode.title = 'Save';
		
		paymodeBtn.remove(btnDeletePaymode);
		btnSavePaymode.width = '50%';
		btnCancelPaymode.width = '50%';
    }
});
// EOF Payment Mode Delete Confirmation

// enable buttons On change in Payment Mode Text; 
inptpopupPaymode.addEventListener('change', function(e){
	if(inptpopupPaymode.value.length == 0 && temp_cat_id_holder.text == ''){
		btnSavePaymode.enabled = false;
		btnCancelPaymode.enabled = false;
	}else if(inptpopupPaymode.value.length == 0){
		btnSavePaymode.enabled = false;
	}else{
		btnCancelPaymode.enabled = true;
		btnSavePaymode.enabled = true;
	}
});
// enable buttons On change in Payment Mode Text;

btn_paymodes.addEventListener('click', function(){
	paymodespopupcontainerView.show();
});

function resetPaymodesListView(){
	paymodespopupcontainerView.hide();
	temp_cat_id_holder.text = '';
	inptpopupPaymode.value = '';
	btnSavePaymode.enabled = false;
	btnDeletePaymode.enabled = false;
	btnCancelPaymode.enabled = false;
	btnSavePaymode.title = 'Save';
	
	paymodeBtn.remove(btnDeletePaymode);
	btnSavePaymode.width = '50%';
	btnCancelPaymode.width = '50%';
	
	for(var i = 0; i <= popuppaymodestableView.data[0].rows.length-1; i++){
		popuppaymodestableView.data[0].rows[i].backgroundColor = '#fff';
	}
}
// on Payment Mode listing view close btn click 
imgpaymodespopupclose.addEventListener('click', function(){
	resetPaymodesListView();
});
// --- EOF Payment Modes Section ---

// --- Income Section ---
var btn_income = Ti.UI.createView({
	backgroundColor : settingsbtncol,
	backgroundSelectedColor : settingsbtnselectedcol,
	left : '1%',
	right : '1%',
	top : '0.5%',
	// height : deviceHeight * 0.11,
	height : settingOptionHeight,
});

////////////////////////////////////////
var incomepopupview    = Ti.UI.createView({
	visible : false,
}); // Full screen
var incomepopupbackgroundView = Ti.UI.createView({  // Also full screen
    backgroundColor : '#000',
    opacity         : 0.7
});
var incomepopupcontainerView  = Ti.UI.createView({  // Set height appropriately
    layout : 'vertical',
    width : '90%',
    height          : deviceHeight * 0.265,
    backgroundColor : '#FFF'
});

var view_incometitle = Ti.UI.createView({
	height : deviceHeight * 0.075,
	backgroundColor : '#2980B9',
});

var lblincometitle = Ti.UI.createLabel({
	text : 'Income',
	color : '#FFFFFF',
	font : {
		fontSize : stylefontsize + 2,
		fontFamily : customFont2,
	},
});
var imgincomepopupclose = Ti.UI.createImageView({
	image : '/images/closebtn.png',
	backgroundSelectedColor : '#999999',
	width : '9%',
	right : '3%',
});

view_incometitle.add(lblincometitle);
view_incometitle.add(imgincomepopupclose);
incomepopupcontainerView.add(view_incometitle);

var btn_incomecat = Ti.UI.createView({
	backgroundColor : settingsbtncol,
	backgroundSelectedColor : settingsbtnselectedcol,
	left : '1%',
	right : '1%',
	top : '2%',
	bottom : '0.5%',
	// height : deviceHeight * 0.11,
	height : settingOptionHeight,
});

var imgcurrency = Ti.UI.createImageView({
	image : '/images/income.png',
	left : '5%',
	width : '15%',
});

var lblcurrency = Ti.UI.createLabel({
	text : 'Income Category',
	//width : '70%',
	color : settingsbtnfontcolor,
	left : '25%',
	font : {
		fontFamily : customFont1,
		fontSize : stylefontsize,
	},	
});

btn_incomecat.add(imgcurrency);
btn_incomecat.add(lblcurrency);
incomepopupcontainerView.add(btn_incomecat);

// Income Category list
var incomecatpopupcontainerView = Ti.UI.createView({// Set height appropriately
	layout : 'vertical',
	width : '100%', visible : false,
	height : '100%',
	backgroundColor : '#FFF',
});

var view_incomecatpopuptitle = Ti.UI.createView({
	height : deviceHeight * 0.075,
	backgroundColor : '#2980B9',
});

var lblincomecatpopuptitle = Ti.UI.createLabel({
	text : 'Income Category',
	color : '#FFFFFF',
	font : {
		fontSize : stylefontsize + 2,
		fontFamily : customFont2,
	},
});

var imgincomecatpopupclose = Ti.UI.createImageView({
	image : '/images/backbtn.png',
	backgroundSelectedColor : '#999999',
	width : '13%',
	left : '0%',
});

view_incomecatpopuptitle.add(lblincomecatpopuptitle);
view_incomecatpopuptitle.add(imgincomecatpopupclose);
incomecatpopupcontainerView.add(view_incomecatpopuptitle);

var popupincomecattableView = Ti.UI.createTableView({
	height : deviceHeight * 0.745,
	separatorColor : settingstableseparatorcolor,
	//data : incomeCatData
});
loadIncomeCategoryList();

incomecatpopupcontainerView.add(popupincomecattableView);

var incomeCatInputView = Titanium.UI.createView({
	backgroundColor : settingsInputBackgroundColor,
	height : deviceHeight * 0.105,
});

var incomeCatBtn = Ti.UI.createView({
		height : deviceHeight * 0.075,  // **************
		backgroundColor : '#054e62',
	});

var inptpopupIncomeCat = Ti.UI.createTextField({
	bottom : '20%',
	font : {
		fontFamily : customFont,
		fontSize : stylefontsize,
	},
	color : settingsbtnfontcolor,
	left : settingdropinnermargin,
	right : settingdropinnermargin,
	hintText : 'Add New', borderColor : "#489CE0", backgroundColor: settingsinputFeildBackgoundcolor,
	autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_WORDS,
});

var btnSaveIncomeCat = Titanium.UI.createButton({
	    title:'Save',
	    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	    backgroundColor:btnBackgroundColor,
	    backgroundSelectedColor:btnBackgroundSelectColor,
	    right : '0%',
	    height : '100%',
	    width:'50%',
	    font : {
			fontSize : stylefontsize - 5,
			fontFamily : customFont1
		}, enabled: false,
		backgroundDisabledColor: btnBackgroundDisabledColor,
	});
var btnDeleteIncomeCat = Titanium.UI.createButton({
	    title:'Delete',
	    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	    backgroundColor:btnDeleteBackgroundColor,
	    backgroundSelectedColor:btnDeleteBackgroundSelectedColor,
	    height : '100%',
	    width:'34%',
	    	font : {
			fontSize : stylefontsize - 5,
			fontFamily : customFont1
		}, enabled: false,
	});
	
	var btnCancelIncomeCat = Titanium.UI.createButton({
	    title:'Cancel',
	    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	    backgroundColor:btnBackgroundColor,
	    backgroundSelectedColor:btnBackgroundSelectColor,
	    left : '0%',
	    height : '100%',
	    width:'50%',
	    font : {
			fontSize : stylefontsize - 5,
			fontFamily : customFont1
		}, enabled: false,
		backgroundDisabledColor: btnBackgroundDisabledColor,
	});

incomeCatInputView.add(inptpopupIncomeCat);
incomeCatBtn.add(btnSaveIncomeCat);
//incomeCatBtn.add(btnDeleteIncomeCat);
incomeCatBtn.add(btnCancelIncomeCat);
incomecatpopupcontainerView.add(incomeCatInputView);
incomecatpopupcontainerView.add(incomeCatBtn);

function resetIncomeListView(){
	incomecatpopupcontainerView.hide();
	temp_cat_id_holder.text = '';
	inptpopupIncomeCat.value = '';
	btnSaveIncomeCat.enabled = false;
	btnDeleteIncomeCat.enabled = false;
	btnCancelIncomeCat.enabled = false;
	btnSaveIncomeCat.title = 'Save';
	
	incomeCatBtn.remove(btnDeleteIncomeCat);
	btnCancelIncomeCat.width = '50%';
	btnSaveIncomeCat.width = '50%';
	
	for(var i = 0; i <= popupincomecattableView.data[0].rows.length-1; i++){
		popupincomecattableView.data[0].rows[i].backgroundColor = '#fff';
	}
}
imgincomecatpopupclose.addEventListener('click', function(){
	resetIncomeListView();
});

var incomeCatRecordDeleteConf = Ti.UI.createAlertDialog({
    cancel: 1,
    buttonNames: ['Delete', 'Cancel'],
    message: 'Do you want to delete the record?',
    title: 'Delete Confirmation?'
});
incomecatpopupcontainerView.add(incomeCatRecordDeleteConf);	
// EOF income Category list view

// Onclick income Category table row 
popupincomecattableView.addEventListener('click', function(e){
	var incomeCatResult = db.execute('SELECT income_category FROM tbl_income_category WHERE id = '+e.rowData.id);
	var catName = incomeCatResult.fieldByName('income_category');
	temp_cat_id_holder.text = e.rowData.id;
	inptpopupIncomeCat.value = catName;
	btnSaveIncomeCat.enabled = true;
	btnDeleteIncomeCat.enabled = true;
	btnCancelIncomeCat.enabled = true;
	btnSaveIncomeCat.title = 'Update';
	
	incomeCatBtn.add(btnDeleteIncomeCat);
	btnCancelIncomeCat.width = '33%';
	btnSaveIncomeCat.width = '33%';
	
	for(var i = 0; i <= popupincomecattableView.data[0].rows.length-1; i++){
		popupincomecattableView.data[0].rows[i].backgroundColor = '#fff';
	}
	this.sections[0].rows[e.rowData.rowIndex-1].backgroundColor = '#cdd6ff'; 
});
// EOF Onclick Income Category table row


// Click event on Income Category Cancel button 
btnCancelIncomeCat.addEventListener('click', function(){
	temp_cat_id_holder.text = '';
	inptpopupIncomeCat.value = '';
	btnSaveIncomeCat.enabled = false;
	btnDeleteIncomeCat.enabled = false;
	btnCancelIncomeCat.enabled = false;
	btnSaveIncomeCat.title = 'Save';
	
	incomeCatBtn.remove(btnDeleteIncomeCat);
	btnCancelIncomeCat.width = '50%';
	btnSaveIncomeCat.width = '50%';
	
	for(var i = 0; i <= popupincomecattableView.data[0].rows.length-1; i++){
		popupincomecattableView.data[0].rows[i].backgroundColor = '#fff';
	}
});
// EOF Click event on Income Category Cancel button

// Click event on Income Category Save button
btnSaveIncomeCat.addEventListener('click', function(){
	var newField = inptpopupIncomeCat.value;
	// New Insert
	if(temp_cat_id_holder.text == ''){
		db.execute('INSERT INTO tbl_income_category (income_category, enable) VALUES ("'+newField+'",1)');
		
		var lastIDData = db.execute('SELECT MAX(id) as rowid FROM tbl_income_category WHERE enable=1');
			var lastID = lastIDData.fieldByName('rowid');
			//console.log('lastID >> ' + lastID);
			var insData = 'General';
			db.execute('INSERT INTO tbl_income_sub_category (income_sub_category,parent_category,enable) VALUES ("' + insData + '","' + lastID + '",1)');
			
		var toast = Ti.UI.createNotification({
			message:"Save Successful",
			duration: Ti.UI.NOTIFICATION_DURATION_SHORT
		});
		toast.show();
	} else {
		// update	
		db.execute('UPDATE tbl_income_category SET income_category = "'+newField+'" WHERE id='+temp_cat_id_holder.text);
		var toast = Ti.UI.createNotification({
			message:"Update Successful",
			duration: Ti.UI.NOTIFICATION_DURATION_SHORT
		});
		toast.show();
	}
	loadIncomeCategoryList();
	temp_cat_id_holder.text = '';
	inptpopupIncomeCat.value = '';
	btnSaveIncomeCat.enabled = false;
	btnDeleteIncomeCat.enabled = false;
	btnCancelIncomeCat.enabled = false;
	btnSaveIncomeCat.title = 'Save';
	
	incomeCatBtn.remove(btnDeleteIncomeCat);
	btnCancelIncomeCat.width = '50%';
	btnSaveIncomeCat.width = '50%';
	
});
// EOF Click event on Income Category SAVE button

// Click event on Income Category DELETE button
btnDeleteIncomeCat.addEventListener('click', function(){
	var sql1 = 'SELECT COUNT(*) AS incomecatrowcount FROM tbl_income WHERE category_id = '+temp_cat_id_holder.text;
	var resultSet1 = db.execute(sql1);
	var totalRows = resultSet1.fieldByName('incomecatrowcount');
	if (totalRows!=0){
		var dialog1 = Ti.UI.createAlertDialog({
			title : 'Unable to Delete !',
			message : 'Income Category already in use.',
			ok : 'Ok',
		});
		dialog1.show();
	}else{
		// delete confirmation record
		incomeCatRecordDeleteConf.show();
	}
});
// EOF Click event on Income Category DELETE button

// Income Category Delete Confirmation
incomeCatRecordDeleteConf.addEventListener('click', function(e){
    if (e.index === e.source.cancel){
      	Ti.API.info('The cancel button was clicked');
    }else{
    	var rowID = temp_cat_id_holder.text;
    	db.execute('DELETE FROM tbl_income_category WHERE id='+rowID);
    	loadIncomeCategoryList(); // Load new payment mode list
    	var toast = Ti.UI.createNotification({
			message:"Delete Successful",
			duration: Ti.UI.NOTIFICATION_DURATION_SHORT
		});
		toast.show();
		temp_cat_id_holder.text = '';
		inptpopupIncomeCat.value = '';
		btnSaveIncomeCat.enabled = false;
		btnDeleteIncomeCat.enabled = false;
		btnCancelIncomeCat.enabled = false;
		btnSaveIncomeCat.title = 'Save';
		
		incomeCatBtn.remove(btnDeleteIncomeCat);
		btnCancelIncomeCat.width = '50%';
		btnSaveIncomeCat.width = '50%';
    }
});
// EOF Payment Mode Delete Confirmation

// enable buttons On change in Payment Mode Text; 
inptpopupIncomeCat.addEventListener('change', function(e){
	if(inptpopupIncomeCat.value.length == 0 && temp_cat_id_holder.text == ''){
		btnSaveIncomeCat.enabled = false;
		btnCancelIncomeCat.enabled = false;
	}else if(inptpopupIncomeCat.value.length == 0){
		btnSaveIncomeCat.enabled = false;
	}else{
		btnCancelIncomeCat.enabled = true;
		btnSaveIncomeCat.enabled = true;
	}
});
// enable buttons On change in Payment Mode Text;

// EOF Income Category list

var btn_incomesubcat = Ti.UI.createView({
	backgroundColor : settingsbtncol,
	backgroundSelectedColor : settingsbtnselectedcol,
	left : '1%',
	right : '1%',
	top : '1%',
	bottom : '0.5%',
	height : settingOptionHeight,
});

var imgcurrency = Ti.UI.createImageView({
	image : '/images/income.png',
	left : '5%',
	width : '15%',
});

var lblcurrency = Ti.UI.createLabel({
	text : 'Income Sub Category',
	//width : '70%',
	color : settingsbtnfontcolor,
	left : '25%',
	font : {
		fontFamily : customFont1,
		fontSize : stylefontsize,
	},	
});

btn_incomesubcat.add(imgcurrency);
btn_incomesubcat.add(lblcurrency);
incomepopupcontainerView.add(btn_incomesubcat);

// Income sub category view
var incomesubcatpopupcontainerView = Ti.UI.createView({// Set height appropriately
	layout : 'vertical', visible : false,
	width : '100%',
	height : '100%',
	backgroundColor : '#FFF',
});

var view_incomesubcatpopuptitle = Ti.UI.createView({
	height : deviceHeight * 0.075,
	backgroundColor : '#2980B9',
});

var lblincomesubcatpopuptitle = Ti.UI.createLabel({
	text : 'Income Sub Category',
	color : '#FFFFFF',
	font : {
		fontSize : stylefontsize + 2,
		fontFamily : customFont2,
	},
});

var imgincomesubcatpopupclose = Ti.UI.createImageView({
	image : '/images/backbtn.png',
	backgroundSelectedColor : '#999999',
	width : '13%',
	left : '0%',
});

view_incomesubcatpopuptitle.add(lblincomesubcatpopuptitle);
view_incomesubcatpopuptitle.add(imgincomesubcatpopupclose);
incomesubcatpopupcontainerView.add(view_incomesubcatpopuptitle);

var popupincomesubcatparentView = Ti.UI.createView({
	height : deviceHeight * 0.075,
	width : '100%',
	backgroundColor : '#E3E3E3',
});

var lblpopupincomesubcatparent = Ti.UI.createLabel({
	text : 'Parent Category :',
	font : {
		fontFamily : customFont1,
		fontSize : stylefontsize,
	},
	color : settingsbtnfontcolor,
	width : '50%',
	left : settingdropinnermargin,
});

var incomesubcatparentpopuppicker = Ti.UI.createPicker({ // income parent category picker
	font : {
		fontFamily : customFont1,
		fontSize : stylefontsize - 2,
	},
	backgroundColor : settingsbtnfontcolor,
	color : '#111111',
	width : '50%',
	right : 0,//settingdropinnermargin,
	height : Ti.UI.FILL
});

loadIncomeSubCatParentList();

popupincomesubcatparentView.add(lblpopupincomesubcatparent);
popupincomesubcatparentView.add(incomesubcatparentpopuppicker);
incomesubcatpopupcontainerView.add(popupincomesubcatparentView);

var tableData = [];
for (var i = 1; i <= 20; i++) {
	var rowpopupincomesubcat = Ti.UI.createTableViewRow({
		className : 'forumEvent', // used to improve table performance
		backgroundSelectedColor : tablerowselectedBackgroundColor,
		rowIndex : i, // custom property, useful for determining the row during events
		height : 50,
	});

	var lblpopupincomesubcatname = Ti.UI.createLabel({
		color : '#576996',
		font : {
			fontFamily : customFont,
			fontSize : stylefontsize,
		},
		text : 'xxxx xxxx ' + i,
		left : stylemargine,
		//right : '2%',
		top : settingdropinnermargin,
		//width : '77%',
		height : '90%',
	});
	rowpopupincomesubcat.add(lblpopupincomesubcatname);
	tableData.push(rowpopupincomesubcat);
}

var popupincomesubcattableView = Ti.UI.createTableView({
	height : deviceHeight * 0.67,
	separatorColor : settingstableseparatorcolor,
});

incomesubcatpopupcontainerView.add(popupincomesubcattableView); // adding income sub category table to the main view

var incomeSubCatInputView = Titanium.UI.createView({
	backgroundColor : settingsInputBackgroundColor,
	height : deviceHeight * 0.105,
});

var incomeSubCatBtn = Ti.UI.createView({
		height : deviceHeight * 0.075,  // **************
		backgroundColor : '#054e62',
	});

var inptpopupIncomeSubCat = Ti.UI.createTextField({
	bottom : '20%',
	font : {
		fontFamily : customFont,
		fontSize : stylefontsize,
	},
	color : settingsbtnfontcolor,
	left : settingdropinnermargin,
	right : settingdropinnermargin,
	hintText : 'Add New', backgroundColor: settingsinputFeildBackgoundcolor,
	editable: false,borderColor : "#489CE0",
	autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_WORDS,
});

var btnSaveIncomeSubCat = Titanium.UI.createButton({
	    title:'Save',
	    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	    backgroundColor:btnBackgroundColor,
	    backgroundSelectedColor:btnBackgroundSelectColor,
	    right : '0%',
	    height : '100%',
	    width:'50%',
	    font : {
			fontSize : stylefontsize - 5,
			fontFamily : customFont1
		}, enabled: false,
		backgroundDisabledColor: btnBackgroundDisabledColor,
	});
var btnDeleteIncomeSubCat = Titanium.UI.createButton({
	    title:'Delete',
	    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	    backgroundColor:btnDeleteBackgroundColor,
	    backgroundSelectedColor:btnDeleteBackgroundSelectedColor,
	    height : '100%',
	    width:'34%',
	    	font : {
			fontSize : stylefontsize - 5,
			fontFamily : customFont1
		}, enabled: false,
	});
	
	var btnCancelIncomeSubCat = Titanium.UI.createButton({
	    title:'Cancel',
	    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	    backgroundColor:btnBackgroundColor,
	    backgroundSelectedColor:btnBackgroundSelectColor,
	    left : '0%',
	    height : '100%',
	    width:'50%',
	    font : {
			fontSize : stylefontsize - 5,
			fontFamily : customFont1
		}, enabled: false,
		backgroundDisabledColor: btnBackgroundDisabledColor,
	});

incomeSubCatInputView.add(inptpopupIncomeSubCat);
incomeSubCatBtn.add(btnSaveIncomeSubCat);
//incomeSubCatBtn.add(btnDeleteIncomeSubCat);
incomeSubCatBtn.add(btnCancelIncomeSubCat);
incomesubcatpopupcontainerView.add(incomeSubCatInputView);
incomesubcatpopupcontainerView.add(incomeSubCatBtn);


var incomeSubCatagoryRecordDeleteConf = Ti.UI.createAlertDialog({
    cancel: 1,
    buttonNames: ['Delete', 'Cancel'],
    message: 'Do you want to delete the record?',
    title: 'Delete Confirmation?'
});
incomesubcatpopupcontainerView.add(incomeSubCatagoryRecordDeleteConf);

// Onclick Income sub category table row 
popupincomesubcattableView.addEventListener('click', function(e){
	var subCategoryResult = db.execute('SELECT income_sub_category FROM tbl_income_sub_category WHERE id = '+e.rowData.id);
	var Category = subCategoryResult.fieldByName('income_sub_category');
	temp_cat_id_holder.text = e.rowData.id;
	inptpopupIncomeSubCat.value = Category;
	btnSaveIncomeSubCat.enabled = true;
	btnDeleteIncomeSubCat.enabled = true;
	btnCancelIncomeSubCat.enabled = true;
	btnSaveIncomeSubCat.title = 'Update';
	
	incomeSubCatBtn.add(btnDeleteIncomeSubCat);
	btnCancelIncomeSubCat.width = '33%';
	btnSaveIncomeSubCat.width = '33%';
	
	for(var i = 0; i <= popupincomesubcattableView.data[0].rows.length-1; i++){
		popupincomesubcattableView.data[0].rows[i].backgroundColor = '#fff';
	}
	this.sections[0].rows[e.rowData.rowIndex-1].backgroundColor = '#cdd6ff'; 
});
// EOF Onclick Income sub category table row

// Click event on income Sub Category Cancel button 
btnCancelIncomeSubCat.addEventListener('click', function(){
	temp_cat_id_holder.text = '';
	inptpopupIncomeSubCat.value = '';
	btnSaveIncomeSubCat.enabled = false;
	btnDeleteIncomeSubCat.enabled = false;
	btnCancelIncomeSubCat.enabled = false;
	btnSaveIncomeSubCat.title = 'Save';
	
	incomeSubCatBtn.remove(btnDeleteIncomeSubCat);
	btnCancelIncomeSubCat.width = '50%';
	btnSaveIncomeSubCat.width = '50%';
	
	for(var i = 0; i <= popupincomesubcattableView.data[0].rows.length-1; i++){
		popupincomesubcattableView.data[0].rows[i].backgroundColor = '#fff';
	}
});
// EOF Click event on Income Sub Category Cancel button

// Click event on Income Sub Category Save button
btnSaveIncomeSubCat.addEventListener('click', function(){
	
	var newField = inptpopupIncomeSubCat.value;
	var parentCat = incomesubcatparentpopuppicker.getSelectedRow(0).table_id;
	// New Insert
	if(temp_cat_id_holder.text == ''){
		db.execute('INSERT INTO tbl_income_sub_category (income_sub_category, parent_category, enable) VALUES ("'+newField+'","'+parentCat+'",1)');
		var toast = Ti.UI.createNotification({
			message:"Save Successful",
			duration: Ti.UI.NOTIFICATION_DURATION_SHORT
		});
		toast.show();
	} else {
		// update	
		db.execute('UPDATE tbl_income_sub_category SET income_sub_category = "'+newField+'" WHERE id='+temp_cat_id_holder.text);
		var toast = Ti.UI.createNotification({
			message:"Update Successful",
			duration: Ti.UI.NOTIFICATION_DURATION_SHORT
		});
		toast.show();
	}
	getIncomeSubCategorByParentId(parentCat);
	temp_cat_id_holder.text = '';
	inptpopupIncomeSubCat.value = '';
	btnSaveIncomeSubCat.enabled = false;
	btnDeleteIncomeSubCat.enabled = false;
	btnCancelIncomeSubCat.enabled = false;
	btnSaveIncomeSubCat.title = 'Save';
	
	incomeSubCatBtn.remove(btnDeleteIncomeSubCat);
	btnCancelIncomeSubCat.width = '50%';
	btnSaveIncomeSubCat.width = '50%';
});
// EOF Click event on Income Sub Category SAVE button

// Click event on Expence Sub Category DELETE button
btnDeleteIncomeSubCat.addEventListener('click', function(){
	var sql = 'SELECT COUNT(*) AS rowcount FROM tbl_income WHERE sub_category_id = '+temp_cat_id_holder.text;
	var resultSet = db.execute(sql);
	if (resultSet.fieldByName('rowcount')!=0){
		var dialog1 = Ti.UI.createAlertDialog({
			title : 'Unable to Delete !',
			message : 'Category already using in income record.',
			ok : 'Ok',
		});
		dialog1.show();
	}else{
		// delete confirmation record
		incomeSubCatagoryRecordDeleteConf.show();
	}
});
// EOF Click event on Expence Sub Category DELETE button

// Delete Confirmation
incomeSubCatagoryRecordDeleteConf.addEventListener('click', function(e){
    if (e.index === e.source.cancel){
      	Ti.API.info('The cancel button was clicked');
    }else{
    	var rowID = temp_cat_id_holder.text;
    	db.execute('DELETE FROM tbl_income_sub_category WHERE id='+rowID);
    	var parentCat = incomesubcatparentpopuppicker.getSelectedRow(0).table_id;
    	getIncomeSubCategorByParentId(parentCat);
    	var toast = Ti.UI.createNotification({
			message:"Delete Successful",
			duration: Ti.UI.NOTIFICATION_DURATION_SHORT
		});
		toast.show();
		temp_cat_id_holder.text = '';
		inptpopupIncomeSubCat.value = '';
		btnSaveIncomeSubCat.enabled = false;
		btnDeleteIncomeSubCat.enabled = false;
		btnCancelIncomeSubCat.enabled = false;
		btnSaveIncomeSubCat.title = 'Save';
		
		incomeSubCatBtn.remove(btnDeleteIncomeSubCat);
		btnCancelIncomeSubCat.width = '50%';
		btnSaveIncomeSubCat.width = '50%';
    }
});
// EOF Delete Confirmation

// enable buttons On change in Expence sub category Text; 
inptpopupIncomeSubCat.addEventListener('change', function(e){
	
	if(inptpopupIncomeSubCat.value.length == 0 && temp_cat_id_holder.text == ''){
		btnSaveIncomeSubCat.enabled = false;
		btnCancelIncomeSubCat.enabled = false;
	}else if(inptpopupIncomeSubCat.value.length == 0){
		btnSaveIncomeSubCat.enabled = false;
	}else{
		btnCancelIncomeSubCat.enabled = true;
		btnSaveIncomeSubCat.enabled = true;
	}
});

function resetIncomeSubCatListView(){
	incomesubcatpopupcontainerView.hide();
	// remove highlited rows from sub category table rows
	var parentSelect = incomesubcatparentpopuppicker.getSelectedRow(0).table_id;
	
	if(parentSelect != '0'){
		for(var i = 0; i <= popupincomesubcattableView.data[0].rows.length-1; i++){
			popupincomesubcattableView.data[0].rows[i].backgroundColor = '#fff';
		}
	}
	temp_cat_id_holder.text = '';
	inptpopupIncomeSubCat.value = '';
	btnSaveIncomeSubCat.enabled = false;
	btnDeleteIncomeSubCat.enabled = false;
	btnCancelIncomeSubCat.enabled = false;
	btnSaveIncomeSubCat.title = 'Save';
	incomesubcatparentpopuppicker.setSelectedRow(0, 0, false); // set default on Expence Parent Category list
	
	incomeSubCatBtn.remove(btnDeleteIncomeSubCat);
	btnCancelIncomeSubCat.width = '50%';
	btnSaveIncomeSubCat.width = '50%';
}

imgincomesubcatpopupclose.addEventListener('click', function(){
	resetIncomeSubCatListView();
});

incomesubcatparentpopuppicker.addEventListener('change', function(e){
	temp_cat_id_holder.text = '';
	inptpopupIncomeSubCat.value = '';
	btnSaveIncomeSubCat.enabled = false;
	btnDeleteIncomeSubCat.enabled = false;
	btnCancelIncomeSubCat.enabled = false;
	btnSaveIncomeSubCat.title = 'Save';
	
	incomeSubCatBtn.remove(btnDeleteIncomeSubCat);
	btnCancelIncomeSubCat.width = '50%';
	btnSaveIncomeSubCat.width = '50%';
	
	if(e.row.table_id == '0'){
		popupincomesubcattableView.setData([]);
		inptpopupIncomeSubCat.editable =  false;
	}else{
		inptpopupIncomeSubCat.editable =  true;
		var sql = 'SELECT * FROM tbl_income_sub_category WHERE parent_category='+e.row.table_id+' AND enable=1 ORDER BY income_sub_category COLLATE NOCASE ASC';
		var subCatRecordSet = db.execute(sql);
		var incomeSubCatArray = [];
		var i =1;
		while(subCatRecordSet.isValidRow()){
			var rowpopupIncomeSubcat = Ti.UI.createTableViewRow({
				className : 'forumEvent', // used to improve table performance
				backgroundSelectedColor : tablerowselectedBackgroundColor,
				rowIndex : i, // custom property, useful for determining the row during events
				height : 50,
				id:subCatRecordSet.fieldByName('id'),
			});
		
			var lblpopupIncomeSubcatname = Ti.UI.createLabel({
				color : '#576996',
				font : {
					fontFamily : customFont,
					fontSize : stylefontsize,
				},
				text : subCatRecordSet.fieldByName('income_sub_category'),
				left : stylemargine,
				//right : '2%',
				top : settingdropinnermargin,
				width : '90%',
				height : '90%',
			});
			rowpopupIncomeSubcat.add(lblpopupIncomeSubcatname);
			incomeSubCatArray.push(rowpopupIncomeSubcat);
			i++;
			subCatRecordSet.next();
		}
		subCatRecordSet.close();
		popupincomesubcattableView.data = incomeSubCatArray;
	}
});
// EOF Income SUb category view


imgincomepopupclose.addEventListener('click', function () {
    incomepopupview.hide();
});

btn_incomecat.addEventListener('click', function () {
    incomepopupview.hide();
    incomecatpopupcontainerView.show();
});

btn_incomesubcat.addEventListener('click', function () {
    incomepopupview.hide();
    incomesubcatpopupcontainerView.show();
    loadIncomeSubCatParentList();
});

incomepopupbackgroundView.addEventListener('click', function () {
    incomepopupview.hide();
});

btn_income.addEventListener('click', function () {
    incomepopupview.show();
});

incomepopupview.add(incomepopupbackgroundView);
incomepopupview.add(incomepopupcontainerView);


//////////////////////////////////////////////


var imgcurrency = Ti.UI.createImageView({
	image : '/images/income.png',
	left : styleSettingsmargine,
	width : settingImageWidth+'%',
});

var lblcurrency = Ti.UI.createLabel({
	text : 'Income Category',
	//width : '70%',
	color : settingsbtnfontcolor,
	left : settinglabelmargin,
	font : {
		fontFamily : customFont1,
		fontSize : stylefontsize + 2,
	},	
});

btn_income.add(imgcurrency);
btn_income.add(lblcurrency);
// --- EOF Income Section ---

// --- Customer Section ---
var btn_customers = Ti.UI.createView({
	backgroundColor : settingsbtncol,
	backgroundSelectedColor : settingsbtnselectedcol,
	left : '1%',
	right : '1%',
	top : '0.5%',
	// height : deviceHeight * 0.11,
	height : settingOptionHeight,
});

var imgcurrency = Ti.UI.createImageView({
	image : '/images/customers.png',
	left : styleSettingsmargine,
	width : settingImageWidth+'%',
});

var lblcurrency = Ti.UI.createLabel({
	text : 'Customers',
	//width : '70%',
	color : settingsbtnfontcolor,
	left : settinglabelmargin,
	font : {
		fontFamily : customFont1,
		fontSize : stylefontsize + 2,
	},	
});

btn_customers.add(imgcurrency);
btn_customers.add(lblcurrency);

// Customer List View
var customerspopupcontainerView = Ti.UI.createView({// Set height appropriately
	layout : 'vertical', visible : false,
	width : '100%',
	height : '100%',
	backgroundColor : '#FFF',
});

var view_customerspopuptitle = Ti.UI.createView({
	height : deviceHeight * 0.075,
	backgroundColor : '#2980B9',
});

var lblcustomerspopuptitle = Ti.UI.createLabel({
	text : 'Customers',
	color : '#FFFFFF',
	font : {
		fontSize : stylefontsize + 2,
		fontFamily : customFont2,
	},
});

var imgcustomerspopupclose = Ti.UI.createImageView({
	image : '/images/backbtn.png',
	backgroundSelectedColor : '#999999',
	width : '13%',
	left : '0%',
});

view_customerspopuptitle.add(lblcustomerspopuptitle);
view_customerspopuptitle.add(imgcustomerspopupclose);
customerspopupcontainerView.add(view_customerspopuptitle);

var popupcustomerstableView = Ti.UI.createTableView({
	height : deviceHeight * 0.745,
	separatorColor : settingstableseparatorcolor,
	//data : customerData
});
loadCustomerList();
customerspopupcontainerView.add(popupcustomerstableView); // adding customer table view to the main view

// Customer add view
var CustomerInputView = Titanium.UI.createView({
	backgroundColor : settingsInputBackgroundColor,
	height : deviceHeight * 0.105,
});
// Customer button view
var CustomerCatBtn = Ti.UI.createView({
		height : deviceHeight * 0.075,  // **************
		backgroundColor : '#054e62',
	});

var inptpopupCustomer = Ti.UI.createTextField({
	bottom : '20%',
	font : {
		fontFamily : customFont,
		fontSize : stylefontsize ,
	},
	color : settingsbtnfontcolor,
	left : settingdropinnermargin,
	right : settingdropinnermargin,
	hintText : 'Add New',borderColor : "#489CE0", backgroundColor: settingsinputFeildBackgoundcolor,
	autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_WORDS,
});

var btnSaveCustomer = Titanium.UI.createButton({
	    title:'Save',
	    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	    backgroundColor:btnBackgroundColor,
	    backgroundSelectedColor:btnBackgroundSelectColor,
	    right : '0%',
	    height : '100%',
	    width:'50%',
	    font : {
			fontSize : stylefontsize - 5,
			fontFamily : customFont1
		}, enabled: false,
		backgroundDisabledColor: btnBackgroundDisabledColor,
	});
var btnDeleteCustomer = Titanium.UI.createButton({
	    title:'Delete',
	    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	    backgroundColor:btnDeleteBackgroundColor,
	    backgroundSelectedColor:btnDeleteBackgroundSelectedColor,
	    height : '100%',
	    width:'34%',
	    	font : {
			fontSize : stylefontsize - 5,
			fontFamily : customFont1
		}, enabled: false,
	});
	
	var btnCancelCustomer = Titanium.UI.createButton({
	    title:'Cancel',
	    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	    backgroundColor:btnBackgroundColor,
	    backgroundSelectedColor:btnBackgroundSelectColor,
	    left : '0%',
	    height : '100%',
	    width:'50%',
	    font : {
			fontSize : stylefontsize - 5,
			fontFamily : customFont1
		}, enabled: false,
		backgroundDisabledColor: btnBackgroundDisabledColor,
	});
	
	CustomerInputView.add(inptpopupCustomer);
	CustomerCatBtn.add(btnSaveCustomer);
	//CustomerCatBtn.add(btnDeleteCustomer);
	CustomerCatBtn.add(btnCancelCustomer);
	customerspopupcontainerView.add(CustomerInputView);
	customerspopupcontainerView.add(CustomerCatBtn);
// EOF customer list view

var customerRecordDeleteConf = Ti.UI.createAlertDialog({
    cancel: 1,
    buttonNames: ['Delete', 'Cancel'],
    message: 'Do you want to delete the record?',
    title: 'Delete Confirmation?'
});
customerspopupcontainerView.add(customerRecordDeleteConf);	
// EOF Customer list view

// Onclick Customer table row 
popupcustomerstableView.addEventListener('click', function(e){
	var customerResult = db.execute('SELECT full_name FROM tbl_customer WHERE id = '+e.rowData.id);
	var customerName = customerResult.fieldByName('full_name');
	temp_cat_id_holder.text = e.rowData.id;
	inptpopupCustomer.value = customerName;
	btnSaveCustomer.enabled = true;
	btnDeleteCustomer.enabled = true;
	btnCancelCustomer.enabled = true;
	btnSaveCustomer.title = 'Update';
	
	CustomerCatBtn.add(btnDeleteCustomer);
	btnCancelCustomer.width = '33%';
	btnSaveCustomer.width = '33%';
	
	for(var i = 0; i <= popupcustomerstableView.data[0].rows.length-1; i++){
		popupcustomerstableView.data[0].rows[i].backgroundColor = '#fff';
	}
	this.sections[0].rows[e.rowData.rowIndex-1].backgroundColor = '#cdd6ff'; 
});
// EOF Onclick Customer table row

// Click event on Customer Cancel button 
btnCancelCustomer.addEventListener('click', function(){
	temp_cat_id_holder.text = '';
	inptpopupCustomer.value = '';
	btnSaveCustomer.enabled = false;
	btnDeleteCustomer.enabled = false;
	btnCancelCustomer.enabled = false;
	btnSaveCustomer.title = 'Save';
	
	CustomerCatBtn.remove(btnDeleteCustomer);
	btnCancelCustomer.width = '50%';
	btnSaveCustomer.width = '50%';
	
	for(var i = 0; i <= popupcustomerstableView.data[0].rows.length-1; i++){
		popupcustomerstableView.data[0].rows[i].backgroundColor = '#fff';
	}
});
// EOF Click event on Customer Cancel button

// Click event on Customer Save button
btnSaveCustomer.addEventListener('click', function(){
	var newField = inptpopupCustomer.value;
	// New Insert
	if(temp_cat_id_holder.text == ''){
		//db.execute('INSERT INTO tbl_customer (full_name, enable) VALUES ("'+newField+'",1)');
		db.execute('INSERT INTO tbl_customer(full_name, enable) VALUES(?,?)', newField, 1);
		var toast = Ti.UI.createNotification({
			message:"Save Successful",
			duration: Ti.UI.NOTIFICATION_DURATION_SHORT
		});
		toast.show();
	} else {
		// update	
		db.execute('UPDATE tbl_customer SET full_name = "'+newField+'" WHERE id='+temp_cat_id_holder.text);
		var toast = Ti.UI.createNotification({
			message:"Update Successful",
			duration: Ti.UI.NOTIFICATION_DURATION_SHORT
		});
		toast.show();
	}
	loadCustomerList();
	temp_cat_id_holder.text = '';
	inptpopupCustomer.value = '';
	btnSaveCustomer.enabled = false;
	btnDeleteCustomer.enabled = false;
	btnCancelCustomer.enabled = false;
	btnSaveCustomer.title = 'Save';
	
	CustomerCatBtn.remove(btnDeleteCustomer);
	btnCancelCustomer.width = '50%';
	btnSaveCustomer.width = '50%';
});
// EOF Click event on Payment Mode SAVE button

// Click event on Payment Mode DELETE button
btnDeleteCustomer.addEventListener('click', function(){
	var sql1 = 'SELECT COUNT(*) AS customercount FROM tbl_income WHERE customer_name = '+temp_cat_id_holder.text;
	var sql2 = 'SELECT COUNT(*) AS customercount FROM tbl_invoice WHERE customer_id = '+temp_cat_id_holder.text;
	var resultSet1 = db.execute(sql1);
	var resultSet2 = db.execute(sql2);
	var totalRows = resultSet1.fieldByName('customercount') + resultSet2.fieldByName('customercount');
	if (totalRows!=0){
		var dialog1 = Ti.UI.createAlertDialog({
			title : 'Unable to Delete !',
			message : 'Customer name already in use.',
			ok : 'Ok',
		});
		dialog1.show();
	}else{
		// delete confirmation record
		customerRecordDeleteConf.show();
	}
});
// EOF Click event on Payment Mode DELETE button

// Customer Delete Confirmation
customerRecordDeleteConf.addEventListener('click', function(e){
    if (e.index === e.source.cancel){
      	Ti.API.info('The cancel button was clicked');
    }else{
    	var rowID = temp_cat_id_holder.text;
    	db.execute('DELETE FROM tbl_customer WHERE id='+rowID);
    	loadCustomerList(); // Load new customer list
    	var toast = Ti.UI.createNotification({
			message:"Delete Successful",
			duration: Ti.UI.NOTIFICATION_DURATION_SHORT
		});
		toast.show();
		temp_cat_id_holder.text = '';
		inptpopupCustomer.value = '';
		btnSaveCustomer.enabled = false;
		btnDeleteCustomer.enabled = false;
		btnCancelCustomer.enabled = false;
		btnSaveCustomer.title = 'Save';
		
		CustomerCatBtn.remove(btnDeleteCustomer);
		btnCancelCustomer.width = '50%';
		btnSaveCustomer.width = '50%';
    }
});
// EOF Customer Delete Confirmation

// enable buttons On change in Payment Mode Text; 
inptpopupCustomer.addEventListener('change', function(e){
	if(inptpopupCustomer.value.length == 0 && temp_cat_id_holder.text == ''){
		btnSaveCustomer.enabled = false;
		btnCancelCustomer.enabled = false;
	}else if(inptpopupCustomer.value.length == 0){
		btnSaveCustomer.enabled = false;
	}else{
		btnCancelCustomer.enabled = true;
		btnSaveCustomer.enabled = true;
	}
});

btn_customers.addEventListener('click', function(){
	customerspopupcontainerView.show();
});

function resetCustomerListView(){
	customerspopupcontainerView.hide();
	temp_cat_id_holder.text = '';
	inptpopupCustomer.value = '';
	btnSaveCustomer.enabled = false;
	btnDeleteCustomer.enabled = false;
	btnCancelCustomer.enabled = false;
	btnSaveCustomer.title = 'Save';
	
	CustomerCatBtn.remove(btnDeleteCustomer);
	btnCancelCustomer.width = '50%';
	btnSaveCustomer.width = '50%';
	
	for(var i = 0; i <= popupcustomerstableView.data[0].rows.length-1; i++){
		popupcustomerstableView.data[0].rows[i].backgroundColor = '#fff';
	}
}
imgcustomerspopupclose.addEventListener('click', function(){
	resetCustomerListView();
});
// --- EOF Customer Section ---

// --- Invoice Section ---
var btn_invoice = Ti.UI.createView({
	backgroundColor : settingsbtncol,
	backgroundSelectedColor : settingsbtnselectedcol,
	left : '1%',
	right : '1%',
	top : '0.5%',
	// height : deviceHeight * 0.11,
	height : settingOptionHeight,
});

////////////////////////////////////////
var invoicepopupview    = Ti.UI.createView({
	visible : false,
}); // Full screen
var invoicepopupbackgroundView = Ti.UI.createView({  // Also full screen
    backgroundColor : '#000',
    opacity         : 0.7
});
var invoicepopupcontainerView  = Ti.UI.createView({  // Set height appropriately
    layout : 'vertical',
    width : '90%',
    height          : deviceHeight * 0.265,
    backgroundColor : '#FFF'
});

var view_invoicetitle = Ti.UI.createView({
	height : deviceHeight * 0.075,
	backgroundColor : '#2980B9',
});

var lblinvoicetitle = Ti.UI.createLabel({
	text : 'Invoice',
	color : '#FFFFFF',
	font : {
		fontSize : stylefontsize + 2,
		fontFamily : customFont2,
	},
});

var imginvoicepopupclose = Ti.UI.createImageView({
	image : '/images/closebtn.png',
	backgroundSelectedColor : '#999999',
	width : '9%',
	right : '3%',
});

view_invoicetitle.add(lblinvoicetitle);
view_invoicetitle.add(imginvoicepopupclose);
invoicepopupcontainerView.add(view_invoicetitle);

var btn_invoicecat = Ti.UI.createView({
	backgroundColor : settingsbtncol,
	backgroundSelectedColor : settingsbtnselectedcol,
	left : '1%',
	right : '1%',
	top : '2%',
	bottom : '0.5%',
	// height : deviceHeight * 0.11,
	height : settingOptionHeight,
});

var imgcurrency = Ti.UI.createImageView({
	image : '/images/invoice.png',
	left : '5%',
	width : '15%',
});

var lblcurrency = Ti.UI.createLabel({
	text : 'Invoice Category',
	//width : '70%',
	color : settingsbtnfontcolor,
	left : '25%',
	font : {
		fontFamily : customFont1,
		fontSize : stylefontsize,
	},	
});

btn_invoicecat.add(imgcurrency);
btn_invoicecat.add(lblcurrency);
invoicepopupcontainerView.add(btn_invoicecat);

var invoicecatpopupcontainerView = Ti.UI.createView({// Set height appropriately
	layout : 'vertical', visible : false,
	width : '100%',
	height : '100%',
	backgroundColor : '#FFF',
});

var view_invoicecatpopuptitle = Ti.UI.createView({
	height : deviceHeight * 0.075,
	backgroundColor : '#2980B9',
});

var lblinvoicecatpopuptitle = Ti.UI.createLabel({
	text : 'Invoice Category',
	color : '#FFFFFF',
	font : {
		fontSize : stylefontsize + 2,
		fontFamily : customFont2,
	},
});

var imginvoicecatpopupclose = Ti.UI.createImageView({
	image : '/images/backbtn.png',
	backgroundSelectedColor : '#999999',
	width : '13%',
	left : '0%',
});

view_invoicecatpopuptitle.add(lblinvoicecatpopuptitle);
view_invoicecatpopuptitle.add(imginvoicecatpopupclose);
invoicecatpopupcontainerView.add(view_invoicecatpopuptitle);

function loadInvoiceCategoryList() {
	var sql = 'SELECT * FROM tbl_invoice_category WHERE enable = 1 ORDER BY invoice_category COLLATE NOCASE ASC';
	var invCatResultSet = db.execute(sql);
	var i = 1;
	var invCatArray = [];
	while(invCatResultSet.isValidRow()){
		var rowpopupinvoicecat = Ti.UI.createTableViewRow({
			className : 'forumEvent', // used to improve table performance
			backgroundSelectedColor : tablerowselectedBackgroundColor,
			rowIndex : i, // custom property, useful for determining the row during events
			height : 50,
			id:invCatResultSet.fieldByName('id'),
		});
	
		var lblpopupinvoicecatname = Ti.UI.createLabel({
			color : '#576996',
			font : {
				fontFamily : customFont,
				fontSize : stylefontsize,
			},
			text : invCatResultSet.fieldByName('invoice_category'),
			left : stylemargine,
			top : settingdropinnermargin,
			height : '90%',
		});
		rowpopupinvoicecat.add(lblpopupinvoicecatname);
		invCatArray.push(rowpopupinvoicecat);
		i++;
		invCatResultSet.next();
	}
	invCatResultSet.close();
	popupinvoicecattableView.data = invCatArray;
}



var popupinvoicecattableView = Ti.UI.createTableView({
	height : deviceHeight * 0.745,
	separatorColor : settingstableseparatorcolor,
	//data : invCatArray
});
loadInvoiceCategoryList();
invoicecatpopupcontainerView.add(popupinvoicecattableView); // Add invoice category list table to the main view

// invoice cat add/edit section
var invoiceCatInputView = Titanium.UI.createView({
	backgroundColor : settingsInputBackgroundColor,
	height : deviceHeight * 0.105,
});

var InvoiceCatBtn = Ti.UI.createView({
		height : deviceHeight * 0.075,  // **************
		backgroundColor : '#054e62',
	});

var inptpopupInvoiceCat = Ti.UI.createTextField({
	bottom : '20%',
	font : {
		fontFamily : customFont1,
		fontSize : stylefontsize - 1,
	},
	color : settingsbtnfontcolor,
	left : settingdropinnermargin,
	right : settingdropinnermargin,
	hintText : 'Add New',borderColor : "#489CE0", backgroundColor: settingsinputFeildBackgoundcolor,
	autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_WORDS,
});

var btnSaveInvoiceCat = Titanium.UI.createButton({
	    title:'Save',
	    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	    backgroundColor:btnBackgroundColor,
	    backgroundSelectedColor:btnBackgroundSelectColor,
	    right : '0%',
	    height : '100%',
	    width:'50%',
	    font : {
			fontSize : stylefontsize - 5,
			fontFamily : customFont1
		}, enabled: false,
		backgroundDisabledColor: btnBackgroundDisabledColor,
	});

var btnDeleteInvoiceCat = Titanium.UI.createButton({
	    title:'Delete',
	    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	    backgroundColor:btnDeleteBackgroundColor,
	    backgroundSelectedColor:btnDeleteBackgroundSelectedColor,
	    height : '100%',
	    width:'34%',
	    	font : {
			fontSize : stylefontsize - 5,
			fontFamily : customFont1
		}, enabled: false,
		backgroundDisabledColor: btnBackgroundDisabledColor,
		
	});
	
var btnCancelInvoiceCat = Titanium.UI.createButton({
	    title:'Cancel',
	    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	    backgroundColor:btnBackgroundColor,
	    backgroundSelectedColor:btnBackgroundSelectColor,
	    left : '0%',
	    height : '100%',
	    width:'50%',
	    font : {
			fontSize : stylefontsize - 5,
			fontFamily : customFont1
		}, enabled: false,
		backgroundDisabledColor: btnBackgroundDisabledColor,
	});

invoiceCatInputView.add(inptpopupInvoiceCat);
InvoiceCatBtn.add(btnSaveInvoiceCat);
//InvoiceCatBtn.add(btnDeleteInvoiceCat);
InvoiceCatBtn.add(btnCancelInvoiceCat);
invoicecatpopupcontainerView.add(invoiceCatInputView);
invoicecatpopupcontainerView.add(InvoiceCatBtn);



var invoiceCatDeleteConf = Ti.UI.createAlertDialog({
    cancel: 1,
    buttonNames: ['Delete', 'Cancel'],
    message: 'Do you want to delete the record?',
    title: 'Delete Confirmation?'
});
invoicecatpopupcontainerView.add(invoiceCatDeleteConf);	
// EOF Invoice list view

// Onclick Invoice table row 
popupinvoicecattableView.addEventListener('click', function(e){
	var invoiceCatResult = db.execute('SELECT invoice_category FROM tbl_invoice_category WHERE id = '+e.rowData.id);
	var invoiceCatName = invoiceCatResult.fieldByName('invoice_category');
	temp_cat_id_holder.text = e.rowData.id;
	inptpopupInvoiceCat.value = invoiceCatName;
	btnSaveInvoiceCat.enabled = true;
	btnDeleteInvoiceCat.enabled = true;
	btnCancelInvoiceCat.enabled = true;
	btnSaveInvoiceCat.title = 'Update';
	
	InvoiceCatBtn.add(btnDeleteInvoiceCat);
	btnSaveInvoiceCat.width = '33%';
	btnCancelInvoiceCat.width = '33%';
	
	for(var i = 0; i <= popupinvoicecattableView.data[0].rows.length-1; i++){
		popupinvoicecattableView.data[0].rows[i].backgroundColor = '#fff';
	}
	this.sections[0].rows[e.rowData.rowIndex-1].backgroundColor = '#cdd6ff'; 
});
// EOF Onclick Invoice Category table row

// Click event on Customer Cancel button 
btnCancelInvoiceCat.addEventListener('click', function(){
	temp_cat_id_holder.text = '';
	inptpopupInvoiceCat.value = '';
	btnSaveInvoiceCat.enabled = false;
	btnDeleteInvoiceCat.enabled = false;
	btnCancelInvoiceCat.enabled = false;
	btnSaveInvoiceCat.title = 'Save';
	
	InvoiceCatBtn.remove(btnDeleteInvoiceCat);
	btnSaveInvoiceCat.width = '50%';
	btnCancelInvoiceCat.width = '50%';
	
	for(var i = 0; i <= popupinvoicecattableView.data[0].rows.length-1; i++){
		popupinvoicecattableView.data[0].rows[i].backgroundColor = '#fff';
	}
});
// EOF Click event on Invoice Category Cancel button

// Click event on Customer Save button
btnSaveInvoiceCat.addEventListener('click', function(){
	var newField = inptpopupInvoiceCat.value;
	// New Insert
	if(temp_cat_id_holder.text == ''){
		db.execute('INSERT INTO tbl_invoice_category (invoice_category, enable) VALUES ("'+newField+'",1)');
		
		var lastIDData = db.execute('SELECT MAX(id) as rowid FROM tbl_invoice_category WHERE enable=1');
		var invlastID = lastIDData.fieldByName('rowid');
		var insDataSet = 'General';
		db.execute('INSERT INTO tbl_invoice_sub_category (invoice_sub_category,parent_category,enable) VALUES ("'+insDataSet+'","'+invlastID+'",1)');
		
		var toast = Ti.UI.createNotification({
			message:"Save Successful",
			duration: Ti.UI.NOTIFICATION_DURATION_SHORT
		});
		toast.show();
	} else {
		// update	
		db.execute('UPDATE tbl_invoice_category SET invoice_category = "'+newField+'" WHERE id='+temp_cat_id_holder.text);
		var toast = Ti.UI.createNotification({
			message:"Update Successful",
			duration: Ti.UI.NOTIFICATION_DURATION_SHORT
		});
		toast.show();
	}
	loadInvoiceCategoryList();
	temp_cat_id_holder.text = '';
	inptpopupInvoiceCat.value = '';
	btnSaveInvoiceCat.enabled = false;
	btnDeleteInvoiceCat.enabled = false;
	btnCancelInvoiceCat.enabled = false;
	btnSaveInvoiceCat.title = 'Save';
	
	InvoiceCatBtn.remove(btnDeleteInvoiceCat);
	btnSaveInvoiceCat.width = '50%';
	btnCancelInvoiceCat.width = '50%';
	
});
// EOF Click event on Invoice Category SAVE button

// Click event on Payment Mode DELETE button
btnDeleteInvoiceCat.addEventListener('click', function(){
	var sql1 = 'SELECT COUNT(*) AS recordcount FROM tbl_invoice WHERE category_id = '+temp_cat_id_holder.text;
	var resultSet1 = db.execute(sql1);
	var totalRows = resultSet1.fieldByName('recordcount');
	if (totalRows!=0){
		var dialog1 = Ti.UI.createAlertDialog({
			title : 'Unable to Delete !',
			message : 'Catagory already in use.',
			ok : 'Ok',
		});
		dialog1.show();
	}else{
		// delete confirmation record
		invoiceCatDeleteConf.show();
	}
});
// EOF Click event on Payment Mode DELETE button

// Customer Delete Confirmation
invoiceCatDeleteConf.addEventListener('click', function(e){
    if (e.index === e.source.cancel){
      	Ti.API.info('The cancel button was clicked');
    }else{
    	var rowID = temp_cat_id_holder.text;
    	db.execute('DELETE FROM tbl_invoice_category WHERE id='+rowID);
    	loadInvoiceCategoryList(); // Load new customer list
    	var toast = Ti.UI.createNotification({
			message:"Delete Successful",
			duration: Ti.UI.NOTIFICATION_DURATION_SHORT
		});
		toast.show();
		temp_cat_id_holder.text = '';
		inptpopupInvoiceCat.value = '';
		btnSaveInvoiceCat.enabled = false;
		btnDeleteInvoiceCat.enabled = false;
		btnCancelInvoiceCat.enabled = false;
		btnSaveInvoiceCat.title = 'Save';
		
		InvoiceCatBtn.remove(btnDeleteInvoiceCat);
		btnSaveInvoiceCat.width = '33%';
		btnCancelInvoiceCat.width = '33%';
    }
});
// EOF Customer Delete Confirmation

// enable buttons On change in Payment Mode Text; 
inptpopupInvoiceCat.addEventListener('change', function(e){
	if(inptpopupInvoiceCat.value.length == 0 && temp_cat_id_holder.text == ''){
		Ti.API.info('1');
		btnSaveInvoiceCat.enabled = false;
		btnCancelInvoiceCat.enabled = false;
	}else if(inptpopupInvoiceCat.value.length == 0){
		btnSaveInvoiceCat.enabled = false;
		Ti.API.info('2');
	}else{
		btnCancelInvoiceCat.enabled = true;
		btnSaveInvoiceCat.enabled = true;
		Ti.API.info('3');
	}
});

function resetInvoiceCatListView(){
	invoicecatpopupcontainerView.hide();
	temp_cat_id_holder.text = '';
	inptpopupInvoiceCat.value = '';
	btnSaveInvoiceCat.enabled = false;
	btnDeleteInvoiceCat.enabled = false;
	btnCancelInvoiceCat.enabled = false;
	btnSaveInvoiceCat.title = 'Save';
	
	InvoiceCatBtn.remove(btnDeleteInvoiceCat);
	btnSaveInvoiceCat.width = '33%';
	btnCancelInvoiceCat.width = '33%';
	
	for(var i = 0; i <= popupinvoicecattableView.data[0].rows.length-1; i++){
		popupinvoicecattableView.data[0].rows[i].backgroundColor = '#fff';
	}
}

imginvoicecatpopupclose.addEventListener('click', function(){
	resetInvoiceCatListView();
});

var btn_invoicesubcat = Ti.UI.createView({
	backgroundColor : settingsbtncol,
	backgroundSelectedColor : settingsbtnselectedcol,
	left : '1%',
	right : '1%',
	top : '1%',
	bottom : '0.5%',
	// height : deviceHeight * 0.11,
	height : settingOptionHeight,
});

var imgcurrency = Ti.UI.createImageView({
	image : '/images/invoice.png',
	left : '5%',
	width : '15%',
});

var lblcurrency = Ti.UI.createLabel({
	text : 'Invoice Sub Category',
	color : settingsbtnfontcolor,
	left : '25%',
	font : {
		fontFamily : customFont1,
		fontSize : stylefontsize,
	},	
});

btn_invoicesubcat.add(imgcurrency);
btn_invoicesubcat.add(lblcurrency);
invoicepopupcontainerView.add(btn_invoicesubcat);

// invoice Sub Category list
var invoicesubcatpopupcontainerView = Ti.UI.createView({// Set height appropriately
	layout : 'vertical', visible : false,
	width : '100%', height : '100%',
	backgroundColor : '#FFF',
});

var view_invoicesubcatpopuptitle = Ti.UI.createView({
	height : deviceHeight * 0.075,
	backgroundColor : '#2980B9',
});

var lblinvoicesubcatpopuptitle = Ti.UI.createLabel({
	text : 'Invoice Sub Category',
	color : '#FFFFFF',
	font : {
		fontSize : stylefontsize + 2,
		fontFamily : customFont2,
	},
});

var imginvoicesubcatpopupclose = Ti.UI.createImageView({
	image : '/images/backbtn.png',
	backgroundSelectedColor : '#999999',
	width : '13%',
	left : '0%',
});

var popupinvoicesubcatparentView = Ti.UI.createView({
	height : deviceHeight * 0.075,
	width : '100%',
	backgroundColor : '#E3E3E3',
});


var lblpopupinvoicesubcatparent = Ti.UI.createLabel({
	text : 'Parent Category :',
	font : {
		fontFamily : customFont1,
		fontSize : stylefontsize,
	},
	color : settingsbtnfontcolor,
	width : '50%',
	left : settingdropinnermargin,
});

popupinvoicesubcatparentView.add(lblpopupinvoicesubcatparent);

var invoicesubcatparentpopuppicker = Ti.UI.createPicker({
	font : {
		fontFamily : customFont1,
		fontSize : stylefontsize - 2,
	},
	backgroundColor : settingsbtnfontcolor,
	color : '#111111',
	width : '50%',
	right : 0,//settingdropinnermargin,
	height : Ti.UI.FILL
});

loadInvoiceSubCatParetList();

function loadInvoiceSubCatParetList(){
	emptyPicker(invoicesubcatparentpopuppicker);
	var sql = 'SELECT * FROM tbl_invoice_category WHERE enable = 1 ORDER BY invoice_category COLLATE NOCASE ASC';
	var dataSet = db.execute(sql);
	var data = [];
	var i = 1;
	data[0] = Ti.UI.createPickerRow({title:'Please Select', table_id:'0'});
	while(dataSet.isValidRow()){
		data[i] = Ti.UI.createPickerRow({title: dataSet.fieldByName('invoice_category'), table_id: dataSet.fieldByName('id')});
		dataSet.next();
		i++;
	}
	dataSet.close();
	invoicesubcatparentpopuppicker.add(data);
	invoicesubcatparentpopuppicker.selectionIndicator = true;
}


var popupinvoicesubcattableView = Ti.UI.createTableView({
	height : deviceHeight * 0.67,
	separatorColor : settingstableseparatorcolor,
});

popupinvoicesubcatparentView.add(invoicesubcatparentpopuppicker);
view_invoicesubcatpopuptitle.add(lblinvoicesubcatpopuptitle);
view_invoicesubcatpopuptitle.add(imginvoicesubcatpopupclose);
invoicesubcatpopupcontainerView.add(view_invoicesubcatpopuptitle);
invoicesubcatpopupcontainerView.add(popupinvoicesubcatparentView);
invoicesubcatpopupcontainerView.add(popupinvoicesubcattableView);

var InvoiceSubCatInputView = Titanium.UI.createView({
	backgroundColor : settingsInputBackgroundColor,
	height : deviceHeight * 0.105,
});

var InvoiceSubCatCatBtn = Ti.UI.createView({
		height : deviceHeight * 0.075,  // **************
		backgroundColor : '#054e62',
	});

var inptpopupInvoiceSubCat = Ti.UI.createTextField({
	bottom : '20%',
	font : {
		fontFamily : customFont1,
		fontSize : stylefontsize - 1,
	},
	color : settingsbtnfontcolor,
	left : settingdropinnermargin,
	right : settingdropinnermargin,
	hintText : 'Add New', editable: false, borderColor : "#489CE0", backgroundColor: settingsinputFeildBackgoundcolor,
	autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_WORDS,
});

var btnSaveInvoiceSubCat = Titanium.UI.createButton({
	    title:'Save',
	    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	    backgroundColor:btnBackgroundColor,
	    backgroundSelectedColor:btnBackgroundSelectColor,
	    right : '0%',
	    height : '100%',
	    width:'50%',
	    font : {
			fontSize : stylefontsize - 5,
			fontFamily : customFont1
		}, enabled: false,
		backgroundDisabledColor: btnBackgroundDisabledColor,
	});
	var btnDeleteInvoiceSubCat = Titanium.UI.createButton({
	    title:'Delete',
	    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	    backgroundColor:btnDeleteBackgroundColor,
	    backgroundSelectedColor:btnDeleteBackgroundSelectedColor,
	    height : '100%',
	    width:'34%',
	    	font : {
			fontSize : stylefontsize - 5,
			fontFamily : customFont1
		}, enabled: false,
		backgroundDisabledColor: btnBackgroundDisabledColor,
		
	});
	
	var btnCancelInvoiceSubCat = Titanium.UI.createButton({
	    title:'Cancel',
	    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	    backgroundColor:btnBackgroundColor,
	    backgroundSelectedColor:btnBackgroundSelectColor,
	    left : '0%',
	    height : '100%',
	    width:'50%',
	    font : {
			fontSize : stylefontsize - 5,
			fontFamily : customFont1
		}, enabled: false,
		backgroundDisabledColor: btnBackgroundDisabledColor,
	});
	
	InvoiceSubCatInputView.add(inptpopupInvoiceSubCat);
	InvoiceSubCatCatBtn.add(btnSaveInvoiceSubCat);
	//InvoiceSubCatCatBtn.add(btnDeleteInvoiceSubCat);
	InvoiceSubCatCatBtn.add(btnCancelInvoiceSubCat);
	invoicesubcatpopupcontainerView.add(InvoiceSubCatInputView);
	invoicesubcatpopupcontainerView.add(InvoiceSubCatCatBtn);


// EOF invoice sub category list
var invoiceSubCatRecordDeleteConf = Ti.UI.createAlertDialog({
    cancel: 1,
    buttonNames: ['Delete', 'Cancel'],
    message: 'Do you want to delete the record?',
    title: 'Delete Confirmation?'
});
invoicesubcatpopupcontainerView.add(invoiceSubCatRecordDeleteConf);

// Onclick Income sub category table row 
popupinvoicesubcattableView.addEventListener('click', function(e){
	var subCategoryResult = db.execute('SELECT invoice_sub_category FROM tbl_invoice_sub_category WHERE invoice_sub_category !="General" AND enable=1 AND id = '+e.rowData.id);
	var Category = subCategoryResult.fieldByName('invoice_sub_category');
	temp_cat_id_holder.text = e.rowData.id;
	inptpopupInvoiceSubCat.value = Category;
	btnSaveInvoiceSubCat.enabled = true;
	btnDeleteInvoiceSubCat.enabled = true;
	btnCancelInvoiceSubCat.enabled = true;
	btnSaveInvoiceSubCat.title = 'Update';
	
	InvoiceSubCatCatBtn.add(btnDeleteInvoiceSubCat);
	btnCancelInvoiceSubCat.width = '33%';
	btnSaveInvoiceSubCat.width = '33%';
	
	for(var i = 0; i <= popupinvoicesubcattableView.data[0].rows.length-1; i++){
		popupinvoicesubcattableView.data[0].rows[i].backgroundColor = '#fff';
	}
	this.sections[0].rows[e.rowData.rowIndex-1].backgroundColor = '#cdd6ff'; 
});
// EOF Onclick Income sub category table row

// Click event on income Sub Category Cancel button 
btnCancelInvoiceSubCat.addEventListener('click', function(){
	temp_cat_id_holder.text = '';
	inptpopupInvoiceSubCat.value = '';
	btnSaveInvoiceSubCat.enabled = false;
	btnDeleteInvoiceSubCat.enabled = false;
	btnCancelInvoiceSubCat.enabled = false;
	btnSaveInvoiceSubCat.title = 'Save';
	
	InvoiceSubCatCatBtn.remove(btnDeleteInvoiceSubCat);
	btnCancelInvoiceSubCat.width = '50%';
	btnSaveInvoiceSubCat.width = '50%';
	
	for(var i = 0; i <= popupinvoicesubcattableView.data[0].rows.length-1; i++){
		popupinvoicesubcattableView.data[0].rows[i].backgroundColor = '#fff';
	}
});
// EOF Click event on Income Sub Category Cancel button

// Click event on Income Sub Category Save button
btnSaveInvoiceSubCat.addEventListener('click', function(){
	
	var newField = inptpopupInvoiceSubCat.value;
	var parentCat = invoicesubcatparentpopuppicker.getSelectedRow(0).table_id;
	// New Insert
	if(temp_cat_id_holder.text == ''){
		db.execute('INSERT INTO tbl_invoice_sub_category (invoice_sub_category, parent_category, enable) VALUES ("'+newField+'","'+parentCat+'",1)');
		var toast = Ti.UI.createNotification({
			message:"Save Successful",
			duration: Ti.UI.NOTIFICATION_DURATION_SHORT
		});
		toast.show();
	} else {
		// update	
		db.execute('UPDATE tbl_invoice_sub_category SET invoice_sub_category = "'+newField+'" WHERE id='+temp_cat_id_holder.text);
		var toast = Ti.UI.createNotification({
			message:"Update Successful",
			duration: Ti.UI.NOTIFICATION_DURATION_SHORT
		});
		toast.show();
	}
	getInvoiceSubCategorByParentId(parentCat);
	temp_cat_id_holder.text = '';
	inptpopupInvoiceSubCat.value = '';
	btnSaveInvoiceSubCat.enabled = false;
	btnDeleteInvoiceSubCat.enabled = false;
	btnCancelInvoiceSubCat.enabled = false;
	btnSaveInvoiceSubCat.title = 'Save';
	
	InvoiceSubCatCatBtn.remove(btnDeleteInvoiceSubCat);
	btnCancelInvoiceSubCat.width = '50%';
	btnSaveInvoiceSubCat.width = '50%';
});
// EOF Click event on Income Sub Category SAVE button

// Click event on Expence Sub Category DELETE button
btnDeleteInvoiceSubCat.addEventListener('click', function(){
	var sql = 'SELECT COUNT(*) AS rowcount FROM tbl_invoice WHERE sub_category_id = '+temp_cat_id_holder.text;
	var resultSet = db.execute(sql);
	if (resultSet.fieldByName('rowcount')!=0){
		var dialog1 = Ti.UI.createAlertDialog({
			title : 'Unable to Delete !',
			message : 'Category already using in invoice record.',
			ok : 'Ok',
		});
		dialog1.show();
	}else{
		// delete confirmation record
		invoiceSubCatRecordDeleteConf.show();
	}
});
// EOF Click event on Expence Sub Category DELETE button

// Delete Confirmation
invoiceSubCatRecordDeleteConf.addEventListener('click', function(e){
    if (e.index === e.source.cancel){
      	Ti.API.info('The cancel button was clicked');
    }else{
    	var rowID = temp_cat_id_holder.text;
    	db.execute('DELETE FROM tbl_invoice_sub_category WHERE id='+rowID);
    	var parentCat = invoicesubcatparentpopuppicker.getSelectedRow(0).table_id;
    	getInvoiceSubCategorByParentId(parentCat);
    	var toast = Ti.UI.createNotification({
			message:"Delete Successful",
			duration: Ti.UI.NOTIFICATION_DURATION_SHORT
		});
		toast.show();
		temp_cat_id_holder.text = '';
		inptpopupInvoiceSubCat.value = '';
		btnSaveInvoiceSubCat.enabled = false;
		btnDeleteInvoiceSubCat.enabled = false;
		btnCancelInvoiceSubCat.enabled = false;
		btnSaveInvoiceSubCat.title = 'Save';
		
		InvoiceSubCatCatBtn.remove(btnDeleteInvoiceSubCat);
		btnCancelInvoiceSubCat.width = '50%';
		btnSaveInvoiceSubCat.width = '50%';
    }
});
// EOF Delete Confirmation

// enable buttons On change in Expence sub category Text; 
inptpopupInvoiceSubCat.addEventListener('change', function(e){
	if(inptpopupInvoiceSubCat.value.length == 0 && temp_cat_id_holder.text == ''){
		btnSaveInvoiceSubCat.enabled = false;
		btnCancelInvoiceSubCat.enabled = false;
	}else if(inptpopupInvoiceSubCat.value.length == 0){
		btnSaveInvoiceSubCat.enabled = false;
	}else{
		btnCancelInvoiceSubCat.enabled = true;
		btnSaveInvoiceSubCat.enabled = true;
	}
});


function resetInvoiceSubCatListView(){
	invoicesubcatpopupcontainerView.hide();
	// remove highlited rows from sub category table rows
	// var parentSelect = invoicesubcatparentpopuppicker.getSelectedRow(0).table_id;
// 	
	// if(parentSelect != '0'){
		// for(var i = 0; i <= popupinvoicesubcattableView.data[0].rows.length-1; i++){
			// popupinvoicesubcattableView.data[0].rows[i].backgroundColor = '#fff';
		// }
	// }
	temp_cat_id_holder.text = '';
	inptpopupInvoiceSubCat.value = '';
	btnSaveInvoiceSubCat.enabled = false;
	btnDeleteInvoiceSubCat.enabled = false;
	btnCancelInvoiceSubCat.enabled = false;
	btnSaveInvoiceSubCat.title = 'Save';
	
	InvoiceSubCatCatBtn.remove(btnDeleteInvoiceSubCat);
	btnCancelInvoiceSubCat.width = '50%';
	btnSaveInvoiceSubCat.width = '50%';
	
	invoicesubcatparentpopuppicker.setSelectedRow(0, 0, false); // set default on Expence Parent Category list
}


imginvoicesubcatpopupclose.addEventListener('click', function(){
	resetInvoiceSubCatListView();
});

invoicesubcatparentpopuppicker.addEventListener('change', function(e){
	temp_cat_id_holder.text = '';
	inptpopupInvoiceSubCat.value = '';
	btnSaveInvoiceSubCat.enabled = false;
	btnDeleteInvoiceSubCat.enabled = false;
	btnCancelInvoiceSubCat.enabled = false;
	btnSaveInvoiceSubCat.title = 'Save';
	
	InvoiceSubCatCatBtn.remove(btnDeleteInvoiceSubCat);
	btnCancelInvoiceSubCat.width = '50%';
	btnSaveInvoiceSubCat.width = '50%';
	
	if(e.row.table_id == '0'){
		popupinvoicesubcattableView.setData([]);
		inptpopupInvoiceSubCat.editable = false;
	}else{
		inptpopupInvoiceSubCat.editable = true;
		var sql = 'SELECT * FROM tbl_invoice_sub_category WHERE parent_category='+e.row.table_id+' AND enable=1 AND invoice_sub_category !="General" ORDER BY invoice_sub_category COLLATE NOCASE ASC';
		var subCatRecordSet = db.execute(sql);
		var invoiceSubCatArray = [];
		var i =1;
		while(subCatRecordSet.isValidRow()){
			var rowpopupInvoiceSubCat = Ti.UI.createTableViewRow({
				className : 'forumEvent', // used to improve table performance
				backgroundSelectedColor : tablerowselectedBackgroundColor,
				rowIndex : i, // custom property, useful for determining the row during events
				height : 50,
				id:subCatRecordSet.fieldByName('id'),
			});
		
			var lblpopupInvoiceSubCatName = Ti.UI.createLabel({
				color : '#576996',
				font : {
					fontFamily : customFont,
					fontSize : stylefontsize,
				},
				text : subCatRecordSet.fieldByName('invoice_sub_category'),
				left : stylemargine,
				//right : '2%',
				top : settingdropinnermargin,
				width : '90%',
				height : '90%',
			});
			rowpopupInvoiceSubCat.add(lblpopupInvoiceSubCatName);
			invoiceSubCatArray.push(rowpopupInvoiceSubCat);
			i++;
			subCatRecordSet.next();
		}
		subCatRecordSet.close();
		popupinvoicesubcattableView.data = invoiceSubCatArray;
	}
});

btn_invoicecat.addEventListener('click', function () {
    invoicepopupview.hide();
    invoicecatpopupcontainerView.show();
});

imginvoicepopupclose.addEventListener('click', function () {
    invoicepopupview.hide();
});

btn_invoicesubcat.addEventListener('click', function () {
    invoicepopupview.hide();
    loadInvoiceSubCatParetList();
    invoicesubcatpopupcontainerView.show();
});

invoicepopupbackgroundView.addEventListener('click', function () {
    invoicepopupview.hide();
});

btn_invoice.addEventListener('click', function () {
    
    invoicepopupview.show();
});


invoicepopupview.add(invoicepopupbackgroundView);
invoicepopupview.add(invoicepopupcontainerView);


//////////////////////////////////////////////


var imgcurrency = Ti.UI.createImageView({
	image : '/images/invoice.png',
	left : styleSettingsmargine,
	width : settingImageWidth+'%',
});

var lblcurrency = Ti.UI.createLabel({
	text : 'Invoice Category',
	//width : '70%',
	color : settingsbtnfontcolor,
	left : settinglabelmargin,
	font : {
		fontFamily : customFont1,
		fontSize : stylefontsize + 2,
	},	
});

btn_invoice.add(imgcurrency);
btn_invoice.add(lblcurrency);
// --- EOF Invoice Section ---

// -- vat section ---
var btn_vat = Ti.UI.createView({
	backgroundColor : settingsbtncol,
	backgroundSelectedColor : settingsbtnselectedcol,
	left : '1%',
	right : '1%',
	top : '0.5%',
	height : settingOptionHeight,
});

var imgvat = Ti.UI.createImageView({
	image : '/images/vat.png',
	left : styleSettingsmargine,
	width : settingImageWidth + '%',
});

var lblvat = Ti.UI.createLabel({
	text : 'VAT',
	color : settingsbtnfontcolor,
	left : settinglabelmargin,
	font : {
		fontFamily : customFont1,
		fontSize : stylefontsize + 2,
	},
});

btn_vat.add(imgvat);
btn_vat.add(lblvat);

// VAT edit view
var vatpopupcontainerView = Ti.UI.createView({// Set height appropriately
	layout : 'vertical',
	width : '100%', visible: false,
	height : '100%',
	backgroundColor : '#FFF'
});

var view_vatpopuptitle = Ti.UI.createView({
	height : deviceHeight * 0.075,
	backgroundColor : '#2980B9',
});

var lblvatpopuptitle = Ti.UI.createLabel({
	text : 'VAT',
	color : '#FFFFFF',
	font : {
		fontSize : stylefontsize + 2,
		fontFamily : customFont2,
	},
});

var imgvatpopupclose = Ti.UI.createImageView({
	image : '/images/backbtn.png',
	backgroundSelectedColor : '#999999',
	width : '13%',
	left : '0%',
});

view_vatpopuptitle.add(lblvatpopuptitle);
view_vatpopuptitle.add(imgvatpopupclose);
vatpopupcontainerView.add(view_vatpopuptitle);

var vatpopupinputview = Titanium.UI.createScrollView({
	layout : 'vertical',
	//backgroundColor : 'red',
	height : deviceHeight * 0.850,
});

var vatTextView = Ti.UI.createView({
	height: deviceHeight * 0.08,
	backgroundColor : '#E3E3E3',
});
var vatInputView = Ti.UI.createView({
	height: deviceHeight * 0.08,
	backgroundColor: settingsInputBackgroundColor,
});

var lblcurrencypopuptype = Ti.UI.createLabel({
	text : 'Please enter applicable VAT %',
	font : {
		fontFamily : customFont1,
		fontSize : stylefontsize,
	},
	color : settingsbtnfontcolor,
	top : '25%',
	left : stylemargine,
});
var txtVatValue = Ti.UI.createTextField({
	bottom : '20%',
	font : {
		fontFamily : customFont1,
		fontSize : stylefontsize - 1,
	},
	color : settingsbtnfontcolor,
	left : settingdropinnermargin,
	right : settingdropinnermargin,
	borderColor : "#489CE0",
});
txtVatValue.value = toDecimalFormatWithoutCurrency(getVatValue()*1);


vatTextView.add(lblcurrencypopuptype);
vatInputView.add(txtVatValue);
vatpopupinputview.add(vatTextView);
vatpopupinputview.add(vatInputView);

var vatpopupBtnView = Ti.UI.createView({
	layout : 'vertical',
	height : deviceHeight * 0.075,
});

var btnpopupvatsave = Ti.UI.createButton({
	title : 'Save',
	textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	    backgroundColor:'#054e62',
	    backgroundSelectedColor:'#0a7390',
	    left : '0%',
	    height : '100%',
	    width: '100%',
	    	font : {
			fontSize : stylefontsize - 5,
			fontFamily : customFont1
		},
});

vatpopupBtnView.add(btnpopupvatsave);

vatpopupcontainerView.add(vatpopupinputview);
vatpopupcontainerView.add(vatpopupBtnView);
// EOF VAT edit view

btn_vat.addEventListener('click', function(){
	vatpopupcontainerView.show();
});

imgvatpopupclose.addEventListener('click', function(){
	vatpopupcontainerView.hide();
});

btnpopupvatsave.addEventListener('click', function(){
	//console.log('vat: '+getVatValue());
	var floatRex = /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/;
	var vatamount = txtVatValue.value*1;
	if(txtVatValue.value=='' || !floatRex.test(vatamount)){
		var dialog4 = Ti.UI.createAlertDialog({
				title : 'Alert',
				message : 'VAT Amount is Invalid',
				ok : 'Ok',
			});
			dialog4.show();
	}else{
		var sql = 'UPDATE tbl_option SET option_value = "'+txtVatValue.value+'" WHERE id = 2';
		db.execute(sql);
		var toast = Ti.UI.createNotification({
			message : "Update Successful",
			duration : Ti.UI.NOTIFICATION_DURATION_SHORT
		});
		toast.show();
	}
	
});
// --- EOF vat section ---

// --- Dropbox Section ---
var btn_dropbox = Ti.UI.createView({
	backgroundColor : settingsbtncol,
	backgroundSelectedColor : settingsbtnselectedcol,
	left : '1%',
	right : '1%',
	top : '0.5%',
	// height : deviceHeight * 0.11,
	height : settingOptionHeight,
});

var imgcurrency = Ti.UI.createImageView({
	image : '/images/dropbox.png',
	left : styleSettingsmargine,
	width : settingImageWidth+'%',
});

var lblcurrency = Ti.UI.createLabel({
	text : 'Dropbox Backup',
	//width : '70%',
	color : settingsbtnfontcolor,
	left : settinglabelmargin,
	font : {
		fontFamily : customFont1,
		fontSize : stylefontsize + 2,
	},	
});

btn_dropbox.add(imgcurrency);
btn_dropbox.add(lblcurrency);

var db_name = 'mywallet';
var private_dir = Ti.Filesystem.applicationDataDirectory; // data path of the phone
var app_dir = 'mywallet/backup'; // 
var private_app_dir = private_dir + app_dir; // 
var dropbox = require('dropbox');

var client = dropbox.createClient({
	app_key : 'e1kvksgtr98d2yz', // <--- you'll want to replace this
	app_secret : '2rvl6fa5kcjmal6', // <--- and this with your own keys!
	root : "mywalletapp" // optional (defaults to sandbox)
});

var db_export = function(db_name) {
	var dbPath = 'file:///data/data/' + Ti.App.getID() + '/databases';
	var dbFile = Ti.Filesystem.getFile(dbPath, db_name);
	return dbFile.read();
};

var back_up_and_upload_to_dropbox = function(raw_file) {

	var options = {
		overwrite : true, // optional
		root : "auto"
	};
	client.put(db_name + '.db', raw_file, options, function(status, reply) {
		lbl_dropbox_lbl.visible = false;
		btn_backupToDropbox.enabled = true;
		btn_restoreFromDropbox.enabled = true;
		
		var toast = Ti.UI.createNotification({
			message:"Backup Successful",
			duration: Ti.UI.NOTIFICATION_DURATION_SHORT
		});
		toast.show();
	});

};

var dropboxRestore = function() {

	var options = {
		root : "auto"
	};
	// download db from dropbox
	//client.get('test.jpg', options, function(status, reply) {
	client.get(db_name + '.db', options, function(status, reply) {

		//new db write in local
		var new_file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, db_name + '.db');
		new_file.write(reply);

		
		data_drop(db_name); // 	drop Database

		var db_file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, db_name + '.db');

		if (Ti.Database.install(db_file.getNativePath(), db_name)) {
			Ti.API.info('local db installed');
			var msg = 'Restore Successful';
			//sample();
		} else {
			var msg = 'Could Not be Restored';
		};
		lbl_dropbox_lbl.visible = false;
		btn_backupToDropbox.enabled = true;
		btn_restoreFromDropbox.enabled = true;
		
		var toast = Ti.UI.createNotification({
			message:msg,
			duration: Ti.UI.NOTIFICATION_DURATION_SHORT
		});
		toast.show();

	});

};


var sample = function() {

	var rows = db.execute('SELECT account_name  FROM tbl_account');

	Ti.API.info('Row count: ' + rows.rowCount);
	var fieldCount;
	// fieldCount is a method on iOS and a property on Android in prior versions of the SDK.
	// fieldCount is a property on all supported platforms since Release 3.3.0 of the Titanium SDK.
	if ((Ti.Platform.name === 'android') || (Ti.version >= '3.3.0')) {
		fieldCount = rows.fieldCount;
	} else {
		fieldCount = rows.fieldCount();
	}
	Ti.API.info('Field count: ' + fieldCount);

	while (rows.isValidRow()) {
		Ti.API.info('Person ---> account_name: ' + rows.fieldByName('account_name'));
		rows.next();
	}
};

var data_drop = function(db_name) {
	var db = Ti.Database.open(db_name);
	db.remove();
};

var dropboxPopupcontainerView = Ti.UI.createView({// Set height appropriately
	layout : 'vertical',
	width : '100%', visible: false,
	height : '100%',
	backgroundColor : '#FFF'
});

var view_dropboxpopuptitle = Ti.UI.createView({
	height : deviceHeight * 0.075,
	backgroundColor : '#2980B9',
});

var lbldropboxpopuptitle = Ti.UI.createLabel({
	text : 'Dropbox Backup',
	color : '#FFFFFF',
	font : {
		fontSize : stylefontsize + 2,
		fontFamily : customFont2,
	},
});

var imgdropboxpopupclose = Ti.UI.createImageView({
	image : '/images/backbtn.png',
	backgroundSelectedColor : '#999999',
	width : '13%',
	left : '0%',
});

imgdropboxpopupclose.addEventListener('click', function(){
	dropboxPopupcontainerView.hide();
});

view_dropboxpopuptitle.add(lbldropboxpopuptitle);
view_dropboxpopuptitle.add(imgdropboxpopupclose);
dropboxPopupcontainerView.add(view_dropboxpopuptitle);

var dropboxpopupinputview = Titanium.UI.createScrollView({
	layout : 'vertical',
	//backgroundColor : 'red',
	height : deviceHeight * 0.925,
});

var btn_backupToDropbox = Ti.UI.createButton({
	title : 'Backup to Dropbox',
	textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	backgroundColor:'#054e62',
	backgroundSelectedColor:'#0a7390',
	top: deviceHeight * 0.030,
	height : deviceHeight * 0.075,
	width: '80%',
	font : {
		fontSize : stylefontsize - 1,
		fontFamily : customFont
	},
	backgroundDisabledColor: '#36A4C2',
});

var btn_restoreFromDropbox = Ti.UI.createButton({
	title : 'Restore from Dropbox',
	textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	backgroundColor:'#054e62',
	backgroundSelectedColor:'#0a7390',
	backgroundDisabledColor: '#36A4C2',
	top: deviceHeight * 0.030,
	height : deviceHeight * 0.075,
	width: '80%',
	font : {
		fontSize : stylefontsize - 1,
		fontFamily : customFont
	},
});

var lbl_dropbox_lbl = Ti.UI.createLabel({
	text: 'Please Wait...',
	top: deviceHeight * 0.15, visible: false,
	font : {
		fontSize : stylefontsize+1,
		fontFamily : customFont1
	},
});

var appResoreConf = Ti.UI.createAlertDialog({
	cancel: 1,
	buttonNames: ['Yes', 'No'],
	message: 'Are you sure you want to restore?',
	title: 'Resore Confirmation?'
});
dropboxpopupinputview.add(btn_backupToDropbox);
dropboxpopupinputview.add(btn_restoreFromDropbox);
dropboxpopupinputview.add(lbl_dropbox_lbl);
dropboxPopupcontainerView.add(appResoreConf);
dropboxPopupcontainerView.add(dropboxpopupinputview);

btn_dropbox.addEventListener('click', function(){
	
	if(Ti.Network.online){
		
		if (client.isAuthorized()) {
			//console.log('Backup and restore');
			dropboxPopupcontainerView.show();
		} else {
			console.log('plz login');
			var options = {};
			client.login(function(options) {
				// win.open();
				// Ti.app.fireevet()sjdfklj
				dropboxPopupcontainerView.show();
			});
			//win.open();
		}	
		
	}else{
		var toast = Ti.UI.createNotification({
			message:"No Internet Connection",
			duration: Ti.UI.NOTIFICATION_DURATION_SHORT
		});
		toast.show();
	}
	
	/*
	console.log('Dropbox backup');
	if (client.isAuthorized()) {
		console.log('Backup and restore');
	} else {
		console.log('plz login');
		var options = {};
		client.login(function(options) {
			// win.open();
			// Ti.app.fireevet()sjdfklj
		});
		//win.open();
	}	
	*/
});

btn_backupToDropbox.addEventListener('click', function(){
	db_raw = db_export(db_name);
	btn_backupToDropbox.enabled = false;
	btn_restoreFromDropbox.enabled = false;
	lbl_dropbox_lbl.visible = true;
	back_up_and_upload_to_dropbox(db_raw);
});



btn_restoreFromDropbox.addEventListener('click', function(){
	appResoreConf.show();
	
});

appResoreConf.addEventListener('click', function(e){
		if (e.index === e.source.cancel){
      		Ti.API.info('The cancel button was clicked');
	    }else{
	    	btn_backupToDropbox.enabled = false;
			btn_restoreFromDropbox.enabled = false;
			lbl_dropbox_lbl.visible = true;
			dropboxRestore();
	    }
});

// --- EOF Dropbox ---

var btn_lockscreen = Ti.UI.createView({
	backgroundColor : settingsbtncol,
	backgroundSelectedColor : settingsbtnselectedcol,
	left : '1%',
	right : '1%',
	top : '0.5%',
	bottom : '0.5%',
	// height : deviceHeight * 0.11,
	height : settingOptionHeight,
});

var imgcurrency = Ti.UI.createImageView({
	image : '/images/lock_screen.png',
	left : styleSettingsmargine,
	width : settingImageWidth+'%',
});

var lblcurrency = Ti.UI.createLabel({
	text : 'Lock Screen',
	//width : '70%',
	color : settingsbtnfontcolor,
	left : settinglabelmargin,
	font : {
		fontFamily : customFont1,
		fontSize : stylefontsize + 2,
	},	
});

btn_lockscreen.add(imgcurrency);
btn_lockscreen.add(lblcurrency);

var view_whitespace = Ti.UI.createView({
	backgroundColor : '#EEEEEE',
	//left : '1%',
	//right : '1%',
	//top : '0.5%',
	//bottom : '0.5%',
	//height : '0.5%',
	height : '1.5%',
});

Ti.App.addEventListener('updateAccountList', function(e){
		loadAccountList();
		console.log('Updating Account List');
	});

Ti.App.addEventListener('settingsClose', function(e) {
    settingsView.hide();
    //commenting this whole block to handle insensitivity of the androif
    currencypopupcontainerView.hide();
    expencecatpopupcontainerView.hide();
    expencesubcatpopupcontainerView.hide();
    accountspopupcontainerView.hide();
    projectspopupcontainerView.hide();
    paymodespopupcontainerView.hide();
    incomecatpopupcontainerView.hide();
    incomesubcatpopupcontainerView.hide();
    customerspopupcontainerView.hide();
    invoicecatpopupcontainerView.hide();
    invoicesubcatpopupcontainerView.hide();
    vatpopupcontainerView.hide();
    invoicepopupview.hide();
	expencepopupview.hide();
	incomepopupview.hide();
	dropboxPopupcontainerView.hide();
	/*resetExpenceCatListView();
	resetExpenceSubCatListView();
	resetProjectListView();
	resetPaymodesListView();
	resetIncomeListView();
	resetIncomeSubCatListView();
	resetCustomerListView();
	resetInvoiceCatListView();
	resetInvoiceSubCatListView();*/
});

/*
settingsListView.add(btn_currency);
settingsListView.add(btn_expence);
settingsListView.add(btn_accounts);
settingsListView.add(btn_projects);
settingsListView.add(btn_paymodes);
settingsListView.add(btn_income);
settingsListView.add(btn_customers);
settingsListView.add(btn_invoice);
settingsListView.add(btn_vat);
settingsListView.add(btn_dropbox);*/

settingsListView.add(btn_accounts);
settingsListView.add(btn_currency);
settingsListView.add(btn_customers);
settingsListView.add(btn_dropbox);
settingsListView.add(btn_expence);
settingsListView.add(btn_income);
settingsListView.add(btn_invoice);
settingsListView.add(btn_paymodes);
//settingsListView.add(btn_projects);
settingsListView.add(btn_vat);

//settingsListView.add(btn_lockscreen); temperary hold
//settingsListView.add(view_whitespace);

settingsView.add(settingsListView);

// add listing views
settingsView.add(currencypopupcontainerView);
settingsView.add(expencecatpopupcontainerView);
settingsView.add(expencesubcatpopupcontainerView);
settingsView.add(accountspopupcontainerView);
settingsView.add(projectspopupcontainerView);
settingsView.add(paymodespopupcontainerView);
settingsView.add(incomecatpopupcontainerView);
settingsView.add(incomesubcatpopupcontainerView);
settingsView.add(customerspopupcontainerView);
settingsView.add(invoicecatpopupcontainerView);
settingsView.add(invoicesubcatpopupcontainerView);
settingsView.add(vatpopupcontainerView);
settingsView.add(dropboxPopupcontainerView);

// adding popup views
settingsView.add(invoicepopupview);
settingsView.add(expencepopupview);
settingsView.add(incomepopupview);

return settingsView;
};

exports.AccountListView = function() {
	var deviceHeight = Ti.Platform.displayCaps.platformHeight;
	
	var AccountListMainView = Ti.UI.createView({
		height: '100%', width: '100%',
		visible: false,
	});
	
	var AccountListView = Ti.UI.createView({
		layout : 'vertical', //visible : false,
		width : '100%',
		//top : deviceHeight * 0.075,
		//height : deviceHeight * 0.9,
		height : '100%',
		backgroundColor : '#FFF',
	});
	
	var view_title = Ti.UI.createView({
		height : deviceHeight * 0.075,
		top : '0%',
		backgroundColor : '#2980B9',
	});
	
	var lblAccountback = Ti.UI.createImageView({
		image : '/images/backbtn.png',
		backgroundSelectedColor : '#999999',
		width : '13%',
		left : '0%',
	});
	
	lblAccountback.addEventListener('click',function(){
		AccountListMainView.hide();
	});
	
	var lbltitle = Ti.UI.createLabel({
		text : 'Accounts',
		color : '#FFFFFF',
		font : {
			fontSize : stylefontsize + 4,
			fontFamily : customFont2,
		},
		width : '70%',
		right : stylemargine,
		left : '27.5%',
	});
	
	view_title.add(lblAccountback);
	view_title.add(lbltitle);
	AccountListView.add(view_title);
	
	function loadAccountList(){
		sql = 'SELECT * FROM tbl_account WHERE enable = 1 ORDER BY account_name COLLATE NOCASE ASC';
		var accResultSet = db.execute(sql);
		Ti.API.info('ACCOUNT RESULT SET : ' + JSON.stringify(accResultSet));
		var i = 0;
		var accoutDataSet = [];
		while(accResultSet.isValidRow()){
			var rowpopupaccounts = Ti.UI.createTableViewRow({
				className : 'forumEvent', // used to improve table performance
				backgroundSelectedColor : tablerowselectedBackgroundColor,
				rowIndex : i, // custom property, useful for determining the row during events
				height : 50,
				id: accResultSet.fieldByName('id'),
			});
		
			var lblpopupaccountsname = Ti.UI.createLabel({
				color : '#576996',
				font :{
					fontFamily : customFont,
					fontSize : stylefontsize,
				},
				text : accResultSet.fieldByName('account_name'),
				left : stylemargine, //width: '75%',
				top : settingdropinnermargin,
				height : '90%',
			});
			
			var editIcon = Ti.UI.createImageView({
					image : '/images/edit.png',
					height: 25, width: 25,
					right : stylemargine,
					opacity: 0.5,
			});
			
			rowpopupaccounts.add(lblpopupaccountsname);
			Ti.API.info('ARE YOU INBUILT : ' + accResultSet.fieldByName('inbuilt'));
			if(accResultSet.fieldByName('inbuilt') !== 0){
				rowpopupaccounts.add(editIcon);
			}			
			accoutDataSet.push(rowpopupaccounts);
			accResultSet.next();
			i++;
		}
		accResultSet.close();
		popupaccountstableView.data = accoutDataSet;
	}
	
	var popupaccountstableView = Ti.UI.createTableView({
		//height : deviceHeight * 0.925,
		height : deviceHeight * 0.850, 
		separatorColor : settingstableseparatorcolor,
	});
	loadAccountList();
	AccountListView.add(popupaccountstableView);
	
	var accountBtn = Ti.UI.createView({
		height : deviceHeight * 0.075,  // **************
		backgroundColor : '#054e62',
	});
	
	var btnaddNewAccount = Titanium.UI.createButton({
	    title:'Add New',
	    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	    backgroundColor:'#054e62',
	    backgroundSelectedColor:'#0a7390',
	    left : '0%',
	    height : '100%',
	    width: '100%',
	    	font : {
			fontSize : stylefontsize - 3,
			fontFamily : customFont1
		},
	});
	accountBtn.add(btnaddNewAccount);
	AccountListView.add(accountBtn);
	
	btnaddNewAccount.addEventListener('click', function(){
		var objCreateaccountView = require('createaccount');
		var createaccountView = objCreateaccountView.createaccountRecord();
		AccountListMainView.add(createaccountView);
		createaccountView.show();
		addAccountViewOpen = true;
	});
	
	Ti.App.addEventListener('accountListViewClose', function(e){
		AccountListMainView.hide();
	});
	
	Ti.App.addEventListener('updateAccountList', function(e){
		loadAccountList();
		console.log('Updating Account List');
	});
	
	popupaccountstableView.addEventListener('click',function(e){
		var objEditAccount = require('createaccount');
		objEditAccount.setAccountData(e.row.id);
		var editAccountView = objEditAccount.createaccountRecord();
		AccountListMainView.add(editAccountView);
		editAccountView.show();
	});
	AccountListMainView.add(AccountListView);
	
	return AccountListMainView;
};
