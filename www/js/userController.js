angular.module('starter')

.controller('UserCtrl', function($scope, $rootScope, $state, $ionicPopup, SignUp, LogInFactory, EditUser, LogOutFactory, DeleteUser) {
  //Sign up
  $scope.signUp = function(user){
    console.log(user);
    SignUp.save({user:user}, function(user) {
      $ionicPopup.alert({
        title: 'Sucesso',
        template: 'Conta criada com êxito!'
      });
      console.log(user)
      $state.go('login')

    }, function(error) {
      $ionicPopup.alert({
        title: 'Erro',
        template: 'Falha no cadastro, verifique se os dados estão corretos ou se o email ja foi cadastrado'
      });
    });
  }

  //Log in
  $scope.signIn = function(data){
    LogInFactory.get(data, function(data) {
      console.log(data);
      updateCurrentUser(data.user);
      $state.go('app.userprofile')

    }, function(error) {
      console.log(error);
      $ionicPopup.alert({
        title: 'Erro',
        template: 'Falha no login'
      });
    });
  }

  //Log out
  $scope.logOut = function(){
    console.log($scope.currentUser.id)
    var userId = $scope.currentUser.id;
    LogOutFactory.get(userId, function(userId) {
      $state.go('login');

    }, function(error) {
      console.log("Log out error!");
      $ionicPopup.alert({
        title: 'Erro',
        template: 'Não foi possível se desconectar!'
      });
    })
  }

  //Edit
  $scope.editUser = function({id,user}){
    console.log($scope.currentUser)
    console.log({id,user});
    EditUser.save({id,user}, function({id,user}){
      $ionicPopup.alert({
        title: 'Sucesso',
        template: 'Dados alterados com êxito!'
      });
      updateCurrentUser(user);
      $state.go('app.userprofile')

    }, function(error) {
      $ionicPopup.alert({
        title: 'Erro',
        template: 'Verifique se os dados estão corretos ou se o email ja foi cadastrado'
      })
    })
  }

  updateCurrentUser = function(data){
    $rootScope.user = data;
  }

  //Delete
  $scope.deleteUser = function(id){
    console.log(id);

    var confirmPopup = $ionicPopup.confirm({
      title: 'Atenção!',
      template: 'Você tem certeza que deseja encerrar esta conta?'
   });

   confirmPopup.then(function(res) {
         if(res) {
           DeleteUser.delete({id}, function(id){
             $ionicPopup.alert({
               title: 'Conta encerrada!',
               template: 'Conta encerrada com êxito!'
             });
             $state.go('login',{},{reload: true})

           }, function(error) {
             $ionicPopup.alert({
               title: 'Erro',
               template: 'Não foi possível encerrar a conta!'
             })
             })
          }
      })
  }
  $scope.currentUser = $rootScope.user;
})
