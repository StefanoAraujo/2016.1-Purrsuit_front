angular.module('starter')

// ALL -- Quests controller
.controller('QuestsCtrl',['$scope','$rootScope','$stateParams','ReceivedQuests','ServerFindQuest',
function($scope, $rootScope, $stateParams, ReceivedQuests, ServerFindQuest) {


  $scope.getQuests = function (userId) {
    ServerQuests.query({userId},$scope.serverQuests, $scope.serverQuestsError)
	}

	$scope.serverQuests = function(data) {
        console.log("SERVICES: Getting Quests data from server...");
        $rootScope.quests = data;
	}

  $scope.serverQuestsError = function(data) {
    alert("Não foi possível estabelecer conexão com o servidor...");
    console.log("SERVICES: ERROR in getting Quests data from server...");
  }

  $scope.singleQuest = function() {
    var searchId = $stateParams.questId;

    ServerFindQuest.get({
			id: searchId
		}, $scope.serverFindQuest, $scope.serverFindQuestError)
	}

	$scope.serverFindQuest = function(data){
		console.log("SERVICES: Getting Quest data from server");
		$scope.quest = data;
  }

  $scope.serverFindQuestError = function(data){
    alert("Não foi possível estabelecer conexão com o servidor...");
    console.log("SERVICES: ERROR in getting Quest data from server");
  }

}])
