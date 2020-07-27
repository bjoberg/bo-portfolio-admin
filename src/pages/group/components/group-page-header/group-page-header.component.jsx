import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import GroupPageHeaderStyles from './group-page-header.styles';

const useStyles = makeStyles(GroupPageHeaderStyles);

const GroupPageHeader = (props) => {
  const classes = useStyles();
  const {
    title, totalImages, isEditable, handleUpdate,
  } = props;

  const [groupTitle, setGroupTitle] = useState({ previous: title, current: title });

  /**
   * Update the group's title when the textfield is blurred
   */
  const handleOnBlur = () => {
    if (groupTitle.current !== groupTitle.previous) handleUpdate(groupTitle.current);
  };

  /**
   * Update the group title after textfield input
   *
   * @param {Object} e event triggered by the textfield change
   */
  const handleOnChange = (e) => {
    const { value } = e.target;
    setGroupTitle(prevState => ({
      previous: prevState.current,
      current: value,
    }));
  };

  return (
    <div className={classes.root}>
      <TextField
        fullWidth
        multiline
        value={groupTitle.current}
        disabled={!isEditable}
        onBlur={() => handleOnBlur()}
        onChange={e => handleOnChange(e)}
        InputProps={{
          disableUnderline: !isEditable,
          classes: {
            disabled: classes.textField,
            input: classes.textField,
          },
        }}
      />
      <Typography variant="caption" color="textSecondary">{`${totalImages} images`}</Typography>
    </div>
  );
};

GroupPageHeader.propTypes = {
  title: PropTypes.string,
  totalImages: PropTypes.number,
  isEditable: PropTypes.bool,
  handleUpdate: PropTypes.func,
};

GroupPageHeader.defaultProps = {
  title: '',
  totalImages: 0,
  isEditable: false,
  handleUpdate: () => { },
};

export default GroupPageHeader;
