exports.accessreports = function() {	
	
	var accessreportspopupcontainerView = Ti.UI.createView({// Set height appropriately
		//layout : 'vertical',
		visible : false,
		width : '100%',
		height : '100%',
		backgroundColor : '#ffffff'
	});

	var view_accessreportspopuptitle = Ti.UI.createView({
		height : deviceHeight * 0.075,
		top : 0,
		backgroundColor : '#2980B9',
	});

	var lblaccessreportspopuptitle = Ti.UI.createLabel({
		text : 'Access Reports',
		color : '#FFFFFF',
		font : {
			fontSize : stylefontsize + 2,
			fontFamily : customFont2,
		},
	});

	var imgaccessreportspopupclose = Ti.UI.createImageView({
		image : '../images/backbtn.png',
		backgroundSelectedColor : '#999999',
		width : '13%',
		left : '0%',
	});

	view_accessreportspopuptitle.add(lblaccessreportspopuptitle);
	view_accessreportspopuptitle.add(imgaccessreportspopupclose);
	accessreportspopupcontainerView.add(view_accessreportspopuptitle);

	var accessreportspopupinputview = Titanium.UI.createScrollView({
		height : deviceHeight * 0.925,
		top : deviceHeight * 0.075,
		showVerticalScrollIndicator : true,
		//backgroundColor : 'red',
	});

	/////////////////////////////////////////////////////////////////////////////////////////////////////

	/////////////////////////////////////////////////////////////////////////////////////////////////////
	var accessreportsBtnView = Ti.UI.createView({
		//top : 580,
		bottom : 0,
		width : '100%',
		height : appPixel * 7.5,
		backgroundColor : '#054e62'
	});

	var btnaccessreportssave = Ti.UI.createButton({
		title : 'Save',
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

	var btnaccessreportsdelete = Ti.UI.createButton({
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
	});

	var btnaccessreportsnext = Ti.UI.createButton({
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

	accessreportsBtnView.add(btnaccessreportssave);
	accessreportsBtnView.add(btnaccessreportsdelete);
	accessreportsBtnView.add(btnaccessreportsnext);

	accessreportspopupinputview.add(accessreportsBtnView);


	imgaccessreportspopupclose.addEventListener('click', function() {
		accessreportspopupcontainerView.hide();
	});
	
	
	accessreportspopupcontainerView.add(accessreportspopupinputview);	
	
	return accessreportspopupcontainerView;
};
