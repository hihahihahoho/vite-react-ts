// import { gapi } from 'gapi-script';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo.svg';

function Home() {
	return (
		<div className="text-primary">
			<h1>Home</h1>
			<Logo />
			<Link to="/login">Login</Link>
		</div>
	);
}

export default Home;
