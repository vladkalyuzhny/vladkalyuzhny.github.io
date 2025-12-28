import { useEffect, useState } from 'react';

function useElementResize(ref, options) {
  const {
    defaultOffset,
    defaultSize,
    boundary,
    resizable = true,
    resizeThreshold = 10,
    constraintSize = 200,
  } = options;
  const [offset, setOffset] = useState(
    defaultOffset ?? {
      x: (window.innerWidth - defaultSize.width) / 2,
      y: (window.innerHeight - defaultSize.height) / 2,
    },
  );
  const [size, setSize] = useState(defaultSize);
  const cursorPos = useCursor(ref, resizeThreshold, resizable);
  useEffect(() => {
    const target = ref.current;
    if (!target) return;
    const dragTarget = options.dragRef && options.dragRef.current;
    const touchOptions = { passive: false };
    const cover = document.createElement('div');
    cover.style.position = 'fixed';
    cover.style.top = 0;
    cover.style.left = 0;
    cover.style.right = 0;
    cover.style.bottom = 0;
    const previousOffset = { ...offset };
    const previousSize = { ...size };
    let _boundary;
    let originMouseX;
    let originMouseY;
    let shouldCover = false;

    function onDragging(e) {
      if (shouldCover && !document.body.contains(cover)) {
        document.body.appendChild(cover);
      }
      const { pageX, pageY } = getComputedPagePosition(e, _boundary);
      const x = pageX - originMouseX + previousOffset.x;
      const y = pageY - originMouseY + previousOffset.y;
      setOffset({ x, y });
    }
    function onDragEnd(e) {
      cover.remove();
      shouldCover = false;
      const { pageX, pageY } = getComputedPagePosition(e, _boundary);
      previousOffset.x += pageX - originMouseX;
      previousOffset.y += pageY - originMouseY;
      window.removeEventListener('mousemove', onDragging);
      window.removeEventListener('mouseup', onDragEnd);
      window.removeEventListener('touchmove', onDragging, touchOptions);
      window.removeEventListener('touchend', onDragEnd);
      window.removeEventListener('touchcancel', onDragEnd);
    }
    function onDragStart() {
      window.addEventListener('mousemove', onDragging);
      window.addEventListener('mouseup', onDragEnd);
      window.addEventListener('touchmove', onDragging, touchOptions);
      window.addEventListener('touchend', onDragEnd);
      window.addEventListener('touchcancel', onDragEnd);
    }
    function onDraggingTop(e) {
      const { pageY } = getComputedPagePosition(e, _boundary);
      const { x } = previousOffset;
      const y = pageY - originMouseY + previousOffset.y;
      setOffset({ x, y });
    }
    function onDragEndTop(e) {
      const { pageY } = getComputedPagePosition(e, _boundary);
      previousOffset.y += pageY - originMouseY;
      window.removeEventListener('mousemove', onDraggingTop);
      window.removeEventListener('mouseup', onDragEndTop);
      window.removeEventListener('touchmove', onDraggingTop, touchOptions);
      window.removeEventListener('touchend', onDragEndTop);
      window.removeEventListener('touchcancel', onDragEndTop);
    }
    function onDragStartTop() {
      window.addEventListener('mousemove', onDraggingTop);
      window.addEventListener('mouseup', onDragEndTop);
      window.addEventListener('touchmove', onDraggingTop, touchOptions);
      window.addEventListener('touchend', onDragEndTop);
      window.addEventListener('touchcancel', onDragEndTop);
    }
    function onDraggingLeft(e) {
      const { pageX } = getComputedPagePosition(e, _boundary);
      const x = pageX - originMouseX + previousOffset.x;
      const { y } = previousOffset;
      setOffset({ x, y });
    }
    function onDragEndLeft(e) {
      const { pageX } = getComputedPagePosition(e, _boundary);
      previousOffset.x += pageX - originMouseX;
      window.removeEventListener('mousemove', onDraggingLeft);
      window.removeEventListener('mouseup', onDragEndLeft);
      window.removeEventListener('touchmove', onDraggingLeft, touchOptions);
      window.removeEventListener('touchend', onDragEndLeft);
      window.removeEventListener('touchcancel', onDragEndLeft);
    }
    function onDragStartLeft() {
      window.addEventListener('mousemove', onDraggingLeft);
      window.addEventListener('mouseup', onDragEndLeft);
      window.addEventListener('touchmove', onDraggingLeft, touchOptions);
      window.addEventListener('touchend', onDragEndLeft);
      window.addEventListener('touchcancel', onDragEndLeft);
    }
    function onResizingRight(e) {
      const { pageX } = getComputedPagePosition(e, _boundary);
      const width = pageX - originMouseX + previousSize.width;
      const { height } = previousSize;
      setSize({ width, height });
    }
    function onResizeEndRight(e) {
      const { pageX } = getComputedPagePosition(e, _boundary);
      previousSize.width += pageX - originMouseX;
      window.removeEventListener('mousemove', onResizingRight);
      window.removeEventListener('mouseup', onResizeEndRight);
      window.removeEventListener('touchmove', onResizingRight, touchOptions);
      window.removeEventListener('touchend', onResizeEndRight);
      window.removeEventListener('touchcancel', onResizeEndRight);
    }
    function onResizeStartRight() {
      window.addEventListener('mousemove', onResizingRight);
      window.addEventListener('mouseup', onResizeEndRight);
      window.addEventListener('touchmove', onResizingRight, touchOptions);
      window.addEventListener('touchend', onResizeEndRight);
      window.addEventListener('touchcancel', onResizeEndRight);
    }
    function onResizingBottom(e) {
      const { pageY } = getComputedPagePosition(e, _boundary);
      const { width } = previousSize;
      const height = pageY - originMouseY + previousSize.height;
      setSize({ width, height });
    }
    function onResizeEndBottom(e) {
      const { pageY } = getComputedPagePosition(e, _boundary);
      previousSize.height += pageY - originMouseY;
      window.removeEventListener('mousemove', onResizingBottom);
      window.removeEventListener('mouseup', onResizeEndBottom);
      window.removeEventListener('touchmove', onResizingBottom, touchOptions);
      window.removeEventListener('touchend', onResizeEndBottom);
      window.removeEventListener('touchcancel', onResizeEndBottom);
    }
    function onResizeStartBottom() {
      window.addEventListener('mousemove', onResizingBottom);
      window.addEventListener('mouseup', onResizeEndBottom);
      window.addEventListener('touchmove', onResizingBottom, touchOptions);
      window.addEventListener('touchend', onResizeEndBottom);
      window.addEventListener('touchcancel', onResizeEndBottom);
    }
    function onResizingLeft(e) {
      const { pageX } = getComputedPagePosition(e, _boundary);
      const width = -pageX + originMouseX + previousSize.width;
      const { height } = previousSize;
      setSize({ width, height });
    }
    function onResizeEndLeft(e) {
      const { pageX } = getComputedPagePosition(e, _boundary);
      previousSize.width += -pageX + originMouseX;
      window.removeEventListener('mousemove', onResizingLeft);
      window.removeEventListener('mouseup', onResizeEndLeft);
      window.removeEventListener('touchmove', onResizingLeft, touchOptions);
      window.removeEventListener('touchend', onResizeEndLeft);
      window.removeEventListener('touchcancel', onResizeEndLeft);
    }
    function onResizeStartLeft() {
      window.addEventListener('mousemove', onResizingLeft);
      window.addEventListener('mouseup', onResizeEndLeft);
      window.addEventListener('touchmove', onResizingLeft, touchOptions);
      window.addEventListener('touchend', onResizeEndLeft);
      window.addEventListener('touchcancel', onResizeEndLeft);
    }
    function onResizingTop(e) {
      const { pageY } = getComputedPagePosition(e, _boundary);
      const height = -pageY + originMouseY + previousSize.height;
      const { width } = previousSize;
      setSize({ width, height });
    }
    function onResizeEndTop(e) {
      const { pageY } = getComputedPagePosition(e, _boundary);
      previousSize.height += -pageY + originMouseY;
      window.removeEventListener('mousemove', onResizingTop);
      window.removeEventListener('mouseup', onResizeEndTop);
      window.removeEventListener('touchmove', onResizingTop, touchOptions);
      window.removeEventListener('touchend', onResizeEndTop);
      window.removeEventListener('touchcancel', onResizeEndTop);
    }
    function onResizeStartTop() {
      window.addEventListener('mousemove', onResizingTop);
      window.addEventListener('mouseup', onResizeEndTop);
      window.addEventListener('touchmove', onResizingTop, touchOptions);
      window.addEventListener('touchend', onResizeEndTop);
      window.addEventListener('touchcancel', onResizeEndTop);
    }
    function onResizingTopLeft(e) {
      const { pageX, pageY } = getComputedPagePosition(e, _boundary);
      const width = -pageX + originMouseX + previousSize.width;
      const height = -pageY + originMouseY + previousSize.height;
      setSize({ width, height });
    }
    function onResizeEndTopLeft(e) {
      const { pageX, pageY } = getComputedPagePosition(e, _boundary);
      previousSize.width += -pageX + originMouseX;
      previousSize.height += -pageY + originMouseY;
      window.removeEventListener('mousemove', onResizingTopLeft);
      window.removeEventListener('mouseup', onResizeEndTopLeft);
      window.removeEventListener('touchmove', onResizingTopLeft, touchOptions);
      window.removeEventListener('touchend', onResizeEndTopLeft);
      window.removeEventListener('touchcancel', onResizeEndTopLeft);
    }
    function onResizeStartTopLeft() {
      window.addEventListener('mousemove', onResizingTopLeft);
      window.addEventListener('mouseup', onResizeEndTopLeft);
      window.addEventListener('touchmove', onResizingTopLeft, touchOptions);
      window.addEventListener('touchend', onResizeEndTopLeft);
      window.addEventListener('touchcancel', onResizeEndTopLeft);
    }
    function onResizingTopRight(e) {
      const { pageX, pageY } = getComputedPagePosition(e, _boundary);
      const width = pageX - originMouseX + previousSize.width;
      const height = -pageY + originMouseY + previousSize.height;
      setSize({ width, height });
    }
    function onResizeEndTopRight(e) {
      const { pageX, pageY } = getComputedPagePosition(e, _boundary);
      previousSize.width += pageX - originMouseX;
      previousSize.height += -pageY + originMouseY;
      window.removeEventListener('mousemove', onResizingTopRight);
      window.removeEventListener('mouseup', onResizeEndTopRight);
      window.removeEventListener('touchmove', onResizingTopRight, touchOptions);
      window.removeEventListener('touchend', onResizeEndTopRight);
      window.removeEventListener('touchcancel', onResizeEndTopRight);
    }
    function onResizeStartTopRight() {
      window.addEventListener('mousemove', onResizingTopRight);
      window.addEventListener('mouseup', onResizeEndTopRight);
      window.addEventListener('touchmove', onResizingTopRight, touchOptions);
      window.addEventListener('touchend', onResizeEndTopRight);
      window.addEventListener('touchcancel', onResizeEndTopRight);
    }
    function onResizingBottomLeft(e) {
      const { pageX, pageY } = getComputedPagePosition(e, _boundary);
      const width = -pageX + originMouseX + previousSize.width;
      const height = pageY - originMouseY + previousSize.height;
      setSize({ width, height });
    }
    function onResizeEndBottomLeft(e) {
      const { pageX, pageY } = getComputedPagePosition(e, _boundary);
      previousSize.width += -pageX + originMouseX;
      previousSize.height += pageY - originMouseY;
      window.removeEventListener('mousemove', onResizingBottomLeft);
      window.removeEventListener('mouseup', onResizeEndBottomLeft);
      window.removeEventListener(
        'touchmove',
        onResizingBottomLeft,
        touchOptions,
      );
      window.removeEventListener('touchend', onResizeEndBottomLeft);
      window.removeEventListener('touchcancel', onResizeEndBottomLeft);
    }
    function onResizeStartBottomLeft() {
      window.addEventListener('mousemove', onResizingBottomLeft);
      window.addEventListener('mouseup', onResizeEndBottomLeft);
      window.addEventListener('touchmove', onResizingBottomLeft, touchOptions);
      window.addEventListener('touchend', onResizeEndBottomLeft);
      window.addEventListener('touchcancel', onResizeEndBottomLeft);
    }
    function onResizingBottomRight(e) {
      const { pageX, pageY } = getComputedPagePosition(e, _boundary);
      const width = pageX - originMouseX + previousSize.width;
      const height = pageY - originMouseY + previousSize.height;
      setSize({ width, height });
    }
    function onResizeEndBottomRight(e) {
      const { pageX, pageY } = getComputedPagePosition(e, _boundary);
      previousSize.width += pageX - originMouseX;
      previousSize.height += pageY - originMouseY;
      window.removeEventListener('mousemove', onResizingBottomRight);
      window.removeEventListener('mouseup', onResizeEndBottomRight);
      window.removeEventListener(
        'touchmove',
        onResizingBottomRight,
        touchOptions,
      );
      window.removeEventListener('touchend', onResizeEndBottomRight);
      window.removeEventListener('touchcancel', onResizeEndBottomRight);
    }
    function onResizeStartBottomRight() {
      window.addEventListener('mousemove', onResizingBottomRight);
      window.addEventListener('mouseup', onResizeEndBottomRight);
      window.addEventListener('touchmove', onResizingBottomRight, touchOptions);
      window.addEventListener('touchend', onResizeEndBottomRight);
      window.addEventListener('touchcancel', onResizeEndBottomRight);
    }
    function onMouseDown(e) {
      const { pageX, pageY } = getComputedPagePosition(e);
      originMouseX = pageX;
      originMouseY = pageY;
      _boundary = { ...boundary };
      if (dragTarget && dragTarget.contains(e.target)) {
        shouldCover = true;
        return onDragStart(e);
      }
      if (e.target !== target || !resizable) return;
      switch (cursorPos) {
        case 'topLeft':
          _boundary.right = originMouseX + previousSize.width - constraintSize;
          _boundary.bottom =
            originMouseY + previousSize.height - constraintSize;
          onResizeStartTopLeft(e);
          onDragStart(e);
          break;
        case 'left':
          _boundary.right = originMouseX + previousSize.width - constraintSize;
          onResizeStartLeft(e);
          onDragStartLeft(e);
          break;
        case 'bottomLeft':
          _boundary.right = originMouseX + previousSize.width - constraintSize;
          _boundary.top = originMouseY - previousSize.height + constraintSize;
          onResizeStartBottomLeft(e);
          onDragStartLeft(e);
          break;
        case 'top':
          _boundary.bottom =
            originMouseY + previousSize.height - constraintSize;
          onResizeStartTop(e);
          onDragStartTop(e);
          break;
        case 'topRight':
          _boundary.bottom =
            originMouseY + previousSize.height - constraintSize;
          _boundary.left = originMouseX - previousSize.width + constraintSize;
          onDragStartTop(e);
          onResizeStartTopRight(e);
          break;
        case 'right':
          _boundary.left = originMouseX - previousSize.width + constraintSize;
          onResizeStartRight(e);
          break;
        case 'bottomRight':
          _boundary.top = originMouseY - previousSize.height + constraintSize;
          _boundary.left = originMouseX - previousSize.width + constraintSize;
          onResizeStartBottomRight(e);
          break;
        case 'bottom':
          _boundary.top = originMouseY - previousSize.height + constraintSize;
          onResizeStartBottom(e);
          break;
        default:
      }
    }
    target.addEventListener('mousedown', onMouseDown);
    target.addEventListener('touchstart', onMouseDown, touchOptions);
    return () => {
      target.removeEventListener('mousedown', onMouseDown);
      target.removeEventListener('touchstart', onMouseDown, touchOptions);
      window.removeEventListener('mousemove', onDraggingLeft);
      window.removeEventListener('mousemove', onDraggingTop);
      window.removeEventListener('mousemove', onDragging);
      window.removeEventListener('mouseup', onDragEndTop);
      window.removeEventListener('mouseup', onDragEndLeft);
      window.removeEventListener('mouseup', onDragEnd);
      window.removeEventListener('touchmove', onDraggingLeft, touchOptions);
      window.removeEventListener('touchmove', onDraggingTop, touchOptions);
      window.removeEventListener('touchmove', onDragging, touchOptions);
      window.removeEventListener('touchend', onDragEndTop);
      window.removeEventListener('touchend', onDragEndLeft);
      window.removeEventListener('touchend', onDragEnd);
      window.removeEventListener('touchcancel', onDragEndTop);
      window.removeEventListener('touchcancel', onDragEndLeft);
      window.removeEventListener('touchcancel', onDragEnd);
      window.removeEventListener('mousemove', onResizingTop);
      window.removeEventListener('mousemove', onResizingRight);
      window.removeEventListener('mousemove', onResizingBottom);
      window.removeEventListener('mousemove', onResizingLeft);
      window.removeEventListener('mousemove', onResizingBottomLeft);
      window.removeEventListener('mousemove', onResizingTopLeft);
      window.removeEventListener('mousemove', onResizingTopRight);
      window.removeEventListener('mousemove', onResizingBottomRight);
      window.removeEventListener('touchmove', onResizingTop, touchOptions);
      window.removeEventListener('touchmove', onResizingRight, touchOptions);
      window.removeEventListener('touchmove', onResizingBottom, touchOptions);
      window.removeEventListener('touchmove', onResizingLeft, touchOptions);
      window.removeEventListener(
        'touchmove',
        onResizingBottomLeft,
        touchOptions,
      );
      window.removeEventListener('touchmove', onResizingTopLeft, touchOptions);
      window.removeEventListener('touchmove', onResizingTopRight, touchOptions);
      window.removeEventListener(
        'touchmove',
        onResizingBottomRight,
        touchOptions,
      );
      window.removeEventListener('mouseup', onResizeEndTop);
      window.removeEventListener('mouseup', onResizeEndRight);
      window.removeEventListener('mouseup', onResizeEndBottom);
      window.removeEventListener('mouseup', onResizeEndLeft);
      window.removeEventListener('mouseup', onResizeEndBottomLeft);
      window.removeEventListener('mouseup', onResizeEndTopLeft);
      window.removeEventListener('mouseup', onResizeEndTopRight);
      window.removeEventListener('mouseup', onResizeEndBottomRight);
      window.removeEventListener('touchend', onResizeEndTop);
      window.removeEventListener('touchend', onResizeEndRight);
      window.removeEventListener('touchend', onResizeEndBottom);
      window.removeEventListener('touchend', onResizeEndLeft);
      window.removeEventListener('touchend', onResizeEndBottomLeft);
      window.removeEventListener('touchend', onResizeEndTopLeft);
      window.removeEventListener('touchend', onResizeEndTopRight);
      window.removeEventListener('touchend', onResizeEndBottomRight);
      window.removeEventListener('touchcancel', onResizeEndTop);
      window.removeEventListener('touchcancel', onResizeEndRight);
      window.removeEventListener('touchcancel', onResizeEndBottom);
      window.removeEventListener('touchcancel', onResizeEndLeft);
      window.removeEventListener('touchcancel', onResizeEndBottomLeft);
      window.removeEventListener('touchcancel', onResizeEndTopLeft);
      window.removeEventListener('touchcancel', onResizeEndTopRight);
      window.removeEventListener('touchcancel', onResizeEndBottomRight);
      cover.remove();
    };
    // eslint-disable-next-line
  }, [boundary.top, boundary.right, boundary.bottom, boundary.left, cursorPos]);
  return { offset, size };
}
function useCursor(ref, threshold, resizable) {
  const [position, setPosition] = useState('');
  useEffect(() => {
    const target = ref.current;
    if (!target || !resizable) return;
    const cover = document.createElement('div');
    cover.style.position = 'fixed';
    cover.style.top = 0;
    cover.style.left = 0;
    cover.style.right = 0;
    cover.style.bottom = 0;
    let lock = false;
    function _setPosition(p) {
      setPosition(p);
      target.style.cursor = getCursorStyle(p);
      cover.style.cursor = getCursorStyle(p);
    }
    function onMouseDown(e) {
      if (e.target !== target) return;
      onHover(e);
      lock = true;
      document.body.appendChild(cover);
      window.addEventListener('mouseup', onMouseUp);
    }
    function onMouseUp() {
      lock = false;
      cover.remove();
      window.removeEventListener('mouseup', onMouseUp);
    }
    function onHoverEnd() {
      if (lock) return;
      _setPosition('');
    }
    function onHover(e) {
      if (lock) return;
      if (e.target !== target) return _setPosition('');
      const { offsetX, offsetY } = e;
      const { width, height } = target.getBoundingClientRect();
      if (offsetX < threshold) {
        if (offsetY < threshold) {
          _setPosition('topLeft');
        } else if (height - offsetY < threshold) {
          _setPosition('bottomLeft');
        } else {
          _setPosition('left');
        }
      } else if (offsetY < threshold) {
        if (width - offsetX < threshold) {
          _setPosition('topRight');
        } else {
          _setPosition('top');
        }
      } else if (width - offsetX < threshold) {
        if (height - offsetY < threshold) _setPosition('bottomRight');
        else _setPosition('right');
      } else if (height - offsetY < threshold) {
        _setPosition('bottom');
      } else {
        _setPosition('');
      }
    }
    target.addEventListener('mouseleave', onHoverEnd);
    target.addEventListener('mousemove', onHover);
    target.addEventListener('mousedown', onMouseDown);
    return () => {
      cover.remove();
      target.removeEventListener('mouseleave', onHoverEnd);
      target.removeEventListener('mousemove', onHover);
      target.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
    // eslint-disable-next-line
  }, []);
  return position;
}

function getComputedPagePosition(e, boundary) {
  if (e && e.cancelable && e.type === 'touchmove') e.preventDefault();
  const t =
    (e.touches && e.touches[0]) || (e.changedTouches && e.changedTouches[0]);
  let pageX = t ? t.pageX : e.pageX;
  let pageY = t ? t.pageY : e.pageY;
  if (!boundary) return { pageX, pageY };
  const { top, right, bottom, left } = boundary;
  if (pageX <= left) pageX = left;
  else if (pageX >= right) pageX = right;
  if (pageY <= top) pageY = top;
  else if (pageY >= bottom) pageY = bottom;
  return { pageX, pageY };
}
function getCursorStyle(pos) {
  switch (pos) {
    case 'top':
      return 'n-resize';
    case 'topRight':
      return 'ne-resize';
    case 'right':
      return 'e-resize';
    case 'bottomRight':
      return 'se-resize';
    case 'bottom':
      return 's-resize';
    case 'bottomLeft':
      return 'sw-resize';
    case 'left':
      return 'w-resize';
    case 'topLeft':
      return 'nw-resize';
    default:
      return 'auto';
  }
}
export default useElementResize;
