// Function to create a promise that resolves after a random time between 1 and 3 seconds
function createPromise(id) {
  // Generate a random delay between 1000ms (1 second) and 3000ms (3 seconds)
  const delay = Math.floor(Math.random() * 2000) + 1000;
  // Return a new promise that resolves after the delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, time: delay / 1000 }); // Convert milliseconds to seconds
    }, delay);
  });
}

// Create an array of three promises
const promises = [
  createPromise('Promise 1'),
  createPromise('Promise 2'),
  createPromise('Promise 3'),
];

// Add an event listener for when the document is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const output = document.getElementById('output');

  // Use Promise.all() to wait for all promises to resolve
  Promise.all(promises).then((results) => {
    // Remove the "Loading..." row
    output.innerHTML = '';

    // For each resolved promise, create a new table row
    results.forEach((result) => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${result.id}</td><td>${result.time.toFixed(3)}</td>`;
      output.appendChild(row);
    });

    // Add a row to show the total time taken (the longest promise time)
    const totalRow = document.createElement('tr');
    const maxTime = results.reduce((max, result) => (result.time > max ? result.time : max), 0);
    totalRow.innerHTML = `<td>Total</td><td>${maxTime.toFixed(3)}</td>`;
    output.appendChild(totalRow);
  });
});
