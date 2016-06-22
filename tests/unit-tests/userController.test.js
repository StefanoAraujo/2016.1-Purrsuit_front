describe('UserController', function(){

  var $controller;
  var $rootScope;
  var $state;

  beforeEach(module('starter'));
  beforeEach(inject(function(_$controller_,_$rootScope_, _$state_, _$ionicPopup_, _SignUp_,
     _LogInFactory_, _EditUser_, _LogOutFactory_, _DeleteUser_, _ServerFollowedDeputies_,
      _ServerFollowDeputy_, _ServerUnfollowDeputy_, _LevelsFactory_, _RankFactory_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
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
		RankFactory = _RankFactory_;
  }));

  describe('logOut', function(){
    var $scope, $rootScope, controller;
    beforeEach(function(){
      $scope = {};
      $rootScope = {};
      controller = $controller('UserCtrl',{
      $scope: $scope,
      $rootScope: $rootScope
      });
    });

    it("Should call confirmPopup", function(){
      var popup = spyOn($ionicPopup, 'confirm').and.callThrough();
      $scope.logOut();
      expect(popup).toHaveBeenCalled();
    });

    it('sets the rootScope.user to undefined on sucess', function(){
      $scope.logOut();
      expect($rootScope.user).toEqual(undefined);
    });

  });

  describe("logOutSuccess", function() {
    var $scope, controller;
    beforeEach(function() {
      $scope = {};

      controller = $controller("UserCtrl", {
        $scope: $scope,
      });
    });

    it("Should exist", function() {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Tem certeza sair?',
        template: 'Nós iremos sentir sua falta... =('
      });
      $scope.logOutSuccess(confirmPopup);
    });
  });

  describe("logOutResponse", function() {
    var $scope, controller;
    beforeEach(function() {
      $scope = {};

      controller = $controller("UserCtrl", {
        $scope: $scope,
      });
    });

    it("Should exist", function() {
      $scope.logOutResponse(true);
    });

    it("Should call state.go", function() {
      var state = spyOn($state, 'go').and.callThrough();
      $scope.logOutResponse(true);
      expect(state).toHaveBeenCalled();
      expect(state).toHaveBeenCalledWith('index');
    });

  });

  describe("logOutResponseError", function() {
    var $scope, controller;
    beforeEach(function() {
      $scope = {};

      controller = $controller("UserCtrl", {
        $scope: $scope,
      });
    });

    it("Should exist", function() {
      $scope.logOutResponseError();
    });
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
      var deputy = {
        id: 10
      }
      $scope.currentUser = {id: 10};
      $scope.followDeputy(deputy);
    });

    it("Should call ServerFollowDeputy.save", inject(function(ServerFollowDeputy) {
      var deputy = {
        id: 10
      }
      $scope.currentUser = {id: 10};
      $scope.followDeputy(deputy);

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
      var deputy = {
        id: 10
      }
      $scope.currentUser = {id: 10};
      $scope.unfollowDeputy(deputy);
    });

    it("Should call ServerUnfollowDeputy.save", inject(function(ServerUnfollowDeputy) {
      var deputy = {
        id: 10
      }
      $scope.currentUser = {id: 10};
      $scope.unfollowDeputy(deputy);
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

  describe("signUp", function() {
    var $scope, controller;
    beforeEach(function() {
      $scope = {};
      controller = $controller("UserCtrl", {
        $scope: $scope,
      });
      spyOn(SignUp, 'save');
    });

    it("Should exist", function() {
      $scope.signUp('dummy');
    });

    it("Should call SignUp.save", inject(function(SignUp) {
      var user = {
        user: "ronaldo"
      };
      $scope.signUp(user);
      expect(SignUp.save).toHaveBeenCalled();
    }))
  });

  describe("signUpValid", function() {
    var $scope, controller;
    beforeEach(function() {
      $scope = {};
      controller = $controller("UserCtrl", {
        $scope: $scope,
      });
      spyOn($state,'go');
    });

    it("Should exist", function() {
      $scope.signUpValid('dummy');
    });


    it("Should call state.go", inject(function($state) {
      var user = {
      user: "ronaldo"
      };
      $scope.signUpValid(user);
      expect($state.go).toHaveBeenCalled();
      expect($state.go).toHaveBeenCalledWith('login');
    }));
  });

  describe("signUpError", function() {
    var $scope, controller;
    beforeEach(function() {
      $scope = {};
      controller = $controller("UserCtrl", {
        $scope: $scope,
      });
    });

    it("Should exist", function() {
      $scope.signUpError('dummy');
    });
  });


    describe("signIn", function() {
      var $scope, controller;
      beforeEach(function() {
        $scope = {};
        controller = $controller("UserCtrl", {
          $scope: $scope,
        });
        spyOn(LogInFactory, 'get');
      });

      it("Should exist", function() {
        $scope.signIn('dummy');
      });

      it("Should call LogInFactory.get", inject(function(LogInFactory) {
        var user = {
          user: "ronaldo"
        };
        $scope.signIn(user);
        expect(LogInFactory.get).toHaveBeenCalled();
      }))
    });

    describe("signInValid", function() {
      var $scope, controller;
      beforeEach(function() {
        $scope = {};
        controller = $controller("UserCtrl", {
          $scope: $scope,
        });
        spyOn($state,'go');
      });

      it("Should exist", function() {
        $scope.signInValid('dummy');
      });


      it("Should call state.go", inject(function($state) {
        var user = {
          user: "ronaldo"
        };
        $scope.signInValid(user);
        expect($state.go).toHaveBeenCalled();
        expect($state.go).toHaveBeenCalledWith('app.browseDeputies');
      }));



    });

    describe("signInError", function() {
      var $scope, controller;
      beforeEach(function() {
        $scope = {};
        controller = $controller("UserCtrl", {
          $scope: $scope,
        });
      });

      it("Should exist", function() {
        $scope.signInError('dummy');
      });
    });

describe("levelBarPercentage", function(){
  var $scope, $rootScope, controller;
    beforeEach(function() {
      $scope = {};
      $rootScope = {user: {level: {xp_max: 100, xp_min:0}, experience_points: 50}};
      controller = $controller("UserCtrl", {
        $scope: $scope,
        $rootScope: $rootScope
      });
    });

    it("Should exist", function(){
      $scope.updateLevelBar();
    });


    it("Should return 50% with MAX 100, MIN 0, EXP 50", function(){
      $scope.updateLevelBar();
      console.log("TEST Percentage Bar, expecting 50 - " + $scope.levelPercentage);
      expect($scope.levelPercentage).toEqual(50);
    });
  });

  describe("updateLevel", function(){
    var $scope, $rootScope, controller;

    beforeEach(function() {
      $scope = {};
      $rootScope = {user: {level: {level_number: 0}, experience_points: 50}};
      controller = $controller("UserCtrl", {
        $scope: $scope,
        $rootScope: $rootScope
      });

      spyOn(LevelsFactory, 'get');
    });

    it("Should exist", function(){
      $scope.updateLevel();
    });

    it("Should call LevelsFactory.get", inject(function(LevelsFactory){
      $scope.updateLevel();
      expect(LevelsFactory.get).toHaveBeenCalled();
    }));

    /*
    it("Should return level 1 for EXP 50", function(){
      console.log($rootScope.user.level);
      $scope.updateLevel();
      console.log($rootScope.user.level);

      expect($rootScope.user.level.level_number).toEqual(1);
    });*/
  });

  describe("addExperience", function(){
    var $scope, $rootScope, controller;

    beforeEach(function() {
      $scope = {};
      $rootScope = {user: {level: {level_number: 0}, experience_points: 50}};
      controller = $controller("UserCtrl", {
        $scope: $scope,
        $rootScope: $rootScope
      });

      spyOn($scope, 'updateLevel');
    });

    it("Should exist", function(){
      $scope.addExperience(0);
    });

    it("Should call updateLevel()", function(){
      $scope.addExperience(0);
      expect($scope.updateLevel).toHaveBeenCalled();
    });

    it("Should add +5XP", function(){
      var initialXp = $rootScope.user.experience_points;
      $scope.addExperience(5);
      var diffXp = $rootScope.user.experience_points - 5;
      expect(diffXp).toEqual(initialXp);
    })
  });

  describe("editUser", function() {
    var $scope, controller;
    beforeEach(function() {
      $scope = {};
      controller = $controller("UserCtrl", {
        $scope: $scope,
      });
      spyOn(EditUser, 'save');
    });

    it("Should exist", function() {
      $scope.editUser('dummy',10);
    });

    it("Should call EditUser.save", inject(function(EditUser) {
      var id = 10;
      var user = {
        user: "ronaldo"
      };
      $scope.editUser(id,user);
      expect(EditUser.save).toHaveBeenCalled();
    }))
  });

  describe("editUserValid", function() {
    var $scope, controller;
    beforeEach(function() {
      $scope = {};
      controller = $controller("UserCtrl", {
        $scope: $scope,
      });
      spyOn($state,'go');
    });

    it("Should exist", function() {
      $scope.editUserValid('dummy',10);
    });


    it("Should call state.go", inject(function($state) {
      var id = 10;
      var user = {
      user: "ronaldo"
      };
      $scope.editUserValid(user, id);
      expect($state.go).toHaveBeenCalled();
      expect($state.go).toHaveBeenCalledWith('app.userprofile');
    }));
  });

  describe("editUserError", function() {
    var $scope, controller;
    beforeEach(function() {
      $scope = {};
      controller = $controller("UserCtrl", {
        $scope: $scope,
      });
    });

    it("Should exist", function() {
      $scope.editUserError('dummy');
    });
  });

	describe("getUserRank", function() {
		var $scope, controller;

		beforeEach(function() {
			$scope = {};
			controller = $controller("UserCtrl", {
				$scope: $scope
			});

			spyOn(RankFactory, 'get');
		});

		it("Should exist", function() {
			$scope.getUserRank();
		});

		it("Should call RankFactory.get", inject(function(RankFactory) {
			$scope.getUserRank();

			expect(RankFactory.get).toHaveBeenCalled();
		}));
	});

	describe("getRank", function() {
		var $scope, controller;
		beforeEach(function() {
			$scope = {};
			controller = $controller("UserCtrl", {
				$scope: $scope
			});
		});

		it("Should exist", function() {
			$scope.getRank("dummy");
		});
	});

	describe("getRankError", function() {
		var $scope, controller;
		beforeEach(function() {
			$scope = {};
			controller = $controller("UserCtrl", {
				$scope: $scope
			});
		});

		it("Should exist", function() {
			$scope.getRankError('dummy');
		});

		it("Should show alert", function() {
			spyOn(window, 'alert');
			$scope.getRankError('dummy');
			expect(window.alert).toHaveBeenCalledWith("Não foi possível estabelecer conexão com o servidor...");
		});
	});

  describe("updateUserServerDataSuccess", function() {
    var $scope, controller;
    beforeEach(function() {
      $scope = {};
      controller = $controller("UserCtrl", {
        $scope: $scope
      });
    });

    it("Should exist", function() {
      $scope.updateUserServerDataSuccess("dummy");
    });
  });

  describe("updateUserServerDataError", function() {
    var $scope, controller;
    beforeEach(function() {
      $scope = {};
      controller = $controller("UserCtrl", {
        $scope: $scope
      });
    });

    it("Should exist", function() {
      $scope.updateUserServerDataError("dummy");
    });
  });

  describe("deleteUser", function() {
    var $scope, controller;
    beforeEach(function() {
      $scope = {};
      controller = $controller("UserCtrl", {
        $scope: $scope
      });
    });

    it("Should exist", function() {
      $scope.deleteUser(10);
    });
  });

  describe("serverUpdateLevelSucess", function() {
    var $scope, controller, $rootScope;
    beforeEach(function() {
      $scope = {};
        $rootScope = {user: {level: {level_number: 0}, experience_points: 50}};
      controller = $controller("UserCtrl", {
        $scope: $scope,
        $rootScope: $rootScope
      });
    });

    it("Should exist", function() {
      $scope.serverUpdateLevelSucess('dummy');
    });
  });

  describe("serverUpdateLevelError", function() {
    var $scope, controller;
    beforeEach(function() {
      $scope = {};
      controller = $controller("UserCtrl", {
        $scope: $scope
      });
    });

    it("Should exist", function() {
      $scope.serverUpdateLevelError('dummy');
    });


    it("Should show alert", function() {
      spyOn(window, 'alert');
      $scope.serverUpdateLevelError('dummy');
      expect(window.alert).toHaveBeenCalledWith("Não foi possível atualizar level do usuário");
    });

  });

});
