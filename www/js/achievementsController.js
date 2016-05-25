angular.module('starter')

.controller('AchievementsCtrl', function($scope, ServerAchievements){
  ServerAchievements.get(function(data){
    console.log("SERVICES: Getting achievements data from server...");
    $scope.achievements = data.achievement;
  },
  function(error){
    alert("Não foi possível estabelecer conexão com o servidor...");
    console.log("SERVICES: ERROR in getting Achievements data from server...");
  })
})

// 'ACHV' means 'achievement'
.controller('SingleACHV', function($scope, $stateParams, ServerFindAchv){
  var searchId = $stateParams.achvId;

  ServerFindAchv.get({id: searchId}, function(data){
    console.log("SERVICES: Getting Achievement (Id: " + searchId + ") data from server...");
    $scope.achievement = data.achievement;
  },
  function(error){
    alert("Não foi possível estabelecer conexão com o servidor...");
    console.log("SERVICES: ERROR in getting Achievement (Id: " + searchId + ") data from server...");
  })
})
