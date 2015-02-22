var TUMLA = {};

TUMLA.getTranslations = function () {
    $.get("/translations", function (data) {
        $("#result").html(JSON.stringify(data));
        console.log("get data", data);
    });
};

TUMLA.postTranslation = function () {
    var originalField = $("input[name='original']"),
        translationField = $("input[name='translation']"),
        originalText = originalField.val(),
        translationText = translationField.val();

    var successTemplate = [
        "<div class='col-xs-12'>",
        "<div class='translation panel panel-yellow'>",
        "<div class='panel-heading'>",
        "<div>",
        originalText,
        "</div>",
        "</div>",
        "<a href='#'>",
        "<div class='panel-footer'>",
        translationText,
        "<div class='clearfix'></div>",
        "</div>",
        "</a>",
        "</div>"
    ].join("");

    var failTemplate = [
        "<div class='col-xs-12'>",
        "<div class='panel panel-red'>",
        "<div class='panel-heading'>",
        "<div>",
        "Error!",
        "</div>",
        "</div>",
        "</div>",
        "</div>"
    ].join("");

    $.post("/translations", {
        original: originalText,
        translation: translationText
    }).fail(function () {
        $("#translations").children().first().html(failTemplate);
    });

    $("#translations").prepend(successTemplate);
    originalField.val("");
    translationField.val("");
};

TUMLA.postBook = function () {
    var oldFirstBook = $("li#firstBook");
    var bookNameInput = $("input[name='book']"),
        bookNameText = bookNameInput.val();

    var successTemplate = [
        "<li class='active' id='firstBook'>",
        "<a class='light-colorize' href='#'>",
        "<i class='colorize fix-margin fa fa-fw fa-book' />",
        bookNameText,
        "</a>",
        "</li>"
    ].join("");

    $.post("/books", {
        bookName: bookNameText
    }).success(function () {
        oldFirstBook.before(successTemplate);
        oldFirstBook.removeClass();
        oldFirstBook.removeAttr("id");

        bookNameInput.val("");
    }).fail(function () {
        bookNameInput.val("ERROR!");
    });
};

TUMLA.removeBook = function (that) {
    var thisBookName = $(that).text();

    $.ajax({
        url: "/books/" + thisBookName,
        type: "DELETE"}
    ).success(function () {
        $(that).remove();
    });
};