const Gallary = require('../model/Gallary.js');
const path = require('path');
const Slider = require('../model/HomeSliderModel.js');
const Setting = require('../model/Setting.js');
const catchAsync = require('../util/catchAsync.js');
const AppError = require('../util/appError');
const multer = require('multer');
const Student = require('../model/Student.js');
const Member = require('../model/Member.js');
const News = require('../model/NewsLetter.js');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Set a unique filename for the uploaded file
    },
})

const upload = multer({ storage: storage })
// create video and photo data 

exports.uploadUserPhoto = upload.fields([{ name: 'file', maxCount: 1 }, { name: 'file2', maxCount: 1 }, { name: 'file3', maxCount: 1 }]);

exports.uploadSingleUserPhoto = upload.single('file');

exports.uploadMultipleMedia = upload.fields([
    { name: 'file', maxCount: 1 },      // For 'file' field
    { name: 'iconImage', maxCount: 10 }  // For 'iconImage' field
]);

exports.addMedia = catchAsync(async (req, res, next) => {

    if (req.file) req.body.mediaLink = req.file.filename;

    const media = await Gallary.create(req.body)

    res.status(201).json({
        status: 'success',
        data: {
            media,
            message: "Data Added"
        }
    })
});

// Get All video and photo data

exports.getAllMedia = catchAsync(async (req, res, next) => {

    const category = req.query

    const media = await Gallary.find(category);

    res.status(201).json({
        status: 'success',
        data: {
            media,
            message: "data fatch"
        }
    })
});

// for get single video or photo - controller

exports.getSigleMedia = catchAsync(async (req, res, next) => {

    const id = req.params.id;

    const media = await Gallary.findById(id)

    res.status(201).json({
        status: 'success',
        data: {
            media,
            message: "Data Fatch"
        }
    })
});

// for updat video or Photo info - controller

exports.updateMedia = catchAsync(async (req, res, next) => {

    const id = req.params.id;
    if (req.file) req.body.mediaLink = req.file.filename;
    const media = await Gallary.findByIdAndUpdate(id, req.body);

    if (!media) {
        return next(new AppError("data not found", 404))
    }

    res.status(201).json({
        status: 'success',
        data: {
            media,
            message: "data updated"
        }
    })
});

exports.deleteById = catchAsync(async (req, res, next) => {

    const id = req.params.id;

    const media = await Gallary.findByIdAndDelete(id);

    if (!media) {
        return next(new AppError("data not found", 404))
    }

    res.status(201).json({
        status: 'success',
        data: {
            media,
            message: "data deleted"
        }
    })
});



// slider controller *********************************************************************************

// create Slider  

exports.addSlider = catchAsync(async (req, res, next) => {
    if (req.file) req.body.mediaLink = req.file.filename;
    const slider = await Slider.create(req.body)

    res.status(201).json({
        status: 'success',
        data: {
            slider,
            message: "Data Added"
        }
    })
});

// Get All Slider

exports.getAllslider = catchAsync(async (req, res, next) => {

    const slider = await Slider.find();

    res.status(201).json({
        status: 'success',
        data: {
            slider,
            message: "data fatch"
        }
    })
});

// for get single slider - controller

exports.getSigleslider = catchAsync(async (req, res, next) => {

    const id = req.params.id;

    const slider = await Slider.findById(id)

    res.status(201).json({
        status: 'success',
        data: {
            slider,
            message: "Data Fatch"
        }
    })
});

// for updat slider info - controller

exports.updateSlider = catchAsync(async (req, res, next) => {
    if (req.file) req.body.mediaLink = req.file.filename;
    const id = req.params.id;

    const slider = await Slider.findByIdAndUpdate(id, req.body);

    if (!slider) {
        return next(new AppError("data not found", 404))
    }

    res.status(201).json({
        status: 'success',
        data: {
            slider,
            message: "data updated"
        }
    })
});


// Setting controller *********************************************************************************

// create Setting  

exports.addSetting = catchAsync(async (req, res, next) => {
    if (req.file) req.body.logo = req.file.filename;
    const setting = await Setting.create(req.body)

    res.status(201).json({
        status: 'success',
        data: {
            setting,
            message: "Data Added"
        }
    })
});

// Get All Slider

