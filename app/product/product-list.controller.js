/**
 * Created by Sam on 3/9/2017.
 */
angular.module("product").controller("productListController", ["$scope", "productService", "$location", function ($scope, productService, $location) {
    var allProducts;

    productService.getProducts().then(function (response) {
        $scope.products = response.data;
        allProducts = response.data;
    });

    $scope.productClicked = function (id) {
        $location.path("/product/" + id);
    };

    productService.getCategories().then(function (response) {
        $scope.categories = response.data;
    })


}]);