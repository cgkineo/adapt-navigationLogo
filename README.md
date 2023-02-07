# adapt-navigationLogo

**Navigation Logo** is an *extension* for displaying an image in the course navigation bar.

<img src="https://user-images.githubusercontent.com/898168/210416404-8118fd76-83eb-48d1-8cf1-36c7724bb7dd.jpg" alt="Screenshot" width="500">

## Settings overview

The image displays with minimal padding by default or can be configured to fill the navigation bar height. For mobile, an alternative, mobile-friendly image can be specified or the logo can be hidden entirely.

## Attributes

The following attributes are set within *course.json*.

### **\_navigationLogo** (object):
The object that defines the content to render. It contains the following settings:

### **\_isEnabled** (boolean):
Turns on and off the **Navigation Logo** extension.

### **\_graphic** (object):
The graphic object that defines the image which is rendered. The assumed use case for this image is to display a client's logo. It contains the following settings:

#### src (string):
File name (including path) of the image. Path should be relative to the `src` folder (e.g. "course/en/images/logo.jpg").

#### _mobileSrc (string):
Optional, file name (including path) of the image. Used to display an alternative image for mobile view. Useful for displaying a smaller logo.

#### alt (string):
This text becomes the image’s [alt](https://github.com/adaptlearning/adapt_framework/wiki/Providing-good-alt-text) attribute.

### **\_fillNavHeight** (boolean):
Default: `false` where the image is displayed with minimal padding. Set to `true` for the image to fill the nav bar height.

### **\_hideLogoForMobile** (boolean):
Optional, hide logo for mobile view. Useful to declutter the navigation bar where limited space is available.

## Accessibility
Remember to include an `alt` attribute. Screen readers will read aloud alt text content, so leave the alt text empty (`"alt": ""`) if the logo is repeated in the course title.

----------------------------
**Version number:**  2.1.0<br>
**Framework versions:**  5.24.4+<br>
**Author / maintainer:** CGKineo<br>
**AAT support:** Yes<br>
**Accessibility support:** WAI AA<br>
**RTL support:** Yes<br>
**Cross-platform coverage:** Chrome, Chrome for Android, Firefox (ESR + latest version), Edge, IE11, Safari 12+13 for macOS/iOS/iPadOS, Opera<br>
