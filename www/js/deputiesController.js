angular.module('starter')

.controller('DeputiesCtrl', ['$scope', '$stateParams', 'ServerDeputies', 'ServerFindDeputy', 'ServerSearchDeputies',
  'ServerUf', 'ServerParty',
  function($scope, $stateParams, ServerDeputies, ServerFindDeputy,
    ServerSearchDeputies, ServerUf, ServerParty) {

    $scope.getDeputies = function() {
      ServerDeputies.query($scope.serverDeputies, $scope.serverDeputiesError)
    }

    $scope.serverDeputies = function(data) {
      console.log("SERVICES: Getting Deputies data from server...")
      $scope.deputies = data;
    }

    $scope.serverDeputiesError = function(data) {
      alert("Não foi possível estabelecer conexão com o servidor...");
      console.log("SERVICES: ERROR in getting Deputies data from server...");
    }

    $scope.singleDeputy = function() {
      var findId = $stateParams.deputyId;
      ServerFindDeputy.get({
          id: findId
        }, $scope.serverFindDeputy, $scope.serverFindDeputyError)
    }

    $scope.serverFindDeputy = function(data) {
      console.log("SERVICES: Getting Deputy data from server...");
      $scope.deputy = data;
    }
    $scope.serverFindDeputyError = function(data) {
      alert("Não foi possível estabelecer conexão com o servidor...");
      console.log("SERVICES: ERROR in getting Deputy data from server...");
    }

    $scope.searchDeputies = function(inputText) {
        $scope.deputies = [];
        ServerSearchDeputies.query({
            toSearch: inputText
          }, $scope.serverSearchDeputies, $scope.serverSearchDeputiesError)
    }

    $scope.serverSearchDeputies = function(data){
      console.log("SERVICES: Getting Deputies with text data from server...")

      if (data.length > 0) {
        $scope.deputies = data;
      } else {
        alert("Não foi encontrado nenhum deputado com esses parâmetros")
        console.log("Services: Search returned no Deputy")
      }
    }

    $scope.serverSearchDeputiesError = function(data) {
      alert("Não foi possível estabelecer conexão com o servidor...");
      console.log("SERVICES: ERROR in getting Deputies with text data from server...");
    }
  }

])
