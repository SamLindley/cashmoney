angular.module("customer").controller("customerController", [ "$scope","loginService", "productService", "customerService", "$location",
    function ($scope, loginService, productService, customerService, $location) {

        var currentUser = loginService.currentUser();

        $scope.currentUser = currentUser;

        customerService.allOrders(currentUser.customerId).then(function (response) {
            var allOrders = response.data;
            var totalOfAllOrders = 0;

            angular.forEach(allOrders, function (order) {
                var total = 0;
                angular.forEach(order.products, function (product) {
                    productService.getProduct(product.productId).then(function (response) {
                        total += (response.data.price * product.quantity);
                        totalOfAllOrders+=(response.data.price * product.quantity);
                        order.total = total;
                        $scope.total = totalOfAllOrders;
                    });
                    total = 0;
                });
            });


            console.log(allOrders.total);
            $scope.orders = allOrders;
        });

        $scope.orderClicked = function (id) {
            $location.path("/order/" + id)
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
            loginService.edit(customerUpdate, currentUser.customerId).then(function (response) {
                console.log(response.data);
                    loginService.login(logInCredentials).then(function (response) {
                        var user = loginService.currentUser();
                        console.log(user);
                        $location.path("/details");

                    });
                }

            );
            console.log(customerUpdate);
        };
}]);
