import React, { useEffect, useState } from "react";
import { withFormik } from "formik";
import * as yup from "yup";
import InnerForm from "./InnerForm";
import { IAccordion, IinnerProps, FormValues } from "../types/types";

const validationSchema = yup.object({
  name: yup
    .string()
    .matches(/^[^-\s][a-zA-Z0-9_\s-]+$/, "Enter valid name")
    .required("Name is required"),
  dob: yup.string().required("dob is required"),
  gender: yup.string().required("gender is required"),
  country: yup
    .string()
    .required("country is required")
    .matches(/^[^-\s][a-zA-Z_\s-]+$/, "Enter valid country name"),
  description: yup.string().required("description is required"),
});

const AccordionForm = withFormik<IinnerProps & IAccordion, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      id: props.id,
      name: props.first + " " + props.last,
      dob: props.dob,
      gender: props.gender,
      picture: props.picture,
      country: props.country,
      description: props.description,
    };
  },

  validationSchema: validationSchema,
  handleSubmit: (values, formikBag) => {
    // do submitting things
    const { edit, setEdit, setIsEditMode, handleSubmit } = formikBag.props;
    let names = values.name.split(" ");
    let updatedObj = { ...values, first: names[0], last: names[1] };
    let tempObj = { ...updatedObj } as any;
    delete tempObj.name;
    handleSubmit(tempObj);
    setEdit(!edit);
    setIsEditMode(!edit);
  },
})(InnerForm);

export const BasicAccordion: React.FC<IAccordion> = (props) => {
  const { dob, setIsEditMode, handleClickOpen } = props;
  const [edit, setEdit] = useState<boolean | false>(false);
  const [date, setDate] = useState<number | 0>(0);

  useEffect(() => {
    setDate(new Date().getFullYear() - new Date(dob).getFullYear());
  }, [dob]);
  const handleEdit = () => {
    setEdit(!edit);
    setIsEditMode(!edit);
  };
  return (
    <>
      <AccordionForm
        {...props}
        edit={edit}
        setEdit={handleEdit}
        date={date}
        handleClickOpen={handleClickOpen}
      />
    </>
  );
};
