// content.js

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "urlCheckResult") {
    // Create or update notification
    showNotification(message.result);
  }
});

function showNotification(result) {
  // Remove existing notification if present
  const existingNotification = document.getElementById('url-safety-notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement('div');
  notification.id = 'url-safety-notification';
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 10px 20px;
    border-radius: 5px;
    z-index: 999999;
    font-family: Arial, sans-serif;
    font-size: 14px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    transition: opacity 0.3s ease-in-out;
  `;

  // Style based on result
  if (result === "Seems safe") {
    notification.style.backgroundColor = '#4CAF50';
    notification.style.color = 'white';
    notification.textContent = '✓ This website appears to be safe';
  } else if (result === "Potentially malicious") {
    notification.style.backgroundColor = '#F44336';
    notification.style.color = 'white';
    notification.textContent = '⚠ Warning: This website may be unsafe';
  } else {
    notification.style.backgroundColor = '#FFC107';
    notification.style.color = 'black';
    notification.textContent = '? Unable to check website safety';
  }

  // Add to page
  document.body.appendChild(notification);

  // Remove notification after 5 seconds
  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}