import React, { useState, useEffect } from 'react'
import './App.css'

function App() {

    const [paletteCount, setPaletteCount] = useState(5);
    const [palettes, setPalettes] = useState([]);
    const [currentPalette, setCurrentPalette] = useState(null);


    // generate random hex color
    const generateRandomColor = () => {
        const letters = "0123456789ABCDF";
        let color = "#";
        for(let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    // generate palette
    const generatePalette = () => {
        const newPalette = {
            id: Date.now(),
            colors: Array.from({length: paletteCount}, () => ({
                hex: generateRandomColor(),
                locked: false,
            })),
            createdAt: new Date().toLocaleTimeString(),
        };
        setCurrentPalette(newPalette);
        setPalettes(prev => [newPalette, ...prev.slice(0, 4)]);
    };

    // generate new palletd on component mount
    useEffect(() => {
        generatePalette();
    }, []);

    return (
        <div className='min-h-screen bg-gray-100 p-4'>
            <div className='max-w-6xl mx-auto'>
                <h1 className='text-4xl font-bold text-center text-gray-800 mb-8'>Color Palette Generator</h1>

                <label>Colors:</label>
                <select
                    value={paletteCount}
                    onChange={(e) => setPaletteCount(Number(e.target.value))}
                >
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={8}>8</option>
                </select>
                
                <button
                    className='px-2 px-6'
                >
                    New Palette
                </button>
                
                <button
                    className='px-2 px-6'
                >
                    Regenerate Unlocked
                </button>
            </div>

            {currentPalette && (
                <h2>Current Palette - Created at {currentPalette.createdAt}</h2>
            )}
        </div>
    )
}

export default App
