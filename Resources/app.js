// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#eeeeee');

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
// Titanium.UI.setBackgroundColor('#3498db');

var welcomWin = Ti.UI.createWindow({
	backgroundColor: '#cfcfcf',
	fullscreen : true,
});
var lbl_loading = Ti.UI.createLabel({
	text:'Loading ...',
	color: '#f00',
	font : {
			fontSize : 20,
		},
		top: '40%'
});
welcomWin.add(lbl_loading);
welcomWin.open();


var stylefontsize = 18;
var stylemargine = '5%';
var styleSettingsmargine = '3%';
var stylefontcolor = '#fff';
var stylefullwidth = '100%';

var settingsbtnfontcolor = '#8b8b8b'; //8b8b8b
var settingsbtncol = '#cfcfcf';
var settingsbtnselectedcol = '#afafaf';
var settingsInputBackgroundColor = '#f1f1f1';

var customFont = 'Roboto-Light';
var customFont1 = 'Roboto-Medium';
var customFont2 = 'Roboto-Bold';

var logicalDesityFactor = Ti.Platform.displayCaps.logicalDensityFactor * 1;

var ex_height = Titanium.Platform.displayCaps.platformHeight * 1;
var ex_width = Ti.Platform.displayCaps.platformWidth * 1;
if (ex_height > ex_width) {
	var deviceHeight = ((Titanium.Platform.displayCaps.platformHeight * 1) / logicalDesityFactor);
} else {
	var deviceHeight = ((Titanium.Platform.displayCaps.platformWidth * 1) / logicalDesityFactor);
}

//deviceHeight = Ti.Platform.displayCaps.platformHeight;

var appPixel = deviceHeight / 100;

var settingOptionHeight = deviceHeight * 0.925 * 0.094;
var settingImageWidth = 12;
var settinglabelmargin = '18%';
var settingdropinnermargin = '2%';
var settingdropheight = deviceHeight * 0.925 * 0.89;
var settingstableseparatorcolor = '#CFCFCF';
var tablerowselectedBackgroundColor = '#67B2E4';
var settingsinputFeildBackgoundcolor = '#ffffff';

// operation button styles
var btnTextColor = '#FFE6E6';
var btnBackgroundColor = '#054e62';
var btnBackgroundSelectColor  = '#0a7390';
var btnBackgroundDisabledColor =  '#6995A1';
var btnDeleteBackgroundColor = '#f00';
var btnDeleteBackgroundDisableColor = '#FF9999';
var btnDeleteBackgroundSelectedColor = '#FF1919';
var userInputFeildBackgroundColor = '#A0A0A0';

// Install database
//var db = Ti.Database.open('mywallet');
//db.remove();



var db = Ti.Database.install('boffin-db.db','mywallet');
//var db = Ti.Database.open('mywallet');
// Get Option values
var sql = 'SELECT * FROM tbl_option WHERE id=1';
var optionResultSet = db.execute(sql);
var currencyType = optionResultSet.fieldByName('option_value');
// EOF get option values

// Get Today's date
function getDate(setDate) {
	var currentTime;
	if (typeof setDate == 'undefined'){
		currentTime = new Date();
	}else{
		//console.log(setDate);
		currentTime = setDate;
		var dateArray = currentTime.split('/');
		return "01/" + dateArray[1] + "/" + dateArray[2];
		
	}
	/*var hours = currentTime.getHours();
	var minutes = currentTime.getMinutes();
	var seconds = currentTime.getSeconds();*/
	var month = (currentTime.getMonth() + 1)< 10 ? '0'+(currentTime.getMonth() + 1):currentTime.getMonth() + 1;
	var day = (currentTime.getDate() < 10 ) ? '0'+currentTime.getDate():currentTime.getDate();
	var year = currentTime.getFullYear();

	//return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ':' + seconds;
	//return year + "-" + month + "-" + day;
	return day + "/" + month + "/" + year;

};


function getTime(){
	var currentTime = new Date();
	var hours = currentTime.getHours();
	var minutes = currentTime.getMinutes();
	var seconds = currentTime.getSeconds();
	var month = (currentTime.getMonth() + 1)< 10 ? '0'+(currentTime.getMonth() + 1):currentTime.getMonth() + 1;
	var day = (currentTime.getDate() < 10 ) ? '0'+currentTime.getDate():currentTime.getDate();
	var year = currentTime.getFullYear();
	var AmPm = (hours>=12)?'p.m':'a.m';

	//return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ':' + seconds;
	return hours + ":" + minutes + ":" + seconds + " "+AmPm;
}

