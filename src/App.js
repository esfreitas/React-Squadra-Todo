//import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import TaskLists from "./components/TaskLists";
import Tasks from "./components/Tasks";
import { Layout } from "antd";
import "antd/dist/antd.css";




function App() {

  return (
    <Layout.Content style={{padding: 20}}>
      <Router>
        <Link to="/">Todas as Listas</Link> 
        <Switch>
          <Route exact path="/">
              <TaskLists />
          </Route>
          <Route exact path="/list/:id">
              <Tasks />
          </Route>
        </Switch>
      </Router>
    </Layout.Content>
  );
}

export default App;
