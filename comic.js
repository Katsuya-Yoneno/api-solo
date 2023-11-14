const url = 'http://localhost:3000';

updateScreen();
function updateScreen() {
    fetch('/api/comics')
        .then(response => response.json())
        .then(comics => {
            const tableBody = document.getElementById('comicTableBody');
            tableBody.innerHTML = '';

            comics.forEach(comic => {
                const row = document.createElement('tr');
                row.innerHTML = 
                `<td>${comic.id}</td>
                <td><input class="inpval" type="text" id="txt${comic.id}" value="${comic.title}"></td>
                <td>
                <input class="edit-button" type="button" id="edtBtn${comic.id}" value="編集" onclick="editRow(${comic.id})">
                <button class="delete-button" onclick="deleteComic('${comic.id}')">削除</button>
                </td>`
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error(error));
}

function addComic() {
    const titleInput = document.getElementById('title');
    const title = titleInput.value;
    const errorBody = document.getElementById('error-message');
    if (title === '') {
        errorBody.innerHTML = `
            <div class='error'>
                <p>タイトルが入力されていません。</p>
            </div>
        `;
        errorBody.append;
        return;
    } else {
        errorBody.innerHTML = ``;
        fetch('/api/comics', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title }),
        })
        .then(response => response.json())
        .then(newComic => {
            console.log('New Comic:', newComic);
            updateScreen();
            titleInput.value = '';
    
        })
        .catch(error => console.error(error));
    }
}

function deleteComic(comicId) {
    fetch(`/api/comics/${comicId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(deletedComic => {
        console.log('Deleted Comic:', deletedComic);
        updateScreen();
    })
    .catch(error => console.error(error));
}

function editRow(comicId) {
    var objInp = document.getElementById("txt" + comicId);
    var objBtn = document.getElementById("edtBtn" + comicId);

    if (!objInp || !objBtn)
        return;

    // モードの切り替えはボタンの値で判定  
    if (objBtn.value == "編集") {
        objInp.readOnly = false;
        objInp.focus();
        objBtn.value = "確定";
    } else {
        objInp.style.cssText = "border:none;"  
        objInp.readOnly = true;
        objBtn.value = "編集";
        fetch(`/api/comics/${comicId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({title: objInp.value}),
        })
        .then(response => response.json())
        .then(editedComic => {
            console.log('Edited Comic:',editedComic);
            updateScreen();
        })
        .catch(error => console.error(error));
    }
}