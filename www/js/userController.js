angular.module('starter')

.controller('UserCtrl', ['$scope','$rootScope','$state','$ionicPopup','SignUp',
'LogInFactory','EditUser','LogOutFactory','DeleteUser','ServerFollowedDeputies','ServerFollowDeputy','ServerUnfollowDeputy','LevelsFactory','ReceiveQuests','RankFactory',function($scope, $rootScope, $state, $ionicPopup, SignUp,LogInFactory, EditUser, LogOutFactory, DeleteUser, ServerFollowedDeputies, ServerFollowDeputy, ServerUnfollowDeputy, LevelsFactory, ReceiveQuests, RankFactory) {


  //Receive Quests
  $scope.receiveQuests = function(userId,questsAmount) {
    data = {userId,questsAmount};
    ReceiveQuests.get(data, $scope.receiveSuccess, $scope.receiveError)
  }

  $scope.receiveSuccess = function(data){
    console.log("Receiving quests from server...");
  }

  $scope.receiveError = function(error){
    alert("Não foi possível estabelecer conexão com o servidor...");
  }

  //Sign up
  $scope.signUp = function(user){
    console.log(user);
    SignUp.save({user:user}, $scope.signUpValid, $scope.signUpError)
	}

	$scope.signUpValid = function(user) {
      $ionicPopup.alert({
        title: 'Sucesso',
        template: 'Conta criada com êxito!'
      });
      console.log(user);
      var userId = user.user.id;
      $scope.receiveQuests(userId,3);
      $state.go('login');

	}

	$scope.signUpError = function(error) {
      $ionicPopup.alert({
        title: 'Erro',
        template: 'Falha no cadastro, verifique se os dados estão corretos ou se o email ja foi cadastrado'
      });
	}
  //Ranking
  $scope.getUserRank = function(){
    RankFactory.get($scope.getRank, $scope.getRankError)
  }

  $scope.getRank = function(data){
    console.log("SERVICES: Getting Users data from server...")
    $scope.users = data.users;
  }

  $scope.getRankError = function(data){
    alert("Não foi possível estabelecer conexão com o servidor...");
    console.log("SERVICES: ERROR in getting Deputies data from server...");
  }

  //Log in
  $scope.signIn = function(data) {
    LogInFactory.get(data, $scope.signInValid, $scope.signInError)
  }

  var numberofDays = function(){

  }

	$scope.signInValid = function(data) {
		console.log(data);
		updateCurrentUser(data.user);
		$rootScope.logged = true;
		console.log($scope.logged);
		$state.go('app.browseDeputies')
	}

	$scope.signInError = function(error) {
		console.log(error);
		$ionicPopup.alert({
			title: 'Oops!',
			template: 'O email e/ou a senha estão incorretos.\nPor favor, tente novamente!'
		});
	}


  //Log out
  $scope.logOut = function(){
    var confirmPopup = $ionicPopup.confirm({
     title: 'Tem certeza sair?',
     template: 'Nós iremos sentir sua falta... =('
   });

   confirmPopup.then(function(res) {
     if(res) {
       console.log("LOGOUT: Cleaning user session data...");
       $rootScope.user = {};
       $rootScope.logged = false;
       $state.go('index');
     } else {
     }
   });
 };

  //Edit
  $scope.editUser = function({id,user}){
    EditUser.save({id: id, user}, $scope.editUserValid, $scope.editUserError)
	}

	$scope.editUserValid = function({id,user}){
		$ionicPopup.alert({
			title: 'Sucesso',
			template: 'Dados alterados com êxito!'
		});
		updateCurrentUser(user);
		$state.go('app.userprofile')
	}

	$scope.editUserError = function(error) {
		$ionicPopup.alert({
			title: 'Erro',
			template: 'Verifique se os dados estão corretos ou se o email ja foi cadastrado'
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

  $scope.updateLevelBar = function()
  {
    var percentage = 0;
    var userExp = $rootScope.user.experience_points;

    var minXp = $rootScope.user.level.xp_min;
    var maxXp = $rootScope.user.level.xp_max;

    var diffXp = maxXp - minXp;
    var diffUserXp = userExp - minXp;

    percentage = (100 * diffUserXp) / diffXp;
    $scope.levelPercentage = percentage;
  }

  $scope.updateLevel = function(){
    LevelsFactory.get($scope.serverUpdateLevelSucess, $scope.serverUpdateLevelError);
  }

  $scope.serverUpdateLevelSucess = function(data){
    console.log("Getting Levels data from SERVER...");
    var userExp = $rootScope.user.experience_points;
    var levelsData = data.levels;

    for(var counter in levelsData)
    {
      var maxXp = levelsData[counter].xp_max;
      var minXp = levelsData[counter].xp_min;

      if(userExp <= maxXp && userExp >= minXp)
      {
        $rootScope.user.level = levelsData[counter];
        $scope.updateLevelBar();

        // ONLY FOR THIS VERSION
        break;
      }
    }
  }

  $scope.serverUpdateLevelError = function(error){
    console.log("ERROR: Could not get Levels data from SERVER...");
  }

  $scope.addExperience = function(xpPoints){
    $rootScope.user.experience_points += xpPoints;
    $scope.updateLevel();

    // NEED: Fix EditUser function in Rails
  }

  $scope.followedDeputies = function () {
      console.log($scope.currentUser);
      var userId = $scope.currentUser.id;
      ServerFollowedDeputies.get({id: userId}, $scope.serverFollowedDeputies, $scope.serverFollowedDeputiesError)
  }

  $scope.serverFollowedDeputies = function(data) {
    console.log("SERVICES: Getting Followed Deputies from server");
    $scope.followed = data.deputies;
  }

  $scope.serverFollowedDeputiesError = function(data) {
    alert("Não foi possível estabelecer conexão com o servidor...");
  }

  $scope.followDeputy = function(deputyId) {
    var userId = $scope.currentUser.id;
    var data = {deputyId, userId, id: userId};
    ServerFollowDeputy.save(data, $scope.serverFollowDeputy, $scope.serverFollowDeputyError)
  }

  $scope.serverFollowDeputy = function (data) {
    console.log("Deputy followed!");
    $rootScope.isFollowed = true;
    //$state.go($state.current, {}, {reload: true});
  }

  $scope.serverFollowDeputyError = function (data) {
    alert("Não foi possível seguir este deputado!");

  }

  $scope.unfollowDeputy = function(deputyId) {
    var userId = $scope.currentUser.id;
    var data = {deputyId, userId, id: userId};
    ServerUnfollowDeputy.save(data, $scope.serverUnfollowDeputy, $scope.serverUnfollowDeputyError)
  }

  $scope.serverUnfollowDeputy = function (data) {
    console.log("Deputy unfollowed!");
    $rootScope.isFollowed = false;
    //$state.reload();
  }

  $scope.serverUnfollowDeputyError = function (data) {
    alert("Não foi possível deixar de seguir este deputado!");
    console.log("Não foi possível deixar de seguir este deputado!");
  }

  $scope.following = function(deputyId) {
    var userId = $scope.currentUser.id;
    $rootScope.deputyCheck = deputyId;
    ServerFollowedDeputies.get({id:userId},$scope.serverFollowing, $scope.serverFollowingError)
  }

  $scope.serverFollowing = function(data) {
    console.log("SERVICES: Getting Followed Deputies from server");
    $scope.followed = data.deputies;
    $rootScope.isFollowed = false;
    for (var i in $scope.followed) {
      if($scope.followed[i].id == $rootScope.deputyCheck) {
        $rootScope.isFollowed = true;
        break;
      }
    }
  }

  $scope.serverFollowingError = function (data) {
      alert("Não foi possível estabelecer conexeão com o servidor...");
  }

}])
