import Header from '../components/Header';
import Footer from '../components/Footer';

interface LayoutProps {
	children: JSX.Element | JSX.Element[];
}

export default function Layout({ children }: LayoutProps) {
	return (
		<main>
			<Header />
			{children}
			<Footer />
		</main>
	);
}
