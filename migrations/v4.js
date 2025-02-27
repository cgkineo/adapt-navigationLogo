import { describe, whereFromPlugin, mutateContent, checkContent, updatePlugin, getCourse } from 'adapt-migrations';
import _ from 'lodash';

describe('Navigation Logo - v3.3.0 to v4.0.0', async () => {
  let course, courseNavLogo;
  whereFromPlugin('Navigation Logo - from v3.3.0', { name: 'adapt-navigationLogo', version: '<4.0.0' });
  mutateContent('Navigation Logo - Change _graphic src to _large', async (content) => {
    course = getCourse();
    courseNavLogo = course._navigationLogo;
    if (_.has(courseNavLogo, '_graphic.src')) {
      _.set(courseNavLogo, '_graphic._large', courseNavLogo._graphic.src);
      delete courseNavLogo._graphic.src;
    }
    return true;
  });
  mutateContent('Navigation Logo - Change _graphic _mobileSrc to _small', async (content) => {
    if (_.has(courseNavLogo, '_graphic._mobileSrc')) {
      _.set(courseNavLogo, '_graphic._small', courseNavLogo._graphic._mobileSrc);
      delete courseNavLogo._graphic._mobileSrc;
    }
    return true;
  });
  checkContent('Navigation Logo - check _graphic.src', async content => {
    const isValid = courseNavLogo._graphic.src === undefined;
    if (!isValid) throw new Error('Navigation Logo - _graphic.src invalid');
    return true;
  });
  checkContent('Navigation Logo - check _graphic._large', async content => {
    const isValid = courseNavLogo._graphic._large !== undefined;
    if (!isValid) throw new Error('Navigation Logo - _graphic._large invalid');
    return true;
  });
  checkContent('Navigation Logo - check _graphic._mobileSrc', async content => {
    const isValid = courseNavLogo._graphic._mobileSrc === undefined;
    if (!isValid) throw new Error('Navigation Logo - _graphic._mobileSrc invalid');
    return true;
  });
  checkContent('Navigation Logo - check _graphic._small', async content => {
    const isValid = courseNavLogo._graphic._small !== undefined;
    if (!isValid) throw new Error('Navigation Logo - _graphic._small invalid');
    return true;
  });
  updatePlugin('Navigation Logo - update to v4.0.0', { name: 'adapt-navigationLogo', version: '4.0.0', framework: '>=5.30.3' });
});
