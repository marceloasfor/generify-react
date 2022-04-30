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
import { Profile } from './pages/profile';
import PlaylistDetail from './pages/playlists/PlaylistDetail';
import PlaylistList from './pages/playlists/PlaylistList';
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
					<Route path='/profile' element={<Profile />} />
					<Route path='/playlists' element={<PlaylistList />} />
					<Route path='/playlists/:id' element={<PlaylistDetail />} />
				</Routes>
				<Footer />
			</Router>
		</AuthProvider>
	);
}

export default App;
