// Current problem: Adding multiple notes to localStorage we cannot delete random notes within it
// Possible solution: Using another for loop to redefine the key again so we can delete the correct note each time (didn't work)
// Another solution: Use querySelectAll for the .note class and then go through those and substring the remove btn's id for the correct number
// using that we can delete the correct note each time from the localStorage

// This is the note write and add area

const notesArray = []

const notesIdArray = []

let count = 0

let noteId = "note0"

let WriteBlock = () => {

    // This is the textbox
    let textArea = document.createElement("input")
    textArea.setAttribute('id', "note" + count)
    textArea.setAttribute('class', ".note")
    let element = document.getElementById("writerBlockContainer")
    element.appendChild(textArea)
    
    // This is the button to remove the note from the DOM tree and the local data storage
    let removeBtn = document.createElement("button")
    removeBtn.setAttribute('id', 'remove' + count)
    let removeBtnText = document.createTextNode("Remove")
    removeBtn.onclick = function() {

        document.addEventListener('click', function(e) {
            let str = Number((e.target.id).slice(-1))
            if(isNaN(str) || "undefined"){
            }
            str = str + 1
            noteId = "note" + str

            // Removal from the localStorage
            
            if(typeof(Storage) !== "undefined"){
                localStorage.removeItem(noteId)
            } else {
                alert("Web Storage is not supported by this browser..")
            }
        })

        // Removal from DOM tree
        textArea.remove()
        removeBtn.remove()
    }

    // Add the remove button to the WriteBlock

    removeBtn.appendChild(removeBtnText)
    element.appendChild(removeBtn)

}

// Add the note to the array using querySelectorAll using the class and overwrite the previous array using map

let addNote = () => {
    
    //Obtains the note using the count as the ID 
    let note = document.getElementById("note" + count).value

    //Increment the count so the next note will have a different ID
    count++
    
    //Add the new note to the array
    notesArray.push(note)

    //Turn the array into JSON by stringifying it
    notesIdArray.push(note)
    let myJSON = JSON.stringify(note)

    noteId = "note" + count

    if(typeof(Storage) !== "undefined"){
        localStorage.setItem(noteId, myJSON)
    } else {
        alert("Web Storage is not supported by this browser..")
    }
    
    //Check the localStorage by going to dev tools and clicking the Application header which is 5 to the right of 'Console'

    //Refresh the page using setInterval OR use setInterval to add notes to localStorage to avoid overwriting issue?

    // Creates a new note input with an incremented ID
    WriteBlock()
}


// Finds the add btn on the document and add the addNote() function to the btn's onclick attribute

let addBtn = () => {
    let myBtn = document.getElementById("addBtn")
    myBtn.onclick = addNote
}

//This instantiates the functions from the 'function variables' created above in the code

addBtn()
WriteBlock()
