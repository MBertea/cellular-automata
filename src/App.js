import logo from './logo.svg';
import './App.css';
import CellularAutomata from './Components/CellularAutomata';
import { memo } from 'react';



function App() {
	return (
		<div className="appContainer">
			<CellularAutomata />
		</div>
	);
}

export default memo(App);
