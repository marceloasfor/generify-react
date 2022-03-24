import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route}
	from 'react-router-dom';
import Home from './pages/index';
import Faq from './pages/faq';
import Form from './pages/form';
import Login from './pages/login';

function App() {
return (
	<Router>
	<Navbar />
	<Routes>
		<Route path='/' element={<Home />} />
		<Route path='/faq' element={<Faq/>} />
		<Route path='/form' element={<Form/>} />
		<Route path='/login' element={<Login/>} />
	</Routes>
	<Footer />
	</Router>
);
}

export default App;
