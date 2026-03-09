<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index(){
        return Category::all();
    }

    public function store(Request $request){
        $request->validate([
            'name' => 'required|unique:categories,name',
        ]);
        $category = Category::create([
            'name' => $request->name,
        ]);
        return response()->json($category, 201);
    }

    public function show($id){
        return Category::findOrFail($id);
    }

    public function update(Request $request, $id){
        $category = Category::findOrFail($id);
        $request->validate([
            'name' => 'required|unique:categories,name,'.$category->id,
        ]);
        $category->name = $request->name;
        $category->save();
        return response()->json($category);
    }

    public function destroy($id){
        $category = Category::findOrFail($id);
        $category->delete();
        return response()->json(null,204);
    }
    //
}
