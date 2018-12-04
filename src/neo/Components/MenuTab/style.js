export default {
  container: {
    position: 'relative',
    width: '100%',
    overflow: 'auto',
    fontSize: '1rem'
  },
  containerHead: {
    display: 'inline-block',
    width: '100%',
    boxSizing: 'border-box',
    overflow: 'hidden',
    display: 'flex',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: '0px',
    zIndex: '100'
  },
  floatLeft: {
    float: 'left',
    top: '0px'
  },
  leftHeadWidth: {
    width: '30%',
    borderRight: '1px solid #ddd',
    borderBottom: '0',
    maxHeight: '50vh',
    overflow: 'auto',
  },
  leftContentWidth: {
    width: '70%',
    maxHeight: '50vh',
    overflow: 'auto',
    padding: '0 0.3rem'
  },
  show: {
    display: 'inline-block',
    width: '100%',
  },
  hide: {
    display: 'none',
  },
  tabItem: {
    display: 'inline-block',
    boxSizing: 'border-box',
    cursor: 'pointer',
    flex: 1,
    textAlign: 'center',
    color: '#999',
    height: '3.5rem',
  },
  tabSpan: {
    width: '100%',
    boxSizing: 'border-box',
    height: '3.5rem',
    lineHeight: '3.5rem',
    display: 'inline-block',
    // borderRight: '1px solid #E0E0E0',
  },
  tabActive: {
    color: 'rgb(65, 150, 252)'
  },
  leftTabActive: {
    color: 'rgb(65, 150, 252)',
    backgroundColor: '#f5f5f5'
  },
  tabContent: {
    display: 'inline-block',
    width: '100%',
    minHeight: '90vh',
    boxSizing: 'border-box',
    overflow: 'auto',
  },
  borderNone: {
    border: 0,
    borderRight: 0,
  }
};
