function save() {
  let slackAppToken = document.getElementById('slack_app_token').value;
  let channelName = document.getElementById('channel_name').value;
  let channelId = document.getElementById('channel_id').value;

  chrome.storage.local.set(
    {
      'slack_app_token': slackAppToken,
      'channel_name': channelName,
      'channel_id': channelId
    }, () => {}
  );
}

function load() {
  chrome.storage.local.get(['slack_app_token', 'channel_name', 'channel_id'], (items) => {
    document.getElementById('slack_app_token').value = items.slack_app_token;
    document.getElementById('channel_name').value = items.channel_name;
    document.getElementById('channel_id').value = items.channel_id;
  });
}

document.addEventListener('DOMContentLoaded', load);
document.getElementById('save').addEventListener('click', () => {
  window.alert('保存しました！');
  document.getElementById('notice').classList.remove('d-none');
  save();
});