/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			screens: {
				'xs': '475px',
				'sm': '640px',
				'md': '768px',
				'lg': '1024px',
				'xl': '1280px',
				'2xl': '1536px',
			},
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
				'128': '32rem',
			},
			maxWidth: {
				'8xl': '88rem',
				'9xl': '96rem',
			},
			zIndex: {
				'60': '60',
				'70': '70',
				'80': '80',
				'90': '90',
				'100': '100',
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						color: theme('colors.gray.900'),
						a: {
							color: theme('colors.blue.600'),
							'&:hover': {
								color: theme('colors.blue.700'),
							},
						},
					},
				},
				dark: {
					css: {
						color: theme('colors.gray.100'),
						a: {
							color: theme('colors.blue.400'),
							'&:hover': {
								color: theme('colors.blue.300'),
							},
						},
					},
				},
			}),
			colors: {
				background: {
					DEFAULT: '#f8fafc',
					dark: '#111827',
				},
				primary: {
					DEFAULT: '#3b82f6',
					foreground: '#ffffff',
				},
				secondary: {
					DEFAULT: '#f1f5f9',
					foreground: '#475569',
				},
				muted: {
					DEFAULT: '#94a3b8',
					foreground: '#64748b',
				},
				card: {
					DEFAULT: '#ffffff',
					dark: '#1e293b',
				},
				border: {
					DEFAULT: '#e2e8f0',
					dark: '#334155',
				},
			},
			borderRadius: {
				DEFAULT: '0.375rem',
				'sm': '0.25rem',
				'md': '0.375rem',
				'lg': '0.5rem',
				'xl': '0.75rem',
			},
			fontFamily: {
				sans: ['Poppins', 'sans-serif'],
			},
		},
	},
	darkMode: "class",
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/aspect-ratio'),
	],
};
