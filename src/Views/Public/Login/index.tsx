import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import * as BeAPI from "../../../API";
import Form from "../../../Components/Form";
import PageSection from "../../../Components/PageView/PageSection";
import { signIn, signUp } from "../../../Store/authSlice";
import { updateActivation } from "../../../Store/settings";
import { AppDispatch } from "../../../Store/store";

interface props {
  email: string;
  password: string;
  passwordConfirmation?: string;
}

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const signInInputs = [
    {
      name: "email",
      label: t("Auth.Email"),
      type: "email",
      required: true,
      fullWidth: true,
    },
    {
      name: "password",
      label: t("Auth.Password"),
      type: "password",
      required: true,
      fullWidth: true,
    },
  ];

  const signUpInputs = [
    {
      name: "email",
      label: t("Auth.Email"),
      type: "email",
      required: true,
      fullWidth: true,
    },
    {
      name: "password",
      label: t("Auth.Password"),
      type: "password",
      required: true,
      fullWidth: true,
    },
    {
      name: "passwordConfirmation",
      label: t("Auth.PasswordConfirmation"),
      type: "password",
      required: true,
      fullWidth: true,
    },
  ];

  const onSignInSubmit = ({ email, password }: props) => {
    dispatch(signIn({ email, password }))
      .then(() => {
        navigate("/");

        BeAPI.get("settings")
          .then((res: any) => {
            dispatch(updateActivation(res.value));
          })
          .catch((err: any) => console.log({ err }));

        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const onSignUpSubmit = ({ email, password }: props) => {
    dispatch(signUp({ email, password }))
      .then(() => {
        navigate("/");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <PageSection title={t("Auth.SignIn")}>
          <Form inputs={signInInputs} onSubmit={onSignInSubmit} />
        </PageSection>
      </div>

      <div className="col-md-6">
        <PageSection title={t("Auth.SignUp")}>
          <Form inputs={signUpInputs} onSubmit={onSignUpSubmit} />
        </PageSection>
      </div>
    </div>
  );
};

export default Login;
