import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import {
  defaultTitle, defaultThumbnailUrl, defaultImageUrl, defaultDescription,
} from './defaults';
import { isNotEmpty, isValidUrl } from '../utils';
import AddGroupDialogStyles from './add-group-dialog.styles';
import GroupService from '../../../services/group.service';

const useStyles = makeStyles(AddGroupDialogStyles);
const groupService = new GroupService();

const AddGroupDialog = (props) => {
  const classes = useStyles();
  const { isOpen, handleClose, openSnackbar } = props;

  const [formIsLoading, setFormIsLoading] = useState(false);
  const [title, setTitle] = useState(defaultTitle);
  const [thumbnailUrl, setThumbnailUrl] = useState(defaultThumbnailUrl);
  const [imageUrl, setImageUrl] = useState(defaultImageUrl);
  const [description, setDescription] = useState(defaultDescription);

  const updateTitle = (e) => {
    setTitle({ ...title, value: e.target.value });
  };
  const updateTitleError = (hasError, helperText) => {
    setTitle({ ...title, hasError, helperText });
  };
  const updateThumbnailUrl = (e) => {
    setThumbnailUrl({ ...thumbnailUrl, value: e.target.value });
  };
  const updateThumbnailUrlError = (hasError, helperText) => {
    setThumbnailUrl({ ...thumbnailUrl, hasError, helperText });
  };
  const updateImageUrl = (e) => {
    setImageUrl({ ...imageUrl, value: e.target.value });
  };
  const updateImageUrlError = (hasError, helperText) => {
    setImageUrl({ ...imageUrl, hasError, helperText });
  };
  const updateDescription = (e) => {
    setDescription({ ...description, value: e.target.value });
  };
  const updateDescriptionError = (hasError, helperText) => {
    setDescription({ ...description, hasError, helperText });
  };

  /**
   * Check to see if the group's title is valid
   */
  const isValidTitle = () => {
    const input = title.value;

    // Title is required, so it cannot be empty
    if (!isNotEmpty(input)) {
      updateTitleError(true, 'Title is required');
      return false;
    }

    // Title has resource constraints in the database
    if (input.length > 255) {
      updateTitleError(true, 'Title cannot be more than 255 characters');
      return false;
    }

    updateTitleError(false, '');
    return true;
  };

  /**
   * Check to see if the group's thumbnail url value is valid
   */
  const isValidThumbnailUrl = () => {
    const input = thumbnailUrl.value;

    // Thumbnail url is required, so it cannot be empty
    if (!isNotEmpty(input)) {
      updateThumbnailUrlError(true, 'Thumbnail url is required');
      return false;
    }

    // Thumbnail url must be a valid url
    if (!isValidUrl(input)) {
      updateThumbnailUrlError(true, 'Must be a valid url');
      return false;
    }

    updateThumbnailUrlError(false, '');
    return true;
  };

  /**
   * Check to see if the group's image url value is valid
   */
  const isValidImageUrl = () => {
    const input = imageUrl.value;

    // Image url is required, so it cannot be empty
    if (!isNotEmpty(input)) {
      updateImageUrlError(true, 'Image url is required');
      return false;
    }

    // Image url must be a valid url
    if (!isValidUrl(input)) {
      updateImageUrlError(true, 'Must be a valid url');
      return false;
    }

    updateImageUrlError(false, '');
    return true;
  };

  /**
   * Check to see if the group's description value is valid
   */
  const isValidDescription = () => {
    const input = description.value;

    // Description has resource constraints in the database
    if (input.length > 1234) {
      updateDescriptionError(true, 'Description cannot be more than 1234 characters');
      return false;
    }

    updateDescriptionError(false, '');
    return true;
  };

  /**
   * Check to make sure the whole form is valid
   */
  const isValidForm = () => {
    let isValid = true;
    if (!isValidTitle()) isValid = false;
    if (!isValidThumbnailUrl()) isValid = false;
    if (!isValidImageUrl()) isValid = false;
    if (!isValidDescription()) isValid = false;
    return isValid;
  };

  /**
   * Reset the form's data
   */
  const resetForm = () => {
    setTitle(defaultTitle);
    setThumbnailUrl(defaultThumbnailUrl);
    setImageUrl(defaultImageUrl);
    setDescription(defaultDescription);
    setFormIsLoading(false);
  };

  /**
   * Save the group based on the defined group data
   */
  const handleSave = async () => {
    if (isValidForm()) {
      try {
        setFormIsLoading(true);
        const group = {
          title: title.value,
          description: description.value,
          thumbnailUrl: thumbnailUrl.value,
          imageUrl: imageUrl.value,
        };
        const response = await groupService.createGroup(group);
        resetForm();
        handleClose();

        // I know... this is kind of hacky. Not proud of this, but at the current time this
        // component does not have access to the router, so I cannot use react-router to solve this
        document.location.href = `group/${response.id}`;
      } catch (error) {
        openSnackbar('error', error.message);
        setFormIsLoading(false);
      }
    }
  };

  /**
   * Reset and cancel the current form changes
   */
  const handleCancel = () => {
    resetForm();
    handleClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="add-group-title"
      aria-describedby="add-group-body"
    >
      <DialogTitle id="add-group-title">New Group</DialogTitle>
      <DialogContent id="add-group-body" dividers>
        <TextField
          id="title"
          label="Title"
          margin="normal"
          variant="outlined"
          fullWidth
          disabled={formIsLoading}
          value={title.value}
          required={title.isRequired}
          error={title.hasError}
          helperText={title.helperText}
          onChange={e => updateTitle(e)}
        />
        <TextField
          id="thumbnailUrl"
          label="Thumbnail Url"
          margin="normal"
          variant="outlined"
          fullWidth
          disabled={formIsLoading}
          value={thumbnailUrl.value}
          required={thumbnailUrl.isRequired}
          error={thumbnailUrl.hasError}
          helperText={thumbnailUrl.helperText}
          onChange={e => updateThumbnailUrl(e)}
        />
        <TextField
          id="imageUrl"
          label="Image Url"
          margin="normal"
          variant="outlined"
          fullWidth
          disabled={formIsLoading}
          value={imageUrl.value}
          required={imageUrl.isRequired}
          error={imageUrl.hasError}
          helperText={imageUrl.helperText}
          onChange={e => updateImageUrl(e)}
        />
        <TextField
          multiline
          id="description"
          label="Description"
          margin="normal"
          variant="outlined"
          fullWidth
          rows="4"
          disabled={formIsLoading}
          value={description.value}
          required={description.isRequired}
          error={description.hasError}
          helperText={description.helperText}
          onChange={e => updateDescription(e)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={() => handleCancel()}
          disabled={formIsLoading}
        >
          Cancel
        </Button>
        <div className={classes.wrapper}>
          <Button
            color="primary"
            onClick={() => handleSave()}
            disabled={formIsLoading}
          >
            Save
          </Button>
          {formIsLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
      </DialogActions>
    </Dialog>
  );
};

AddGroupDialog.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  openSnackbar: PropTypes.func,
};

AddGroupDialog.defaultProps = {
  isOpen: false,
  handleClose: () => { },
  openSnackbar: () => { },
};

export default AddGroupDialog;
