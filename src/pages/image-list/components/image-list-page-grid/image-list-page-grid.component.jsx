import React, {
  useState, useEffect, useCallback, useRef,
} from 'react';
import PropTypes from 'prop-types';

import { isAtEnd, useInfiniteScroll } from '../../../../hooks/infinite-scroll';
import ImageService from '../../../../services/image.service';
import { ImageGrid } from '../../../../components/image-grid';

const imageService = new ImageService();

const ImageListPageGrid = (props) => {
  const limit = 30;
  const { openSnackbar, handlePageIsLoaded, handlePageHasError } = props;

  const imageGridRef = useRef(null);

  const [images, setImages] = useState([]);
  const [imagesPage, setImagesPage] = useState(0);
  const [isEndOfImages, setIsEndOfImages] = useState(false);
  const [hasErrorFetchingImages, setHasErrorFetchingImages] = useState(false);

  const handlePaginateImages = useCallback((isFetching) => {
    const paginateImages = async () => {
      try {
        const next = imagesPage + 1;
        const result = await imageService.getImages(limit, next);
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
  }, [imagesPage, openSnackbar]);

  const [isFetchingImages] = useInfiniteScroll(handlePaginateImages, isEndOfImages,
    hasErrorFetchingImages, imageGridRef);

  useEffect(() => {
    const getInitialImages = async () => {
      try {
        handlePageIsLoaded(false);
        const result = await imageService.getImages(limit);
        setIsEndOfImages(isAtEnd(result.totalItems, limit, 1));
        setImages(result.data);
      } catch (error) {
        handlePageHasError(true);
      } finally {
        handlePageIsLoaded(true);
      }
    };
    getInitialImages();
  }, [handlePageHasError, handlePageIsLoaded]);

  return (<ImageGrid domRef={imageGridRef} images={images} isLoading={isFetchingImages} />);
};

ImageListPageGrid.propTypes = {
  openSnackbar: PropTypes.func,
  handlePageIsLoaded: PropTypes.func,
  handlePageHasError: PropTypes.func,
};

ImageListPageGrid.defaultProps = {
  openSnackbar: () => { },
  handlePageIsLoaded: () => { },
  handlePageHasError: () => { },
};


export default ImageListPageGrid;
