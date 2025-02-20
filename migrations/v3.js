import { describe, whereFromPlugin, mutateContent, checkContent, updatePlugin, getCourse } from 'adapt-migrations';
import _ from 'lodash';

describe('Navigation Logo - v2.1.0 to v3.0.1', async () => {
  let course, courseNavLogoGlobals;
  whereFromPlugin('Navigation Logo - from v', { name: 'adapt-navigationLogo', version: '<3.0.1' });
  mutateContent('Navigation Logo - add globals if missing', async (content) => {
    course = getCourse();
    if (!_.has(course, '_globals._extensions._navigationLogo')) _.set(course, '_globals._extensions._navigationLogo', {});
    courseNavLogoGlobals = course._globals._extensions._navigationLogo;
    return true;
  });
  mutateContent('Navigation Logo - add globals _navOrder', async (content) => {
    _.set(courseNavLogoGlobals, '_navOrder', 1);
    return true;
  });
  checkContent('Navigation Logo - check globals _navOrder attribute', async content => {
    if (courseNavLogoGlobals === undefined) throw new Error('Navigation Logo - globals _navigationLogo invalid');
    return true;
  });
  checkContent('Navigation Logo - check globals _navOrder attribute', async content => {
    if (courseNavLogoGlobals._navOrder !== 1) throw new Error('Navigation Logo - globals _navOrder invalid');
    return true;
  });
  updatePlugin('Navigation Logo - update to v3.0.1', { name: 'adapt-navigationLogo', version: '3.0.1', framework: '>=5.0.0' });
});

describe('Navigation Logo - v3.0.1 to v3.0.3', async () => {
  let course, courseNavLogo;
  whereFromPlugin('Navigation Logo - from v3.0.1', { name: 'adapt-navigationLogo', version: '<3.0.3' });
  mutateContent('Navigation Logo - add course _navigationLogo if missing', async (content) => {
    course = getCourse();
    if (!_.has(course, '_navigationLogo')) _.set(course, '_navigationLogo', {});
    courseNavLogo = course._navigationLogo;
    return true;
  });
  mutateContent('Navigation Logo - add course _navigationLogo._isHidden', async (content) => {
    courseNavLogo._isHidden = false;
    return true;
  });
  checkContent('Navigation Logo - check course _navigationLogo object', async content => {
    if (courseNavLogo === undefined) throw new Error('Navigation Logo - course _navigationLogo invalid');
    return true;
  });
  checkContent('Navigation Logo - check course _navigationLogo._isHidden', async content => {
    if (courseNavLogo._isHidden !== false) throw new Error('Navigation Logo - course _navigationLogo._isHidden invalid');
    return true;
  });
  updatePlugin('Navigation Logo - update to v3.0.3', { name: 'adapt-navigationLogo', version: '3.0.3', framework: '>=5.0.0' });
});
