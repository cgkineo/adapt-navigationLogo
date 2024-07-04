import React from 'react';
import device from 'core/js/device';
import { classes, templates } from 'core/js/reactHelpers';

export default function NavigationLogo(props) {
  const {
    _hideLogoForMobile,
    _fillNavHeight,
    _graphic
  } = props;

  const hideLogoForMobile = ( _hideLogoForMobile && !device.isScreenSizeMin('medium') )
    ? false
    : true;

  return (
    <>
      {hideLogoForMobile &&
      <div
        className={classes([
          'navigation-logo__inner',
          _fillNavHeight && 'is-fill'
        ])}
      >

        <templates.image {..._graphic}
          classNamePrefixes={['navigation-logo']}
          attributionClassNamePrefixes={['navigation-logo']}
        />

      </div>
      }
    </>
  );
}
