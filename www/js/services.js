"use strict";

angular.module('starter.services', ['ngResource'])

const HOST = "http://localhost:3000"

.factory('LogInFactory', ["$resource", function($resource) {
  return $resource(HOST+ '/signIn')
}])

.factory('SignUp', function($resource) {
  return $resource(HOST+ '/users/create')
})

.factory('LogOutFactory', function($resource) {
  return $resource(HOST+ '/logout')
})

.factory('EditUser', function($resource) {
  return $resource(HOST+ '/users/update')
})

.factory('DeleteUser', function($resource) {
  return $resource(HOST+ '/users/delete/:id')
})

.factory('FollowDeputy', function($resource) {
  return $resource(HOST+ '/users/:id/follow_deputy', {
    id: "@id"
  })
})

.factory('UnfollowDeputy', function($resource) {
  return $resource(HOST+ '/users/:id/unfollow_deputy', {
    id: "@id"
  })
})


.factory('FollowedDeputies', function($resource) {
  return $resource(HOST+ '/users/:id/followed_deputies', {
    id: "@id"
  })
})

.factory('ServerDeputies', function($resource){
  return $resource(HOST+ '/deputies/all')
})

.factory('ServerFindDeputy', function($resource){
  return $resource(HOST+ '/deputies/:id',{
    id: "@id"
  })
})

.factory('ServerQuests', function($resource) {
  return $resource(HOST+ '/quests/all.json')
})

.factory('ServerFindQuest', function($resource){
  return $resource(HOST+ '/quests/:id',{
    id: "@id"
  })
})

.factory('ServerSearchDeputies', function($resource){
  return $resource(HOST+ '/deputies/search/:toSearch', {
    toSearch: "@toSearch"
  })
})

.factory('ServerParty', function($resource){
  return $resource(HOST+ '/parties/:partyId', {
    partyId: "@partyId"
  })
})

.factory('ServerUf', function($resource){
  return $resource(HOST+ '/ufs/:ufId', {
    ufId: "@ufId"
  })
})

.factory('ServerAchievements', function($resource){
  return $resource(HOST+ '/achievements/all.json')
})

.factory('ServerFindAchv', function($resource){
  return $resource(HOST+ '/achievements/:id',{
    id: "@id"
  })
})
