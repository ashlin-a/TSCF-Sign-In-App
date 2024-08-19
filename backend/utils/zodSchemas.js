import zod from 'zod';

export const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(5).max(70),
    otp: zod.string().min(5).max(7),
}).strict();



export const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(5).max(70),
}).strict();

export const regFormSchema = zod.object({
    date: zod.coerce.date().optional(),
    name: zod.string(),
    phone: zod.string(),
    email: zod.string().email(),
    prefCommunication: zod.array(zod.string()),
    housing: zod.string(),
    service: zod.array(zod.string()).optional(),
}).strict();

export const membershipFormSchema = zod.object({
    membershipType: zod.string().optional(),
    formType: zod.string().optional(),
    name: zod.string().optional(),
    address: zod.string().optional(),
    city: zod.string().optional(),
    postalCode: zod.string().optional(),
    phone: zod.string().optional(),
    fax: zod.string().optional(),
    email: zod.string().optional(),
    website: zod.string().optional(),
    organization: zod
        .object({
            execDirector: zod.string().optional(),
            contactPerson: zod.string().optional(),
            position: zod.string().optional(),
            addressAndCity: zod.string().optional(),
            phone: zod.string().optional(),
            email: zod.string().optional(),
        })
        .optional(),
    representative: zod
        .object({
            name: zod.string().optional(),
            date: zod.coerce.date().optional(),
        })
        .optional(),
    payment: zod
        .object({
            method: zod.string().optional(),
            done: zod.boolean().default(false).optional(),
        })
        .optional(),
    declaration: zod.boolean().optional(),
    place: zod.string().optional(),
    date: zod.coerce.date().optional()
}).strict();

export const volunteerAppSchema = zod.object({
    name: zod.string(),
    address: zod.string().optional(),
    phone: zod.string().optional(),
    email: zod.string().optional(),
    prefCommunication: zod.string().optional(),
    ageLessThan18: zod.boolean().optional(),
    areasOfInterest: zod.string().optional(),
    rankAreasOfInterest: zod.string().optional(),
    volunteerExperienceSource: zod.string().optional(),
    reason: zod.string().optional(),
    interestRelatedExperiences: zod.string().optional(),
    daysAvailable: zod.array(zod.string()).optional(),
    timesAvailable: zod.array(zod.string()).optional(),
    emergencyContact: zod
        .object({
            name: zod.string().optional(),
            phone: zod.string().optional(),
            type: zod.string().optional(),
        })
        .optional(),
    references: zod
        .array(
            zod.object({
                name: zod.string().optional(),
                phone: zod.string().optional(),
                type: zod.string().optional(),
            })
        )
        .optional(),
}).strict();

export const foodBankSchema = zod.object({
    userId: zod.string().optional(),
    name: zod.string(),
    address: zod.string(),
    city: zod.string(),
    postalCode: zod.string(),
    phone: zod.string().optional(),
    incomeSource: zod.string().optional(),
    firstLanguage: zod.string().optional(),
    countAdults: zod.number().int().nonnegative().optional(),
    countChildren: zod.number().int().nonnegative().optional(),
    background: zod.string().optional(),
    restrictions: zod.array(zod.string()).optional(),
    personOfColor: zod.boolean().optional(),
    disabled: zod.boolean().optional(),
    lessThan10Years: zod.boolean().optional(),
    entryInCanada: zod.string().regex(/^(|^\d{4}-\d{2})$/, "Invalid date format, expected 'YYYY-MM'").optional(),
    family: zod.array(zod.object({
        name: zod.string(),
        gender: zod.string().optional(),
        relationship: zod.string(),
        birthdate: zod.string().date().optional(),
    })).optional(),
}).strict();
