import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import PhotoIcon from '@material-ui/icons/Photo';
import { Link } from 'react-router-dom';
import Markdown from '../../components/markdown';
import HomePageStyles from './home.styles';
import src from '../../media/profile.png';
import content from '../../content/overview.md';

const useStyles = makeStyles(HomePageStyles);

const HomePage = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.media}>
        <img src={src} alt="brett oberg photography" className={classes.img} />
      </div>
      <div className={classes.content}>
        <Markdown content={content} />
        <div className={classes.callToAction}>
          <Link to="/images" className={classes.link}>
            <Button variant="outlined" color="primary" size="large" startIcon={<PhotoIcon />}>
              View Images
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
