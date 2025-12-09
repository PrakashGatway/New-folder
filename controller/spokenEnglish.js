const catchAsync = require("../util/catchAsync");
const SpokenEnglish = require('../model/spokenEnglish');

exports.editSpokenEnglishDetails = catchAsync(async (req, res, next) => {
    try {
        req.body.WhyChoose = JSON.parse(req.body.WhyChoose);
        req.body.ComponentsLanguage = JSON.parse(req.body.ComponentsLanguage);

        if (req.files.file?.length && req.files.file?.[0]?.filename) req.body.image = req.files.file[0].filename;

        if (req.files.iconImage && req.files.iconImage.length) {
            req.body.WhyChoose?.forEach((element, index) => {
                if (!element.iconImage) {
                    req.files.iconImage.forEach(vlaue => {
                        element.iconImage = vlaue.filename;
                    });
                }
            });
        };
        let finalbody = {
            ...req.body,
            createdBy: req.user.name
        };
        if (req.query.isEditable === "true") {
            const SpokenEnglishContnetEdit = await SpokenEnglish.findOneAndUpdate(finalbody);
            if (!SpokenEnglishContnetEdit || !Object.keys(SpokenEnglishContnetEdit)?.length) {
                return res.status(500).json({
                    status: 'faild',
                    data: {},
                    message: "internal server error"
                })
            }
            return res.status(200).json({
                status: 'success',
                data: { ...SpokenEnglishContnetEdit },
                message: "Spoken English Page Details updated"
            })
        }
        const homePageCreated = await SpokenEnglish.create(finalbody);
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
            message: "Spoken English Page Details created"
        })
    } catch (error) {
        console.log(error, "--error");

    }
});
exports.getSpokenEnglishDetails = catchAsync(async (req, res) => {
    try {
        const getAllSpokenEnglishConent = await SpokenEnglish.findOne({});
        if (!getAllSpokenEnglishConent || !Object.keys(getAllSpokenEnglishConent).length) {
            return res.status(500).json({
                status: 'faild',
                data: {},
                message: "data not found"
            })
        }
        return res.status(200).json({
            status: 'success',
            data: getAllSpokenEnglishConent,
            message: "Spoken Englih details retuend"
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