
// 最初に実行
start()
function start() {
    // テーブル要素生成
    generateItemElements();

    // ローカルストレージにデータがあれば読み込み
    if (localStorage.data) {
        loadLocalData();
    }

    // 画像に変換
    convertToImage()
}

// 画像変換用テーブル生成
function generateItemElements() {
    // 追加する要素を文字列にしておいて後で一括追加
    var rawElement = "";
    var index = 0;
    
    ITEM_DATAS.forEach(item_datas => {
        // マイル表示部分
        var mile = item_datas.mile;
        rawElement += `
            <tr>
                <td class="mile-title" rowspan="${item_datas.items.length + 1}"><p>${mile}<br><span>マイル</span></p></td>
            </tr>
        `;

        item_datas.items.forEach(items => {
            // アイテム名表示部分
            var item_name = items.name;
            rawElement += `<tr><td class="item-name">${item_name}</td>`;

            // 8個追加
            for (var i = 0; i < 8; i++) {
                // アイテムの個数が8個未満なら空の要素で埋める
                if (i < items.attrs.length) {
                    // アイテムの画像と補足部分
                    var attrs = items.attrs[i];
                    var img = attrs.img;
                    var info_text = attrs.info;
                    rawElement += `
                        <td class="item-container">
                            <div class="item-main" index="${index++}" state="0">
                                <img class="item-image" src="../image/${img}.png">
                                <p class="info-text">${info_text}</p>
                            </div>
                        </td>
                    `;
                } else {
                    rawElement += `
                        <td class="item-container">
                            <div class="item-main item-empty" state="0">
                            </div>
                        </td>
                    `;
                }
            }
        });
    });
    // 一括追加
    $(".capture-table").append(rawElement);
}

// ローカルストレージから読み込み
function loadLocalData() {
    JSON.parse(localStorage.data).forEach(data => {
        $(`.capture-table .item-main[index="${data.index}"]`).attr("state", data.state);
    });
}

// 画像に変換
function convertToImage() {
    $("#capture").removeClass("none");
    html2canvas(document.querySelector("#capture")).then(canvas => { 
        let imageURL = canvas.toDataURL();
        $(".captured-image").attr("src", imageURL);
        $(".captured-image-link").attr("href", imageURL);
        $(".waiting-text").addClass("none");
    });
    $("#capture").addClass("none");
    $(".captured-image").removeClass("none");
}

// ダウンロードボタン
$(".download-btn a").click(function(e) {
    $(e.target).attr({
        download: "マイル家具テンプレート",
        href: $(this).attr('href')    
    });
});