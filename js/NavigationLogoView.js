import Adapt from 'core/js/adapt';
import AdaptView from 'core/js/views/adaptView';
import device from 'core/js/device';

class NavigationLogoView extends AdaptView {

  className() {
    return 'navigation-logo';
  }

  postRender() {
    this.checkMobile();
    this.listenTo(Adapt, 'device:changed', this.checkMobile);
  }

  checkMobile() {
    this.setIsDeviceSmall();
    this.setLogoImageSrc();
  }

  setIsDeviceSmall() {
    this.model.set('_isDeviceSmall', device.screenSize === 'small');
  }

  setLogoImageSrc() {
    const config = this.model.get('_graphic');
    const mobileSrc = config._mobileSrc || config.src;
    const isDeviceSmall = this.model.get('_isDeviceSmall');
    const src = isDeviceSmall ? mobileSrc : config.src;

    this.model.set('src', src);
  }
};

NavigationLogoView.template = 'navigationLogo.jsx';

export default NavigationLogoView;
