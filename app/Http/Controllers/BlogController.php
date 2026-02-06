<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index()
    {
        return Inertia::render('Blog', [
            'posts' => BlogPost::with(['category', 'tags'])
                ->whereNotNull('published_at')
                ->where('published_at', '<=', now())
                ->orderBy('published_at', 'desc')
                ->get()
                ->map(fn($post) => $this->transformPost($post)),
        ]);
    }

    public function showByCategory(Category $category)
    {
        return Inertia::render('Blog', [
            'posts' => $category->posts()
                ->whereNotNull('published_at')
                ->where('published_at', '<=', now())
                ->orderBy('published_at', 'desc')
                ->get()
                ->map(fn($post) => $this->transformPost($post)),
            'filter' => ['type' => 'Category', 'name' => $category->name],
        ]);
    }

    public function showByTag(Tag $tag)
    {
        return Inertia::render('Blog', [
            'posts' => $tag->posts()
                ->whereNotNull('published_at')
                ->where('published_at', '<=', now())
                ->orderBy('published_at', 'desc')
                ->get()
                ->map(fn($post) => $this->transformPost($post)),
            'filter' => ['type' => 'Tag', 'name' => $tag->name],
        ]);
    }

    public function show($slug)
    {
        $post = BlogPost::with(['category', 'tags'])
            ->where('slug', $slug)
            ->whereNotNull('published_at')
            ->firstOrFail();

        return Inertia::render('BlogPost', [
            'post' => $this->transformPost($post, true),
        ]);
    }

    private function transformPost($post, $full = false)
    {
        $data = [
            'id' => $post->id,
            'title' => $post->title,
            'slug' => $post->slug,
            'excerpt' => $post->excerpt,
            'image_path' => $post->image_path,
            'published_at' => $post->published_at->format('M d, Y'),
            'category' => $post->category ? ['name' => $post->category->name, 'slug' => $post->category->slug] : null,
            'tags' => $post->tags->map(fn($tag) => ['name' => $tag->name, 'slug' => $tag->slug]),
        ];

        if ($full) {
            $data['content'] = $post->content;
            $data['video_url'] = $post->video_url;
            $data['is_featured'] = $post->is_featured;
        }

        return $data;
    }
}
