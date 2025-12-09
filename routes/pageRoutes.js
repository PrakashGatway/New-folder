const express = require('express');
const pageController = require('../controller/pageController');
const homePageEditController = require('../controller/homePageController');
const mediaController = require('../controller/mediaController');
const blogController = require('../controller/blogController');
const adminController = require('../controller/adminController');
const { getSpokenEnglishDetails, editSpokenEnglishDetails } = require('../controller/spokenEnglish');


const router = express.Router();

// Home Page Edit router

router
  .route('/home-edit')
  .get(homePageEditController.getHomePageDetails)
  .post(adminController.isAuth, mediaController.uploadSingleUserPhoto, homePageEditController.editHomepage)

router
  .route('/spoken-english-edit')
  .get(getSpokenEnglishDetails)
  .post(adminController.isAuth, mediaController.uploadMultipleMedia, editSpokenEnglishDetails)

// page routes *****************************************************************
router
  .route('/page/')
  .get(pageController.getAllPages)
  .post(adminController.isAuth, mediaController.uploadUserPhoto, pageController.addPage);


router
  .route('/page/:id')
  .get(pageController.getSiglePage)
  .patch(adminController.isAuth, mediaController.uploadUserPhoto, pageController.updatePageInfo)

router
  .route('/page/course/:name')
  .get(pageController.getSiglePageByName)



// forme routes *****************************************************************
router
  .route('/form/')
  .get(adminController.isAuth, pageController.getAllForme)
  .post(mediaController.uploadSingleUserPhoto, pageController.createForme);


router
  .route('/form/:id')
  .get(adminController.isAuth, pageController.getSingleForme)
  .patch(adminController.isAuth, pageController.updateFormeInfo)
  .delete(adminController.isAuth, pageController.deleteForme)


// Jobs routes *********************************************************************
router
  .route('/job/')
  .get(pageController.getAllJobs)
  .post(adminController.isAuth, pageController.addJob);


router
  .route('/job/:id')
  .get(adminController.isAuth, pageController.getSigleJob)
  .patch(adminController.isAuth, pageController.updateJobInfo)
  .delete(adminController.isAuth, pageController.deleteJobInfo)



// gallary routes *********************************************************************
router
  .route('/gallary/')
  .get(mediaController.getAllMedia)
  .post(adminController.isAuth, mediaController.addMedia);


router
  .route('/gallary/:id')
  .get(adminController.isAuth, mediaController.getSigleMedia)
  .patch(adminController.isAuth, mediaController.updateMedia)



// slider routes *********************************************************************
router
  .route('/slider/')
  .get(mediaController.getAllslider)
  .post(adminController.isAuth, mediaController.uploadSingleUserPhoto, mediaController.addSlider);


router
  .route('/slider/:id')
  .get(mediaController.getSigleslider)
  .patch(adminController.isAuth, mediaController.uploadSingleUserPhoto, mediaController.updateSlider)



// setting routes *********************************************************************
router
  .route('/setting/')
  .get(mediaController.getAllSetting)
  .post(adminController.isAuth, mediaController.uploadSingleUserPhoto, mediaController.addSetting)
  .patch(adminController.isAuth, mediaController.uploadSingleUserPhoto, mediaController.updateSetting)


// Blog routes *********************************************************************
router
  .route('/blog/')
  .get(blogController.getAllblog)
  .post(adminController.isAuth, mediaController.uploadSingleUserPhoto, blogController.addblog);

router
  .route('/get-all-blogs/')
  .get(blogController.getAllblogPaginated);


router
  .route('/blog/:id')
  .get(blogController.getSigleblog)

router
  .route('/edit-blog/:id')
  .get(blogController.GetSigleBlogForEdit)
  .patch(adminController.isAuth, mediaController.uploadSingleUserPhoto, blogController.updateblog)
  .delete(adminController.isAuth, blogController.deleteById)

// Blog routes *********************************************************************
router
  .route('/media/')
  .post(adminController.isAuth, mediaController.uploadSingleUserPhoto, mediaController.addMedia)
  .get(mediaController.getAllMedia)

router
  .route('/media/:id')
  .delete(adminController.isAuth, mediaController.deleteById)

// Blog routes *********************************************************************
router
  .route('/testimonial/')
  .post(adminController.isAuth, mediaController.uploadSingleUserPhoto, pageController.addTestimonial)
  .get(pageController.getAllTestimonial)

router
  .route('/testimonial/:id')
  .get(pageController.getTestimonialById)
  .patch(adminController.isAuth, mediaController.uploadSingleUserPhoto, pageController.updateTestimonial)
  .delete(adminController.isAuth, pageController.deleteTestimonial)

// faq routes *********************************************************************
router
  .route('/faq/')
  .post(adminController.isAuth, pageController.addFaq)
  .get(pageController.getAllFaq)

router
  .route('/faq/:id')
  .delete(adminController.isAuth, pageController.deleteFaq)

//  routes *********************************************************************

router
  .route('/student')
  .post(adminController.isAuth, mediaController.uploadSingleUserPhoto, mediaController.addStudent)
  .get(mediaController.getAllStudent)

router
  .route('/student/:id')
  .get(adminController.isAuth, mediaController.getStudentById)
  .post(adminController.isAuth, mediaController.uploadSingleUserPhoto, mediaController.updateStudentByid)
  .delete(adminController.isAuth, mediaController.deleteStudent)

router
  .route('/member')
  .post(adminController.isAuth, mediaController.uploadSingleUserPhoto, mediaController.addMember)
  .get(mediaController.getAllMember)


router
  .route('/member/:id')
  .get(adminController.isAuth, mediaController.getOneMember)
  .patch(adminController.isAuth, mediaController.uploadSingleUserPhoto, mediaController.updateMember)
  .delete(adminController.isAuth, mediaController.deleteMember)


router
  .route('/office/')
  .post(adminController.isAuth, mediaController.uploadSingleUserPhoto, pageController.addOffice)
  .get(pageController.getAllOffice)

router
  .route('/office/:id')
  .get(pageController.getOfficeId)
  .patch(adminController.isAuth, mediaController.uploadSingleUserPhoto, pageController.updateOffice)
  .delete(adminController.isAuth, pageController.deleteOffice)



router
  .route('/newsletter/')
  .post(adminController.isAuth, mediaController.addEmail)
  .get(mediaController.getAllEmail)

router
  .route('/newsletter/:id')
  .delete(adminController.isAuth, mediaController.deleteNewsEmail)


module.exports = router;