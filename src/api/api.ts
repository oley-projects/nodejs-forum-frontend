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
  getCategories(page = 1, limit = 10) {
    return instance.get(`categories?page=${page}&limit=${limit}`);
  },
  getData(name: string, page = 1, limit = 10) {
    return instance.get(`${name}?&page=${page}&limit=${limit}`);
  },
  getCategory(categoryId: number, page = 1, limit = 10) {
    return instance.get(`category/${categoryId}?&page=${page}&limit=${limit}`);
  },
  postCategory(category: {}) {
    return instance.post('category', category);
  },
  updateCategory(category: { id: number }) {
    return instance.put(`category/${category.id}`, category);
  },
  deleteCategory(categoryId: number) {
    return instance.delete(`category/${categoryId}`);
  },
  getForum(forumId: number, page = 1, limit = 10) {
    return instance.get(`forum/${forumId}?&page=${page}&limit=${limit}`);
  },
  postForum(forum: {}) {
    return instance.post('forum', forum);
  },
  updateForum(forum: { id: number }) {
    return instance.put(`forum/${forum.id}`, forum);
  },
  deleteForum(forumId: number) {
    return instance.delete(`forum/${forumId}`);
  },
  getTopic(topicId: number, page = 1, limit = 10) {
    return instance.get(`topicPosts/${topicId}?&page=${page}&limit=${limit}`);
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
  getPost(postId: number) {
    return instance.get(`post/${postId}`);
  },
  postPost(post: {}) {
    return instance.post('post', post);
  },
  updatePost(post: { id: number }) {
    return instance.put(`post/${post.id}`, post);
  },
  deletePost(postId: number) {
    return instance.delete(`post/${postId}`);
  },
  signUp(user: {}) {
    return instance.put(`auth/signup`, user);
  },
  login(user: {}) {
    return instance.post(`auth/login`, user);
  },
};
