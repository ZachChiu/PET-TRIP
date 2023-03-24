/* eslint-disable require-jsdoc */
/* global $ */

export function scrollToTop() {
  $('html, body').animate(
    {
      scrollTop: $('#app').offset().top,
    },
    0
  );
}
