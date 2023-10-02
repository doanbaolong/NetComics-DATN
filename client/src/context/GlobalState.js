import { createContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
export const DataContext = createContext();

function DataProvider({ children }) {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socket = io(process.env.REACT_APP_SERVER_URL);
        setSocket(socket);

        return () => socket.close();
    }, []);

    const state = { socket };
    return <DataContext.Provider value={state}>{children}</DataContext.Provider>;
}

export default DataProvider;
