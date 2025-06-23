// ========================================
// VISITOR TRACKING BACKEND SERVER
// ========================================

const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = './tracking-data';

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'));

// Ensure data directory exists
async function ensureDataDir() {
    try {
        await fs.access(DATA_DIR);
    } catch (error) {
        await fs.mkdir(DATA_DIR, { recursive: true });
    }
}

// Save tracking data to file
async function saveTrackingData(data, type) {
    const date = new Date().toISOString().split('T')[0];
    const filename = `${DATA_DIR}/${type}-${date}.json`;
    
    try {
        let existingData = [];
        try {
            const fileContent = await fs.readFile(filename, 'utf8');
            existingData = JSON.parse(fileContent);
        } catch (error) {
            // File doesn't exist yet, start with empty array
        }
        
        existingData.push({
            ...data,
            serverTimestamp: new Date().toISOString()
        });
        
        await fs.writeFile(filename, JSON.stringify(existingData, null, 2));
        console.log(`Saved ${type} data:`, data.sessionId || data.id);
    } catch (error) {
        console.error('Error saving tracking data:', error);
    }
}

// API Routes

// Track visitor data
app.post('/api/track', async (req, res) => {
    try {
        const { type, data } = req.body;
        
        if (!type || !data) {
            return res.status(400).json({ error: 'Missing type or data' });
        }
        
        await saveTrackingData(data, type);
        
        res.json({ 
            success: true, 
            message: 'Data tracked successfully',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Tracking error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get visitor statistics
app.get('/api/stats', async (req, res) => {
    try {
        const files = await fs.readdir(DATA_DIR);
        const stats = {
            totalFiles: files.length,
            files: [],
            summary: {
                totalPageviews: 0,
                totalEvents: 0,
                uniqueSessions: new Set(),
                dateRange: { start: null, end: null }
            }
        };
        
        for (const file of files) {
            const filePath = path.join(DATA_DIR, file);
            const content = await fs.readFile(filePath, 'utf8');
            const data = JSON.parse(content);
            
            stats.files.push({
                filename: file,
                entries: data.length,
                lastModified: (await fs.stat(filePath)).mtime
            });
            
            // Update summary
            data.forEach(entry => {
                if (entry.sessionId) {
                    stats.summary.uniqueSessions.add(entry.sessionId);
                }
                
                if (file.startsWith('pageview-')) {
                    stats.summary.totalPageviews++;
                } else if (file.startsWith('event-')) {
                    stats.summary.totalEvents++;
                }
                
                const entryDate = new Date(entry.timestamp || entry.serverTimestamp);
                if (!stats.summary.dateRange.start || entryDate < new Date(stats.summary.dateRange.start)) {
                    stats.summary.dateRange.start = entryDate.toISOString();
                }
                if (!stats.summary.dateRange.end || entryDate > new Date(stats.summary.dateRange.end)) {
                    stats.summary.dateRange.end = entryDate.toISOString();
                }
            });
        }
        
        stats.summary.uniqueSessions = stats.summary.uniqueSessions.size;
        
        res.json(stats);
    } catch (error) {
        console.error('Stats error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get specific data file
app.get('/api/data/:filename', async (req, res) => {
    try {
        const { filename } = req.params;
        const filePath = path.join(DATA_DIR, filename);
        
        // Security check
        if (!filename.match(/^[a-zA-Z0-9-_\.]+$/) || filename.includes('..')) {
            return res.status(400).json({ error: 'Invalid filename' });
        }
        
        const content = await fs.readFile(filePath, 'utf8');
        const data = JSON.parse(content);
        
        res.json({
            filename,
            entries: data.length,
            data
        });
    } catch (error) {
        if (error.code === 'ENOENT') {
            res.status(404).json({ error: 'File not found' });
        } else {
            console.error('Data retrieval error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

// Simple dashboard
app.get('/dashboard', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Visitor Tracking Dashboard</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
                .container { max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
                .stat-card { background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; border-left: 4px solid #f05a28; }
                .stat-number { font-size: 2em; font-weight: bold; color: #f05a28; }
                .stat-label { color: #666; margin-top: 5px; }
                .files { margin-top: 20px; }
                .file-item { background: #f8f9fa; padding: 15px; margin: 10px 0; border-radius: 5px; }
                button { background: #f05a28; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin: 5px; }
                button:hover { background: #e04a20; }
                pre { background: #f8f9fa; padding: 15px; border-radius: 5px; overflow-x: auto; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>📊 Visitor Tracking Dashboard</h1>
                <div id="stats" class="stats">
                    <div class="stat-card">
                        <div class="stat-number" id="total-sessions">-</div>
                        <div class="stat-label">Unique Sessions</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number" id="total-pageviews">-</div>
                        <div class="stat-label">Page Views</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number" id="total-events">-</div>
                        <div class="stat-label">Events</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number" id="total-files">-</div>
                        <div class="stat-label">Data Files</div>
                    </div>
                </div>
                
                <div>
                    <button onclick="loadStats()">Refresh Stats</button>
                    <button onclick="loadFiles()">Load File List</button>
                    <button onclick="exportAllData()">Export All Data</button>
                </div>
                
                <div id="files" class="files"></div>
                <div id="data-display"></div>
            </div>

            <script>
                async function loadStats() {
                    try {
                        const response = await fetch('/api/stats');
                        const stats = await response.json();
                        
                        document.getElementById('total-sessions').textContent = stats.summary.uniqueSessions;
                        document.getElementById('total-pageviews').textContent = stats.summary.totalPageviews;
                        document.getElementById('total-events').textContent = stats.summary.totalEvents;
                        document.getElementById('total-files').textContent = stats.totalFiles;
                        
                        console.log('Stats loaded:', stats);
                    } catch (error) {
                        console.error('Error loading stats:', error);
                    }
                }
                
                async function loadFiles() {
                    try {
                        const response = await fetch('/api/stats');
                        const stats = await response.json();
                        
                        const filesDiv = document.getElementById('files');
                        filesDiv.innerHTML = '<h3>Data Files:</h3>';
                        
                        stats.files.forEach(file => {
                            const fileDiv = document.createElement('div');
                            fileDiv.className = 'file-item';
                            fileDiv.innerHTML = \`
                                <strong>\${file.filename}</strong> - \${file.entries} entries
                                <button onclick="loadFileData('\${file.filename}')">View Data</button>
                                <small style="color: #666; display: block; margin-top: 5px;">
                                    Last modified: \${new Date(file.lastModified).toLocaleString()}
                                </small>
                            \`;
                            filesDiv.appendChild(fileDiv);
                        });
                    } catch (error) {
                        console.error('Error loading files:', error);
                    }
                }
                
                async function loadFileData(filename) {
                    try {
                        const response = await fetch(\`/api/data/\${filename}\`);
                        const data = await response.json();
                        
                        document.getElementById('data-display').innerHTML = \`
                            <h3>Data from \${filename}:</h3>
                            <pre>\${JSON.stringify(data.data, null, 2)}</pre>
                        \`;
                    } catch (error) {
                        console.error('Error loading file data:', error);
                    }
                }
                
                async function exportAllData() {
                    try {
                        const response = await fetch('/api/stats');
                        const stats = await response.json();
                        
                        const allData = {};
                        for (const file of stats.files) {
                            const fileResponse = await fetch(\`/api/data/\${file.filename}\`);
                            const fileData = await fileResponse.json();
                            allData[file.filename] = fileData.data;
                        }
                        
                        const blob = new Blob([JSON.stringify(allData, null, 2)], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = \`visitor-tracking-export-\${Date.now()}.json\`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                    } catch (error) {
                        console.error('Error exporting data:', error);
                    }
                }
                
                // Load stats on page load
                loadStats();
            </script>
        </body>
        </html>
    `);
});

// Initialize server
async function startServer() {
    await ensureDataDir();
    
    app.listen(PORT, () => {
        console.log(`🚀 Visitor Tracking Server running on port ${PORT}`);
        console.log(`📊 Dashboard: http://localhost:${PORT}/dashboard`);
        console.log(`📡 API endpoint: http://localhost:${PORT}/api/track`);
    });
}

startServer().catch(console.error);

module.exports = app; 