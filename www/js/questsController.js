angular.module('starter')

// ALL -- Quests controller
.controller('QuestsCtrl', function($scope, $stateParams, ServerQuests, ServerFindQuest) {

  $scope.getQuests = function () {
    ServerQuests.get(function(data) {
        console.log("SERVICES: Getting Quests data from server...");
        $scope.quests = data.quests;
      },
      function(error) {
        alert("Não foi possível estabelecer conexão com o servidor...");
        console.log("SERVICES: ERROR in getting Quests data from server...");
      });
  }
  $scope.singleQuest = function() {
    var searchId = $stateParams.questId;

    ServerFindQuest.get({id: searchId}, function(data){
      console.log("SERVICES: Getting Quest (Id: " + searchId + ") data from server");
      $scope.quest = data.quest;
    },
    function(error){
      alert("Não foi possível estabelecer conexão com o servidor...");
      console.log("SERVICES: ERROR in getting Quest (Id: " + searchId + ") data from server");
    })
  }

})
