// ============================================================
//  DiskSimOS — app.js
//  All 4 scheduling algorithms + Chart.js visualizations
// ============================================================

// ─── ALGORITHM ENGINE ───────────────────────────────────────

function fcfs(requests, head) {
  const seq = [head, ...requests];
  return buildResult(seq);
}

function sstf(requests, head) {
  const rem = [...requests];
  const seq = [head];
  let cur = head;
  while (rem.length) {
    let idx = 0;
    let minDist = Math.abs(rem[0] - cur);
    for (let i = 1; i < rem.length; i++) {
      const d = Math.abs(rem[i] - cur);
      if (d < minDist) { minDist = d; idx = i; }
    }
    cur = rem[idx];
    seq.push(cur);
    rem.splice(idx, 1);
  }
  return buildResult(seq);
}

function scan(requests, head, diskSize, direction) {
  const sorted = [...requests].sort((a, b) => a - b);
  const left  = sorted.filter(r => r < head).reverse();
  const right = sorted.filter(r => r >= head);
  let seq;
  if (direction === 'right') {
    seq = [head, ...right, diskSize - 1, ...left];
  } else {
    seq = [head, ...left, 0, ...right];
  }
  return buildResult(seq);
}

function cscan(requests, head, diskSize, direction) {
  const sorted = [...requests].sort((a, b) => a - b);
  const left  = sorted.filter(r => r < head);
  const right = sorted.filter(r => r >= head);
  let seq;
  if (direction === 'right') {
    seq = [head, ...right, diskSize - 1, 0, ...left];
  } else {
    seq = [head, ...left.reverse(), 0, diskSize - 1, ...right.reverse()];
  }
  return buildResult(seq);
}

function buildResult(seq) {
  let total = 0;
  const steps = [];
  for (let i = 1; i < seq.length; i++) {
    const dist = Math.abs(seq[i] - seq[i - 1]);
    total += dist;
    steps.push({ from: seq[i - 1], to: seq[i], dist });
  }
  const n = steps.length;
  const avg = n ? (total / n) : 0;
  const maxSeek = steps.reduce((m, s) => Math.max(m, s.dist), 0);
  const throughput = n ? (n / (total || 1)) : 0;
  return { seq, steps, total, avg, maxSeek, throughput };
}

// ─── CHART INSTANCES ────────────────────────────────────────
let lineChartInst = null;
let barChartInst  = null;
let cmpChartInst  = null;

const ALGO_COLORS = {
  FCFS:  '#00e5ff',
  SSTF:  '#34d399',
  SCAN:  '#a78bfa',
  CSCAN: '#ff6b6b',
};

const ALGO_LABELS = {
  FCFS:  'FCFS',
  SSTF:  'SSTF',
  SCAN:  'SCAN',
  CSCAN: 'C-SCAN',
};

// ─── CHART: SEEK LINE ───────────────────────────────────────

function renderSeekLine(result, algoKey) {
  const ctx = document.getElementById('seekLineChart').getContext('2d');
  if (lineChartInst) lineChartInst.destroy();

  const labels = result.seq.map((_, i) => `Step ${i}`);
  const color  = ALGO_COLORS[algoKey];

  lineChartInst = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: `${ALGO_LABELS[algoKey]} — Head Position`,
        data: result.seq,
        borderColor: color,
        backgroundColor: color + '18',
        borderWidth: 2.5,
        pointRadius: 5,
        pointBackgroundColor: color,
        pointBorderColor: '#0a0c12',
        pointBorderWidth: 2,
        tension: 0.1,
        fill: true,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 700, easing: 'easeOutQuart' },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#111420',
          borderColor: color,
          borderWidth: 1,
          titleColor: color,
          bodyColor: '#e2e8f0',
          callbacks: {
            label: ctx => ` Cylinder: ${ctx.parsed.y}`
          }
        }
      },
      scales: {
        x: {
          ticks: { color: '#64748b', font: { family: 'Space Mono', size: 10 } },
          grid:  { color: '#1f2740' }
        },
        y: {
          ticks: { color: '#64748b', font: { family: 'Space Mono', size: 10 } },
          grid:  { color: '#1f2740' },
          title: {
            display: true,
            text: 'Cylinder Number',
            color: '#64748b',
            font: { family: 'Space Mono', size: 10 }
          }
        }
      }
    }
  });

  // legend
  const leg = document.getElementById('seekLegend');
  leg.innerHTML = `
    <div class="legend-item">
      <div class="legend-dot" style="background:${color}"></div>
      <span>${ALGO_LABELS[algoKey]} — ${result.seq.length} positions, ${result.total} cylinders total</span>
    </div>`;
}

// ─── CHART: PER-STEP BAR ────────────────────────────────────

