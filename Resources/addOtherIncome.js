var adhocIncomeTableId = Ti.UI.createTextField({
	value : '',
	visible : false,
});
var adhocIncomeTitle = Ti.UI.createTextField({
	value : 'Add Bank Receipt',
	visible : false,
});
var adhocIncomeEntryDate = Ti.UI.createTextField({
	value : getDate(),
	visible : false,
});
var adhocIncomeCategory = Ti.UI.createTextField({
	value : 0,
	visible : false,
});
var adhocIncomeSubCategory = Ti.UI.createTextField({
	value : 0,
	visible : false,
});
var txtFld_addIncomeAccount = Ti.UI.createTextField({
	value : 0,
	visible : false,
});
var adhocIncomeProject = Ti.UI.createTextField({
	value : '',
	visible : false,
});
var adhocIncomeInvoiceNet = Ti.UI.createTextField({
	value : '0.00',
	visible : false,
});
var adhocIncomeVATPresent = Ti.UI.createTextField({
	value : '',
	visible : false,
});
var adhocIncomeVAT = Ti.UI.createTextField({
	value : '0.00',
	visible : false,
});
var adhocIncomeInvoiceTotal = Ti.UI.createTextField({
	value : '0.00',
	visible : false,
});

var adhocIncomePicture = Ti.UI.createTextField({
	value : '/images/camera.png',
	visible : false,
});

var adhocIncomeCustomerName = Ti.UI.createTextField({
	value : 0,
	visible : false,
});

var adhocIncomeNote = Ti.UI.createTextField({
	value : '',
	visible : false,
});

//%

var txtFld_addIncomeExcessCredit = Ti.UI.createTextField({
	value : 0,
	visible : false,
});

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

var txtFld_addCustomerCredits = Ti.UI.createTextField({
	value : 0,
	visible : false,
});

var txtFld_addInvoiceNumber = Ti.UI.createTextField({
	value : 0,
	visible : false,
});

var txtFld_addIncomeInvoiceTableID = Ti.UI.createTextField({
	value : '',
	visible : false,
});

var txtFld_addIncomeInvoiceNet = Ti.UI.createTextField({
	value : '0.00',
	visible : false,
});
var txtFld_addIncomeInvoiceVATPercentage = Ti.UI.createTextField({
	value : 0,
	visible : false,
});

var txtFld_addIncomeInvoiceTotal = Ti.UI.createTextField({
	value : '0.00',
	visible : false,
});

var txtFld_addIncomeAccount = Ti.UI.createTextField({
	value : 0,
	visible : false,
});

var txtFld_addIncomeProject = Ti.UI.createTextField({
	value : 0,
	visible : false,
});

var txtFld_addIncomePicture = Ti.UI.createTextField({
	value : '/images/camera.png',
	visible : false,
});

var txtFld_addIncomeNote = Ti.UI.createTextField({
	value : '',
	visible : false,
});

var txtFld_addIncomeCategory = Ti.UI.createTextField({
	value : 0,
	visible : false,
});

var txtFld_addCustomerCredit = Ti.UI.createTextField({
	value : 0,
	visible : false,
});

var pkr_projectPicker = Ti.UI.createTextField({
		top : 5,
		left : '41%',
		width : '57%',
		height : 40,
		backgroundColor : '#A0A0A0',
	});

//%
var editTransactionId=0;
var addIncomeDisplayOption = 'New';
var addIncomeReceiptTypeOption = 0;

var isManualVAT = false;
var isVATApply = 0;
var bellowTaxElements = [];

