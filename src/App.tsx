import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, NavlinksMobile, Footer, Login, Signup } from './components';
import {
  HomePage,
  CategoryPage,
  ErrorPage,
  MemberPage,
  PrivateRoute,
  Terms,
  TopicListPage,
  TopicPage,
} from './pages';
import GlobalStyle from './GlobalStyle';

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Navbar />
      <Signup />
      <NavlinksMobile />
      <div className='container page-100'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='memberlist/:id' element={<MemberPage />} />
          <Route path='viewcategoty/:id' element={<CategoryPage />} />
          <Route path='viewforum/:id' element={<TopicListPage />} />
          <Route path='viewtopic/:id' element={<TopicPage />} />
          <Route path='terms' element={<Terms />} />
          <Route
            path='private'
            element={
              <PrivateRoute>
                <div>private</div>
              </PrivateRoute>
            }
          />
          <Route path='/error' element={<ErrorPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}
export default App;
