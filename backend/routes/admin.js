import { Router } from 'express';
import {
    Admin,
    AdminOtpCollection,
    FoodBank,
    MembershipForm,
    RegForm,
    VolunteerApp,
} from '../db/index.js';
import otpGenerator from 'otp-generator'
import { signinSchema, signupSchema } from '../utils/zodSchemas.js';
import ExcelJS from 'exceljs/dist/es5/exceljs.browser.js';
import adminMiddleware from '../middleware/adminMiddleware.js';
import bcrypt from 'bcryptjs'
import 'dotenv/config';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/sign-in', async (req, res) => {
    const { success } = await signinSchema.safeParse(req.body);
    if (!success) {
        res.status(400).json({
            message: 'Incorrect Inputs',
        });
    } else {
        try {
            const { username, password } = req.body;
            const adminCheck = await Admin.findOne({ username });
            if (adminCheck) {
                const isValid = await bcrypt.compare(
                    password,
                    adminCheck.password
                );
                if (isValid) {
                    const token = jwt.sign(
                        {
                            username: req.body.username,
                        },
                        process.env.JWT_ADMIN_SECRET
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

router.post('/sign-up',adminMiddleware, async (req, res) => {
    const { username, password, otp } = req.body;
    const { success } = await signupSchema.safeParse(req.body);
    if (!success) {
        res.status(400).json({
            message: 'incorrect inputs',
        });
    } else if (await Admin.findOne({ username })) {
        res.status(409).json({
            message: 'Admin already exists',
        });
    } else {
        try {
            const response = await AdminOtpCollection.find({ username })
                .sort({ createdAt: -1 })
                .limit(1);
            if (response.length === 0 || otp !== response[0].otp) {
                return res.status(400).json({
                    success: false,
                    message: 'The OTP is not valid',
                });
            }
            const hash = await bcrypt.hash(password, 10);
            const admin = new Admin({ username, password: hash });
            await admin.save();
            const token = jwt.sign(
                {
                    username,
                },
                process.env.JWT_ADMIN_SECRET
            );
            res.json({
                message: 'Admin account created successfully!',
                token: token,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error });
        }
    }
});

router.post('/send-otp', async (req, res) => {
    try {
        const { username } = req.body;
    let otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
    });
    let result = await AdminOtpCollection.findOne({ otp: otp });
    while (result) {
        otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        result = await AdminOtpCollection.findOne({ otp: otp });
    }
    const otpBody = await AdminOtpCollection.create({ username, otp });
    res.json({
        success: true,
        message: 'OTP sent successfully',
    });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
        });
    }
    
});

router.post('/me', adminMiddleware, (req, res) => {
    res.json({
        username: req.username,
    });
});

router.post('/forgot-password', async (req, res) => {
    try {
        const { username, password, otp } = req.body;
        const { success } = await signupSchema.safeParse(req.body);
        if (!success) {
            return res.status(400).json({
                message: 'Invalid Inputs',
            });
        } else if (!(await Admin.findOne({ username }))) {
            return res.status(404).json({ message: 'Admin not Found' });
        } else {
            const response = await AdminOtpCollection.find({ username })
                .sort({ createdAt: -1 })
                .limit(1);
            if (response.length === 0 || otp !== response[0].otp) {
                return res.status(400).json({
                    success: false,
                    message: 'The OTP is not valid',
                });
            }
            const hash = await bcrypt.hash(password, 10);
            const admin = await Admin.findOne({ username });
            admin.password = hash;
            await admin.save();
            return res.json({ message: 'Password updated successfully!' });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
        });
    }
});

