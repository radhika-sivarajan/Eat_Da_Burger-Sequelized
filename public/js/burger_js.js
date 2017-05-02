$(document).ready(function() {
    function getBurgers() {
        $.get("/burgerList", function(data) {
            burgersList = data;
            if (!burgersList || !burgersList.length) {
                $(".burger-to-eat").html("<tr><td>No records... 😦</td></tr>");
            } else {
                $(".burger-to-eat").empty();
                var burgerToAdd = [];
                for (var i = 0; i < burgersList.length; i++) {
                    if (!burgersList[i].devoured) {
                        burgerToAdd.push(burgerToDevourRow(burgersList[i]));
                    }
                }
                $(".burger-to-eat").append(burgerToAdd);
            }
        });
    }

    function getDevourBurgers() {
        $.get("/burgerDevourList", function(data) {
            burgersList = data;
            if (!burgersList || !burgersList.length) {
                $(".burger-devoured").html("<tr><td>No records... 😦</td></tr>");
            } else {
                $(".burger-devoured").empty();
                var burgerDevoured = [];
                for (var i = 0; i < burgersList.length; i++) {
                    burgerDevoured.push(burgerDevouredRow(burgersList[i]));
                }
                $(".burger-devoured").append(burgerDevoured);
            }
        });
    }

    function burgerToDevourRow(burger) {
        var newTableRow = $("<tr>");
        newTableRow.attr("burger-id", burger.id);
        var burgerId = $("<td>");
        burgerId.text(burger.id);
        var burgerName = $("<td>");
        burgerName.text(burger.burgerName);
        var customerColumn = $("<td>");
        var customerName = $("<input type='text' id='customer-name'>");
        customerColumn.append(customerName);
        var buttonColumn = $("<td>");
        var devourBtn = $("<button>");
        devourBtn.text("Devour it !");
        devourBtn.addClass("btn btn-xs btn-danger devour");
        buttonColumn.append(devourBtn);
        newTableRow.append(burgerId).append(burgerName).append(customerColumn).append(buttonColumn);
        return newTableRow;
    }

    function burgerDevouredRow(burger) {
        var newTableRow = $("<tr>");
        newTableRow.attr("burger-id", burger.id);
        var burgerId = $("<td>");
        burgerId.text(burger.id);
        var burgerName = $("<td>");
        burgerName.text(burger.burgerName);
        var customerName = $("<td class='customer-name'>");
        customerName.text("(Eaten by " + burger.Customer.customerName + ".)");
        newTableRow.append(burgerId).append(burgerName).append(customerName);
        return newTableRow;
    }

    function addBurgerForm(event) {
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
        var customerName = {
            customerName: $(this).parent().prev().children().val().trim()
        };
        var currentBurgerId = $(this).parent().parent().attr("burger-id");
        addCustomer(customerName, currentBurgerId);
    }

    function addCustomer(newCustomer, burgerId) {
        $.post("/addCustomer", newCustomer, function(customerData) {
            var burgerDevoured = {
                id: parseInt(burgerId),
                devoured: 1,
                CustomerId: customerData.id
            };
            $.ajax({
                method: "PUT",
                url: "/devourBurger",
                data: burgerDevoured
            }).done(function() {
                window.location.href = "/";
            });
        });
    }

    getBurgers();
    getDevourBurgers();
    $("#add-burger").on("submit", addBurgerForm);
    $(document).on("click", "button.devour", burgerDevour);
});