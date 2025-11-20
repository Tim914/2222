import {
    Bot,
    Code,
    Cpu,
    DollarSign,
    ExternalLink,
    Github,
    Globe,
    Image as ImageIcon,
    Menu,
    Mic,
    Music,
    PenTool,
    Search,
    Sparkles,
    Star,
    User,
    Video,
    X
} from 'lucide-react';
import React, { useMemo, useState } from 'react';

// --- 数据源 (基于 README-CN.pdf) ---

const CATEGORIES = [
  { id: 'all', name: '全部工具', icon: Sparkles },
  { id: 'chatbots', name: 'AI 对话助手', icon: Bot },
  { id: 'opensource', name: '开源大语言模型', icon: Cpu },
  { id: 'dev', name: '编程开发', icon: Code },
  { id: 'image', name: 'AI 图像创作', icon: ImageIcon },
  { id: 'video', name: 'AI 视频创作', icon: Video },
  { id: 'audio', name: '语音与听写', icon: Mic },
  { id: 'music', name: '音乐与音效', icon: Music },
  { id: 'writing', name: '写作与翻译', icon: PenTool },
  { id: 'search', name: 'AI 搜索', icon: Globe },
  { id: 'agents', name: 'AI 智能体 (Agents)', icon: User },
];

const TOOLS_DATA = [
  // --- 对话助手 ---
  {
    name: "Gemini",
    category: "chatbots",
    description: "Google 的对话式 AI 工具和大语言模型。包含最新的 Gemini 2.5 Pro 和 Flash 模型，在图像编辑排行榜中位列榜首。",
    cost: "免费",
    link: "https://gemini.google.com",
    stars: null
  },
  {
    name: "通义千问 (Qwen)",
    category: "chatbots",
    description: "阿里的大语言模型。可体验最新的 Qwen3-Max-Thinking-Preview，支持深度推理模式。",
    cost: "免费",
    link: "https://tongyi.aliyun.com",
    stars: null
  },
  {
    name: "ChatGPT",
    category: "chatbots",
    description: "OpenAI 的 ChatGPT，最新模型包括 GPT-4o 及 GPT-5 预览特性。",
    cost: "免费 / 付费",
    link: "https://chat.openai.com",
    stars: null
  },
  {
    name: "Claude",
    category: "chatbots",
    description: "Anthropic 研发的 AI 助手，以编程能力强著称。最新模型是 Claude 3.5 Sonnet/Opus。",
    cost: "免费 / 付费",
    link: "https://claude.ai",
    stars: null
  },
  {
    name: "DeepSeek (深度求索)",
    category: "chatbots",
    description: "国产 AI 助手。DeepSeek-R1 推理模型表现卓越，API 性价比极高。",
    cost: "免费 / 付费",
    link: "https://chat.deepseek.com",
    stars: null
  },
  {
    name: "豆包",
    category: "chatbots",
    description: "字节跳动旗下的 AI 聊天软件，拥有 Chrome 插件，语音交互体验优秀。",
    cost: "免费",
    link: "https://www.doubao.com",
    stars: null
  },
  {
    name: "Kimi 智能助手",
    category: "chatbots",
    description: "月之暗面 (Moonshot AI) 出品。支持联网搜索，长文档总结能力极强。",
    cost: "免费",
    link: "https://kimi.moonshot.cn",
    stars: null
  },
  {
    name: "Grok",
    category: "chatbots",
    description: "xAI 研发的 AI 助手，结合了 X (Twitter) 上的实时内容。马斯克的 AI 公司产品。",
    cost: "免费 (需 X 会员)",
    link: "https://x.ai",
    stars: null
  },
  {
    name: "微软 Copilot",
    category: "chatbots",
    description: "微软的 Copilot，集成了 GPT-4、DALL-E 3 和必应搜索。",
    cost: "免费",
    link: "https://copilot.microsoft.com",
    stars: null
  },

  // --- 开源模型 ---
  {
    name: "DeepSeek-R1 / V3",
    category: "opensource",
    description: "第一代推理模型 DeepSeek-R1-Zero 和 V3 MoE 模型。在推理性能上表现卓越。",
    cost: "开源",
    link: "https://github.com/deepseek-ai/DeepSeek-LLM",
    stars: "91k"
  },
  {
    name: "Llama 3",
    category: "opensource",
    description: "Meta AI 开发的开源大模型系列。Llama 3 是目前最强大的开源模型之一。",
    cost: "开源",
    link: "https://github.com/meta-llama/llama3",
    stars: "29k"
  },
  {
    name: "Mixtral-8x7B",
    category: "opensource",
    description: "Mistral AI 的稀疏混合专家模型 (SMoE)，性能优于 Llama 2 70B。",
    cost: "开源",
    link: "https://mistral.ai",
    stars: "11k"
  },
  {
    name: "Qwen (通义千问开源版)",
    category: "opensource",
    description: "阿里研发的通义千问大模型系列 (Qwen-7B, 72B, Qwen1.5 等)。",
    cost: "开源",
    link: "https://github.com/QwenLM/Qwen",
    stars: "20k+"
  },

  // --- 编程开发 ---
  {
    name: "Cursor",
    category: "dev",
    description: "使用 GPT-4 进行协作的 AI 代码编辑器，编程体验极其流畅。",
    cost: "免费试用 / 付费",
    link: "https://cursor.sh",
    stars: null
  },
  {
    name: "GitHub Copilot",
    category: "dev",
    description: "GitHub 和 OpenAI 合作开发的代码编写助手，行业标准。",
    cost: "付费",
    link: "https://github.com/features/copilot",
    stars: null
  },
  {
    name: "Trae",
    category: "dev",
    description: "字节跳动推出的 AI 编程 IDE，类似 Cursor。",
    cost: "免费",
    link: "#",
    stars: null
  },
  {
    name: "通义灵码",
    category: "dev",
    description: "阿里云开发的编程助手，支持 Java、Python 等主流语言，兼容 VS Code 和 JetBrains。",
    cost: "免费",
    link: "#",
    stars: null
  },
  {
    name: "CodeGeeX",
    category: "dev",
    description: "智谱 AI 旗下的代码生成大模型，支持 200 多种语言。",
    cost: "免费",
    link: "#",
    stars: "7.6k"
  },
  {
    name: "gpt-engineer",
    category: "dev",
    description: "只需给出指令，就能直接构建整个代码库的 AI 程序员工具。",
    cost: "开源",
    link: "https://github.com/gpt-engineer-org/gpt-engineer",
    stars: "55k"
  },

  // --- 图像创作 ---
  {
    name: "Midjourney",
    category: "image",
    description: "目前公认效果最好的 AI 绘画工具，需在 Discord 中使用。",
    cost: "付费",
    link: "https://midjourney.com",
    stars: null
  },
  {
    name: "Stable Diffusion WebUI",
    category: "image",
    description: "Stable Diffusion 的可视化操作界面，插件丰富，功能强大。",
    cost: "免费 / 开源",
    link: "https://github.com/AUTOMATIC1111/stable-diffusion-webui",
    stars: "158k"
  },
  {
    name: "即梦 AI (Jimeng)",
    category: "image",
    description: "字节跳动旗下的文生图、AI 视频生成和图片编辑应用。",
    cost: "免费 / 付费",
    link: "https://jimeng.jianying.com/",
    stars: null
  },
  {
    name: "Flux",
    category: "image",
    description: "Black Forest Labs 推出的高性能开源文生图模型。",
    cost: "免费 / 开源",
    link: "https://github.com/black-forest-labs/flux",
    stars: null
  },
  {
    name: "ControlNet",
    category: "image",
    description: "让 Stable Diffusion 实现精准控制（如姿态、边缘）的神经网络结构。",
    cost: "开源",
    link: "https://github.com/lllyasviel/ControlNet",
    stars: "33k"
  },

  // --- 视频创作 ---
  {
    name: "Sora",
    category: "video",
    description: "OpenAI 的文本生成视频模型，可生成长达 60 秒的连贯视频。",
    cost: "付费 / 限量",
    link: "https://openai.com/sora",
    stars: null
  },
  {
    name: "Runway",
    category: "video",
    description: "老牌 AI 视频工具，Gen-2 和 Gen-3 Alpha 模型提供电影级生成效果。",
    cost: "免费试用 / 付费",
    link: "https://runwayml.com",
    stars: null
  },
  {
    name: "可灵 (Kling)",
    category: "video",
    description: "快手推出的视频生成大模型，支持文生视频和图生视频，效果惊艳。",
    cost: "免费 / 付费",
    link: "https://kling.kuaishou.com/",
    stars: null
  },
  {
    name: "Luma Dream Machine",
    category: "video",
    description: "Luma AI 推出，生成速度快，视频质量高且逼真。",
    cost: "免费 / 付费",
    link: "https://lumalabs.ai/dream-machine",
    stars: null
  },
  {
    name: "AnimateDiff",
    category: "video",
    description: "基于 Stable Diffusion 的开源动画生成方法。",
    cost: "开源",
    link: "https://github.com/guoyww/AnimateDiff",
    stars: "12k"
  },

  // --- 搜索 ---
  {
    name: "Perplexity.ai",
    category: "search",
    description: "基于 GPT 的对话式搜索引擎，提供精准的引用来源。",
    cost: "免费 / 付费",
    link: "https://perplexity.ai",
    stars: null
  },
  {
    name: "秘塔 AI 搜索",
    category: "search",
    description: "无广告，搜索并汇总全网信息，生成结构化报告，支持大纲视图。",
    cost: "免费",
    link: "https://metaso.cn",
    stars: null
  },
  {
    name: "知乎直答",
    category: "search",
    description: "知乎推出的 AI 搜索，拥有通用搜索和专业深度搜索模式。",
    cost: "免费",
    link: "https://zhida.zhihu.com",
    stars: null
  },
  {
    name: "MindSearch (思索)",
    category: "search",
    description: "中科大与上海 AI 实验室研发的开源搜索引擎，模拟人类研究过程。",
    cost: "开源",
    link: "https://github.com/InternLM/MindSearch",
    stars: "6.7k"
  },

  // --- 音乐与音频 ---
  {
    name: "Suno",
    category: "music",
    description: "仅需输入歌词或描述，即可生成包含人声的完整歌曲。",
    cost: "免费 / 付费",
    link: "https://suno.com",
    stars: null
  },
  {
    name: "Udio",
    category: "music",
    description: "高保真音乐生成工具，音乐质感极佳。",
    cost: "免费 / 付费",
    link: "https://udio.com",
    stars: null
  },
  {
    name: "Whisper",
    category: "audio",
    description: "OpenAI 开源的鲁棒性语音识别模型，支持多语言转录。",
    cost: "开源",
    link: "https://github.com/openai/whisper",
    stars: "91k"
  },
  {
    name: "ChatTTS",
    category: "audio",
    description: "专门为对话场景设计的文本转语音模型，语气非常自然。",
    cost: "开源",
    link: "https://chattts.com",
    stars: "38k"
  },
  {
    name: "ElevenLabs",
    category: "audio",
    description: "提供极其逼真的文本转语音服务和声音克隆功能。",
    cost: "免费 / 付费",
    link: "https://elevenlabs.io",
    stars: null
  },
  
   // --- 智能体 ---
  {
    name: "Auto-GPT",
    category: "agents",
    description: "一个实验性的开源项目，旨在让 GPT-4 完全自主地实现设定的目标。",
    cost: "开源",
    link: "https://github.com/Significant-Gravitas/Auto-GPT",
    stars: "180k"
  },
   {
    name: "Microsoft AutoGen",
    category: "agents",
    description: "微软开源框架，允许通过多个智能体协作来构建 LLM 应用。",
    cost: "开源",
    link: "https://github.com/microsoft/autogen",
    stars: "52k"
  }
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Filter tools based on category and search query
  const filteredTools = useMemo(() => {
    return TOOLS_DATA.filter(tool => {
      const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const activeCategoryData = CATEGORIES.find(c => c.id === activeCategory);

  return (
    <div className="flex h-screen bg-gray-50 text-slate-900 font-sans overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-30
          w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-2 text-indigo-600">
              <Bot className="w-8 h-8" />
              <h1 className="text-xl font-bold tracking-tight">AI 工具导航</h1>
            </div>
            <p className="text-xs text-gray-500 mt-1">Based on Awesome-AI-Tools</p>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
            {CATEGORIES.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                    ${activeCategory === category.id 
                      ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                  `}
                >
                  <Icon className={`w-4 h-4 ${activeCategory === category.id ? 'text-indigo-600' : 'text-gray-400'}`} />
                  {category.name}
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-100 bg-gray-50/50">
            <a 
              href="https://github.com/ikaijua/Awesome-AITools" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 text-xs text-gray-500 hover:text-indigo-600 transition-colors justify-center"
            >
              <Github className="w-4 h-4" />
              查看 GitHub 源项目
            </a>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-gray-50/50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                {activeCategoryData?.icon && <activeCategoryData.icon className="w-5 h-5 text-indigo-500" />}
                {activeCategoryData?.name}
              </h2>
              <p className="text-sm text-gray-500 hidden sm:block">
                共收录 {filteredTools.length} 个工具
              </p>
            </div>
          </div>

          <div className="relative w-full max-w-md ml-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm transition-all"
              placeholder="搜索工具名称、描述..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </header>

        {/* Content Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTools.map((tool, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col group"
                >
                  <div className="p-5 flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                          {/* Dynamically select icon based on category if possible, else default */}
                          {tool.stars ? <Github className="w-5 h-5" /> : <ExternalLink className="w-5 h-5" />}
                        </div>
                      </div>
                      {tool.stars && (
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-yellow-50 text-yellow-700 ring-1 ring-yellow-400/20">
                          <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                          {tool.stars}
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-3 mb-4">
                      {tool.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mt-auto">
                       <span className={`
                         inline-flex items-center px-2 py-1 rounded text-xs font-medium 
                         ${(tool.cost && tool.cost.includes('免费')) || (tool.cost && tool.cost.includes('开源'))
                           ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20' 
                           : 'bg-gray-100 text-gray-700 ring-1 ring-gray-500/20'}
                       `}>
                         <DollarSign className="w-3 h-3 mr-1" />
                         {tool.cost}
                       </span>
                    </div>
                  </div>

                  <div className="px-5 py-4 bg-gray-50/50 border-t border-gray-100 rounded-b-xl flex items-center justify-between">
                     <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {CATEGORIES.find(c => c.id === tool.category)?.name || '工具'}
                     </span>
                     <a 
                       href={tool.link}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                     >
                       访问 <ExternalLink className="w-3 h-3" />
                     </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-12">
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">未找到相关工具</h3>
              <p className="text-gray-500 mt-2 max-w-sm">
                在 {activeCategoryData?.name} 分类下未找到与 "{searchQuery}" 匹配的内容。
              </p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="mt-6 text-indigo-600 font-medium hover:text-indigo-800"
              >
                清除筛选
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Removed jsx and global attributes to fix React console warning */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.5);
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
}