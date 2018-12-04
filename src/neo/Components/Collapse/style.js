export default {
  container: {
    display: 'block',
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    borderRadius: '3px',
    border: '1px solid #eee',
    boxSizing: 'border-box'
  },
  panel: {
    float: 'left',
    display: 'block',
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  panelHeader: {
    float: 'left',
    position: 'relative',
    padding: '5px',
    cursor: 'pointer',
    width: '100%',
    zIndex: '10',
    backgroundColor: '#fff',
    boxSizing: 'border-box'
  },
  show: {
    width: '100%',
    display: 'inline-block',
    maxHeight: '50px'
  },
  hide: {
    maxHeight: '0px'
  },
  panelContent: {
    float: 'left',
    position: 'relative',
    padding: '5px',
    width: '100%',
    zIndex: '8',
    boxSizing: 'border-box'
  },
  icon: {
    display: 'inline-block',
    width: '25px',
    height: '25px',
    textAlign: 'center',
    lineHeight: '25px',
    padding: '0'
  }
};
