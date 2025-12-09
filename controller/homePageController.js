const catchAsync = require("../util/catchAsync");
const HomePage = require('../model/homePage');

exports.editHomepage = catchAsync(async (req, res, next) => {
    try {
        if (req.file) req.body.image = req.file.filename;
        let finalbody = {
            ...req.body,
            createdBy: req.user.name
        }
        if (req.query.isEditable === "true") {
            const homePageContnetEdit = await HomePage.findOneAndUpdate(finalbody);
            if (!homePageContnetEdit || !Object.keys(homePageContnetEdit)?.length) {
                return res.status(500).json({
                    status: 'faild',
                    data: {},
                    message: "internal server error"
                })
            }
            return res.status(200).json({
                status: 'success',
                data: { ...homePageContnetEdit },
                message: "Home Page updated"
            })
        }
        const homePageCreated = await HomePage.create(finalbody);
        if (!homePageCreated || !Object.keys(homePageCreated).length) {
            return res.status(500).json({
                status: 'faild',
                data: {},
                message: "internal server error"
            })
        }
        res.status(200).json({
            status: 'success',
            data: { ...homePageCreated },
            message: "Home Page created"
        })
    } catch (error) {
        console.log(error, "--error");

    }
});
exports.getHomePageDetails = catchAsync(async (req, res) => {
    try {
        const getAllHomePageConent = await HomePage.findOne({});
        if (!getAllHomePageConent || !Object.keys(getAllHomePageConent).length) {
            return res.status(500).json({
                status: 'faild',
                data: {},
                message: "data not found"
            })
        }
        return res.status(200).json({
            status: 'success',
            data: getAllHomePageConent,
            message: "Home Page details retuend"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'faild',
            data: {},
            message: "internal server error"
        })
    }
})