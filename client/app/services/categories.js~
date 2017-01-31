(function () {
  angular
    .module('app')
    .service('Category', Category);

  /** @ngInject */
  function Category($http) {
    var self = this;

    self.getCategories = function () {
      return $http.get('/api/categories');
    };
    self.getCategory = function (id) {
      return $http.get('/api/categories/' + id);
    };
    self.createCategory = function (category) {
      return $http.post('/api/categories', category)
    };

    self.updateCategory  = function (category) {
      return $http.put('/api/categories/' + category._id, category)
    };
    self.deleteCategory = function (category) {
      return $http.delete('/api/categories/' + category._id)
    };

  }

})();
