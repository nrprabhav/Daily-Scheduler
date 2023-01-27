// Check local storage and see if there are some events stored. 
// If not initialize with a empty event list
if (localStorage.getItem("eventsList") == null) {
    let eventsList = Array(9).fill("");
    localStorage.setItem("eventsList", JSON.stringify(eventsList));
}

// Display today's date
let todayDate = moment().format("MMM Do, YYYY");
console.log(todayDate);
$("#currentDay").text(todayDate);

function updateTable() {
    // Update the colors of the timeblock based on time 
    // Display events stored in memory on the timeblocks

    let startTime = moment("09", "hh");
    let currTime = moment();
    eventsList = JSON.parse(localStorage.getItem("eventsList"));
    for (i = 0; i < 9; i++) {
        // Display events stored in memory
        $("#timeBlocks").children().eq(i).children('textarea').val(eventsList[i]);

        // Color timeblocks based on time
        let timeDiff = currTime.diff(startTime, "hours");
        if (timeDiff > 0) {
            $("#timeBlocks").children().eq(i).children('textarea').attr("class", "description past");
        } else if (timeDiff < 0) {
            $("#timeBlocks").children().eq(i).children('textarea').attr("class", "description future");
        } else {
            $("#timeBlocks").children().eq(i).children('textarea').attr("class", "description present");
        }
        startTime.add(1, 'hours');
    }
}

// Click Event
$(".saveBtn").on("click", function (event) {
    eventsList = JSON.parse(localStorage.getItem("eventsList"));
    eventsList[Number(event.currentTarget.parentNode.id[0]-1)] = event.currentTarget.parentNode.children[1].value;
    localStorage.setItem("eventsList", JSON.stringify(eventsList));
})

updateTable();