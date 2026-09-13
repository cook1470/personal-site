// 分頁切換:主選單 ↔ 面板 ↔ 作品詳情。鍵盤與滑鼠等價。
const PANEL_IDS = ['works', 'art', 'docs', 'maps', 'about'];

export const Shell = {
  menu: null as HTMLElement | null,
  current: null as string | null,

  init() {
    this.menu = document.getElementById('menu');

    document.querySelectorAll<HTMLButtonElement>('[data-panel]').forEach((btn) => {
      btn.addEventListener('click', () => this.open(btn.dataset.panel!));
    });
    document.querySelectorAll<HTMLButtonElement>('[data-close]').forEach((btn) => {
      btn.addEventListener('click', () => this.close());
    });
    document.querySelectorAll<HTMLButtonElement>('[data-work]').forEach((btn) => {
      btn.addEventListener('click', () => this.openWork(btn.dataset.work!));
    });
    document.querySelectorAll<HTMLButtonElement>('[data-back]').forEach((btn) => {
      btn.addEventListener('click', () => this.closeWork());
    });
    // 點面板外面的空白處也關閉
    document.querySelectorAll<HTMLElement>('[data-panel-id]').forEach((overlay) => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) this.close();
      });
    });

    window.addEventListener('keydown', (e) => this.onKey(e));
  },

  onKey(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      if (this.currentWork()) this.closeWork();
      else this.close();
      return;
    }
    // 數字鍵只在主畫面有效,免得在面板裡誤觸換頁
    if (document.querySelector('[data-panel-id]:not([hidden])')) return;
    const n = parseInt(e.key, 10);
    if (n >= 1 && n <= PANEL_IDS.length) this.open(PANEL_IDS[n - 1]);
  },

  panelOf(id: string) {
    return document.getElementById(`panel-${id}`);
  },

  open(id: string) {
    if (this.current === id) return;
    if (this.current) this.close();
    const panel = this.panelOf(id);
    if (!panel) return;
    this.current = id;
    this.menu?.classList.remove('back');
    this.menu?.classList.add('away');
    panel.hidden = false;
    // 強制 reflow,否則同一個面板再開一次時進場動畫不會重播
    panel.classList.remove('opening');
    void panel.offsetWidth;
    panel.classList.add('opening');
  },

  close() {
    // 以畫面上實際開著的面板為準,不信任 current:狀態一旦不同步就再也關不掉
    const panel = document.querySelector<HTMLElement>('[data-panel-id]:not([hidden])');
    this.current = null;
    this.closeWork();
    if (!panel) return;
    // 關閉不做退場動畫,直接收掉
    panel.hidden = true;
    panel.classList.remove('opening');
    this.menu?.classList.add('back');
    this.menu?.classList.remove('away');
  },

  currentWork() {
    return document.querySelector<HTMLElement>('[data-detail]:not([hidden])');
  },

  openWork(workId: string) {
    const grid = document.querySelector<HTMLElement>('[data-works-grid]');
    const detail = document.querySelector<HTMLElement>(`[data-detail="${workId}"]`);
    if (!grid || !detail) return;
    grid.hidden = true;
    detail.hidden = false;
    this.mountVideo(detail);
  },

  closeWork() {
    const detail = this.currentWork();
    if (!detail) return;
    this.unmountVideo(detail);
    detail.hidden = true;
    const grid = document.querySelector<HTMLElement>('[data-works-grid]');
    if (grid) grid.hidden = false;
  },

  // 影片開啟才嵌入、關閉就移除,避免背景持續載入
  mountVideo(detail: HTMLElement) {
    const box = detail.querySelector<HTMLElement>('[data-video]');
    if (!box || box.querySelector('iframe')) return;
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${box.dataset.video}`;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture';
    iframe.allowFullscreen = true;
    box.appendChild(iframe);
  },

  unmountVideo(detail: HTMLElement) {
    const box = detail.querySelector<HTMLElement>('[data-video]');
    if (box) box.innerHTML = '';
  },
};

Shell.init();
