var IncomeInvoiceTableId = Ti.UI.createTextField({
	value : '',
	visible : false,
});
var IncomeInvoiceTitle = Ti.UI.createTextField({
	value : 'Add Payments Against Inv...',
	visible : false,
});

var IncomeInvoiceEntryDate = Ti.UI.createTextField({
	value : getDate(),
	visible : false,
});
var IncomeInvoiceCustomerName = Ti.UI.createTextField({
	value : 0,
	visible : false,
});
var IncomeInvoiceNumber = Ti.UI.createTextField({
	value : 0,
	visible : false,
});
//var IncomeInvoiceCategory = Ti.UI.createTextField({value: 0,	visible: false,});
//var IncomeInvoiceSubCategory = Ti.UI.createTextField({value: 0,	visible: false,});

var IncomeInvoiceInvoiceNet = Ti.UI.createTextField({
	value : '0.00',
	visible : false,
});
var IncomeInvoiceVATPresent = Ti.UI.createTextField({
	value : 0,
	visible : false,
});
//var IncomeInvoiceVAT = Ti.UI.createTextField({value: '0.00',	visible: false,});
var IncomeInvoiceInvoiceTotal = Ti.UI.createTextField({
	value : '0.00',
	visible : false,
});
var IncomeInvoiceAccount = Ti.UI.createTextField({
	value : 0,
	visible : false,
});
var IncomeInvoiceProject = Ti.UI.createTextField({
	value : 0,
	visible : false,
});

var IncomeInvoicePicture = Ti.UI.createTextField({
	value : '/images/camera.png',
	visible : false,
});

var IncomeInvoiceNote = Ti.UI.createTextField({
	value : '',
	visible : false,
});
var IncomeInvoiceOpt = Ti.UI.createTextField({
	value : 'New',
	visible : false,
});

