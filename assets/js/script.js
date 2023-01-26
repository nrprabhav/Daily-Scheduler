let todayDate=moment().format("MMM Do, YYYY");
console.log(todayDate);
$("#currentDay").text(todayDate);

let startHr = moment("09","hh")
let hourList = $("<ul>")
for(let i=0;i<8;i++){
    console.log(startHr.format("hh a"));
    startHr = startHr.add(1,'h');
}