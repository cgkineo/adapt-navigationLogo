import { describe, whereFromPlugin, mutateContent, checkContent, updatePlugin, getCourse, testStopWhere, testSuccessWhere } from 'adapt-migrations';
import _ from 'lodash';

describe('Navigation Logo - v3.3.0 to v4.0.0', async () => {
  let course, courseNavLogo;
  whereFromPlugin('Navigation Logo - from v3.3.0', { name: 'adapt-navigationLogo', version: '<4.0.0' });
  mutateContent('Navigation Logo - Change _graphic src to _large', async (content) => {
    course = getCourse();
    courseNavLogo = course._navigationLogo;
    if (!_.has(courseNavLogo, '_graphic')) return true;
    // some v2 builds stored the image as _src rather than src
    const { src, _src } = courseNavLogo._graphic;
    courseNavLogo._graphic._large = src ?? _src ?? '';
    delete courseNavLogo._graphic.src;
    delete courseNavLogo._graphic._src;
    return true;
  });
  mutateContent('Navigation Logo - Change _graphic _mobileSrc to _small', async (content) => {
    if (!_.has(courseNavLogo, '_graphic')) return true;
    // before v4 the main image was shown on mobile when no mobile image was set
    courseNavLogo._graphic._small = courseNavLogo._graphic._mobileSrc || courseNavLogo._graphic._large;
    delete courseNavLogo._graphic._mobileSrc;
    return true;
  });
  checkContent('Navigation Logo - check _graphic.src', async content => {
    if (!_.has(courseNavLogo, '_graphic')) return true;
    const isValid = courseNavLogo._graphic.src === undefined && courseNavLogo._graphic._src === undefined;
    if (!isValid) throw new Error('Navigation Logo - _graphic.src invalid');
    return true;
  });
  checkContent('Navigation Logo - check _graphic._large', async content => {
    if (!_.has(courseNavLogo, '_graphic')) return true;
    const isValid = courseNavLogo._graphic._large !== undefined;
    if (!isValid) throw new Error('Navigation Logo - _graphic._large invalid');
    return true;
  });
  checkContent('Navigation Logo - check _graphic._mobileSrc', async content => {
    if (!_.has(courseNavLogo, '_graphic')) return true;
    const isValid = courseNavLogo._graphic._mobileSrc === undefined;
    if (!isValid) throw new Error('Navigation Logo - _graphic._mobileSrc invalid');
    return true;
  });
  checkContent('Navigation Logo - check _graphic._small', async content => {
    if (!_.has(courseNavLogo, '_graphic')) return true;
    const isValid = courseNavLogo._graphic._small !== undefined;
    if (!isValid) throw new Error('Navigation Logo - _graphic._small invalid');
    return true;
  });
  updatePlugin('Navigation Logo - update to v4.0.0', { name: 'adapt-navigationLogo', version: '4.0.0', framework: '>=5.30.3' });

  testSuccessWhere('navigation logo with empty course', {
    fromPlugins: [{ name: 'adapt-navigationLogo', version: '3.3.0' }],
    content: [
      { _id: 'c-100', _component: 'mcq' },
      { _type: 'course' }
    ]
  });

  testSuccessWhere('navigation logo with empty course config', {
    fromPlugins: [{ name: 'adapt-navigationLogo', version: '3.3.0' }],
    content: [
      { _id: 'c-100', _component: 'mcq' },
      { _type: 'course', _navigationLogo: {} }
    ]
  });

  testSuccessWhere('navigation logo with src and an empty _mobileSrc', {
    fromPlugins: [{ name: 'adapt-navigationLogo', version: '3.3.0' }],
    content: [
      { _type: 'course', _navigationLogo: { _graphic: { src: 'course/en/images/logo.png', _mobileSrc: '', alt: '' } } }
    ]
  });

  testSuccessWhere('navigation logo with src and no _mobileSrc', {
    fromPlugins: [{ name: 'adapt-navigationLogo', version: '3.3.0' }],
    content: [
      { _type: 'course', _navigationLogo: { _graphic: { src: 'course/en/images/logo.png', alt: '' } } }
    ]
  });

  testSuccessWhere('navigation logo with src and _mobileSrc', {
    fromPlugins: [{ name: 'adapt-navigationLogo', version: '3.3.0' }],
    content: [
      { _type: 'course', _navigationLogo: { _graphic: { src: 'course/en/images/logo.png', _mobileSrc: 'course/en/images/logo-mobile.png', alt: '' } } }
    ]
  });

  testSuccessWhere('navigation logo with a v2 _src', {
    fromPlugins: [{ name: 'adapt-navigationLogo', version: '2.0.0' }],
    content: [
      { _type: 'course', _navigationLogo: { _isEnabled: true, _graphic: { _src: 'course/en/assets/logo.jpg', alt: '' } } }
    ]
  });

  testSuccessWhere('navigation logo with a _graphic but no image', {
    fromPlugins: [{ name: 'adapt-navigationLogo', version: '3.3.0' }],
    content: [
      { _type: 'course', _navigationLogo: { _graphic: { alt: '' } } }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-navigationLogo', version: '4.0.0' }]
  });
});

describe('Navigation Logo - v@@CURRENT_VERSION to v@@RELEASE_VERSION', async () => {
  let courseNavLogo;
  whereFromPlugin('Navigation Logo - from v@@CURRENT_VERSION', { name: 'adapt-navigationLogo', version: '<@@RELEASE_VERSION' });
  mutateContent('Navigation Logo - add _isHorizontallyCentered', async (content) => {
    const course = getCourse();
    courseNavLogo = course._navigationLogo;
    if (!_.has(course, '_navigationLogo')) return true;
    if (_.has(courseNavLogo, '_isHorizontallyCentered')) return true;
    courseNavLogo._isHorizontallyCentered = false;
    return true;
  });
  checkContent('Navigation Logo - check _isHorizontallyCentered', async content => {
    if (!courseNavLogo) return true;
    if (!_.has(courseNavLogo, '_isHorizontallyCentered')) throw new Error('Navigation Logo - _isHorizontallyCentered invalid');
    return true;
  });
  updatePlugin('Navigation Logo - update to v@@RELEASE_VERSION', { name: 'adapt-navigationLogo', version: '@@RELEASE_VERSION', framework: '>=5.30.3' });

  testSuccessWhere('navigation logo absent from course', {
    fromPlugins: [{ name: 'adapt-navigationLogo', version: '@@CURRENT_VERSION' }],
    content: [
      { _id: 'c-100', _component: 'mcq' },
      { _type: 'course' }
    ]
  });

  testSuccessWhere('navigation logo present without _isHorizontallyCentered', {
    fromPlugins: [{ name: 'adapt-navigationLogo', version: '@@CURRENT_VERSION' }],
    content: [
      { _id: 'c-100', _component: 'mcq' },
      { _type: 'course', _navigationLogo: {} }
    ]
  });

  testSuccessWhere('navigation logo with _isHorizontallyCentered already present', {
    fromPlugins: [{ name: 'adapt-navigationLogo', version: '@@CURRENT_VERSION' }],
    content: [
      { _id: 'c-100', _component: 'mcq' },
      { _type: 'course', _navigationLogo: { _isHorizontallyCentered: false } }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-navigationLogo', version: '@@RELEASE_VERSION' }]
  });
});
