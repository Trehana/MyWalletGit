var expenceTableId = Ti.UI.createTextField({
	value : '',
	visible : false,
});
var expenceTitle = Ti.UI.createTextField({
	value : 'Add Payments',
	visible : false,
});
var expenceEntryDate = Ti.UI.createTextField({
	value : getDate(),
	visible : false,
});
var expenceCategory = Ti.UI.createTextField({
	value : 0,
	visible : false,/////
});
var expenceSubCategory = Ti.UI.createTextField({
	value : 0,
	visible : false,
});
var expenceAccount = Ti.UI.createTextField({
	value : 0,
	visible : false,
});
var expenceProject = Ti.UI.createTextField({
	value : '',
	visible : false,
});
var expenceInvoiceNet = Ti.UI.createTextField({
	value : '0.00',
	visible : false,
});
var expenceVATPresent = Ti.UI.createTextField({
	value : '',
	visible : false,
});
var expenceVAT = Ti.UI.createTextField({
	value : '0.00',
	visible : false,
});
var expenceInvoiceTotal = Ti.UI.createTextField({
	value : '0.00',
	visible : false,
});
//var expencePaymentMode = Ti.UI.createTextField({value: 0,	visible: false,});
var expencePicture = Ti.UI.createTextField({
	value : '/images/camera.png',
	visible : false,
});
var expenceSuplierInvDate = Ti.UI.createTextField({
	value : '',
	visible : false,
});
var expenceSupplierName = Ti.UI.createTextField({
	value : '',
	visible : false,
});
var expenceSublierInvNum = Ti.UI.createTextField({
	value : '',
	visible : false,
});
var expenceNote = Ti.UI.createTextField({
	value : '',
	visible : false,
});
var expenceOpt = Ti.UI.createTextField({
	value : 'New',
	visible : false,
});
var isVATApply = 0;
var bellowTaxElements = [];

var isManualVAT = false; //#

var editTransactionId=0;

