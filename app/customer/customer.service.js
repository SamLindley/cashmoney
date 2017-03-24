angular.module("customer").factory("customerService", ["$http", function ($http) {
    return {
        allOrders: function (id) {
            return $http.get("http://nackbutik.azurewebsites.net/api/order?customerid=" + id)
        },
        uniqueOrder: function (id) {
            return $http.get("http://nackbutik.azurewebsites.net/api/order/" + id)
        },
        register: function (customer) {
            return $http.post("http://nackbutik.azurewebsites.net/api/customer", customer);
        },
        edit: function (details, id) {
            return $http.put("http://nackbutik.azurewebsites.net/api/customer/" + id, details);
        }
    }
}]);
