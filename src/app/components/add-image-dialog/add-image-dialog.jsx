import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import {
  defaultTitle,
  defaultThumbnailUrl,
  defaultImageUrl,
  defaultDescription,
  defaultWidth,
  defaultHeight,
  defaultLocation,
} from './defaults';
import AddImageDialogStyles from './add-image-dialog.styles';
import { isNotEmpty, isValidUrl } from '../utils';
import ImageService from '../../../services/image.service';

const useStyles = makeStyles(AddImageDialogStyles);
const imageService = new ImageService();

const AddImageDialog = (props) => {
  const classes = useStyles();
  const { isOpen, handleClose, openSnackbar } = props;

  const [formIsLoading, setFormIsLoading] = useState(false);
  const [title, setTitle] = useState(defaultTitle);
  const [thumbnailUrl, setThumbnailUrl] = useState(defaultThumbnailUrl);
  const [imageUrl, setImageUrl] = useState(defaultImageUrl);
  const [width, setWidth] = useState(defaultWidth);
  const [height, setHeight] = useState(defaultHeight);
  const [location, setLocation] = useState(defaultLocation);
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

  const updateLocation = (e) => {
    setLocation({ ...location, value: e.target.value });
  };
  const updateLocationError = (hasError, helperText) => {
    setLocation({ ...location, hasError, helperText });
  };

  const updateWidth = (e) => {
    setWidth({ ...width, value: e.target.naturalWidth });
  };
  const updateWidthError = (hasError, helperText) => {
    setWidth({ ...width, hasError, helperText });
  };

  const updateHeight = (e) => {
    setHeight({ ...height, value: e.target.naturalHeight });
  };
  const updateHeightError = (hasError, helperText) => {
    setHeight({ ...height, hasError, helperText });
  };

  const updateDescription = (e) => {
    setDescription({ ...description, value: e.target.value });
  };
  const updateDescriptionError = (hasError, helperText) => {
    setDescription({ ...description, hasError, helperText });
  };

  /**
   * Set the dimensions of the defined image.
   *
   * @param {Event} e DOM event that was triggered
   */
  const setImageDimensions = (e) => {
    updateWidth(e);
    updateHeight(e);
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
   * Check to see if the image's thumbnail url value is valid
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
   * Check to see if the image's image url value is valid
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
   * Check to see if the image's location value is valid
   */
  const isValidLocation = () => {
    const input = location.value;

    // Location has resource constraints in the database
    if (input.length > 255) {
      updateLocationError(true, 'Location cannot be more than 255 characters');
      return false;
    }

    updateLocationError(false, '');
    return true;
  };

  /**
   * Check to see if the image's width value is valid
   */
  const isValidWidth = () => {
    const input = Number.parseInt(width.value, 10);

    if (Number.isNaN(input)) {
      updateWidthError(true, 'Height must be a valid number');
      return false;
    }

    if (input <= 0) {
      updateWidthError(true, 'Width cannot be less than or equal to 0');
      return false;
    }

    updateWidthError(false, '');
    return true;
  };

  /**
   * Check to see if the image's height value is valid
   */
  const isValidHeight = () => {
    const input = Number.parseInt(height.value, 10);

    if (Number.isNaN(input)) {
      updateHeightError(true, 'Height must be a valid number');
      return false;
    }

    if (input <= 0) {
      updateHeightError(true, 'Height cannot be less than or equal to 0');
      return false;
    }

    updateHeightError(false, '');
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
   * Reset the form's data
   */
  const resetForm = () => {
    setTitle(defaultTitle);
    setThumbnailUrl(defaultThumbnailUrl);
    setImageUrl(defaultImageUrl);
    setDescription(defaultDescription);
    setWidth(defaultWidth);
    setHeight(defaultHeight);
    setLocation(defaultLocation);
    setFormIsLoading(false);
  };

  /**
   * Check to make sure the whole form is valid
   */
  const isValidForm = () => {
    let isValid = true;
    if (!isValidTitle()) isValid = false;
    if (!isValidThumbnailUrl()) isValid = false;
    if (!isValidImageUrl()) isValid = false;
    if (!isValidLocation()) isValid = false;
    if (!isValidWidth()) isValid = false;
    if (!isValidHeight()) isValid = false;
    if (!isValidDescription()) isValid = false;
    return isValid;
  };

  /**
   * Save the image based on the defined image data
   */
  const handleSave = async () => {
    if (isValidForm()) {
      try {
        setFormIsLoading(true);
        const image = {
          title: title.value,
          description: description.value,
          thumbnailUrl: thumbnailUrl.value,
          imageUrl: imageUrl.value,
          location: location.value,
          width: width.value,
          height: height.value,
        };
        await imageService.createImage(image);
        resetForm();
        handleClose();
      } catch (error) {
        openSnackbar('error', error.message);
        setFormIsLoading(false);
      }
    }
  };

  /**
   * Reset and cancel the current form
   */
  const handleCancel = () => {
    resetForm();
    handleClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="add-image-title"
      aria-describedby="add-image-body"
    >
      <DialogTitle id="add-image-title">New Image</DialogTitle>
      <DialogContent id="add-image-body" dividers>
        <Grid container justify="center" spacing={1}>
          <Grid item>
            <div className={classes.imgContainer}>
              <img
                alt="imageUrl"
                src={imageUrl.value}
                className={classes.img}
                onLoad={e => setImageDimensions(e)}
              />
            </div>
            <Typography variant="caption">Image Url</Typography>
          </Grid>
          <Grid item>
            <div className={classes.imgContainer}>
              <img
                alt="thumbnailUrl"
                src={thumbnailUrl.value}
                className={classes.img}
              />
            </div>
            <Typography variant="caption">Thumbnail Url</Typography>
          </Grid>
        </Grid>
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
          id="location"
          label="Location"
          margin="normal"
          variant="outlined"
          fullWidth
          disabled={formIsLoading}
          value={location.value}
          required={location.isRequired}
          error={location.hasError}
          helperText={location.helperText}
          onChange={e => updateLocation(e)}
        />
        <TextField
          id="width"
          label="Width"
          margin="normal"
          variant="outlined"
          disabled
          fullWidth
          value={width.value}
          required={width.isRequired}
          error={width.hasError}
          helperText={width.helperText}
        />
        <TextField
          id="height"
          label="Height"
          margin="normal"
          variant="outlined"
          disabled
          fullWidth
          value={height.value}
          required={height.isRequired}
          error={height.hasError}
          helperText={height.helperText}
        />
        <TextField
          multiline
          id="description"
          label="Description"
          margin="normal"
          variant="outlined"
          fullWidth
          disabled={formIsLoading}
          rows="4"
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

AddImageDialog.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  openSnackbar: PropTypes.func,
};

AddImageDialog.defaultProps = {
  isOpen: false,
  handleClose: () => { },
  openSnackbar: () => { },
};

export default AddImageDialog;
