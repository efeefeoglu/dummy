import { NextResponse } from 'next/server';
import { getContent, updateContent, ContentData } from '@/lib/data';

export async function GET() {
  try {
    const data = getContent();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body: ContentData = await request.json();
    updateContent(body);
    return NextResponse.json({ success: true, message: 'Content updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
  }
}
