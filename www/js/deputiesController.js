angular.module('starter')

.controller('DeputiesCtrl',function($scope, $stateParams, ServerDeputies, ServerFindDeputy,
  ServerSearchDeputies, ServerUf, ServerParty) {

  $scope.getDeputies = function() {
    ServerDeputies.get(function(data) {
      console.log("SERVICES: Getting Deputies data from server...")
      $scope.deputies = data.deputies;
    },
    function(error) {
      alert("Não foi possível estabelecer conexão com o servidor...");
      console.log("SERVICES: ERROR in getting Deputies data from server...");
    })
  }

  $scope.findDeputy = function () {

    var findId = $stateParams.deputyId;
    ServerFindDeputy.get({
        id: findId
      },
      function(data) {
        console.log("SERVICES: Getting Deputy (Id: " + findId + ") data from server...");
        $scope.deputy = data.deputy;
      },
      function(error) {
        alert("Não foi possível estabelecer conexão com o servidor...");
        console.log("SERVICES: ERROR in getting Deputy (Id: " + findId + ") data from server...");
      }
    )
  }

  $scope.searchDeputies = function () {
    $scope.doSearch = function(inputText) {
      $scope.deputies = [];

      //console.log(inputText.lenght);

      ServerSearchDeputies.get({
          toSearch: inputText
        },
        function(data) {
          console.log("SERVICES: Getting Deputies with text(" + inputText + ") data from server...")

          if (data.deputies.length === 0) {
            console.log("Services: Search returned no Deputy")
          }
          else {
            $scope.deputies = data.deputies;
          }
        },
        function(error) {
          alert("Não foi possível estabelecer conexão com o servidor...");
          console.log("SERVICES: ERROR in getting Deputies with text(" + inputText + ") data from server...");
        })
    }
  }

  $scope.getDeputyUf = function () {
    var local_uf_id = localStorage.getItem("DeputyUfId");

    $scope.getUf = function() {
      ServerUf.get({
          ufId: local_uf_id
        },
        function(data) {
          console.log("SERVICES: Getting deputy's Uf with Id(" + local_uf_id + ") data from server...")
          $scope.deputyUf = data.ufs;
        },
        function(error) {
          console.log("SERVICES: Could not get deputy's Uf with Id(" + local_uf_id + ")");
        })
    }
  }

  $scope.getDeputyParty = function () {
    var local_party_id = localStorage.getItem("DeputyPartyId");

    $scope.getParty = function() {
      ServerParty.get({
          partyId: local_party_id
        },
        function(data) {
          console.log("SERVICES: Getting deputy's party with Id(" + local_party_id + ") data from server...")
          $scope.deputyParty = data.parties;
        },
        function(error) {
          console.log("SERVICES: Could not get deputy's party with Id(" + local_party_id + ")...");
        })
    }
  }

})
