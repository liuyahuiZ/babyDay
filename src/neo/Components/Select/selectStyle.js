export default {
  select: {
    display: 'inline-block',
    height: '32px',
    backgroundColor: '#fff',
    fontSize: '16px',
    width: '100%',
    lineHeight: '30px',
    border: '1px solid #999',
    borderRadius: '3px',
    WebkitAppearance: 'none',
    boxSizing: 'border-box',
    padding: '0 5px 0 5px',
    cursor: 'pointer',
    overflow: 'hidden',
  },
  active: {
    border: '1px solid rgb(65, 150, 252)',
    borderRadius: '3px',
    outline: '0',
    boxShadow: '0 0 0 2px rgba(65, 150, 252,.3)'
  },
  container: {
    width: '300px',
    display: 'inline-block',
    position: 'relative',
  },
  disabled: {
    cursor: 'not-allowed',
    border: '1px solid #ddd',
    borderColor: '#ddd',
    backgroundColor: '#ddd',
    color: '#aaa'
  },
  content: {
    position: 'absolute',
    width: '100%',
    top: '35px',
    left: '0px',
    border: '1px solid #999',
    borderRadius: '3px',
    boxSizing: 'border-box',
    zIndex: '10',
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  text: {
    width: '90%',
    overflowX: 'hidden',
    whiteSpace: 'nowrap',
    wordBreak: 'break-all',
    textOverflow: 'ellipsis',
    height: '32px',
    textAlign: 'left'
  },
  options: {
    position: 'relative',
    width: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    top: '1px',
    left: '0px',
    maxHeight: '200px',
    boxSizing: 'border-box',
    zIndex: '10',
    backgroundColor: '#fff'
  },
  filter: {
    width: '100%',
    height: '30px',
    borderBottom: '1px solid #999',
    overflow: 'hidden',
    top: '35px',
    left: '0px',
    textAlign: 'left'
  },
  filterInput: {
    width: '80%',
    height: '30px',
    overflow: 'hidden',
    border: 0,
    outline: 0,
    top: '35px',
    left: '0px',
  },
  node: {
    display: 'inline-block',
    width: '100%',
    padding: '3px 5px',
    lineHeight: '30px',
    boxSizing: 'border-box',
    cursor: 'pointer',
    float: 'left',
    textAlign: 'left'
  },
  icon: {
    position: 'absolute',
    right: '5px',
    top: '0px',
  },
  show: {
    display: 'inline-block'
  },
  hide: {
    display: 'none'
  }
};
