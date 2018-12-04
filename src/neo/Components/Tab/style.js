export default {
  container: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    fontSize: '1rem'
  },
  containerHead: {
    display: 'inline-block',
    width: '100%',
    boxSizing: 'border-box',
    overflow: 'hidden',
    display: 'flex',
    borderBottom: '1px solid #333',
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
    color: '#999'
  },
  tabSpan: {
    width: '100%',
    boxSizing: 'border-box',
    height: '2rem',
    lineHeight: '2rem',
    display: 'inline-block',
  },
  tabActive: {
    color: '#9CD36D'
  },
  leftTabActive: {
    color: '#9CD36D',
  },
  tabContent: {
    display: 'inline-block',
    width: '100%',
    minHeight: '50vh',
    boxSizing: 'border-box',
  },
  borderNone: {
    border: 0,
    borderRight: 0,
  }
};
