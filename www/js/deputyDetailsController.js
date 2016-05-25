angular.module('starter')

.controller('GetDeputyUf', function($scope, ServerUf){
  var local_uf_id = localStorage.getItem("DeputyUfId");

  $scope.getUf = function() {
    ServerUf.get({
        ufId: local_uf_id
      },
      function(data) {
        console.log("SERVICES: Getting deputy's Uf with Id(" + local_uf_id + ") data from server...")
        $scope.deputyUf = data.uf;
      },
      function(error) {
        console.log("SERVICES: Could not get deputy's Uf with Id(" + local_uf_id + ")");
      })
  }
})

.controller('GetDeputyParty', function($scope, ServerParty){
  var local_party_id = localStorage.getItem("DeputyPartyId");

  $scope.getParty = function() {
    ServerParty.get({
        partyId: local_party_id
      },
      function(data) {
        console.log("SERVICES: Getting deputy's party with Id(" + local_party_id + ") data from server...")
        $scope.deputyParty = data.party;
      },
      function(error) {
        console.log("SERVICES: Could not get deputy's party with Id(" + local_party_id + ")...");
      })
  }
})
