<?php

namespace App\Http\Controllers;

use App\Models\UserResult;
use Illuminate\Http\Request;

class UserResultController extends Controller
{

    public function index()
    {
        $users = UserResult::latest()->get();

        return response()->json([
            'success' => true,
            'data' => $users,
        ], 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
        ]);

        // Calculator logic
        $name = preg_replace('/\s+/', '', $validated['full_name']);
        $result = strlen($name);

        $user = UserResult::create([
            'full_name' => $validated['full_name'],
            'result' => $result,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'User created successfully',
            'data' => $user,
        ], 201);
    }

    public function update(Request $request, int $id)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
        ]);

        $user = UserResult::findOrFail($id);

        $user->update([
            'full_name' => $validated['full_name'],
        ]);

        return response()->json([
            'success' => true,
            'message' => 'User updated successfully',
            'data' => $user,
        ], 200);
    }

    public function destroy(int $id)
    {
        $user = UserResult::findOrFail($id);
        $user->delete();

        return response()->json([
            'success' => true,
            'message' => 'User deleted successfully',
        ], 200);
    }
}
