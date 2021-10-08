import { Provider } from 'react-redux';
import store from '@src/store';
import Gui from './components/Gui';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Gui></Gui> 
    </Provider>
  );
}

export default App;
