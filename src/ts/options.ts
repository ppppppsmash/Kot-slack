import '../css/bootstrap.min.css';
type DataInfo = {
    slack_access_token: string;
    channel: string;
    channel_id: string;
    work_start: string;
    remote_start: string;
    work_finish: string;
};

let dataInfo: DataInfo = {
    slack_access_token: '',
    channel: '',
    channel_id: '',
    work_start: '',
    remote_start: '',
    work_finish: ''
};

const dataSave = (): void => {
    dataInfo.slack_access_token = (document.getElementById('slack_access_token') as HTMLInputElement).value;
    dataInfo.channel = (document.getElementById('channel') as HTMLInputElement).value;
    dataInfo.channel_id = (document.getElementById('channel_id') as HTMLInputElement).value;
    dataInfo.work_start = (document.getElementById('work_start') as HTMLInputElement).value;
    dataInfo.remote_start = (document.getElementById('remote_start') as HTMLInputElement).value;
    dataInfo.work_finish = (document.getElementById('work_finish') as HTMLInputElement).value;

    chrome.storage.local.set(
        {
            'slack_access_token': dataInfo.slack_access_token,
            'channel': dataInfo.channel,
            'channel_id': dataInfo.channel_id,
            'work_start': dataInfo.work_start,
            'remote_start': dataInfo.remote_start,
            'work_finish': dataInfo.work_finish
        }, () => {}
    )
};

const dataLoad = (): void => {
    chrome.storage.local.get(
        ['slack_access_token', 'channel', 'channel_id', 'work_start', 'remote_start', 'work_finish'], (items: any) => {
            (document.getElementById('slack_access_token') as HTMLInputElement).value = items.slack_access_token;
            (document.getElementById('channel') as HTMLInputElement).value = items.channel;
            (document.getElementById('channel_id') as HTMLInputElement).value = items.channel_id;
            (document.getElementById('work_start') as HTMLInputElement).value = items.work_start;
            (document.getElementById('remote_start') as HTMLInputElement).value = items.remote_start;
            (document.getElementById('work_finish') as HTMLInputElement).value = items.work_finish;
        }
    );
};

document.addEventListener('DOMContentLoaded', dataLoad);
document.getElementById('save').addEventListener('click', (): void => {
    window.alert('保存しました！');
    document.getElementById('notice').classList.remove('d-none');
    dataSave();
});