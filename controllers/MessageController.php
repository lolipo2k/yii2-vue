<?php

namespace app\controllers;

use yii\rest\ActiveController;
use Yii;

class MessageController extends ActiveController
{
    public $modelClass = 'app\models\Message';

    public function actionTelegram()
    {
        $request = Yii::$app->request;

        Yii::$app->telegram->sendMessage([
            'chat_id' => 1067380633,
            'text' => $request->post('text'),
        ]);
    }
}
