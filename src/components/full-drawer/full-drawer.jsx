import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, List } from '@material-ui/core';

import FullDrawerStyles from './full-drawer.styles';
import FullDrawerListItem from './components/full-drawer-list-item/full-drawer-list-item';
import FullDrawerHeader from './components/full-drawer-header/full-drawer-header';

const useStyles = makeStyles(FullDrawerStyles);

const FullDrawer = (props) => {
  const classes = useStyles();
  const { items, isOpen, handleClose } = props;

  return (
    <Drawer
      className={classes.drawer}
      variant="temporary"
      anchor="left"
      open={isOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <FullDrawerHeader />
      <List className={classes.list}>
        {items.map(item => (
          <FullDrawerListItem key={item.identifier} item={item} handleClose={handleClose} />
        ))}
      </List>
    </Drawer>
  );
};

FullDrawer.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    identifer: PropTypes.string,
    text: PropTypes.string,
    icon: PropTypes.element,
    route: PropTypes.string,
  })),
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
};

FullDrawer.defaultProps = {
  items: [],
  isOpen: false,
  handleClose: () => { },
};

export default FullDrawer;
