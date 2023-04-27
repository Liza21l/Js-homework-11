const formatTime = (timeObj) => ({
    year: timeObj.year,
    month: timeObj.month < 10 ? '0' + timeObj.month : timeObj.month,
    day: timeObj.day < 10? '0' + timeObj.day : timeObj.day,
    time: { 
        hour: timeObj.time.hour < 10? '0' + timeObj.time.hour : timeObj.time.hour,
        minutes: timeObj.time.minutes < 10? '0' + timeObj.time.minutes : timeObj.time.minutes,
        seconds: timeObj.time.seconds < 10? '0' + timeObj.time.seconds : timeObj.time.seconds
    }
})
const getTime = () => { 
    let timeNow = new Date()
    timeNow = { 
        year: timeNow.getFullYear(),
        month: timeNow.getMonth() + 1,
        day: timeNow.getDate(),
        time: {
            hour: timeNow.getHours(),
            minutes: timeNow.getMinutes(),
            seconds: timeNow.getSeconds()
        }
    }
    return formatTime(timeNow)
}

let notes = document.querySelector('#notes')
let inputText = document.querySelector('#inputText')
let btnAdd = document.querySelector('#btnAdd')
let loading = document.querySelector('#loading')
let notesStore = [ 
    { 
        id: 1,
        text: "Text 1",
        date: { 
            year: 2022,
            month: `11`,
            day: `21`,
            time: { 
                hour: 12,
                minutes: 12,
                seconds: 19
            }
        }
    }
]

const deleteNoteItem = (idToDelete, notesStore) => {
    notesStore = notesStore.filter(note => note.id!== idToDelete)
    generateNotes(notesStore)
}



const generateNotes = (notesStore) => { 
    notes.innerHTML = ''
    notesStore.forEach(note => {
        notes.innerHTML += `
        <div id="note-${note.id}" class="note">
            <h4>${note.date.day}/${note.date.month}/${note.date.year} ${note.date.time.hour}:${note.date.time.minutes}:${note.date.time.seconds}</h4>
            <h2>${note.text}</h2>
            <button class="btnDelete">Delete</button>
        </div>
        `
    })
    let btnsDelete = document.querySelectorAll(".btnDelete")
    btnsDelete.forEach((btnEl) => { 
        btnEl.addEventListener('click', () => {
            let idCurrentNote = parseInt(btnEl.parentNode.id.substring(5))
            deleteNoteItem(idCurrentNote, notesStore)
        })
    })
}

generateNotes(notesStore)

const addNewNote = () => { 
    loading.style.display = "block"
    notesStore = [
        ...notesStore,
        {
            id: notesStore[notesStore.length-1].id + 1,
            text: inputText.value,
            date: getTime()
        }
    ]   
    inputText.value = ''
    setTimeout(() => {
        loading.style.display = "none"
        generateNotes(notesStore)
    },2000)
    
}

btnAdd.addEventListener('click', addNewNote)