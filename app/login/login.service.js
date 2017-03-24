angular.module("login").factory("loginService", ["$http", function ($http) {
    var currentUser = "no user";
    var isLoggedIn = false;

    return {
        login: function (logInCredentials) {
            return $http.post("http://nackbutik.azurewebsites.net/api/customer/login", logInCredentials).then(function (response) {
                isLoggedIn = true;
                currentUser = response.data;
            });

        },

        logOut: function () {
            isLoggedIn = false;
            currentUser = "no user";
        },

        isLoggedIn: function () {
            return isLoggedIn;
        },

        register: function (customer) {
            return $http.post("http://nackbutik.azurewebsites.net/api/customer", customer);
        },
        currentUser: function () {
            return currentUser;
        },
        edit: function (details, id) {
            return $http.put("http://nackbutik.azurewebsites.net/api/customer/" + id, details);
        }







    };
}]);