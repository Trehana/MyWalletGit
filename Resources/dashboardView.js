exports.dashboardWindow = function() {

	var win = Ti.UI.createWindow({
		//backgroundColor : '#EEEEEE',
		//backgroundColor : '#F00',
		exitOnClose : true,
		fullscreen : true,
		title : 'MyWallet',
		//layout : 'vertical',
		color : 'FFFFFF',
		font : {
			fontSize : stylefontsize,
			fontFamily : customFont
		},
	});

	var scrollview = Ti.UI.createView({
		height : '100%',
		width : '100%',
		layout : 'vertical',
		width : stylefullwidth,
		font : {
			fontFamily : customFont
		},
	});

	var view_1 = Ti.UI.createView({
		height : deviceHeight * 0.075,
		backgroundColor : '#2980B9',
	});

	var lbltitle = Ti.UI.createLabel({
		text : 'Boffin',
		color : '#FFFFFF',
		font : {
			fontSize : stylefontsize + 4,
			fontFamily : customFont2
		},
	});

	view_1.add(lbltitle);
	scrollview.add(view_1);

	var view_2 = Ti.UI.createView({
		// layout : 'vertical',
		backgroundColor : '#eeeeee',
		height : deviceHeight * 0.05,
	});

	var lbldate = Ti.UI.createLabel({
		text : getDate(),
		width : '50%',
		left : stylemargine,
		color : '#7A7A7A',
	});

	var lbltime = Ti.UI.createLabel({
		text : getTime(),
		width : '50%',
		textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
		right : stylemargine,
		color : '#7A7A7A',
	});

	view_2.add(lbldate);
	view_2.add(lbltime);
	scrollview.add(view_2);

	var view_3 = Ti.UI.createView({
		height : deviceHeight * 0.35,
		backgroundColor : '#eeeeee',
	});

	var view_btnset1 = Ti.UI.createView({
		height : '100%',
		width : '50%',
		layout : 'vertical',
		// backgroundColor:'white',
		left : 0,
	});
	var btn_dashboard_addexpense = Ti.UI.createView({
		layout : 'vertical',
		top : '0%',
		left : '10%',
		height : '45%',
		backgroundColor : '#4A67B0',
		backgroundSelectedColor : '#2e4476',
		width : '85%'
	});

	var imgaddexpense = Ti.UI.createImageView({
		image : '/images/add_expense.png',
		//width : '50%',
		height : '40%',
		top : '10%',
		bottom : '0%'
	});

	var lbladdexpensecaption = Ti.UI.createLabel({
		text : 'Bank & Cash\nPayments',
		color : '#ffffff',
		font : {
			fontSize : stylefontsize,
			fontFamily : customFont,
		},
		textAlign : 'center'
	});

	btn_dashboard_addexpense.add(imgaddexpense);
	btn_dashboard_addexpense.add(lbladdexpensecaption);

	var btn_dashboard_createinvoice = Ti.UI.createView({
		layout : 'vertical',
		top : '5%',
		left : '10%',
		height : '45%',
		backgroundColor : '#84439A',
		backgroundSelectedColor : '#5b2f6a',
		width : '85%'
	});

	var imgcreateinvoice = Ti.UI.createImageView({
		image : '/images/create_invoice.png',
		height : '40%',
		top : '10%',
		bottom : '0%'
	});

	var lblcreateinvoice = Ti.UI.createLabel({
		text : 'Record Invoices\n & Credit Notes', //'Create Invoice',
		color : '#ffffff',
		font : {
			fontSize : stylefontsize,
			fontFamily : customFont,
		}, 
		textAlign : 'center'
	});

	btn_dashboard_createinvoice.add(imgcreateinvoice);
	btn_dashboard_createinvoice.add(lblcreateinvoice);

	view_btnset1.add(btn_dashboard_addexpense);
	view_btnset1.add(btn_dashboard_createinvoice);

	var view_btnset2 = Ti.UI.createView({
		height : '100%',
		width : '50%',
		layout : 'vertical',
		right : 0,
	});

	var btn_dashboard_addincome = Ti.UI.createView({
		layout : 'vertical',
		top : '0%',
		right : '10%',
		height : '45%',
		backgroundColor : '#95A5A5',
		backgroundSelectedColor : '#646f6f',
		width : '85%'
	});

	var imgaddincome = Ti.UI.createImageView({
		image : '/images/add_income.png',
		height : '40%',
		top : '10%',
		bottom : '0%'
	});

	var lbladdincome = Ti.UI.createLabel({
		text : 'Bank & Cash\nReceipts',
		color : '#ffffff',
		font : {
			fontSize : stylefontsize,
			fontFamily : customFont,
		},
		textAlign : 'center'
	});

	btn_dashboard_addincome.add(imgaddincome);
	btn_dashboard_addincome.add(lbladdincome);

	var btn_dashboard_createaccount = Ti.UI.createView({
		layout : 'vertical',
		top : '5%',
		right : '10%',
		height : '45%',
		backgroundColor : '#25B89B',
		backgroundSelectedColor : '#13967e',
		width : '85%'
	});

	var imgcreateaccount = Ti.UI.createImageView({
		image : '/images/create_account.png',
		height : '40%',
		top : '10%',
		bottom : '10%'
	});

	var lblcreateaccount = Ti.UI.createLabel({
		text : 'Create Account',
		color : '#ffffff',
		font : {
			fontSize : stylefontsize,
			fontFamily : customFont,
		}
	});

	btn_dashboard_createaccount.add(imgcreateaccount);
	btn_dashboard_createaccount.add(lblcreateaccount);

	view_btnset2.add(btn_dashboard_addincome);
	view_btnset2.add(btn_dashboard_createaccount);
	view_3.add(view_btnset1);
	view_3.add(view_btnset2);
	scrollview.add(view_3);

	var view_4 = Ti.UI.createView({
		height : deviceHeight * 0.45, // **********
		backgroundColor : '#eeeeee',
		layout : 'vertical',
	});

	var btn_viewentries = Ti.UI.createView({
		backgroundColor : '#01A5D1',
		backgroundSelectedColor : '#2980B9',
		left : stylemargine,
		right : stylemargine,
		top : '1%',
		height : '17%',
	});

	var lblviewentries = Ti.UI.createLabel({
		text : 'View Entries',
		//width : '40%',
		left : '15%',
		color : '#ffffff',
		font : {
			fontSize : stylefontsize,
			fontFamily : customFont,
		}
	});

	var lblarrow = Ti.UI.createLabel({
		text : '>',
		//width : '10%',
		right : '15%',
		color : '#ffffff',
		font : {
			fontSize : stylefontsize,
			fontFamily : customFont,
		}
	});

	btn_viewentries.add(lblviewentries);
	btn_viewentries.add(lblarrow);

	var btn_editdeleteentries = Ti.UI.createView({
		backgroundColor : '#01A5D1',
		backgroundSelectedColor : '#2980B9',
		left : stylemargine,
		right : stylemargine,
		top : '3%',
		height : '17%',
	});

	var lbleditdeleteentries = Ti.UI.createLabel({
		text : 'View / Edit Entries',
		//width : '40%',
		left : '15%',
		color : '#ffffff',
		font : {
			fontSize : stylefontsize,
			fontFamily : customFont,
		}
	});

	var lblarrow = Ti.UI.createLabel({
		text : '>',
		//width : '10%',
		right : '15%',
		color : '#ffffff',
		font : {
			fontSize : stylefontsize,
			fontFamily : customFont,
		}
	});

	btn_editdeleteentries.add(lbleditdeleteentries);
	btn_editdeleteentries.add(lblarrow);

	//Delete Entries
	var btn_Deletereports = Ti.UI.createView({
		backgroundColor : '#01A5D1',
		backgroundSelectedColor : '#2980B9',
		left : stylemargine,
		right : stylemargine,
		top : '3%',
		height : '17%',
	});

	var lblDeletereports = Ti.UI.createLabel({
		text : 'Delete Entries',
		//width : '40%',
		left : '15%',
		color : '#ffffff',
		font : {
			fontSize : stylefontsize,
			fontFamily : customFont,
		}
	});

	var lblarrow = Ti.UI.createLabel({
		text : '>',
		//width : '10%',
		color : '#ffffff',
		right : '15%',
		font : {
			fontSize : stylefontsize,
			fontFamily : customFont,
		}
	});

	btn_Deletereports.add(lblDeletereports);
	btn_Deletereports.add(lblarrow);

	//Access Reports
	var btn_accessreports = Ti.UI.createView({
		backgroundColor : '#01A5D1',
		backgroundSelectedColor : '#2980B9',
		left : stylemargine,
		right : stylemargine,
		top : '3%',
		height : '17%',
	});

	var lblaccessreports = Ti.UI.createLabel({
		text : 'Access Reports',
		//width : '40%',
		left : '15%',
		color : '#ffffff',
		font : {
			fontSize : stylefontsize,
			fontFamily : customFont,
		}
	});

	var lblarrow = Ti.UI.createLabel({
		text : '>',
		//width : '10%',
		color : '#ffffff',
		right : '15%',
		font : {
			fontSize : stylefontsize,
			fontFamily : customFont,
		}
	});

	btn_accessreports.add(lblaccessreports);
	btn_accessreports.add(lblarrow);

	btn_accessreports.addEventListener('click', function(e) {
		//delete this
		//alert("This feature is underdevelopment.");
		var toast = Ti.UI.createNotification({
				message : "Under Constructon",
				duration : Ti.UI.NOTIFICATION_DURATION_SHORT
			});
		toast.show();
		return;
	});

	var btn_summerytotals = Ti.UI.createView({
		backgroundColor : '#01A5D1',
		backgroundSelectedColor : '#2980B9',
		left : stylemargine,
		right : stylemargine,
		top : '3%',
		//bottom : '3%',
		height : '17%',
	});

	var lblsummerytotals = Ti.UI.createLabel({
		text : 'Summary Totals',
		//width : '40%',
		left : '15%',
		color : '#ffffff',
		font : {
			fontSize : stylefontsize,
			fontFamily : customFont,
		}
	});

	var lblarrow = Ti.UI.createLabel({
		text : '>',
		//width : '10%',
		right : '15%',
		color : '#ffffff',
		font : {
			fontSize : stylefontsize,
			fontFamily : customFont,
		}
	});

	btn_summerytotals.add(lblsummerytotals);
	btn_summerytotals.add(lblarrow);

	//view_4.add(btn_viewentries);
	view_4.add(btn_editdeleteentries);
	//view_4.add(btn_accessreports);
	view_4.add(btn_Deletereports);
	view_4.add(btn_accessreports);
	view_4.add(btn_summerytotals);
	scrollview.add(view_4);

	var view_5 = Ti.UI.createView({
		height : deviceHeight * 0.075, // **************
		backgroundColor : '#054e62',
	});

	var btnbackup = Titanium.UI.createButton({
		title : 'Backup',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		backgroundColor : '#054e62',
		backgroundSelectedColor : '#0a7390',
		left : '0%',
		height : '100%',
		width : '33%',
		font : {
			fontSize : stylefontsize - 3,
			fontFamily : customFont1
		},
	});

	var btnsettings = Titanium.UI.createButton({
		title : 'Settings',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		backgroundColor : '#054e62',
		backgroundSelectedColor : '#0a7390',
		height : '100%',
		width : '34%',
		font : {
			fontSize : stylefontsize - 3,
			fontFamily : customFont1
		},
	});

	var btnclose = Titanium.UI.createButton({
		title : 'Quit',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		backgroundColor : '#054e62',
		backgroundSelectedColor : '#0a7390',
		right : '0%',
		height : '100%',
		width : '33%',
		font : {
			fontSize : stylefontsize - 3,
			fontFamily : customFont1
		},
	});

	view_5.add(btnbackup);
	view_5.add(btnsettings);
	view_5.add(btnclose);
	scrollview.add(view_5);

	var x = scrollview.toImage().height * 1;
	//var y = scrollview.getChildAt(0).getHeight();
	Ti.API.info('>>>>> scrool height: ' + x);
	//Ti.API.info('>>>>> scrool height: '+y);

	win.add(scrollview);

	// Add Income Selection  Popup
	var incomeSelectWrapperView = Ti.UI.createView({
		visible : false,
		zIndex : 200,
	});
	// Full screen
	var incomeSelectBackgroundView = Ti.UI.createView({// Also full screen
		backgroundColor : '#000',
		opacity : 0.6
	});
	var incomeSelectContainerView = Ti.UI.createView({// Set height appropriately
		layout : 'vertical',
		width : '85%',
		height : deviceHeight * 0.365,
		backgroundColor : '#FFF',
	});

	var incomeSelectview_popuptitle = Ti.UI.createView({
		height : deviceHeight * 0.075,
		backgroundColor : '#2980B9',
	});

	var incomeSelectsomeLabel = Ti.UI.createLabel({
		text : 'Select Option',
		color : '#FFFFFF',
		font : {
			fontSize : stylefontsize + 2,
			//fontFamily : customFont2,
		},
	});

	var incomeSelectimagepopupclose = Ti.UI.createImageView({
		image : '../images/closebtn.png',
		backgroundSelectedColor : '#999999',
		width : '9%',
		right : '3%',
	});

	incomeSelectview_popuptitle.add(incomeSelectsomeLabel);
	incomeSelectview_popuptitle.add(incomeSelectimagepopupclose);
	incomeSelectContainerView.add(incomeSelectview_popuptitle);

	var btnIncomebyAdhoc = Ti.UI.createView({
		backgroundColor : settingsbtncol,
		backgroundSelectedColor : settingsbtnselectedcol,
		left : '1%',
		right : '1%',
		top : '2%',
		bottom : '0.5%',
		// height : deviceHeight * 0.11,
		height : settingOptionHeight,
	});

	var lblAdhocIncome = Ti.UI.createLabel({
		text : 'Other Bank Receipts',
		//width : '70%',
		color : settingsbtnfontcolor,
		left : '5%',
		font : {
			//fontFamily : customFont1,
			fontSize : stylefontsize,
		},
	});

	btnIncomebyAdhoc.add(lblAdhocIncome);
	incomeSelectContainerView.add(btnIncomebyAdhoc);

	var btnIncomebyInvoice = Ti.UI.createView({
		backgroundColor : settingsbtncol,
		backgroundSelectedColor : settingsbtnselectedcol,
		left : '1%',
		right : '1%',
		top : '1%',
		bottom : '0.5%',
		// height : deviceHeight * 0.11,
		height : settingOptionHeight,
	});

	var lblInvoiceIncome = Ti.UI.createLabel({
		text : 'Customer Payments Against Invoices', //Invoice Income',
		//width : '70%',
		color : settingsbtnfontcolor,
		left : '5%',
		font : {
			//fontFamily : customFont1,
			fontSize : stylefontsize,
		},
	});

	btnIncomebyInvoice.add(lblInvoiceIncome);
	incomeSelectContainerView.add(btnIncomebyInvoice);
	
	var btnAddIncome = Ti.UI.createView({
		backgroundColor : settingsbtncol,
		backgroundSelectedColor : settingsbtnselectedcol,
		left : '1%',
		right : '1%',
		top : '2%',
		bottom : '0.5%',
		height : settingOptionHeight,
	});

	var lblAddIncome = Ti.UI.createLabel({
		text : 'All Income',
		color : settingsbtnfontcolor,
		left : '5%',
		font : {
			fontSize : stylefontsize,
		},
	});
	
	btnAddIncome.addEventListener('click', function() {
		// Add new Invoice Income
		/*var objAddIncome = require('addIncome');
		var newAddIncomeView = objAddIncome.getAddIncomeView();
		win.add(newAddIncomeView);*/
		
		var objAddIncome = require('addOtherIncome');
		var newAddIncomeView = objAddIncome.addIncome();
		win.add(newAddIncomeView);

		incomeSelectWrapperView.hide();
		newAddIncomeView.show();
		
		addInvoiceIncomeViewOpen = true;
		isincomeSelectWrapperViewShowed = false;
		
	});

	btnAddIncome.add(lblAddIncome);
	incomeSelectContainerView.add(btnAddIncome);

	incomeSelectWrapperView.add(incomeSelectBackgroundView);
	incomeSelectWrapperView.add(incomeSelectContainerView);

	incomeSelectimagepopupclose.addEventListener('click', function() {
		incomeSelectWrapperView.hide();
		isincomeSelectWrapperViewShowed = false;
		//mainExpenseView.scrollingEnabled = true;
	});

	/********* EOF Add Income Selection  Popup***************/

	function showEntriesPopup(showView) {
		// Add Income Selection  Popup
		var entrySelectWrapperView = Ti.UI.createView({
			zIndex : 200,
		});
		// Full screen
		var entrySelectBackgroundView = Ti.UI.createView({// Also full screen
			backgroundColor : '#000',
			opacity : 0.6
		});
		var entrySelectContainerView = Ti.UI.createView({// Set height appropriately
			layout : 'vertical',
			width : '85%',
			height : Ti.UI.SIZE,
			backgroundColor : '#FFF',
		});

		var popuptitle = Ti.UI.createView({
			height : deviceHeight * 0.075,
			backgroundColor : '#2980B9',
		});

		var incomeSelectsomeLabel = Ti.UI.createLabel({
			text : 'Select Option',
			color : '#FFFFFF',
			font : {
				fontSize : stylefontsize + 2,
				//fontFamily : customFont2,
			},
		});

		var btnclose = Ti.UI.createImageView({
			image : '/images/closebtn.png',
			backgroundSelectedColor : '#999999',
			width : '9%',
			right : '3%',
		});

		popuptitle.add(incomeSelectsomeLabel);
		popuptitle.add(btnclose);
		entrySelectContainerView.add(popuptitle);

		var btnExpenses = Ti.UI.createView({
			backgroundColor : settingsbtncol,
			backgroundSelectedColor : settingsbtnselectedcol,
			left : '5%',
			right : '5%',
			top : '15dp',
			height : '40dp'
		});

		var lblExpenses = Ti.UI.createLabel({
			text : 'Expenses',
			//width : '70%',
			color : settingsbtnfontcolor,
			left : '5%',
			font : {
				//fontFamily : customFont1,
				fontSize : stylefontsize,
			},
		});

		btnExpenses.add(lblExpenses);
		entrySelectContainerView.add(btnExpenses);

		btnExpenses.addEventListener('click', function() {
			showView(1);
			win.remove(entrySelectWrapperView);
		});

		var btnIncome = Ti.UI.createView({
			backgroundColor : settingsbtncol,
			backgroundSelectedColor : settingsbtnselectedcol,
			left : '5%',
			right : '5%',
			top : '15dp',
			height : '40dp'
		});

		btnIncome.addEventListener('click', function() {
			showView(2);
			win.remove(entrySelectWrapperView);
		});

		var lblIncome = Ti.UI.createLabel({
			text : 'Income',
			//width : '70%',
			color : settingsbtnfontcolor,
			left : '5%',
			font : {
				//fontFamily : customFont1,
				fontSize : stylefontsize,
			},
		});

		btnIncome.add(lblIncome);
		entrySelectContainerView.add(btnIncome);

		var btnInvoices = Ti.UI.createView({
			backgroundColor : settingsbtncol,
			backgroundSelectedColor : settingsbtnselectedcol,
			left : '5%',
			right : '5%',
			top : '15dp',
			height : '40dp'

		});

		btnInvoices.addEventListener('click', function() {
			showView(3);
			win.remove(entrySelectWrapperView);
		});

		var lblInvoices = Ti.UI.createLabel({
			text : 'Invoices',
			//width : '70%',
			color : settingsbtnfontcolor,
			left : '5%',
			font : {
				//fontFamily : customFont1,
				fontSize : stylefontsize,
			},
		});

		btnInvoices.add(lblInvoices);
		entrySelectContainerView.add(btnInvoices);
		entrySelectContainerView.add(Ti.UI.createView({
			height : "15dp"
		}));

		entrySelectWrapperView.add(entrySelectBackgroundView);
		entrySelectWrapperView.add(entrySelectContainerView);

		btnclose.addEventListener('click', function() {
			win.remove(entrySelectWrapperView);
			//mainExpenseView.scrollingEnabled = true;
		});

		win.add(entrySelectWrapperView);
		return entrySelectWrapperView;

	}// end

	// -- view variable list
	var settingViewOpen = false;
	var addAccountViewOpen = false;
	var addInvoiceViewOpen = false;
	var dropboxBackupOpen = false;
	var settingsAccountListOpen = false;
	Ti.App.Properties.setBool('editInvoiceViewOpen', false);
	var addExpenseViewOpen = false;

	var addAdhocIncomeViewOpen = false;
	Ti.App.Properties.setBool('editAdhocIncomeViewOpen', false);

	var addInvoiceIncomeViewOpen = false;
	Ti.App.Properties.setBool('editAdhocIncomeViewOpen', false);

	Ti.App.Properties.setBool('editExpenseViewOpen', false);
	var editDeleteEntriesopen = false;
	var deleteEntriesopen = false;
	var viewEntriesopen = false;
	var popUp = false;
	var isincomeSelectWrapperViewShowed = false;
	var isinvoiceSelectWrapperViewShowed = false;

	//var editExpenseViewOpen = Ti.UI.createLabel({text:"0"});
	// -- EOF View Variable List

	btn_dashboard_addincome.addEventListener('click', function() {
		//incomeSelectWrapperView.show();
		//isincomeSelectWrapperViewShowed = true;
		var objAddIncome = require('addOtherIncome');
		var newAddIncomeView = objAddIncome.addIncome();
		win.add(newAddIncomeView);

		//incomeSelectWrapperView.hide();
		newAddIncomeView.show();
		
		addAdhocIncomeViewOpen = true;
		
	});

	btnIncomebyAdhoc.addEventListener('click', function() {
		// Add new Adhoc Income
		var objAdhocIncome = require('adhocincome');
		//var newAdhocIncomeview = new objAdhocIncome();
		var newAdhocIncomeview = objAdhocIncome.Adhocincome();
		win.add(newAdhocIncomeview);

		incomeSelectWrapperView.hide();
		newAdhocIncomeview.show();
		addAdhocIncomeViewOpen = true;
		isincomeSelectWrapperViewShowed = false;
	});

	// EOF Add New Adhoc Income View

	btnIncomebyInvoice.addEventListener('click', function() {
		// Add new Invoice Income
		var objinvoiceIncome = require('incomeInvoice');
		//var newInvoiceIncomeview = new objinvoiceIncome();
		var newInvoiceIncomeview = objinvoiceIncome.IncomeInvoice();
		win.add(newInvoiceIncomeview);

		incomeSelectWrapperView.hide();
		newInvoiceIncomeview.show();
		addInvoiceIncomeViewOpen = true;
		isincomeSelectWrapperViewShowed = false;
	});

	// EOF Add New Invoice Income View

	btnsettings.addEventListener('click', function() {
		var objSettingsView = require('settingsView');
		var settingView = objSettingsView.settingView();

		win.add(settingView);

		settingView.show();
		settingViewOpen = true;
	});

	/*// entries list view
	var objListEntriesView = require('listEntriesView');
	var listEntriesView = objListEntriesView.listEntriesView('test');
	
	win.add(listEntriesView);*/

	btn_viewentries.addEventListener('click', function() {

		popUp = showEntriesPopup(function(x) {
			
			// entries list view
			var objListEntriesView = require('editableListEntriesView');
			var listEntriesView = objListEntriesView.editablelistentries(x);
			win.add(listEntriesView);
			
			listEntriesView.show();
			listEntriesView.update(x);
			viewEntriesopen = true;
			popUp = false;
		});

	});
	// EOF entries list view

	btn_dashboard_addexpense.addEventListener('click', function(e) {
		
		// add new expence View
		var objAddNewExpence = require('addexpense');
		var addNewExpenceView = objAddNewExpence.addExpenceView();
		//objAddNewExpence.setExpenceData(1);
		win.add(addNewExpenceView);

		addNewExpenceView.show();
		addExpenseViewOpen = true;
	});

	// EOF add new expence view

	btn_dashboard_createinvoice.addEventListener('click', function() {
		// Add New Invoice View
		/*var objCreateInvoiceView = require('createInvoice');
		var createInvoiceView = objCreateInvoiceView.createinvoiceRecord();

		win.add(createInvoiceView);

		createInvoiceView.show();
		addInvoiceViewOpen = true;*/
		invoiceSelectWrapperView.show();
		isincomeSelectWrapperViewShowed = true;
	});
	// EOF add Invoice View

	// Create Account View
	var objCreateaccountView = require('createaccount');
	var createaccountView = objCreateaccountView.createaccountRecord();

	win.add(createaccountView);

	btn_dashboard_createaccount.addEventListener('click', function() {
		//createaccountView.show();
		//addAccountViewOpen = true;

		var objSettingsView = require('settingsView');
		var AccountView = objSettingsView.AccountListView();

		win.add(AccountView);

		AccountView.show();
		//settingViewOpen = true;
		settingsAccountListOpen = true;

		Ti.App.fireEvent('showAccountList');
		//Ti.App.fireSystemEvent
	});

	Ti.App.addEventListener('showAccountList2', function() {
		console.log("Accout list listing.....2");
	});
	// EOF Create Account View

	// access reports View
	/*var objaccessreportsView = require('accessreports');
	var accessreportsView = objaccessreportsView.accessreports();

	win.add(accessreportsView);

	btn_Deletereports.addEventListener('click', function(){
	accessreportsView.show();
	});*/
	// EOF access reports View

	/*// Delete Entries View
	var objdeleteentriesView = require('deleteentries');
	var deleteentriesView = objdeleteentriesView.deleteentries();

	win.add(deleteentriesView);*/

	btn_Deletereports.addEventListener('click', function() {

		popUp = showEntriesPopup(function(x) {
			// Delete Entries View
			var objdeleteentriesView = require('deleteentries');
			var deleteentriesView = objdeleteentriesView.deleteentries(x);
			win.add(deleteentriesView);
			
			deleteentriesView.show();
			deleteentriesView.update(x);
			deleteEntriesopen = true;
			popUp = false;
		});

	});
	// EOF access reports View

	// summery totals View
	var objsummerytotalsView = require('summerytotals');
	var summerytotalsView = objsummerytotalsView.summerytotals();

	win.add(summerytotalsView);

	btn_summerytotals.addEventListener('click', function() {
		//delete this
		/*alert("This feature is underdevelopment.");
		return;
		summerytotalsView.show();*/
		var toast = Ti.UI.createNotification({
				message : "Under Constructon",
				duration : Ti.UI.NOTIFICATION_DURATION_SHORT
			});
		toast.show();
	});
	// EOF summery totals View

	/*// Edit Delete Entries View
	var objeditdeleteentriesView = require('editdeleteentries');
	var editdeleteentriesView = objeditdeleteentriesView.editdeleteentries();

	win.add(editdeleteentriesView);*/

	btn_editdeleteentries.addEventListener('click', function() {

		popUp = showEntriesPopup(function(x) {
			// Edit Delete Entries View
			var objeditdeleteentriesView = require('editdeleteentries');
			var editdeleteentriesView = objeditdeleteentriesView.editdeleteentries(x);
			win.add(editdeleteentriesView);
			
			editdeleteentriesView.show();
			editdeleteentriesView.update(x);
			editDeleteEntriesopen = true;
			popUp = false;
		});

	});
	// EOF Edit Delete Entries View

	// Dropbox backup
	var db_name = 'mywallet';
	var private_dir = Ti.Filesystem.applicationDataDirectory;
	// data path of the phone
	var app_dir = 'mywallet/backup';
	//
	var private_app_dir = private_dir + app_dir;
	//
	var dropbox = require('dropbox');

	var client = dropbox.createClient({
		app_key : 'e1kvksgtr98d2yz', // <--- you'll want to replace this
		app_secret : '2rvl6fa5kcjmal6', // <--- and this with your own keys!
		root : "mywalletapp" // optional (defaults to sandbox)
	});

	var db_export = function(db_name) {
		var dbPath = 'file:///data/data/' + Ti.App.getID() + '/databases';
		var dbFile = Ti.Filesystem.getFile(dbPath, db_name);
		return dbFile.read();
	};

	var back_up_and_upload_to_dropbox = function(raw_file) {

		var options = {
			overwrite : true, // optional
			root : "auto"
		};
		client.put(db_name + '.db', raw_file, options, function(status, reply) {
			lbl_dropbox_lbl.visible = false;
			btn_backupToDropbox.enabled = true;
			btn_restoreFromDropbox.enabled = true;

			var toast = Ti.UI.createNotification({
				message : "Backup Successful",
				duration : Ti.UI.NOTIFICATION_DURATION_SHORT
			});
			toast.show();
		});

	};

	var dropboxRestore = function() {

		var options = {
			root : "auto"
		};
		// download db from dropbox
		//client.get('test.jpg', options, function(status, reply) {
		client.get(db_name + '.db', options, function(status, reply) {

			//new db write in local
			var new_file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, db_name + '.db');
			new_file.write(reply);

			data_drop(db_name);
			// 	drop Database

			var db_file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, db_name + '.db');

			if (Ti.Database.install(db_file.getNativePath(), db_name)) {
				Ti.API.info('local db installed');
				var msg = 'Restore Successful';
				//sample();
			} else {
				var msg = 'Could Not be Restored';
			};
			lbl_dropbox_lbl.visible = false;
			btn_backupToDropbox.enabled = true;
			btn_restoreFromDropbox.enabled = true;

			var toast = Ti.UI.createNotification({
				message : msg,
				duration : Ti.UI.NOTIFICATION_DURATION_SHORT
			});
			toast.show();

		});

	};

	var sample = function() {

		var rows = db.execute('SELECT account_name  FROM tbl_account');

		Ti.API.info('Row count: ' + rows.rowCount);
		var fieldCount;
		// fieldCount is a method on iOS and a property on Android in prior versions of the SDK.
		// fieldCount is a property on all supported platforms since Release 3.3.0 of the Titanium SDK.
		if ((Ti.Platform.name === 'android') || (Ti.version >= '3.3.0')) {
			fieldCount = rows.fieldCount;
		} else {
			fieldCount = rows.fieldCount();
		}
		Ti.API.info('Field count: ' + fieldCount);

		while (rows.isValidRow()) {
			Ti.API.info('Person ---> account_name: ' + rows.fieldByName('account_name'));
			rows.next();
		}
	};

	var data_drop = function(db_name) {
		var db = Ti.Database.open(db_name);
		db.remove();
	};

	var dropboxPopupcontainerView = Ti.UI.createView({// Set height appropriately
		layout : 'vertical',
		width : '100%',
		visible : false,
		height : '100%',
		backgroundColor : '#FFF'
	});

	var view_dropboxpopuptitle = Ti.UI.createView({
		height : deviceHeight * 0.075,
		backgroundColor : '#2980B9',
	});

	var lbldropboxpopuptitle = Ti.UI.createLabel({
		text : 'Dropbox Backup',
		color : '#FFFFFF',
		font : {
			fontSize : stylefontsize + 2,
			fontFamily : customFont2,
		},
	});

	var imgdropboxpopupclose = Ti.UI.createImageView({
		image : '/images/backbtn.png',
		backgroundSelectedColor : '#999999',
		width : '13%',
		left : '0%',
	});

	imgdropboxpopupclose.addEventListener('click', function() {
		dropboxPopupcontainerView.hide();
	});

	view_dropboxpopuptitle.add(lbldropboxpopuptitle);
	view_dropboxpopuptitle.add(imgdropboxpopupclose);
	dropboxPopupcontainerView.add(view_dropboxpopuptitle);

	var dropboxpopupinputview = Titanium.UI.createScrollView({
		layout : 'vertical',
		//backgroundColor : 'red',
		height : deviceHeight * 0.925,
	});

	var btn_backupToDropbox = Ti.UI.createButton({
		title : 'Backup to Dropbox',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		backgroundColor : '#054e62',
		backgroundSelectedColor : '#0a7390',
		top : deviceHeight * 0.030,
		height : deviceHeight * 0.075,
		width : '80%',
		font : {
			fontSize : stylefontsize - 1,
			fontFamily : customFont
		},
		backgroundDisabledColor : '#36A4C2',
	});

	var btn_restoreFromDropbox = Ti.UI.createButton({
		title : 'Restore from Dropbox',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		backgroundColor : '#054e62',
		backgroundSelectedColor : '#0a7390',
		backgroundDisabledColor : '#36A4C2',
		top : deviceHeight * 0.030,
		height : deviceHeight * 0.075,
		width : '80%',
		font : {
			fontSize : stylefontsize - 1,
			fontFamily : customFont
		},
	});

	var lbl_dropbox_lbl = Ti.UI.createLabel({
		text : 'Please Wait...',
		top : deviceHeight * 0.15,
		visible : false,
		font : {
			fontSize : stylefontsize + 1,
			fontFamily : customFont1
		},
	});

	var appResoreConf = Ti.UI.createAlertDialog({
		cancel : 1,
		buttonNames : ['Yes', 'No'],
		message : 'Are you sure you want to restore?',
		title : 'Resore Confirmation?'
	});
	dropboxpopupinputview.add(btn_backupToDropbox);
	dropboxpopupinputview.add(btn_restoreFromDropbox);
	dropboxpopupinputview.add(lbl_dropbox_lbl);
	dropboxPopupcontainerView.add(appResoreConf);
	dropboxPopupcontainerView.add(dropboxpopupinputview);

	win.add(dropboxPopupcontainerView);

	btnbackup.addEventListener('click', function() {
		var toast = Ti.UI.createNotification({
				message : "Under Construction",
				duration : Ti.UI.NOTIFICATION_DURATION_SHORT
			});
			toast.show();
		/*console.log('Backup btn clicked');
		if (Ti.Network.online) {
			if (client.isAuthorized()) {
				console.log('Backup and restore');
				dropboxPopupcontainerView.show();
			} else {
				console.log('plz login');
				var options = {};
				client.login(function(options) {
					// win.open();
					// Ti.app.fireevet()sjdfklj
					dropboxPopupcontainerView.show();
				});
				//win.open();
			}

		} else {
			var toast = Ti.UI.createNotification({
				message : "No Internet Connection",
				duration : Ti.UI.NOTIFICATION_DURATION_SHORT
			});
			toast.show();
		}*/
	});

	btn_backupToDropbox.addEventListener('click', function() {
		db_raw = db_export(db_name);
		btn_backupToDropbox.enabled = false;
		btn_restoreFromDropbox.enabled = false;
		lbl_dropbox_lbl.visible = true;
		back_up_and_upload_to_dropbox(db_raw);
	});

	btn_restoreFromDropbox.addEventListener('click', function() {
		appResoreConf.show();

	});

	appResoreConf.addEventListener('click', function(e) {
		if (e.index === e.source.cancel) {
			Ti.API.info('The cancel button was clicked');
		} else {
			btn_backupToDropbox.enabled = false;
			btn_restoreFromDropbox.enabled = false;
			lbl_dropbox_lbl.visible = true;
			dropboxRestore();
		}
	});

	// EOF DropBox backup

	win.addEventListener('android:back', function(e) {
		if (settingViewOpen) {
			Ti.App.fireEvent('settingsClose', 'e');
			settingViewOpen = false;
		} else if (addAccountViewOpen) {
			Ti.App.fireEvent('addAccountViewClose', 'e');
			addAccountViewOpen = false;
		} else if (addExpenseViewOpen) {
			Ti.App.fireEvent('addExpenceViewClose', 'e');
			addExpenseViewOpen = false;
		} else if (addInvoiceViewOpen) {
			Ti.App.fireEvent('addInvoiceViewClose', 'e');
			addInvoiceViewOpen = false;
		} else if (addAdhocIncomeViewOpen) {// add AdhocIncome
			Ti.App.fireEvent('addview_addIncomeContainerClose', 'e');
			addAdhocIncomeViewOpen = false;
		} else if (addInvoiceIncomeViewOpen) {//add InvoiceIncome
			Ti.App.fireEvent('addInvoiceIncomeViewClose', 'e');
			addInvoiceIncomeViewOpen = false;

		} else if (Ti.App.Properties.getBool('editIncomeInvoiceViewOpen')) {//edit InvoiceIncome

			Ti.App.fireEvent('editInvoiceIncomeViewClose', 'e');
			Ti.App.Properties.setBool('editIncomeInvoiceViewOpen', false);

		} else if (Ti.App.Properties.getBool('editAdhocIncomeViewOpen')) {//edit AdhocIncome

			Ti.App.fireEvent('editview_addIncomeContainerClose', 'e');
			Ti.App.Properties.setBool('editAdhocIncomeViewOpen', false);

		} else if (Ti.App.Properties.getBool('editExpenseViewOpen')) {//edit Expense

			Ti.App.fireEvent('editExpenceViewClose', 'e');
			Ti.App.Properties.setBool('editExpenseViewOpen', false);

		} else if (Ti.App.Properties.getBool('editInvoiceViewOpen')) {//edit InvoiceIncome

			Ti.App.fireEvent('editInvoiceViewClose', 'e');
			Ti.App.Properties.setBool('editInvoiceViewOpen', false);

		} else if (viewEntriesopen) {
			Ti.App.fireEvent('viewEntriesClose', 'e');
			viewEntriesopen = false;
		} else if (editDeleteEntriesopen) {
			Ti.App.fireEvent('editDeleteEntriesClose', 'e');
			editDeleteEntriesopen = false;
		} else if (deleteEntriesopen) {
			Ti.App.fireEvent('deleteEntriesClose', 'e');
			deleteEntriesopen = false;
		} else if (dropboxBackupOpen) {
			dropboxPopupcontainerView.hide();
			dropboxBackupOpen = false;
		} else if (settingsAccountListOpen) {
			settingsAccountListOpen = false;
			Ti.App.fireEvent('accountListViewClose');
		} else if (isincomeSelectWrapperViewShowed) {
			incomeSelectWrapperView.hide();
			isincomeSelectWrapperViewShowed = false;
		} else if (popUp) {

			win.remove(popUp);
			popUp = false;
		} else {
			//appCloseConf.show();
		}
		return false;
	});

	btnclose.addEventListener('click', function(e) {
		appCloseConf.show();
	});
	var appCloseConf = Ti.UI.createAlertDialog({
		cancel : 1,
		buttonNames : ['Yes', 'No'],
		message : 'Do you want to Close this App?',
	});

	appCloseConf.addEventListener('click', function(e) {
		if (e.index === e.source.cancel) {
			// cancel area
		} else {
			var activity = Titanium.Android.currentActivity;
			activity.finish();
		}
	});
	// --- EOF Eventlistners

	win.addEventListener('onload', function(e) {
		//alert('11111');
	});
	win.add(incomeSelectWrapperView);
	
	//#
	
	var devHeight, devWidth;
	
	var logicalDesityFactor = Ti.Platform.displayCaps.logicalDensityFactor;
	
	if(Ti.Platform.displayCaps.platformWidth < Ti.Platform.displayCaps.platformHeight){
		devHeight = Ti.Platform.displayCaps.platformHeight / logicalDesityFactor;
		devWidth = Ti.Platform.displayCaps.platformWidth / logicalDesityFactor;
	} else {
		devWidth = Ti.Platform.displayCaps.platformHeight / logicalDesityFactor;
		devHeight = Ti.Platform.displayCaps.platformWidth / logicalDesityFactor;
	}
	
	var vwMain = Ti.UI.createView({
		height : devHeight,
		width : devWidth,
		backgroundColor : '#2F3739',		
	});
	
	var bottomRowNav = Ti.UI.createView({
		layout : 'horizontal',
		height : (devWidth - 4) / 3,
		width : devWidth,
		backgroundColor : 'transparent',
		bottom : 1
	});
	
	var topRowNav = Ti.UI.createView({
		layout : 'horizontal',
		height : (devWidth - 4) / 3,
		width : devWidth,
		backgroundColor : 'transparent',
		bottom : ((devWidth - 4) / 3) + 2		
	});
	
	var titleRowNav = Ti.UI.createView({
		layout : 'horizontal',
		height : (devWidth) / 6,
		width : devWidth,
		backgroundColor : '#2F3739',
		top : 0		
	});
	
	function createSingleBtn(){
		var singlebtn = Ti.UI.createView({
			height : (devWidth - 4) / 3,
			width : (devWidth - 4) / 3,
			left : 1,
			backgroundColor : '#2D3235',
		});
		return singlebtn;
	}
		
	//win.add(vwMain);
	vwMain.add(titleRowNav);
	vwMain.add(topRowNav);
	vwMain.add(bottomRowNav);
	
	topRowNav.add(new createSingleBtn());
	topRowNav.add(new createSingleBtn());
	topRowNav.add(new createSingleBtn());
	bottomRowNav.add(new createSingleBtn());
	bottomRowNav.add(new createSingleBtn());
	bottomRowNav.add(new createSingleBtn());
	
	//#
	
	// Add Income Selection  Popup
	var invoiceSelectWrapperView = Ti.UI.createView({
		visible : false,
		zIndex : 200,
	});
	// Full screen
	var invoiceSelectBackgroundView = Ti.UI.createView({// Also full screen
		backgroundColor : '#000',
		opacity : 0.6
	});
	var invoiceSelectContainerView = Ti.UI.createView({// Set height appropriately
		layout : 'vertical',
		width : '85%',
		//height : deviceHeight * 0.25,
		height: '230',
		backgroundColor : '#FFF',
	});
