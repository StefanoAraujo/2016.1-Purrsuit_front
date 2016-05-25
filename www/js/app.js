angular.module('starter', ['ionic', 'starter.controllers', 'ngResource'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  // Listing all quests
  .state('app.quests', {
    url: '/quests',
    views: {
      'menuContent': {
        templateUrl: 'templates/quests/quests.html',
        controller: 'QuestsCtrl'
      }
    }
  })

  // For a single quest
  .state('app.singleQuest', {
    url: '/quests/:questId',
    views: {
      'menuContent': {
        templateUrl: 'templates/quests/quest.html',
        controller: 'QuestCtrl'
      }
    }
  })

  // Listing all Achievements
  .state('app.Achievements', {
    url: '/achievements',
    views: {
      'menuContent': {
        templateUrl: 'templates/achievements/achievements.html',
        controller: 'AchievementsCtrl'
      }
    }
  })

  // Listing a single achievement
  .state('app.SingleAchievement', {
    url: '/achievements/:achvId',
    views: {
      'menuContent': {
        templateUrl: 'templates/achievements/singleAchievement.html',
        controller: 'SingleACHV'
      }
    }
  })

  // User
  .state('app.userprofile', {
    url: "/userprofile",
    views: {
      'menuContent': {
        templateUrl: "templates/userProfile.html",
        controller: 'UserCtrl'
      }
    }
  })

  //Log In
  .state('login', {
    url: "/login",
    templateUrl: "templates/login.html",
    controller: 'UserCtrl'
  })

  // Sign Up
  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signUp/signUp.html',
    controller: 'UserCtrl'
  })

  //Edit user
  .state('app.edituser', {
    url: "/edituser",
    views: {
      'menuContent': {
        templateUrl: "templates/editUser.html",
        controller: 'UserCtrl'
      }
    }
  })

  //Delete user
  .state('app.deleteuser', {
    url: "/deleteuser",
    views: {
      'menuContent': {
        templateUrl: "templates/userProfile.html",
        controller: 'UserCtrl'
      }
    }
  })

  //Log out
  .state('app.logout', {
    url: "/logout",
    views: {
      'menuContent': {
        templateUrl: "templates/menu.html",
        controller: 'UserCtrl'
      }
    }
  })

  // Listing all deputies
  .state('app.browseDeputies', {
    url: '/browseDeputies',
    views: {
      'menuContent': {
        templateUrl: 'templates/deputies/browseDeputies.html',
        controller: 'DeputiesCtrl'
      }
    }
  })

  // Listing deputy's details
  .state('app.deputy', {
    url: '/deputy/:deputyId',
    views: {
      'menuContent': {
        templateUrl: 'templates/deputies/deputy.html',
        controller: 'DeputyCtrl'
      }
    }
  })

  .state('app.searchDeputies', {
    url: '/browseDeputies/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/deputies/searchDeputies.html',
        controller: 'SearchDeputiesCtrl'
      }
    }
  })

  // Deputys view is 'browseDeputies'
  $urlRouterProvider.otherwise('/login');
});
