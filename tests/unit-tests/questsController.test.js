"user strict";

describe("QuestsCtrl", function() {
	beforeEach(module('starter'));

	var $controller, $stateParams, ServerQuests, ServerFindQuest;

	beforeEach(inject(function(_$controller_, _$stateParams_, _ServerQuests_, _ServerFindQuest_){
		$controller = _$controller_;
		$stateParams = _$stateParams_;
		ServerQuests = _ServerQuests_;
		ServerFindQuest = _ServerFindQuest_;
	}));

	describe("getQuests", function() {
		var $scope, controller;

		beforeEach(function() {
			$scope = {};
			controller = $controller("QuestsCtrl", {
				$scope: $scope
			});

			spyOn(ServerQuests, 'get');
		});

		it("Should exist", function() {
			$scope.getQuests();
		});

		it("Should call ServerQuests.get", inject(function(ServerQuests) {
			$scope.getQuests();

			expect(ServerQuests.get).toHaveBeenCalled();
		}));
	});

	describe("serverQuests", function() {
		var $scope, controller;
		beforeEach(function() {
			$scope = {};
			controller = $controller("QuestsCtrl", {
				$scope: $scope
			});
		});

		it("Should existe", function() {
			$scope.serverQuests("dummy");
		});

		it("Should call ServerQuests.get", inject(function(ServerQuests) {
			var dummy = {
				quests: "dummy"
			}

			$scope.serverQuests(dummy);

			expect($scope.quests).toBe("dummy");
		}));
	});

	describe("serverQuestsError", function() {
		var $scope, controller;
		beforeEach(function() {
			$scope = {};
			controller = $controller("QuestsCtrl", {
				$scope: $scope
			});
		});

		it("Should existe", function() {
			$scope.serverQuestsError('dummy');
		});

		it("Should show alert", function() {
			spyOn(window, 'alert');
			$scope.serverQuestsError('dummy');
			expect(window.alert).toHaveBeenCalledWith("Não foi possível estabelecer conexão com o servidor...");
		});
	});

	describe("singleQuest", function(){
		var $scope, controller, searchId;
		beforeEach(function(){
			$scope = {};
			searchId = 10;
			controller = $controller("QuestsCtrl", {
				$scope: $scope
			});
			spyOn(ServerFindQuest, 'get');
		});

		it("Should existe", function(){
			$scope.singleQuest();
		});

		it("Should call ServerFindQuest.get", inject(function(ServerFindQuest) {
			$scope.singleQuest(searchId);
			expect(ServerFindQuest.get).toHaveBeenCalled();
		}));
	});

	describe("serverFindQuest", function(){
		var $scope, controller;
		beforeEach(function() {
			$scope = {};
			controller = $controller("QuestsCtrl", {
				$scope: $scope
			});
		});

		it("Should exist", function() {
			$scope.serverFindQuest('dummy');
		});

		it("Should call ServerFindQuest.get", inject(function(ServerFindQuest) {
			var quest = {
				quest: "dummy"
			}
			$scope.serverFindQuest(quest);

			expect($scope.quest).toBe("dummy");
		}));
	});

	describe("serverFindQuestError", function(){
		var $scope, controller;
		beforeEach(function(){
			$scope = {};
			controller = $controller("QuestsCtrl", {
				$scope: $scope
			});
		});

		it("Should exist", function() {
			$scope.serverFindQuestError('dummy');
		});

		it("Should show alert", function(){
			spyOn(window, 'alert');
			$scope.serverFindQuestError('dummy');
			expect(window.alert).toHaveBeenCalledWith("Não foi possível estabelecer conexão com o servidor...");
		});
	});
})