exports.addExpenceView = function() {

	var calcultor = require('calculator');
	var calView = calcultor.calculatorView();

	function saveExpencesForm(){
		/*if(isVATApply == 0){
			//Ti.API.info('VAT APPLICATION ENFORCED ' + isVATApply);
			tempVatText.value = 0;
			vatText.value = '0.00';
		}
		*/
		var invoiceNet = invoiceNetText.value;
		invoiceNet = invoiceNet.replace(/,/g, '');
		var invoiceTotal = invoiceTotalText.value;
		invoiceTotal = invoiceTotal.replace(/,/g, '');
		var vat = vatText.value;
		vat = vat.replace(/,/g, '');

		var dateForSave = dateSaveChange(dateLabel.value);
		var SupInvDateForSave = (supplierInvDateText.value == "") ? "" : dateSaveChange(supplierInvDateText.value);
		//console.log('getImage ' + typeof getImage + ' ' + getImage);
		//console.log('expencePicture ' + typeof expencePicture.value + ' ' + expencePicture.value);
		//console.log('pictureText.image ' + typeof pictureText.image + ' ' + pictureText.image);

		var imageData = (getImage == undefined ) ? expencePicture.value : Ti.Utils.base64encode(getImage);

		console.log('imageData ' + imageData);
 
		if (addExpenseValidate()) {
			
			var dbData = {
				payment_date : dateForSave,
				category_id : categoryText.getSelectedRow(0).id,
				sub_category_id : subCategoryText.getSelectedRow(0).id,
				account_id : selectAccountText.getSelectedRow(0).id,
				//project_id : selectProjectText.getSelectedRow(0).id,
				project_id : selectProjectText.value,
				net_amount : invoiceNet,
				vat : vat,
				total_amount : invoiceTotal,
				picture_path : imageData,
				//payment_mode_id : paymentModeText.getSelectedRow(0).id,
				supplier_inv_date : SupInvDateForSave,
				supplier_name : supplierNameText.value,
				supplier_inv_num : supplierInvNumberText.value,
				note : noteText.value,
				vat_presentage : (isManualVAT) ? 0 : tempVatText.value,
			};

			//console.log(dbData);
			if (expenceOpt.value == "Update") {

				var getResult = updateExpenceData(dbData, expenceTableId.value);
				Ti.App.fireEvent('refrishEditView', 'e');
				if (getResult) {
					clearContent();
					expenceView.hide();
					Ti.App.fireEvent('editExpenceViewClose', 'e');
					isVATApply = 0;
					var toast = Ti.UI.createNotification({
						message : "Update Successful",
						duration : Ti.UI.NOTIFICATION_DURATION_SHORT
					});
					toast.show();
				}

			} else {

				var getResult = saveExpenseData(dbData);
				if (getResult) {
					clearContent();
					
						var toast = Ti.UI.createNotification({
						message : "Save Successful",
						duration : Ti.UI.NOTIFICATION_DURATION_SHORT
					});
					toast.show();
				}
			}
			
		}
		
	}

	function clearExpenceForm(){
		var alertBoxDelete = Ti.UI.createAlertDialog({
				cancel : 1,
				buttonNames : ['Yes', 'No'],
				message : 'This expence entry was not saved.\nAre you sure you want to clear the fields?',
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

	function saveExpenseData(dbData) {
		var db = Ti.Database.open('mywallet');
		db.execute('INSERT INTO tbl_expence(payment_date, category_id, sub_category_id, account_id, project_id, net_amount, vat, total_amount, picture_path,supplier_inv_date,supplier_name,supplier_inv_num,note,vat_presentage) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)', dbData.payment_date, dbData.category_id, dbData.sub_category_id, dbData.account_id, dbData.project_id, dbData.net_amount, dbData.vat, dbData.total_amount, dbData.picture_path, dbData.supplier_inv_date, dbData.supplier_name, dbData.supplier_inv_num, dbData.note, dbData.vat_presentage);
		db.close();
		return true;
	}

	function updateExpenceData(dbData, tableID) {
		var db = Ti.Database.open('mywallet');
		db.execute('UPDATE tbl_expence SET payment_date="' + dbData.payment_date + '", category_id=' + dbData.category_id + ', sub_category_id=' + dbData.sub_category_id + ', account_id=' + dbData.account_id + ', project_id="' + dbData.project_id + '", net_amount="' + dbData.net_amount + '", vat="' + dbData.vat + '", total_amount="' + dbData.total_amount + '", picture_path="' + dbData.picture_path + '", supplier_inv_date="' + dbData.supplier_inv_date + '", supplier_name="' + dbData.supplier_name + '", supplier_inv_num="' + dbData.supplier_inv_num + '", note="' + dbData.note + '", vat_presentage="' + dbData.vat_presentage + '" WHERE id = ' + tableID);
		db.close();
		return true;
	}

	function deleteExpenceData(tableID) {
		var db = Ti.Database.open('mywallet');
		db.execute('DELETE FROM tbl_expence WHERE id=' + tableID);
		db.close();
		return true;

	}

	function saveSubCategoryData(CategoryData) {
		//console.log(CategoryData);
		if (validateSubCategory(CategoryData.expence_sub_category, CategoryData.parent_category)) {
			var db = Ti.Database.open('mywallet');
			db.execute('INSERT INTO tbl_expence_sub_category(expence_sub_category,parent_category,enable) VALUES(?,?,?)', CategoryData.expence_sub_category, CategoryData.parent_category, CategoryData.enable);
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

	function saveCategoryData(CategoryData) {
		if (validateCategory(CategoryData.expence_category)) {
			var db = Ti.Database.open('mywallet');
			db.execute('INSERT INTO tbl_expence_category(expence_category,enable) VALUES(?,?)', CategoryData.expence_category, CategoryData.enable);

			var lastIDData = db.execute('SELECT MAX(id) as rowid FROM tbl_expence_category WHERE enable=1');
			var lastID = lastIDData.fieldByName('rowid');
			//console.log('lastID >> ' + lastID);
			var insData = 'General';
			db.execute('INSERT INTO tbl_expence_sub_category (expence_sub_category,parent_category,enable) VALUES ("' + insData + '","' + lastID + '",1)');
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

	function isFormNotEmpty() {
		
	if (expenceOpt.value == 'Update'){
		var tableId = editTransactionId;
		//console.log("========= " + tableId);
		var db = Ti.Database.open('mywallet');
		var expenceDataSet = db.execute('SELECT * FROM tbl_expence WHERE id = ' + tableId);
		// setting intial values to check if form was changed before closing
		var expenceEntryDate = changeDateView(expenceDataSet.fieldByName('payment_date'));
		var expenceAccount1 = expenceDataSet.fieldByName('account_id');
		var expenceAccount2 = expenceDataSet.fieldByName('account_id');
		var expenceCategory = expenceDataSet.fieldByName('category_id');
		var expenceSubCategory = (expenceDataSet.fieldByName('sub_category_id') == "") ? '0' : expenceDataSet.fieldByName('sub_category_id');
		var expenceInvoiceTotal = expenceDataSet.fieldByName('total_amount');
		var expenceSuplierInvDate = (expenceDataSet.fieldByName('supplier_inv_date') == "") ? "" : changeDateView(expenceDataSet.fieldByName('supplier_inv_date'));
		var expenceSupplierName = expenceDataSet.fieldByName('supplier_name');
		var expenceSublierInvNum = expenceDataSet.fieldByName('supplier_inv_num');
		var expenceProject = expenceDataSet.fieldByName('project_id');
		var expenceNote = expenceDataSet.fieldByName('note');
		
		db.close();
		
	}else {
		
		var expenceEntryDate = getDate();
		var expenceAccount1 = 2;
		var expenceAccount2 = 0;
		var expenceCategory = 0;
		var expenceSubCategory = 0;
		var expenceInvoiceTotal = '0.00';
		var expenceSuplierInvDate = '';
		var expenceSupplierName = '';
		var expenceSublierInvNum = '';
		var expenceProject = '';
		var expenceNote = '';
		
	}
		//var formEmpty = true;
		
		/*if (selectAccountText.setSelectedRow(0, 2)){
			return false;			
		}*/
		console.log('date ' + dateLabel.value + "-" + expenceEntryDate);
		if (dateLabel.value != expenceEntryDate){
			console.log('date');
			return true;			
		}
		if (expenceAccount.value != expenceAccount1 && expenceAccount.value != expenceAccount2){
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
		}
	}

	function clearContent() {
		
		selectAccountText.setSelectedRow(0, 2);
		selectAccountText.value = 2;
		dateLabel.value = getDate();
		categoryText.setSelectedRow(0, 0, false);

		/*var _col = subCategoryText.columns[0];
		var len = _col.rowCount;
		for (var x = len - 1; x >= 1; x--) {
			var _row = _col.rows[x];
			_col.removeRow(_row);
		}*/
		emptyPicker(subCategoryText);
		var vatVal = vatPtg();
		vatLabel.text = 'VAT ' + vatVal + '% ' + '(' + currencyType + ')';
		expenseVatText.value = vatPtg();
		//subCategoryText.value = '';
		//selectAccountText.setSelectedRow(0, 0, false);
		//selectProjectText.setSelectedRow(0, 0, false);
		selectProjectText.value = '';
		invoiceNetText.value = '0.00';
		vatText.value = '';
		invoiceTotalText.value = '';
		pictureText.image = '/images/camera.png';
		//paymentModeText.setSelectedRow(0, 0, false);
		noteText.value = '';
		supplierInvDateText.value = '';
		supplierNameText.value = '';
		supplierInvNumberText.value = '';
		isManualVAT = false;
		switchActiveButton(1);
		//setVATapplication(0);
		vatRequiredOption.setSelectedRow(0,0);
		noteText.blur();

	}

	function validateCategory(newCategory) {

		var getTableIncomeCategoryData = db.execute('SELECT * FROM tbl_expence_category WHERE enable = 1 ORDER BY expence_category COLLATE NOCASE ASC');
		newCategory = newCategory.toUpperCase();
		while (getTableIncomeCategoryData.isValidRow()) {

			if (getTableIncomeCategoryData.fieldByName('expence_category').toUpperCase() == newCategory)
				return false;
			getTableIncomeCategoryData.next();
		}
		getTableIncomeCategoryData.close();

		return true;

	}

	function validateSubCategory(newSubCategory, dataGet) {

		var db = Ti.Database.open('mywallet');
		var getTableData = db.execute('SELECT * FROM tbl_expence_sub_category WHERE enable = 1 AND parent_category=' + dataGet + ' ORDER BY expence_sub_category COLLATE NOCASE ASC');
		newSubCategory = newSubCategory.toUpperCase();
		while (getTableData.isValidRow()) {

			if (getTableData.fieldByName('expence_sub_category').toUpperCase() == newSubCategory)
				return false;

			getTableData.next();
		}
		getTableData.close();
		db.close();

		return true;
	}

	/*function getCategoryData() {
		var getTableIncomeCategoryData = db.execute('SELECT * FROM tbl_expence_category WHERE enable = 1 ORDER BY expence_category COLLATE NOCASE ASC');

		tableIncomeCategoryData = [];
		var i = 1;
		tableIncomeCategoryData[0] = Ti.UI.createPickerRow({
			id : '0',
			title : 'Select',
		});
		while (getTableIncomeCategoryData.isValidRow()) {
			tableIncomeCategoryData[i] = Ti.UI.createPickerRow({
				id : getTableIncomeCategoryData.fieldByName('id'),
				title : getTableIncomeCategoryData.fieldByName('expence_category')
			});
			getTableIncomeCategoryData.next();
			i++;
		}
		getTableIncomeCategoryData.close();

		return tableIncomeCategoryData;
	}*/

	function getCategoryID() {
		var catMenuIndex = 0;
		var getTableIncomeCategoryData = db.execute('SELECT * FROM tbl_expence_category WHERE enable = 1 ORDER BY expence_category COLLATE NOCASE ASC');

		var i = 1;
		while (getTableIncomeCategoryData.isValidRow()) {
			if (expenceCategory.value == getTableIncomeCategoryData.fieldByName('id')) {
				catMenuIndex = i;
			}
			getTableIncomeCategoryData.next();
			i++;
		}
		getTableIncomeCategoryData.close();

		return catMenuIndex;
	}

	function getSubCategoryData(dataGet) {
		var db = Ti.Database.open('mywallet');
		var getTableData = db.execute('SELECT * FROM tbl_expence_sub_category WHERE enable = 1 AND parent_category=' + dataGet + ' ORDER BY expence_sub_category COLLATE NOCASE ASC');

		var tabledata = [];
		var i = 1;

		tabledata[0] = Ti.UI.createPickerRow({
			id : '0',
			title : 'Select',
		});
		while (getTableData.isValidRow()) {

			tabledata[i] = Ti.UI.createPickerRow({
				id : getTableData.fieldByName('id'),
				title : getTableData.fieldByName('expence_sub_category')
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
		var getTableData = db.execute('SELECT * FROM tbl_expence_sub_category WHERE enable = 1 AND parent_category=' + dataGet + ' ORDER BY expence_sub_category COLLATE NOCASE ASC');

		var i = 1;
		while (getTableData.isValidRow()) {
			//console.log('>>>> '+expenceSubCategory.value+'  '+getTableData.fieldByName('id'));
			if (expenceSubCategory.value == getTableData.fieldByName('id')) {
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
	function addExpenseValidate() {

		//console.log('>>>>>>>>>>>> selected row :'+categoryText.getSelectedRow(0).id);
		var validated = false;
		var floatRex = /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/;
		var invoiceNet = invoiceNetText.value;
		invoiceNet = invoiceNet.replace(/,/g, '');

		var netTotal = invoiceNetText.value;
		var vatValue = vatText.value;
		// if (categoryText.value == undefined || categoryText.value == 0) {
		if (categoryText.getSelectedRow(0).id == 0) {
			var dialog1 = Ti.UI.createAlertDialog({
				title : 'Alert',
				message : 'Please Select Category',
				ok : 'OK',
			});
			dialog1.show();
			//} else if (subCategoryText.value == undefined || subCategoryText.value == 0) {
		}/* else if (subCategoryText.getSelectedRow(0).id == 0) {
		 var dialog2 = Ti.UI.createAlertDialog({
		 title : 'Alert',
		 message : 'Please Select Sub Category',
		 ok : 'Ok',
		 });
		 dialog2.show();
		 //} else if (selectAccountText.value == undefined || selectAccountText.value == '') {
		 }*/ else if (selectAccountText.getSelectedRow(0).id == 0) {
			var dialog3 = Ti.UI.createAlertDialog({
				title : 'Alert',
				message : 'Please Select Account',
				ok : 'Ok',
			});
			dialog3.show();
		}
		// else if (selectProjectText.value == undefined || selectProjectText.value == '') {
		// var dialog4 = Ti.UI.createAlertDialog({
		// title : 'Alert',
		// message : 'Please Select Project',
		// ok : 'Ok',
		// });
		// dialog4.show();
		// }
		else if (invoiceNetText.value == '') {
			var dialog5 = Ti.UI.createAlertDialog({
				title : 'Alert',
				message : 'Please Add Invoice Net',
				ok : 'Ok',
			});
			dialog5.show();
		} else if (!floatRex.test(invoiceNet)) {
			var dialog6 = Ti.UI.createAlertDialog({
				title : 'Alert',
				message : 'Invoice Net is Invalid',
				ok : 'Ok',
			});
			dialog6.show();
			//} else if (paymentModeText.value == undefined || paymentModeText.value == '') {
		}/* else if (paymentModeText.getSelectedRow(0).id == 0) {
		 var dialog7 = Ti.UI.createAlertDialog({
		 title : 'Alert',
		 message : 'Please Select Payment Mode',
		 ok : 'Ok',
		 });
		 dialog7.show();
		 }*/ else {
			validated = true;
		}

		return validated;
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

	var expenceView = Ti.UI.createView({
		height : '100%',
		width : '100%',
		visible : false,
		backgroundColor : '#fff'
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
		/*if(isFormNotEmpty()){
			expenceView.hide();
			clearContent();
			Ti.App.fireEvent('editExpenceViewClose', 'e');
		}*/
		nextBtn.fireEvent('click');
	});

	var lbltitle = Ti.UI.createLabel({
		text : expenceTitle.value,
		color : '#FFFFFF',
		font : {
			fontSize : stylefontsize + 4,
			fontFamily : customFont2,
		},
		//width : '70%',
		//right : stylemargine,
		//left : '27.5%',
	});

	view_title.add(lblback);
	view_title.add(lbltitle);
	expenceView.add(view_title);

	var mainExpenseView = Ti.UI.createScrollView({
		width : '100%',
		top : deviceHeight * 0.075,
		bottom : deviceHeight * 0.075,
		//height : deviceHeight * 0.925,
		backgroundColor : '#fff'
	});
	expenceView.add(expenceTitle);
	expenceView.add(expenceEntryDate);
	expenceView.add(expenceCategory);
	expenceView.add(expenceSubCategory);
	expenceView.add(expenceAccount);
	expenceView.add(expenceProject);
	expenceView.add(expenceInvoiceNet);
	expenceView.add(expenceVATPresent);
	expenceView.add(expenceVAT);
	expenceView.add(expenceInvoiceTotal);
	//expenceView.add(expencePaymentMode);
	expenceView.add(expencePicture);
	expenceView.add(expenceSuplierInvDate);
	expenceView.add(expenceSupplierName);
	expenceView.add(expenceSublierInvNum);
	expenceView.add(expenceNote);

	var entryDateLabel = Ti.UI.createLabel({
		text : 'Entry Date *',
		color : '#000',
		top : 10,
		left : '2%',
		width : '37%',
		height : 40,
	});

	var dateLabel = Ti.UI.createTextField({
		value : expenceEntryDate.value,
		//color : '#000',
		backgroundColor : '#A0A0A0',
		top : 10,
		left : '41%',
		width : '43%',
		height : 40,
		editable : false,
		font : {
			fontSize : 18,
		},
	});

	var btnentryDate = Ti.UI.createView({
		//type:Ti.UI.PICKER_TYPE_DATE,
		backgroundColor : '#A0A0A0',
		top : 10,
		left : '86%',
		width : '12%',
		height : 40,

	});

	var imgentryDate = Ti.UI.createImageView({
		width : '70%',
		image : '/images/calendar.png',
	});
	btnentryDate.add(imgentryDate);

	// Account list section
	var selectAccountLabel = Ti.UI.createLabel({
		text : 'Select Account *',
		color : '#000',
		top : 55,
		left : '2%',
		width : '37%',
		height : 40,

	});

	var selectAccountText = Ti.UI.createPicker({
		top : 55,
		left : '41%',
		width : '57%',
		height : 40,
		right : '2%',
		backgroundColor : '#A0A0A0',
	});

	var getTableAccountData = db.execute('SELECT * FROM tbl_account WHERE enable = 1');

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

	if(expenceOpt.value == 'New'){
		if(defaultAccountValueRow === null){
			selectAccountText.setSelectedRow(0, expenceAccount.value);
		} else {
			selectAccountText.setSelectedRow(0, defaultAccountValueRow);
			selectAccountText.value = defaultAccountValueRow;
		}
	} else {
		selectAccountText.setSelectedRow(0, expenceAccount.value);
	}

	// -- EOF Account Listing

	//100
	// Category list view
	var vatRequiredLabel = Ti.UI.createLabel({
		text : 'Does VAT apply *',
		color : '#000',
		top : 100,
		left : '2%',
		width : '37%',
		height : 40,
	});

	var vatRequiredOption = Ti.UI.createPicker({
		top : 100,
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

	//145
	// Category list view
	var categoryLabel = Ti.UI.createLabel({
		text : 'Category *',
		color : '#000',
		top : 145,
		left : '2%',
		width : '37%',
		height : 40,
	});

	var categoryText = Ti.UI.createPicker({
		top : 145,
		left : '41%',
		width : '43%',
		height : 40,
		backgroundColor : '#A0A0A0',
	});
	var expCatIndex = getCategoryID();

	categoryText.setSelectedRow(0, expCatIndex);

	var tableIncomeCategoryData = [];
	//tableIncomeCategoryData = getCategoryData();
	tableIncomeCategoryData = getCategoryPickerRows(0, 'expenceParent');

	categoryText.selectionIndicator = true;
	categoryText.add(tableIncomeCategoryData);

	var btnaddcategory = Ti.UI.createView({
		//type:Ti.UI.PICKER_TYPE_DATE,
		backgroundColor : '#A0A0A0',
		top : 145,
		left : '86%',
		width : '12%',
		height : 40,
		//image : '/images/calicon.png',
		//editable:false,
		//font:{fontSize:20,},
	});

	var imgaddcategory = Ti.UI.createImageView({
		width : '70%',
		image : '/images/add.png',
	});
	btnaddcategory.add(imgaddcategory);
	// EOF category list view

	//190
	// Sub category list vewi
	var subCategoryLabel = Ti.UI.createLabel({
		text : 'Sub Category',
		color : '#000',
		top : 190,
		left : '2%',
		width : '37%',
		height : 40,

	});

	var subCategoryText = Ti.UI.createPicker({
		top : 190,
		left : '41%',
		width : '43%',
		height : 40,
		selectionIndicator : true,
		backgroundColor : '#A0A0A0',
	});

	var subCategoryTextData = [];
	//console.log('expenceCategory.value ' + expenceCategory.value);
	//subCategoryTextData = getSubCategoryData(expenceCategory.value);
	subCategoryTextData = getCategoryPickerRows(expenceCategory.value, 'expenceSub');
	//subCategoryTextData = getCategoryPickerRows(expenceCategory.value, 'expenceSub');
	subCategoryText.add(subCategoryTextData);

	var subCatIndex = getSubCategoryID(expenceCategory.value);

	subCategoryText.setSelectedRow(0, subCatIndex-1);

	var btnaddsubCategory = Ti.UI.createView({
		//type:Ti.UI.PICKER_TYPE_DATE,
		backgroundColor : '#A0A0A0',
		top : 190,
		left : '86%',
		width : '12%',
		height : 40,
		//image : '/images/calicon.png',
		//editable:false,
		//font:{fontSize:20,},
	});

	var imgaddsubCategory = Ti.UI.createImageView({
		width : '70%',
		image : '/images/add.png',
	});
	btnaddsubCategory.add(imgaddsubCategory);cancelBtn

	// 235
	var invoiceNetLabel = Ti.UI.createLabel({
		text : 'Invoice Net  (' + currencyType + ') *',
		color : '#000',
		top : 235,
		left : '2%',
		width : '37%',
		height : 40,

	});

	var invoiceNetText = Ti.UI.createTextField({
		backgroundColor : '#A0A0A0',
		top : 235,
		left : '41%',
		width : '43%',
		height : 40,
		focusable : true,
		editable : true,
		touchEnabled : true,
		keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
		value : toDecimalFormatWithoutCurrency(expenceInvoiceNet.value * 1),
		//value : '1234'
	});
	/*invoiceNetText.addEventListener('singletap', function() {
		 Ti.API.info('txt changed');
		 //var txtValue = invoiceNet.replace(/,/g, '');
		 //window.dump('test');
		calcultor.setTxtObj(invoiceNetText);
		
		calView.show();
	});
	
	invoiceNetText.addEventListener('click', function() {
		 Ti.API.info('Btn Clicked');
		 //var txtValue = invoiceNet.replace(/,/g, '');
		//calcultor.setTxtObj(invoiceNetText);
		
		//calView.show();
	});
	*/
	invoiceNetText.addEventListener('blur', function() {
		//Ti.API.info('invoice net blur');
		var pd_value = invoiceNetText.value * 1;
		invoiceNetText.value = toDecimalFormatWithoutCurrency(pd_value);
	});
	
	var changeInvNetBtn = Ti.UI.createView({
		//title : 'V',
		// image:'',
		backgroundColor : '#A0A0A0',
		top : 235,
		left : '86%',
		width : '12%',
		height : 40,
	});

	var imgInvNetBtn = Ti.UI.createImageView({
		width : '60%',
		image : '/images/calculator.png',
	});
	changeInvNetBtn.add(imgInvNetBtn);
	
changeInvNetBtn.addEventListener('singletap', function() {
		 Ti.API.info('txt changed');
		 //var txtValue = invoiceNet.replace(/,/g, '');
		 //window.dump('test');
		calcultor.setTxtObj(invoiceNetText);
		
		calView.show();
	});

	//280
	var vatLabel = Ti.UI.createLabel({
		//text : 'VAT ' + vatPtg() + '%  ('+currencyType+')',
		color : '#000',
		top : 280,
		left : '2%',
		width : '37%',
		height : 40,
	});

	if (expenceOpt.value == 'New') {
		vatLabel.text = 'VAT ' + vatPtg() + '%  (' + currencyType + ')';
	} else {
		vatLabel.text = 'VAT ' + expenceVATPresent.value + '%  (' + currencyType + ')';
	}

	var vatText = Ti.UI.createTextField({
		backgroundColor : '#A0A0A0',
		top : 280,
		left : '41%',
		width : '43%',
		height : 40,
		focusable : true,
		editable : false,
		value : toDecimalFormatWithoutCurrency(expenceVAT.value * 1),
	});

	var changeVatBtn = Ti.UI.createView({
		//title : 'V',
		// image:'',
		backgroundColor : '#A0A0A0',
		top : 280,
		left : '86%',
		width : '12%',
		height : 40,
	});

	var imgchangeVat = Ti.UI.createImageView({
		width : '60%',
		image : '/images/edit_white.png',
	});
	changeVatBtn.add(imgchangeVat);

	var tempVatText = Ti.UI.createTextField({
		visible : false,
	});
	if (expenceOpt.value == 'New') {
		tempVatText.value = vatPtg();
	} else {
		tempVatText.value = expenceVATPresent.value;
	}
	// 325
	var invoiceTotalLabel = Ti.UI.createLabel({
		text : 'Invoice Total  (' + currencyType + ')',
		color : '#000',
		top : 325,
		left : '2%',
		width : '37%',
		height : 40,
	});
	bellowTaxElements.push(invoiceTotalLabel);

	var invoiceTotalText = Ti.UI.createTextField({
		backgroundColor : '#A0A0A0',
		top : 325,
		left : '41%',
		width : '57%',
		height : 40,
		editable : false,
		value : toDecimalFormatWithoutCurrency(expenceInvoiceTotal.value * 1),
	});
	bellowTaxElements.push(invoiceTotalText);
	///////

	//370
	var supplierInvDateLabel = Ti.UI.createLabel({
		text : 'Supplier Inv. Date',
		color : '#000',
		top : 460,
		left : '2%',
		width : '37%',
		height : 40,

	});
	bellowTaxElements.push(supplierInvDateLabel);

	var supplierInvDateText = Ti.UI.createTextField({
		backgroundColor : '#A0A0A0',
		top : 460,
		left : '41%',
		width : '43%',
		height : 40,
		editable : false,
		//visible : false,
		font : {
			fontSize : 15,
		},
		value : expenceSuplierInvDate.value,
	});
	bellowTaxElements.push(supplierInvDateText);

	var btnsupplierInvDateview = Ti.UI.createView({
		//type:Ti.UI.PICKER_TYPE_DATE,
		backgroundColor : '#A0A0A0',
		top : 460,
		left : '86%',
		width : '12%',
		height : 40,
		//image : '/images/calicon.png',
		//editable:false,
		//font:{fontSize:20,},
	});
	bellowTaxElements.push(btnsupplierInvDateview);

	var imgsupplierInvDate = Ti.UI.createImageView({
		width : '70%',
		image : '/images/calendar.png',
	});
	btnsupplierInvDateview.add(imgsupplierInvDate);

	//415
	var supplierNameLabel = Ti.UI.createLabel({
		text : 'Supplier Name',
		color : '#000',
		top : 415,
		left : '2%',
		width : '37%',
		height : 40,

	});
	bellowTaxElements.push(supplierNameLabel);

	var supplierNameText = Ti.UI.createTextField({
		backgroundColor : '#A0A0A0',
		top : 415,
		left : '41%',
		width : '57%',
		height : 40,
		value : expenceSupplierName.value,
	});
	bellowTaxElements.push(supplierNameText);
	// 460
	var supplierInvNumberLabel = Ti.UI.createLabel({
		text : 'Supplier Inv. No',
		color : '#000',
		top : 505,
		left : '2%',
		width : '37%',
		height : 40,

	});
	bellowTaxElements.push(supplierInvNumberLabel);

	var supplierInvNumberText = Ti.UI.createTextField({
		backgroundColor : '#A0A0A0',
		top : 505,
		left : '41%',
		width : '57%',
		height : 40,
		value : expenceSublierInvNum.value,
	});
	bellowTaxElements.push(supplierInvNumberText);

	//505
	// Project list view
	var selectProjectLabel = Ti.UI.createLabel({
		text : "Internal Ref. No", //'Select Project',
		color : '#000',
		//top : 505,
		top : 370,
		left : '2%',
		width : '37%',
		height : 40,

	});
	bellowTaxElements.push(selectProjectLabel);

	//var selectProjectText = Ti.UI.createPicker({ changed to text field since client wants user to type reference
	var selectProjectText = Ti.UI.createTextField({
		//top : 505,
		top : 370,
		left : '41%',
		width : '57%',
		height : 40,
		backgroundColor : '#A0A0A0',
	});
	selectProjectText.value = expenceProject.value;
	bellowTaxElements.push(selectProjectText);

	/*var getTableProjectData = db.execute('SELECT * FROM tbl_project');

	var tableProjectData = [];
	var i = 1;
	tableProjectData[0] = Ti.UI.createPickerRow({
		id : '0',
		title : 'Please Select',
	});
	while (getTableProjectData.isValidRow()) {
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

	selectProjectText.setSelectedRow(0, expenceProject.value);*/

	//550
	var noteLabel = Ti.UI.createLabel({
		text : 'Note',
		color : '#000',
		top : 550,
		left : '2%',
		width : '37%',
		height : 40,

	});
	bellowTaxElements.push(noteLabel);

	var noteText = Ti.UI.createTextField({
		backgroundColor : '#A0A0A0',
		top : 550,
		left : '41%',
		width : '57%',
		height : 40,
		value : expenceNote.value,
	});
	bellowTaxElements.push(noteText);

	//675
	var pictureLabel = Ti.UI.createLabel({
		text : 'Picture',
		color : '#000',
		top : 595,
		left : '2%',
		width : '37%',
		height : 40,

	});
	bellowTaxElements.push(pictureLabel);

	var pictureText = Ti.UI.createImageView({
		backgroundColor : '#A0A0A0',
		top : 595,
		bottom : 10,
		left : '41%',
		width : '57%',
		height : 120,
		image : (expencePicture.value == '/images/camera.png') ? expencePicture.value : Ti.Utils.base64decode(expencePicture.value),
	});
	bellowTaxElements.push(pictureText);

	console.log('expencePictureTest >> ' + expencePicture.value);
	//console.log('expencePictureTestEnco >> '+ Ti.Utils.base64decode(expencePicture.value));

	//
	var addExpenceBtnView = Ti.UI.createView({
		//top : 720,
		width : '100%',
		height : appPixel * 7.5,
		backgroundColor : '#054e62',
		bottom : 0
	});
	//bellowTaxElements.push(addExpenceBtnView);

	/*if(expencePicture.value== '/images/camera.png' || expencePicture.value== '/images/camerapnAA=='){
	 pictureText.height = 40;
	 addExpenceBtnView.top = 595;
	 }else{
	 pictureText.height = 120;
	 addExpenceBtnView.top = 675;
	 }*/

	console.log('getImageTExt >> ' + getImage);

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
		title : 'Close', //Prviously was the Next button
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

	/*if (expenceOpt.value == 'Update') {
		nextBtn.visible = false;
		saveBtn.right = '0%';
		saveBtn.title = 'Update';
	}*/
	
	/*if (expenceOpt.value == 'New') {
		// enable
		editBtn.visible = false;
		nextBtn.visible = true;
		saveBtn.visible = true;
		cancelBtn.visible = true;
	} else if (expenceOpt.value == 'View') {
		editBtn.visible = true;
		nextBtn.visible = false;
		saveBtn.visible = true;
		cancelBtn.visible = true;
		saveBtn.right = '0%';
		saveBtn.title = 'Update';
	} else if (expenceOpt.value == 'Update') {
		enableUpdate();
		editBtn.visible = false;
		nextBtn.visible = false;
		saveBtn.visible = true;
		cancelBtn.visible = true;
		saveBtn.right = '0%';
		saveBtn.title = 'Update';
	}*/
	
	editBtn.addEventListener('click', function() {
		enableUpdate();
		editBtn.visible = false;
		nextBtn.visible = true;
		saveBtn.visible = true;
		cancelBtn.visible = true;
		saveBtn.right = '0%';
		saveBtn.title = 'Update';
		lbltitle.text = 'Edit Expence';
	});
	
	var disableLayer =  Ti.UI.createView({
		//backgroundColor : 'pink',
		opacity : 0.7,
		width : '100%',
		height : '100%',
	});
	
	function enableUpdate(){
		try{
			mainExpenseView.remove(disableLayer);
		} catch (e) {
			Ti.API.info('Unable to remove disable layer');
		}
		
	}
	
	function disableUpdate(){		
		mainExpenseView.add(disableLayer);
	}

	addExpenceBtnView.add(cancelBtn);
	addExpenceBtnView.add(saveBtn);
	addExpenceBtnView.add(nextBtn);
	addExpenceBtnView.add(editBtn);

	mainExpenseView.add(entryDateLabel);
	mainExpenseView.add(dateLabel);
	mainExpenseView.add(btnentryDate);
	mainExpenseView.add(categoryLabel);
	mainExpenseView.add(categoryText);
	mainExpenseView.add(btnaddcategory);
	mainExpenseView.add(subCategoryLabel);
	mainExpenseView.add(subCategoryText);
	mainExpenseView.add(btnaddsubCategory);
	mainExpenseView.add(selectAccountLabel);
	mainExpenseView.add(selectAccountText);
	mainExpenseView.add(selectProjectLabel);
	mainExpenseView.add(selectProjectText);
	mainExpenseView.add(invoiceNetLabel);
	mainExpenseView.add(invoiceNetText);
	mainExpenseView.add(changeInvNetBtn);
	// vat
	// mainExpenseView.add(vatLabel);
	// mainExpenseView.add(vatText);
	// mainExpenseView.add(changeVatBtn);
	// mainExpenseView.add(tempVatText);
	mainExpenseView.add(invoiceTotalLabel);
	mainExpenseView.add(invoiceTotalText);
	// mainExpenseView.add(paymentModeLabel);
	// mainExpenseView.add(paymentModeText);
	mainExpenseView.add(pictureLabel);
	mainExpenseView.add(pictureText);
	mainExpenseView.add(supplierInvDateLabel);
	//mainExpenseView.add(btnSupplierInvDate);
	mainExpenseView.add(supplierInvDateText);
	mainExpenseView.add(btnsupplierInvDateview);
	mainExpenseView.add(supplierNameLabel);
	mainExpenseView.add(supplierNameText);
	mainExpenseView.add(supplierInvNumberLabel);
	mainExpenseView.add(supplierInvNumberText);
	mainExpenseView.add(noteLabel);
	mainExpenseView.add(noteText);
	//mainExpenseView.add(addExpenceBtnView);
	mainExpenseView.add(vatRequiredLabel);
	mainExpenseView.add(vatRequiredOption);

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
				expence_category : CategoryName,
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
				setCategoryData = getCategoryPickerRows(0, 'expenceParent');

				categoryText.selectionIndicator = true;
				categoryText.add(setCategoryData);

				/*var TotalResultSet = db.execute('SELECT COUNT(id) AS categorycount  FROM tbl_expence_category');
				var categorycount = TotalResultSet.fieldByName('categorycount');
				//customercount += 1;*/

				//console.log('categorycount ' + categorycount);

				//categoryText.setSelectedRow(0, categorycount, false);
				var categoryList = new Array;
				categoryList = getDataArray(0, 'expenceParent');
				var rowNo = returnRowNo(categoryList, createCategoryText.value);
				categoryText.setSelectedRow(0, rowNo+1, false);
				
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

		if (expenceCategory.value == undefined || expenceCategory.value == 0) {
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
//
			var dbData = {
				expence_sub_category : SubCategoryName,
				parent_category : expenceCategory.value,
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

				selectSubCategorydata = getCategoryPickerRows(expenceCategory.value, 'expenceSub');

				subCategoryText.selectionIndicator = true;
				subCategoryText.add(selectSubCategorydata);

				/*var TotalResultSet = db.execute('SELECT COUNT(id) AS subcategorycount  FROM tbl_expence_sub_category WHERE parent_category=' + categoryText.value);
				var subcategorycount = TotalResultSet.fieldByName('subcategorycount');*/
				//customercount += 1;

				//console.log('subcategorycount ' + subcategorycount);
				
				var subCategoryList = new Array;
				subCategoryList = getDataArray(expenceCategory.value, 'expenceSub');
				var rowNo = returnRowNo(subCategoryList, createSubCategoryText.value);
				console.log('rowno ' + rowNo);
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

	var VatWrapperView = Ti.UI.createView({
		visible : false,
		zIndex : 200,
	});
	// Full screen
	var VatBackgroundView = Ti.UI.createView({// Also full screen
		backgroundColor : '#000',
		opacity : 0.6
	});
	var VatContainerView = Ti.UI.createView({// Set height appropriately
		layout : 'vertical',
		width : '85%',
		height : Ti.UI.SIZE,//deviceHeight * 0.265,
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
	VatContainerView.add(viewVatpopuptitle);

	var expenseVatTextView = Ti.UI.createView({
		//backgroundColor : settingsbtncol,
		//backgroundSelectedColor : settingsbtnselectedcol,
		left : '1%',
		right : '1%',
		top : '2%',
		bottom : '0.5%',
		// height : deviceHeight * 0.11,
		height : settingOptionHeight,
	});
	
	/*var ManualOvrCheckBox = Ti.UI.createSwitch({
		style : Ti.UI.Android.SWITCH_STYLE_SWITCH,
		value : isManualVAT,
		right : 0,
		top : 0,
		height : 25,
		width : Ti.UI.SIZE,
		color : '#489CE0'
	});

	var ManualOvrTxtBox = Ti.UI.createLabel({
		text : 'Manually input VAT Amount',
		left : 0,
		top : 2,
		width : Ti.UI.SIZE,
		color : settingsbtnfontcolor
	});

	var ManualOvrView = Ti.UI.createView({
		left : '17dp',
		right : '13dp',
		top : 12,
		bottom : 5,
		height : 25,
		width : Ti.UI.FILL,
	});

	ManualOvrView.add(ManualOvrTxtBox);
	ManualOvrView.add(ManualOvrCheckBox);
	VatContainerView.add(ManualOvrView);
	
	ManualOvrCheckBox.addEventListener("change", function(e) {
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
	
	VatContainerView.add(vatTypeSelectionView);
	
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

	var expenseVatText = Ti.UI.createTextField({
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

	if (expenceOpt.value == 'New') {
		expenseVatText.value = vatPtg();
	} else {
		
		if(isManualVAT){
			expenseVatText.value = expenceVAT.value;
		} else {
			expenseVatText.value = expenceVATPresent.value;
		}
		
	}

	expenseVatTextView.add(expenseVatText);
	VatContainerView.add(expenseVatTextView);

	var btnExpenseVatView = Ti.UI.createView({
		//backgroundColor : settingsbtncol,
		//backgroundSelectedColor : settingsbtnselectedcol,
		left : '1%',
		right : '1%',
		top : '1%',
		bottom : '0.5%',
		// height : deviceHeight * 0.11,
		height : settingOptionHeight,
	});

	var btnExpenseVat = Ti.UI.createButton({
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

	btnExpenseVatView.add(btnExpenseVat);
	VatContainerView.add(btnExpenseVatView);

	VatWrapperView.add(VatBackgroundView);
	VatWrapperView.add(VatContainerView);

	//var getImage;
	changeVatBtn.addEventListener('click', function(e) {
		//console.log('change');
		VatWrapperView.show();
		mainExpenseView.scrollingEnabled = false;
	});

	imageVatpopupclose.addEventListener('click', function() {
		VatWrapperView.hide();
		mainExpenseView.scrollingEnabled = true;
		//VatText.value = vatPtg();
	});

	VatBackgroundView.addEventListener('click', function() {
		VatWrapperView.hide();
		mainExpenseView.scrollingEnabled = true;
	});

	btnExpenseVat.addEventListener('click', function(e) {	
		expenseVatText.blur();
		expenseVatText.blur();	
		VatWrapperView.hide();
		mainExpenseView.scrollingEnabled = true;
		var vatVal = expenseVatText.value;
		vatVal = vatVal * 1;
		var float = /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/;

		//console.log(float.test(vatVal));
		/*if (float.test(vatVal)) {			
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
				VatWrapperView.show();
				mainExpenseView.scrollingEnabled = false;
			}

		} else {
			alert('Please Add Numbers');
			VatWrapperView.show();
			mainExpenseView.scrollingEnabled = false;
		}*/

		if (float.test(vatVal)) {
			if (isManualVAT) {
				
				// Validation removed as per client requirement
				
				/*if (vatVal <= invoiceNetText.value) {
					vatLabel.text = 'VAT Amount ' + '(' + currencyType + ')';
					var invoiceNet = invoiceNetText.value;
					vatText.value = toDecimalFormatWithoutCurrency(vatVal);
					var totalValue = invoiceNet * 1 + vatVal * 1;
					invoiceTotalText.value = toDecimalFormatWithoutCurrency(Math.ceil(totalValue * 10000) / 10000);
				} else {
					alert('Please add an amount less than the Net Invoice value.');
					VatWrapperView.show();
					isManualVAT = false;
					switchActiveButton(1);				
					expenseVatText.value = vatPtg();
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
					VatWrapperView.show();
				}
			}
		} else {
			alert('Please enter a numerical value.');
			VatWrapperView.show();
		}
	});

	/********End Vat Popup*********/

	/*********Add Expence Image Popup***************/

	var expenseWrapperView = Ti.UI.createView({
		visible : false,
		zIndex : 200,
	});
	// Full screen
	var expenseBackgroundView = Ti.UI.createView({// Also full screen
		backgroundColor : '#000',
		opacity : 0.6
	});
	var expenseContainerView = Ti.UI.createView({// Set height appropriately
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
	expenseContainerView.add(view_popuptitle);

	var btnExpenseCameraView = Ti.UI.createView({
		backgroundColor : settingsbtncol,
		backgroundSelectedColor : settingsbtnselectedcol,
		left : '1%',
		right : '1%',
		top : '2%',
		bottom : '0.5%',
		// height : deviceHeight * 0.11,
		height : settingOptionHeight,
	});

	var lblExpenseCamera = Ti.UI.createLabel({
		text : 'Add From Camera',
		//width : '70%',
		color : settingsbtnfontcolor,
		left : '5%',
		font : {
			//fontFamily : customFont1,
			fontSize : stylefontsize,
		},
	});

	btnExpenseCameraView.add(lblExpenseCamera);
	expenseContainerView.add(btnExpenseCameraView);

	var btnExpenseGallerView = Ti.UI.createView({
		backgroundColor : settingsbtncol,
		backgroundSelectedColor : settingsbtnselectedcol,
		left : '1%',
		right : '1%',
		top : '1%',
		bottom : '0.5%',
		// height : deviceHeight * 0.11,
		height : settingOptionHeight,
	});

	var lblExpenseGallery = Ti.UI.createLabel({
		text : 'Add From Gallery',
		//width : '70%',
		color : settingsbtnfontcolor,
		left : '5%',
		font : {
			//fontFamily : customFont1,
			fontSize : stylefontsize,
		},
	});

	btnExpenseGallerView.add(lblExpenseGallery);
	expenseContainerView.add(btnExpenseGallerView);

	var btnExpenseremoveimgView = Ti.UI.createView({
		backgroundColor : settingsbtncol,
		backgroundSelectedColor : settingsbtnselectedcol,
		left : '1%',
		right : '1%',
		top : '1%',
		bottom : '0.5%',
		// height : deviceHeight * 0.11,
		height : settingOptionHeight,
	});

	var lblExpenseremoveimg = Ti.UI.createLabel({
		text : 'Remove Image',
		//width : '70%',
		color : settingsbtnfontcolor,
		left : '5%',
		font : {
			//fontFamily : customFont1,
			fontSize : stylefontsize,
		},
	});

	btnExpenseremoveimgView.add(lblExpenseremoveimg);
	expenseContainerView.add(btnExpenseremoveimgView);

	expenseWrapperView.add(expenseBackgroundView);
	expenseWrapperView.add(expenseContainerView);
	/********* EOF Add Invice Image Popup***************/

	var getImage;
	pictureText.addEventListener('click', function(e) {
		expenseWrapperView.show();
		mainExpenseView.scrollingEnabled = false;

	});

	// mainExpenseView.addEventListener('onload',function(e){
	// expenseWrapperView.hide();
	// AdhocVatWrapperView.hide();
	// mainExpenseView.scrollingEnabled = true;
	// });

	imagepopupclose.addEventListener('click', function() {
		expenseWrapperView.hide();
		mainExpenseView.scrollingEnabled = true;
	});

	expenseBackgroundView.addEventListener('click', function() {
		expenseWrapperView.hide();
		mainExpenseView.scrollingEnabled = true;
	});

	btnExpenseCameraView.addEventListener('click', function() {
		expenseWrapperView.hide();
		mainExpenseView.scrollingEnabled = true;
		var hasCameraPermissions = Ti.Media.hasCameraPermissions();
		if (hasCameraPermissions) {

			Ti.Media.showCamera({
				success : function(e) {
					var image = e.media;
					var max_width = 800;
					var max_height = 400;
					getImage = imageGetResize(image, max_width, max_height);
					console.log('Cam > getImage ' + getImage);
					//pictureText.height = 120;
					//addExpenceBtnView.top = 675;
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
							console.log('Cam > getImage ' + getImage);
							//pictureText.height = 120;
							//addExpenceBtnView.top = 675;
							pictureText.image = getImage;
						},
						allowEditing : true,
						mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
					});

				}
			});

		}
	});

	btnExpenseGallerView.addEventListener('click', function() {
		expenseWrapperView.hide();
		mainExpenseView.scrollingEnabled = true;
		//console.log('Gallery');

		Titanium.Media.openPhotoGallery({
			success : function(e) {
				var mediaImage = e.media;
				//'console.log('mediaImage >> ' + typeof mediaImage +' '+mediaImage);
				var max_width = 800;
				var max_height = 400;
				getImage = imageGetResize(mediaImage, max_width, max_height);

				//pictureText.height = 120;
				//addExpenceBtnView.top = 675;
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

	btnExpenseremoveimgView.addEventListener('click', function(argument) {

		pictureText.image = '/images/camera.png';
		//getImage = '';
		expencePicture.value = '/images/camera.png';
		expenseWrapperView.hide();
		mainExpenseView.scrollingEnabled = true;
	});

	categoryText.addEventListener('change', function(e) {
		categoryText.value = e.row.id;
		expenceCategory.value = e.row.id;
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
		subCategoryTextData = getCategoryPickerRows(e.row.id, 'expenceSub');
		//console.log ("00000 " + e.row.id);
		subCategoryText.add(subCategoryTextData);
		var subCatList = getDataArray(e.row.id, 'expenceSub');
		var defaultRowNo = returnRowNo(subCatList, 'General');
		subCategoryText.setSelectedRow(0, defaultRowNo, false);
		
		//subCategoryText.setSelectedRow(0, 0, false); add a select row
		
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

	function moveUP(element) {
		element.top = element.top - 45;
	}

	function moveDown(element) {
		element.top = element.top + 45;
	}

	for (x in bellowTaxElements) {
		moveUP(bellowTaxElements[x]);
	}
	
	function setVATapplication(isVATApply){
		if (isVATApply) {
			for (x in bellowTaxElements) {
				moveDown(bellowTaxElements[x]);
			}
			mainExpenseView.add(vatLabel);
			mainExpenseView.add(vatText);
			mainExpenseView.add(changeVatBtn);
			mainExpenseView.add(tempVatText);

		} else {

			mainExpenseView.remove(vatLabel);
			mainExpenseView.remove(vatText);
			mainExpenseView.remove(changeVatBtn);
			mainExpenseView.remove(tempVatText);

			for (x in bellowTaxElements) {
				moveUP(bellowTaxElements[x]);
			}
		}
	}
	
	function triggerChangeInVatSelectionEditLoad(isVATApplyVal){
		isVATApply = isVATApplyVal;
		Ti.API.info('VAT ROW ID : ' + isVATApply);
		setVATapplication(isVATApply);
		
		var vatVal = expenceVATPresent.value;
		vatLabel.text = 'VAT ' + vatVal + '% ' + '(' + currencyType + ')';
		var invoiceNet = invoiceNetText.value;
		invoiceNet = invoiceNet.replace(/,/g, '');
		tempVatText.value = vatVal;
		var invoiceVat;
		if(!isManualVAT){
			invoiceVat = (invoiceNet * vatVal) / 100;
			vatText.value = toDecimalFormatWithoutCurrency(invoiceVat);
			Ti.API.info('VAT IS NOT MANUAL!!!!! XXX' + vatText.value);
		} else {
			vatLabel.text = 'VAT Amount ' + '(' + currencyType + ')';
			Ti.API.info('VAT IS MANUAL!!!!!');
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
		Ti.API.info('VAT ROW ID : ' + isVATApply);
		setVATapplication(isVATApply);
		
		var vatVal = vatPtg();
		vatLabel.text = 'VAT ' + vatVal + '% ' + '(' + currencyType + ')';
		var invoiceNet = invoiceNetText.value;
		invoiceNet = invoiceNet.replace(/,/g, '');
		tempVatText.value = vatVal;
		var invoiceVat;
		if(!isManualVAT){
			invoiceVat = (invoiceNet * vatVal) / 100;
			vatText.value = toDecimalFormatWithoutCurrency(invoiceVat);
			Ti.API.info('VAT IS NOT MANUAL!!!!! XXX' + vatText.value);
		} else {
			vatLabel.text = 'VAT Amount ' + '(' + currencyType + ')';
			Ti.API.info('VAT IS MANUAL!!!!!');
		}
		var vat = vatText.value;
		vat = vat.replace(/,/g, '');
		var totalValue = invoiceNet * 1 + vat * 1;
		if(isVATApply == 0){
			totalValue = invoiceNet * 1;
		}
		invoiceTotalText.value = toDecimalFormatWithoutCurrency(Math.ceil(totalValue * 10000) / 10000);
	});

	subCategoryText.addEventListener('change', function(e) {
		if (e.row != null) {
			subCategoryText.value = e.row.id;
		}

	});

	selectAccountText.addEventListener('change', function(e) {
		selectAccountText.value = e.row.id;
	});

	/*selectProjectText.addEventListener('change', function(e) {
		selectProjectText.value = e.row.id;
	});*/

	// paymentModeText.addEventListener('change', function(e){
	// paymentModeText.value = e.row.id;
	// });
	invoiceNetText.addEventListener('focus', function() { //changed action to blur
			invoiceNetText.setSelection(0,invoiceNetText.value.length);
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
		//Ti.API.info('HELLO 1 : ' + invoiceNet);	
		//Ti.API.info('HELLO 2 : ' + totalValue);		
		//Ti.API.info('HELLO 3 : ' + toDecimalFormatWithoutCurrency(Math.ceil(totalValue * 10000) / 10000));
		
		invoiceTotalText.value = toDecimalFormatWithoutCurrency(Math.ceil(totalValue * 10000) / 10000);
	});

	//Calendar Popup for Entry date
	btnentryDate.addEventListener('click', function(e) {
		var entryDatePicker = Ti.UI.createPicker({
			//value:'02/05/2015',
		});
		var last_part2 = dateLabel.value;
		var day = last_part2.split("/")[0];
	    var month =  last_part2.split("/")[1];
	    var year =  last_part2.split("/")[2];
	    var selectedDatePicker = new Date(year, month-1, day);
	    
		entryDatePicker.showDatePickerDialog({
			value: selectedDatePicker,
			cancel : true,
			callback : function(e) {
				if (e.cancel) {
					Ti.API.info('user canceled dialog');
				} else {
					console.log(e.value);
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
					console.log(e.value);
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

	//Calendar Popup for Supplier Inv Date
	btnsupplierInvDateview.addEventListener('click', function(e) {

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
					//selectedDate = pickerYear + '-' + pickerMonth + '-' + pickerDate;
					selectedDate = pickerDate + '/' + pickerMonth + '/' + pickerYear;
					supplierInvDateText.value = selectedDate;
					supplierInvDatePicker.value = e.value;
					supplierInvDateText.blur();
				}
			}
		});

	});

	supplierInvDateText.addEventListener('singletap', function(e) {

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
					//selectedDate = pickerYear + '-' + pickerMonth + '-' + pickerDate;
					selectedDate = pickerDate + '/' + pickerMonth + '/' + pickerYear;
					supplierInvDateText.value = selectedDate;
					supplierInvDatePicker.value = e.value;
					supplierInvDateText.blur();
				}
			}
		});

	});

	saveBtn.addEventListener('click', function() {
		saveExpencesForm();
	});

	nextBtn.addEventListener('click', function() {
		/*var response=clearExpenceForm();
		console.log(response+' 000000000000000000000000');
		if (response == true){			
			expenceView.hide();
			Ti.App.fireEvent('editExpenceViewClose', 'e');
		}
		*/
		if (isFormNotEmpty()){
			var alertBoxDelete = Ti.UI.createAlertDialog({
					cancel : 1,
					buttonNames : ['Yes', 'No'],
					message : 'This expence form has unsaved data.\nAre you sure you want to close without saving?',
					title : 'Close without saving?'
				});
	
			alertBoxDelete.show();
				
			alertBoxDelete.addEventListener('click', function(event) {
				if (event.index === 0) {
					clearContent();
					expenceView.hide();
					Ti.App.fireEvent('editExpenceViewClose', 'e');
				}
			});
		}else{
			clearContent();
			expenceView.hide();
			Ti.App.fireEvent('editExpenceViewClose', 'e');
		}
		/*var invoiceNet = invoiceNetText.value;
		invoiceNet = invoiceNet.replace(/,/g, '');
		var invoiceTotal = invoiceTotalText.value;
		invoiceTotal = invoiceTotal.replace(/,/g, '');
		var vat = vatText.value;
		vat = vat.replace(/,/g, '');
		var paymentDateForSave = dateSaveChange(dateLabel.value);
		var SupInvDateForSave = (supplierInvDateText.value == "") ? "" : dateSaveChange(supplierInvDateText.value);
		var imageData = (getImage == undefined ) ? expencePicture.value : Ti.Utils.base64encode(getImage);

		if (addExpenseValidate()) {
			
			var dbData = {
				payment_date : paymentDateForSave,
				category_id : categoryText.value,
				sub_category_id : subCategoryText.value,
				account_id : selectAccountText.value,
				project_id : selectProjectText.value,
				net_amount : invoiceNet,
				vat : vat,
				total_amount : invoiceTotal,
				picture_path : imageData,
				//payment_mode_id : paymentModeText.value,
				supplier_inv_date : SupInvDateForSave,
				supplier_name : supplierNameText.value,
				supplier_inv_num : supplierInvNumberText.value,
				note : noteText.value,
				vat_presentage : (isManualVAT) ? 0 : tempVatText.value,
			};
			
			Ti.API.info('NEXT EXPENSE DATA : ' + JSON.stringify(dbData));

			var getResult = saveExpenseData(dbData);
			if (getResult) {				
				clearContent();
				mainExpenseView.scrollTo(0,0);
				var toast = Ti.UI.createNotification({
					message : "Save Successful",
					duration : Ti.UI.NOTIFICATION_DURATION_SHORT
				});
				toast.show();
			}
		}*/
	});

	cancelBtn.addEventListener('click', function() {
		//expenceView.hide();
		//clearContent();
		//Ti.App.fireEvent('editExpenceViewClose', 'e'); //client asked only to clear
		clearExpenceForm();
	});

	/*deleteBtn.addEventListener('click', function() {

	 var alertBoxDelete = Ti.UI.createAlertDialog({
	 cancel : 1,
	 buttonNames : ['Delete', 'Cancel'],
	 message : 'Do you want to delete the record?',
	 title : 'Delete Confirmation?'
	 });

	 alertBoxDelete.show();

	 alertBoxDelete.addEventListener('click', function(event) {

	 if (event.index === 0) {
	 var getResult = deleteExpenceData(expenceTableId.value);
	 if (getResult) {
	 Ti.App.fireEvent('refrishEditView', 'e');
	 expenceView.hide();
	 clearContent();
	 var toast = Ti.UI.createNotification({
	 message : "Record Deleted Successful",
	 duration : Ti.UI.NOTIFICATION_DURATION_SHORT
	 });
	 toast.show();

	 }
	 Ti.App.fireEvent('editExpenceViewClose', 'e');

	 }

	 });

	 }); */

	Ti.App.addEventListener('addExpenceViewClose', function(e) {
		isVATApply = 0;
		isManualVAT = false;
		expenceView.hide();
		clearContent();
		createCategoryWrapperView.hide();
		createSubCategoryWrapperView.hide();
		VatWrapperView.hide();
		expenseWrapperView.hide();
		calView.hide();
		mainExpenseView.scrollingEnabled = true;
	});

	Ti.App.addEventListener('editExpenceViewClose', function(e) {
		isVATApply = 0;
		isManualVAT = false;
		expenceView.hide();
		clearContent();
		createCategoryWrapperView.hide();
		createSubCategoryWrapperView.hide();
		VatWrapperView.hide();
		expenseWrapperView.hide();
		calView.hide();
		mainExpenseView.scrollingEnabled = true;
		expenceOpt.value = "New";

		expenceTitle.value = 'Add Expense';
		expenceEntryDate.value = getDate();
		expenceCategory.value = 0;
		expenceSubCategory.value = 0;
		expenceAccount.value = 0;

		expenceProject.value = '';
		expenceInvoiceNet.value = '0.00';

		expenceVATPresent.value = '';

		expenceVAT.value = '0.00';
		expenceInvoiceTotal.value = '0.00';
		//expencePaymentMode.value = 0;
		expencePicture.value = '/images/camera.png';
		expenceSuplierInvDate.value = '';
		expenceSupplierName.value = '';
		expenceSublierInvNum.value = '';
		expenceNote.value = '';
		expenceTableId.value = '';

	});

	expenceView.add(mainExpenseView);
	expenceView.add(addExpenceBtnView);
	expenceView.add(createCategoryWrapperView);
	expenceView.add(createSubCategoryWrapperView);
	expenceView.add(VatWrapperView);
	expenceView.add(expenseWrapperView);
	expenceView.add(calView);
	
	if(isManualVAT){
    	switchActiveButton(2);
    	Ti.API.info('IS MANUAL VAT');
    } else {
    	switchActiveButton(1);
    	Ti.API.info('IS NOT MANUAL VAT');
    }
    
	
	if (expenceOpt.value != 'New') {
		if (expenceVAT.value != '0.0' || expenceVATPresent.value != '0.0') {
			triggerChangeInVatSelectionEditLoad(1); // Select 'Yes' as VAT applies
			vatRequiredOption.setSelectedRow(0,1,false); // Select 'Yes' as VAT applies
			Ti.API.info(expenceVAT.value + 'VAT IS APPLICABLE!!!!!' + expenceVATPresent.value);
		}
	}
	
	if (expenceOpt.value == 'New') {
		enableUpdate();
		editBtn.visible = false;
		nextBtn.visible = true;
		saveBtn.visible = true;
		cancelBtn.visible = true;
	} else if (expenceOpt.value == 'View') {
		disableUpdate();
		editBtn.visible = true;
		nextBtn.visible = false;
		saveBtn.visible = false;
		cancelBtn.visible = false;
		//saveBtn.right = '0%';
		saveBtn.title = 'Update';
	} else if (expenceOpt.value == 'Update') {
		enableUpdate();
		editBtn.visible = false;
		nextBtn.visible = true;
		saveBtn.visible = true;
		cancelBtn.visible = true;
		//saveBtn.right = '0%';
		saveBtn.title = 'Update';
	}
	    
	return expenceView;

};

exports.setExpenceData = function(tableId, viewOption) {
	
	if(viewOption === null || viewOption === undefined || viewOption === ''){
		expenceOpt.value = 'Update'; // this is as the view option was added at a later time
		expenceTitle.value = 'Edit Expence';
	} else if (viewOption === 'Update'){
		expenceOpt.value = 'Update';
		expenceTitle.value = 'Edit Expence';
	} else if (viewOption === 'View'){
		expenceOpt.value = 'View';
		expenceTitle.value = 'View Expence';
	}
	editTransactionId = tableId;
	var expenceDataSet = db.execute('SELECT * FROM tbl_expence WHERE id = ' + tableId);
	
	//expenceTitle.value = 'Edit Expence';
	expenceEntryDate.value = changeDateView(expenceDataSet.fieldByName('payment_date'));
	expenceCategory.value = expenceDataSet.fieldByName('category_id');
	
	/*var subCategoryList = new Array;
	subCategoryList = getDataArrayId(expenceDataSet.fieldByName('category_id'), 'expenceSub');
	var rowNo = returnRowNo(subCategoryList, expenceDataSet.fieldByName('sub_category_id'));
	subCategoryText.setSelectedRow(0, rowNo+1, false);*/
	
	expenceSubCategory.value = expenceDataSet.fieldByName('sub_category_id');
	//console.log("subcat " + expenceSubCategory.value);
	expenceAccount.value = expenceDataSet.fieldByName('account_id');
	//selectAccountText.value = expenceDataSet.fieldByName('account_id');
	expenceProject.value = expenceDataSet.fieldByName('project_id');
	expenceInvoiceNet.value = expenceDataSet.fieldByName('net_amount');

	expenceVATPresent.value = expenceDataSet.fieldByName('vat_presentage'); //(expenceDataSet.fieldByName('vat_presentage') == '0') ? expenceDataSet.fieldByName('vat') : expenceDataSet.fieldByName('vat_presentage') ;

	expenceVAT.value = expenceDataSet.fieldByName('vat');
	expenceInvoiceTotal.value = expenceDataSet.fieldByName('total_amount');
	//expencePaymentMode.value = expenceDataSet.fieldByName('payment_mode_id');
	expencePicture.value = expenceDataSet.fieldByName('picture_path');
	expenceSuplierInvDate.value = (expenceDataSet.fieldByName('supplier_inv_date') == "") ? "" : changeDateView(expenceDataSet.fieldByName('supplier_inv_date'));
	expenceSupplierName.value = expenceDataSet.fieldByName('supplier_name');
	expenceSublierInvNum.value = expenceDataSet.fieldByName('supplier_inv_num');
	expenceNote.value = expenceDataSet.fieldByName('note');
	//expenceOpt.value = "Update";
	expenceTableId.value = expenceDataSet.fieldByName('id');
	if (expenceVAT.value != '0.0' && expenceVATPresent.value == '0.0') {
		isManualVAT = true;
		//Ti.API.info(expenceVAT.value + 'VAT IS MANUAL!!!!!' + expenceVATPresent.value);
	} else {
		isManualVAT = false;
		//Ti.API.info(expenceVAT.value + 'VAT IS NOT MANUAL!!!!!' + expenceVATPresent.value);
	}
		
};
