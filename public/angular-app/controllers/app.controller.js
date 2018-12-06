(function () {
    'use strict';

    angular
        .module('ReviewApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope','$state','LoginService'];
    function LoginController($scope,$state,LoginService) {
        var token=localStorage.getItem('token');
        if(!token) $state.go('login');
        $scope.admin={};
        $scope.emp={};
        $scope.loginError='';
        $scope.adminLogin = function(){
            $scope.loginError='';
            console.log($scope.admin)
            LoginService.adminLogin($scope.admin)
            .then(function(response){
                console.log(response);
                if(response.data.msg=="failed"){
                    $scope.loginError =response.data.result;
                }
                else{
                    localStorage.setItem('token',response.data.token);
                    $state.go('admin')
                }
            })
            .catch(function(err){
                console.log(err)
            })
        }
        
        $scope.empLogin = function(){
            $scope.loginError='';
            console.log($scope.emp)
            LoginService.employeeLogin($scope.emp)
            .then(function(response){
                console.log(response)
                if(response.data.msg=="failed"){
                    $scope.loginError =response.data.result;
                }
                else{
                    localStorage.setItem('token',response.data.data.token);
                    localStorage.setItem('empId',response.data.data._id);
                    $state.go('employee')
                }
            })
            .catch(function(err){
                console.log(err)
            })
        }

        $scope.logout = function(){
            $state.go('login');
            localStorage.clear();
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('ReviewApp')
        .controller('EmployeeController', EmployeeController);

        EmployeeController.$inject = ['$scope','$state','ReviewService'];
    function EmployeeController($scope,$state,ReviewService) {
        
        

        activate();

        ////////////////

        function activate() { 
            var empid = localStorage.getItem('empId');
            $state.go('employee.employeeReview');
            $scope.empId ={
                empId : empid
            }
            ReviewService.getReviewByEmployee($scope.empId)
            .then(function(response){
                console.log(response);
                $scope.emp = response.data.result;
            })
            .catch(function(err){
                console.log(err)
            })
            
        }
    }
})();