exports.addIncome = function() {

	//var deviceHeight = Ti.Platform.displayCaps.platformHeight;

	var logicalDesityFactor = Ti.Platform.displayCaps.logicalDensityFactor * 1;

	var ex_height = Titanium.Platform.displayCaps.platformHeight * 1;
	var ex_width = Ti.Platform.displayCaps.platformWidth * 1;
	if (ex_height > ex_width) {
		var deviceHeight = ((Titanium.Platform.displayCaps.platformHeight * 1) / logicalDesityFactor);
	} else {
		var deviceHeight = ((Titanium.Platform.displayCaps.platformWidth * 1) / logicalDesityFactor);
	}
	
	//# Required Files

	var calcultor = require('calculator');
	var view_calculator = calcultor.calculatorView();

	
	//# End of Required Files

	//# Primary Functions

	//getCustomerData();

	function clearIncomeForm(){
		
		///
		if (isFormNotEmpty()){
			var alertBoxDelete = Ti.UI.createAlertDialog({
				cancel : 1,
				buttonNames : ['Yes', 'No'],
				message : 'This Income entry is not empty.\nAre you sure you want to clear all the fields?',
				title : 'Cancel entry?'
			});

			alertBoxDelete.show();
		//var parent = this;
		var responseBtn = false;
		
			alertBoxDelete.addEventListener('click', function(event) {

				if (event.index === 0) {
					clearContent();
					responseBtn = true;
				}
			});
			return responseBtn;
		}else{
			clearContent();
			responseBtn = true;
		}
		////
		
	}

	function saveAdhocIncomeData(dbData) {
		var db = Ti.Database.open('mywallet');
		db.execute('INSERT INTO tbl_income(payment_date, category_id, sub_category_id, account_id, project_id, net_amount, vat, total_amount, picture_path, customer_name,note,vat_presentage) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)', dbData.payment_date, dbData.category_id, dbData.sub_category_id, dbData.account_id, dbData.project_id, dbData.net_amount, dbData.vat, dbData.total_amount, dbData.picture_path, dbData.customer_name, dbData.note, dbData.vat_presentage);
		db.close();
		return true;
	}

	function updateAdhocIncomeData(dbData, tableID) {
		var db = Ti.Database.open('mywallet');
		db.execute('UPDATE tbl_income SET payment_date="' + dbData.payment_date + '", category_id=' + dbData.category_id + ', sub_category_id=' + dbData.sub_category_id + ', account_id=' + dbData.account_id + ', project_id="' + dbData.project_id + '", net_amount="' + dbData.net_amount + '", vat="' + dbData.vat + '", total_amount="' + dbData.total_amount + '", picture_path="' + dbData.picture_path + '", customer_name="' + dbData.customer_name + '", note="' + dbData.note + '", vat_presentage="' + dbData.vat_presentage + '" WHERE id = ' + tableID);
		db.close();
		return true;
	}
	
	function updateCustomerCreditData(cus_credit, cus_name) {
		Ti.API.info('CUS NAME : ' + cus_name);
		var db = Ti.Database.open('mywallet');
		var customerRecord = db.execute('SELECT * FROM tbl_customer WHERE id= ' + cus_name);
		var availableCredit = customerRecord.fieldByName('customer_credit');
		//availableCredit = availableCredit.replace(/,/g, '');
		var newCreditAmount = availableCredit + cus_credit;
		Ti.API.info('New Credit Amount : ' + newCreditAmount);
		db.execute('UPDATE tbl_customer SET customer_credit="' + newCreditAmount + '" WHERE id = ' + cus_name);
		db.close();
		return true;
	}
	
	function reduceCustomerCreditData(cus_credit, cus_name) {
		Ti.API.info('CUS NAME : ' + cus_name);
		var db = Ti.Database.open('mywallet');
		var customerRecord = db.execute('SELECT * FROM tbl_customer WHERE id= ' + cus_name);
		var availableCredit = customerRecord.fieldByName('customer_credit');
		
		var newCreditAmount;
		
		/*if(availableCredit == 0){
			Ti.API.info('Credit is 0 : ' + availableCredit);
			newCreditAmount = availableCredit;
		} else {*/
			Ti.API.info('Avail Credit : ' + availableCredit);
			Ti.API.info('Current Credit : ' + cus_credit);
			newCreditAmount = availableCredit - cus_credit;
			Ti.API.info('New Credit : ' + newCreditAmount);
		/*}*/
		
		db.execute('UPDATE tbl_customer SET customer_credit="' + newCreditAmount + '" WHERE id = ' + cus_name);
		db.close();
		return true;
	}

	function deleteAdhocIncomeData(tableID) {
		var db = Ti.Database.open('mywallet');
		db.execute('DELETE FROM tbl_income WHERE id=' + tableID);
		db.close();
		return true;

	}

	function saveCategoryData(CategoryData) {

		if (validateCategory(CategoryData.income_category)) {
			var db = Ti.Database.open('mywallet');
			db.execute('INSERT INTO tbl_income_category(income_category,enable) VALUES(?,?)', CategoryData.income_category, CategoryData.enable);
			
			var lastIDData = db.execute('SELECT MAX(id) as rowid FROM tbl_income_category WHERE enable=1');
			var lastID = lastIDData.fieldByName('rowid');
			//console.log('lastID >> ' + lastID);
			var insData = 'General';
			db.execute('INSERT INTO tbl_income_sub_category (income_sub_category,parent_category,enable) VALUES ("' + insData + '","' + lastID + '",1)');
			
			db.close();
			return true;
		} else {

			var dialog = Ti.UI.createAlertDialog({
				message : "Category already exist - Choose Another Name",
				ok : 'OK'
			});
			dialog.show();

		}

	}

	function validateCategory(newCategory) {

		var getTableIncomeCategoryData = db.execute('SELECT * FROM tbl_income_category WHERE enable = 1 ORDER BY income_category COLLATE NOCASE ASC');
		newCategory = newCategory.toUpperCase();
		while (getTableIncomeCategoryData.isValidRow()) {

			if (getTableIncomeCategoryData.fieldByName('income_category').toUpperCase() == newCategory)
				return false;
			getTableIncomeCategoryData.next();
		}
		getTableIncomeCategoryData.close();

		return true;

	}

	function validateSubCategory(newCategory, dataGet) {

		var getTableIncomeCategoryData = db.execute('SELECT * FROM tbl_income_sub_category WHERE enable = 1 AND parent_category=' + dataGet + ' ORDER BY income_sub_category COLLATE NOCASE ASC');
		newCategory = newCategory.toUpperCase();
		while (getTableIncomeCategoryData.isValidRow()) {

			if (getTableIncomeCategoryData.fieldByName('income_sub_category').toUpperCase() == newCategory)
				return false;
			getTableIncomeCategoryData.next();
		}
		getTableIncomeCategoryData.close();

		return true;

	}

	function saveSubCategoryData(CategoryData) {

		if (validateSubCategory(CategoryData.income_sub_category, CategoryData.parent_category)) {
			//console.log(CategoryData);
			var db = Ti.Database.open('mywallet');
			db.execute('INSERT INTO tbl_income_sub_category(income_sub_category,parent_category,enable) VALUES(?,?,?)', CategoryData.income_sub_category, CategoryData.parent_category, CategoryData.enable);
			db.close();
			return true;
		} else {

			var dialog = Ti.UI.createAlertDialog({
				message : "Sub-Category already exist - Choose Another Name",
				ok : 'OK'
			});
			dialog.show();

		}

	}

	/*function clearContent() {

	 txtFld_entryDate.value = getDate();
	 pkr_categoryPicker.setSelectedRow(0, 0, false);
	 var _col = pkr_subCategoryPicker.columns[0];
	 var len = _col.rowCount;
	 for (var x = len - 1; x >= 1; x--) {
	 var _row = _col.rows[x];
	 _col.removeRow(_row);
	 }

	 //pkr_subCategoryPicker.value = '';
	 //pkr_accountPicker.setSelectedRow(0, 0, false);
	 pkr_projectPicker.setSelectedRow(0, 0, false);
	 txtFld_amountReceived.value = '0.00';
	 txtFld_vatAmount.value = '';
	 txtFld_totalAmount.value = '';
	 img_picture.image = '/images/camera.png';
	 txtFld_note.value = '';
	 txtFld_note.blur();
	 pkr_vatRequired.setSelectedRow(0, 0);
	 isManualVAT = false;
	 switchActiveButton(1);
	 }*/

	function getCategoryData() {
		var getTableIncomeCategoryData = db.execute('SELECT * FROM tbl_income_category WHERE enable = 1 ORDER BY income_category COLLATE NOCASE ASC');

		var incomeCategoryData = [];
		var i = 1;
		incomeCategoryData[0] = Ti.UI.createPickerRow({
			id : '0',
			title : 'Select'
		});
		while (getTableIncomeCategoryData.isValidRow()) {
			incomeCategoryData[i] = Ti.UI.createPickerRow({
				id : getTableIncomeCategoryData.fieldByName('id'),
				title : getTableIncomeCategoryData.fieldByName('income_category')
			});
			getTableIncomeCategoryData.next();
			i++;
		}
		getTableIncomeCategoryData.close();

		return incomeCategoryData;
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

	
	function getSubCategoryID(dataGet) {
		var subMenuIndex = 0;
		//
		var db = Ti.Database.open('mywallet');
		var getTableData = db.execute('SELECT * FROM tbl_income_sub_category WHERE enable = 1 AND parent_category=' + dataGet + ' ORDER BY income_sub_category COLLATE NOCASE ASC');

		var i = 1;
		while (getTableData.isValidRow()) {
			//console.log('>>>> '+adhocIncomeSubCategory.value+'  '+getTableData.fieldByName('id'));
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

	// Validate Content before Save
	function adhocIncomeRecordValidate() {
		var validated = false;
		var floatRex = /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/;
		var invoiceNet = txtFld_amountReceived.value;
		invoiceNet = invoiceNet.replace(/,/g, '');

		var netTotal = txtFld_amountReceived.value;
		var vatValue = txtFld_vatAmount.value;
		/*if (pkr_categoryPicker.getSelectedRow(0).id == 0) {
			var dialog1 = Ti.UI.createAlertDialog({
				title : 'Alert',
				message : 'Please Select Category',
				ok : 'OK',
			});
			dialog1.show();
		} else if (pkr_subCategoryPicker.getSelectedRow(0).id == 0) {
			var dialog2 = Ti.UI.createAlertDialog({
				title : 'Alert',
				message : 'Please Select Sub Category',
				ok : 'Ok',
			});
			dialog2.show();
		} else */if (pkr_accountPicker.getSelectedRow(0).id == 0) {
			var dialog3 = Ti.UI.createAlertDialog({
				title : 'Alert',
				message : 'Please Select Account',
				ok : 'Ok',
			});
			dialog3.show();
			// } else if (pkr_projectPicker.value == undefined || pkr_projectPicker.value == '') {
			// var dialog4 = Ti.UI.createAlertDialog({
			// title : 'Alert',
			// message : 'Please Select Project',
			// ok : 'Ok',
			// });
			// dialog4.show();
		} else if (txtFld_amountReceived.value == '0.00') {
			var dialog5 = Ti.UI.createAlertDialog({
				title : 'Alert',
				message : 'Please Add Amount Received',
				ok : 'Ok',
			});
			dialog5.show();
		} else if (!floatRex.test(invoiceNet)) {
			var dialog6 = Ti.UI.createAlertDialog({
				title : 'Alert',
				message : 'Amount Received is Invalid',
				ok : 'Ok',
			});
			dialog6.show();
		} else {
			validated = true;
		}

		return validated;
	}
	
	function saveCustomerData(dbData) {

		if (validateCustomer(dbData.full_name)) {
			var db = Ti.Database.open('mywallet');
			db.execute('INSERT INTO tbl_customer(full_name, enable) VALUES(?,?)', dbData.full_name, dbData.enable);
			db.close();
			return true;
		} else {

			var dialog = Ti.UI.createAlertDialog({
				message : "Customer Name already exist. Choose Another Name.",
				ok : 'OK'
			});
			dialog.show();

		}
	}

	function validateCustomer(customerName) {

		var db = Ti.Database.open('mywallet');
		var getTableCustomerData = db.execute('SELECT id,full_name FROM tbl_customer ORDER BY full_name');
		customerName = customerName.toUpperCase();
		var getCustomerdata = [];

		while (getTableCustomerData.isValidRow()) {

			if (customerName == getTableCustomerData.fieldByName('full_name').toUpperCase())
				return false;

			getTableCustomerData.next();
		}
		getTableCustomerData.close();
		db.close();

		return true;

	}

	// Eof of Validation
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

		if (!isVATApply)
			return 0;

		var tabledata;
		if (varVat == undefined || varVat == '') {

			var db = Ti.Database.open('mywallet');
			var getTableData = db.execute('SELECT * FROM tbl_option WHERE option_name="vat"');
			while (getTableData.isValidRow()) {
				tabledata = getTableData.fieldByName('option_value');
				getTableData.next();
			}
			getTableData.close();
			db.close();
		} else {
			tabledata = varVat;
		}
		return tabledata;
	};

	//##

	function saveInvoiceIncomeData(dbData) {
		console.log('save');
		var db = Ti.Database.open('mywallet');
		db.execute('INSERT INTO tbl_income(payment_date, category_id, sub_category_id, account_id, project_id, net_amount, vat, total_amount, picture_path, invoice_no, customer_name, note, ex_credit) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)', dbData.payment_date, dbData.category_id, dbData.sub_category_id, dbData.account_id, dbData.project_id, dbData.net_amount, dbData.vat, dbData.total_amount, dbData.picture_path, dbData.invoice_no, dbData.customer_name, dbData.note, dbData.ex_credit);
		db.close();
		return true;
	}

	function updateInvoiceIncome(dbData, tableId) {
		var db = Ti.Database.open('mywallet');
		db.execute('UPDATE tbl_income SET payment_date="' + dbData.payment_date + '", category_id="' + dbData.category_id + '", ex_credit="' + dbData.ex_credit + '", sub_category_id="' + dbData.sub_category_id + '", account_id="' + dbData.account_id + '", project_id="' + dbData.project_id + '", net_amount="' + dbData.net_amount + '", vat="' + dbData.vat + '", total_amount="' + dbData.total_amount + '", picture_path="' + dbData.picture_path + '", invoice_no="' + dbData.invoice_no + '", customer_name="' + dbData.customer_name + '", note="' + dbData.note + '" WHERE id = ' + tableId);
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
		//console.log(getTableData.fieldByName('customer_id'));
		var tabledata = [];
		var arr_customerNameData = [];
		arr_customerNameData[0] = Ti.UI.createPickerRow({
			id : '0',
			title : 'Please Select'
		});
		var i = 1;
		while (getTableData.isValidRow()) {
			var customer_id = getTableData.fieldByName('customer_id');
			console.log("custome_id: " + customer_id);
			var customerRecord = db.execute('SELECT * FROM tbl_customer WHERE id=' + customer_id);
			if (customerRecord.isValidRow()){ // check if customer record exist. maybe deleted
				arr_customerNameData[i] = Ti.UI.createPickerRow({
					id : customerRecord.fieldByName('id'),
					title : customerRecord.fieldByName('full_name'),
				});
			}

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
		} else if (txtFld_paymentAmount.value == '' || txtFld_paymentAmount.value == '0.00') {
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
			/*var dialog5 = Ti.UI.createAlertDialog({
				title : 'Alert',
				message : 'Payment should be less than invoice Due',
				ok : 'Ok',
			});
			dialog5.show();*/
			
			var overPayment = paymentAmount - getInvoiceDuebyInvoiceNumber(pkr_invoiceNumber.value);
			
			var dialog5 = Ti.UI.createAlertDialog({
				title : 'Alert',
				message : 'The payment amount is higher than the invoice due. An overpayment of ' + toDecimalFormatView(overPayment) + ' will be saved as customer credit.',
				ok : 'Ok',
			});
			dialog5.show();
			validated = true;
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
		} else if ((getInvoiceDuebyInvoiceNumber(pkr_invoiceNumberUpdate.value) + (txtFld_addIncomeInvoiceNet.value * 1)) < paymentAmount) {
			
			var overPayment = paymentAmount - (getInvoiceDuebyInvoiceNumber(pkr_invoiceNumberUpdate.value) + (txtFld_addIncomeInvoiceNet.value * 1));
			
			var dialog5 = Ti.UI.createAlertDialog({
				title : 'Alert',
				//message : 'Payment should be less than invoice Due',
				message : 'The payment amount is higher than the invoice due. An overpayment of ' + toDecimalFormatView(overPayment) + ' will be saved as customer credit.',
				ok : 'Ok',
			});
			dialog5.show();
			validated = true;
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

	//##
	function isFormNotEmpty() {
		if (addIncomeDisplayOption == 'Update'){
			
			var tableId = editTransactionId;
			var db = Ti.Database.open('mywallet');
			var adhocIncomeDataSet = db.execute('SELECT * FROM tbl_income WHERE id = ' + tableId);
			//console.log('account ' + selectAccountText.value);
			
			var txtFld_entryDate = changeDateView(adhocIncomeDataSet.fieldByName('payment_date'));;
			var pkr_accountPicker1 = adhocIncomeDataSet.fieldByName('account_id');
			var pkr_accountPicker2 = adhocIncomeDataSet.fieldByName('account_id');
			var pkr_categoryPicker = adhocIncomeDataSet.fieldByName('category_id');
			var pkr_subCategoryPicker = adhocIncomeDataSet.fieldByName('sub_category_id');
			var txtFld_totalAmount = adhocIncomeDataSet.fieldByName('net_amount');
			var pkr_projectPicker = adhocIncomeDataSet.fieldByName('project_id');
			var txtFld_note = adhocIncomeDataSet.fieldByName('note');;
		}
		else{
			var txtFld_entryDate = getDate();
			var pkr_accountPicker1 = 2;
			var pkr_accountPicker2 = 0;
			var pkr_categoryPicker = 0;
			var pkr_subCategoryPicker = 0;
			var txtFld_totalAmount = 0;
			var pkr_projectPicker = '';
			var txtFld_note = '';
		}
		if (adhocIncomeEntryDate.value != txtFld_entryDate){
			console.log('date ' + txtFld_entryDate.value + ' ' + txtFld_entryDate);
			return true;			
		}
		if (txtFld_addIncomeAccount.value != pkr_accountPicker1 && txtFld_addIncomeAccount.value != pkr_accountPicker2){
			console.log('account ' + txtFld_addIncomeAccount.value);
			return true;		
		}
		if (adhocIncomeCategory.value != pkr_categoryPicker) {
			console.log('cate ' + adhocIncomeCategory.value);
			return true;			
		}
		if (adhocIncomeSubCategory.value != pkr_subCategoryPicker) {
			console.log("subcat " + adhocIncomeSubCategory.value + "---- " + pkr_subCategoryPicker);
			return true;
		}
		if (Number(txtFld_amountReceived.value) != txtFld_totalAmount) {
			console.log('invoice tot ' + txtFld_amountReceived.value + ' ' + txtFld_totalAmount);
			return true;
		}
		if (adhocIncomeProject.value != pkr_projectPicker){
			console.log('selprojec' + adhocIncomeProject.value);
			return true;
		}
		if (adhocIncomeNote.value != txtFld_note){
			console.log('note ' + adhocIncomeNote.value);
			return true;
		}
	}
	
	function getCustomerData() {
		console.log("a1");
		var db = Ti.Database.open('mywallet');
		var getTableCustomerData = db.execute('SELECT id,full_name FROM tbl_customer WHERE enable = "1" ORDER BY full_name');

		var getCustomerdata = [];
		var i = 1;
		getCustomerdata[0] = Ti.UI.createPickerRow({
			id : '0',
			title : 'Select',
		});
		while (getTableCustomerData.isValidRow()) {

			getCustomerdata[i] = Ti.UI.createPickerRow({
				id : getTableCustomerData.fieldByName('id'),
				title : getTableCustomerData.fieldByName('full_name'),
			});

			getTableCustomerData.next();
			i++;
		}
		getTableCustomerData.close();
		db.close();
		return getCustomerdata;
	}
	
	function clearContent() {

		txtFld_entryDate.value = getDate();
		pkr_categoryPicker.setSelectedRow(0, 0, false);
		emptyPicker(pkr_subCategoryPicker);
		pkr_subCategoryPicker.value = '';
		pkr_accountPicker.setSelectedRow(0, 2, false);
		//txtFld_addIncomeAccount.value = '2';
		//pkr_projectPicker.setSelectedRow(0, 0, false);
		pkr_projectPicker.value = '';
		adhocIncomeProject.value = '';
		txtFld_amountReceived.value = '0.00';
		txtFld_vatAmount.value = '0.00';
		txtFld_totalAmount.value = '0.00';
		txtFld_amountReceived.value = 0.00;
		img_picture.image = '/images/camera.png';
		adhocIncomeNote.value = '';
		txtFld_note.value = '';
		txtFld_note.blur();
		pkr_vatRequired.setSelectedRow(0, 0);
		isManualVAT = false;
		lbl_title.text = 'Add Bank Receipts';
		switchActiveButton(1);
		//pkr_projectPicker_last.value = getLastRefNo();

		//##

		txtFld_entryDate.value = getDate();
		/*var _col = pkr_invoiceNumber.columns[0];
		var len = _col.rowCount;
		for (var x = len - 1; x >= 1; x--) {
			var _row = _col.rows[x];
			_col.removeRow(_row);
		}*/
		emptyPicker(pkr_invoiceNumber);
		//subCategoryText.value = '';
		//pkr_accountPicker.setSelectedRow(0, 0, false);
		//pkr_projectPicker.setSelectedRow(0, 0, false);
		pkr_projectPicker.value = '';
		txtFld_paymentAmount.value = '0.00';
		lbl_customerCreditTotalValue.text = '';
		lbl_invoiceTotalValue.text = '';
		lbl_invoiceDueValue.text = '';
		img_picture.image = '/images/camera.png';
		if (addIncomeDisplayOption == 'New') {
			pkr_customerName.setSelectedRow(0, 0, false);
		}

		txtFld_addIncomeInvoiceTableID.value = '';
		txtFld_addIncomeTitle.value = 'Add Payments Against Inv...';

		txtFld_addIncomeEntryDate.value = getDate();
		txtFld_addIncomeCustomerName.value = 0;
		txtFld_addInvoiceNumber.value = 0;
		txtFld_addCustomerCredit.value = '0.00';
		txtFld_addIncomeInvoiceNet.value = '0.00';
		txtFld_addIncomeInvoiceVATPercentage.value = 0;

		txtFld_addIncomeInvoiceTotal.value = '0.00';
		txtFld_addIncomeAccount.value = 2;
		txtFld_addIncomeProject.value = 0;
		
		txtFld_addIncomePicture.value = '/images/camera.png';

		txtFld_addIncomeNote.value = '';
		txtFld_addIncomeNote.blur();
		addIncomeDisplayOption = 'New';

		//##
	}

	//# End of Primary Functions

	//# Begining of Main UI Container

	var view_mainContainer = Ti.UI.createView({
		height : '100%',
		width : '100%',
		visible : false,
	});

	//# End of Main UI Container

	//# Begining of title bar

	var view_title = Ti.UI.createView({
		height : deviceHeight * 0.075,
		//height : deviceHeight * 0.03,
		top : '0%',
		backgroundColor : '#2980B9',
	});

	var lbl_title = Ti.UI.createLabel({
		text : adhocIncomeTitle.value,
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
		/*view_mainContainer.hide();
		clearContent();
		Ti.App.fireEvent('editview_mainContainerClose', 'e');*/
		btn_next.fireEvent('click');
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
		backgroundColor : '#fff'
	});

	var view_mainContainerInnerView = Ti.UI.createView({
		width : '100%',
		top : 0,
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		layout : 'vertical'
	});

	view_mainContainerScrollView.add(view_mainContainerInnerView);
	

	//

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
		value : adhocIncomeEntryDate.value,
		backgroundColor : '#A0A0A0',
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
		backgroundColor : '#A0A0A0',
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

	view_mainContainerInnerView.add(view_entryDate);

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
		backgroundColor : '#A0A0A0',
	});

	var getAccountData = db.execute('SELECT * FROM tbl_account WHERE enable = 1');

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

	for (var i = 0; i < arr_accountData.length; i++) {
		if (arr_accountData[i].isDefault === 1) {
			defaultAccountValueRow = arr_accountData[i].id;
		}
	}

	view_accountPicker.add(lbl_accountPicker);
	view_accountPicker.add(pkr_accountPicker);

	view_mainContainerInnerView.add(view_accountPicker);

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
		title : 'Receipts',
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
	
	
	if (addIncomeDisplayOption == 'New') {
		//view_mainContainerInnerView.add(view_receiptType);
		
	}

	//

	var view_categoryPicker = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
	});

	var lbl_categoryPicker = Ti.UI.createLabel({
		text : 'Category *',
		color : '#000',
		top : 5,
		left : '2%',
		width : '37%',
		height : 40,
	});

	var pkr_categoryPicker = Ti.UI.createPicker({
		top : 5,
		left : '41%',
		width : '43%',
		height : 40,
		backgroundColor : '#A0A0A0',
	});

	var incomeCategoryData = [];
	incomeCategoryData = getCategoryData();
	var adhocCategoryIndex = getCategoryID();

	pkr_categoryPicker.selectionIndicator = true;
	pkr_categoryPicker.add(incomeCategoryData);
	pkr_categoryPicker.setSelectedRow(0, adhocCategoryIndex);

	var btnaddcategory = Ti.UI.createView({
		//type:Ti.UI.PICKER_TYPE_DATE,
		backgroundColor : '#A0A0A0',
		top : 5,
		left : '86%',
		width : '12%',
		height : 40,
	});

	var imgaddcategory = Ti.UI.createImageView({
		width : '70%',
		image : '/images/add.png',
	});
	btnaddcategory.add(imgaddcategory);
	
	view_categoryPicker.add(lbl_categoryPicker);
	view_categoryPicker.add(pkr_categoryPicker);
	view_categoryPicker.add(btnaddcategory);

	//

	var view_subCategoryPicker = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
	});

	var lbl_subCategoryPicker = Ti.UI.createLabel({
		text : 'Sub Category *',
		color : '#000',
		top : 5,
		left : '2%',
		width : '37%',
		height : 40,

	});

	var pkr_subCategoryPicker = Ti.UI.createPicker({
		top : 5,
		left : '41%',
		width : '43%',
		height : 40,
		backgroundColor : '#A0A0A0',
		selectionIndicator : true,
	});

	/*var subCategoryPickerData = [];
	subCategoryPickerData = getCategoryPickerRows(adhocIncomeCategory.value, 'incomeSub');
	pkr_subCategoryPicker.add(subCategoryPickerData);

	var subCategoryIndex = getSubCategoryID(adhocIncomeCategory.value);
	pkr_subCategoryPicker.setSelectedRow(0, subCategoryIndex);*/

	var subCategoryTextData = [];
	subCategoryTextData = getCategoryPickerRows(adhocIncomeCategory.value, 'incomeSub');
	pkr_subCategoryPicker.add(subCategoryTextData);

	var subCatIndex = getSubCategoryID(adhocIncomeCategory.value);
	pkr_subCategoryPicker.setSelectedRow(0, subCatIndex-1);


	var btn_addSubCategory = Ti.UI.createView({
		backgroundColor : '#A0A0A0',
		top : 5,
		left : '86%',
		width : '12%',
		height : 40,
	});

	var img_addSubCategory = Ti.UI.createImageView({
		width : '70%',
		image : '/images/add.png',
	});
	btn_addSubCategory.add(img_addSubCategory);

	view_subCategoryPicker.add(lbl_subCategoryPicker);
	view_subCategoryPicker.add(pkr_subCategoryPicker);
	view_subCategoryPicker.add(btn_addSubCategory);

	//

	var view_amountReceived = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
	});

	var lbl_amountReceived = Ti.UI.createLabel({
		text : 'Total Received *', // changed title from Amount Received
		color : '#000',
		top : 5,
		left : '2%',
		width : '37%',
		height : 40,
	});

	var txtFld_amountReceived = Ti.UI.createTextField({
		backgroundColor : '#A0A0A0',
		top : 5,
		left : '41%',
		width : '43%',
		height : 40,
		editable : true,
		keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
		value : toDecimalFormatWithoutCurrency(adhocIncomeInvoiceNet.value * 1),
	});

