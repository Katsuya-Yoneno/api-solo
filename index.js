const server = require('./server'); // server.jsのモジュールをインポート
const PORT = process.env.PORT || 3000; // ポート番号を指定

// サーバを起動
const app = server();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
