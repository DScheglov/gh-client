import browserHistory from 'history/createBrowserHistory';
import { mountPath } from '../src/config';

export const history = browserHistory({
  basename: mountPath
});
