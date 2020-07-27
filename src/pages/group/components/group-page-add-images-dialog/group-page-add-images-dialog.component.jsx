import React, {
  Fragment, useState, useEffect, useCallback, forwardRef, createRef,
} from 'react';
import PropTypes from 'prop-types';
import httpStatus from 'http-status';
import { Dialog, Slide, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

import { isAtEnd, useInfiniteScroll } from '../../../../hooks/infinite-scroll';
import { displayPageError } from '../../../utils';
import { ImageGrid } from '../../../../components/image-grid';
import GroupPageAddImagesDialogStyles from './group-page-add-images-dialog.styles';
import { ActionBar } from '../../../../components/action-bar';
import ImageService from '../../../../services/image.service';
import ErrorPage from '../../../error/error.page';

const imageService = new ImageService();
const useStyles = makeStyles(GroupPageAddImagesDialogStyles);

/**
 * Transition for displaying dialog
 */
const Transition = forwardRef((props, ref) => (<Slide direction="up" ref={ref} {...props} />));

const GroupPageAddImagesDialog = (props) => {
  const classes = useStyles();
  const {
    groupId, isOpen, handleClose, isEditable, getGroupImages, openSnackbar,
  } = props;
  const limit = 30;

  const imageGridRef = createRef();
  const containerRef = createRef();

  const [dialogIsLoaded, setDialogIsLoaded] = useState(false);
  const [dialogHasError, setDialogHasError] = useState(false);
  const [dialogError, setDialogError] = useState();
  const [images, setImages] = useState([]);
  const [imagesPage, setImagesPage] = useState(0);
  const [isEndOfImages, setIsEndOfImages] = useState(false);
  const [hasErrorFetchingImages, setHasErrorFetchingImages] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  /**
   * Request next page of images
   *
   * @param {boolean} isFetching status of the image request
   */
  const handlePaginateImages = useCallback((isFetching) => {
    const paginateImages = async () => {
      try {
        const next = imagesPage + 1;
        const result = await imageService.getImagesNotForGroup(limit, next, groupId);
        setImages(prevState => [...prevState, ...result.data]);
        setIsEndOfImages(isAtEnd(result.totalItems, limit, next + 1));
        isFetching(false);
        setImagesPage(next);
      } catch (error) {
        setHasErrorFetchingImages(true);
        isFetching(false);
        openSnackbar('error', `${error.message} Refresh to try again.`);
      }
    };
    paginateImages();
  }, [groupId, imagesPage, openSnackbar]);

  const [isLoadingImages] = useInfiniteScroll(handlePaginateImages, isEndOfImages,
    hasErrorFetchingImages, imageGridRef, containerRef);

  /**
   * Make request to retrieve group images
   */
  const getImages = useCallback(async () => {
    try {
      setDialogIsLoaded(false);
      const { data, totalItems } = await imageService.getImagesNotForGroup(30, 0, groupId);
      setImages(data);
      setIsEndOfImages(isAtEnd(totalItems, limit, 1));
    } catch (error) {
      const defaultStatusCode = httpStatus.INTERNAL_SERVER_ERROR;
      const defaultStatusMessage = 'Unknown error has occured while getting group images';
      displayPageError(setDialogError, setDialogHasError, defaultStatusCode, defaultStatusMessage,
        error);
    } finally {
      setDialogIsLoaded(true);
    }
  }, [groupId]);

  /**
   * Add / Remove item from select image array
   *
   * @param {string} selectedImageId id of image that was selected
   */
  const handleImageSelect = (selectedImageId) => {
    const imageIsSelected = selectedImages.find(el => el === selectedImageId);
    if (imageIsSelected) {
      const temp = selectedImages;
      temp.splice(temp.indexOf(selectedImageId), 1);
      setSelectedImages([...temp]);
    } else {
      setSelectedImages([...selectedImages, selectedImageId]);
    }
  };

  /**
   * Add images to the specified group
   */
  const handleAddImagesToGroup = async () => {
    try {
      await imageService.addImagesToGroup(groupId, selectedImages);
      await getGroupImages();
      handleClose();
    } catch (error) {
      openSnackbar('error', `${error.message}`);
    }
  };

  /**
   * Load the initial data for the group being displayed
   */
  useEffect(() => {
    const loadDialogData = async () => { await getImages(); };
    if (isEditable && isOpen) loadDialogData();
  }, [getImages, isEditable, isOpen]);

  /**
   * When the dialog is closed, clear the dialog data
   */
  useEffect(() => {
    if (!isOpen) {
      setImages([]);
      setImagesPage(0);
      setIsEndOfImages(false);
      setHasErrorFetchingImages(false);
      setSelectedImages([]);
    }
  }, [isOpen]);

  return (
    <Dialog
      fullScreen
      open={isOpen}
      TransitionComponent={Transition}
    >
      <ActionBar
        navButton={<CloseIcon />}
        handleNav={handleClose}
        actionButtonColor="secondary"
        showSave
        handleSave={handleAddImagesToGroup}
        isDisabled={isLoadingImages || selectedImages <= 0}
      />
      {dialogHasError && (
        <Fragment>
          <div className={classes.toolbar} />
          <ErrorPage
            title={dialogError.title}
            details={dialogError.details}
          />
        </Fragment>
      )}
      {(!dialogHasError && !dialogIsLoaded) && (
        <div className={classes.progressContainer}>
          <CircularProgress />
        </div>
      )}
      {(!dialogHasError && dialogIsLoaded) && (
        <Fragment>
          <div className={classes.toolbar} />
          <div ref={containerRef} className={classes.dialogContentContainer}>
            <div className={classes.dialogContent}>
              <ImageGrid
                domRef={imageGridRef}
                images={images}
                isEditable
                isLoading={isLoadingImages}
                selectedImages={selectedImages}
                handleImageSelect={handleImageSelect}
              />
            </div>
          </div>
        </Fragment>
      )}
    </Dialog>
  );
};

GroupPageAddImagesDialog.propTypes = {
  openSnackbar: PropTypes.func,
  groupId: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  isEditable: PropTypes.bool,
  getGroupImages: PropTypes.func,
};

GroupPageAddImagesDialog.defaultProps = {
  openSnackbar: () => { },
  isOpen: false,
  handleClose: () => { },
  isEditable: false,
  getGroupImages: () => { },
};

export default GroupPageAddImagesDialog;
