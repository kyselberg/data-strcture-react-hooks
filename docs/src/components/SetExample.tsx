import { useState } from 'react';
import { useSet } from '../../../src/useSet';

export default function SetExample() {
  const set = useSet(['apple', 'banana', 'orange']);
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Current Set:</h3>
        <div className="bg-white p-3 rounded border">
          <code className="text-sm">{Array.from(set).join(', ') || '(empty)'}</code>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => set.add('grape')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Add Grape
        </button>

        <button
          onClick={() => set.add('strawberry')}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
        >
          Add Strawberry
        </button>

        <button
          onClick={() => set.clear()}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => set.delete('apple')}
          className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors"
        >
          Delete Apple
        </button>

        <button
          onClick={() => set.delete('banana')}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
        >
          Delete Banana
        </button>
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a fruit name"
          className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => {
            if (inputValue.trim()) {
              set.add(inputValue);
              setInputValue('');
            }
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Add Fruit
        </button>
      </div>

      <div className="text-sm text-gray-600 space-y-2">
        <p><strong>Size:</strong> {set.size}</p>
        <p><strong>Has 'apple':</strong> {set.has('apple') ? 'Yes' : 'No'}</p>
        <p><strong>Has 'grape':</strong> {set.has('grape') ? 'Yes' : 'No'}</p>
        <p><strong>All values:</strong> {Array.from(set.values()).join(', ')}</p>
      </div>
    </div>
  );
}