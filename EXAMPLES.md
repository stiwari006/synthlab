# Example Generated Datasets

This document shows real examples of what SynthLab can generate.

## Example 1: Customer Support Emails

**Prompt:**
```
Customer support emails about product returns with sentiment labels
```

**Output (first 3 records):**
```json
[
  {
    "email_id": "CS-2024-001",
    "customer_name": "Jessica Martinez",
    "email_subject": "Return Request - Size Issue",
    "email_body": "Hi, I recently purchased a blue sweater (Order #45231) but it's too small. I'd like to exchange it for a large. The quality is great, just need a different size.",
    "product": "Blue Merino Wool Sweater",
    "order_id": "45231",
    "reason": "Size too small",
    "sentiment": "positive",
    "priority": "medium",
    "timestamp": "2024-02-01T14:23:00Z"
  },
  {
    "email_id": "CS-2024-002",
    "customer_name": "Robert Chen",
    "email_subject": "URGENT: Defective Item",
    "email_body": "This is the third time I'm reaching out. The jacket I received has a broken zipper. This is unacceptable. I want a full refund immediately.",
    "product": "Winter Parka Jacket",
    "order_id": "45189",
    "reason": "Defective - broken zipper",
    "sentiment": "negative",
    "priority": "high",
    "timestamp": "2024-02-01T09:15:00Z"
  },
  {
    "email_id": "CS-2024-003",
    "customer_name": "Amanda Thompson",
    "email_subject": "Return - Wrong Color",
    "email_body": "Hello, I ordered the dress in burgundy but received it in navy blue. Could you please arrange a return and send me the correct color? Thanks!",
    "product": "Evening Cocktail Dress",
    "order_id": "45267",
    "reason": "Wrong color shipped",
    "sentiment": "neutral",
    "priority": "medium",
    "timestamp": "2024-02-01T16:42:00Z"
  }
]
```

## Example 2: E-commerce Transactions

**Prompt:**
```
E-commerce transactions with customer demographics and purchase history
```

**Output (first 3 records):**
```json
[
  {
    "transaction_id": "TXN-89234",
    "customer_id": "C-45231",
    "customer_name": "Sarah Williams",
    "age": 32,
    "gender": "Female",
    "location": "Austin, TX",
    "membership_tier": "Gold",
    "product_name": "Wireless Noise-Canceling Headphones",
    "category": "Electronics",
    "price": 249.99,
    "quantity": 1,
    "discount_applied": 0.15,
    "final_price": 212.49,
    "payment_method": "Credit Card",
    "purchase_date": "2024-02-05T19:23:15Z",
    "previous_purchases": 12,
    "total_lifetime_value": 2847.32
  },
  {
    "transaction_id": "TXN-89235",
    "customer_id": "C-67891",
    "customer_name": "Michael Johnson",
    "age": 45,
    "gender": "Male",
    "location": "Seattle, WA",
    "membership_tier": "Platinum",
    "product_name": "Organic Coffee Beans (5lb)",
    "category": "Grocery",
    "price": 34.99,
    "quantity": 2,
    "discount_applied": 0.20,
    "final_price": 55.98,
    "payment_method": "PayPal",
    "purchase_date": "2024-02-05T08:12:43Z",
    "previous_purchases": 47,
    "total_lifetime_value": 5234.76
  },
  {
    "transaction_id": "TXN-89236",
    "customer_id": "C-12456",
    "customer_name": "Emily Rodriguez",
    "age": 28,
    "gender": "Female",
    "location": "Miami, FL",
    "membership_tier": "Silver",
    "product_name": "Yoga Mat Premium",
    "category": "Sports & Fitness",
    "price": 59.99,
    "quantity": 1,
    "discount_applied": 0.00,
    "final_price": 59.99,
    "payment_method": "Debit Card",
    "purchase_date": "2024-02-05T14:55:28Z",
    "previous_purchases": 6,
    "total_lifetime_value": 423.18
  }
]
```

## Example 3: Medical Patient Records (Synthetic)

**Prompt:**
```
Synthetic patient records with diagnosis and treatment information
```

