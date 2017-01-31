(function () {
  angular
    .module('app')
    .service('Device', Device);

  /** @ngInject */
  function Device($http) {
    var self = this;

    self.getAll = function (query) {
      return $http.get('/api/products' + query);
    };
    self.getDevice = function (id) {
      return $http.get('/api/products/' + id);
    };
    self.createDevice = function (device) {
      return $http.post('/api/products', device)
    };

    self.updateDevice  = function (device) {
      return $http.put('/api/products/' + device._id, device)
    };
    self.deleteDevice = function (device) {
      return $http.delete('/api/products/' + device._id)
    };
  }

})();
