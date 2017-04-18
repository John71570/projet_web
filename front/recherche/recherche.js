angular.module('BlankApp').component('recherche', {
   templateUrl: 'recherche/recherche.html',
   controller: ['$scope', '$window', 'WebQuest', function($scope,$window, $WebQuest) {
     $scope.recherche = function() { console.log("recherche");  };// $window.location.href = '/gourmandise.html'; WebQuest.call;alert('Identifiants incorrect')
     $scope.titre = "Chercher";
   }]
})

