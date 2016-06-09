angular.module('starter')

.controller('UserCtrl', ['$scope','$rootScope','$state','$ionicPopup','SignUp',
'LogInFactory','EditUser','LogOutFactory','DeleteUser','FollowedDeputies','FollowDeputy','UnfollowDeputy',
function($scope, $rootScope, $state, $ionicPopup, SignUp, LogInFactory, EditUser, LogOutFactory,
  DeleteUser, FollowedDeputies, FollowDeputy, UnfollowDeputy) {
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

    FollowedDeputies.get({
        id: $scope.currentUser.id
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

  $scope.followDeputy = function(deputyId) {
      var userId = $scope.currentUser.id;
      var data = {deputyId, userId, id: userId};
      FollowDeputy.save(data, function(data) {
        console.log("Deputy followed!");
        $rootScope.isFollowed = true;
        $state.reload();
      },
      function(error){
        console.log("Não foi possível seguir este deputado!");
      }
    )
  }

  $scope.unfollowDeputy = function(deputyId) {
      var userId = $scope.currentUser.id;
      var data = {deputyId, userId, id: userId};
      UnfollowDeputy.save(data, function(data) {
        console.log("Deputy unfollowed!");
        $rootScope.isFollowed = false;
        $state.reload();
      },
      function(error){
        console.log("Não foi possível deixar de seguir este deputado!");
      }
    )
  }

  $scope.following = function (deputyId) {
    FollowedDeputies.get({
      id: $scope.currentUser.id
    },
      function(data) {
        console.log("SERVICES: Getting Followed Deputies from server");
        $scope.followed = data.deputies;
        $rootScope.isFollowed = false;
        for (var i in $scope.followed) {
          console.log(deputyId);
          console.log($scope.followed[i].id);
          if($scope.followed[i].id == deputyId) {
            $rootScope.isFollowed = true;
            break;
          }
        }
      },
      function(error) {
        alert("Não foi possível estabelecer conexeão com o servidor...");
      }
    )
  }

}])
