# Delta Roof Price Calculator

A modern, responsive web application for calculating roof softwash pricing based on horizontal area and slope factors. Built with vanilla JavaScript and CSS, featuring dark mode support and interactive visualizations.

## Features

- 📐 Interactive roof pitch diagram
- 🌓 Dark/Light mode toggle
- 💡 Tooltips with detailed slope information
- ✨ Smooth animations and transitions
- 📋 Copy results to clipboard
- 📱 Fully responsive design

## Calculation Method

The calculator uses a 4-tier categorization system for roof slopes:

| Category | Description  | Pitch Range | Multiplier |
|----------|-------------|-------------|------------|
| A | Low Slope    | ≤ 3/12     | 1.03 |
| B | Standard     | 4/12 - 6/12 | 1.12 |
| C | Steep        | 7/12 - 9/12 | 1.25 |
| D | Very Steep   | ≥ 10/12    | 1.41 |

### Price Calculation

1. Calculate actual roof surface area:
   ```
   ActualArea = HorizontalArea × SlopeFactor
   ```

2. Calculate minimum price:
   ```
   MinimumPrice = ActualArea × $0.50
   ```

## Live Demo

[View Live Demo](https://deltaroofpricecal.vercel.app)

## Development

1. Clone the repository:
   ```bash
   git clone https://github.com/ZikryaOnChain/deltaroofpricecal.git
   ```

2. Open `index.html` in your browser or use a local server:
   ```bash
   npx serve
   ```

## Deployment

This project is configured for easy deployment on Vercel. Simply:

1. Fork this repository
2. Connect it to your Vercel account
3. Deploy!

## License

MIT License - feel free to use this in your own projects! 