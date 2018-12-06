const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ReviewSchema = new Schema({
    empId: {
        type: String
    },
    empName :{
        type :String
    },
    attendence: {
        type: String
    },
    communication: {
        type: String
    },
    skills: {
        type: String
    },
    overallRating: {
        type: String
    },
    comments: {
        type: String
    },
    reviewDate: {
        type: Date,
        default: new Date()
    },
    lastUpdateDate: {
        type: Date,
        default: new Date()
    }
})

ReviewSchema.index({ employeeId: 1 });
let Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;

/**save and update rating  */
module.exports.saveRating = (rating, cb) => {
    console.log(rating.review)
    let review = new Review(rating.review);
    Review.findOne({ employeeId: rating.review.empId }, (err, result) => {
        if (err) return cb(err);
        if (result) {
            rating.lastUpdateDate = new Date();
            Review.findByIdAndUpdate(review.empId, rating, { new: true },  cb)
        }
        else{
            review.save(cb);
        }
    })
}

/**delete rating */
module.exports.deleteReview = (reviewId,cb) => {
    Review.findByIdAndRemove(reviewId,cb);
}

/**get all reviews */
module.exports.getAllReviews = (cb)=>{
    console.log("getAllReviews")
    Review.find({},cb)
}

/**Get review by employee */
module.exports.getEmployeeReview = (empId,cb) => {
    Review.findOne({employeeId:empId},cb)
}