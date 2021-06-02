import {Switch, Route} from 'react-router-dom'
import {Provider} from 'react-redux'
import './App.css';
import {
	MainPage,
} from './pages/index'
import NavBar from './components/NavBar/NavBar.jsx'
import store from './redux/store'

function App() {
  return (
	<Provider store={store}>
		<div className="App">
			<NavBar />
			<Switch>
				<Route exact path='/' component={MainPage} />
			</Switch>
		</div>
	</Provider>
  );
}

export default App;
