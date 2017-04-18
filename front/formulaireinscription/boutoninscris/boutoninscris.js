angular.module('BlankApp').component('boutoninscris', {
   templateUrl: 'boutoninscris/boutoninscris.html',
   controller: ['$scope', '$window', 'WebQuest', function($scope,$window, $WebQuest) {
     $scope.boutoninscris = function() { console.log("inscris");  $window.location.href = '/gourmandise.html'; WebQuest.call;};// alert('Identifiants incorrect')
     $scope.titre = "Je m'inscris";
   }]
})


