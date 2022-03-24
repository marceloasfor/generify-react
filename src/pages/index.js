import React from "react";
import { Link } from "react-router-dom";
import card1 from '../images/card0.jpg';
import card2 from '../images/card2.jpg';
import card3 from '../images/card3.jpg';

const Home = () => {
	return (
		<div>
			<div className="main-banner">
				<div className="main-text">
					<p style={{fontFamily: '"Sofia", sans-serif', fontSize: '60pt', color:'#ffffff', letterSpacing: '0px', fontWeight: 'normal'}}>Generify</p>
					<p>Assine agora, ligue o play e esqueça o mundo</p>

					<Link  to="/form" activeStyle>
						<button className="main-button main-button1" style={{fontWeight: 'normal'}} >ASSINAR</button> </Link>

				</div>
			</div>

			<div className="container mt-3" style={{paddingBottom: '20px'}}>
				<div className="row">

			
					<div className="col-sm-4 text-dark" >
						<div className="card" style={{width: 'auto'}} >
							<img className="card-img-top" src={card1} alt="Card1" />
							<div className="card-body">
								<h4 className="card-title">Jazz and Soul</h4>
								<p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et massa id purus scelerisque congue. Ut augue lacus, interdum ut elementum ut, tincidunt eu arcu. Integer urna mi, iaculis sed consequat eu, lacinia sed nibh. Praesent faucibus, ex et iaculis efficitur, metus leo scelerisque ex, sed vestibulum lectus urna sed magna.</p>
					
							</div>
						</div>
					</div>

			
					<div className="col-sm-4 text-dark">
						<div className="card" style={{width: 'auto'}}>
							<img className="card-img-top" src={card2} alt="Card2" />
							<div className="card-body">
								<h4 className="card-title">Eletronic Music</h4>
								<p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et massa id purus scelerisque congue. Ut augue lacus, interdum ut elementum ut, tincidunt eu arcu. Integer urna mi, iaculis sed consequat eu, lacinia sed nibh. Praesent faucibus, ex et iaculis efficitur, metus leo scelerisque ex, sed vestibulum lectus urna sed magna.</p>
					
							</div>
						</div>
					</div>

			
					<div className="col-sm-4 text-dark">
						<div className="card" style={{width: 'auto'}}>
							<img className="card-img-top" src={card3} alt="Card3" />
							<div className="card-body">
								<h4 className="card-title">Relax Music</h4>
								<p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et massa id purus scelerisque congue. Ut augue lacus, interdum ut elementum ut, tincidunt eu arcu. Integer urna mi, iaculis sed consequat eu, lacinia sed nibh. Praesent faucibus, ex et iaculis efficitur, metus leo scelerisque ex, sed vestibulum lectus urna sed magna.</p>
				
							</div>
						</div>
					</div>

				</div>

			</div>
		</div>
	);
};

export default Home;
