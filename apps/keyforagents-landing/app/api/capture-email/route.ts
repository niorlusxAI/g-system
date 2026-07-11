import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = body.email;
    const domain = body.domain || 'unknown';
    const source = body.source || 'landing-page';

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    console.log('Waitlist signup:', { email, domain, source, timestamp: new Date().toISOString() });

    return NextResponse.json({
      success: true,
      message: 'Successfully joined the waitlist',
    });
  } catch (error: any) {
    console.error('Email capture error:', error);
    return NextResponse.json(
      { error: 'Failed to capture email' },
      { status: 500 }
    );
  }
}
