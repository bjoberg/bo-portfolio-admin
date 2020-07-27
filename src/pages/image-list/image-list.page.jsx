import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ImageListPageStyles from './image-list.styles';
import ImageListPageGrid from './components/image-list-page-grid/image-list-page-grid.component';
import ErrorPage from '../error/error.page';

const useStyles = makeStyles(ImageListPageStyles);

const ImageListPage = (props) => {
  const classes = useStyles();
  const { openSnackbar } = props;

  const [pageIsLoaded, setPageIsLoaded] = useState(false);
  const [pageHasError, setPageHasError] = useState(false);

  if (pageHasError) return <ErrorPage title="Error" details="Unable to retrieve images" />;

  return (
    <Fragment>
      {!pageIsLoaded && (
        <div className={classes.linearProgressContainer}>
          <LinearProgress />
        </div>
      )}
      <ImageListPageGrid
        openSnackbar={openSnackbar}
        handlePageIsLoaded={setPageIsLoaded}
        handlePageHasError={setPageHasError}
      />
    </Fragment>
  );
};

ImageListPage.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
      search: PropTypes.string,
      hash: PropTypes.string,
      state: PropTypes.string,
      key: PropTypes.string,
    }),
    push: PropTypes.func,
    replace: PropTypes.func,
  }),
  openSnackbar: PropTypes.func,
};

ImageListPage.defaultProps = {
  history: undefined,
  openSnackbar: () => { },
};

export default ImageListPage;
