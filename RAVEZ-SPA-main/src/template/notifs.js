document.addEventListener("DOMContentLoaded", function() {
    const todayDateElement = document.getElementById("today-date");
    const yesterdayDateElement = document.getElementById("yesterday-date");
    const dayBeforeYesterdayDateElement = document.getElementById("day-before-yesterday-date");

    const today = new Date();
    
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dayOptions = { weekday: 'long' }; 


    const formattedToday = today.toLocaleDateString('en-US', options);
    if (todayDateElement) todayDateElement.textContent = formattedToday;


    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const formattedYesterday = yesterday.toLocaleDateString('en-US', options);
    if (yesterdayDateElement) yesterdayDateElement.textContent = formattedYesterday;

    const dayBeforeYesterday = new Date(today);
    dayBeforeYesterday.setDate(today.getDate() - 2); 
    const formattedDayBeforeYesterday = dayBeforeYesterday.toLocaleDateString('en-US', options);
    const dayNameBeforeYesterday = dayBeforeYesterday.toLocaleDateString('en-US', dayOptions); 
    if (dayBeforeYesterdayDateElement) dayBeforeYesterdayDateElement.textContent = formattedDayBeforeYesterday;
});
