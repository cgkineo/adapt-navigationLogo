import { describe, whereFromPlugin, whereContent, mutateContent, checkContent, updatePlugin, getCourse, testStopWhere, testSuccessWhere } from 'adapt-migrations';
import _ from 'lodash';

// v2.0.0 (the framework v5 release) renamed the course settings from _logo to _navigationLogo.
// The version numbers were later restarted at 1.0.0 with _navigationLogo already in place, so a
// pre-v5 course is recognised by its _logo rather than by its version alone.
describe('Navigation Logo - v1.0.2 to v2.1.0', async () => {
  let course, courseNavLogo;
  whereFromPlugin('Navigation Logo - from v1.0.2', { name: 'adapt-navigationLogo', version: '<2.1.0' });
  whereContent('Navigation Logo - where course has _logo', async (content) => {
    course = getCourse();
    return _.has(course, '_logo');
  });
  mutateContent('Navigation Logo - move course _logo to _navigationLogo', async (content) => {
    // anything already under _navigationLogo is kept
    courseNavLogo = _.merge({}, course._logo, course._navigationLogo);
    course._navigationLogo = courseNavLogo;
    delete course._logo;
    return true;
  });
  mutateContent('Navigation Logo - rename _graphic._alt to alt', async (content) => {
    if (!_.has(courseNavLogo, '_graphic._alt')) return true;
    if (!_.has(courseNavLogo, '_graphic.alt')) courseNavLogo._graphic.alt = courseNavLogo._graphic._alt;
    delete courseNavLogo._graphic._alt;
    return true;
  });
  checkContent('Navigation Logo - check course _logo removed', async content => {
    if (_.has(course, '_logo')) throw new Error('Navigation Logo - course _logo not removed');
    return true;
  });
  checkContent('Navigation Logo - check course _navigationLogo', async content => {
    if (!_.isPlainObject(course._navigationLogo)) throw new Error('Navigation Logo - course _navigationLogo invalid');
    return true;
  });
  checkContent('Navigation Logo - check _graphic._alt removed', async content => {
    if (_.has(courseNavLogo, '_graphic._alt')) throw new Error('Navigation Logo - _graphic._alt invalid');
    return true;
  });
  updatePlugin('Navigation Logo - update to v2.1.0', { name: 'adapt-navigationLogo', version: '2.1.0', framework: '>=5' });

  testSuccessWhere('legacy logo', {
    fromPlugins: [{ name: 'adapt-navigationLogo', version: '1.0.2' }],
    content: [
      { _type: 'course', _logo: { _isEnabled: true, _graphic: { alt: 'Logo', src: 'course/en/assets/logo.svg' } } }
    ]
  });

  testSuccessWhere('legacy logo with _alt', {
    fromPlugins: [{ name: 'adapt-navigationLogo', version: '1.0.2' }],
    content: [
      { _type: 'course', _logo: { _isEnabled: true, _graphic: { _alt: 'Logo', src: 'course/en/assets/logo.svg' } } }
    ]
  });

  testSuccessWhere('legacy logo beside an empty _navigationLogo', {
    fromPlugins: [{ name: 'adapt-navigationLogo', version: '1.0.2' }],
    content: [
      { _type: 'course', _logo: { _isEnabled: true, _graphic: { alt: '', src: 'course/en/assets/logo.svg' } }, _navigationLogo: {} }
    ]
  });

  testSuccessWhere('legacy logo with no graphic', {
    fromPlugins: [{ name: 'adapt-navigationLogo', version: '1.0.2' }],
    content: [
      { _type: 'course', _logo: { _isEnabled: false } }
    ]
  });

  testStopWhere('no legacy logo', {
    fromPlugins: [{ name: 'adapt-navigationLogo', version: '1.0.0' }],
    content: [
      { _type: 'course', _navigationLogo: { _isEnabled: true } }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-navigationLogo', version: '2.1.0' }],
    content: [
      { _type: 'course', _logo: { _isEnabled: true } }
    ]
  });
});
