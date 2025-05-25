# URL Safety Checker Chrome Extension

A Chrome extension that automatically checks the safety of websites you visit in real-time using the Google Safe Browse API.

## Features

* **Real-time URL Scanning:** Automatically checks URLs as you navigate.
* **Visual Indicators:** Changes the extension icon and badge to show safety status (safe, potentially malicious, or unchecked).
* **On-page Notifications:** Displays a subtle notification on the webpage indicating the safety status.
* **Manual URL Check:** Provides a popup to manually check any URL.

## How it Works

This extension utilizes the Google Safe Browse API to determine if a URL is listed as containing malware or social engineering threats.

## Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/XYDEN-666/URL-Safety-Checker-Extension.git](https://github.com/XYDEN-666/URL-Safety-Checker-Extension.git)
    ```
2.  **Open Chrome Extensions:**
    * Open Google Chrome.
    * Type `chrome://extensions` in the address bar and press Enter.
3.  **Enable Developer Mode:**
    * Toggle on "Developer mode" in the top right corner.
4.  **Load Unpacked:**
    * Click on "Load unpacked".
    * Navigate to the cloned repository folder (`URL-Safety-Checker-Extension`) and select it.
5.  **API Key Configuration (Important!):**
    * **Obtain a Google Safe Browse API Key:** You'll need to get an API key from the Google Cloud Console. Follow Google's documentation for obtaining a Safe Browse API key.
    * **Replace Placeholder:** Open `background.js` in a text editor.
    * Find the line: `const apiKey = 'AIzaSyBwhobxOU5XrF1-AzgLh_baMj5G9d_O9iw';`
    * Replace `'AIzaSyBwhobxOU5XrF1-AzgLh_baMj5G9d_O9iw'` with your actual API key.
    * **Note:** For production applications, consider more secure ways to handle API keys (e.g., environment variables, server-side checks) rather than hardcoding them in client-side code. This example is for demonstration purposes.

## Usage

* Simply browse the web as usual. The extension icon will update in real-time.
* A small notification will appear in the top right of the page indicating its safety.
* Click the extension icon to open the popup and manually check a URL.

## Contributing

Feel free to fork the repository, make improvements, and submit pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
