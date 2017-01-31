(function () {
  angular
    .module('app')
    .service('Fields', Fields);

  /** @ngInject */
  function Fields($http) {
    var self = this;

    self.getFields = function (categoryId) {
      return $http.get('/api/fields?category=' + categoryId);
    };

    self.createField = function (field) {
      return $http.post('/api/fields', field)
    };

    self.updateField  = function (field) {
      return $http.put('/api/fields/' + field._id, field)
    };
    self.deleteField = function (field) {
      return $http.delete('/api/fields/' + field._id)
    };
    self.loadTypes = function () {
      return $http.get('/api/types')
    };

    // var fields = [
    //   {
    //     label: 'File',
    //     value: 'file'
    //   }
    // ]
    // fields.forEach(function (item) {
    //   $http.post('/api/types', item)
    // })
  }

})();
