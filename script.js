$(function() {
  var mode = "neutral";
  $(".btn-y").click(function() {
    mode = "y";
  });
  $(".btn-n").click(function() {
    mode = "n";
  });
  $(".btn-g").click(function() {
    mode = "g";
  });

  $(".select-btn").click(function() {
    $(".select-btn").removeClass("selected-btn");
    $(this).addClass("selected-btn");
  });

  $(".item").click(function() {
   $("#alert").removeClass("none");
   $(".icon-mark").remove();
   var index = $(".item").index(this);
   $(".item-cap").eq(index).removeClass("clicked clicked-y-lit clicked-n-lit clicked-g-lit");
   if ($(this).hasClass("clicked")) {
     $(this).removeClass("clicked clicked-y clicked-n clicked-g");
   } else if (mode == "y") {
     $(this).addClass("clicked clicked-y");
     $(".item-cap").eq(index).addClass("clicked clicked-y-lit");
   } else if (mode == "n"){
     $(this).addClass("clicked clicked-n");
     $(".item-cap").eq(index).addClass("clicked clicked-n-lit");
   } else if (mode == "g"){
     $(this).addClass("clicked clicked-g");
     $(".item-cap").eq(index).addClass("clicked clicked-g-lit");
   }
   $(".clicked-y").append('<img src="mile-fur/circle.png" class="icon-mark circle y">');
   $(".clicked-n").append('<img src="mile-fur/cross.png" class="icon-mark cross n">');
   $(".clicked-g").append('<img src="mile-fur/heart.png" class="icon-mark heart g">');
   $(".clicked-y-lit").append('<img src="mile-fur/circle-0.5.png" class="icon-mark circle y-lit">');
   $(".clicked-n-lit").append('<img src="mile-fur/cross-0.4.png" class="icon-mark cross n-lit">');
   $(".clicked-g-lit").append('<img src="mile-fur/heart-0.5.png" class="icon-mark heart g-lit">');
  });

  $("#friend-cord").change(function() {
    var getfcord = $("#friend-cord").val();
    $("#out").text(getfcord);
  });

  $(".fa-android").click(function() {
    if ($(".capture-btn-1").hasClass("for-android")) {
      $(".fa-android").removeClass("for-selected");
      $(".capture-btn-1").removeClass("for-android");
      $(".capture-btn-1 span").text("変更を保存");
      $("#capture").css("transform","scale(1)");
    } else {
      $(".fa-android").addClass("for-selected");
      $(".capture-btn-1").addClass("for-android");
      $(".capture-btn-1 span").text("変更を保存 for android");
      $("#capture").css("transform","scale(0.9)");
    }
  });

  $(".capture-btn-1").click(function() {
    $("html, body").scrollTop(0);
    $("canvas").remove();
    $("#capture").removeClass("none");
    html2canvas(document.querySelector("#capture-container")).then(canvas => {
    document.body.appendChild(canvas)
    $("canvas").attr("id","target");
    $("canvas").addClass("none");
    $(".capture-btn-1").removeClass("not-save");
    $("#alert").addClass("none");
    $("#capture").addClass("none");
    });
  });

  $(".capture-btn-2").click(function() {
    if ($(".capture-btn-1").hasClass("not-save")) {
      $("#alert").removeClass("none");
    } else {
      $(".sucsess").removeClass("none");
    }
    $("canvas").removeClass("none");
    var canvas = document.getElementById("target");
    var dataURI = canvas.toDataURL();
    var image = document.getElementById("output");
    image.src = dataURI;
    $("canvas").addClass("none");
  });

  $(".top-btn").click(function() {
    $("html, body").animate({"scrollTop":0}, "100");
  });
