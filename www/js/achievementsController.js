angular.module('starter')

.controller('AchievementsCtrl', ['$scope','$stateParams','ServerAchievements', 'ServerFindAchv',
function($scope, $stateParams, ServerAchievements, ServerFindAchv){

  $scope.getAchievements =  function () {
    ServerAchievements.query($scope.serverAchievements, $scope.serverAchievementsError)
	}

	$scope.serverAchievements = function(data){
      console.log("SERVICES: Getting achievements data from server...");
      $scope.achievements = data;
	}

  $scope.serverAchievementsError =  function(data){
      alert("Não foi possível estabelecer conexão com o servidor...");
      console.log("SERVICES: ERROR in getting Achievements data from server...");
  }

  $scope.singleAchievement =  function () {
    var searchId = $stateParams.achvId;

    ServerFindAchv.get({
			id: searchId
		}, $scope.serverFindAchv, $scope.serverFindAchvError)
  }

  $scope.serverFindAchv = function(data) {
    console.log("SERVICES: Getting Achievement data from server...");
    $scope.achievement = data;
  }

  $scope.serverFindAchvError = function(data){
      alert("Não foi possível estabelecer conexão com o servidor...");
      console.log("SERVICES: ERROR in getting Achievement data from server...");
  }
}])
