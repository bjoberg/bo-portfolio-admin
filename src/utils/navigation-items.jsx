import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import PhotoIcon from '@material-ui/icons/Photo';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';

import NavigationItem from './navigation-item';

const home = new NavigationItem({
  identifier: 'home',
  text: 'Home',
  icon: <HomeIcon />,
  route: '/',
});

const images = new NavigationItem({
  identifier: 'images',
  text: 'Images',
  icon: <PhotoIcon />,
  route: '/images',
});

const groups = new NavigationItem({
  identifier: 'groups',
  text: 'Groups',
  icon: <PhotoLibraryIcon />,
  route: '/groups',
});

const NavigationItems = [
  home,
  images,
  groups,
];

export default NavigationItems;
