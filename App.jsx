import React, { useState, useEffect } from 'react';

import { 

 LayoutDashboard, BookOpen, Globe, Users, Settings, Plus, Sparkles, 

 BarChart3, Zap, Search, BookMarked, Trophy, History, ShieldCheck, 

 ChevronRight, Edit3, MoreVertical, Wand2, ListTree, UserCircle2, 

 Scissors, Fingerprint, Users2, Cpu, ArrowRightLeft, BookCopy, 

 ArrowLeft, FileText, Folders, ChevronLeft, BrainCircuit, DraftingCompass, 

 Library, Lightbulb, Tags, Bookmark, Layers, Component, Trash2, 

 CheckCircle, Clock, RefreshCcw, GitBranch, ChevronDown, X, Send, Check,

 Share2, Download, Calendar, Activity, Map, Link2

} from 'lucide-react';

const apiKey = "";

const MODEL_NAME = "gemini-2.5-flash-preview-09-2025";

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${apiKey}`;

const App = () => {

 // 全局状态管理

 const [activeView, setActiveView] = useState('dashboard'); 

 const [selectedBook, setSelectedBook] = useState(null); 

 const [projectTab, setProjectTab] = useState('editor'); 

 const [bookshelfTab, setBookshelfTab] = useState('all');

 const [labTab, setLabTab] = useState('deconstruct');

 const [isGenerating, setIsGenerating] = useState(false);

 const [showCreateModal, setShowCreateModal] = useState(false);

 // 模拟核心数据

 const [books, setBooks] = useState([

  { id: 1, title: "重回70，我手握百亿物资", status: "ongoing", words: "128.5万", progress: 65, color: "bg-indigo-600", theme: "凡人逆命与潜能重构" },

  { id: 2, title: "星际远航：人类最后的家园", status: "ongoing", words: "5.1k", progress: 5, color: "bg-rose-600", theme: "文明火种与宇宙博弈" },

  { id: 3, title: "大明锦衣卫：绣春刀鸣", status: "completed", words: "240万", progress: 100, color: "bg-emerald-600", theme: "权力枷锁下的正义" }

 ]);

 // --- 核心交互逻辑 ---

 const openBook = (book) => {

  setSelectedBook(book);

  setActiveView('project');

  setProjectTab('editor');

 };

 const closeBook = () => {

  setSelectedBook(null);

  setActiveView('bookshelf');

 };

 const handleCreateBook = (newBook) => {

  const bookWithId = { ...newBook, id: Date.now(), words: "0", progress: 0, color: "bg-indigo-600", status: "ongoing" };

  setBooks([bookWithId, ...books]);

  setShowCreateModal(false);

  openBook(bookWithId);

 };

 return (

    <div className="flex h-screen bg-[#0f1115] text-gray-200 font-sans overflow-hidden">

   


   {/* 1. 全局导航侧边栏 */}

   <aside className="w-64 border-r border-white/5 bg-[#16181d] flex flex-col shrink-0 transition-all duration-300">


        <div className="p-5 border-b border-white/5">

​     {selectedBook ? (

​      <button onClick={closeBook} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">

​       <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />

​       <span className="text-xs font-bold uppercase tracking-widest">返回主菜单</span>

​      </button>

​     ) : (

            <div className="flex items-center gap-3">
    
              <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-2xl font-black italic text-white shadow-indigo-500/20">IV</div>

​       <span className="font-bold text-white tracking-tight uppercase">InkVerse AI</span>

​      </div>

​     )}

​    </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-hide">

​     {!selectedBook ? (

​      <>

              <div className="text-[10px] text-gray-500 font-black px-4 mb-2 mt-2 uppercase tracking-[0.25em]">Workspace</div>

​       <SidebarItem icon={LayoutDashboard} label="首页控制台" active={activeView === 'dashboard'} onClick={() => setActiveView('dashboard')} />

​       <SidebarItem icon={BookOpen} label="作品书架" active={activeView === 'bookshelf'} onClick={() => setActiveView('bookshelf')} />

​       

              <div className="text-[10px] text-gray-500 font-black px-4 mb-2 mt-8 uppercase tracking-[0.25em]">AI Assets</div>

​       <SidebarItem icon={Library} label="提示词模板" active={activeView === 'prompts'} onClick={() => setActiveView('prompts')} />

​       <SidebarItem icon={Component} label="技能中心" active={activeView === 'skills'} onClick={() => setActiveView('skills')} />

​       

              <div className="text-[10px] text-gray-500 font-black px-4 mb-2 mt-8 uppercase tracking-[0.25em]">Advanced</div>

​       <SidebarItem icon={Scissors} label="爆款拆书" active={activeView === 'lab' && labTab === 'deconstruct'} onClick={() => { setActiveView('lab'); setLabTab('deconstruct'); }} />

​       <SidebarItem icon={Fingerprint} label="风格复刻" active={activeView === 'lab' && labTab === 'mimic'} onClick={() => { setActiveView('lab'); setLabTab('mimic'); }} />

​      </>

​     ) : (

​      <>

              <div className="px-4 py-4 mb-4 bg-indigo-600/5 rounded-2xl border border-indigo-500/10">
    
                <p className="text-[10px] text-indigo-400 font-bold uppercase mb-1 tracking-widest">Writing Project</p>

​        <h3 className="text-sm font-bold text-white truncate">{selectedBook.title}</h3>

​       </div>

​       <SidebarItem icon={ListTree} label="章节编写" active={projectTab === 'editor'} onClick={() => setProjectTab('editor')} />

​       <SidebarItem icon={DraftingCompass} label="剧情总纲" active={projectTab === 'outline'} onClick={() => setProjectTab('outline')} />

​       

              <div className="text-[10px] text-gray-500 font-black px-4 mb-2 mt-8 uppercase tracking-[0.25em]">World Assets</div>

​       <SidebarItem icon={Globe} label="世界设定" active={projectTab === 'world'} onClick={() => setProjectTab('world')} />

​       <SidebarItem icon={Users} label="角色档案" active={projectTab === 'roles'} onClick={() => setProjectTab('roles')} />

​       <SidebarItem icon={Link2} label="关系图谱" active={projectTab === 'map'} onClick={() => setProjectTab('map')} />

​      </>

​     )}

​    </div>

        <div className="p-4 border-t border-white/5 bg-black/10">
    
          <div className="flex items-center gap-3">
    
            <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-xs font-black text-indigo-900 border-4 border-indigo-500/20">U</div>
    
            <div className="flex-1 min-w-0">
    
              <p className="text-xs font-bold text-white truncate">笔耕不辍</p>
    
              <p className="text-[10px] text-gray-500">钻石创作者</p>

​      </div>

​      <Settings size={16} className="text-gray-500 hover:text-white cursor-pointer" />

​     </div>

​    </div>

   </aside>

   {/* 2. 主展示内容区 */}

   <main className="flex-1 flex flex-col relative overflow-hidden">


​    {activeView === 'dashboard' && <DashboardView onResume={() => openBook(books[0])} />}

​    {activeView === 'bookshelf' && <BookshelfView books={books} activeTab={bookshelfTab} setTab={setBookshelfTab} onOpenBook={openBook} onCreate={() => setShowCreateModal(true)} />}

​    {activeView === 'lab' && <CreativeLabView tab={labTab} />}

​    {activeView === 'prompts' && <PromptLibraryView />}

​    {activeView === 'skills' && <SkillCenterView />}

​    {activeView === 'project' && <ProjectEditor tab={projectTab} book={selectedBook} />}

​    {isGenerating && (

          <div className="absolute top-6 right-8 flex items-center gap-3 bg-indigo-600 px-6 py-2.5 rounded-full shadow-2xl animate-pulse z-[100]">

​      <Zap size={14} className="animate-spin text-white" />

​      <span className="text-xs font-bold tracking-wider text-white">AI 正在深度同构中...</span>

​     </div>

​    )}

   </main>

   {/* 3. 引导式/手动建书弹窗 */}

   {showCreateModal && <CreateProjectModal onClose={() => setShowCreateModal(false)} onSubmit={handleCreateBook} />}

  </div>

 );

};

// --- 子视图组件 ---

const DashboardView = ({ onResume }) => (

  <div className="p-10 h-full overflow-y-auto scrollbar-hide space-y-10">


    <div className="bg-gradient-to-br from-[#1e222b] to-[#16181d] p-12 rounded-[3.5rem] border border-white/5 relative overflow-hidden shadow-2xl">
    
      <div className="relative z-10 flex items-center justify-between">
    
        <div className="max-w-xl">
    
          <div className="flex items-center gap-2 mb-6">

​      <Activity size={16} className="text-indigo-400" />

​      <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">写作状态：火热进行中</span>

​     </div>

​     <h2 className="text-5xl font-black text-white mb-6 italic tracking-tighter">下午好，创作者</h2>

          <p className="text-gray-400 text-sm leading-loose font-medium mb-8">你已经连续创作 12 天了，今日目标还剩 1,240 字。AI 已经根据你的前序章节生成了 3 条剧情转折建议。</p>

​     <button onClick={onResume} className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-2xl text-sm font-black shadow-2xl shadow-indigo-500/30 transition-all flex items-center gap-3 active:scale-95">

​      <Edit3 size={20} /> 继续创作最近作品

​     </button>

​    </div>

        <div className="hidden lg:block w-64 h-64 bg-white/2 rounded-full border border-white/5 relative">
    
          <div className="absolute inset-0 flex flex-col items-center justify-center">

​      <span className="text-4xl font-black text-indigo-400 tracking-tighter">85%</span>

​      <span className="text-[10px] text-gray-500 uppercase mt-2">今日进度</span>

​     </div>

          <svg className="w-full h-full -rotate-90">

​      <circle cx="128" cy="128" r="120" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />

​      <circle cx="128" cy="128" r="120" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="753.6" strokeDashoffset="113" className="text-indigo-500" />

​     </svg>

​    </div>

   </div>

      <div className="absolute -right-20 -top-20 w-[40rem] h-[40rem] bg-indigo-600/10 rounded-full blur-[160px]"></div>

  </div>

  

    <div className="grid grid-cols-4 gap-6">

   <StatCard icon={History} label="创作总字数" value="128.5万" color="text-indigo-400" />

   <StatCard icon={Calendar} label="连更天数" value="12天" color="text-emerald-400" />

   <StatCard icon={BookMarked} label="项目总数" value="12" color="text-amber-400" />

   <StatCard icon={Trophy} label="创作者荣誉" value="白金段位" color="text-rose-400" />

  </div>

 </div>

);

const BookshelfView = ({ books, activeTab, setTab, onOpenBook, onCreate }) => (

  <div className="p-12 h-full overflow-y-auto scrollbar-hide">


    <div className="max-w-7xl mx-auto space-y-12">

   <header className="flex items-center justify-between">


        <div>

​     <h2 className="text-3xl font-black text-white tracking-tight uppercase italic">InkVerse Bookshelf</h2>

          <p className="text-sm text-gray-500 mt-2 font-medium">所有的文字，都是通往异世界的门票</p>

​    </div>

​    <button onClick={onCreate} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-2xl text-sm font-black flex items-center gap-2 shadow-2xl shadow-indigo-500/30 transition-all">+ 新建项目</button>

   </header>

   

      <div className="flex gap-2 p-1 bg-white/5 rounded-2xl w-fit">

​    {['all', 'ongoing', 'completed', 'trash'].map(t => (

​     <button 

​      key={t} 

​      onClick={() => setTab(t)} 

​      className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === t ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}

​     \>

​      {t === 'all' ? '全部' : t === 'ongoing' ? '进行中' : t === 'completed' ? '已完本' : '回收站'}

​     </button>

​    ))}

   </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-10">

​    {activeTab === 'all' && (

          <div onClick={onCreate} className="flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[3rem] h-[22rem] hover:border-indigo-500/40 hover:bg-white/5 cursor-pointer transition-all group">

​      <Plus size={40} className="text-gray-700 mb-4 group-hover:text-indigo-400 group-hover:scale-110 transition-all" />

​      <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">启动新篇章</span>

​     </div>

​    )}

​    {books.filter(b => activeTab === 'all' || b.status === activeTab).map(book => (

          <div key={book.id} onClick={() => onOpenBook(book)} className="flex flex-col group cursor-pointer">
    
            <div className={`h-[22rem] rounded-[3rem] relative overflow-hidden mb-5 shadow-2xl transition-all group-hover:-translate-y-3 ${book.color} flex items-center justify-center p-8`}>
    
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>

​       <h4 className="text-white font-black text-center text-xl leading-tight uppercase tracking-tighter drop-shadow-2xl">{book.title}</h4>

              <div className="absolute bottom-10 left-10 right-10">
    
                <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
    
                  <div className="h-full bg-white transition-all duration-1000 shadow-[0_0_15px_white]" style={{ width: `${book.progress}%` }}></div>

​        </div>

​       </div>

​      </div>

​      <h5 className="font-bold text-sm text-white px-3 truncate group-hover:text-indigo-400 transition-colors">{book.title}</h5>

​      <span className="text-[10px] text-gray-500 font-bold uppercase mt-1 px-3 tracking-[0.1em]">{book.words} 字 · {book.status === 'completed' ? '已完结' : '连载'}</span>

​     </div>

​    ))}

   </div>

  </div>

 </div>

);

const ProjectEditor = ({ tab, book }) => {

 const [content, setContent] = useState("");

 const renderContent = () => {

  switch (tab) {

   case 'outline': return <ProjectOutlineView />;

   case 'world': return <ProjectWorldView />;

   case 'roles': return <ProjectRolesView />;

   case 'map': return <ProjectMapView />;

   default: return (

        <div className="flex h-full overflow-hidden">

​     {/* 增强型分层目录 (卷-章-场) */}

          <div className="w-72 border-r border-white/5 bg-[#12141a]/60 flex flex-col">
    
            <div className="p-5 border-b border-white/5 flex justify-between items-center bg-black/20">

​       <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2"><ListTree size={14} /> 结构化目录</span>

​       <Plus size={14} className="text-indigo-400 cursor-pointer" />

​      </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-4 scrollbar-hide">
    
              <div>
    
                <div className="px-4 py-2 text-[10px] font-black text-gray-600 uppercase border-l-2 border-indigo-500/40 mb-2">第一卷：涅槃重生</div>

​        {["第一章：魂归故里", "第二章：空间之谜", "第三章：意外惊喜"].map((ch, i) => (

                  <div key={ch} className="mb-1">

​          <button className={`w-full text-left px-4 py-2.5 rounded-xl text-xs flex items-center gap-3 ${i === 0 ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-500 hover:bg-white/5'}`}>

​           <FileText size={14} /> {ch}

​          </button>

​          {i === 0 && (

                      <div className="ml-8 mt-2 space-y-1 border-l border-white/10 pl-4 py-1">

​            <button className="w-full text-left py-1 text-[10px] text-indigo-400 font-medium">● 场景 1：废弃的柴房</button>

​            <button className="w-full text-left py-1 text-[10px] text-gray-600 hover:text-gray-400 transition-colors">● 场景 2：第一滴灵泉</button>

​           </div>

​          )}

​         </div>

​        ))}

