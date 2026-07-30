import api from './api';

const categoryService = {
  getAllCategories: () => api.get('/categories'),
};

export default categoryService;
