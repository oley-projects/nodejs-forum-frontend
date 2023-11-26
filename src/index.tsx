import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';

import { GeneralProvider } from './context/generalContext';
import { CategoryProvider } from './context/categoryContext';
import { ForumProvider } from './context/forumContext';
import { TopicProvider } from './context/topicContext';
import { PostProvider } from './context/postContext';
import { FormItemProvider } from './context/formItemContext';
import { AuthProvider } from './context/authContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Router>
    <GeneralProvider>
      <CategoryProvider>
        <ForumProvider>
          <TopicProvider>
            <PostProvider>
              <FormItemProvider>
                <AuthProvider>
                  <App />
                </AuthProvider>
              </FormItemProvider>
            </PostProvider>
          </TopicProvider>
        </ForumProvider>
      </CategoryProvider>
    </GeneralProvider>
  </Router>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
