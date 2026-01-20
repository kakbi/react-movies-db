import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import About from './features/About/About.tsx';
import Movies from './features/Movies/Movies.tsx';
import { Provider } from 'react-redux';
import store from './store.ts';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <Provider store={store}>
                <App />
            </Provider>
        ),
        children: [
            {
                path: '/about',
                element: <About />,
            },
            {
                path: '/movies',
                element: <Movies />,
            },
        ],
    },
]);

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />,
);
