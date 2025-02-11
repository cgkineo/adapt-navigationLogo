import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin } from 'adapt-migrations';
// import _ from 'lodash';

describe('Navigation Logo - v2.1.0 to v3.0.1', async () => {
  let course, courseNavLogoGlobals;
  whereFromPlugin('Navigation Logo - from v', { name: 'adapt-navigationLogo', version: '<3.0.1' });
  mutateContent('Navigation Logo - add globals if missing', async (content) => {
    course = content.find(({ _type }) => _type === 'course');
    if (!_.has(course, '_globals._extensions._navigationLogo')) _.set(course, '_globals._extensions._navigationLogo', {});
    courseNavLogoGlobals = course._globals._extensions._navLogo;
    return true;
  });
  mutateContent('Navigation Logo - add globals _navOrder', async (content) => {
    courseNavLogoGlobals._navOrder = 1;
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

// describe('Navigation Logo - v to v3.3.0', async () => {
//   let graphics, course, courseNavLogoGlobals;
//   whereFromPlugin('Navigation Logo - from v', { name: 'adapt-navigationLogo', version: '<3.3.0' });

//   // mutateContent('Graphic - add globals if missing', async (content) => {
//   //   course = content.find(({ _type }) => _type === 'course');
//   //   if (!_.has(course, '_globals._components._graphic')) _.set(course, '_globals._components._graphic', {});
//   //   courseNavLogoGlobals = course._globals._components._graphic;
//   //   return true;
//   // });
//   // checkContent('Graphic - check globals _graphic attribute', async content => {
//   //   if (courseNavLogoGlobals === undefined) throw new Error('Graphic - globals _graphic invalid');
//   //   return true;
//   // });
//   updatePlugin('Navigation Logo - update to v3.3.0', { name: 'adapt-navigationLogo', version: '3.3.0', framework: '>=5.30.3' });
// });
