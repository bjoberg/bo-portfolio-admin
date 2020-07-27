import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Typography, RootRef, CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import GroupItem from './components/group-item/group-item';
import GroupGridStyles from './group-grid.styles';

const useStyles = makeStyles(GroupGridStyles);

const GroupGrid = (props) => {
  const {
    domRef, groups, isRemovable, handleRemoveOnClick, isLoading,
  } = props;
  const classes = useStyles();

  if (groups.length === 0) {
    return (<Typography>No groups to display.</Typography>);
  }

  return (
    <Fragment>
      <RootRef rootRef={domRef}>
        <Grid container spacing={3}>
          {groups.map(item => (
            <Grid
              key={item.id}
              item
              xs={6}
              sm={4}
              md={3}
              lg={2}
              xl={2}
            >
              <GroupItem
                id={item.id}
                title={item.title}
                imageUrl={item.imageUrl}
                isRemovable={isRemovable}
                handleRemoveOnClick={handleRemoveOnClick}
              />
            </Grid>
          ))}
        </Grid>
      </RootRef>
      {isLoading && (
        <div className={classes.circularProgressContainer}>
          <CircularProgress />
        </div>
      )}
    </Fragment>
  );
};

GroupGrid.propTypes = {
  domRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  groups: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    thumbnailUrl: PropTypes.string,
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  })),
  isRemovable: PropTypes.bool,
  handleRemoveOnClick: PropTypes.func,
  isLoading: PropTypes.bool,
};

GroupGrid.defaultProps = {
  domRef: null,
  groups: [],
  isRemovable: false,
  handleRemoveOnClick: () => { },
  isLoading: false,
};

export default GroupGrid;