​       </div>

​      </div>

​     </div>

​     {/* 沉浸式编辑器 */}

          <div className="flex-1 flex flex-col relative bg-transparent">

​      <header className="h-14 border-b border-white/5 px-8 flex items-center justify-between bg-[#12141a]/40 backdrop-blur-md">

              <div className="flex items-center gap-4">

​         <span className="text-xs font-bold text-gray-500">{book.title}</span>

​         <ChevronRight size={14} className="text-gray-800" />

​         <span className="text-xs font-black text-white">第一章：魂归故里</span>

​       </div>

              <div className="flex gap-6 items-center">

​        <button className="p-2 text-gray-500 hover:text-white transition-colors" title="分享项目"><Share2 size={18} /></button>

​        <button className="p-2 text-gray-500 hover:text-white transition-colors" title="导出稿件"><Download size={18} /></button>

                <div className="w-px h-4 bg-white/10"></div>

​        <MoreVertical size={18} className="text-gray-600 cursor-pointer" />

​       </div>

​      </header>

            <div className="flex-1 overflow-y-auto p-12 md:p-24 flex justify-center scrollbar-hide">

​       <textarea 

​        className="w-full max-w-2xl bg-transparent border-none focus:ring-0 text-xl leading-[2.2] text-gray-300 resize-none font-serif h-full selection:bg-indigo-500/30"

