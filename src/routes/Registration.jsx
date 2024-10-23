import { Form } from "react-router-dom";
import { z } from "zod";
import styles from "./Registration.module.css";

const RegistrationSchema = z.object({
  email: z
    .string()
    .email("Invalid Email")
    .transform((email) => email.toLowerCase()),
  password: z.string().min(8, "Password Too Short"),
});

export const action = async ({ request }) => {
  const formData = await request.formData();
  const result = await RegistrationSchema.safeParseAsync({
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

  return null;
};

const Registration = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Register with us!</h1>
      
      <div className={styles.formContainer}>
        <Form 
          action="/registration" 
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
            Register
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Registration;
