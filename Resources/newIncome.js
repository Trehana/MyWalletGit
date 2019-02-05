exports.newIncomeRecord = function () {
	
	//var deviceHeight = Ti.Platform.displayCaps.platformHeight;

	var logicalDesityFactor = Ti.Platform.displayCaps.logicalDensityFactor * 1;

	var ex_height = Titanium.Platform.displayCaps.platformHeight * 1;
	var ex_width = Ti.Platform.displayCaps.platformWidth * 1;
	if (ex_height > ex_width) {
		var deviceHeight = ((Titanium.Platform.displayCaps.platformHeight * 1) / logicalDesityFactor);
	} else {
		var deviceHeight = ((Titanium.Platform.displayCaps.platformWidth * 1) / logicalDesityFactor);
	}
	
	var incomepopupcontainerView = Ti.UI.createView({// Set height appropriately
		//layout : 'vertical', 
		visible : false,
		width : '100%',
		height : '100%',
		//backgroundColor : '#FFF'
	});
	
	var view_incomepopuptitle = Ti.UI.createView({
		height : deviceHeight * 0.075, top : 0,
		backgroundColor : '#2980B9',
	});
	
	var lblincomepopuptitle = Ti.UI.createLabel({
		text : 'Add Income',
		color : '#FFFFFF',
		font : {
			fontSize : stylefontsize + 2,
			fontFamily : customFont2,
		},
	});
	
	var imgincomepopupclose = Ti.UI.createImageView({
		image : '/images/backbtn.png',
		backgroundSelectedColor : '#999999',
		width : '13%',
		left : '0%',
	});
	
	view_incomepopuptitle.add(lblincomepopuptitle);
	view_incomepopuptitle.add(imgincomepopupclose);
	incomepopupcontainerView.add(view_incomepopuptitle);
	
	var incomepopupbtnview = Titanium.UI.createView({
		//layout : 'vertical',
		//backgroundColor : 'yellow',
		height : deviceHeight * 0.075,
		top: deviceHeight * 0.075,
	});
	
	
	var btnswitch = Ti.UI.createView({
		top : '10%',
		width : '97%',
		height : '90%',
		//borderRadius : 10 ,
		// backgroundColor : 'white',
	});
	
	var btnswitch1 = Ti.UI.createButton({
		width : '49%',
		height : '100%',
		font : {
			fontSize : stylefontsize - 3,
			fontFamily : customFont1,
		},
		enabled : false,
		title : 'Adhoc Payments',
		color: '#ffffff',
		disabledColor : '#999999',
		backgroundImage : '/images/flat_switch_button_on.png',
		backgroundDisabledColor : '#c3c3c3',
		backgroundColor : '#4485F6',
		left : 0,
	});
	
	
	var btnswitch2 = Ti.UI.createButton({
		width : '49%',
		height : '100%',
		font : {
			fontSize : stylefontsize - 3,
			fontFamily : customFont1,
		},
		title : 'Invoice Payments',
		
		color : '#999999',
		disabledColor : '#ADB7B6',
		backgroundDisabledColor : '#4485F6',
		//backgroundImage : '/images/flat_switch_button_off.png',
		backgroundColor : '#c3c3c3',
		right : 0,
	});
	btnswitch.add(btnswitch1);
	btnswitch.add(btnswitch2);
	incomepopupbtnview.add(btnswitch);
	incomepopupcontainerView.add(incomepopupbtnview);
	
	var incomepopupinputview = Titanium.UI.createView({
		height : deviceHeight * 0.85, 
		top: deviceHeight * (0.075*2),
	});
	
	var adhocincome = require('adhocincome');
	var adhocIncomeViews = new adhocincome();
	
	var incomeInvoice = require('incomeInvoice');
	//var incomeInvoiceHomePage = new incomeInvoice();
	var incomeFromInvoiceViews = new incomeInvoice();
	
	incomepopupinputview.add(adhocIncomeViews['mainAdhocView']);
	incomepopupcontainerView.add(adhocIncomeViews['wrapperView']);
	incomepopupcontainerView.add(adhocIncomeViews['AdhocVatWrapperView']);
	incomepopupcontainerView.add(adhocIncomeViews['calView']);
	
	incomepopupinputview.add(incomeFromInvoiceViews['mainInvoiceView']);
	incomepopupcontainerView.add(incomeFromInvoiceViews['invoiceWrapperView']);
	incomepopupcontainerView.add(incomeFromInvoiceViews['calView']);
	
	//adhocIncomeView.show();
	
	Ti.App.addEventListener('addIncomeClose', function(e) {
	    incomepopupcontainerView.hide();
	});
	
	btnswitch1.addEventListener('click', function() {
		btnswitch1.enabled = false;
		btnswitch2.enabled = true;
		btnswitch1.backgroundDisabledColor = '#c3c3c3';
		btnswitch2.backgroundColor = '#c3c3c3';
		btnswitch1.backgroundImage = '/images/flat_switch_button_on.png';
		btnswitch2.backgroundImage = '';
		btnswitch2.color = '#999999';
		btnswitch1.color = '#ffffff';
		
		incomeFromInvoiceViews['mainInvoiceView'].hide();
		adhocIncomeViews['mainAdhocView'].show();
	});
	
	btnswitch2.addEventListener('click', function() {
		btnswitch1.enabled = true;
		btnswitch2.enabled = false;
		btnswitch2.backgroundDisabledColor = '#c3c3c3';
		btnswitch1.backgroundColor = '#c3c3c3';
		btnswitch1.backgroundImage = '',
		btnswitch2.backgroundImage = '/images/flat_switch_button_on.png',
		btnswitch2.color = '#ffffff';
		btnswitch1.color = '#999999';
		
		incomeFromInvoiceViews['mainInvoiceView'].show();
		adhocIncomeViews['mainAdhocView'].hide();
	});

	
	imgincomepopupclose.addEventListener('click', function() {
		incomepopupcontainerView.hide();
	});
	
	incomepopupcontainerView.add(incomepopupinputview);
	
	return incomepopupcontainerView;
};