​        placeholder="这一刻，李晓睁开了眼..."

​        value={content}

​        onChange={(e) => setContent(e.target.value)}

​       />

​      </div>

​     </div>

​     {/* AI 写作挂件 */}

​     <aside className="w-80 border-l border-white/5 bg-[#12141a]/60 p-6 flex flex-col">

            <div className="flex items-center gap-2 mb-8">

​       <Sparkles size={16} className="text-indigo-400 animate-pulse" />

​       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">AI 实时创作辅助</span>

​      </div>

            <div className="flex-1 space-y-6">
    
              <div className="bg-indigo-600/5 p-5 rounded-[2rem] border border-indigo-500/10 hover:bg-indigo-600/10 transition-all cursor-pointer group">
    
                <div className="flex justify-between items-center mb-3">

​         <span className="text-[10px] font-bold text-indigo-400 uppercase">剧情转折推荐</span>

​         <Wand2 size={12} className="text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />

​        </div>

                <p className="text-xs text-indigo-300 leading-relaxed italic">"此时李大海正好闯入，可以利用李晓新获得的空间能力制造一次'灵异'防御，初次展示爽点..."</p>

​       </div>

​       

              <div className="pt-6 border-t border-white/5">

​         <h4 className="text-[10px] font-black text-gray-600 uppercase mb-4 tracking-widest italic">章节质量报告</h4>

