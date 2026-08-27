import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@lottiefiles/dotlottie-web";
import './index.css'

import {Provider} from "react-redux"

import App from './App.jsx'
import { store } from './redux/store.js';

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <App />
    </Provider>
  ,
)
