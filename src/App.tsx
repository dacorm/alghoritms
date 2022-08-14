import React from 'react';
import Nav from "./components/Nav";
import Main from "./components/Main";

function App() {
    return (
        <main className='grid grid-rows-6 bg-gray-100 w-screen h-screen'>
            <Nav/>
            <Main/>
        </main>
    );
}

export default App;
