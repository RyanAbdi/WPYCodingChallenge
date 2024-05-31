const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { check, validationResult } = require('express-validator');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/submit', [
    check('firstName')
        .isString().withMessage('First Name must be a string')
        .isLength({ max: 255 }).withMessage('First Name must be less than 255 characters'),
    check('lastName')
        .isString().withMessage('Last Name must be a string')
        .isLength({ max: 255 }).withMessage('Last Name must be less than 255 characters'),
    check('email')
        .isEmail().withMessage('Invalid email address'),
    check('password')
        .isStrongPassword().withMessage('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol'),
    check('phoneNumber')
        .matches(/^(\d{3}-\d{3}-\d{4}|\d{10})$/).withMessage('Invalid phone number'), //123-123-4567
    check('address')
        .isString().withMessage('Address must be a string')
        .isLength({ max: 255 }).withMessage('Address must be less than 255 characters'),
    check('city')
        .isString().withMessage('City must be a string')
        .isLength({ max: 255 }).withMessage('City must be less than 255 characters'),
    check('province')
        .isIn([
            'AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'ON', 'PE', 'QC', 'SK',
            'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA',
            'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK',
            'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
        ]).withMessage('Invalid province or state'),
    check('country')
        .isIn(['Canada', 'USA']).withMessage('Invalid country')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, phoneNumber, address, city, province, country } = req.body;
    res.json({
        message: 'Submission successful',
        data: {
            firstName,
            lastName,
            email,
            phoneNumber,
            address,
            city,
            province,
            country
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
