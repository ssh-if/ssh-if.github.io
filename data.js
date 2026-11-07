/**
 * 简历网站内容配置
 * ------------------------------------------------------------
 * 全站内容都从这里读取。以后更新简历时，
 * 只需要改这个文件，不用动 HTML / CSS / JS。
 */

const RESUME = {
  // 站点与个人信息
  meta: {
    siteName: "苏绍彰 · 大数据开发",
    name: "苏绍彰",
    nameEn: "SU SHAOZHANG",
    initials: "SZ",
    role: "大数据开发工程师 · 2026 届",
    availability: "2026 届应届生 · 求职中，可立即到岗",
    location: "广西 · 南宁",
    years: "应届",
    tagline: "让数据从采集走到决策",
    intro:
      "数据科学与大数据技术专业 2026 届本科毕业生，具备数据链路全流程实践：能独立完成 Hadoop / Spark 分布式环境搭建与实时数据开发，熟练使用 Python（Pandas / NumPy / Scrapy）与 SQL 完成采集、清洗、分析到报表输出；熟悉 LangChain 与 RAG 技术栈，独立落地本地化向量知识库问答系统。2 段数据相关实习，习惯用数据支撑运营与产品决策。",
    email: "3161159058@qq.com",
    phone: "18577994961",
    wechat: "",
    resumePdf: "", // 把 PDF 简历放到 assets/resume.pdf 后，这里填 "assets/resume.pdf"
    socials: [
      { label: "GitHub", icon: "github", url: "https://github.com/ssh-if" }
    ]
  },

  // 首屏右侧的浮层信息卡
  heroCard: {
    status: "OPEN TO WORK",
    highlight: "大数据开发 · 数据分析 · RAG 应用",
    metrics: [
      { value: "5", label: "实战项目" },
      { value: "2", label: "段数据实习" },
      { value: "85%", label: "问答准确率" }
    ]
  },

  // 数据概览
  stats: [
    { value: "2026", label: "届本科毕业生", suffix: "届" },
    { value: "2", label: "段数据相关实习", suffix: "段" },
    { value: "5", label: "完整项目实践", suffix: "个" },
    { value: "85%+", label: "RAG 问答准确率", suffix: "" }
  ],

  // 关于我
  about: {
    paragraphs: [
      "我是苏绍彰，数据科学与大数据技术专业 2026 届本科毕业生，求职方向是大数据开发 / 数据开发。相比只停留在课堂，我更在意数据能不能真正跑通：从爬虫采集、清洗加工，到 Spark 分布式计算，再到可视化呈现，每一个环节我都完整做过一遍。",
      "两段数据相关实习里，我负责数据平台日常维护与多源数据清洗规范化，用 Python、SQL 输出业务报表，并参与用户行为与运营数据的可视化分析，为产品迭代和运营策略提供数据依据。这段经历让我熟悉了真实业务里「数据不准、口径不一」的麻烦，也让我养成了先对齐口径、再动手处理的习惯。",
      "项目方面，我用 Spark 生态做过实时交通流量监测与短时预测，也独立落地过基于 RAG 的本地知识库问答系统（准确率 85% 以上）。我希望能进入一个有真实数据规模的团队，把工程能力继续做扎实。"
    ],
    facts: [
      { label: "求职方向", value: "大数据 / 数据开发" },
      { label: "学历", value: "本科 · 2026 届" },
      { label: "期望城市", value: "南宁 / 深圳 / 广州" },
      { label: "到岗时间", value: "可立即到岗" }
    ]
  },

  // 技能
  skills: [
    {
      title: "大数据技术栈",
      icon: "database",
      desc: "分布式计算与实时处理",
      items: ["Hadoop", "Spark", "Spark SQL", "分布式环境搭建", "实时数据开发", "性能调优"]
    },
    {
      title: "数据处理与分析",
      icon: "code",
      desc: "采集、清洗、报表全流程",
      items: ["Python", "Pandas", "NumPy", "Scrapy", "SQL", "MySQL", "Java", "数据清洗"]
    },
    {
      title: "大模型应用开发",
      icon: "shield",
      desc: "RAG 与本地知识库",
      items: ["LangChain", "RAG", "ChromaDB", "Embedding", "提示词工程", "Streamlit"]
    },
    {
      title: "工具与可视化",
      icon: "users",
      desc: "开发环境与图表呈现",
      items: ["Linux", "Git", "VS Code", "Matplotlib", "数据可视化", "可视化大屏"]
    }
  ],

  // 工作经历（倒序）
  experience: [
    {
      company: "深圳市玖光视讯科技有限公司",
      role: "大数据实习生",
      period: "2025.11 — 2026.01",
      location: "深圳",
      summary: "维护企业数据平台日常运行，输出业务报表与可视化分析，支撑运营决策。",
      highlights: [
        "负责企业数据平台日常运维及数据清洗、整理，保障数据质量与处理效率，减少业务侧取数返工。",
        "使用 Python、SQL 对业务数据做多维分析，定期输出数据报表，为运营决策提供可直接使用的数据依据。",
        "参与用户行为与产品运营数据的可视化分析，通过图表呈现核心指标，辅助业务策略调整。"
      ],
      tags: ["数据平台运维", "Python", "SQL", "数据可视化"]
    },
    {
      company: "广西普端电子有限公司",
      role: "数据运维助理",
      period: "2024.04 — 2024.07",
      location: "广西",
      summary: "协助数据平台维护与多源数据处理，产出业务报表支撑日常分析。",
      highlights: [
        "协助数据平台日常维护，完成多源数据清洗与规范化处理，统一字段口径。",
        "利用 Python、SQL 进行业务数据分析并产出报表，提升数据响应速度。",
        "参与用户行为及运营数据的可视化分析，为产品迭代提供数据支持。"
      ],
      tags: ["数据清洗", "Python", "SQL", "报表开发"]
    },
    {
      company: "南宁恒银",
      role: "业务员",
      period: "2023.09 — 2024.02",
      location: "南宁",
      summary: "负责客户信息与跟进记录的整理汇总，协助回款数据统计核对。",
      highlights: [
        "负责客户信息登记与跟进记录整理，定期汇总数据并上报，保证台账完整可追溯。",
        "基于沟通情况标记客户状态，协助完成回款数据的统计与核对。"
      ],
      tags: ["数据整理", "客户信息", "统计核对"]
    }
  ],

  // 项目（按与目标岗位相关度排序）
  projects: [
    {
      name: "基于 Spark 的实时交通流量监测系统",
      category: "大数据 · 核心开发",
      year: "2026",
      featured: true,
      brief: "基于 Spark 生态搭建实时交通数据处理与预测链路，实现流量监测、短时预测与拥堵预警。",
      description:
        "面向实时交通场景的数据平台：从交通数据接入、清洗，到 Spark 分布式计算与流量预测，最终以可视化大屏呈现关键指标与拥堵预警，把「数据」直接转成可用的交通决策依据。",
      role: "核心开发 · 数据清洗 / 分布式计算 / 预测模型 / 可视化大屏",
      outcomes: [
        "基于 Spark 生态搭建实时交通数据处理链路，完成数据接入、清洗与分布式计算",
        "构建流量预测模型，输出短时流量预测结果，支撑拥堵预警",
        "开发可视化大屏，实时呈现交通流量与关键指标",
        "打通「采集 → 计算 → 预测 → 展示」全链路，提升数据到决策的转化效率"
      ],
      stack: ["Spark", "Spark SQL", "Hadoop", "Python", "可视化大屏"],
      links: [],
      theme: "cyan"
    },
    {
      name: "RAG 知识库问答系统",
      category: "AI 应用 · 独立开发",
      year: "2026",
      brief: "本地化 RAG 文档问答系统，支持 TXT / Markdown 上传与多轮对话，准确率 85% 以上。",
      description:
        "基于检索增强生成（RAG）的文档智能问答系统：文档上传后完成切分与向量化入库，检索相关片段增强大模型回答，并支持多轮对话。向量化与检索环节全部本地运行，不产生 API 费用。",
      role: "独立开发",
      outcomes: [
        "基于 RAG 架构实现文档智能问答，支持 TXT / Markdown 上传与多轮对话",
        "使用 ChromaDB 构建向量库，配合本地 Embedding 模型（text2vec-base-chinese）完成语义检索",
        "接入智谱 GLM-4-Flash 作为生成模型，向量化环节零 API 成本",
        "设计提示词模板优化回答质量，问答准确率达 85% 以上",
        "使用 Streamlit 构建 Web 界面，实现上传即用的完整闭环"
      ],
      stack: ["Python", "LangChain", "RAG", "ChromaDB", "Streamlit"],
      links: [{ label: "GitHub 源码", url: "https://github.com/ssh-if/my-ai-project" }],
      theme: "violet"
    },
    {
      name: "智联招聘职位信息分析",
      category: "数据采集 · 独立开发",
      year: "2025",
      brief: "采集公开招聘岗位数据，分析薪资与地域、经验的相关性，输出可视化结论与求职建议。",
      description:
        "一次完整的数据分析实践：从公开招聘岗位数据采集，到清洗标准化、结构化建模，再到相关性分析与可视化呈现，最终形成可落地的求职决策建议。",
      role: "独立开发",
      outcomes: [
        "使用 Python 处理反爬与动态加载机制，采集公开招聘岗位数据形成有效样本",
        "通过 Pandas 完成数据清洗、标准化与结构化处理",
        "构建包含薪资、城市、经验、技能标签的分析数据集",
        "分析薪资与地域、经验的相关性，使用 Matplotlib 输出可视化图表",
        "基于分析结果形成求职决策建议"
      ],
      stack: ["Python", "Scrapy", "Pandas", "Matplotlib", "SQL"],
      links: [],
      theme: "amber"
    },
    {
      name: "教务管理系统测试项目",
      category: "软件测试 · 个人练习",
      year: "2025",
      brief:
        "以教务管理 SaaS 系统为对象的完整测试流程练习：测试计划、用例设计、接口自动化、压测与缺陷管理。",
      description:
        "按真实测试项目流程完整演练的一次练习：从测试计划与用例设计，到 Postman / Pytest 接口自动化、JMeter 性能压测，再到缺陷跟踪与测试总结报告，覆盖 Web 后台、小程序与 H5 三类端。",
      role: "独立完成（个人练习项目）",
      outcomes: [
        "输出 12 页测试计划，覆盖功能、接口、性能、UI、兼容性 5 类测试",
        "围绕学员管理、报名缴费、登录等核心模块设计功能与接口测试用例",
        "使用 Pytest + Requests 实现核心接口自动化，Allure 生成可读测试报告",
        "使用 JMeter 设计 500 并发压测场景，输出性能测试报告",
        "维护缺陷清单并跟踪至回归闭环，形成完整测试总结报告"
      ],
      stack: ["Python", "Pytest", "Postman", "JMeter", "Allure"],
      links: [{ label: "GitHub 源码", url: "https://github.com/ssh-if/edu-ems-test-project" }],
      theme: "green"
    },
    {
      name: "俄罗斯方块 Tetris",
      category: "工程实践 · 独立开发",
      year: "2026",
      brief: "Python + Pygame 实现，逻辑层与渲染层解耦，60FPS 稳定运行。",
      description:
        "用 Python 与 Pygame 从零实现的经典俄罗斯方块，重点在核心逻辑与渲染的解耦设计，以及接近商业实现的操作手感。",
      role: "独立开发",
      outcomes: [
        "实现 7 种方块、旋转、消行、计分、等级提速与最高分持久化",
        "采用核心逻辑层与渲染层解耦架构，提升代码可维护性",
        "实现 7-bag 随机生成、wall-kick 踢墙、幽灵方块预览，60FPS 稳定运行"
      ],
      stack: ["Python", "Pygame", "面向对象设计"],
      links: [{ label: "GitHub 源码", url: "https://github.com/ssh-if/tetris-game-project" }],
      theme: "amber"
    }
  ],

  // 教育与证书
  education: [
    {
      school: "广西科技师范学院",
      degree: "数据科学与大数据技术 · 本科",
      period: "2024.09 — 2026.06",
      detail: "主修课程：Python、MySQL、Java、数据库应用技术、数据结构、数据可视化、Linux 操作系统。"
    }
  ],
  certificates: [
    {
      name: "Python 程序开发（中级）",
      issuer: "职业技能等级证书",
      year: "已获"
    }
  ],

  // 页脚
  footer: {
    note: "感谢阅读，期待有机会和你聊聊数据岗位。"
  }
};
