export default {
  show: {
    display: 'block'
  },
  hide: {
    display: 'none'
  },
  box: {
    width: '100%',
    height: '100%',
  },
  continer: {
    display: 'block',
    boxSizing: 'border-box',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    width: '80%',
    zIndex: '667',
    backgroundColor: '#fff',
    boxShadow: '1px 1px 20px #333',
    borderRadius: '0.5rem',
    overflow: 'hidden'
  },
  title: {
    width: '100%',
    textAlign: 'center',
    padding: '0.5rem',
    borderBottom: '1px solid #eee',
    boxSizing: 'border-box'
  },
  content: {
    width: '100%',
    padding: '0.5rem',
    borderBottom: '1px solid #eee',
    boxSizing: 'border-box',
    minHeight: '100px',
    maxHeight: '300px',
    overflowY: 'auto'
  },
  foot: {
    width: '100%',
    textAlign: 'right',
    boxSizing: 'border-box',
    display: 'flex'
  },
  textAligncenter: {
    textAlign: 'center',
  },
  textAlignleft: {
    textAlign: 'left',
  },
  textAlignright: {
    textAlign: 'right',
  },
  boxbg: {
    display: 'block',
    boxSizing: 'border-box',
    position: 'fixed',
    width: '100%',
    height: '100%',
    zIndex: '666',
    top: '0',
    left: '0',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  small: {
    width: '40%',
  },
  middle: {
    width: '60%',
  },
  large: {
    width: '80%',
  },
  primary: {
    backgroundColor: 'rgb(65, 150, 252)',
    color: '#fff'
  },
  normal: {
    backgroundColor: 'rgb(235,244,255)',
    borderColor: 'rgb(65,150,252)',
  },
  disabled: {
    cursor: 'not-allowed',
    border: '1px solid #ddd',
    borderColor: '#ddd',
    backgroundColor: '#ddd',
    color: '#aaa'
  },
  leftCon: {
  },
  rightX: {
    position: 'absolute',
    right: '10px',
    top: '5px',
    cursor: 'pointer'
  },
  container: {
    // display: 'inline-block',
    // padding: '10px',
    // margin: '10px 10px'
  },
  spanb: {
    margin: '5px 5px',
    float: 'left',
    padding: '10px',
    backgroundColor: '#ddd',
  },
  buttonStyle: {
    margin: '0 0.5rem',
    flex: '1',
    minWidth: '10vw',
    minHeight: '2.5rem'
  }
};
