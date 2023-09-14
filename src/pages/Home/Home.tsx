// import { gapi } from 'gapi-script';
import { Link } from 'react-router-dom';
import banner from '../../assets/bill-header-pattern.jpg';
import { ReactComponent as Logo } from '../../assets/logo.svg';

function Home() {
	return (
		<div className="vietcombank">
			<div className="text-primary">
				<h1>Home</h1>
				<Logo />
				<Link to="/login">Go Login</Link>
				<img src={banner} alt="" />
			</div>
		</div>
	);
}

export default Home;
