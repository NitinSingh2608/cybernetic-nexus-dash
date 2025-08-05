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
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
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
					foreground: 'hsl(var(--accent-foreground))',
					glow: 'hsl(var(--accent-glow))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Cyberpunk Neon Colors
				neon: {
					cyan: 'hsl(var(--neon-cyan))',
					'cyan-glow': 'hsl(var(--neon-cyan-glow))',
					purple: 'hsl(var(--neon-purple))',
					'purple-glow': 'hsl(var(--neon-purple-glow))',
					pink: 'hsl(var(--neon-pink))',
					'pink-glow': 'hsl(var(--neon-pink-glow))',
					green: 'hsl(var(--neon-green))',
					'green-glow': 'hsl(var(--neon-green-glow))',
					orange: 'hsl(var(--neon-orange))',
					'orange-glow': 'hsl(var(--neon-orange-glow))',
					blue: 'hsl(var(--neon-blue))',
					'blue-glow': 'hsl(var(--neon-blue-glow))'
				}
			},
			fontFamily: {
				'orbitron': ['Orbitron', 'monospace'],
				'rajdhani': ['Rajdhani', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
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
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
				'float': 'float 3s ease-in-out infinite',
				'glow-rotate': 'glow-rotate 3s linear infinite',
				'slide-in-right': 'slide-in-right 0.5s ease-out',
				'fade-in-up': 'fade-in-up 0.6s ease-out'
			},
			backdropBlur: {
				'xs': '2px',
			},
			boxShadow: {
				'neon-cyan': 'var(--shadow-neon-cyan)',
				'neon-purple': 'var(--shadow-neon-purple)',
				'neon-pink': 'var(--shadow-neon-pink)',
				'glass': 'var(--shadow-glass)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
