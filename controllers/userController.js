const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/userModel');
const QuizSubmission = require('../models/quizSubmissionModel');
const CodeSubmission = require('../models/codeSubmissionModel');
const Quiz = require('../models/quizModel');
const Question = require('../models/questionModel');
const AppError = require("../utils/appError");
const catchAsync = require('../utils/catchAsync');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Not an image! Please upload only images.', 400), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
    if (!req.file) {
        return next();
    }
    req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`client/public/img/users/${req.file.filename}`);
    next();
});

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {

    // 1) Create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
        return next(
            new AppError(
                'This route is not for password updates. Please use /updateMyPassword.',
                400
            )
        );
    }

    // 2) Filtered out unwanted fields names that are not allowed to be updated
    //only name and email will be updated
    const filteredBody = filterObj(req.body, 'name', 'email');
    if (req.file) {
        filteredBody.photo = req.file.filename;
    }

    // 3) Update user document
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser
        }
    });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(204).json({
        status: 'success',
        data: null
    });
});


exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find({ "role": { $ne: "admin" } });

    // SEND RESPONSE
    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users
        }
    });
});

exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    if (req.query.check) {
        return res.status(200).json({
            status: 'success',
            data: {
                user: req.user
            }
        });
    }
    next();
};

exports.getUser = catchAsync(async (req, res, next) => {

    let query = User.findById(req.params.id);
    const doc = await query;

    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            data: doc
        }
    });
});

//Do not update password with this..Only Admin can acces this function...
exports.updateUser = catchAsync(async (req, res, next) => {

    const doc = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            data: doc
        }
    });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
    // if (id >= tours.length) 

    const doc = await User.findByIdAndDelete(req.params.id);
    console.log(doc);

    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
    }
    if (doc.role === 'student') {
        await CodeSubmission.deleteMany({ user: doc._id });
        await QuizSubmission.deleteMany({ user: doc._id });
    }
    else {
        await Question.deleteMany({ author: doc._id });
        await Quiz.deleteMany({ author: doc._id });
        
    }

    res.status(204).json({
        status: "success",
        data: null
    });
});

exports.getDetails = catchAsync(async (req, res, next) => {
    // Get all the available quizzes
    const quizzes = await Quiz.countDocuments({});

    // Get all the available questions
    const questions = await Question.countDocuments({});

    // Get all the submitted quizzes by current student
    const quizSubmissions = await QuizSubmission.countDocuments({
        user: req.user._id
    });
    // Get all the submitted questions by current student
    let codeSubmissions = await CodeSubmission.find({
        user: req.user._id
    }).select('+question -userSolution -status -createdAt -language -__v').populate({
        path: 'question',
        select: 'difficulty'
    });

    let easy = 0;
    let medium = 0;
    let hard = 0;

    codeSubmissions.forEach(ele => {
        if (ele.question.difficulty === '10') {
            easy = easy + 1;
        }
        else if (ele.question.difficulty === '20') {
            medium = medium + 1;
        }

        else if (ele.question.difficulty === '30') {
            hard = hard + 1;
        }
    });

    let total = easy + medium + hard;

    codeSubmissions = {
        easy,
        medium,
        hard,
        total
    };

    res.status(200).json({
        status: 'success',
        data: {
            quizzes,
            questions,
            quizSubmissions,
            codeSubmissions
        }
    });
});