import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

import FullDrawerListItemStyles from './full-drawer-list-item.styles';

const useStyles = makeStyles(FullDrawerListItemStyles);

const FullDrawerListItem = (props) => {
  const classes = useStyles();
  const { item, handleClose } = props;

  return (
    <NavLink
      activeClassName={classes.linkIsActive}
      className={classes.link}
      to={item.route}
      onClick={handleClose}
      exact
    >
      <ListItem button className={classes.listItem}>
        <ListItemIcon className={classes.listIcon}>
          {item.icon}
        </ListItemIcon>
        <ListItemText primary={item.text} />
      </ListItem>
    </NavLink>
  );
};

FullDrawerListItem.propTypes = {
  item: PropTypes.shape({
    identifier: PropTypes.string,
    text: PropTypes.string,
    icon: PropTypes.element,
    route: PropTypes.string,
  }).isRequired,
  handleClose: PropTypes.func,
};

FullDrawerListItem.defaultProps = {
  handleClose: () => {},
};

export default FullDrawerListItem;
