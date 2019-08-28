<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use App\Http\Resources\NotificationResource;

class NotificationController extends Controller
{
    public function __construct()
    {
        $this->middleware('JWT');
    } 


    public function index(){
        $user = User::find(13);

        return [
            'read' => NotificationResource::collection(auth()->user()->readNotifications),
            'unread' => NotificationResource::collection(auth()->user()->unReadNotifications),
        ];
    }

    public function markAsRead(Request $request){

        auth()->user()->notifications->where('id',$request->id)->markAsRead();
    }
}
