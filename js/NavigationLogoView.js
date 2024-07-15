import Adapt from 'core/js/adapt';
import data from 'core/js/data';
import location from 'core/js/location';
import router from 'core/js/router';
import React from 'react';
import ReactDOM from 'react-dom';
import { templates } from 'core/js/reactHelpers';

class NavigationLogoView extends Backbone.View {

  className() {
    return [
      'navigation-logo',
      NavigationLogoView.courseConfig._routeToLocation && 'has-link'
    ].filter(Boolean).join(' ');
  }

  attributes() {
    return {
      'data-order': (Adapt.course.get('_globals')?._extensions?._navigationLogo?._navOrder || 0),
      role: NavigationLogoView.courseConfig._routeToLocation && 'link',
      tabindex: NavigationLogoView.courseConfig._routeToLocation && 0
    };
  }

  events() {
    return {
      click: 'navigateToLocation',
      keydown: 'navigateToLocation'
    };
  }

  initialize() {
    this.listenTo(Adapt, 'device:changed', this.render);
    this.navigateToLocation = this.navigateToLocation.bind(this);
    this.render();
  }

  static get courseConfig() {
    return Adapt.course.get('_navigationLogo');
  }

  render() {
    ReactDOM.render(<templates.navigationLogo {...this.model.toJSON()} />, this.el);
  }

  navigateToLocation(event) {
    const redirectToId = NavigationLogoView.courseConfig._routeToLocation;
    if (!redirectToId) return;

    if (event.code && !['Space', 'Enter'].includes(event.code)) return;
    if (event?.preventDefault) event.preventDefault();

    const model = data.findById(redirectToId);
    if (!model) return;

    const currentLocation = location._currentId;
    switch (model.get('_type')) {
      case 'course':
        if (currentLocation === 'course') return;
        router.navigateToHomeRoute();
        break;
      case 'menu':
      case 'page':
        if (currentLocation === model.get('_id')) return;
        router.navigateToElement(model.get('_id'));
        break;
    }
  }
};

export default NavigationLogoView;
