import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './page/Home';
import DemoPassword from './page/DemoPassword';
import DemoCalendar from './page/DemoCalendar';

function RoutesConfig() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="password" element={<DemoPassword />} />
        <Route path="calendar" element={<DemoCalendar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesConfig;
