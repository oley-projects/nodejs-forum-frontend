import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 7000,
});

export const forumAPI = {
  getCategories() {
    return instance.get('forum/categories');
  },
  getData(name: string, page = 1, limit = 10) {
    return instance.get(`forum/${name}?&page=${page}&limit=${limit}`);
  },
  getTopic(topicId: number) {
    return instance.get(`forum/topic/${topicId}`);
  },
  postTopic(topic: {}) {
    return instance.post('forum/topic', topic);
  },
  updateTopic(topic: { id: number }) {
    return instance.put(`forum/topic/${topic.id}`, topic);
  },
  deleteTopic(topicId: number) {
    return instance.delete(`forum/topic/${topicId}`);
  },
  signUp(user: {}) {
    return instance.put(`auth/signup`, user);
  },
  login(user: {}) {
    return instance.post(`auth/login`, user);
  },
};