console.log ("************************ " + deviceHeight);
	var invoiceSelectview_popuptitle = Ti.UI.createView({
		height : deviceHeight * 0.075,
		backgroundColor : '#2980B9',
	});

	var invoiceSelectsomeLabel = Ti.UI.createLabel({
		text : 'Select Option',
		color : '#FFFFFF',
		font : {
			fontSize : stylefontsize + 2,
			//fontFamily : customFont2,
		},
	});

	var invoiceSelectimagepopupclose = Ti.UI.createImageView({
		image : '/images/closebtn.png',
		backgroundSelectedColor : '#999999',
		width : '9%',
		right : '3%',
	});

	invoiceSelectview_popuptitle.add(invoiceSelectsomeLabel);
	invoiceSelectview_popuptitle.add(invoiceSelectimagepopupclose);
	invoiceSelectContainerView.add(invoiceSelectview_popuptitle);

	var btnRecordInvoice = Ti.UI.createView({
		backgroundColor : settingsbtncol,
		backgroundSelectedColor : settingsbtnselectedcol,
		left : '5%',
		right : '5%',
		top : '10%',
		bottom : '5%',
		// height : deviceHeight * 0.11,
		height : settingOptionHeight,
	});

	var lblIRecordInvoice = Ti.UI.createLabel({
		text : 'Record Invoices',
		//width : '70%',
		color : settingsbtnfontcolor,
		left : '5%',
		font : {
			//fontFamily : customFont1,
			fontSize : stylefontsize,
		},
	});

	btnRecordInvoice.add(lblIRecordInvoice);
	invoiceSelectContainerView.add(btnRecordInvoice);

	var btnCreditNote = Ti.UI.createView({
		backgroundColor : settingsbtncol,
		backgroundSelectedColor : settingsbtnselectedcol,
		left : '5%',
		right : '5%',
		top : '10%',
		bottom : '5%',
		// height : deviceHeight * 0.11,
		height : settingOptionHeight,
	});

	var lblCreditNote = Ti.UI.createLabel({
		text : 'Record Credit Notes', //Invoice Income',
		//width : '70%',
		color : settingsbtnfontcolor,
		left : '5%',
		font : {
			//fontFamily : customFont1,
			fontSize : stylefontsize,
		},
	});

	btnCreditNote.add(lblCreditNote);
	invoiceSelectContainerView.add(btnCreditNote);

	invoiceSelectWrapperView.add(invoiceSelectBackgroundView);
	invoiceSelectWrapperView.add(invoiceSelectContainerView);

	invoiceSelectimagepopupclose.addEventListener('click', function() {
		invoiceSelectWrapperView.hide();
		isinvoiceSelectWrapperViewShowed = false;
	});
		
	btnRecordInvoice.addEventListener('click', function() {
		var objCreateInvoiceView = require('createInvoice');
		var createInvoiceView = objCreateInvoiceView.createinvoiceRecord(false, "new");
		win.add(createInvoiceView);
		createInvoiceView.show();
		invoiceSelectWrapperView.hide();
		addInvoiceViewOpen = true;
		isinvoiceSelectWrapperViewShowed = false;
	});
	
	btnCreditNote.addEventListener('click', function() {
		var objCreateInvoiceView = require('createInvoice');
		var createInvoiceView = objCreateInvoiceView.createinvoiceRecord(true, "new");
		win.add(createInvoiceView);
		createInvoiceView.show();
		invoiceSelectWrapperView.hide();
		addInvoiceViewOpen = true;
		isinvoiceSelectWrapperViewShowed = false;
	});
	
	win.add(invoiceSelectWrapperView);
		
	//#
	
	return win;
};
