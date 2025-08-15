import random
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from typing import List, Dict, Any

class MockDataGenerator:
    """Generate realistic mock data for social media trends and analysis"""
    
    def __init__(self):
        self.topics = [
            "AIethics", "ClimateAction", "TechDebate", "CryptoFuture", "SpaceExploration",
            "HealthTech", "RemoteWork", "Sustainability", "QuantumComputing", "Metaverse",
            "BlockchainGov", "FutureOfWork", "DigitalPrivacy", "GreenEnergy", "BioTech",
            "SmartCities", "RoboticsCare", "VirtualReality", "GenAI", "CyberSecurity"
        ]
        
        self.platforms = ["Twitter", "Reddit", "TikTok", "Instagram"]
        
        self.sample_posts = {
            "AIethics": [
                "We need stronger AI governance before it's too late #AIethics",
                "AI bias in hiring is a real problem that needs addressing #AIethics",
                "The future of AI should be decided by everyone, not just tech companies #AIethics"
            ],
            "ClimateAction": [
                "Individual action isn't enough, we need systemic change #ClimateAction",
                "Renewable energy is finally becoming cheaper than fossil fuels #ClimateAction",
                "Climate anxiety is real and affecting young people globally #ClimateAction"
            ]
        }
        
    def generate_trending_topics(self, count: int = 20) -> List[Dict[str, Any]]:
        """Generate trending topics with engagement metrics"""
        trends = []
        
        for i in range(count):
            topic = random.choice(self.topics)
            platform = random.choice(self.platforms)
            
            # Generate realistic engagement numbers
            base_views = random.randint(10000, 5000000)
            controversy = random.randint(20, 95)
            sentiment = random.uniform(-1, 1)
            
            trend = {
                'topic': topic,
                'platform': platform,
                'views': base_views,
                'engagement_rate': random.uniform(2.5, 15.0),
                'controversy': controversy,
                'sentiment_score': sentiment,
                'growth_rate': random.uniform(-20, 300),
                'peak_time': datetime.now() - timedelta(hours=random.randint(1, 48)),
                'geographic_spread': random.randint(15, 85),
                'toxicity_level': random.uniform(0, controversy/100)
            }
            
            trends.append(trend)
            
        # Sort by engagement
        trends.sort(key=lambda x: x['views'], reverse=True)
        return trends
    
    def generate_geographic_data(self) -> List[Dict[str, Any]]:
        """Generate geographic trend data for heatmap"""
        locations = [
            {"city": "New York", "lat": 40.7128, "lng": -74.0060, "intensity": random.randint(50, 100)},
            {"city": "London", "lat": 51.5074, "lng": -0.1278, "intensity": random.randint(40, 90)},
            {"city": "Tokyo", "lat": 35.6762, "lng": 139.6503, "intensity": random.randint(60, 95)},
            {"city": "San Francisco", "lat": 37.7749, "lng": -122.4194, "intensity": random.randint(70, 100)},
            {"city": "Berlin", "lat": 52.5200, "lng": 13.4050, "intensity": random.randint(30, 80)},
            {"city": "Sydney", "lat": -33.8688, "lng": 151.2093, "intensity": random.randint(45, 85)},
            {"city": "Toronto", "lat": 43.6532, "lng": -79.3832, "intensity": random.randint(35, 75)},
            {"city": "Mumbai", "lat": 19.0760, "lng": 72.8777, "intensity": random.randint(55, 90)},
            {"city": "São Paulo", "lat": -23.5505, "lng": -46.6333, "intensity": random.randint(40, 80)},
            {"city": "Dubai", "lat": 25.2048, "lng": 55.2708, "intensity": random.randint(25, 70)}
        ]
        
        return locations
    
    def generate_sentiment_timeline(self, hours: int = 24) -> pd.DataFrame:
        """Generate sentiment data over time"""
        timestamps = pd.date_range(
            start=datetime.now() - timedelta(hours=hours),
            end=datetime.now(),
            freq='H'
        )
        
        # Generate realistic sentiment trends
        base_sentiment = 0.1
        sentiment_data = []
        
        for i, timestamp in enumerate(timestamps):
            # Add some realistic fluctuation
            noise = random.uniform(-0.3, 0.3)
            trend = 0.02 * np.sin(i * 0.2)  # Gradual trend
            sentiment = base_sentiment + trend + noise
            
            sentiment_data.append({
                'timestamp': timestamp,
                'sentiment': max(-1, min(1, sentiment)),
                'volume': random.randint(1000, 10000),
                'positive_ratio': max(0, min(1, 0.5 + sentiment/2)),
                'negative_ratio': max(0, min(1, 0.5 - sentiment/2)),
                'neutral_ratio': random.uniform(0.2, 0.4)
            })
        
        return pd.DataFrame(sentiment_data)
    
    def generate_meme_evolution(self, trend_topic: str) -> List[Dict[str, Any]]:
        """Generate meme evolution timeline for a topic"""
        if random.random() < 0.3:  # Only some trends become memes
            return []
            
        timeline = []
        start_date = datetime.now() - timedelta(days=random.randint(7, 30))
        
        for i in range(7):
            date = start_date + timedelta(days=i)
            popularity = random.randint(10, 100) * (1 + np.sin(i * 0.5))
            
            timeline.append({
                'date': date,
                'popularity': max(0, int(popularity)),
                'variant_count': random.randint(5, 50),
                'platform_dominance': random.choice(["TikTok", "Twitter", "Reddit"])
            })
        
        return timeline
    
    def get_sample_posts(self, topic: str, count: int = 10) -> List[str]:
        """Get sample posts for a given topic"""
        if topic in self.sample_posts:
            base_posts = self.sample_posts[topic]
        else:
            # Generate generic posts
            base_posts = [
                f"Thoughts on #{topic}? This is getting interesting...",
                f"The #{topic} discussion is heating up. Here's my take:",
                f"Can we talk about #{topic} for a minute? This is important."
            ]
        
        # Expand the list with variations
        posts = base_posts.copy()
        while len(posts) < count:
            posts.extend(base_posts)
        
        return posts[:count]