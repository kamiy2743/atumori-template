
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
    convertToImage();
}

// 画像変換用テーブル生成
function generateItemElements() {
    // 追加する要素を文字列にしておいて後で一括追加
    var rawElement1 = "";
    var rawElement2 = "";
    var index = 0;
    var bgcolor = -1;
    
    ITEM_DATAS.forEach(item_datas => {
        // マイル表示部分
        var mile = item_datas.mile;
        if (mile <= 2400) {
            rawElement1 += `
                <tr>
                    <td class="mile-title" rowspan="${item_datas.items.length + 1}"><p>${mile}<br><span>マイル</span></p></td>
                </tr>
            `;
    
            item_datas.items.forEach((items, i) => {
                // アイテム名表示部分
                var item_name = items.name;
                var td_bottom = i == item_datas.items.length-1 ? "td-bottom" : "";
                rawElement1 += `<tr><td class="item-name ${td_bottom}">${item_name}</td>`;
    
                // 8個追加
                for (var i = 0; i < 8; i++) {
                    // アイテムの個数が8個未満なら空の要素で埋める
                    if (i < items.attrs.length) {
                        // アイテムの画像と補足部分
                        var attrs = items.attrs[i];
                        var img = attrs.img;
                        var info_text = attrs.info;
                        rawElement1 += `
                            <td class="item-container ${td_bottom}">
                                <div class="item-main" index="${index++}" state="0">
                                    <img class="item-image" src="../image/${img}.png">
                                    <p class="info-text">${info_text}</p>
                                </div>
                            </td>
                        `;
                    } else {
                        rawElement1 += `
                            <td class="item-container ${td_bottom}">
                                <div class="item-main item-empty" state="0">
                                </div>
                            </td>
                        `;
                    }
                }
            });
        } else {
            rawElement2 += `
                <tr>
                    <td class="mile-title" rowspan="${item_datas.items.length + 1}"><p>${mile}<br><span>マイル</span></p></td>
                </tr>
            `;
    
            item_datas.items.forEach((items, i) => {
                // アイテム名表示部分
                var item_name = items.name;
                var td_bottom = i == item_datas.items.length-1 ? "td-bottom" : "";
                rawElement2 += `<tr><td class="item-name ${td_bottom}">${item_name}</td>`;
    
                // 8個追加
                for (var i = 0; i < 8; i++) {
                    // アイテムの個数が8個未満なら空の要素で埋める
                    if (i < items.attrs.length) {
                        // アイテムの画像と補足部分
                        var attrs = items.attrs[i];
                        var img = attrs.img;
                        var info_text = attrs.info;
                        rawElement2 += `
                            <td class="item-container ${td_bottom}">
                                <div class="item-main" index="${index++}" state="0">
                                    <img class="item-image" src="../image/${img}.png">
                                    <p class="info-text">${info_text}</p>
                                </div>
                            </td>
                        `;
                    } else {
                        rawElement2 += `
                            <td class="item-container ${td_bottom}">
                                <div class="item-main item-empty" state="0">
                                </div>
                            </td>
                        `;
                    }
                }
            });
        }
        
    });
    // 一括追加
    $(".capture-table[imageIndex='0']").append(rawElement1);
    $(".capture-table[imageIndex='1']").append(rawElement2);
}

// ローカルストレージから読み込み
function loadLocalData() {
    JSON.parse(localStorage.data).forEach(data => {
        $(`.capture-table .item-main[index="${data.index}"]`).attr("state", data.state);
    });
}

// 画像に変換
function convertToImage() {
    // 1枚目
    $("#capture1").removeClass("none");
    html2canvas(document.querySelector("#capture1")).then(canvas => { 
        let imageURL = canvas.toDataURL();
        $(".captured-image[imageIndex='0']").attr("src", imageURL);
        $(".captured-image-link[imageIndex='0']").attr("href", imageURL);
    });
    $("#capture1").addClass("none");
    // 2枚目
    $("#capture2").removeClass("none");
    html2canvas(document.querySelector("#capture2")).then(canvas => { 
        let imageURL = canvas.toDataURL();
        $(".captured-image[imageIndex='1']").attr("src", imageURL);
        $(".captured-image-link[imageIndex='1']").attr("href", imageURL);
        $(".waiting-text").addClass("none");
        $(".download-btn-container").removeClass("none")
    });
    $("#capture2").addClass("none");
}

// ダウンロードボタン
$(".download-btn a").click(function(e) {
    $(e.target).attr({
        download: "マイル家具テンプレート",
        href: $(this).attr('href')    
    });
});