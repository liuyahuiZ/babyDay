function tryParseInt(p) {
  if (!p) {
    return 0;
  }
  return parseInt(p, 10) || 0;
}

export function isDescendant(parent, child) {
  let node = child.parentNode;

  while (node !== null) {
    if (node === parent) {
      return true;
    }
    node = node.parentNode;
  }

  return false;
}

export function offset(el) {
  const rect = el.getBoundingClientRect();
  return {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft
  };
}

export function forceRedraw(el) {
  const originalDisplay = el.style.display;

  el.style.display = 'none';
  const oh = el.offsetHeight;
  el.style.display = originalDisplay;
  return oh;
}

export function withoutTransition(el, callback) {
  // turn off transition
  el.style.transition = 'none';

  callback();

  // force a redraw
  forceRedraw(el);

  // put the transition back
  el.style.transition = '';
}

export function getOuterHeight(el) {
  const height = el.clientHeight +
    tryParseInt(el.style.borderTopWidth) +
    tryParseInt(el.style.borderBottomWidth) +
    tryParseInt(el.style.marginTop) +
    tryParseInt(el.style.marginBottom);
  return height;
}

export function getScrollTop() {
  const dd = document.documentElement;
  let scrollTop = 0;
  if (dd && dd.scrollTop) {
    scrollTop = dd.scrollTop;
  } else if (document.body) {
    scrollTop = document.body.scrollTop;
  }
  return scrollTop;
}

export function overView(el, pad = 0) {
  const height = window.innerHeight || document.documentElement.clientHeight;
  const bottom = el.getBoundingClientRect().bottom + pad;
  return bottom > height;
}

export function computedStyle(el, attr) {
  let result;
  if (el.currentStyle) {
    result = el.currentStyle[attr];
  } else if (window.getComputedStyle) {
    result = window.getComputedStyle(el, null)[attr];
  }
  return result;
}

export function getLineHeight(origin) {
  const el = origin.cloneNode(true);
  el.style.padding = 0;
  el.rows = 1;
  el.innerHTML = '&nbsp;';
  el.style.minHeight = 'inherit';
  origin.parentNode.appendChild(el);
  const lineHeight = el.clientHeight;
  origin.parentNode.removeChild(el);

  return lineHeight;
}

export function cloneShadow(origin) {
  const el = origin.cloneNode(true);
  el.style.position = 'absolute';
  el.style.opacity = 0;
  el.style.visibility = 'hidden';
  el.style.height = 0;
  el.style.left = 0;
  el.style.zIndex = -1;
  el.disabled = 'disabled';
  el.name = '';
  el.id = '';
  origin.parentNode.appendChild(el);
  return el;
}

export function addClass(el, className) {
  if (!className) return;

  const els = Array.isArray(el) ? el : [el];

  els.forEach((ele) => {
    if (el.classList) {
      ele.classList.add(className.split(' '));
    } else {
      ele.className += `' '${className}`;
    }
  });
}

export function removeClass(el, className) {
  if (!className) return;

  const els = Array.isArray(el) ? el : [el];

  els.forEach((ele) => {
    if (ele.classList) {
      ele.classList.remove(className.split(' '));
    } else {
      ele.className = ele.className.replace(new RegExp(`(^|\\b)${className.split(' ').join('|')}(\\b|$)`, 'gi'), ' ');
    }
  });
}

export function removeAllClass(el) {
  const els = Array.isArray(el) ? el : [el];

  els.forEach((ele) => {
    ele.className = '';
  });
}
