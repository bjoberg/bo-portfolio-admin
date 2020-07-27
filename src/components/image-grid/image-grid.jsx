import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  RootRef, CircularProgress, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ImageGridStyles from './image-grid.styles';
import ImageGridItem from './components/image-grid-item/image-grid-item';

const useStyles = makeStyles(ImageGridStyles);

const ImageGrid = (props) => {
  const classes = useStyles();
  const {
    domRef, images, selectedImages, isLoading, isEditable, handleImageSelect,
  } = props;

  /**
   * Determine if image is selected or not
   *
   * @param {string} imageId id of image to find
   */
  const getIsSelected = (imageId) => {
    const isFound = selectedImages.find(el => el === imageId);
    if (isFound) return true;
    return false;
  };

  if (images.length === 0) {
    return (<Typography>No images to display.</Typography>);
  }

  return (
    <Fragment>
      <RootRef rootRef={domRef}>
        <div className={classes.root}>
          {images.map(item => (
            <ImageGridItem
              id={item.id}
              key={item.id}
              title={item.title}
              imageUrl={item.imageUrl}
              imageHeight={item.height}
              imageWidth={item.width}
              isEditable={isEditable}
              isSelected={getIsSelected(item.id)}
              handleImageSelect={handleImageSelect}
            />
          ))}
        </div>
      </RootRef>
      {isLoading && (
        <div className={classes.circularProgressContainer}>
          <CircularProgress />
        </div>
      )}
    </Fragment>
  );
};

ImageGrid.propTypes = {
  domRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  images: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
  })),
  selectedImages: PropTypes.arrayOf(PropTypes.string),
  isLoading: PropTypes.bool,
  isEditable: PropTypes.bool,
  handleImageSelect: PropTypes.func,
};

ImageGrid.defaultProps = {
  domRef: null,
  images: [],
  selectedImages: [],
  isLoading: false,
  isEditable: false,
  handleImageSelect: () => { },
};

export default ImageGrid;
