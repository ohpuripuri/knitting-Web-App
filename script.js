// 編み目データベース
// YouTube動画の埋め込みコードをそのまま貼り付けてください
// 取得方法: YouTubeで「共有」→「埋め込む」→コードをコピー

const stitchDatabase = [
    {
        name: "中長編み",
        description: "細編みと長編みの中間の高さの編み方です。立ち上がりは鎖編み2目です。",
        embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/g7ALwvCNiT8?si=ZhHlC5KrwWYrGHr5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
    },
    {
        name: "細編み",
        description: "かぎ針編みの基本中の基本。目が詰まってしっかりした編み地になります。",
        embedCode: ""  // ← ここに埋め込みコードを貼り付け
    },
    {
        name: "長編み",
        description: "細編みの約3倍の高さが1段で編める便利な編み方。立ち上がりは鎖編み3目です。",
        embedCode: ""  // ← ここに埋め込みコードを貼り付け
    },
    {
        name: "長々編み",
        description: "長編みよりさらに高さのある編み方。立ち上がりは鎖編み4目です。",
        embedCode: ""  // ← ここに埋め込みコードを貼り付け
    },
    {
        name: "鎖編み",
        description: "編み物の作り目として使われる最も基本的な編み方です。",
        embedCode: ""  // ← ここに埋め込みコードを貼り付け
    }
];

// 検索機能
function searchStitch() {
    const searchTerm = document.getElementById('searchInput').value.trim();
    const resultsDiv = document.getElementById('results');
    
    // 検索語が空の場合
    if (searchTerm === '') {
        resultsDiv.innerHTML = '<div class="no-results">編み目の名前を入力してください</div>';
        return;
    }
    
    // データベースから検索
    const results = stitchDatabase.filter(stitch => 
        stitch.name.includes(searchTerm) || 
        stitch.description.includes(searchTerm)
    );
    
    // 結果を表示
    if (results.length === 0) {
        resultsDiv.innerHTML = '<div class="no-results">「' + searchTerm + '」に一致する編み目が見つかりませんでした</div>';
    } else {
        resultsDiv.innerHTML = results.map(stitch => createResultCard(stitch)).join('');
    }
}

// 結果カードのHTML生成
function createResultCard(stitch) {
    // 埋め込みコードがない場合の処理
    if (!stitch.embedCode || stitch.embedCode === "") {
        return `
            <div class="result-card">
                <h2>${stitch.name}</h2>
                <p>${stitch.description}</p>
                <div class="no-video">
                    この編み目の動画はまだ登録されていません。<br>
                    script.jsに埋め込みコードを追加してください。
                </div>
            </div>
        `;
    }
    
    return `
        <div class="result-card">
            <h2>${stitch.name}</h2>
            <p>${stitch.description}</p>
            <div class="video-container">
                ${stitch.embedCode}
            </div>
        </div>
    `;
}

// イベントリスナー
document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    
    // 検索ボタンクリック
    searchButton.addEventListener('click', searchStitch);
    
    // Enterキーで検索
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchStitch();
        }
    });
    
    // 初期メッセージ
    document.getElementById('results').innerHTML = 
        '<div class="no-results">編み目の名前を検索してみましょう!<br>例: 中長編み、細編み、長編み</div>';
});
