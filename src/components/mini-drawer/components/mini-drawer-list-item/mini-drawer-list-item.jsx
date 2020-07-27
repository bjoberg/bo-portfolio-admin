import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

import MiniDrawerListItemStyles from './mini-drawer-list-item.styles';

const useStyles = makeStyles(MiniDrawerListItemStyles);

const MiniDrawerListItem = (props) => {
  const classes = useStyles();
  const { item } = props;

  return (
    <NavLink
      activeClassName={classes.linkIsActive}
      className={classes.link}
      to={item.route}
      exact
    >
      {item.icon}
      <Typography variant="caption">
        {item.text}
      </Typography>
    </NavLink>
  );
};

MiniDrawerListItem.propTypes = {
  item: PropTypes.shape({
    identifier: PropTypes.string,
    text: PropTypes.string,
    icon: PropTypes.element,
    route: PropTypes.string,
  }).isRequired,
};

export default MiniDrawerListItem;
