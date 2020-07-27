import React from 'react';
import PropTypes from 'prop-types';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

const ElevationScroll = (props) => {
  const { children, elevateOnScroll } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  if (!elevateOnScroll) {
    return React.cloneElement(children, {
      elevation: 4,
    });
  }

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
};

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  elevateOnScroll: PropTypes.bool,
};

ElevationScroll.defaultProps = {
  elevateOnScroll: true,
};

export default ElevationScroll;
