exports.summerytotals = function() {	
	
	var summerytotalspopupcontainerView = Ti.UI.createView({// Set height appropriately
		//layout : 'vertical',
		visible : false,
		width : '100%',
		height : '100%',
		backgroundColor : '#ffffff'
	});

	var view_summerytotalspopuptitle = Ti.UI.createView({
		height : deviceHeight * 0.075,
		top : 0,
		backgroundColor : '#2980B9',
	});

	var lblsummerytotalspopuptitle = Ti.UI.createLabel({
		text : 'Summary Totals',
		color : '#FFFFFF',
		font : {
			fontSize : stylefontsize + 2,
			fontFamily : customFont2,
		},
	});

	var imgsummerytotalspopupclose = Ti.UI.createImageView({
		image : '../images/backbtn.png',
		backgroundSelectedColor : '#999999',
		width : '13%',
		left : '0%',
	});

	view_summerytotalspopuptitle.add(lblsummerytotalspopuptitle);
	view_summerytotalspopuptitle.add(imgsummerytotalspopupclose);
	summerytotalspopupcontainerView.add(view_summerytotalspopuptitle);



	/////////////////////////////////////////////////////////////////////////////////////////////////////

	
	
	// --- Entries list veiw
	var entryViewList = Ti.UI.createView({
	  	top : deviceHeight * 0.075,
	  	contentWidth: 'auto',
	  	contentHeight: 'auto',
	  	backgroundColor: '#EEEEEE',
	  	height: deviceHeight * 0.900,
	  	width: '100%',
	  	layout : 'vertical',
		font : {
			fontFamily : customFont
		},
	});
	
	var reportListTable = Ti.UI.createTableView({
		height: '100%',
		rowHeight:10,
	});
	
	
	
	////////////////////////////////////////////////////////
	
	function getInvoiceEntries(){
		
				entryViewList.hide();
			
			var view_totalspopuptitle = Ti.UI.createView({
				height : deviceHeight * 0.075,
				top : 0,
				backgroundColor : '#2980B9',
			});					
	
			var lbltotalspopuptitle = Ti.UI.createLabel({
				text : 'All Invoices Generated',
				color : '#FFFFFF',
				font : {
					fontSize : stylefontsize + 2,
					fontFamily : customFont2,
				},
			});
	
			var imgtotalspopupclose = Ti.UI.createImageView({
				image : '../images/backbtn.png',
				backgroundSelectedColor : '#999999',
				width : '13%',
				left : '0%',
			});
			//view for add date field 
			var dateEntryView = Ti.UI.createView({
			  	top : deviceHeight * 0.075,
			  	contentWidth: 'auto',
			  	contentHeight: 'auto',
			  	backgroundColor: '#EEEEEE',
			  	height: deviceHeight * 0.075 *2,
			  	width: '100%',			  	
				font : {
					fontFamily : customFont
				},				
			});
			//view for add table
			var tableDataEntryView = Ti.UI.createView({
			  	top : deviceHeight * 0.075 *3,
			  	contentWidth: 'auto',
			  	contentHeight: 'auto',
			  	backgroundColor: '#EEEEEE',
			  	height: deviceHeight * 0.850,
			  	width: '100%',
			  	layout : 'vertical',
				font : {
					fontFamily : customFont
				},
			});
			
			var reportDataListTable = Ti.UI.createTableView({
				height: '100%',
				rowHeight:10,
			});
			
			var selectFromDate = Ti.UI.createTextField({
				editable:false,
				backgroundColor:'#999444',
				top: '2%',
				left:'2%',
				width:'47%',
				hintText :'From Date',
			});
			
			var selectToDate = Ti.UI.createTextField({
				editable:false,
				backgroundColor:'#999444',
				top: '2%',
				left:'51%',
				width:'47%',
				hintText:'To Date',
				
			});
			
			/*var dateSelectBtn = Ti.UI.createButton({
				title:'Select',
				left:'20%',
				width: '50%',
				top: deviceHeight * 0.075
				
			});*/
	
			view_totalspopuptitle.add(lbltotalspopuptitle);
			view_totalspopuptitle.add(imgtotalspopupclose);
			//view_totalspopuptitle.add(selectFromDate);
			dateEntryView.add(selectFromDate);
			dateEntryView.add(selectToDate);
			//dateEntryView.add(dateSelectBtn);
			summerytotalspopupcontainerView.add(dateEntryView);
			/*var reportDataListTable = Ti.UI.createTableView({
				height : '100%',
				rowHeight : 10,
			});*/
	
			var sql = 'SELECT * FROM tbl_invoice ORDER by date(invoice_date) DESC, id DESC';
			var resultSet = db.execute(sql);
	
			var invoiceArray = [];
			var i = 1;
			while (resultSet.isValidRow()) {
				var recCustomer = db.execute('SELECT * FROM tbl_customer WHERE id=' + resultSet.fieldByName('customer_id'));
				var row = Ti.UI.createTableViewRow({
					id : resultSet.fieldByName('id'),
					// textEntry: 'invoice',
					className : 'forumEvent', // used to improve table performance
					backgroundColor : 'white',
					rowIndex : i, // custom property, useful for determining the row during events
					height : '75dp',
					font : {
						fontFamily : customFont
					},
				});
				var labelday = Ti.UI.createLabel({
					id : resultSet.fieldByName('id'),
					// textEntry: 'invoice',
					color : '#576996',
					text : resultSet.fieldByName('invoice_date'),
					left : styleSettingsmargine,
					top : '4dp',
					width : '25%', //height: '10%',
					textAlign : 'left',
					font : {
						fontFamily : customFont
					},
				});
				var labelCustomerName = Ti.UI.createLabel({
					id : resultSet.fieldByName('id'),
					// textEntry: 'invoice',
					color : '#222',
					text : recCustomer.fieldByName('full_name'),
					left : '33%',
					top : '10%',
					width : '40%',
					font : {
						fontFamily : customFont1
					},
				});
				var labelInvoiceNumber = Ti.UI.createLabel({
					id : resultSet.fieldByName('id'),
					// textEntry: 'invoice',
					color : '#2B2B2B',
					text : resultSet.fieldByName('invoice_no'),
					left : '33%',
					top : '50%',
					width : '40%',
					font : {
						fontFamily : customFont
					},
				});
				var labelAmount = Ti.UI.createLabel({
					id : resultSet.fieldByName('id'),
					// textEntry: 'invoice',
					text : toDecimalFormatView(resultSet.fieldByName('total_amount')),
					textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
					right : styleSettingsmargine,
					top : '4dp',
					width : '38%',
					color : '#222',
					font : {
						fontFamily : customFont2
					},
				});
				//var paid = ((resultSet.fieldByName('short_code') == 1)?'Paid':'Unpaid';
				var labelPaid = Ti.UI.createLabel({
					id : resultSet.fieldByName('id'),
					// textEntry: 'invoice',
					color : '#2B2B2B',
					textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
					text : (resultSet.fieldByName('paid') == 1 ? 'Paid' : 'Unpaid'),
					right : styleSettingsmargine,
					top : '50%',
					width : '38%',
					font : {
						fontFamily : customFont,
						fontSize : stylefontsize - 8,
					},
				});
	
				row.add(labelday);
				row.add(labelCustomerName);
				row.add(labelInvoiceNumber);
				row.add(labelAmount);
				row.add(labelPaid);
				invoiceArray.push(row);
				i++;
				resultSet.next();
				// to next index
	
			}

			var recTotalInvoice = db.execute('SELECT sum(total_amount) as totalAmountData, sum(net_amount) as netAmountData, sum(vat) as totalVatData FROM tbl_invoice');
			//var recTotalInvoiceNetAmount = db.execute('SELECT count(net_amount) as netAmountData FROM tbl_invoice ORDER by date(invoice_date) DESC, id DESC');
			//var recTotalInvoiceVat = db.execute('SELECT count(vat) as totalVatData FROM tbl_invoice ORDER by date(invoice_date) DESC, id DESC');
	
			row = Ti.UI.createTableViewRow({
				className : 'forumEvent', // used to improve table performance
				backgroundColor : 'white',
				rowIndex : i, // custom property, useful for determining the row during events
				height : '50dp',
				font : {
					fontFamily : customFont
				},
	
			});
	
			var labeltitleData = Ti.UI.createLabel({
				text : 'Total For ',
				left : styleSettingsmargine,
				top : '35%',
				width : '25%', //height: '10%',
				textAlign : 'left',
				color : '#222',
				font : {
					fontFamily : customFont2
				},
			});
	
			var labelNetAmountData = Ti.UI.createLabel({
				text : toDecimalFormatView(recTotalInvoice.fieldByName('netAmountData')),
				textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
				right : '33%',
				top : '4dp',
				width : '38%',
				color : '#222',
				font : {
					fontFamily : customFont2
				},
			});
	
			var labelTotalVatData = Ti.UI.createLabel({
				text : toDecimalFormatView(recTotalInvoice.fieldByName('totalVatData')),
				textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
				right : styleSettingsmargine,
				top : '50%',
				width : '38%',
				color : '#222',
				font : {
					fontFamily : customFont2
				},
			});
	
			var labelTotalAmountData = Ti.UI.createLabel({
				text : toDecimalFormatView(recTotalInvoice.fieldByName('totalAmountData')),
				textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
				right : styleSettingsmargine,
				top : '35%',
				width : '38%',
				color : '#222',
				font : {
					fontFamily : customFont2
				},
			});

			row.add(labeltitleData);
			//row.add(labelNetAmountData);
			//row.add(labelTotalVatData);
			row.add(labelTotalAmountData);
			invoiceArray.push(row);
	
			resultSet.close();
			// close the Array
			reportDataListTable.data = invoiceArray;
			
			summerytotalspopupcontainerView.add(view_totalspopuptitle);
			
			
			tableDataEntryView.add(reportDataListTable);
			
			summerytotalspopupcontainerView.add(tableDataEntryView);
		
	
			imgtotalspopupclose.addEventListener('click', function(e) {
				view_totalspopuptitle.hide();
				reportListTable.setData([]);
				reportListTable.data = [reportTableSection];
			});
		}

	
	
	//////////////////////////////////////////////////////////////////////////
	
	var reportTableSection = Ti.UI.createTableViewSection();
			reportTableSection.add(Ti.UI.createTableViewRow({ 
				title: 'All Invoices Generated',
				id:'1',
				backgroundColor:'white',
				color:'#222',
				height:'50dp',
				font : {
					fontFamily : customFont1
				},
			
			}));
			reportTableSection.add(Ti.UI.createTableViewRow({ 
				title: 'All Invoices By Customer',
				id:'2',
				backgroundColor:'white',
				color:'#222',
				height:'50dp',
				font : {
					fontFamily : customFont1
				},
			 }));
			reportTableSection.add(Ti.UI.createTableViewRow({ 
				title: 'Summary Total Of All Invoices',
				id:'3',
				backgroundColor:'white',
				color:'#222',
				height:'50dp',
				font : {
					fontFamily : customFont1
				},
			}));
			reportTableSection.add(Ti.UI.createTableViewRow({ 
				title: 'Summary Listing Of Monies Received From Customer',
				id:'4',
				backgroundColor:'white',
				color:'#222',
				height:'50dp',
				font : {
					fontFamily : customFont1
				},
			}));
			reportTableSection.add(Ti.UI.createTableViewRow({ 
				title: 'Summary Listing Of Amounts Owed By Customers',
				id:'5',
				backgroundColor:'white',
				color:'#222',
				height:'50dp',
				font : {
					fontFamily : customFont1
				},
			}));
			reportTableSection.add(Ti.UI.createTableViewRow({ 
				title: 'Detailed Listing Of Amounts Owed By Selected Customer',
				id:'6',
				backgroundColor:'white',
				color:'#222',
				height:'50dp',
				font : {
					fontFamily : customFont1
				},
			}));
			
			reportListTable.data = [reportTableSection];
			
			entryViewList.add(reportListTable);
			
			summerytotalspopupcontainerView.add(entryViewList);
			
			// Listen for Single Tap event
			reportListTable.addEventListener('singletap', function(e) {
				//alert(e.row.id);
				selectValue =e.row.id;
				switch(selectValue){
					case '1' :
						getInvoiceEntries();
						//alert('a');
						break;
					case '2' :
						//getIncomeEntries();
						alert('b');
						break;
					case '3' :
						//getInvoiceEntries();
						alert('c');
						break;
					case '4' :
						//getInvoiceEntries();
						alert('d');
						break;
					case '5' :
						//getInvoiceEntries();
						alert('e');
						break;
					case '6' :
						//getInvoiceEntries();
						alert('f');
						break;
				}
			});

	imgsummerytotalspopupclose.addEventListener('click', function() {
		summerytotalspopupcontainerView.hide();
		reportListTable.data = [reportTableSection];
				
	});
	
	
	//summerytotalspopupcontainerView.add(summerytotalspopupinputview);	
	
	return summerytotalspopupcontainerView;
};
