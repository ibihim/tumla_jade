var TUMLA = (function () {
    "use strict";

    var that = {};

    that.loadTranslations = function () {
        var currentBook = $("li.active.bookLi").text(),
            url = "/translations/" + currentBook,
            newTranslationsHook = $("translationsHook"),
            updateOnSuccess = function (partial) {
                newTranslationsHook.append(partial);

                // that.addFunctionalityToTranslations();
            };

        $.get(url).success(updateOnSuccess);
    };

    that.addTranslationOnSubmit = function () {
        var bookNamePath = "li.active.bookLi",
            originalPath = "input#original",
            translationPath = "input#translation",
            url = "/translations",
            newTranslationsHook = $("translationsHook"),
            translateButton = $("input#translate"),

            updateOnSuccess = function (partial) {
                newTranslationsHook.append(partial);

                $(originalPath).val("");
                $(translationPath).val("");

                // TODO
                // that.addFunctionalityToTranslations();
            },

            updateBooksOnFailure = function () {
                // TODO
                alert("ERROR IN YA FACE BIAAATCH!");
            },

            postTranslation = function () {
                var postBody = {
                    bookName: $(bookNamePath).text(),
                    original: $(originalPath).text(),
                    translation: $(translationPath).text()
                };

                console.log("postBody");
                console.log(postBody);

                $.post(url, postBody)
                    .success(updateOnSuccess)
                    .fail(updateBooksOnFailure);
            };

        translateButton.click(postTranslation);
    };

    that.loadBooks = function (cb) {
        var url = "/books",
            lastListItem = $("li#lastLi"),
            updateOnSuccess = function (partial) {
                lastListItem.before(partial);

                that.addFunctionalityToBooks();

                cb();
            };

        $.get(url).success(updateOnSuccess);
    };

    that.addBookOnSubmit = function () {
        var url = "/books",
            bookNameInputPath = "input[id='bookName']",
            oldFirstBookPath = "li.active",
            btnAddBook = $("input#btnAddBook"),

            updateBooksOnSuccess = function (partial) {
                var oldFirstBook = $(oldFirstBookPath);

                oldFirstBook.before(partial);
                oldFirstBook.removeClass("active");
                oldFirstBook.prev().slideDown();

                that.addFunctionalityToBooks();
            },
            updateBooksOnFailure = function () {
                $(bookNameInputPath).val("ERROR!");
            },
            postRequest = function () {
                var bookNameInput = $(bookNameInputPath),
                    bookNameText = bookNameInput.val(),
                    postBody = {
                        bookName: bookNameText
                    };

                $.post(url, postBody)
                    .success(updateBooksOnSuccess)
                    .fail(updateBooksOnFailure);
            };

        btnAddBook.click(postRequest);
    };

    that.deleteBook = function () {
        var bookLi = $(this),
            thisBookName = bookLi.text(),
            ajaxSpec = {
                url: "/books/" + thisBookName,
                type: "DELETE"
            },
            removeOnSuccess = function () {
                bookLi.slideUp();
                bookLi.remove();
            };

        $.ajax(ajaxSpec).success(removeOnSuccess);
    };

    that.addFunctionalityToBooks = function () {
        var bookLiSelector = "li.bookLi",
            removeIconSelector = "i.fa-remove",

            onHoverShowRemoveIcon = function () {
                var removeIcon = $(this).find(removeIconSelector);
                removeIcon.show();
            },
            outHoverHideRemoveIcon = function () {
                var removeIcon = $(this).find(removeIconSelector);
                removeIcon.hide()
            };

        $(bookLiSelector)
            .hover(onHoverShowRemoveIcon, outHoverHideRemoveIcon)
            .click(that.deleteBook)
            .slideDown(800);
    };

    return that;
})();

$(document).ready(function () {
    TUMLA.loadBooks(function () {
        TUMLA.loadTranslations();
    });
    TUMLA.addBookOnSubmit();
});