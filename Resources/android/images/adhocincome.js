function Adhocincome() {
	
	function saveAdhocIncomeData (dbData) {
		var db = Ti.Database.open('mywallet');
		db.execute('INSERT INTO tbl_income(payment_date, category_id, sub_category_id, account_id, project_id, net_amount, vat, total_amount, picture_path, customer_name,note,vat_presentage) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)', dbData.payment_date,dbData.category_id,dbData.sub_category_id,dbData.account_id,dbData.project_id,dbData.net_amount,dbData.vat,dbData.total_amount,dbData.picture_path,dbData.customer_name,dbData.note,dbData.vat_presentage);
		db.close();
		return true;
	}
	
	function clearContent () {
		categoryText.setSelectedRow(0, 0, false);
		var _col = subCategoryText.columns[0];
		var len = _col.rowCount;
        for (var x = len - 1; x >= 1; x--) {
             var _row = _col.rows[x];
             _col.removeRow(_row);
        }
		 
		//subCategoryText.value = '';
		selectAccountText.setSelectedRow(0, 0, false);
		selectProjectText.setSelectedRow(0, 0, false);
		invoiceNetText.value = '';
		vatText.value = '';
		invoiceTotalText.value = '';
		pictureText.image = '';
		noteText.value = '';
		customerNameText.setSelectedRow(0, 0, false);
	  
	}
	
	function getSubCategoryData (dataGet) {
		//dataGet = 0; 
		var db = Ti.Database.open('mywallet');
		var getTableData = db.execute('SELECT * FROM tbl_income_sub_category WHERE parent_category='+dataGet);
	  
	  var tabledata = [];
	  var i=1;
	  while (getTableData.isValidRow()) {	  		
	  	tabledata[i] = Ti.UI.createPickerRow({id:getTableData.fieldByName('id'), title:getTableData.fieldByName('income_sub_category')});
	  	getTableData.next();
	  	i++;
	  }
	  getTableData.close();
	  
	  tabledata[0] = Ti.UI.createPickerRow({
	  	id:'0',
	  	title:'Please Select',
	  });
	  db.close();
	  
	  return tabledata;
	}
		
	// Validate Content before Save
	function adhocIncomeRecordValidate(){
		var validated = false;
		var floatRex= /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/;
		
		var netTotal = invoiceNetText.value;
		var vatValue = vatText.value;
		if (categoryText.value == undefined || categoryText.value == 0) {
			var dialog1 = Ti.UI.createAlertDialog({
				title : 'Alert',
				message : 'Please Select Category',
				ok : 'OK',
			});
			dialog1.show();
		} else if (subCategoryText.value == undefined || subCategoryText.value == 0) {
			var dialog2 = Ti.UI.createAlertDialog({
				title : 'Alert',
				message : 'Please Select Sub Category',
				ok : 'Ok',
			});
			dialog2.show();
		} else if (selectAccountText.value == undefined || selectAccountText.value == '') {
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
		} else if (invoiceNetText.value == '') {
			var dialog5 = Ti.UI.createAlertDialog({
				title : 'Alert',
				message : 'Please Add Invoice Net',
				ok : 'Ok',
			});
			dialog5.show();
		} else if(!floatRex.test(invoiceNetText.value)){
			var dialog6 = Ti.UI.createAlertDialog({
				title : 'Alert',
				message : 'Invoice Net is Invalid',
				ok : 'Ok',
			});
			dialog6.show();
		} else{
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

	
	
	var mainAdhocView = Ti.UI.createScrollView({
			width:'100%', height:'100%', //visible: false,
			backgroundColor: '#fff',
			
	});
		
	var entryDateLabel = Ti.UI.createLabel({
			text:'Entry Date',
			color:'#000', top:5, left:'2%',
			width:'47%', height:40,
	});
	
	var dateLabel = Ti.UI.createLabel({
			text:getDate(), color:'#000',
			top:5, left:'51%', width:'47%', height:40,
	});
	
	var categoryLabel = Ti.UI.createLabel({
			text:'Category', color:'#000',
			top:50, left:'2%', width:'47%', height:40,
	});
	
	var categoryText = Ti.UI.createPicker({
	  		top:50, left:'51%', width:'47%', height:40,
			backgroundColor:'#A0A0A0',
	});
	
	var getTableIncomeCategoryData = db.execute('SELECT * FROM tbl_income_category');
	
	var tableIncomeCategoryData = [];
	var i=1;
	tableIncomeCategoryData[0] = Ti.UI.createPickerRow({id:'0',title:'Please Select'});
  	while (getTableIncomeCategoryData.isValidRow()) {
		tableIncomeCategoryData[i]=Ti.UI.createPickerRow({id:getTableIncomeCategoryData.fieldByName('id'), title:getTableIncomeCategoryData.fieldByName('income_category')});
	  	getTableIncomeCategoryData.next();
	  	i++;
    }
    getTableIncomeCategoryData.close();
	  
	categoryText.selectionIndicator=true;
	categoryText.add(tableIncomeCategoryData);
	
			
	var subCategoryLabel = Ti.UI.createLabel({
			text:'Sub Category', color:'#000',
			top:95, left:'2%', width:'47%', height:40,
		
	});
	
	var subCategoryText = Ti.UI.createPicker({
	  		top:95, left:'51%', width:'47%', height:40,
			backgroundColor:'#A0A0A0',
			selectionIndicator:true,
	});
	
	var subCategoryTextData = [];
	subCategoryTextData = getSubCategoryData(0);		
	subCategoryText.add(subCategoryTextData);
	
	var selectAccountLabel = Ti.UI.createLabel({
			text:'Select Account', color:'#000',
			top:140, left:'2%', width:'47%', height:40,
	});
	
	var selectAccountText = Ti.UI.createPicker({
	  		top:140, left:'51%', width:'47%', height:40,
			backgroundColor:'#A0A0A0',
	});
	
	var getTableAccountData = db.execute('SELECT * FROM tbl_account');
	var tableAccountData = [];
	var i=1;			
	tableAccountData[0] = Ti.UI.createPickerRow({id : '', title : 'Please Select'});
	while (getTableAccountData.isValidRow()) {
		tableAccountData[i] = Ti.UI.createPickerRow({
			id : getTableAccountData.fieldByName('id'),
			title : getTableAccountData.fieldByName('account_name')
		});

		getTableAccountData.next();
		i++;
	}
	getTableAccountData.close(); 
	
	selectAccountText.selectionIndicator=true;
	selectAccountText.add(tableAccountData);
	
	var selectProjectLabel = Ti.UI.createLabel({
			text:'Select Project', color:'#000',
			top:185, left:'2%',width:'47%',	height:40,
	});
	
	var selectProjectText = Ti.UI.createPicker({
	  		top:185, left:'51%', width:'47%', height:40,
			backgroundColor:'#A0A0A0',
	});
	
	var getTableProjectData = db.execute('SELECT * FROM tbl_project');
	
	var tableProjectData = [];
	var i=1;	
	tableProjectData[0] = Ti.UI.createPickerRow({ id : '', title : 'Please Select'});
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
	
	
	var invoiceNetLabel = Ti.UI.createLabel({
			text:'Invoice Net', color:'#000',
			top:230, left:'2%', width:'47%', height:40,
	});
	
	var invoiceNetText = Ti.UI.createTextField({
			backgroundColor:'#A0A0A0',
			top:230, left:'51%', width:'47%', height:40,
			focusable:true, keyboardType:Ti.UI.KEYBOARD_NUMBER_PAD,
	});
	
	var vatLabel = Ti.UI.createLabel({
			text:'VAT '+vatPtg()+'%',
			color:'#000',
			top:275,
			left:'2%',
			width:'47%',
			height:40,
		
	});
			
	var changeadhocincomeVatBtn = Ti.UI.createView({
			//title:'V',
			// image:'',
			backgroundColor: '#A0A0A0',
			top:275,
			left:'25%',
			width:'14%',
			height:40,
	});
	
	var imgadhocincomechangeVat = Ti.UI.createImageView({
		width : '60%',
		image : '/images/edit_white.png',
	});
	changeadhocincomeVatBtn.add(imgadhocincomechangeVat);
	
	var vatText = Ti.UI.createTextField({
			backgroundColor:'#A0A0A0',
			top:275,
			left:'51%',
			width:'47%',
			height:40,
			focusable:true,
			keyboardType:Ti.UI.KEYBOARD_NUMBER_PAD,
	});
	
	var tempVatText = Ti.UI.createTextField({
			value:vatPtg(), visible: false,
			
	});
	
	var invoiceTotalLabel = Ti.UI.createLabel({
			text:'Invoice Total',
			color:'#000',
			top:320,
			left:'2%',
			width:'47%',
			height:40,
		
	});
	
	var invoiceTotalText = Ti.UI.createTextField({
			backgroundColor:'#A0A0A0',
			top:320,
			left:'51%',
			width:'47%',
			height:40,
			editable:false,
	});
	
	var pictureLabel = Ti.UI.createLabel({
			text:'Picture',
			color:'#000',
			top:365,
			left:'2%',
			width:'47%',
			height:40,
		
	});
	
	var pictureText = Ti.UI.createImageView({
			backgroundColor:'#A0A0A0',
			top:365,
			left:'51%',
			width:'47%',
			height:120,					
	});
	
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
			text:'Customer Name',
			color:'#000',
			top:490,
			left:'2%',
			width:'47%',
			height:40,
		
	});
	
	var customerNameText = Ti.UI.createPicker({
			backgroundColor:'#A0A0A0',
			top:490,
			left:'51%',
			width:'47%',
			height:40,
	});
	
	var getTableCustomerData = db.execute('SELECT * FROM tbl_customer');

	var tableCustomerData = [];
	var i = 1;
	while (getTableCustomerData.isValidRow()) {

		tableCustomerData[0] = Ti.UI.createPickerRow({
			id : '',
			title : 'Please Select',
		});
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
	
	var noteLabel = Ti.UI.createLabel({
			text:'Note',
			color:'#000',
			top:535,
			left:'2%',
			width:'47%',
			height:40,
		
	});
	
	var noteText = Ti.UI.createTextField({
			backgroundColor:'#A0A0A0',
			top:535,
			left:'51%',
			width:'47%',
			height:40,
	});
	
	var incomeInvoiceBtnView = Ti.UI.createView({
		top: 580, width :'100%', height: appPixel*7.5,
		backgroundColor: '#054e62'
	});
	
	var saveBtn = Ti.UI.createButton({
		title:'Save',
	    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	    backgroundColor:'#054e62',
	    backgroundSelectedColor:'#0a7390',
	    left : '0%',
	    height : '100%',
	    width: '33%',
	    	font : {
			fontSize : stylefontsize - 5,
			fontFamily : customFont1
		},
	});
	
	var deleteBtn = Ti.UI.createButton({
		title:'Delete',
	    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	    backgroundColor:'#F00',
	    backgroundSelectedColor:'#0a7390',
	    height : '100%',
	    width:'34%',
	    	font : {
			fontSize : stylefontsize - 5,
			fontFamily : customFont1
		},
	});
	
	var nextBtn = Ti.UI.createButton({
		title:'Next',
	    textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	    backgroundColor:'#054e62',
	    backgroundSelectedColor:'#0a7390',
	    right : '0%',
	    height : '100%',
	    width:'33%',
	    font : {
			fontSize : stylefontsize - 5,
			fontFamily : customFont1
		},
	});
	
	incomeInvoiceBtnView.add(saveBtn);
	incomeInvoiceBtnView.add(deleteBtn);
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
	mainAdhocView.add(categoryLabel);
	mainAdhocView.add(categoryText);
	mainAdhocView.add(subCategoryLabel);
	mainAdhocView.add(subCategoryText);
	mainAdhocView.add(selectAccountLabel);
	mainAdhocView.add(selectAccountText);
	mainAdhocView.add(selectProjectLabel);
	mainAdhocView.add(selectProjectText);
	mainAdhocView.add(invoiceNetLabel);
	mainAdhocView.add(invoiceNetText);
	mainAdhocView.add(vatLabel);
	mainAdhocView.add(changeadhocincomeVatBtn);
	mainAdhocView.add(vatText);
	mainAdhocView.add(invoiceTotalLabel);
	mainAdhocView.add(invoiceTotalText);
	mainAdhocView.add(pictureLabel);
	mainAdhocView.add(pictureText);
	mainAdhocView.add(customerNameLabel);
	mainAdhocView.add(customerNameText);
	mainAdhocView.add(noteLabel);
	mainAdhocView.add(noteText);
	mainAdhocView.add(tempVatText);
	//Button
	mainAdhocView.add(incomeInvoiceBtnView);
	//mainAdhocView.add(quitBtn);
	
	/*************Change Vat Popup*****************/
	
	var AdhocVatWrapperView    = Ti.UI.createView({
		visible : false,
		zIndex: 200,
	}); // Full screen
	var AdhocVatBackgroundView = Ti.UI.createView({  // Also full screen
	    backgroundColor : '#000',
	    opacity         : 0.6
	});
	var AdhocVatContainerView  = Ti.UI.createView({  // Set height appropriately
	    layout : 'vertical',
		width : '85%',
		height : deviceHeight * 0.265,
		backgroundColor : '#FFF',
	});
	
	var viewVatpopuptitle = Ti.UI.createView({
		height : deviceHeight * 0.075,
		backgroundColor : '#2980B9',
	});	
	
	var someVatLabel      = Ti.UI.createLabel({
	    text : 'Change Vat Value',
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
		keyboardType:Titanium.UI.KEYBOARD_DECIMAL_PAD,
		borderColor: "#489CE0",
		width : '90%',
		value:vatPtg(),
		color : settingsbtnfontcolor,
		left : '5%',
		font : {
			//fontFamily : customFont1,
			fontSize : stylefontsize,
		},
	});
	
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
		title : 'Change',
		//width : '70%',
		color : settingsbtnfontcolor,
		left : '35%',
		font : {
			//fontFamily : customFont1,
			fontSize : stylefontsize,
		},
	});
	
	btnAdhocVatView.add(btnAdhocVat);
	AdhocVatContainerView.add(btnAdhocVatView);

	AdhocVatWrapperView.add(AdhocVatBackgroundView);
	AdhocVatWrapperView.add(AdhocVatContainerView);
	
	
	//var getImage;	
	changeadhocincomeVatBtn.addEventListener('click', function(e) {
		console.log('change');
		AdhocVatWrapperView.show();
		mainAdhocView.scrollingEnabled = false;
	});
	
	imageVatpopupclose.addEventListener('click', function () {
	    AdhocVatWrapperView.hide();
	    mainAdhocView.scrollingEnabled = true;
	    //AdhocVatText.value = vatPtg();
	});
	
	AdhocVatBackgroundView.addEventListener('click', function () {
	    AdhocVatWrapperView.hide();
	    mainAdhocView.scrollingEnabled = true;
	});	
	
	
	
	
	btnAdhocVat.addEventListener('click', function(e) {

		AdhocVatWrapperView.hide();
		mainAdhocView.scrollingEnabled = true;
		var vatVal = AdhocVatText.value;
		vatVal = vatVal*1;
		var float= /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/;
		
		console.log(float.test(vatVal));
		if (float.test(vatVal)) {
			vatPtg(vatVal);
			vatLabel.text = 'VAT ' + vatVal + '%';
			var invoiceNet = invoiceNetText.value;
			tempVatText.value = vatVal;
			var invoiceVat = (invoiceNet * vatVal) / 100;
			vatText.value = invoiceVat;
			var vat = vatText.value;
			var totalValue = invoiceNet * 1 + vat * 1;
			invoiceTotalText.value = Math.ceil(totalValue * 10000) / 10000;
		}
		else{
			alert('Please Add Numbers');
			AdhocVatWrapperView.show();
			mainAdhocView.scrollingEnabled = false;
		}

	}); 

	
	/********End Vat Popup*********/
	
	categoryText.addEventListener('change', function(e)
	{
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
		
		subCategoryTextData = getSubCategoryData(e.row.id);		
			
		subCategoryText.add(subCategoryTextData);
			
	
	});
	
	subCategoryText.addEventListener('change', function(e){
		subCategoryText.value = e.row.id;
		
	});
	
	selectAccountText.addEventListener('change', function(e){
		selectAccountText.value = e.row.id;
	});
	
	selectProjectText.addEventListener('change', function(e){
		selectProjectText.value = e.row.id;
	});
	
	customerNameText.addEventListener('change', function(e){
		customerNameText.value = e.row.id;
	});	
	
	
	invoiceNetText.addEventListener('change', function() {
		var invoiceNet = invoiceNetText.value;
		
		var tempVatvals = tempVatText.value;
		
		var invoiceVat =(invoiceNet*vatPtg(tempVatvals)) /100;
		vatText.value = invoiceVat;
		
		var vat = vatText.value;
		var totalValue = invoiceNet * 1 + vat * 1;
		invoiceTotalText.value = Math.ceil(totalValue* 10000) / 10000;
	});
		
	
	vatText.addEventListener('change', function() {
		var invoiceNet = invoiceNetText.value;
		var vat = vatText.value;
		var totalValue = invoiceNet * 1 + vat * 1;
		invoiceTotalText.value = Math.ceil(totalValue* 10000) / 10000;
	}); 
	
	var AdhocwrapperView    = Ti.UI.createView({
		visible : false,
		zIndex: 200,
	}); // Full screen
	var AdhocbackgroundView = Ti.UI.createView({  // Also full screen
	    backgroundColor : '#000',
	    opacity         : 0.6
	});
	var AdhoccontainerView  = Ti.UI.createView({  // Set height appropriately
	    layout : 'vertical',
		width : '85%',
		height : deviceHeight * 0.265,
		backgroundColor : '#FFF',
	});
	
	var view_popuptitle = Ti.UI.createView({
		height : deviceHeight * 0.075,
		backgroundColor : '#2980B9',
	});	
	
	var someLabel      = Ti.UI.createLabel({
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
		text : 'Camera',
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
		text : 'Gallery',
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

	AdhocwrapperView.add(AdhocbackgroundView);
	AdhocwrapperView.add(AdhoccontainerView);
	
	
	
	var getImage;	
	pictureText.addEventListener('click', function(e) {
		AdhocwrapperView.show();
		mainAdhocView.scrollingEnabled = false;
	});
	
	mainAdhocView.addEventListener('onload',function(e){
	    AdhocwrapperView.hide();
	    AdhocVatWrapperView.hide();
	    mainAdhocView.scrollingEnabled = true;
	});
	
	imagepopupclose.addEventListener('click', function () {
	    AdhocwrapperView.hide();
	    mainAdhocView.scrollingEnabled = true;
	});
	
	AdhocbackgroundView.addEventListener('click', function () {
	    AdhocwrapperView.hide();
	    mainAdhocView.scrollingEnabled = true;
	});	
	
	btnAdhocCameraView.addEventListener('click', function() {
		AdhocwrapperView.hide();
		mainAdhocView.scrollingEnabled = true;
		
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

		
	saveBtn.addEventListener('click', function(e) {		
		
		// if content validated
		if(adhocIncomeRecordValidate()){
			alert('DAta validated');
			var dbData = {
				payment_date : dateLabel.text,
				category_id : categoryText.value,
				sub_category_id : subCategoryText.value,
				account_id : selectAccountText.value,
				project_id : selectProjectText.value,
				net_amount : invoiceNetText.value,
				vat : vatText.value,
				total_amount : invoiceTotalText.value,
				picture_path : getImage,
				customer_name : customerNameText.value,
				note : noteText.value,
				vat_presentage : tempVatText.value,
			};

			saveAdhocIncomeData(dbData);
		}

		// if (categoryText.value == undefined || categoryText.value == 0) {
			// var dialog1 = Ti.UI.createAlertDialog({
				// title : 'Alert',
				// message : 'Please Select Category',
				// ok : 'OK',
			// });
			// dialog1.show();
		// } else if (subCategoryText.value == undefined || subCategoryText.value == 0) {
			// var dialog2 = Ti.UI.createAlertDialog({
				// title : 'Alert',
				// message : 'Please Select Sub Category',
				// ok : 'Ok',
			// });
			// dialog2.show();
		// } else if (selectAccountText.value == undefined || selectAccountText.value == '') {
			// var dialog3 = Ti.UI.createAlertDialog({
				// title : 'Alert',
				// message : 'Please Select Account',
				// ok : 'Ok',
			// });
			// dialog3.show();
		// } else if (selectProjectText.value == undefined || selectProjectText.value == '') {
			// var dialog4 = Ti.UI.createAlertDialog({
				// title : 'Alert',
				// message : 'Please Select Project',
				// ok : 'Ok',
			// });
			// dialog4.show();
		// } else if (invoiceNetText.value == '') {
			// var dialog5 = Ti.UI.createAlertDialog({
				// title : 'Alert',
				// message : 'Please Add Invoice Net',
				// ok : 'Ok',
			// });
			// dialog5.show();
		// } else {
// 
			// var dbData = {
				// payment_date : getDate(),
				// category_id : categoryText.value,
				// sub_category_id : subCategoryText.value,
				// account_id : selectAccountText.value,
				// project_id : selectProjectText.value,
				// net_amount : invoiceNetText.value,
				// vat : vatText.value,
				// total_amount : invoiceTotalText.value,
				// picture_path : getImage,
				// customer_name : customerNameText.value,
				// note : noteText.value,
				// vat_presentage : tempVatText.value,
			// };
// 
			// saveAdhocIncomeData(dbData);
		// }

	}); 	
	
	nextBtn.addEventListener('click', function(e) {

		if (categoryText.value == undefined || categoryText.value == 0) {
			var dialog1 = Ti.UI.createAlertDialog({
				title : 'Alert',
				message : 'Please Select Category',
				ok : 'OK',
			});
			dialog1.show();
		} else if (subCategoryText.value == undefined || subCategoryText.value == 0) {
			var dialog2 = Ti.UI.createAlertDialog({
				title : 'Alert',
				message : 'Please Select Sub Category',
				ok : 'Ok',
			});
			dialog2.show();
		} else if (selectAccountText.value == undefined || selectAccountText.value == '') {
			var dialog3 = Ti.UI.createAlertDialog({
				title : 'Alert',
				message : 'Please Select Account',
				ok : 'Ok',
			});
			dialog3.show();
		} else if (selectProjectText.value == undefined || selectProjectText.value == '') {
			var dialog4 = Ti.UI.createAlertDialog({
				title : 'Alert',
				message : 'Please Select Project',
				ok : 'Ok',
			});
			dialog4.show();
		} else if (invoiceNetText.value == '') {
			var dialog5 = Ti.UI.createAlertDialog({
				title : 'Alert',
				message : 'Please Add Invoice Net',
				ok : 'Ok',
			});
			dialog5.show();
		} else {

			var dbData = {
				payment_date : getDate(),
				category_id : categoryText.value,
				sub_category_id : subCategoryText.value,
				account_id : selectAccountText.value,
				project_id : selectProjectText.value,
				net_amount : invoiceNetText.value,
				vat : vatText.value,
				total_amount : invoiceTotalText.value,
				picture_path : getImage,
				customer_name : customerNameText.value,
				note:noteText.value,
				vat_presentage:tempVatText.value,
			};

			var getResult = saveAdhocIncomeData(dbData);

			if (getResult) {
				clearContent();
			}
		}
	});
	
	var mainViews = [];
	mainViews['mainAdhocView'] = mainAdhocView;
	mainViews['wrapperView'] = AdhocwrapperView;
	mainViews['AdhocVatWrapperView'] = AdhocVatWrapperView;
	
	return mainViews;
}
module.exports = Adhocincome;
