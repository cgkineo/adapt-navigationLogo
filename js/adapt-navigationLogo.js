import Adapt from 'core/js/adapt';
import NavigationLogoView from './NavigationLogoView';

class NavigationLogo extends Backbone.Controller {

  initialize() {
    this.listenTo(Adapt, {
      'menuView:postRender pageView:postRender': this.onPostRender
    });
  }

  static get courseConfig() {
    return Adapt.course.get('_navigationLogo');
  }

  onPostRender(view) {
    if (this.logoView) this.logoView.remove();

    const config = view.model.get('_navigationLogo');
    if (
      (!NavigationLogo.courseConfig || !NavigationLogo.courseConfig._isEnabled) ||
      (config && (!config._isEnabled || config._isHiddenOnMenu))
    ) return;

    const model = new Backbone.Model(config);
    model.set('_fillNavHeight', NavigationLogo.courseConfig._fillNavHeight);
    this.logoView = new NavigationLogoView({ model });

    const selector = '.js-nav-back-btn';
    this.logoView.$el.insertAfter($(selector));
  }
};

export default new NavigationLogo();
