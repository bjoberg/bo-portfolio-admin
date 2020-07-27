import React, {
  useState, useEffect, useCallback, Fragment, useRef,
} from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import httpStatus from 'http-status';

import GroupService from '../../services/group.service';
import { displayPageError } from '../utils';
import ErrorPage from '../error/error.page';
import GroupListPageStyles from './group-list.styles';
import { GroupGrid } from '../../components/group-grid';
import AlertDialog from '../../components/alert-dialog';
import { isAtEnd, useInfiniteScroll } from '../../hooks/infinite-scroll';

const groupService = new GroupService();
const useStyles = makeStyles(GroupListPageStyles);

const GroupListPage = (props) => {
  const classes = useStyles();

  const { isEditable, openSnackbar } = props;
  const limit = 30;

  const groupGridRef = useRef(null);

  const [pageHasError, setPageHasError] = useState(false);
  const [pageError, setPageError] = useState();
  const [pageIsLoaded, setPageIsLoaded] = useState(false);
  const [groups, setGroups] = useState();
  const [selectedGroupId, setSelectedGroupId] = useState();
  const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);
  const [deleteDialogIsDisabled, setDeleteDialogIsDisabled] = useState(false);
  const [groupsPage, setGroupsPage] = useState(0);
  const [isEndOfGroups, setIsEndOfGroups] = useState(false);
  const [hasErrorFetchingGroups, setHasErrorFetchingGroups] = useState(false);

  /**
   * Request next page of groups
   *
   * @param {boolean} isFetching status of the group request
   */
  const handlePaginateGroups = useCallback((isFetching) => {
    const paginateGroups = async () => {
      try {
        const next = groupsPage + 1;
        const result = await groupService.getGroups(limit, next);
        setGroups(prevState => [...prevState, ...result.data]);
        setIsEndOfGroups(isAtEnd(result.totalItems, limit, next + 1));
        isFetching(false);
        setGroupsPage(next);
      } catch (error) {
        setHasErrorFetchingGroups(true);
        isFetching(false);
        openSnackbar('error', `${error.message} Refresh to try again.`);
      }
    };
    paginateGroups();
  }, [groupsPage, openSnackbar]);

  const [isLoadingGroups] = useInfiniteScroll(handlePaginateGroups, isEndOfGroups,
    hasErrorFetchingGroups, groupGridRef);

  const openDeleteDialog = (groupId) => {
    setSelectedGroupId(groupId);
    setDeleteDialogIsOpen(true);
  };
  const closeDeleteDialog = () => {
    setSelectedGroupId(undefined);
    setDeleteDialogIsOpen(false);
  };

  /**
   * Make request to remove group from db and splice it from the group list.
   *
   * @param {string} groupId Id of the group to remove
   */
  const removeGroup = async () => {
    try {
      setDeleteDialogIsDisabled(true);
      await groupService.deleteGroup(selectedGroupId);
      const tempGroups = groups;
      const index = tempGroups.map(group => group.id).indexOf(selectedGroupId);
      tempGroups.splice(index, 1);
      setGroups([...tempGroups]);
      closeDeleteDialog();
    } catch (error) {
      openSnackbar('error', error.message);
    } finally {
      setDeleteDialogIsDisabled(false);
    }
  };

  /**
   * Make request to get group data
   */
  const getGroups = useCallback(async () => {
    try {
      setPageIsLoaded(false);
      const result = await groupService.getGroups();
      setGroups(result.data);
    } catch (error) {
      const defaultStatusCode = httpStatus.INTERNAL_SERVER_ERROR;
      const defaultStatusMessage = 'Unknown error has occured while getting groups';
      displayPageError(setPageError, setPageHasError, defaultStatusCode, defaultStatusMessage,
        error);
    } finally {
      setPageIsLoaded(true);
    }
  }, []);

  /**
   * Load the group data when the page is loaded
   */
  useEffect(() => { getGroups(); }, [getGroups]);

  if (pageHasError) {
    return (
      <ErrorPage
        title={pageError.title}
        details={pageError.details}
        actionButtonLink="/"
        actionButtonTitle="Go Home"
      />
    );
  }

  if (!pageHasError && !pageIsLoaded) {
    return (
      <div className={classes.progressBarContainer}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Fragment>
      <div className={classes.root}>
        <GroupGrid
          domRef={groupGridRef}
          groups={groups}
          isRemovable={isEditable}
          handleRemoveOnClick={openDeleteDialog}
          isLoading={isLoadingGroups}
        />
      </div>
      <AlertDialog
        id="alert-dialog--delete"
        isOpen={deleteDialogIsOpen}
        isDisabled={deleteDialogIsDisabled}
        title="Remove group?"
        body={`You are about to remove group ${selectedGroupId}. This will not delete the images, it will only disassociate the images from the group and then delete the group.`}
        closeButtonText="Cancel"
        confirmButtonText="Delete"
        handleClose={closeDeleteDialog}
        handleConfirm={removeGroup}
      />
    </Fragment>
  );
};

GroupListPage.propTypes = {
  isEditable: PropTypes.bool,
  openSnackbar: PropTypes.func,
};

GroupListPage.defaultProps = {
  isEditable: false,
  openSnackbar: () => { },
};

export default GroupListPage;
