console.clear(); // <-- keep the console clean on refresh

/* global angular */
(function() {
  'use strict';

  var app = angular.module('formlyExample', ['formly', 'formlyBootstrap'], function config(formlyConfigProvider) {
    // set templates here
    formlyConfigProvider.setType({
      name: 'custom',
      templateUrl: 'custom.html'
    });
  });
  

  app.controller('MainCtrl', function MainCtrl(formlyVersion) {
    var vm = this;
    // funcation assignment
    
    // variable assignment
    vm.author = { // optionally fill in your info below :-)
      name: 'Kent C. Dodds',
      url: 'https://twitter.com/kentcdodds' // a link to your twitter/github/blog/whatever
    };
    vm.exampleTitle = 'Introduction';
    vm.env = {
      angularVersion: angular.version.full,
      formlyVersion: formlyVersion
    };
    vm.questions=[];
    vm.fields =[];
    vm.model = {};
    vm.types=["input","radio","checkbox","select","label"];

    vm.onSubmit = function() {
      var question ={};
      question.key=vm.key;
      question.type=vm.type;
      question.label=vm.label;
      question.placeholder=vm.placeholder;
      
      question.options=vm.option.split('\n');
      
      vm.questions.push(question);
      createFormUsingQuestion(vm.questions);
    }
    createFormUsingQuestion(vm.questions);

    function createFormUsingQuestion(questions) {
      if(questions==null ||vm.questions=='')
        console.log("no question exist! sorry.");
        for(var i=0; i<questions.length; i++){
          var field={};
          field.key=questions[i].key;
          field.type=questions[i].type;
          field.templateOptions={};
          field.templateOptions.options=[];
          field.templateOptions.label=[];
          if(field.type=="radio" || field.type=="select"){
            for(var j=0;j<questions[i].options.length;j++){
              var option={};
              option.name=questions[i].options[j];
              field.templateOptions.options.push(option);
            }
            field.templateOptions.label=questions[i].label;
          }
          
          if(field.type=="checkbox"){
             field.templateOptions.label=questions[i].options[i];
          } 
          
          field.templateOptions.placeholder=questions[i].placeholder;
          vm.fields.push(field);
      }
    }
    
  });

  
  app.directive('exampleDirective', function() {
    return {
      templateUrl: 'example-directive.html'
    };
  });
})();