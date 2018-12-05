var invoiceTableId = Ti.UI.createTextField({
	value : '',
	visible : false,
});
var invoiceTitle = Ti.UI.createTextField({
	value : '', //'Add Invoice',
	visible : false,
});
var invoiceEntryDate = Ti.UI.createTextField({
	value : getDate(),
	visible : false,
});
var invoiceNumber = Ti.UI.createTextField({
	value : '',
	visible : false,
});
var invoiceCustomerName = Ti.UI.createTextField({
	value : 0,
	visible : false,
});
var invoiceCustomerFullName = Ti.UI.createTextField({
	value : 0,
	visible : false,
});
var invoiceNet = Ti.UI.createTextField({
	value : '0.00',
	visible : false,
});
var invoiceVATPresent = Ti.UI.createTextField({
	value : '',
	visible : false,
});
var invoiceVAT = Ti.UI.createTextField({
	value : '0.00',
	visible : false,
});
var invoiceInvoiceTotal = Ti.UI.createTextField({
	value : '0.00',
	visible : false,
});
var invoiceCategory = Ti.UI.createTextField({
	value : 0,
	visible : false,
});
var invoiceSubCategory = Ti.UI.createTextField({
	value : 0,
	visible : false,
});
var invoiceInvoiceOpt = Ti.UI.createTextField({
	value : 'New',
	visible : false,
});
var invoicePaid = Ti.UI.createTextField({
	value : '0',
	visible : false,
});
var invoiceNote = Ti.UI.createTextField({
	value : '',
	visible : false,
});

var isManualVAT = false;

