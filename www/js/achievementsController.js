angular.module('starter')

.controller('AchievementsCtrl', ['$scope','$stateParams','ServerAchievements', 'ServerFindAchv',
function($scope, $stateParams, ServerAchievements, ServerFindAchv){

  $scope.getAchievements =  function () {
    ServerAchievements.get(function(data){
      console.log("SERVICES: Getting achievements data from server...");
      $scope.achievements = data.achievements;
    },
    function(error){
      alert("Não foi possível estabelecer conexão com o servidor...");
      console.log("SERVICES: ERROR in getting Achievements data from server...");
    })
  }

  // TODO: Remover os callbacks de dentro da chamada e criar funcoes de escopo
  $scope.singleAchievement =  function () {
    var searchId = $stateParams.achvId;

    ServerFindAchv.get({id: searchId}, $scope.findAchvSuccess ,
    function(error){
      alert("Não foi possível estabelecer conexão com o servidor...");
      console.log("SERVICES: ERROR in getting Achievement (Id: " + searchId + ") data from server...");
    })
  }

  $scope.findAchvSuccess = function(data) {
    console.log("SERVICES: Getting Achievement (Id: " + searchId + ") data from server...");
    $scope.achievement = data.achievement;
  }
}])
