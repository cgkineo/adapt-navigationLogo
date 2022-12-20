import React from 'react';
import { classes } from 'core/js/reactHelpers';

export default function NavigationLogo(props) {
  const {
    _graphic,
    src,
    _fillNavHeight,
    _hideLogoForMobile,
    _isDeviceSmall
  } = props;

  return (

    <div
      className={classes([
        'navigation-logo__inner',
        _fillNavHeight && 'is-fill',
        (_isDeviceSmall && _hideLogoForMobile) && 'u-display-none'
      ])}
      aria-hidden={!_graphic.alt || null}
    >
      <img
        className='navigation-logo__image'
        src={src}
        aria-label={_graphic.alt || null}
      />
    </div>

  );
}
