import $ from 'cash-dom';

export const hideElement = (selector) => {
  $(selector).addClass('is-hidden');
}

export const showElement = (selector) => {
  $(selector).removeClass('is-hidden');
}