import React, { FC } from 'react';
import logo from './logo.svg';
import { HashRouter, Switch, Route, match } from 'react-router-dom';
import './App.scss';


const Detail: FC<{ match: match<{ id: string }> }> = ({ match }) => (
  <>id: {match.params.id}</>
);

function App() {
  return (
    <HashRouter>
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div className="_RoutingArea">
            {/* Switchで囲んで、Routeで設定したcomponentが呼ばれるように設定 */}
            <Switch>
              {/* exactにしてrootにアクセスされたときはだけ「Top!」と表示されるように設定 */}
              <Route exact path="/" component={() => <>Top!</>} />
              {/* exactではないので、「detail/hoge」でも以下のcomponentは呼ばれる */}
              <Route path="/detail/:id" component={Detail} />
            </Switch>
          </div>
    </div>
    </HashRouter>
  );
}

export default App;
