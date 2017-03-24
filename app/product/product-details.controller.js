angular.module("product").controller("productDetailsController", ["$scope","$routeParams", "productService", "basketService",
    function ($scope, $routeParams, productService, basketService) {

    var product;
    var isInStock;



    productService.getProduct($routeParams.productId).then(function (response) {
        $scope.product = response.data;
        product = response.data;
        if (product.unitsInStock == 0){
            isInStock = false;
        }else{
            isInStock = true;

        }
    });

    $scope.addToBasket = function () {
        basketService.addToBasket(product);
    };

    $scope.productInStock = function () {
        return isInStock;
    }

}]);