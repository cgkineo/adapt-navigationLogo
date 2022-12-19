import React from 'react';
import { classes } from 'core/js/reactHelpers';

export default function NavigationLogo(props) {
  const {
    _graphic,
    _fillNavHeight
  } = props;

  return (

    <div className={classes([
      'navigation-logo__inner',
      _fillNavHeight && 'is-fill'
    ])}>

      <img
        className='navigation-logo__image'
        src={_graphic.src}
        aria-label={_graphic.alt ? _graphic.alt : null}
        aria-hidden={!_graphic.alt}
      />

    </div>

  );
}
