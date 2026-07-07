import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import { loginUser } from "../../services/authService";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await loginUser(formData);

      localStorage.setItem("token", response.token);

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      alert(error.response?.data?.message || "Login Failed");

    }

  };

  return (
    <div className="min-h-screen bg-[#F7F8FC] flex items-center justify-center px-4">

      <Card className="w-full max-w-md">

        <h1 className="text-4xl font-bold text-center mb-8">
          Log in
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <Input
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />

          <Button type="submit">
            Log in
          </Button>

        </form>

        <p className="text-center mt-8 text-sm">

          Don't have an account?

          <Link
            to="/register"
            className="text-[#5B4AE6] ml-1"
          >
            Sign up
          </Link>

        </p>

      </Card>

    </div>
  );
};

export default Login;