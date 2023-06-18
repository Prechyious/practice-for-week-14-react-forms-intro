import { useEffect, useState } from "react";

const RegistrationForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [phoneType, setPhoneType] = useState("");
    const [staff, setStaff] = useState("");
    const [bio, setBio] = useState("");
    const [mailList, setMailList] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const validatePhoneNumber = (num) => {
        return num.replace(/\D/g, "").length >= 10;
    };

    useEffect(() => {
        const errors = [];

        if (!name.length) errors.push("Please enter your Name");

        const validMail = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

        if (!validMail.test(email)) errors.push("Please enter a valid Email");
        if (!validatePhoneNumber(phone))
            errors.push("Please enter a valid Phone number");
        if (phone > 0 && !phoneType)
            errors.push("Please select your phone type");
        if (bio.length > 280)
            errors.push("Bio should have a max of 280 characters");
        setValidationErrors(errors);
    }, [name, email, phone, phoneType, bio]);

    useEffect(() => {
        if (!phone) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [phone]);

    const onSubmit = (e) => {
        e.preventDefault();

        setHasSubmitted(true);

        if (validationErrors.length) return alert(`Cannot Submit`);

        const registrationInformation = {
            name,
            email,
            phone,
            phoneType,
            staff,
            bio,
            mailList,
            hasSubmitted,
            submittedOn: new Date(),
        };

        console.log(registrationInformation);

        setName("");
        setEmail("");
        setPhone("");
        setPhoneType("");
        setStaff();
        setBio("");
        setMailList(false);
        setValidationErrors([]);
        setHasSubmitted(false);

        alert("Submitted successfully");
    };

    return (
        <div className="reg-form">
            <h2>Registration form</h2>

            <form onSubmit={onSubmit}>
                <div
                    className={`form-group ${
                        hasSubmitted &&
                        validationErrors.includes("Please enter your Name")
                            ? "has-error"
                            : ""
                    }`}
                >
                    <label htmlFor="name">Name: </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {hasSubmitted &&
                        validationErrors.includes("Please enter your Name") && (
                            <span className="error-message">
                                Please enter your Name
                            </span>
                        )}
                </div>

                <div
                    className={`form-group ${
                        hasSubmitted &&
                        validationErrors.includes("Please enter a valid Email")
                            ? "has-error"
                            : ""
                    }`}
                >
                    <label htmlFor="email">Email: </label>
                    <input
                        id="email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {hasSubmitted &&
                        validationErrors.includes(
                            "Please enter a valid Email"
                        ) && (
                            <span className="error-message">
                                Please enter a valid Email
                            </span>
                        )}
                </div>

                <div
                    className={`form-group phone ${
                        hasSubmitted &&
                        validationErrors.includes(
                            "Please enter a valid Phone number"
                        )
                            ? "has-error"
                            : ""
                    }`}
                >
                    <label htmlFor="phone">Phone: </label>
                    <input
                        id="phone"
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Eg. +1234567890"
                    />
                    {hasSubmitted &&
                        validationErrors.includes(
                            "Please enter a valid Phone number"
                        ) && (
                            <span className="error-message">
                                Please enter a valid Phone number
                            </span>
                        )}
                </div>

                <select
                    name="phoneType"
                    disabled={disabled}
                    onChange={(e) => setPhoneType(e.target.value)}
                    value={phoneType}
                >
                    <option value="" disabled>
                        Select a phone type...
                    </option>
                    <option>Home</option>
                    <option>Work</option>
                    <option>Mobile</option>
                </select>

                <div className="form-group staff">
                    <label htmlFor="staff">Staff:</label>
                    <input
                        type="radio"
                        name="staff"
                        value="instructor"
                        id="instructor"
                        onChange={(e) => setStaff(e.target.value)}
                    />
                    <label htmlFor="instructor">Instructor</label>
                    <input
                        type="radio"
                        name="staff"
                        value="student"
                        id="student"
                        onChange={(e) => setStaff(e.target.value)}
                    />
                    <label htmlFor="student">Student</label>
                </div>

                <div
                    className={`form-group ${
                        hasSubmitted &&
                        validationErrors.includes(
                            "Bio should have a max of 280 characters"
                        )
                            ? "has-error"
                            : ""
                    }`}
                >
                    <label htmlFor="bio">Bio: </label>
                    <textarea
                        name="bio"
                        id="bio"
                        onChange={(e) => setBio(e.target.value)}
                        value={bio}
                    />
                    {hasSubmitted &&
                        validationErrors.includes(
                            "Bio should have a max of 280 characters"
                        ) && (
                            <span className="error-message">
                                Bio should have a max of 280 characters
                            </span>
                        )}
                </div>

                <div className="mail-list">
                    <input
                        type="checkbox"
                        id="mailList"
                        checked={mailList}
                        onChange={(e) => setMailList(e.target.checked)}
                    />
                    <label htmlFor="mailList">
                        Sign up for email notifications
                    </label>
                </div>

                <button>Submit</button>
            </form>
        </div>
    );
};

export default RegistrationForm;
