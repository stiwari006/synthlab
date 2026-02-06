# 🧬 SynthLab - AI-Powered Synthetic Data Generator

Generate high-quality synthetic training data in minutes using Claude AI. Perfect for ML training, privacy compliance, and data augmentation.

![SynthLab](https://img.shields.io/badge/Powered%20by-Claude%20AI-purple)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## 🚀 Features

- **Natural Language Prompts**: Describe your data needs in plain English
- **Intelligent Generation**: Claude AI creates realistic, diverse synthetic datasets
- **Flexible Output**: Export as CSV or JSON
- **Batch Processing**: Generate up to 1,000 records (MVP limit)
- **Real-time Preview**: See your data as it's generated
- **Quality Metrics**: Built-in stats and data type analysis

## 🎯 Use Cases

- **ML Training**: Generate balanced datasets without privacy concerns
- **Privacy Compliance**: Replace real customer data with synthetic alternatives
- **Data Augmentation**: Expand small datasets with similar examples
- **Edge Cases**: Create rare scenarios for robust model training
- **Rapid Prototyping**: Build pipelines before real data is available
- **Bias Reduction**: Generate demographically balanced datasets

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **AI Engine**: Anthropic Claude Sonnet 4
- **API**: Next.js API Routes
- **Deployment**: Vercel-ready

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Anthropic API key ([Get one here](https://console.anthropic.com/))

### Setup

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd synthlab
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your Anthropic API key:
```
ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
```

4. **Run development server**
```bash
npm run dev
```

5. **Open in browser**
```
http://localhost:3000
```

## 🎨 Usage

### Basic Example

1. Enter a prompt describing your data needs:
```
Customer support emails about product returns, 
with sentiment labels, for an e-commerce fashion brand
```

2. Set number of records (10-1000)

3. Click "Generate Dataset"

4. Preview and download as CSV or JSON

### Advanced Prompts

**E-commerce Transactions**
```
E-commerce transactions including customer_id, product_name, 
category, price, quantity, discount_applied, payment_method, 
shipping_address, order_status, and timestamp. Include realistic 
purchase patterns and seasonal variations.
```

**Medical Records (Synthetic)**
```
Synthetic patient records with patient_id, age, gender, diagnosis, 
symptoms, treatment_plan, medication, follow_up_date, and insurance_type. 
Include diverse conditions and demographics.
```

**Social Media Data**
```
Social media posts with post_text, author_username, timestamp, 
likes, shares, comments_count, hashtags, sentiment, and content_category. 
Include viral posts and regular engagement patterns.
```

## 🏗️ Architecture

```
synthlab/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts          # Claude API integration
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main page
├── components/
│   ├── DataPreview.tsx           # Data table & export
│   ├── GeneratorForm.tsx         # Input form
│   └── Header.tsx                # Navigation
└── public/                       # Static assets
```

## 🔑 Key Components

### Data Generation Flow

1. **User Input**: Natural language prompt + parameters
2. **API Call**: POST to `/api/generate`
3. **Claude Processing**: 
   - System prompt ensures quality & format
   - Batch processing for larger datasets
   - JSON validation and cleanup
4. **Response**: Structured JSON array
5. **Display**: Table preview + export options

### Generation Algorithm

```typescript
// Batch processing for scalability
const batchSize = 50;
const numBatches = Math.ceil(numRecords / batchSize);

for (let batch = 0; batch < numBatches; batch++) {
  // Generate batch with Claude
  const batchData = await generateWithClaude(prompt, batchSize);
  allData.push(...batchData);
}
```

## 💰 Pricing Model (Proposed)

- **Free Tier**: First 1,000 records
- **Pay-as-you-go**: $0.01 per record
- **Pro**: $99/month - 10,000 records
- **Enterprise**: Custom pricing, unlimited records

## 🚧 Roadmap

### MVP (Current)
- [x] Basic text generation
- [x] CSV/JSON export
- [x] Preview interface
- [x] Batch processing

### Phase 2
- [ ] User authentication
- [ ] Save/load datasets
- [ ] Custom templates
- [ ] API access
- [ ] Advanced data types (images, time series)

### Phase 3
- [ ] Data quality scoring
- [ ] Marketplace for templates
- [ ] Team collaboration
- [ ] Version control for datasets
- [ ] Integration with ML platforms

## 🔐 Security & Privacy

- **No data storage**: Datasets are generated on-demand
- **API key security**: Environment variables only
- **No PII**: Synthetic data contains no real personal information
- **Compliance-ready**: GDPR, HIPAA friendly

## 🐛 Troubleshooting

**"Failed to generate data"**
- Check your `ANTHROPIC_API_KEY` in `.env`
- Verify API key is valid at console.anthropic.com
- Check API rate limits

**Slow generation**
- Reduce number of records
- Simplify prompt complexity
- Check network connection

**Invalid JSON errors**
- This is a known issue with complex prompts
- Try simplifying the data structure
- Reduce number of fields

## 📊 Performance

- **Generation speed**: ~50 records per API call (~2-3 seconds)
- **Max batch size**: 1,000 records (MVP)
- **Average quality**: High (Claude Sonnet 4)

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repo
2. Create a feature branch
3. Submit a PR with clear description

## 📄 License

MIT License - feel free to use for commercial projects

## 🙏 Acknowledgments

- Powered by [Anthropic Claude](https://anthropic.com)
- Built with [Next.js](https://nextjs.org)
- Styled with [Tailwind CSS](https://tailwindcss.com)

## 📧 Contact

Built by Sushma
- Questions? Open an issue
- Feature requests? Start a discussion

---

**Ready to generate synthetic data?** 🚀

```bash
npm run dev
```
# synthlab
# synthlab
