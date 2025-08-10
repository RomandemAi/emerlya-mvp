# CORA Blog Management System

This document outlines the complete blog management system implemented for CORA, allowing users to create, manage, and publish brand-specific blog posts.

## Overview

The blog system enables:
- Create, read, update, delete (CRUD) operations for blog posts
- Brand-specific blog management
- Draft and published status management
- Tag-based organization
- SEO optimization fields
- Author type tracking (manual vs AI-generated)

## Database Schema

### Table: `brand_blog_posts`

```sql
CREATE TABLE brand_blog_posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  brand_id uuid NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL,
  excerpt text,
  tags text[] DEFAULT '{}',
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  author_type text DEFAULT 'manual' CHECK (author_type IN ('manual', 'ai-generated')),
  topic text,
  seo_title text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

**Key Features:**
- Automatic UUID generation for IDs
- Foreign key relationship to brands table with CASCADE delete
- Status constraints (draft/published)
- Author type tracking (manual/ai-generated)
- Automatic timestamps
- Array support for tags
- SEO optimization fields

**Indexes:**
- Primary key on `id`
- Index on `brand_id` for efficient brand-specific queries
- Index on `status` for filtering
- Index on `created_at` for chronological ordering

## API Endpoints

### 1. Create Blog Post
**Endpoint:** `POST /api/brand/blog/create`

**Request Body:**
```json
{
  "brand_id": "uuid",
  "title": "string (required)",
  "content": "string (required)",
  "tags": ["string", "string"],
  "status": "draft|published",
  "seo_title": "string",
  "excerpt": "string",
  "author_type": "manual|ai-generated"
}
```

**Response:**
```json
{
  "success": true,
  "blog_post": {
    "id": "uuid",
    "brand_id": "uuid",
    "title": "string",
    "content": "string",
    // ... other fields
  }
}
```

### 2. List Blog Posts
**Endpoint:** `GET /api/brand/blog/list`

**Query Parameters:**
- `brand_id` (required): UUID of the brand
- `status` (optional): Filter by status (draft/published)
- `limit` (optional): Number of posts to return (default: 50)
- `offset` (optional): Pagination offset (default: 0)

**Response:**
```json
{
  "success": true,
  "blog_posts": [
    {
      "id": "uuid",
      "brand_id": "uuid",
      "title": "string",
      // ... other fields
    }
  ],
  "pagination": {
    "total": 25,
    "limit": 50,
    "offset": 0,
    "has_more": false
  }
}
```

### 3. Update Blog Post
**Endpoint:** `PUT /api/brand/blog/update`

**Request Body:**
```json
{
  "post_id": "uuid (required)",
  "title": "string (optional)",
  "content": "string (optional)",
  "tags": ["string"] (optional),
  "status": "draft|published (optional)",
  "seo_title": "string (optional)",
  "excerpt": "string (optional)"
}
```

### 4. Publish Blog Post
**Endpoint:** `POST /api/brand/blog/publish`

**Request Body:**
```json
{
  "post_id": "uuid"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Blog post published successfully",
  "blog_post": {
    // updated blog post data
  }
}
```

### 5. Delete Blog Post
**Endpoint:** `DELETE /api/brand/blog/delete`

**Request Body:**
```json
{
  "post_id": "uuid"
}
```

## Frontend Components

### BlogCreateModal Component

**Location:** `src/components/BlogCreateModal.tsx`

**Features:**
- Full form for blog post creation
- Real-time word count
- Status selection (draft/published)
- Tag management (comma-separated)
- SEO title field
- Excerpt field
- Error handling and loading states
- Form validation

**Props:**
```typescript
interface BlogCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  brandId: string;
  brandName: string;
}
```

## TypeScript Types

**Location:** `src/lib/types.ts`

```typescript
export interface BlogPost {
  id: string;
  brand_id: string;
  title: string;
  content: string;
  excerpt?: string;
  tags: string[];
  status: 'draft' | 'published';
  author_type: 'manual' | 'ai-generated';
  topic?: string;
  seo_title?: string;
  created_at: string;
  updated_at: string;
}

export interface BlogPostCreate {
  brand_id: string;
  title: string;
  content?: string;
  topic?: string;
  tags?: string[];
  status?: 'draft' | 'published';
  author_type?: 'manual' | 'ai-generated';
  seo_title?: string;
  excerpt?: string;
}

export interface BlogPostUpdate {
  title?: string;
  content?: string;
  tags?: string[];
  status?: 'draft' | 'published';
  seo_title?: string;
  excerpt?: string;
}
```

## Security Features

### Authentication & Authorization
- All endpoints require user authentication
- Brand ownership verification on all operations
- Row Level Security (RLS) policies in Supabase
- Proper error handling for unauthorized access

### Input Validation
- Required field validation
- Status value constraints at database level
- Author type constraints at database level
- Proper error messages for validation failures

## Future Enhancements

### AI Blog Generation
The system is prepared for AI-powered blog generation:
- `author_type` field to track AI vs manual posts
- `topic` field for AI prompt storage
- Placeholder for blog generator integration

**Future Implementation:**
```typescript
// src/lib/blog-generator.ts
export async function generateBlogPost(params: {
  brand_id: string;
  topic: string;
  tags?: string[];
  target_word_count?: number;
}): Promise<{
  content: string;
  tags: string[];
  seo_title: string;
}> {
  // AI generation logic
}
```

### Additional Features to Consider
1. **Blog Categories:** Add category taxonomy
2. **Media Management:** Image upload and embedding
3. **SEO Analysis:** Content optimization scoring
4. **Publishing Schedule:** Scheduled publishing
5. **Comments System:** Reader engagement
6. **Analytics Integration:** Performance tracking
7. **Export Features:** PDF/Word export
8. **Template System:** Reusable blog templates

## Usage Example

```typescript
// Create a new blog post
const createBlogPost = async () => {
  const response = await fetch('/api/brand/blog/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      brand_id: 'brand-uuid',
      title: 'My First Blog Post',
      content: 'This is the content of my blog post...',
      tags: ['technology', 'innovation'],
      status: 'draft',
      author_type: 'manual'
    })
  });
  
  const data = await response.json();
  console.log('Created blog post:', data.blog_post);
};

// List blog posts for a brand
const listBlogPosts = async () => {
  const response = await fetch(`/api/brand/blog/list?brand_id=brand-uuid&status=published&limit=10`);
  const data = await response.json();
  console.log('Blog posts:', data.blog_posts);
};
```

## Migration Applied

The blog system database schema has been applied via migration:
- **File:** `supabase/migrations/20250810180000_blog_posts.sql`
- **Status:** ✅ Applied
- **Includes:** Table creation, indexes, RLS policies

## Files Created/Modified

### New Files
- `supabase/migrations/20250810180000_blog_posts.sql`
- `src/lib/blog-generator.ts` (placeholder for future AI integration)
- `src/app/api/brand/blog/create/route.ts`
- `src/app/api/brand/blog/list/route.ts`
- `src/app/api/brand/blog/publish/route.ts`
- `src/app/api/brand/blog/update/route.ts`
- `src/app/api/brand/blog/delete/route.ts`
- `src/components/BlogCreateModal.tsx`

### Modified Files
- `src/lib/types.ts` (added blog-related interfaces)

The blog management system is now fully functional and ready for use! 🎉
