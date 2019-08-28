<?php

namespace App\Http\Controllers;

use App\Events\LikeEvent;
use App\Model\Like;
use Illuminate\Http\Request;
use App\Model\Reply;

class LikeController extends Controller
{

    public function __construct()
    {
        $this->middleware('JWT');
    }


  public function likeIt(Reply $reply){

    $reply->likes()->create([
         'user_id' => auth()->id(),
       // 'user_id' => '1'
    ]);

    broadcast(new LikeEvent($reply->id,1))->toOthers();
  }

  public function unlikeIt(Reply $reply){

     $reply->likes()->where('user_id',auth()->id())->first()->delete();

     broadcast(new LikeEvent($reply->id,0))->toOthers();
    }
}
