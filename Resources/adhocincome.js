var adhocIncomeTableId = Ti.UI.createTextField({
	value : '',
	visible : false,
});
var adhocIncomeTitle = Ti.UI.createTextField({
	value : 'Add Other Bank Receipts',
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
var adhocIncomeAccount = Ti.UI.createTextField({
	value : 0,
	visible : false,
});
var adhocIncomeProject = Ti.UI.createTextField({
	value : 0,
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
var adhocIncomeOpt = Ti.UI.createTextField({
	value : 'New',
	visible : false,
});
var isManualVAT = false;
var isVATApply = 0;
var bellowTaxElements = [];

exports.Adhocincome = function() {

	var calcultor = require('calculator');
	var calView = calcultor.calculatorView();

	function saveAdhocIncomeData(dbData) {
		var db = Ti.Database.open('mywallet');
		db.execute('INSERT INTO tbl_income(payment_date, category_id, sub_category_id, account_id, project_id, net_amount, vat, total_amount, picture_path, customer_name,note,vat_presentage) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)', dbData.payment_date, dbData.category_id, dbData.sub_category_id, dbData.account_id, dbData.project_id, dbData.net_amount, dbData.vat, dbData.total_amount, dbData.picture_path, dbData.customer_name, dbData.note, dbData.vat_presentage);
		db.close();
		return true;
	}

	function updateAdhocIncomeData(dbData, tableID) {
		var db = Ti.Database.open('mywallet');
		db.execute('UPDATE tbl_income SET payment_date="' + dbData.payment_date + '", category_id=' + dbData.category_id + ', sub_category_id=' + dbData.sub_category_id + ', account_id=' + dbData.account_id + ', project_id=' + dbData.project_id + ', net_amount="' + dbData.net_amount + '", vat="' + dbData.vat + '", total_amount="' + dbData.total_amount + '", picture_path="' + dbData.picture_path + '", customer_name="' + dbData.customer_name + '", note="' + dbData.note + '", vat_presentage="' + dbData.vat_presentage + '" WHERE id = ' + tableID);
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

	function clearContent() {

		dateLabel.value = getDate();
		categoryText.setSelectedRow(0, 0, false);
		var _col = subCategoryText.columns[0];
		var len = _col.rowCount;
		for (var x = len - 1; x >= 1; x--) {
			var _row = _col.rows[x];
			_col.removeRow(_row);
		}

		//subCategoryText.value = '';
		//selectAccountText.setSelectedRow(0, 0, false);
		selectProjectText.setSelectedRow(0, 0, false);
		invoiceNetText.value = '0.00';
		vatText.value = '';
		invoiceTotalText.value = '';
		pictureText.image = '/images/camera.png';
		noteText.value = '';
		noteText.blur();
		customerNameText.setSelectedRow(0, 0, false);
		vatRequiredOption.setSelectedRow(0,0);
		isManualVAT = false;
		switchActiveButton(1);
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

	// Validate Content before Save
	function adhocIncomeRecordValidate() {
		var validated = false;
		var floatRex = /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/;
		var invoiceNet = invoiceNetText.value;
		invoiceNet = invoiceNet.replace(/,/g, '');

		var netTotal = invoiceNetText.value;
		var vatValue = vatText.value;
		if (categoryText.getSelectedRow(0).id == 0) {
			var dialog1 = Ti.UI.createAlertDialog({
				title : 'Alert',
				message : 'Please Select Category',
				ok : 'OK',
			});
			dialog1.show();
		} else if (subCategoryText.getSelectedRow(0).id == 0) {
			var dialog2 = Ti.UI.createAlertDialog({
				title : 'Alert',
				message : 'Please Select Sub Category',
				ok : 'Ok',
			});
			dialog2.show();
		} else if (selectAccountText.getSelectedRow(0).id == 0) {
			var dialog3 = Ti.UI.createAlertDialog({
				title : 'Alert',
				message : 'Please Select Account',
				ok : 'Ok',
			});
			dialog3.show();
			// } else if (selectProjectText.value == undefined || selectProjectText.value == '') {
			// var dialog4 = Ti.UI.createAlertDialog({
			// title : 'Alert',
			// message : 'Please Select Project',
			// ok : 'Ok',
			// });
			// dialog4.show();
		} else if (invoiceNetText.value == '0.00') {
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

	var adhocIncomeView = Ti.UI.createView({
		height : '100%',
		width : '100%',
		visible : false,
		backgroundColor : '#fff',
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
		adhocIncomeView.hide();
		clearContent();
		Ti.App.fireEvent('editAdhocIncomeViewClose', 'e');
	});

	var lbltitle = Ti.UI.createLabel({
		text : adhocIncomeTitle.value,
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
	adhocIncomeView.add(view_title);

	adhocIncomeView.add(adhocIncomeTableId);
	adhocIncomeView.add(adhocIncomeTitle);
	adhocIncomeView.add(adhocIncomeEntryDate);
	adhocIncomeView.add(adhocIncomeCategory);
	adhocIncomeView.add(adhocIncomeSubCategory);
	adhocIncomeView.add(adhocIncomeAccount);
	adhocIncomeView.add(adhocIncomeProject);
	adhocIncomeView.add(adhocIncomeInvoiceNet);
	adhocIncomeView.add(adhocIncomeVATPresent);
	adhocIncomeView.add(adhocIncomeVAT);
	adhocIncomeView.add(adhocIncomeInvoiceTotal);
	adhocIncomeView.add(adhocIncomePicture);
	adhocIncomeView.add(adhocIncomeCustomerName);
	adhocIncomeView.add(adhocIncomeNote);
	adhocIncomeView.add(adhocIncomeOpt);

	var mainAdhocView = Ti.UI.createScrollView({
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

	var dateLabel = Ti.UI.createTextField({
		value : adhocIncomeEntryDate.value,
		//color : '#000',
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

	var btnentryDate = Ti.UI.createView({
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

	var imgentryDate = Ti.UI.createImageView({
		width : '70%',
		image : '/images/calendar.png',
	});
	btnentryDate.add(imgentryDate);

	var categoryLabel = Ti.UI.createLabel({
		text : 'Category *',
		color : '#000',
		top : 95,
		left : '2%',
		width : '37%',
		height : 40,
	});

	var categoryText = Ti.UI.createPicker({
		top : 95,
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
	console.log('adhoc expCatIndex :' + adhocCatIndex);
	categoryText.setSelectedRow(0, adhocCatIndex);

	/*var btnaddcategory = Ti.UI.createView({
	 //type:Ti.UI.PICKER_TYPE_DATE,
	 backgroundColor : '#A0A0A0',
	 top : 50,
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
	 btnaddcategory.add(imgaddcategory);*/

	var subCategoryLabel = Ti.UI.createLabel({
		text : 'Sub Category *',
		color : '#000',
		top : 140,
		left : '2%',
		width : '37%',
		height : 40,

	});

	var subCategoryText = Ti.UI.createPicker({
		top : 140,
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
		top : 140,
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
	btnaddsubCategory.add(imgaddsubCategory);

	// Account section Listing
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

	if(adhocIncomeOpt.value == 'New'){
		if(defaultAccountValueRow === null){
			selectAccountText.setSelectedRow(0, adhocIncomeAccount.value);
		} else {
			selectAccountText.setSelectedRow(0, defaultAccountValueRow);
			selectAccountText.value = defaultAccountValueRow;
		}
	} else {
		selectAccountText.setSelectedRow(0, adhocIncomeAccount.value);
	}

	//selectAccountText.setSelectedRow(0, adhocIncomeAccount.value);
	// EOF Account section Listing

	var invoiceNetLabel = Ti.UI.createLabel({
		text : 'Amount Received *',
		color : '#000',
		top : 185,
		left : '2%',
		width : '37%',
		height : 40,
	});

	var invoiceNetText = Ti.UI.createTextField({
		backgroundColor : '#A0A0A0',
		top : 185,
		left : '41%',
		width : '57%',
		height : 40,
		//focusable:true,
		//keyboardType:Ti.UI.KEYBOARD_NUMBER_PAD,
		editable : false,
		value : toDecimalFormatWithoutCurrency(adhocIncomeInvoiceNet.value * 1),
	});

	invoiceNetText.addEventListener('singletap', function() {
		calcultor.setTxtObj(invoiceNetText);
		calView.show();
	});

	// Category list view
	var vatRequiredLabel = Ti.UI.createLabel({
		text : 'Does VAT apply *',
		color : '#000',
		top : 230,
		left : '2%',
		width : '37%',
		height : 40,
	});

	var vatRequiredOption = Ti.UI.createPicker({
		top : 230,
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
	
	function setVATapplication(isVATApply){
		if (isVATApply) {
			for (x in bellowTaxElements) {
				moveDown(bellowTaxElements[x]);
			}
			mainAdhocView.add(vatLabel);
			mainAdhocView.add(vatText);
			mainAdhocView.add(changeadhocincomeVatBtn);
			mainAdhocView.add(tempVatText);

		} else {

			mainAdhocView.remove(vatLabel);
			mainAdhocView.remove(vatText);
			mainAdhocView.remove(changeadhocincomeVatBtn);
			mainAdhocView.remove(tempVatText);

			for (x in bellowTaxElements) {
				moveUP(bellowTaxElements[x]);
			}

		}
	}
	
	function triggerChangeInVatSelectionEditLoad(isVATApplyVal){
		isVATApply = isVATApplyVal;
		setVATapplication(isVATApply);
		var vatVal = adhocIncomeVATPresent.value;
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
		//vatText.value = toDecimalFormatWithoutCurrency(invoiceVat);
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
		} else {
			vatLabel.text = 'VAT Amount ' + '(' + currencyType + ')';
		}
		//vatText.value = toDecimalFormatWithoutCurrency(invoiceVat);
		var vat = vatText.value;
		vat = vat.replace(/,/g, '');
		var totalValue = invoiceNet * 1 + vat * 1;
		if(isVATApply == 0){
			totalValue = invoiceNet * 1;
		}
		invoiceTotalText.value = toDecimalFormatWithoutCurrency(Math.ceil(totalValue * 10000) / 10000);
	});

	var vatLabel = Ti.UI.createLabel({
		//text : 'VAT ' + vatPtg() + '%',
		color : '#000',
		top : 275,
		left : '2%',
		width : '37%',
		height : 40,

	});

	if (adhocIncomeOpt.value == 'New') {
		vatLabel.text = 'VAT ' + vatPtg() + '%  (' + currencyType + ')';
	} else {
		vatLabel.text = 'VAT ' + adhocIncomeVATPresent.value + '%  (' + currencyType + ')';
	}

	var vatText = Ti.UI.createTextField({
		backgroundColor : '#A0A0A0',
		top : 275,
		left : '41%',
		width : '43%',
		height : 40,
		focusable : true,
		editable : false,
		keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		value : toDecimalFormatWithoutCurrency(adhocIncomeVAT.value * 1),
	});

	var changeadhocincomeVatBtn = Ti.UI.createView({
		//title:'V',
		// image:'',
		backgroundColor : '#A0A0A0',
		top : 275,
		left : '86%',
		width : '12%',
		height : 40,
	});

	var imgadhocincomechangeVat = Ti.UI.createImageView({
		width : '60%',
		image : '/images/edit_white.png',
	});
	changeadhocincomeVatBtn.add(imgadhocincomechangeVat);

	var tempVatText = Ti.UI.createTextField({
		//value : vatPtg(),
		visible : false,

	});

	if (adhocIncomeOpt.value == 'New') {
		tempVatText.value = vatPtg();
	} else {
		tempVatText.value = adhocIncomeVATPresent.value;
	}

	var invoiceTotalLabel = Ti.UI.createLabel({
		text : 'Total Received',
		color : '#000',
		top : 320,
		left : '2%',
		width : '37%',
		height : 40,

	});
	bellowTaxElements.push(invoiceTotalLabel);

	var invoiceTotalText = Ti.UI.createTextField({
		backgroundColor : '#A0A0A0',
		top : 320,
		left : '41%',
		width : '57%',
		height : 40,
		editable : false,
		value : toDecimalFormatWithoutCurrency(adhocIncomeInvoiceTotal.value * 1),
	});
	bellowTaxElements.push(invoiceTotalText);

	// var pictureBtn = Ti.UI.createButton({
	// title:'',
	// backgroundColor:'#A0A0A0',
	// top:365,
	// left:'82%',
	// width:'25%',
	// height:40,
	//
	// });

	var customerNameLabel = Ti.UI.createLabel({
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

	//customerNameText.setSelectedRow(0, adhocIncomeCustomerName.value);

	// Project list
	var selectProjectLabel = Ti.UI.createLabel({
		text : "Internal Ref. No", //'Select Project',
		color : '#000',
		top : 365,
		left : '2%',
		width : '37%',
		height : 40,
	});
	bellowTaxElements.push(selectProjectLabel);

	var selectProjectText = Ti.UI.createPicker({
		top : 365,
		left : '41%',
		width : '57%',
		height : 40,
		backgroundColor : '#A0A0A0',
	});
	bellowTaxElements.push(selectProjectText);

	var getTableProjectData = db.execute('SELECT * FROM tbl_project WHERE enable = 1');

	var tableProjectData = [];
	var i = 1;
	tableProjectData[0] = Ti.UI.createPickerRow({
		id : '0',
		title : 'Please Select'
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

	selectProjectText.setSelectedRow(0, adhocIncomeProject.value);

	var noteLabel = Ti.UI.createLabel({
		text : 'Note',
		color : '#000',
		top : 410,
		left : '2%',
		width : '37%',
		height : 40,

	});
	bellowTaxElements.push(noteLabel);

	// var noteText = Ti.UI.createTextField({
	// backgroundColor : '#A0A0A0',
	// top : 535,
	// left : '41%',
	// width : '57%',
	// height : 40,
	// value: adhocIncomeNote.value,
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
		top : 410,
		left : '41%',
		width : '57%',
		height : 120,
		value : adhocIncomeNote.value,
	});
	bellowTaxElements.push(noteText);

	var pictureLabel = Ti.UI.createLabel({
		text : 'Picture',
		color : '#000',
		top : 535,
		left : '2%',
		width : '37%',
		height : 40,

	});
	bellowTaxElements.push(pictureLabel);

	console.log('adhocIncomePictureTest >> ' + adhocIncomePicture.value);

	var pictureText = Ti.UI.createImageView({
		backgroundColor : '#A0A0A0',
		top : 535,
		left : '41%',
		width : '57%',
		height : 120,
		bottom : 50,
		image : (adhocIncomePicture.value == '/images/camera.png') ? adhocIncomePicture.value : Ti.Utils.base64decode(adhocIncomePicture.value),
	});
	bellowTaxElements.push(pictureText);

	var incomeInvoiceBtnView = Ti.UI.createView({
		//top : 660,
		bottom : 0,
		width : '100%',
		height : appPixel * 7.5,
		backgroundColor : '#054e62'
	});
	//bellowTaxElements.push(incomeInvoiceBtnView);

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

	/*if (adhocIncomeOpt.value == 'Update') {
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
		lbltitle.text = 'Edit Other Bank Receipt';
	});
	
	var disableLayer =  Ti.UI.createView({
		//backgroundColor : 'pink',
		opacity : 0.7,
		width : '100%',
		height : '100%',
	});
	
	function enableUpdate(){
		try{
			mainAdhocView.remove(disableLayer);
		} catch (e) {
			Ti.API.info('Unable to remove disable layer');
		}		
	}
	
	function disableUpdate(){		
		mainAdhocView.add(disableLayer);
	}

	incomeInvoiceBtnView.add(cancelBtn);
	incomeInvoiceBtnView.add(saveBtn);
	incomeInvoiceBtnView.add(editBtn);
	incomeInvoiceBtnView.add(nextBtn);

	// var quitBtn = Ti.UI.createButton({
	// title:'Quit',
	// top:580,
	// left:'82%',
	// width:'18%',
	// font:{ fontSize:11 },
	// });

	mainAdhocView.add(entryDateLabel);
	mainAdhocView.add(dateLabel);
	mainAdhocView.add(btnentryDate);
	mainAdhocView.add(categoryLabel);
	mainAdhocView.add(categoryText);
	//mainAdhocView.add(btnaddcategory);
	mainAdhocView.add(subCategoryLabel);
	mainAdhocView.add(subCategoryText);
	mainAdhocView.add(btnaddsubCategory);
	mainAdhocView.add(selectAccountLabel);
	mainAdhocView.add(selectAccountText);
	mainAdhocView.add(selectProjectLabel);
	mainAdhocView.add(selectProjectText);
	mainAdhocView.add(invoiceNetLabel);
	mainAdhocView.add(invoiceNetText);
	//mainAdhocView.add(vatLabel);
	//mainAdhocView.add(vatText);
	//mainAdhocView.add(changeadhocincomeVatBtn);
	mainAdhocView.add(invoiceTotalLabel);
	mainAdhocView.add(invoiceTotalText);
	mainAdhocView.add(pictureLabel);
	mainAdhocView.add(pictureText);
	//mainAdhocView.add(customerNameLabel);
	//mainAdhocView.add(customerNameText);
	mainAdhocView.add(noteLabel);
	mainAdhocView.add(noteText);
	mainAdhocView.add(tempVatText);
	mainAdhocView.add(vatRequiredLabel);
	mainAdhocView.add(vatRequiredOption);
	//Button
	//mainAdhocView.add(incomeInvoiceBtnView);
	//mainAdhocView.add(quitBtn);

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
	 //mainAdhocView.scrollingEnabled = false;
	 });*/

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
				income_category : CategoryName,
				enable : '1',

			};

			var getResult = saveCategoryData(dbData);

			if (getResult) {

				if (categoryText.columns[0]) {
					var _col = categoryText.columns[0];
					var len = _col.rowCount;
					for (var x = len - 1; x >= 0; x--) {
						var _row = _col.rows[x];
						_col.removeRow(_row);
					}
					//picker.reloadColumn(_col);
				}

				var setCategoryData = [];

				setCategoryData = getCategoryData();

				categoryText.selectionIndicator = true;
				categoryText.add(setCategoryData);

				var TotalResultSet = db.execute('SELECT COUNT(id) AS categorycount  FROM tbl_income_category');
				var categorycount = TotalResultSet.fieldByName('categorycount');
				//customercount += 1;

				console.log('categorycount ' + categorycount);

				categoryText.setSelectedRow(0, categorycount, false);
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
				income_sub_category : SubCategoryName,
				parent_category : categoryText.value,
				enable : '1',

			};

			var getResult = saveSubCategoryData(dbData);

			if (getResult) {

				if (subCategoryText.columns[0]) {
					var _col = subCategoryText.columns[0];
					var len = _col.rowCount;
					for (var x = len - 1; x >= 0; x--) {
						var _row = _col.rows[x];
						_col.removeRow(_row);
					}
					//picker.reloadColumn(_col);
				}

				var selectCategorydata = [];

				selectSubCategorydata = getSubCategoryData(categoryText.value);

				subCategoryText.selectionIndicator = true;
				subCategoryText.add(selectSubCategorydata);

				var TotalResultSet = db.execute('SELECT COUNT(id) AS subcategorycount  FROM tbl_income_sub_category WHERE parent_category=' + categoryText.value);
				var subcategorycount = TotalResultSet.fieldByName('subcategorycount');
				//customercount += 1;

				console.log('subcategorycount ' + subcategorycount);

				subCategoryText.setSelectedRow(0, subcategorycount, false);
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

	if (adhocIncomeOpt.value == 'New') {
		AdhocVatText.value = vatPtg();
	} else {
		if(isManualVAT){
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
	changeadhocincomeVatBtn.addEventListener('click', function(e) {
		//console.log('change');
		AdhocVatWrapperView.show();
		mainAdhocView.scrollingEnabled = false;
	});

	imageVatpopupclose.addEventListener('click', function() {
		AdhocVatWrapperView.hide();
		mainAdhocView.scrollingEnabled = true;
		//AdhocVatText.value = vatPtg();
	});

	AdhocVatBackgroundView.addEventListener('click', function() {
		AdhocVatWrapperView.hide();
		mainAdhocView.scrollingEnabled = true;
	});

	btnAdhocVat.addEventListener('click', function(e) {

		AdhocVatWrapperView.hide();
		mainAdhocView.scrollingEnabled = true;
		var vatVal = AdhocVatText.value;
		vatVal = vatVal * 1;
		var float = /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/;

		console.log(float.test(vatVal));
		if (float.test(vatVal)) {
			if(isManualVAT){
				//Validation removed as per client requiremet
				/*if(vatVal < invoiceNetText.value){
					vatLabel.text = 'VAT Amount ' + '(' + currencyType + ')';
					var invoiceNet = invoiceNetText.value;
					vatText.value = toDecimalFormatWithoutCurrency(vatVal);
					var totalValue = invoiceNet * 1 + vatVal * 1;
					invoiceTotalText.value = toDecimalFormatWithoutCurrency(Math.ceil(totalValue * 10000) / 10000);
				} else {
					alert('Please add an amount less than the Net Invoice value.');
					AdhocVatWrapperView.show();
					isManualVAT = false;
					switchActiveButton(1);					
					AdhocVatText.value = vatPtg();
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
					AdhocVatWrapperView.show();
					mainAdhocView.scrollingEnabled = false;
				}
			}
		} else {
			alert('Please Add Numbers');
			AdhocVatWrapperView.show();
			mainAdhocView.scrollingEnabled = false;
		}

	});

	/********End Vat Popup*********/

	categoryText.addEventListener('change', function(e) {
		categoryText.value = e.row.id;
		console.log(e.row.id);
		// getSubCategoryData(e.row.id);
		if (subCategoryText.columns[0]) {
			var _col = subCategoryText.columns[0];
			var len = _col.rowCount;
			for (var x = len - 1; x >= 0; x--) {
				var _row = _col.rows[x];
				_col.removeRow(_row);
			}
			//picker.reloadColumn(_col);
		}

		subCategoryTextDataSelect = getSubCategoryData(e.row.id);

		subCategoryText.add(subCategoryTextDataSelect);
		//subCategoryText.setSelectedRow(0, 1, false);

	});

	subCategoryText.addEventListener('change', function(e) {
		if (e.row != null) {
			subCategoryText.value = e.row.id;
		}

	});

	selectAccountText.addEventListener('change', function(e) {
		selectAccountText.value = e.row.id;
	});

	selectProjectText.addEventListener('change', function(e) {
		selectProjectText.value = e.row.id;
	});

	customerNameText.addEventListener('change', function(e) {
		customerNameText.value = e.row.id;
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
		//var totalVal
		invoiceTotalText.value = toDecimalFormatWithoutCurrency(Math.ceil(totalValue * 10000) / 10000);
	});

	vatText.addEventListener('change', function() {
		var invoiceNet = invoiceNetText.value;
		invoiceNet = invoiceNet.replace(/,/g, '');
		var vat = vatText.value;
		vat = vat.replace(/,/g, '');
		var totalValue = invoiceNet * 1 + vat * 1;
		if(isVATApply == 0){
			totalValue = invoiceNet * 1;
		}
		invoiceTotalText.value = toDecimalFormatWithoutCurrency(Math.ceil(totalValue * 10000) / 10000);
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
	pictureText.addEventListener('click', function(e) {
		AdhocwrapperView.show();
		mainAdhocView.scrollingEnabled = false;
	});

	mainAdhocView.addEventListener('onload', function(e) {
		AdhocwrapperView.hide();
		AdhocVatWrapperView.hide();
		mainAdhocView.scrollingEnabled = true;
	});

	imagepopupclose.addEventListener('click', function() {
		AdhocwrapperView.hide();
		mainAdhocView.scrollingEnabled = true;
	});

	AdhocbackgroundView.addEventListener('click', function() {
		AdhocwrapperView.hide();
		mainAdhocView.scrollingEnabled = true;
	});

	btnAdhocCameraView.addEventListener('click', function() {
		AdhocwrapperView.hide();
		mainAdhocView.scrollingEnabled = true;

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

	btnAdhocGallerView.addEventListener('click', function() {
		AdhocwrapperView.hide();
		mainAdhocView.scrollingEnabled = true;

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

	btnAdhocremoveimgView.addEventListener('click', function(argument) {
		pictureText.image = '/images/camera.png';
		adhocIncomePicture.value = '/images/camera.png';
		AdhocwrapperView.hide();
		mainAdhocView.scrollingEnabled = true;
	});

	//Calendar Popup for Entry date
	btnentryDate.addEventListener('click', function(e) {
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
					var dateObj = e.value;
					var pickerDate = (dateObj.getDate() < 10) ? '0' + dateObj.getDate() : dateObj.getDate();
					var pickerMonth = (dateObj.getMonth() + 1) < 10 ? '0' + (dateObj.getMonth() + 1) : dateObj.getMonth() + 1;
					var pickerYear = dateObj.getFullYear();

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
		
		if(isVATApply == 0){
			Ti.API.info('VAT APPLICATION ENFORCED ' + isVATApply);
			tempVatText.value = 0;
			vatText.value = '0.00';
		}

		var invoiceNet = invoiceNetText.value;
		invoiceNet = invoiceNet.replace(/,/g, '');
		var invoiceTotal = invoiceTotalText.value;
		invoiceTotal = invoiceTotal.replace(/,/g, '');
		var vat = vatText.value;
		vat = vat.replace(/,/g, '');

		var dateForSave = dateSaveChange(dateLabel.value);

		console.log('Selec Account ' + selectAccountText.value);

		var imageData = (getImage == undefined ) ? adhocIncomePicture.value : Ti.Utils.base64encode(getImage);

		// if content validated
		if (adhocIncomeRecordValidate()) {
			var dbData = {
				payment_date : dateForSave,
				category_id : categoryText.getSelectedRow(0).id,
				sub_category_id : subCategoryText.getSelectedRow(0).id,
				account_id : selectAccountText.getSelectedRow(0).id,
				project_id : selectProjectText.getSelectedRow(0).id,
				net_amount : invoiceNet,
				vat : vat,
				total_amount : invoiceTotal,
				picture_path : imageData,
				customer_name : 'N/A',//customerNameText.getSelectedRow(0).id,
				note : noteText.value,
				vat_presentage : (isManualVAT) ? 0 : tempVatText.value,
			};

			if (adhocIncomeOpt.value == "Update") {
				var getResult = updateAdhocIncomeData(dbData, adhocIncomeTableId.value);
				Ti.App.fireEvent('refrishEditView', 'e');
				if (getResult) {
					clearContent();
					adhocIncomeView.hide();
					var toast = Ti.UI.createNotification({
						message : "Update Successful",
						duration : Ti.UI.NOTIFICATION_DURATION_SHORT
					});
					toast.show();
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
					clearContent();
					adhocIncomeView.hide();
				}

			}
			Ti.App.fireEvent('editAdhocIncomeViewClose', 'e');
		}

	});

	nextBtn.addEventListener('click', function(e) {

		var invoiceNet = invoiceNetText.value;
		invoiceNet = invoiceNet.replace(/,/g, '');
		var invoiceTotal = invoiceTotalText.value;
		invoiceTotal = invoiceTotal.replace(/,/g, '');
		var vat = vatText.value;
		vat = vat.replace(/,/g, '');
		var dateForSave = dateSaveChange(dateLabel.value);
		var imageData = (getImage == undefined ) ? adhocIncomePicture.value : Ti.Utils.base64encode(getImage);

		// if content validated
		if (adhocIncomeRecordValidate()) {
			var dbData = {
				payment_date : dateForSave,
				category_id : categoryText.value,
				sub_category_id : subCategoryText.value,
				account_id : selectAccountText.value,
				project_id : selectProjectText.value,
				net_amount : invoiceNet,
				vat : vat,
				total_amount : invoiceTotal,
				picture_path : imageData,
				customer_name : customerNameText.value,
				note : noteText.value,
				vat_presentage : tempVatText.value,
			};

			var getResult = saveAdhocIncomeData(dbData);

			if (getResult) {
				clearContent();
				mainAdhocView.scrollTo(0,0);
				var toast = Ti.UI.createNotification({
					message : "Save Successful",
					duration : Ti.UI.NOTIFICATION_DURATION_SHORT
				});
				toast.show();
			}
		}
	});

	cancelBtn.addEventListener('click', function() {
		adhocIncomeView.hide();
		clearContent();
		Ti.App.fireEvent('editAdhocIncomeViewClose', 'e');
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
	 var getResult = deleteAdhocIncomeData(adhocIncomeTableId.value);
	 if (getResult) {
	 Ti.App.fireEvent('refrishEditView', 'e');
	 adhocIncomeView.hide();
	 clearContent();
	 var toast = Ti.UI.createNotification({
	 message : "Record Deleted Successfuly",
	 duration : Ti.UI.NOTIFICATION_DURATION_SHORT
	 });
	 toast.show();

	 }
	 Ti.App.fireEvent('editAdhocIncomeViewClose', 'e');
	 }
	 });

	 }); */

	Ti.App.addEventListener('addAdhocIncomeViewClose', function(e) {
		isVATApply = 0;
		isManualVAT = false;
		adhocIncomeView.hide();
		clearContent();
		AdhocwrapperView.hide();
		AdhocVatWrapperView.hide();
		createCategoryWrapperView.hide();
		createSubCategoryWrapperView.hide();
		calView.hide();
		mainAdhocView.scrollingEnabled = true;
	});

	Ti.App.addEventListener('editAdhocIncomeViewClose', function(e) {
		isVATApply = 0;
		isManualVAT = false;
		adhocIncomeView.hide();
		clearContent();
		AdhocwrapperView.hide();
		AdhocVatWrapperView.hide();
		createCategoryWrapperView.hide();
		createSubCategoryWrapperView.hide();
		calView.hide();
		mainAdhocView.scrollingEnabled = true;

		adhocIncomeTableId.value = '';
		adhocIncomeTitle.value = 'Add Other Bank Receipts';
		adhocIncomeEntryDate.value = getDate();
		adhocIncomeCategory.value = 0;
		adhocIncomeSubCategory.value = 0;
		adhocIncomeAccount.value = 0;
		adhocIncomeProject.value = '';
		adhocIncomeInvoiceNet.value = '0.00';
		adhocIncomeVATPresent.value = '';
		adhocIncomeVAT.value = '0.00';
		adhocIncomeInvoiceTotal.value = '0.00';

		adhocIncomePicture.value = '/images/camera.png';
		adhocIncomeCustomerName.value = 0;

		adhocIncomeNote.value = '';
		adhocIncomeOpt.value = 'New';
	});

	adhocIncomeView.add(mainAdhocView);
	adhocIncomeView.add(incomeInvoiceBtnView);
	adhocIncomeView.add(AdhocwrapperView);
	adhocIncomeView.add(AdhocVatWrapperView);
	adhocIncomeView.add(createCategoryWrapperView);
	adhocIncomeView.add(createSubCategoryWrapperView);
	adhocIncomeView.add(calView);

	// var mainViews = [];
	// mainViews['mainAdhocView'] = mainAdhocView;
	// mainViews['wrapperView'] = AdhocwrapperView;
	// mainViews['AdhocVatWrapperView'] = AdhocVatWrapperView;
	// mainViews['calView'] = calView;

	for (x in bellowTaxElements) {
		moveUP(bellowTaxElements[x]);
	}
	
	if(isManualVAT){
    	switchActiveButton(2);
    	Ti.API.info('IS MANUAL VAT');
    } else {
    	switchActiveButton(1);
    	Ti.API.info('IS NOT MANUAL VAT');
    }
    
    if (adhocIncomeOpt.value != 'New') {
		if (adhocIncomeVAT.value != '0.0' || adhocIncomeVATPresent.value != '0.0') {
			triggerChangeInVatSelectionEditLoad(1); // Select 'Yes' as VAT applies
			vatRequiredOption.setSelectedRow(0,1,false); // Select 'Yes' as VAT applies
		}
	}
	
	if (adhocIncomeOpt.value == 'New') {
		enableUpdate();
		editBtn.visible = false;
		nextBtn.visible = true;
		saveBtn.visible = true;
		cancelBtn.visible = true;
	} else if (adhocIncomeOpt.value == 'View') {
		disableUpdate();
		editBtn.visible = true;
		nextBtn.visible = false;
		saveBtn.visible = false;
		cancelBtn.visible = false;
		saveBtn.right = '0%';
		saveBtn.title = 'Update';
	} else if (adhocIncomeOpt.value == 'Update') {
		enableUpdate();
		editBtn.visible = false;
		nextBtn.visible = false;
		saveBtn.visible = true;
		cancelBtn.visible = true;
		saveBtn.right = '0%';
		saveBtn.title = 'Update';
	}

	return adhocIncomeView;
};

// module.exports = Adhocincome;

exports.setAdhocIncomeData = function(tableId, viewOption) {
	
	if(viewOption === null || viewOption === undefined || viewOption === ''){
		adhocIncomeOpt.value = 'Update'; // this is as the view option was added at a later time
		adhocIncomeTitle.value = 'Edit Other Bank Receipt';
	} else if (viewOption === 'Update'){
		adhocIncomeOpt.value = 'Update';
		adhocIncomeTitle.value = 'Edit Other Bank Receipt';
	} else if (viewOption === 'View'){
		adhocIncomeOpt.value = 'View';
		adhocIncomeTitle.value = 'View Other Bank Receipt';
	}
	
	//console.log('tableId: '+ tableId);
	var adhocIncomeDataSet = db.execute('SELECT * FROM tbl_income WHERE id = ' + tableId);

	//adhocIncomeTitle.value = 'Edit Other Bank Receipts';
	adhocIncomeEntryDate.value = changeDateView(adhocIncomeDataSet.fieldByName('payment_date'));
	adhocIncomeCategory.value = adhocIncomeDataSet.fieldByName('category_id');
	adhocIncomeSubCategory.value = adhocIncomeDataSet.fieldByName('sub_category_id');
	adhocIncomeAccount.value = adhocIncomeDataSet.fieldByName('account_id');
	adhocIncomeProject.value = adhocIncomeDataSet.fieldByName('project_id');
	adhocIncomeInvoiceNet.value = adhocIncomeDataSet.fieldByName('net_amount');
	adhocIncomeVATPresent.value = adhocIncomeDataSet.fieldByName('vat_presentage');
	adhocIncomeVAT.value = adhocIncomeDataSet.fieldByName('vat');
	adhocIncomeInvoiceTotal.value = adhocIncomeDataSet.fieldByName('total_amount');
	adhocIncomePicture.value = adhocIncomeDataSet.fieldByName('picture_path');
	adhocIncomeCustomerName.value = adhocIncomeDataSet.fieldByName('customer_name');
	adhocIncomeNote.value = adhocIncomeDataSet.fieldByName('note');
	//adhocIncomeOpt.value = "Update";
	adhocIncomeTableId.value = adhocIncomeDataSet.fieldByName('id');
	if (adhocIncomeVAT.value != '0.0' && adhocIncomeVATPresent.value == '0.0') {
		isManualVAT = true;
		//switchActiveButton(2);
	} else {
		isManualVAT = false;
		//switchActiveButton(1);
	}

};