router.get('/download/:filename', adminMiddleware, async (req, res) => {
    switch (req.params.filename) {
        case 'registrations':
            const regWorkbook = new ExcelJS.Workbook();
            const regForms = regWorkbook.addWorksheet('Registration Forms');
            try {
                const regFormResponse = await RegForm.find({});
                regForms.columns = [
                    { header: 'S No.', key: 's_no', width: 6 },
                    { header: 'Full Name', key: 'name', width: 20 },
                    { header: 'Phone', key: 'phone', width: 12 },
                    { header: 'Email', key: 'email', width: 20 },
                    {
                        header: 'Preferred Method of Communication',
                        key: 'prefCommunicationStr',
                        width: 34,
                    },
                    { header: 'TCHC or NTCHC', key: 'housing', width: 20 },
                    { header: 'Copying', key: 'Copying', width: 8 },
                    { header: 'Printing', key: 'Printing', width: 9 },
                    { header: 'Faxing', key: 'Faxing', width: 7 },
                    { header: 'Taxes', key: 'Taxes', width: 6 },
                    {
                        header: 'Computer usage',
                        key: 'Computer-usage',
                        width: 15,
                    },
                    {
                        header: 'Food Bank Registration',
                        key: 'Food-Bank-Registration',
                        width: 23,
                    },
                    {
                        header: 'Volunteer Application',
                        key: 'Volunteer-Application',
                        width: 22,
                    },
                    {
                        header: 'Program Registration',
                        key: 'Program-Registration',
                        width: 21,
                    },
                    { header: 'Appointment', key: 'Appointment', width: 30 },
                ];
                let counter_reg = 1;
                regFormResponse.forEach((user) => {
                    user.s_no = counter_reg;
                    if (user.prefCommunication.length === 0) {
                        var prefCommStr = '';
                    } else if (user.prefCommunication.length === 1) {
                        var prefCommStr = user.prefCommunication[0];
                    } else if (user.prefCommunication.length === 2) {
                        var prefCommStr = `${user.prefCommunication[0]} or ${user.prefCommunication[1]}`;
                    } else {
                        var prefCommStr = `${user.prefCommunication[0]}, ${user.prefCommunication[1]} or ${user.prefCommunication[2]}`;
                    }
                    const servicesObj = user.service.reduce((obj, item) => {
                        if (item.includes(' ')) {
                            item = item.split(' ').join('-');
                        }
                        obj[item] = 'Yes';
                        return obj;
                    }, {});
                    const formattedObj = {
                        ...user._doc,
                        ...servicesObj,
                        prefCommunicationStr: prefCommStr,
                        s_no: counter_reg,
                    };
                    regForms.addRow(formattedObj);
                    counter_reg++;
                });
                res.setHeader(
                    'Content-Disposition',
                    'attachment; filename=Registrations.xlsx'
                );
                res.setHeader(
                    'Content-Type',
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                );
                await regWorkbook.xlsx.write(res);
                res.end();

                // const file = await workbook.xlsx.writeFile('./ExcelExports/Registrations.xlsx')
            } catch (error) {
                console.log(error.message);
            }
            break;
        case 'memberships':
            try {
                const memberWorkbook = new ExcelJS.Workbook();
                const memberForms =
                    memberWorkbook.addWorksheet('Membership Forms');
                const memFormResponse = await MembershipForm.find({});
                memberForms.columns = [
                    { header: 'S No.', key: 's_no', width: 6 },
                    {
                        header: 'Membership Type',
                        key: 'membershipType',
                        width: 15,
                    },
                    { header: 'Form Type', key: 'formType', width: 25 },
                    {
                        header: 'Organization Name',
                        key: 'organizationName',
                        width: 25,
                    },
                    { header: 'Address', key: 'address', width: 30 },
                    { header: 'City', key: 'city', width: 15 },
                    { header: 'Postal Code', key: 'postalCode', width: 12 },
                    { header: 'Phone', key: 'phone', width: 15 },
                    { header: 'Fax', key: 'fax', width: 15 },
                    { header: 'Email', key: 'email', width: 25 },
                    { header: 'Website', key: 'website', width: 25 },
                    {
                        header: 'Executive Director',
                        key: 'execDirector',
                        width: 20,
                    },
                    {
                        header: 'Contact Person',
                        key: 'contactPerson',
                        width: 20,
                    },
                    { header: 'Position', key: 'position', width: 15 },
                    {
                        header: 'Contact Address and City',
                        key: 'contactAddressCity',
                        width: 30,
                    },
                    {
                        header: 'Contact Postal Code',
                        key: 'contactPostalCode',
                        width: 15,
                    },
                    { header: 'Contact Phone', key: 'contactPhone', width: 15 },
                    { header: 'Contact Email', key: 'contactEmail', width: 25 },
                    {
                        header: 'Representative Name',
                        key: 'representativeName',
                        width: 20,
                    },
                    {
                        header: 'Representative Date',
                        key: 'representativeDate',
                        width: 15,
                    },
                    {
                        header: 'Payment Method',
                        key: 'paymentMethod',
                        width: 15,
                    },
                    { header: 'Payment Done', key: 'paymentDone', width: 12 },
                    {
                        header: 'Declaration',
                        key: 'declarationString',
                        width: 12,
                    },
                    { header: 'Place', key: 'place', width: 15 },
                    { header: 'Date', key: 'date', width: 15 },
                ];
                let counter_mem = 1;
                memFormResponse.forEach((item) => {
                    item.s_no = counter_mem;
                    item.declarationString = item.declaration ? 'Yes' : 'No';
                    memberForms.addRow(item);
                    counter_mem++;
                });
                res.setHeader(
                    'Content-Disposition',
                    'attachment; filename=Membership_Forms.xlsx'
                );
                res.setHeader(
                    'Content-Type',
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                );
                await memberWorkbook.xlsx.write(res);
                res.end();
            } catch (error) {
                console.log(error.message);
            }
            break;
        case 'volunteers':
            try {
                const volunteerWorkbook = new ExcelJS.Workbook();
                const volunteerApps =
                    volunteerWorkbook.addWorksheet('Membership Forms');
                const volunteerAppsResponse = await VolunteerApp.find({});

                volunteerApps.columns = [
                    { header: 'S No.', key: 's_no', width: 6 },
                    { header: 'Name', key: 'name', width: 20 },
                    { header: 'Address', key: 'address', width: 30 },
                    { header: 'Phone', key: 'phone', width: 15 },
                    { header: 'Email', key: 'email', width: 25 },
                    {
                        header: 'Preferred Communication',
                        key: 'prefCommunication',
                        width: 20,
                    },
                    {
                        header: 'Age Less Than 18',
                        key: 'ageLessThan18',
                        width: 18,
                    },
                    {
                        header: 'Areas of Interest',
                        key: 'areasOfInterest',
                        width: 25,
                    },
                    {
                        header: 'Rank Areas of Interest',
                        key: 'rankAreasOfInterest',
                        width: 20,
                    },
                    {
                        header: 'Volunteer Experience Source',
                        key: 'volunteerExperienceSource',
                        width: 25,
                    },
                    {
                        header: 'Reason for Volunteering',
                        key: 'reason',
                        width: 30,
                    },
                    {
                        header: 'Interest Related Experiences',
                        key: 'interestRelatedExperiences',
                        width: 40,
                    },
                    {
                        header: 'Days Available',
                        key: 'daysAvailable',
                        width: 20,
                    },
                    {
                        header: 'Times Available',
                        key: 'timesAvailable',
                        width: 20,
                    },
                    {
                        header: 'Emergency Contact Name',
                        key: 'emergencyContactName',
                        width: 20,
                    },
                    {
                        header: 'Emergency Contact Phone',
                        key: 'emergencyContactPhone',
                        width: 20,
                    },
                    {
                        header: 'Emergency Contact Type',
                        key: 'emergencyContactType',
                        width: 20,
                    },
                    { header: 'References', key: 'references', width: 30 },
                    { header: 'Version', key: 'version', width: 8 },
                ];

                const rows = volunteerAppsResponse.map((item, index) => {
                    const {
                        emergencyContact,
                        references,
                        daysAvailable,
                        timesAvailable,
                        ageLessThan18,
                        ...rest
                    } = item._doc;

                    const formattedReferences =
                        references
                            .map((ref) => `${ref.name} (${ref.phone})`)
                            .join(', ') || '';

                    return {
                        s_no: index + 1,
                        emergencyContactName: emergencyContact?.name || '',
                        emergencyContactPhone: emergencyContact?.phone || '',
                        emergencyContactType: emergencyContact?.type || '',
                        references: formattedReferences,
                        daysAvailable: daysAvailable.join(', '),
                        timesAvailable: timesAvailable.join(', '),
                        ageLessThan18: ageLessThan18 ? 'Yes' : 'No',
                        ...rest,
                    };
                });

                volunteerApps.addRows(rows);

                res.setHeader(
                    'Content-Disposition',
                    'attachment; filename=Volunteer_Applications.xlsx'
                );
                res.setHeader(
                    'Content-Type',
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                );
                await volunteerWorkbook.xlsx.write(res);
                res.end();
            } catch (error) {
                console.error(
                    'Error generating volunteer applications:',
                    error.message
                );
                res.status(500).send('Internal Server Error');
            }
            break;
        case 'foodbank':
            try {
                const foodBankWorkbook = new ExcelJS.Workbook();
                const foodBankSheet =
                    foodBankWorkbook.addWorksheet('Food Bank Data');

                foodBankSheet.columns = [
                    { header: 'S No.', key: 's_no', width: 6 },
                    { header: 'Name', key: 'name', width: 20 },
                    { header: 'Address', key: 'address', width: 30 },
                    { header: 'City', key: 'city', width: 20 },
                    { header: 'Postal Code', key: 'postalCode', width: 15 },
                    { header: 'Phone', key: 'phone', width: 15 },
                    { header: 'Income Source', key: 'incomeSource', width: 25 },
                    {
                        header: 'First Language',
                        key: 'firstLanguage',
                        width: 20,
                    },
                    { header: 'Count Adults', key: 'countAdults', width: 15 },
                    {
                        header: 'Count Children',
                        key: 'countChildren',
                        width: 15,
                    },
                    { header: 'Background', key: 'background', width: 30 },
                    { header: 'Restrictions', key: 'restrictions', width: 30 },
                    {
                        header: 'Person of Color',
                        key: 'personOfColor',
                        width: 15,
                    },
                    { header: 'Disabled', key: 'disabled', width: 15 },
                    {
                        header: 'Less Than 10 Years',
                        key: 'lessThan10Years',
                        width: 20,
                    },
                    {
                        header: 'Entry in Canada',
                        key: 'entryInCanada',
                        width: 20,
                    },
                    { header: 'Family Members', key: 'family', width: 60 },
                ];

                const foodBankData = await FoodBank.find({});

                let counter = 1;
                foodBankData.forEach((item) => {
                    const familyMembers = item.family
                        .map(
                            (member) =>
                                `Name: ${member.name}, Gender: ${member.gender}, Relationship: ${member.relationship}, Birthdate: ${member.birthdate}`
                        )
                        .join('; ');

                    foodBankSheet.addRow({
                        s_no: counter,
                        name: item.name,
                        address: item.address,
                        city: item.city,
                        postalCode: item.postalCode,
                        phone: item.phone,
                        incomeSource: item.incomeSource,
                        firstLanguage: item.firstLanguage,
                        countAdults: item.countAdults,
                        countChildren: item.countChildren,
                        background: item.background,
                        restrictions: item.restrictions.join(', '),
                        personOfColor: item.personOfColor ? 'Yes' : 'No',
                        disabled: item.disabled ? 'Yes' : 'No',
                        lessThan10Years: item.lessThan10Years ? 'Yes' : 'No',
                        entryInCanada: item.entryInCanada,
                        family: familyMembers,
                    });
                    counter++;
                });

                res.setHeader(
                    'Content-Disposition',
                    'attachment; filename=Food_Bank_Data.xlsx'
                );
                res.setHeader(
                    'Content-Type',
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                );

                await foodBankWorkbook.xlsx.write(res);
                res.end();
            } catch (error) {
                console.log(error.message);
                res.status(500).send(
                    'An error occurred while generating the Excel file.'
                );
            }

            break;
        default:
            res.status(404).json({
                message: 'Invalid Filename. Please check URL',
            });
            break;
    }
});