// SINGLE TAP NOT WORKING FOR TEXTFIELD HENCE COMENTED AND ADDED A BUTTON
	/*txtFld_amountReceived.addEventListener('singletap', function() {
		calcultor.setTxtObj(txtFld_amountReceived);
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

	view_amountReceived.add(lbl_amountReceived);
	view_amountReceived.add(txtFld_amountReceived);
	view_amountReceived.add(editIncPayAmntBtn);

	//

	var view_vatRequired = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
	});

	// Category list view
	var lbl_vatRequired = Ti.UI.createLabel({
		text : 'Does VAT apply *',
		color : '#000',
		top : 5,
		left : '2%',
		width : '37%',
		height : 40,
	});

	var pkr_vatRequired = Ti.UI.createPicker({
		top : 5,
		left : '41%',
		width : '43%',
		height : 40,
		backgroundColor : '#A0A0A0',
	});

	var arr_vatOptions = [];
	arr_vatOptions[0] = Ti.UI.createPickerRow({
		id : 0,
		title : 'No'
	});
	arr_vatOptions[1] = Ti.UI.createPickerRow({
		id : 1,
		title : 'Yes'
	});

	pkr_vatRequired.add(arr_vatOptions);
	pkr_vatRequired.selectionIndicator = true;


	function moveUP(element) {
		element.top = element.top - 45;
	}

	function moveDown(element) {
		element.top = element.top + 45;
	}

	function setVATapplicability(isVATApply) {
		if (isVATApply) {
			/*for (x in bellowTaxElements) {
			 moveDown(bellowTaxElements[x]);
			 }*/
			view_vatAmount.add(lbl_vatAmount);
			view_vatAmount.add(txtFld_vatAmount);
			view_vatAmount.add(btn_changeVATPercentageValue);
		} else {
			view_vatAmount.remove(lbl_vatAmount);
			view_vatAmount.remove(txtFld_vatAmount);
			view_vatAmount.remove(btn_changeVATPercentageValue);
			/*for (x in bellowTaxElements) {
			 moveUP(bellowTaxElements[x]);
			 }*/
		}
	}

	function setupVATChangeSelectionOnUpdate(isVATApplyVal) {
		isVATApply = isVATApplyVal;
		setVATapplicability(isVATApply);
		var vatVal = adhocIncomeVATPresent.value;
		lbl_vatAmount.text = 'VAT ' + vatVal + '% ' + '(' + currencyType + ')';
		var invoiceNet = txtFld_amountReceived.value;
		invoiceNet = invoiceNet.replace(/,/g, '');
		tempVATValue = vatVal;
		var invoiceVat;
		if (!isManualVAT) {
			invoiceVat = (invoiceNet * vatVal) / 100;
			txtFld_vatAmount.value = toDecimalFormatWithoutCurrency(invoiceVat);
		} else {
			lbl_vatAmount.text = 'VAT Amount ' + '(' + currencyType + ')';
		}
		//txtFld_vatAmount.value = toDecimalFormatWithoutCurrency(invoiceVat);
		var vat = txtFld_vatAmount.value;
		vat = vat.replace(/,/g, '');
		var totalValue = invoiceNet * 1 + vat * 1;
		if (isVATApply == 0) {
			totalValue = invoiceNet * 1;
		}
		txtFld_totalAmount.value = toDecimalFormatWithoutCurrency(Math.ceil(totalValue * 10000) / 10000);
	}


	pkr_vatRequired.addEventListener('change', function(e) {
		isVATApply = e.row.id;
		setVATapplicability(isVATApply);
		var vatVal = vatPtg();
		lbl_vatAmount.text = 'VAT ' + vatVal + '% ' + '(' + currencyType + ')';
		var invoiceNet = txtFld_amountReceived.value;
		invoiceNet = invoiceNet.replace(/,/g, '');
		tempVATValue = vatVal;
		var invoiceVat;
		if (!isManualVAT) {
			invoiceVat = (invoiceNet * vatVal) / 100;
			txtFld_vatAmount.value = toDecimalFormatWithoutCurrency(invoiceVat);
		} else {
			lbl_vatAmount.text = 'VAT Amount ' + '(' + currencyType + ')';
		}
		//txtFld_vatAmount.value = toDecimalFormatWithoutCurrency(invoiceVat);
		var vat = txtFld_vatAmount.value;
		vat = vat.replace(/,/g, '');
		var totalValue = invoiceNet * 1 + vat * 1;
		if (isVATApply == 0) {
			totalValue = invoiceNet * 1;
		}
		txtFld_totalAmount.value = toDecimalFormatWithoutCurrency(Math.ceil(totalValue * 10000) / 10000);
	});

	view_vatRequired.add(lbl_vatRequired);
	view_vatRequired.add(pkr_vatRequired);

	//

	var view_vatAmount = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
	});

	var lbl_vatAmount = Ti.UI.createLabel({
		//text : 'VAT ' + vatPtg() + '%',
		color : '#000',
		top : 5,
		left : '2%',
		width : '37%',
		height : 40,
	});

	if (addIncomeDisplayOption == 'New') {
		lbl_vatAmount.text = 'VAT ' + vatPtg() + '%  (' + currencyType + ')';
	} else {
		lbl_vatAmount.text = 'VAT ' + adhocIncomeVATPresent.value + '%  (' + currencyType + ')';
	}

	var txtFld_vatAmount = Ti.UI.createTextField({
		backgroundColor : '#A0A0A0',
		top : 5,
		left : '41%',
		width : '43%',
		height : 40,
		focusable : true,
		editable : false,
		keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		value : toDecimalFormatWithoutCurrency(adhocIncomeVAT.value * 1),
	});

	var btn_changeVATPercentageValue = Ti.UI.createView({
		backgroundColor : '#A0A0A0',
		top : 5,
		left : '86%',
		width : '12%',
		height : 40,
	});

	var img_changeVATPercentageValue = Ti.UI.createImageView({
		width : '60%',
		image : '/images/edit_white.png',
	});

	btn_changeVATPercentageValue.add(img_changeVATPercentageValue);

	//view_vatAmount.add(lbl_vatAmount);
	//view_vatAmount.add(txtFld_vatAmount);
	//view_vatAmount.add(btn_changeVATPercentageValue);

	var tempVATValue;

	if (addIncomeDisplayOption == 'New') {
		tempVATValue = vatPtg();
	} else {
		tempVATValue = adhocIncomeVATPresent.value;
	}

	//

	var view_totalAmount = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
	});

	var lbl_totalAmount = Ti.UI.createLabel({
		text : 'Total Received',
		color : '#000',
		top : 5,
		left : '2%',
		width : '37%',
		height : 40,

	});

	var txtFld_totalAmount = Ti.UI.createTextField({
		backgroundColor : '#A0A0A0',
		top : 5,
		left : '41%',
		width : '57%',
		height : 40,
		editable : false,
		value : toDecimalFormatWithoutCurrency(adhocIncomeInvoiceTotal.value * 1),
	});

	view_totalAmount.add(lbl_totalAmount);
	view_totalAmount.add(txtFld_totalAmount);

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

//var pkr_projectPicker = Ti.UI.createPicker({ changed to text field since client wants user to type reference
	var pkr_projectPicker = Ti.UI.createTextField({
		top : 5,
		left : '41%',
		width : '57%',
		height : 40,
		backgroundColor : '#A0A0A0',
	});
	
//text feld to display last ref no	
	var lbl_projectPicker_last = Ti.UI.createLabel({
		text : "Last Int. Ref. No",
		color : '#000',
		top : 5,
		left : '2%',
		width : '37%',
		height : 40,
	});


	var pkr_projectPicker_last = Ti.UI.createTextField({
		top : 5,
		left : '41%',
		width : '57%',
		height : 40,
		backgroundColor : '#d6d6d6',
		editable : false,
		//value: getLastRefNo(),
	});
	
	txtFld_totalAmount.value = '';
	/*var getProjectData = db.execute('SELECT * FROM tbl_project WHERE enable = 1');

	var arr_projectData = [];

	var i = 1;

	arr_projectData[0] = Ti.UI.createPickerRow({
		id : '0',
		title : 'Please Select'
	});

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

	pkr_projectPicker.setSelectedRow(0, adhocIncomeProject.value);*/ //removed since client wanted user to type feference and leave blank
	//console.log(">>>>>>>>>>>>>incmPro Val" + adhocIncomeProject.value);
	pkr_projectPicker.value = adhocIncomeProject.value;
	//view_projectPicker.add(lbl_projectPicker_last);
	//view_projectPicker.add(pkr_projectPicker_last);
	view_projectPicker.add(lbl_projectPicker);
	view_projectPicker.add(pkr_projectPicker);

	//
	
	// added customer dropdown
	/*var selectCustomerLabel = Ti.UI.createLabel({
		text : 'Select Customer *',
		color : '#000',
		top : 95,
		left : '2%',
		width : '37%',
		height : 40,

	});

	var selectCustomerText = Ti.UI.createPicker({
		top : 95,
		left : '41%',
		width : '43%',
		height : 40,
		backgroundColor : '#A0A0A0',
	});

	var btnaddCustomer = Ti.UI.createView({
		//type:Ti.UI.PICKER_TYPE_DATE,
		backgroundColor : '#A0A0A0',
		top : 95,
		left : '86%',
		width : '12%',
		height : 40,
		//image : '/images/calicon.png',
		//editable:false,
		//font:{fontSize:20,},
	});

	var selectCustomerdata = [];

	selectCustomerdata = getCustomerData();

	selectCustomerText.selectionIndicator = true;
	selectCustomerText.add(selectCustomerdata);

	//selectCustomerText.setSelectedRow(0, invoiceCustomerName.value);
	if (btnAction == 'edit'){ // set customer dropdown only if edit
		var customersList = new Array;
		customersList = getCustomerListArray();
		//console.log("cus id---- " +  getCustomeName(invoiceCustomerName.value));
		var rowNo = returnRowNo(customersList, getCustomeName(invoiceCustomerName.value));
		selectCustomerText.setSelectedRow(0, rowNo+1, false);
	}
	

	var customerNameTextUpdate = Ti.UI.createTextField({
		backgroundColor : userInputFeildBackgroundColor,
		top : 195,
		left : '41%',
		width : '57%',
		height : 40,
		editable : false,
		visible : false,
	});

	var imgaddCustomer = Ti.UI.createImageView({
		width : '70%',
		image : '/images/add.png',
	});
	btnaddCustomer.add(imgaddCustomer);

	
	// end of added customer dropdown
*/
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
		borderRadius : 5,
		font : {
			fontSize : 20,
		},
		textAlign : 'left',
		backgroundColor : '#A0A0A0',
		top : 5,
		left : '41%',
		width : '57%',
		height : 120,
		value : adhocIncomeNote.value,
	});

	view_note.add(lbl_note);
	view_note.add(txtFld_note);

	//

	var view_picture = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
	});

	var lbl_picture = Ti.UI.createLabel({
		text : 'Picture',
		color : '#000',
		top : 5,
		left : '2%',
		width : '37%',
		height : 40,

	});

	var img_picture = Ti.UI.createImageView({
		backgroundColor : '#A0A0A0',
		top : 5,
		left : '41%',
		width : '57%',
		height : 120,
		bottom : 50,
		image : (adhocIncomePicture.value == '/images/camera.png') ? adhocIncomePicture.value : Ti.Utils.base64decode(adhocIncomePicture.value),
	});

	view_picture.add(lbl_picture);
	view_picture.add(img_picture);

	//##



// //



// 	var pkr_accountPicker = Ti.UI.createPicker({
// 		top : 5,
// 		left : '41%',
// 		width : '57%',
// 		height : 40,
// 		backgroundColor : '#A0A0A0',
// 	});

// 	var getAccountData = db.execute('SELECT * FROM tbl_account WHERE enable = 1');

// 	var arr_accountData = [];

// 	var i = 1;

// 	arr_accountData[0] = Ti.UI.createPickerRow({
// 		id : '0',
// 		title : 'Please Select',
// 		isDefault : null
// 	});

