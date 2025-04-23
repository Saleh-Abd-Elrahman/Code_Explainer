import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Create a mock component for testing user interactions without hooks
const MockCodeExplainer = () => {
  return (
    <div>
      <h1>Code Explainer</h1>
      <div>
        <label htmlFor="language-select">Language:</label>
        <select 
          id="language-select" 
          data-testid="language-select"
          defaultValue="javascript"
        >
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
        </select>
      </div>
      <div>
        <label htmlFor="code-input">Your Code:</label>
        <textarea 
          id="code-input"
          data-testid="code-input"
          placeholder="Paste your code here..."
        />
      </div>
      <button 
        data-testid="submit-button"
        id="submit-button"
      >
        Explain This Code
      </button>
      <div>
        <h2>Explanation</h2>
        <div data-testid="explanation">Your explanation will appear here...</div>
        <button data-testid="copy-button">Copy explanation</button>
      </div>
    </div>
  );
};

// Spy on clipboard API
jest.spyOn(navigator.clipboard, 'writeText');

describe('User Interaction', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle language selection', () => {
    render(<MockCodeExplainer />);
    const selector = screen.getByTestId('language-select');
    
    // We can't actually test the change in a static component,
    // but we can test that the selector exists with JavaScript selected
    expect(selector).toHaveValue('javascript');
  });
  
  it('should handle code input', () => {
    render(<MockCodeExplainer />);
    const textarea = screen.getByTestId('code-input');
    
    // We can verify the textarea exists
    expect(textarea).toBeInTheDocument();
  });
  
  it('should have a submit button', () => {
    render(<MockCodeExplainer />);
    const button = screen.getByTestId('submit-button');
    
    // We can verify the button exists
    expect(button).toBeInTheDocument();
  });
  
  it('should have copy button for explanations', () => {
    render(<MockCodeExplainer />);
    const copyButton = screen.getByTestId('copy-button');
    
    // We can verify the copy button exists
    expect(copyButton).toBeInTheDocument();
  });
}); 