class ChatGptCard implements IChatGptCard {
  enabled: boolean;
  private el: HTMLElement;
  private displayData: ChatGptCardData;
  private cursorX: number;
  private cursorY: number;

  constructor() {
    this.cursorX = 0;
    this.cursorY = 0;
    this.enabled = false;
    this.displayData = {
      content: '',
      totalTokens: 0
    };
    this.el = document.createElement('div');

    this.innerElementInit();
    this.disable();

    document.body.appendChild(this.el);
  }

  public enable() {
    this.enabled = true;
    this.el.style.display = 'flex';
    this.setupTriggers();
  }

  public disable() {
    this.enabled = false;
    this.el.style.display = 'none';
  }

  public updateCursor(cursorX: number, cursorY: number) {
    this.cursorX = window.scrollX + cursorX + 5;
    this.cursorY = window.scrollY + cursorY + 10;
    this.el.style.left = `${this.cursorX}px`;
    this.el.style.top = `${this.cursorY}px`;
  }

  public updateData(data: ChatGptCardData) {
    this.displayData = data;
    this.reload();
  }

  public reload() {
    this.el.innerHTML = this.createChatgptCardInnerHtml(this.displayData);
    if (this.enabled) this.setupTriggers();
  }

  private innerElementInit() {
    this.el.id = 'chatgpt-card';
    this.el.style.display = 'none';
    this.el.innerHTML = this.createChatgptCardInnerHtml(this.displayData);
  }

  private createChatgptCardInnerHtml(data: ChatGptCardData) {
    return `<div class="chatgpt-card-header">
    <button id="close-chatgpt-card">閉じる</button>
  </div>
  <div class="chatgpt-card-body">
    ${data.content}
  </div>
  <div class='chatgpt-card-footer'>
    ${data.totalTokens} トークン使用
  </div>
`;
  }

  private setupTriggers() {
    const closeBtn = document.getElementById('close-chatgpt-card');
    if (closeBtn === null) return;

    closeBtn.addEventListener('click', () => {
      this.disable();
    });
  }
}

window.addEventListener("load", function() {
  window.chatgptCard = new ChatGptCard();
  window.chatgptCard.disable();
});
