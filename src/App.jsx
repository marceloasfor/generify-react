import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route }
	from 'react-router-dom';
import Index from './pages/index';
import Faq from './pages/faq';
import Form from './pages/form';
import Login from './pages/login';
import Home from './pages/home';
import PlaylistDetail from './pages/playlists/PlaylistDetail';
import { AuthProvider } from './context/AuthContext';	// Passes context to children



function App() {

	return (
		<AuthProvider >
			<Router>
				<Navbar />
				<Routes>
					<Route path='/' element={<Index />} />
					<Route path='/faq' element={<Faq />} />
					<Route path='/form' element={<Form />} />
					<Route path='/login' element={<Login />} />
					<Route path='/home' element={<Home />} />
					<Route path='/playlists/:id' element={<PlaylistDetail />} />
				</Routes>
				<Footer />
			</Router>
		</AuthProvider>
	);
}

export default App;
