import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider, Link } from '@material-ui/core';

import FullDrawerHeaderStyles from './full-drawer-header.styles';
import personalData from '../../../../utils/personal-data';

const useStyles = makeStyles(FullDrawerHeaderStyles);

const FullDrawerHeader = (props) => {
  const classes = useStyles();
  const { title, subtitle } = props;

  return (
    <Fragment>
      <div className={classes.root}>
        <Typography variant="h5">
          {title}
        </Typography>
        <Link href={`mailto:${subtitle}`} variant="subtitle2">
          {subtitle}
        </Link>
      </div>
      <Divider />
    </Fragment>
  );
};

FullDrawerHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

FullDrawerHeader.defaultProps = {
  title: `${personalData.firstName} ${personalData.lastName}`,
  subtitle: `${personalData.contact.email}`,
};

export default FullDrawerHeader;
