"user strict";

describe("AchievementsCtrl", function() {
	beforeEach(module('starter'));
	
	var $controller, $stateParams, ServerAchievements, ServerFindAchv;
	
	beforeEach(inject(function(_$controller_, _$stateParams_, _ServerAchievements_, _ServerFindAchv_){
		$controller = _$controller_;
		$stateParams = _$stateParams_;
		ServerAchievements = _ServerAchievements_;
		ServerFindAchv = _ServerFindAchv_;
	}));
	
	describe("getAchievements", function() {
		var $scope, controller;
		
		beforeEach(function() {
			$scope = {};
			controller = $controller("AchievementsCtrl", {
				$scope: $scope
			});
			
			spyOn(ServerAchievements, 'get');
		});
		
		it("Should exist", function() {
			$scope.getAchievements();
		});
		
		it("Should call ServerAchievements.get", inject(function(ServerAchievements) {
			$scope.getAchievements();
			expect(ServerAchievements.get).toHaveBeenCalled();
		}));
	});
	
	describe("serverAchievements", function() {
		var $scope, controller;
		beforeEach(function() {
			$scope = {};
			controller = $controller("AchievementsCtrl", {
				$scope: $scope
			});
		});
		
		it("Should exist", function() {
			$scope.serverAchievements("dummy");
		});
		
		it("Should call ServerAchievements.get", inject(function(ServerAchievements) {
			var dummy = {
				achievements: "dummy"
			}
			
			$scope.serverAchievements(dummy);
			
			expect($scope.achievements).toBe("dummy");
		}));
	});
	
	describe("serverAchievementsError", function() {
		var $scope, controller;
		beforeEach(function() {
			$scope = {};
			controller = $controller("AchievementsCtrl", {
				$scope: $scope
			});
		});
		
		it("Should exist", function() {
			$scope.serverAchievementsError();
		});
		
		it("Should show alert", function(){
			spyOn(window, 'alert');
			$scope.serverAchievementsError('dummy');
			expect(window.alert).toHaveBeenCalledWith("Não foi possível estabelecer conexão com o servidor...");
		});
	});
	
	describe("singleAchievement", function() {
		var $scope, controller, searchId;
		beforeEach(function(){
			$scope = {};
			searchId = 10;
			controller = $controller("AchievementsCtrl", {
				$scope: $scope
			});
			spyOn(ServerFindAchv, 'get');
		});
		
		it("Should exist", function(){
			$scope.singleAchievement();
		});
		
		it("Should call ServerFindAchievement.get", inject(function(ServerFindAchv) {
			$scope.singleAchievement();
			expect(ServerFindAchv.get).toHaveBeenCalled();
		}));
	});
	
	describe("serverFindAchv", function(){
		var $scope, controller;
		beforeEach(function() {
			$scope = {};
			controller = $controller("AchievementsCtrl", {
				$scope: $scope
			});
		});
		
		it("Should existe", function(){
			$scope.serverFindAchv('dummy');
		});
		
		it("Should call ServerFindAchv.get", inject(function(ServerFindAchv) {
			var achievement = {
				achievement: "dummy"
			}
			$scope.serverFindAchv(achievement);
			
			expect($scope.achievement).toBe("dummy");
		}));
	});
	
	describe("serverFindAchvError", function() {
		var $scope, controller;
		beforeEach(function() {
			$scope = {};
			controller = $controller("AchievementsCtrl", {
				$scope: $scope
			});
		});
		
		it("Should exist", function(){
			$scope.serverFindAchvError();
		});
		
		it("Should show alert", function(){
			spyOn(window, 'alert');
			$scope.serverFindAchvError('dummy');
			expect(window.alert).toHaveBeenCalledWith("Não foi possível estabelecer conexão com o servidor...");
		});
	});
});
