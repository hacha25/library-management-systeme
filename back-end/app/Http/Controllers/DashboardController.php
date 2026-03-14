<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Loan;
use App\Models\User;
use Illuminate\Http\Request;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function stats() {
        $totalBooks = Book::count();
        $totalUsers = User::count();
        $borrowedBooks = Loan::where('status', 'borrowed')->count();    
        $overdueLoans = Loan::where('status','borrowed')
                            ->where('due_date',"<",Carbon::now())->count();
        return response()->json([
            "total_books" => $totalBooks,
            "total_users" => $totalUsers,
            "borrowed_books" => $borrowedBooks,
            "overdue_loans" => $overdueLoans
        ]);

    }
}
