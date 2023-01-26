if (localStorage.getItem("eventsList") == null) {
    let eventsList = Array(9).fill("");
    localStorage.setItem("eventsList", JSON.stringify(eventsList));
}

let todayDate = moment().format("MMM Do, YYYY");
console.log(todayDate);
$("#currentDay").text(todayDate);

function updateTable() {
    console.log("Hi");
    let startTime = moment("09", "hh");
    let currTime = moment("11", "hh");
    eventsList = JSON.parse(localStorage.getItem("eventsList"));
    for (i = 0; i < 9; i++) {
        console.log(eventsList[i]);
        $("#timeBlocks").children().eq(i).children('input').val(eventsList[i]);
        if (currTime.diff(startTime, "hours") > 0) {
            $("#timeBlocks").children().eq(i).children('input').attr("class", "description past");
        } else if (currTime.diff(startTime, "hours") < 0) {
            $("#timeBlocks").children().eq(i).children('input').attr("class", "description future");
        } else {
            $("#timeBlocks").children().eq(i).children('input').attr("class", "description present");
        }
        startTime.add(1, 'hours');
    }
}

$(".saveBtn").on("click", function (event) {
    console.log(event.currentTarget.parentNode.children[1].value);
    console.log(event.currentTarget.parentNode.id[0] + 1);
    eventsList = JSON.parse(localStorage.getItem("eventsList"));
    eventsList[Number(event.currentTarget.parentNode.id[0]-1)] = event.currentTarget.parentNode.children[1].value;
    localStorage.setItem("eventsList", JSON.stringify(eventsList));
})

updateTable();