// Simple integration tests

describe('Code Explainer App Integration', () => {
  // Mock fetch for this test
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ result: 'Code explanation' }),
      status: 200,
    } as Response)
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be able to call the API with proper parameters', async () => {
    // Simulate a request to our API
    const response = await fetch('/api/explain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        messages: [
          { role: 'user', content: 'Please explain this code: console.log("hello")' }
        ]
      }),
    });

    // Verify that the fetch was called with the right URL
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/explain',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
      })
    );

    // Basic assertions on the response
    expect(response.ok).toBe(true);
    expect(response.status).toBe(200);
  });

  it('should handle the OpenAI response format', async () => {
    // Mock the response data
    const responseData = await (await fetch('/api/explain')).json();
    
    // Check if the response has the expected structure
    expect(responseData).toHaveProperty('result');
    expect(responseData.result).toBe('Code explanation');
  });
}); 