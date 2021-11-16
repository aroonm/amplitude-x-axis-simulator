var start_date = null;
var end_date = null;
var today = null;
var tomorrow = null;

var maxIntercept = 0;

var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

document.getElementById('start_date').addEventListener('change', function() {
  	start_date = new Date(this.value.replace(/-/g, '\/').replace(/T.+/, ''));	
});

document.getElementById('end_date').addEventListener('change', function() {
  	end_date = new Date(this.value.replace(/-/g, '\/').replace(/T.+/, ''))
  	myFunction();
});

function myFunction() {
	// Calculating last 'x' days
	var diffTime = Math.abs(start_date - end_date);
	var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	// Calculate what intercept to use
	if(diffDays<=14) {
		maxIntercept = 1;
	}
	if(diffDays>=15 && diffDays<=43) { // Amplitude uses 43 but we could potentially use 32 since our max x-intercepts are 16
		maxIntercept = 2;
	}
	else if (diffDays>=44 && diffDays <=102) {
		maxIntercept = 7;
	}
	else if(diffDays>=103 && diffDays<=205) {
		maxIntercept = 14;
	}
	else if(diffDays>=206) {
		maxIntercept = 30;
	}

	console.log(diffDays+ " days, max-intercept: " + maxIntercept);
	console.log("start date: " + start_date);

	// Looping through date range
	var now = new Date();
	var xIntercepts = [];
	if(diffDays < 206) {
		for (var d = start_date; d >= end_date; d.setDate(d.getDate() - maxIntercept)) {
			var dateForExtraction = new Date(d);
    		xIntercepts.push(months[dateForExtraction.getMonth()] + " " + dateForExtraction.getDate());
		}
	}
	else {
		console.log("Month treatment");
		for (var d = start_date; d >= end_date; d.setDate(d.getDate() - maxIntercept)) {
    		var dateForExtraction = new Date(d);
    		xIntercepts.push(months[dateForExtraction.getMonth()] + " '" + dateForExtraction.getFullYear().toString().substr(-2));
		}
	}

	console.log(xIntercepts);
}

function disableFutureDates() {
	var today = new Date();
	var tomorrow = new Date();
	tomorrow.setDate(today.getDate() + 1);

	var dd = tomorrow.getDate();
	var mm = tomorrow.getMonth() + 1;
	var yyyy = tomorrow.getFullYear();

	if (dd < 10) {
	   dd = '0' + dd;
	}
	if (mm < 10) {
	   mm = '0' + mm;
	} 
	    
	tomorrow = yyyy + '-' + mm + '-' + dd;
	document.getElementById("start_date").setAttribute("max", tomorrow);
	document.getElementById("end_date").setAttribute("max", tomorrow);
}













