<?php

namespace App\Http\Controllers;

use App\Http\Resources\LoanResource;
use App\Models\Book;
use App\Models\Loan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LoanController extends Controller
{
    public function index(Request $request){
        $query = Loan::with(['book', 'user']);

        // filter by status
        if ($request->status) {
            $query->where('status',$request->status);
        }
        // filter by user
        if($request->user_id) {
            $query->where('user_id', $request->user_id);
        }
        // filter by overdue
        if ($request->overdue == 1) {
            $query->where('status', 'borrowed')
                  ->whereDate('due_date', '<',now());
        }

        $loans = $query->paginate(10);

        return LoanResource::collection($loans);
    }

    public function show($id){
        return Loan::with(['book', 'user'])->findOrFail($id);
    }
    public function store(Request $request){
        $request->validate([
            'book_isbn' => 'required|exists:books,isbn',
        ]);
        return DB::transaction(function() use ($request) {
            $book = Book::lockForUpdate()->findOrFail($request->book_isbn);

            if($book->available <=0){
            return response()->json(['message' => 'Book not available'],400);
            };

            $alreadyBorrowed = Loan::where('user_id', $request->user()->id)
                            ->where('book_isbn', $request->book_isbn)
                            ->where('status', 'borrowed')
                            ->lockForUpdate()
                            ->exists();
            if($alreadyBorrowed){
                return response()->json(['message' => 'You have already borrowed this book'],400);
            }

            $loan = Loan::create([
                'user_id' => $request->user()->id,
                'book_isbn' => $request->book_isbn,
                'loan_date' => now(),
                'due_date' => now()->addDays(14),
                'status' => 'borrowed'
            ]);
            $book->decrement('available');

            return response()->json($loan, 201);
        });
    }

    public function returnBook($id){
        return DB::transaction(function() use ($id){
            $loan = Loan::lockForUpdate()->findOrFail($id);
        if($loan->status == 'returned'){
            return response()->json(['message' => "Book already returned"],400);
        }

        $loan->update([
            'return_date' => now(),
            'status' => 'returned'
        ]);
        $loan->book->lockForUpdate()->increment('available');

        return response()->json(['message' => "Book returned successfully"]);

        });
    }
    public function overdue(){
        $overdueLoans = Loan::where('status', 'borrowed')
                            ->where('due_date', '<',now())
                            ->with(['book','user'])
                            ->get();
        return response()->json($overdueLoans);
    }
}
