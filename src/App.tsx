import { Link, Outlet } from 'react-router-dom';

import s from './App.module.scss';

function App() {
    return (
        <div className={s.root}>
            <header className={s.header}>
                <img src="/cinema-ico.png" alt="logo" className={s.logo} />
                <ul>
                    <li>
                        <Link className={s.link} to="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link className={s.link} to="/about">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link className={s.link} to="/movies">
                            Movies
                        </Link>
                    </li>
                </ul>
            </header>
            <main className={s.main}>
                <Outlet />
            </main>
        </div>
    );
}

export default App;