​         <ProgressBar label="叙事连贯度" value={94} color="bg-indigo-500" />

​         <ProgressBar label="场景代入感" value={68} color="bg-emerald-500" />

​         <ProgressBar label="反转张力" value={82} color="bg-amber-500" />

​       </div>

​      </div>

​     </aside>

​    </div>

   );

  }

 };

 return <div className="h-full">{renderContent()}</div>;

};

// --- 子页面组件 ---

const ProjectOutlineView = () => (

  <div className="p-16 h-full overflow-y-auto scrollbar-hide">


    <div className="max-w-4xl mx-auto space-y-12">

   <header className="flex justify-between items-end">


        <div>

​      <h2 className="text-3xl font-black text-white italic">PROJ_OUTLINE</h2>

           <p className="text-sm text-gray-500 mt-2">勾勒命运的骨架，决定故事的高峰</p>

​    </div>

​    <button className="bg-white/5 hover:bg-white/10 px-6 py-2.5 rounded-2xl text-xs font-bold border border-white/10">+ 添加大纲节点</button>

   </header>

      <div className="space-y-6 relative pl-12 border-l border-white/5">

​    {[

​     { title: "开篇：魂穿 1972", summary: "交代前世遭遇，确立重生复仇与暴富的主基调。", icon: <Zap size={14}/> },

​     { title: "第一卷：大坪村的变革者", summary: "主角利用空间物资秘密改善生活，并收服第一批追随者。", icon: <Activity size={14}/> },

​     { title: "高潮：百亿物资的重资产化", summary: "李晓建立自己的商业帝国雏形，与反派进行正面资源博弈。", icon: <Trophy size={14}/> }

​    ].map((node, i) => (

          <div key={node.title} className="relative p-8 bg-[#16181d] rounded-[2.5rem] border border-white/5 hover:border-indigo-500/20 transition-all">
    
             <div className="absolute -left-[64px] top-10 w-10 h-10 bg-[#0f1115] rounded-full border border-white/5 flex items-center justify-center text-indigo-400 shadow-xl">

​        {node.icon}

​       </div>

​       <h4 className="font-bold text-white mb-3 text-lg">{node.title}</h4>

             <p className="text-sm text-gray-500 leading-relaxed font-medium">{node.summary}</p>

​     </div>

​    ))}

   </div>

  </div>

 </div>

);

