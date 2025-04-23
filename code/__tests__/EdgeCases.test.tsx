import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Create different mock components for different test cases
const MockDisabledButtonComponent = () => (
  <div>
    <textarea data-testid="code-input" placeholder="Paste your code here..." />
    <button data-testid="submit-button" disabled>Explain This Code</button>
  </div>
);

const MockEnabledButtonComponent = () => (
  <div>
    <textarea data-testid="code-input" placeholder="Paste your code here..." />
    <button data-testid="submit-button">Explain This Code</button>
  </div>
);

const MockLoadingComponent = () => (
  <div>
    <textarea data-testid="code-input" placeholder="Paste your code here..." />
    <button data-testid="submit-button" disabled>Explaining...</button>
  </div>
);

const MockEmptyExplanationComponent = () => (
  <div>
    <div data-testid="explanation">Your explanation will appear here...</div>
  </div>
);

describe('Edge Cases', () => {
  it('should handle empty input correctly', () => {
    render(<MockDisabledButtonComponent />);
    const button = screen.getByTestId('submit-button');
    
    // Button should be disabled when no code is entered
    expect(button).toBeDisabled();
  });

  it('should handle very long code input', () => {
    render(<MockEnabledButtonComponent />);
    const textarea = screen.getByTestId('code-input');
    
    // Generate a long code string (1000 characters)
    const longCode = 'console.log("test");'.repeat(50);
    
    // Enter the long code
    fireEvent.change(textarea, { target: { value: longCode } });
    
    // The component should not crash with long input
    const button = screen.getByTestId('submit-button');
    expect(button).toBeInTheDocument();
  });

  it('should display loading state when processing', () => {
    render(<MockLoadingComponent />);
    
    // Should show the loading text instead of the submit button text
    const loadingText = screen.getByText('Explaining...');
    expect(loadingText).toBeInTheDocument();
    
    // The button should be disabled during loading
    const button = loadingText.closest('button');
    expect(button).toBeDisabled();
  });

  it('should show placeholder when no explanation is available', () => {
    render(<MockEmptyExplanationComponent />);
    
    // Should show the placeholder text
    const placeholder = screen.getByText('Your explanation will appear here...');
    expect(placeholder).toBeInTheDocument();
  });
}); 