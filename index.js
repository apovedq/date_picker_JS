const date_picker_element = document.querySelector('.date-picker');
const selected_date_element = document.querySelector('.date-picker .selected-date');
const date_element = document.querySelector('.date-picker .date');
const mth_element = document.querySelector('.date-picker .date .month .mth');
const next_mth_element = document.querySelector('.date-picker .date .month .next-mth');
const prev_mth_element = document.querySelector('.date-picker .date .month .prev-mth');

const days_element = document.querySelector('.date-picker .date .days')

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

//Gets the current value where the calendar is supposed to start
let currentDate = new Date()
let currentDay = currentDate.getDate();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

//Assign first the current values to our variables so we can start from there
let selectedDate = currentDate;
let selectedDay = currentDay;
let selectedMonth = currentMonth;
let selectedYear = currentYear;
let selectedDateTwo = currentDate + 1;
let selectedDayTwo = currentDay + 1;
let selectedMonthTwo = currentMonth + 1;
let selectedYearTwo = currentYear + 1;





//Set the content of the item "mth" to the starting date
mth_element.textContent = months[currentMonth] + ' ' + currentYear;

selected_date_element.textContent = formatDate(currentDate);

populateDates();

//Event listener 
date_picker_element.addEventListener('click', toggleDatePicker);
next_mth_element.addEventListener('click', goNextMonth);
prev_mth_element.addEventListener('click', goBackMonth);
//functions

function populateDates(e) { 

    //Re render the days every time the month changes
    days_element.innerHTML = '';

    let default_amount_days;

    switch (currentMonth) { 
        case 0: default_amount_days = 28;
        break;
        case 2: default_amount_days = 30;
            break
        case 4: default_amount_days = 30;
            break
        case 7: default_amount_days = 30;
            break
        case 9: default_amount_days = 30;
            break
        default: default_amount_days = 31;
    }

    for (let i = 0; i < default_amount_days; i++) {
        const day_element = document.createElement('div');
        day_element.classList.add('day');
        day_element.textContent = i + 1;

// if day is equal to current date then it starts selected
        if (selectedDay == i + 1 && selectedYear == currentYear && selectedMonth == currentMonth) { 
            day_element.classList.add('selected');
        }


        day_element.addEventListener('click', function () { 

            if (!selectedDate || selectedDateTwo) { 

                selectedDate = new Date(currentYear + '-' + (currentMonth + 1) + '-' + (i + 1));
                selectedDay = (i + 1);
                selectedMonth = currentMonth;
                selectedYear = currentYear;

            } else if (selectedDate && !selectedDateTwo) {
                
                selectedDateTwo = new Date(currentYear + '-' + (currentMonth + 1) + '-' + (i + 1));
                selectedDayTwo = (i + 1);
                selectedMonthTwo = currentMonth;
                selectedYearTwo = currentYear;
            }
           

            selected_date_element.textContent = formatDate(selectedDate);
            selected_date_element.dataset.value = selectedDate;


            populateDates();            
        })  

         days_element.appendChild(day_element);
    }


}

function toggleDatePicker(e) {

    //If it doesnt contains "date" selector then is activated

    if (!checkEventPathForClass(e.path, 'date')) {
        date_element.classList.toggle('active')
    }

}

function goNextMonth(e) {
    populateDates();
console.log(currentMonth);
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }

    mth_element.textContent = months[currentMonth] + ' ' + currentYear;
}

function goBackMonth(e) {
    populateDates();


    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }

    mth_element.textContent = months[currentMonth] + ' ' + currentYear;
}

//helper function

function checkEventPathForClass(path, selector) {

    for (let i = 0; i < path.length; i++) {
        if (path[i].classList && path[i].classList.contains(selector)) {
            return true;
        }
    }

    return false;
}

function formatDate(d) { 

    let day = d.getDate();
    if (day < 10) { 
        day = '0' + day;
    }
    let month = d.getMonth() + 1;
    if (month < 10) {
       month = '0' + month;
    }
    let year = d.getFullYear();

    return day + '/' + month + '/' + year;
}