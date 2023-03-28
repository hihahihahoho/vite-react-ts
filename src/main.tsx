import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter basename={import.meta.env.VITE_BASE_URL}>
			<App />
		</BrowserRouter>
	</React.StrictMode>,
);
