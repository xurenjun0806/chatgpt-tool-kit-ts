/// <reference types="chrome"/>
declare type ChatGptOptions = {
  open_ai_api_key: string;
  user_prompt_min_length: number;
  user_prompt_max_length: number;
  system_prompt: string;
}

declare interface IChatGptCard {
  enable(): void;
  disable(): void;
  updateCursor(cursorX: number, cursorY: number): void;
  updateData(data: ChatGptCardData): void;
}

declare type ChatGptCardData = {
  content: string;
  totalTokens: number;
}

declare interface Window {
  chatgptCard: IChatGptCard;
}
