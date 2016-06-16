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

  describe("serverDeputies", function() {
    var $scope, controller;
    beforeEach(function() {
      $scope = {};
      controller = $controller("DeputiesCtrl", {
        $scope: $scope
      });
    });

    it("Should exist", function() {
      $scope.serverDeputies('dummy');
    });

    it("Should call ServerDeputies.get", inject(function(ServerDeputies) {
      var dummy = {
        deputies: "dummy"
      }
      $scope.serverDeputies(dummy);

      expect($scope.deputies).toBe("dummy");
    }))
  })

  describe("serverDeputiesError", function() {
    var $scope, controller;
    beforeEach(function() {
      $scope = {};
      controller = $controller("DeputiesCtrl", {
        $scope: $scope
      });
    });

    it("Should exist", function() {
      $scope.serverDeputiesError('dummy');
    });

    it("Should show alert", function() {
      spyOn(window, 'alert');
      $scope.serverDeputiesError('dummy');
      expect(window.alert).toHaveBeenCalledWith("Não foi possível estabelecer conexão com o servidor...");
    });
  });

  describe("singleDeputy", function() {
    var $scope, controller, findId;
    beforeEach(function(){
      $scope = {};
      findId = 10;
      controller = $controller("DeputiesCtrl", {
        $scope: $scope
      });
      spyOn(ServerFindDeputy, 'get');
    });

    it("Should exist", function() {
      $scope.singleDeputy();
    });

    it("Should call ServerFindDeputy.get", inject(function(ServerFindDeputy) {
      $scope.singleDeputy(findId);
      expect(ServerFindDeputy.get).toHaveBeenCalled();
    }));
  });

  describe("serverFindDeputy", function() {
    var $scope, controller;
    beforeEach(function() {
      $scope = {};
      controller = $controller("DeputiesCtrl", {
        $scope: $scope
      });
    });

    it("Should exist", function() {
      $scope.serverFindDeputy('dummy');
    });

    it("Should call ServerFindDeputy.get", inject(function(ServerFindDeputy) {
      var deputy = {
        deputy: "dummy"
      }
      $scope.serverFindDeputy(deputy);

      expect($scope.deputy).toBe("dummy");
    }));
  });

  describe("serverFindDeputyError", function() {
    var $scope, controller;
    beforeEach(function(){
      $scope = {};
      controller = $controller("DeputiesCtrl", {
        $scope: $scope
      });
    })

    it("Should exist", function() {
      $scope.serverFindDeputyError('dummy');
    });

    it("Should show alert", function(){
      spyOn(window, 'alert');
      $scope.serverFindDeputyError('dummy');
      expect(window.alert).toHaveBeenCalledWith("Não foi possível estabelecer conexão com o servidor...");
    });
  });

  describe("searchDeputies", function() {
    var $scope, controller, inputText;
    beforeEach(function(){
      $scope = {};
      $scope.deputies = [];
      inputText = "Baleia";
      controller = $controller("DeputiesCtrl", {
        $scope: $scope
      });
      spyOn(ServerSearchDeputies, 'get');
    });

    it("Should exist", function() {
      $scope.searchDeputies('dummy');
    });

    it("Should call serverSearchDeputies.get", inject(function(ServerSearchDeputies) {
      var data = "dummy"
      $scope.searchDeputies();
      expect(ServerSearchDeputies.get).toHaveBeenCalled();
    }));
  });

  describe("serverSearchDeputies", function() {
    var $scope, controller;

    beforeEach(function() {
      $scope = {};
      $scope.deputies = [];
      controller = $controller("DeputiesCtrl", {
      $scope: $scope
      });
    });

    it("Should exist", function() {
      var data = {"deputies":[{"id":297,"name":"LUIZ FELIPE BALEIA TENUTO ROSSI"}]}
      $scope.serverSearchDeputies(data);
    });

    it("Should show alert error", function()  {
      var data = {"deputies":[]}
      spyOn(window, 'alert');
      $scope.serverSearchDeputies(data);
      expect(window.alert).toHaveBeenCalledWith("Não foi encontrado nenhum deputado com esses parâmetros")
    })
  });

  describe("serverSearchDeputiesError", function() {
    var $scope, controller;
    beforeEach(function(){
      $scope = {};
      controller = $controller("DeputiesCtrl", {
        $scope: $scope
      });
    })

    it("Should exist", function() {
      $scope.serverSearchDeputiesError('dummy');
    });

    it("Should show alert", function(){
      spyOn(window, 'alert');
      $scope.serverSearchDeputiesError('dummy');
      expect(window.alert).toHaveBeenCalledWith("Não foi possível estabelecer conexão com o servidor...");
    });
  });











})
