import api from './api';

export const fetchUser = userName => api.get(`/users/${userName}`);

export const fetchUserRepos = (userName, page = 1) => api.get(
  `/users/${userName}/repos`,
  { page, sort: 'updated', direction: 'desc' }
);

export const fetchRepo = (userName, repoName) => api.get(
  `/repos/${userName}/${repoName}`
);

export const fetchForks = (userName, repoName) => api.get(
  `/repos/${userName}/${repoName}/forks`
);

export const fetchPulls = (userName, repoName) => api.get(
  `/repos/${userName}/${repoName}/pulls`
);

export const fetchIssues = (userName, repoName) => api.get(
  `/repos/${userName}/${repoName}/issues`
);
