angular.module("customer").controller("orderDetailsController", [ "$scope","loginService", "productService", "customerService", "$location", "$routeParams",
    function ($scope, loginService, productService, customerService, $location, $routeParams) {

    var productsInOrder = [];
    var products = [];

        customerService.uniqueOrder($routeParams.orderId).then(function (response) {
            productsInOrder.push(response.data.products);
            angular.forEach(productsInOrder, function (product) {
                console.log(1 + " " + product);
                angular.forEach(product, function (product) {
                    productService.getProduct(product.productId).then(function (response) {
                        p = response.data;
                        p.quantity = product.quantity;
                        products.push(p);
                    })
                });

            })


        });
        $scope.products = products;



    }]);

