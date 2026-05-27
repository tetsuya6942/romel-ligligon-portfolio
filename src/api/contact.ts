import { ContactSubmission } from '../types';

export async function submitContact(data: { name: string; email: string; message: string }): Promise<{ success: boolean; data?: ContactSubmission; warning?: string }> {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to submit contact form');
  }
  return res.json();
}
