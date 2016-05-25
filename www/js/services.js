angular.module('starter.services', ['ngResource'])


.factory('LogInFactory', function($resource) {
  return $resource('http://localhost:3000/login/signin')
})

.factory('SignUp', function($resource) {
  return $resource('http://localhost:3000/users/create')
})

.factory('LogOutFactory', function($resource) {
  return $resource('http://localhost:3000/logout')
})

.factory('EditUser', function($resource) {
  return $resource('http://localhost:3000/users/update')
})

.factory('DeleteUser', function($resource) {
  return $resource('http://localhost:3000/users/delete/:id')
})

.factory('ServerDeputies', function($resource){
  return $resource('http://localhost:3000/deputies/all')
})

.factory('ServerFindDeputy', function($resource){
  return $resource('http://localhost:3000/deputies/:id',{
    id: "@id"
  })
})

.factory('ServerQuests', function($resource) {
  return $resource('http://localhost:3000/quests/all.json')
})

.factory('ServerFindQuest', function($resource){
  return $resource('http://localhost:3000/quests/:id',{
    id: "@id"
  })
})

.factory('ServerSearchDeputies', function($resource){
  return $resource('http://localhost:3000/deputies/search/:toSearch', {
    toSearch: "@toSearch"
  })
})

.factory('ServerParty', function($resource){
  return $resource('http://localhost:3000/parties/:partyId', {
    partyId: "@partyId"
  })
})

.factory('ServerUf', function($resource){
  return $resource('http://localhost:3000/ufs/:ufId', {
    ufId: "@ufId"
  })
})

.factory('ServerAchievements', function($resource){
  return $resource('http://localhost:3000/achievements/all.json')
})

.factory('ServerFindAchv', function($resource){
  return $resource('http://localhost:3000/achievements/:id',{
    id: "@id"
  })
})
