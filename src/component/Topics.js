import { BrowserRouter, Switch, Route, Link, useRouteMatch, useParams } from 'react-router-dom';
import Topic from './Topic';

export default function Topics() {
    let match = useRouteMatch();
  
    return (
      <div>
        <h2>Topics</h2>
        <ul>
          <li><Link to={`${match.url}/components`}>Components</Link></li>
          <li><Link to={`${match.url}/props`}>Props</Link></li>
          <li><Link to={`${match.url}/states`}>States</Link></li>
        </ul>
  
        <Switch>
          <Route path={`${match.path}/:topicId`}>
            <Topic />
          </Route>
          <Route path={`${match.path}`}>
            <h3>Please select a topic.</h3>
          </Route>
        </Switch>
      </div>
    )
}
  