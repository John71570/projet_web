angular.module('BlankApp').component('connexion', {
   templateUrl: 'connexion/connexion.html',
   controller: ['$scope', '$window', 'WebQuest', function($scope, $window, $WebQuest) {
     $scope.connexion = function() { console.log("Connexion"); WebQuest.call;   };//$window.location.href = 'toto/toto.html'; alert('Identifiants incorrect')
     $scope.titre = "Connexion";
   }]
})