// 	while (getAccountData.isValidRow()) {
// 		arr_accountData[i] = Ti.UI.createPickerRow({
// 			id : getAccountData.fieldByName('id'),
// 			title : getAccountData.fieldByName('account_name'),
// 			isDefault : getAccountData.fieldByName('is_default')
// 		});

// 		getAccountData.next();
// 		i++;
// 	}

// 	getAccountData.close();

// 	pkr_accountPicker.selectionIndicator = true;
// 	pkr_accountPicker.add(arr_accountData);

// 	var defaultAccountValueRow = null;

// 	for (var i = 0; i < arr_accountData.length; i++) {
// 		if (arr_accountData[i].isDefault === 1) {
// 			defaultAccountValueRow = arr_accountData[i].id;
// 		}
// 	}

// 	view_accountPicker.add(lbl_accountPicker);
// 	view_accountPicker.add(pkr_accountPicker);

// 	view_mainContainerInnerView.add(view_accountPicker);

// 	//



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
		width : '43%',
		height : 40,
		visible : false,
	});

	var getCustomerData1 = db.execute('SELECT full_name FROM tbl_customer WHERE enable = "1" ORDER BY full_name');
	var arr_customerNameData = [];

	var i = 1;

	arr_customerNameData[0] = Ti.UI.createPickerRow({
		id : '0',
		title : 'Please Select',
		isDefault : null
	});

	while (getCustomerData1.isValidRow()) {
		arr_customerNameData[i] = Ti.UI.createPickerRow({
			id : getCustomerData1.fieldByName('id'),
			title : getCustomerData1.fieldByName('full_name'),
			isDefault : getCustomerData1.fieldByName('is_default')


		});
		console.log(getCustomerData1.fieldByName('full_name'));
		getCustomerData1.next();
		i++;
	}

	getCustomerData1.close();

	pkr_customerName.selectionIndicator = true;
	pkr_customerName.add(arr_customerNameData);

	var defaultAccountValueRow = null;

	for (var i = 0; i < arr_customerNameData.length; i++) {
		if (arr_customerNameData[i].isDefault === 1) {
			defaultAccountValueRow = arr_customerNameData[i].id;
		}
	}



	var btnaddCustomer = Ti.UI.createView({
		//type:Ti.UI.PICKER_TYPE_DATE,
		backgroundColor : '#A0A0A0',
		top : 5,
		left : '86%',
		width : '12%',
		height : 40,
		//image : '/images/calicon.png',
		//editable:false,
		//font:{fontSize:20,},
	});
	
	var imgaddCustomer = Ti.UI.createImageView({
		width : '70%',
		image : '/images/add.png',
	});
	btnaddCustomer.add(imgaddCustomer);

	

	//arr_customerNameData = getCustomerInvoiceDtails();

	//pkr_customerName.selectionIndicator = true;
	//pkr_customerName.add(arr_customerNameData);

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
	view_customerName.add(btnaddCustomer);

	var view_invoiceNumber = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
	});

	var lbl_invoiceNumber = Ti.UI.createLabel({
		text : 'Invoice No *',
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
	
	//

	var view_customerCreditTotal = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
	});

	var lbl_customerCreditTotal = Ti.UI.createLabel({
		text : 'Customer Credits',
		color : '#000',
		top : 5,
		left : '2%',
		width : '37%',
		height : 40,
	});

	var lbl_customerCreditTotalValue = Ti.UI.createLabel({
		color : '#ccc',
		top : 5,
		left : '43%',
		width : '57%',
		height : 40,
	});

	view_customerCreditTotal.add(lbl_customerCreditTotal);
	view_customerCreditTotal.add(lbl_customerCreditTotalValue);

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
		editable : true,
		value : toDecimalFormatWithoutCurrency(txtFld_addIncomeInvoiceNet.value * 1),
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
	
	/*************Add Customer Popup*****************/

	var createCustomerWrapperView = Ti.UI.createView({
		visible : false,
		zIndex : 200,
	});
	// Full screen
	var createCustomerBackgroundView = Ti.UI.createView({// Also full screen
		backgroundColor : '#000',
		opacity : 0.6
	});
	var createCustomerContainerView = Ti.UI.createView({// Set height appropriately
		layout : 'vertical',
		width : '85%',
		height : deviceHeight * 0.265,
		backgroundColor : '#FFF',
	});

	var viewCreateCustomerContainerViewpopuptitle = Ti.UI.createView({
		height : deviceHeight * 0.075,
		backgroundColor : '#2980B9',
	});

	var someCreateCustomerLabel = Ti.UI.createLabel({
		text : 'New Customer',
		color : '#FFFFFF',
		font : {
			fontSize : stylefontsize + 2,
			//fontFamily : customFont2,
		},
	});

	var imageCreateCustomerpopupclose = Ti.UI.createImageView({
		image : '/images/closebtn.png',
		backgroundSelectedColor : '#999999',
		width : '9%',
		right : '3%',
	});

	viewCreateCustomerContainerViewpopuptitle.add(someCreateCustomerLabel);
	viewCreateCustomerContainerViewpopuptitle.add(imageCreateCustomerpopupclose);
	createCustomerContainerView.add(viewCreateCustomerContainerViewpopuptitle);

	var createCustomerTextView = Ti.UI.createView({
		//backgroundColor : settingsbtncol,
		//backgroundSelectedColor : settingsbtnselectedcol,
		left : '1%',
		right : '1%',
		top : '2%',
		bottom : '0.5%',
		// height : deviceHeight * 0.11,
		height : settingOptionHeight,
	});

	var createCustomerText = Ti.UI.createTextField({
		//text : 'Camera',
		//keyboardType:Titanium.UI.KEYBOARD_DECIMAL_PAD,
		hintText : 'Customer Name',
		borderColor : "#489CE0",
		width : '90%',
		color : settingsbtnfontcolor,
		left : '5%',
		font : {
			//fontFamily : customFont1,
			fontSize : stylefontsize,
		},
		autocapitalization : Ti.UI.TEXT_AUTOCAPITALIZATION_WORDS,
	});

	createCustomerTextView.add(createCustomerText);
	createCustomerContainerView.add(createCustomerTextView);

	var btnCreateCustomerView = Ti.UI.createView({
		//backgroundColor : settingsbtncol,
		//backgroundSelectedColor : settingsbtnselectedcol,
		left : '1%',
		right : '1%',
		top : '1%',
		bottom : '0.5%',
		// height : deviceHeight * 0.11,
		height : settingOptionHeight,
	});

	var btnCreateCustomer = Ti.UI.createButton({
		title : 'Save',
		//width : '70%',
		height : '70%',
		color : '#fff',
		backgroundColor : '#054e62',
		backgroundSelectedColor : '#0a7390',
		//left : '35%',
		font : {
			//fontFamily : customFont1,
			fontSize : stylefontsize - 5,
			fontFamily : customFont1
		},
	});

	btnCreateCustomerView.add(btnCreateCustomer);
	createCustomerContainerView.add(btnCreateCustomerView);

	createCustomerWrapperView.add(createCustomerBackgroundView);
	createCustomerWrapperView.add(createCustomerContainerView);

	//var getImage;
	imgaddCustomer.addEventListener('click', function(e) {
		//console.log('Customer');
		createCustomerWrapperView.show();
		//mainAdhocView.scrollingEnabled = false;
	});

	imageCreateCustomerpopupclose.addEventListener('click', function() {
		createCustomerWrapperView.hide();
		//mainAdhocView.scrollingEnabled = true;
		//AdhocVatText.value = vatPtg();
	});

	createCustomerBackgroundView.addEventListener('click', function() {
		createCustomerWrapperView.hide();
		//mainAdhocView.scrollingEnabled = true;
	});

	btnCreateCustomer.addEventListener('click', function(e) {

		if (createCustomerText.value != '') {

			createCustomerWrapperView.hide();
			//mainAdhocView.scrollingEnabled = true;
			var CustomerName = createCustomerText.value;

			var dbData = {
				full_name : CustomerName, enable : 1,
			};

			var getResult = saveCustomerData(dbData);

			if (getResult) {

				/*if (selectCustomerText.columns[0]) {
					var _col = selectCustomerText.columns[0];
					var len = _col.rowCount;
					for (var x = len - 1; x >= 0; x--) {
						var _row = _col.rows[x];
						_col.removeRow(_row);
					}
					//picker.reloadColumn(_col);
				}*/
				emptyPicker(pkr_customerName);
				var selectCustomerdata = [];

				selectCustomerdata = getCustomerData();

				pkr_customerName.selectionIndicator = true;
				pkr_customerName.add(selectCustomerdata);

				
				//var TotalResultSet = db.execute('SELECT COUNT(id) AS customercount  FROM tbl_customer ORDER BY full_name');
				//var customercount = TotalResultSet.fieldByName('customercount');
				//var sqlstring = 'SELECT RowNo, id, full_name FROM (SELECT COUNT(*) as RowNo, id, full_name FROM tbl_customer ORDER BY full_name) as t WHERE full_name = "'+ CustomerName +'"';
				//var TotalResultSet = db.execute('SELECT id as customerid FROM tbl_customer WHERE full_name ="'+ CustomerName +'"');
				//var TotalResultSet = db.execute(sqlstring);
				//var customerid = TotalResultSet.fieldByName('RowNo');
				//customerid += 1;
				var TotalResultSet = db.execute('SELECT full_name FROM tbl_customer WHERE enable = "1" ORDER BY full_name');
				var customersList = new Array();
				var i = 0;
				//var y = 0;
				while (TotalResultSet.isValidRow()) {
					customersList.push(TotalResultSet.fieldByName('full_name'));
					//});
					console.log('row '+TotalResultSet.fieldByName('id')+ ' name '+ TotalResultSet.fieldByName('full_name'));
		
					TotalResultSet.next();
					i++;
				}
				
				
				var rowNo = returnRowNo(customersList, CustomerName);
				console.log(rowNo);
				pkr_customerName.setSelectedRow(0, rowNo+1, false);
				
				createCustomerText.value = '';
				
			}

		} else {
			// empty validation error
			var dialog2 = Ti.UI.createAlertDialog({
				title : 'Error!',
				message : 'Customer Name cannot be empty.',
				ok : 'Ok',
			});
		}

	});

	/********End of Add Customer Popup*********/


	imgaddCustomer.addEventListener('click', function(e) {
		//console.log('Customer');
		createCustomerWrapperView.show();
		//mainAdhocView.scrollingEnabled = false;
	});
	imageCreateCustomerpopupclose.addEventListener('click', function() {
		createCustomerWrapperView.hide();
		//mainAdhocView.scrollingEnabled = true;
		//AdhocVatText.value = vatPtg();
	});
	createCustomerBackgroundView.addEventListener('click', function() {
		createCustomerWrapperView.hide();
		//mainAdhocView.scrollingEnabled = true;
	});
	
	

	
	
	
	editIncPayAmntBtn.addEventListener('singletap', function() {
		calcultor.setTxtObj(txtFld_paymentAmount);
		view_calculator.show();
	});

	view_paymentAmount.add(lbl_paymentAmount);
	view_paymentAmount.add(txtFld_paymentAmount);
	view_paymentAmount.add(editIncPayAmntBtn);
	//##

	pkr_receiptType.addEventListener('change', function(e) {

		pkr_receiptType.value = e.row.id;

		if (pkr_receiptType.value == 0) {
			// TODO remove all fields
			addIncomeReceiptTypeOption = 0;
			addRelevantInputFields(addIncomeReceiptTypeOption);
		} else if (pkr_receiptType.value == 1) {
			// TODO remove other income fields, add invoice income fields
			addIncomeReceiptTypeOption = 1;
			addRelevantInputFields(addIncomeReceiptTypeOption);
		} else if (pkr_receiptType.value == 2) {
			addIncomeReceiptTypeOption = 2;
			addRelevantInputFields(addIncomeReceiptTypeOption);
		}
		
	});
	
	function addRelevantInputFields(addIncomeReceiptTypeOption) {
			if (addIncomeReceiptTypeOption == 0) {
				// TODO remove all fields
				view_mainContainerInnerView.remove(view_categoryPicker);
				view_mainContainerInnerView.remove(view_subCategoryPicker);
				view_mainContainerInnerView.remove(view_amountReceived);
				//view_mainContainerInnerView.remove(view_vatRequired);
				view_mainContainerInnerView.remove(view_vatAmount);
				//view_mainContainerInnerView.remove(view_totalAmount);
				view_mainContainerInnerView.remove(view_projectPicker);
				view_mainContainerInnerView.remove(view_note);
				view_mainContainerInnerView.remove(view_picture);
				view_mainContainerInnerView.remove(view_customerName);
				view_mainContainerInnerView.remove(view_invoiceNumber);				
				view_mainContainerInnerView.remove(view_customerCreditTotal);
				view_mainContainerInnerView.remove(view_invoiceTotal);
				view_mainContainerInnerView.remove(view_invoiceDue);
				view_mainContainerInnerView.remove(view_paymentAmount);
				//view_mainContainerInnerView.remove(view_note);

				//view_mainContainerInnerView.add(view_note);

			} else if (addIncomeReceiptTypeOption == 1) {
				// TODO remove other income fields, add invoice income fields
				/*view_mainContainerInnerView.remove(view_categoryPicker);
				view_mainContainerInnerView.remove(view_subCategoryPicker);
				view_mainContainerInnerView.remove(view_amountReceived);
				//view_mainContainerInnerView.remove(view_vatRequired);
				view_mainContainerInnerView.remove(view_vatAmount);
				//view_mainContainerInnerView.remove(view_totalAmount);
				view_mainContainerInnerView.remove(view_projectPicker);
				view_mainContainerInnerView.remove(view_note);
				view_mainContainerInnerView.remove(view_picture);

				view_mainContainerInnerView.add(view_customerName);
				view_mainContainerInnerView.add(view_invoiceNumber);
				view_mainContainerInnerView.add(view_customerCreditTotal);
				view_mainContainerInnerView.add(view_invoiceTotal);
				view_mainContainerInnerView.add(view_invoiceDue);
				view_mainContainerInnerView.add(view_paymentAmount);
				view_mainContainerInnerView.add(view_note);*/

			} else if (addIncomeReceiptTypeOption == 2) {
				// TODO add other income fields, remove invoice income fields
				view_mainContainerInnerView.remove(view_customerName);
				view_mainContainerInnerView.remove(view_invoiceNumber);
				view_mainContainerInnerView.remove(view_customerCreditTotal);
				view_mainContainerInnerView.remove(view_invoiceTotal);
				view_mainContainerInnerView.remove(view_invoiceDue);
				view_mainContainerInnerView.remove(view_paymentAmount);
				view_mainContainerInnerView.remove(view_note);

				view_mainContainerInnerView.add(view_categoryPicker);
				view_mainContainerInnerView.add(view_subCategoryPicker);
				view_mainContainerInnerView.add(view_amountReceived);
				//view_mainContainerInnerView.add(view_vatRequired);
				//view_mainContainerInnerView.add(view_vatAmount);
				//view_mainContainerInnerView.add(view_totalAmount);
				view_mainContainerInnerView.add(view_projectPicker);
				view_mainContainerInnerView.add(view_customerName); // newly added - feedback9
				view_mainContainerInnerView.add(view_note);
				view_mainContainerInnerView.add(view_picture);
				console.log("addIncomeReceiptTypeOption == 2");
			}
		}

	//

	/*if(addIncomeDisplayOption == 'New'){
	 if(defaultAccountValueRow === null){
	 pkr_accountPicker.setSelectedRow(0, txtFld_addIncomeAccount.value);
	 } else {
	 pkr_accountPicker.setSelectedRow(0, defaultAccountValueRow);
	 pkr_accountPicker.value = defaultAccountValueRow;
	 }
	 } else {
	 pkr_accountPicker.setSelectedRow(0, txtFld_addIncomeAccount.value);
	 }*/

	if (addIncomeDisplayOption == 'New') {
		
		if (defaultAccountValueRow === null) {
			pkr_accountPicker.setSelectedRow(0, txtFld_addIncomeAccount.value);
		} else {
			pkr_accountPicker.setSelectedRow(0, defaultAccountValueRow);
			pkr_accountPicker.value = defaultAccountValueRow;
		}

		pkr_customerName.visible = true;
		pkr_invoiceNumber.visible = true;

		lbl_customerCreditTotalValue.text = toDecimalFormatView(0);
		lbl_invoiceTotalValue.text = toDecimalFormatView(0);
		lbl_invoiceDueValue.text = toDecimalFormatView(0);

	} else {

		pkr_accountPicker.setSelectedRow(0, txtFld_addIncomeAccount.value);
					
		//pkr_receiptType.setSelectedRow(0, addIncomeReceiptTypeOption);
		//addRelevantInputFields(addIncomeReceiptTypeOption);
		
		//pkr_customerNameUpdate.visible = true;
		//pkr_invoiceNumberUpdate.visible = true;
		
		/*if(addIncomeReceiptTypeOption == 1){			
			pkr_customerNameUpdate.value = getCustomerNameById(txtFld_addIncomeCustomerName.value);
			pkr_invoiceNumberUpdate.value = txtFld_addInvoiceNumber.value;
			lbl_invoiceTotalValue.text = toDecimalFormatView(getInvoiceTotal(txtFld_addInvoiceNumber.value));
			lbl_invoiceDueValue.text = toDecimalFormatView(getInvoiceDuebyInvoiceNumber(txtFld_addInvoiceNumber.value));
			lbl_customerCreditTotalValue.text = toDecimalFormatView(txtFld_addCustomerCredit.value);
		}*/

		
		if (addIncomeDisplayOption == 'View') {
			//TODO : Disable all fields
		}

	}

	//bellowTaxElements.push(lbl_totalAmount);
	//bellowTaxElements.push(txtFld_totalAmount);

	/*var customerNameLabel = Ti.UI.createLabel({
	text : 'Customer Name',
	color : '#000',
	top : 320,
	left : '2%',
	width : '37%',
	height : 40,

	});
	bellowTaxElements.push(customerNameLabel);

	var customerNameText = Ti.UI.createPicker({
	backgroundColor : '#A0A0A0',
	top : 365,
	left : '41%',
	width : '57%',
	height : 40,
	});
	bellowTaxElements.push(customerNameText);

	var getTableCustomerData = db.execute('SELECT * FROM tbl_customer');

	var tableCustomerData = [];
	var i = 1;
	tableCustomerData[0] = Ti.UI.createPickerRow({
	id : '0',
	title : 'Please Select',
	});
	while (getTableCustomerData.isValidRow()) {
	tableCustomerData[i] = Ti.UI.createPickerRow({
	id : getTableCustomerData.fieldByName('id'),
	title : getTableCustomerData.fieldByName('full_name')
	});
	getTableCustomerData.next();
	i++;
	}
	getTableCustomerData.close();

	customerNameText.selectionIndicator = true;
	customerNameText.add(tableCustomerData);

	//customerNameText.setSelectedRow(0, adhocIncomeCustomerName.value);*/

	// Project list

	//bellowTaxElements.push(lbl_projectPicker);
	//bellowTaxElements.push(pkr_projectPicker);

	//bellowTaxElements.push(lbl_note);

	// var txtFld_note = Ti.UI.createTextField({
	// backgroundColor : '#A0A0A0',
	// top : 535,
	// left : '41%',
	// width : '57%',
	// height : 40,
	// value: adhocIncomeNote.value,
	// });

	//bellowTaxElements.push(txtFld_note);

	//

	//bellowTaxElements.push(lbl_picture);
	//console.log('adhocIncomePictureTest >> ' + adhocIncomePicture.value);
	//bellowTaxElements.push(img_picture);

	//bellowTaxElements.push(view_footerButtonView);

	/*// Account section Listing
	var lbl_accountPicker = Ti.UI.createLabel({
	text : 'Select Account *',
	color : '#000',
	top : 50,
	left : '2%',
	width : '37%',
	height : 40,
	});

	var pkr_accountPicker = Ti.UI.createPicker({
	top : 50,
	left : '41%',
	width : '57%',
	height : 40,
	backgroundColor : '#A0A0A0',
	});

	var getAccountData = db.execute('SELECT * FROM tbl_account WHERE enable = 1');
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
	Ti.API.info('@@@ DEFAULT DETECTED ' + arr_accountData[i].title);
	defaultAccountValueRow = arr_accountData[i].id;
	}
	}*/

	///////////////////////////////////////////////////////////////////////////////////////////////////////////

	var view_footerButtonView = Ti.UI.createView({
		bottom : 0,
		width : '100%',
		//height : appPixel * 7.5,
		height : appPixel * 5,
		backgroundColor : '#054e62'
	});

	var btn_cancel = Ti.UI.createButton({
		title : 'Clear',
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
		backgroundColor : '#25B89B',
		backgroundSelectedColor : '#0a7390',
		//left : '0%',
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
		width : '34%',
		font : {
			fontSize : stylefontsize - 5,
			fontFamily : customFont1
		},
	});

	var btn_next = Ti.UI.createButton({
		title : 'Close',
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

	btn_save.addEventListener('click', function(e) {

		if (addIncomeReceiptTypeOption == 0) {
			alert('Please select a receipt type.');
		} else if (addIncomeReceiptTypeOption == 1) {
			if (addIncomeDisplayOption == 'New') {
				if (invoiceIncomeRecordValidate()) {
					var invoice_no = pkr_invoiceNumber.value;
					var categoryDetails = getCategoryDetails(invoice_no);
					var duepayment = getInvoiceDuebyInvoiceNumber(invoice_no);
					var paymentAmount = txtFld_paymentAmount.value;
					paymentAmount = paymentAmount.replace(/,/g, '');
					
					var excessCredit;
					var payableAmount;
					if(paymentAmount > duepayment){
						excessCredit = paymentAmount - duepayment;
						payableAmount = duepayment;
						updateCustomerCreditData(excessCredit, pkr_customerName.value);
					}
					var dateForSave = dateSaveChange(txtFld_entryDate.value);
					var imageData = (getImage == undefined ) ? txtFld_addIncomePicture.value : Ti.Utils.base64encode(getImage);

					var dbData = {
						payment_date : dateForSave,
						category_id : categoryDetails['category'],
						sub_category_id : categoryDetails['sub_category'],
						customer_name : pkr_customerName.value,
						invoice_no : pkr_invoiceNumber.value,
						account_id : pkr_accountPicker.value,
						project_id : '0',
						net_amount : /*(paymentAmount > duepayment) ? payableAmount :*/ paymentAmount,
						vat : '0',
						total_amount : /*(paymentAmount > duepayment) ? payableAmount :*/ paymentAmount,
						picture_path : imageData,
						note : txtFld_note.value,
						ex_credit : excessCredit
					};

					//console.log(dbData);

					var getResult = saveInvoiceIncomeData(dbData);
					var paymentAmount = txtFld_paymentAmount.value;
					paymentAmount = paymentAmount.replace(/,/g, '');

					if (duepayment <= paymentAmount) {
						updateInvoiceWithPaidStatus(invoice_no);
					}

					if (getResult) {
						clearContent();
						var toast = Ti.UI.createNotification({
							message : "Save Successful",
							duration : Ti.UI.NOTIFICATION_DURATION_SHORT
						});
						toast.show();
						
						/*Ti.App.fireEvent('addIncomeClose', 'e');
						var toast = Ti.UI.createNotification({
							message : "Save Successful",
							duration : Ti.UI.NOTIFICATION_DURATION_SHORT
						});
						toast.show();
						clearContent();
						view_mainContainer.hide();*/
					}

					//view_mainContainer.hide();
					clearContent();
					//view_transparentPopupContainer.hide();
					//view_calculator.hide();
					//view_mainContainerInnerView.scrollingEnabled = true;
				}

			} else {

				Ti.API.info('Update Recordd');
				if (invoiceIncomeRecordValidateUpdate()) {

					var invoice_no = pkr_invoiceNumberUpdate.value;
					var categoryDetails = getCategoryDetails(invoice_no);
					var duepayment = getInvoiceDuebyInvoiceNumber(invoice_no);
					var paymentAmount = txtFld_paymentAmount.value;
					paymentAmount = paymentAmount.replace(/,/g, '');
					
					//reduce previous excess data
					Ti.API.info('pkr_customerName.value : ' + pkr_customerName.value);
					Ti.API.info('Excess credit before reduce : ' + txtFld_addIncomeExcessCredit.value);
					reduceCustomerCreditData(txtFld_addIncomeExcessCredit.value, txtFld_addIncomeCustomerName.value);
					
					var excessCredit = 0;
					var payableAmount;
					
					Ti.API.info('DUE PAYMENT : ' + duepayment);
					Ti.API.info('PREVS TOTAL : ' + txtFld_addIncomeInvoiceTotal.value);
					Ti.API.info('PAYMENT AMT : ' + paymentAmount);
					
					if(paymentAmount > (duepayment + txtFld_addIncomeInvoiceTotal.value)){
						excessCredit = paymentAmount - duepayment - txtFld_addIncomeInvoiceTotal.value;
						payableAmount = (duepayment + txtFld_addIncomeInvoiceTotal.value);
						Ti.API.info('Excess credit before update : ' + excessCredit);
						updateCustomerCreditData(excessCredit, txtFld_addIncomeCustomerName.value);
					}
					
					txtFld_addIncomeExcessCredit.value = excessCredit;
					
					var dateForSave = dateSaveChange(txtFld_entryDate.value);

					var imageData = (getImage == undefined ) ? txtFld_addIncomePicture.value : Ti.Utils.base64encode(getImage);

					var dbData = {
						payment_date : dateForSave,
						category_id : categoryDetails['category'],
						sub_category_id : categoryDetails['sub_category'],
						customer_name : txtFld_addIncomeCustomerName.value,
						invoice_no : pkr_invoiceNumberUpdate.value,
						account_id : pkr_accountPicker.getSelectedRow(0).id,
						project_id : '0',
						net_amount : /*(paymentAmount > duepayment) ? payableAmount :*/ paymentAmount,
						vat : '0',
						total_amount : /*(paymentAmount > duepayment) ? payableAmount :*/ paymentAmount,
						picture_path : imageData,
						note : txtFld_note.value,
						ex_credit : excessCredit
					};
					Ti.API.info('TEST XXX');
					var getResult = updateInvoiceIncome(dbData, txtFld_addIncomeInvoiceTableID.value);
					Ti.API.info('TEST YYY');
					if (getInvoiceDuebyInvoiceNumber(invoice_no) <= 0) {
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
					//view_transparentPopupContainer.hide();
					//view_calculator.hide();
					view_mainContainerInnerView.scrollingEnabled = true;
				}
			}
		} else if (addIncomeReceiptTypeOption == 2) {
			if (isVATApply == 0) {
				Ti.API.info('VAT APPLICATION ENFORCED ' + isVATApply);
				tempVATValue = 0;
				txtFld_vatAmount.value = '0.00';
			}

			var invoiceNet = txtFld_amountReceived.value;
			invoiceNet = invoiceNet.replace(/,/g, '');
			//var invoiceTotal = txtFld_totalAmount.value; sinvat removen net = total
			var invoiceTotal = txtFld_amountReceived.value;
			invoiceTotal = invoiceTotal.replace(/,/g, '');
			var vat = txtFld_vatAmount.value;
			vat = vat.replace(/,/g, '');

			var dateForSave = dateSaveChange(txtFld_entryDate.value);

			//console.log('Selec Account ' + pkr_accountPicker.value);

			var imageData = (getImage == undefined ) ? adhocIncomePicture.value : Ti.Utils.base64encode(getImage);
			
			/*console.log(pkr_projectPicker.value);
			if (pkr_projectPicker.value == '' || pkr_projectPicker.value == "undefined"){
				var projectId = '';
			}else{
				var projectId = pkr_projectPicker.value;
				
			}
			projectId = projectId.replace(/,/g, '');*/
			
			// if content validated
			if (adhocIncomeRecordValidate()) {
				var dbData = {
					payment_date : dateForSave,
					category_id : pkr_categoryPicker.getSelectedRow(0).id,
					sub_category_id : pkr_subCategoryPicker.getSelectedRow(0).id,
					account_id : pkr_accountPicker.getSelectedRow(0).id,
					//project_id : pkr_projectPicker.getSelectedRow(0).id,
					project_id : pkr_projectPicker.value,
					net_amount : invoiceNet,
					vat : vat,
					total_amount : invoiceTotal,
					picture_path : imageData,
					customer_name : pkr_customerName.value, // customerNameText.getSelectedRow(0).id,
					note : txtFld_note.value,
					vat_presentage : (isManualVAT) ? 0 : tempVATValue,
				};

				if (addIncomeDisplayOption == "Update") {
					var getResult = updateAdhocIncomeData(dbData, adhocIncomeTableId.value);
					Ti.App.fireEvent('refrishEditView', 'e');
					if (getResult) {
						clearContent();
						view_mainContainer.hide();
						var toast = Ti.UI.createNotification({
							message : "Update Successful",
							duration : Ti.UI.NOTIFICATION_DURATION_SHORT
						});
						toast.show();
						Ti.App.fireEvent('editview_mainContainerClose', 'e');
					}
				} else {

					var getResult = saveAdhocIncomeData(dbData);

					if (getResult) {
						//Ti.App.fireEvent('addIncomeClose', 'e');
						clearContent();
						var toast = Ti.UI.createNotification({
							message : "Save Successful",
							duration : Ti.UI.NOTIFICATION_DURATION_SHORT
						});
						toast.show();
						//clearContent();
						//view_mainContainer.hide();
					}

				}
				//Ti.App.fireEvent('editview_mainContainerClose', 'e');
			}
		}
	});

	btn_next.addEventListener('click', function(e) {
		if (isFormNotEmpty()){
			var alertBoxDelete = Ti.UI.createAlertDialog({
					cancel : 1,
					buttonNames : ['Yes', 'No'],
					message : 'This income form has unsaved data.\nAre you sure you want to close without saving?',
					title : 'Close without saving?'
				});
	
			alertBoxDelete.show();
				
			alertBoxDelete.addEventListener('click', function(event) {
				if (event.index === 0) {
					clearContent();
					view_mainContainer.hide();
					Ti.App.fireEvent('editview_addIncomeContainerClose', 'e');
				}
			});
		}else{
			clearContent();
			view_mainContainer.hide();
			Ti.App.fireEvent('editview_addIncomeContainerClose', 'e');
		}
	});

	btn_cancel.addEventListener('click', function() {
		/*view_mainContainer.hide();
		clearContent();
		Ti.App.fireEvent('editview_mainContainerClose', 'e');*/
		clearIncomeForm();
	});

	btn_edit.addEventListener('click', function() {
		enableUpdate();
		btn_edit.visible = false;
		btn_next.visible = false;
		btn_save.visible = true;
		btn_cancel.visible = true;
		btn_save.right = '0%';
		btn_save.title = 'Update';

		if (addIncomeReceiptTypeOption == 1) {
			lbl_title.text = 'Edit Payment Against Inv...';
		} else if (addIncomeReceiptTypeOption == 2) {
			lbl_title.text = 'Edit Receipts';
		}

	});

	var view_disableLayer = Ti.UI.createView({
		//backgroundColor : 'pink',
		opacity : 0.7,
		width : '100%',
		height : '100%',
	});

	function enableUpdate() {
		try {
			view_mainContainerScrollView.remove(view_disableLayer);
		} catch (e) {
			Ti.API.info('Unable to remove disable layer');
		}
	}

	function disableUpdate() {
		view_mainContainerScrollView.add(view_disableLayer);
	}


	view_footerButtonView.add(btn_cancel);
	view_footerButtonView.add(btn_save);
	view_footerButtonView.add(btn_edit);
	view_footerButtonView.add(btn_next);

	/*************Add Category Popup*****************/

	var createCategoryWrapperView = Ti.UI.createView({
		visible : false,
		zIndex : 200,
	});
	// Full screen
	var createCategoryBackgroundView = Ti.UI.createView({// Also full screen
		backgroundColor : '#000',
		opacity : 0.6
	});
	var createCategoryContainerView = Ti.UI.createView({// Set height appropriately
		layout : 'vertical',
		width : '85%',
		height : deviceHeight * 0.265,
		backgroundColor : '#FFF',
	});

	var viewCreateCategoryContainerViewpopuptitle = Ti.UI.createView({
		height : deviceHeight * 0.075,
		backgroundColor : '#2980B9',
	});

	var someCreateCategoryLabel = Ti.UI.createLabel({
		text : 'New Category',
		color : '#FFFFFF',
		font : {
			fontSize : stylefontsize + 2,
			//fontFamily : customFont2,
		},
	});

	var imageCreateCategorypopupclose = Ti.UI.createImageView({
		image : '/images/closebtn.png',
		backgroundSelectedColor : '#999999',
		width : '9%',
		right : '3%',
	});

	viewCreateCategoryContainerViewpopuptitle.add(someCreateCategoryLabel);
	viewCreateCategoryContainerViewpopuptitle.add(imageCreateCategorypopupclose);
	createCategoryContainerView.add(viewCreateCategoryContainerViewpopuptitle);

	var createCategoryTextView = Ti.UI.createView({
		//backgroundColor : settingsbtncol,
		//backgroundSelectedColor : settingsbtnselectedcol,
		left : '1%',
		right : '1%',
		top : '2%',
		bottom : '0.5%',
		// height : deviceHeight * 0.11,
		height : settingOptionHeight,
	});

	var createCategoryText = Ti.UI.createTextField({
		//text : 'Camera',
		//keyboardType:Titanium.UI.KEYBOARD_DECIMAL_PAD,
		hintText : 'Category Name',
		borderColor : "#489CE0",
		width : '90%',
		color : settingsbtnfontcolor,
		left : '5%',
		font : {
			//fontFamily : customFont1,
			fontSize : stylefontsize,
		},
		autocapitalization : Ti.UI.TEXT_AUTOCAPITALIZATION_WORDS
	});

	createCategoryTextView.add(createCategoryText);
	createCategoryContainerView.add(createCategoryTextView);

	var btnCreateCategoryView = Ti.UI.createView({
		//backgroundColor : settingsbtncol,
		//backgroundSelectedColor : settingsbtnselectedcol,
		left : '1%',
		right : '1%',
		top : '1%',
		bottom : '0.5%',
		// height : deviceHeight * 0.11,
		height : settingOptionHeight,
	});

	var btnCreateCategory = Ti.UI.createButton({
		title : 'Save',
		//width : '70%',
		height : '70%',
		color : '#fff',
		backgroundColor : '#054e62',
		backgroundSelectedColor : '#0a7390',
		//left : '35%',
		font : {
			//fontFamily : customFont1,
			fontSize : stylefontsize - 5,
			fontFamily : customFont1
		},
	});

	btnCreateCategoryView.add(btnCreateCategory);
	createCategoryContainerView.add(btnCreateCategoryView);

	createCategoryWrapperView.add(createCategoryBackgroundView);
	createCategoryWrapperView.add(createCategoryContainerView);

	//var getImage;
	/*btnaddcategory.addEventListener('click', function(e) {
	 //console.log('Category');
	 createCategoryWrapperView.show();
	 //view_mainContainerScrollView.scrollingEnabled = false;
	 });*/

	imageCreateCategorypopupclose.addEventListener('click', function() {
		createCategoryWrapperView.hide();
		//view_mainContainerScrollView.scrollingEnabled = true;
		//AdhocVatText.value = vatPtg();
	});

	createCategoryBackgroundView.addEventListener('click', function() {
		createCategoryWrapperView.hide();
		//view_mainContainerScrollView.scrollingEnabled = true;
	});

	btnCreateCategory.addEventListener('click', function(e) {

		if (createCategoryText.value != '') {

			createCategoryWrapperView.hide();
			//view_mainContainerScrollView.scrollingEnabled = true;
			var CategoryName = createCategoryText.value;

			var dbData = {
				income_category : CategoryName,
				enable : '1',

			};

			var getResult = saveCategoryData(dbData);

			if (getResult) {

				/*if (pkr_categoryPicker.columns[0]) {
					var _col = pkr_categoryPicker.columns[0];
					var len = _col.rowCount;
					for (var x = len - 1; x >= 0; x--) {
						var _row = _col.rows[x];
						_col.removeRow(_row);
					}
					//picker.reloadColumn(_col);
				}*/
				emptyPicker(pkr_categoryPicker);

				var setCategoryData = [];

				setCategoryData = getCategoryPickerRows(0, 'incomeParent');

				pkr_categoryPicker.selectionIndicator = true;
				pkr_categoryPicker.add(setCategoryData);

				/*var TotalResultSet = db.execute('SELECT COUNT(id) AS categorycount  FROM tbl_income_category');
				var categorycount = TotalResultSet.fieldByName('categorycount');
				//customercount += 1;*/

				//console.log('categorycount ' + categorycount);

				var categoryList = new Array;
				categoryList = getDataArray(0, 'incomeParent');
				var rowNo = returnRowNo(categoryList, createCategoryText.value);
				pkr_categoryPicker.setSelectedRow(0, rowNo+1, false);
				
				//pkr_categoryPicker.setSelectedRow(0, categorycount, false);
				createCategoryText.value = '';
			}

		} else {
			// empty validation error
			var dialog2 = Ti.UI.createAlertDialog({
				title : 'Error!',
				message : 'Category Name cannot be empty.',
				ok : 'Ok',
			});
		}

	});

	/********End of Add Category Popup*********/

	/*************Add Sub Category Popup*****************/

	var createSubCategoryWrapperView = Ti.UI.createView({
		visible : false,
		zIndex : 200,
	});
	// Full screen
	var createSubCategoryBackgroundView = Ti.UI.createView({// Also full screen
		backgroundColor : '#000',
		opacity : 0.6
	});
	var createSubCategoryContainerView = Ti.UI.createView({// Set height appropriately
		layout : 'vertical',
		width : '85%',
		height : deviceHeight * 0.265,
		backgroundColor : '#FFF',
	});

	var viewCreateSubCategoryContainerViewpopuptitle = Ti.UI.createView({
		height : deviceHeight * 0.075,
		backgroundColor : '#2980B9',
	});

	var someCreateSubCategoryLabel = Ti.UI.createLabel({
		text : 'New Sub Category',
		color : '#FFFFFF',
		font : {
			fontSize : stylefontsize + 2,
			//fontFamily : customFont2,
		},
	});

	var imageCreateSubCategorypopupclose = Ti.UI.createImageView({
		image : '/images/closebtn.png',
		backgroundSelectedColor : '#999999',
		width : '9%',
		right : '3%',
	});

	viewCreateSubCategoryContainerViewpopuptitle.add(someCreateSubCategoryLabel);
	viewCreateSubCategoryContainerViewpopuptitle.add(imageCreateSubCategorypopupclose);
	createSubCategoryContainerView.add(viewCreateSubCategoryContainerViewpopuptitle);

	var createSubCategoryTextView = Ti.UI.createView({
		//backgroundColor : settingsbtncol,
		//backgroundSelectedColor : settingsbtnselectedcol,
		left : '1%',
		right : '1%',
		top : '2%',
		bottom : '0.5%',
		// height : deviceHeight * 0.11,
		height : settingOptionHeight,
	});

	var createSubCategoryText = Ti.UI.createTextField({
		//text : 'Camera',
		//keyboardType:Titanium.UI.KEYBOARD_DECIMAL_PAD,
		hintText : 'Sub Category Name',
		borderColor : "#489CE0",
		width : '90%',
		color : settingsbtnfontcolor,
		left : '5%',
		font : {
			//fontFamily : customFont1,
			fontSize : stylefontsize,
		},
		autocapitalization : Ti.UI.TEXT_AUTOCAPITALIZATION_WORDS
	});

	createSubCategoryTextView.add(createSubCategoryText);
	createSubCategoryContainerView.add(createSubCategoryTextView);

	var btnCreateSubCategoryView = Ti.UI.createView({
		//backgroundColor : settingsbtncol,
		//backgroundSelectedColor : settingsbtnselectedcol,
		left : '1%',
		right : '1%',
		top : '1%',
		bottom : '0.5%',
		// height : deviceHeight * 0.11,
		height : settingOptionHeight,
	});

	var btnCreateSubCategory = Ti.UI.createButton({
		title : 'Save',
		//width : '70%',
		height : '70%',
		color : '#fff',
		backgroundColor : '#054e62',
		backgroundSelectedColor : '#0a7390',
		//left : '35%',
		font : {
			//fontFamily : customFont1,
			fontSize : stylefontsize - 5,
			fontFamily : customFont1
		},
	});

	btnCreateSubCategoryView.add(btnCreateSubCategory);
	createSubCategoryContainerView.add(btnCreateSubCategoryView);

	createSubCategoryWrapperView.add(createSubCategoryBackgroundView);
	createSubCategoryWrapperView.add(createSubCategoryContainerView);

	//var getImage;
	btn_addSubCategory.addEventListener('click', function(e) {
		//console.log('pkr_categoryPicker ' + pkr_categoryPicker.value);

		if (adhocIncomeCategory.value == undefined || adhocIncomeCategory.value == 0) {
			var dialog = Ti.UI.createAlertDialog({
				title : 'Alert',
				message : 'Please Select Parent Category',
				ok : 'Ok',
			});
			dialog.show();
		} else {
			createSubCategoryWrapperView.show();
			createSubCategoryText.focus();
		}

		//view_mainContainerScrollView.scrollingEnabled = false;
	});
	btnaddcategory.addEventListener('click', function(e) {
		createCategoryWrapperView.show();
		createCategoryText.focus();
	});
	
	imageCreateCategorypopupclose.addEventListener('click', function() {
		createCategoryWrapperView.hide();
	});
	createCategoryBackgroundView.addEventListener('click', function() {
		createCategoryWrapperView.hide();
	});
	
	imageCreateSubCategorypopupclose.addEventListener('click', function() {
		createSubCategoryWrapperView.hide();
		//view_mainContainerScrollView.scrollingEnabled = true;
		//AdhocVatText.value = vatPtg();
	});

	createSubCategoryBackgroundView.addEventListener('click', function() {
		createSubCategoryWrapperView.hide();
		//view_mainContainerScrollView.scrollingEnabled = true;
	});

	btnCreateSubCategory.addEventListener('click', function(e) {

		if (createSubCategoryText.value != '') {

			createSubCategoryWrapperView.hide();
			//view_mainContainerScrollView.scrollingEnabled = true;
			var SubCategoryName = createSubCategoryText.value;

			var dbData = {
				income_sub_category : SubCategoryName,
				parent_category : adhocIncomeCategory.value,
				enable : '1',

			};

			var getResult = saveSubCategoryData(dbData);

			if (getResult) {

				/*if (pkr_subCategoryPicker.columns[0]) {
					var _col = pkr_subCategoryPicker.columns[0];
					var len = _col.rowCount;
					for (var x = len - 1; x >= 0; x--) {
						var _row = _col.rows[x];
						_col.removeRow(_row);
					}
					//picker.reloadColumn(_col);
				}*/
				emptyPicker(pkr_subCategoryPicker);
				var selectCategorydata = [];

				selectSubCategorydata = getCategoryPickerRows(adhocIncomeCategory.value, 'incomeSub');

				pkr_subCategoryPicker.selectionIndicator = true;
				pkr_subCategoryPicker.add(selectSubCategorydata);

				/*var TotalResultSet = db.execute('SELECT COUNT(id) AS subcategorycount  FROM tbl_income_sub_category WHERE parent_category=' + pkr_categoryPicker.value);
				var subcategorycount = TotalResultSet.fieldByName('subcategorycount');
				//customercount += 1;

				//console.log('subcategorycount ' + subcategorycount);
*/
				var subCategoryList = new Array;
				subCategoryList = getDataArray(adhocIncomeCategory.value, 'incomeSub');
				var rowNo = returnRowNo(subCategoryList, createSubCategoryText.value);
				pkr_subCategoryPicker.setSelectedRow(0, rowNo, false);

				//pkr_subCategoryPicker.setSelectedRow(0, subcategorycount, false);
				createSubCategoryText.value = '';
			}

		} else {
			// empty validation error
			var dialog2 = Ti.UI.createAlertDialog({
				title : 'Error!',
				message : 'Category Name cannot be empty.',
				ok : 'Ok',
			});
		}

	});

	/********End of Add  Sub Category Popup*********/

	/*************Change Vat Popup*****************/

	var AdhocVatWrapperView = Ti.UI.createView({
		visible : false,
		zIndex : 200,
	});
	// Full screen
	var AdhocVatBackgroundView = Ti.UI.createView({// Also full screen
		backgroundColor : '#000',
		opacity : 0.6
	});
	var AdhocVatContainerView = Ti.UI.createView({// Set height appropriately
		layout : 'vertical',
		width : '85%',
		height : Ti.UI.SIZE, //deviceHeight * 0.265,
		backgroundColor : '#FFF',
	});

	var viewVatpopuptitle = Ti.UI.createView({
		height : deviceHeight * 0.075,
		backgroundColor : '#2980B9',
	});

	var someVatLabel = Ti.UI.createLabel({
		text : 'Change VAT Value',
		color : '#FFFFFF',
		font : {
			fontSize : stylefontsize + 2,
			//fontFamily : customFont2,
		},
	});

	var imageVatpopupclose = Ti.UI.createImageView({
		image : '../images/closebtn.png',
		backgroundSelectedColor : '#999999',
		width : '9%',
		right : '3%',
	});

	viewVatpopuptitle.add(someVatLabel);
	viewVatpopuptitle.add(imageVatpopupclose);
	AdhocVatContainerView.add(viewVatpopuptitle);

	//#
	var vatTypeSelectionView = Ti.UI.createView({
		left : '18dp',
		right : '18dp',
		top : 12,
		bottom : 5,
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
		backgroundColor : 'white'
	});

	AdhocVatContainerView.add(vatTypeSelectionView);

	var vw_Outer = Ti.UI.createView({
		backgroundColor : 'white',
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE,
		layout : 'horizontal',
	});

	vatTypeSelectionView.add(vw_Outer);

	var vw_InnerLeft = Ti.UI.createView({
		backgroundColor : 'white',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		layout : 'horizontal',
		id : 1
	});

	vw_Outer.add(vw_InnerLeft);

	var vw_InnerRight = Ti.UI.createView({
		backgroundColor : 'white',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		layout : 'horizontal',
		id : 2
	});

	vw_Outer.add(vw_InnerRight);

	var RadioButtonSelectedImage = '/images/RadioBtn_Selected.png';
	var RadioButtonUnSelectedImage = '/images/RadioBtn_UnSelected.png';

	var vw_RadioImageLeft = Ti.UI.createView({
		backgroundImage : RadioButtonSelectedImage,
		top : '10dp',
		left : '0dp',
		right : '10dp',
		bottom : '10dp',
		width : '20dp',
		height : '20dp',
		layout : 'horizontal'
	});

	vw_InnerLeft.add(vw_RadioImageLeft);

	var vw_RadioImageRight = Ti.UI.createView({
		backgroundImage : RadioButtonUnSelectedImage,
		top : '10dp',
		left : '30dp',
		right : '10dp',
		bottom : '10dp',
		width : '20dp',
		height : '20dp',
		layout : 'horizontal'
	});

	vw_InnerRight.add(vw_RadioImageRight);

	var lblDescLeft = Ti.UI.createLabel({
		text : 'Percentage',
		font : {
			fontFamily : 'Arial',
			fontSize : '13sp',
		},
		color : settingsbtnfontcolor
	});

	vw_InnerLeft.add(lblDescLeft);

	var lblDescRight = Ti.UI.createLabel({
		text : 'Value',
		font : {
			fontFamily : 'Arial',
			fontSize : '13sp',
		},
		color : settingsbtnfontcolor
	});

	vw_InnerRight.add(lblDescRight);

	vw_RadioImageRight.addEventListener('singletap', function(e) {
		switchActiveButton(vw_InnerRight.id);
	});

	vw_RadioImageLeft.addEventListener('singletap', function(e) {
		switchActiveButton(vw_InnerLeft.id);
	});

	function switchActiveButton(ButtonID) {
		if (ButtonID === vw_InnerLeft.id) {
			vw_RadioImageLeft.backgroundImage = RadioButtonSelectedImage;
			vw_RadioImageRight.backgroundImage = RadioButtonUnSelectedImage;
			isManualVAT = false;
		} else if (ButtonID === vw_InnerRight.id) {
			vw_RadioImageRight.backgroundImage = RadioButtonSelectedImage;
			vw_RadioImageLeft.backgroundImage = RadioButtonUnSelectedImage;
			isManualVAT = true;
		}
	}

	//#

	var AdhocVatTextView = Ti.UI.createView({
		//backgroundColor : settingsbtncol,
		//backgroundSelectedColor : settingsbtnselectedcol,
		left : '1%',
		right : '1%',
		top : '2%',
		bottom : '0.5%',
		// height : deviceHeight * 0.11,
		height : settingOptionHeight,
	});

	var AdhocVatText = Ti.UI.createTextField({
		//text : 'Camera',
		keyboardType : Titanium.UI.KEYBOARD_DECIMAL_PAD,
		borderColor : "#489CE0",
		width : '90%',
		//value : vatPtg(),
		color : settingsbtnfontcolor,
		left : '5%',
		font : {
			//fontFamily : customFont1,
			fontSize : stylefontsize,
		},
		maxLength : 10,
	});

	if (addIncomeDisplayOption == 'New') {
		AdhocVatText.value = vatPtg();
	} else {
		if (isManualVAT) {
			AdhocVatText.value = adhocIncomeVAT.value;
		} else {
			AdhocVatText.value = adhocIncomeVATPresent.value;
		}
	}

	AdhocVatTextView.add(AdhocVatText);
	AdhocVatContainerView.add(AdhocVatTextView);

	var btnAdhocVatView = Ti.UI.createView({
		//backgroundColor : settingsbtncol,
		//backgroundSelectedColor : settingsbtnselectedcol,
		left : '1%',
		right : '1%',
		top : '1%',
		bottom : '0.5%',
		// height : deviceHeight * 0.11,
		height : settingOptionHeight,
	});

	var btnAdhocVat = Ti.UI.createButton({
		title : 'Ok',
		//width : '70%',
		height : '70%',
		color : '#fff',
		backgroundColor : '#054e62',
		backgroundSelectedColor : '#0a7390',
		//left : '35%',
		font : {
			//fontFamily : customFont1,
			fontSize : stylefontsize - 5,
			fontFamily : customFont1
		},
	});

	btnAdhocVatView.add(btnAdhocVat);
	AdhocVatContainerView.add(btnAdhocVatView);

	AdhocVatWrapperView.add(AdhocVatBackgroundView);
	AdhocVatWrapperView.add(AdhocVatContainerView);

	//var getImage;
	btn_changeVATPercentageValue.addEventListener('click', function(e) {
		//console.log('change');
		AdhocVatWrapperView.show();
		view_mainContainerScrollView.scrollingEnabled = false;
	});

	imageVatpopupclose.addEventListener('click', function() {
		AdhocVatWrapperView.hide();
		view_mainContainerScrollView.scrollingEnabled = true;
		//AdhocVatText.value = vatPtg();
	});

	AdhocVatBackgroundView.addEventListener('click', function() {
		AdhocVatWrapperView.hide();
		view_mainContainerScrollView.scrollingEnabled = true;
	});

	btnAdhocVat.addEventListener('click', function(e) {

		AdhocVatWrapperView.hide();
		view_mainContainerScrollView.scrollingEnabled = true;
		var vatVal = AdhocVatText.value;
		vatVal = vatVal * 1;
		var float = /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/;

		console.log(float.test(vatVal));
		if (float.test(vatVal)) {
			if (isManualVAT) {
				//Validation removed as per client requiremet
				/*if(vatVal < txtFld_amountReceived.value){
				 lbl_vatAmount.text = 'VAT Amount ' + '(' + currencyType + ')';
				 var invoiceNet = txtFld_amountReceived.value;
				 txtFld_vatAmount.value = toDecimalFormatWithoutCurrency(vatVal);
				 var totalValue = invoiceNet * 1 + vatVal * 1;
				 txtFld_totalAmount.value = toDecimalFormatWithoutCurrency(Math.ceil(totalValue * 10000) / 10000);
				 } else {
				 alert('Please add an amount less than the Net Invoice value.');
				 AdhocVatWrapperView.show();
				 isManualVAT = false;
				 switchActiveButton(1);
				 AdhocVatText.value = vatPtg();
				 }*/

				lbl_vatAmount.text = 'VAT Amount ' + '(' + currencyType + ')';
				var invoiceNet = txtFld_amountReceived.value;
				txtFld_vatAmount.value = toDecimalFormatWithoutCurrency(vatVal);
				var totalValue = invoiceNet * 1 + vatVal * 1;
				txtFld_totalAmount.value = toDecimalFormatWithoutCurrency(Math.ceil(totalValue * 10000) / 10000);

			} else {
				if (vatVal <= '100') {
					vatPtg(vatVal);
					lbl_vatAmount.text = 'VAT ' + vatVal + '% ' + '(' + currencyType + ')';
					var invoiceNet = txtFld_amountReceived.value;
					invoiceNet = invoiceNet.replace(/,/g, '');
					tempVATValue = vatVal;
					var invoiceVat = (invoiceNet * vatVal) / 100;
					txtFld_vatAmount.value = toDecimalFormatWithoutCurrency(invoiceVat);
					var vat = txtFld_vatAmount.value;
					vat = vat.replace(/,/g, '');
					var totalValue = invoiceNet * 1 + vat * 1;
					txtFld_totalAmount.value = toDecimalFormatWithoutCurrency(Math.ceil(totalValue * 10000) / 10000);
				} else {
					alert('Please Add Number Below to 100%');
					AdhocVatWrapperView.show();
					view_mainContainerScrollView.scrollingEnabled = false;
				}
			}
		} else {
			alert('Please Add Numbers');
			AdhocVatWrapperView.show();
			view_mainContainerScrollView.scrollingEnabled = false;
		}

	});

	/********End Vat Popup*********/

	pkr_categoryPicker.addEventListener('change', function(e) {
		pkr_categoryPicker.value = e.row.id;
		adhocIncomeCategory.value = e.row.id;
		//console.log('************ ' + e.row.id);
		// getSubCategoryData(e.row.id);
		/*if (pkr_subCategoryPicker.columns[0]) {
			var _col = pkr_subCategoryPicker.columns[0];
			var len = _col.rowCount;
			for (var x = len - 1; x >= 0; x--) {
				var _row = _col.rows[x];
				_col.removeRow(_row);
			}
			//picker.reloadColumn(_col);
		}*/
		emptyPicker(pkr_subCategoryPicker);
		subCategoryPickerDataSelect = getCategoryPickerRows(e.row.id, 'incomeSub');

		pkr_subCategoryPicker.add(subCategoryPickerDataSelect);
		//adhocIncomeSubCategory.add(subCategoryPickerDataSelect);
		//pkr_subCategoryPicker.setSelectedRow(0, 0, false);
		var subCatList = getDataArray(e.row.id, 'incomeSub');
		var defaultRowNo = returnRowNo(subCatList, 'General');
		pkr_subCategoryPicker.setSelectedRow(0, defaultRowNo, false);
		//adhocIncomeSubCategory.setSelectedRow(0, defaultRowNo, false);
		
	});

	pkr_subCategoryPicker.addEventListener('change', function(e) {
		if (e.row != null) {
			pkr_subCategoryPicker.value = e.row.id;
			adhocIncomeSubCategory.value = e.row.id;
		}

	});

	pkr_accountPicker.addEventListener('change', function(e) {
		pkr_accountPicker.value = e.row.id;
		txtFld_addIncomeAccount.value = e.row.id;
	});

	pkr_projectPicker.addEventListener('change', function(e) {
		adhocIncomeProject.value = pkr_projectPicker.value;
	});
	
	txtFld_note.addEventListener('change', function(e) {
		adhocIncomeNote.value = txtFld_note.value;
	});
	
	txtFld_entryDate.addEventListener('change', function(e) {
		adhocIncomeEntryDate.value = txtFld_entryDate.value;
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
		
		var customerRecord = db.execute('SELECT * FROM tbl_customer WHERE id=' + e.row.id);
		
		Ti.API.info('ROW ID : ' + e.row.id);
				
		if(e.row.id != '0'){
			lbl_customerCreditTotalValue.text = toDecimalFormatView(customerRecord.fieldByName('customer_credit'));
		} else {
			lbl_customerCreditTotalValue.text = toDecimalFormatView(0);
		}				
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
	txtFld_amountReceived.addEventListener('focus', function() { //changed action to blur
			txtFld_amountReceived.setSelection(0,txtFld_amountReceived.value.length);
		});
	txtFld_amountReceived.addEventListener('blur', function() {
		Ti.API.info('total changed');
		/*var invoiceNet = txtFld_amountReceived.value;
		invoiceNet = invoiceNet.replace(/,/g, '');
		var tempVatvals = tempVATValue;
		var invoiceVat;
		if (!isManualVAT) {
			invoiceVat = (invoiceNet * vatPtg(tempVatvals)) / 100;
			txtFld_vatAmount.value = toDecimalFormatWithoutCurrency(invoiceVat);
		}
		var vat = txtFld_vatAmount.value;
		vat = vat.replace(/,/g, '');
		var totalValue = invoiceNet * 1 + vat * 1;
		if (isVATApply == 0) {
			totalValue = invoiceNet * 1;
		}*/
		//var totalVal
		var pd_value = txtFld_amountReceived.value * 1;
		//txtFld_amountReceived.value = parseFloat(Math.round(pd_value * 100) / 100).toFixed(2);
		txtFld_amountReceived.value = toDecimalFormatWithoutCurrency(pd_value);
	});

	txtFld_vatAmount.addEventListener('change', function() {
		var invoiceNet = txtFld_amountReceived.value;
		invoiceNet = invoiceNet.replace(/,/g, '');
		var vat = txtFld_vatAmount.value;
		vat = vat.replace(/,/g, '');
		var totalValue = invoiceNet * 1 + vat * 1;
		if (isVATApply == 0) {
			totalValue = invoiceNet * 1;
		}
		txtFld_totalAmount.value = toDecimalFormatWithoutCurrency(Math.ceil(totalValue * 10000) / 10000);
	});

	var AdhocwrapperView = Ti.UI.createView({
		visible : false,
		zIndex : 200,
	});
	// Full screen
	var AdhocbackgroundView = Ti.UI.createView({// Also full screen
		backgroundColor : '#000',
		opacity : 0.6
	});
	var AdhoccontainerView = Ti.UI.createView({// Set height appropriately
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

	var imagepopupclose = Ti.UI.createImageView({
		image : '../images/closebtn.png',
		backgroundSelectedColor : '#999999',
		width : '9%',
		right : '3%',
	});

	view_popuptitle.add(someLabel);
	view_popuptitle.add(imagepopupclose);
	AdhoccontainerView.add(view_popuptitle);

	var btnAdhocCameraView = Ti.UI.createView({
		backgroundColor : settingsbtncol,
		backgroundSelectedColor : settingsbtnselectedcol,
		left : '1%',
		right : '1%',
		top : '2%',
		bottom : '0.5%',
		height : settingOptionHeight,
	});

	var lblAdhocCamera = Ti.UI.createLabel({
		text : 'Add From Camera',
		color : settingsbtnfontcolor,
		left : '5%',
		font : {
			//fontFamily : customFont1,
			fontSize : stylefontsize,
		},
	});

	btnAdhocCameraView.add(lblAdhocCamera);
	AdhoccontainerView.add(btnAdhocCameraView);

	var btnAdhocGallerView = Ti.UI.createView({
		backgroundColor : settingsbtncol,
		backgroundSelectedColor : settingsbtnselectedcol,
		left : '1%',
		right : '1%',
		top : '1%',
		bottom : '0.5%',
		// height : deviceHeight * 0.11,
		height : settingOptionHeight,
	});

	var lblAdhocGallery = Ti.UI.createLabel({
		text : 'Add From Gallery',
		//width : '70%',
		color : settingsbtnfontcolor,
		left : '5%',
		font : {
			//fontFamily : customFont1,
			fontSize : stylefontsize,
		},
	});

	btnAdhocGallerView.add(lblAdhocGallery);
	AdhoccontainerView.add(btnAdhocGallerView);

	var btnAdhocremoveimgView = Ti.UI.createView({
		backgroundColor : settingsbtncol,
		backgroundSelectedColor : settingsbtnselectedcol,
		left : '1%',
		right : '1%',
		top : '1%',
		bottom : '0.5%',
		// height : deviceHeight * 0.11,
		height : settingOptionHeight,
	});

	var lblAdhocremoveimg = Ti.UI.createLabel({
		text : 'Remove Image',
		//width : '70%',
		color : settingsbtnfontcolor,
		left : '5%',
		font : {
			//fontFamily : customFont1,
			fontSize : stylefontsize,
		},
	});

	btnAdhocremoveimgView.add(lblAdhocremoveimg);
	AdhoccontainerView.add(btnAdhocremoveimgView);

	AdhocwrapperView.add(AdhocbackgroundView);
	AdhocwrapperView.add(AdhoccontainerView);

	var getImage;
	img_picture.addEventListener('click', function(e) {
		AdhocwrapperView.show();
		view_mainContainerScrollView.scrollingEnabled = false;
	});

	view_mainContainerScrollView.addEventListener('onload', function(e) {
		AdhocwrapperView.hide();
		AdhocVatWrapperView.hide();
		view_mainContainerScrollView.scrollingEnabled = true;
	});

	imagepopupclose.addEventListener('click', function() {
		AdhocwrapperView.hide();
		view_mainContainerScrollView.scrollingEnabled = true;
	});

	AdhocbackgroundView.addEventListener('click', function() {
		AdhocwrapperView.hide();
		view_mainContainerScrollView.scrollingEnabled = true;
	});

	btnAdhocCameraView.addEventListener('click', function() {
		AdhocwrapperView.hide();
		view_mainContainerScrollView.scrollingEnabled = true;

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

	btnAdhocGallerView.addEventListener('click', function() {
		AdhocwrapperView.hide();
		view_mainContainerScrollView.scrollingEnabled = true;

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

	btnAdhocremoveimgView.addEventListener('click', function(argument) {
		img_picture.image = '/images/camera.png';
		adhocIncomePicture.value = '/images/camera.png';
		AdhocwrapperView.hide();
		view_mainContainerScrollView.scrollingEnabled = true;
	});

	//Calendar Popup for Entry date
	btn_entryDate.addEventListener('click', function(e) {
		//var setDate = new Date(2010, 05, 05); ***********************************************
		//console.log("date " + setDate);
		var entryDatePicker = Ti.UI.createPicker({
			type:Ti.UI.PICKER_TYPE_DATE,
			//value:new Date(2014,3,12),
			  
			/*type: Titanium.UI.PICKER_TYPE_DATE,
			value:setDate,*/
		});
		
		var last_part2 = txtFld_entryDate.value;
		var day = last_part2.split("/")[0];
	    var month =  last_part2.split("/")[1];
	    var year =  last_part2.split("/")[2];
	    var selectedDatePicker = new Date(year, month-1, day);
		console.log("selectedDatePicker " + selectedDatePicker);
		
		entryDatePicker.showDatePickerDialog({
			value: selectedDatePicker,
			cancel : true,
			callback : function(e) {
				if (e.cancel) {
					Ti.API.info('user canceled dialog');
				} else {
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
					var dateObj = e.value;
					var pickerDate = (dateObj.getDate() < 10) ? '0' + dateObj.getDate() : dateObj.getDate();
					var pickerMonth = (dateObj.getMonth() + 1) < 10 ? '0' + (dateObj.getMonth() + 1) : dateObj.getMonth() + 1;
					var pickerYear = dateObj.getFullYear();

					// selectedDate = pickerYear + '-' + pickerMonth + '-' + pickerDate;
					selectedDate = pickerDate + '/' + pickerMonth + '/' + pickerYear;
					txtFld_entryDate.value = selectedDate;
					entryDatePicker.value = e.value;
					txtFld_entryDate.blur();
				}
			}
		});

	});

	Ti.App.addEventListener('addview_addIncomeContainerClose', function(e) {
		isVATApply = 0;
		isManualVAT = false;
		view_mainContainer.hide();
		clearContent();
		AdhocwrapperView.hide();
		AdhocVatWrapperView.hide();
		createCategoryWrapperView.hide();
		createSubCategoryWrapperView.hide();
		view_calculator.hide();
		view_mainContainerScrollView.scrollingEnabled = true;
	});

	Ti.App.addEventListener('editview_addIncomeContainerClose', function(e) {
		isVATApply = 0;
		isManualVAT = false;
		view_mainContainer.hide();
		clearContent();
		AdhocwrapperView.hide();
		AdhocVatWrapperView.hide();
		createCategoryWrapperView.hide();
		createSubCategoryWrapperView.hide();
		view_calculator.hide();
		view_mainContainerScrollView.scrollingEnabled = true;

		adhocIncomeTableId.value = '';
		adhocIncomeTitle.value = 'Add Bank Receipts';
		adhocIncomeEntryDate.value = getDate();
		adhocIncomeCategory.value = 0;
		adhocIncomeSubCategory.value = 0;
		txtFld_addIncomeAccount.value = 2;
		adhocIncomeProject.value = '';
		adhocIncomeInvoiceNet.value = '0.00';
		adhocIncomeVATPresent.value = '';
		adhocIncomeVAT.value = '0.00';
		adhocIncomeInvoiceTotal.value = '0.00';

		adhocIncomePicture.value = '/images/camera.png';
		adhocIncomeCustomerName.value = 0;

		adhocIncomeNote.value = '';
		addIncomeDisplayOption = 'New';
	});

	view_mainContainer.add(view_mainContainerScrollView);
	view_mainContainer.add(view_footerButtonView);
	view_mainContainer.add(AdhocwrapperView);
	view_mainContainer.add(AdhocVatWrapperView);
	view_mainContainer.add(createCategoryWrapperView);
	view_mainContainer.add(createSubCategoryWrapperView);
	view_mainContainer.add(view_calculator);
	view_mainContainer.add(createCustomerWrapperView);
	
	///////////////// calling function to display fields for 'other income'
	addIncomeReceiptTypeOption = 2;
	addRelevantInputFields(addIncomeReceiptTypeOption);
	/////////////

	// var mainViews = [];
	// mainViews['view_mainContainerScrollView'] = view_mainContainerScrollView;
	// mainViews['wrapperView'] = AdhocwrapperView;
	// mainViews['AdhocVatWrapperView'] = AdhocVatWrapperView;
	// mainViews['view_calculator'] = view_calculator;

	for (x in bellowTaxElements) {
		moveUP(bellowTaxElements[x]);
	}

	if (isManualVAT) {
		switchActiveButton(2);
		Ti.API.info('IS MANUAL VAT');
	} else {
		switchActiveButton(1);
		Ti.API.info('IS NOT MANUAL VAT');
	}

	if (addIncomeDisplayOption != 'New') {
		if (adhocIncomeVAT.value != '0.0' || adhocIncomeVATPresent.value != '0.0') {
			setupVATChangeSelectionOnUpdate(1);
			// Select 'Yes' as VAT applies
			pkr_vatRequired.setSelectedRow(0, 1, false);
			// Select 'Yes' as VAT applies
		}
	}

	if (addIncomeDisplayOption == 'New') {
		enableUpdate();
		btn_edit.visible = false;
		btn_next.visible = true;
		btn_save.visible = true;
		btn_cancel.visible = true;
	} else if (addIncomeDisplayOption == 'View') {
		disableUpdate();
		btn_edit.visible = true;
		btn_next.visible = false;
		btn_save.visible = false;
		btn_cancel.visible = false;
		btn_save.right = '0%';
		btn_save.title = 'Update';
	} else if (addIncomeDisplayOption == 'Update') {
		enableUpdate();
		btn_edit.visible = false;
		btn_next.visible = true;
		btn_save.visible = true;
		btn_cancel.visible = true;
		//btn_save.right = '0%';
		btn_save.title = 'Update';
	}

	return view_mainContainer;
};

// module.exports = Adhocincome;

function getLastRefNo() {
		var refNoResults = db.execute("SELECT * FROM tbl_income WHERE project_id !='' ORDER BY id DESC");
		//Ti.API.info('optionResultSet : ' + JSON.stringify(optionResultSet));
		var lastRefNo = refNoResults.fieldByName('project_id');
		
		Ti.API.info('lastref function called'+lastRefNo);
		return lastRefNo;
	}

exports.setIncomeData = function(tableId, viewOption, incomeType) {
	
	addIncomeReceiptTypeOption = incomeType;

	if (viewOption === null || viewOption === undefined || viewOption === '') {
		addIncomeDisplayOption = 'Update';
		// this is as the view option was added at a later time
		adhocIncomeTitle.value = 'Edit';
	} else if (viewOption === 'Update') {
		addIncomeDisplayOption = 'Update';
		adhocIncomeTitle.value = 'Edit';
	} else if (viewOption === 'View') {
		addIncomeDisplayOption = 'View';
		adhocIncomeTitle.value = 'View';
	}
	editTransactionId = tableId;
	var adhocIncomeDataSet = db.execute('SELECT * FROM tbl_income WHERE id = ' + tableId);
	
	if (addIncomeReceiptTypeOption == 1) {
		
		adhocIncomeTitle.value = adhocIncomeTitle.value +  ' Payment Against Inv.';
		
		adhocIncomeEntryDate.value = changeDateView(adhocIncomeDataSet.fieldByName('payment_date'));
		txtFld_addIncomeCustomerName.value = adhocIncomeDataSet.fieldByName('customer_name');
		txtFld_addInvoiceNumber.value = adhocIncomeDataSet.fieldByName('invoice_no');
		txtFld_addIncomeInvoiceNet.value = adhocIncomeDataSet.fieldByName('net_amount');
		txtFld_addIncomeInvoiceVATPercentage.value = adhocIncomeDataSet.fieldByName('vat_presentage');
		txtFld_addIncomeInvoiceTotal.value = adhocIncomeDataSet.fieldByName('total_amount');
		txtFld_addIncomeAccount.value = adhocIncomeDataSet.fieldByName('account_id');
		txtFld_addIncomeNote.value = adhocIncomeDataSet.fieldByName('note');
		txtFld_addIncomeInvoiceTableID.value = adhocIncomeDataSet.fieldByName('id');
		txtFld_addIncomeExcessCredit.value = adhocIncomeDataSet.fieldByName('ex_credit');
		//Ti.API.info('EXCESS CREDIT VALUE : ' + txtFld_addIncomeExcessCredit.value);
		
		var customerRecord = db.execute('SELECT * FROM tbl_customer WHERE id= ' + txtFld_addIncomeCustomerName.value);
		
		txtFld_addCustomerCredit.value = customerRecord.fieldByName('customer_credit');
		
	} else if (addIncomeReceiptTypeOption == 2) {
		
		adhocIncomeTitle.value = adhocIncomeTitle.value + ' Receipts';
		
		adhocIncomeEntryDate.value = changeDateView(adhocIncomeDataSet.fieldByName('payment_date'));
		adhocIncomeCategory.value = adhocIncomeDataSet.fieldByName('category_id');
		
		adhocIncomeSubCategory.value = adhocIncomeDataSet.fieldByName('sub_category_id');
		//pkr_subCategoryPicker.value = adhocIncomeDataSet.fieldByName('sub_category_id');
		console.log("subcat id " + adhocIncomeDataSet.fieldByName('sub_category_id'));
		txtFld_addIncomeAccount.value = adhocIncomeDataSet.fieldByName('account_id');
		adhocIncomeProject.value = adhocIncomeDataSet.fieldByName('project_id');
		adhocIncomeInvoiceNet.value = adhocIncomeDataSet.fieldByName('net_amount');
		adhocIncomeVATPresent.value = adhocIncomeDataSet.fieldByName('vat_presentage');
		adhocIncomeVAT.value = adhocIncomeDataSet.fieldByName('vat');
		adhocIncomeInvoiceTotal.value = adhocIncomeDataSet.fieldByName('total_amount');
		adhocIncomePicture.value = adhocIncomeDataSet.fieldByName('picture_path');
		adhocIncomeCustomerName.value = adhocIncomeDataSet.fieldByName('customer_name');
		adhocIncomeNote.value = adhocIncomeDataSet.fieldByName('note');
		adhocIncomeTableId.value = adhocIncomeDataSet.fieldByName('id');
		if (adhocIncomeVAT.value != '0.0' && adhocIncomeVATPresent.value == '0.0') {
			isManualVAT = true;
		} else {
			isManualVAT = false;
		}
	}

};
