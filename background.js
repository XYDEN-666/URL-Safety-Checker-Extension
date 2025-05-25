// background.js

// Listen for any web navigation events
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Check if the URL has changed and the page has completed loading
  if (changeInfo.status === 'complete' && tab.url) {
    checkUrl(tab.url).then(result => {
      // Update the extension icon based on the result
      updateIcon(result, tabId);
      // Send notification to the content script
      chrome.tabs.sendMessage(tabId, {
        action: "urlCheckResult",
        result: result,
        url: tab.url
      });
    }).catch(error => {
      console.error("Error checking URL:", error);
      updateIcon("error", tabId);
    });
  }
});

// Function to update the extension icon
function updateIcon(result, tabId) {
  let iconPath;
  let badgeText;
  let badgeColor;

  switch(result) {
    case "Seems safe":
      iconPath = "icons/safe.png";
      badgeText = "✓";
      badgeColor = "#4CAF50"; // Green
      break;
    case "Potentially malicious":
      iconPath = "icons/unsafe.png";
      badgeText = "!";
      badgeColor = "#F44336"; // Red
      break;
    default:
      iconPath = "icons/error.png";
      badgeText = "?";
      badgeColor = "#FFC107"; // Yellow
  }

  chrome.action.setIcon({ path: iconPath, tabId: tabId });
  chrome.action.setBadgeText({ text: badgeText, tabId: tabId });
  chrome.action.setBadgeBackgroundColor({ color: badgeColor, tabId: tabId });
}

async function checkUrl(url) {
  const apiKey = 'AIzaSyBwhobxOU5XrF1-AzgLh_baMj5G9d_O9iw';  // Replace with your actual API key
  const apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`;

  const requestBody = {
    client: {
      clientId: "yourCompanyName",
      clientVersion: "1.0.0"
    },
    threatInfo: {
      threatTypes: ["MALWARE", "SOCIAL_ENGINEERING"],
      platformTypes: ["ANY_PLATFORM"],
      threatEntryTypes: ["URL"],
      threatEntries: [{"url": url}]
    }
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.matches && data.matches.length > 0 ? "Potentially malicious" : "Seems safe";

  } catch (error) {
    console.error('Error checking URL:', error);
    throw error;
  }
}

// Optional: Implement caching to avoid checking the same URLs repeatedly
const urlCache = new Map();
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

function getCachedResult(url) {
  const cached = urlCache.get(url);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.result;
  }
  return null;
}

function cacheResult(url, result) {
  urlCache.set(url, {
    result: result,
    timestamp: Date.now()
  });
}

// Content script communication
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "checkUrl") {
    const cachedResult = getCachedResult(request.url);
    if (cachedResult) {
      sendResponse({result: cachedResult});
      return false;
    }

    checkUrl(request.url).then(result => {
      cacheResult(request.url, result);
      sendResponse({result: result});
    }).catch(error => {
      sendResponse({result: "Error checking URL: " + error.message, error: true});
    });
    return true;  // Will respond asynchronously
  }
});