
// 最初に実行
start()
function start() {
    // テーブル要素生成
    generateItemElements();

    // ローカルストレージにデータがあれば読み込み
    if (localStorage.data) {
        loadLocalData();
    }
}

// 選択用家具テーブル生成
function generateItemElements() {
    // 追加する要素を文字列にしておいて後で一括追加
    var rawElement = "";
    var index = 0;
    
    ITEM_DATAS.forEach(item_datas => {
        // マイル表示部分
        var mile = item_datas.mile;
        rawElement += `
            <tr>
                <td class="mile-title-container" mile="${mile}" colspan="6">
                    <span class="mile-title">${mile} マイル</span>
                    <div class="all-delete all-btn btn">全削除</div>
                    <div class="all-select all-btn btn">全選択</div>
                </td>
            </tr>
        `;

        item_datas.items.forEach(items => {
            // アイテム名表示部分
            var item_name = items.name;
            // アイテムバリエーション数
            var item_variation_count = items.attrs.length;
            // 6個以上なら2列にする
            var rowspan = item_variation_count > 5 ? 2 : 1;
            rawElement += `<tr><td class="item-name" rowspan="${rowspan}">${item_name}</td>`;

            // 1列なら5回、2列なら10回
            for (var i = 0; i < 5 * rowspan; i++) {
                // 2列目の最初に追加
                if (i == 5) {
                    rawElement += "</tr><tr>";
                }
                // アイテムの個数が5個未満なら空の要素で埋める
                if (i < items.attrs.length) {
                    // アイテムの画像と補足部分
                    var attrs = items.attrs[i];
                    var img = attrs.img;
                    var info_text = attrs.info;
                    rawElement += `
                        <td class="item-container">
                            <div class="item-main" mile="${mile}" index="${index++}" state="0">
                                <img class="item-image" src="./image/${img}.png">
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
    $(".item-table").append(rawElement);
}

// ローカルストレージから読み込み
function loadLocalData() {
    JSON.parse(localStorage.data).forEach(data => {
        $(`.item-table .item-main[index="${data.index}"]`).attr("state", data.state);
    });
}


// 自動入力
$(".auto-menu").click(function() {
    $(".menu-icon .fas").toggle();
    $(".menu-main").slideToggle();
});
//実行
$(".auto-do").click(function() {
    var arr = [];
    $(".item-main").attr("state",0);
    $(".q-list input:checked").each(function() {
        var val = $(this).attr("id").slice(-1);
        arr.push(val);
    });
    if(arr.length == 5) {
        $(".auto-succsess").show();
        $(".auto-error").hide();
        arr.forEach((color,i) => {
            AUTO_DATA[i][color-1].forEach(index => {
                $(`.item-main[index="${index}"]`).attr("state",1);
            });
        });
        dataSave();
    } else {
        $(".auto-succsess").hide();
        $(".auto-error").show();
    }
});


// マーク選択
$(".mark-btn").click(function() {
    $(".mark-btn").removeClass("mark-selected");
    $(this).addClass("mark-selected");
});

// ローカルストレージに保存
function dataSave() {
    var saveDatas = [];
    $('.item-table .item-main[state!="0"]').each(function() {
      saveDatas.push({index:$(this).attr("index"),state:$(this).attr("state")});
    });
    localStorage.data = JSON.stringify(saveDatas);
}
// 家具選択
$(".item-main").click(function() {
    if ($(this).hasClass("item-empty")) return;
    var selectedState = $(".mark-selected").attr("state");
    var setState = $(this).attr("state") == 0 ? selectedState : 0;
    $(this).attr("state", setState);
    dataSave();
});
// 全選択
$(".all-select").click(function() {
    var mile = $(this).parent(".mile-title-container").attr("mile");
    var setState = $(".mark-selected").attr("state");
    $(`.item-main[mile="${mile}"]`).attr("state", setState);
    dataSave();
});
// 全削除
$(".all-delete").click(function() {
    var mile = $(this).parent(".mile-title-container").attr("mile");
    $(`.item-main[mile="${mile}"]`).attr("state", 0);
    dataSave();
});


// 画像変換ボタン
$(".convert-btn").click(function() {
    location.href = "./ConvertPage/convertPage.html";
});



