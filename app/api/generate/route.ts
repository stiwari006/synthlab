import { NextRequest, NextResponse } from 'next/server';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const { prompt, numRecords } = await request.json();

    if (!prompt || !numRecords) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // For MVP, we'll generate in batches to handle larger datasets
    const batchSize = Math.min(50, numRecords);
    const numBatches = Math.ceil(numRecords / batchSize);
    
    let allData: any[] = [];

    for (let batch = 0; batch < numBatches; batch++) {
      const recordsInBatch = Math.min(batchSize, numRecords - (batch * batchSize));
      
      const systemPrompt = `You are a synthetic data generator. Generate realistic, high-quality synthetic data based on user requirements.

CRITICAL RULES:
1. Return ONLY valid JSON array, no markdown, no explanation
2. Each record must be a complete, realistic example
3. Ensure data diversity and realistic distributions
4. Include appropriate data types (strings, numbers, booleans, dates)
5. Make data statistically plausible
6. Add realistic variance - avoid patterns that look "too perfect"
7. For text fields, use natural language with realistic variation
8. For categorical fields, use realistic distributions (not uniform)
9. For numerical fields, use realistic ranges and distributions
10. Include edge cases and outliers (5-10% of data)

Format: Return a JSON array of objects where each object is one record.`;

      const userPrompt = `Generate ${recordsInBatch} synthetic records with the following requirements:

${prompt}

Requirements:
- Return a JSON array of ${recordsInBatch} objects
- Each object should have consistent fields across all records
- Make the data realistic and diverse
- Include appropriate data types
- Add natural variance and realistic patterns
${batch > 0 ? `- This is batch ${batch + 1} of ${numBatches}, ensure variety from previous batches` : ''}

Return ONLY the JSON array, no other text.`;

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': ANTHROPIC_API_KEY || '',
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 4096,
          system: systemPrompt,
          messages: [
            {
              role: 'user',
              content: userPrompt
            }
          ]
        })
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('Claude API error:', error);
        throw new Error('Failed to generate data from Claude API');
      }

      const result = await response.json();
      const content = result.content[0].text;

      // Extract JSON from the response (handle potential markdown wrapping)
      let jsonText = content.trim();
      if (jsonText.startsWith('```json')) {
        jsonText = jsonText.slice(7);
      }
      if (jsonText.startsWith('```')) {
        jsonText = jsonText.slice(3);
      }
      if (jsonText.endsWith('```')) {
        jsonText = jsonText.slice(0, -3);
      }
      jsonText = jsonText.trim();

      const batchData = JSON.parse(jsonText);
      
      if (!Array.isArray(batchData)) {
        throw new Error('Generated data is not an array');
      }

      allData = [...allData, ...batchData];
    }

    // Trim to exact number requested
    allData = allData.slice(0, numRecords);

    return NextResponse.json({
      success: true,
      data: allData,
      metadata: {
        recordCount: allData.length,
        fields: allData.length > 0 ? Object.keys(allData[0]) : [],
        generatedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
