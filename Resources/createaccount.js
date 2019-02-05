var AccountTitle = Ti.UI.createTextField({value: 'Create Account',	visible: false,});
var AccountTableId = Ti.UI.createTextField({value: '',	visible: false,});
var AccountName = Ti.UI.createTextField({value: '',	visible: false,});
var AccountShortCode = Ti.UI.createTextField({value: '',	visible: false,});
var AccountOpt = Ti.UI.createTextField({value: 'New',	visible: false,});

exports.createaccountRecord = function() {	
	//var deviceHeight=1920;
	//var deviceHeight = Ti.Platform.displayCaps.platformHeight;

	var logicalDesityFactor = Ti.Platform.displayCaps.logicalDensityFactor * 1;

	var ex_height = Titanium.Platform.displayCaps.platformHeight * 1;
	var ex_width = Ti.Platform.displayCaps.platformWidth * 1;
	if (ex_height > ex_width) {
		var deviceHeight = ((Titanium.Platform.displayCaps.platformHeight * 1) / logicalDesityFactor);
	} else {
		var deviceHeight = ((Titanium.Platform.displayCaps.platformWidth * 1) / logicalDesityFactor);
	}
	
	function saveAccountData(dbData) {
		var db = Ti.Database.open('mywallet');
		db.execute('INSERT INTO tbl_account(account_name, short_code, enable) VALUES(?,?,?)', dbData.account_name, dbData.short_code, dbData.enable);
		db.close();
		return true;
	}
	
	function updateAccountData(dbData, tableID){
		var db = Ti.Database.open('mywallet');
		db.execute('UPDATE tbl_account SET account_name="'+dbData.account_name+'", short_code="'+dbData.short_code+'", enable="'+dbData.enable+'" WHERE id = '+tableID) ;
		db.close();
		return true;
	}
	
	function addAccountValidate() {
		var validated = false;
		if (accountNameText.value == '') {
			var dialog1 = Ti.UI.createAlertDialog({
				title : 'Alert',
				message : 'Please Add Account Name',
				ok : 'Ok',
			});
			dialog1.show();
		} else if (shortCodeText.value == '') {
			var dialog2 = Ti.UI.createAlertDialog({
				title : 'Alert',
				message : 'Please Add Short Code',
				ok : 'Ok',
			});
			dialog2.show();
		} else {
			validated = true;
		}

		return validated;
	}
	
	function clearContent() {
		
		accountNameText.value = '';
		shortCodeText.value = '';
		
		AccountTableId.value = '';
		AccountName.value = '';
		AccountShortCode.value = '';
		AccountOpt.value = "New";
		AccountTitle.value = "Create Account";
	}

	
	var createaccountpopupcontainerView = Ti.UI.createView({// Set height appropriately
		//layout : 'vertical',
		visible : false,
		width : '100%',
		height : '100%',
		backgroundColor : '#ffffff'
	});

	var view_createaccountpopuptitle = Ti.UI.createView({
		height : deviceHeight * 0.075,
		top : 0,
		backgroundColor : '#2980B9',
	});

	var lblcreateaccountpopuptitle = Ti.UI.createLabel({
		text : AccountTitle.value,
		color : '#FFFFFF',
		font : {
			fontSize : stylefontsize + 2,
			fontFamily : customFont2,
		},
	});

	var imgcreateaccountpopupclose = Ti.UI.createImageView({
		image : '../images/backbtn.png',
		backgroundSelectedColor : '#999999',
		width : '13%',
		left : '0%',
	});

	view_createaccountpopuptitle.add(lblcreateaccountpopuptitle);
	view_createaccountpopuptitle.add(imgcreateaccountpopupclose);
	createaccountpopupcontainerView.add(view_createaccountpopuptitle);

	var createaccountpopupinputview = Titanium.UI.createScrollView({
		height : deviceHeight * 0.925,
		top : deviceHeight * 0.075,
		showVerticalScrollIndicator : true,
		//backgroundColor : 'red',
	});

	/////////////////////////////////////////////////////////////////////////////////////////////////////

	var accountNameLabel = Ti.UI.createLabel({
		text : 'Account Name',
		color : '#000',
		top : 15,
		left : '2%',
		width : '47%',
		height : 40,
	});
	
	var accountNameText = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		backgroundColor : '#A0A0A0',
		top : 15, left : '51%',
		width : '47%', height : 40,
		value: AccountName.value,
		autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_WORDS,
	});

	var shortCodeLabel = Ti.UI.createLabel({
		text : 'Short Code',
		color : '#000',
		top : 60,
		left : '2%',
		width : '47%',
		height : 40,
	});

	var shortCodeText = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		backgroundColor : '#A0A0A0',
		top : 60,
		left : '51%',
		width : '47%',
		height : 40, value: AccountShortCode.value,
		autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_ALL,
	});

	createaccountpopupinputview.add(accountNameLabel);
	createaccountpopupinputview.add(accountNameText);
	createaccountpopupinputview.add(shortCodeLabel);
	createaccountpopupinputview.add(shortCodeText);
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////
	var createaccountBtnView = Ti.UI.createView({
		//top : 580,
		bottom : 0,
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

	var btncreateaccountsave = Ti.UI.createButton({
		title : 'Save',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		backgroundColor : '#054e62',
		backgroundSelectedColor : '#0a7390',
		// left : '0%',
		height : '100%',
		width : '33%',
		font : {
			fontSize : stylefontsize - 5,
			fontFamily : customFont1
		},
	});

	var btncreateaccountdelete = Ti.UI.createButton({
		title : 'Delete',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		backgroundColor : '#F00',
		backgroundSelectedColor : '#0a7390',
		height : '100%',
		width : '34%',
		font : {
			fontSize : stylefontsize - 5,
			fontFamily : customFont1
		},
		enabled: false,
		backgroundDisabledColor: btnDeleteBackgroundDisableColor,
		visible: false,
	});

	var btncreateaccountnext = Ti.UI.createButton({
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
	
	if(AccountOpt.value=='Update'){
		btncreateaccountnext.visible = false;
		btncreateaccountsave.right = '0%';
		btncreateaccountsave.title = 'Update';
		btncreateaccountdelete.visible = true;
		btncreateaccountdelete.enabled = true;
	}

	createaccountBtnView.add(cancelBtn);
	createaccountBtnView.add(btncreateaccountsave);
	createaccountBtnView.add(btncreateaccountdelete);
	createaccountBtnView.add(btncreateaccountnext);

	createaccountpopupinputview.add(createaccountBtnView);
	
	btncreateaccountsave.addEventListener('click', function() {
	  	if (addAccountValidate()) {
	  		var dbData = {
				account_name : accountNameText.value,
				short_code : shortCodeText.value,
				enable : '1',
				
			};
			
			if(AccountOpt.value == "Update"){
				var getResult = updateAccountData(dbData,AccountTableId.value);
				var msg = "Update Successful";
				Ti.App.fireEvent('refrishAccountsList', 'e');
			}else{
				var getResult = saveAccountData(dbData);
				var msg = "Save Successful";
			}
			if (getResult) {
				clearContent();
				createaccountpopupcontainerView.hide();
				var toast = Ti.UI.createNotification({
					message:msg,
					duration: Ti.UI.NOTIFICATION_DURATION_SHORT
				});
				toast.show();
			}
			
			Ti.App.fireEvent('updateAccountList');
	  	}
	});
	
	btncreateaccountnext.addEventListener('click', function() {
	  	if (addAccountValidate()) {
	  		var dbData = {
				account_name : accountNameText.value,
				short_code : shortCodeText.value,
				enable : '1',
				
			};
			
			var getResult = saveAccountData(dbData);
			if (getResult) {
				clearContent();
				var toast = Ti.UI.createNotification({
					message:"Save Successful",
					duration: Ti.UI.NOTIFICATION_DURATION_SHORT
				});
				toast.show();
			}
			Ti.App.fireEvent('updateAccountList');
	  	}
	});
	
	var accountRecordDeleteConf = Ti.UI.createAlertDialog({
	    cancel: 1,
	    buttonNames: ['Delete', 'Cancel'],
	    message: 'Do you want to delete the record?',
	    title: 'Delete Confirmation?'
	});
	
	btncreateaccountdelete.addEventListener('click', function(){
		var sql_expence = 'SELECT COUNT(*) AS rowcount FROM tbl_expence WHERE account_id = '+AccountTableId.value;
		var sql_income = 'SELECT COUNT(*) AS rowcount FROM tbl_income WHERE account_id = '+AccountTableId.value;
		var resultSet_expence = db.execute(sql_expence);
		var resultSet_income = db.execute(sql_income);
		var total_rec_exists = resultSet_expence.fieldByName('rowcount') + resultSet_income.fieldByName('rowcount') ;
		
		if (total_rec_exists!=0){
			var dialog1 = Ti.UI.createAlertDialog({
				title : 'Unable to Delete !',
				message : 'Account already using in other record.',
				ok : 'Ok',
			});
			dialog1.show();
		}else{
			// delete confirmation record
			accountRecordDeleteConf.show();
			//alert('can be deleted');
		}
	});
	
	accountRecordDeleteConf.addEventListener('click', function(e){
	    if (e.index === e.source.cancel){
	      	Ti.API.info('The cancel button was clicked');
	    }else{
	    	var rowID = AccountTableId.value;
	    	db.execute('DELETE FROM tbl_account WHERE id='+rowID);
	    	clearContent();
	    	Ti.App.fireEvent('refrishAccountsList', 'e');
			createaccountpopupcontainerView.hide();
	    	var toast = Ti.UI.createNotification({
				message:"Delete Successful",
				duration: Ti.UI.NOTIFICATION_DURATION_SHORT
			});
			toast.show();
  		}
  		Ti.App.fireEvent('updateAccountList');
  	});
	
	cancelBtn.addEventListener('click', function(){
		createaccountpopupcontainerView.hide();
		clearContent();
	});
	
	Ti.App.addEventListener('addAccountViewClose', function(e) {
		createaccountpopupcontainerView.hide();
		clearContent();
		Ti.App.fireEvent('updateAccountList');
		
		//console.log(">>>>>>> content clear");
	});


	imgcreateaccountpopupclose.addEventListener('click', function() {
		createaccountpopupcontainerView.hide();
		clearContent();
		Ti.App.fireEvent('updateAccountList');
		
		console.log(">>>> close");
	});
	
	
	createaccountpopupcontainerView.add(createaccountpopupinputview);
	
	createaccountpopupcontainerView.add(accountRecordDeleteConf);
	
	return createaccountpopupcontainerView;
};

exports.setAccountData = function(tableId){
	var accountDataSet = db.execute('SELECT * FROM tbl_account WHERE id = '+tableId);
	AccountTableId.value = accountDataSet.fieldByName('id');
	AccountName.value = accountDataSet.fieldByName('account_name');
	AccountShortCode.value = accountDataSet.fieldByName('short_code');
	AccountOpt.value = "Update";
	AccountTitle.value = "Edit Account";
};

exports.resetAccountData = function(){
	AccountTableId.value = '';
	AccountName.value = '';
	AccountShortCode.value = '';
	AccountOpt.value = "New";
	AccountTitle.value = "Create Account";
};

exports.isInbuilt = function(tableId){
	var accountDataSet = db.execute('SELECT * FROM tbl_account WHERE id = '+tableId);
	var isInbuilt = false;
	if(accountDataSet.fieldByName('inbuilt') !== 0){
		isInbuilt = false;
	} else {
		isInbuilt = true;
	}
	return isInbuilt;
};
