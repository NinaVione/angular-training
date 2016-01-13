var app = angular.module('app', []);

app.controller('mainCtrl', function($scope, $filter) {
  
  $scope.formLabels = {
    name: "Name:",
    age: "Age:",
    date: "Date:",
    greeting: "Here will appear the congratulation text"
  };
  
  $scope.successBtn = "Success";

  $scope.errorMessageInt = "";
  $scope.errorMessageStr = "";
  
  $scope.man = { 
      name: "", 
      age: "",
      date: ""
  };

  $scope.createText = function(man) {
    if($scope.userForm.$valid) {
      var filterDate = $filter('date')(man.date, 'yyyy-MM-dd');
      $scope.formLabels.greeting = "Hi " + man.name + ". You are " + man.age + " years old. " + filterDate;
    } else {
      if (man.name == "") {
        $scope.errorMessageStr = "name can not be empty";
      }
    }
  };

})

//integer validator
//age should be between 18 and 65
.directive('validateInteger', function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attrs, ctrl) {
        ctrl.$parsers.unshift(function(value) {
          var valid;
          var numbers = /^(?:1[89]|[2-5]\d|6[0-5])$/;
            if(value.match(numbers)) {
              valid = true;
              scope.errorMessageInt = "";
            } else {
                valid = false;
                scope.errorMessageInt = "age should be from 18 to 65";
            }
          return valid ? value : undefined;
        });
      }
    };
})

//srting name validator (english symbols)
//more than 3 symbols, only first letter in uppercase of the word, only letters
.directive('validateString', function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attrs, ctrl) {
        ctrl.$parsers.unshift(function(value) {
          var valid;
          var letters = /^[A-Z][a-z]{3,}$|^[A-Z][a-z]{3,}\s[A-Z][a-z]{3,}$/;
          if(value.match(letters)) {
            valid = true;
            scope.errorMessageStr = "";
          } else {
              valid = false;
              scope.errorMessageStr = "name can contain only english symbols (one or two words)";
          }
          return valid ? value : undefined;
        });
      }
    };
})