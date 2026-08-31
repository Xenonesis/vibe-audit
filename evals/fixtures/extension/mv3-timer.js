// Synthetic fixture: Chrome Manifest V3 background script with setInterval bug
// Problem: Service worker terminates on idle after 30s, killing in-memory interval
let syncCount = 0;

setInterval(() => {
  syncCount++;
  console.log(`Periodic sync executed: ${syncCount}`);
  fetch('https://api.example.com/sync');
}, 60000);
