import Adapt from 'core/js/adapt';
import device from 'core/js/device';
import React from 'react';
import ReactDOM from 'react-dom';
import { templates } from 'core/js/reactHelpers';

export default class NavigationLogoView extends Backbone.View {

  className() {
    return 'navigation-logo';
  }

  initialize() {
    this.render();
    this.listenTo(Adapt, 'device:changed', this.onDeviceResize);
  }

  onDeviceResize() {
    this.postRender();
  }

  postRender() {
    const config = this.model.get('_graphic');
    if (this.model.get('_hideLogoForMobile')) {
      this.hideLogoForMobile();
    }
    if (config && config._mobileSrc) {
      this.setLogoImageSrc(config);
    }
  }

  hideLogoForMobile() {
    const isDeviceSmall = device.screenSize === 'small';
    $('.navigation-logo__image').toggleClass('u-display-none', isDeviceSmall);
  }

  setLogoImageSrc(config) {
    const src = device.screenSize === 'small' ? config._mobileSrc : config.src;

    $('.navigation-logo__image').attr('src', src);
  }

  render() {
    ReactDOM.render(<templates.navigationLogo {...this.model.toJSON()} />, this.el);

    _.defer(this.postRender.bind(this));

    return this;
  }

};
