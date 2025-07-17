import { NextRequest, NextResponse } from 'next/server';
import * as SibApiV3Sdk from '@getbrevo/brevo';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email adresa je obavezna' },
        { status: 400 }
      );
    }

    // Initialize Brevo API client
    const apiInstance = new SibApiV3Sdk.ContactsApi();
    
    // Configure API key authorization
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      console.error('BREVO_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Newsletter usluga nije konfigurirana' },
        { status: 500 }
      );
    }

    apiInstance.setApiKey(SibApiV3Sdk.ContactsApiApiKeys.apiKey, apiKey);

    // First, check if contact already exists
    try {
      const existingContact = await apiInstance.getContactInfo(email);
      if (existingContact.body) {
        // Contact exists, check if already in the list
        const listId = process.env.BREVO_LIST_ID;
        if (listId && existingContact.body.listIds?.includes(parseInt(listId))) {
          return NextResponse.json(
            { error: 'Ova email adresa je već pretplaćena na naš newsletter' },
            { status: 400 }
          );
        }
      }
    } catch (getError: any) {
      // Contact doesn't exist, which is fine - we'll create it
      console.log('Contact not found, will create new one');
    }

    // Create contact data
    const createContact = new SibApiV3Sdk.CreateContact();
    createContact.email = email;
    
    // Only add listIds if BREVO_LIST_ID is configured
    const listId = process.env.BREVO_LIST_ID;
    if (listId) {
      createContact.listIds = [parseInt(listId)];
    }
    
    createContact.updateEnabled = true;

    // Add contact to Brevo
    const result = await apiInstance.createContact(createContact);

    return NextResponse.json(
      { 
        message: 'Uspješno ste se pretplatili na newsletter',
        contactId: result.body?.id || 'subscribed'
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Newsletter subscription error:', error);
    console.error('Error details:', {
      code: error.code,
      message: error.message,
      response: error.response?.data,
      body: error.body
    });
    
    // Handle specific Brevo errors
    if (error.code === 400) {
      const errorMessage = error.message || error.response?.data?.message || error.body?.message || '';
      const lowerMessage = errorMessage.toLowerCase();
      
      if (lowerMessage.includes('contact already exists') || 
          lowerMessage.includes('already exists') ||
          lowerMessage.includes('duplicate') ||
          lowerMessage.includes('already in list')) {
        return NextResponse.json(
          { error: 'Ova email adresa je već pretplaćena na naš newsletter' },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { error: 'Neispravna email adresa ili zahtjev' },
        { status: 400 }
      );
    }

    if (error.code === 401) {
      return NextResponse.json(
        { error: 'Greška pri autentifikaciji newsletter usluge' },
        { status: 500 }
      );
    }

    // Check if it's a 409 conflict (duplicate)
    if (error.code === 409) {
      return NextResponse.json(
        { error: 'Ova email adresa je već pretplaćena na naš newsletter' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Greška pri pretplati na newsletter. Molimo pokušajte ponovno.' },
      { status: 500 }
    );
  }
} 