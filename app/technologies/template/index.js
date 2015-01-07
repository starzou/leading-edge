/**
 * @class index
 * @description
 * @time 2015-01-07 17:35
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var view = {
        title: "Joe",
        calc : function () {
            return 2 + 4;
        }
    };

    var output = Mustache.render("{{title}} spends {{calc}}", view);
    var contentArea = document.getElementById('contentArea');


    contentArea.innerHTML = output;
    console.log(output);

})(window, document);