// Change the date format to yyyy-mm-dd to dd/mm/yyyy for save the DB
function dateSaveChange(dateObj) {

		var str = dateObj;
		var changedDate = str.split("/");
		
		dateObj = changedDate[1] + "/" + changedDate[0] + "/" + changedDate[2];
		dateObj = new Date(dateObj);
		
		var pickerDate = (dateObj.getDate() < 10) ? '0' + dateObj.getDate() : dateObj.getDate();
		var pickerMonth = (dateObj.getMonth() + 1) < 10 ? '0' + (dateObj.getMonth() + 1) : dateObj.getMonth() + 1;
		var pickerYear = dateObj.getFullYear();
		//console.log(pickerDate + '-' + pickerMonth + '-' + pickerYear);
		selectedDate = pickerYear + '-' + pickerMonth + '-' + pickerDate;
		return selectedDate;

}

function changeDateView(dateObj) {

	//console.log('dateObj1 : '+dateObj);
	dateObj = new Date(dateObj);
	//dateObj = getDate();
	//console.log('dateObj2 : '+dateObj);
	var pickerDate = (dateObj.getDate() < 10) ? '0' + dateObj.getDate() : dateObj.getDate();
	var pickerMonth = (dateObj.getMonth() + 1) < 10 ? '0' + (dateObj.getMonth() + 1) : dateObj.getMonth() + 1;
	var pickerYear = dateObj.getFullYear();
	//console.log(pickerDate + '-' + pickerMonth + '-' + pickerYear);
	//selectedDate = pickerYear + '-' + pickerMonth + '-' + pickerDate;
	selectedDate = pickerDate + '/' + pickerMonth + '/' + pickerYear;
	return selectedDate;

}

function getCustomeName(cusid) {
	var invoiceDataSet = db.execute('SELECT full_name FROM tbl_customer WHERE id = ' + cusid);
	return invoiceDataSet.fieldByName('full_name');
}

function getCustomerListArray(){
	var TotalResultSet = db.execute('SELECT full_name FROM tbl_customer ORDER BY full_name');
	var customersList = new Array();
	var i = 0;
	while (TotalResultSet.isValidRow()) {
		customersList.push(TotalResultSet.fieldByName('full_name'));
		TotalResultSet.next();
		i++;
	}
	return customersList;
}

function returnRowNo(valueList, fieldval) {
	var nameList = new Array();
	nameList = valueList;
	
	var numRecords = nameList.length;
	Ti.API.info('length '+numRecords);
	
	
	for(var i = 0; i < numRecords; i++){
        //var row = nameList[i];
        var fullName = nameList[i];
        //console.log('---------' + fullName + '/' + fieldval);
        if (fullName == fieldval){
        		//Ti.API.info('rownum '+row);
        		//Ti.API.info('name: '+fieldval);
        		return i;
        		break;
         }
         	
        
         
    }
    return '-1'; // returns -1 if no matching is found
}

