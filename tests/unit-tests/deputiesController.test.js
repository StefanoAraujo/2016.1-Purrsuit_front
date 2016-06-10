"use strict";

describe("DeputiesCtrl", function() {
  beforeEach(module('starter'));

  var $controller, $stateParams, ServerDeputies, ServerFindDeputy, ServerSearchDeputies, ServerUf, ServerParty;

  beforeEach(inject(function(_$controller_, _$stateParams_, _ServerDeputies_, _ServerFindDeputy_, _ServerSearchDeputies_, _ServerUf_, _ServerParty_) {

    $controller = _$controller_;
    $stateParams = _$stateParams_;
    ServerDeputies = _ServerDeputies_;
    ServerFindDeputy = _ServerFindDeputy_;
    ServerSearchDeputies = _ServerSearchDeputies_;
    ServerUf = _ServerUf_;
    ServerParty = _ServerParty_;


  }));

  describe("getDeputies", function() {
    var $scope, controller;
    beforeEach(function() {
      $scope = {};
      controller = $controller("DeputiesCtrl", {
        $scope: $scope
      });

      spyOn(ServerDeputies, 'get');
    })

    it("Should exist", function() {
      $scope.getDeputies();
    });

    it("Should call ServerDeputies.get", inject(function(ServerDeputies) {
      $scope.getDeputies();

      expect(ServerDeputies.get).toHaveBeenCalled();
    }))
  });

  describe("ServerDeputies", function() {
    var $scope, controller;
    beforeEach(function() {
      $scope = {};
      controller = $controller("DeputiesCtrl", {
        $scope: $scope
      });
    });

    it("Should exist", function() {
      $scope.ServerDeputies('dummy');
    });

    it("Should call ServerDeputies.get", inject(function(ServerDeputies) {
      var dummy = {
        deputies: "dummy"
      }
      $scope.ServerDeputies(dummy);

      expect($scope.deputies).toBe("dummy");
    }))
  })
})
