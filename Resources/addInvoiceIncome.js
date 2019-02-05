var txtFld_addIncomeTitle = Ti.UI.createTextField({
	value : 'Add Income',
	visible : false,
});

var txtFld_addIncomeEntryDate = Ti.UI.createTextField({
	value : getDate(),
	visible : false,
});

var txtFld_addIncomeCustomerName = Ti.UI.createTextField({
	value : 0,
	visible : false,
});

var txtFld_addInvoiceNumber = Ti.UI.createTextField({
	value : 0,
	visible : false,
});

var IncomeInvoiceTableId = Ti.UI.createTextField({
	value : '',
	visible : false,
	//backgroundColor : 'pink'
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

var adhocIncomeCategory = Ti.UI.createTextField({
	value : 0,
	visible : false,
});

var addIncomeDisplayOption = 'New';

exports.getInvoiceIncomeView = function() {

	var calcultor = require('calculator');
	var view_calculator = calcultor.calculatorView();
	
	//var deviceHeight = Ti.Platform.displayCaps.platformHeight;

	var logicalDesityFactor = Ti.Platform.displayCaps.logicalDensityFactor * 1;

	var ex_height = Titanium.Platform.displayCaps.platformHeight * 1;
	var ex_width = Ti.Platform.displayCaps.platformWidth * 1;
	if (ex_height > ex_width) {
		var deviceHeight = ((Titanium.Platform.displayCaps.platformHeight * 1) / logicalDesityFactor);
	} else {
		var deviceHeight = ((Titanium.Platform.displayCaps.platformWidth * 1) / logicalDesityFactor);
	}
	
	//# Primary functions

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

			tabledata[i] = Ti.UI.createPickerRow({
				id : getTableData.fieldByName('id'),
				title : getTableData.fieldByName('invoice_no')
			});

			getTableData.next();
			i++;
			
		}
		
		getTableData.close();
		
		tabledata[0] = Ti.UI.createPickerRow({
			id : '0',
			title : 'Please Select',
		});
		
		db.close();

		return tabledata;
	}
		
	function clearContent() {

		txtFld_entryDate.value = getDate();
		var _col = pkr_invoiceNumber.columns[0];
		var len = _col.rowCount;
		for (var x = len - 1; x >= 1; x--) {
			var _row = _col.rows[x];
			_col.removeRow(_row);
		}

		//subCategoryText.value = '';
		//pkr_accountPicker.setSelectedRow(0, 0, false);
		pkr_projectPicker.setSelectedRow(0, 0, false);
		txtFld_paymentAmount.value = '0.00';
		lbl_invoiceTotalValue.text = '';
		lbl_invoiceDueValue.text = '';
		img_picture.image = '/images/camera.png';
		if (addIncomeDisplayOption == 'New') {
			pkr_customerName.setSelectedRow(0, 0, false);
		}

		IncomeInvoiceTableId.value = '';
		txtFld_addIncomeTitle.value = 'Add Payments Against Inv...';

		txtFld_addIncomeEntryDate.value = getDate();
		txtFld_addIncomeCustomerName.value = 0;
		txtFld_addInvoiceNumber.value = 0;

		IncomeInvoiceInvoiceNet.value = '0.00';
		IncomeInvoiceVATPresent.value = 0;

		IncomeInvoiceInvoiceTotal.value = '0.00';
		IncomeInvoiceAccount.value = 0;
		IncomeInvoiceProject.value = 0;

		IncomeInvoicePicture.value = '/images/camera.png';

		IncomeInvoiceNote.value = '';
		IncomeInvoiceNote.blur();
		addIncomeDisplayOption = 'New';
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
		var arr_customerNameData = [];
		arr_customerNameData[0] = Ti.UI.createPickerRow({
			id : '0',
			title : 'Please Select'
		});
		var i = 1;
		while (getTableData.isValidRow()) {
			var customer_id = getTableData.fieldByName('customer_id');
			var customerRecord = db.execute('SELECT * FROM tbl_customer WHERE id=' + customer_id);
			arr_customerNameData[i] = Ti.UI.createPickerRow({
				id : customerRecord.fieldByName('id'),
				title : customerRecord.fieldByName('full_name'),
			});

			getTableData.next();
			i++;
		}
		getTableData.close();
		return arr_customerNameData;
	}

	function getCustomerId() {
		var customerMenuSelect = 0;
		var getTableData = db.execute('SELECT customer_id FROM tbl_invoice WHERE paid = 0 GROUP BY customer_id');
		var i = 1;
		while (getTableData.isValidRow()) {
			if (txtFld_addIncomeCustomerName.value == getTableData.fieldByName('customer_id')) {
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
		Ti.API.info(pkr_invoiceNumber.value);
		var paymentAmount = txtFld_paymentAmount.value;
		paymentAmount = paymentAmount.replace(/,/g, '');
		if (pkr_customerName.value == undefined || pkr_customerName.value == 0) {
			var dialog1 = Ti.UI.createAlertDialog({
				title : 'Alert',
				message : 'Please Select Customer',
				ok : 'OK',
			});
			dialog1.show();
		} else if (pkr_invoiceNumber.value == undefined || pkr_invoiceNumber.value == 0) {
			var dialog2 = Ti.UI.createAlertDialog({
				title : 'Alert',
				message : 'Please Select Invoice Number',
				ok : 'Ok',
			});
			dialog2.show();
		} else if (txtFld_paymentAmount.value == '') {
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
		} else if (getInvoiceDuebyInvoiceNumber(pkr_invoiceNumber.value) < paymentAmount) {
			var dialog5 = Ti.UI.createAlertDialog({
				title : 'Alert',
				message : 'Payment should be less than invoice Due',
				ok : 'Ok',
			});
			dialog5.show();
			//}else if (pkr_accountPicker.value == undefined || pkr_accountPicker.value == '') {
		} else if (pkr_accountPicker.getSelectedRow(0).id == 0) {
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
		Ti.API.info(pkr_invoiceNumber.value);
		var paymentAmount = txtFld_paymentAmount.value;
		paymentAmount = paymentAmount.replace(/,/g, '');
		if (txtFld_paymentAmount.value == '0.00') {
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
		} else if ((getInvoiceDuebyInvoiceNumber(pkr_invoiceNumberUpdate.value) + (IncomeInvoiceInvoiceNet.value * 1)) < paymentAmount) {
			var dialog5 = Ti.UI.createAlertDialog({
				title : 'Alert',
				message : 'Payment should be less than invoice Due',
				ok : 'Ok',
			});
			dialog5.show();
			//}else if (pkr_accountPicker.value == undefined || pkr_accountPicker.value == '') {
		} else if (pkr_accountPicker.getSelectedRow(0).id == 0) {
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

	function getCategoryData() {
		var getTableIncomeCategoryData = db.execute('SELECT * FROM tbl_income_category WHERE enable = 1 ORDER BY income_category COLLATE NOCASE ASC');

		var tableIncomeCategoryData = [];
		var i = 1;
		tableIncomeCategoryData[0] = Ti.UI.createPickerRow({
			id : '0',
			title : 'Select'
		});
		while (getTableIncomeCategoryData.isValidRow()) {
			tableIncomeCategoryData[i] = Ti.UI.createPickerRow({
				id : getTableIncomeCategoryData.fieldByName('id'),
				title : getTableIncomeCategoryData.fieldByName('income_category')
			});
			getTableIncomeCategoryData.next();
			i++;
		}
		getTableIncomeCategoryData.close();

		return tableIncomeCategoryData;
	}

	function getCategoryID() {
		var catMenuIndex = 0;
		var getTableIncomeCategoryData = db.execute('SELECT * FROM tbl_income_category WHERE enable = 1 ORDER BY income_category COLLATE NOCASE ASC');

		var i = 1;
		while (getTableIncomeCategoryData.isValidRow()) {
			if (adhocIncomeCategory.value == getTableIncomeCategoryData.fieldByName('id')) {
				catMenuIndex = i;
			}
			getTableIncomeCategoryData.next();
			i++;
		}
		getTableIncomeCategoryData.close();

		return catMenuIndex;
	}

	function getSubCategoryData(dataGet) {
		//dataGet = 0;
		var db = Ti.Database.open('mywallet');
		var getTableData = db.execute('SELECT * FROM tbl_income_sub_category WHERE enable = 1 AND parent_category=' + dataGet + ' ORDER BY income_sub_category COLLATE NOCASE ASC');

		var tabledata = [];
		var i = 1;
		tabledata[0] = Ti.UI.createPickerRow({
			id : '0',
			title : 'Select',
		});
		while (getTableData.isValidRow()) {
			tabledata[i] = Ti.UI.createPickerRow({
				id : getTableData.fieldByName('id'),
				title : getTableData.fieldByName('income_sub_category')
			});
			getTableData.next();
			i++;
		}
		getTableData.close();
		db.close();

		return tabledata;
	}

	function getSubCategoryID(dataGet) {
		var subMenuIndex = 0;
		//
		var db = Ti.Database.open('mywallet');
		var getTableData = db.execute('SELECT * FROM tbl_income_sub_category WHERE enable = 1 AND parent_category=' + dataGet + ' ORDER BY income_sub_category COLLATE NOCASE ASC');

		var i = 1;
		while (getTableData.isValidRow()) {
			//console.log('>>>> '+expenceSubCategory.value+'  '+getTableData.fieldByName('id'));
			if (adhocIncomeSubCategory.value == getTableData.fieldByName('id')) {
				subMenuIndex = i;
			}
			getTableData.next();
			i++;
		}
		getTableData.close();
		db.close();

		return subMenuIndex;
	}
	
	//# End primary functions
	
	//# Begining of Main UI Container

	var view_mainContainer = Ti.UI.createView({
		height : '100%',
		width : '100%',
		visible : false,
	});
	
	//# Begining of Main UI Container

	//# Begining of title bar
	
	var view_title = Ti.UI.createView({
		height : deviceHeight * 0.075,
		top : '0%',
		backgroundColor : '#2980B9',
	});
	
	var lbl_title = Ti.UI.createLabel({
		text : txtFld_addIncomeTitle.value,
		color : '#FFFFFF',
		font : {
			fontSize : stylefontsize + 4,
			fontFamily : customFont2,
		},
		textAlign : 'center'
	});

	var img_back = Ti.UI.createImageView({
		image : '/images/backbtn.png',
		backgroundSelectedColor : '#999999',
		width : '13%',
		left : '0%',
	});

	img_back.addEventListener('click', function() {
		view_mainContainer.hide();
		clearContent();
	});

	view_title.add(img_back);
	view_title.add(lbl_title);
	view_mainContainer.add(view_title);
	
	//# End of title bar
	
	//# Begining of input fields rows
	
	var view_mainContainerScrollView = Ti.UI.createScrollView({
		width : '100%',
		top : deviceHeight * 0.075,
		bottom : deviceHeight * 0.075,
		height : deviceHeight * 0.925,
		backgroundColor : '#fff',
		layout : 'vertical'
	});
	
	var view_entryDate = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
	});
	
	var lbl_entryDate = Ti.UI.createLabel({
		//text : 'Entry Date *',
		text : 'Date *',
		color : '#000',
		top : 5,
		left : '2%',
		width : '37%',
		height : 40,
	});

	var txtFld_entryDate = Ti.UI.createTextField({
		value : txtFld_addIncomeEntryDate.value,
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
	
	var btn_entryDate = Ti.UI.createView({
		backgroundColor : userInputFeildBackgroundColor,
		top : 5,
		left : '86%',
		width : '12%',
		height : 40,
	});
	
	var img_entryDate = Ti.UI.createImageView({
		width : '70%',
		image : '/images/calendar.png',
	});
	
	btn_entryDate.add(img_entryDate);
		
	view_entryDate.add(lbl_entryDate);
	view_entryDate.add(txtFld_entryDate);
	view_entryDate.add(btn_entryDate);
	view_mainContainerScrollView.add(view_entryDate);
	
	//
	
	var view_accountPicker = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
	});
	
	var lbl_accountPicker = Ti.UI.createLabel({
		text : 'Select Account *',
		color : '#000',
		top : 5,
		left : '2%',
		width : '37%',
		height : 40,

	});

	var pkr_accountPicker = Ti.UI.createPicker({
		top : 5,
		left : '41%',
		width : '57%',
		height : 40,
		backgroundColor : userInputFeildBackgroundColor,
	});

	var getAccountData = db.execute('SELECT * FROM tbl_account');

	var arr_accountData = [];
	
	var i = 1;
	
	arr_accountData[0] = Ti.UI.createPickerRow({
		id : '0',
		title : 'Please Select',
		isDefault : null
	});

	while (getAccountData.isValidRow()) {
		arr_accountData[i] = Ti.UI.createPickerRow({
			id : getAccountData.fieldByName('id'),
			title : getAccountData.fieldByName('account_name'),
			isDefault : getAccountData.fieldByName('is_default')
		});

		getAccountData.next();
		i++;
	}
	
	getAccountData.close();

	pkr_accountPicker.selectionIndicator = true;
	pkr_accountPicker.add(arr_accountData);
	
	var defaultAccountValueRow = null;
	
	for(var i=0 ; i<arr_accountData.length ; i++){
		if(arr_accountData[i].isDefault === 1){
			defaultAccountValueRow = arr_accountData[i].id;
		}
	}
	
	view_accountPicker.add(lbl_accountPicker);
	view_accountPicker.add(pkr_accountPicker);
	view_mainContainerScrollView.add(view_accountPicker);
	
	//
	
	var view_receiptType = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
	});
	
	var lbl_receiptType = Ti.UI.createLabel({
		text : 'Receipt Type *',
		color : '#000',
		top : 5,
		left : '2%',
		width : '37%',
		height : 40,

	});

	var pkr_receiptType = Ti.UI.createPicker({
		backgroundColor : userInputFeildBackgroundColor,
		top : 5,
		left : '41%',
		width : '57%',
		height : 40,
		visible : true,
	});

	var arr_receiptTypeData = [];

	arr_receiptTypeData[0] = Ti.UI.createPickerRow({
		id : '0',
		title : 'Please Select',
	});
	
	arr_receiptTypeData[1] = Ti.UI.createPickerRow({
		id : '1',
		title : 'Customer Payment Against Invoices',
	});
	
	arr_receiptTypeData[2] = Ti.UI.createPickerRow({
		id : '2',
		title : 'Other Bank Receipts',
	});

	pkr_receiptType.selectionIndicator = true;
	pkr_receiptType.add(arr_receiptTypeData);

	var pkr_receiptTypeUpdate = Ti.UI.createTextField({
		backgroundColor : userInputFeildBackgroundColor,
		top : 5,
		left : '41%',
		width : '57%',
		height : 40,
		editable : false,
		visible : false,
	});
	
	view_receiptType.add(lbl_receiptType);
	view_receiptType.add(pkr_receiptType);
	view_receiptType.add(pkr_receiptTypeUpdate);
	view_mainContainerScrollView.add(view_receiptType);
		
	//
	
	var view_customerName = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
	});
	
	var lbl_customerName = Ti.UI.createLabel({
		text : 'Customer Name *',
		color : '#000',
		top : 5,
		left : '2%',
		width : '37%',
		height : 40,

	});

	var pkr_customerName = Ti.UI.createPicker({
		backgroundColor : userInputFeildBackgroundColor,
		top : 5,
		left : '41%',
		width : '57%',
		height : 40,
		visible : false,
	});

	var arr_customerNameData = [];

	arr_customerNameData = getCustomerInvoiceDtails();

	pkr_customerName.selectionIndicator = true;
	pkr_customerName.add(arr_customerNameData);

	var pkr_customerNameUpdate = Ti.UI.createTextField({
		backgroundColor : userInputFeildBackgroundColor,
		top : 5,
		left : '41%',
		width : '57%',
		height : 40,
		editable : false,
		visible : false,
	});
	
	view_customerName.add(lbl_customerName);
	view_customerName.add(pkr_customerName);
	view_customerName.add(pkr_customerNameUpdate);
	view_mainContainerScrollView.add(view_customerName);
	
	//
	
	var view_categoty = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
	});
	
	var categoryLabel = Ti.UI.createLabel({
		text : 'Category *',
		color : '#000',
		top : 5,
		left : '2%',
		width : '37%',
		height : 40,
	});

	var categoryText = Ti.UI.createPicker({
		top : 5,
		left : '41%',
		width : '57%',
		height : 40,
		backgroundColor : '#A0A0A0',
	});
	
	var tableIncomeCategoryData = [];
	
	tableIncomeCategoryData = getCategoryData();

	categoryText.selectionIndicator = true;
	categoryText.add(tableIncomeCategoryData);

	var adhocCatIndex = getCategoryID();
	categoryText.setSelectedRow(0, adhocCatIndex);
	
	view_categoty.add(categoryLabel);
	view_categoty.add(categoryText);
	view_mainContainerScrollView.add(view_categoty);
	
	//
	
	var view_subCategoty = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
	});

	var subCategoryLabel = Ti.UI.createLabel({
		text : 'Sub Category *',
		color : '#000',
		top : 5,
		left : '2%',
		width : '37%',
		height : 40,

	});

	var subCategoryText = Ti.UI.createPicker({
		top : 5,
		left : '41%',
		width : '43%',
		height : 40,
		backgroundColor : '#A0A0A0',
		selectionIndicator : true,
	});

	var subCategoryTextData = [];
	subCategoryTextData = getSubCategoryData(adhocIncomeCategory.value);
	subCategoryText.add(subCategoryTextData);

	Ti.API.info('adinc Cat ID : ' + adhocIncomeCategory.value);
	var subCatIndex = getSubCategoryID(adhocIncomeCategory.value);
	Ti.API.info('add inc Sub Cat ID : ' + subCatIndex);
	subCategoryText.setSelectedRow(0, subCatIndex);

	var btnaddsubCategory = Ti.UI.createView({
		//type:Ti.UI.PICKER_TYPE_DATE,
		backgroundColor : '#A0A0A0',
		top : 5,
		left : '86%',
		width : '12%',
		height : 40,
	});

	var imgaddsubCategory = Ti.UI.createImageView({
		width : '70%',
		image : '/images/add.png',
	});
	
	btnaddsubCategory.add(imgaddsubCategory);
	
	view_subCategoty.add(subCategoryLabel);
	view_subCategoty.add(subCategoryText);
	view_subCategoty.add(btnaddsubCategory);
	view_mainContainerScrollView.add(view_subCategoty);
	
	//
	
	var view_invoiceNumber = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
	});
	
	var lbl_invoiceNumber = Ti.UI.createLabel({
		text : 'Invoice No ',
		color : '#000',
		top : 5,
		left : '2%',
		width : '37%',
		height : 40,

	});

	var pkr_invoiceNumber = Ti.UI.createPicker({
		top : 5,
		left : '41%',
		width : '57%',
		height : 40,
		backgroundColor : userInputFeildBackgroundColor,
		visible : false,
	});

	var arr_invoiceData = [];

	arr_invoiceData = getInvoiceData(0);

	pkr_invoiceNumber.selectionIndicator = true;
	pkr_invoiceNumber.add(arr_invoiceData);

	var pkr_invoiceNumberUpdate = Ti.UI.createTextField({
		top : 5,
		left : '41%',
		width : '57%',
		height : 40,
		editable : false,
		visible : false,
		backgroundColor : userInputFeildBackgroundColor,
	});
	
	view_invoiceNumber.add(lbl_invoiceNumber);
	view_invoiceNumber.add(pkr_invoiceNumber);
	view_invoiceNumber.add(pkr_invoiceNumberUpdate);
	view_mainContainerScrollView.add(view_invoiceNumber);
	
	//
	
	var view_invoiceTotal = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
	});
	
	var lbl_invoiceTotal = Ti.UI.createLabel({
		text : 'Invoice Total',
		color : '#000',
		top : 5,
		left : '2%',
		width : '37%',
		height : 40,
	});

	var lbl_invoiceTotalValue = Ti.UI.createLabel({
		color : '#ccc',
		top : 5,
		left : '43%',
		width : '57%',
		height : 40,
	});
	
	view_invoiceTotal.add(lbl_invoiceTotal);
	view_invoiceTotal.add(lbl_invoiceTotalValue);
	view_mainContainerScrollView.add(view_invoiceTotal);
	
	//
	
	var view_invoiceDue = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
	});	

	var lbl_invoiceDue = Ti.UI.createLabel({
		text : 'Total Due',
		color : '#000',
		top : 5,
		left : '2%',
		width : '37%',
		height : 40,
	});

	var lbl_invoiceDueValue = Ti.UI.createLabel({
		color : '#ccc',
		top : 5,
		left : '43%',
		width : '57%',
		height : 40,
	});
	
	view_invoiceDue.add(lbl_invoiceDue);
	view_invoiceDue.add(lbl_invoiceDueValue);
	view_mainContainerScrollView.add(view_invoiceDue);
	
	//
	
	var view_paymentAmount = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
	});
	
	var lbl_paymentAmount = Ti.UI.createLabel({
		text : 'Payment Amount *',
		color : '#000',
		top : 5,
		left : '2%',
		width : '37%',
		height : 40,

	});

	var txtFld_paymentAmount = Ti.UI.createTextField({
		backgroundColor : userInputFeildBackgroundColor,
		top : 5,
		left : '41%',
		width : '43%',
		height : 40,
		keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		editable : false,
		value : toDecimalFormatWithoutCurrency(IncomeInvoiceInvoiceNet.value * 1),
	});

	/*txtFld_paymentAmount.addEventListener('singletap', function() {
		calcultor.setTxtObj(txtFld_paymentAmount);
		view_calculator.show();
	});*/
	
	var editIncPayAmntBtn = Ti.UI.createView({
		backgroundColor : '#A0A0A0',
		top : 5,
		left : '86%',
		width : '12%',
		height : 40,
	});

	var imgeditIncPayImg = Ti.UI.createImageView({
		width : '60%',
		image : '/images/calculator.png',
	});
	editIncPayAmntBtn.add(imgeditIncPayImg);

	editIncPayAmntBtn.addEventListener('singletap', function() {
		calcultor.setTxtObj(txtFld_amountReceived);
		view_calculator.show();
	});

	
	view_paymentAmount.add(lbl_paymentAmount);
	view_paymentAmount.add(txtFld_paymentAmount);
	view_paymentAmount.add(editIncPayAmntBtn);
	view_mainContainerScrollView.add(view_paymentAmount);
	
	//
	
	var view_projectPicker = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
	});
	
	var lbl_projectPicker = Ti.UI.createLabel({
		text : "Internal Ref. No",
		color : '#000',
		top : 5,
		left : '2%',
		width : '37%',
		height : 40,

	});

	var pkr_projectPicker = Ti.UI.createPicker({
		top : 5,
		left : '41%',
		width : '57%',
		height : 40,
		backgroundColor : userInputFeildBackgroundColor,
	});

	var getProjectData = db.execute('SELECT * FROM tbl_project');

	var arr_projectData = [];
	
	arr_projectData[0] = Ti.UI.createPickerRow({
		id : '0',
		title : 'Please Select',
	});
	
	var i = 1;

	while (getProjectData.isValidRow()) {
		
		arr_projectData[i] = Ti.UI.createPickerRow({
			id : getProjectData.fieldByName('id'),
			title : getProjectData.fieldByName('project_name')
		});

		getProjectData.next();
		i++;
		
	}
	
	getProjectData.close();

	pkr_projectPicker.selectionIndicator = true;
	
	pkr_projectPicker.add(arr_projectData);

	pkr_projectPicker.setSelectedRow(0, IncomeInvoiceProject.value);	
	
	view_projectPicker.add(lbl_projectPicker);
	view_projectPicker.add(pkr_projectPicker);
	view_mainContainerScrollView.add(view_projectPicker);
	
	//
	
	var view_note = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
	});
	
	var lbl_note = Ti.UI.createLabel({
		text : 'Note',
		color : '#000',
		top : 5,
		left : '2%',
		width : '37%',
		height : 40,

	});

	var txtFld_note = Ti.UI.createTextArea({
		borderWidth : 2,
		borderColor : '#bbb',
		borderRadius : 0,
		textAlign : 'left',
		backgroundColor : userInputFeildBackgroundColor,
		top : 5,
		left : '41%',
		width : '57%',
		height : 120,
		value : IncomeInvoiceNote.value,
	});
	
	view_note.add(lbl_note);
	view_note.add(txtFld_note);
	view_mainContainerScrollView.add(view_note);
	
	//
	
	var view_picture = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
	});
	
	var lbl_picture  = Ti.UI.createLabel({
		text : 'Picture',
		color : '#000',
		top : 5,
		left : '2%',
		width : '37%',
		height : 40,

	});

	var img_picture = Ti.UI.createImageView({
		backgroundColor : userInputFeildBackgroundColor,
		top : 5,
		left : '41%',
		width : '57%',
		height : 120,
		bottom : 50,
		image : (IncomeInvoicePicture.value == '/images/camera.png') ? IncomeInvoicePicture.value : Ti.Utils.base64decode(IncomeInvoicePicture.value),
	});
	
	view_picture.add(lbl_picture);
	view_picture.add(img_picture);
	view_mainContainerScrollView.add(view_picture);
	
	//# End of create input fields rows
	
	//# Begining of validating income display option
	
	if (addIncomeDisplayOption == 'New'){
		
		if(defaultAccountValueRow === null){
			pkr_accountPicker.setSelectedRow(0, IncomeInvoiceAccount.value);
		} else {
			pkr_accountPicker.setSelectedRow(0, defaultAccountValueRow);
			pkr_accountPicker.value = defaultAccountValueRow;
		}
		
		pkr_customerName.visible = true;
		pkr_invoiceNumber.visible = true;
		
		lbl_invoiceTotalValue.text = toDecimalFormatView(0);
		lbl_invoiceDueValue.text = toDecimalFormatView(0);
		
	} else {
		
		pkr_accountPicker.setSelectedRow(0, IncomeInvoiceAccount.value);
		
		pkr_customerNameUpdate.visible = true;
		pkr_customerNameUpdate.value = getCustomerNameById(txtFld_addIncomeCustomerName.value);
		
		pkr_invoiceNumberUpdate.visible = true;
		pkr_invoiceNumberUpdate.value = txtFld_addInvoiceNumber.value;
		
		lbl_invoiceTotalValue.text = toDecimalFormatView(getInvoiceTotal(txtFld_addInvoiceNumber.value));
		lbl_invoiceDueValue.text = toDecimalFormatView(getInvoiceDuebyInvoiceNumber(txtFld_addInvoiceNumber.value));
		
		if (addIncomeDisplayOption == 'View') {
			//TODO : Disable all fields
		}
		
	}

	//# End of validating income display option
	
	//# Begining of footer buttons container

	var view_footerBtnContainer = Ti.UI.createView({
		bottom: 0,
		width : '100%',
		height : appPixel * 7.5,
		backgroundColor : '#054e62'
	});

	var btn_cancel = Ti.UI.createButton({
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

	var btn_save = Ti.UI.createButton({
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

	var btn_next = Ti.UI.createButton({
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
	
	var btn_edit = Ti.UI.createButton({
		title : 'Edit',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		backgroundColor : '#054e62',
		backgroundSelectedColor : '#0a7390',
		height : '100%',
		width : '33%',
		font : {
			fontSize : stylefontsize - 5,
			fontFamily : customFont1
		},
	});
	
	btn_edit.addEventListener('click', function() {
		view_footerBtnContainer.remove(btn_edit);
		view_footerBtnContainer.add(btn_cancel);
		view_footerBtnContainer.add(btn_save);
	});
	
	btn_save.addEventListener('click', function(e) {		
		if (addIncomeDisplayOption == 'New') {
			if (invoiceIncomeRecordValidate()) {
				var invoice_no = pkr_invoiceNumber.value;
				var categoryDetails = getCategoryDetails(invoice_no);
				var duepayment = getInvoiceDuebyInvoiceNumber(invoice_no);
				var paymentAmount = txtFld_paymentAmount.value;
				paymentAmount = paymentAmount.replace(/,/g, '');
				var dateForSave = dateSaveChange(txtFld_entryDate.value);
				var imageData = (getImage == undefined ) ? IncomeInvoicePicture.value : Ti.Utils.base64encode(getImage);

				var dbData = {
					payment_date : dateForSave,
					category_id : categoryDetails['category'],
					sub_category_id : categoryDetails['sub_category'],
					customer_name : pkr_customerName.value,
					invoice_no : pkr_invoiceNumber.value,
					account_id : pkr_accountPicker.value,
					project_id : pkr_projectPicker.value,
					net_amount : paymentAmount,
					vat : '0',
					total_amount : paymentAmount,
					picture_path : imageData,
					note : txtFld_note.value,
				};

				console.log(dbData);

				var getResult = saveInvoiceIncomeData(dbData);
				var paymentAmount = txtFld_paymentAmount.value;
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
					view_mainContainer.hide();
				}

				view_mainContainer.hide();
				clearContent();
				view_transparentPopupContainer.hide();
				view_calculator.hide();
				view_mainContainerScrollView.scrollingEnabled = true;
			}

		} else {
			
			Ti.API.info('Update Recordd');
			if (invoiceIncomeRecordValidateUpdate()) {

				var invoice_no = pkr_invoiceNumberUpdate.value;
				var categoryDetails = getCategoryDetails(invoice_no);
				var duepayment = getInvoiceDuebyInvoiceNumber(invoice_no);
				var paymentAmount = txtFld_paymentAmount.value;
				paymentAmount = paymentAmount.replace(/,/g, '');
				var dateForSave = dateSaveChange(txtFld_entryDate.value);

				var imageData = (getImage == undefined ) ? IncomeInvoicePicture.value : Ti.Utils.base64encode(getImage);

				var dbData = {
					payment_date : dateForSave,
					category_id : categoryDetails['category'],
					sub_category_id : categoryDetails['sub_category'],
					customer_name : txtFld_addIncomeCustomerName.value,
					invoice_no : pkr_invoiceNumberUpdate.value,
					account_id : pkr_accountPicker.getSelectedRow(0).id,
					project_id : pkr_projectPicker.getSelectedRow(0).id,
					net_amount : paymentAmount,
					vat : '0',
					total_amount : paymentAmount,
					picture_path : imageData,
					note : txtFld_note.value,
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

				view_mainContainer.hide();
				clearContent();
				view_transparentPopupContainer.hide();
				view_calculator.hide();
				view_mainContainerScrollView.scrollingEnabled = true;
			}
		}
	});

	btn_next.addEventListener('click', function(e) {
		if (invoiceIncomeRecordValidate()) {
			// validated
			var invoice_no = pkr_invoiceNumber.value;
			var categoryDetails = getCategoryDetails(invoice_no);
			var duepayment = getInvoiceDuebyInvoiceNumber(invoice_no);
			var paymentAmount = txtFld_paymentAmount.value;
			paymentAmount = paymentAmount.replace(/,/g, '');
			var dateForSave = dateSaveChange(txtFld_entryDate.value);
			var imageData = (getImage == undefined ) ? IncomeInvoicePicture.value : Ti.Utils.base64encode(getImage);
			Ti.API.info('Validated');
			var dbData = {
				payment_date : dateForSave,
				category_id : categoryDetails['category'],
				sub_category_id : categoryDetails['sub_category'],
				customer_name : pkr_customerName.value,
				invoice_no : pkr_invoiceNumber.value,
				account_id : pkr_accountPicker.value,
				project_id : pkr_projectPicker.value,
				net_amount : paymentAmount,
				vat : '0',
				total_amount : paymentAmount,
				picture_path : imageData,
			};

			var getResult = saveInvoiceIncomeData(dbData);

			var paymentAmount = txtFld_paymentAmount.value;
			paymentAmount = paymentAmount.replace(/,/g, '');

			if (duepayment == paymentAmount) {
				updateInvoiceWithPaidStatus(invoice_no);
			}

			if (getResult) {
				clearContent();
				view_mainContainerScrollView.scrollTo(0,0);
				var toast = Ti.UI.createNotification({
					message : "Save Successful",
					duration : Ti.UI.NOTIFICATION_DURATION_SHORT
				});
				toast.show();
			}
		}
	});

	btn_cancel.addEventListener('click', function() {
		view_mainContainer.hide();
		clearContent();
	});

	if (addIncomeDisplayOption == 'New') {
		view_footerBtnContainer.add(btn_cancel);
		view_footerBtnContainer.add(btn_save);
		view_footerBtnContainer.add(btn_next);
	} else if (addIncomeDisplayOption == 'View') {
		view_footerBtnContainer.add(btn_edit);
		btn_save.right = '0%';
		btn_save.title = 'Update';
	} else if (addIncomeDisplayOption == 'Update') {
		view_footerBtnContainer.add(btn_cancel);
		view_footerBtnContainer.add(btn_save);
		btn_save.right = '0%';
		btn_save.title = 'Update';
	}
	
	//# End of footer button container
	
	//# add input fields
	//view_mainContainerScrollView.add(lbl_entryDate);
	//view_mainContainerScrollView.add(txtFld_entryDate);
	//view_mainContainerScrollView.add(btn_entryDate);
	//view_mainContainerScrollView.add(lbl_accountPicker);
	//view_mainContainerScrollView.add(pkr_accountPicker);
	//view_mainContainerScrollView.add(lbl_customerName);
	//view_mainContainerScrollView.add(pkr_customerName);
	//view_mainContainerScrollView.add(pkr_customerNameUpdate);
	//view_mainContainerScrollView.add(lbl_invoiceNumber);
	//view_mainContainerScrollView.add(pkr_invoiceNumber);
	//view_mainContainerScrollView.add(pkr_invoiceNumberUpdate);
	//view_mainContainerScrollView.add(lbl_invoiceTotal);
	//view_mainContainerScrollView.add(lbl_invoiceTotalValue);
	//view_mainContainerScrollView.add(lbl_invoiceDue);
	//view_mainContainerScrollView.add(lbl_invoiceDueValue);
	//view_mainContainerScrollView.add(lbl_paymentAmount);
	//view_mainContainerScrollView.add(txtFld_paymentAmount);
	//view_mainContainerScrollView.add(lbl_projectPicker);
	//view_mainContainerScrollView.add(pkr_projectPicker);
	//view_mainContainerScrollView.add(lbl_note);
	//view_mainContainerScrollView.add(txtFld_note);
	//view_mainContainerScrollView.add(lbl_picture );
	//view_mainContainerScrollView.add(img_picture);	
	//view_mainContainerScrollView.add(view_footerBtnContainer);
	//view_mainContainerScrollView.add(invoiceIncomeRecordDeleteConf);
	//view_mainContainer.add(IncomeInvoiceTableId);
	//view_mainContainer.add(txtFld_addIncomeTitle);
	//view_mainContainer.add(txtFld_addIncomeEntryDate);
	//view_mainContainer.add(txtFld_addIncomeCustomerName);
	//view_mainContainer.add(IncomeInvoiceInvoiceNet);
	//view_mainContainer.add(IncomeInvoiceVATPresent);
	//view_mainContainer.add(IncomeInvoiceVAT);
	//view_mainContainer.add(IncomeInvoiceInvoiceTotal);
	//view_mainContainer.add(IncomeInvoiceAccount);
	//view_mainContainer.add(IncomeInvoiceProject);
	//view_mainContainer.add(IncomeInvoicePicture);
	//view_mainContainer.add(IncomeInvoiceNote);
	//view_mainContainer.add(IncomeInvoiceOpt);
		
	//# End of Add Input Fields
	
	//# Begining of transparent popup view
	
	var view_transparentPopupContainer = Ti.UI.createView({
		visible : false,
		zIndex : 200,
	});

	var view_transparentPopupBackground = Ti.UI.createView({// Also full screen
		backgroundColor : '#000',
		opacity : 0.6
	});
	
	var view_transparentPopupInnerContainer = Ti.UI.createView({// Set height appropriately
		layout : 'vertical',
		width : '85%',
		height : deviceHeight * 0.36,
		backgroundColor : '#FFF',
	});

	var view_popuptitle = Ti.UI.createView({
		height : deviceHeight * 0.075,
		backgroundColor : '#2980B9',
	});

	var lbl_addFromImage = Ti.UI.createLabel({
		text : 'Add Image From',
		color : '#FFFFFF',
		font : {
			fontSize : stylefontsize + 2,
			//fontFamily : customFont2,
		},
	});

	var img_transparentPopupClose = Ti.UI.createImageView({
		image : '../images/closebtn.png',
		backgroundSelectedColor : '#999999',
		width : '9%',
		right : '3%',
	});

	view_popuptitle.add(lbl_addFromImage);
	view_popuptitle.add(img_transparentPopupClose);
	view_transparentPopupInnerContainer.add(view_popuptitle);

	var btn_addFromCamera = Ti.UI.createView({
		backgroundColor : settingsbtncol,
		backgroundSelectedColor : settingsbtnselectedcol,
		left : '1%',
		right : '1%',
		top : '2%',
		bottom : '0.5%',
		// height : deviceHeight * 0.11,
		height : settingOptionHeight,
	});

	var lbl_addFromCamera = Ti.UI.createLabel({
		text : 'Add From Camera',
		//width : '70%',
		color : settingsbtnfontcolor,
		left : '5%',
		font : {
			//fontFamily : customFont1,
			fontSize : stylefontsize,
		},
	});

	btn_addFromCamera.add(lbl_addFromCamera);
	view_transparentPopupInnerContainer.add(btn_addFromCamera);

	var btn_addFromGallery = Ti.UI.createView({
		backgroundColor : settingsbtncol,
		backgroundSelectedColor : settingsbtnselectedcol,
		left : '1%',
		right : '1%',
		top : '1%',
		bottom : '0.5%',
		// height : deviceHeight * 0.11,
		height : settingOptionHeight,
	});

	var lbl_addFromGallery = Ti.UI.createLabel({
		text : 'Add From Gallery',
		//width : '70%',
		color : settingsbtnfontcolor,
		left : '5%',
		font : {
			//fontFamily : customFont1,
			fontSize : stylefontsize,
		},
	});

	btn_addFromGallery.add(lbl_addFromGallery);
	view_transparentPopupInnerContainer.add(btn_addFromGallery);

	var btn_removeImage = Ti.UI.createView({
		backgroundColor : settingsbtncol,
		backgroundSelectedColor : settingsbtnselectedcol,
		left : '1%',
		right : '1%',
		top : '1%',
		bottom : '0.5%',
		// height : deviceHeight * 0.11,
		height : settingOptionHeight,
	});

	var lbl_removeImage = Ti.UI.createLabel({
		text : 'Remove Image',
		//width : '70%',
		color : settingsbtnfontcolor,
		left : '5%',
		font : {
			//fontFamily : customFont1,
			fontSize : stylefontsize,
		},
	});

	btn_removeImage.add(lbl_removeImage);
	view_transparentPopupInnerContainer.add(btn_removeImage);

	view_transparentPopupContainer.add(view_transparentPopupBackground);
	view_transparentPopupContainer.add(view_transparentPopupInnerContainer);
	
	//# End of transparent popup view
	
	//# Begining of event listeners
	
	pkr_receiptType.addEventListener('change', function(e) {

		pkr_receiptType.value = e.row.id;

		if (pkr_receiptType.value == 1) {
			// show fields for payments againtst invoices
		} else if (pkr_receiptType.value == 2) {
			// show fields for other bank receipts
		} else {
			// show none
			/*view_customerName;
			view_invoiceNumber;
			view_invoiceTotal;
			view_invoiceDue;
			view_paymentAmount;
			view_project;
			view_note;
			view_picture;*/
		}

	});
	
	pkr_customerName.addEventListener('change', function(e) {

		pkr_customerName.value = e.row.id;

		if (pkr_invoiceNumber.columns[0]) {
			var _col = pkr_invoiceNumber.columns[0];
			var len = _col.rowCount;
			for (var x = len - 1; x >= 0; x--) {
				var _row = _col.rows[x];
				_col.removeRow(_row);
			}
		}

		arr_invoiceData = getInvoiceData(e.row.id);

		pkr_invoiceNumber.add(arr_invoiceData);

	});

	pkr_invoiceNumber.addEventListener('change', function(e) {

		if (e.rowIndex != '0') {
			pkr_invoiceNumber.value = e.row.title;
			// Get Invoic Total
			var invoiceTotal = getInvoiceTotal(e.row.title);
			lbl_invoiceTotalValue.text = toDecimalFormatView(invoiceTotal);
			// get invoice due from invoice number
			var invoiceDue = getInvoiceDuebyInvoiceNumber(e.row.title);
			lbl_invoiceDueValue.text = toDecimalFormatView(invoiceDue);
		} else {
			pkr_invoiceNumber.value = '0';
			lbl_invoiceTotalValue.text = toDecimalFormatView(0);
			lbl_invoiceDueValue.text = toDecimalFormatView(0);
		}

	});

	pkr_accountPicker.addEventListener('change', function(e) {
		pkr_accountPicker.value = e.row.id;
	});

	pkr_projectPicker.addEventListener('change', function(e) {
		pkr_projectPicker.value = e.row.id;
	});

	img_picture.addEventListener('click', function(e) {
		view_transparentPopupContainer.show();
		view_mainContainerScrollView.scrollingEnabled = false;
	});

	view_mainContainerScrollView.addEventListener('onload', function(e) {
		view_transparentPopupContainer.hide();
		view_mainContainerScrollView.scrollingEnabled = true;
	});

	img_transparentPopupClose.addEventListener('click', function() {
		view_transparentPopupContainer.hide();
		view_mainContainerScrollView.scrollingEnabled = true;
	});

	view_transparentPopupBackground.addEventListener('click', function() {
		view_transparentPopupContainer.hide();
		view_mainContainerScrollView.scrollingEnabled = true;
	});

	btn_addFromCamera.addEventListener('click', function() {
		var getImage;
		view_transparentPopupContainer.hide();
		view_mainContainerScrollView.scrollingEnabled = true;
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
					img_picture.image = getImage;
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
							img_picture.image = getImage;
						},
						allowEditing : true,
						mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
					});

				}
			});

		}
	});

	btn_addFromGallery.addEventListener('click', function() {
		view_transparentPopupContainer.hide();
		view_mainContainerScrollView.scrollingEnabled = true;
		console.log('Gallery');

		Titanium.Media.openPhotoGallery({
			success : function(e) {
				var mediaImage = e.media;
				var max_width = 800;
				var max_height = 400;
				getImage = imageGetResize(mediaImage, max_width, max_height);

				img_picture.image = getImage;
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

	btn_removeImage.addEventListener('click', function(argument) {
		img_picture.image = '/images/camera.png';

		IncomeInvoicePicture.value = '/images/camera.png';
		view_transparentPopupContainer.hide();
		view_mainContainerScrollView.scrollingEnabled = true;
	});

	btn_entryDate.addEventListener('click', function(e) {
		//supplierInvDateText.value = e.row.id;
		//console.log("User selected date: " + e.value.toLocaleString());
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
					//selectedDate = pickerYear + '-' + pickerMonth + '-' + pickerDate;
					selectedDate = pickerDate + '/' + pickerMonth + '/' + pickerYear;
					txtFld_entryDate.value = selectedDate;
					entryDatePicker.value = e.value;
					txtFld_entryDate.blur();
				}
			}
		});

	});

	txtFld_entryDate.addEventListener('singletap', function(e) {
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
					txtFld_entryDate.value = selectedDate;
					entryDatePicker.value = e.value;
					txtFld_entryDate.blur();
				}
			}
		});

	});
			
	Ti.App.addEventListener('addview_mainContainerClose', function(e) {
		view_mainContainer.hide();
		clearContent();
		view_transparentPopupContainer.hide();
		view_calculator.hide();
		view_mainContainerScrollView.scrollingEnabled = true;
	});

	Ti.App.addEventListener('editview_mainContainerClose', function(e) {
		view_mainContainer.hide();
		clearContent();
		view_transparentPopupContainer.hide();
		view_calculator.hide();
		view_mainContainerScrollView.scrollingEnabled = true;

	});

	//# End of event listeners
	
	view_mainContainer.add(view_mainContainerScrollView);
	view_mainContainer.add(view_footerBtnContainer);
	view_mainContainer.add(view_transparentPopupContainer);
	view_mainContainer.add(view_calculator);

	return view_mainContainer;
	
};

exports.setIncomeInvoiceData = function(tableId) {
	console.log('tableId: ' + tableId);
	var IncomeInvoiceDataSet = db.execute('SELECT * FROM tbl_income WHERE id = ' + tableId);

	txtFld_addIncomeTitle.value = 'Edit Income';
	txtFld_addIncomeEntryDate.value = changeDateView(IncomeInvoiceDataSet.fieldByName('payment_date'));
	txtFld_addIncomeCustomerName.value = IncomeInvoiceDataSet.fieldByName('customer_name');
	txtFld_addInvoiceNumber.value = IncomeInvoiceDataSet.fieldByName('invoice_no');
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
	addIncomeDisplayOption = "Update";
	IncomeInvoiceTableId.value = IncomeInvoiceDataSet.fieldByName('id');

};
