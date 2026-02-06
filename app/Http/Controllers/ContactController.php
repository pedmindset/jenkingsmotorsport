<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\SponsorshipEnquiry;
use App\Models\ContactMessage;

class ContactController extends Controller
{
    public function show()
    {
        return Inertia::render('Contact');
    }

    public function storeSponsorship(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'company' => 'nullable|string|max:255',
            'interest_tier' => 'required|string',
            'message' => 'required|string',
        ]);

        SponsorshipEnquiry::create($validated);

        return redirect()->back()->with('success', 'Thank you for your sponsorship interest. Our team will contact you soon!');
    }

    public function storeContact(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        ContactMessage::create($validated);

        return redirect()->back()->with('success', 'Message sent successfully. We will get back to you shortly.');
    }
}
