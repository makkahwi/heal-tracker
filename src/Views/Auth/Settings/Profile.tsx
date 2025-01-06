import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import * as BeAPI from "../../../API";
import Form from "../../../Components/Form";
import PageSection from "../../../Components/PageView/PageSection";
import { updateActivation } from "../../../Store/settings";
import { AppDispatch, RootState } from "../../../Store/store";

export interface profileProps {
  id: string;
  name: string;
  dob: string;
  height: string;
  gender: string;
  email: string;
  phone: string;
}

export const initialProfileState = {
  id: "x",
  name: "",
  dob: "",
  height: "",
  gender: "",
  email: "",
  phone: "",
};

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const { user } = useSelector((state: RootState) => state.auth);
  const [data, setData] = useState<profileProps>(initialProfileState);

  const getData = () =>
    BeAPI.get("profile")
      .then((res: any) => {
        dispatch(updateActivation(res.value));
        setData(res.value);
      })
      .catch((err) => console.log({ err }));

  useEffect(() => {
    getData();
  }, []);

  const inputs = [
    {
      name: "name",
      label: t("Settings.Profile.Name"),
      defaultValue: data.name,
      required: true,
    },
    {
      name: "dob",
      label: t("Settings.Profile.DOB"),
      type: "date",
      defaultValue: data.dob,
      required: true,
    },
    {
      name: "height",
      label: t("Settings.Profile.Height"),
      afterText: t("Settings.Profile.CM"),
      type: "number",
      step: 0.1,
      defaultValue: data.height,
      required: true,
    },
    {
      name: "gender",
      label: t("Settings.Profile.Gender.Title"),
      type: "select",
      options: [
        { value: "Male", label: t("Settings.Profile.Gender.Male") },
        { value: "Female", label: t("Settings.Profile.Gender.Female") },
      ],
      defaultValue: data.gender,
      required: true,
    },
    {
      name: "email",
      label: t("Settings.Profile.Email"),
      subLabel: t("Settings.Profile.EmailCantBeChanged"),
      disabled: true,
      defaultValue: user.email,
      required: true,
    },
    {
      name: "phone",
      label: t("Settings.Profile.Phone"),
      defaultValue: data.phone,
      required: true,
    },
  ];

  const onSubmit = (values: profileProps) => {
    BeAPI.update({
      table: "profile",
      id: data.id || "x",
      data: values,
    })
      .then(async () => {
        await getData();
      })
      .catch((err) => console.log({ err }));
  };

  return (
    <PageSection
      title={t("Settings.Profile.Title")}
      desc={t("Settings.Profile.Desc")}
    >
      <Form inputs={inputs} onSubmit={onSubmit} />
    </PageSection>
  );
};

export default Profile;
