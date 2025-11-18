import type { APIRoute } from 'astro';
import { db, Waitlist } from 'astro:db';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const emailValue = formData.get('email');
  const email = typeof emailValue === 'string' ? emailValue.trim().toLowerCase() : '';

  if (!email) {
    return new Response('Email is required', { status: 400 });
  }

  try {
    await db.insert(Waitlist).values({
      email,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error('Failed to insert waitlist entry', error);
    // Ignore duplicates or other DB errors for now to avoid leaking details.
  }

  return new Response(null, {
    status: 303,
    headers: {
      // Redirect back to the homepage, preserving a flag so we can show a confirmation.
      Location: '/?joined=waitlist#cta',
    },
  });
};
