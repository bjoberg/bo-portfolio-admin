import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const ActionMenu = (props) => {
  const { options, parentId } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const isOpen = Boolean(anchorEl);
  const handleClick = e => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Fragment>
      <IconButton
        aria-label="action-menu"
        aria-controls="action-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
      >
        {options.map(option => (
          <MenuItem
            key={option.id}
            onClick={() => {
              option.handleOnClick(parentId);
              handleClose();
            }}
          >
            {option.value}
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );
};

ActionMenu.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    // Id of the menu item
    id: PropTypes.number,
    // What text should the user see in the menu?
    value: PropTypes.string,
    // What should happen when the user clicks the item?
    handleOnClick: PropTypes.func,
  })).isRequired,
  // Id of the parent component
  // This is used to help determine what item is clicked
  // if action menu is generated for a list of items
  parentId: PropTypes.string,
};

ActionMenu.defaultProps = {
  parentId: undefined,
};

export default ActionMenu;
