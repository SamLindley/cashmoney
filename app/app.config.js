angular.module("app").config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "app/product/product-list.template.html",
        controller: "productListController"

    })
    .when("/basket", {
        templateUrl: "app/basket/basket.template.html",
        controller: "basketController"
    })
    .when("/login", {
        templateUrl: "app/login/login.template.html",
        controller: "loginController"
    })
    .when("/product/:productId", {
        templateUrl: "app/product/product-details.template.html",
        controller: "productDetailsController"
    })
    .when("/register", {
        templateUrl: "app/login/register.template.html",
        controller: "registerController"
    })
    .otherwise("/");
    $locationProvider.html5Mode(true);
}]);