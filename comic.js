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
                <td>${comic.title}</td>
                <td><button class='delete-button' onclick="deleteComic('${comic.id}')">削除</button></td>`;
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