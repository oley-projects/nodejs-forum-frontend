import { Routes, Route } from 'react-router-dom';
import {
  Navbar,
  NavlinksMobile,
  Footer,
  Login,
  Signup,
  FormItem,
} from './components';
import {
  HomePage,
  ErrorPage,
  MemberPage,
  Layout,
  PrivateRoute,
  Terms,
  FoundPostsPage,
  TopicPage,
  ForumPage,
} from './pages';
import GlobalStyle from './GlobalStyle';
import { useFormItemContext } from './context/formItemContext';

function App() {
  const { isModalLoginOpen, isModalSignupOpen, isModalForumOpen, formItem } =
    useFormItemContext();
  return (
    <>
      <GlobalStyle />
      <Navbar />
      {isModalLoginOpen && <Login />}
      {isModalSignupOpen && <Signup />}
      {isModalForumOpen && <FormItem {...formItem} />}
      <NavlinksMobile />
      <div className='container page-100'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route element={<Layout />}>
            <Route path='memberlist/:id' element={<MemberPage />} />
            <Route path='viewforum/:id' element={<ForumPage />} />
            <Route path='viewtopic/:id' element={<TopicPage />} />
            <Route path='results' element={<FoundPostsPage />} />
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
    </>
  );
}
export default App;
