import sizes from './sizes';
import bg from './bg.svg'

export default {
  '@global': {
    '.fade-exit': {
      opacity: 1
    },
    '.fade-exit-active': {
      opacity: 0,
      transition: 'opacity 500ms ease-out'
    }
  },
  root: {
    height: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    backgroundImage: `url(${bg})`, // background by SVGBackgrounds.com
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top left',
    overflow: 'scroll'
  },
  heading: {
    fontSize: '2rem',
    color: '#303542',
    fontWeight: 'bold',
  },
  container: {
    width: '50%',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    flexWrap: 'wrap',
    [sizes.down('xl')]: {
      width: '80%'
    },
    [sizes.down('xs')]: {
      width: '70%'
    }
  },
  nav: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    '& a': {
      position: 'absolute',
      right: 0,
      color: '#f2bd2c',
    },
    [sizes.down('xs')]: {
      position: 'inherit',
      flexDirection: 'column',
      justifyContent: 'center',
      '& h1': {
        color: '#fff',
        marginBottom: '16px'
      },
      '& a': {
        position: 'inherit',
        marginBottom: '16px'
      }
    }
  },
  palettes: {
    boxSizing: 'border-box',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 30%)',
    gridGap: '2.5rem',
    [sizes.down('md')]: {
      gridTemplateColumns: 'repeat(2, 50%)'
    },
    [sizes.down('xs')]: {
      gridTemplateColumns: 'repeat(1, 100%)',
      gridGap: '1.4rem'
    }
  }
};
