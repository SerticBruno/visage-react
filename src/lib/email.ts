import nodemailer from 'nodemailer';
import { Resend } from 'resend';

let resendClient: Resend | null = null;

function getResendClient(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY is not configured');
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

export function isResendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

export function getResendFromAddress(): string {
  const email = process.env.RESEND_FROM_EMAIL ?? 'info@visagestudio.hr';
  return `VISAGE Studio <${email}>`;
}

export type SendEmailOptions = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
};

export async function sendEmail(options: SendEmailOptions): Promise<{ id: string }> {
  const { data, error } = await getResendClient().emails.send({
    from: options.from ?? getResendFromAddress(),
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
    replyTo: options.replyTo,
  });

  if (error) {
    throw error;
  }

  if (!data?.id) {
    throw new Error('Resend did not return an email id');
  }

  return { id: data.id };
}

/** Gmail — kontakt forma, potvrde narudžbi, narudžbe dobavljačima */
export function createMailTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
}

export function isEmailConfigured(): boolean {
  return Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);
}
