angular.module("customer").factory("customerService", ["$http", function ($http) {
    return {
        allOrders: function (id) {
            return $http.get("http://nackbutik.azurewebsites.net/api/order?customerid=" + id)
        }
    }
}]);