const ProjectWorldView = () => (

  <div className="p-16 h-full overflow-y-auto scrollbar-hide">


    <div className="max-w-4xl mx-auto space-y-8">

   <header>


​    <h2 className="text-3xl font-black text-white italic">WORLD_SETTINGS</h2>

        <p className="text-sm text-gray-500 mt-2">塑造故事发生的土壤、规则与细节</p>

   </header>

      <div className="bg-[#16181d] p-10 rounded-[3rem] border border-white/5">

​    <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-6 block">核心世界观描述</label>

​    <textarea 

​     className="w-full bg-transparent border-none p-0 text-sm text-gray-400 leading-loose h-64 focus:ring-0 resize-none" 

​     defaultValue="1972年，中国北方的一个偏远农村。这里的冬天漫长且严酷，但主角的随身空间里却存放着超越时代的百亿物资..." 

​    />

   </div>

  </div>

 </div>

);

const ProjectRolesView = () => (

  <div className="p-16 h-full overflow-y-auto scrollbar-hide">


    <div className="max-w-5xl mx-auto">
    
      <div className="flex justify-between items-center mb-12">

​    <h2 className="text-3xl font-black text-white italic">CHARACTER_FILES</h2>

​    <button className="bg-indigo-600 px-6 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-xl shadow-indigo-500/20">+ 创建新角色卡</button>

   </div>

      <div className="grid grid-cols-2 gap-8">

​    {[

​     { name: "李晓", role: "核心女主角 / 空间宿主", tags: ["坚毅", "重生者", "物资女王"], initial: "李" },

​     { name: "周廷海", role: "男主角 / 守护者", tags: ["沉稳", "退伍军人", "忠诚"], initial: "周" }

​    ].map(role => (

          <div key={role.name} className="bg-[#16181d] p-8 rounded-[2.5rem] border border-white/5 flex gap-6 hover:border-indigo-500/30 transition-all cursor-pointer group">
    
            <div className="w-20 h-20 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-3xl font-bold text-indigo-400 group-hover:scale-110 transition-transform">

​       {role.initial}

​      </div>

            <div className="flex-1">

​       <h4 className="text-xl font-bold text-white mb-2">{role.name}</h4>

              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-4">{role.role}</p>
    
              <div className="flex flex-wrap gap-1">

​        {role.tags.map(t => <span key={t} className="text-[9px] bg-white/5 px-2 py-0.5 rounded text-gray-400">#{t}</span>)}

​       </div>

​      </div>

​     </div>

​    ))}

   </div>

  </div>

 </div>

);

const ProjectMapView = () => (

  <div className="p-16 h-full flex flex-col items-center justify-center space-y-8 bg-[#0f1115]">


    <div className="relative w-full max-w-4xl h-[60vh] bg-[#16181d] rounded-[4rem] border border-white/5 overflow-hidden">
    
      <div className="absolute inset-0 opacity-10 pointer-events-none">
    
        <div className="w-full h-full border-[0.5px] border-white/10" style={{backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>

   </div>

      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 flex flex-col items-center gap-3">
    
        <div className="w-20 h-20 bg-indigo-600 rounded-3xl shadow-2xl flex items-center justify-center text-2xl font-black italic">李</div>

​    <span className="text-xs font-bold text-white">李晓 (主角)</span>

   </div>

      <div className="absolute top-1/3 left-2/3 -translate-y-1/2 flex flex-col items-center gap-3">
    
        <div className="w-16 h-16 bg-emerald-600 rounded-3xl flex items-center justify-center text-xl font-bold text-white">周</div>

​    <span className="text-xs font-bold text-white">周廷海</span>

   </div>

      <div className="absolute top-2/3 left-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
    
        <div className="w-16 h-16 bg-rose-600 rounded-3xl flex items-center justify-center text-xl font-bold text-white">李</div>

​    <span className="text-xs font-bold text-rose-500">李大海 (仇敌)</span>

   </div>

      <svg className="absolute inset-0 pointer-events-none w-full h-full">

​    <line x1="25%" y1="50%" x2="66%" y2="33%" stroke="#6366f1" strokeWidth="2" strokeDasharray="5,5" />

​    <line x1="25%" y1="50%" x2="50%" y2="66%" stroke="#ef4444" strokeWidth="2" />

   </svg>

      <div className="absolute bottom-10 left-10 p-4 bg-black/40 rounded-2xl border border-white/5 backdrop-blur-md">
    
        <p className="text-[10px] text-gray-500 uppercase font-black mb-2 tracking-widest">关系分析</p>
    
        <p className="text-xs text-white">李晓 ⇄ 周廷海：<span className="text-indigo-400">正在升温 (暧昧)</span></p>

   </div>

  </div>

    <p className="text-sm text-gray-500">AI 已自动分析当前 12 个章节内容，关系图谱已更新。</p>

 </div>

);

// --- 全局通用视图 ---

const CreativeLabView = ({ tab }) => (

  <div className="p-16 h-full overflow-y-auto scrollbar-hide">


    <div className="max-w-6xl mx-auto space-y-10">

   <header>


​    <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">Creative Lab</h2>

        <p className="text-gray-500 mt-2 font-medium">解构爆款逻辑，复刻高级文风</p>

   </header>

      <div className="grid grid-cols-2 gap-10 h-[65vh]">
    
        <div className="bg-[#16181d] rounded-[3rem] border border-white/5 p-10 flex flex-col">
    
          <div className="flex items-center gap-3 mb-6">
    
            <div className="p-2 bg-indigo-600/10 text-indigo-400 rounded-xl"><Zap size={20}/></div>

​      <span className="text-xs font-black text-indigo-400 uppercase tracking-widest">{tab === 'deconstruct' ? '拆解数据源' : '仿写参考源'}</span>

​     </div>

​     <textarea className="flex-1 bg-white/2 rounded-3xl p-8 text-sm text-gray-300 border-none focus:ring-1 focus:ring-indigo-500/30 resize-none leading-relaxed" placeholder="在此粘贴文本..." />

​     <button className="mt-8 py-5 bg-indigo-600 text-white font-black rounded-2xl shadow-2xl transition-all flex items-center justify-center gap-3 active:scale-95"><Cpu size={20}/> 启动 AI 引擎进行深度分析</button>

​    </div>

        <div className="bg-[#16181d] rounded-[3rem] border border-white/10 p-10 border-dashed flex flex-col items-center justify-center text-center">
    
           <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 animate-pulse">

​       <Sparkles size={32} className="text-gray-700" />

​      </div>

           <p className="text-gray-600 italic">分析结果将在此生成报告...</p>

​    </div>

   </div>

  </div>

 </div>

);

const PromptLibraryView = () => (

  <div className="p-16 h-full overflow-y-auto scrollbar-hide">


  <h2 className="text-4xl font-black text-white mb-12 italic tracking-tighter uppercase">Prompt Library</h2>

    <div className="grid grid-cols-3 gap-8">

   {["黄金三章冲突指令", "网文快节奏描写", "环境氛围渲染", "高燃打斗描写", "细腻情感共鸣", "伏笔埋设引导"].map(t => (

        <div key={t} className="bg-[#16181d] p-10 rounded-[3rem] border border-white/5 hover:border-indigo-500/30 transition-all cursor-pointer group shadow-2xl">

​     <Bookmark size={24} className="text-indigo-400 mb-6 group-hover:scale-110 transition-transform" />

​     <h4 className="font-bold text-white text-lg mb-4">{t}</h4>

          <p className="text-xs text-gray-600 leading-relaxed font-medium">一段高度优化的 AI 指令模板，旨在提升章节的吸睛度和冲突张力，适合 5000 字以内的快速迭代...</p>
    
          <div className="mt-8 pt-6 border-t border-white/5 flex justify-between text-[10px] font-black text-indigo-400 uppercase tracking-widest">

​      <span>使用次数: 1.2k</span>

​      <span className="text-indigo-400">立即调用</span>

​     </div>

​    </div>

   ))}

  </div>

 </div>

);

const SkillCenterView = () => (

  <div className="p-16 h-full overflow-y-auto scrollbar-hide">


  <h2 className="text-4xl font-black text-white mb-12 italic tracking-tighter uppercase">Skill Center</h2>

    <div className="grid grid-cols-3 gap-8">

   {[

​    { title: "黄金三章扫描仪", icon: ShieldCheck, color: "text-indigo-400" },

​    { title: "反派降智自动检测", icon: BrainCircuit, color: "text-emerald-400" },

​    { title: "爽点节奏分析仪", icon: BarChart3, color: "text-amber-400" },

​    { title: "全网敏感词库同步", icon: Activity, color: "text-rose-400" },

​    { title: "剧情跑题强预警", icon: GitBranch, color: "text-sky-400" }

   ].map(s => (

        <div key={s.title} className="bg-[#16181d] p-10 rounded-[3rem] border border-white/5 flex flex-col items-center text-center group hover:bg-[#1a1c22] transition-all shadow-2xl">
    
          <div className={`p-6 bg-white/5 rounded-3xl mb-8 group-hover:scale-110 transition-transform ${s.color}`}>

​      <s.icon size={32} />

​     </div>

​     <h4 className="font-bold text-white text-xl mb-4">{s.title}</h4>

          <p className="text-xs text-gray-600 mb-8 leading-relaxed">深度分析你的每一段文字，确保作品符合网文爆款逻辑，规避所有写作风险。</p>

​     <button className="w-full py-4 bg-white/5 hover:bg-indigo-600 hover:text-white text-gray-500 font-black rounded-2xl border border-white/5 transition-all text-xs tracking-widest uppercase">加载插件</button>

​    </div>

   ))}

  </div>

 </div>

);

const CreateProjectModal = ({ onClose, onSubmit }) => {

 const [mode, setMode] = useState('choice'); 

 const [aiStep, setAiStep] = useState(0); 

 const [formData, setFormData] = useState({ title: '', synopsis: '', theme: '', type: [], targetChapters: 100 });

 const [tempInput, setTempInput] = useState("");

 const handleAiNext = () => setAiStep(aiStep + 1);

 return (

    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/85 backdrop-blur-xl">
    
      <div className="bg-[#16181d] w-full max-w-5xl max-h-[90vh] rounded-[4rem] border border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-500">
    
        <div className="p-8 border-b border-white/5 flex items-center justify-between">

​     <h2 className="text-xl font-bold flex items-center gap-3 italic"><Plus size={24} className="text-indigo-400" /> CREATE NEW PROJECT</h2>

​     <button onClick={onClose} className="p-3 hover:bg-white/5 rounded-full text-gray-500 transition-colors"><X size={24} /></button>

​    </div>

​    

        <div className="flex-1 overflow-y-auto p-12 scrollbar-hide">

​     {mode === 'choice' && (

            <div className="h-full flex flex-col items-center justify-center gap-16 py-10">

​       <h3 className="text-4xl font-black text-center tracking-tighter italic">你想如何开启一段新的创作旅程？</h3>

              <div className="grid grid-cols-2 gap-10 w-full max-w-3xl">

​        <button onClick={() => setMode('manual')} className="bg-white/2 border border-white/5 p-12 rounded-[3.5rem] hover:border-indigo-500/50 transition-all text-center flex flex-col items-center group">

                  <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-gray-400 mb-8 group-hover:bg-indigo-600/10 group-hover:text-indigo-400 transition-all"><Edit3 size={40} /></div>

​         <h4 className="font-bold text-xl mb-3">手动精雕细琢</h4>

                  <p className="text-xs text-gray-600 leading-relaxed font-medium">我已经想好了所有的架构与书名。</p>

​        </button>

​        <button onClick={() => setMode('ai')} className="bg-indigo-600/5 border border-indigo-500/10 p-12 rounded-[3.5rem] hover:border-indigo-500/50 transition-all text-center flex flex-col items-center group relative overflow-hidden">

                  <div className="absolute top-0 right-0 p-6"><Sparkles size={24} className="text-indigo-500 opacity-30" /></div>
    
                  <div className="w-20 h-20 bg-indigo-600/10 rounded-3xl flex items-center justify-center text-indigo-400 mb-8 group-hover:scale-110 transition-transform"><Zap size={40} /></div>

​         <h4 className="font-bold text-xl mb-3 text-indigo-400">AI 引导生成</h4>

                  <p className="text-xs text-indigo-400/60 leading-relaxed font-medium">我只有一个模糊想法，请 AI 帮我共创。</p>

​        </button>

​       </div>

​      </div>

​     )}

​     {mode === 'ai' && (

            <div className="max-w-3xl mx-auto flex flex-col h-full space-y-10 animate-in slide-in-from-right-8">
    
              <div className="flex-1 space-y-12">
    
                <div className="flex gap-5">
    
                  <div className="w-12 h-12 bg-indigo-600/10 rounded-2xl flex items-center justify-center shrink-0"><Sparkles size={24} className="text-indigo-400" /></div>
    
                  <div className="bg-white/5 p-7 rounded-[3rem] rounded-tl-none border border-white/5 text-sm text-gray-300 max-w-[85%] leading-relaxed shadow-xl">

​          你好！我是你的 AI 创作助手。让我们开始一段奇妙的创作之旅吧！<br/>首先，请告诉我，你想写一本什么样的小说？比如“都市高武”或“重生年代”。

​         </div>

​        </div>

​        {aiStep >= 1 && (

                  <div className="flex justify-end gap-5 animate-in slide-in-from-bottom-2"><div className="bg-indigo-600 p-6 rounded-[3rem] rounded-tr-none text-white text-sm font-black shadow-2xl shadow-indigo-500/20">{tempInput || "都市高武"}</div></div>

​        )}

​        {aiStep >= 1 && (

                  <div className="flex gap-5 animate-in slide-in-from-left-6">
    
                    <div className="w-12 h-12 bg-indigo-600/10 rounded-2xl flex items-center justify-center shrink-0"><Sparkles size={24} className="text-indigo-400" /></div>
    
                    <div className="space-y-6 flex-1">
    
                      <div className="bg-white/5 p-6 rounded-[2.5rem] rounded-tl-none border border-white/5 text-gray-300 text-sm">

​            很有潜力的方向！根据你的想法，我为你构思了几个极具吸引力的书名：

​           </div>

                      <div className="grid grid-cols-1 gap-4">

​            {["全球武道：从属性提取开始", "霓虹深处的猎神者", "高武降临：我的武道有热度面板"].map(title => (

​             <button key={title} onClick={() => { setFormData({...formData, title}); handleAiNext(); }} className="p-6 rounded-[2rem] border bg-white/2 border-white/5 hover:border-indigo-500 hover:bg-indigo-600/10 text-left text-sm font-black transition-all flex justify-between items-center group">

​              {title}

​              <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />

​             </button>

​            ))}

​           </div>

​          </div>

​         </div>

​        )}

​        {aiStep >= 2 && (

                  <div className="flex gap-5 animate-in slide-in-from-left-6 pb-20">
    
                    <div className="w-12 h-12 bg-indigo-600/10 rounded-2xl flex items-center justify-center shrink-0"><Sparkles size={24} className="text-indigo-400" /></div>
    
                    <div className="space-y-6 flex-1">
    
                      <div className="bg-[#12141a] p-8 rounded-[3rem] border border-indigo-500/20 shadow-2xl">
    
                         <p className="text-[10px] text-indigo-400 font-black uppercase mb-4 tracking-widest italic">核心主题分析</p>

​             <h4 className="text-xl font-black text-white mb-4">凡人逆命与潜能重构</h4>

                         <p className="text-sm text-gray-400 leading-loose">探讨在阶级固化的武道世界，普通人如何通过“提取”打破血统垄断。展现灵气复苏时代，个体意志如何通过对资源的极致整合，实现从平凡高中生到星辰武神的跨维度跃迁。</p>

​           </div>

​           <button onClick={() => onSubmit(formData)} className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-3xl shadow-2xl transition-all uppercase tracking-widest">开启创作模式</button>

​          </div>

​         </div>

​        )}

​       </div>

​       {aiStep === 0 && (

                <div className="sticky bottom-0 bg-[#16181d] py-10 border-t border-white/5">
    
                  <div className="relative max-w-2xl mx-auto">

​          <input type="text" placeholder="输入您的模糊想法..." className="w-full bg-white/5 border border-white/10 rounded-[2rem] py-6 pl-8 pr-20 text-white outline-none focus:ring-2 focus:ring-indigo-500/50" value={tempInput} onChange={e => setTempInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAiNext()} />

​          <button onClick={handleAiNext} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-indigo-600 text-white rounded-2xl shadow-xl"><Send size={24} /></button>

​         </div>

​        </div>

​       )}

​      </div>

​     )}

​    </div>

   </div>

  </div>

 );

};

// --- 原子 UI 组件 ---

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (

 <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-4 rounded-2xl transition-all duration-300 ${active ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-900/40' : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'}`}>

  <Icon size={18} /> <span className="font-bold text-sm tracking-tight">{label}</span>

 </button>

);

const StatCard = ({ icon: Icon, label, value, color }) => (

  <div className="bg-[#16181d] p-10 rounded-[3rem] border border-white/5 hover:border-white/10 transition-all hover:bg-white/[0.03] shadow-2xl">


    <div className={`p-3 rounded-2xl bg-white/5 w-fit mb-6 ${color} shadow-inner animate-in fade-in zoom-in duration-500`}><Icon size={24} /></div>
    
    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">{label}</p>

  <h3 className="text-3xl font-black text-white italic tracking-tighter">{value}</h3>

 </div>

);

const ProgressBar = ({ label, value, color }) => (

  <div className="mb-6">


    <div className="flex justify-between text-[10px] font-black text-gray-500 mb-2 uppercase tracking-[0.2em]"><span>{label}</span><span>{value}%</span></div>
    
    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden shadow-inner"><div className={`h-full transition-all duration-[1.5s] ease-out ${color} shadow-[0_0_10px_currentColor]`} style={{ width: `${value}%` }}></div></div>

 </div>

);

export default App;
