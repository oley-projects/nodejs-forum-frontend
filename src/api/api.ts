import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/forum/',
  timeout: 7000,
});

export const forumAPI = {
  getCategories() {
    return instance.get('categories');
  },
  getTopics() {
    return instance.get('topics');
  },
  postTopic(topicData: {}) {
    return instance.post('topic', topicData);
  },
};
