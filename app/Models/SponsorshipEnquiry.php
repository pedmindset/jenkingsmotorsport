<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SponsorshipEnquiry extends Model
{
    protected $fillable = [
        'name',
        'email',
        'company',
        'interest_tier',
        'message',
    ];
}
