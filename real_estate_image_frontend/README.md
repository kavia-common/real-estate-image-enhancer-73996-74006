# Real Estate Image Enhancer – Frontend

Next.js app providing:
- User registration and login (JWT)
- Batch image upload (drag-and-drop, up to 30 images)
- Before/After viewer with prompt input per image
- Edit history and progress polling
- Trial usage info on dashboard
- Subscription management and Stripe checkout redirect
- Sidebar layout with light, minimal theme

## Env Variables

Copy `.env.example` to `.env.local` and set:

- NEXT_PUBLIC_API_BASE_URL: Base URL of the FastAPI backend (e.g., http://localhost:8000)
- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: Stripe publishable key (client-side)

## Scripts

- dev: next dev
- build: next build
- start: next start

## Notes

- Backend endpoints follow interfaces/openapi.json in the backend container.
- Upload uses multipart/form-data at /api/images/upload.
- Checkout redirection uses /api/subscriptions/checkout-session, which returns a URL to navigate.
