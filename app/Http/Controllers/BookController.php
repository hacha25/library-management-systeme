<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use App\Http\Resources\BookResource;

class BookController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('admin',except:['index', 'show'])
        ];
    }
    public function index(Request $request){
        $query = Book::query();
        // filter by category
        if($request->category) {
            $query->where('category_name', $request->category);
        }
        // filter by title
        if($request->search) {
            $query->where('title', 'like','%'.$request->search.'%');
        }
        // filter by author
        if($request->author) {
            $query->where('author', "like","%".$request->author."%");
        }
        $books = $query->paginate(10);
        return BookResource::collection($books);
    }

    public function store(Request $request){
        $request->validate([
            'isbn' => 'required|unique:books,isbn',
            'title' => 'required',
            'author' => 'required',
            'category_name' => 'required',
            'published_date' => 'nullable|date',
            'quantity' => 'required|integer|min:1',
        ]);
        $book = Book::create([
            'isbn' => $request->isbn,
            'title' => $request->title,
            'author' => $request->author,
            'category_name' => $request->category_name,
            'published_date' => $request->published_date,
            'quantity' => $request->quantity,
            'available' => $request->quantity,
        ]);
        return response()->json($book, 201);
    }

    public function show($isbn){
        $book = Book::findOrFail($isbn);
        return response()->json([$book]);
    }

    public function update(Request $request, $isbn){
        $book = Book::findOrFail($isbn);
        $request->validate([
            'title' => 'required',
            'author' => 'required',
            'category_name' => 'required',
            'published_date' => 'nullable|date',
            'quantity' => 'required|integer|min:1',
        ]);
        $book->update($request->only([
            'title', 'author', 'category_name', 'published_date', 'quantity', 'available'
        ]));
        return response()->json($book);
    }

    public function destroy($isbn){
        $book = Book::findOrFail($isbn);
        $book->delete();
        return response()->json(null, 204);
    }
}
