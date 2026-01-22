import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import About from './features/About/About.tsx';
import { MoviesFetch } from './features/Movies/Movies.tsx';
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
                element: <MoviesFetch />,
            },
        ],
    },
]);

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />,
);
