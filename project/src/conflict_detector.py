import random
import numpy as np
from typing import Dict, List, Any
from datetime import datetime, timedelta

class ConflictDetector:
    """Detect and analyze conflicts in trending topics"""
    
    def __init__(self):
        self.historical_events = [
            {
                'event': '#Brexit Referendum 2016',
                'description': 'High polarization over EU membership, similar sentiment patterns',
                'controversy_level': 89
            },
            {
                'event': '#ClimateDebate 2019',
                'description': 'Divided opinions on climate action urgency and methods',
                'controversy_level': 76
            },
            {
                'event': '#VaccineDebate 2021',
                'description': 'Public health vs personal freedom narrative split',
                'controversy_level': 84
            },
            {
                'event': '#TechRegulation 2023',
                'description': 'Innovation freedom vs consumer protection divide',
                'controversy_level': 71
            }
        ]
        
        self.sample_quotes = {
            'pro': [
                {
                    'text': 'This is exactly what we need for progress. The benefits far outweigh any risks.',
                    'author': 'TechOptimist2024',
                    'credibility': 87,
                    'influence_score': 0.75
                },
                {
                    'text': 'Finally, someone making sense! This could revolutionize everything.',
                    'author': 'FutureThinking',
                    'credibility': 92,
                    'influence_score': 0.68
                },
                {
                    'text': 'The data supports this approach. We should move forward carefully but decisively.',
                    'author': 'DataDrivenDecisions',
                    'credibility': 95,
                    'influence_score': 0.82
                }
            ],
            'con': [
                {
                    'text': 'This is moving too fast. We need to consider the long-term consequences.',
                    'author': 'CautiousAnalyst',
                    'credibility': 89,
                    'influence_score': 0.71
                },
                {
                    'text': 'The risks are being completely ignored. This could backfire spectacularly.',
                    'author': 'RiskAssessment',
                    'credibility': 84,
                    'influence_score': 0.65
                },
                {
                    'text': 'History shows us that rushing into these things never ends well.',
                    'author': 'HistoryMatters',
                    'credibility': 78,
                    'influence_score': 0.59
                }
            ]
        }
    
    def analyze_conflict(self, trend_topic: str) -> Dict[str, Any]:
        """Analyze conflict patterns in a trending topic"""
        
        # Simulate controversy analysis
        controversy_score = random.randint(45, 95)
        
        # Generate viewpoint split based on controversy
        if controversy_score > 80:
            pro_percentage = random.randint(35, 65)
        elif controversy_score > 60:
            pro_percentage = random.randint(40, 60)
        else:
            pro_percentage = random.randint(60, 80)
            
        con_percentage = 100 - pro_percentage
        
        # Select relevant quotes
        pro_quotes = random.sample(self.sample_quotes['pro'], 2)
        con_quotes = random.sample(self.sample_quotes['con'], 2)
        
        # Find historical parallels
        similar_events = []
        for event in self.historical_events:
            similarity = max(0, 100 - abs(event['controversy_level'] - controversy_score))
            if similarity > 60:
                similar_events.append({
                    **event,
                    'similarity': similarity
                })
        
        # Sort by similarity
        similar_events.sort(key=lambda x: x['similarity'], reverse=True)
        
        return {
            'topic': trend_topic,
            'controversy_score': controversy_score,
            'pro_percentage': pro_percentage,
            'con_percentage': con_percentage,
            'pro_quotes': pro_quotes,
            'con_quotes': con_quotes,
            'historical_parallels': similar_events[:3],
            'key_indicators': self._generate_key_indicators(controversy_score),
            'prediction': self._generate_prediction(controversy_score, pro_percentage)
        }
    
    def _generate_key_indicators(self, controversy_score: int) -> List[Dict[str, Any]]:
        """Generate key indicators for the conflict"""
        indicators = []
        
        if controversy_score > 80:
            indicators.append({
                'type': 'High Polarization',
                'description': 'Extreme positions dominating discourse',
                'severity': 'high'
            })
        
        if controversy_score > 70:
            indicators.append({
                'type': 'Echo Chambers',
                'description': 'Limited cross-group interaction detected',
                'severity': 'medium'
            })
        
        if controversy_score > 60:
            indicators.append({
                'type': 'Influencer Amplification',
                'description': 'Key figures driving narrative splits',
                'severity': 'medium'
            })
        
        return indicators
    
    def _generate_prediction(self, controversy_score: int, pro_percentage: int) -> Dict[str, str]:
        """Generate conflict outcome prediction"""
        
        if controversy_score > 85:
            outlook = "Escalating - Likely to intensify over next 48h"
            confidence = "High"
        elif controversy_score > 70:
            outlook = "Stable - Maintaining current polarization levels"
            confidence = "Medium"
        else:
            outlook = "De-escalating - Controversy likely to fade"
            confidence = "Medium"
        
        return {
            'outlook': outlook,
            'confidence': confidence,
            'timeline': f"{random.randint(12, 72)} hours",
            'resolution_probability': f"{random.randint(20, 80)}%"
        }
    
    def detect_real_time_conflicts(self) -> List[Dict[str, Any]]:
        """Detect real-time conflicts across all monitored topics"""
        
        active_conflicts = []
        topics = ["AIethics", "ClimateAction", "TechDebate", "CryptoFuture", "HealthTech"]
        
        for topic in topics:
            if random.random() > 0.7:  # 30% chance of active conflict
                conflict_level = random.randint(60, 95)
                
                active_conflicts.append({
                    'topic': topic,
                    'conflict_level': conflict_level,
                    'trend_direction': random.choice(['escalating', 'stable', 'de-escalating']),
                    'estimated_participants': random.randint(1000, 100000),
                    'geographic_spread': random.randint(5, 50),
                    'detected_at': datetime.now() - timedelta(minutes=random.randint(5, 180))
                })
        
        return sorted(active_conflicts, key=lambda x: x['conflict_level'], reverse=True)