import { Form, useActionData } from "react-router-dom";
import { useEffect } from "react";
import { z } from "zod";
import styles from "./Login.module.css";
import supabase from "../supabase";
import { useAuth } from "../AuthContext";

const LoginSchema = z.object({
  email: z
    .string()
    .email("Invalid Email")
    .transform((email) => email.toLowerCase()),
  password: z.string().min(8, "Password Too Short"),
});

export const action = async ({ request }) => {
  const formData = await request.formData();
  const result = await LoginSchema.safeParseAsync({
    email: formData.get("username"),
    password: formData.get("password"),
  });

  if (!result.success) {
    console.error(result.error);
    return null;
  }

  const { email, password } = result.data;
  console.log("EMAIL AND PASSWORD: ", email, password);
  console.log("TO BE CONTINUED... ");

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  console.log("DATA AND ERROR: ", data, error);

  return data;
};

const Login = () => {
  const data = useActionData();
  const { setUser, setSession } = useAuth();

  console.log("DATA: ", data);

  useEffect(() => {
    if (data?.user && data?.session) {
      setUser(data.user.id)
      setSession(data.session.access_token)
    }
  }, [data, setUser, setSession])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome Back! Please Sign In</h1>
      
      <div className={styles.formContainer}>
        <Form
          action="/login"
          method="post"
          className={styles.form}
        >
          <div className={styles.formGroup}>
            <label className={styles.label}>
              <span className={styles.labelText}>Your Email Address</span>
              <input
                className={styles.input}
                name="username"
                type="email"
                placeholder="you@supercoolhuman.com"
                autoComplete="email"
                required
              />
            </label>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              <span className={styles.labelText}>Password</span>
              <input
                className={styles.input}
                name="password"
                type="password"
                placeholder="Enter password here"
                autoComplete="new-password"
                required
              />
            </label>
          </div>

          <button
            type="submit"
            className={styles.button}
          >
            Login
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
