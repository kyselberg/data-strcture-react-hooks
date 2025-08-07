import { useState } from 'react';
import { useArray } from '../../../src/useArray';

export default function ArrayExample() {
  const array = useArray([1, 2, 3, 4, 5]);
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Current Array:</h3>
        <div className="bg-white p-3 rounded border">
          <code className="text-sm">[{Array.from(array).join(', ')}]</code>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          onClick={() => array.push(Math.floor(Math.random() * 100))}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Push Random
        </button>

        <button
          onClick={() => array.pop()}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Pop
        </button>

        <button
          onClick={() => array.shift()}
          className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors"
        >
          Shift
        </button>

        <button
          onClick={() => array.unshift(Math.floor(Math.random() * 100))}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
        >
          Unshift Random
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <button
          onClick={() => array.reverse()}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
        >
          Reverse
        </button>

        <button
          onClick={() => array.sort((a, b) => a - b)}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
        >
          Sort
        </button>

        <button
          onClick={() => array.splice(1, 1)}
          className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition-colors"
        >
          Splice(1,1)
        </button>
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a number"
          className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => {
            const num = parseInt(inputValue);
            if (!isNaN(num)) {
              array.push(num);
              setInputValue('');
            }
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Add Number
        </button>
      </div>

      <div className="text-sm text-gray-600">
        <p><strong>Length:</strong> {array.length}</p>
        <p><strong>First element:</strong> {array[0]}</p>
        <p><strong>Last element:</strong> {array[array.length - 1]}</p>
      </div>
    </div>
  );
}