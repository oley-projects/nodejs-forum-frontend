import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Navbar,
  NavlinksMobile,
  Footer,
  Login,
  Signup,
  ItemForm,
} from './components';
import {
  HomePage,
  CategoryPage,
  ErrorPage,
  MemberPage,
  Layout,
  PrivateRoute,
  Terms,
  PostListPage,
  TopicPage,
  ForumPage,
} from './pages';
import GlobalStyle from './GlobalStyle';
import { useFormItemContext } from './context/formItemContext';

function App() {
  const { isModalLoginOpen, isModalSignupOpen, isModalForumOpen, isEditing } =
    useFormItemContext();
  return (
    <Router>
      <GlobalStyle />
      <Navbar />
      {isModalLoginOpen && <Login />}
      {isModalSignupOpen && <Signup />}
      {isModalForumOpen && (
        <ItemForm type='Topic' action='New' name='' description='' />
      )}
      {isEditing && <div>editing...</div>}
      <NavlinksMobile />
      <div className='container page-100'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route element={<Layout />}>
            <Route path='memberlist/:id' element={<MemberPage />} />
            <Route path='viewcategoty/:id' element={<CategoryPage />} />
            <Route path='viewforum/:id' element={<ForumPage />} />
            <Route path='viewtopic/:id' element={<TopicPage />} />
            <Route path='results' element={<PostListPage />} />
            <Route path='terms' element={<Terms />} />
            <Route
              path='private'
              element={
                <PrivateRoute>
                  <div>private</div>
                </PrivateRoute>
              }
            />
          </Route>
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}
export default App;
