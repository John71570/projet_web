var app = angular.module('BlankApp');

app.component('menuderoulant', {
   templateUrl: 'menuderoulant/menuderoulant.html',
   controller: ['$scope', '$window', 'WebQuest', function($scope, $window, $WebQuest) {
     $scope.connexion = function() { console.log("Ca deroule"); WebQuest.call;   };
     $scope.titre = "Type";
   }]
})

app.controller('myCtrl', function($scope) {
    $scope.names = ["Emil", "Tobias", "Linus"];
    
});
