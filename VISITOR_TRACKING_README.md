# 📊 Visitor Tracking System

A comprehensive, privacy-focused visitor tracking system for your website that works with static hosting and provides detailed analytics about your visitors.

## 🚀 Features

### Tracking Capabilities
- **Page Views**: Track every page visit with time spent
- **User Interactions**: Click tracking, scroll behavior, form interactions
- **Device Information**: Screen resolution, browser, device type, connection speed
- **Session Management**: Unique session IDs, returning visitor detection
- **Geographic Data**: Optional location tracking (with user permission)
- **Performance Metrics**: Page load times, interaction patterns

### Privacy Features
- **Consent Management**: Built-in privacy controls
- **Local Storage**: Data stored locally as backup
- **No Cookies**: Uses localStorage instead of cookies
- **GDPR Compliant**: Easy to disable/enable tracking

### Dashboard Features
- **Real-time Stats**: Live visitor statistics
- **Data Export**: Download all tracking data as JSON
- **Visual Dashboard**: Built-in tracking dashboard
- **Multiple Storage Options**: Local, server, or serverless backends

## 📋 Quick Start

### 1. Frontend Integration (Already Done!)
The tracking system is already integrated into your `script.js` file. It will automatically start tracking when someone visits your website **silently** - regular visitors see nothing.

### 2. Admin Access (For You Only!)
The tracking dashboard is **completely hidden** from regular users and only accessible to you as the admin.

#### How to Access Admin Dashboard

**Method 1: Secret Key Combination**
- Press `Ctrl + Shift + Alt + A` simultaneously
- A login modal will appear

**Method 2: URL Parameter**
- Add `?dashboard=admin` to your website URL
- Example: `https://youssefrajeh.github.io/_youssefrajeh/?dashboard=admin`

**Method 3: Console Command**
```javascript
window.adminLogin()
```

#### Admin Login Credentials
```
Username: youssef
Password: admin2024
```
*(You can change these in the script.js file)*

#### Admin Dashboard Features
After logging in, you'll see:
- 📊 **Dashboard Button** (top-right corner)
- **Live visitor statistics**
- **Data export capabilities**
- **Session management**
- **Logout functionality**

#### Admin Console Commands (After Login)
```javascript
// Get current session statistics
window.getVisitorStats()

// Export all tracking data
window.exportVisitorData()

// Clear all tracking data
window.clearVisitorData()

// Logout from admin
window.adminLogout()
```

## 🛠️ Backend Setup Options

Choose one of these options to store and analyze your tracking data:

### Option 1: Node.js Backend Server

1. **Install dependencies:**
```bash
npm install
```

2. **Start the server:**
```bash
npm start
# or for development
npm run dev
```

3. **Enable server tracking in script.js:**
Uncomment the "Option 1" section in the `sendToServer` method.

4. **Access the dashboard:**
Visit `http://localhost:3000/dashboard` to see your analytics.

### Option 2: Netlify Serverless Function

1. **Deploy to Netlify:**
   - Connect your repository to Netlify
   - The `netlify/functions/track.js` file will automatically be deployed

2. **Enable Netlify tracking in script.js:**
Uncomment the "Option 2" section in the `sendToServer` method.

3. **Add environment variables (optional):**
For database integration, add these to your Netlify dashboard:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

### Option 3: Google Analytics Integration

1. **Add Google Analytics to your HTML:**
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

2. **Enable GA tracking in script.js:**
Uncomment the "Option 3" section in the `sendToServer` method.

## 📈 What Data is Tracked?

### Visitor Information
- Session ID (unique per visit)
- Timestamp of visit
- Page URL and title
- Referrer source
- User agent and browser info
- Language and timezone
- Screen resolution and viewport size
- Device capabilities (memory, CPU cores)
- Connection type and speed
- Geographic location (with permission)

### User Behavior
- **Page Views**: Which pages visited and time spent
- **Click Events**: What elements users click on
- **Scroll Behavior**: How far users scroll (25%, 50%, 75%, 100% milestones)
- **Form Interactions**: Form submissions and field focus events
- **Window Events**: Resize, visibility changes, hash changes

### Session Analytics
- Total time on site
- Pages per session
- Bounce rate indicators
- Return visitor detection
- Engagement metrics

## 🔒 Security & Privacy

### Admin Security Features
- **Username/Password Authentication**: Secure login system
- **Session Expiration**: Admin sessions expire after 24 hours
- **Invisible to Users**: No visible tracking interface for regular visitors
- **Secure Access Methods**: Multiple hidden ways to access admin panel
- **URL Cleaning**: Admin parameters automatically removed from URL
- **Session Management**: Proper login/logout functionality

