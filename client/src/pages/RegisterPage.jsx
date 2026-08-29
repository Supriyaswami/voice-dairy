import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Input from "../components/common/Input";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, authError } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profilePhoto: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await register(formData);
      navigate("/", { replace: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-8">
      <h2 className="font-display text-4xl text-stone-900 dark:text-white">Create your diary</h2>
      <p className="mt-3 text-sm text-stone-600 dark:text-stone-300">
        Set up your private voice-powered memory space.
      </p>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <Input label="Name" name="name" value={formData.name} onChange={handleChange} required />
        <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required />
        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Input
          label="Profile Photo URL"
          name="profilePhoto"
          value={formData.profilePhoto}
          onChange={handleChange}
          placeholder="Optional"
        />
        {authError && <p className="text-sm text-rose-500">{authError}</p>}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating Account..." : "Register"}
        </Button>
      </form>

      <p className="mt-6 text-sm text-stone-600 dark:text-stone-300">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-stone-900 underline underline-offset-4 dark:text-white">
          Login
        </Link>
      </p>
    </Card>
  );
};

export default RegisterPage;

