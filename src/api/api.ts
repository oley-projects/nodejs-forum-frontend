import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/forum/',
  timeout: 7000,
});

export const forumAPI = {
  getCategories() {
    return instance.get('categories');
  },
  getForum() {
    return instance.get('topics');
  },
  getTopic(topicId: number) {
    return instance.get(`topic/${topicId}`);
  },
  postTopic(topicData: {}) {
    return instance.post('topic', topicData);
  },
};
