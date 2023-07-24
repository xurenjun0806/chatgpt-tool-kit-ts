import browser from 'webextension-polyfill';

function show_status(text: string, time: number) {
  var status = document.getElementById('status');
  if (status === null) return;

  status.textContent = text;
  setTimeout(function() {
    if (status === null) return;

    status.textContent = '';
  }, time);
}

function restore_options() {
  var defaultOptions: ChatGptOptions = {
    open_ai_api_key: '',
    user_prompt_min_length: 10,
    user_prompt_max_length: 100,
    system_prompt: ''
  };
  browser.storage.local.get(defaultOptions).then(
    (items) => {
      //TODO: APIキーの表示仕方を考える
      openAiApiKey.value = items.open_ai_api_key;
      userPromptMinLength.value = items.user_prompt_min_length;
      userPromptMaxLength.value = items.user_prompt_max_length;
      systemPrompt.value = items.system_prompt;
    });
}


let openAiApiKey = document.getElementById('chatgpt-api-key') as HTMLInputElement;
let userPromptMinLength = document.getElementById('user-prompt-min-length') as HTMLInputElement;
let userPromptMaxLength = document.getElementById('user-prompt-max-length') as HTMLInputElement;
let systemPrompt = document.getElementById('system-prompt') as HTMLInputElement;
let saveButton = document.getElementById('save-chatgpt-setting') as HTMLButtonElement;
saveButton.addEventListener('click', () => {
  let chatgptOptions: ChatGptOptions = {
    open_ai_api_key: openAiApiKey.value,
    user_prompt_min_length: parseInt(userPromptMinLength.value),
    user_prompt_max_length: parseInt(userPromptMaxLength.value),
    system_prompt: systemPrompt.value
  }

  browser.storage.local.set(chatgptOptions).then(
    () => {
      show_status('保存完了', 900);
    });
});

document.addEventListener('DOMContentLoaded', restore_options);
