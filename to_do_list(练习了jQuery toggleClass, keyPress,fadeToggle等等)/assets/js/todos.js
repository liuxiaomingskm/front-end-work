//Check Off Specific Todos by Clicking
$('ul').on("click","li",function () {
    $(this).toggleClass("complete");
});


//click on the X to delete Todo
$("ul").on("click","span",function (event) {
    $(this).parent().fadeOut(1000,function () {
        $(this).remove();
    })
event.stopPropagation();

});

$("input[type = 'text']").keypress(function (event) {
    if (event.which === 13){
        // grabbing new todo text from input
       var todoText =  $(this).val();
       //clear the  input
        $(this).val("");
       //create a new li and to ul
        $("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>")

    }
});

$(".fa-plus").click(function () {
    $("input[type = 'text']").fadeToggle();
});