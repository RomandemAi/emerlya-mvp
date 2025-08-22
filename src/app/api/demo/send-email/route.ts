import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: NextRequest) {
  try {
    // Check if Resend is configured
    if (!resend) {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 503 }
      );
    }

    const { email, brandName, brandVoice, contentType, prompt, generatedContent } = await request.json();

    // Validate required fields
    if (!email || !brandName || !generatedContent) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Create email content
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your AI-Generated Content from Emerlya AI</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8fafc; }
            .container { max-width: 600px; margin: 0 auto; background-color: white; }
            .header { background: linear-gradient(135deg, #1e40af 0%, #7c3aed 100%); color: white; padding: 30px; text-align: center; }
            .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
            .content { padding: 30px; }
            .brand-info { background-color: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .generated-content { background-color: #fefefe; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0; white-space: pre-wrap; font-family: Georgia, serif; line-height: 1.7; }
            .footer { background-color: #1e40af; color: white; padding: 20px; text-align: center; font-size: 14px; }
            .cta-button { display: inline-block; background: linear-gradient(135deg, #7c3aed 0%, #1e40af 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 500; }
            .divider { height: 1px; background-color: #e2e8f0; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">Emerlya AI</div>
              <p>Your AI-Generated Content is Ready!</p>
            </div>
            
            <div class="content">
              <h2>Hello there! 👋</h2>
              <p>Thank you for trying our AI content generation demo. Here's the content we created based on your brand profile:</p>
              
              <div class="brand-info">
                <h3>Brand Profile</h3>
                <p><strong>Brand Name:</strong> ${brandName}</p>
                <p><strong>Brand Voice:</strong> ${brandVoice}</p>
                <p><strong>Content Type:</strong> ${contentType}</p>
                <p><strong>Prompt:</strong> ${prompt}</p>
              </div>
              
              <h3>Generated Content</h3>
              <div class="generated-content">${generatedContent}</div>
              
              <div class="divider"></div>
              
              <p>Impressed with what you see? Our AI can create unlimited content like this, perfectly tailored to your brand's unique voice and style.</p>
              
              <div style="text-align: center;">
                <a href="https://emerlya.com/login" class="cta-button">Start Creating Your Own Content</a>
              </div>
              
              <p><strong>What you get with Emerlya AI:</strong></p>
              <ul>
                <li>✨ Unlimited AI-generated content</li>
                <li>🎯 Perfect brand voice consistency</li>
                <li>⚡ Lightning-fast content creation</li>
                <li>📱 Support for all content types</li>
                <li>🔒 Enterprise-grade security</li>
              </ul>
              
              <p>Questions? Reply to this email or contact us at <a href="mailto:hello@emerlya.com">hello@emerlya.com</a></p>
            </div>
            
            <div class="footer">
              <p>© 2025 Emerlya AI. All rights reserved.</p>
              <p>Intelligent content generation for modern teams.</p>
              <p>
                <a href="https://emerlya.com/privacy" style="color: #a5b4fc;">Privacy Policy</a> | 
                <a href="https://emerlya.com/terms" style="color: #a5b4fc;">Terms of Service</a>
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'hello@emerlya.com',
      to: [email],
      subject: `Your AI-Generated Content from ${brandName} | Emerlya AI Demo`,
      html: emailHtml,
    });

    return NextResponse.json({ success: true, messageId: data.data?.id });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
