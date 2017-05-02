$(document).ready(function() {

    // Display burger list according to the status devour
    function getBurgersList(routeName, className, devour) {
        $.get(routeName, function(data) {
            burgersList = data;
            if (!burgersList || !burgersList.length) {
                $(className).html("<tr><td>No records...</td></tr>");
            } else {
                $(className).empty();
                var burgerArray = [];
                for (var i = 0; i < burgersList.length; i++) {
                    if (!devour) {
                        burgerArray.push(burgerToDevourRow(burgersList[i]));
                    } else {
                        burgerArray.push(burgerDevouredRow(burgersList[i]));
                    }
                }
                $(className).append(burgerArray);
            }
        });
    }

    // Function to create row for each burger along with the input field to enter customer name.
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

    // Function to create row for each burger along with the name of customer who devoured.
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

    // Function to get burger name from the form and validation.
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

    // Function to post new burger details to database
    function submitPost(newBurger) {
        $.post("/addBurger", newBurger, function() {
            window.location.href = "/";
        });
    }

    // Function to get burger id and customer name from the form and validation.
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

    // Adding new customer to db and getting the customer id
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

    // Update burger status to the database
    function updateBurgerStatus(burgerDevoured) {
        $.ajax({
            method: "PUT",
            url: "/devourBurger",
            data: burgerDevoured
        }).done(function() {
            window.location.href = "/";
        });
    }

    // Display burger list on page loading
    getBurgersList("/burgerToDevour", ".burger-to-eat", false);
    getBurgersList("/burgerDevoured", ".burger-devoured", true);

    // Event handlers
    $("#add-burger").on("submit", addBurgerForm);
    $(document).on("click", "button.devour", burgerDevour);
});