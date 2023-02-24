import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Sidebar, Footer } from './components';
import {
  HomePage,
  CategoryPage,
  ErrorPage,
  PrivateRoute,
  Terms,
  TopicListPage,
  TopicPage,
} from './pages';

function App() {
  return (
    <Router>
      <Navbar />
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
      <Footer />
    </Router>
  );
}
export default App;
