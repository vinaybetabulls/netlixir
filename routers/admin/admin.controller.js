const Admin = require('./admin.model');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const Review = require('./review.model');

module.exports = (app) => {
    /**create employee */
    app.post('/api/admin/createemployee', (req, res) => {

        function findEmployee() {
            return new Promise((resolve, reject) => {
                Admin.findUserByUsername(req.body.username, (err, admin) => {
                    if (err) {
                        reject(err)
                    }
                    else {
                        resolve(admin)
                    }
                })
            })

        }
        function createEmployeeFun() {
            return new Promise((resolve, reject) => {
                Admin.createEmployee(req.body, (err, created) => {
                    if (err) {
                        reject(err)
                    }
                    else {
                        //console.log(created)
                        resolve(created)
                    }
                })
            })
        }
        var promise = findEmployee();
        promise.then((result) => {
            if (result) {
                res.status(200).json({ "msg": "failed", "result": "Username already existed" });
            }
            else {
                //console.log("creating admin")
                var createuser = createEmployeeFun();
                createuser.then((result) => {
                    res.status(200).json({ "msg": "success", "result": "Employee created successfully" });
                }, (err) => {
                    res.status(200).json({ "msg": "failed", "result": err });
                })
                    .catch((err) => {
                        res.status(200).json({ "msg": "failed", "result": err });
                    })

            }
        }, (err) => {
            res.status(200).json({ "msg": "failed", "result": err });
        })
            .catch((err) => {
                res.status(200).json({ "msg": "failed", "result": err });
            })

    });

    /**Login Admin */

    app.post('/api/admin/loginuser', (req, res) => {
        function findUser() {
            return new Promise((resolve, reject) => {
                if (req.body.username == "admin" && req.body.password == "admin") {
                    resolve("success")
                }
                else {
                    resolve("failed")
                }
            })
        }

        let promise = findUser();
        promise.then((success) => {
            if (success == "success") {
                var token = jwt.sign({ username: "admin" }, app.get('superSecret'), {
                    expiresIn: 7200 // expires in 2 hours
                });
                res.status(200).json({ "msg": "success", "result": "Login Success", "token": token });
            }
            else {
                res.status(200).json({ "msg": "failed", "result": "Username or password wrong" });

            }
        }, (err) => {
            res.status(200).json({ "msg": "failed", "result": "Login Failed" });
        })

    });

    /**Edit Employee */
    app.post('/api/admin/editEmployee', verifyToken, (req, res) => {
        function updateEmployeeFun() {
            return new Promise((resolve, reject)=>{
                console.log("edit employee",req.body)
                Admin.updateEmployee(req.body, (err, result) => {
                    if (err) {
                        reject(err)
                    }
                    else {
                        resolve(result)
                    }
                })
            })

        }
        var promise = updateEmployeeFun();
        promise.then((result) => {
            if (result) {
               // console.log(result)
                res.status(200).json({ "msg": "success", "result": "Updated employee Successfully" });
            }
        }, (err) => {
            res.status(200).json({ "msg": "failed", "result": "Update Failed" });
        })
    });

    /**Get employee details */
    app.post('/api/admin/getEmployees', verifyToken, (req, res) => {
       // console.log("hi")
        //console.log(req.body)
        Admin.getAllUser((err, result) => {
            if (err) {
                res.status(200).json({ "msg": "failed", "result": "error" });
            }
            else {

                res.status(200).json({ "msg": "success", "result": result });
            }
        })
    });
    /**Get employee by Id */
    app.post('/api/admin/getEmployeeById', verifyToken, (req, res) => {

        //console.log(req.body)
        Admin.findUserById(req.body.empId, (err, result) => {
            if (err) {
                res.status(200).json({ "msg": "failed", "result": "error" });
            }
            else {

                res.status(200).json({ "msg": "success", "result": result });
            }
        })
    });
    /** Delete employee details */
    app.post('/api/admin/deleteEmployee',verifyToken, (req, res) => {
        console.log("EmployeeId",req.body)
        Admin.deleteEmployee(req.body.empId, (err, result) => {
            if (err) {
                res.status(200).json({ "msg": "failed", "result": "error" });
            }
            else {
                res.status(200).json({ "msg": "success", "result": "Employee deleted succesfully" });
            }
        })
    });

    /** save and update rating */
    app.post('/api/admin/savereview', verifyToken, (req, res) => {
        Review.saveRating(req.body, (err, result) => {
            if (err) {
                res.status(200).json({ "msg": "failed", "result": err });
            }
            else {
                res.status(200).json({ "msg": "success", "result": "Review submited successfully" });
            }
        })
    });

    /**delete review */
    app.post('/api/admin/deletereview', (req, res) => {
        Review.deleteReview(req.body.empId, (err, result) => {
            if (err) {
                res.status(200).json({ "msg": "failed", "result": err });
            }
            else {
                res.status(200).json({ "msg": "success", "result": "Review deleted successfully" });
            }
        })
    });

    /**get reviews */
    app.get('/api/admin/getreview', (req, res) => {
        Review.getAllReviews((err, result) => {
            if (err) {
                res.status(200).json({ "msg": "failed", "result": err });
            }
            else {
                console.log(result)
                res.status(200).json({ "msg": "success", "result": result });
            }
        })
    });
}

function verifyToken(req, res, next) {
    var token;
    console.log("verify...",req.body)
    

        token =req.body.token;
    
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.secretekey, function (err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        next();
    });

}