type DataInfo = {
    slack_access_token: string;
    channel: string;
    channel_id: string;
    work_start: string;
    remote_start: string;
    work_finish: string;
}

const dataInfo: DataInfo = {
    slack_access_token: '',
    channel: '',
    channel_id: '',
    work_start: '',
    remote_start: '',
    work_finish: ''
};

// payloadとajaxについて
const payLoad = (message: string): void => {
    const xhr = new XMLHttpRequest();
    const url = `https://slack.com/api/chat.postMessage`;
    const data = `token=${dataInfo.slack_access_token}&channel=${dataInfo.channel_id}&text=${message}`;
    const current = new Date();
    const engravingTime = `${current.getFullYear()}年${current.getMonth()+1}月${current.getDate()}日${current.getHours()}時${current.getMinutes()}分`;

    xhr.open('POST', url);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = () => {
        if(xhr.status == 200) {
            const responseData = JSON.parse(xhr.responseText);
            console.log(`成功! ${responseData.ok}`);
        } else {
            console.log(`ステータス: ${xhr.status}`);
        }
    };
    xhr.send(data);
    console.log(data)
    window.alert(`「${engravingTime}」に${dataInfo.channel}チャンネルに打刻メッセージを送りました。`);
};

const dialogDisp = () => {
    const dialog = window.confirm('リモートワークですか？');
    return dialog ? payLoad(dataInfo.remote_start) : payLoad(dataInfo.work_start);
}

// ボタンをクリックしたタイミングで出勤状況を送信させる
const postToSlack = (): void => {
    const clockIn = document.getElementsByClassName('record-btn-inner record-clock-in');
    const clockOut = document.getElementsByClassName('record-btn-inner record-clock-out');

    const handleClickClockIn = () => {
      dialogDisp();
    };

    const handleClickClockOut = () => {
      payLoad(dataInfo.work_finish);
    };

    if (clockIn.length > 0) {
      clockIn[0].addEventListener('click', handleClickClockIn, false);
    } else {
        window.alert('ボタンのリロードが完了していないため、再度出勤ボタンをクリックしてください。');
    }

    if (clockOut.length > 0) {
      clockOut[0].addEventListener('click', handleClickClockOut, false);
    } else {
        window.alert('ボタンのリロードが完了していないため、再度退勤ボタンをクリックしてください。');
    }
};

chrome.storage.local.get(['slack_access_token', 'channel', 'channel_id', 'work_start', 'remote_start', 'work_finish'], (result) => {
  const { slack_access_token, channel, channel_id, work_start, remote_start, work_finish } = result;
  dataInfo.slack_access_token = slack_access_token;
  dataInfo.channel = channel;
  dataInfo.channel_id = channel_id;
  dataInfo.work_start = work_start;
  dataInfo.remote_start = remote_start;
  dataInfo.work_finish = work_finish;

  console.log(dataInfo.channel_id);

  // ボタン押した後の読み込みを3秒待てれば
  setTimeout(postToSlack, 3000);
});

