// 分頁切換：主選單 ↔ 面板 ↔ 作品清單。鍵盤與滑鼠等價。
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
    document.querySelectorAll<HTMLElement>('[data-work]').forEach((card, i) => {
      card.addEventListener('click', () => this.openDetail(i));
    });
    document.querySelectorAll<HTMLElement>('[data-detail-close]').forEach((btn) => {
      btn.addEventListener('click', () => this.closeDetail());
    });
    // 點霧面玻璃的空白處也關閉詳情
    document.querySelector<HTMLElement>('[data-detail-layer]')?.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) this.closeDetail();
    });
    // 點面板外面的空白處關閉；標了 data-close-anywhere 的頁面點哪裡都關（連結除外）
    document.querySelectorAll<HTMLElement>('[data-panel-id]').forEach((overlay) => {
      overlay.addEventListener('click', (e) => {
        const anywhere = overlay.hasAttribute('data-close-anywhere');
        const onLink = !!(e.target as HTMLElement).closest('a');
        if (e.target === overlay || (anywhere && !onLink)) this.close();
      });
    });

    window.addEventListener('keydown', (e) => this.onKey(e));

    // 網址帶 #works 開那一頁，#works/<作品 id> 連詳情一起開
    const [page, work] = location.hash.slice(1).split('/');
    if (PANEL_IDS.includes(page)) {
      this.open(page);
      if (work) {
        const i = this.cards().findIndex((c) => c.dataset.work === work);
        if (i >= 0) this.openDetail(i);
      }
    }
  },

  onKey(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      if (this.detailOpen()) this.closeDetail();
      else this.close();
      return;
    }
    // 數字鍵只在主畫面有效，免得在面板裡誤觸換頁
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
    // 強制 reflow，否則同一個面板再開一次時進場動畫不會重播
    panel.classList.remove('opening');
    void panel.offsetWidth;
    panel.classList.add('opening');
  },

  close() {
    // 以畫面上實際開著的面板為準，不信任 current：狀態一旦不同步就再也關不掉
    const panel = document.querySelector<HTMLElement>('[data-panel-id]:not([hidden])');
    this.current = null;
    this.closeDetail();
    if (!panel) return;
    // 關閉不做退場動畫，直接收掉
    panel.hidden = true;
    panel.classList.remove('opening');
    this.menu?.classList.add('back');
    this.menu?.classList.remove('away');
  },

  cards() {
    return Array.from(document.querySelectorAll<HTMLElement>('[data-work]'));
  },

  detailLayer() {
    return document.querySelector<HTMLElement>('[data-detail-layer]');
  },

  detailOpen() {
    const layer = this.detailLayer();
    return !!layer && !layer.hidden;
  },

  openDetail(i: number) {
    const layer = this.detailLayer();
    if (!layer) return;
    document.querySelectorAll<HTMLElement>('[data-detail]').forEach((d, n) => {
      d.hidden = n !== i;
      if (n === i) this.mountVideo(d);
    });
    layer.hidden = false;
  },

  closeDetail() {
    const layer = this.detailLayer();
    if (!layer) return;
    layer.querySelectorAll<HTMLElement>('[data-video]').forEach((b) => {
      b.innerHTML = '';
    });
    layer.hidden = true;
  },

  // 開啟才嵌入、關閉就移除，免得影片在背景一直載
  mountVideo(detail: HTMLElement) {
    const box = detail.querySelector<HTMLElement>('[data-video]');
    if (!box || box.querySelector('iframe')) return;
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${box.dataset.video}`;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture';
    iframe.allowFullscreen = true;
    box.appendChild(iframe);
  },
};

Shell.init();
