export const repoToState = ({
  name, owner, description, fork, language, license, forks,
  stargazers_count: stargazersCount,
  full_name: fullName,
  private: isPrivate,
  open_issues: openIssues
}) => ({
  name,
  owner: owner.login,
  fullName,
  isPrivate,
  description,
  fork,
  stargazersCount,
  language,
  license: license && license.name || '',
  forksCount: forks,
  openIssues,
});

export const reposToState = (repos, action) => repos.reduce(
  (state, repo) => {
    const mappedRepo = repoToState(repo);
    state[0].push(action(mappedRepo));
    state[1].push(mappedRepo.fullName);
    return state;
  }, [[], []]
);

