import { useState } from "react";
import { authService, firebaseInstance } from "../fbase";

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
    try {
      if (newAccount) {
        await authService.createUserWithEmailAndPassword(email, password);
      } else {
        await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSocialLogin = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };
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
        <button name="google" onClick={onSocialLogin}>
          Continue with Google &rarr;
        </button>
        <button name="github" onClick={onSocialLogin}>
          Continue with Github &rarr;
        </button>
      </div>
    </div>
  );
};
export default Auth;
