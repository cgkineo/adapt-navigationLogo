import Adapt from 'core/js/adapt';
import device from 'core/js/device';
import React from 'react';
import ReactDOM from 'react-dom';
import { templates } from 'core/js/reactHelpers';

class NavigationLogoView extends Backbone.View {

  className() {
    return 'navigation-logo';
  }

  attributes() {
    return {
      'data-order': (Adapt.course.get('_globals')?._extensions?._navigationLogo?._navOrder || 0)
    };
  }

  initialize() {
    this.listenTo(Adapt, 'device:changed', this.changed);
    this.render();
  }

  static get courseConfig() {
    return Adapt.course.get('_navigationLogo');
  }

  render() {
    this.changed();
  }

  changed() {
    this.setIsDeviceSmall();
    this.setLogoSrc();
    this.setLogoAlt();
    this.hideForMobile();

    ReactDOM.render(<templates.navigationLogo {...this.model.toJSON()} />, this.el);
  }

  setIsDeviceSmall() {
    this.model.set('_isDeviceSmall', device.screenSize === 'small');
  }

  setLogoSrc() {
    if (!NavigationLogoView.courseConfig ?._graphic?.src) return;

    const src = NavigationLogoView.courseConfig._graphic.src;
    this.model.set('src', src);

    // Check for mobile graphic
    const _isDeviceSmall = this.model.get('_isDeviceSmall');
    if (!_isDeviceSmall || !NavigationLogoView.courseConfig._graphic?._mobileSrc) return;

    const mobileSrc = NavigationLogoView.courseConfig._graphic._mobileSrc;
    this.model.set('src', mobileSrc);
  }

  setLogoAlt() {
    if (!NavigationLogoView.courseConfig?._graphic?.alt) return;

    const alt = NavigationLogoView.courseConfig._graphic.alt;
    this.model.set('alt', alt);
  }

  hideForMobile() {
    const _isDeviceSmall = this.model.get('_isDeviceSmall');
    const _hideLogoForMobile = NavigationLogoView.courseConfig._hideLogoForMobile;

    if (_isDeviceSmall && _hideLogoForMobile) {
      this.$el.addClass('u-display-none');
    } else {
      this.$el.removeClass('u-display-none');
    }
  }
};

export default NavigationLogoView;
