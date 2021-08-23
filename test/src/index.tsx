import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { AdminApp } from '@iamyth/web-ui/admin/AdminApp';
import { NavigationService } from './navigationService';
import { Header } from './Header';

const App = React.memo(() => {
    const [isLightMode, setIsLightMode] = React.useState(false);
    return (
        <ChakraProvider>
            <BrowserRouter>
                <AdminApp
                    header={<Header value={isLightMode} onChange={setIsLightMode} />}
                    logoSrc=""
                    navigationColorMode={isLightMode ? 'light' : 'dark'}
                    navigationService={NavigationService}
                />
            </BrowserRouter>
        </ChakraProvider>
    );
});

ReactDOM.render(<App />, document.getElementById('app'));