router.get('/:typeOfForm',adminMiddleware, async (req, res) => {
    try {
        switch (req.params.typeOfForm) {
            case 'registration-forms':
                const regForms = await RegForm.find({});
                if (regForms.count !== 0) {
                    res.json(regForms);
                } else {
                    res.status(404).json({
                        message: 'No registration forms found.',
                    });
                }
                break;
            case 'membership-forms':
                try {
                    const memberForms = await MembershipForm.find({});
                    if (memberForms.count !== 0) {
                        res.json(memberForms);
                    } else {
                        res.status(404).json({
                            message: 'No membership forms found.',
                        });
                    }
                } catch (error) {
                    res.status(500).json({
                        message:
                            error.response.data.message ||
                            'An error occurred. Please try again.',
                    });
                }

                break;
            case 'volunteer-forms':
                try {
                    const volunteerForms = await VolunteerApp.find({});
                    if (volunteerForms.count !== 0) {
                        res.json(volunteerForms);
                    } else {
                        res.status(404).json({
                            message: 'No volunteer forms found.',
                        });
                    }
                } catch (error) {
                    res.status(500).json({
                        message:
                            error.response.data.message ||
                            'An error occurred. Please try again.',
                    });
                }

                break;

            case 'foodbank-forms':
                try {
                    const foodBankForms = await FoodBank.find({});
                    if (foodBankForms.count !== 0) {
                        res.json(foodBankForms);
                    } else {
                        res.status(404).json({
                            message: 'No food bank forms found.',
                        });
                    }
                } catch (error) {
                    res.status(500).json({
                        message:
                            error.response.data.message ||
                            'An error occurred. Please try again.',
                    });
                }

                break;
            default:
                res.status(404).json({
                    message:
                        'Please check query parameter. It should be either registration-forms, membership-forms or volunteer-forms',
                });
                break;
        }
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
        console.log(error.message);
    }
});

