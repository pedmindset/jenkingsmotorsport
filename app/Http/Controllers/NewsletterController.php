<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NewsletterController extends Controller
{
    public function subscribe(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|unique:newsletter_subscriptions,email',
        ]);

        \App\Models\NewsletterSubscription::create([
            'email' => $validated['email'],
            'subscribed_at' => now(),
            'is_active' => true,
        ]);

        return back()->with('success', 'You have successfully subscribed to our newsletter!');
    }
}
