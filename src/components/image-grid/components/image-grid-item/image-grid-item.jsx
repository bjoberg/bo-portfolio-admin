import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import {
  useMediaQuery, Checkbox,
} from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';

import ImageGridItemStyles from './image-grid-item.styles';

const useStyles = makeStyles(ImageGridItemStyles);

const ImageGridItem = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const {
    id, imageUrl, title, imageHeight, imageWidth, isSelected, isEditable, handleImageSelect,
  } = props;

  let height = theme.image.height.large;
  if (isMobile) height = theme.image.height.small;
  const width = (height / imageHeight) * imageWidth;

  return (
    <div
      className={clsx(classes.root, isSelected && classes.selected)}
      style={{ width }}
    >
      {isEditable && (
        <div className={classes.actionBar}>
          <Checkbox
            color="secondary"
            checked={isSelected}
            onClick={() => handleImageSelect(id)}
            icon={<CircleUnchecked />}
            checkedIcon={<CircleCheckedFilled />}
          />
        </div>
      )}
      <Link key={id} to={`/image/${id}`} className={classes.link}>
        <img
          className={classes.img}
          id={id}
          src={imageUrl}
          alt={title}
        />
      </Link>
    </div>
  );
};

ImageGridItem.propTypes = {
  id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string,
  imageHeight: PropTypes.number,
  imageWidth: PropTypes.number,
  isSelected: PropTypes.bool,
  isEditable: PropTypes.bool,
  handleImageSelect: PropTypes.func,
};

ImageGridItem.defaultProps = {
  title: '',
  imageHeight: 100,
  imageWidth: 100,
  isSelected: false,
  isEditable: false,
  handleImageSelect: () => { },
};

export default ImageGridItem;
