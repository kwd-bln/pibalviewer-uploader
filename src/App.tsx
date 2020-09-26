import React, { FC } from 'react';
import logo from './logo.svg';
import { HashRouter, Switch, Route, match } from 'react-router-dom';
import TopPage from './components/TopPage'
import './App.scss';


const Detail: FC<{ match: match<{ id: string }> }> = ({ match }) => (
  <>id: {match.params.id}</>
);

function App() {
  return (
    <HashRouter>
      <div className="App">
      <header className="App-header">
        <p>
          PibalViewer Uploader
        </p>
      </header>
      <div className="_RoutingArea">
            {/* Switchで囲んで、Routeで設定したcomponentが呼ばれるように設定 */}
            <Switch>
              {/* exactにしてrootにアクセスされたときはだけ「Top!」と表示されるように設定 */}
              <Route exact path="/" component={TopPage} />
              {/* exactではないので、「detail/hoge」でも以下のcomponentは呼ばれる */}
              <Route path="/detail/:id" component={Detail} />
            </Switch>
          </div>
    </div>
    </HashRouter>
  );
}



export default App;
