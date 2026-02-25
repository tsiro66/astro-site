import type { APIRoute } from 'astro';
import { Resend } from 'resend';

// Initialize Resend with your API Key from .env
const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');

    // Basic validation
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Flux Contact <onboarding@resend.dev>',
      to: ['info@flux-web.com'],
      subject: `New Project Lead: ${name}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    if (error) {
      return new Response(JSON.stringify({ message: error.message }), { status: 400 });
    }

    return new Response(JSON.stringify({ message: 'Email sent!' }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
};