exports.IncomeInvoice = function() {

	var calcultor = require('calculator');
	var calView = calcultor.calculatorView();

	function saveInvoiceIncomeData(dbData) {
		console.log('save');
		var db = Ti.Database.open('mywallet');
		db.execute('INSERT INTO tbl_income(payment_date, category_id, sub_category_id, account_id, project_id, net_amount, vat, total_amount, picture_path, invoice_no, customer_name, note) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)', dbData.payment_date, dbData.category_id, dbData.sub_category_id, dbData.account_id, dbData.project_id, dbData.net_amount, dbData.vat, dbData.total_amount, dbData.picture_path, dbData.invoice_no, dbData.customer_name, dbData.note);
		db.close();
		return true;
	}

	function updateInvoiceIncome(dbData, tableId) {
		var db = Ti.Database.open('mywallet');
		db.execute('UPDATE tbl_income SET payment_date="' + dbData.payment_date + '", category_id="' + dbData.category_id + '", sub_category_id="' + dbData.sub_category_id + '", account_id="' + dbData.account_id + '", project_id="' + dbData.project_id + '", net_amount="' + dbData.net_amount + '", vat="' + dbData.vat + '", total_amount="' + dbData.total_amount + '", picture_path="' + dbData.picture_path + '", invoice_no="' + dbData.invoice_no + '", customer_name="' + dbData.customer_name + '", note="' + dbData.note + '" WHERE id = ' + tableId);
		db.close();
		return true;
	}

	function getInvoiceData(customerId) {

		var db = Ti.Database.open('mywallet');
		var getTableData = db.execute('SELECT * FROM tbl_invoice WHERE customer_id=' + customerId + ' AND paid=0');

		var tabledata = [];
		var i = 1;
		while (getTableData.isValidRow()) {

			//console.log('tbl_invoice in');
			tabledata[i] = Ti.UI.createPickerRow({
				id : getTableData.fieldByName('id'),
				title : getTableData.fieldByName('invoice_no')
			});

			getTableData.next();
			i++;
		}
		getTableData.close();
		//console.log('tbl_invoice out');
		tabledata[0] = Ti.UI.createPickerRow({
			id : '0',
			title : 'Please Select',
		});
		db.close();

		//console.log('tbl_invoice tabledata '+ tabledata[0]);

		return tabledata;
	}

	function clearContent() {

		dateLabel.value = getDate();
		var _col = invoiceNumberText.columns[0];
		var len = _col.rowCount;
		for (var x = len - 1; x >= 1; x--) {
			var _row = _col.rows[x];
			_col.removeRow(_row);
		}

		//subCategoryText.value = '';
		//selectAccountText.setSelectedRow(0, 0, false);
		selectProjectText.setSelectedRow(0, 0, false);
		paymentAmountText.value = '0.00';
		lblInvoiceTotalValue.text = '';
		lblInvoiceDueValue.text = '';
		pictureText.image = '/images/camera.png';
		if (IncomeInvoiceOpt.value == 'New') {
			customerNameText.setSelectedRow(0, 0, false);
		}

		IncomeInvoiceTableId.value = '';
		IncomeInvoiceTitle.value = 'Add Payments Against Inv...';

		IncomeInvoiceEntryDate.value = getDate();
		IncomeInvoiceCustomerName.value = 0;
		IncomeInvoiceNumber.value = 0;

		IncomeInvoiceInvoiceNet.value = '0.00';
		IncomeInvoiceVATPresent.value = 0;

		IncomeInvoiceInvoiceTotal.value = '0.00';
		IncomeInvoiceAccount.value = 0;
		IncomeInvoiceProject.value = 0;

		IncomeInvoicePicture.value = '/images/camera.png';

		IncomeInvoiceNote.value = '';
		IncomeInvoiceNote.blur();
		IncomeInvoiceOpt.value = 'New';
	}

	function getInvoiceTotal(invoice_no) {

		var db = Ti.Database.open('mywallet');
		var getTableData = db.execute('SELECT * FROM tbl_invoice WHERE invoice_no = "' + invoice_no + '"');

		var tabledata = [];
		var i = 1;
		while (getTableData.isValidRow()) {

			tabledata = getTableData.fieldByName('total_amount');

			getTableData.next();
			i++;
		}
		getTableData.close();
		db.close();

		return tabledata;
	}

	function getTotalIncome(invoice_no) {

		var db = Ti.Database.open('mywallet');
		var getTableData = db.execute('SELECT * FROM tbl_income WHERE invoice_no="' + invoice_no + '"');

		var tabledata = 0;
		var i = 1;
		while (getTableData.isValidRow()) {

			if (getTableData.fieldByName('total_amount')) {

				tabledata += getTableData.fieldByName('total_amount') * 1;
			}

			getTableData.next();
			i++;
		}
		getTableData.close();
		db.close();

		return tabledata;
	}

	function getCategoryDetails(invoice_no) {

		var db = Ti.Database.open('mywallet');
		var getTableData = db.execute('SELECT * FROM tbl_invoice WHERE invoice_no= "' + invoice_no + '"');

		var tabledata = [];
		var i = 1;
		while (getTableData.isValidRow()) {

			tabledata['category'] = getTableData.fieldByName('category_id');
			tabledata['sub_category'] = getTableData.fieldByName('sub_category_id');

			getTableData.next();
			i++;
		}
		getTableData.close();
		db.close();

		return tabledata;
	}

	function getCustomerNameById(cusID) {
		var db = Ti.Database.open('mywallet');
		var recordSet = db.execute('SELECT * FROM tbl_customer WHERE id= ' + cusID);
		return recordSet.fieldByName('full_name');
	}

	function getInvoiceNumberbyID(invId) {
		var db = Ti.Database.open('mywallet');
		var recordSet = db.execute('SELECT * FROM tbl_invoice WHERE id= ' + invId);
		return recordSet.fieldByName('invoice_no');
	}

	function updateInvoiceWithPaidStatus(invoice_no) {
		var db = Ti.Database.open('mywallet');
		db.execute('UPDATE tbl_invoice SET paid=1 WHERE invoice_no=?', invoice_no);
		db.close();
	}

	function updateInvoiceWithUnPaidStatus(invoice_no) {
		var db = Ti.Database.open('mywallet');
		db.execute('UPDATE tbl_invoice SET paid=0 WHERE invoice_no=?', invoice_no);
		db.close();
	}

	function getCustomerInvoiceDtails() {
		var getTableData = db.execute('SELECT customer_id FROM tbl_invoice WHERE paid = 0 GROUP BY customer_id');
		console.log(getTableData.fieldByName('customer_id'));
		var tabledata = [];
		var tableCustomerData = [];
		tableCustomerData[0] = Ti.UI.createPickerRow({
			id : '0',
			title : 'Please Select'
		});
		var i = 1;
		while (getTableData.isValidRow()) {
			var customer_id = getTableData.fieldByName('customer_id');
			var customerRecord = db.execute('SELECT * FROM tbl_customer WHERE id=' + customer_id);
			tableCustomerData[i] = Ti.UI.createPickerRow({
				id : customerRecord.fieldByName('id'),
				title : customerRecord.fieldByName('full_name'),
			});

			getTableData.next();
			i++;
		}
		getTableData.close();
		return tableCustomerData;
	}

	function getCustomerId() {
		var customerMenuSelect = 0;
		var getTableData = db.execute('SELECT customer_id FROM tbl_invoice WHERE paid = 0 GROUP BY customer_id');
		var i = 1;
		while (getTableData.isValidRow()) {
			if (IncomeInvoiceCustomerName.value == getTableData.fieldByName('customer_id')) {
				customerMenuSelect = i;
			}

			getTableData.next();
			i++;
		}
		getTableData.close();
		return customerMenuSelect;
	}

	// get the retio according to image
	var getNewRation = function(orginal_width, orginal_height, max_width, max_height) {

		var mysize = {
			width : orginal_width,
			height : orginal_height
		};
		// just to get the size of the original image
		var neww = 0;
		var newh = 0;
		var thumbratio = orginal_height / max_width;
		// width and height are maximum thumbnail's bounds
		var imgratio = mysize.width / mysize.height;

		if (imgratio > thumbratio) {
			var scale = mysize.width / max_width;
			newh = Math.round(mysize.height / scale);
			neww = max_width;
		} else {
			var scale = mysize.height / max_height;
			neww = Math.round(mysize.width / scale);
			newh = max_height;
		}

		return {
			width : neww,
			height : newh
		};

	};

	var imageGetResize = function(image_source, max_width, max_height) {
		// get resize ratio
		newImageRatio = getNewRation(image_source.width, image_source.height, max_width, max_height);
		// resize the image
		//var newBlob2 = image.imageAsResized(neww, newh);
		var resized_image = image_source.imageAsResized(newImageRatio.width, newImageRatio.height);
		// 	return resized image
		return resized_image;
	};

	var vatPtg = function(varVat) {
		//console.log('varVat ' + varVat);
		var tabledata;
		if (varVat == undefined) {

			var db = Ti.Database.open('mywallet');
			var getTableData = db.execute('SELECT * FROM tbl_option WHERE option_name="vat"');
			while (getTableData.isValidRow()) {
				tabledata = getTableData.fieldByName('option_value');
				getTableData.next();
			}
			getTableData.close();
			db.close();
			//console.log('TableData ' + tabledata);
		} else {
			tabledata = varVat;
			//console.log('varVat2 ' + tabledata);
		}
		//console.log('return ' + tabledata);
		return tabledata;
	};

	// get invoice due amount by invoice number
	var getInvoiceDuebyInvoiceNumber = function(invId) {
		var db = Ti.Database.open('mywallet');
		var invoiceResultSet = db.execute('select * FROM tbl_invoice WHERE invoice_no = "' + invId + '"');
		var invoiceTotal = invoiceResultSet.fieldByName('total_amount');
		var invNumber = invoiceResultSet.fieldByName('invoice_no');
		var invoiceTotalResultSet = db.execute('SELECT SUM(total_amount) AS invoicepayment  FROM tbl_income WHERE invoice_no = "' + invNumber + '"');
		var invoiceTotalPayments = invoiceTotalResultSet.fieldByName('invoicepayment');
		console.log('invoiceTotal ' + invoiceTotal + ' ' + 'invoiceTotalPayments ' + invoiceTotalPayments);
		var invoiceDue = invoiceTotal - invoiceTotalPayments;
		console.log(invoiceDue);
		db.close();
		return invoiceDue;
	};

	// validate content before save
	function invoiceIncomeRecordValidate() {
		var validated = false;
		var floatRex = /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/;
		Ti.API.info(invoiceNumberText.value);
		var paymentAmount = paymentAmountText.value;
		paymentAmount = paymentAmount.replace(/,/g, '');
		if (customerNameText.value == undefined || customerNameText.value == 0) {
			var dialog1 = Ti.UI.createAlertDialog({
				title : 'Alert',
				message : 'Please Select Customer',
				ok : 'OK',
			});
			dialog1.show();
		} else if (invoiceNumberText.value == undefined || invoiceNumberText.value == 0) {
			var dialog2 = Ti.UI.createAlertDialog({
				title : 'Alert',
				message : 'Please Select Invoice Number',
				ok : 'Ok',
			});
			dialog2.show();
		} else if (paymentAmountText.value == '') {
			var dialog3 = Ti.UI.createAlertDialog({
				title : 'Alert',
				message : 'Please Add Payment Amount',
				ok : 'Ok',
			});
			dialog3.show();
		} else if (!floatRex.test(paymentAmount)) {
			var dialog4 = Ti.UI.createAlertDialog({
				title : 'Alert',
				message : 'Payment Amount is Invalid',
				ok : 'Ok',
			});
			dialog4.show();
		} else if (getInvoiceDuebyInvoiceNumber(invoiceNumberText.value) < paymentAmount) {
			var dialog5 = Ti.UI.createAlertDialog({
				title : 'Alert',
				message : 'Payment should be less than invoice Due',
				ok : 'Ok',
			});
			dialog5.show();
			//}else if (selectAccountText.value == undefined || selectAccountText.value == '') {
		} else if (selectAccountText.getSelectedRow(0).id == 0) {
			var dialog6 = Ti.UI.createAlertDialog({
				title : 'Alert',
				message : 'Please Select Account',
				ok : 'Ok',
			});
			dialog6.show();
		} else {
			validated = true;
		}

		return validated;
	}

	// validate content before Update
	function invoiceIncomeRecordValidateUpdate() {
		var validated = false;
		var floatRex = /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/;
		Ti.API.info(invoiceNumberText.value);
		var paymentAmount = paymentAmountText.value;
		paymentAmount = paymentAmount.replace(/,/g, '');
		if (paymentAmountText.value == '0.00') {
			var dialog3 = Ti.UI.createAlertDialog({
				title : 'Alert',
				message : 'Please Add Payment Amount',
				ok : 'Ok',
			});
			dialog3.show();
		} else if (!floatRex.test(paymentAmount)) {
			var dialog4 = Ti.UI.createAlertDialog({
				title : 'Alert',
				message : 'Payment Amount is Invalid',
				ok : 'Ok',
			});
			dialog4.show();
		} else if ((getInvoiceDuebyInvoiceNumber(invoiceNumberTextUpdate.value) + (IncomeInvoiceInvoiceNet.value * 1)) < paymentAmount) {
			var dialog5 = Ti.UI.createAlertDialog({
				title : 'Alert',
				message : 'Payment should be less than invoice Due',
				ok : 'Ok',
			});
			dialog5.show();
			//}else if (selectAccountText.value == undefined || selectAccountText.value == '') {
		} else if (selectAccountText.getSelectedRow(0).id == 0) {
			var dialog6 = Ti.UI.createAlertDialog({
				title : 'Alert',
				message : 'Please Select Account',
				ok : 'Ok',
			});
			dialog6.show();
		} else {
			validated = true;
		}

		return validated;
	}

	var invoiceIncomeView = Ti.UI.createView({
		height : '100%',
		width : '100%',
		visible : false,
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

	lblback.addEventListener('click', function() {
		invoiceIncomeView.hide();
		clearContent();
	});

	var lbltitle = Ti.UI.createLabel({
		text : IncomeInvoiceTitle.value,
		color : '#FFFFFF',
		font : {
			fontSize : stylefontsize + 4,
			fontFamily : customFont2,
		},
		//width : '70%',
		//right : stylemargine,
		//left : '27.5%',
		textAlign : 'center'
	});

	view_title.add(lblback);
	view_title.add(lbltitle);
	invoiceIncomeView.add(view_title);

	invoiceIncomeView.add(IncomeInvoiceTableId);
	invoiceIncomeView.add(IncomeInvoiceTitle);
	invoiceIncomeView.add(IncomeInvoiceEntryDate);
	invoiceIncomeView.add(IncomeInvoiceCustomerName);
	invoiceIncomeView.add(IncomeInvoiceInvoiceNet);
	invoiceIncomeView.add(IncomeInvoiceVATPresent);
	//invoiceIncomeView.add(IncomeInvoiceVAT);
	invoiceIncomeView.add(IncomeInvoiceInvoiceTotal);
	invoiceIncomeView.add(IncomeInvoiceAccount);
	invoiceIncomeView.add(IncomeInvoiceProject);
	invoiceIncomeView.add(IncomeInvoicePicture);
	invoiceIncomeView.add(IncomeInvoiceNote);
	invoiceIncomeView.add(IncomeInvoiceOpt);

	var mainInvoiceView = Ti.UI.createScrollView({
		width : '100%',
		top : deviceHeight * 0.075,
		bottom : deviceHeight * 0.075,
		height : deviceHeight * 0.925,
		backgroundColor : '#fff'
	});
	var entryDateLabel = Ti.UI.createLabel({
		text : 'Entry Date *',
		color : '#000',
		top : 5,
		left : '2%',
		width : '37%',
		height : 40,
	});

	var btnentryDate = Ti.UI.createView({
		//type:Ti.UI.PICKER_TYPE_DATE,
		backgroundColor : userInputFeildBackgroundColor,
		top : 5,
		left : '86%',
		width : '12%',
		height : 40,
		//image : '/images/calicon.png',
		//editable:false,
		//font:{fontSize:20,},
	});

	var imgentryDate = Ti.UI.createImageView({
		width : '70%',
		image : '/images/calendar.png',
	});
	btnentryDate.add(imgentryDate);

	var dateLabel = Ti.UI.createTextField({
		value : IncomeInvoiceEntryDate.value,
		//color:'#000',
		backgroundColor : userInputFeildBackgroundColor,
		top : 5,
		left : '41%',
		width : '43%',
		height : 40,
		editable : false,
		font : {
			fontSize : 15,
		},

	});

	var customerNameLabel = Ti.UI.createLabel({
		text : 'Customer Name *',
		color : '#000',
		top : 95,
		left : '2%',
		width : '37%',
		height : 40,

	});

	var customerNameText = Ti.UI.createPicker({
		backgroundColor : userInputFeildBackgroundColor,
		top : 95,
		left : '41%',
		width : '57%',
		height : 40,
		visible : false,
	});

	var tableCustomerData = [];

	tableCustomerData = getCustomerInvoiceDtails();

	customerNameText.selectionIndicator = true;
	customerNameText.add(tableCustomerData);

	var customerNameTextUpdate = Ti.UI.createTextField({
		backgroundColor : userInputFeildBackgroundColor,
		top : 95,
		left : '41%',
		width : '57%',
		height : 40,
		editable : false,
		visible : false,
	});

	if (IncomeInvoiceOpt.value == 'New') {
		customerNameText.visible = true;
	} else {
		customerNameTextUpdate.visible = true;
		customerNameTextUpdate.value = getCustomerNameById(IncomeInvoiceCustomerName.value);
	}

	/*
	var customerIndex = getCustomerId();
	customerNameText.setSelectedRow(0,customerIndex);
	*/

	//customerNameText.setSelectedRow(0,adhocIncomeCustomerName.value);

	var invoiceNumberLabel = Ti.UI.createLabel({
		text : 'Invoice No *',
		color : '#000',
		top : 140,
		left : '2%',
		width : '37%',
		height : 40,

	});

	var invoiceNumberText = Ti.UI.createPicker({
		top : 140,
		left : '41%',
		width : '57%',
		height : 40,
		backgroundColor : userInputFeildBackgroundColor,
		visible : false,
	});

	var tableInvoiceData = [];

	tableInvoiceData = getInvoiceData(0);

	invoiceNumberText.selectionIndicator = true;
	invoiceNumberText.add(tableInvoiceData);

	var invoiceNumberTextUpdate = Ti.UI.createTextField({
		top : 140,
		left : '41%',
		width : '57%',
		height : 40,
		editable : false,
		visible : false,
		backgroundColor : userInputFeildBackgroundColor,
	});

	if (IncomeInvoiceOpt.value == 'New') {
		invoiceNumberText.visible = true;
	} else {
		invoiceNumberTextUpdate.visible = true;
		invoiceNumberTextUpdate.value = IncomeInvoiceNumber.value;
	}

	var lblInvoiceTotal = Ti.UI.createLabel({
		text : 'Invoice Total',
		color : '#000',
		top : 185,
		left : '2%',
		width : '37%',
		height : 40,
	});

	var lblInvoiceTotalValue = Ti.UI.createLabel({
		color : '#ccc',
		top : 185,
		left : '43%',
		width : '57%',
		height : 40,
	});

	var lblInvoiceDue = Ti.UI.createLabel({
		text : 'Total Due',
		color : '#000',
		top : 230,
		left : '2%',
		width : '37%',
		height : 40,
	});

	var lblInvoiceDueValue = Ti.UI.createLabel({
		color : '#ccc',
		top : 230,
		left : '43%',
		width : '57%',
		height : 40,
	});

	if (IncomeInvoiceOpt.value == 'New') {
		lblInvoiceTotalValue.text = toDecimalFormatView(0);
		lblInvoiceDueValue.text = toDecimalFormatView(0);
	} else {
		lblInvoiceTotalValue.text = toDecimalFormatView(getInvoiceTotal(IncomeInvoiceNumber.value));
		lblInvoiceDueValue.text = toDecimalFormatView(getInvoiceDuebyInvoiceNumber(IncomeInvoiceNumber.value));
	}

	var paymentAmountLabel = Ti.UI.createLabel({
		text : 'Payment Amount *',
		color : '#000',
		top : 275,
		left : '2%',
		width : '37%',
		height : 40,

	});

	var paymentAmountText = Ti.UI.createTextField({
		backgroundColor : userInputFeildBackgroundColor,
		top : 275,
		left : '41%',
		width : '57%',
		height : 40,
		keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		//focusable:true,
		editable : false,
		value : toDecimalFormatWithoutCurrency(IncomeInvoiceInvoiceNet.value * 1),
	});

	paymentAmountText.addEventListener('singletap', function() {
		calcultor.setTxtObj(paymentAmountText);
		calView.show();
	});

	// Account section
	var selectAccountLabel = Ti.UI.createLabel({
		text : 'Select Account *',
		color : '#000',
		top : 50,
		left : '2%',
		width : '37%',
		height : 40,

	});

	var selectAccountText = Ti.UI.createPicker({
		top : 50,
		left : '41%',
		width : '57%',
		height : 40,
		backgroundColor : userInputFeildBackgroundColor,
	});

	var getTableAccountData = db.execute('SELECT * FROM tbl_account');

	var tableAccountData = [];
	var i = 1;
	tableAccountData[0] = Ti.UI.createPickerRow({
		id : '0',
		title : 'Please Select',
		isDefault : null
	});

	while (getTableAccountData.isValidRow()) {

		tableAccountData[i] = Ti.UI.createPickerRow({
			id : getTableAccountData.fieldByName('id'),
			title : getTableAccountData.fieldByName('account_name'),
			isDefault : getTableAccountData.fieldByName('is_default')
		});

		getTableAccountData.next();
		i++;
	}
	getTableAccountData.close();

	selectAccountText.selectionIndicator = true;
	selectAccountText.add(tableAccountData);
	
	var defaultAccountValueRow = null;
	
	for(var i=0 ; i<tableAccountData.length ; i++){
		if(tableAccountData[i].isDefault === 1){
			Ti.API.info('@@@ DEFAULT DETECTED ' + tableAccountData[i].title);
			defaultAccountValueRow = tableAccountData[i].id;
		}
	}

	if(IncomeInvoiceOpt.value == 'New'){
		if(defaultAccountValueRow === null){
			selectAccountText.setSelectedRow(0, IncomeInvoiceAccount.value);
		} else {
			selectAccountText.setSelectedRow(0, defaultAccountValueRow);
			selectAccountText.value = defaultAccountValueRow;
		}
	} else {
		selectAccountText.setSelectedRow(0, IncomeInvoiceAccount.value);
	}

	//selectAccountText.setSelectedRow(0, IncomeInvoiceAccount.value);
	// EOF Account Secion

	// Project section
	var selectProjectLabel = Ti.UI.createLabel({
		text : "Internal Ref. No", //'Select Project',
		color : '#000',
		top : 320,
		left : '2%',
		width : '37%',
		height : 40,

	});

	var selectProjectText = Ti.UI.createPicker({
		top : 320,
		left : '41%',
		width : '57%',
		height : 40,
		backgroundColor : userInputFeildBackgroundColor,
	});

	var getTableProjectData = db.execute('SELECT * FROM tbl_project');

	var tableProjectData = [];
	var i = 1;

	while (getTableProjectData.isValidRow()) {

		tableProjectData[0] = Ti.UI.createPickerRow({
			id : '0',
			title : 'Please Select',
		});
		tableProjectData[i] = Ti.UI.createPickerRow({
			id : getTableProjectData.fieldByName('id'),
			title : getTableProjectData.fieldByName('project_name')
		});

		getTableProjectData.next();
		i++;
	}
	getTableProjectData.close();

	selectProjectText.selectionIndicator = true;
	selectProjectText.add(tableProjectData);

	selectProjectText.setSelectedRow(0, IncomeInvoiceProject.value);

	var noteLabel = Ti.UI.createLabel({
		text : 'Note',
		color : '#000',
		top : 365,
		left : '2%',
		width : '37%',
		height : 40,

	});

	var noteText = Ti.UI.createTextArea({
		borderWidth : 2,
		borderColor : '#bbb',
		borderRadius : 5,
		//color : '#000',
		font : {
			fontSize : 20,
			//fontWeight : 'bold'
		},
		//keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		//returnKeyType : Ti.UI.RETURNKEY_GO,
		textAlign : 'left',
		backgroundColor : userInputFeildBackgroundColor,
		top : 365,
		left : '41%',
		width : '57%',
		height : 120,
		value : IncomeInvoiceNote.value,
	});

	var pictureLabel = Ti.UI.createLabel({
		text : 'Picture',
		color : '#000',
		top : 490,
		left : '2%',
		width : '37%',
		height : 40,

	});
	console.log('IncomeInvoicePicture >> ' + IncomeInvoicePicture.value);

	var pictureText = Ti.UI.createImageView({
		backgroundColor : userInputFeildBackgroundColor,
		top : 490,
		left : '41%',
		width : '57%',
		height : 120,
		bottom : 50,
		image : (IncomeInvoicePicture.value == '/images/camera.png') ? IncomeInvoicePicture.value : Ti.Utils.base64decode(IncomeInvoicePicture.value),
	});

	var incomeInvoiceBtnView = Ti.UI.createView({
		//top : 615,
		bottom: 0,
		width : '100%',
		height : appPixel * 7.5,
		backgroundColor : '#054e62'
	});

	var cancelBtn = Ti.UI.createButton({
		title : 'Cancel',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		backgroundColor : '#054e62',
		backgroundSelectedColor : '#0a7390',
		left : '0%',
		height : '100%',
		width : '33%',
		font : {
			fontSize : stylefontsize - 5,
			fontFamily : customFont1
		},
	});

	var saveBtn = Ti.UI.createButton({
		title : 'Save',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		backgroundColor : '#054e62',
		backgroundSelectedColor : '#0a7390',
		//left : '0%',
		height : '100%',
		width : '33%',
		font : {
			fontSize : stylefontsize - 5,
			fontFamily : customFont1
		},
	});

	var editBtn = Ti.UI.createButton({
		title : 'Edit',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		backgroundColor : '#054e62',
		backgroundSelectedColor : '#0a7390',
		height : '100%',
		width : '34%',
		font : {
			fontSize : stylefontsize - 5,
			fontFamily : customFont1
		},
	});

	var nextBtn = Ti.UI.createButton({
		title : 'Next',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		backgroundColor : '#054e62',
		backgroundSelectedColor : '#0a7390',
		right : '0%',
		height : '100%',
		width : '33%',
		font : {
			fontSize : stylefontsize - 5,
			fontFamily : customFont1
		},
	});

	/*if (IncomeInvoiceOpt.value == 'Update') {
		nextBtn.visible = false;
		saveBtn.right = '0%';
		saveBtn.title = 'Update';
		//deleteBtn.visible = true;
		//deleteBtn.enabled = true;
	}*/
	
	editBtn.addEventListener('click', function() {
		enableUpdate();
		editBtn.visible = false;
		nextBtn.visible = false;
		saveBtn.visible = true;
		cancelBtn.visible = true;
		saveBtn.right = '0%';
		saveBtn.title = 'Update';
		lbltitle.text = 'Edit Payments Against Inv...';
	});
	
	var disableLayer =  Ti.UI.createView({
		//backgroundColor : 'pink',
		opacity : 0.7,
		width : '100%',
		height : '100%',
	});
	
	function enableUpdate(){
		try{
			mainInvoiceView.remove(disableLayer);
		} catch (e) {
			Ti.API.info('Unable to remove disable layer');
		}		
	}
	
	function disableUpdate(){		
		mainInvoiceView.add(disableLayer);
	}

	incomeInvoiceBtnView.add(cancelBtn);
	incomeInvoiceBtnView.add(saveBtn);
	incomeInvoiceBtnView.add(editBtn);
	incomeInvoiceBtnView.add(nextBtn);

	mainInvoiceView.add(entryDateLabel);
	mainInvoiceView.add(dateLabel);
	mainInvoiceView.add(btnentryDate);
	mainInvoiceView.add(customerNameLabel);
	mainInvoiceView.add(customerNameText);
	mainInvoiceView.add(customerNameTextUpdate);
	mainInvoiceView.add(invoiceNumberLabel);
	mainInvoiceView.add(invoiceNumberText);
	mainInvoiceView.add(invoiceNumberTextUpdate);
	mainInvoiceView.add(lblInvoiceTotal);
	mainInvoiceView.add(lblInvoiceTotalValue);
	mainInvoiceView.add(lblInvoiceDue);
	mainInvoiceView.add(lblInvoiceDueValue);
	mainInvoiceView.add(selectAccountLabel);
	mainInvoiceView.add(selectAccountText);
	mainInvoiceView.add(selectProjectLabel);
	mainInvoiceView.add(selectProjectText);
	mainInvoiceView.add(paymentAmountLabel);
	mainInvoiceView.add(paymentAmountText);
	mainInvoiceView.add(pictureLabel);
	mainInvoiceView.add(pictureText);
	mainInvoiceView.add(noteLabel);
	mainInvoiceView.add(noteText);

	//mainInvoiceView.add(incomeInvoiceBtnView);

	customerNameText.addEventListener('change', function(e) {

		customerNameText.value = e.row.id;

		if (invoiceNumberText.columns[0]) {
			var _col = invoiceNumberText.columns[0];
			var len = _col.rowCount;
			for (var x = len - 1; x >= 0; x--) {
				var _row = _col.rows[x];
				_col.removeRow(_row);
			}
			//picker.reloadColumn(_col);
		}

		tableInvoiceData = getInvoiceData(e.row.id);

		invoiceNumberText.add(tableInvoiceData);

	});

	invoiceNumberText.addEventListener('change', function(e) {

		if (e.rowIndex != '0') {
			invoiceNumberText.value = e.row.title;
			// Get Invoic Total
			var invoiceTotal = getInvoiceTotal(e.row.title);
			lblInvoiceTotalValue.text = toDecimalFormatView(invoiceTotal);
			// get invoice due from invoice number
			//var invoiceDue = getInvoiceDuebyInvoiceNumber(e.row.title);
			var invoiceDue = getInvoiceDuebyInvoiceNumber(e.row.title);
			lblInvoiceDueValue.text = toDecimalFormatView(invoiceDue);
		} else {
			invoiceNumberText.value = '0';
			lblInvoiceTotalValue.text = toDecimalFormatView(0);
			lblInvoiceDueValue.text = toDecimalFormatView(0);
		}

	});

	selectAccountText.addEventListener('change', function(e) {
		selectAccountText.value = e.row.id;
	});

	selectProjectText.addEventListener('change', function(e) {
		selectProjectText.value = e.row.id;
	});

	// invoiceNetText.addEventListener('change', function() {
	// var invoiceNet = invoiceNetText.value;
	// //var tempVatvals = tempVatText.value;
	//
	// //var invoiceVat =(invoiceNet*vatPtg(tempVatvals)) /100;
	// //vatText.value = invoiceVat;
	//
	// var vat = vatText.value;
	// var totalValue = invoiceNet * 1 + vat * 1;
	// invoiceTotalText.value = Math.ceil(totalValue* 10000) / 10000;
	// });

	// vatText.addEventListener('change', function() {
	// var invoiceNet = invoiceNetText.value;
	// var vat = vatText.value;
	// var totalValue = invoiceNet * 1 + vat * 1;
	// invoiceTotalText.value = Math.ceil(totalValue* 10000) / 10000;
	// });

	/***/
	var invoiceWrapperView = Ti.UI.createView({
		visible : false,
		zIndex : 200,
	});
	// Full screen
	var invoiceBackgroundView = Ti.UI.createView({// Also full screen
		backgroundColor : '#000',
		opacity : 0.6
	});
	var invoiceContainerView = Ti.UI.createView({// Set height appropriately
		layout : 'vertical',
		width : '85%',
		height : deviceHeight * 0.36,
		backgroundColor : '#FFF',
	});

	var view_popuptitle = Ti.UI.createView({
		height : deviceHeight * 0.075,
		backgroundColor : '#2980B9',
	});

	var someLabel = Ti.UI.createLabel({
		text : 'Add Image From',
		color : '#FFFFFF',
		font : {
			fontSize : stylefontsize + 2,
			//fontFamily : customFont2,
		},
	});

	var invoiceImagepopupclose = Ti.UI.createImageView({
		image : '../images/closebtn.png',
		backgroundSelectedColor : '#999999',
		width : '9%',
		right : '3%',
	});

	view_popuptitle.add(someLabel);
	view_popuptitle.add(invoiceImagepopupclose);
	invoiceContainerView.add(view_popuptitle);

	var btnInvoiceCameraView = Ti.UI.createView({
		backgroundColor : settingsbtncol,
		backgroundSelectedColor : settingsbtnselectedcol,
		left : '1%',
		right : '1%',
		top : '2%',
		bottom : '0.5%',
		// height : deviceHeight * 0.11,
		height : settingOptionHeight,
	});

	var lblCamera = Ti.UI.createLabel({
		text : 'Add From Camera',
		//width : '70%',
		color : settingsbtnfontcolor,
		left : '5%',
		font : {
			//fontFamily : customFont1,
			fontSize : stylefontsize,
		},
	});

	btnInvoiceCameraView.add(lblCamera);
	invoiceContainerView.add(btnInvoiceCameraView);

	var btnInvoiceGallerView = Ti.UI.createView({
		backgroundColor : settingsbtncol,
		backgroundSelectedColor : settingsbtnselectedcol,
		left : '1%',
		right : '1%',
		top : '1%',
		bottom : '0.5%',
		// height : deviceHeight * 0.11,
		height : settingOptionHeight,
	});

	var lblGallery = Ti.UI.createLabel({
		text : 'Add From Gallery',
		//width : '70%',
		color : settingsbtnfontcolor,
		left : '5%',
		font : {
			//fontFamily : customFont1,
			fontSize : stylefontsize,
		},
	});

	btnInvoiceGallerView.add(lblGallery);
	invoiceContainerView.add(btnInvoiceGallerView);

	var btnInvoiceremoveimgView = Ti.UI.createView({
		backgroundColor : settingsbtncol,
		backgroundSelectedColor : settingsbtnselectedcol,
		left : '1%',
		right : '1%',
		top : '1%',
		bottom : '0.5%',
		// height : deviceHeight * 0.11,
		height : settingOptionHeight,
	});

	var lblInvoiceremoveimg = Ti.UI.createLabel({
		text : 'Remove Image',
		//width : '70%',
		color : settingsbtnfontcolor,
		left : '5%',
		font : {
			//fontFamily : customFont1,
			fontSize : stylefontsize,
		},
	});

	btnInvoiceremoveimgView.add(lblInvoiceremoveimg);
	invoiceContainerView.add(btnInvoiceremoveimgView);

	invoiceWrapperView.add(invoiceBackgroundView);
	invoiceWrapperView.add(invoiceContainerView);

	//mainInvoiceView.add(wrapperView);

	var getImage;
	pictureText.addEventListener('click', function(e) {
		invoiceWrapperView.show();
		mainInvoiceView.scrollingEnabled = false;
	});

	mainInvoiceView.addEventListener('onload', function(e) {
		invoiceWrapperView.hide();
		mainInvoiceView.scrollingEnabled = true;
	});

	invoiceImagepopupclose.addEventListener('click', function() {
		invoiceWrapperView.hide();
		mainInvoiceView.scrollingEnabled = true;
	});

	invoiceBackgroundView.addEventListener('click', function() {
		invoiceWrapperView.hide();
		mainInvoiceView.scrollingEnabled = true;
	});

	btnInvoiceCameraView.addEventListener('click', function() {
		invoiceWrapperView.hide();
		mainInvoiceView.scrollingEnabled = true;
		console.log('camera');
		var hasCameraPermissions = Ti.Media.hasCameraPermissions();
		if (hasCameraPermissions) {

			Ti.Media.showCamera({
				success : function(e) {
					var image = e.media;
					var max_width = 800;
					var max_height = 400;
					getImage = imageGetResize(image, max_width, max_height);
					//console.log(getImage);
					pictureText.image = getImage;
				},
				allowEditing : true,
				mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
			});

		} else {

			Ti.Media.requestCameraPermissions(function(e) {
				//log.args('Ti.Media.requestCameraPermissions', e);

				if (e.success) {

					Ti.Media.showCamera({
						success : function(e) {
							var image = e.media;
							var max_width = 800;
							var max_height = 400;
							getImage = imageGetResize(image, max_width, max_height);
							//console.log(getImage);
							pictureText.image = getImage;
						},
						allowEditing : true,
						mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
					});

				}
			});

		}
	});

	btnInvoiceGallerView.addEventListener('click', function() {
		invoiceWrapperView.hide();
		mainInvoiceView.scrollingEnabled = true;
		console.log('Gallery');

		Titanium.Media.openPhotoGallery({
			success : function(e) {
				var mediaImage = e.media;
				var max_width = 800;
				var max_height = 400;
				getImage = imageGetResize(mediaImage, max_width, max_height);

				pictureText.image = getImage;
			},
			cancel : function() {
				Ti.API.info('user cancelled galary.');
			},
			error : function(error) {
				var errorAlert = Titanium.UI.createAlertDialog({
					title : 'Sorry!',
					message : 'Error: ' + error.code
				});
				errorAlert.show();
			},
			allowEditing : true,
			mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
		});

	});

	btnInvoiceremoveimgView.addEventListener('click', function(argument) {
		pictureText.image = '/images/camera.png';

		IncomeInvoicePicture.value = '/images/camera.png';
		invoiceWrapperView.hide();
		mainInvoiceView.scrollingEnabled = true;
	});

	//Calendar Popup for Entry date
	btnentryDate.addEventListener('click', function(e) {
		//supplierInvDateText.value = e.row.id;
		//console.log("User selected date: " + e.value.toLocaleString());
		var entryDatePicker = Ti.UI.createPicker({
			//value:'02/05/2015',
		});
		
		var last_part2 = dateLabel.value;
		var day = last_part2.split("/")[0];
	    var month =  last_part2.split("/")[1];
	    var year =  last_part2.split("/")[2];
	    var selectedDatePicker = new Date(year, month-1, day);
		
		var selectedDatePicker;
		entryDatePicker.showDatePickerDialog({
			value: selectedDatePicker,
			cancel : true,
			callback : function(e) {
				if (e.cancel) {
					Ti.API.info('user canceled dialog');
				} else {
					Ti.API.info('value is: ' + e.value);
					//Ti.API.info('lets see what this object is' + JSON.stringify(e));
					var dateObj = e.value;
					var pickerDate = (dateObj.getDate() < 10) ? '0' + dateObj.getDate() : dateObj.getDate();
					var pickerMonth = (dateObj.getMonth() + 1) < 10 ? '0' + (dateObj.getMonth() + 1) : dateObj.getMonth() + 1;
					var pickerYear = dateObj.getFullYear();
					//console.log(pickerDate + '-' + pickerMonth + '-' + pickerYear);
					//selectedDate = pickerYear + '-' + pickerMonth + '-' + pickerDate;
					selectedDate = pickerDate + '/' + pickerMonth + '/' + pickerYear;
					dateLabel.value = selectedDate;
					entryDatePicker.value = e.value;
					dateLabel.blur();
				}
			}
		});

	});

	dateLabel.addEventListener('singletap', function(e) {
		var entryDatePicker = Ti.UI.createPicker({
			//value:'02/05/2015',
		});
		var selectedDatePicker;
		entryDatePicker.showDatePickerDialog({
			cancel : true,
			callback : function(e) {
				if (e.cancel) {
					Ti.API.info('user canceled dialog');
				} else {
					Ti.API.info('value is: ' + e.value);
					//Ti.API.info('lets see what this object is' + JSON.stringify(e));
					var dateObj = e.value;
					var pickerDate = (dateObj.getDate() < 10) ? '0' + dateObj.getDate() : dateObj.getDate();
					var pickerMonth = (dateObj.getMonth() + 1) < 10 ? '0' + (dateObj.getMonth() + 1) : dateObj.getMonth() + 1;
					var pickerYear = dateObj.getFullYear();
					//console.log(pickerDate + '-' + pickerMonth + '-' + pickerYear);
					// selectedDate = pickerYear + '-' + pickerMonth + '-' + pickerDate;
					selectedDate = pickerDate + '/' + pickerMonth + '/' + pickerYear;
					dateLabel.value = selectedDate;
					entryDatePicker.value = e.value;
					dateLabel.blur();
				}
			}
		});

	});

	saveBtn.addEventListener('click', function(e) {
		// validated
		if (IncomeInvoiceOpt.value == 'New') {
			Ti.API.info('NEw Recordd');
			if (invoiceIncomeRecordValidate()) {
				var invoice_no = invoiceNumberText.value;
				var categoryDetails = getCategoryDetails(invoice_no);
				var duepayment = getInvoiceDuebyInvoiceNumber(invoice_no);
				var paymentAmount = paymentAmountText.value;
				paymentAmount = paymentAmount.replace(/,/g, '');
				var dateForSave = dateSaveChange(dateLabel.value);
				var imageData = (getImage == undefined ) ? IncomeInvoicePicture.value : Ti.Utils.base64encode(getImage);

				var dbData = {
					payment_date : dateForSave,
					category_id : categoryDetails['category'],
					sub_category_id : categoryDetails['sub_category'],
					customer_name : customerNameText.value,
					invoice_no : invoiceNumberText.value,
					account_id : selectAccountText.value,
					project_id : selectProjectText.value,
					net_amount : paymentAmount,
					vat : '0',
					total_amount : paymentAmount,
					picture_path : imageData,
					note : noteText.value,
				};

				console.log(dbData);

				var getResult = saveInvoiceIncomeData(dbData);
				var paymentAmount = paymentAmountText.value;
				paymentAmount = paymentAmount.replace(/,/g, '');

				if (duepayment == paymentAmount) {
					updateInvoiceWithPaidStatus(invoice_no);
				}

				if (getResult) {
					Ti.App.fireEvent('addIncomeClose', 'e');
					var toast = Ti.UI.createNotification({
						message : "Save Successful",
						duration : Ti.UI.NOTIFICATION_DURATION_SHORT
					});
					toast.show();
					clearContent();
					invoiceIncomeView.hide();
				}

				invoiceIncomeView.hide();
				clearContent();
				invoiceWrapperView.hide();
				calView.hide();
				mainInvoiceView.scrollingEnabled = true;
			}

		} else {
			Ti.API.info('Update Recordd');
			if (invoiceIncomeRecordValidateUpdate()) {

				var invoice_no = invoiceNumberTextUpdate.value;
				var categoryDetails = getCategoryDetails(invoice_no);
				var duepayment = getInvoiceDuebyInvoiceNumber(invoice_no);
				var paymentAmount = paymentAmountText.value;
				paymentAmount = paymentAmount.replace(/,/g, '');
				var dateForSave = dateSaveChange(dateLabel.value);

				var imageData = (getImage == undefined ) ? IncomeInvoicePicture.value : Ti.Utils.base64encode(getImage);

				var dbData = {
					payment_date : dateForSave,
					category_id : categoryDetails['category'],
					sub_category_id : categoryDetails['sub_category'],
					customer_name : IncomeInvoiceCustomerName.value,
					invoice_no : invoiceNumberTextUpdate.value,
					account_id : selectAccountText.getSelectedRow(0).id,
					project_id : selectProjectText.getSelectedRow(0).id,
					net_amount : paymentAmount,
					vat : '0',
					total_amount : paymentAmount,
					picture_path : imageData,
					note : noteText.value,
				};

				var getResult = updateInvoiceIncome(dbData, IncomeInvoiceTableId.value);

				if (getInvoiceDuebyInvoiceNumber(invoice_no) == 0) {
					updateInvoiceWithPaidStatus(invoice_no);
				} else {
					updateInvoiceWithUnPaidStatus(invoice_no);
				}

				Ti.App.fireEvent('refrishEditView', 'e');
				Ti.App.fireEvent('addIncomeClose', 'e');
				var toast = Ti.UI.createNotification({
					message : "Update Successful",
					duration : Ti.UI.NOTIFICATION_DURATION_SHORT
				});
				toast.show();

				invoiceIncomeView.hide();
				clearContent();
				invoiceWrapperView.hide();
				calView.hide();
				mainInvoiceView.scrollingEnabled = true;
			}
		}
		/*

		 */
	});

	/*deleteBtn.addEventListener('click', function(){
	 invoiceIncomeRecordDeleteConf.show();
	 });*/

	/*invoiceIncomeRecordDeleteConf.addEventListener('click', function(e){
	 if (e.index === e.source.cancel){
	 Ti.API.info('The cancel button was clicked');
	 }else{
	 db.execute('DELETE FROM tbl_income WHERE id='+IncomeInvoiceTableId.value);

	 var invoice_no = invoiceNumberTextUpdate.value;
	 if (getInvoiceDuebyInvoiceNumber(invoice_no)== 0) {
	 updateInvoiceWithPaidStatus(invoice_no);
	 }else{
	 updateInvoiceWithUnPaidStatus(invoice_no);
	 }

	 Ti.App.fireEvent('refrishEditView', 'e');
	 var toast = Ti.UI.createNotification({
	 message:"Delete Successful",
	 duration: Ti.UI.NOTIFICATION_DURATION_SHORT
	 });
	 toast.show();

	 invoiceIncomeView.hide();
	 clearContent();
	 invoiceWrapperView.hide();
	 calView.hide();
	 mainInvoiceView.scrollingEnabled = true;
	 }
	 });*/

	nextBtn.addEventListener('click', function(e) {
		if (invoiceIncomeRecordValidate()) {
			// validated
			var invoice_no = invoiceNumberText.value;
			var categoryDetails = getCategoryDetails(invoice_no);
			var duepayment = getInvoiceDuebyInvoiceNumber(invoice_no);
			var paymentAmount = paymentAmountText.value;
			paymentAmount = paymentAmount.replace(/,/g, '');
			var dateForSave = dateSaveChange(dateLabel.value);
			var imageData = (getImage == undefined ) ? IncomeInvoicePicture.value : Ti.Utils.base64encode(getImage);
			Ti.API.info('Validated');
			var dbData = {
				payment_date : dateForSave,
				category_id : categoryDetails['category'],
				sub_category_id : categoryDetails['sub_category'],
				customer_name : customerNameText.value,
				invoice_no : invoiceNumberText.value,
				account_id : selectAccountText.value,
				project_id : selectProjectText.value,
				net_amount : paymentAmount,
				vat : '0',
				total_amount : paymentAmount,
				picture_path : imageData,
			};

			var getResult = saveInvoiceIncomeData(dbData);

			var paymentAmount = paymentAmountText.value;
			paymentAmount = paymentAmount.replace(/,/g, '');

			if (duepayment == paymentAmount) {
				updateInvoiceWithPaidStatus(invoice_no);
			}

			if (getResult) {
				clearContent();
				mainInvoiceView.scrollTo(0,0);
				var toast = Ti.UI.createNotification({
					message : "Save Successful",
					duration : Ti.UI.NOTIFICATION_DURATION_SHORT
				});
				toast.show();
				
			}
		}
	});

	cancelBtn.addEventListener('click', function() {
		invoiceIncomeView.hide();
		clearContent();
	});

	Ti.App.addEventListener('addInvoiceIncomeViewClose', function(e) {
		invoiceIncomeView.hide();
		clearContent();
		invoiceWrapperView.hide();
		calView.hide();
		mainInvoiceView.scrollingEnabled = true;
	});

	Ti.App.addEventListener('editInvoiceIncomeViewClose', function(e) {
		invoiceIncomeView.hide();
		clearContent();
		invoiceWrapperView.hide();
		calView.hide();
		mainInvoiceView.scrollingEnabled = true;

	});

	invoiceIncomeView.add(mainInvoiceView);
	invoiceIncomeView.add(incomeInvoiceBtnView);
	invoiceIncomeView.add(invoiceWrapperView);
	invoiceIncomeView.add(calView);

	// mainInvoiceView.add(invoiceWrapperView);
	// //mainInvoiceView.add(invoiceVatWrapperView);
	// var mainViews = [];
	// mainViews['mainInvoiceView'] = mainInvoiceView;
	// mainViews['invoiceWrapperView'] = invoiceWrapperView;
	// mainViews['calView'] = calView;
	
	if (IncomeInvoiceOpt.value == 'New') {
		enableUpdate();
		editBtn.visible = false;
		nextBtn.visible = true;
		saveBtn.visible = true;
		cancelBtn.visible = true;
	} else if (IncomeInvoiceOpt.value == 'View') {
		disableUpdate();
		editBtn.visible = true;
		nextBtn.visible = false;
		saveBtn.visible = false;
		cancelBtn.visible = false;
		saveBtn.right = '0%';
		saveBtn.title = 'Update';
	} else if (IncomeInvoiceOpt.value == 'Update') {
		enableUpdate();
		editBtn.visible = false;
		nextBtn.visible = false;
		saveBtn.visible = true;
		cancelBtn.visible = true;
		saveBtn.right = '0%';
		saveBtn.title = 'Update';
	}

	return invoiceIncomeView;

};

exports.setIncomeInvoiceData = function(tableId, viewOption) {
	
	if(viewOption === null || viewOption === undefined || viewOption === ''){
		IncomeInvoiceOpt.value = 'Update'; // this is as the view option was added at a later time
		IncomeInvoiceTitle.value = 'Edit Payments Against Inv...';
	} else if (viewOption === 'Update'){
		IncomeInvoiceOpt.value = 'Update';
		IncomeInvoiceTitle.value = 'Edit Payments Against Inv...';
	} else if (viewOption === 'View'){
		IncomeInvoiceOpt.value = 'View';
		IncomeInvoiceTitle.value = 'View Payments Against Inv...';
	}
	
	console.log('tableId: ' + tableId);
	var IncomeInvoiceDataSet = db.execute('SELECT * FROM tbl_income WHERE id = ' + tableId);

	//IncomeInvoiceTitle.value = 'Edit Payments Against Inv...';
	IncomeInvoiceEntryDate.value = changeDateView(IncomeInvoiceDataSet.fieldByName('payment_date'));
	IncomeInvoiceCustomerName.value = IncomeInvoiceDataSet.fieldByName('customer_name');
	IncomeInvoiceNumber.value = IncomeInvoiceDataSet.fieldByName('invoice_no');
	//IncomeInvoiceCategory.value = IncomeInvoiceDataSet.fieldByName('category_id');
	//IncomeInvoiceSubCategory.value = IncomeInvoiceDataSet.fieldByName('sub_category_id');
	IncomeInvoiceInvoiceNet.value = IncomeInvoiceDataSet.fieldByName('net_amount');
	IncomeInvoiceVATPresent.value = IncomeInvoiceDataSet.fieldByName('vat_presentage');
	//IncomeInvoiceVAT.value = IncomeInvoiceDataSet.fieldByName('vat');
	IncomeInvoiceInvoiceTotal.value = IncomeInvoiceDataSet.fieldByName('total_amount');
	IncomeInvoiceAccount.value = IncomeInvoiceDataSet.fieldByName('account_id');
	IncomeInvoiceProject.value = IncomeInvoiceDataSet.fieldByName('project_id');
	IncomeInvoicePicture.value = IncomeInvoiceDataSet.fieldByName('picture_path');

	IncomeInvoiceNote.value = IncomeInvoiceDataSet.fieldByName('note');
	//IncomeInvoiceOpt.value = "Update";
	IncomeInvoiceTableId.value = IncomeInvoiceDataSet.fieldByName('id');

};
