angular.module('starter')

.controller('DeputiesCtrl', function($scope, ServerDeputies) {
  ServerDeputies.get(function(data) {
      console.log("SERVICES: Getting Deputies data from server...")
      $scope.deputies = data.deputy;
    },
    function(error) {
      alert("Não foi possível estabelecer conexão com o servidor...");
      console.log("SERVICES: ERROR in getting Deputies data from server...");
    })
})

.controller('DeputyCtrl', function($scope, $stateParams, ServerFindDeputy) {
  var findId = $stateParams.deputyId;

  ServerFindDeputy.get({
      id: findId
    },
    function(data) {
      console.log("SERVICES: Getting Deputy (Id: " + findId + ") data from server...");
      $scope.deputy = data.deputy;

      /* Enable use when using deputyDetailsController.js and deputy.html */
      /*var deputy_uf_id = $scope.deputy.uf_id;
      var deputy_party_id = $scope.deputy.party_id;
      localStorage.setItem("DeputyUfId", deputy_uf_id);
      localStorage.setItem("DeputyPartyId", deputy_party_id);*/
    },
    function(error) {
      alert("Não foi possível estabelecer conexão com o servidor...");
      console.log("SERVICES: ERROR in getting Deputy (Id: " + findId + ") data from server...");
    }
  )
})

.controller('SearchDeputiesCtrl', function($scope, ServerSearchDeputies) {
  $scope.doSearch = function(inputText) {
    $scope.deputies = [];

    //console.log(inputText.lenght);

    ServerSearchDeputies.get({
        toSearch: inputText
      },
      function(data) {
        console.log("SERVICES: Getting Deputies with text(" + inputText + ") data from server...")

        if (data.deputy.lenght === 0) {
          console.log("Services: Search returned no Deputy")
        }
        else {
          $scope.deputies = data.deputy;
        }
      },
      function(error) {
        alert("Não foi possível estabelecer conexão com o servidor...");
        console.log("SERVICES: ERROR in getting Deputies with text(" + inputText + ") data from server...");
      })
  }
})
