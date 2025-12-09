const Page = require('../model/Page.js');
const Jobe = require('../model/Jobs.js');
const Forme = require('../model/Forms.js')
const catchAsync = require('../util/catchAsync.js');
const AppError = require('../util/appError');
const Testimonial = require('../model/Testimonial.js');
const Faq = require('../model/Faq.js');
const Office = require('../model/Office.js');
const Mailer = require('../mailer.js');
const { isValidObjectId, default: mongoose } = require('mongoose');


// create Page 

exports.addPage = catchAsync(async (req, res, next) => {



    const page = await Page.create(req.body)

    res.status(201).json({
        status: 'success',
        data: {
            page,
            message: "Page Added"
        }
    })
});

// Get All page data

exports.getAllPages = catchAsync(async (req, res, next) => {

    const type = req.query
    const page = await Page.find(type);

    res.status(201).json({
        status: 'success',
        data: {
            page,
            message: "Page info"
        }
    })
});

// for get single pageinfo - controller

exports.getSiglePage = catchAsync(async (req, res, next) => {

    const id = req.params.id;

    const page = await Page.findOne({ id })

    res.status(201).json({
        status: 'success',
        data: {
            page,
            message: "Page info"
        }
    })
});


exports.getSiglePageByName = catchAsync(async (req, res, next) => {

    const pageName = req.params.name;

    const page = await Page.findOne({ pageName: pageName })

    res.status(201).json({
        status: 'success',
        data: {
            page,
            message: "Page info"
        }
    })
});

// for updat Page info - controller

exports.updatePageInfo = catchAsync(async (req, res, next) => {

    const id = req.params.id;

    if (req.files) {
        const { file, file2, file3 } = req.files;
        if (file) req.body.image = file[0].filename;

        if (file2) req.body.image2 = file2[0].filename;

        if (file3) req.body.image3 = file3[0].filename;

    }
    const page = await Page.findByIdAndUpdate(id, req.body);

    if (!page) {
        return next(new AppError("page not found", 404))
    }

    res.status(201).json({
        status: 'success',
        data: {
            page,
            message: "Page info updated"
        }
    })
});


// jobs controller ..........Are Following............


// add job 

exports.addJob = catchAsync(async (req, res, next) => {

    const job = await Jobe.create(req.body)

    res.status(201).json({
        status: 'success',
        data: {
            job,
            message: "Job Added"
        }
    })
});


//get All jobs

exports.getAllJobs = catchAsync(async (req, res, next) => {

    const jobs = await Jobe.find();

    res.status(201).json({
        status: 'success',
        data: {
            jobs,
            message: "jobs info"
        }
    })
});

// for get single job info - controller

exports.getSigleJob = catchAsync(async (req, res, next) => {

    const id = req.params.id;

    const job = await Jobe.findById(id)

    res.status(201).json({
        status: 'success',
        data: {
            job,
            message: "Job info"
        }
    })
});

// for updat job info - controller

exports.updateJobInfo = catchAsync(async (req, res, next) => {

    const id = req.params.id;

    const job = await Jobe.findByIdAndUpdate(id, req.body);

    if (!job) {
        return next(new AppError("job not found", 404))
    }

    res.status(201).json({
        status: 'success',
        data: {
            job,
            message: "job info updated"
        }
    })
});

exports.deleteJobInfo = catchAsync(async (req, res, next) => {
    try {

        const id = req.params.id;
        const job = await Jobe.findByIdAndDelete(id);

        res.status(201).json({
            status: 'success',
            data: {
                message: 'delete '
            }
        })


    } catch (error) {
        res.status(501).json({
            status: 'fail',
            data: {
                message: error.message
            }
        })
    }
})


// Form Controller...........Are Following**************************************************************************************


// add Form 

exports.createForme = catchAsync(async (req, res, next) => {
    if (req.file) req.body.file = req.file.filename;
    const form = await Forme.create(req.body);
    const data = {
        name: req.body.name
    };
    if (req.body.type === "contact") {
        Mailer.send(req.body.email, 'Thanks for connecting me with us', 'form-submit-reply-saas-tile', data);
    };
    res.status(201).json({
        status: 'success',
        data: {
            form,
            message: "Form Added"
        }
    })
});


//get All forme

exports.getAllForme = catchAsync(async (req, res, next) => {
    const formType = req.query

    const form = await Forme.find(formType);

    res.status(201).json({
        status: 'success',
        data: {
            form,
            message: "form info"
        }
    })
});

// for get single Forme info - controller

exports.getSingleForme = catchAsync(async (req, res, next) => {

    const id = req.params.id;

    const forme = await Forme.findById(id)

    res.status(201).json({
        status: 'success',
        data: {
            forme,
            message: "forme info"
        }
    })
});

// for updat job info - controller

