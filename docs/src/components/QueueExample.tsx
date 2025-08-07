import { useState } from 'react';
import { useQueue } from '../../../src/useQueue';

export default function QueueExample() {
  const queue = useQueue(['First', 'Second', 'Third']);
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Current Queue:</h3>
        <div className="bg-white p-3 rounded border">
          <div className="text-sm space-y-1">
            {queue.isEmpty ? (
              <span className="text-gray-500">(empty queue)</span>
            ) : (
              <div className="text-blue-600">
                <code>{String(queue.peek)}</code>
                <span className="text-green-600 text-xs ml-2">← Front</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => queue.enqueue(`Item ${Date.now()}`)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Enqueue Random
        </button>

        <button
          onClick={() => queue.dequeue()}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Dequeue
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
              queue.enqueue(inputValue);
              setInputValue('');
            }
          }}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
        >
          Enqueue Item
        </button>
      </div>

      <div className="text-sm text-gray-600 space-y-2">
        <p><strong>Is Empty:</strong> {queue.isEmpty ? 'Yes' : 'No'}</p>
        <p><strong>Front (Peek):</strong> {queue.peek || 'None'}</p>
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg">
        <h4 className="font-semibold text-yellow-800 mb-2">Queue Operations:</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• <strong>Enqueue:</strong> Adds an item to the back of the queue</li>
          <li>• <strong>Dequeue:</strong> Removes and returns the item from the front</li>
          <li>• <strong>Peek:</strong> Returns the front item without removing it</li>
          <li>• <strong>isEmpty:</strong> Checks if the queue is empty</li>
        </ul>
      </div>
    </div>
  );
}