function renderBarChart(result, algoKey) {
  const ctx = document.getElementById('seekBarChart').getContext('2d');
  if (barChartInst) barChartInst.destroy();

  const color = ALGO_COLORS[algoKey];
  const labels = result.steps.map((s, i) => `${s.from}→${s.to}`);
  const data   = result.steps.map(s => s.dist);

  barChartInst = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Seek Distance',
        data,
        backgroundColor: data.map(d => d === Math.max(...data) ? '#ff6b6b' : color + 'bb'),
        borderColor:     data.map(d => d === Math.max(...data) ? '#ff6b6b' : color),
        borderWidth: 1.5,
        borderRadius: 4,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 700 },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#111420',
          borderColor: color,
          borderWidth: 1,
          titleColor: color,
          bodyColor: '#e2e8f0',
          callbacks: {
            label: ctx => ` Seek distance: ${ctx.parsed.y} cylinders`
          }
        }
      },
      scales: {
        x: {
          ticks: { color: '#64748b', font: { family: 'Space Mono', size: 9 }, maxRotation: 45 },
          grid:  { display: false }
        },
        y: {
          ticks: { color: '#64748b', font: { family: 'Space Mono', size: 10 } },
          grid:  { color: '#1f2740' },
          title: {
            display: true,
            text: 'Seek Distance (cylinders)',
            color: '#64748b',
            font: { family: 'Space Mono', size: 10 }
          }
        }
      }
    }
  });
}

// ─── CHART: COMPARISON GROUPED BAR ─────────────────────────

function renderCompareChart(allResults) {
  const ctx = document.getElementById('compareChart').getContext('2d');
  if (cmpChartInst) cmpChartInst.destroy();

  const algos = Object.keys(allResults);
  const totals = algos.map(a => allResults[a].total);
  const avgs   = algos.map(a => parseFloat(allResults[a].avg.toFixed(2)));
  const maxS   = algos.map(a => allResults[a].maxSeek);

  cmpChartInst = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: algos.map(a => ALGO_LABELS[a]),
      datasets: [
        {
          label: 'Total Seek (cylinders)',
          data: totals,
          backgroundColor: algos.map(a => ALGO_COLORS[a] + 'bb'),
          borderColor: algos.map(a => ALGO_COLORS[a]),
          borderWidth: 2,
          borderRadius: 5,
        },
        {
          label: 'Avg Seek × 10',
          data: avgs.map(v => v * 10),
          backgroundColor: algos.map(a => ALGO_COLORS[a] + '44'),
          borderColor: algos.map(a => ALGO_COLORS[a]),
          borderWidth: 1.5,
          borderRadius: 5,
          borderDash: [4, 4],
        },
        {
          label: 'Max Single Seek',
          data: maxS,
          backgroundColor: 'rgba(255,107,107,0.3)',
          borderColor: '#ff6b6b',
          borderWidth: 1.5,
          borderRadius: 5,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 800 },
      plugins: {
        legend: {
          labels: {
            color: '#8892a4',
            font: { family: 'Space Mono', size: 10 },
            boxWidth: 12,
          }
        },
        tooltip: {
          backgroundColor: '#111420',
          borderColor: '#1f2740',
          borderWidth: 1,
          titleColor: '#e2e8f0',
          bodyColor: '#8892a4',
        }
      },
      scales: {
        x: {
          ticks: { color: '#64748b', font: { family: 'Space Mono', size: 11 } },
          grid:  { display: false }
        },
        y: {
          ticks: { color: '#64748b', font: { family: 'Space Mono', size: 10 } },
          grid:  { color: '#1f2740' }
        }
      }
    }
  });
}

// ─── SEEK ORDER TABLE ───────────────────────────────────────

function renderSeekOrder(result) {
  const list = document.getElementById('seekOrderList');
  list.innerHTML = result.steps.map((s, i) => `
    <div class="seek-order-row">
      <span class="step">#${i + 1}</span>
      <span class="from">${s.from}</span>
      <span class="to">${s.to}</span>
      <span class="dist">${s.dist}</span>
    </div>
  `).join('');
}

// ─── COMPARE TABLE ──────────────────────────────────────────

function renderCompareTable(allResults) {
  const algos = Object.keys(allResults);
  const sorted = [...algos].sort((a, b) => allResults[a].total - allResults[b].total);
  const minTotal = Math.min(...algos.map(a => allResults[a].total));
  const minAvg   = Math.min(...algos.map(a => allResults[a].avg));

  const tbody = document.getElementById('compareTableBody');
  tbody.innerHTML = algos.map(a => {
    const r = allResults[a];
    const rank = sorted.indexOf(a) + 1;
    const isBestTotal = r.total === minTotal;
    const isBestAvg   = r.avg   === minAvg;
    return `
      <tr>
        <td style="color:${ALGO_COLORS[a]};font-weight:700">${ALGO_LABELS[a]}</td>
        <td class="${isBestTotal ? 'best-cell' : ''}">${r.total} ${isBestTotal ? '✓' : ''}</td>
        <td class="${isBestAvg   ? 'best-cell' : ''}">${r.avg.toFixed(2)} ${isBestAvg ? '✓' : ''}</td>
        <td>${r.maxSeek}</td>
        <td>${r.throughput.toFixed(4)}</td>
        <td><span class="rank-badge rank-${rank}">#${rank}</span></td>
      </tr>`;
  }).join('');
}

// ─── METRICS ────────────────────────────────────────────────

