/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        nn: {
          bg0: 'hsl(var(--nn-bg-0) / <alpha-value>)',
          bg1: 'hsl(var(--nn-bg-1) / <alpha-value>)',
          glass: 'hsl(var(--nn-panel-glass) / <alpha-value>)',
          cyan: 'hsl(var(--nn-accent-cyan) / <alpha-value>)',
          mag: 'hsl(var(--nn-accent-magenta) / <alpha-value>)',
          lime: 'hsl(var(--nn-accent-lime) / <alpha-value>)',
          'text-strong': 'hsl(var(--nn-text-strong) / <alpha-value>)',
          'text-soft': 'hsl(var(--nn-text-soft) / <alpha-value>)',
          'text-muted': 'hsl(var(--nn-text-muted) / <alpha-value>)',
        }
      },
      boxShadow: {
        'neon-cyan': 'var(--nn-shadow-cyan)',
        'neon-mag': 'var(--nn-shadow-magenta)',
        'neon-lime': 'var(--nn-shadow-lime)',
        'neon': '0 0 8px hsla(var(--nn-accent-cyan) / .9), 0 0 20px hsla(var(--nn-accent-cyan) / .6)'
      },
      borderRadius: { 
        nn: 'var(--nn-radius-lg)'
      },
      animation: {
        'pulse-neon': 'pulseNeon var(--nn-dur-slow) ease-in-out infinite alternate',
        'flow-lines': 'flowLines 3s linear infinite',
        'brain-pulse': 'brainPulse var(--nn-dur-slow) ease-in-out infinite alternate',
        'neural-flow': 'neuralFlow 2s ease-in-out infinite'
      },
      keyframes: {
        pulseNeon: {
          '0%':   { boxShadow: '0 0 4px hsl(var(--nn-accent-cyan) / .6)' },
          '100%': { boxShadow: '0 0 16px hsl(var(--nn-accent-cyan) / 1)' }
        },
        flowLines: {
          from: { backgroundPosition: '0 0' },
          to:   { backgroundPosition: '200px 0' }
        },
        brainPulse: {
          '0%': { 
            boxShadow: 'var(--nn-shadow-cyan)',
            transform: 'scale(1)'
          },
          '100%': { 
            boxShadow: '0 0 16px hsl(var(--nn-accent-cyan) / 1), 0 0 32px hsl(var(--nn-accent-cyan) / .8)',
            transform: 'scale(1.02)'
          }
        },
        neuralFlow: {
          '0%':   { strokeDashoffset: '1000', opacity: '0' },
          '50%':  { opacity: '1' },
          '100%': { strokeDashoffset: '0', opacity: '0.7' }
        }
      },
      backdropBlur: {
        'nn': 'var(--nn-blur-bg)',
        'glass': 'var(--nn-blur-glass)'
      }
    },
  },
  plugins: [],
};
