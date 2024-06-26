import { useEffect } from 'react';
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
  TermsPage,
  ResultsPage,
  TopicPage,
  ForumPage,
} from './pages';
import GlobalStyle from './GlobalStyle';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGeneralContext } from './context/generalContext';
import { useFormItemContext } from './context/formItemContext';

function App() {
  const { isError, errorType, errorText, setIsError } = useGeneralContext();
  const { isModalLoginOpen, isModalSignupOpen, isModalForumOpen, formItem } =
    useFormItemContext();
  useEffect(() => {
    if (isError) {
      const errorTextTemp =
        errorText === 'jwt expired'
          ? errorText + ', please re-login and try again'
          : errorText;

      toast(errorTextTemp, {
        icon: false,
        type: errorType,
      });
      setTimeout(() => {
        setIsError(false);
      }, 6000);
    }
    // eslint-disable-next-line
  }, [isError]);
  return (
    <>
      <GlobalStyle />
      <Navbar />
      {isModalLoginOpen && <Login />}
      {isModalSignupOpen && <Signup />}
      {isModalForumOpen && <FormItem {...formItem} />}
      <NavlinksMobile />
      <ToastContainer autoClose={6000} limit={1} transition={Zoom} />
      <div className='container page-100'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route element={<Layout />}>
            <Route path='memberlist/:id' element={<MemberPage />} />
            <Route path='viewforum/:id' element={<ForumPage />} />
            <Route path='viewtopic/:id' element={<TopicPage />} />
            <Route path='viewresults/:query?' element={<ResultsPage />} />
            <Route path='terms' element={<TermsPage />} />
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
