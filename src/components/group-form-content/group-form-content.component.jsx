import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const GroupFormContent = (props) => {
  const {
    group,
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
        value={group.id}
        disabled
      />
      <TextField
        id="thumbnailUrl"
        label="Thumbnail url"
        margin="normal"
        variant="outlined"
        value={group.thumbnailUrl}
        onChange={textFieldHandler}
        disabled={isDisabled}
      />
      <TextField
        id="imageUrl"
        label="Image url"
        margin="normal"
        variant="outlined"
        value={group.imageUrl}
        onChange={textFieldHandler}
        disabled={isDisabled}
      />
      <TextField
        id="title"
        label="Title"
        margin="normal"
        variant="outlined"
        value={group.title}
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
        value={group.description}
        onChange={textFieldHandler}
        disabled={isDisabled}
      />
    </Fragment>
  );
};

GroupFormContent.propTypes = {
  group: PropTypes.shape({
    id: PropTypes.string.isRequired,
    thumbnailUrl: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  isDisabled: PropTypes.bool.isRequired,
  textFieldHandler: PropTypes.func.isRequired,
};

export default GroupFormContent;
