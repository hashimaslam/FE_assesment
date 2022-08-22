import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

interface IDelete {
  open: boolean;
  handleClose: any;
  id: number;
  handleDelete: Function;
}
const DeleteDialog: React.FC<IDelete> = ({
  open,
  handleClose,
  handleDelete,
  id,
}) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you wat to delete this record
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(id)}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteDialog;
