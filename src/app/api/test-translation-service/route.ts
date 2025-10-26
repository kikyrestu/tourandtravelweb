// Test dengan import translationService
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('🧪 Step 1: Test started');
    
    const body = await request.json();
    console.log('🧪 Step 2: Request body received:', body);
    
    // Test import prisma
    console.log('🧪 Step 3: Testing prisma import...');
    const prisma = await import('@/lib/prisma');
    console.log('🧪 Step 4: Prisma imported successfully');
    
    // Test import translationService
    console.log('🧪 Step 5: Testing translationService import...');
    const { translationService } = await import('@/lib/translation-service');
    console.log('🧪 Step 6: TranslationService imported successfully');
    
    // Test database query
    console.log('🧪 Step 7: Testing database query...');
    const section = await prisma.default.sectionContent.findUnique({
      where: { sectionId: 'hero' }
    });
    console.log('🧪 Step 8: Database query successful:', section?.title);
    
    return NextResponse.json({
      success: true,
      message: 'TranslationService import test successful',
      data: { sectionTitle: section?.title }
    });
  } catch (error) {
    console.error('❌ TranslationService import test failed:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
