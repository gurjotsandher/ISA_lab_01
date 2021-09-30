// global constants
const notekey = "notekey"
const containerID = "readerBlockContainer";
const lastSavedID = "lastSavedText";
const lastSavedText = "Last read  ";

// object contructor for reader noteblock
function ReaderNoteBlock(id, text) {
    this.div = document.createElement("div");
    this.textArea = document.createElement("textarea");
    this.textArea.value = text;
    this.textArea.readOnly = true;
    this.id = id;
    this.div.appendChild(this.textArea);
    document.getElementById(containerID).appendChild(this.div);
}

// formats the date to 12 hour clock, no seconds
function prettyDate2(time){
    // source:https://stackoverflow.com/questions/19407305/how-to-show-only-hours-and-minutes-from-javascript-date-tolocaletimestring
    var date = new Date(parseInt(time));
    var localeSpecificTime = date.toLocaleTimeString();
    return localeSpecificTime.replace(/:\d+ /, ' ');
}

// sets up reading interval
if(typeof(Storage) !== "undefined"){
    setInterval(function () {
        const array = localStorage.getItem(notekey);
        let parsedArray = JSON.parse(array);
        document.getElementById(containerID).innerHTML = "";
        parsedArray.forEach(noteObj => {
            new ReaderNoteBlock(noteObj.note_id, noteObj.text);
        });
        document.getElementById(lastSavedID).innerText = lastSavedText + prettyDate2(Date.now());
    }, 2000);
} 
else {
    alert("Web Storage is not supported by this browser..")
}