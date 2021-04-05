import { Switch, Route, Redirect, Link, useLocation } from 'react-router-dom';
import GalleryPage from './pages/GalleryPage';
import { AppBar, makeStyles, Tab, Tabs, Toolbar, Typography, CssBaseline, Container } from '@material-ui/core';
import ArticlesPage from './pages/ArticlesPage';
import NewArticlePage from './pages/NewArticlePage';
import LoadingPage from './pages/LoadingPage';
import { AppContext } from './AppContextProvider';
import { useContext } from 'react';
import Footer from './components/Footer';
import dayjs from 'dayjs';

/**
 * Custom Material-UI style tweaks
 */
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  title: {
    marginRight: theme.spacing(3)
  },
  main: {
    marginTop: theme.spacing(3)
  }
}));

/**
 * All possible top-level navigation paths
 */
const navbarTabs = [
  { title: 'ToDos', path: '/todos' },
  { title: 'Gallery of the things', path: '/gallery' },
  { title: 'Make a new TOdo', path: '/newArticle' }
];

/**
 * A hook which gets the navbar tab index from the path
 */
function useTabIndex() {
  const { pathname } = useLocation();
  for (let i = 0; i < navbarTabs.length; i++) {
    if (pathname.startsWith(navbarTabs[i].path))
      return i;
  }
  return 0;
}

/**
 * Renders a navbar allowing the user to browse to the articles or gallery pages.
 * If the user tries to browse to any other URL, they are auto-redirected to the articles page.
 */
function App() {

  const { todosLoading } = useContext(AppContext);
  const classes = useStyles();
  const tabIndex = useTabIndex();

  return (

    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar variant="dense">

          <Typography variant="h6" className={classes.title}>
            STOLEN FRONTEND
          </Typography>

          <Tabs value={tabIndex} aria-label="main navigation tabs">
            {navbarTabs.map((tab, index) => (
              <Tab key={index} label={tab.title} component={Link} to={tab.path} />
            ))}
          </Tabs>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" className={classes.main}>

        <Toolbar variant="dense" />

        {todosLoading ? (
          <LoadingPage title="Loading TOdos!..." />
        ) : (

          <Switch>
            <Route path="/todos">
              <ArticlesPage />
            </Route>
            <Route path="/gallery">
              <GalleryPage />
            </Route>
            <Route path="/newArticle">
              <NewArticlePage />
            </Route>
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>

        )}
      </Container>

      <Footer title="You make it, I take it!" description={`Meeting all your assignment needs since ${dayjs().get('year')}`} />
    </div>
  );
}

export default App;