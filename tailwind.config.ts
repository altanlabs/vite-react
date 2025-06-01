import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

/**
 * Tailwind CSS Configuration
 * 
 * This configuration extends Tailwind's default theme with custom design tokens,
 * animations, and utilities. It's designed to work with the project's design system
 * and supports dark mode via the 'class' strategy.
 */
const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    './src/features/**/*.{ts,tsx}',
    './src/layouts/**/*.{ts,tsx}',
    './src/styles/**/*.css',
  ],
  prefix: '',
  
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    // Modern typography scale
    fontSize: {
      'xs': ['0.75rem', { lineHeight: '1rem' }],
      'sm': ['0.875rem', { lineHeight: '1.25rem' }],
      'base': ['1rem', { lineHeight: '1.5rem' }],
      'lg': ['1.125rem', { lineHeight: '1.75rem' }],
      'xl': ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },
    // Modern font families
    fontFamily: {
      sans: ['Inter Variable', 'Inter', 'system-ui', 'sans-serif'],
      heading: ['Inter Variable', 'Inter', 'system-ui', 'sans-serif'],
      mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
    },
    extend: {
      // Font families
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        heading: ['var(--font-heading)', ...fontFamily.sans],
        mono: ['var(--font-mono)', ...fontFamily.mono],
      },
      
      // Color palette using CSS variables for theming
      colors: {
        // Base colors
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        
        // Primary color palette
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          light: 'hsl(var(--primary-light))',
          dark: 'hsl(var(--primary-dark))',
        },
        
        // Secondary color palette
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        
        // Destructive/error states
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        
        // Muted/disabled states
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        
        // Accent colors
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        
        // Popover components (dropdowns, tooltips, etc.)
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        
        // Card components
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        
        // Sidebar specific theming
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
        
        // Status colors
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
        },
        info: {
          DEFAULT: 'hsl(var(--info))',
          foreground: 'hsl(var(--info-foreground))',
        },
      },
      
      // Border radius variables
      borderRadius: {
        none: '0px',
        xs: '0.125rem',
        sm: '0.25rem',
        DEFAULT: '0.375rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        full: '9999px',
        // Custom radius using CSS variables
        'custom': 'var(--radius)',
        'custom-sm': 'calc(var(--radius) - 4px)',
        'custom-md': 'calc(var(--radius) - 2px)',
        'custom-lg': 'var(--radius)'
      },
      
      // Animation keyframes
      keyframes: {
        // Accordion animations
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        // Fade in/out
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        // Slide in/out
        'slide-in': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      
      // Animation utilities
      animation: {
        // Accordion
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        // Fade
        'fade-in': 'fade-in 0.2s ease-out',
        'fade-out': 'fade-out 0.2s ease-out',
        // Slide
        'slide-in': 'slide-in 0.3s ease-out',
      },
      
      // Custom box shadow
      boxShadow: {
        // Standard shadows
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'DEFAULT': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
        // Custom shadows
        'card': '0 2px 4px 0 rgb(0 0 0 / 0.05)',
        'dropdown': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'modal': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      },
      
      // Custom spacing scale
      spacing: {
        '4.5': '1.125rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
        '46': '11.5rem',
        '50': '12.5rem',
      },
      
      // Custom transition timing
      transitionTimingFunction: {
        'in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      
      // Custom z-index scale
      zIndex: {
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        'dropdown': '1000',
        'sticky': '1020',
        'fixed': '1030',
        'modal-backdrop': '1040',
        'offcanvas': '1050',
        'modal': '1060',
        'popover': '1070',
        'tooltip': '1080',
        'toast': '1090',
      },
    },
  },
  
  // Core plugins configuration
  corePlugins: {
    // Disable container by default to use our custom container component
    container: false,
  },
  
  // Plugin configurations
  plugins: [
    require('@tailwindcss/typography')({
      className: 'prose',
      target: 'modern',
      cssExtend: {
        'h1, h2, h3, h4, h5, h6': {
          fontWeight: '700',
          lineHeight: '1.2',
          marginTop: '1.5em',
          marginBottom: '0.5em',
        },
        'p, ul, ol, blockquote, pre, hr, table, iframe': {
          marginTop: '1.25em',
          marginBottom: '1.25em',
        },
        'a': {
          textDecoration: 'underline',
          textUnderlineOffset: '0.2em',
          textDecorationThickness: '1px',
          transition: 'all 0.2s ease',
        },
        'a:hover': {
          textDecorationThickness: '2px',
        },
        'code::before, code::after': {
          content: 'none',
        },
        'code': {
          fontWeight: '500',
          padding: '0.2em 0.4em',
          borderRadius: '0.25rem',
        },
      },
    }),
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    require('tailwindcss-animate'),
    
    // Custom plugins can be added here
    function ({ addVariant }) {
      // Add a 'not-last' variant
      addVariant('not-last', '&:not(:last-child)');
      // Add a 'hocus' variant for hover and focus states
      addVariant('hocus', ['&:hover', '&:focus']);
      // Add a 'supports-grid' variant
      addVariant('supports-grid', '@supports (display: grid)');
    },
  ],
  
  // Future features to enable by default
  future: {
    hoverOnlyWhenSupported: true,
    respectDefaultRingColorOpacity: true,
    disableColorOpacityUtilitiesByDefault: true,
  },
  
  // Experimental features
  experimental: {
    optimizeUniversalDefaults: true,
  },
};

export default config;