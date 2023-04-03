import { Fragment } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from './layouts';

function App() {
    return (
        <Router>
            <div className="App">
                <HelmetProvider>
                    <Helmet>
                        <title>Đọc truyện online - NetComics</title>
                        <meta name="description" content="Comics Website" />
                    </Helmet>
                </HelmetProvider>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        const to = route.to;

                        let Layout = DefaultLayout;

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
