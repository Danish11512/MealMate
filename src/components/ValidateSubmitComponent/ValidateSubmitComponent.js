export default function validateSubmit(values) {
    let errors = {}

    if(!values.nickname.trim()) {
        errors.nickname = "Nickname is required"
    }

    //email
    if(!values.email) {
        errors.email = "Email required"
    } else if(!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Email address is invalid"
    }

    if(!values.password) {
        errors.password = 'Password is required'
    } else if (values.password.length < 7) {
        errors.password = 'Password needs to be 7 characters or more'
    }
    return errors;
}