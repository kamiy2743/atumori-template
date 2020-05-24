$(function() {
  var mode = "y";
  $("#btn-y").click(function() {
    mode = "y";
  });
  $("#btn-n").click(function() {
    mode = "n";
  });
  $("#btn-g").click(function() {
    mode = "g";
  });

  $(".item").click(function() {
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
   } else {
     $(this).addClass("clicked clicked-g");
     $(".item-cap").eq(index).addClass("clicked clicked-g-lit");
   }
   $(".clicked-y").append('<img src="mile-fur/circle.png" class="icon-mark circle y">');
   $(".clicked-n").append('<img src="mile-fur/cross.png" class="icon-mark cross n">');
   $(".clicked-g").append('<img src="mile-fur/heart.png" class="icon-mark heart g">');
   $(".clicked-y-lit").append('<img src="mile-fur/circle.png" class="icon-mark circle y y-lit">');
   $(".clicked-n-lit").append('<img src="mile-fur/cross.png" class="icon-mark cross n n-lit">');
   $(".clicked-g-lit").append('<img src="mile-fur/heart.png" class="icon-mark heart g g-lit">');
  });

  $("#friend-cord").change(function() {
    var getfcord = $("#friend-cord").val();
    $("#out").text(getfcord);
  });

  $(".capture-btn-1").click(function() {
    $("html, body").scrollTop(0);
    $("canvas").remove();
    $("#capture").removeClass("none");
    html2canvas(document.querySelector("#capture")).then(canvas => {
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
      $("#sucsess").removeClass("none");
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

});
