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
    let src;

    // Course config
    const courseConfig = Adapt.course.get('_navigationLogo');
    if (courseConfig?._graphic?._src) {
      src = courseConfig._graphic._src;
    }

    // Allow override per content object
    const thisConfig = this.model.get('_navigationLogo');
    if (thisConfig?._graphic?._src) {
      src = this.model.get('_graphic')._src;
    }

    this.model.set('src', src);

    // Check for mobile graphic
    const _isDeviceSmall = this.model.get('_isDeviceSmall');
    if (!_isDeviceSmall || !graphic._mobileSrc) return;

    this.model.set('src', graphic._mobileSrc);
  }

  setLogoAlt() {
    let alt;

    // Course config
    const courseConfig = Adapt.course.get('_navigationLogo');
    if (courseConfig?._graphic?.alt) {
      alt = courseConfig._graphic.alt;
    }

    // Allow override per content object
    const thisConfig = this.model.get('_navigationLogo');
    if (thisConfig?._graphic?.alt) {
      alt = this.model.get('_graphic').alt;
    }

    this.model.set('alt', alt);
  }

  hideForMobile() {
    const _isDeviceSmall = this.model.get('_isDeviceSmall');
    const _hideLogoForMobile = this.model.get('_hideLogoForMobile');

    if (_isDeviceSmall && _hideLogoForMobile) {
      this.$el.addClass('u-display-none');
    } else {
      this.$el.removeClass('u-display-none');
    }
  }
};

export default NavigationLogoView;
