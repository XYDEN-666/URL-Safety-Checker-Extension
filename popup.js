document.getElementById('checkBtn').addEventListener('click', () => {
  const urlInput = document.getElementById('urlInput');
  const resultDiv = document.getElementById('result');
  
  const url = urlInput.value.trim();
  
  if (!url) {
    resultDiv.innerHTML = 'Please enter a valid URL';
    resultDiv.style.color = 'red';
    return;
  }
  
  // Send message to background script
  chrome.runtime.sendMessage(
    { action: "checkUrl", url: url },
    (response) => {
      if (response.safe) {
        resultDiv.innerHTML = '✅ URL appears to be safe';
        resultDiv.style.color = 'green';
      } else {
        resultDiv.innerHTML = `⚠️ Potential Risk Detected: ${response.reason}`;
        resultDiv.style.color = 'red';
      }
    }
  );
});