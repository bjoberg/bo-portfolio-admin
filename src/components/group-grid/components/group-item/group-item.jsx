import React, {
  Fragment, useCallback, useState, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import GroupItemStyles from './group-item.styles';
import ActionMenu from '../../../action-menu/action-menu';

const useStyles = makeStyles(GroupItemStyles);

const GroupItem = (props) => {
  const classes = useStyles();
  const {
    id, imageUrl, title, isRemovable, handleRemoveOnClick,
  } = props;
  const [options, setOptions] = useState([]);

  /**
   * Build the options menu based on provided props
   */
  const constructOptions = useCallback(() => {
    const values = [];
    if (isRemovable) {
      values.push({
        id: 0,
        value: 'Delete group',
        handleOnClick: handleRemoveOnClick,
      });
    }
    setOptions(values);
  }, [handleRemoveOnClick, isRemovable]);

  useEffect(() => {
    constructOptions();
  }, [constructOptions]);

  return (
    <Fragment>
      <div className={classes.root}>
        {isRemovable && (
          <div className={classes.actionBar}>
            <ActionMenu parentId={id} options={options} />
          </div>
        )}
        <Link to={`/group/${id}`} className={classes.link}>
          <div className={classes.imgContainer}>
            <img
              id={id}
              src={imageUrl}
              alt={title}
              className={classes.img}
            />
          </div>
        </Link>
      </div>
      <div className={classes.textContainer}>
        <Typography variant="body1">
          {title}
        </Typography>
      </div>
    </Fragment>
  );
};

GroupItem.propTypes = {
  id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isRemovable: PropTypes.bool,
  handleRemoveOnClick: PropTypes.func,
};

GroupItem.defaultProps = {
  isRemovable: false,
  handleRemoveOnClick: () => { },
};

export default GroupItem;