exports.getAllSetting = catchAsync(async (req, res, next) => {

    const setting = await Setting.findOne();

    res.status(201).json({
        status: 'success',
        data: {
            setting,
            message: "data fatch"
        }
    })
});



// for updat slider info - controller

exports.updateSetting = catchAsync(async (req, res, next) => {

    if (req.file) req.body.logo = req.file.filename;
    const setting = await Setting.findOneAndUpdate(req.body);

    if (!setting) {
        return next(new AppError("data not found", 404))
    }

    res.status(201).json({
        status: 'success',
        data: {
            setting,
            message: "data updated"

        }
    })
});


exports.getAllStudent = catchAsync(async (req, res, next) => {
    const type = req.query;
    const media = await Student.find(type);

    res.status(201).json({
        status: 'success',
        data: {
            media,
            message: "data fatch"
        }
    })
});

exports.getStudentById = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const media = await Student.findById(id);

    res.status(201).json({
        status: 'success',
        data: {
            media,
            message: "data fatch"
        }
    })
});

exports.updateStudentByid = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    if (req.file) {

        req.body.image = req.file.filename;
    }

    const media = await Student.findByIdAndUpdate(id, req.body, { new: true });

    res.status(201).json({
        status: 'success',
        data: {
            media,
            message: "data fatch"
        }
    })
});
// for updat video or Photo info - controller


exports.deleteStudent = catchAsync(async (req, res, next) => {

    const id = req.params.id;

    const media = await Student.findByIdAndDelete(id);

    if (!media) {
        return next(new AppError("data not found", 404))
    }

    res.status(201).json({
        status: 'success',
        data: {
            media,
            message: "data deleted"
        }
    })
});

exports.addStudent = catchAsync(async (req, res, next) => {

    if (req.file) {

        req.body.image = req.file.filename;
    }
    const media = await Student.create(req.body)

    res.status(201).json({
        status: 'success',
        data: {
            media,
            message: "Data Added"
        }
    })
});

exports.getAllMember = catchAsync(async (req, res, next) => {
    const type = req.query;
    const member = await Member.find(type);

    res.status(201).json({
        status: 'success',
        data: {
            member,
            message: "data fatch"
        }
    })
});

// for updat video or Photo info - controller


exports.deleteMember = catchAsync(async (req, res, next) => {

    const id = req.params.id;

    const member = await Member.findByIdAndDelete(id);

    if (!member) {
        return next(new AppError("data not found", 404))
    }

    res.status(201).json({
        status: 'success',
        data: {
            message: "data deleted"
        }
    })
});
exports.getOneMember = catchAsync(async (req, res, next) => {

    const id = req.params.id;

    const member = await Member.findById(id);

    if (!member) {
        return next(new AppError("data not found", 404))
    }

    res.status(201).json({
        status: 'success',
        data: {
            member,
            message: "data fatch"
        }
    })
});
exports.updateMember = catchAsync(async (req, res, next) => {

    const id = req.params.id;
    if (req.file) req.body.image = req.file.filename;

    const member = await Member.findByIdAndUpdate(id, req.body);

    if (!member) {
        return next(new AppError("data not found", 404))
    }

    res.status(201).json({
        status: 'success',
        data: {
            member,
            message: "data fatch"
        }
    })
});
exports.addMember = catchAsync(async (req, res, next) => {
    if (req.file) {

        req.body.image = req.file.filename;
    }

    const member = await Member.create(req.body)

    res.status(201).json({
        status: 'success',
        data: {
            member,
            message: "Data Added"
        }
    })
});


// news letter

exports.getAllEmail = catchAsync(async (req, res, next) => {

    const news = await News.find();

    res.status(201).json({
        status: 'success',
        data: {
            news,
            message: "data fatch"
        }
    })
});

// for updat video or Photo info - controller


exports.deleteNewsEmail = catchAsync(async (req, res, next) => {

    const id = req.params.id;

    const news = await News.findByIdAndDelete(id);

    if (!news) {
        return next(new AppError("data not found", 404))
    }

    res.status(201).json({
        status: 'success',
        data: {
            message: "data deleted"
        }
    })
});


exports.addEmail = catchAsync(async (req, res, next) => {

    const news = await News.create(req.body)

    res.status(201).json({
        status: 'success',
        data: {
            news,
            message: "Data Added"
        }
    })
});