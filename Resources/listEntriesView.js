// Unused code

exports.listEntriesView = function(subTitle) {

	var entryView = Ti.UI.createView({
		height : '100%',
		width : '100%',
		visible : false,
		backgroundColor : '#ffffff',
	});
	var entryView_title = Ti.UI.createView({
		height : deviceHeight * 0.075,
		top : '0%',
		backgroundColor : '#2980B9',
	});

	var entryView_lblback = Ti.UI.createImageView({
		image : '/images/backbtn.png',
		backgroundSelectedColor : '#999999',
		width : '13%',
		left : '0%',
	});

	entryView_lblback.addEventListener('click', function() {
		entryView.hide();
		entryView_cat_select.setSelectedRow(0, 0, false);
		// set default on Expence Parent Category list
	});

	Ti.App.addEventListener('viewEntriesClose', function(e) {
		entryView.hide();
		entryView_cat_select.setSelectedRow(0, 0, false);
	});

	var entryView_lbltitle = Ti.UI.createLabel({
		text : 'View Entries',
		color : '#FFFFFF',
		font : {
			fontSize : stylefontsize + 4,
			fontFamily : customFont2,
		},
	});

	if (subTitle) {
		var appendingSubTitle;
		if (subTitle == 1) {
			appendingSubTitle = 'Expenses';
		} else if (subTitle == 2) {
			appendingSubTitle = 'Income';
		} else if (subTitle == 3) {
			appendingSubTitle = 'Invoices';
		}
		entryView_lbltitle.text = entryView_lbltitle.text + ' - ' + appendingSubTitle;
	}

	entryView_title.add(entryView_lblback);
	entryView_title.add(entryView_lbltitle);
	entryView.add(entryView_title);
	// --- End of title view
	
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
		
		accountSelectData[0] = Ti.UI.createPickerRow({
			title : 'All',
			account_id : null,
			custom_item : subTitle
		});
		
		sql = 'SELECT * FROM tbl_account WHERE enable = 1 ORDER BY account_name COLLATE NOCASE ASC';
		var accResultSet = db.execute(sql);
		var i = 1;
		
		while(accResultSet.isValidRow()){
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
		entryView.add(accountSelectView);
		//entryViewList.top = deviceHeight * 0.075 * 1;
	} else {
		//entryViewList.top = deviceHeight * 0.075 * 2;
	}
	
	accountSelectView_picker.addEventListener('change', function(e) {
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
		title : 'Please Select',
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
	//entryView.add(entryViewCatSelect);
	//entryViewCatSelect.hide();
	// -- EOF category select view

	// --- Entries list veiw
	var entryViewList = Ti.UI.createView({
		top : (subTitle != 3) ? deviceHeight * 0.075 * 2 : deviceHeight * 0.075 * 1, // { // if selected view is not an invoice view ,
		contentWidth : 'auto',
		contentHeight : 'auto',
		backgroundColor : '#EEEEEE',
		height : Ti.UI.FILL, //deviceHeight * 0.850,
		width : '100%',
		layout : 'vertical',
		font : {
			fontFamily : customFont
		},
	});

	var entryListTable = Ti.UI.createTableView({
		height : '100%'
	});
	entryViewList.add(entryListTable);
	entryView.add(entryViewList);

	// Listen for change events.
	entryView_cat_select.addEventListener('change', function(e) {
		//alert('You selected: row:' + e.row.title + ', column: ' + e.column + ', custom_item: ' + e.row.custom_item);
		switch(e.row.custom_item) {
		case '0' :
			entryListTable.setData([]);
			break;
		case '1' :
			getExpenseEntries();
			break;
		case '2' :
			getIncomeEntries();
			break;
		//	case '3' :
		//		alert('3');
		//		break;
		case '3' :
			getInvoiceEntries();
			break;
		}
	});

	function getExpenseEntries(account_id) {
		
		var sql;
		
		if(account_id == null || account_id == undefined){
			Ti.API.info('TEST 2');
			sql = 'SELECT * FROM tbl_expence ORDER by date(payment_date) DESC, id DESC';
		} else {
			Ti.API.info('TEST 3');
			sql = "SELECT * FROM tbl_expence WHERE account_id = '" + account_id + "' ORDER by date(payment_date) DESC, id DESC";
		}
		var resultSet = db.execute(sql);
		
		Ti.API.info('RESULT SET' + JSON.stringify(resultSet));

		var expenceArray = [];
		var i = 1;
		while (resultSet.isValidRow()) {
			var recCategory = db.execute('SELECT * FROM tbl_expence_category WHERE id=' + resultSet.fieldByName('category_id'));
			var recSubCategory = db.execute('SELECT * FROM tbl_expence_sub_category WHERE id=' + resultSet.fieldByName('sub_category_id'));
			var recPayMode = db.execute('SELECT * FROM tbl_payment_mode WHERE id=' + resultSet.fieldByName('payment_mode_id'));
			var recAccount = db.execute('SELECT * FROM tbl_account WHERE id=' + resultSet.fieldByName('account_id'));
			var recProject = db.execute('SELECT * FROM tbl_project WHERE id=' + resultSet.fieldByName('project_id'));
			var row = Ti.UI.createTableViewRow({
				className : 'forumEvent', // used to improve table performance
				backgroundColor : 'white',
				rowIndex : i, // custom property, useful for determining the row during events
				height : '50dp',
				id : resultSet.fieldByName('id'),
				font : {
					fontFamily : customFont
				},
			});
			var labelday = Ti.UI.createLabel({
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
			
			Ti.API.info('recProject : ' + JSON.stringify(recProject));
			
			var labelProjectName = Ti.UI.createLabel({
				color : '#2B2B2B',
				text : (resultSet.fieldByName('project_id') !== 0) ? recProject.fieldByName('project_name') : '',
				//left : '33%',
				left : styleSettingsmargine, //switched placement to column 1 from column 2
				top : '50%',
				width : '40%',
				font : {
					fontFamily : customFont
				},
			});
			
			var labelCategory = Ti.UI.createLabel({
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
				color : '#2B2B2B',
				text : recSubCategory.fieldByName('expence_sub_category'),
				left : '33%',
				top : '50%',
				width : '40%',
				font : {
					fontFamily : customFont
				},
			});
			var labelAmount = Ti.UI.createLabel({
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
		entryListTable.data = expenceArray;

	}

	function getIncomeEntries(account_id) {
		var sql;
		
		if(account_id == null || account_id == undefined){
			Ti.API.info('TEST 2');
			sql = 'SELECT * FROM tbl_income ORDER by date(payment_date) DESC, id DESC';
		} else {
			Ti.API.info('TEST 3');
			sql = "SELECT * FROM tbl_income WHERE account_id = '" + account_id + "' ORDER by date(payment_date) DESC, id DESC";
		}
		
		var resultSet = db.execute(sql);

		var incomeArray = [];
		var i = 1;
		while (resultSet.isValidRow()) {
			var isInvoice = (resultSet.fieldByName('invoice_no') == '' || resultSet.fieldByName('invoice_no') == undefined) ? false : true;
			var recCategory = db.execute('SELECT * FROM tbl_income_category WHERE id=' + resultSet.fieldByName('category_id'));
			var recSubCategory = db.execute('SELECT * FROM tbl_income_sub_category WHERE id=' + resultSet.fieldByName('sub_category_id'));
			var recAccount = db.execute('SELECT * FROM tbl_account WHERE id=' + resultSet.fieldByName('account_id'));
			var recProject = db.execute('SELECT * FROM tbl_project WHERE id=' + resultSet.fieldByName('project_id'));
			var row = Ti.UI.createTableViewRow({
				className : 'forumEvent', // used to improve table performance
				backgroundColor : 'white',
				rowIndex : i, // custom property, useful for determining the row during events
				height : '50dp',
				id : resultSet.fieldByName('id'),
				font : {
					fontFamily : customFont
				},
			});
			var labelday = Ti.UI.createLabel({
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
				text : (resultSet.fieldByName('project_id') !== 0) ? recProject.fieldByName('project_name') : '',
				//left : '33%',
				left : styleSettingsmargine, //switched placement to column 1 from column 2
				top : '50%',
				width : '40%',
				font : {
					fontFamily : customFont
				},
			});
			var labelCategory = Ti.UI.createLabel({
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
				color : '#2B2B2B',
				text : (isInvoice == true) ? resultSet.fieldByName('invoice_no') : recSubCategory.fieldByName('income_sub_category'),
				left : '33%',
				top : '50%',
				width : '40%',
				font : {
					fontFamily : customFont
				},
			});
			var labelAmount = Ti.UI.createLabel({
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
		entryListTable.data = incomeArray;
	}

	function getInvoiceEntries() {
		var sql = 'SELECT * FROM tbl_invoice ORDER by date(invoice_date) DESC, id DESC';
		var resultSet = db.execute(sql);

		var invoiceArray = [];
		var i = 1;
		while (resultSet.isValidRow()) {
			var recCustomer = db.execute('SELECT * FROM tbl_customer WHERE id=' + resultSet.fieldByName('customer_id'));
			var row = Ti.UI.createTableViewRow({
				className : 'forumEvent', // used to improve table performance
				backgroundColor : 'white',
				rowIndex : i, // custom property, useful for determining the row during events
				height : '50dp',
				id : resultSet.fieldByName('id'),
				font : {
					fontFamily : customFont
				},
			});
			var labelday = Ti.UI.createLabel({
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
				color : '#222',
				text : (resultSet.fieldByName('isDeleted') == 1) ? 'Deleted' : recCustomer.fieldByName('full_name'),
				//text : recCustomer.fieldByName('full_name'),
				left : '33%',
				top : '10%',
				width : '40%',
				font : {
					fontFamily : customFont1
				},
				//ellipsize : true,
				//wordWrap : false
			});
			var labelInvoiceNumber = Ti.UI.createLabel({
				color : '#2B2B2B',
				text : resultSet.fieldByName('invoice_no'),
				//left : '33%',
				left : styleSettingsmargine, //switched placement to column 1 from column 2
				top : '50%',
				width : '40%',
				font : {
					fontFamily : customFont
				},
			});
			
			var labelAmount = Ti.UI.createLabel({
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

			/*var labelDeleted = Ti.UI.createLabel({
			 color : 'red',
			 textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
			 text : (resultSet.fieldByName('isDeleted') == 1 ? 'Deleted' : ''),
			 left : styleSettingsmargine,
			 top : '50%',
			 //bottom : '4dp',
			 width : '38%',
			 font : {
			 fontFamily : customFont,
			 fontSize : stylefontsize - 8,
			 fontWeight : 'bold'
			 },
			 });*/

			row.add(labelday);
			row.add(labelCustomerName);
			row.add(labelInvoiceNumber);
			row.add(labelAmount);
			row.add(labelPaid);
			//row.add(labelDeleted);
			invoiceArray.push(row);
			i++;
			resultSet.next();
			// to next index

		}
		resultSet.close();
		// close the Array
		entryListTable.data = invoiceArray;
	}

	function changeDateView(dateObj) {
		dateObj = new Date(dateObj);
		var pickerDate = (dateObj.getDate() < 10) ? '0' + dateObj.getDate() : dateObj.getDate();
		var pickerMonth = (dateObj.getMonth() + 1) < 10 ? '0' + (dateObj.getMonth() + 1) : dateObj.getMonth() + 1;
		var pickerYear = dateObj.getFullYear();
		selectedDate = pickerDate + '/' + pickerMonth + '/' + pickerYear;
		return selectedDate;

	}


	entryView.update = function(itemIndex, account_id) {

		switch(itemIndex) {
		case 1 :
			getExpenseEntries(account_id);
			break;
		case 2 :
			getIncomeEntries();
			break;
		case 3 :
			getInvoiceEntries();
			break;
		}
	};

	return entryView;
};