function updateMetrics(result) {
  document.querySelector('#mc-total .metric-value').textContent    = result.total;
  document.querySelector('#mc-avg .metric-value').textContent      = result.avg.toFixed(2);
  document.querySelector('#mc-throughput .metric-value').textContent = result.throughput.toFixed(4);
  document.querySelector('#mc-max .metric-value').textContent      = result.maxSeek;

  document.querySelectorAll('.metric-card').forEach(c => {
    c.classList.add('active');
    c.classList.remove('pulse');
    void c.offsetWidth; // reflow
    c.classList.add('pulse');
  });
}

// ─── GET INPUTS ─────────────────────────────────────────────

function getInputs() {
  const diskSize  = parseInt(document.getElementById('diskSize').value)  || 200;
  const headPos   = parseInt(document.getElementById('headPos').value)   || 53;
  const direction = document.getElementById('direction').value;
  const raw       = document.getElementById('requestQueue').value;
  const requests  = raw.split(/[\s,]+/).map(Number).filter(n => !isNaN(n) && n >= 0 && n < diskSize);
  const algoEl    = document.querySelector('input[name="algo"]:checked');
  const algo      = algoEl ? algoEl.value : 'FCFS';
  return { diskSize, headPos, direction, requests, algo };
}

function runAlgo(algo, requests, head, diskSize, direction) {
  switch (algo) {
    case 'FCFS':  return fcfs(requests, head);
    case 'SSTF':  return sstf(requests, head);
    case 'SCAN':  return scan(requests, head, diskSize, direction);
    case 'CSCAN': return cscan(requests, head, diskSize, direction);
    default:      return fcfs(requests, head);
  }
}

// ─── MAIN RUN ───────────────────────────────────────────────

function runSimulation() {
  const { diskSize, headPos, direction, requests, algo } = getInputs();
  if (!requests.length) {
    alert('Please enter at least one valid request.');
    return;
  }
  const result = runAlgo(algo, requests, headPos, diskSize, direction);
  updateMetrics(result);
  renderSeekLine(result, algo);
  renderBarChart(result, algo);
  renderSeekOrder(result);

  // Switch to seek chart tab
  activateTab('seekChart');
}

// ─── COMPARE ALL ────────────────────────────────────────────

function runCompare() {
  const { diskSize, headPos, direction, requests } = getInputs();
  if (!requests.length) {
    alert('Please enter at least one valid request.');
    return;
  }
  const algos = ['FCFS', 'SSTF', 'SCAN', 'CSCAN'];
  const allResults = {};
  algos.forEach(a => {
    allResults[a] = runAlgo(a, requests, headPos, diskSize, direction);
  });

  renderCompareChart(allResults);
  renderCompareTable(allResults);
  activateTab('compare');
}

// ─── TABS ───────────────────────────────────────────────────

function activateTab(id) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  const tab = document.querySelector(`.tab[data-tab="${id}"]`);
  const panel = document.getElementById(`tab-${id}`);
  if (tab) tab.classList.add('active');
  if (panel) panel.classList.add('active');
}

// ─── RANDOMIZE ──────────────────────────────────────────────

function randomizeQueue() {
  const diskSize = parseInt(document.getElementById('diskSize').value) || 200;
  const n = 8 + Math.floor(Math.random() * 5);
  const arr = Array.from({length: n}, () => Math.floor(Math.random() * diskSize));
  document.getElementById('requestQueue').value = arr.join(', ');
}

// ─── ALGO CARD SELECTION ─────────────────────────────────────

function setupAlgoCards() {
  document.querySelectorAll('.algo-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.algo-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });
}

// ─── INITIAL EMPTY STATE ─────────────────────────────────────

function setEmptyState() {
  ['tab-seekChart', 'tab-seekOrder', 'tab-barChart', 'tab-compare'].forEach(id => {
    const el = document.getElementById(id);
    if (!el.querySelector('.chart-wrap canvas, .seek-order-wrap')) {
      el.innerHTML = `<div class="empty-state">
        <div class="icon">💿</div>
        <p>Run a simulation to see results here.</p>
      </div>`;
    }
  });
}

// ─── CHART.JS GLOBAL DEFAULTS ───────────────────────────────

Chart.defaults.color = '#64748b';
Chart.defaults.font.family = 'Space Mono';

// ─── BOOT ───────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  setupAlgoCards();

  document.getElementById('runBtn').addEventListener('click', runSimulation);
  document.getElementById('compareBtn').addEventListener('click', runCompare);
  document.getElementById('randomizeBtn').addEventListener('click', randomizeQueue);
  document.getElementById('clearBtn').addEventListener('click', () => {
    document.getElementById('requestQueue').value = '';
  });

  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => activateTab(tab.dataset.tab));
  });

  // Head position must not exceed disk size
  document.getElementById('diskSize').addEventListener('input', () => {
    const ds = parseInt(document.getElementById('diskSize').value) || 200;
    const hp = document.getElementById('headPos');
    if (parseInt(hp.value) >= ds) hp.value = ds - 1;
    hp.max = ds - 1;
  });

  // Run on load with defaults to show users immediately
  runSimulation();
});
