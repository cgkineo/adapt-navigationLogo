import Adapt from 'core/js/adapt';
import NavigationLogoView from './NavigationLogoView';

class NavigationLogo extends Backbone.Controller {

  initialize() {
    this.listenTo(Adapt, {
      'contentObjectView:postRender': this.onContentObjectPostRender
    });
  }

  static get courseConfig() {
    return Adapt.course.get('_navigationLogo');
  }

  onContentObjectPostRender(view) {
    if (this.logoView) this.logoView.remove();

    const config = view.model.get('_navigationLogo');
    if (
      (!NavigationLogo.courseConfig?._isEnabled) ||
      (config && (!config._isEnabled || config._isHiddenOnMenu))
    ) return;

    const model = new Backbone.Model(NavigationLogo.courseConfig);
    model.set('_fillNavHeight', NavigationLogo.courseConfig._fillNavHeight);
    this.logoView = new NavigationLogoView({ model });

    const selector = '.js-nav-back-btn';
    this.logoView.$el.insertAfter($(selector));
  }
};

export default new NavigationLogo();
