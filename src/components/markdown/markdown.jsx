import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MarkdownStyles from './markdown.styles';

const wrapMarkup = html => ({
  __html: html,
});

const Markdown = (props) => {
  const { content } = props;
  return (
    <div dangerouslySetInnerHTML={wrapMarkup(content)} />
  );
};

Markdown.propTypes = {
  content: PropTypes.string,
};

Markdown.defaultProps = {
  content: '',
};

export default withStyles(MarkdownStyles)(Markdown);
