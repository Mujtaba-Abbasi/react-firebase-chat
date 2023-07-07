import { Link } from "react-router-dom";
import Add from "/public/images/addAvatar.png";
import "../../../styles.scss";
import useRegister from "../../hooks/useRegister";
import { ChangeEvent, useState } from "react";
import { IRegisterUserValues } from "../../constants/types";

const Register = () => {
  const { handleRegisterFormSubmit, initialFormData, isLoading, errors } =
    useRegister();
  const [formData, setFormData] =
    useState<IRegisterUserValues>(initialFormData);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData: IRegisterUserValues) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFormData((prevFormData: IRegisterUserValues) => ({
      ...prevFormData,
      file,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleRegisterFormSubmit(formData);
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">React Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input
            required
            type="text"
            placeholder="Display Name"
            value={formData.displayName}
            onChange={handleChange}
            name="displayName"
          />
          <input
            required
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            name="email"
          />
          <input
            required
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            name="password"
          />
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={handleFileChange}
          />
          <label htmlFor="file">
            <img
              src={(formData.file && URL.createObjectURL(formData.file)) ?? Add}
              alt=""
              style={{ borderRadius: "4px", height: "35px", width: "35px" }}
            />
            <span className="add-avatar">Add an avatar</span>
          </label>
          <button disabled={isLoading}>
            {isLoading ? "Loading" : "Sign up"}
          </button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
        {errors && (
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Register;
