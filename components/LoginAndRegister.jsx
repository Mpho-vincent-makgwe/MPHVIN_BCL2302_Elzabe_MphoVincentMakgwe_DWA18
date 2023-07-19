import { useState } from 'react';
import '../styles/LoginAndRegister.css'


const Login = ( onLogin ) => {
const [formData, setFormData] = useState({
email: '',
password: '',
rememberMe: false
});

const handleChange = event => {
const { name, value, type, checked } = event.target;
setFormData(prevFormData => ({
    ...prevFormData,
    [name]: type === 'checkbox' ? checked : value
}));
};

const handleSubmit = event => {
event.preventDefault();

// Perform form submission logic, e.g., API calls, authentication, etc.
console.log(formData);

const { email, password } = formData;
    if (email === 'example@example.com' && password === 'password') {
      // Call the onLogin function passed as a prop to update the parent component
      onLogin();
    }
// Clear the form fields
setFormData({
    email: '',
    password: '',
    rememberMe: false
});
};

return (
    <div className="login-container">
<h2 className="login-title">Login</h2>
    <form className="login-form" onSubmit={handleSubmit}>
    <label>
        Email:
        <input
        className="login-input"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        />
    </label>
    <label>
        Password:
        <input
        className="login-input"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        />
    </label>


    <label className="login-checkbox">
        <input
        type="checkbox"
        name="rememberMe"
        checked={formData.rememberMe}
        onChange={handleChange}
        />
        Remember me
    </label>


    <button className="login-button" type="submit">Submit</button>


    </form>
</div>
);
};

export default Login;
