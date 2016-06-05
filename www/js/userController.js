angular.module('starter')

.controller('UserCtrl', ['$scope','$rootScope','$state','$ionicPopup','SignUp',
'LogInFactory','EditUser','LogOutFactory','DeleteUser',function($scope, $rootScope,
   $state, $ionicPopup, SignUp, LogInFactory, EditUser, LogOutFactory, DeleteUser) {
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
      $rootScope.logged = true;
      console.log($scope.logged);
      $state.go('app.browseDeputies')

    }, function(error) {
      console.log(error);
      $ionicPopup.alert({
        title: 'Oops!',
        template: 'O email e/ou a senha estão incorretos.\nPor favor, tente novamente!'
      });
    });
  }
  //Log out
  // Verificar a necessidade de usar a SESSION!!!
  $scope.logOut = function(){
    // ONLY WORKS IF USER IS CONNECTED
    /*var userId = $scope.currentUser.id;
    console.log("LOGOUT: User (id: " + userId + ")...");*/
    console.log("LOGOUT: Cleaning user session data...");

    $rootScope.user = {};

    $rootScope.logged = false;

    $state.go('index');
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

  $scope.followedDeputies = function () {

    var userId = $scope.currentUser.id;
    FollowedDeputies.get({
        id: userId
      },
      function(data) {
        console.log("SERVICES: Getting Followed Deputies from server");
        $scope.followed = data.deputies;
      },
      function(error) {
        alert("Não foi possível estabelecer conexão com o servidor...");
      }
    )
  }
}])
