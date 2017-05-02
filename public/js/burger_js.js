$(document).ready(function() {
    function getBurgersToDevour() {
        $.get("/burgerToDevour", function(data) {
            burgersList = data;
            if (!burgersList || !burgersList.length) {
                $(".burger-to-eat").html("<tr><td>No records...</td></tr>");
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

    function getDevouredBurgers() {
        $.get("/burgerDevoured", function(data) {
            burgersList = data;
            if (!burgersList || !burgersList.length) {
                $(".burger-devoured").html("<tr><td>No records...</td></tr>");
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
        var customerName = $("<input type='text' id='customer-name' placeholder='Customer name'>");
        var validator = $("<br><small class='form-text text-muted text-right warning'>");
        customerColumn.append(customerName).append(validator);
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
        var burger = $("#burger-name").val().trim();
        if (burger == "") {
            $("#add-burger").next().text("This field is required");
        } else {
            var newBurger = {
                burgerName: burger
            };
            submitPost(newBurger);
            $('#add-burger')[0].reset();
        }
    }

    function submitPost(newBurger) {
        $.post("/addBurger", newBurger, function() {
            window.location.href = "/";
        });
    }

    function burgerDevour() {
        var customer = $(this).parent().prev().children().val().trim();
        if (customer == "") {
            $(this).parent().prev().children().next().next().text("Customer name is required");
        } else {
            var customerName = {
                customerName: customer
            };
            var currentBurgerId = $(this).parent().parent().attr("burger-id");
            addCustomer(customerName, currentBurgerId);
        }
    }

    function addCustomer(newCustomer, burgerId) {
        $.post("/addCustomer", newCustomer, function(customerData) {
            var burgerDevoured = {
                id: parseInt(burgerId),
                devoured: true,
                CustomerId: customerData.id
            };
            updateBurgerStatus(burgerDevoured);
        });
    }

    function updateBurgerStatus(burgerDevoured) {
        $.ajax({
            method: "PUT",
            url: "/devourBurger",
            data: burgerDevoured
        }).done(function() {
            window.location.href = "/";
        });
    }

    getBurgersToDevour();
    getDevouredBurgers();
    $("#add-burger").on("submit", addBurgerForm);
    $(document).on("click", "button.devour", burgerDevour);
});