import { PAGE_SIZE } from '../config';

const pageCount = (max, pageSize) => (
  (max / pageSize | 0) + ((max % pageSize) && 1)
);

export const userToState = ({
  name, login, company, location, email, followers,
  avatar_url: avatarUrl,
  public_repos: publicRepos,
}) => ({
  name,
  login,
  avatarUrl,
  company,
  location,
  email,
  publicRepos,
  followers,
  pages: pageCount(publicRepos, PAGE_SIZE),
});
