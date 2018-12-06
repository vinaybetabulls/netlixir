(function () {
    'use strict';

    angular
        .module('ReviewApp')
        .controller('CreateEmployee', CreateEmployee);

    CreateEmployee.$inject = ['$rootScope', '$scope', 'AdminService'];
    function CreateEmployee($rootScope, $scope, AdminService) {
        var token=localStorage.getItem('token');
        if(!token) $state.go('login');
        $scope.emp = {};
        $scope.saveEmployee = function () {
            $rootScope.success = false;
            $rootScope.successmsg = '';
            $rootScope.error = false;
            $rootScope.errorsmsg = '';
            AdminService.saveEmployee($scope.emp)
                .then(function (success) {
                    console.log(success);
                    if (success.data.msg == "success") {
                        $rootScope.success = true;
                        $rootScope.successmsg = success.data.result;
                    }
                    else {
                        $rootScope.error = true;
                        $rootScope.errorsmsg = success.data.result;
                    }
                })
                .catch(function (err) {
                    console.log(err)
                })
        }
    }


})();

(function () {
    'use strict';

    angular
        .module('ReviewApp')
        .controller('ViewEmployee', ViewEmployee);

    ViewEmployee.$inject = ['$rootScope', '$scope', 'AdminService'];
    function ViewEmployee($rootScope, $scope, AdminService) {



        activate();

        ////////////////

        function activate() {
            var token=localStorage.getItem('token');
            if(!token) $state.go('login');

            AdminService.getEmployee()
                .then(function (result) {
                    console.log(result);
                    $scope.Employees = result.data.result;
                })
                .catch(function (err) {
                    console.log(err)
                })
        }
        $scope.empDetails = {};

        $scope.getEmpById = function (empId) {
            AdminService.getEmployeeById(empId)
                .then(function (response) {
                    console.log(response.data)
                    $scope.empDetails = response.data.result;
                })
                .catch(function (err) {
                    console.log(err)
                })
        }

        $scope.updateEmployee = function () {
            $rootScope.success = false;
            $rootScope.successmsg = '';
            $rootScope.error = false;
            $rootScope.errorsmsg = '';
            AdminService.editEmployee($scope.empDetails)
                .then(function (success) {
                    console.log(success);
                    if (success.data.msg == "success") {
                        activate();
                        $rootScope.success = true;
                        $rootScope.successmsg = success.data.result;
                    }
                    else {
                        $rootScope.error = true;
                        $rootScope.errorsmsg = success.data.result;
                    }
                })
                .catch(function (err) {
                    console.log(err)
                })
        }

        $scope.deleteEmployee = function (empId) {
            $rootScope.success = false;
            $rootScope.successmsg = '';
            $rootScope.error = false;
            $rootScope.errorsmsg = '';
            AdminService.deleteEmployee(empId)
                .then(function (success) {
                    console.log(success);
                    if (success.data.msg == "success") {
                        activate();
                        $rootScope.success = true;
                        $rootScope.successmsg = success.data.result;
                    }
                    else {
                        $rootScope.error = true;
                        $rootScope.errorsmsg = success.data.result;
                    }
                })
                .catch(function (err) {
                    console.log(err)
                })
        }


    }
})();

(function () {
    'use strict';

    angular
        .module('ReviewApp')
        .controller('EmployeeReview', EmployeeReview);

    EmployeeReview.$inject = ['$rootScope', '$scope', 'ReviewService', 'AdminService'];
    function EmployeeReview($rootScope, $scope, ReviewService, AdminService) {
        activate();

        ////////////////

        function activate() {
            var token=localStorage.getItem('token');
            if(!token) $state.go('login');

            $scope.employeeNames = [];
            AdminService.getEmployee()
                .then(function (result) {
                    console.log(result);
                    $scope.Employees = result.data.result;
                    for (var i = 0; i < $scope.Employees.length; i++) {
                        $scope.employeeNames.push({ empId: $scope.Employees[i]._id, empName: $scope.Employees[i].username })
                    }
                    console.log($scope.employeeNames)
                    $scope.selectedOption = $scope.employeeNames[1];

                })
                .catch(function (err) {
                    console.log(err)
                })
        }
        $scope.review = {};
        $rootScope.success = false;
        $rootScope.successmsg = '';
        $rootScope.error = false;
        $rootScope.errorsmsg = '';

        $scope.saveReview = function () {
            console.log($scope.selectedOption)
            $scope.review.empId = $scope.selectedOption.empId;
            $scope.review.empName = $scope.selectedOption.empName;
            ReviewService.saveReview($scope.review)
                .then(function (response) {
                    if (response.data.msg == "success") {
                        activate();
                        $rootScope.success = true;
                        $rootScope.successmsg = response.data.result;
                    }
                    else {
                        $rootScope.error = true;
                        $rootScope.errorsmsg = response.data.result;
                    }
                })
                .catch(function (err) {
                    console.log(err)
                })
        }

        getEmpReview();
        function getEmpReview() {
            
            ReviewService.getReview()
                .then(function (response) {
                    console.log(response)
                    $scope.Employees = response.data.result;
                    console.log($scope.emp)
                })
                .catch(function (err) {
                    console.log(err)
                })

        }

        $scope.logout = function(){
            $state.go('login');
            localStorage.clear();
        }
    }
})();