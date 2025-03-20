// Constants
const RATE_PER_SQFT = 0.50;  // $0.50 per square foot

const SLOPE_FACTORS = {
    'A': 1.03,  // Low slope (≤ 3/12)
    'B': 1.12,  // Standard (4/12 - 6/12)
    'C': 1.25,  // Steep (7/12 - 9/12)
    'D': 1.41   // Very steep (≥ 10/12)
};

// DOM Elements
const calculatorForm = document.getElementById('calculatorForm');
const horizontalAreaInput = document.getElementById('horizontalArea');
const slopeCategorySelect = document.getElementById('slopeCategory');
const resultsContainer = document.getElementById('results');
const themeToggle = document.getElementById('themeToggle');

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Tooltip Management
function initializeTooltips() {
    slopeCategorySelect.addEventListener('change', (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const tooltip = e.target.parentElement.querySelector('.tooltip');
        tooltip.textContent = selectedOption.dataset.tooltip || '';
    });
}

// Pitch Diagram Interaction
function initializePitchDiagram() {
    const pitchLines = document.querySelectorAll('.pitch-line');
    
    // Initially show all lines with reduced opacity
    pitchLines.forEach(line => {
        line.style.opacity = '0.25';
        line.style.stroke = 'currentColor';
    });
    
    slopeCategorySelect.addEventListener('change', (e) => {
        const selectedCategory = e.target.value;
        pitchLines.forEach(line => {
            if (line.classList.contains(`category-${selectedCategory.toLowerCase()}`)) {
                line.style.opacity = '1';
                line.style.stroke = '#2dd4bf'; // Teal color
            } else {
                line.style.opacity = '0.25';
                line.style.stroke = 'currentColor';
            }
        });
    });

    // Handle the initial "Select slope category" state
    if (!slopeCategorySelect.value) {
        pitchLines.forEach(line => {
            line.style.opacity = '0.25';
            line.style.stroke = 'currentColor';
        });
    }
}

// Helper Functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

function formatNumber(number) {
    return new Intl.NumberFormat('en-US').format(number);
}

function calculatePrice(horizontalArea, slopeCategory) {
    const slopeFactor = SLOPE_FACTORS[slopeCategory];
    const actualArea = horizontalArea * slopeFactor;
    return actualArea * RATE_PER_SQFT;
}

async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('Failed to copy text: ', err);
        return false;
    }
}

function animateValue(element) {
    element.classList.add('highlight');
    setTimeout(() => element.classList.remove('highlight'), 1000);
}

function displayResults(horizontalArea, slopeCategory, price) {
    const actualArea = horizontalArea * SLOPE_FACTORS[slopeCategory];
    
    const resultsHTML = `
        <h3>Calculation Results</h3>
        <div class="result-item">
            <span>Horizontal Area:</span>
            <span>${formatNumber(horizontalArea)} sq ft</span>
        </div>
        <div class="result-item">
            <span>Slope Category:</span>
            <span>${slopeCategory} (${SLOPE_FACTORS[slopeCategory]}x)</span>
        </div>
        <div class="result-item">
            <span>Actual Surface Area:</span>
            <span>${formatNumber(Math.round(actualArea))} sq ft</span>
        </div>
        <div class="result-item">
            <span>Rate per sq ft:</span>
            <span>${formatCurrency(RATE_PER_SQFT)}</span>
        </div>
        <div class="result-item">
            <span>Minimum Price:</span>
            <span class="price">${formatCurrency(price)}</span>
        </div>
        <button class="copy-btn" onclick="handleCopyResults()">
            📋 Copy Results
        </button>
    `;

    resultsContainer.innerHTML = resultsHTML;
    resultsContainer.classList.add('visible');

    // Animate new values
    document.querySelectorAll('.result-item').forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.animation = 'none';
            item.offsetHeight; // Trigger reflow
            item.style.animation = null;
            item.style.opacity = '1';
        }, index * 100);
    });
}

function validateInput(horizontalArea) {
    if (isNaN(horizontalArea) || horizontalArea <= 0) {
        throw new Error('Please enter a valid positive number for the horizontal area.');
    }
}

// Event Handlers
async function handleCopyResults() {
    const results = Array.from(document.querySelectorAll('.result-item'))
        .map(item => item.textContent.replace(/\s+/g, ' ').trim())
        .join('\n');
    
    const copyBtn = document.querySelector('.copy-btn');
    const success = await copyToClipboard(results);
    
    if (success) {
        copyBtn.textContent = '✓ Copied!';
        copyBtn.classList.add('copied');
        setTimeout(() => {
            copyBtn.textContent = '📋 Copy Results';
            copyBtn.classList.remove('copied');
        }, 2000);
    }
}

calculatorForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    try {
        const horizontalArea = parseFloat(horizontalAreaInput.value);
        const slopeCategory = slopeCategorySelect.value;

        validateInput(horizontalArea);
        
        const price = calculatePrice(horizontalArea, slopeCategory);
        displayResults(horizontalArea, slopeCategory, price);
        
    } catch (error) {
        resultsContainer.innerHTML = `
            <div class="error-message">
                ${error.message}
            </div>
        `;
        resultsContainer.classList.add('visible');
    }
});

calculatorForm.addEventListener('reset', () => {
    resultsContainer.innerHTML = '';
    resultsContainer.classList.remove('visible');
    
    // Reset pitch diagram to show all lines with reduced opacity
    document.querySelectorAll('.pitch-line').forEach(line => {
        line.style.opacity = '0.25';
        line.style.stroke = 'currentColor';
    });
});

themeToggle.addEventListener('click', toggleTheme);

// Initialize features
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeTooltips();
    initializePitchDiagram();
}); 