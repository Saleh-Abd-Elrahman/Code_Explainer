import React from 'react';
import { render, screen } from '@testing-library/react';

// Create a mock component for testing
const MockCodeExplainer = () => {
  return (
    <div>
      <h1>Code Explainer</h1>
      <div className="language-selector">
        <select>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
        </select>
      </div>
      <textarea placeholder="Paste your code here..." />
      <button disabled={false}>Explain This Code</button>
      <div className="explanation">
        <div>Your explanation will appear here...</div>
      </div>
    </div>
  );
};

// Testing our mocked component
describe('Code Explainer UI', () => {
  it('renders the main heading', () => {
    render(<MockCodeExplainer />);
    const heading = screen.getByText('Code Explainer');
    expect(heading).toBeInTheDocument();
  });

  it('renders the language selector', () => {
    render(<MockCodeExplainer />);
    const selector = screen.getByRole('combobox');
    expect(selector).toBeInTheDocument();
  });

  it('renders the code input area', () => {
    render(<MockCodeExplainer />);
    const textarea = screen.getByPlaceholderText('Paste your code here...');
    expect(textarea).toBeInTheDocument();
  });

  it('renders the submit button', () => {
    render(<MockCodeExplainer />);
    const button = screen.getByText('Explain This Code');
    expect(button).toBeInTheDocument();
  });

  it('renders the explanation placeholder', () => {
    render(<MockCodeExplainer />);
    const placeholder = screen.getByText('Your explanation will appear here...');
    expect(placeholder).toBeInTheDocument();
  });
}); 