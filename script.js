// global constants
const notekey = "notekey"
const notesArray = [];
const lastSavedID = "lastSavedText";
const containerID = "writerBlockContainer";
const lastSavedText = "Last saved ";
const writerNoteBlockClass = "noteBlock"

// generates an UID
function uuidv4() {
    // source: https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid/2117523#2117523
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// object contructor for writernoteblock
function WriterNoteBlock() {
    this.id = uuidv4();
    this.div = document.createElement("div");
    this.div.className = writerNoteBlockClass;
    this.textArea = document.createElement("textarea");
    this.btn = document.createElement("button");
    this.btn.innerText = "remove";

    // Method to delete this note from dom and local storage.
    this.remove = function() {
        notesArray.splice(notesArray.indexOf(this), 1);
        document.getElementById(containerID).removeChild(this.parentNode);
        saveNotesToLocalStorage();
    }
    
    this.btn.onclick = this.remove;
    this.div.appendChild(this.textArea);
    this.div.appendChild(this.btn);
    document.getElementById(containerID).appendChild(this.div);
}

if(typeof(Storage) !== "undefined"){
    setInterval(function () {
        saveNotesToLocalStorage();
    }, 2000);
} 
else {
    alert("Web Storage is not supported by this browser..")
}

// sets up writing interval
function saveNotesToLocalStorage() {
    let toStoreArray = [];
    notesArray.forEach(element => {
        let obj = {
            note_id : element.id,
            text: element.textArea.value
        }
        toStoreArray.push(obj)
    });
    let myJSON = JSON.stringify(toStoreArray);
    localStorage.setItem(notekey, myJSON);
    let time = new Date();
    let formattedTime = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
    document.getElementById(lastSavedID).innerText = lastSavedText + formattedTime;
}

// Finds the add btn on the document and add functionality to the btn's onclick attribute
// adds a new noteblock
document.getElementById("addBtn").onclick = () => {
    const noteBlock = new WriterNoteBlock();
    notesArray.push(noteBlock);
}