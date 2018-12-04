export default {
  box: {
    width: '100%',
    height: '100%',
  },
  loadContainer: {
    display: 'block',
    boxSizing: 'border-box',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    zIndex: '9999',
  },
  loader: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    zIndex: '1000',
  },
  boxbg: {
    display: 'block',
    boxSizing: 'border-box',
    position: 'fixed',
    width: '100%',
    height: '100%',
    zIndex: '999',
    top: '0',
    left: '0',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  rightX: {
    position: 'absolute',
    right: '10px',
    top: '5px',
    cursor: 'pointer'
  },
  progressContainer: {
    position: 'relative',
    width: '100%',
    height: '3px',
    zIndex: '1000',
    padding: '0',
    margin: '0',
    opacity: '0.9'
  },
  bar: {
    position: 'absolute',
    top: '0',
    left: '0',
    height: '100%',
    zIndex: '100'
  },
  borderRadius: {
    borderRadius: '10px'
  }
};
