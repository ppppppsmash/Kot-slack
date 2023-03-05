chrome.storage.local.get(['slack_app_token', 'channel_name', 'channel_id'], function(items) {
  slack_app_token = items.slack_app_token;
  channel_name = items.channel_name;
  channel_id = items.channel_id;

  // ボタンパーツの読み込みを1秒待つ
  setTimeout("set_event_listener()", 1000);
});

// Reactionでスタンプする絵文字を定義
workStart = '出社します'
workFinish = '退勤します'
remoteWorkStart = 'リモート開始'
remoteWorkFinish = 'リモート終了'

// payload情報
function postToSlack(message){
  const now = new Date();
  const xhr = new XMLHttpRequest();
  const url = `https://slack.com/api/chat.postMessage`;
  const data = `token=${slack_app_token}&channel=${channel_id}&text=${message}&timestamp=${now}`;
  xhr.open('POST', url);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.onload = function() {
    if (xhr.status === 200) {
      const responseData = JSON.parse(xhr.responseText);
      console.log(responseData.ok);
    } else {
      console.log('Request failed.  Returned status of ' + xhr.status);
    }
  };
  xhr.send(data);

  window.alert(`メッセージ"${now}"に"${message}"を送りました。`);

}

function comfirmFunc() {
  const dialog = window.confirm('今日はリモートワークですか？');
  return dialog ? postToSlack(remoteWorkStart) : postToSlack(workStart);
}

// KoTのタイムレコーダーページでイベントリスナーを設定
function set_event_listener(){

  // 出勤ボタン動作
  var syukkin_elem = document.getElementsByClassName('record-btn-inner record-clock-in');
  syukkin_elem[0].addEventListener('click', function(){comfirmFunc()}, false);

  // 退勤ボタン動作
  var taikin_elem = document.getElementsByClassName('record-btn-inner record-clock-out');
  taikin_elem[0].addEventListener('click', function(){postToSlack(workFinish)}, false);

  window.alert(`打刻すると${channel_name}チャンネルにステータスを送信します。`);
};