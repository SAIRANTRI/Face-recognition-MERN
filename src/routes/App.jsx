import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SplashImage from '../assets/Splash4Edddc9Ajpg.jpeg'; // Ensure the path is correct

function App() {
  return (
    <div
      style={{
        backgroundImage: `url(${SplashImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Header stays at the top */}
      <div className=" w-full flex justify-center px-5">
        <Header />
      </div>

      <div className=" w-full flex justify-center">
        <Outlet />
      </div>

      {/* Footer stays at the bottom */}
      <div className="w-full flex justify-center px-5">
        <Footer />
      </div>
    </div>
  );
}

export default App;
