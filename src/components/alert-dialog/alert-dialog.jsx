import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import AlertDialogStyles from './alert-dialog.styles';

const useStyles = makeStyles(AlertDialogStyles);

const AlertDialog = (props) => {
  const classes = useStyles();
  const {
    handleClose,
    handleConfirm,
    isOpen,
    isDisabled,
    title,
    body,
    closeButtonText,
    confirmButtonText,
  } = props;

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {body}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color="primary"
          disabled={isDisabled}
        >
          {closeButtonText}
        </Button>
        <div className={classes.wrapper}>
          <Button
            onClick={handleConfirm}
            color="primary"
            autoFocus
            disabled={isDisabled}
          >
            {confirmButtonText}
          </Button>
          {isDisabled && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
      </DialogActions>
    </Dialog>
  );
};

AlertDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  isDisabled: PropTypes.bool,
  title: PropTypes.string,
  body: PropTypes.string,
  closeButtonText: PropTypes.string,
  confirmButtonText: PropTypes.string,
};

AlertDialog.defaultProps = {
  isOpen: false,
  isDisabled: false,
  title: 'Default title',
  body: 'Default body -- provide the "body" prop to set this value.',
  closeButtonText: 'Cancel',
  confirmButtonText: 'Confirm',
};

export default AlertDialog;
