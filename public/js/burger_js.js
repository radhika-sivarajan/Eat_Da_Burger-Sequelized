$(document).ready(function() {
    function getBurgers() {
        $.get("/burgerList", function(data) {
            burgersList = data;
            if (!burgersList || !burgersList.length) {
                $(".burger-to-eat").html("<tr><td>No burgers... 😦</td></tr>");
            } else {
                $(".burger-to-eat").empty();
                $(".burger-devoured").empty();
                var burgerToAdd = [];
                var burgerDevoured = [];
                for (var i = 0; i < burgersList.length; i++) {
                    if (burgersList[i].devoured) {
                        burgerDevoured.push(createNewRow(burgersList[i]));
                    } else {
                        burgerToAdd.push(createNewRow(burgersList[i]));
                    }
                }
                $(".burger-to-eat").append(burgerToAdd);
                $(".burger-devoured").append(burgerDevoured);
                $(".burger-devoured").find("button").remove();
            }
        });
    }

    function createNewRow(burger) {
        var newTableRow = $("<tr>");
        newTableRow.attr("burger-id", burger.id);
        var burgerId = $("<td>");
        burgerId.text(burger.id);
        var burgerName = $("<td>");
        burgerName.text(burger.burgerName);
        var buttonColumn = $("<td>");
        var devourBtn = $("<button>");
        devourBtn.text("Devour it !");
        devourBtn.addClass("btn btn-xs btn-danger devour");
        buttonColumn.append(devourBtn);
        newTableRow.append(burgerId).append(burgerName).append(buttonColumn);
        return newTableRow;
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        var newBurger = {
            burgerName: $("#burger-name").val().trim(),
            devoured: 0
        };
        submitPost(newBurger);
        $('#add-burger')[0].reset();
    }

    function submitPost(newBurger) {
        $.post("/addBurger", newBurger, function() {
            window.location.href = "/";
        });
    }

    function burgerDevour() {
        var currentBurgerId = $(this).parent().parent().attr("burger-id");
        var burgerDevoured = {
            id: parseInt(currentBurgerId),
            devoured: 1
        };
        $.ajax({
            method: "PUT",
            url: "/devourBurger",
            data: burgerDevoured
        }).done(function() {
            window.location.href = "/";
        });
    }

    getBurgers();
    $("#add-burger").on("submit", handleFormSubmit);
    $(document).on("click", "button.devour", burgerDevour);
});