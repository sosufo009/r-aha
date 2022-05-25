import NavBar from '../NavBar';
import Footer from '../Footer';

type PropsType = {
  children?: React.ReactNode
}

function Layout(props: PropsType): JSX.Element {
  return (
    // <div className="bg-[#181818] h-full flex-col flex justify-center items-center text-white">
    <div className="bg-gray-500 h-full flex-col flex justify-center items-center text-white">
      <NavBar />
      {props.children}
      <Footer />
    </div>
  );
}

export default Layout;
