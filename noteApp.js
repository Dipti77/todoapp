showNotes();
let addBtn=document.getElementById('addBtn');
addBtn.addEventListener('click',function(){
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem('notes');
    if(notes==null)
        notesObj=[];
    else
        notesObj=JSON.parse(notes);
    let myObj={
        title:addTitle.value,
        text:addTxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem('notes',JSON.stringify(notesObj));
    addTitle.value='';
    addTxt.value='';
    showNotes();
});

function showNotes(){
    let notes = localStorage.getItem('notes');
    let addTxt = document.getElementById('addTxt');
    if(notes==null)
        notesObj=[];
    else
        notesObj=JSON.parse(notes);
    let html='';
    notesObj.forEach(function(elements,index){
        html +=`
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
            
            <div class="card-body">
              <h5 class="card-title"> ${elements.title}</h5>
              <p class="card-text">${elements.text}</p>
              <button id=${index} onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
            </div>
          </div>
        `;
    });
    let noteEln=document.getElementById('notes');
    if(notesObj.length!=0)
        noteEln.innerHTML=html;
    else
        noteEln.innerHTML='<b>** Nothing to show notes</b>';
}

function deleteNote(index){
    let notes =localStorage.getItem('notes');
    let notesObj=[];
    notesObj=JSON.parse(notes);
    
    notesObj.splice(index,1);
    localStorage.setItem('notes',JSON.stringify(notesObj))

    showNotes();
};

let inputVal=document.getElementById('inputVal');
inputVal.addEventListener('input',function(e){
   let noteCards=document.getElementsByClassName('noteCard');
   Array.from(noteCards).forEach(function(element){
       let cardTxt=element.getElementsByTagName('p')[0].innerText;
       if(cardTxt.includes(inputVal.value))
        element.style.display='block';
       else
       element.style.display='none';
   })
});