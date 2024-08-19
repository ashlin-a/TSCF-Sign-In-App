import mongoose, { Schema, model } from 'mongoose';
import 'dotenv/config';
import { mailSender } from '../utils/mailSender.js';
import bcrypt from 'bcryptjs'

async function connectDB() {
    await mongoose.connect(`${process.env.DB_URL}/signin-app`);
    const firstAdmin = await Admin.find({username: process.env.DEFAULT_ADMIN_USERNAME});
    if (firstAdmin.length !== 0) {
        return;
    } else {
        const hash = await bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD, 10);
        const admin = new Admin({ username:process.env.DEFAULT_ADMIN_USERNAME, password: hash });
        await admin.save();
    }
}
connectDB();

const UserSchema = new Schema({
    username: {
        type: String,   
        required: [true, 'Email address is required'],
        lowercase: true,
        unique: true,
        trim:true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    membershipForm: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'MembershipForm',
    },
    registrationForms: {
        type: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'RegForm' }],
    },
    volunteerApp: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'VolunteerApp',
    },
});

UserSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const AdminSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Email address is required'],
        lowercase: true,
        trim:true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        max: [70, 'Password too long'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

AdminSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const OtpSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim:true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5,
    },
});

async function sendVerificationEmail(username, otp) {
    try {
        const mailResponse = await mailSender(
            username,
            'Verification Email',
            `<h1 style="text-align: center; color: #333;">Please Confirm Your OTP</h1>
<p style="font-size: 20px; text-align: center;">Here is your OTP code: <span style="color: #007BFF; font-weight: bold;">${otp}</span></p>
<p style="text-align: center; color: #555;">Note: This OTP is only valid for 5 minutes.</p>`
        );
    } catch (error) {
        console.log('Error occurred while sending email: ', error);
        throw error;
    }
}

OtpSchema.pre('save', async function (next) {
    if (this.isNew) {
        await sendVerificationEmail(this.username, this.otp);
    }
    next();
});

const AdminOtpSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim:true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5,
    },
});

AdminOtpSchema.pre('save', async function (next) {
    if (this.isNew) {
        await sendVerificationEmail(this.username, this.otp);
    }
    next();
});

const RegFormSchema = new Schema({
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
    date: {
        type: Date,
        default: Date.now,
    },
    name: {
        type: String,
        required: [true, 'name is required'],
        trim:true,
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        max: 15,
        trim:true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim:true,
    },
    prefCommunication: {
        type: [String],
        required: [true, 'Preferred method of communication is required'],
    },
    housing: {
        type: String,
        required: [true, 'Housing is required'],
        trim:true,
    },
    service: {
        type: [String],
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true,
    },
});

const MembershipFormSchema = new Schema({
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
    membershipType: String,
    formType: String,
    name: String,
    address: String,
    city: String,
    postalCode: String,
    phone: String,
    fax: String,
    email: { type: String, lowercase: true, 
        trim:true,
    },
    website: String,
    organization: {
        execDirector: String,
        contactPerson: String,
        position: String,
        addressAndCity: String,
        postalCode: String,
        phone: String,
        email: String,
    },
    representative: { name: String, date: { type: Date }, _id: false },
    payment: { method: String, done: { type: Boolean, default: false }, _id: false },
    declaration: Boolean,
    place: String,
    date: { type: Date, default: Date.now },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true,
    },
});

const VolunteerAppSchema = new Schema({
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
    name: String,
    address: String,
    phone: String,
    email: { type: String, lowercase: true,
        trim:true,
     },
    prefCommunication: String,
    ageLessThan18: Boolean,
    areasOfInterest: String,
    rankAreasOfInterest: String,
    volunteerExperienceSource: String,
    reason: String,
    interestRelatedExperiences: String,
    daysAvailable: { type: [String] },
    timesAvailable: { type: [String] },
    emergencyContact: {
        name: { type: String },
        phone: { type: String },
        type: { type: String },
        _id: false
    },
    references: [
        {
            name: { type: String },
            phone: { type: String },
            type: { type: String },
            _id: false
    },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true,
    },
});


const FoodBankSchema = new Schema({
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    phone: { type: String },
    incomeSource: { type: String },
    firstLanguage: { type: String },
    countAdults: { type: Number, required: true, default: 0 },
    countChildren: { type: Number, required: true, default: 0 },
    background: { type: String },
    restrictions: { type: [String] },
    personOfColor: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    lessThan10Years: { type: Boolean, default: false },
    entryInCanada: { type: String },
    family: [{
        name: { type: String, required: true },
        gender: { type: String },
        relationship: { type: String, required: true},
        birthdate: { type: String },
        _id: false
    }],
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true,
    },
});

export const User = model('User', UserSchema);
export const Admin = model('Admin', AdminSchema);
export const RegForm = model('RegForm', RegFormSchema);
export const MembershipForm = model('MembershipForm', MembershipFormSchema);
export const VolunteerApp = model('VolunteerApp', VolunteerAppSchema);
export const OtpCollection = model('OtpCollection', OtpSchema);
export const AdminOtpCollection = model('AdminOtpCollection', AdminOtpSchema);
export const FoodBank = model('FoodBank', FoodBankSchema);