function getCategoryPickerRows(dataGet, tblName) {
		
		var db = Ti.Database.open('mywallet');
		//var getTableData = db.execute('SELECT * FROM tbl_income_sub_category WHERE enable = 1 AND parent_category=' + dataGet + ' ORDER BY income_sub_category COLLATE NOCASE ASC');

		switch (tblName) {
		    case "incomeSub":
		        var getTableData = db.execute('SELECT id, income_sub_category FROM tbl_income_sub_category WHERE enable = 1 AND parent_category=' + dataGet + ' ORDER BY income_sub_category COLLATE NOCASE ASC');
		        break; 
		    case "incomeParent":
		        var getTableData = db.execute('SELECT id, income_category FROM tbl_income_category WHERE enable = 1 ORDER BY income_category COLLATE NOCASE ASC');
		        break;
		    case "expenceSub":
		        var getTableData = db.execute('SELECT id, expence_sub_category FROM tbl_expence_sub_category WHERE enable = 1 AND parent_category=' + dataGet + ' ORDER BY expence_sub_category COLLATE NOCASE ASC');
		        break; 
		    case "expenceParent":
		        var getTableData = db.execute('SELECT id, expence_category FROM tbl_expence_category WHERE enable = 1 ORDER BY expence_category COLLATE NOCASE ASC');
		        break; 
		    case "invoiceSub":
		        var getTableData = db.execute('SELECT id, invoice_sub_category FROM tbl_invoice_sub_category WHERE enable = 1 AND parent_category=' + dataGet + ' ORDER BY invoice_sub_category COLLATE NOCASE ASC');
		        break; 
		    case "invoiceParent":
		        var getTableData = db.execute('SELECT id, invoice_category FROM tbl_invoice_category WHERE enable = 1 ORDER BY invoice_category COLLATE NOCASE ASC');
		        break; 
		}	


		var tabledata = [];
		
		if (tblName == "incomeSub" || tblName == "expenceSub" || tblName == "invoiceSub"){
			var i = 0;
			/*if (getTableData.isValidRow()) {
				tabledata[0] = Ti.UI.createPickerRow({
					id : '0',
					title : 'General',
				});
			}else{
				//console.log('--------------------paretn' + dataGet);
				if (dataGet == 0){
					tabledata[0] = Ti.UI.createPickerRow({
						id : '0',
						title : 'Select Parent Category',
					});
				}else{
					tabledata[0] = Ti.UI.createPickerRow({
						id : '0',
						title : 'General',
					});
				}
			}*/
			if (dataGet == 0){
					tabledata[0] = Ti.UI.createPickerRow({
						id : '0',
						title : 'Select Parent Category',
					});
			}
		}else{
			var i = 1;
			tabledata[0] = Ti.UI.createPickerRow({
					id : '0',
					title : 'Select Category',
			});
		}
		
		while (getTableData.isValidRow()) {
			//console.log ("111111111111111* " + getTableData.field(1));
			tabledata[i] = Ti.UI.createPickerRow({
				id : getTableData.field(0),
				title : getTableData.field(1)
			});
			getTableData.next();
			i++;
		}
		getTableData.close();
		db.close();

		return tabledata;
}

function getDataArray(dataGet, tblName) {
		//dataGet = 0;
		//var tabledata = [];
		var db = Ti.Database.open('mywallet');
		
		/*if (tblName = 'incomeSub'){
			var getTableData = db.execute('SELECT income_sub_category FROM tbl_income_sub_category WHERE enable = 1 AND parent_category=' + dataGet + ' ORDER BY income_sub_category COLLATE NOCASE ASC');
		}*/
		
		switch (tblName) {
		    case "incomeSub":
		        var getTableData = db.execute('SELECT id, income_sub_category FROM tbl_income_sub_category WHERE enable = 1 AND parent_category=' + dataGet + ' ORDER BY income_sub_category COLLATE NOCASE ASC');
		        break; 
		    case "incomeParent":
		        var getTableData = db.execute('SELECT id, income_category FROM tbl_income_category WHERE enable = 1 ORDER BY income_category COLLATE NOCASE ASC');
		        break;
		    case "expenceSub":
		        var getTableData = db.execute('SELECT id, expence_sub_category FROM tbl_expence_sub_category WHERE enable = 1 AND parent_category=' + dataGet + ' ORDER BY expence_sub_category COLLATE NOCASE ASC');
		        break; 
		    case "expenceParent":
		        var getTableData = db.execute('SELECT id, expence_category FROM tbl_expence_category WHERE enable = 1 ORDER BY expence_category COLLATE NOCASE ASC');
		        break; 
		    case "invoiceSub":
		        var getTableData = db.execute('SELECT id, invoice_sub_category FROM tbl_invoice_sub_category WHERE enable = 1 AND parent_category=' + dataGet + ' ORDER BY invoice_sub_category COLLATE NOCASE ASC');
		        break; 
		    case "invoiceParent":
		        var getTableData = db.execute('SELECT id, invoice_category FROM tbl_invoice_category WHERE enable = 1 ORDER BY invoice_category COLLATE NOCASE ASC');
		        break; 
		}	
		
		var tabledata = [];
		var i = 1;
		while (getTableData.isValidRow()) {
			//tabledata.push(getTableData.fieldByName('income_sub_category'));
			tabledata.push(getTableData.field(1));
			//console.log(getTableData.field(1));
			getTableData.next();
			i++;
		}
		/*if (getTableData.isValidRow()) {
			while (getTableData.isValidRow()) {
				tabledata[i] = getTableData.fieldByName('income_sub_category');
				getTableData.next();
				i++;
			}
		}*/
		getTableData.close();
		db.close();

		return tabledata;
}

