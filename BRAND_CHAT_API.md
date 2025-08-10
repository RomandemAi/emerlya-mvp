# Brand Chat API Documentation

The Brand Chat system provides three main API endpoints for creating conversational AI experiences that maintain brand consistency and context across multiple conversation threads.

## Overview

The chat system consists of:
- **Thread Management**: Create new conversation threads
- **Message Processing**: Send messages with full brand context and memory
- **Summarization**: Generate conversation summaries for long-term context

## Prerequisites

1. **Database Tables**: The following tables must exist in Supabase:
   - `brand_chat_threads`
   - `brand_chat_messages` 
   - `brand_chat_embeddings`
   - `brand_chat_summaries`
   - `brand_memory`
   - `brand_settings`

2. **Environment Variables** (optional - defaults provided):
   ```
   MODEL_CHAT=gpt-4o              # Chat model (default: gpt-4o)
   MODEL_SUMMARY=gpt-4o           # Summary model (default: gpt-4o)
   EMBEDDING_MODEL=text-embedding-3-small  # Embedding model (default: text-embedding-3-small)
   ```

## API Endpoints

### 1. Start New Chat Thread

**Endpoint**: `POST /api/brand/chat/start`

**Purpose**: Create a new conversation thread for a specific brand.

**Request Body**:
```json
{
  "brandId": "uuid-string-here",
  "title": "Optional conversation title"
}
```

**Response**:
```json
{
  "ok": true,
  "threadId": "uuid-of-new-thread"
}
```

**Error Response**:
```json
{
  "ok": false,
  "error": "Error description"
}
```

### 2. Send Chat Message

**Endpoint**: `POST /api/brand/chat/send`

**Purpose**: Send a message in an existing thread and receive an AI response that maintains brand consistency.

**Request Body**:
```json
{
  "brandId": "uuid-string-here",
  "threadId": "uuid-string-here", 
  "userMessage": "Your message here",
  "type": "post",           // Optional: content type (default: "post")
  "wordCount": 120          // Optional: target word count (default: 120)
}
```

**Response**:
```json
{
  "ok": true,
  "content": "AI-generated response content",
  "tokensUsed": 450,
  "messageId": "uuid-of-assistant-message"
}
```

**What Happens**:
1. Validates thread ownership via RLS
2. Inserts user message to database
3. Fetches brand context:
   - Brand persona configuration
   - Brand memory (key facts, ordered by importance)
   - Thread summary (if exists)
   - Pinned messages in chronological order
   - Last 15 recent messages
4. Builds enhanced system prompt with brand personality + memory
5. Calls OpenAI with complete context
6. Saves assistant response
7. Creates embeddings for both user and assistant messages
8. Updates thread timestamp

### 3. Summarize Conversation

**Endpoint**: `POST /api/brand/chat/summarize`

**Purpose**: Generate a concise summary of the entire conversation thread for future context.

**Request Body**:
```json
{
  "threadId": "uuid-string-here"
}
```

**Response**:
```json
{
  "ok": true,
  "summary": "Generated conversation summary (≤250 words)",
  "messageCount": 15,
  "lastMessageId": "uuid-of-last-message"
}
```

**What Happens**:
1. Validates thread access via RLS
2. Fetches all messages in chronological order
3. Generates ≤250 word summary using MODEL_SUMMARY
4. Upserts summary to `brand_chat_summaries` table
5. Returns summary with metadata

## Context Management

The chat system intelligently manages context to provide relevant, brand-consistent responses:

### Brand Context Layers
1. **Brand Persona**: JSON configuration defining voice, tone, and personality
2. **Brand Memory**: Key facts ranked by importance (1-5 scale)
3. **Thread Summary**: Condensed conversation history for long threads
4. **Pinned Messages**: Important messages marked for always including
5. **Recent Messages**: Last 15 messages for immediate context

### Token Optimization
- Summaries are reused instead of full message history for long threads
- Pinned messages are prioritized over recent messages
- Brand memory is filtered by importance score
- Smart truncation prevents token limit issues

## Security

- **Authentication**: All endpoints require valid Supabase session
- **Authorization**: Row Level Security (RLS) ensures users can only access their own brand data
- **Validation**: Brand ownership is validated on every request

## Usage Examples

### Basic Chat Flow
```javascript
// 1. Start new conversation
const startResponse = await fetch('/api/brand/chat/start', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    brandId: 'your-brand-id',
    title: 'Marketing Discussion'
  })
});
const { threadId } = await startResponse.json();

// 2. Send message
const chatResponse = await fetch('/api/brand/chat/send', {
  method: 'POST', 
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    brandId: 'your-brand-id',
    threadId: threadId,
    userMessage: 'Create a social media post about our new product',
    type: 'social-post',
    wordCount: 50
  })
});
const { content } = await chatResponse.json();

// 3. Summarize (optional, for long conversations)
const summaryResponse = await fetch('/api/brand/chat/summarize', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ threadId: threadId })
});
const { summary } = await summaryResponse.json();
```

### Advanced Configuration
```javascript
// Set custom models via environment variables
process.env.MODEL_CHAT = 'gpt-4o-mini';      // Faster, cheaper
process.env.MODEL_SUMMARY = 'gpt-4o';        // Higher quality summaries
```

## Error Handling

All endpoints return standardized error responses:

```json
{
  "ok": false,
  "error": "Descriptive error message"
}
```

Common error codes:
- `401`: Unauthorized (no valid session)
- `400`: Bad request (missing required fields)
- `403`: Forbidden (brand access denied)
- `500`: Internal server error

## Best Practices

1. **Thread Management**: Create new threads for distinct conversation topics
2. **Summarization**: Summarize threads after 20+ messages to maintain context
3. **Error Handling**: Always check the `ok` field in responses
4. **Rate Limiting**: Consider implementing rate limiting for production use
5. **Monitoring**: Log token usage for cost tracking

## Integration Notes

- The chat system integrates with existing brand personality configurations
- Embeddings are automatically generated for semantic search capabilities
- Thread summaries help maintain context across long conversations
- Brand memory system allows for persistent facts across all threads
