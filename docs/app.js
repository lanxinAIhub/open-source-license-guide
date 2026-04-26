// AI 推荐逻辑
function recommendLicense(answers) {
  const { commercial, forceOpen, needPatent, networkUse } = answers;

  // AGPL: 网络使用 + 强制开源
  if (networkUse === 'network-yes' && forceOpen === 'force-open') {
    return ['agpl3', ['gpl3', 'mpl2']];
  }

  // GPL: 强制开源（无网络使用）
  if (forceOpen === 'force-open') {
    return ['gpl3', ['agpl3', 'mpl2']];
  }

  // 网络服务 + 商业 → 矛盾场景，给出警告
  if (networkUse === 'network-yes' && commercial === 'commercial') {
    return ['mpl2', ['lgpl', 'apache2']];
  }

  // 需要专利授权
  if (needPatent === 'need-patent') {
    return ['apache2', ['mit', 'bsd3']];
  }

  // 商业/闭源项目（最常见场景）
  if (commercial === 'commercial' || commercial === 'uncertain') {
    if (forceOpen === 'allow-closed') {
      return ['apache2', ['mit', 'lgpl', 'mpl2']];
    }
    return ['mit', ['apache2', 'bsd3']];
  }

  // 纯开源，不强制传染
  if (commercial === 'open') {
    if (needPatent === 'need-patent') {
      return ['apache2', ['mpl2', 'lgpl']];
    }
    return ['mit', ['apache2', 'bsd3', 'mpl2']];
  }

  // 默认
  return ['mit', ['apache2', 'bsd3']];
}

function getRecommendationReason(answers, primaryId) {
  const reasons = {
    mit: '你的项目偏向商业/闭源使用，不需要强制开源，专利授权非刚需。MIT 最简洁灵活，是最安全的起步选择。',
    apache2: '你明确需要专利授权保护。Apache 2.0 在宽松条款下提供了完整的专利授权，适合企业项目。',
    gpl3: '你要求衍生作品必须开源。GPL v3 确保你的项目被开源生态共享，同时提供专利保护。',
    agpl3: '你的项目通过网络提供服务且要求衍生开源。AGPL v3 是唯一覆盖 SaaS 网络使用的强传染许可证。',
    lgpl: '你的项目需要被其他项目调用，但不希望强制衍生开源。LGPL 允许闭源动态链接，是库/SDK 的理想选择。',
    mpl2: '你希望平衡开源传染与商业灵活性。MPL 2.0 文件级传染，只需开源修改过的文件，新文件可保持闭源。',
    unlicense: '你希望代码完全无限制地贡献给公众领域。Unlicense 放弃所有版权，无任何合规负担。'
  };
  return reasons[primaryId] || '基于你的回答推荐。';
}

function buildResultCard(primaryId, alternatives) {
  const lic = LICENSES[primaryId];
  const altCards = alternatives.map(id => {
    const alt = LICENSES[id];
    return `
      <div class="comp-card">
        <h5>${alt.shortName}</h5>
        <div class="comp-type"><span class="badge ${alt.typeClass}">${alt.type}</span></div>
        <p class="comp-desc">${alt.tagline}</p>
      </div>
    `;
  }).join('');

  const pros = lic.pros.map(p => `<li>✅ ${p}</li>`).join('');
  const cons = lic.cons.map(c => `<li>⚠️ ${c}</li>`).join('');

  return `
    <div class="result-card">
      <h4>${lic.name}</h4>
      <div class="license-type"><span class="badge ${lic.typeClass}">${lic.type}</span> · ${lic.tagline}</div>
      <p>${lic.description}</p>
      <div class="pros-cons">
        <div class="pros"><h5>✅ 优点</h5><ul>${pros}</ul></div>
        <div class="cons"><h5>⚠️ 缺点</h5><ul>${cons}</ul></div>
      </div>
      <div class="reason"><strong>📌 推荐理由：</strong>${getRecommendationReason(window._answers, primaryId)}</div>
      <div style="margin-top:1rem;font-size:0.85rem;color:var(--text2);">
        <p><strong>🌐 网络使用：</strong>${lic.networkUse}</p>
        <p><strong>💼 商业使用：</strong>${lic.commercial}</p>
        <p><strong>📜 专利授权：</strong>${lic.patent}</p>
      </div>
      <div class="risk">⚖️ 法律风险提示：${lic.risk}</div>
      <a href="${lic.link}" target="_blank" class="fulltext-link">📄 查看许可证全文 →</a>
    </div>
    ${alternatives.length > 0 ? `<h4 style="margin-bottom:1rem;">🥈 其他可选方案</h4><div class="comparison-cards">${altCards}</div>` : ''}
  `;
}

// 问卷状态
let currentQ = 1;
window._answers = {};

document.addEventListener('DOMContentLoaded', () => {
  // 绑定选项按钮
  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', handleOption);
  });
  renderDetails();
});

function handleOption(e) {
  const btn = e.currentTarget;
  const qId = btn.closest('.question').id;
  const val = btn.dataset.val;
  const qNum = parseInt(qId.replace('q', ''));

  // 移除同级选中
  document.querySelectorAll(`#${qId} .option-btn`).forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');

  window._answers[qNum] = val;

  // 推进到下一题
  setTimeout(() => {
    const nextQ = qNum + 1;
    if (nextQ <= 4) {
      document.getElementById(`q${qNum}`).classList.add('hidden');
      document.getElementById(`q${nextQ}`).classList.remove('hidden');
      currentQ = nextQ;
    } else {
      // 显示结果
      document.getElementById(`q${qNum}`).classList.add('hidden');
      showResult();
    }
  }, 200);
}

function showResult() {
  const [primary, alternatives] = recommendLicense(window._answers);
  const html = buildResultCard(primary, alternatives);
  document.getElementById('result-card').innerHTML = html;
  document.getElementById('result').classList.remove('hidden');
  document.getElementById('result').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function resetQuiz() {
  currentQ = 1;
  window._answers = {};
  document.querySelectorAll('.question').forEach((q, i) => {
    q.classList.toggle('hidden', i !== 0);
  });
  document.getElementById('result').classList.add('hidden');
  document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
  document.getElementById('quiz').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderDetails() {
  const grid = document.getElementById('details-grid');
  grid.innerHTML = Object.values(LICENSES).map(lic => `
    <div class="detail-card">
      <h3>${lic.name}</h3>
      <span class="badge ${lic.typeClass} detail-type">${lic.type}</span>
      <p>${lic.description}</p>
      <p><strong>网络使用：</strong>${lic.networkUse}</p>
      <p><strong>商业使用：</strong>${lic.commercial}</p>
      <p><strong>专利授权：</strong>${lic.patent}</p>
      <a href="${lic.link}" target="_blank" class="fulltext-link">📄 查看全文 →</a>
    </div>
  `).join('');
}
