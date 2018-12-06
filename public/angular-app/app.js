var ReviewApp = 

    angular.module('ReviewApp', [
        'ui.router'
    ]);

    ReviewApp.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
        $urlRouterProvider.otherwise('/');
        $stateProvider
        .state('login',{
            url :'/',
            templateUrl :'../views/login.html',
            controller : 'LoginController'
        })
        .state('admin',{
            url:'/dashboard',
            templateUrl : '../views/admin/dashboard.html',
            controller : function($state){
                $state.go('admin.createemp')
            }
        })
        .state('admin.createemp',{
            url:'/createEmployee',
            templateUrl : '../views/admin/createEmployee.html',
            controller:"CreateEmployee"
        })
        .state('admin.viewemp',{
            url:'/viewemployesslist',
            templateUrl : '../views/admin/viewEmployee.html',
            controller : 'ViewEmployee'
            
        })
        .state('admin.editemp',{
            url:'/editemplyee',
            templateUrl:'../views/admin/editEmployee.html',
            controller:'ViewEmployee'
        })
        .state('admin.deleteemp',{
            url :'/deleteemployee',
            templateUrl:'../views/admin/deleteEmployee.html',
            controller:'ViewEmployee'
        })
        .state('admin.saveempreview',{
            url:'/saveEmployeeReview',
            templateUrl : '../views/admin/employeeReview.html',
            controller:'EmployeeReview'
        })
        .state('admin.viewempreview',{
            url:'/viewEmployeeReview',
            templateUrl:'../views/admin/viewEmployeeReview.html',
            controller:'EmployeeReview'
        })
        .state('employee',{
            url:'/employee',
            templateUrl:'../views/Employee/dashboard.html',
            controller :'EmployeeController'
        })
        .state('employee.employeeReview',{
            url:'/employeereview',
            templateUrl : '../views/Employee/employeeReview.html',
            controller :'EmployeeController'
        })
    }])
