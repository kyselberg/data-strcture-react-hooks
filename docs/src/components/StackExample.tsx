import { useState } from 'react';
import { useStack } from '../../../src/useStack';

export default function StackExample() {
  const stack = useStack(['Bottom', 'Middle', 'Top']);
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Current Stack:</h3>
        <div className="bg-white p-3 rounded border">
          <div className="text-sm space-y-1">
            {stack.isEmpty ? (
              <span className="text-gray-500">(empty stack)</span>
            ) : (
              <div className="text-blue-600">
                <code>{String(stack.peek)}</code>
                <span className="text-green-600 text-xs ml-2">← Top</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => stack.push(`Item ${Date.now()}`)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Push Random
        </button>

        <button
          onClick={() => stack.pop()}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Pop
        </button>
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter an item"
          className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => {
            if (inputValue.trim()) {
              stack.push(inputValue);
              setInputValue('');
            }
          }}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
        >
          Push Item
        </button>
      </div>

      <div className="text-sm text-gray-600 space-y-2">
        <p><strong>Is Empty:</strong> {stack.isEmpty ? 'Yes' : 'No'}</p>
        <p><strong>Top (Peek):</strong> {stack.peek || 'None'}</p>
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg">
        <h4 className="font-semibold text-yellow-800 mb-2">Stack Operations:</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• <strong>Push:</strong> Adds an item to the top of the stack</li>
          <li>• <strong>Pop:</strong> Removes and returns the item from the top</li>
          <li>• <strong>Peek:</strong> Returns the top item without removing it</li>
          <li>• <strong>isEmpty:</strong> Checks if the stack is empty</li>
        </ul>
      </div>
    </div>
  );
}