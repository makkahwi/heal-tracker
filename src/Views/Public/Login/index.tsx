import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Form from "../../../Components/Form";
import PageSection from "../../../Components/PageView/PageSection";
import { signIn, signUp } from "../../../Store/authSlice";
import { AppDispatch } from "../../../Store/store";

interface props {
  email: string;
  password: string;
  passwordConfirmation?: string;
}

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const signInInputs = [
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true,
      fullWidth: true,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      required: true,
      fullWidth: true,
    },
  ];

  const signUpInputs = [
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true,
      fullWidth: true,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      required: true,
      fullWidth: true,
    },
    {
      name: "passwordConfirmation",
      label: "Password Confirmation",
      type: "password",
      required: true,
      fullWidth: true,
    },
  ];

  const onSignInSubmit = ({ email, password }: props) => {
    dispatch(signIn({ email, password }))
      .then(() => navigate(0))
      .catch((err) => console.log(err));
  };

  const onSignUpSubmit = ({ email, password }: props) => {
    dispatch(signUp({ email, password }))
      .then(() => navigate(0))
      .catch((err) => console.log(err));
  };

  return (
    <div className="row">
      <div className="col">
        <PageSection title="Sign In">
          <Form inputs={signInInputs} onSubmit={onSignInSubmit} />
        </PageSection>
      </div>

      <div className="col">
        <PageSection title="Sign Up">
          <Form inputs={signUpInputs} onSubmit={onSignUpSubmit} />
        </PageSection>
      </div>
    </div>
  );
};

export default Login;
