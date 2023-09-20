import axios from 'axios';

let token = '';
if (localStorage.getItem('user')) {
  token = JSON.parse(localStorage.getItem('user') || '').token;
}

const instance = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 7000,
  headers: { Authorization: `Bearer ${token}` },
});

export const forumAPI = {
  getCategories() {
    return instance.get('forum/categories');
  },
  getData(name: string, page = 1, limit = 10) {
    return instance.get(`forum/${name}?&page=${page}&limit=${limit}`);
  },
  getTopic(topicId: number, page = 1, limit = 10) {
    return instance.get(
      `forum/topicPosts/${topicId}?&page=${page}&limit=${limit}`
    );
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
  getPost(postId: number) {
    return instance.get(`forum/post/${postId}`);
  },
  postPost(post: {}) {
    return instance.post('forum/post', post);
  },
  updatePost(post: { id: number }) {
    return instance.put(`forum/post/${post.id}`, post);
  },
  deletePost(postId: number) {
    return instance.delete(`forum/post/${postId}`);
  },
  signUp(user: {}) {
    return instance.put(`auth/signup`, user);
  },
  login(user: {}) {
    return instance.post(`auth/login`, user);
  },
};
