// SlackのOAuth Access Token
const slack_app_token = 'xoxb-4883928497479-4911114450865-Dmsv9x6jZdGzMa8WQkEy807E'

// 打刻対象のメッセージ定義
channel = 'times_pei'
from = 'Kot-slack'

// Reactionでスタンプする絵文字を定義
workStart = '出社します'
workFinish = '退勤します'
remoteWorkStart = 'リモート開始'
remoteWorkFinish = 'リモート終了'

// 対象チャンネルのIDを定義
channel_id = 'C04SGT7RJMA'

// 最新のReminderメッセージにrimokai/rimoshuをReactionする
function postToSlack(message){
  const ts = new Date().getTime();
  const xhr = new XMLHttpRequest();
  const url = `https://slack.com/api/chat.postMessage`;
  const data = `token=${slack_app_token}&channel=${channel_id}&text=${message}&timestamp=${ts}`;
  xhr.open('POST', url);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.onload = function() {
    if (xhr.status === 200) {
      const responseData = JSON.parse(xhr.responseText);
      alert('Can I post to Slack? :' + responseData.ok);
    } else {
      console.log('Request failed.  Returned status of ' + xhr.status);
    }
  };
  xhr.send(data);

  window.alert(`メッセージ"${ts}"に"${message}"を送りました。`);

}

// KoTのタイムレコーダーページでイベントリスナーを設定
function set_event_listener(){

    // 出勤ボタン動作
    var syukkin_elem = document.getElementsByClassName('record-btn-inner record-clock-in');
    syukkin_elem[0].addEventListener('click', function(){postToSlack(workStart)}, false);

    // 退勤ボタン動作
    var taikin_elem = document.getElementsByClassName('record-btn-inner record-clock-out');
    taikin_elem[0].addEventListener('click', function(){postToSlack(workFinish)}, false);

    window.alert(`打刻すると${channel}チャンネルにメッセージ"${workStart}"/"${workFinish}"を送信します。`);
};

// ボタンパーツの読み込みを1秒待つ
setTimeout("set_event_listener()", 1000);