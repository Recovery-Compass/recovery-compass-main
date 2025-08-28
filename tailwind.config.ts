import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Recovery Compass Brand Colors - Refined 2025
				'deep-ocean': '#045295', // Primary backgrounds, headers
				'midnight-foundation': '#101534', // Deep backgrounds, contrast
				'compass-gold': '#D4AF37', // CTAs, highlights, accents
				'tree-copper': '#B87333', // Metallic accents, premium touches
				'moon-glow': '#F5F5DC', // Text on dark, clean contrast
				// Legacy support for existing components
				navy: '#101534',
				bronze: '#D4AF37',
				teal: '#148D8D',
				gold: '#D4AF37',
				moonlight: '#F5F5DC',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: ['Atkinson Hyperlegible', 'system-ui', '-apple-system', 'sans-serif'], // Primary body font
				body: ['Atkinson Hyperlegible', 'system-ui', '-apple-system', 'sans-serif'],
				heading: ['Montserrat', 'sans-serif'],
			},
			// Enhanced spacing for larger logos
			spacing: {
				'72': '18rem',
				'80': '20rem',
				'96': '24rem',
				'128': '32rem',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'gentle-pulse': {
					'0%, 100%': { opacity: '0.9' },
					'50%': { opacity: '1', filter: 'brightness(1.1)' },
				},
				'subtle-sway': {
					'0%, 100%': { transform: 'rotate(-1deg)' },
					'50%': { transform: 'rotate(1deg)' },
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'logo-enhance': {
					'0%': { transform: 'scale(1)', filter: 'brightness(1)' },
					'100%': { transform: 'scale(1.02)', filter: 'brightness(1.1) contrast(1.1)' },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 1s ease-out forwards',
				'delayed-fade': 'fade-in 1.5s ease-out 1s forwards',
				'gentle-pulse': 'gentle-pulse 4s infinite',
				'subtle-sway': 'subtle-sway 6s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'logo-enhance': 'logo-enhance 0.3s ease-out forwards',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;