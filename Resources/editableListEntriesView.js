exports.editablelistentries = function(subTitle) {
	
	//var deviceHeight = Ti.Platform.displayCaps.platformHeight;

	var logicalDesityFactor = Ti.Platform.displayCaps.logicalDensityFactor * 1;

	var ex_height = Titanium.Platform.displayCaps.platformHeight * 1;
	var ex_width = Ti.Platform.displayCaps.platformWidth * 1;
	if (ex_height > ex_width) {
		var deviceHeight = ((Titanium.Platform.displayCaps.platformHeight * 1) / logicalDesityFactor);
	} else {
		var deviceHeight = ((Titanium.Platform.displayCaps.platformWidth * 1) / logicalDesityFactor);
	}
	
	var activeAccountId = null;

	var editablelistentriespopupcontainerView = Ti.UI.createView({// Set height appropriately
		//layout : 'vertical',
		visible : false,
		width : '100%',
		height : '100%',
		backgroundColor : '#ffffff',
	});

	var view_editablelistentriespopuptitle = Ti.UI.createView({
		height : deviceHeight * 0.075,
		top : 0,
		backgroundColor : '#2980B9',
	});

	var lbleditablelistentriespopuptitle = Ti.UI.createLabel({
		text : 'View Entries',
		color : '#FFFFFF',
		font : {
			fontSize : stylefontsize + 2,
			fontFamily : customFont2,
		},
	});
	
	if(subTitle){
		var appendingSubTitle;
		if (subTitle == 1){
			appendingSubTitle = 'Expenses';
		} else if (subTitle == 2){
			appendingSubTitle = 'Income';
		} else if (subTitle == 3){
			appendingSubTitle = 'Invoices';
		}
		lbleditablelistentriespopuptitle.text = lbleditablelistentriespopuptitle.text + ' - ' + appendingSubTitle;
	}

	var imgeditablelistentriespopupclose = Ti.UI.createImageView({
		image : '/images/backbtn.png',
		backgroundSelectedColor : '#999999',
		width : '13%',
		left : '0%',
	});

	view_editablelistentriespopuptitle.add(lbleditablelistentriespopuptitle);
	view_editablelistentriespopuptitle.add(imgeditablelistentriespopupclose);
	editablelistentriespopupcontainerView.add(view_editablelistentriespopuptitle);

	/*var editablelistentriespopupinputview = Titanium.UI.createScrollView({
	height : deviceHeight * 0.925,
	top : deviceHeight * 0.150,
	showVerticalScrollIndicator : true,
	//backgroundColor : 'red',
	});*/

	/////////////////////////////////////////////////////////////////////////////////////////////////////
	
	//# account filter view
	
	var accountSelectView = Ti.UI.createView({
		height : deviceHeight * 0.075,
		top : deviceHeight * 0.075,
		backgroundColor : '#E3E3E3',
	});
	
	var accountSelectView_lblview = Ti.UI.createView({
		height : '100%',
		width : '50%',
		left : 0,
	});
	var accountSelectView_selectView = Ti.UI.createView({
		height : '100%',
		width : '50%',
		right : 0,
		backgroundColor : settingsbtnfontcolor,
	});

	var accountSelect_label = Ti.UI.createLabel({
		text : 'Select Account',
		left : stylemargine,
		font : {
			fontFamily : customFont1,
			fontSize : stylefontsize,
		},
		color : settingsbtnfontcolor,
		//top : '15%',
	});

	// Create a Picker.
	var accountSelectView_picker = Ti.UI.createPicker({
		right : 0,
		width : '100%',

		font : {
			fontFamily : customFont1,
			fontSize : stylefontsize - 2,
		},
		color : '#111111',
		height : '100%',
		
	});
	
	var accountSelectData = [];
	
	loadAccountList();
	
	function loadAccountList(){
		
		activeAccountId = null;
		
		accountSelectData[0] = Ti.UI.createPickerRow({
			title : 'All',
			account_id : null,
			custom_item : subTitle
		});
		
		sql = 'SELECT * FROM tbl_account WHERE enable = 1 ORDER BY account_name COLLATE NOCASE ASC';
		var accResultSet = db.execute(sql);
		var i = 1;
		
		while(accResultSet.isValidRow()){
			Ti.API.info('ACCOUNT ID '+i+' :'+accResultSet.fieldByName('id'));
			accountSelectData[i] = Ti.UI.createPickerRow({
				title : accResultSet.fieldByName('account_name'),
				account_id : accResultSet.fieldByName('id'),
				custom_item : subTitle
			});
			accResultSet.next();
			i++;
		}
		
		accResultSet.close();
			
	}
	
	accountSelectView_picker.add(accountSelectData);
	
	accountSelectView_lblview.add(accountSelect_label);
	accountSelectView_selectView.add(accountSelectView_picker);
	
	accountSelectView.add(accountSelectView_lblview);
	accountSelectView.add(accountSelectView_selectView);
	
	if(subTitle != 3){ // if selected view is not an invoice view
		editablelistentriespopupcontainerView.add(accountSelectView);
		//entryViewList.top = deviceHeight * 0.075 * 1;
	} else {
		//entryViewList.top = deviceHeight * 0.075 * 2;
	}
	
	accountSelectView_picker.addEventListener('change', function(e) {
		activeAccountId = e.row.account_id;
		Ti.API.info('ACCOUNT ID CHANGED TO : ' + activeAccountId);
		Ti.API.info('CUSTOM ID CHANGED TO : ' + e.row.custom_item);
		switch(e.row.custom_item) {
			case 1 :
				getExpenseEntries(e.row.account_id);
				break;
			case 2 :
				getIncomeEntries(e.row.account_id);
				break;
			case 3 :
				getInvoiceEntries();
				break;
		}
	});
	
	//# end of account filter view


	// --- category select view
	var entryViewCatSelect = Ti.UI.createView({
		height : deviceHeight * 0.075,
		top : deviceHeight * 0.075,
		backgroundColor : '#E3E3E3',
	});

	var entryView_lblview = Ti.UI.createView({
		height : '100%',
		width : '50%',
		left : 0,
	});
	var entryView_cat_selectView = Ti.UI.createView({
		height : '100%',
		width : '50%',
		right : 0,
		backgroundColor : settingsbtnfontcolor,
	});

	var entryView_lbl_select_cat = Ti.UI.createLabel({
		text : 'Select Category',
		left : stylemargine,
		font : {
			fontFamily : customFont1,
			fontSize : stylefontsize,
		},
		color : settingsbtnfontcolor,

		//top : '15%',
	});

	// Create a Picker.
	var entryView_cat_select = Ti.UI.createPicker({

		right : 0,
		width : '100%',
		//zIndex:20000,
		font : {
			fontFamily : customFont1,
			fontSize : stylefontsize - 2,
		},
		color : '#111111',
		height : '100%',
	});

	// Add data to the Picker.
	var entryCategoryTypedata = [];
	entryCategoryTypedata[0] = Ti.UI.createPickerRow({
		title : 'Please Selects',
		custom_item : '0'
	});
	entryCategoryTypedata[1] = Ti.UI.createPickerRow({
		title : 'Expence',
		custom_item : '1'
	});
	entryCategoryTypedata[2] = Ti.UI.createPickerRow({
		title : 'Income',
		custom_item : '2'
	});
	//entryCategoryTypedata[3] = Ti.UI.createPickerRow({title:'Account', custom_item:'3'});
	entryCategoryTypedata[3] = Ti.UI.createPickerRow({
		title : 'Invoices',
		custom_item : '3'
	});
	entryView_cat_select.add(entryCategoryTypedata);

	// Add to the parent view.

	entryView_lblview.add(entryView_lbl_select_cat);
	entryView_cat_selectView.add(entryView_cat_select);

	entryViewCatSelect.add(entryView_lblview);
	entryViewCatSelect.add(entryView_cat_selectView);
	//editablelistentriespopupcontainerView.add(entryViewCatSelect);
	//entryViewCatSelect.hide();
	// -- EOF category select view

	// --- Entries list veiw
	var entryViewList = Ti.UI.createView({
		top : (subTitle != 3) ? deviceHeight * 0.075 * 2 : deviceHeight * 0.075 * 1, // { // if selected view is not an invoice view ,
		contentWidth : 'auto',
		contentHeight : 'auto',
		backgroundColor : '#EEEEEE',
		height : Ti.UI.FILL,//deviceHeight * 0.850,
		width : '100%',
		layout : 'vertical',
		font : {
			fontFamily : customFont
		},
	});

	var entryEditListTable = Ti.UI.createTableView({
		height : '100%'
	});
	entryViewList.add(entryEditListTable);
	editablelistentriespopupcontainerView.add(entryViewList);

	// Listen for change events.
	entryView_cat_select.addEventListener('change', function(e) {
		//alert('You selected: row:' + e.row.title + ', column: ' + e.column + ', custom_item: ' + e.row.custom_item);
		switch(e.row.custom_item) {
		case '0' :
			entryEditListTable.setData([]);
			break;
		case '1' :
			getExpenseEntries();
			break;
		case '2' :
			getIncomeEntries();
			break;
		case '3' :
			getInvoiceEntries();
			break;
		}
	});

	function getExpenseEntries(account_id) {
		var sql;		
		if(account_id == null || account_id == undefined){
			Ti.API.info('TEST 1');
			sql = 'SELECT * FROM tbl_expence ORDER by date(payment_date) DESC, id DESC';
		} else {
			Ti.API.info('TEST 2');
			sql = "SELECT * FROM tbl_expence WHERE account_id = '" + account_id + "' ORDER by date(payment_date) DESC, id DESC";
		}
		var resultSet = db.execute(sql);

		var expenceArray = [];
		var i = 1;
		//var recProject;
		while (resultSet.isValidRow()) {

			//console.log('sub_category_id ' + resultSet.fieldByName('sub_category_id'));
			var recCategory = db.execute('SELECT * FROM tbl_expence_category WHERE id=' + resultSet.fieldByName('category_id'));
			var recSubCategory = db.execute('SELECT * FROM tbl_expence_sub_category WHERE id=' + resultSet.fieldByName('sub_category_id'));
			//var recPayMode = db.execute('SELECT * FROM tbl_payment_mode WHERE id='+resultSet.fieldByName('payment_mode_id'));
			var recAccount = db.execute('SELECT * FROM tbl_account WHERE id=' + resultSet.fieldByName('account_id'));
			//var recProject = db.execute('SELECT * FROM tbl_project WHERE id=' + resultSet.fieldByName('project_id'));
			var recProject = resultSet.fieldByName('project_id');
			var row = Ti.UI.createTableViewRow({
				className : 'forumEvent', // used to improve table performance
				backgroundColor : 'white',
				rowIndex : i, // custom property, useful for determining the row during events
				height : '50dp',
				id : resultSet.fieldByName('id'),
				// textEntry: 'expense',
				font : {
					fontFamily : customFont
				},
			});
			var labelday = Ti.UI.createLabel({
				id : resultSet.fieldByName('id'),
				//// textEntry: 'expense',
				color : '#576996',
				text : changeDateView(resultSet.fieldByName('payment_date')),
				left : styleSettingsmargine,
				top : '4dp',
				width : '25%', //height: '10%',
				textAlign : 'left',
				font : {
					fontFamily : customFont
				},
			});
			var labelProjectName = Ti.UI.createLabel({
				color : '#2B2B2B',
				//text : (resultSet.fieldByName('project_id') !== 0) ? recProject.fieldByName('project_name') : '',
				text : (resultSet.fieldByName('project_id') !== 0) ? recProject : '',
				//left : '33%',
				left : styleSettingsmargine, //switched placement to column 1 from column 2
				top : '50%',
				width : '40%',
				font : {
					fontFamily : customFont
				},
			});
			var labelCategory = Ti.UI.createLabel({
				id : resultSet.fieldByName('id'),
				//// textEntry: 'expense',
				color : '#222',
				text : recCategory.fieldByName('expence_category'),
				left : '33%',
				top : '10%',
				width : '40%',
				font : {
					fontFamily : customFont1
				},
			});

			var labelSubCategory = Ti.UI.createLabel({
				id : resultSet.fieldByName('id'),
				//// textEntry: 'expense',
				color : '#2B2B2B',
				text : (resultSet.fieldByName('sub_category_id') == 0) ? '' : recSubCategory.fieldByName('expence_sub_category'),
				left : '33%',
				top : '50%',
				width : '40%',
				font : {
					fontFamily : customFont
				},
			});
			var labelAmount = Ti.UI.createLabel({
				id : resultSet.fieldByName('id'),
				//// textEntry: 'expense',
				text : toDecimalFormatView(resultSet.fieldByName('total_amount')),
				textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
				right : styleSettingsmargine,
				top : '4dp',
				width : '38%',
				color : '#222',
				font : {
					fontFamily : customFont2
				},
			});
			var labelAccount = Ti.UI.createLabel({
				id : resultSet.fieldByName('id'),
				//// textEntry: 'expense',
				color : '#2B2B2B',
				textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
				text : recAccount.fieldByName('short_code'),
				right : styleSettingsmargine,
				top : '50%',
				width : '38%',
				font : {
					fontFamily : customFont,
					fontSize : stylefontsize - 8,
				},
			});

			row.add(labelday);
			row.add(labelProjectName);
			row.add(labelCategory);
			row.add(labelSubCategory);
			row.add(labelAmount);
			row.add(labelAccount);
			expenceArray.push(row);
			i++;
			resultSet.next();
			// to next index

		}
		resultSet.close();
		// close the Array
		entryEditListTable.data = expenceArray;

	}

	function getIncomeEntries(account_id) {
		
		var sql;
				
		if(account_id == null || account_id == undefined){
			//Ti.API.info('TEST 1X1X');
			sql = 'SELECT * FROM tbl_income ORDER by date(payment_date) DESC, id DESC';
		} else {
			//Ti.API.info('TEST 22');
			sql = "SELECT * FROM tbl_income WHERE account_id = '" + account_id + "' ORDER by date(payment_date) DESC, id DESC";
		}
		var resultSet = db.execute(sql);
		//Ti.API.info('TEST Q');
		var incomeArray = [];
		var i = 1;
		while (resultSet.isValidRow()) {
			Ti.API.info('TEST W');
			var isInvoice = (resultSet.fieldByName('invoice_no') == '' || resultSet.fieldByName('invoice_no') == undefined) ? false : true;
			var recCategory = db.execute('SELECT * FROM tbl_income_category WHERE id=' + resultSet.fieldByName('category_id'));
			var recSubCategory = db.execute('SELECT * FROM tbl_income_sub_category WHERE id=' + resultSet.fieldByName('sub_category_id'));
			var recAccount = db.execute('SELECT * FROM tbl_account WHERE id=' + resultSet.fieldByName('account_id'));
			//var recProject = db.execute('SELECT * FROM tbl_project WHERE id=' + resultSet.fieldByName('project_id'));
			var recProject = resultSet.fieldByName('project_id');
			var row = Ti.UI.createTableViewRow({
				className : 'forumEvent', // used to improve table performance
				backgroundColor : 'white',
				rowIndex : i, // custom property, useful for determining the row during events
				height : '50dp',
				id : resultSet.fieldByName('id'),
				// textEntry: 'income',
				font : {
					fontFamily : customFont
				},
			});
			Ti.API.info('TEST E');
			var labelday = Ti.UI.createLabel({
				id : resultSet.fieldByName('id'),
				// textEntry: 'income',
				color : '#576996',
				text : changeDateView(resultSet.fieldByName('payment_date')),
				left : styleSettingsmargine,
				top : '4dp',
				width : '25%', //height: '10%',
				textAlign : 'left',
				font : {
					fontFamily : customFont
				},
			});
			Ti.API.info('PROJECT ID : ' + resultSet.fieldByName('project_id'));
			var labelProjectName = Ti.UI.createLabel({
				color : '#2B2B2B',
				//text : (resultSet.fieldByName('project_id') !== 0) ? recProject.fieldByName('project_name') : '',
				text : resultSet.fieldByName('project_id'),
				//left : '33%',
				left : styleSettingsmargine, //switched placement to column 1 from column 2
				top : '50%',
				width : '40%',
				font : {
					fontFamily : customFont
				},
			});
			var labelCategory = Ti.UI.createLabel({
				id : resultSet.fieldByName('id'),
				// textEntry: 'income',
				color : '#222',
				text : (isInvoice == true) ? 'Invoice' : recCategory.fieldByName('income_category'),
				left : '33%',
				top : '10%',
				width : '40%',
				font : {
					fontFamily : customFont1
				},
			});
			var labelSubCategory = Ti.UI.createLabel({
				id : resultSet.fieldByName('id'),
				// textEntry: 'income',
				color : '#2B2B2B',
				text : (isInvoice == true) ? resultSet.fieldByName('invoice_no') : recSubCategory.fieldByName('income_sub_category'),
				left : '33%',
				top : '50%',
				width : '40%',
				font : {
					fontFamily : customFont
				},
			});
			
			Ti.API.info('!!!TOTAL AMOUNT!!! : ' + resultSet.fieldByName('total_amount'));
			
			var labelAmount = Ti.UI.createLabel({
				id : resultSet.fieldByName('id'),
				// textEntry: 'income',
				text : toDecimalFormatView(resultSet.fieldByName('total_amount')),
				textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
				right : styleSettingsmargine,
				top : '4dp',
				width : '38%',
				color : '#222',
				font : {
					fontFamily : customFont2
				},
			});
			var labelAccount = Ti.UI.createLabel({
				id : resultSet.fieldByName('id'),
				// textEntry: 'income',
				color : '#2B2B2B',
				textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
				text : recAccount.fieldByName('short_code'),
				right : styleSettingsmargine,
				top : '50%',
				width : '38%',
				font : {
					fontFamily : customFont,
					fontSize : stylefontsize - 8,
				},
			});

			row.add(labelday);
			row.add(labelProjectName);
			row.add(labelCategory);
			row.add(labelSubCategory);
			row.add(labelAmount);
			row.add(labelAccount);
			incomeArray.push(row);
			i++;
			resultSet.next();
			// to next index

		}
		resultSet.close();
		// close the Array
		entryEditListTable.data = incomeArray;
	}

	function getInvoiceEntries() {
		var sql = 'SELECT * FROM tbl_invoice WHERE isDeleted = "0" ORDER by date(invoice_date) DESC, id DESC';
		var resultSet = db.execute(sql);

		var invoiceArray = [];
		var i = 1;
		while (resultSet.isValidRow()) {
			var recCustomer = db.execute('SELECT * FROM tbl_customer WHERE id=' + resultSet.fieldByName('customer_id'));
			var row = Ti.UI.createTableViewRow({
				id : resultSet.fieldByName('id'),
				// textEntry: 'invoice',
				className : 'forumEvent', // used to improve table performance
				backgroundColor : 'white',
				rowIndex : i, // custom property, useful for determining the row during events
				height : '50dp',
				font : {
					fontFamily : customFont
				},
				isDeleted : resultSet.fieldByName('isDeleted')
			});
			var labelday = Ti.UI.createLabel({
				id : resultSet.fieldByName('id'),
				// textEntry: 'invoice',
				color : '#576996',
				text : changeDateView(resultSet.fieldByName('invoice_date')),
				left : styleSettingsmargine,
				top : '4dp',
				width : '25%', //height: '10%',
				textAlign : 'left',
				font : {
					fontFamily : customFont
				},
			});
			var labelCustomerName = Ti.UI.createLabel({
				id : resultSet.fieldByName('id'),
				// textEntry: 'invoice',
				color : '#222',
				text : (resultSet.fieldByName('isDeleted') == 1) ? 'Deleted' : recCustomer.fieldByName('full_name'),
				left : '33%',
				top : '10%',
				width : '40%',
				font : {
					fontFamily : customFont1
				},
			});
			var labelInvoiceNumber = Ti.UI.createLabel({
				id : resultSet.fieldByName('id'),
				// textEntry: 'invoice',
				color : '#2B2B2B',
				text : resultSet.fieldByName('invoice_no'),
				left : styleSettingsmargine, //'33%',
				top : '50%',
				width : '40%',
				font : {
					fontFamily : customFont
				},
			});
			var labelAmount = Ti.UI.createLabel({
				id : resultSet.fieldByName('id'),
				// textEntry: 'invoice',
				text : toDecimalFormatView(resultSet.fieldByName('total_amount')),
				textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
				right : styleSettingsmargine,
				top : '4dp',
				width : '38%',
				color : '#222',
				font : {
					fontFamily : customFont2
				},
			});
			//var paid = ((resultSet.fieldByName('short_code') == 1)?'Paid':'Unpaid';
			var labelPaid = Ti.UI.createLabel({
				id : resultSet.fieldByName('id'),
				// textEntry: 'invoice',
				color : '#2B2B2B',
				textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
				text : (resultSet.fieldByName('paid') == 1 ? 'Paid' : 'Unpaid'),
				right : styleSettingsmargine,
				top : '50%',
				width : '38%',
				font : {
					fontFamily : customFont,
					fontSize : stylefontsize - 8,
				},
			});
			
			if(resultSet.fieldByName('isCreditNote') == '1'){
				labelPaid.text = 'Credit Note';
				labelAmount.text = toNegativeDecimalFormatView(resultSet.fieldByName('total_amount'));
			}

			row.add(labelday);
			row.add(labelCustomerName);
			row.add(labelInvoiceNumber);
			row.add(labelAmount);
			row.add(labelPaid);
			invoiceArray.push(row);
			i++;
			resultSet.next();
			// to next index

		}
		resultSet.close();
		// close the Array
		entryEditListTable.data = invoiceArray;
	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////

	imgeditablelistentriespopupclose.addEventListener('click', function() {
		editablelistentriespopupcontainerView.hide();
		entryView_cat_select.setSelectedRow(0, 0, false);
	});

	Ti.App.addEventListener('viewEntriesClose', function(e) {
		editablelistentriespopupcontainerView.hide();
		entryView_cat_select.setSelectedRow(0, 0, false);
	});

	Ti.App.addEventListener('refrishEditView', function(e) {
		var selectValue = subTitle;
		Ti.API.info('REFRESHING EDIT VIEW : ' + subTitle);
		//var selectValue = entryView_cat_select.getSelectedRow(0).custom_item;
		switch(selectValue) {
		case '0' :
			entryEditListTable.setData([]);
			break;
		case 1 :
			Ti.API.info('What is the selected Account : ' + activeAccountId);
			getExpenseEntries(activeAccountId);
			break;
		case 2 :
			Ti.API.info('What is the selected Account : ' + activeAccountId);
			getIncomeEntries(activeAccountId);
			break;
		case 3 :
			getInvoiceEntries();
			break;
		}
	});
	//editablelistentriespopupcontainerView.add(editablelistentriespopupinputview);

	entryEditListTable.addEventListener('click', function(e) {
		var selectValue = subTitle;
		//var selectValue = entryView_cat_select.getSelectedRow(0).custom_item;
		if (selectValue == 1) {// expence data set

			var objEditNewExpence = require('addexpense');
			objEditNewExpence.setExpenceData(e.row.id, 'View');
			var editExpenceView = objEditNewExpence.addExpenceView();
			editablelistentriespopupcontainerView.add(editExpenceView);
			editExpenceView.show();
			Ti.App.Properties.setBool('editExpenseViewOpen', true);

		} else if (selectValue == 2) {// income data set

			var expenceDataSet = db.execute('SELECT count(invoice_no) as invoicenocount FROM tbl_income WHERE id=' + e.row.id);
			var invoiceNoCount = expenceDataSet.fieldByName('invoicenocount');
			
			if (invoiceNoCount == 0) {

				var editIncome = require('addOtherIncome');
				editIncome.setIncomeData(e.row.id, 'View', 2);
				var newEditIncomeView = editIncome.addIncome();
				editablelistentriespopupcontainerView.add(newEditIncomeView);
				newEditIncomeView.show();
				Ti.App.Properties.setBool('editAdhocIncomeViewOpen', true);

			} else {
				
				var editIncome = require('addOtherIncome');
				editIncome.setIncomeData(e.row.id, 'View', 1);
				var newEditIncomeView = editIncome.addIncome();
				editablelistentriespopupcontainerView.add(newEditIncomeView);
				newEditIncomeView.show();
				Ti.App.Properties.setBool('editAdhocIncomeViewOpen', true);
				
			}

		} else if (selectValue == 3) {// Invoice data set
			
			if(e.row.isDeleted == 1){
				var alertBoxDeletedRecord = Ti.UI.createAlertDialog({
					buttonNames : ['OK'],
					message : 'This record has been deleted and cannot be viewed.',
					title : 'Deleted Record'
				});
				alertBoxDeletedRecord.show();				
			} else {
				console.log("invoice Data set");
				var objCreateInvoiceView = require('createInvoice');
				//#
				var editInvoiceView;
				objCreateInvoiceView.setInvoiceData(e.row.id, 'View');
				Ti.API.info('TSK TSK TSK : ' + JSON.stringify(e.row.children[4].text));
				if(e.row.children[4].text === 'Credit Note'){
					editInvoiceView = objCreateInvoiceView.createinvoiceRecord(true);
				} else {
					editInvoiceView = objCreateInvoiceView.createinvoiceRecord(false);
				}
				//objCreateInvoiceView.setInvoiceData(e.row.id);
				//var editInvoiceView = objCreateInvoiceView.createinvoiceRecord(); //#
				editablelistentriespopupcontainerView.add(editInvoiceView);
				editInvoiceView.show();
				Ti.App.Properties.setBool('editInvoiceViewOpen', true);
			}
		}

		//console.log('invoice_datessss');
		//console.log('table id: ' + e.row.id);
	});

	function changeDateView(dateObj) {

		//console.log('dateObj1 : '+dateObj);
		dateObj = new Date(dateObj);
		//dateObj = getDate();
		//console.log('dateObj2 : '+dateObj);
		var pickerDate = (dateObj.getDate() < 10) ? '0' + dateObj.getDate() : dateObj.getDate();
		var pickerMonth = (dateObj.getMonth() + 1) < 10 ? '0' + (dateObj.getMonth() + 1) : dateObj.getMonth() + 1;
		var pickerYear = dateObj.getFullYear();
		//console.log(pickerDate + '-' + pickerMonth + '-' + pickerYear);
		//selectedDate = pickerYear + '-' + pickerMonth + '-' + pickerDate;
		selectedDate = pickerDate + '/' + pickerMonth + '/' + pickerYear;
		return selectedDate;

	}


	editablelistentriespopupcontainerView.update = function(itemIndex) {

		switch(itemIndex) {
		case 1 :
			getExpenseEntries(activeAccountId);
			break;
		case 2 :
			getIncomeEntries(activeAccountId);
			break;
		case 3 :
			getInvoiceEntries();
			break;
		}

		entryView_cat_select.setSelectedRow(0, itemIndex, false);
	};

	return editablelistentriespopupcontainerView;
};
