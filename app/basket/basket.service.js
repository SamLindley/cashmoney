angular.module("basket").factory("basketService", ["$http", function ($http) {
    var myBasket = [];
    var total = 0;
    var itemExists = false;
    return {
        addToBasket: function (product) {
            if(myBasket.length == 0){
                product.quantity = 1;
                myBasket.push(product);
            }else{
                itemExists = false;
                for(var i=0; i<myBasket.length; i++){
                    if(product.id == myBasket[i].id){
                        myBasket[i].quantity ++;
                        itemExists = true;
                        break;
                    }
                }
                if (!itemExists){
                    product.quantity = 1;
                    myBasket.push(product);
                }

            }

        },
        myBasket: function () {
            return myBasket;
        },
        total: function () {
            total = 0;
            angular.forEach(myBasket, function (product) {
                total += (product.price * product.quantity)
            });
            return total;
        },
        sendOrder: function (order) {
            return $http.post("http://nackbutik.azurewebsites.net/api/order", order);
        },
        emptyCart: function () {
            myBasket = [];
        }
    }
}]);