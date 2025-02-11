import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin } from 'adapt-migrations';
// import _ from 'lodash';

describe('Navigation Logo - v to v3.3.0', async () => {
  // let graphics, course, courseNavLogoGlobals;
  // whereFromPlugin('Graphic - from v', { name: 'adapt-navigationLogo', version: '<3.3.0' });
  // whereContent('Graphic - where graphic', async content => {
  //   graphics = content.filter(({ _component }) => _component === 'graphic');
  //   return graphics.length;
  // });
  // mutateContent('Graphic - add globals if missing', async (content) => {
  //   course = content.find(({ _type }) => _type === 'course');
  //   if (!_.has(course, '_globals._components._graphic')) _.set(course, '_globals._components._graphic', {});
  //   courseNavLogoGlobals = course._globals._components._graphic;
  //   return true;
  // });
  // checkContent('Graphic - check globals _graphic attribute', async content => {
  //   if (courseNavLogoGlobals === undefined) throw new Error('Graphic - globals _graphic invalid');
  //   return true;
  // });
  updatePlugin('Navigation Logo - update to v3.3.0', { name: 'adapt-navigationLogo', version: '3.3.0', framework: '>=5.30.3' });
});
