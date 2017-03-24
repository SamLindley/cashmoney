
angular.module("basket").controller("basketController", ["$scope", "loginService", "basketService", "$location",
    function ($scope, loginService, basketService, $location) {

    var currentUser = loginService.currentUser();
    var myBasket = basketService.myBasket();
    var myOrder = {};


    $scope.checkout = function () {
        if (loginService.isLoggedIn()){
            var myItems = [];
            angular.forEach(myBasket, function (product) {
                var itemInOrder = {
                    productId: product.id,
                    quantity: product.quantity
                };
                myItems.push(itemInOrder);

            });
            myOrder = {
                customerId: currentUser.customerId,
                products: myItems
            };
            console.log(myOrder);
            //basketService.sendOrder(myOrder);
            $scope.yo = "Thank you for shopping with CMS!"
        }
        else{
            $scope.yo = "Please log in to place an order";
        }
    };

    $scope.myBasket = basketService.myBasket();

    $scope.total = basketService.total();

    $scope.productSelected = function (id) {
        $location.path("/product/" + id);
    }





}]);