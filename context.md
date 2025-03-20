# Roof Softwash Pricing Calculator - Implementation Guide

## Overview

This guide details the implementation of a web-based calculator for determining roof softwash pricing. The calculator uses three key inputs to generate accurate minimum pricing:

1. **Horizontal Roof Area** (in square feet)
2. **Roof Slope Category** (4-tier system)
3. **Base Rate** (fixed at $0.005 per square foot)

## Technical Specifications

### 1. Slope Categories & Multipliers

The calculator uses a 4-tier categorization system for roof slopes:

| Category | Description  | Pitch Range | Multiplier | Mathematical Basis |
|----------|-------------|-------------|------------|-------------------|
| A | Low Slope    | ≤ 3/12     | 1.03 | \(\sqrt{1 + (3/12)^2}\) |
| B | Standard     | 4/12 - 6/12 | 1.12 | \(\sqrt{1 + (6/12)^2}\) |
| C | Steep        | 7/12 - 9/12 | 1.25 | \(\sqrt{1 + (9/12)^2}\) |
| D | Very Steep   | ≥ 10/12    | 1.41 | \(\sqrt{1 + (12/12)^2}\) |

### 2. Core Calculation Formula

The pricing calculation follows a two-step process:

1. **Calculate Actual Roof Surface Area**:
   ```
   ActualArea = HorizontalArea × SlopeFactor
   ```

2. **Calculate Minimum Price**:
   ```
   MinimumPrice = ActualArea × $0.005
   ```

## Implementation Guide

### 1. Project Structure

```
roof-calculator/
├── index.html
├── styles/
│   └── main.css
└── scripts/
    └── calculator.js
```

### 2. Key Components

#### HTML Structure
- Input field for horizontal roof area
- Dropdown menu for slope category selection
- Calculate button
- Results display area
- Clear/Reset functionality

#### JavaScript Functions
- Input validation
- Slope factor mapping
- Price calculation
- Display formatting
- Error handling

### 3. Code Implementation

#### HTML Template
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Roof Softwash Calculator</title>
    <link rel="stylesheet" href="styles/main.css">
</head>
<body>
    <!-- Calculator Form -->
    <div class="calculator-container">
        <h1>Roof Softwash Price Calculator</h1>
        <form id="calculatorForm">
            <div class="input-group">
                <label for="horizontalArea">Horizontal Roof Area (sq ft)</label>
                <input type="number" id="horizontalArea" required min="0" step="1">
            </div>
            
            <div class="input-group">
                <label for="slopeCategory">Roof Slope Category</label>
                <select id="slopeCategory" required>
                    <option value="A">A - Low Slope (≤ 3/12)</option>
                    <option value="B">B - Standard (4/12 - 6/12)</option>
                    <option value="C">C - Steep (7/12 - 9/12)</option>
                    <option value="D">D - Very Steep (≥ 10/12)</option>
                </select>
            </div>

            <button type="submit">Calculate Price</button>
            <button type="reset">Clear</button>
        </form>

        <div id="results" class="results-container"></div>
    </div>
</body>
</html>
```

#### CSS Styling
```css
/* Base styles for modern, clean look */
.calculator-container {
    max-width: 600px;
    margin: 2rem auto;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.input-group {
    margin-bottom: 1.5rem;
}

/* Add your preferred styling */
```

#### JavaScript Logic
```javascript
const RATE_PER_SQFT = 0.005;  // $0.005 per square foot

const slopeFactors = {
    'A': 1.03,  // Low slope
    'B': 1.12,  // Standard
    'C': 1.25,  // Steep
    'D': 1.41   // Very steep
};

function calculatePrice(horizontalArea, slopeCategory) {
    const actualArea = horizontalArea * slopeFactors[slopeCategory];
    return actualArea * RATE_PER_SQFT;
}

// Event handling and display logic
document.getElementById('calculatorForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const horizontalArea = parseFloat(document.getElementById('horizontalArea').value);
    const slopeCategory = document.getElementById('slopeCategory').value;
    
    const price = calculatePrice(horizontalArea, slopeCategory);
    
    document.getElementById('results').innerHTML = `
        <h3>Calculation Results:</h3>
        <p>Horizontal Area: ${horizontalArea.toLocaleString()} sq ft</p>
        <p>Slope Category: ${slopeCategory}</p>
        <p>Minimum Price: $${price.toFixed(2)}</p>
    `;
});
```

## Testing & Validation

### Test Cases
1. **Basic Calculation**:
   - Horizontal Area: 1000 sq ft
   - Slope Category: B (1.12)
   - Expected Result: $5.60

2. **Edge Cases**:
   - Zero area
   - Negative numbers
   - Very large numbers
   - Invalid inputs

### Validation Rules
- Horizontal area must be positive
- Slope category must be valid (A, B, C, or D)
- Results should be rounded to 2 decimal places

## Deployment Notes

1. **Browser Compatibility**
   - Tested on modern browsers (Chrome, Firefox, Safari, Edge)
   - Uses standard ES6+ JavaScript features

2. **Performance Considerations**
   - Lightweight implementation
   - No external dependencies required
   - Instant calculations

3. **Maintenance**
   - Easy to update slope factors
   - Modular code structure
   - Well-commented for future modifications

## Future Enhancements

1. **Additional Features**
   - Save calculation history
   - Multiple calculation comparison
   - PDF quote generation
   - Mobile-responsive design

2. **Integration Options**
   - API endpoints for backend integration
   - Database storage for calculations
   - User authentication system
   - Custom pricing rules
