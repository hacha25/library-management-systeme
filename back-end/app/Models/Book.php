<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;
    protected $primaryKey = 'isbn';
    protected $autoIncrement = false;
    protected $keyType = 'string';
    protected $cast = [
        'published_date' => 'date',
    ];

    protected $fillable = ['isbn','title', 'author','category_name','published_date','quantity','available', 'image'];
    
    public function loans(){
        return $this->hasMany(Loan::class,'book_isbn','isbn');
    }
    //
}
