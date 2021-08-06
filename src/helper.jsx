import { useEffect } from 'react';

function OutsideClick(ref, callback) {
  useEffect(() => {
    const handleClickOutside = (evt) => {
      if (ref.current && !ref.current.contains(evt.target)) {
        callback();
      } else if (evt.code === 'Enter' || evt.code === 'NumpadEnter') {
        callback();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return (() => {
      document.removeEventListener('mousedown', handleClickOutside);
    });
  });
}

function pressEnter(callback) {
  useEffect(() => {
    const handleClickOutside = (evt) => {
      if (evt.code === 'Enter' || evt.code === 'NumpadEnter') {
        callback();
      }
    };
    document.addEventListener('keydown', handleClickOutside);
    return (() => {
      document.removeEventListener('keydown', handleClickOutside);
    });
  });
}

export { OutsideClick, pressEnter };
