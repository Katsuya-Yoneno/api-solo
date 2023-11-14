const url = 'http://localhost:3000';

updateScreen();
function updateScreen() {
    fetch('/api/comics')
        .then((response) => response.json())
        .then((comics) => {
            const tableBody = document.getElementById('comicTableBody');
            tableBody.innerHTML = '';

            comics.forEach((comic) => {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${comic.id}</td>
                <td><input class="inpval" type="text" id="txt${comic.id}" value="${comic.title}"></td>
                <td>
                <input class="edit-button" type="button" id="edtBtn${comic.id}" value="編集" onclick="editRow(${comic.id})">
                <button class="delete-button" onclick="deleteComic('${comic.id}')">削除</button>
                </td>`;
                tableBody.appendChild(row);
            });
        })
        .catch((error) => console.error(error));
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
            .then((response) => response.json())
            .then((newComic) => {
                console.log('New Comic:', newComic);
                updateScreen();
                titleInput.value = '';
            })
            .catch((error) => console.error(error));
    }
}

function deleteComic(comicId) {
    fetch(`/api/comics/${comicId}`, {
        method: 'DELETE',
    })
        .then((response) => response.json())
        .then((deletedComic) => {
            console.log('Deleted Comic:', deletedComic);
            updateScreen();
        })
        .catch((error) => console.error(error));
}

function editRow(comicId) {
    var objInp = document.getElementById('txt' + comicId);
    var objBtn = document.getElementById('edtBtn' + comicId);

    if (!objInp || !objBtn) return;

    // モードの切り替えはボタンの値で判定
    if (objBtn.value == '編集') {
        objInp.readOnly = false;
        objInp.focus();
        objBtn.value = '確定';
    } else {
        objInp.style.cssText = 'border:none;';
        objInp.readOnly = true;
        objBtn.value = '編集';
        fetch(`/api/comics/${comicId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: objInp.value }),
        })
            .then((response) => response.json())
            .then((editedComic) => {
                console.log('Edited Comic:', editedComic);
                updateScreen();
            })
            .catch((error) => console.error(error));
    }
}

function search() {
    // 検索する
    const searchInput = document.getElementById('search-input').value;
    var search = async () => {
        // 入力された値でを本を検索
        var items = await searchBooks(searchInput);

        // html に変換して表示用 DOM に代入
        var texts = items.map((item) => {
            return `
        <table>
        <tr>
          <td>
            <div class='comic'>
              <img class='image' src='${item.image}' alt='${item.title}'>
              <div class='text'>
                  <h3 class='result-title'><a href=${item.link}>${
                      item.title
                  }</a></h3>
                  <p class='result-authors'>著者：${item.authors.join(', ')}</p>
                  <p class='result-description'>${item.description}</p>
                </a>
              </div>
            </div>
          </td>
        </tr>
      </table>
        `;
        });
        $results.innerHTML = texts.join('');
    };
    search();
}

// 本を検索して結果を返す
var searchBooks = async (searchInput) => {
    // Google Books APIs のエンドポイント
    var endpoint = 'https://www.googleapis.com/books/v1';

    // 検索 API を叩く
    var res = await fetch(`${endpoint}/volumes?q=${searchInput}`);
    // JSON に変換
    var data = await res.json();

    // 必要なものだけ抜き出してわかりやすいフォーマットに変更する
    var items = data.items.map((item) => {
        var vi = item.volumeInfo;
        return {
            title: vi.title,
            authors: vi.authors,
            description: vi.description,
            link: vi.infoLink,
            image: vi.imageLinks ? vi.imageLinks.smallThumbnail : '',
        };
    });

    return items;
};
