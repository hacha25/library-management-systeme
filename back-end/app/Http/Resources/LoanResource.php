<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LoanResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user' => $this->user->name,
            'book' => $this->book->title,
            'loan_date' => $this->loan_date,
            'due_date' => $this->due_date,
            'return_date' => $this->return_date,
            'status' => $this->status,
        ];
    }
}
