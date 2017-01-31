(function () {
  angular
    .module('app')
    .service('Documents', Documents);

  /** @ngInject */
  function Documents($http) {
    var self = this;

    self.getAll = function (deviceId, categoryId) {
      return $http.get('/api/documents?product=' + deviceId + '&category=' + categoryId);
    };
    // self.getDevice = function (id) {
    //   return $http.get('/api/products/' + id);
    // };
    self.createDocument = function (document) {
      return $http.post('/api/documents', document)
    };

    self.updateDocument  = function (document) {
      return $http.put('/api/documents/' + document._id, document)
    };
    self.deleteDocument = function (document) {
      return $http.delete('/api/documents/' + document._id)
    };
  }

})();
