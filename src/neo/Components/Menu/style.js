export default {
  rootUl: {
    listStyle: 'none',
    padding: '0px',
    backgroundColor: '#404040',
    width: '100%',
    margin: '0'
  },
  ul: {
    listStyle: 'none',
    padding: '0px',
    backgroundColor: '#404040',
    zIndex: 10,
    margin: '0'
  },
  li: {
    padding: '1px',
    boxSizing: 'border-box',
    position: 'relative',
    zIndex: 10
  },
  subUl: {
    backgroundColor: '#333'
  },
  childPadding: {
    paddingLeft: '12px'
  },
  show: {
    display: 'block',
  },
  hide: {
    display: 'none'
  },
  preIcon: {
    width: '20px',
    height: '25px',
    display: 'inline-block',
  },
  switch: {
    position: 'absolute',
    right: '10px',
    width: '20px',
    height: '25px',
    display: 'inline-block',
    cursor: 'pointer',
  },
  painner: {
    display: 'inline-block',
    position: 'relative',
    width: '100%',
    height: '40px',
    lineHeight: '40px',
    padding: '0px 30px 0 10px',
    boxSizing: 'border-box',
    overflow: 'hidden'
  },
  text: {
    display: 'inline-block',
    padding: '0 5px 0 10px',
    borderRadius: '2px',
    margin: '0',
    cursor: 'pointer',
    textDecoration: 'none',
    verticalAlign: 'top',
    width: 'calc(100% - 55px)',
    color: '#999',
    textOverflow: 'ellipsis',
    minWidth: '100px',
    fontSize: '90%',
    height: '40px',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  checkbox: {
    display: 'inline-block',
    width: '15px',
    height: '15px',
    border: '1px solid #999',
    borderRadius: '2px',
    lineHeight: '15px',
    textAlign: 'center',
    color: '#fff'
  },
  checked: {
    backgroundColor: '#108ee9',
    border: '1px solid #108ee9',
    borderRadius: '2px',
  },
  active: {
    backgroundColor: '#1FA1FF',
    color: '#fff'
  },
  hover: {
    color: '#fff'
  },
  collapsedStyle: {
    position: 'absolute', marginLeft: '4px', left: '100%', top: '0px', zIndex: '990', borderRadius: '5px'
  }
};
