# adapt-navigationLogo

Displays an image in the course navigation bar.

#### Course

**\_navigationLogo** (object): The course.json Navigation Logo target attribute object.

>**\_isEnabled** (boolean): Controls whether the Navigation Logo course object is enabled or not.

**\_graphic** (object): The image that constitutes the logo. It contains values for **alt**, **_src**, and **_mobileSrc**.

>**alt** (string): This text becomes the image’s `alt` attribute.

>**_src** (string): File name (including path) of the logo image displayed at all device widths.

>**_mobileSrc** (string): Optional, file name (including path) of the logo image used to display an alternative image for mobile view. Useful for displaying a smaller logo.

>**\_logoSize** (string): This defines the size and padding of the logo image. Acceptable values are `small`, `large` or `fill`. Default value is `large`.

>**\_hideLogoForMobile** (boolean): Optional, hide logo for mobile view. Useful to declutter the navigation bar for mobile view where limited space is available.

## Accessibility
+ Remember to include an **alt** attribute. Screen readers will read aloud alt text content, so leave the alt text empty (`"alt": ""`) if the logo is repeated in the course title.

## Limitations
No known limitations
AT Compatible
**Accessibility support:** WAI AA
**RTL support:** Yes
**Cross-platform coverage:** Chrome, Chrome for Android, Firefox (ESR + latest version), Edge, IE11, Safari 12+13 for macOS/iOS/iPadOS, Opera