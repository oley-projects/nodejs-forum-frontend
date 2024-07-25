import ErrorPage from './ErrorPage';
import ForumPage from './ForumPage';
import HomePage from './HomePage';
import MemberPage from './MemberPage';
import Layout from './PageLayout';
import PrivateRoute from './PrivateRoute';
import TermsPage from './TermsPage';
import TopicPage from './TopicPage';
import ResultsPage from './ResultsPage';

import TimeAgo from 'javascript-time-ago';

import en from 'javascript-time-ago/locale/en';
TimeAgo.addDefaultLocale(en);

export {
  ErrorPage,
  ForumPage,
  HomePage,
  MemberPage,
  Layout,
  PrivateRoute,
  TermsPage,
  TopicPage,
  ResultsPage,
};
