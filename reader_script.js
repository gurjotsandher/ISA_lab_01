// global constants
const notekey = "notekey"
const containerID = "readerBlockContainer";
const lastSavedID = "lastSavedText";
const lastSavedText = "Last read  ";
const readerNoteBlockClass = "noteBlock";

// object contructor for reader noteblock
function ReaderNoteBlock(id, text) {
    this.div = document.createElement("div");
    this.div.className = readerNoteBlockClass;
    this.textArea = document.createElement("textarea");
    this.textArea.value = text;
    this.textArea.readOnly = true;
    this.id = id;
    this.div.appendChild(this.textArea);
    document.getElementById(containerID).appendChild(this.div);
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
        let formattedTime = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
        document.getElementById(lastSavedID).innerText = lastSavedText + formattedTime;
    }, 2000);
} 
else {
    alert("Web Storage is not supported by this browser..")
}