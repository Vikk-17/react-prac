import { useState } from 'react'

function App() {
    const [count, setCount] = useState(0);
    const [history, setHistory] = useState([0]);

    const updateCountAndHistory = (newCount) => {
        // let's update the count
        setCount(newCount);
        // add new count to history and keep only 5 elements
        setHistory(prevHistory => {
            const newHistory = [...prevHistory, newCount];
            return newHistory.slice(-5);
        });
    };

    const increment = () => {
        updateCountAndHistory(count + 1);
    }

    const decrement = () => {
        if(count > 0)
            updateCountAndHistory(count - 1);
    }
    
    const reset = () => {
        setCount(0);
        setHistory([0]); // reset the history too
    }

    return <div>
        <h1>Counter App</h1>
        <div>{count}</div>
        <button onClick={increment}>Increment</button>
        <button onClick={reset}>Reset</button>
        <button onClick={decrement}>Decrement</button>
        <div>
            {history.map((value, index) => (
                <span key={index}>
                    {value}
                </span>
            ))}
        </div>
    </div>
}

export default App
