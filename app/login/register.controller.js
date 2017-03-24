angular.module("login").controller("registerController", ["$scope", "$location", "loginService", function ($scope, $location, loginService) {
    $scope.register = function () {


        var customer = {
            firstName: $scope.firstName,
            lastName: $scope.lastName,
            email: $scope.email,
            phone: $scope.phone,
            password: $scope.password,
            address: $scope.address,
            postalCode: $scope.postalCode,
            city: $scope.city
        };
        loginService.register(customer).then(function () {
            $location.path = "/login";
        });

    }
}]);
