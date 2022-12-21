import Adapt from 'core/js/adapt';
import NavigationLogoView from './NavigationLogoView';

class NavigationLogo extends Backbone.Controller {

  initialize() {
    this.listenTo(Adapt, 'adapt:initialize', this.onDataReady);
  }

  onDataReady() {
    if (this.logoView) this.logoView.remove();

    const config = Adapt.course.get('_navigationLogo');
    if (!config || !config._isEnabled) return;

    const model = new Backbone.Model(config);
    this.logoView = new NavigationLogoView({ model });

    const selector = '.js-nav-back-btn';
    this.logoView.$el.insertAfter($(selector));
  }
};

export default new NavigationLogo();
