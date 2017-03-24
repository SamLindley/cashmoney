
angular.module("login").controller("loginController", ["$scope", "$location", "$route", "$window", "loginService", "customerService", "productService", "$q",
    function ($scope, $location, $route, $window, loginService, customerService, productService, $q) {

    $scope.login = function () {

        var logInCredentials = {
            email: $scope.email,
            password: $scope.password
        };

       loginService.login(logInCredentials).then(function (response) {
           $location.path("/");
        });
    };

    $scope.isLoggedIn = function () {
        return loginService.isLoggedIn();
    };

    $scope.logOut = function () {
        loginService.logOut();
    };

    $scope.currentUser = function () {
        return loginService.currentUser();
    };

}]);