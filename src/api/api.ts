import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/forum/',
  timeout: 7000,
});

export const forumAPI = {
  getCategories() {
    return instance.get('categories');
  },
  getForum(page = 1, limit = 10) {
    return instance.get(`topics?&page${page}&limit${limit}`);
  },
  getTopic(topicId: number) {
    return instance.get(`topic/${topicId}`);
  },
  postTopic(topic: {}) {
    return instance.post('topic', topic);
  },
  updateTopic(topic: { id: number }) {
    return instance.put(`topic/${topic.id}`, topic);
  },
  deleteTopic(topicId: number) {
    return instance.delete(`topic/${topicId}`);
  },
};