var isVATApply = 0;
var bellowTaxElements = [];
exports.createinvoiceRecord = function(isCreditNote, btnSource) {
	//Ti.API.info('POP 5 : ' + isManualVAT);
	//Ti.API.info('is Credit Note xxx : ' + isCreditNote);
	var btnAction = btnSource;
	if (invoiceInvoiceOpt.value == 'New') {
		if (isCreditNote) {
			invoiceTitle.value = 'Record Credit Notes';
		} else if (isCreditNote === false) {
			invoiceTitle.value = 'Record Invoices';
		}
	}
	var calcultor = require('calculator');
	var calView = calcultor.calculatorView();

	function clearInvoiceForm(){
		var alertBoxDelete = Ti.UI.createAlertDialog({
				cancel : 1,
				buttonNames : ['Yes', 'No'],
				message : 'This Invoice entry was not saved.\nAre you sure you want to clear the fields?',
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
	}

	function saveInvoiceData(dbData) {
		//console.log(dbData);
		var db = Ti.Database.open('mywallet');
		db.execute('INSERT INTO tbl_invoice(invoice_date, invoice_no, customer_id, net_amount, vat, total_amount, category_id, sub_category_id, paid, note, vat_presentage, isCreditNote) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)', dbData.invoice_date, dbData.invoice_no, dbData.customer_id, dbData.net_amount, dbData.vat, dbData.total_amount, dbData.category_id, dbData.sub_category_id, dbData.paid, dbData.note, dbData.vat_presentage, dbData.is_creditnote);
		db.close();
		return dbData.invoice_no;
	}

	function updateInvoiceData(dbData, tableID) {
		if(isCreditNote){
			dbData.category_id = 0;
			dbData.sub_category_id = 0;
		}
		var db = Ti.Database.open('mywallet');
		db.execute('UPDATE tbl_invoice SET invoice_date="' + dbData.invoice_date + '",invoice_no="' + dbData.invoice_no + '",customer_id=' + dbData.customer_id + ', category_id=' + dbData.category_id + ', sub_category_id=' + dbData.sub_category_id + ', net_amount="' + dbData.net_amount + '", vat="' + dbData.vat + '", total_amount="' + dbData.total_amount + '", paid="' + dbData.paid + '", note="' + dbData.note + '", vat_presentage="' + dbData.vat_presentage + '" WHERE id = ' + tableID);
		db.close();
		return true;
	}

	function deleteInvoiceData(tableID) {
		var db = Ti.Database.open('mywallet');
		db.execute('DELETE FROM tbl_invoice WHERE id=' + tableID);
		db.close();
		return true;

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

	function saveCategoryData(CategoryData) {
		if (validateCategory(CategoryData.invoice_category)) {
			var db = Ti.Database.open('mywallet');
			db.execute('INSERT INTO tbl_invoice_category(invoice_category,enable) VALUES(?,?)', CategoryData.invoice_category, CategoryData.enable);
			var lastIDData = db.execute('SELECT MAX(id) as rowid FROM tbl_invoice_category WHERE enable=1');
			var invlastID = lastIDData.fieldByName('rowid');
			var insDataSet = 'General';
			db.execute('INSERT INTO tbl_invoice_sub_category (invoice_sub_category,parent_category,enable) VALUES ("' + insDataSet + '","' + invlastID + '",1)');
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
		var db = Ti.Database.open('mywallet');
		var getTableIncomeCategoryData = db.execute('SELECT * FROM tbl_invoice_category WHERE enable = 1 ORDER BY invoice_category COLLATE NOCASE ASC');
		newCategory = newCategory.toUpperCase();
		while (getTableIncomeCategoryData.isValidRow()) {

			if (getTableIncomeCategoryData.fieldByName('invoice_category').toUpperCase() == newCategory)
				return false;
			getTableIncomeCategoryData.next();
		}
		getTableIncomeCategoryData.close();
		db.close();
		return true;
	}

	function saveSubCategoryData(CategoryData) {

		if (validateSubCategory(CategoryData.invoice_sub_category, CategoryData.parent_category)) {
			console.log(CategoryData);
			var db = Ti.Database.open('mywallet');
			db.execute('INSERT INTO tbl_invoice_sub_category(invoice_sub_category,parent_category,enable) VALUES(?,?,?)', CategoryData.invoice_sub_category, CategoryData.parent_category, CategoryData.enable);
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

	function validateSubCategory(newCategory, dataGet) {

		var db = Ti.Database.open('mywallet');
		var getTableIncomeCategoryData = db.execute('SELECT * FROM tbl_invoice_sub_category WHERE enable = 1 AND parent_category=' + dataGet + ' ORDER BY invoice_sub_category COLLATE NOCASE ASC');
		newCategory = newCategory.toUpperCase();
		while (getTableIncomeCategoryData.isValidRow()) {

			if (getTableIncomeCategoryData.fieldByName('invoice_sub_category').toUpperCase() == newCategory)
				return false;
			getTableIncomeCategoryData.next();
		}
		getTableIncomeCategoryData.close();
		db.close();
		return true;

	}

	function getCategoryData() {
		var getTableIncomeCategoryData = db.execute('SELECT * FROM tbl_invoice_category ORDER BY invoice_category COLLATE NOCASE ASC');

		tableIncomeCategoryData = [];
		var i = 1;
		tableIncomeCategoryData[0] = Ti.UI.createPickerRow({
			id : '0',
			title : 'Select',
		});
		while (getTableIncomeCategoryData.isValidRow()) {
			tableIncomeCategoryData[i] = Ti.UI.createPickerRow({
				id : getTableIncomeCategoryData.fieldByName('id'),
				title : getTableIncomeCategoryData.fieldByName('invoice_category')
			});
			getTableIncomeCategoryData.next();
			i++;
		}
		getTableIncomeCategoryData.close();

		return tableIncomeCategoryData;
	}

	function getCategoryID() {
		var invoiceMenuIndex = 0;
		var getTableInvoiceCategoryData = db.execute('SELECT * FROM tbl_invoice_category WHERE enable = 1 ORDER BY invoice_category COLLATE NOCASE ASC');

		var i = 1;
		while (getTableInvoiceCategoryData.isValidRow()) {
			if (invoiceCategory.value == getTableInvoiceCategoryData.fieldByName('id')) {
				invoiceMenuIndex = i;
			}
			getTableInvoiceCategoryData.next();
			i++;
		}
		getTableInvoiceCategoryData.close();

		return invoiceMenuIndex;
	}

	/*function getPaidStatusass (dataId) {
	 var db = Ti.Database.open('mywallet');
	 var getPaidData = db.execute('SELECT paid FROM tbl_invoice WHERE id=' + dataId);
	 paidStatus = getPaidData.fieldByName('paid');

	 console.log('paidStatus '+paidStatus);
	 db.close();
	 }*/

	function paidInvoiceCountData(InvID) {
		var getInvoiceData = db.execute('SELECT count(id) as invoicecount FROM tbl_income WHERE invoice_no="' + InvID + '"');
		var paidInvoiceCount = getInvoiceData.fieldByName('invoicecount');
		return paidInvoiceCount;
	}

	function getSubCategoryData(dataGet) {
		//dataGet = 0;
		if(dataGet == 'N/A'){
			dataGet= 0;
			Ti.API.info('TSK TSK');
		}
		//console.log('dataGet >>' + dataGet);
		var db = Ti.Database.open('mywallet');
		var getTableData = db.execute('SELECT * FROM tbl_invoice_sub_category WHERE parent_category=' + dataGet + ' ORDER BY invoice_sub_category COLLATE NOCASE ASC');

		var tabledata = [];
		var i = 1;
		tabledata[0] = Ti.UI.createPickerRow({
			id : '0',
			title : 'Select',
		});
		while (getTableData.isValidRow()) {
			tabledata[i] = Ti.UI.createPickerRow({
				id : getTableData.fieldByName('id'),
				title : getTableData.fieldByName('invoice_sub_category')
			});

			getTableData.next();
			i++;
		}
		getTableData.close();
		db.close();

		return tabledata;
	}

	function getSubCategoryID(dataGet) {
		var invoiceSubMenuIndex = 0;
		if(dataGet == 'N/A'){
			dataGet= 0;
			Ti.API.info('TSK TSK');
		}
		//
		var db = Ti.Database.open('mywallet');
		var getTableData = db.execute('SELECT * FROM tbl_invoice_sub_category WHERE enable = 1 AND parent_category=' + dataGet + ' ORDER BY invoice_sub_category COLLATE NOCASE ASC');

		var i = 1;
		while (getTableData.isValidRow()) {

			if (invoiceSubCategory.value == getTableData.fieldByName('id')) {
				invoiceSubMenuIndex = i;
			}
			getTableData.next();
			i++;
		}
		getTableData.close();
		db.close();

		return invoiceSubMenuIndex;
	}

	function getCustomerData() {
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

	var vatPtg = function(varVat) {
		
		Ti.API.info('is VAT apply : ' + isVATApply);

		if (!isVATApply)
			return 0;
			
		

		var tabledata;
		if (varVat == undefined || varVat == '') {

			var db = Ti.Database.open('mywallet');
			var getTableData = db.execute("SELECT * FROM tbl_option WHERE id=2");
			while (getTableData.isValidRow()) {
				tabledata = getTableData.fieldByName('option_value');
				Ti.API.info('Table Data VAT percentage : 2' + tabledata);
				getTableData.next();
			}
			getTableData.close();
			db.close();
		} else {
			tabledata = varVat;
		}
		Ti.API.info('XXX Table Data VAT percentage 1: ' + tabledata);
		Ti.API.info('XXX Table Data VAT percentage 1: ' + parseInt(tabledata));
		return parseInt(tabledata);
	};

	function clearContent(trigger) {
		var vatVal = vatPtg();
		vatLabel.text = 'VAT ' + vatVal + '% ' + '(' + currencyType + ')';
		invoiceText.value = vatPtg();
		categoryText.setSelectedRow(0, 0, false);
		emptyPicker(subCategoryText);
		subCategoryText.value = 0;
		lastInvNumText.value = getInvoiceNumber();
		//invoiceNumberText.value = getInvoiceNumber();
		invoiceNumberText.value = '';
		invoiceNetText.value = '0.00';
		vatText.value = '';
		invoiceTotalText.value = '';
		
		selectCustomerText.setSelectedRow(0, 0, false);
		noteText.value = '';
		noteText.blur();	
		isManualVAT = false;
		switchActiveButton(1);
		vatRequiredOption.setSelectedRow(0, 0);
		
		if (trigger == 'save'){
			invDateText.value = getDate(invDateText.value);
		}else{
			invDateText.value = getDate();
		}
	}

	function isFormNotEmpty() {
		
	if (invoiceInvoiceOpt.value == 'Update'){
		var tableId = editTransactionId;
		//console.log("========= " + tableId);
		var db = Ti.Database.open('mywallet');
		var expenceDataSet = db.execute('SELECT * FROM tbl_invoice WHERE id = ' + tableId);
		// setting intial values to check if form was changed before closing
		/*var expenceEntryDate = changeDateView(expenceDataSet.fieldByName('payment_date'));
		var expenceAccount1 = expenceDataSet.fieldByName('account_id');
		var expenceAccount2 = expenceDataSet.fieldByName('account_id');
		var expenceCategory = expenceDataSet.fieldByName('category_id');
		var expenceSubCategory = (expenceDataSet.fieldByName('sub_category_id') == "") ? '0' : expenceDataSet.fieldByName('sub_category_id');
		var expenceInvoiceTotal = expenceDataSet.fieldByName('total_amount');
		var expenceSuplierInvDate = (expenceDataSet.fieldByName('supplier_inv_date') == "") ? "" : changeDateView(expenceDataSet.fieldByName('supplier_inv_date'));
		var expenceSupplierName = expenceDataSet.fieldByName('supplier_name');
		var expenceSublierInvNum = expenceDataSet.fieldByName('supplier_inv_num');
		var expenceProject = expenceDataSet.fieldByName('project_id');
		var expenceNote = expenceDataSet.fieldByName('note');*/
		var invoiceEntryDate = changeDateView(expenceDataSet.fieldByName('invoice_date'));
		var invoiceNumber = expenceDataSet.fieldByName('invoice_no');
		var selectCustomerText = expenceDataSet.fieldByName('customer_id');
		var invoiceInvoiceTotal = expenceDataSet.fieldByName('total_amount');
		var invoiceCategory = expenceDataSet.fieldByName('category_id');
		var invoiceSubCategory = expenceDataSet.fieldByName('sub_category_id');
		var invoiceNote = expenceDataSet.fieldByName('note');
		
		db.close();
		
	}else {
		
		//var invoiceEntryDate = getDate(); disabled due to rest of date to last entered month and year
		//var invoiceNumber = getInvoiceNumber();
		var invoiceNumber = '';
		//var invoiceCustomerName = selectCustomerText.value;
		var selectCustomerText = 0;
		var invoiceInvoiceTotal = '0.00';
		var invoiceCategory = 0;
		var invoiceSubCategory = 0;
		var invoiceNote = '';
		
	}
		//var formEmpty = true;
		
		/*if (selectAccountText.setSelectedRow(0, 2)){
			return false;			
		}*/
		if (invDateText.value != invoiceEntryDate && typeof invoiceEntryDate != 'undefined'){
			console.log('date ' + invDateText.value + "-" + invoiceEntryDate);
			return true;			
		}
		
		//console.log('customer ' + invoiceCustomerName.value + "-" + selectCustomerText);
		if (invoiceCustomerName.value != selectCustomerText){
			console.log('customer ' + invoiceCustomerName.value + "-" + selectCustomerText);
			return true;			
		}
		if (Number(invoiceTotalText.value) != invoiceInvoiceTotal){
			console.log('total ' + invoiceTotalText.value + "-" + invoiceInvoiceTotal);
			return true;			
		}
		
		
		if (noteText.value != invoiceNote){
			console.log('note ' + noteText.value + "-" + invoiceNote);
			return true;			
		}
		
		if (!isCreditNote) {
			if (invoiceNumberText.value != invoiceNumber){
			console.log('invNo ' + invoiceNumberText.value + "-" + invoiceNumber);
			return true;	
			}
			if (categoryText.getSelectedRow(0).id != invoiceCategory){
			console.log('category ' + categoryText.value + "-" + invoiceCategory);
			//console.log('category ' + invoiceCategory.value + "-" + invoiceCategory);
			return true;	
			}	
			if (subCategoryText.getSelectedRow(0).id != invoiceSubCategory){
				console.log('sub category ' + subCategoryText.value + "-" + invoiceCategory);
				return true;			
			}	
				
		
			
		}
		/*if (expenceAccount.value != expenceAccount1 && expenceAccount.value != expenceAccount2){
			console.log('account ' + selectAccountText.value);
			return true;		
		}
		if (categoryText.getSelectedRow(0).id != expenceCategory) {
			console.log('cate');
			return true;			
		}
		if (subCategoryText.getSelectedRow(0).id != expenceSubCategory) {
			console.log("subcat " + subCategoryText.getSelectedRow(0).id + "---- " + expenceSubCategory);
			
			return true;
		}
		if (invoiceTotalText.value != expenceInvoiceTotal) {
			console.log('invoice tot');
			return true;
		}
		if (supplierInvDateText.value != expenceSuplierInvDate){
			console.log('invdate');
			return true;
		}
		if (supplierNameText.value != expenceSupplierName){
			console.log('supname');
			return true;
		}
		if (supplierInvNumberText.value != expenceSublierInvNum){
			console.log('suminvno');
			return true;
		}
		if (selectProjectText.value != expenceProject){
			console.log('selprojec');
			return true;
		}
		if (noteText.value != expenceNote){
			console.log('note');
			return true;
		}*/
	}

	// validate content before save
	function invoiceIncomeRecordValidate() {
		var db = Ti.Database.open('mywallet');
		var validated = false;
		var floatRex = /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/;
		//Ti.API.info(invoiceNumberText.value);
		var invNumber = invoiceNumberText.value;
		var resultSet = db.execute('SELECT COUNT(*) AS numberofinvoices FROM tbl_invoice WHERE invoice_no = "' + invNumber + '"');
		var invoiceNet = invoiceNetText.value;
		invoiceNet = invoiceNet.replace(/,/g, '');
		Ti.API.info('Number of records : ' + resultSet.fieldByName('numberofinvoices'));
		if (invDateText.value == '') {
			var dialog1 = Ti.UI.createAlertDialog({
				title : 'Error!',
				message : 'Please Add  Invoice Date',
				ok : 'OK',
			});
			dialog1.show();
		} else if (invoiceNumberText.value == '') {
			var dialog2 = Ti.UI.createAlertDialog({
				title : 'Error!',
				message : 'Please Add Invoice No',
				ok : 'OK',
			});
			dialog2.show();
		} else if (resultSet.fieldByName('numberofinvoices') != 0 && invoiceInvoiceOpt.value != 'Update') {
			var dialog6 = Ti.UI.createAlertDialog({
				title : 'Error!',
				message : 'Serial Number already used. Please enter new Number',
				ok : 'OK',
			});
			dialog6.show();
		}else if (selectCustomerText.getSelectedRow(0).id == 0) {
			var dialog3 = Ti.UI.createAlertDialog({
				title : 'Error!',
				message : 'Please Select Customer',
				ok : 'OK',
			});
			dialog3.show();
		} else if (invoiceNetText.value == '0.00') {
			var dialog4 = Ti.UI.createAlertDialog({
				title : 'Error!',
				message : 'Please Add Net Amount',
				ok : 'Ok',
			});
			dialog4.show();
		} else if (!floatRex.test(invoiceNet)) {
			var dialog5 = Ti.UI.createAlertDialog({
				title : 'Error!',
				message : 'Net Amount is Invalid',
				ok : 'Ok',
			});
			dialog5.show();
		} else {
			validated = true;
		}
		db.close();
		return validated;
	}

	function getInvoiceNumber() {
		//Ti.API.info('isCreditNote : ' + JSON.stringify(isCreditNote));
		var optionID = isCreditNote ? '4' : '3';
		//Ti.API.info('optionID : ' + JSON.stringify(optionID));
		var optionResultSet2 = db.execute("SELECT * FROM tbl_option");
		//Ti.API.info('optionResultSet2 : ' + JSON.stringify(optionResultSet2));
		var optionResultSet = db.execute("SELECT * FROM tbl_option WHERE id='" + optionID + "'");
		//Ti.API.info('optionResultSet : ' + JSON.stringify(optionResultSet));
		var currentInvoiceNumber = optionResultSet.fieldByName('option_value');
		/*var newInvoiceNumber = '';
		var invoicePefix = (isCreditNote) ? 'CN' : 'IN';
		switch(nextInvoiceNumber.length) {
		case 1:
			newInvoiceNumber = invoicePefix + '0000' + nextInvoiceNumber;
			break;
		case 2:
			newInvoiceNumber = invoicePefix + '000' + nextInvoiceNumber;
			break;
		case 3:
			newInvoiceNumber = invoicePefix + '00' + nextInvoiceNumber;
			break;
		case 4:
			newInvoiceNumber = invoicePefix + '0' + nextInvoiceNumber;
			break;
		case 5:
			newInvoiceNumber = invoicePefix + nextInvoiceNumber;
			break;
		/*case 6:
		 newInvoiceNumber = '00' + nextInvoiceNumber;
		 break;
		 case 7:
		 newInvoiceNumber = '0' + nextInvoiceNumber;
		 break;
		 case 8:
		 newInvoiceNumber = nextInvoiceNumber;
		 break;*/
		//}

		//return newInvoiceNumber;
		return currentInvoiceNumber;
	}

	function getCustomerNameById(cusID) {
		var db = Ti.Database.open('mywallet');
		var recordSet = db.execute('SELECT full_name FROM tbl_customer WHERE id= ' + cusID);
		return recordSet.fieldByName('full_name');
		db.close();
	}

	var createinvoicepopupcontainerView = Ti.UI.createView({// Set height appropriately
		//layout : 'vertical',
		visible : false,
		width : '100%',
		height : '100%',
		backgroundColor : '#ffffff'
	});

	var view_createinvoicepopuptitle = Ti.UI.createView({
		height : deviceHeight * 0.075,
		top : 0,
		backgroundColor : '#2980B9',
	});

	var lblcreateinvoicepopuptitle = Ti.UI.createLabel({
		text : invoiceTitle.value,
		color : '#FFFFFF',
		font : {
			fontSize : stylefontsize + 2,
			fontFamily : customFont2,
		},
	});

	var imgcreateinvoicepopupclose = Ti.UI.createImageView({
		image : '/images/backbtn.png',
		backgroundSelectedColor : '#999999',
		width : '13%',
		left : '0%',
	});

	view_createinvoicepopuptitle.add(lblcreateinvoicepopuptitle);
	view_createinvoicepopuptitle.add(imgcreateinvoicepopupclose);
	createinvoicepopupcontainerView.add(view_createinvoicepopuptitle);

	createinvoicepopupcontainerView.add(invoiceTableId);
	createinvoicepopupcontainerView.add(invoiceTitle);
	createinvoicepopupcontainerView.add(invoiceEntryDate);
	createinvoicepopupcontainerView.add(invoiceCustomerName);
	createinvoicepopupcontainerView.add(invoiceCustomerFullName);
	//createinvoicepopupcontainerView.add(selectCustomerText);// dropdown customer selction
	createinvoicepopupcontainerView.add(invoiceNet);
	createinvoicepopupcontainerView.add(invoiceVATPresent);
	createinvoicepopupcontainerView.add(invoiceVAT);
	createinvoicepopupcontainerView.add(invoiceInvoiceTotal);
	createinvoicepopupcontainerView.add(invoiceCategory);
	createinvoicepopupcontainerView.add(invoiceSubCategory);
	createinvoicepopupcontainerView.add(invoiceInvoiceOpt);
	createinvoicepopupcontainerView.add(invoiceNote);

	var createinvoicepopupinputview = Titanium.UI.createScrollView({
		height : Ti.UI.SIZE,
		top : deviceHeight * 0.075,
		bottom : deviceHeight * 0.075,
		showVerticalScrollIndicator : true,
		//backgroundColor : 'red',
	});

	/////////////////////////////////////////////////////////////////////////////////////////////////////

	var invDateLabel = Ti.UI.createLabel({
		text : 'Invoice Date *',
		color : '#000',
		top : 15,
		left : '2%',
		width : '37%',
		height : 40,
	});

	var invDateText = Ti.UI.createTextField({
		value : invoiceEntryDate.value,
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		backgroundColor : '#A0A0A0',
		top : 15,
		left : '41%',
		width : '43%',
		height : 40,
		editable : false,
		//value:'2015/4/4',
		//font : {
		//fontSize : 15,
		//},
	});
	
	var btnInvDate = Ti.UI.createView({
		//type:Ti.UI.PICKER_TYPE_DATE,
		backgroundColor : '#A0A0A0',
		top : 15,
		left : '86%',
		width : '12%',
		height : 40,
		//image : '/images/calicon.png',
		//editable:false,
		//font:{fontSize:20,},
	}); 
	
	var imgInvDate = Ti.UI.createImageView({
		width : '70%',
		image : '/images/calendar.png',
	});
	btnInvDate.add(imgInvDate);
	
	var lastInvNumLabel = Ti.UI.createLabel({
		text : 'Last Invoice No. ',
		color : '#000',
		top : 105,
		left : '2%',
		width : '37%',
		height : 40,
	});

	var lastInvNumText = Ti.UI.createTextField({
		//value : invoiceEntryDate.value,
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		backgroundColor : '#d6d6d6',
		color : '#A0A0A0',
		top : 105,
		left : '41%',
		width : '57%',
		height : 40,
		editable : false,
		//value:'2015/4/4',
		//font : {
		//fontSize : 15,
		//},
	});

	// Category list view
	var vatRequiredLabel = Ti.UI.createLabel({
		text : 'Does VAT apply *',
		color : '#000',
		top : 60,
		left : '2%',
		width : '37%',
		height : 40,
	});

	var vatRequiredOption = Ti.UI.createPicker({
		top : 60,
		left : '41%',
		width : '43%',
		height : 40,
		backgroundColor : '#A0A0A0',
	});

	var vatOpt = [];
	vatOpt[0] = Ti.UI.createPickerRow({
		id : 0,
		title : 'No'
	});
	vatOpt[1] = Ti.UI.createPickerRow({
		id : 1,
		title : 'Yes'
	});

	vatRequiredOption.add(vatOpt);
	vatRequiredOption.selectionIndicator = true;

	function moveUP(element) {
		element.top = element.top - 45;
	}

	function moveDown(element) {
		element.top = element.top + 45;
	}
	
	function setVATApplication(isVATApply){
		if (isVATApply) {
			for (x in bellowTaxElements) {
				moveDown(bellowTaxElements[x]);
			}
			createinvoicepopupinputview.add(vatLabel);
			createinvoicepopupinputview.add(vatText);
			createinvoicepopupinputview.add(changeVatBtn);
			createinvoicepopupinputview.add(tempVatText);

		} else {

			createinvoicepopupinputview.remove(vatLabel);
			createinvoicepopupinputview.remove(vatText);
			createinvoicepopupinputview.remove(changeVatBtn);
			createinvoicepopupinputview.remove(tempVatText);

			for (x in bellowTaxElements) {
				moveUP(bellowTaxElements[x]);
			}

		}
	}
	
	function triggerChangeInVatSelectionEditLoad(isVATApplyVal){
		isVATApply = isVATApplyVal;
		setVATApplication(isVATApply);
		var vatVal = invoiceVATPresent.value;
		vatLabel.text = 'VAT ' + vatVal + '% ' + '(' + currencyType + ')';
		var invoiceNet = invoiceNetText.value;
		invoiceNet = invoiceNet.replace(/,/g, '');
		tempVatText.value = vatVal;
		var invoiceVat;
		if(!isManualVAT){
			invoiceVat = (invoiceNet * vatVal) / 100;
			vatText.value = toDecimalFormatWithoutCurrency(invoiceVat);
		} else {
			vatLabel.text = 'VAT Amount ' + '(' + currencyType + ')';
		}
		var vat = vatText.value;
		vat = vat.replace(/,/g, '');
		var totalValue = invoiceNet * 1 + vat * 1;
		if(isVATApply == 0){
			totalValue = invoiceNet * 1;
		}
		invoiceTotalText.value = toDecimalFormatWithoutCurrency(Math.ceil(totalValue * 10000) / 10000);
	}

	vatRequiredOption.addEventListener('change', function(e) {
		isVATApply = e.row.id;
		setVATApplication(isVATApply);
		var vatVal = vatPtg();
		vatLabel.text = 'VAT ' + vatVal + '% ' + '(' + currencyType + ')';
		var invoiceNet = invoiceNetText.value;
		invoiceNet = invoiceNet.replace(/,/g, '');
		tempVatText.value = vatVal;
		var invoiceVat;
		if(!isManualVAT){
			invoiceVat = (invoiceNet * vatVal) / 100;
			vatText.value = toDecimalFormatWithoutCurrency(invoiceVat);
		} else {
			vatLabel.text = 'VAT Amount ' + '(' + currencyType + ')';
		}
		var vat = vatText.value;
		vat = vat.replace(/,/g, '');
		var totalValue = invoiceNet * 1 + vat * 1;
		if(isVATApply == 0){
			totalValue = invoiceNet * 1;
		}
		invoiceTotalText.value = toDecimalFormatWithoutCurrency(Math.ceil(totalValue * 10000) / 10000);
	});

	
	
	var invoiceNumberLabel = Ti.UI.createLabel({
		text : 'Invoice Number *',
		color : '#000',
		top : 150,
		left : '2%',
		width : '37%',
		height : 40,

	});
	
	

	var invoiceNumberText = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		backgroundColor : '#A0A0A0',
		top : 150,
		left : '41%',
		width : '57%',
		height : 40,
		//value: getInvoiceNumber(),
		//maxLength : 7
	});

	if (invoiceInvoiceOpt.value != 'Update') {
		lastInvNumText.value = getInvoiceNumber();
		invoiceNumberText.value = '';
	} else {
		lastInvNumText.value = getInvoiceNumber();
		invoiceNumberText.value = invoiceNumber.value;
	}

	var selectCustomerLabel = Ti.UI.createLabel({
		text : 'Select Customer *',
		color : '#000',
		top : 195,
		left : '2%',
		width : '37%',
		height : 40,

	});

	var selectCustomerText = Ti.UI.createPicker({
		top : 195,
		left : '41%',
		width : '43%',
		height : 40,
		backgroundColor : '#A0A0A0',
	});

	var btnaddCustomer = Ti.UI.createView({
		//type:Ti.UI.PICKER_TYPE_DATE,
		backgroundColor : '#A0A0A0',
		top : 195,
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

	var invoiceNetLabel = Ti.UI.createLabel({
		text : 'Invoice Net (' + currencyType + ') *',
		color : '#000',
		top : 240,
		left : '2%',
		width : '37%',
		height : 40,

	});

	var invoiceNetText = Ti.UI.createTextField({
		//borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		//keyboardType : Titanium.UI.KEYBOARD_NUMBER_PAD,
		backgroundColor : '#A0A0A0',
		top : 240,
		left : '41%',
		width : '43%',
		height : 40,
		//focusable : true,
		editable : true,
		keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
		value : toDecimalFormatWithoutCurrency(invoiceNet.value * 1),
	});

	var editIncPayAmntBtn = Ti.UI.createView({
		backgroundColor : '#A0A0A0',
		top : 240,
		left : '86%',
		width : '12%',
		height : 40,
	});

	var imgeditIncPayImg = Ti.UI.createImageView({
		width : '60%',
		image : '/images/calculator.png',
	});
	
	//var calcultor = require('calculator');
	//var calView = calcultor.calculatorView();
	
	editIncPayAmntBtn.add(imgeditIncPayImg);

	editIncPayAmntBtn.addEventListener('singletap', function() {
		calcultor.setTxtObj(invoiceNetText);
		calView.show();
	});



	var vatLabel = Ti.UI.createLabel({
		//text:'VAT '+vatPtg()+'% ('+currencyType+')',
		color : '#000',
		top : 285,
		left : '2%',
		width : '37%',
		height : 40,

	});

	if (invoiceInvoiceOpt.value == 'New') {
		vatLabel.text = 'VAT ' + vatPtg() + '%  (' + currencyType + ')';
	} else {
		vatLabel.text = 'VAT ' + invoiceVATPresent.value + '%  (' + currencyType + ')';
	}

	var vatText = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		keyboardType : Titanium.UI.KEYBOARD_NUMBER_PAD,
		backgroundColor : '#A0A0A0',
		top : 285,
		left : '41%',
		width : '43%',
		height : 40,
		focusable : true,
		editable : false,
		value : toDecimalFormatWithoutCurrency(invoiceVAT.value * 1),
	});

	var changeVatBtn = Ti.UI.createView({
		backgroundColor : '#A0A0A0',
		top : 285,
		left : '86%',
		width : '12%',
		height : 40,
	});

	var changeVatBtnUpdate = Ti.UI.createTextField({
		backgroundColor : userInputFeildBackgroundColor,
		top : 285,
		left : '41%',
		width : '57%',
		height : 40,
		editable : false,
		visible : false,
	});

	var imgchangeVat = Ti.UI.createImageView({
		width : '60%',
		image : '/images/edit_white.png',
	});
	changeVatBtn.add(imgchangeVat);

	if (invoiceInvoiceOpt.value == 'New') {
		selectCustomerText.visible = true;
		invoiceNetText.addEventListener('singletap', function() {
			//Ti.API.info('Btn Clicked');
			calcultor.setTxtObj(invoiceNetText);
			calView.show();
		});
	} else {
		var getInvoiceData = db.execute('SELECT count(id) as invoicecount FROM tbl_income WHERE invoice_no="' + invoiceNumber.value + '"');
		var getPaidInvoiceCount = getInvoiceData.fieldByName('invoicecount');
		if (getPaidInvoiceCount > 0) {
			//customerNameTextUpdate.visible = true;
			customerNameTextUpdate.value = getCustomerNameById(invoiceCustomerName.value);
			
			if (btnAction == 'edit'){ // set customer dropdown only if edit
				var customersList = new Array;
				customersList = getCustomerListArray();
				//console.log("cus id---- " +  getCustomeName(invoiceCustomerName.value));
				var rowNo = returnRowNo(customersList, getCustomeName(invoiceCustomerName.value));
				selectCustomerText.setSelectedRow(0, rowNo+1, false);
			}
			
			selectCustomerText.visible = true;
			imgaddCustomer.visible = true;
			changeVatBtnUpdate.visible = true;
			changeVatBtnUpdate.value = toDecimalFormatWithoutCurrency(invoiceVAT.value * 1);
			invoiceNetText.editable = true;
		} else {
			selectCustomerText.visible = true;
			invoiceNetText.addEventListener('singletap', function() {
				//Ti.API.info('Btn Clicked');
				calcultor.setTxtObj(invoiceNetText);
				calView.show();
			});
		}

	}
	selectCustomerText.visible = true;

	var tempVatText = Ti.UI.createTextField({
		//value : vatPtg(),
		visible : false,
	});
	if (invoiceInvoiceOpt.value == 'New') {
		//console.log('vat and prsg '+tempVatText.value +' '+invoiceVATPresent.value);
		Ti.API.info('CON LOG 1' + tempVatText.value);
		tempVatText.value = vatPtg();
		Ti.API.info('CON LOG 2' + tempVatText.value);
	} else {
		tempVatText.value = invoiceVATPresent.value;
	}

	var invoiceTotalLabel = Ti.UI.createLabel({
		text : 'Invoice Total  (' + currencyType + ')',
		color : '#000',
		top : 330,
		left : '2%',
		width : '37%',
		height : 40,

	});
	bellowTaxElements.push(invoiceTotalLabel);

	var invoiceTotalText = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		backgroundColor : '#A0A0A0',
		top : 330,
		left : '41%',
		width : '57%',
		height : 40,
		editable : false,
		value : toDecimalFormatWithoutCurrency(invoiceInvoiceTotal.value * 1),
	});
	bellowTaxElements.push(invoiceTotalText);

	var categoryLabel = Ti.UI.createLabel({
		text : 'Category',
		color : '#000',
		top : 375,
		left : '2%',
		width : '37%',
		height : 40,

	});
	
	if(!isCreditNote){		
		bellowTaxElements.push(categoryLabel); //#
	}

	var categoryText = Ti.UI.createPicker({
		top : 375,
		left : '41%',
		width : '43%',
		height : 40,
		backgroundColor : '#A0A0A0',
	});
	
	if(!isCreditNote){		
		bellowTaxElements.push(categoryText); //#
	}
	
	//bellowTaxElements.push(categoryText);

	var invoiceCatIndex = getCategoryID();
	//console.log('expence invoiceCatIndex :' + invoiceCatIndex);
	categoryText.setSelectedRow(0, invoiceCatIndex);

	var categorydata = [];
	//categorydata = getCategoryData();
	categorydata = getCategoryPickerRows(0, 'invoiceParent');

	categoryText.selectionIndicator = true;
	categoryText.add(categorydata);

	var btnaddcategory = Ti.UI.createView({
		//type:Ti.UI.PICKER_TYPE_DATE,
		backgroundColor : '#A0A0A0',
		top : 375,
		left : '86%',
		width : '12%',
		height : 40,
		//image : '/images/calicon.png',
		//editable:false,
		//font:{fontSize:20,},
	});
	//bellowTaxElements.push(btnaddcategory);
	
	if(!isCreditNote){		
		bellowTaxElements.push(btnaddcategory); //#
	}

	var imgaddcategory = Ti.UI.createImageView({
		width : '70%',
		image : '/images/add.png',
	});
	btnaddcategory.add(imgaddcategory);

	var subCategoryLabel = Ti.UI.createLabel({
		text : 'Sub Category',
		color : '#000',
		top : 420,
		left : '2%',
		width : '37%',
		height : 40,

	});
	//bellowTaxElements.push(subCategoryLabel);
	
	if(!isCreditNote){		
		bellowTaxElements.push(subCategoryLabel); //#
	}

	var subCategoryText = Ti.UI.createPicker({
		top : 420,
		left : '41%',
		width : '43%',
		height : 40,
		selectionIndicator : true,
		backgroundColor : '#A0A0A0',
	});
	//bellowTaxElements.push(subCategoryText);
	
	if(!isCreditNote){		
		bellowTaxElements.push(subCategoryText); //#
	}

	var subCategorydata = [];
	//subCategorydata = getSubCategoryData(invoiceSubCategory.value);
	subCategorydata = getCategoryPickerRows(invoiceCategory.value, 'invoiceSub');
	subCategoryText.selectionIndicator = true;
	subCategoryText.add(subCategorydata);

	//Ti.API.info('subCategoryText : '+invoiceSubCategory.value);
	var invoicesubCatIndex = getSubCategoryID(invoiceSubCategory.value);
	//Ti.API.info('subCategoryText ID : '+invoicesubCatIndex);
	subCategoryText.setSelectedRow(0, invoicesubCatIndex-1);

	var btnaddsubCategory = Ti.UI.createView({
		//type:Ti.UI.PICKER_TYPE_DATE,
		backgroundColor : '#A0A0A0',
		top : 420,
		left : '86%',
		width : '12%',
		height : 40,
		//image : '/images/calicon.png',
		//editable:false,
		//font:{fontSize:20,},
	});
	//bellowTaxElements.push(btnaddsubCategory);
	
	if(!isCreditNote){		
		bellowTaxElements.push(btnaddsubCategory); //#
	}

	var imgaddsubCategory = Ti.UI.createImageView({
		width : '70%',
		image : '/images/add.png',
	});
	btnaddsubCategory.add(imgaddsubCategory);

	var noteLabel = Ti.UI.createLabel({
		text : 'Note',
		color : '#000',
		top : 465,
		left : '2%',
		width : '37%',
		height : 40,

	});
	bellowTaxElements.push(noteLabel);

	// var noteText = Ti.UI.createTextField({
	// backgroundColor : '#A0A0A0',
	// top : 375,
	// left : '41%',
	// width : '57%',
	// height : 120,
	// value: invoiceNote.value,
	// });

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
		backgroundColor : '#A0A0A0',
		top : 465,
		left : '41%',
		width : '57%',
		height : 120,
		value : invoiceNote.value,
	});
	
	if (isCreditNote) {
		invDateLabel.text = 'Credit Note Date *';
		invoiceNumberLabel.text = 'Credit Note No. *';
		lastInvNumLabel.text = 'Last Cr. Note No.';
		invoiceNetLabel.text = 'Credit Note Net';
		invoiceTotalLabel.text = 'Credit Note Total';
	} else if (isCreditNote === false) {
		invDateLabel.text = 'Invoice Date *';
		invoiceNumberLabel.text = 'Invoice Number *';
	}
	
	bellowTaxElements.push(noteText);
	createinvoicepopupinputview.add(lastInvNumLabel);
	createinvoicepopupinputview.add(lastInvNumText);
	createinvoicepopupinputview.add(invDateLabel);
	createinvoicepopupinputview.add(invDateText);
	createinvoicepopupinputview.add(btnInvDate);
	createinvoicepopupinputview.add(invoiceNumberLabel);
	createinvoicepopupinputview.add(invoiceNumberText);
	createinvoicepopupinputview.add(selectCustomerLabel);
	createinvoicepopupinputview.add(selectCustomerText);
	createinvoicepopupinputview.add(customerNameTextUpdate);
	createinvoicepopupinputview.add(btnaddCustomer);
	createinvoicepopupinputview.add(invoiceNetLabel);
	createinvoicepopupinputview.add(invoiceNetText);
	createinvoicepopupinputview.add(editIncPayAmntBtn);
	//createinvoicepopupinputview.add(vatLabel);
	//createinvoicepopupinputview.add(vatText);
	//createinvoicepopupinputview.add(changeVatBtn);
	//createinvoicepopupinputview.add(changeVatBtnUpdate);
	createinvoicepopupinputview.add(invoiceTotalLabel);
	createinvoicepopupinputview.add(invoiceTotalText);
	if(!isCreditNote){ //#
		createinvoicepopupinputview.add(categoryLabel);
		createinvoicepopupinputview.add(categoryText);
		createinvoicepopupinputview.add(btnaddcategory);
		createinvoicepopupinputview.add(subCategoryLabel);
		createinvoicepopupinputview.add(subCategoryText);
		createinvoicepopupinputview.add(btnaddsubCategory);		
	} else {
		noteLabel.top = 375;
		noteText.top = 375;
	} //#
	createinvoicepopupinputview.add(noteLabel);
	createinvoicepopupinputview.add(noteText);
	createinvoicepopupinputview.add(tempVatText);
	createinvoicepopupinputview.add(vatRequiredLabel);
	createinvoicepopupinputview.add(vatRequiredOption);

	/////////////////////////////////////////////////////////////////////////////////////////////////////
	var createinvoiceBtnView = Ti.UI.createView({
		//top : 592,
		width : '100%',
		height : appPixel * 7.5,
		backgroundColor : '#054e62',		
		bottom : 0,
	});
	//bellowTaxElements.push(createinvoiceBtnView);

	var cancelBtn = Ti.UI.createButton({
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

	var saveBtn = Ti.UI.createButton({
		title : 'Save',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		backgroundColor : '#25B89B',
		backgroundSelectedColor : '#0a7390',
		//left : '0%',
		height : '100%',
		width : '34%',
		font : {
			fontSize : stylefontsize - 5,
			fontFamily : customFont1
		},
	});

	var nextBtn = Ti.UI.createButton({
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
	
	editBtn.addEventListener('click', function() {
		enableUpdate();
		editBtn.visible = false;
		nextBtn.visible = true;
		saveBtn.visible = true;
		cancelBtn.visible = true;
		//saveBtn.right = '0%';
		saveBtn.title = 'Update';
		if (isCreditNote) {
			lblcreateinvoicepopuptitle.text = 'Edit Credit Note';
		} else if (isCreditNote === false) {
			lblcreateinvoicepopuptitle.text = 'Edit Invoice';
		}
	});
	
	var disableLayer =  Ti.UI.createView({
		//backgroundColor : 'pink',
		opacity : 0.7,
		width : '100%',
		height : '100%',
	});
	
	function enableUpdate(){
		try{
			createinvoicepopupinputview.remove(disableLayer);
		} catch (e) {
			Ti.API.info('Unable to remove disable layer');
		}
		
	}
	
	function disableUpdate(){		
		createinvoicepopupinputview.add(disableLayer);
	}

	if (invoiceInvoiceOpt.value == 'Update') {

		//var getPaidData = db.execute('SELECT paid FROM tbl_invoice WHERE id=' + invoiceTableId.value);
		//var paidStatus = getPaidData.fieldByName('paid');

		nextBtn.visible = true;
		//saveBtn.right = '0%';
		saveBtn.title = 'Update';
		//btncreateinvoicedelete.visible = true;
		//btncreateinvoicedelete.enabled = true;
		invoiceNumberText.editable = true;

	}

	createinvoiceBtnView.add(cancelBtn);
	createinvoiceBtnView.add(saveBtn);
	//createinvoiceBtnView.add(btncreateinvoicedelete);
	createinvoiceBtnView.add(nextBtn);
	createinvoiceBtnView.add(editBtn);

	//createinvoicepopupinputview.add(createinvoiceBtnView);

	imgcreateinvoicepopupclose.addEventListener('click', function() {
		/*createinvoicepopupcontainerView.hide();
		clearContent();
		Ti.App.fireEvent('editInvoiceViewClose', 'e');*/
		nextBtn.fireEvent('click');
	});

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
	btnaddcategory.addEventListener('click', function(e) {
		//console.log('Customer');
		createCategoryWrapperView.show();
		createCategoryText.focus();
		//mainAdhocView.scrollingEnabled = false;
	});

	imageCreateCategorypopupclose.addEventListener('click', function() {
		createCategoryWrapperView.hide();
		//mainAdhocView.scrollingEnabled = true;
		//AdhocVatText.value = vatPtg();
	});

	createCategoryBackgroundView.addEventListener('click', function() {
		createCategoryWrapperView.hide();
		//mainAdhocView.scrollingEnabled = true;
	});

	btnCreateCategory.addEventListener('click', function(e) {

		if (createCategoryText.value != '') {

			createCategoryWrapperView.hide();
			//mainAdhocView.scrollingEnabled = true;
			var CategoryName = createCategoryText.value;

			var dbData = {
				invoice_category : CategoryName,
				enable : '1',

			};

			var getResult = saveCategoryData(dbData);

			if (getResult) {

				/*if (categoryText.columns[0]) {
					var _col = categoryText.columns[0];
					var len = _col.rowCount;
					for (var x = len - 1; x >= 0; x--) {
						var _row = _col.rows[x];
						_col.removeRow(_row);
					}
					//picker.reloadColumn(_col);
				}*/
				emptyPicker(categoryText);
				var setCategoryData = [];

				//setCategoryData = getCategoryData();
				setCategoryData = getCategoryPickerRows(0, 'invoiceParent');

				categoryText.selectionIndicator = true;
				categoryText.add(setCategoryData);

				/*var TotalResultSet = db.execute('SELECT COUNT(id) AS categorycount  FROM tbl_invoice_category');
				var categorycount = TotalResultSet.fieldByName('categorycount');
				//customercount += 1;*/

				//console.log('categorycount ' + categorycount);
				
				var categoryList = new Array;
				categoryList = getDataArray(0, 'invoiceParent');
				var rowNo = returnRowNo(categoryList, createCategoryText.value);
				categoryText.setSelectedRow(0, rowNo+1, false);
				
				//categoryText.setSelectedRow(0, categorycount, false);
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
	btnaddsubCategory.addEventListener('click', function(e) {
		//console.log('categoryText ' + categoryText.value);

		if (categoryText.value == undefined || categoryText.value == 0) {
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

		//mainAdhocView.scrollingEnabled = false;
	});

	imageCreateSubCategorypopupclose.addEventListener('click', function() {
		createSubCategoryWrapperView.hide();
		//mainAdhocView.scrollingEnabled = true;
		//AdhocVatText.value = vatPtg();
	});

	createSubCategoryBackgroundView.addEventListener('click', function() {
		createSubCategoryWrapperView.hide();
		//mainAdhocView.scrollingEnabled = true;
	});

	btnCreateSubCategory.addEventListener('click', function(e) {

		if (createSubCategoryText.value != '') {

			createSubCategoryWrapperView.hide();
			//mainAdhocView.scrollingEnabled = true;
			var SubCategoryName = createSubCategoryText.value;

			var dbData = {
				invoice_sub_category : SubCategoryName,
				parent_category : categoryText.value,
				enable : '1',

			};

			var getResult = saveSubCategoryData(dbData);

			if (getResult) {

				/*if (subCategoryText.columns[0]) {
					var _col = subCategoryText.columns[0];
					var len = _col.rowCount;
					for (var x = len - 1; x >= 0; x--) {
						var _row = _col.rows[x];
						_col.removeRow(_row);
					}
					//picker.reloadColumn(_col);
				}*/
				emptyPicker(subCategoryText);
				var selectCategorydata = [];

				//selectSubCategorydata = getSubCategoryData(categoryText.value);
				selectSubCategorydata = getCategoryPickerRows(categoryText.value, 'invoiceSub');

				subCategoryText.selectionIndicator = true;
				subCategoryText.add(selectSubCategorydata);

				/*var TotalResultSet = db.execute('SELECT COUNT(id) AS subcategorycount  FROM tbl_invoice_sub_category WHERE parent_category=' + categoryText.value);
				var subcategorycount = TotalResultSet.fieldByName('subcategorycount');
				*/ //customercount += 1;

				//console.log('subcategorycount ' + subcategorycount);

				var subCategoryList = new Array;
				subCategoryList = getDataArray(categoryText.value, 'invoiceSub');
				var rowNo = returnRowNo(subCategoryList, createSubCategoryText.value);
				//console.log('rowno ' + rowNo);
				subCategoryText.setSelectedRow(0, rowNo, false);

				//subCategoryText.setSelectedRow(0, subcategorycount, false);
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

	var createInvoiceVatWrapperView = Ti.UI.createView({
		visible : false,
		zIndex : 200,
	});
	// Full screen
	var createInvoiceVatBackgroundView = Ti.UI.createView({// Also full screen
		backgroundColor : '#000',
		opacity : 0.6
	});
	var createInvoiceContainerView = Ti.UI.createView({// Set height appropriately
		layout : 'vertical',
		width : '85%',
		height : Ti.UI.SIZE, //deviceHeight * 0.31,
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
	createInvoiceContainerView.add(viewVatpopuptitle);

	var invoiceTextView = Ti.UI.createView({
		//backgroundColor : settingsbtncol,
		//backgroundSelectedColor : settingsbtnselectedcol,
		left : '1%',
		right : '1%',
		top : '2%',
		bottom : '0.5%',
		// height : deviceHeight * 0.11,
		height : settingOptionHeight,
	});

	var invoiceText = Ti.UI.createTextField({
		//text : 'Camera',
		keyboardType : Titanium.UI.KEYBOARD_DECIMAL_PAD,
		borderColor : "#489CE0",
		width : '90%',
		//value:vatPtg(),
		color : settingsbtnfontcolor,
		left : '5%',
		font : {
			//fontFamily : customFont1,
			fontSize : stylefontsize,
		},
		maxLength : 10,
	});

	if (invoiceInvoiceOpt.value == 'New') {
		invoiceText.value = vatPtg();
		Ti.API.info('xxx vatPtg() : ' + invoiceText.value);
	} else {
		Ti.API.info('xxx invoiceVATPresent.value');
		if(isManualVAT){
			invoiceText.value = invoiceVAT.value;
		} else {
			invoiceText.value = invoiceVATPresent.value;
		}
	}

	/*var isManualOvrCheckBox = Ti.UI.createSwitch({
		style : Ti.UI.Android.SWITCH_STYLE_SWITCH,
		value : isManualVAT,
		right : 0,
		top : 0,
		height : 25,
		width : Ti.UI.SIZE,
		color : '#489CE0'
	});

	var isManualOvrTxtBox = Ti.UI.createLabel({
		text : 'Manually input VAT Amount',
		left : 0,
		top : 2,
		width : Ti.UI.SIZE,
		color : settingsbtnfontcolor
	});

	var isManualOvrView = Ti.UI.createView({
		left : '17dp',
		right : '13dp',
		top : 12,
		bottom : 5,
		height : 25,
		width : Ti.UI.FILL,
	});

	isManualOvrView.add(isManualOvrTxtBox);
	isManualOvrView.add(isManualOvrCheckBox);
	createInvoiceContainerView.add(isManualOvrView);

	isManualOvrCheckBox.addEventListener("change", function(e) {
		Ti.API.info("The checkbox has been set to " + e.value);
		isManualVAT = e.value;
	});*/
	
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
	
	createInvoiceContainerView.add(vatTypeSelectionView);
	
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
    
    function switchActiveButton(ButtonID){
    	if(ButtonID === vw_InnerLeft.id){
    		vw_RadioImageLeft.backgroundImage = RadioButtonSelectedImage;
    		vw_RadioImageRight.backgroundImage = RadioButtonUnSelectedImage;
    		isManualVAT = false;
    	} else if(ButtonID === vw_InnerRight.id){
    		vw_RadioImageRight.backgroundImage = RadioButtonSelectedImage;
    		vw_RadioImageLeft.backgroundImage = RadioButtonUnSelectedImage;
    		isManualVAT = true;
    	}	
    }
    	
	//#

	invoiceTextView.add(invoiceText);
	createInvoiceContainerView.add(invoiceTextView);

	var btnCreateInvoiceVatView = Ti.UI.createView({
		//backgroundColor : settingsbtncol,
		//backgroundSelectedColor : settingsbtnselectedcol,
		left : '1%',
		right : '1%',
		top : '1%',
		bottom : '0.5%',
		// height : deviceHeight * 0.11,
		height : settingOptionHeight,
	});

	var btnChangeInvoiceVat = Ti.UI.createButton({
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

	btnCreateInvoiceVatView.add(btnChangeInvoiceVat);
	createInvoiceContainerView.add(btnCreateInvoiceVatView);

	createInvoiceVatWrapperView.add(createInvoiceVatBackgroundView);
	createInvoiceVatWrapperView.add(createInvoiceContainerView);

	//var getImage;
	changeVatBtn.addEventListener('click', function(e) {
		//console.log('change');
		createInvoiceVatWrapperView.show();
		//mainAdhocView.scrollingEnabled = false;
	});

	imageVatpopupclose.addEventListener('click', function() {
		createInvoiceVatWrapperView.hide();
		//mainAdhocView.scrollingEnabled = true;
		//AdhocVatText.value = vatPtg();
	});

	createInvoiceVatBackgroundView.addEventListener('click', function() {
		createInvoiceVatWrapperView.hide();
		//mainAdhocView.scrollingEnabled = true;
	});

	btnChangeInvoiceVat.addEventListener('click', function(e) {
		invoiceText.blur();
		invoiceText.blur();
		createInvoiceVatWrapperView.hide();
		//mainAdhocView.scrollingEnabled = true;
		var vatVal = invoiceText.value;
		vatVal = vatVal * 1;
		var float = /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/;

		// console.log(float.test(vatVal));
		/*if (float.test(vatVal)) {
		 * 	if (vatVal <= '100') {
					vatPtg(vatVal);
					vatLabel.text = 'VAT ' + vatVal + '% ' + '(' + currencyType + ')';
					var invoiceNet = invoiceNetText.value;
					invoiceNet = invoiceNet.replace(/,/g, '');
					tempVatText.value = vatVal;
					var invoiceVat = (invoiceNet * vatVal) / 100;
					vatText.value = toDecimalFormatWithoutCurrency(invoiceVat);
					var vat = vatText.value;
					vat = vat.replace(/,/g, '');
					var totalValue = invoiceNet * 1 + vat * 1;
					invoiceTotalText.value = toDecimalFormatWithoutCurrency(Math.ceil(totalValue * 10000) / 10000);
				} else {
					alert('Please Add Number Below to 100%');
					createInvoiceVatWrapperView.show();
				}
		 } else {
		 alert('Please Add Numbers');
		 createInvoiceVatWrapperView.show();
		 //mainAdhocView.scrollingEnabled = false;
		 }*/

		if (float.test(vatVal)) {
			if (isManualVAT) {
				
				//Validation removed as per client requiremet
				/*if (vatVal <= invoiceNetText.value) {
					vatLabel.text = 'VAT Amount ' + '(' + currencyType + ')';
					var invoiceNet = invoiceNetText.value;
					vatText.value = toDecimalFormatWithoutCurrency(vatVal);
					var totalValue = invoiceNet * 1 + vatVal * 1;
					invoiceTotalText.value = toDecimalFormatWithoutCurrency(Math.ceil(totalValue * 10000) / 10000);
				} else {
					alert('Please add an amount less than the Net Invoice value.');
					createInvoiceVatWrapperView.show();
					isManualVAT = false;
					switchActiveButton(1);
					//invoiceText.value = vatPtg();
				}*/
				
				vatLabel.text = 'VAT Amount ' + '(' + currencyType + ')';
				var invoiceNet = invoiceNetText.value;
				vatText.value = toDecimalFormatWithoutCurrency(vatVal);
				var totalValue = invoiceNet * 1 + vatVal * 1;
				invoiceTotalText.value = toDecimalFormatWithoutCurrency(Math.ceil(totalValue * 10000) / 10000);
				
			} else {
				if (vatVal <= '100') {
					vatPtg(vatVal);
					vatLabel.text = 'VAT ' + vatVal + '% ' + '(' + currencyType + ')';
					var invoiceNet = invoiceNetText.value;
					invoiceNet = invoiceNet.replace(/,/g, '');
					tempVatText.value = vatVal;
					var invoiceVat = (invoiceNet * vatVal) / 100;
					vatText.value = toDecimalFormatWithoutCurrency(invoiceVat);
					var vat = vatText.value;
					vat = vat.replace(/,/g, '');
					var totalValue = invoiceNet * 1 + vat * 1;
					invoiceTotalText.value = toDecimalFormatWithoutCurrency(Math.ceil(totalValue * 10000) / 10000);
				} else {
					alert('Please Add Number Below to 100%');
					createInvoiceVatWrapperView.show();
				}
			}
		} else {
			alert('Please enter a numerical value.');
			createInvoiceVatWrapperView.show();
		}
	});

	/********End Vat Popup*********/

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
				emptyPicker(selectCustomerText);
				var selectCustomerdata = [];

				selectCustomerdata = getCustomerData();

				selectCustomerText.selectionIndicator = true;
				selectCustomerText.add(selectCustomerdata);

				
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
				selectCustomerText.setSelectedRow(0, rowNo+1, false);
				
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

	selectCustomerText.addEventListener('change', function(e) {
		try{
			selectCustomerText.value = e.row.id;
			invoiceCustomerName.value = e.row.id;
		} catch (e){
			
		}
		
	});
	invoiceNetText.addEventListener('change', function() {
		var invoiceNet = invoiceNetText.value;
			invoiceNet = invoiceNet.replace(/,/g, '');
			var tempVatvals = tempVatText.value;
			var invoiceVat;
			if(!isManualVAT){
				invoiceVat = (invoiceNet * vatPtg(tempVatvals)) / 100;
				vatText.value = toDecimalFormatWithoutCurrency(invoiceVat);
			}
			var vat = vatText.value;
			vat = vat.replace(/,/g, '');
			var totalValue = invoiceNet * 1 + vat * 1;
			
			if(isVATApply == 0){
				totalValue = invoiceNet * 1;
			}		
			
			invoiceTotalText.value = toDecimalFormatWithoutCurrency(Math.ceil(totalValue * 10000) / 10000);
	});
	
	invoiceNetText.addEventListener('blur', function() { //changed action to blur
		var pd_value = invoiceNetText.value * 1;
		invoiceNetText.value = toDecimalFormatWithoutCurrency(pd_value);
	});

	invoiceNetText.addEventListener('focus', function() { //changed action to blur
			invoiceNetText.setSelection(0,invoiceNetText.value.length);
	});

	/*invoiceNetText.addEventListener('blur', function() {
		//Ti.API.info('invoice net blur');
		var pd_value = invoiceNetText.value * 1;
		invoiceNetText.value = toDecimalFormatWithoutCurrency(pd_value);
	});*/

	vatText.addEventListener('change', function() {
		var invoiceNet = invoiceNetText.value;
		invoiceNet = invoiceNet.replace(/,/g, '');
		var vat = vatText.value;
		vat = vat.replace(/,/g, '');
		var totalValue = invoiceNet * 1 + vat * 1;
		invoiceTotalText.value = toDecimalFormatWithoutCurrency(Math.ceil(totalValue * 10000) / 10000);
	});

	btnInvDate.addEventListener('click', function(e) {
		//supplierInvDateText.value = e.row.id;
		//console.log("User selected date: " + e.value.toLocaleString());
		var supplierInvDatePicker = Ti.UI.createPicker({
			//value:'02/05/2015',
		});
		//console.log("date " + invDateText.value);
		var last_part2 = invDateText.value;
		var day = last_part2.split("/")[0];
	    var month =  last_part2.split("/")[1];
	    var year =  last_part2.split("/")[2];
	    var selectedDatePicker = new Date(year, month-1, day);
	  
		//var selectedDatePicker;
		supplierInvDatePicker.showDatePickerDialog({
			value: selectedDatePicker,
			cancel : true,
			callback : function(e) {
				if (e.cancel) {
					//Ti.API.info('user canceled dialog');
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
					invDateText.value = selectedDate;
					supplierInvDatePicker.value = e.value;
					invDateText.blur();
				}
			}
		});

	});

	invDateText.addEventListener('singletap', function(e) {
		//console.log("clicked============");
		var supplierInvDatePicker = Ti.UI.createPicker({
			//value:'02/05/2015',
		});
		var selectedDatePicker;
		supplierInvDatePicker.showDatePickerDialog({
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
					invDateText.value = selectedDate;
					supplierInvDatePicker.value = e.value;
					invDateText.blur();
				}
			}
		});

	});

	categoryText.addEventListener('change', function(e) {
		categoryText.value = e.row.id;
		invoiceCategory.value = e.row.id;
		//console.log(e.row.id);
		// getSubCategoryData(e.row.id);
		/*if (subCategoryText.columns[0]) {
			var _col = subCategoryText.columns[0];
			var len = _col.rowCount;
			for (var x = len - 1; x >= 0; x--) {
				var _row = _col.rows[x];
				_col.removeRow(_row);
			}
			//picker.reloadColumn(_col);
		}*/
		emptyPicker(subCategoryText);
		//subCategoryTextData = getSubCategoryData(e.row.id);
		subCategoryTextData = getCategoryPickerRows(e.row.id, 'invoiceSub');
		subCategoryText.add(subCategoryTextData);
		//Ti.API.info('SUB CATE DATA : ' + JSON.stringify(subCategoryText));
		var subCatList = getDataArray(e.row.id, 'invoiceSub');
		var defaultRowNo = returnRowNo(subCatList, 'General');
		subCategoryText.setSelectedRow(0, defaultRowNo, false);		
		
		/*function getGeneralSubCategoryRow(catList){
			var generalRowID = 0;
			if (catList) {
				for (var x = catList.rowCount - 1; x >= 0; x--) {
					if(catList.rows[x].title === 'General'){
						generalRowID = x;
						Ti.API.info('SUB CATE DATA FOUND : ' + JSON.stringify(generalRowID));
						break;
					}
				}
			}			
			return generalRowID;
		}*/

	});

	subCategoryText.addEventListener('change', function(e) {
		if (e.row != null) {
			subCategoryText.value = e.row.id;
			//expenceSubCategory.value = e.row.id;
		}
	});

	saveBtn.addEventListener('click', function(e) {
		if(isVATApply == 0){
			Ti.API.info('VAT APPLICATION ENFORCED ' + isVATApply);
			tempVatText.value = 0;
			vatText.value = '0.00';
		}
		if (invoiceIncomeRecordValidate()) {
			// validated
			//var invoice_no = invoiceNumberText.value;
			// var categoryDetails = getCategoryDetails(invoice_no);
			// var duepayment = getInvoiceDuebyInvoiceNumber(invoice_no);
			var invoiceNet = invoiceNetText.value;
			invoiceNet = invoiceNet.replace(/,/g, '');
			var invoiceTotal = invoiceTotalText.value;
			invoiceTotal = invoiceTotal.replace(/,/g, '');
			var vat = vatText.value;
			vat = vat.replace(/,/g, '');
			paidValue = (invoicePaid.value == "1") ? '1' : '0';
			var dateForSave = dateSaveChange(invDateText.value);

			//Ti.API.info('Validated');
			
			var dbData = {
				invoice_date : dateForSave,
				invoice_no : invoiceNumberText.value,
				customer_id : selectCustomerText.getSelectedRow(0).id,
				net_amount : invoiceNet,
				vat : vat,
				total_amount : invoiceTotal,
				category_id : (isCreditNote) ? 'N/A' : categoryText.getSelectedRow(0).id,
				sub_category_id : (isCreditNote) ? 'N/A' : subCategoryText.getSelectedRow(0).id,
				paid : paidValue,
				note : noteText.value,
				vat_presentage : (isManualVAT) ? 0 : tempVatText.value,
				is_creditnote : isCreditNote ? '1' : '0'
			};

			//console.log(dbData);
			if (invoiceInvoiceOpt.value == "Update") {

				var getResult = updateInvoiceData(dbData, invoiceTableId.value);

				if (getResult) {
					//var optionResultSet = db.execute('SELECT * FROM tbl_option WHERE id=3');
					//var nextInvoiceNumber = optionResultSet.fieldByName('option_value');
					//nextInvoiceNumber = (nextInvoiceNumber * 1) + 1;
					//db.execute('UPDATE tbl_option SET option_value = "' + nextInvoiceNumber + '" WHERE id = 3');
					
					isVATApply = 0;
					Ti.App.fireEvent('refrishEditView', 'e');
					createinvoicepopupcontainerView.hide();
					var toast = Ti.UI.createNotification({
						message : "Invoice updated successfully",
						duration : Ti.UI.NOTIFICATION_DURATION_SHORT
					});
					toast.show();
					clearContent();
					Ti.App.fireEvent('editInvoiceViewClose', 'e');
				}

			} else {

				var getResult = saveInvoiceData(dbData);

				if (getResult) {
					var optionID = isCreditNote ? '4' : '3';
					//var optionResultSet = db.execute("SELECT * FROM tbl_option WHERE id='" + optionID + "'");
					//var nextInvoiceNumber = optionResultSet.fieldByName('option_value');
					var lastInvoiceNumber = getResult;
					//nextInvoiceNumber = (nextInvoiceNumber * 1); //+ 1; removed addition. need to save last invoice number only
					//db.execute("UPDATE tbl_option SET option_value = '" + nextInvoiceNumber + "' WHERE id ='" + optionID + "'");
					db.execute("UPDATE tbl_option SET option_value = '" + lastInvoiceNumber + "' WHERE id ='" + optionID + "'");
					
					
					//createinvoicepopupcontainerView.hide();
					var toast = Ti.UI.createNotification({
						message : "Invoice recorded successfully",
						duration : Ti.UI.NOTIFICATION_DURATION_SHORT
					});
					toast.show();
					clearContent('save');
				}

			}
			//Ti.App.fireEvent('editInvoiceViewClose', 'e');
		}
	});

	nextBtn.addEventListener('click', function(e) {
		if (isFormNotEmpty()){
			var alertBoxDelete = Ti.UI.createAlertDialog({
					cancel : 1,
					buttonNames : ['Yes', 'No'],
					message : 'This Invoice form has unsaved data.\nAre you sure you want to close without saving?',
					title : 'Close without saving?'
				});
	
			alertBoxDelete.show();
				
			alertBoxDelete.addEventListener('click', function(event) {
				if (event.index === 0) {
					clearContent();
					//expenceView.hide();
					Ti.App.fireEvent('editInvoiceViewClose', 'e');
				}
			});
		}else{
			clearContent();
			//expenceView.hide();
			Ti.App.fireEvent('editInvoiceViewClose', 'e');
		}
		
		
		
		/*if (invoiceIncomeRecordValidate()) {
			// validated
			// var invoice_no = invoiceNumberText.value;
			// var categoryDetails = getC ategoryDetails(invoice_no);
			// var duepayment = getInvoiceDuebyInvoiceNumber(invoice_no);
			var invoiceNet = invoiceNetText.value;
			invoiceNet = invoiceNet.replace(/,/g, '');
			var invoiceTotal = invoiceTotalText.value;
			invoiceTotal = invoiceTotal.replace(/,/g, '');
			var vat = vatText.value;
			vat = vat.replace(/,/g, '');
			var dateForSave = dateSaveChange(invDateText.value);

			Ti.API.info('Validated');
			
			var dbData = {
				invoice_date : dateForSave,
				invoice_no : invoiceNumberText.value,
				customer_id : selectCustomerText.getSelectedRow(0).id,
				net_amount : invoiceNet,
				vat : vat,
				total_amount : invoiceTotal,
				//#category_id : categoryText.getSelectedRow(0).id,
				//#sub_category_id : subCategoryText.getSelectedRow(0).id,
				category_id : (isCreditNote) ? 'N/A' : categoryText.getSelectedRow(0).id,
				sub_category_id : (isCreditNote) ? 'N/A' : subCategoryText.getSelectedRow(0).id,
				paid : '0',
				note : noteText.value,
				vat_presentage : (isManualVAT) ? 0 : tempVatText.value,
				is_creditnote : isCreditNote ? '1' : '0'

			};
			//console.log(dbData);
			var getResult = saveInvoiceData(dbData);
			if (getResult) {
				var optionID = isCreditNote ? '4' : '3';
				var optionResultSet = db.execute("SELECT * FROM tbl_option WHERE id='" + optionID + "'");
				var nextInvoiceNumber = optionResultSet.fieldByName('option_value');
				nextInvoiceNumber = (nextInvoiceNumber * 1) + 1;
				db.execute("UPDATE tbl_option SET option_value = '" + nextInvoiceNumber + "' WHERE id ='" + optionID + "'");					
				clearContent();
				var toast = Ti.UI.createNotification({
					message : "Save Successful",
					duration : Ti.UI.NOTIFICATION_DURATION_SHORT
				});
				toast.show();
				
			}
		}*/
	});

	cancelBtn.addEventListener('click', function() {
		//createinvoicepopupcontainerView.hide();
		//clearContent();
		//Ti.App.fireEvent('editInvoiceViewClose', 'e');
		
		/*var alertBoxDelete = Ti.UI.createAlertDialog({
				cancel : 1,
				buttonNames : ['Yes', 'No'],
				message : 'This Invoice entry was not saved.\nAre you sure you want to clear the fields?',
				title : 'Cancel entry?'
			});

			alertBoxDelete.show();

			alertBoxDelete.addEventListener('click', function(event) {

				if (event.index === 0) {
					clearContent();
				}
			});*/
		
			clearInvoiceForm();
		
	});

	/*btncreateinvoicedelete.addEventListener('click', function(argument) {

	 var paidInvoiceCount = paidInvoiceCountData(invoiceNumber.value);

	 if (paidInvoiceCount > 0) {
	 var alertBoxUnableDelete = Ti.UI.createAlertDialog({
	 //cancel : 1,
	 buttonNames : ['Ok'],
	 message : 'Please Delete Income Records Added to This Invoice',
	 title : 'Unable to Delete '
	 });

	 alertBoxUnableDelete.show();

	 }else{
	 var alertBoxDelete = Ti.UI.createAlertDialog({
	 cancel : 1,
	 buttonNames : ['Delete', 'Cancel'],
	 message : 'Do you want to delete the record?',
	 title : 'Delete Confirmation?'
	 });

	 alertBoxDelete.show();

	 alertBoxDelete.addEventListener('click', function(event) {
	 if (event.index === 0) {
	 var getResult = deleteInvoiceData(invoiceTableId.value);
	 if (getResult) {
	 Ti.App.fireEvent('refrishEditView', 'e');
	 createinvoicepopupcontainerView.hide();
	 clearContent();
	 var toast = Ti.UI.createNotification({
	 message : "Record Deleted Successful",
	 duration : Ti.UI.NOTIFICATION_DURATION_SHORT
	 });
	 toast.show();

	 }
	 Ti.App.fireEvent('editInvoiceViewClose', 'e');
	 }
	 });
	 }

	 console.log('paidInvoiceCount Dele >>' + paidInvoiceCount);

	 });*/

	Ti.App.addEventListener('addInvoiceViewClose', function(e) {
		isVATApply = 0;
		createinvoicepopupcontainerView.hide();
		clearContent();
		calView.hide();
		//createinvoicepopupinputview.hide();
		createInvoiceVatWrapperView.hide();
		createCustomerWrapperView.hide();
		isManualVAT = false;
		switchActiveButton(1);
	});

	Ti.App.addEventListener('editInvoiceViewClose', function(e) {
		isVATApply = 0;
		isManualVAT = false;
		switchActiveButton(1);
		createinvoicepopupcontainerView.hide();
		clearContent();
		calView.hide();
		//createinvoicepopupinputview.hide();
		createInvoiceVatWrapperView.hide();
		createCustomerWrapperView.hide();
		invoiceInvoiceOpt.value = "New";

		invoiceTableId.value = '';
		//invoiceTitle.value = 'Record Invoices & Credit Notes'; //'Add Invoice';
		if (isCreditNote) {
			invoiceTitle.value = 'Record Credit Notes';
			invDateLabel.text = 'Credit Note Date *';
			invoiceNumberLabel.text = 'Credit Note No. *';
		} else if (isCreditNote === false) {
			invoiceTitle.value = 'Record Invoices';
			invDateLabel.text = 'Invoices Date *';
			invoiceNumberLabel.text = 'Invoices Number *';
		}
		invoiceEntryDate.value = getDate();
		//console.log('invoiceEntryDate.value '+invoiceEntryDate.value);
		invoiceNumber.value = getInvoiceNumber();
		invoiceCustomerName.value = 0;
		invoiceNet.value = '0.00';
		invoiceVATPresent.value = '';
		invoiceVAT.value = '0.00';
		invoiceInvoiceTotal.value = '0.00';
		invoiceCategory.value = 0;
		invoiceSubCategory.value = 0;
		invoiceNote.value = '';
		

		invoicePaid.value = '0';
	});

	createinvoicepopupcontainerView.add(createinvoicepopupinputview);
	createinvoicepopupcontainerView.add(createinvoiceBtnView);
	createinvoicepopupcontainerView.add(createInvoiceVatWrapperView);
	createinvoicepopupcontainerView.add(createCustomerWrapperView);
	createinvoicepopupcontainerView.add(createCategoryWrapperView);
	createinvoicepopupcontainerView.add(createSubCategoryWrapperView);
	createinvoicepopupcontainerView.add(calView);

	for (x in bellowTaxElements) {
		moveUP(bellowTaxElements[x]);
	}
	
	if(isManualVAT){
    	switchActiveButton(2);
    	//Ti.API.info('IS MANUAL VAT');
    } else {
    	switchActiveButton(1);
    	//Ti.API.info('IS NOT MANUAL VAT');
    }
    
    if (invoiceInvoiceOpt.value != 'New') {
    	if (invoiceVAT.value != '0.0' || invoiceVATPresent.value != '0.0') {
			triggerChangeInVatSelectionEditLoad(1); // Select 'Yes' as VAT applies
			vatRequiredOption.setSelectedRow(0,1,false); // Select 'Yes' as VAT applies
			Ti.API.info(invoiceVAT.value + 'VAT IS APPLICABLE!!!!!' + invoiceVATPresent.value);
		}
	}
	
	if (invoiceInvoiceOpt.value == 'New') {
		enableUpdate();
		editBtn.visible = false;
		nextBtn.visible = true;
		saveBtn.visible = true;
		cancelBtn.visible = true;
	} else if (invoiceInvoiceOpt.value == 'View') {
		disableUpdate();
		editBtn.visible = true;
		nextBtn.visible = false;
		saveBtn.visible = false;
		cancelBtn.visible = false;
		//saveBtn.right = '0%';
		saveBtn.title = 'Update';
	} else if (invoiceInvoiceOpt.value == 'Update') {
		enableUpdate();
		editBtn.visible = false;
		nextBtn.visible = true;
		saveBtn.visible = true;
		cancelBtn.visible = true;
		//saveBtn.right = '0%';
		saveBtn.title = 'Update';
	}
	
	return createinvoicepopupcontainerView;
};

exports.setInvoiceData = function(tableId, viewOption) {
//function setInvoiceData(tableId, viewOption) {	
	if(viewOption === null || viewOption === undefined || viewOption === ''){
		invoiceInvoiceOpt.value = 'Update'; // this is as the view option was added at a later time
		invoiceTitle.value = 'Edit ';
	} else if (viewOption === 'Update'){
		invoiceInvoiceOpt.value = 'Update';
		invoiceTitle.value = 'Edit ';
	} else if (viewOption === 'View'){
		invoiceInvoiceOpt.value = 'View';
		invoiceTitle.value = 'View ';
	}

	editTransactionId = tableId;
	var invoiceDataSet = db.execute('SELECT * FROM tbl_invoice WHERE id = ' + tableId);
	invoiceTableId.value = invoiceDataSet.fieldByName('id');
	
	if (invoiceDataSet.fieldByName('isCreditNote') == '1') {
		isCreditNote = true;
		//Ti.API.info('is Credit Note ################# : ' + invoiceDataSet.fieldByName('isCreditNote'));
		invoiceTitle.value = invoiceTitle.value + 'Credit Note';
	} else {
		isCreditNote = false;
		//Ti.API.info('is Credit Note ################# : ' + invoiceDataSet.fieldByName('isCreditNote'));
		invoiceTitle.value = invoiceTitle.value + 'Invoice';
	}
	
	invoiceEntryDate.value = changeDateView(invoiceDataSet.fieldByName('invoice_date'));
	invoiceCustomerName.value = invoiceDataSet.fieldByName('customer_id');
	invoiceNumber.value = invoiceDataSet.fieldByName('invoice_no');
	invoiceNet.value = invoiceDataSet.fieldByName('net_amount');
	invoiceVATPresent.value = invoiceDataSet.fieldByName('vat_presentage');
	invoiceVAT.value = invoiceDataSet.fieldByName('vat');
	invoiceInvoiceTotal.value = invoiceDataSet.fieldByName('total_amount');
	invoiceNote.value = invoiceDataSet.fieldByName('note');
	if (invoiceVAT.value != '0.0' && invoiceVATPresent.value == '0.0') {
		isManualVAT = true;
		//Ti.API.info('POP 2 : ' + isManualVAT);
	} else {
		isManualVAT = false;
		//Ti.API.info('POP 3 : ' + isManualVAT);
	}
	
	if (!isCreditNote){
			invoiceCategory.value = invoiceDataSet.fieldByName('category_id');
			invoiceSubCategory.value = invoiceDataSet.fieldByName('sub_category_id');
	}
	

};
