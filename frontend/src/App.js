import React, { useEffect, useState } from 'react';

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('/api/data')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="App">
            <h1>Welcome to suimple_fun!</h1>
            {data ? (
                <div>
                    <h2>Data from Sui Network:</h2>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
}

export default App;
