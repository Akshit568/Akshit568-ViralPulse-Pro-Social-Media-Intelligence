// ViralPulse Pro - JavaScript Implementation
class ViralPulsePro {
    constructor() {
        this.currentTab = 'war-room';
        this.mockData = new MockDataGenerator();
        this.init();
    }

    init() {
        this.setupNavigation();
        this.loadWarRoom();
        this.setupEventListeners();
        this.startLiveUpdates();
    }

    setupNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.target.dataset.tab;
                this.switchTab(tab);
            });
        });
    }

    switchTab(tabName) {
        // Hide all tabs
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Remove active class from all nav buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Show selected tab
        document.getElementById(tabName).classList.add('active');
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        
        this.currentTab = tabName;
        this.loadTabContent(tabName);
    }

    loadTabContent(tabName) {
        switch(tabName) {
            case 'war-room':
                this.loadWarRoom();
                break;
            case 'conflict':
                this.loadConflictDetector();
                break;
            case 'rag':
                this.loadRAGEngine();
                break;
            case 'alerts':
                this.loadAlertCenter();
                break;
            case 'technical':
                this.loadTechnical();
                break;
        }
    }

    loadWarRoom() {
        this.loadTrendingList();
        this.loadHeatmap();
        this.loadRadarChart();
    }

    loadTrendingList() {
        const container = document.getElementById('trending-list');
        const trends = this.mockData.generateTrendingTopics();
        
        container.innerHTML = trends.slice(0, 10).map(trend => {
            const controversyClass = trend.controversy > 70 ? 'controversy-high' : 
                                   trend.controversy > 40 ? 'controversy-medium' : 'controversy-low';
            
            return `
                <div class="trend-item">
                    <div class="trend-title">#${trend.topic}</div>
                    <div class="trend-stats">
                        <span>👁️ ${trend.views.toLocaleString()}</span>
                        <span class="${controversyClass}">🔥 ${trend.controversy}%</span>
                    </div>
                </div>
            `;
        }).join('');
    }

    loadHeatmap() {
        const container = document.getElementById('heatmap');
        
        // Create a simple world map visualization
        const mapData = [
            {country: 'USA', lat: 39.8283, lng: -98.5795, intensity: 85},
            {country: 'UK', lat: 55.3781, lng: -3.4360, intensity: 72},
            {country: 'Germany', lat: 51.1657, lng: 10.4515, intensity: 68},
            {country: 'Japan', lat: 36.2048, lng: 138.2529, intensity: 91},
            {country: 'Brazil', lat: -14.2350, lng: -51.9253, intensity: 76}
        ];

        // Create Plotly heatmap
        const data = [{
            type: 'scattergeo',
            mode: 'markers',
            lat: mapData.map(d => d.lat),
            lon: mapData.map(d => d.lng),
            marker: {
                size: mapData.map(d => d.intensity / 3),
                color: mapData.map(d => d.intensity),
                colorscale: 'Viridis',
                showscale: true,
                colorbar: {
                    title: 'Trend Intensity'
                }
            },
            text: mapData.map(d => `${d.country}: ${d.intensity}% active`),
            hovertemplate: '%{text}<extra></extra>'
        }];

        const layout = {
            geo: {
                projection: { type: 'natural earth' },
                bgcolor: 'rgba(0,0,0,0)',
                showland: true,
                landcolor: 'rgba(30, 41, 59, 0.3)',
                showocean: true,
                oceancolor: 'rgba(15, 23, 42, 0.5)',
                showlakes: false,
                showrivers: false
            },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            font: { color: '#e0e7ff' },
            margin: { t: 0, r: 0, b: 0, l: 0 }
        };

        Plotly.newPlot('heatmap', data, layout, {responsive: true});
    }

    loadRadarChart() {
        const container = document.getElementById('radar-chart');
        
        const data = [{
            type: 'scatterpolar',
            r: [85, 72, 91, 68, 76, 83],
            theta: ['Virality', 'Sentiment', 'Controversy', 'Reach', 'Engagement', 'Influence'],
            fill: 'toself',
            name: 'Current Trends',
            line: { color: '#6366f1' },
            fillcolor: 'rgba(99, 102, 241, 0.2)'
        }];

        const layout = {
            polar: {
                radialaxis: {
                    visible: true,
                    range: [0, 100],
                    color: '#94a3b8'
                },
                angularaxis: {
                    color: '#e0e7ff'
                }
            },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            font: { color: '#e0e7ff' },
            margin: { t: 40, r: 40, b: 40, l: 40 }
        };

        Plotly.newPlot('radar-chart', data, layout, {responsive: true});
    }

    loadConflictDetector() {
        const analyzeBtn = document.getElementById('analyze-btn');
        const quotesContainer = document.getElementById('quotes-container');
        
        analyzeBtn.addEventListener('click', () => {
            this.analyzeConflict();
        });

        // Load sample quotes
        this.loadSampleQuotes();
    }

    analyzeConflict() {
        const quotesContainer = document.getElementById('quotes-container');
        quotesContainer.innerHTML = '<div class="loading">🔍 Analyzing conflict patterns...</div>';
        
        setTimeout(() => {
            this.loadSampleQuotes();
        }, 2000);
    }

    loadSampleQuotes() {
        const quotesContainer = document.getElementById('quotes-container');
        
        const proQuotes = [
            { text: "AI ethics frameworks are essential for responsible innovation", author: "TechEthicist", credibility: 92 },
            { text: "We need proactive measures, not reactive regulations", author: "AIResearcher", credibility: 88 }
        ];
        
        const conQuotes = [
            { text: "Over-regulation will stifle AI innovation and progress", author: "TechFounder", credibility: 85 },
            { text: "Market forces will naturally guide ethical development", author: "VCPartner", credibility: 78 }
        ];

        quotesContainer.innerHTML = `
            <div>
                <h4 style="color: #10b981; margin-bottom: 1rem;">🟢 Pro Viewpoint</h4>
                ${proQuotes.map(quote => `
                    <div class="quote-item" style="border-left-color: #10b981;">
                        <div class="quote-text">"${quote.text}"</div>
                        <div class="quote-author">
                            @${quote.author}
                            <span style="float: right; color: #10b981;">🎯 ${quote.credibility}% credible</span>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div>
                <h4 style="color: #ef4444; margin-bottom: 1rem;">🔴 Con Viewpoint</h4>
                ${conQuotes.map(quote => `
                    <div class="quote-item" style="border-left-color: #ef4444;">
                        <div class="quote-text">"${quote.text}"</div>
                        <div class="quote-author">
                            @${quote.author}
                            <span style="float: right; color: #ef4444;">🎯 ${quote.credibility}% credible</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    loadRAGEngine() {
        const analyzeBtn = document.getElementById('rag-analyze');
        const chunksContainer = document.getElementById('rag-chunks');
        const analysisContainer = document.getElementById('rag-analysis');
        
        analyzeBtn.addEventListener('click', () => {
            this.performRAGAnalysis();
        });

        // Load sample chunks
        this.loadSampleChunks();
    }

    performRAGAnalysis() {
        const chunksContainer = document.getElementById('rag-chunks');
        const analysisContainer = document.getElementById('rag-analysis');
        
        chunksContainer.innerHTML = '<div class="loading">🔍 Retrieving relevant chunks...</div>';
        analysisContainer.innerHTML = '<div class="loading">🧠 Generating analysis...</div>';
        
        setTimeout(() => {
            this.loadSampleChunks();
            this.loadSampleAnalysis();
        }, 2000);
    }

    loadSampleChunks() {
        const container = document.getElementById('rag-chunks');
        
        const chunks = [
            { text: "AI ethics discussions have intensified following recent breakthroughs in large language models...", relevance: 0.94 },
            { text: "Tech industry leaders debate the balance between innovation and responsible development...", relevance: 0.89 },
            { text: "Academic researchers propose new frameworks for AI governance and oversight...", relevance: 0.87 },
            { text: "Public opinion surveys show growing concern about AI's societal impact...", relevance: 0.82 },
            { text: "International bodies call for coordinated approach to AI regulation...", relevance: 0.78 }
        ];

        container.innerHTML = chunks.map((chunk, i) => `
            <div class="chunk-item">
                <div class="chunk-relevance">Chunk ${i + 1} - Relevance: ${chunk.relevance.toFixed(3)}</div>
                <div class="chunk-text">${chunk.text}</div>
            </div>
        `).join('');
    }

    loadSampleAnalysis() {
        const container = document.getElementById('rag-analysis');
        
        container.innerHTML = `
            <div style="margin-bottom: 2rem;">
                <h4>Cultural Origin Summary</h4>
                <p style="color: #94a3b8;">The #AIethics movement originated from academic circles and gained mainstream traction following high-profile AI incidents. It represents a convergence of technological advancement concerns and social responsibility advocacy.</p>
            </div>
            
            <div style="margin-bottom: 2rem;">
                <h4>Sentiment Distribution</h4>
                <div id="sentiment-pie" style="height: 300px;"></div>
            </div>
            
            <div class="alert-card">
                ⚠️ <strong>Toxicity Alert:</strong> Moderate levels of toxic content detected in discussions (23% of analyzed posts).
            </div>
        `;

        // Create sentiment pie chart
        const sentimentData = [{
            values: [45, 35, 20],
            labels: ['Positive', 'Neutral', 'Negative'],
            type: 'pie',
            marker: {
                colors: ['#10b981', '#6b7280', '#ef4444']
            }
        }];

        const sentimentLayout = {
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            font: { color: '#e0e7ff' },
            margin: { t: 40, r: 40, b: 40, l: 40 }
        };

        Plotly.newPlot('sentiment-pie', sentimentData, sentimentLayout, {responsive: true});
    }

    loadAlertCenter() {
        const createBtn = document.querySelector('.create-alert-btn');
        const notificationsContainer = document.getElementById('notifications');
        
        createBtn.addEventListener('click', () => {
            this.createAlert();
        });

        this.loadSampleNotifications();
    }

    createAlert() {
        const notificationsContainer = document.getElementById('notifications');
        const newNotification = `
            <div class="notification-item" style="border-color: #10b981; background: rgba(16, 185, 129, 0.1);">
                <div class="notification-title">✅ ALERT CREATED</div>
                <div class="notification-message">New controversy alert configured successfully</div>
                <div class="notification-time">Just now</div>
            </div>
        `;
        notificationsContainer.insertAdjacentHTML('afterbegin', newNotification);
    }

    loadSampleNotifications() {
        const container = document.getElementById('notifications');
        
        const notifications = [
            {
                title: '🚨 HIGH CONTROVERSY ALERT',
                message: '#AIethics controversy score reached 87% (trigger: 80%)',
                time: '2 minutes ago',
                type: 'danger'
            },
            {
                title: '📈 VIRAL THRESHOLD',
                message: '#TechDebate reached 1M interactions in 1 hour',
                time: '15 minutes ago',
                type: 'success'
            },
            {
                title: '😊 SENTIMENT SHIFT',
                message: '#ClimateAction sentiment improved by 25%',
                time: '1 hour ago',
                type: 'info'
            }
        ];

        container.innerHTML = notifications.map(notif => `
            <div class="notification-item">
                <div class="notification-title">${notif.title}</div>
                <div class="notification-message">${notif.message}</div>
                <div class="notification-time">${notif.time}</div>
            </div>
        `).join('');
    }

    loadTechnical() {
        this.loadArchitectureDiagram();
        this.loadPerformanceMetrics();
    }

    loadArchitectureDiagram() {
        const container = document.getElementById('architecture-diagram');
        
        // Create a simple architecture flow diagram
        const nodes = [
            {name: 'Social Media APIs', x: 1, y: 4, color: '#6366f1'},
            {name: 'Data Ingestion', x: 2, y: 4, color: '#8b5cf6'},
            {name: 'Sentence Transformer', x: 3, y: 4, color: '#06b6d4'},
            {name: 'Chroma DB', x: 4, y: 4, color: '#10b981'},
            {name: 'RAG Pipeline', x: 3, y: 3, color: '#f59e0b'},
            {name: 'Conflict Detector', x: 2, y: 2, color: '#ef4444'},
            {name: 'Web Interface', x: 3, y: 1, color: '#8b5cf6'}
        ];

        const data = nodes.map(node => ({
            x: [node.x],
            y: [node.y],
            mode: 'markers+text',
            marker: {
                size: 40,
                color: node.color
            },
            text: node.name,
            textposition: 'middle center',
            showlegend: false,
            type: 'scatter'
        }));

        // Add connection lines
        const connections = [
            {x: [1, 2], y: [4, 4]},
            {x: [2, 3], y: [4, 4]},
            {x: [3, 4], y: [4, 4]},
            {x: [3, 3], y: [4, 3]},
            {x: [3, 2], y: [3, 2]},
            {x: [3, 3], y: [1, 3]},
            {x: [2, 3], y: [2, 1]}
        ];

        connections.forEach(conn => {
            data.push({
                x: conn.x,
                y: conn.y,
                mode: 'lines',
                line: {
                    color: 'rgba(148, 163, 184, 0.5)',
                    width: 2
                },
                showlegend: false,
                type: 'scatter'
            });
        });

        const layout = {
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            xaxis: {visible: false},
            yaxis: {visible: false},
            font: {color: '#e0e7ff'},
            margin: {t: 20, r: 20, b: 20, l: 20},
            title: 'System Architecture Flow'
        };

        Plotly.newPlot('architecture-diagram', data, layout, {responsive: true});
    }

    loadPerformanceMetrics() {
        // Performance metrics are already displayed in the HTML
        // This could be extended to show real-time performance charts
    }

    setupEventListeners() {
        // Add any additional event listeners here
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('demo-video-link')) {
                e.preventDefault();
                alert('Demo video would play here! 🎬');
            }
        });
    }

    startLiveUpdates() {
        // Simulate live updates every 30 seconds
        setInterval(() => {
            if (this.currentTab === 'war-room') {
                this.loadTrendingList();
            }
        }, 30000);
    }
}

// Mock Data Generator
class MockDataGenerator {
    constructor() {
        this.topics = [
            'AIethics', 'ClimateAction', 'TechDebate', 'GamersUnite', 'CryptoNews',
            'SpaceX', 'MetaVerse', 'WebDev', 'StartupLife', 'RemoteWork',
            'QuantumComputing', 'Blockchain', 'MachineLearning', 'Cybersecurity', 'IoT'
        ];
        
        this.platforms = ['Twitter', 'Reddit', 'TikTok', 'Instagram'];
    }

    generateTrendingTopics() {
        return this.topics.map(topic => ({
            topic,
            platform: this.platforms[Math.floor(Math.random() * this.platforms.length)],
            views: Math.floor(Math.random() * 1000000) + 100000,
            controversy: Math.floor(Math.random() * 100),
            sentiment: Math.random() * 2 - 1, // -1 to 1
            engagement: Math.floor(Math.random() * 50000) + 5000
        })).sort((a, b) => b.views - a.views);
    }

    generateConflictData(topic) {
        const proPercentage = Math.floor(Math.random() * 40) + 40; // 40-80%
        const conPercentage = 100 - proPercentage;
        
        return {
            topic,
            pro_percentage: proPercentage,
            con_percentage: conPercentage,
            controversy_score: Math.floor(Math.random() * 50) + 50,
            pro_quotes: this.generateQuotes('pro'),
            con_quotes: this.generateQuotes('con'),
            historical_parallels: this.generateHistoricalParallels()
        };
    }

    generateQuotes(side) {
        const proQuotes = [
            "This is essential for our future progress",
            "We need to act responsibly and ethically",
            "Innovation must be balanced with safety"
        ];
        
        const conQuotes = [
            "This will stifle innovation and growth",
            "Market forces will naturally regulate this",
            "Over-regulation is not the answer"
        ];
        
        const quotes = side === 'pro' ? proQuotes : conQuotes;
        
        return quotes.slice(0, 2).map((text, i) => ({
            text,
            author: `Influencer${i + 1}`,
            credibility: Math.floor(Math.random() * 30) + 70
        }));
    }

    generateHistoricalParallels() {
        return [
            {
                event: "The Internet Regulation Debates (1990s)",
                description: "Similar concerns about innovation vs. regulation",
                similarity: 78
            },
            {
                event: "Social Media Privacy Concerns (2010s)",
                description: "Public discourse on tech responsibility",
                similarity: 65
            }
        ];
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ViralPulsePro();
});