import { BrowserRouter } from 'react-router-dom';
import RoutesConfig from './routes';
import {setupTray} from '@/components/Setting/SystemTray'
function App() {
    setupTray();
    return (
        <BrowserRouter>
            <RoutesConfig />
        </BrowserRouter>
    );
}
export default App;
