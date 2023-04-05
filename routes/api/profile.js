const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const request = require('request');
const config = require('config');
// to debug
// 1)social in profile

// router GET api/profile/me
// desc
// access
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );

    if (!profile) {
      return res
        .status(400)
        .json({ msg: 'There is no profile for this user!' });
    }
    // res.send(req);
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// router POST api/profile/me
// desc  create or update user profile
// access private

router.post(
  '/',
  auth,
  [
    check('status', 'status required').not().isEmpty(),
    check('skills', 'skills is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    // building profile object
    const profileField = {};

    profileField.user = req.user.id;

    if (company) profileField.company = company;
    if (website) profileField.website = website;
    if (location) profileField.location = location;
    if (bio) profileField.bio = bio;
    if (status) profileField.status = status;
    if (githubusername) profileField.githubusername = githubusername;
    if (skills) {
      profileField.skills = skills.split(',').map((skill) => skill.trim());
    }

    profileField.social = {};

    if (youtube) profileField.youtube = youtube;
    if (twitter) profileField.twitter = twitter;
    if (facebook) profileField.facebook = facebook;
    if (linkedin) profileField.linkedin = linkedin;
    if (instagram) profileField.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileField },
          { new: true }
        );
        return res.json(profile);
      }
      // create
      profile = new Profile(profileField);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
// @route GET api/profile
// @desc  Get all profile
// @access public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server Error');
  }
});

// @route GET api/profile/user/user_id
// @desc  Get profile by user_id
// @access public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.find({ user: req.params.user_id }).populate(
      'user',
      ['name', 'avatar']
    );

    if (!profile) return res.status(400).json({ msg: 'Profile not found!!' });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      console.log(err.kind);
      return res.status(400).json({ msg: 'Profile not found!' });
    }
    res.status(500).send('server Error');
  }
});

// @route DELETE api/profile
// @desc  Get profile,user & post
// @access public

router.delete('/', auth, async (req, res) => {
  try {
    // @todo - romove user post

    // remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // remove user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'user deleted!' });
  } catch (err) {
    // console.log(err.message);
    console.error(err.message);
    res.status(500).send('server Error');
  }
});

// @route PUT api/profile/experience
// @desc  ADD profile experience
// @access private
// @todo update experience

router.put('/experience', [
  auth,
  [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, company, location, from, to, current, description } =
      req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      // console.log(profile.experience);
      profile.experience.unshift(newExp);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server Error');
    }
  },
]);

// @route delete api/profile/experience
// @desc  delete experience from profile
// @access private

router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // get the romove index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// @route PUT api/profile/education
// @desc  ADD profile education
// @access private
// @todo update education
// not working
// router.put('/education', [
//   auth,
//   [
//     check('school', 'school is required').not().isEmpty(),
//     check('degree', 'degree is required').not().isEmpty(),
//     check('fieldofstudy', 'fieldofstudy date is required').not().isEmpty(),
//     check('from', 'From date is required').not().isEmpty(),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { school, degree, fieldofstudy, from, to, current, description } =
//       req.body;
//     const newEdu = {
//       school,
//       degree,
//       fieldofstudy,
//       from,
//       to,
//       current,
//       description,
//     };

//     try {
//       // console.log(newEdu);
//       const profile = await Profile.findOne({ user: req.user.id });
//       console.log(profile.education);
//       profile.education.unshift(newEdu);

//       console.log(profile);

//       await profile.save();

//       res.json(profile);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('server Error');
//     }
//   },
// ]);

// // @route delete api/profile/education/edu_id
// // @desc  delete education from profile
// // @access private

// router.delete('/education/:edu_id', auth, async (req, res) => {
//   try {
//     const profile = await Profile.findOne({ user: req.user.id });

//     // get the romove index
//     const removeIndex = profile.education
//       .map((item) => item.id)
//       .indexOf(req.params.edu_id);

//     profile.education.splice(removeIndex, 1);
//     await profile.save();

//     res.json(profile);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// @route GET api/profile/github/:username
// @desc  Get user repos from Github
// @access public

router.get('/github/:username', (req, res) => {
  try {
    const options = {
      // uri='https'
    };
  } catch (err) {
    console.log(err.message);
    res.status(500).send('server error');
  }
});

module.exports = router;
