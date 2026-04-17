import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './App.jsx' 
import { Provider } from 'react-redux'
import { store } from './Store/store.js'
<<<<<<< HEAD


=======
>>>>>>> 1e4cb188a921aea915cde887d8d577dda2dc9029

createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
)
