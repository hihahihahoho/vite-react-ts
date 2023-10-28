// import { gapi } from 'gapi-script';
import { Button, StaticImage } from '@/libs/components';
import { ReactComponent as Logo } from '@assets/logo.svg';
import { Link } from 'react-router-dom';

function Home() {
	return (
		<div className="dark-mode">
			<h1>Home</h1>
			<Logo />
			<Link className="" to="">
				<button>Go Login</button>
				<Button />
			</Link>
			<StaticImage src="assets/patern/bill-header-pattern.jpg" />
		</div>
	);
}

export default Home;
