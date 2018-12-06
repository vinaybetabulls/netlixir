const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const saltval = 10;

var Schema  = mongoose.Schema;
var EmployeeSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    firstname : {
        type: String,
        trim:true
    },
    lastname : {
        type : String,
        trim : true
    },
    username : {
        type : String,
        require : true,
        trim : true
    },
    password : {
        type : String,
        require : true,
        trim : true
    }
})

EmployeeSchema.index({username:1},{unique:true});

var Employee = mongoose.model('Employee',EmployeeSchema);
module.exports =Employee;

module.exports.findUserByUsername = (uname,cb) => {
    Employee.findOne({username : uname},cb)
}

module.exports.findUserById = (id,cb) => {
    Employee.findById({_id:id},cb);
}

module.exports.createEmployee = (admininfo,cb) => {

    bcryptjs.genSalt(saltval, (err,salt) => {
        bcryptjs.hash(admininfo.password,salt, (err,hashpass)=>{
            if(err) return cb(err);
            admininfo._id = new mongoose.Types.ObjectId();
            admininfo.password = hashpass;
            let admin =new Employee(admininfo);
            admin.save(cb);
        })
    })
}

module.exports.getAllUser = (cb) => {
    Employee.find({},cb);
}

module.exports.comparePassword = (adminpass,hash,cb) => {
    bcryptjs.compare(adminpass,hash, (err,ismatch) => {
        if(err) return err;
        return cb(ismatch);
    })
}

module.exports.updateEmployee = (emp, cb) => {
    console.log(emp.emp)
    Employee.update({username:emp.emp.username},{$set:{firstname:emp.emp.firstname,lastname:emp.emp.lastname}},cb)
}

module.exports.deleteEmployee = (empId,cb)=>{
    Employee.deleteOne({_id:empId},cb)
}

