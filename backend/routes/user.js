import { Router } from 'express';
import {
    FoodBank,
    MembershipForm,
    OtpCollection,
    RegForm,
    User,
    VolunteerApp,
} from '../db/index.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import bcrypt from 'bcryptjs';
import otpGenerator from 'otp-generator'
import userMiddleware from '../middleware/userMiddleware.js';
import {
    foodBankSchema,
    membershipFormSchema,
    regFormSchema,
    signinSchema,
    signupSchema,
    volunteerAppSchema,
} from '../utils/zodSchemas.js';

const router = Router(); 

router.post('/sign-up', async (req, res) => {
    const { username, password, otp } = req.body;
    const { success } = await signupSchema.safeParse(req.body);
    if (!success) {
        res.status(400).json({
            message: 'incorrect inputs',
        });
    } else if (await User.findOne({ username })) {
        res.status(409).json({
            message: 'User already exists',
        });
    } else {
        try {
            const response = await OtpCollection.find({ username })
                .sort({ createdAt: -1 })
                .limit(1);
            if (response.length === 0 || otp !== response[0].otp) {
                return res.status(400).json({
                    success: false,
                    message: 'The OTP is not valid',
                });
            }
            const hash = await bcrypt.hash(password, 10);
            const user = new User({ username, password: hash });
            await user.save();
            const token = jwt.sign(
                {
                    username,
                },
                process.env.JWT_SECRET
            );
            res.json({
                message: 'User account created successfully!',
                token: token
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error });
        }
    }
});

router.post('/sign-in', async (req, res) => {
    const { success } = await signinSchema.safeParse(req.body);
    if (!success) {
        res.status(400).json({
            message: 'Incorrect Inputs',
        });
    } else {
        try {
            const { username, password } = req.body;
            const userCheck = await User.findOne({ username });
            if (userCheck) {
                const isValid = await bcrypt.compare(
                    password,
                    userCheck.password
                );
                if (isValid) {
                    const token = jwt.sign(
                        {
                            username: req.body.username,
                        },
                        process.env.JWT_SECRET
                    );
                    res.json({
                        message: 'Signed In Succesfully',
                        token: token,
                    });
                } else {
                    res.status(401).json({ message: 'Incorrect Password' });
                }
            } else {
                res.status(404).json({
                    message: 'Email not found, Please Register.',
                });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
});

router.post('/forgot-password', async (req, res) => {
    try {
        const { username, password, otp } = req.body;
        const { success } = await signupSchema.safeParse(req.body);
        if (!success) {
            return res.status(400).json({
                message: 'Invalid Inputs',
            });
        } else if (!(await User.findOne({ username }))) {
            return res.status(404).json({ message: 'User not Found' });
        } else {
            const response = await OtpCollection.find({ username })
                .sort({ createdAt: -1 })
                .limit(1);
            if (response.length === 0 || otp !== response[0].otp) {
                return res.status(400).json({
                    success: false,
                    message: 'The OTP is not valid',
                });
            }
            const hash = await bcrypt.hash(password, 10);
            const user = await User.findOne({ username });
            user.password = hash;
            await user.save();
            return res.json({ message: 'Password updated successfully!' });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
        });
    }
});

router.post('/registration-form', userMiddleware, async (req, res) => {
    const { success } = await regFormSchema.safeParse(req.body);
    if (!success) {
        res.status(400).json({
            message: 'Invalid Inputs',
        });
    } else {
        try {
            if (req.username !== req.body.email) {
                res.status(404).json({ message: 'User e-mail not found' });
            } else {
                const user = await User.find({ username: req.username });
                let regForm = new RegForm(req.body);
                regForm.userId = user[0]._id;
                
                await regForm.save();
                res.json({
                    message: 'Registration form saved successfully',
                });
            }
        } catch (error) {
            res.status(500).json({
                message: "Couldn't save form",
            });
        }
    }
});

router.post('/membership-form', userMiddleware, async (req, res) => {
    const { success, error } = membershipFormSchema.safeParse(req.body);
    if (!success) {
        res.status(400).json({ message: 'Invalid Inputs' });
        console.log(error)
    } else {
        try {
            const user = await User.find({ username: req.body.email });
            if (user.length === 0) {
                res.status(404).json({ message: 'Email not registered' });
            } else {
                let membershipForm = new MembershipForm(req.body);
                membershipForm.userId = user[0]._id;
                membershipForm.payment.done = false;
                await membershipForm.save();
                res.json({ message: 'Membership form saved successfully' });
            }
        } catch (error) {
            res.status(500).json({
                message: "Couldn't save membership form",
            });
        }
    }
});

router.post('/volunteer-form', userMiddleware, async (req, res) => {
    const { success } = volunteerAppSchema.safeParse(req.body);
    if (!success) {
        res.status(400).json({ message: 'Invalid Inputs' });
    } else {
        try {
            const user = await User.find({ username: req.body.email });
            if (user.length === 0) {
                res.status(404).json({ message: 'Email not registered' });
            } else {
                let volunteerApp = new VolunteerApp(req.body);
                volunteerApp.userId = user[0]._id;
                await volunteerApp.save();
                res.json({
                    message: 'Volunteer application submitted successfully',
                });
            }
        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                message: "Couldn't save volunteer application",
            });
        }
    }
});

router.post('/food-bank',userMiddleware, async (req, res) => {
    const { success, error } = foodBankSchema.safeParse(req.body);
    if (!success) {
        res.status(400).json({ message: 'Invalid Inputs' });
        console.log(error)
    } else {
        try {
            const user = await User.find({ username: req.username });
            if (user.length === 0) {
                res.status(404).json({ message: 'Signed in e-mail not registered' });
            } else {
                let foodBank = new FoodBank(req.body);
                foodBank.userId = user[0]._id;
                await foodBank.save();
                res.json({
                    message: 'Food bank form submitted successfully',
                });
            }
        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                message: "Couldn't save Food Bank Form",
            });
        }
    }
});

router.post('/send-otp', async (req,res)=>{
    const {username} = req.body;
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    let result = await OtpCollection.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false
      });
      result = await OtpCollection.findOne({ otp: otp });
    }
    const otpBody = await OtpCollection.create({username, otp});
    res.json({
      success: true,
      message: 'OTP sent successfully',
    });
  })

router.post('/me', userMiddleware, (req, res) => {
    res.json({
        username: req.username,
    });
});

export default router;
