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
  }

  onDeviceResize() {
    this.render();
  }

  postRender() {
    this.listenTo(Adapt, 'device:changed', this.onDeviceResize);
  }

  setIsDeviceSmall() {
    this.model.set('_isDeviceSmall', device.screenSize === 'small');
  }

  setLogoImageSrc() {
    const config = this.model.get('_graphic');
    const mobileSrc = config._mobileSrc || config.src;
    const src = device.screenSize === 'small' ? mobileSrc : config.src;

    this.model.set('src', src);
  }

  render() {
    this.setIsDeviceSmall();
    this.setLogoImageSrc();

    ReactDOM.render(<templates.navigationLogo {...this.model.toJSON()} />, this.el);

    _.defer(this.postRender.bind(this));

    return this;
  }

};
