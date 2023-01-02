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
    this.setLogoImageSrc();
    this.hideForMobile();

    ReactDOM.render(<templates.navigationLogo {...this.model.toJSON()} />, this.el);
  }

  setIsDeviceSmall() {
    this.model.set('_isDeviceSmall', device.screenSize === 'small');
  }

  setLogoImageSrc() {
    const config = this.model.get('_graphic');
    if (!config._mobileSrc) return;

    const _isDeviceSmall = this.model.get('_isDeviceSmall');
    const src = _isDeviceSmall ? config._mobileSrc : config.src;

    this.model.set('src', src);
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

NavigationLogoView.template = 'navigationLogo.jsx';

export default NavigationLogoView;
