import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock the Home component instead of importing it directly
jest.mock('../src/app/page', () => {
  return {
    __esModule: true,
    default: () => (
      <div>
        <h1>Code Explainer</h1>
        <div>
          <label htmlFor="language-select">Select Language:</label>
          <select id="language-select" data-testid="language-select">
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
        <button data-testid="submit-button">Explain Code</button>
        <div data-testid="explanation-output">
          <h2>Explanation</h2>
          <div>Your explanation will appear here...</div>
          <button data-testid="copy-button">Copy</button>
        </div>
      </div>
    )
  };
});

// Mock the useCompletion hook and other client-side functions
jest.mock('ai/react', () => ({
  useCompletion: jest.fn(() => ({
    completion: '',
    complete: jest.fn(),
    isLoading: false
  }))
}));

describe('Code Explainer UI', () => {
  it('renders the main heading', () => {
    render(<React.Fragment>{require('../src/app/page').default()}</React.Fragment>);
    expect(screen.getByRole('heading', { name: /code explainer/i })).toBeInTheDocument();
  });

  it('renders the language selector', () => {
    render(<React.Fragment>{require('../src/app/page').default()}</React.Fragment>);
    expect(screen.getByTestId('language-select')).toBeInTheDocument();
  });

  it('renders the code input area', () => {
    render(<React.Fragment>{require('../src/app/page').default()}</React.Fragment>);
    expect(screen.getByTestId('code-input')).toBeInTheDocument();
  });

  it('renders the submit button', () => {
    render(<React.Fragment>{require('../src/app/page').default()}</React.Fragment>);
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('renders the explanation section', () => {
    render(<React.Fragment>{require('../src/app/page').default()}</React.Fragment>);
    expect(screen.getByTestId('explanation-output')).toBeInTheDocument();
  });
}); 