**Output (first 2 records):**
```json
[
  {
    "patient_id": "PT-2024-5623",
    "age": 67,
    "gender": "Male",
    "admission_date": "2024-01-28",
    "primary_diagnosis": "Type 2 Diabetes Mellitus",
    "secondary_diagnoses": ["Hypertension", "Hyperlipidemia"],
    "symptoms": ["Increased thirst", "Frequent urination", "Fatigue"],
    "hba1c_level": 8.2,
    "blood_pressure": "145/92",
    "bmi": 31.4,
    "treatment_plan": "Metformin 1000mg BID, lifestyle modification, nutritional counseling",
    "medications": ["Metformin", "Lisinopril", "Atorvastatin"],
    "follow_up_date": "2024-03-28",
    "insurance_type": "Medicare",
    "attending_physician": "Dr. Jennifer Walsh"
  },
  {
    "patient_id": "PT-2024-5624",
    "age": 34,
    "gender": "Female",
    "admission_date": "2024-02-01",
    "primary_diagnosis": "Acute Bronchitis",
    "secondary_diagnoses": [],
    "symptoms": ["Persistent cough", "Chest congestion", "Mild fever"],
    "hba1c_level": null,
    "blood_pressure": "118/76",
    "bmi": 24.1,
    "treatment_plan": "Rest, hydration, albuterol inhaler as needed",
    "medications": ["Albuterol inhaler", "Guaifenesin"],
    "follow_up_date": "2024-02-15",
    "insurance_type": "Private - Blue Cross",
    "attending_physician": "Dr. Michael Chen"
  }
]
```

## Example 4: Social Media Posts

**Prompt:**
```
Social media posts with engagement metrics and sentiment analysis
```

**Output (first 2 records):**
```json
[
  {
    "post_id": "POST-782341",
    "username": "@tech_enthusiast_sam",
    "post_text": "Just tried the new AI image generator and WOW 🤯 The results are incredible! This is going to change everything for content creators. #AIart #TechInnovation",
    "timestamp": "2024-02-05T15:23:11Z",
    "platform": "Twitter",
    "likes": 2847,
    "shares": 412,
    "comments": 156,
    "impressions": 45231,
    "hashtags": ["#AIart", "#TechInnovation"],
    "mentions": [],
    "sentiment": "very_positive",
    "content_category": "Technology",
    "engagement_rate": 0.074,
    "is_viral": false
  },
  {
    "post_id": "POST-782342",
    "username": "@foodie_adventures",
    "post_text": "This new restaurant downtown is absolutely amazing! The truffle pasta was to die for 😍 Five stars! Highly recommend for date night.",
    "timestamp": "2024-02-05T19:47:33Z",
    "platform": "Instagram",
    "likes": 543,
    "shares": 67,
    "comments": 34,
    "impressions": 8923,
    "hashtags": ["#foodie", "#datenight", "#trufflepasta"],
    "mentions": ["@downtownbistro"],
    "sentiment": "positive",
    "content_category": "Food & Dining",
    "engagement_rate": 0.072,
    "is_viral": false
  }
]
```

## Data Quality Characteristics

SynthLab generates data with:

✅ **Realistic variance** - Not all records are perfect or follow patterns  
✅ **Proper data types** - Numbers, strings, booleans, dates, nulls  
✅ **Realistic distributions** - Not uniformly distributed  
✅ **Edge cases** - Outliers, missing data, extreme values (5-10%)  
✅ **Consistency** - Same fields across all records  
✅ **Domain knowledge** - Industry-appropriate values and relationships  

## Tips for Better Prompts

1. **Be specific about fields**
   - ❌ "Generate customer data"
   - ✅ "Generate customer data with name, email, age, location, purchase_history"

2. **Include context**
   - ❌ "Transaction data"
   - ✅ "E-commerce transaction data for a fashion retailer with seasonal patterns"

3. **Specify data types when important**
   - ✅ "Include numerical ratings (1-5), boolean fields for premium_member, and ISO timestamps"

4. **Request realistic distributions**
   - ✅ "Include both satisfied and unsatisfied customers, with realistic complaint rates"

5. **Define relationships**
   - ✅ "Ensure repeat customers have higher lifetime_value and more previous_purchases"
