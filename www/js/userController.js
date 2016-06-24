angular.module('starter')

.controller('UserCtrl', ['$scope','$rootScope','$state','$ionicPopup','SignUp',
'LogInFactory','EditUser','LogOutFactory','DeleteUser','ServerFollowedDeputies',
'ServerFollowDeputy','ServerUnfollowDeputy','LevelsFactory','ReceiveQuests','RankFactory', 'UserPositionFactory','ReceivedQuests',
function($scope, $rootScope, $state, $ionicPopup, SignUp,LogInFactory, EditUser,
  LogOutFactory, DeleteUser, ServerFollowedDeputies, ServerFollowDeputy, ServerUnfollowDeputy,
  LevelsFactory, ReceiveQuests, RankFactory, UserPositionFactory, ReceivedQuests) {


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

  $scope.verifyQuests = function(){
    var userId = $rootScope.user.id;
    ReceivedQuests.query({userId},function(userQuests){
      console.log(userQuests.length);
      if(userQuests.length < 3){
        var questsToReceive = 3 - userQuests.length;
        var last_acess = moment($rootScope.user.last_acess);
        var daysDiff;
        if (last_acess != null){
          daysDiff = moment().diff(last_acess,'days');
          if (daysDiff > questsToReceive){
            var daysDiff = questsToReceive;
          }
          if (daysDiff > 0 && daysDiff <= 3){
            $scope.receiveQuests($rootScope.user.id, daysDiff);
          }
        }
      }
    })
  }

  $scope.updateLastAcess = function(){
    $rootScope.user.last_acess = moment();
    var id = $rootScope.user.id;
    var user = $rootScope.user;
    console.log(id);
    var data = {id,user};
    EditUser.save(data, $scope.updateLastAcessSucess,
        $scope.updateLastAcessError);
  }

  $scope.updateLastAcessSucess = function(){
    console.log("UPDATE USER DATA: Last Acess uploaded!");
  }

  $scope.updateLastAcessError = function(){
    console.log("UPDATE USER DATA: Could not upload Last Acess!");
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

      var userId = user.id;
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
    RankFactory.query($scope.getRank, $scope.getRankError)
  }

  $scope.getRank = function(data){
    console.log("SERVICES: Getting Users data from server...")
    $scope.users = data;
  }

  $scope.getRankError = function(data){
    alert("Não foi possível estabelecer conexão com o servidor...");
    console.log("SERVICES: ERROR in getting Deputies data from server...");
  }

  //Log in
  $scope.signIn = function(data) {
    LogInFactory.get(data, $scope.signInValid, $scope.signInError)
  }

	$scope.signInValid = function(data) {
		updateCurrentUser(data);
		$rootScope.logged = true;
		console.log("USER LOGGED: " + $scope.logged);
    $scope.verifyQuests();
		$state.go('app.browseDeputies')
	}

	$scope.signInError = function(error) {
		console.log(error);
		$ionicPopup.alert({
			title: 'Oops!',
			template: 'O email e/ou a senha estão incorretos.\nPor favor, tente novamente!'
		});
	}

  //Edit
  $scope.editUser = function(data){
    EditUser.save(data, $scope.editUserValid, $scope.editUserError)
  }

  $scope.editUserValid = function(data){
    $ionicPopup.alert({
      title: 'Sucesso',
      template: 'Dados alterados com êxito!'
    });
    console.log(data);
    updateCurrentUser(data);
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
    $rootScope.currentUser = $rootScope.user;
  }

  //Log out
  $scope.logOut = function(){
    var confirmPopup = $ionicPopup.confirm({
        title: 'Tem certeza sair?',
        template: 'Nós iremos sentir sua falta... =('
    });
    $scope.logOutSuccess(confirmPopup);
   };

   $scope.logOutSuccess = function (confirmPopup) {
     confirmPopup.then($scope.logOutResponse, $scope.logOutResponseError);
   }

   $scope.logOutResponse = function (res) {
     if(res == true) {
       console.log("LOGOUT: Cleaning user session data...");
       $scope.updateLastAcess();
       $rootScope.user = {};
       $rootScope.logged = false;
       $state.go('index');
     }
   }
   $scope.logOutResponseError = function () {

   }

  //Delete
  $scope.deleteUser = function(id){

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

  $scope.updateLevelBar = function()
  {
    var percentage = 0;
    var userExp = $rootScope.currentUser.experience_points;

    var minXp = $rootScope.currentUser.level.xp_min;
    var maxXp = $rootScope.currentUser.level.xp_max;

    var diffXp = maxXp - minXp;
    var diffUserXp = userExp - minXp;

    percentage = (100 * diffUserXp) / diffXp;
    $scope.levelPercentage = percentage;
  }

  $scope.updateUserServerData = function(){
    var id = $rootScope.user.id;
    var user = $rootScope.user;

    EditUser.save({id: id, user}, $scope.updateUserServerDataSuccess,
        $scope.updateUserServerDataError);
  }

  $scope.updateUserServerDataSuccess = function(){
    console.log("UPDATE USER DATA: User data uploaded!");
  }

  $scope.updateUserServerDataError = function(){
    console.log("UPDATE USER DATA: Could not upload user data!");
  }

  $scope.updateLevel = function(){
    LevelsFactory.query($scope.serverUpdateLevelSucess, $scope.serverUpdateLevelError);
  }

  $scope.serverUpdateLevelSucess = function(data){
    console.log("Getting Levels data from SERVER...");
    var userExp = $rootScope.user.experience_points;
    var levelsData = data;

    for(var counter in levelsData)
    {
      var maxXp = levelsData[counter].xp_max;
      var minXp = levelsData[counter].xp_min;

      if(userExp <= maxXp && userExp >= minXp)
      {
        $rootScope.user.level = levelsData[counter];
        $scope.updateLevelBar();
        break;
      }
    }
  }

  $scope.serverUpdateLevelError = function(error){
    alert("Não foi possível atualizar level do usuário");
    console.log("ERROR: Could not get Levels data from SERVER...");
  }

  $scope.addExperience = function(xpPoints){
    $rootScope.user.experience_points += xpPoints;
    $scope.updateLevel();

    $scope.updateUserServerData($rootScope.user);
  }

  $scope.followedDeputies = function () {
      console.log($rootScope.currentUser);
      var userId = $rootScope.currentUser.id;
      ServerFollowedDeputies.query({id: userId}, $scope.serverFollowedDeputies, $scope.serverFollowedDeputiesError)
  }

  $scope.serverFollowedDeputies = function(data) {
    console.log("SERVICES: Getting Followed Deputies from server");
    $scope.followed = data;
  }

  $scope.serverFollowedDeputiesError = function(data) {
    alert("Não foi possível estabelecer conexão com o servidor...");
  }

  $scope.followDeputy = function(deputy) {
    $scope.addExperience(50);
    var userId = $rootScope.currentUser.id;
    var deputyId = deputy.id;
    var data = {deputyId, userId, id: userId};
    ServerFollowDeputy.save(data, $scope.serverFollowDeputy, $scope.serverFollowDeputyError)
    deputy.followers_count += 1;
  }

  $scope.serverFollowDeputy = function (data) {
    console.log("Deputy followed!");
    $rootScope.isFollowed = true;
  }

  $scope.serverFollowDeputyError = function (data) {
    alert("Não foi possível seguir este deputado!");

  }

  $scope.unfollowDeputy = function(deputy) {
    var userId = $rootScope.currentUser.id;
    var deputyId = deputy.id;
    var data = {deputyId, userId, id: userId};
    ServerUnfollowDeputy.save(data, $scope.serverUnfollowDeputy, $scope.serverUnfollowDeputyError)
    deputy.followers_count -= 1;
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
    var userId = $rootScope.currentUser.id;
    $rootScope.deputyCheck = deputyId;
    ServerFollowedDeputies.query({id:userId},$scope.serverFollowing, $scope.serverFollowingError)
  }

  $scope.serverFollowing = function(data) {
    console.log("SERVICES: Getting Followed Deputies from server");
    $scope.followed = data;
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

  $scope.getUserPositionRanking = function(){
    var userId = $rootScope.user.id;
    UserPositionFactory.query({id: userId}, $scope.serverUserPositionSuccess,
      $scope.serverUserPositionError);
  }

  $scope.serverUserPositionSuccess = function(data){
    console.log("USER_POSITION: Getting user position from server...");
    $scope.userPositionRanking = data[0];

  }

  $scope.serverUserPositionError = function(data){
    console.log("USER_POSITION ERROR: Could not get user position from server!");
  }
}])
