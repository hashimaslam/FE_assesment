export interface IAccordion {
  first: string;
  last: string;
  dob: string;
  gender: string;
  picture: string;
  country: string;
  description: string;
  id: number;
  isEditMode: boolean;
  setIsEditMode: Function;
  handleSubmit: Function;
  expanded: boolean;
  onChangeAccord: Function;
  handleDelete: Function;
  open: boolean;
  handleClickOpen: Function;
}
// Shape of form values
export interface FormValues {
  name: string;
  dob: string;
  gender: string;
  country: string;
  description: string;
}

export interface IinnerProps {
  edit: boolean;
  setEdit: Function;
  date: number;
}

export interface IData {
  first: string;
  last: string;
  dob: string;
  gender: string;
  picture: string;
  country: string;
  description: string;
  id: number;
}
