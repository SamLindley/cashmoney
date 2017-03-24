
angular.module("basket").controller("basketController", ["$scope", "loginService", "basketService", "$location",
    function ($scope, loginService, basketService, $location) {

    var currentUser = loginService.currentUser();
    var myBasket = basketService.myBasket();
    var myOrder = {};


    $scope.checkout = function () {
        if (myBasket.length == 0){
            $scope.yo = "Put something in the basket..."
        }
        else if (loginService.isLoggedIn()){
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
            basketService.sendOrder(myOrder);
            $scope.yo = "Thank you for shopping with CMS! Your order has been placed. You can check your order in the Account Details tab!";
            basketService.emptyCart();
            $scope.total = 0;
        }
        else{
            $scope.yo = "Please log in to place an order";
        }
    };

    $scope.myBasket = basketService.myBasket();

    $scope.total = basketService.total();

    $scope.productSelected = function (id) {
        $location.path("/product/" + id);
    };

    $scope.$watch(function () {
        return basketService.myBasket();

    }, function (newValue, oldValue) {
        if (newValue !== oldValue){
            $scope.myBasket = basketService.myBasket();
        }
    })





}]);