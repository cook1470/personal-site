// 分頁切換：主選單 ↔ 面板 ↔ 作品長條。鍵盤與滑鼠等價。
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
    document.querySelectorAll<HTMLElement>('[data-work]').forEach((strip) => {
      strip.addEventListener('click', (e) => {
        // 條子裡的連結照常運作，不順手把條子收起來
        if ((e.target as HTMLElement).closest('a')) return;
        this.toggleStrip(strip);
      });
      strip.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleStrip(strip);
        }
      });
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
      const open = this.openStripEl();
      if (open) open.classList.remove('open');
      else this.close();
      return;
    }
    // 作品長條：左右鍵換條
    if (this.current === 'works') {
      const dir = { ArrowLeft: -1, ArrowRight: 1 }[e.key];
      if (dir !== undefined) {
        e.preventDefault();
        const strips = this.strips();
        const now = strips.indexOf(this.openStripEl()!);
        const next = now < 0 ? 0 : Math.min(strips.length - 1, Math.max(0, now + dir));
        this.openStrip(strips[next]);
        return;
      }
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
    this.openStripEl()?.classList.remove('open');
    if (!panel) return;
    // 關閉不做退場動畫，直接收掉
    panel.hidden = true;
    panel.classList.remove('opening');
    this.menu?.classList.add('back');
    this.menu?.classList.remove('away');
  },

  strips() {
    return Array.from(document.querySelectorAll<HTMLElement>('[data-work]'));
  },

  openStripEl() {
    return document.querySelector<HTMLElement>('[data-work].open');
  },

  openStrip(strip: HTMLElement) {
    this.strips().forEach((s) => s.classList.toggle('open', s === strip));
  },

  toggleStrip(strip: HTMLElement) {
    const wasOpen = strip.classList.contains('open');
    this.strips().forEach((s) => s.classList.remove('open'));
    if (!wasOpen) strip.classList.add('open');
  },
};

Shell.init();
