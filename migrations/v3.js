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
  let course, courseNavLogo, contentObjects;
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
  mutateContent('Navigation Logo - add _navigationLogo to contentObjects if missing', async (content) => {
    contentObjects = content.filter(({ _type }) => _type === 'page');
    contentObjects.forEach(contentObject => {
      if (!_.has(contentObject, '_navigationLogo')) _.set(contentObject, '_navigationLogo', {});
    });
    return true;
  });
  mutateContent('Navigation Logo - add _navigationLogo._isEnabled to contentObjects', async (content) => {
    contentObjects.forEach(contentObject => {
      _.set(contentObject, '_navigationLogo._isEnabled', true);
    });
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
  checkContent('Navigation Logo - check for _navigationLogo on contentObjects', async content => {
    const isValid = contentObjects.every(({ _navigationLogo }) => _navigationLogo !== undefined);
    if (!isValid) throw new Error('Navigation Logo - _navigationLogo on contentObjects invalid');
    return true;
  });
  checkContent('Navigation Logo - check for _navigationLogo._isEnabled on contentObjects', async content => {
    const isValid = contentObjects.every(({ _navigationLogo }) => _navigationLogo._isEnabled !== undefined);
    if (!isValid) throw new Error('Navigation Logo - _navigationLogo._isEnabled on contentObjects invalid');
    return true;
  });
  updatePlugin('Navigation Logo - update to v3.0.3', { name: 'adapt-navigationLogo', version: '3.0.3', framework: '>=5.0.0' });
});

describe('Navigation Logo - v3.0.3 to v3.1.0', async () => {
  let course, courseNavLogo;
  whereFromPlugin('Navigation Logo - from v3.0.3', { name: 'adapt-navigationLogo', version: '<3.1.0' });
  mutateContent('Navigation Logo - Rename _isHidden to _isHiddenOnMenu', async (content) => {
    course = getCourse();
    courseNavLogo = course._navigationLogo;
    if (courseNavLogo._isHidden !== undefined) {
      courseNavLogo._isHiddenOnMenu = courseNavLogo._isHidden;
      delete courseNavLogo._isHidden;
    }
    return true;
  });
  checkContent('Navigation Logo - check that _isHidden to renamed _isHiddenOnMenu', async content => {
    const isValid = courseNavLogo._isHidden === undefined && courseNavLogo._isHiddenOnMenu !== undefined;
    if (!isValid) throw new Error('Navigation Logo - _isHidden or _isHiddenOnMenu invalid');
    return true;
  });
  updatePlugin('Navigation Logo - update to v3.1.0', { name: 'adapt-navigationLogo', version: '3.1.0', framework: '>=5.0.0' });
});
