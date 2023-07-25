export async function getApiResponse(user_prompt: string) {
  let chatgptOptions = await getChatGptOptions();

  const error = checkParams(user_prompt, chatgptOptions);
  if (error) {
    return error;
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + chatgptOptions.open_ai_api_key
    },
    body: JSON.stringify({
      'model': 'gpt-3.5-turbo',
      'messages': [
        {
          'role': 'system',
          'content': chatgptOptions.system_prompt
        },
        {
          'role': 'user',
          'content': user_prompt
        }
      ],
    })
  });

  // TODO: ユーザープロンプトとレスポンスを履歴に残す

  return response.json()
}

const getChatGptOptions = async () => {
  let chatgptOptions: ChatGptOptions = {
    open_ai_api_key: '',
    user_prompt_min_length: 0,
    user_prompt_max_length: 0,
    system_prompt: ''
  };
  await chrome.storage.local.get(chatgptOptions).then(
    (result) => {
      chatgptOptions.open_ai_api_key = result.openAiApiKey;
      chatgptOptions.user_prompt_min_length = result.userPromptMinLength;
      chatgptOptions.user_prompt_max_length = result.userPromptMaxLength;
      chatgptOptions.system_prompt = result.systemPrompt;
    });

  return chatgptOptions;
}

const checkParams = (user_prompt: string, chatgptOptions: ChatGptOptions) => {
  if (!chatgptOptions.system_prompt) {
    return {
      error: {
        message: 'システムプロンプトが設定されていません。'
      }
    };
  }

  if (user_prompt.length < chatgptOptions.user_prompt_min_length
    || user_prompt.length > chatgptOptions.user_prompt_max_length) {
    return {
      error: {
        message: `文字数が${chatgptOptions.user_prompt_min_length}以上,
${chatgptOptions.user_prompt_max_length}以下の場合のみ処理を行うことができます。`
      }
    };
  }

  return null;
}
