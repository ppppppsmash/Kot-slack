let slackInfo = {};

const workStatus = {
    work_start: '出勤',
    work_finish: '退勤',
    remote_start: ':remote_work:',
    remote_finish: ':remotework_end_owari:'
};

chrome.storage.local.get(['slack_app_token', 'channel_name', 'channel_id'], function(items) {
    slackInfo.slack_access_token = items.slack_app_token;
    slackInfo.channel = items.channel_name;
    slackInfo.channel_id = items.channel_id;

    // ボタン押した後の読み込みを3秒待てれば
    setTimeout("postToSlack()", 3000);
});

// payloadとajaxについて
const payLoad = (message) => {
    const xhr = new XMLHttpRequest();
    const url = `https://slack.com/api/chat.postMessage`;
    const data = `token=${slackInfo.slack_access_token}&channel=${slackInfo.channel_id}&text=${message}`;
    const current = new Date();
    const engravingTime = `${current.getFullYear()}年${current.getMonth()+1}月${current.getDate()}日${current.getHours()}時${current.getMinutes()}分`;

    xhr.open('POST', url);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = () => {
        if(xhr.status = 200) {
            const responseData = JSON.parse(xhr.responseText);
            console.log(`成功! ${responseData.ok}`);
        } else {
            console.log(`ステータス: ${xhr.status}`);
        }
    };
    xhr.send(data);

    window.alert(`「${engravingTime}」に${slackInfo.channel}チャンネルに打刻メッセージを送りました。`);
};

// ボタンをクリックしたタイミングで出勤状況を送信させる
const postToSlack = () => {
    const clockIn = document.getElementsByClassName('record-btn-inner record-clock-in');
    clockIn[0].addEventListener('click', () => {
        payLoad(workStatus.work_start);
    }, false);
    const clockOut = document.getElementsByClassName('record-btn-inner record-clock-out');
    clockOut[0].addEventListener('click', () => {
        payLoad(workStatus.work_finish);
    }, false);
};