### Changing Admin Credentials
Edit these lines in `script.js`:
```javascript
const validCredentials = {
    username: 'youssef',    // Change this to your preferred username
    password: 'admin2024'   // Change this to your preferred password
};
```

### Privacy Controls
```javascript
// Disable tracking completely (admin only)
window.disableTracking()

// Enable tracking (admin only)
window.enableTracking()

// Check if tracking is enabled
localStorage.getItem('tracking_consent') !== 'false'
```

### Data Storage
- **Local Storage**: All data backed up locally
- **No Cookies**: Uses localStorage instead
- **User Control**: Easy opt-out mechanism
- **Data Export**: Users can download their data
- **Data Deletion**: Complete data removal option

### GDPR Compliance
To make your tracking GDPR compliant:

1. **Add a consent banner:**
```html
<div id="cookie-consent" style="position: fixed; bottom: 0; width: 100%; background: #333; color: white; padding: 15px; z-index: 10000;">
  <p>We use tracking to improve your experience. <button onclick="acceptTracking()">Accept</button> <button onclick="declineTracking()">Decline</button></p>
</div>

<script>
function acceptTracking() {
  window.enableTracking();
  document.getElementById('cookie-consent').style.display = 'none';
}

function declineTracking() {
  window.disableTracking();
  document.getElementById('cookie-consent').style.display = 'none';
}
</script>
```

## 📊 Data Analysis

### Viewing Statistics
```javascript
// Get comprehensive stats
const stats = window.getVisitorStats();
console.log('Page Views:', stats.totalPageViews);
console.log('Time Spent:', stats.totalTimeSpent, 'seconds');
console.log('Returning Visitor:', stats.isReturningVisitor);
```

### Exporting Data
```javascript
// Export all data as JSON file
window.exportVisitorData();

// Get raw data object
const allData = window.visitorTracker.getAllData();
```

### Custom Event Tracking
```javascript
// Track custom events
window.trackEvent('button_click', {
  buttonName: 'Contact Me',
  location: 'header'
});

window.trackEvent('video_play', {
  videoTitle: 'Portfolio Demo',
  timestamp: Date.now()
});
```

## 🔧 Customization

### Adding Custom Tracking
```javascript
// Track specific user actions
document.getElementById('my-button').addEventListener('click', () => {
  window.trackEvent('special_button_click', {
    buttonId: 'my-button',
    userAction: 'interested_in_services'
  });
});
```

### Modifying Data Collection
Edit the `VisitorTracker` class in `script.js`:
- Add new data points in `getVisitorInfo()`
- Create custom event handlers
- Modify data storage methods
- Add new tracking capabilities

## 🚀 Deployment

### Static Hosting (GitHub Pages, Netlify, Vercel)
Your tracking system works out-of-the-box with static hosting. Data is stored locally and can be viewed in the dashboard.

### With Backend
Deploy the Node.js server to platforms like:
- Heroku
- DigitalOcean
- AWS
- Google Cloud

### Environment Variables
For production deployment:
```bash
PORT=3000
NODE_ENV=production
DATABASE_URL=your_database_url
```

## 🔍 Troubleshooting

### Common Issues

1. **Tracking not working:**
   - Check browser console for errors
   - Ensure JavaScript is enabled
   - Verify localStorage is available

2. **Dashboard not showing:**
   - Wait 3 seconds after page load
   - Check for the 📊 button in top-right corner
   - Verify tracking is enabled

3. **Data not persisting:**
   - Check localStorage quota
   - Ensure localStorage is not disabled
   - Try clearing browser cache

### Debug Mode
```javascript
// Enable detailed logging
localStorage.setItem('visitor_tracking_debug', 'true');
```

## 📱 Browser Support

- ✅ Chrome/Edge (Modern versions)
- ✅ Firefox (Modern versions)
- ✅ Safari (Modern versions)
- ✅ Mobile browsers
- ⚠️ IE11 (Limited support)

## 🤝 Contributing

Feel free to extend this tracking system:
1. Add new tracking metrics
2. Improve the dashboard UI
3. Add more backend integrations
4. Enhance privacy controls

## 📄 License

This visitor tracking system is part of your website project. Use and modify as needed for your requirements.

---

**🎯 Ready to track your visitors?** Your system is already running! Check your browser console and click the 📊 dashboard button to see it in action. 