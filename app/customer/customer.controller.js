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
        }
}]);