exports.updateFormeInfo = catchAsync(async (req, res, next) => {

    const id = req.params.id;

    const forme = await Forme.findByIdAndUpdate(id, req.body);


    res.status(201).json({
        status: 'success',
        data: {
            forme,
            message: "job info updated"
        }
    })
});

exports.deleteForme = catchAsync(async (req, res, next) => {
    try {

        const id = req.params.id;
        const forme = await Forme.findByIdAndDelete(id);

        res.status(201).json({
            status: 'success',
            data: {
                message: 'delete contect forme'
            }
        })


    } catch (error) {
        res.status(501).json({
            status: 'fail',
            data: {
                message: error.message
            }
        })
    }
})



// Testimonial controller start ****************************************************************************

// add testimonial 

exports.addTestimonial = catchAsync(async (req, res, next) => {
    if (req.file) req.body.image = req.file.filename;
    const testimonial = await Testimonial.create(req.body)

    res.status(201).json({
        status: 'success',
        data: {
            testimonial,
            message: "Testimonial Added"
        }
    })
});


//get All Testimonial

exports.getAllTestimonial = catchAsync(async (req, res, next) => {
    const query = req.query;
    const testimonial = await Testimonial.find(query);

    res.status(201).json({
        status: 'success',
        data: {
            testimonial,
            message: "Testimonial info"
        }
    })
});



// for updat testimonial info - controller

exports.updateTestimonial = catchAsync(async (req, res, next) => {
    if (req.file) req.body.image = req.file.filename;
    const id = req.params.id;

    const testimonial = await Testimonial.findByIdAndUpdate(id, req.body);


    res.status(201).json({
        status: 'success',
        data: {
            testimonial,
            message: "Testimonial info updated"
        }
    })
});

exports.getTestimonialById = catchAsync(async (req, res, next) => {

    const id = req.params.id;

    const testimonial = await Testimonial.findById(id);


    res.status(201).json({
        status: 'success',
        data: {
            testimonial,
            message: "Testimonial info "
        }
    })
});

exports.deleteTestimonial = catchAsync(async (req, res, next) => {
    try {

        const id = req.params.id;
        const testimonial = await Testimonial.findByIdAndDelete(id);

        res.status(201).json({
            status: 'success',
            data: {
                message: 'delete contect forme'
            }
        })


    } catch (error) {
        res.status(501).json({
            status: 'fail',
            data: {
                message: error.message
            }
        })
    }
})


// Testimonial controller start ****************************************************************************

// add testimonial 

exports.addFaq = catchAsync(async (req, res, next) => {

    const faq = await Faq.create(req.body)

    res.status(201).json({
        status: 'success',
        data: {
            faq,
            message: "Faq Added"
        }
    })
});


//get All Testimonial

exports.getAllFaq = catchAsync(async (req, res, next) => {

    const category = req.query;
    const faq = await Faq.find(category);

    res.status(201).json({
        status: 'success',
        data: {
            faq,
            message: "Faq info"
        }
    })
});


exports.deleteFaq = catchAsync(async (req, res, next) => {
    try {

        const id = req.params.id;
        const faq = await Faq.findByIdAndDelete(id);

        res.status(201).json({
            status: 'success',
            data: {
                message: 'delete contect forme'
            }
        })


    } catch (error) {
        res.status(501).json({
            status: 'fail',
            data: {
                message: error.message
            }
        })
    }
})

// Testimonial controller start ****************************************************************************

// add testimonial 

exports.addOffice = catchAsync(async (req, res, next) => {
    if (req.file) req.body.OfficeLogo = req.file.filename;
    const office = await Office.create(req.body)

    res.status(201).json({
        status: 'success',
        data: {
            office,
            message: "Testimonial Added"
        }
    })
});


//get All Testimonial

exports.getAllOffice = catchAsync(async (req, res, next) => {
    const query = req.query;
    const office = await Office.find(query);

    res.status(201).json({
        status: 'success',
        data: {
            office,
            message: "Testimonial info"
        }
    })
});



// for updat testimonial info - controller

exports.updateOffice = catchAsync(async (req, res, next) => {
    if (req.file) req.body.OfficeLogo = req.file.filename;
    const id = req.params.id;

    const office = await Office.findByIdAndUpdate(id, req.body);


    res.status(201).json({
        status: 'success',
        data: {
            office,
            message: "Testimonial info updated"
        }
    })
});

exports.getOfficeId = catchAsync(async (req, res, next) => {

    const id = req.params.id;

    const office = await Office.findById(id);


    res.status(201).json({
        status: 'success',
        data: {
            office,
            message: "Testimonial info "
        }
    })
});

exports.deleteOffice = catchAsync(async (req, res, next) => {
    try {

        const id = req.params.id;
        const office = await Office.findByIdAndDelete(id);

        res.status(201).json({
            status: 'success',
            data: {
                message: 'delete contect forme'
            }
        })


    } catch (error) {
        res.status(501).json({
            status: 'fail',
            data: {
                message: error.message
            }
        })
    }
})

