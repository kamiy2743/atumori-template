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
   if ($(this).hasClass("clicked")) {
     $(this).removeClass("clicked clicked-y clicked-n clicked-g");
   } else if (mode == "y") {
     $(this).addClass("clicked clicked-y");
   } else if (mode == "n"){
     $(this).addClass("clicked clicked-n");
   } else {
     $(this).addClass("clicked clicked-g");
   }
   $(".clicked-y").append('<img src="mile-fur/circle.png" class="icon-mark circle y">');
   $(".clicked-n").append('<img src="mile-fur/cross.png" class="icon-mark cross n">');
   $(".clicked-g").append('<img src="mile-fur/heart.png" class="icon-mark heart g">');

  });

  $("#friend-cord").click(function() {
    var getfcord = $("#friend-cord").val();
    $("#out").text(getfcord);
  });

  $(".capture-btn-1").click(function() {
    $("canvas").remove();
    html2canvas(document.querySelector("#capture")).then(canvas => {
    document.body.appendChild(canvas)
    $("canvas").attr("id","target");
    $(".capture-btn-1").removeClass("not-save");
    $("#alert").addClass("none");
    });
  });
  $(".capture-btn-2").click(function() {
    if ($(".capture-btn-1").hasClass("not-save")) {
      $("#alert").removeClass("none");
    } else {
      $("#sucsess").removeClass("none");
    }
    var canvas = document.getElementById("target");
    var dataURI = canvas.toDataURL();
    var image = document.getElementById("output");
    image.src = dataURI;
  });

});

