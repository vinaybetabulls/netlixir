(function () {
    'use strict';

    angular
        .module('ReviewApp')
        .service('LoginService', LoginService);

    LoginService.$inject = ['$http'];
    function LoginService($http) {
        this.adminLogin = adminLogin;
        this.employeeLogin = employeeLogin;

        ////////////////

        function adminLogin(adminLogin) {
            return $http.post('http://localhost:4500/api/admin/loginuser', adminLogin)
        }
        function employeeLogin(empLogin) {
            return $http.post('http://localhost:4500/api/employee/loginuser', empLogin)
        }
    }

})();


(function() {
    'use strict';

    angular
        .module('ReviewApp')
        .service('AdminService', AdminService);

        AdminService.$inject = ['$http'];
    function AdminService($http) {
        this.saveEmployee = saveEmployee;
        this.editEmployee = editEmployee;
        this.deleteEmployee = deleteEmployee;
        this.getEmployee = getEmployee;
        this.getEmployeeById = getEmployeeById;
        ////////////////

        function saveEmployee(emp) {
            return $http.post('http://localhost:4500/api/admin/createemployee',emp)
         }

         function editEmployee(emp){
            var employee ={
                "emp" : emp,
                "token":localStorage.getItem('token')
            }
             return $http.post('http://localhost:4500/api/admin/editEmployee',employee)
         }
         function deleteEmployee(empId){
            var emp ={
                "empId" : empId,
                "token":localStorage.getItem('token')
            }

            console.log("Service",emp)
             return $http.post('http://localhost:4500/api/admin/deleteEmployee',emp)
         }
         function getEmployee(){
            var emp={
                "token":localStorage.getItem('token')
            }
             return $http.post('http://localhost:4500/api/admin/getEmployees',emp)
         }

         function getEmployeeById(empId){
             var emp ={
                 "empId" : empId,
                 "token":localStorage.getItem('token')
             }

            return $http.post('http://localhost:4500/api/admin/getEmployeeById',emp)
        }
    }
})();

/**Employee Review service */

(function() {
    'use strict';

    angular
        .module('ReviewApp')
        .service('ReviewService', ReviewService);

        ReviewService.$inject = ['$http'];
    function ReviewService($http) {
        this.saveReview = saveReview;
        this.getReview = getReview;
        this.getReviewByEmployee = getReviewByEmployee;
        
        ////////////////

        function saveReview(review) {
            var reviewEmp = {
                "review":review,
                "token":localStorage.getItem('token')
            }
            return $http.post('http://localhost:4500/api/admin/savereview',reviewEmp)
         }

         function getReview(){
             return $http.get('http://localhost:4500/api/admin/getreview');
         }
         function getReviewByEmployee(empId){
             console.log(empId)
             return $http.post('http://localhost:4500/api/employee/employeeReview',empId)
         }
        }
})();