// ... existing code ...

const handleSendMessage = async (message: string) => {
  // Add this debug line
  console.log('Environment variables:', {
    key: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY,
    keyLength: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY?.length
  });

  if (!process.env.NEXT_PUBLIC_OPENROUTER_API_KEY) {
    console.error('OpenRouter API key is not configured');
    alert('API key is not configured. Please check your environment variables.');
    return;
  }

  try {
    setMessages(prev => [...prev, { role: 'user', content: message }]);
    
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
      'HTTP-Referer': window.location.origin,
      'X-Title': 'Cuddly Companion Smart Teddy'
    };

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: 'openchat/openchat-7b:free',
        messages: [
          { role: 'system', content: 'You are a friendly and caring teddy bear companion.' },
          ...messages,
          { role: 'user', content: message }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('API Error:', errorData);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to get response. Please try again.');
  }
};

// ... existing code ...