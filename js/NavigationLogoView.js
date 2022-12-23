import Adapt from 'core/js/adapt';
import device from 'core/js/device';
import React from 'react';
import ReactDOM from 'react-dom';
import { templates } from 'core/js/reactHelpers';

class NavigationLogoView extends Backbone.View {

  className() {
    return 'navigation-logo';
  }

  initialize() {
    this.listenTo(Adapt, 'device:changed', this.changed);

    this.render();
  }

  render() {
    this.changed();
  }

  changed() {
    this.setIsDeviceSmall();
    this.setLogoImageSrc();

    ReactDOM.render(<templates.navigationLogo {...this.model.toJSON()} />, this.el);
  }

  setIsDeviceSmall() {
    this.model.set('_isDeviceSmall', device.screenSize === 'small');
  }

  setLogoImageSrc() {
    const config = this.model.get('_graphic');
    if (!config._mobileSrc) return;

    const isDeviceSmall = this.model.get('_isDeviceSmall');
    const src = isDeviceSmall ? config._mobileSrc : config.src;

    this.model.set('src', src);
  }
};

NavigationLogoView.template = 'navigationLogo.jsx';

export default NavigationLogoView;
