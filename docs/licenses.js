const LICENSES = {
  mit: {
    name: 'MIT License',
    shortName: 'MIT',
    type: '宽松',
    typeClass: 'permissive',
    tagline: '最简单、最流行的开源许可证',
    description: 'MIT 是最简洁的开源许可证之一，仅要求保留版权声明和许可声明即可。使用者可以任何方式使用、复制、修改、合并、发布、分发、销售代码。',
    pros: [
      '条款极简，容易理解',
      '几乎所有开源项目都接受',
      '商业使用完全自由',
      '适合闭源项目引用'
    ],
    cons: [
      '不提供专利授权保护',
      '不提供任何担保',
      '无法阻止他人声明专利'
    ],
    fullText: 'Permission is hereby granted, free of charge, to any person obtaining a copy of this software...',
    link: 'https://choosealicense.com/licenses/mit/',
    risk: '风险低。但若你的代码涉及专利，需注意 MIT 不提供专利授权。',
    networkUse: '✅ 完全允许（网络使用不算衍生）',
    commercial: '✅ 完全允许',
    patent: '❌ 无专利授权'
  },
  apache2: {
    name: 'Apache License 2.0',
    shortName: 'Apache 2.0',
    type: '宽松',
    typeClass: 'permissive',
    tagline: '宽松 + 专利授权',
    description: 'Apache 2.0 在 MIT 的基础上增加了明确的专利授权条款，并要求标注重大变更。是企业友好型许可证。',
    pros: [
      '明确的专利授权保护',
      '要求标注重大变更（透明度）',
      '商业使用友好',
      '提供专利攻击保护'
    ],
    cons: [
      '条款比 MIT 复杂',
      '需要包含 NOTICE 文件（如有）',
      '文件头注释要求严格'
    ],
    fullText: 'Licensed under the Apache License, Version 2.0...',
    link: 'https://choosealicense.com/licenses/apache-2.0/',
    risk: '风险低。含专利授权，适合有专利保护需求的项目。',
    networkUse: '✅ 完全允许',
    commercial: '✅ 完全允许',
    patent: '✅ 明确专利授权'
  },
  bsd3: {
    name: 'BSD 3-Clause License',
    shortName: 'BSD 3-Clause',
    type: '宽松',
    typeClass: 'permissive',
    tagline: '类MIT，禁止用作者名义推广',
    description: 'BSD 3-Clause 与 MIT 类似，但额外禁止使用项目作者的名义进行宣传推广。适合不希望被商业滥用的项目。',
    pros: [
      '条款简洁易读',
      '商业使用自由',
      '禁止用作者名义推广'
    ],
    cons: [
      '不提供专利授权',
      '不提供担保',
      '条款略多于 MIT'
    ],
    fullText: 'Redistribution and use in source and binary forms...',
    link: 'https://choosealicense.com/licenses/bsd-3-clause/',
    risk: '风险低。与 MIT 类似，但不禁止专利风险。',
    networkUse: '✅ 完全允许',
    commercial: '✅ 完全允许',
    patent: '❌ 无专利授权'
  },
  gpl3: {
    name: 'GNU General Public License v3.0',
    shortName: 'GPL v3',
    type: '传染',
    typeClass: 'copyleft',
    tagline: '强制衍生作品开源',
    description: 'GPL v3 是最强的传染型许可证之一。任何基于 GPL 代码的项目（链接、修改）都必须以 GPL 协议开源。',
    pros: [
      '强制衍生作品开源（保护开源生态）',
      '含专利授权',
      '明确反专利流氓条款',
      '禁止专利钓鱼'
    ],
    cons: [
      '商业使用受限（需开源）',
      '强传染导致生态锁定',
      '与其他许可证兼容困难'
    ],
    fullText: 'Everyone is permitted to copy and distribute verbatim copies...',
    link: 'https://choosealicense.com/licenses/gpl-3.0/',
    risk: '中等风险。必须开源所有衍生作品，可能影响商业化路径。',
    networkUse: '✅ 允许但视为衍生需开源',
    commercial: '⚠️ 需开源所有衍生作品',
    patent: '✅ 含专利授权'
  },
  agpl3: {
    name: 'GNU Affero General Public License v3.0',
    shortName: 'AGPL v3',
    type: '强传染',
    typeClass: 'strong-copyleft',
    tagline: '网络使用也需开源',
    description: 'AGPL 在 GPL 基础上更进一步：即使不发布程序，仅通过网络提供服务（ SaaS ）使用，也需要开源。是云/AI 服务项目的常用选择。',
    pros: [
      '最强传染，覆盖网络使用',
      '含专利授权',
      '确保开源生态共享'
    ],
    cons: [
      '对商业SaaS限制极大',
      '极少有商业项目采用',
      '与其他许可证几乎不兼容'
    ],
    fullText: 'Everyone is permitted to copy and distribute verbatim copies...',
    link: 'https://choosealicense.com/licenses/agpl-3.0/',
    risk: '高风险。若提供网络服务，所有修改需开源，包括服务端代码。',
    networkUse: '⚠️ 网络使用也需开源（核心差异）',
    commercial: '⚠️ 需开源所有衍生作品',
    patent: '✅ 含专利授权'
  },
  lgpl: {
    name: 'GNU Lesser General Public License v3.0',
    shortName: 'LGPL',
    type: '中等',
    typeClass: 'lgpl',
    tagline: '允许闭源动态链接',
    description: 'LGPL 是 GPL 的「宽容版」。允许闭源项目通过动态链接方式调用 LGPL 库，而不必开源整个项目。适合库/框架类项目。',
    pros: [
      '允许闭源项目调用',
      '动态链接不传染',
      '含专利授权',
      '适合库/SDK 发布'
    ],
    cons: [
      '修改库本身仍需开源',
      '规则复杂，易踩坑',
      '静态链接视为衍生需开源'
    ],
    fullText: 'Everyone is permitted to copy and distribute verbatim copies...',
    link: 'https://choosealicense.com/licenses/lgpl-3.0/',
    risk: '中等风险。注意链接方式（动态 vs 静态）决定是否传染。',
    networkUse: '✅ 允许',
    commercial: '⚠️ 动态链接允许，静态链接视为衍生',
    patent: '✅ 含专利授权'
  },
  mpl2: {
    name: 'Mozilla Public License 2.0',
    shortName: 'MPL 2.0',
    type: '中等',
    typeClass: 'mpl',
    tagline: '文件级传染，Firefox采用',
    description: 'MPL 2.0 是文件级别的传染型许可证。只有修改过的文件需要开源，单独新写的文件不需要。灵活性介于 GPL 和 MIT 之间。',
    pros: [
      '文件级传染，更灵活',
      '允许商业闭源项目引用',
      '含专利授权',
      '与 Firefox 生态兼容'
    ],
    cons: [
      '比 MIT/BSD 复杂',
      '需追踪哪些文件被修改',
      '组合授权规则复杂'
    ],
    fullText: 'This Source Code Form is subject to the terms of the Mozilla Public License...',
    link: 'https://choosealicense.com/licenses/mpl-2.0/',
    risk: '低-中风险。比 GPL 宽松，但需追踪文件修改。',
    networkUse: '✅ 允许',
    commercial: '⚠️ 修改文件需开源，新文件可闭源',
    patent: '✅ 含专利授权'
  },
  unlicense: {
    name: 'The Unlicense',
    shortName: 'Unlicense',
    type: '公有',
    typeClass: 'public',
    tagline: '无任何限制，相当于放弃版权',
    description: 'Unlicense 将代码完全贡献到公有领域，不附加任何条件。相当于作者放弃所有版权，使用者可以做任何事情。',
    pros: [
      '无任何限制',
      '代码可任意使用',
      '最适合公共项目/数据',
      '无许可证合规负担'
    ],
    cons: [
      '无法获得任何专利保护',
      '无法提供任何担保',
      '在某些司法管辖区可能无效'
    ],
    fullText: 'This is free and unencumbered software released into the public domain...',
    link: 'https://choosealicense.com/licenses/unlicense/',
    risk: '极低（无权利可主张）。但也意味着放弃所有法律保护。',
    networkUse: '✅ 完全允许',
    commercial: '✅ 完全允许',
    patent: '❌ 放弃所有权利'
  }
};
