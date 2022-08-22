import styled from "@emotion/styled";
import { Accordion, TextField } from "@mui/material";

export const StyledSearchBar = styled(TextField)`
  .MuiOutlinedInput-root {
    border-radius: 10px;
    font-size: 18px;

    input {
      padding-top: 10px;
      padding-left: 5px;
      padding-bottom: 10px;
    }
  }
`;

export const StyledAccordion = styled(Accordion)`
  border: 1px solid #cfcaca;
  margin-top: 15px !important;
  border-radius: 10px !important;
  &:before {
    content: none;
  }
`;

export const StyledTextBox = styled(TextField)`
  .MuiOutlinedInput-root {
    border-radius: 10px;

    input {
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }
  .MuiSelect-select {
    padding-top: 10px;
    padding-bottom: 10px;
  }
`;
