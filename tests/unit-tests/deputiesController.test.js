"use strict";

describe("DeputiesCtrl", function() {
  beforeEach(module('starter'));

  var $controller, $stateParams, ServerDeputies, ServerFindDeputy, ServerSearchDeputies, ServerUf, ServerParty;

  beforeEach(inject(function(_$controller_, _$stateParams_, _ServerDeputies_, _ServerFindDeputy_, _ServerSearchDeputies_, _ServerUf_, _ServerParty_)) {

    $controller = _$controller_;
    $stateParams = _$stateParams_;
    ServerDeputies = _ServerDeputies_;
    ServerFindDeputy = _ServerFindDeputy_;
    ServerSearchDeputies = _ServerSearchDeputies_;
    ServerUf = _ServerUf_;
    ServerParty = _ServerParty_;

  })

  describe("getDeputies", function() {
    var $scope, controller;
    beforeEach(function() {
      $scope = {};
      controller = $controller("DeputiesCtrl", {
        $scope: scope
      });
    })

    it("Should exist", function() {
      $scope.getDeputies();
    })
  })
})
