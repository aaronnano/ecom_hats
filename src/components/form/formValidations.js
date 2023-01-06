export const errors = {
    name: {
        pattern: /^[a-zA-Z]{4,10}$/,  // Ademas no admite espacios
        errorMessage: 'Should be only letters and be between 8 and 10 letters.'
    },
    username: {
        pattern: /^[a-zA-Z\d]+$/,  // Ademas no admite espacios
        errorMessage: 'No spaces.'
    },
    email: {
        pattern: /^\S+@\S+\.\S+$/,
        errorMessage: 'It should be a valid email.'
    },  
    password: {
        pattern: /^(?=.*\d)[A-Za-z\d]{5,10}$/,
        errorMessage: 
        'The password must contain 5-10 characters and at least one number. Not accept special characters.'
    },
    decimal: {
        pattern: /^\d*(\.\d{0,2})?$/
    },
    file: {
        errorMessage: "It's required to pick an image"
    },
    select: {
        errorMessage: 'You need to pick an option'
    },
    addressLine: {
        pattern: /^\d+(\s[a-zA-Z]+)+$/,
        errorMessage: 'Type a valid address'
    },
    phone: {
        pattern: /^\d{3,}(-\d{3,}){1,}$/,
        errorMessage: 'Type a valid phone number'
    }
}