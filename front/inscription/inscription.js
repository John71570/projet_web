angular.module('BlankApp').component('inscription', {
   templateUrl: 'inscription/inscription.html',
   controller: ['$scope', 'WebQuest', '$window', function($scope, WebQuest, $window) {
     $scope.inscription = function() { console.log("Inscription"); WebQuest.call(); $window.location.href = 'formulaireinscription/formulaireinscription.html'; }
     $scope.titre = "Inscription";
   }]
})
