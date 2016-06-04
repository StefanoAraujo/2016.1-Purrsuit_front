describe('UserController', function(){

  var $controller;
  var $rootScope;
  var $state;

  beforeEach(module('starter'));
  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
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

});
