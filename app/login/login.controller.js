
angular.module("login").controller("loginController", ["$scope", "$location", "$route", "$window", "loginService", "customerService", "productService", "$q",
    function ($scope, $location, $route, $window, loginService, customerService, productService, $q) {

    var currentUser = loginService.currentUser();

    customerService.allOrders(currentUser.customerId).then(function (response) {
        var allOrders = response.data;
        var totalOfAllOrders = 0;

        angular.forEach(allOrders, function (order) {
            var total = 0;
            angular.forEach(order.products, function (product) {
                productService.getProduct(product.productId).then(function (response) {
                    total += (response.data.price * product.quantity);
                    console.log(total);
                    order.total = total;
                    totalOfAllOrders += total;
                })
            });

        });

        allOrders.total = totalOfAllOrders;
        $scope.orders = allOrders;
        console.log(response.data);
    });

    $scope.login = function () {

        /*loginService.getAllCustomers().then(function (response) {
           console.log(response.data);
        });*/
        var logInCredentials = {
            email: $scope.email,
            password: $scope.password
        };


       loginService.login(logInCredentials).then(function (response) {
           var user = loginService.currentUser();
            console.log(user);
            $location.path("/");

        });


    };

    $scope.isLoggedIn = function () {
        return loginService.isLoggedIn();
    };

    $scope.logOut = function () {
        console.log("hello");
        loginService.logOut();
        console.log(loginService.isLoggedIn())
    };

    $scope.showLoginStatus = function () {
        console.log(loginService.isLoggedIn())
    };

    $scope.currentUser = function () {
        return loginService.currentUser();
    };

    $scope.update = function () {
        var logInCredentials = {
            "email": $scope.email,
            "password": $scope.password
        };
        var customerUpdate = {
            firstName: $scope.firstName,
            lastName: $scope.lastName,
            email: $scope.email,
            phone: $scope.phone,
            password: $scope.password,
            address: $scope.address,
            postalCode: $scope.postalCode,
            city: $scope.city
        };
        loginService.edit(customerUpdate, currentUser.customerId).then(function () {
            loginService.login(logInCredentials).then(function (response) {
                var user = loginService.currentUser();
                console.log(user);
                $location.path("/details");

            });
        }

        );
        console.log(customerUpdate);
    };

    $scope.orderClicked = function (id) {

    }

}]);