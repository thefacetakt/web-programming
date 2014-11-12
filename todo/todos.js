$(function() { 
    window.toggleAllChecked = 0;
    window.localStoragePrefix = "TODO_LIST_ELEMENT_";
    
    $("#toggle-all").attr("checked", false);
    
    function doMachinations()
    {
        var innerValue = $("#new-todo").val().replace(/</g, "&lt;").replace(/>/g, "&gt;");
        $("#todo-list").append(
                    " \
                        <li> \
                            <div class=\"view\"> \
                                <input class=\"toggle\" type=\"checkbox\"></input> \
                                <label contenteditable=\"true\"> \
                    "
                    
                    + innerValue +
                        
                    " \
                                </label> \
                                <i class=\"destroy\"></i> \
                            </div> \
                        </li> \
                    "
                );
                $("#new-todo").val("");
                $(".todo-count b").text((parseInt($(".todo-count b").text()) + 1).toString());
                $("#toggle-all").attr("checked", false);
                toggleAllChecked = 0;
    }
    
    for (var i in localStorage) {
        console.log(i.slice(0, window.localStoragePrefix.length));
        console.log(i.slice(window.localStoragePrefix.length));
        if (i.slice(0, window.localStoragePrefix.length) == window.localStoragePrefix)
        {
            
            for (var j = 0; j < parseInt(localStorage[i]); ++j)
            {
                console.log(i + j.toString());
                $("#new-todo").val(i.slice(window.localStoragePrefix.length).trim());
                doMachinations();
            }
        }
    }
    
    
    
    $("#new-todo").keypress(function(e) {
        if (e.which == 13)
        {
            $("#new-todo").val($("#new-todo").val().replace(/</g, "&lt;").replace(/>/g, "&gt;"));
            if ($("#new-todo").val())
            {
                doMachinations();
                var elementId = window.localStoragePrefix + $($($($("#todo-list").children()[$("#todo-list").children().length - 1]).children()[0]).children()[1]).text().trim();
                if (!(elementId in localStorage)) {
                    localStorage[elementId] = 0;
                }
                ++localStorage[elementId];
                console.log(elementId);
            }
        }
    });
    
    $(document).on("click", "#toggle-all", function() {
        window.toggleAllChecked ^= 1;
        if (window.toggleAllChecked == 0) {
            $(".toggle:checked").click();
        } else {
            $(".toggle:not(:checked)").click();
        }
    });
    
    function checkToggleAll()
    {
        if ($(".toggle").size() == 0)
        {
            if (window.toggleAllChecked == 1) {
                $("#toggle-all").remove();
                $("#main").prepend("<input id=\"toggle-all\" type=\"checkbox\"></input>");
                window.toggleAllChecked = 0;
            }
        } else {
            if ($(".toggle:not(:checked)").size() == 0) {
                if (window.toggleAllChecked == 0) {
                    $("#toggle-all").click();
                }
            } else {
                if (window.toggleAllChecked == 1) {
                    $("#toggle-all").remove();
                    $("#main").prepend("<input id=\"toggle-all\" type=\"checkbox\"></input>");
                    window.toggleAllChecked = 0;
                }
            }
        }
    }
    
    $(document).on("click", ".toggle", function() {
        checkToggleAll();
    });
    
    $(document).on("click", ".destroy", function() {
        
        
        --localStorage[window.localStoragePrefix + $($(this).parent().children()[1]).text().trim()];
        $(this).parent().parent().remove();
        $(".todo-count b").text((parseInt($(".todo-count b").text()) - 1).toString());
        
        checkToggleAll();
    });
    
    $(document).on("keydown", ".view label", function() {
        console.log($(this).text() + " 3");
        --localStorage[window.localStoragePrefix + $(this).text().trim()];
    });
    
    $(document).on("keyup", ".view label", function() {
        console.log($(this).text() + " 4");
        if (!(window.localStoragePrefix + $(this).text() in localStorage)) {
            localStorage[window.localStoragePrefix + $(this).text().trim()] = 0;
        }
        ++localStorage[window.localStoragePrefix + $(this).text().trim()];
    });
    
    $("#delete-all").click(function() {
        
        $(".todo-count b").text((parseInt($(".todo-count b").text()) - $(".toggle:checked").size()).toString());
        $(".toggle:checked").each(function() {
            --localStorage[window.localStoragePrefix + $($(this).parent().children()[1]).text().trim()];
        });
        
        $(".toggle:checked").each(function() {
            $(this).parent().parent().remove();
        });
        checkToggleAll();
    });
        
  
});
//$(document).on('