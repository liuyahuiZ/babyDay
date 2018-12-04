export default {
  button: {
    boxSizing: 'border-box',
    display: 'inline-block',

    textDecoration: 'none',
    margin: 0,
    padding: 0,
    outline: 'none',
    position: 'relative',
    zIndex: 1,
    cursor: 'pointer',

    fontSize: '16px',
    height: '32px',
    minWidth: '140px',
    borderRadius: '1px',

    backgroundColor: '#fff',
    color: '#333',
    border: '1px solid #aaa',
  },
  buttonHover: {
    borderColor: '#5ba4fd',
    color: '#4196fc'
  },
  buttonActive: {
    borderColor: '#2888fd',
    color: '#2888fd'
  },


  primary: {
    border: '1px solid #4196fc',
    borderColor: '#4196fc',
    backgroundColor: '#4196fc',
    color: '#fff',
  },
  primaryHover: {
    backgroundColor: '#5ba4fd'
  },
  primaryActive: {
    backgroundColor: '#2888fd'
  },
  small: {
    fontSize: '14px',
    height: '32px',
    minWidth: '60px',
    borderRadius: '2px'
  },
  large: {
    height: '46px',
    minWidth: '140px',
    borderRadius: '4px'
  },
  disabled: {
    cursor: 'not-allowed',
    border: '1px solid #ddd',
    borderColor: '#ddd',
    backgroundColor: '#ddd',
    color: '#aaa'
  },
  link: {
    fontSize: '16px',
    border: 'none',
    background: 'none',
    color: '#4196fd',
    minWidth: 0,
    lineHeight: 1,
    height: '16px',
    margin: '0'
  },

  linkHover: {
    border: 'none',
    background: 'none',
    color: '#95c5ff',
    textDecoration: 'underline'
  },

  linkActive: {
    border: 'none',
    background: 'none',
    color: '#2588ff',
    textDecoration: 'underline'
  },

  linkDisabled: {
    cursor: 'not-allowed',
    color: '#aaa',
    border: '0',
  },
  alldisabled: {
    cursor: 'not-allowed'
  }
};
