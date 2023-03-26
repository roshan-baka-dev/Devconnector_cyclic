const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

// router GET api/users

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'please include a valid email').isEmail(),
    check(
      'password',
      'please enter a password with 6 or more character'
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    res.send('User route');
  }
);

module.exports = router;
