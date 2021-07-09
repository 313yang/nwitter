import { useState } from "react";
import { authService } from "../fbase";

const Auth = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [newAccount, setNewAccount] = useState(true);
  const { email, password } = form;
  const [error, setError] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setForm({ ...form, email: value });
    } else if (name === "password") {
      setForm({ ...form, password: value });
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    let data;
    try {
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <div>
      <p>{error}</p>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "Create Account" : "Login"} />
      </form>
      <span>
        {newAccount ? "Already have an account?" : "Don't have an account?"}
        <strong onClick={toggleAccount}>
          {newAccount ? " Sign In" : " Sign Up"}
        </strong>
      </span>

      <div>
        <button>Continue with Google &rarr;</button>
        <button>Continue with Github &rarr;</button>
      </div>
    </div>
  );
};
export default Auth;
