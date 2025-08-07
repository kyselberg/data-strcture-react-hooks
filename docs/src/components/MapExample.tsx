import { useState } from 'react';
import { useMap } from '../../../src/useMap';


export default function MapExample() {
  const map = useMap([['name', 'John'], ['age', '30'], ['city', 'New York']]);
  const [keyInput, setKeyInput] = useState('');
  const [valueInput, setValueInput] = useState('');

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Current Map:</h3>
        <div className="bg-white p-3 rounded border">
          <div className="text-sm space-y-1">
            {Array.from(map.entries()).map(([key, value]) => (
              <div key={String(key)} className="flex justify-between">
                <code className="text-blue-600">{String(key)}</code>
                <span>→</span>
                <code className="text-green-600">{String(value)}</code>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => map.set('timestamp', Date.now().toString())}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Set Timestamp
        </button>

        <button
          onClick={() => map.set('random', Math.floor(Math.random() * 1000).toString())}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
        >
          Set Random
        </button>

        <button
          onClick={() => map.clear()}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => map.delete('age')}
          className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors"
        >
          Delete Age
        </button>

        <button
          onClick={() => map.delete('city')}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
        >
          Delete City
        </button>
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          value={keyInput}
          onChange={(e) => setKeyInput(e.target.value)}
          placeholder="Enter key"
          className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={valueInput}
          onChange={(e) => setValueInput(e.target.value)}
          placeholder="Enter value"
          className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => {
            if (keyInput.trim() && valueInput.trim()) {
              map.set(keyInput, valueInput);
              setKeyInput('');
              setValueInput('');
            }
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Add Entry
        </button>
      </div>

      <div className="text-sm text-gray-600 space-y-2">
        <p><strong>Size:</strong> {map.size}</p>
        <p><strong>Has 'name':</strong> {map.has('name') ? 'Yes' : 'No'}</p>
        <p><strong>Name value:</strong> {map.get('name') || 'Not found'}</p>
        <p><strong>Keys:</strong> {Array.from(map.keys()).join(', ')}</p>
        <p><strong>Values:</strong> {Array.from(map.values()).join(', ')}</p>
      </div>
    </div>
  );
}