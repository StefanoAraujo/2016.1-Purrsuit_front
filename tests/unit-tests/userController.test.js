describe('UserController', function(){

  var $controller;
  var $rootScope;
  var $state;

  beforeEach(module('starter'));
  beforeEach(inject(function(_$controller_, _$state_, _$ionicPopup_, _SignUp_,
     _LogInFactory_, _EditUser_, _LogOutFactory_, _DeleteUser_, _ServerFollowedDeputies_,
      _ServerFollowDeputy_, _ServerUnfollowDeputy_, _LevelsFactory_) {
    $controller = _$controller_;
    $state = _$state_;
    $ionicPopup = _$ionicPopup_;
    SignUp = _SignUp_;
    LogInFactory = _LogInFactory_;
    EditUser = _EditUser_;
    LogOutFactory = _LogOutFactory_;
    DeleteUser = _DeleteUser_;
    ServerFollowedDeputies = _ServerFollowedDeputies_;
    ServerFollowDeputy = _ServerFollowDeputy_;
    ServerUnfollowDeputy = _ServerUnfollowDeputy_;
    LevelsFactory = _LevelsFactory_;
  }));

  beforeEach(inject(function(_$rootScope_){
    $rootScope = _$rootScope_;
  }));

  describe('Logout', function(){
    var $scope, $rootScope, controller;

    beforeEach(function(){
      $scope = {};
      $rootScope = {};
      controller = $controller('UserCtrl',
      {$scope: $scope, $rootScope: $rootScope});
    });

    /*
    it('should call login', function(){
      var user = {email: "a@a.com", password: "123456"};
      spyOn($scope, "signIn");
      $scope.signIn(user);
      expect($scope.signIn).toHaveBeenCalledWith(user);
    }) */

    it('sets the rootScope.user to undefined on sucess', function(){
      // Login needs refactoring
      var nullObject = {};
      $scope.logOut();
      expect($rootScope.user).toEqual(nullObject);
    });

    /*it('should go to main login page', function(){
      spyOn($state, 'go');
      $scope.logOut();
      expect($state.go).toHaveBeenCalledWith('login');
    })*/

  });

  describe("followedDeputies", function() {
    var $scope, controller
    beforeEach(function() {
      $scope = {};
      controller = $controller("UserCtrl", {
        $scope: $scope,
      });

      spyOn(ServerFollowedDeputies, 'get');
    });

    it("Should exist", function() {
      $scope.currentUser = {id: 10};
      $scope.followedDeputies();
    });

    it("Should call ServerFollowedDeputies.get", inject(function(ServerFollowedDeputies) {
      $scope.currentUser = {id: 10};
      $scope.followedDeputies();

      expect(ServerFollowedDeputies.get).toHaveBeenCalled();
    }))
  });

  describe("serverFollowedDeputies", function() {
    var $scope, controller;
    beforeEach(function() {
      $scope = {};
      controller = $controller("UserCtrl", {
        $scope: $scope
      });
    });

    it("Should exist", function() {
      $scope.serverFollowedDeputies('dummy');
    });

    it("Should call ServerFollowedDeputies.get", inject(function(ServerFollowedDeputies) {
      var dummy = {
        deputies: "dummy"
      }
      $scope.serverFollowedDeputies(dummy);

      expect($scope.followed).toBe("dummy");
    }))
  });

  describe("serverFollowedDeputiesError", function() {
    var $scope, controller;
    beforeEach(function() {
      $scope = {};
      controller = $controller("UserCtrl", {
        $scope: $scope
      });
    });

    it("Should exist", function() {
      $scope.serverFollowedDeputiesError('dummy');
    });

    it("Should show alert", function() {
      spyOn(window, 'alert');
      $scope.serverFollowedDeputiesError('dummy');
      expect(window.alert).toHaveBeenCalledWith("Não foi possível estabelecer conexão com o servidor...");
    });
  });

  describe("followDeputy", function() {
    var $scope, controller;
    beforeEach(function() {
      $scope = {};

      controller = $controller("UserCtrl", {
        $scope: $scope,
      });

      spyOn(ServerFollowDeputy, 'save');
    });

    it("Should exist", function() {
      $scope.currentUser = {id: 10};
      $scope.followDeputy();
    });

    it("Should call ServerFollowDeputy.save", inject(function(ServerFollowDeputy) {
      $scope.currentUser = {id: 10};
      $scope.followDeputy();

    }))
  });

  describe("serverFollowDeputy", function() {
    var $scope, controller, $rootScope, deputyId;
    beforeEach(function() {
      $scope = {};
      $rootScope = {isFollowed: true};
      deputyId = 1;
      controller = $controller("UserCtrl", {
        $scope: $scope,
        $rootScope: $rootScope
      });
    });

    it("Should exist", function() {
      $scope.serverFollowDeputy('dummy');
    });

    it("Should call ServerFollowDeputy.save", inject(function(ServerFollowDeputy) {
      $scope.currentUser = {id: 1};
      $scope.followDeputy(deputyId);
      expect($rootScope.isFollowed).toEqual(true);
    }))

  });

  describe("serverFollowDeputyError", function() {
    var $scope, controller;
    beforeEach(function() {
      $scope = {};
      controller = $controller("UserCtrl", {
        $scope: $scope
      });
    });

    it("Should exist", function() {
      $scope.serverFollowDeputyError('dummy');
    });

    it("Should show alert", function() {
      spyOn(window, 'alert');
      $scope.serverFollowDeputyError('dummy');
      expect(window.alert).toHaveBeenCalledWith("Não foi possível seguir este deputado!");
    });
  });

  describe("unfollowDeputy", function() {
    var $scope, controller;
    beforeEach(function() {
      $scope = {};

      controller = $controller("UserCtrl", {
        $scope: $scope,
      });

      spyOn(ServerUnfollowDeputy, 'save');
    });

    it("Should exist", function() {
      $scope.currentUser = {id: 10};
      $scope.unfollowDeputy();
    });

    it("Should call ServerUnfollowDeputy.save", inject(function(ServerUnfollowDeputy) {
      $scope.currentUser = {id: 10};
      $scope.unfollowDeputy();
      expect(ServerUnfollowDeputy.save).toHaveBeenCalled();

    }))
  });

  describe("serverUnfollowDeputy", function() {
    var $scope, controller, $rootScope;
    beforeEach(function() {
      $scope = {};
      $rootScope = {isFollowed: false};
      controller = $controller("UserCtrl", {
        $scope: $scope,
        $rootScope: $rootScope
      });
    });

    it("Should exist", function() {
      $scope.serverUnfollowDeputy('dummy');
    });

    it("Should call ServerUnfollowDeputy.save", inject(function(ServerUnfollowDeputy) {
      data = 'dummy';
      $scope.currentUser = {id: 1};
      $scope.unfollowDeputy(data);
      expect($rootScope.isFollowed).toEqual(false);
    }))

  });

  describe("serverUnfollowDeputyError", function() {
    var $scope, controller;
    beforeEach(function() {
      $scope = {};
      controller = $controller("UserCtrl", {
        $scope: $scope
      });
    });

    it("Should exist", function() {
      $scope.serverUnfollowDeputyError('dummy');
    });

    it("Should show alert", function() {
      spyOn(window, 'alert');
      $scope.serverUnfollowDeputyError('dummy');
      expect(window.alert).toHaveBeenCalledWith("Não foi possível deixar de seguir este deputado!");
    });
  });


  describe("following", function() {
    var $scope, controller;
    beforeEach(function() {
      $scope = {};

      controller = $controller("UserCtrl", {
        $scope: $scope,
      });

      spyOn(ServerFollowedDeputies, 'get');
    });

    it("Should exist", function() {
      $scope.currentUser = {id: 10};
      $scope.following();
    });

    it("Should call ServerFollowedDeputies.get", inject(function(ServerFollowedDeputies) {
      $scope.currentUser = {id: 10};
      $scope.following();
      expect(ServerFollowedDeputies.get).toHaveBeenCalled();

    }))
  });

  describe("serverFollowing", function() {
    var $scope, controller, $rootScope;
    beforeEach(function() {
      $scope = {};
      $rootScope = {isFollowed: false};
      controller = $controller("UserCtrl", {
        $scope: $scope,
        $rootScope: $rootScope
      });
    });

    it("Should exist", function() {
      $scope.serverFollowing('dummy');
    });
  });

  describe("serverFollowingError", function() {
    var $scope, controller;
    beforeEach(function() {
      $scope = {};
      controller = $controller("UserCtrl", {
        $scope: $scope
      });
    });

    it("Should exist", function() {
      $scope.serverFollowingError('dummy');
    });

    it("Should show alert", function() {
      spyOn(window, 'alert');
      $scope.serverFollowingError('dummy');
      expect(window.alert).toHaveBeenCalledWith("Não foi possível estabelecer conexeão com o servidor...");
    });
  });








});
