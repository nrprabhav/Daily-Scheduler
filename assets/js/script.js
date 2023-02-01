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
    // Display events stored in local storage on the timeblocks

    let startTime = moment("09", "hh");
    let currTime = moment();
    eventsList = JSON.parse(localStorage.getItem("eventsList"));
    for (i = 0; i < 9; i++) {

        // Get textarea corresponding to ith timeblock
        let ithTextarea = $("#timeBlocks").children().eq(i).children('textarea');

        // Display events stored in local storage
        ithTextarea.val(eventsList[i]);

        // Color timeblocks based on time
        let timeDiff = currTime.diff(startTime, "hours");
        if (timeDiff > 0) {
            ithTextarea.attr("class", "description past text-light");
        } else if (timeDiff < 0) {
            ithTextarea.attr("class", "description future text-dark");
        } else {
            ithTextarea.attr("class", "description present text-dark");
        }
        startTime.add(1, 'hours');
    }
}

// Click Event
$(".saveBtn").on("click", function (event) {
    eventsList = JSON.parse(localStorage.getItem("eventsList")); //Update events array from local storage
    let targetParent = event.currentTarget.parentNode;
    eventsList[Number(targetParent.id[0] - 1)] = targetParent.children[1].value; //Add new event to array
    localStorage.setItem("eventsList", JSON.stringify(eventsList)); //Store array in local storage
})

updateTable();