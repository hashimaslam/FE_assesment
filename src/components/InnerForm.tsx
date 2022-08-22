import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { StyledAccordion, StyledTextBox } from "./styles";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/system";
import { IconButton } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MenuItem from "@mui/material/MenuItem";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { Form, FormikProps } from "formik";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { IAccordion, IinnerProps, FormValues } from "../types/types";
import moment from "moment";
import React, { useEffect, useState } from "react";

const InnerForm: React.FC<
  IAccordion & IinnerProps & FormikProps<FormValues>
> = (props) => {
  const {
    id,
    values,
    handleChange,
    errors,
    touched,
    setFieldValue,
    first,
    last,
    gender,
    dob,
    picture,
    country,
    description,
    edit,
    date,
    setEdit,
    isEditMode,
    expanded,
    onChangeAccord,
    handleClickOpen,

    handleBlur,
  } = props;
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    //Checking for first vist to enable and disable submit button
    if (first !== values.name.split(" ")[0]) {
      setDisabled(false);
      return;
    }
    if (last !== values.name.split(" ")[1]) {
      setDisabled(false);
      return;
    }
    if (new Date(dob).getTime() !== new Date(values.dob).getTime()) {
      setDisabled(false);
      return;
    }

    if (description !== values.description) {
      setDisabled(false);
      return;
    }
    if (gender !== values.gender) {
      setDisabled(false);
      return;
    }
    if (country !== values.country) {
      setDisabled(false);
      return;
    }
    setDisabled(true);
  }, [values]);
  return (
    <Form>
      <StyledAccordion
        sx={{
          boxShadow: "none",
        }}
        disabled={!edit && isEditMode}
        expanded={expanded}
        onChange={onChangeAccord(id)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box display="flex" alignItems="center">
            <Avatar sx={{ width: 45, height: 45 }} src={picture}></Avatar>
            {!edit ? (
              <Typography
                fontSize="22px"
                fontWeight={500}
                component="p"
                ml="20px"
              >
                {first} {last}
              </Typography>
            ) : (
              <StyledTextBox
                type="text"
                name="name"
                fullWidth
                value={values.name}
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                defaultValue={first + " " + last}
                onBlur={handleBlur}
                sx={{ ml: "20px" }}
                placeholder="search"
                variant="outlined"
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" alignItems="flex-start" mb="20px">
            <Box mr="20px">
              <Typography color="#9e9e9e" fontWeight={500}>
                Age
              </Typography>
              {!edit ? (
                <Typography> {date} years</Typography>
              ) : (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={values.dob}
                    onChange={(value) => {
                      if (value) {
                        setFieldValue(
                          "dob",
                          moment(value).format("YYYY-MM-DD"),
                          true
                        );
                      } else {
                        setFieldValue("dob", "", true);
                      }
                    }}
                    disableFuture={true}
                    renderInput={(params) => (
                      <StyledTextBox
                        {...params}
                        error={touched.dob && Boolean(errors.dob)}
                        helperText={touched.dob && errors.dob}
                        name="dob"
                        onBlur={handleBlur}
                      />
                    )}
                  />
                </LocalizationProvider>
              )}
            </Box>
            <Box mr="20px">
              <Typography color="#9e9e9e" fontWeight={500}>
                Gender
              </Typography>
              {!edit ? (
                <Typography>{gender}</Typography>
              ) : (
                <StyledTextBox
                  type="text"
                  select
                  variant="outlined"
                  fullWidth
                  name="gender"
                  value={values.gender}
                  onChange={handleChange}
                  error={touched.gender && Boolean(errors.gender)}
                  helperText={touched.gender && errors.gender}
                  onClick={(e) => e.stopPropagation()}
                  onBlur={handleBlur}
                >
                  <MenuItem key={1} value={"male"}>
                    male
                  </MenuItem>
                  <MenuItem key={2} value={"female"}>
                    female
                  </MenuItem>
                  <MenuItem key={3} value={"prefer not to say"}>
                    prefer not to say
                  </MenuItem>
                </StyledTextBox>
              )}
            </Box>
            <Box>
              <Typography color="#9e9e9e" fontWeight={500}>
                Country
              </Typography>
              {!edit ? (
                <Typography>{country}</Typography>
              ) : (
                <StyledTextBox
                  type="text"
                  name="country"
                  value={values.country}
                  onChange={handleChange}
                  error={touched.country && Boolean(errors.country)}
                  helperText={touched.country && errors.country}
                  placeholder="search"
                  variant="outlined"
                  onClick={(e) => e.stopPropagation()}
                  onBlur={handleBlur}
                />
              )}
            </Box>
          </Box>
          <Box>
            <Typography color="#9e9e9e" fontWeight={500}>
              Description
            </Typography>
            {!edit ? (
              <Typography>{description}</Typography>
            ) : (
              <StyledTextBox
                type="text"
                multiline
                name="description"
                value={values.description}
                onChange={handleChange}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
                rows={5}
                fullWidth
                placeholder="search"
                variant="outlined"
                onClick={(e) => e.stopPropagation()}
                onBlur={handleBlur}
              />
            )}
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            mt="20px"
          >
            {!edit ? (
              <>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleClickOpen(id)}
                >
                  <DeleteOutlineOutlinedIcon
                    sx={{ color: "#f73434" }}
                    fontSize="medium"
                  />
                </IconButton>
                <IconButton
                  onClick={(e) => {
                    setEdit();
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  type="button"
                  aria-label="edit"
                >
                  <EditOutlinedIcon
                    fontSize="medium"
                    sx={{ color: "#0756de" }}
                  />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton
                  aria-label="cancel"
                  onClick={(e) => {
                    setEdit();
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                >
                  <CancelOutlinedIcon
                    sx={{ color: "#ff3636" }}
                    fontSize="medium"
                  />
                </IconButton>
                <IconButton type="submit" disabled={disabled}>
                  <CheckCircleOutlineRoundedIcon
                    fontSize="medium"
                    sx={{ color: "#2f753f" }}
                  />
                </IconButton>
              </>
            )}
          </Box>
        </AccordionDetails>
      </StyledAccordion>
    </Form>
  );
};

export default InnerForm;
