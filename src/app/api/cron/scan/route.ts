import { NextResponse } from 'next/server';

export async function GET() {
  console.log('Scan triggered at:', new Date().toISOString());
  
  // Logic for scanning will go here
  
  return NextResponse.json({ 
    message: 'Scan triggered successfully',
    timestamp: new Date().toISOString() 
  });
}