router.delete('/:typeOfForm/:id', adminMiddleware, async (req, res) => {
    try {
        switch (req.params.typeOfForm) {
            case 'registration':
                const regFormItem = await RegForm.deleteOne({ _id: req.params.id });
                if (regFormItem.deletedCount === 0) {
                    return res.status(404).json({ message: 'Record not found' });
                }
                res.json({ message: 'Record deleted successfully' });
                break;
            case 'membership':
                const memItem = await MembershipForm.deleteOne({ _id: req.params.id });
                if (memItem.deletedCount === 0) {
                    return res.status(404).json({ message: 'Record not found' });
                }
                res.json({ message: 'Record deleted successfully' });
                break;
            case 'volunteer':
                const volItem = await VolunteerApp.deleteOne({ _id: req.params.id });
                if (volItem.deletedCount === 0) {
                    return res.status(404).json({ message: 'Record not found' });
                }
                res.json({ message: 'Record deleted successfully' });
                break;
            case 'foodbank':
                const foodbankItem = await FoodBank.deleteOne({ _id: req.params.id });
                if (foodbankItem.deletedCount === 0) {
                    return res.status(404).json({ message: 'Record not found' });
                }
                res.json({ message: 'Record deleted successfully' });
                break;
            default:
                res.status(404).json({message: "Invalid path variable, check URL."})
                break;
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting document',
        });
    }
});

export default router;
