This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Contact form

The contact page lives at `/Contact` and posts to `POST /api/contact`, which sends
the message with [Nodemailer](https://nodemailer.com) over SMTP.

1. Copy `.env.example` to `.env.local`.
2. Fill in your SMTP credentials (`SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`,
   `SMTP_USER`, `SMTP_PASS`) and the inbox that receives the messages
   (`CONTACT_TO_EMAIL`, optional `CONTACT_FROM_EMAIL`).
3. Restart the dev server.

The endpoint accepts JSON (`{ "name", "email", "message" }`) or a standard HTML
form submission, validates the fields, and returns `{ ok, message, errors? }`.
Successful requests are forwarded with the sender set as `Reply-To`.

## Join Us form

The careers page lives at `/JoinUs` and posts to `POST /api/join`, which sends
applications through the same Nodemailer/SMTP setup as the contact form.

Set `JOIN_TO_EMAIL` to route applications to a dedicated inbox. When it is not
set, the endpoint falls back to `CONTACT_TO_EMAIL`.

The endpoint accepts JSON (`{ "name", "email", "phone", "state", "linkedin",
"portfolio" }`) or a standard HTML form submission. `linkedin` and `portfolio`
are optional; when provided they must be valid web addresses. Responses use the
same `{ ok, message, errors? }` shape as the contact endpoint.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
