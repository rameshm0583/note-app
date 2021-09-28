<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    protected $fillable = ['title', 'description'];
    protected $casts = [
        'created_at' => "datetime:m-d-Y H:i:s A",
    ];
    public function  tags()
    {
        return $this->belongsToMany(Tag::class, 'note_tags');
    }
}
