import { NextRequest, NextResponse } from 'next/server';
import * as SibApiV3Sdk from '@getbrevo/brevo';

export async function POST(request: NextRequest) {
  try {
    const { subject, htmlContent, textContent } = await request.json();

    if (!subject || !htmlContent) {
      return NextResponse.json(
        { error: 'Naslov i HTML sadržaj su obavezni' },
        { status: 400 }
      );
    }

    // Initialize Brevo API client
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    
    // Configure API key authorization
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      console.error('BREVO_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Newsletter usluga nije konfigurirana' },
        { status: 500 }
      );
    }

    apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, apiKey);

    // Get all contacts from the list
    const contactsApi = new SibApiV3Sdk.ContactsApi();
    contactsApi.setApiKey(SibApiV3Sdk.ContactsApiApiKeys.apiKey, apiKey);

    const listId = process.env.BREVO_LIST_ID;
    if (!listId) {
      return NextResponse.json(
        { error: 'Lista pretplatnika nije konfigurirana' },
        { status: 500 }
      );
    }

    // Get contacts from the list
    const contacts = await contactsApi.getContactsFromList(parseInt(listId));
    const subscribers = contacts.body?.contacts || [];

    if (subscribers.length === 0) {
      return NextResponse.json(
        { error: 'Nema pretplatnika u listi' },
        { status: 400 }
      );
    }

    // Send email to each subscriber
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = htmlContent;
    sendSmtpEmail.textContent = textContent || htmlContent.replace(/<[^>]*>/g, '');
    sendSmtpEmail.sender = {
      name: 'VISAGE Studio',
      email: process.env.BREVO_SENDER_EMAIL || 'contact@visagestudio.hr'
    };

    // Send to all subscribers
    const toEmails = subscribers
      .filter(contact => contact.email) // Filter out contacts without email
      .map(contact => ({
        email: contact.email!,
        name: (contact.attributes as any)?.FIRSTNAME || contact.email
      }));

    sendSmtpEmail.to = toEmails;

    // Send email
    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);

    return NextResponse.json(
      { 
        message: `Newsletter je uspješno poslan ${subscribers.length} pretplatnicima`,
        sentTo: subscribers.length,
        messageId: result.body?.messageId || 'sent'
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Newsletter sending error:', error);
    
    return NextResponse.json(
      { error: 'Greška pri slanju newslettera. Molimo pokušajte ponovno.' },
      { status: 500 }
    );
  }
} 