import { describe, whereFromPlugin, mutateContent, checkContent, updatePlugin, getCourse, testStopWhere, testSuccessWhere } from 'adapt-migrations';
import _ from 'lodash';

describe('Navigation Logo - v4.2.0 to v5.0.0', async () => {
  let course, courseNavLogo;
  whereFromPlugin('Navigation Logo - from v4.2.0', { name: 'adapt-navigationLogo', version: '<5.0.0' });
  mutateContent('Navigation Logo - add course _navigationLogo if missing', async (content) => {
    course = getCourse();
    if (!_.has(course, '_navigationLogo')) _.set(course, '_navigationLogo', {});
    courseNavLogo = course._navigationLogo;
    return true;
  });
  mutateContent('Navigation Logo - add _isHorizontallyCentered', async (content) => {
    if (_.has(courseNavLogo, '_isHorizontallyCentered')) return true;
    courseNavLogo._isHorizontallyCentered = false;
    return true;
  });
  checkContent('Navigation Logo - check course _navigationLogo object', async content => {
    if (courseNavLogo === undefined) throw new Error('Navigation Logo - course _navigationLogo invalid');
    return true;
  });
  checkContent('Navigation Logo - check _isHorizontallyCentered', async content => {
    if (!_.has(courseNavLogo, '_isHorizontallyCentered')) throw new Error('Navigation Logo - _isHorizontallyCentered invalid');
    return true;
  });
  updatePlugin('Navigation Logo - update to v5.0.0', { name: 'adapt-navigationLogo', version: '5.0.0', framework: '>=5.30.3' });

  testSuccessWhere('navigation logo with empty course', {
    fromPlugins: [{ name: 'adapt-navigationLogo', version: '4.2.0' }],
    content: [
      { _id: 'c-100', _component: 'mcq' },
      { _type: 'course' }
    ]
  });

  testSuccessWhere('navigation logo with existing course config', {
    fromPlugins: [{ name: 'adapt-navigationLogo', version: '4.2.0' }],
    content: [
      { _id: 'c-100', _component: 'mcq' },
      { _type: 'course', _navigationLogo: {} }
    ]
  });

  testSuccessWhere('navigation logo with _isHorizontallyCentered already present', {
    fromPlugins: [{ name: 'adapt-navigationLogo', version: '4.2.0' }],
    content: [
      { _id: 'c-100', _component: 'mcq' },
      { _type: 'course', _navigationLogo: { _isHorizontallyCentered: false } }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-navigationLogo', version: '5.0.0' }]
  });
});
