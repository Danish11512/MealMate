import {useState} from 'react'

const useSignupFormComponent = (validate) => {
    const [values, setValues] = useState({
        nickname: '',
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState({});

    // e is short for events
    const handleChange = e => {
        const { name, value} = e.target
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();

        setErrors(validate(values));
    }

    return {handleChange, values, handleSubmit, errors };
};

export default useSignupFormComponent;