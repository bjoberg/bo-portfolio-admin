import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, Toolbar, Typography, IconButton, Button, Tooltip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternateOutlined';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';

import ActionBarStyles from './action-bar.styles';
import ProfileMenu from './components/profile-menu/profile-menu';
import ElevationScroll from './components/elevation-scroll/elevation-scroll';
import GoogleUser from '../../models/google-user.model';

const useStyles = makeStyles(ActionBarStyles);

const ActionBar = (props) => {
  const classes = useStyles();
  const {
    title,
    navButtonColor,
    actionButtonColor,
    isDisabled,
    elevateOnScroll,
    showDelete,
    showInfo,
    showAddPhoto,
    showSave,
    showAddGroup,
    showAvatar,
    saveButtonText,
    user,
    navButton,
    handleNav,
    handleDelete,
    handleInfo,
    handleAddPhoto,
    handleSave,
    handleAddGroup,
    handleLogout,
  } = props;

  return (
    <ElevationScroll elevateOnScroll={elevateOnScroll}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color={navButtonColor}
            className={classes.navButton}
            aria-label="navigation"
            edge="start"
            onClick={() => handleNav()}
          >
            {navButton}
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          <div className={clsx(showAvatar && classes.actionButtonGroup)}>
            {showDelete && (
              <Tooltip title="Delete">
                <IconButton
                  color={actionButtonColor}
                  aria-label="delete"
                  edge="start"
                  onClick={() => handleDelete()}
                  disabled={isDisabled}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            )}
            {showAddPhoto && (
              <Tooltip title="Add Image">
                <IconButton
                  color={actionButtonColor}
                  aria-label="add-image"
                  edge="end"
                  onClick={() => handleAddPhoto()}
                  disabled={isDisabled}
                >
                  <AddPhotoIcon />
                </IconButton>
              </Tooltip>
            )}
            {showAddGroup && (
              <Tooltip title="Add Group">
                <IconButton
                  color={actionButtonColor}
                  aria-label="add-group"
                  edge="end"
                  onClick={() => handleAddGroup()}
                  disabled={isDisabled}
                >
                  <PhotoLibraryIcon />
                </IconButton>
              </Tooltip>
            )}
            {showSave && (
              <Button
                variant="contained"
                color={actionButtonColor}
                onClick={() => handleSave()}
                disabled={isDisabled}
              >
                {saveButtonText}
              </Button>
            )}
            {showInfo && (
              <Tooltip title="Info">
                <IconButton
                  color={actionButtonColor}
                  aria-label="info"
                  edge="end"
                  onClick={() => handleInfo()}
                  disabled={isDisabled}
                >
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            )}
          </div>
          {showAvatar && (
            <ProfileMenu user={user} handleLogout={handleLogout} />
          )}
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};

ActionBar.propTypes = {
  title: PropTypes.string,
  navButtonColor: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
  actionButtonColor: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
  isDisabled: PropTypes.bool,
  elevateOnScroll: PropTypes.bool,
  showDelete: PropTypes.bool,
  showInfo: PropTypes.bool,
  showAddPhoto: PropTypes.bool,
  showSave: PropTypes.bool,
  showAddGroup: PropTypes.bool,
  showAvatar: PropTypes.bool,
  saveButtonText: PropTypes.string,
  user: PropTypes.instanceOf(GoogleUser),
  navButton: PropTypes.element,
  handleNav: PropTypes.func,
  handleDelete: PropTypes.func,
  handleInfo: PropTypes.func,
  handleAddPhoto: PropTypes.func,
  handleAddGroup: PropTypes.func,
  handleSave: PropTypes.func,
  handleLogout: PropTypes.func,
};

ActionBar.defaultProps = {
  title: '',
  navButtonColor: 'default',
  actionButtonColor: 'default',
  isDisabled: false,
  elevateOnScroll: false,
  showDelete: false,
  showInfo: false,
  showAddPhoto: false,
  showSave: false,
  showAddGroup: false,
  showAvatar: false,
  saveButtonText: 'Save',
  user: undefined,
  navButton: <MenuIcon />,
  handleNav: () => { },
  handleDelete: () => { },
  handleInfo: () => { },
  handleAddPhoto: () => { },
  handleAddGroup: () => { },
  handleSave: () => { },
  handleLogout: () => { },
};

export default ActionBar;
