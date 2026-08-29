import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Input from "../components/common/Input";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, authError } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await login(formData);
      navigate("/", { replace: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-8">
      <h2 className="font-display text-4xl text-stone-900 dark:text-white">Welcome back</h2>
      <p className="mt-3 text-sm text-stone-600 dark:text-stone-300">Return to your private archive of memories.</p>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required />
        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {authError && <p className="text-sm text-rose-500">{authError}</p>}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Signing In..." : "Login"}
        </Button>
      </form>

      <p className="mt-6 text-sm text-stone-600 dark:text-stone-300">
        New here?{" "}
        <Link to="/register" className="font-medium text-stone-900 underline underline-offset-4 dark:text-white">
          Create an account
        </Link>
      </p>
    </Card>
  );
};

export default LoginPage;

