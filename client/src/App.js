import { Fragment, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes, privateUserRoutes, privateAdminRoutes } from '~/routes';
import { RootLayout } from './layouts';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentAdmin, getCurrentUser } from './store/authSlice';
import { authSelector } from './store/selector';
import { DataContext } from './context/GlobalState';
import Loading from './components/Loading/Loading';

function App() {
    const state = useContext(DataContext);
    const socket = state.socket;

    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const { isLoggedIn, role, token, currentAdmin, currentUser, getCurrentUserStatus, getCurrentAdminStatus } =
        useSelector(authSelector);

    useLayoutEffect(() => {
        if (isLoggedIn) {
            setLoading(true);
            const timer = setTimeout(() => {
                if (token) {
                    if (role === 'user') {
                        dispatch(getCurrentUser());
                    } else if (role === 'admin') {
                        dispatch(getCurrentAdmin());
                    }
                }
                setLoading(false);
            }, 1500);

            return () => {
                clearTimeout(timer);
            };
        } else {
            setLoading(true);
            const timer = setTimeout(() => {
                setLoading(false);
            }, 1500);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [dispatch, isLoggedIn, role, token]);

    useEffect(() => {
        if (currentUser) {
            socket?.emit('user:join-app', currentUser?.id);
        }
    }, [currentUser, socket]);

    return loading || getCurrentUserStatus === 'pending' || getCurrentAdminStatus === 'pending' ? (
        <Loading />
    ) : (
        <Router>
            <div className="App">
                <Routes>
                    {!currentAdmin &&
                        publicRoutes.map((route, index) => {
                            const Page = route.component;
                            const to = route.to;

                            let Layout = RootLayout;

                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        to ? (
                                            <Navigate replace to={to} />
                                        ) : (
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        )
                                    }
                                />
                            );
                        })}
                    {currentUser &&
                        currentUser.isVerified &&
                        privateUserRoutes.map((route, index) => {
                            const Page = route.component;
                            const to = route.to;

                            let Layout = RootLayout;

                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        to ? (
                                            <Navigate replace to={to} />
                                        ) : (
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        )
                                    }
                                />
                            );
                        })}
                    {currentAdmin &&
                        privateAdminRoutes.map((route, index) => {
                            const Page = route.component;
                            const to = route.to;

                            let Layout = RootLayout;

                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        to ? (
                                            <Navigate replace to={to} />
                                        ) : (
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        )
                                    }
                                />
                            );
                        })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
