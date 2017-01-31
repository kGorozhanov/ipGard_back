(function () {
  angular
    .module('app')
    .service('Users', Users);

  /** @ngInject */
  function Users($http) {
    var self = this;

    self.getUsers = function () {
      return $http.get('/api/users');
    };

    self.createUser = function (user) {
      return $http.post('/api/users', user)
    };

    self.updateUser  = function (user) {
      return $http.put('/api/users/' + user._id, user)
    };
    self.deleteUser = function (user) {
      return $http.delete('/api/users/' + user._id)
    };

  }

})();
