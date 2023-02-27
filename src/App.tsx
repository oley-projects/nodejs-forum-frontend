import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, NavlinksMobile, Sidebar, Footer } from './components';
import {
  HomePage,
  CategoryPage,
  ErrorPage,
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
      <NavlinksMobile />
      <div className='container page-100'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='category' element={<CategoryPage />} />
          <Route path='terms' element={<Terms />} />
          <Route path='topics' element={<TopicListPage />} />
          <Route path='topics/:id' element={<TopicPage />} />
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
        <Sidebar />
      </div>
      <Footer />
    </Router>
  );
}
export default App;