function getDataArrayId(dataGet, tblName) {
		//dataGet = 0;
		//var tabledata = [];
		var db = Ti.Database.open('mywallet');
		
		/*if (tblName = 'incomeSub'){
			var getTableData = db.execute('SELECT income_sub_category FROM tbl_income_sub_category WHERE enable = 1 AND parent_category=' + dataGet + ' ORDER BY income_sub_category COLLATE NOCASE ASC');
		}*/
		
		switch (tblName) {
		    case "incomeSub":
		        var getTableData = db.execute('SELECT id, income_sub_category FROM tbl_income_sub_category WHERE enable = 1 AND parent_category=' + dataGet + ' ORDER BY income_sub_category COLLATE NOCASE ASC');
		        break; 
		    case "incomeParent":
		        var getTableData = db.execute('SELECT id, income_category FROM tbl_income_category WHERE enable = 1 ORDER BY income_category COLLATE NOCASE ASC');
		        break;
		    case "expenceSub":
		        var getTableData = db.execute('SELECT id, expence_sub_category FROM tbl_expence_sub_category WHERE enable = 1 AND parent_category=' + dataGet + ' ORDER BY expence_sub_category COLLATE NOCASE ASC');
		        break; 
		    case "expenceParent":
		        var getTableData = db.execute('SELECT id, expence_category FROM tbl_expence_category WHERE enable = 1 ORDER BY expence_category COLLATE NOCASE ASC');
		        break; 
		    case "invoiceSub":
		        var getTableData = db.execute('SELECT id, invoice_sub_category FROM tbl_invoice_sub_category WHERE enable = 1 AND parent_category=' + dataGet + ' ORDER BY invoice_sub_category COLLATE NOCASE ASC');
		        break; 
		    case "invoiceParent":
		        var getTableData = db.execute('SELECT id, invoice_category FROM tbl_invoice_category WHERE enable = 1 ORDER BY invoice_category COLLATE NOCASE ASC');
		        break; 
		}	
		
		var tabledata = [];
		var i = 1;
		while (getTableData.isValidRow()) {
			//tabledata.push(getTableData.fieldByName('income_sub_category'));
			tabledata.push(getTableData.field(0));
			//console.log(getTableData.field(1));
			getTableData.next();
			i++;
		}
		/*if (getTableData.isValidRow()) {
			while (getTableData.isValidRow()) {
				tabledata[i] = getTableData.fieldByName('income_sub_category');
				getTableData.next();
				i++;
			}
		}*/
		getTableData.close();
		db.close();

		return tabledata;
}



function getExpSubCategoryDataArray(dataGet) {
		//dataGet = 0;
		//var tabledata = [];
		var db = Ti.Database.open('mywallet');
		var getTableData = db.execute('SELECT income_expence_category FROM tbl_income_sub_category WHERE enable = 1 AND parent_category=' + dataGet + ' ORDER BY income_sub_category COLLATE NOCASE ASC');

		var tabledata = [];
		var i = 1;
		while (getTableData.isValidRow()) {
			tabledata.push(getTableData.fieldByName('expence_sub_category'));
			getTableData.next();
			i++;
		}
		getTableData.close();
		db.close();

		return tabledata;
}

// empty picker
function emptyPicker(picker){
	if(picker.columns[0]) {
        var col = picker.columns[0];
        var len = col.rowCount;
        Ti.API.info('>>>>>>>'+len);
            for(var x = len-1; x >= 0; x-- ){
                    var row = col.rows[x];
                    col.removeRow(row);
            }
    }
}

var toDecimalFormatView = function(e){
	
	return currencyType+' '+String.formatDecimal(e, 'en-US', '###,##0.00');
};

var toNegativeDecimalFormatView = function(e){
	
	return currencyType+' ('+String.formatDecimal(e, 'en-US', '###,##0.00')+')';
};

var toDecimalFormatWithoutCurrency = function(e){
	//return String.formatDecimal(e, 'en-US', '###,##0.00');
	var pd_value2 = e;
	var formatted_no= parseFloat(Math.round(pd_value2 * 100) / 100).toFixed(2);
	Ti.API.info(formatted_no);
	return formatted_no;
};

var objDashboard = require('dashboardView');
var WinDashboard = objDashboard.dashboardWindow();

WinDashboard.addEventListener('open', function(e){
		//welcomWin.close();
});


WinDashboard.open();