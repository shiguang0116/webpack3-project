require('components/datepicker/index.js')
var util = require('utils/util.js')

window.disableOptions = { 
	from: util.getOtherDay({dd:-10}), 
	to: util.getOtherDay({dd:10}),
}

window.customOptions = {
	daysSimple: ["Su" , "Mo" , "Tu" , "We" , "Th" , "Fr" , "Sa"],
	monthsSimple: ["Jan" , "Feb" , "Mar" , "Apr"  , "May" , "Jun" , "Jul" , "Aug" , "Sep" , "Oct" , "Nov" , "Dec"],
	monthsFull: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	currentDate: '2018-05-30',
    labels: {
        today: "Today",
        gotoDateInput: "Insert your date",
        gotoDateButton: "Set",
        clearButton: "英文"
    }
}
