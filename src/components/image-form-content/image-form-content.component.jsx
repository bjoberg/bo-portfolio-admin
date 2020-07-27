import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const ImageFormContent = (props) => {
  const {
    image,
    isDisabled,
    textFieldHandler,
  } = props;

  return (
    <Fragment>
      <TextField
        id="id"
        label="id"
        margin="normal"
        variant="outlined"
        value={image.id}
        disabled
      />
      <TextField
        id="thumbnailUrl"
        label="Thumbnail url"
        margin="normal"
        variant="outlined"
        value={image.thumbnailUrl}
        onChange={textFieldHandler}
        disabled={isDisabled}
      />
      <TextField
        id="imageUrl"
        label="Image url"
        margin="normal"
        variant="outlined"
        value={image.imageUrl}
        onChange={textFieldHandler}
        disabled={isDisabled}
      />
      <TextField
        id="title"
        label="Title"
        margin="normal"
        variant="outlined"
        value={image.title}
        onChange={textFieldHandler}
        disabled={isDisabled}
      />
      <TextField
        multiline
        id="description"
        label="Description"
        margin="normal"
        variant="outlined"
        rows="4"
        value={image.description}
        onChange={textFieldHandler}
        disabled={isDisabled}
      />
      <TextField
        id="location"
        label="location"
        margin="normal"
        variant="outlined"
        value={image.location}
        onChange={textFieldHandler}
        disabled={isDisabled}
      />
    </Fragment>
  );
};

ImageFormContent.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.string.isRequired,
    thumbnailUrl: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  }).isRequired,
  isDisabled: PropTypes.bool.isRequired,
  textFieldHandler: PropTypes.func.isRequired,
};

export default ImageFormContent;
