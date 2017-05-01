$(document).ready(function() {
    function getBurgers() {
        $.get("/burgerList", function(data) {
            console.log("Burgers", data);
            burgersList = data;
            if (!burgersList || !burgersList.length) {
                $(".burger-to-eat").html("<tr><td>No burgers... 😦</td></tr>");
            } else {
                $(".burger-to-eat").empty();
                var burgerToAdd = [];
                for (var i = 0; i < burgersList.length; i++) {
                    burgerToAdd.push(createNewRow(burgersList[i]));
                }
                $(".burger-to-eat").append(burgerToAdd);
            }
        });
    }

    function createNewRow(burger) {
        var newTableRow = $("<tr>");
        var burgerId = $("<td>");
        burgerId.text(burger.id);
        var burgerName = $("<td>");
        burgerName.text(burger.burgerName);
        var devourBtn = $("<button>");
        devourBtn.text("Devour it !");
        devourBtn.addClass("btn btn-xs btn-danger");
        newTableRow.append(burgerId).append(burgerName).append(devourBtn);
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

    getBurgers();
    $("#add-burger").on("submit", handleFormSubmit);
});