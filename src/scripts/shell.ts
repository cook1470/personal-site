// 分頁切換：主選單 ↔ 面板 ↔ 作品清單。鍵盤與滑鼠等價。
const PANEL_IDS = ['works', 'art', 'docs', 'maps', 'about'];

export const Shell = {
  menu: null as HTMLElement | null,
  current: null as string | null,
  picked: 0,

  init() {
    this.menu = document.getElementById('menu');

    document.querySelectorAll<HTMLButtonElement>('[data-panel]').forEach((btn) => {
      btn.addEventListener('click', () => this.open(btn.dataset.panel!));
    });
    document.querySelectorAll<HTMLButtonElement>('[data-close]').forEach((btn) => {
      btn.addEventListener('click', () => this.close());
    });
    document.querySelectorAll<HTMLElement>('[data-work]').forEach((row, i) => {
      row.addEventListener('click', () => this.pick(i));
      row.addEventListener('mouseenter', () => this.pick(i));
    });
    // 點面板外面的空白處也關閉
    document.querySelectorAll<HTMLElement>('[data-panel-id]').forEach((overlay) => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) this.close();
      });
    });

    window.addEventListener('keydown', (e) => this.onKey(e));

    // 網址帶 #works 之類就直接開那一頁
    const hash = location.hash.slice(1);
    if (PANEL_IDS.includes(hash)) this.open(hash);
  },

  onKey(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      this.close();
      return;
    }
    // 作品清單：上下鍵選曲
    if (this.current === 'works') {
      const dir = { ArrowUp: -1, ArrowDown: 1 }[e.key];
      if (dir !== undefined) {
        e.preventDefault();
        const last = this.rows().length - 1;
        this.pick(Math.min(last, Math.max(0, this.picked + dir)));
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
    // 隱藏時量不到位置，開啟後才能把清單捲到定位
    if (id === 'works') this.pick(this.picked);
  },

  close() {
    // 以畫面上實際開著的面板為準，不信任 current：狀態一旦不同步就再也關不掉
    const panel = document.querySelector<HTMLElement>('[data-panel-id]:not([hidden])');
    this.current = null;
    if (!panel) return;
    // 關閉不做退場動畫，直接收掉
    panel.hidden = true;
    panel.classList.remove('opening');
    this.menu?.classList.add('back');
    this.menu?.classList.remove('away');
  },

  rows() {
    return Array.from(document.querySelectorAll<HTMLElement>('[data-work]'));
  },

  pick(i: number) {
    this.picked = i;
    const rows = this.rows();
    rows.forEach((r, n) => r.classList.toggle('on', n === i));
    document.querySelectorAll<HTMLElement>('[data-view]').forEach((v, n) => {
      v.hidden = n !== i;
    });
    // 清單跟著捲，選中的那列盡量置中，但不捲過頭露出上下空白
    const rail = document.querySelector<HTMLElement>('[data-rail]');
    const row = rows[i];
    const view = rail?.parentElement;
    if (rail && row && view) {
      const centered = row.offsetTop + row.offsetHeight / 2 - view.clientHeight / 2;
      const max = Math.max(0, rail.scrollHeight - view.clientHeight);
      rail.style.transform = `translateY(${-Math.min(max, Math.max(0, centered))}px)`;
    }
  },
};

Shell.init();
