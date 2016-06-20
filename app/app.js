var angular = require('angular');
var ngRoute = require('angular-route');
var dndLists = require('angular-drag-and-drop-lists');

angular.
  module('app', ['dndLists', 'ngRoute']).
  config(AppConfig);
  
  AppConfig.$inject = ['$routeProvider'];
  
  function AppConfig($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'app.html',
        controller: MainController,
        controllerAs: 'ctrl'
      });
  }
  
  MainController.$inject = ['$scope'];
  function MainController($scope) {
  
    var ctrl = this;
    
    ctrl.validData = false;
    ctrl.info = '';
    ctrl.validation = validation;
    ctrl.submit = submit;
    ctrl.models = {
      selected: null,
      lists: {'Drinks': [], 'Food': [], 'Clothes': []},
      basket: []
    };
    
    $scope.$watch('ctrl.models.basket', function() {
      ctrl.validData = false;
      ctrl.info = '';
    },
      true);
    
    function validation() {
      ctrl.validData = (Math.random() > 0.5) ? true : false;
      return (ctrl.validData) ? allowed() : refused();
    }
      
    function submit() {
      ctrl.models.basket = [];
      ctrl.models.lists.Drinks.length=0;
      ctrl.models.lists.Food.length=0;
      ctrl.models.lists.Clothes.length=0;
      initial();
    }
      
    function refused() {
      ctrl.info = 'Sorry, basket didn\'t pass validation process! Try again';
    }
    
    function allowed() {
      ctrl.info = 'Your request have been successfully validated by API! Please, submit the request';
    }
      
    function initial(){
      for (var i = 1; i <= 4; i +=1 ) {
        ctrl.models.lists.Drinks.push({label: "Drink_" + i});
        ctrl.models.lists.Food.push({label: "Food_" + i});
        ctrl.models.lists.Clothes.push({label: "Clothe_" + i});
      }
    }
    initial();
}