import { NextResponse } from 'next/server';
import db from '../../../mock-api/db.json';

export async function GET() {
  return NextResponse.json(db.courses);
}
