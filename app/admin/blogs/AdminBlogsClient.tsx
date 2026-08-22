// app/admin/blogs/AdminBlogsClient.tsx
'use client'

import { useState } from 'react'
import AdminSidebar from '../components/AdminSidebar'
import { addBlog, toggleBlogStatus, deleteBlog, updateBlog } from '@/app/actions/adminBlogs'
import { FileText, Loader2, Plus, Edit2, X, Clock, ArrowLeft, User, Check, Heading2, Quote, List, AlignLeft, ArrowUp, ArrowDown, Trash2, Eye, EyeOff } from 'lucide-react'

type BlockType = 'intro' | 'h2' | 'p' | 'quote' | 'list_item'
type Block = { id: string; type: BlockType; content: string; subContent?: string }
type Blog = {
  id: string
  title: string
  slug: string
  category?: string | null
  cover_image?: string | null
  image_caption?: string | null
  tags?: string | null
  content: string
  is_published: boolean
}

export default function AdminBlogsClient({ initialBlogs }: { initialBlogs: Blog[] }) {
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  
  // Extract initial unique categories dynamically from existing blogs
  const initialCats = Array.from(new Set(initialBlogs.map((b: Blog) => b.category).filter((cat): cat is string => Boolean(cat))))
  if (initialCats.length === 0) {
    initialCats.push('Platform Releases', 'Thermodynamics', 'SaaS Architecture', 'HVAC Design', 'Engineering Reports')
  }

  // Category management states
  const [categoriesList, setCategoriesList] = useState<string[]>(initialCats)
  const [isAddingCategory, setIsAddingCategory] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')

  // Post Meta States
  const [editingId, setEditingId] = useState<string | null>(null)
  const [title, setTitle] = useState('Optimizing Heat Exchanger Fin Geometries')
  const [slug, setSlug] = useState('optimizing-heat-exchangers')
  const [category, setCategory] = useState(initialCats[0] || 'Thermodynamics')
  const [coverImage, setCoverImage] = useState('/coil_img1.webp')
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null)
  const [imageCaption, setImageCaption] = useState('FIG_01: CFD_FIN_STRESS_ANALYSIS')
  const [tags, setTags] = useState('Thermodynamics, CFD Simulation, HVAC')
  
  const displayCover = coverImageFile ? URL.createObjectURL(coverImageFile) : coverImage

  // BLOCK BUILDER STATE
  const [blocks, setBlocks] = useState<Block[]>([
    { id: '1', type: 'intro', content: 'In modern industrial refrigeration and HVAC design, optimizing heat exchanger fin geometries is no longer just about maximizing surface area...' },
    { id: '2', type: 'h2', content: '1. The Limitation of Traditional Prototyping' },
    { id: '3', type: 'p', content: 'Historically, engineers relied on empirical formulas and physical wind-tunnel testing to determine coil thermal performance.' },
    { id: '4', type: 'quote', content: 'Moving from physical prototyping to token-based digital simulation reduced our coil design cycle by over 75%.', subContent: 'Senior Lead Engineer, Industrial HVAC Corp' },
    { id: '5', type: 'list_item', content: 'Fin Pitch & Thickness', subContent: 'Determining optimal turbulence without creating excessive airside pressure drop.' }
  ])

  const handleAddNewCategory = () => {
    const trimmed = newCategoryName.trim()
    if (trimmed && !categoriesList.includes(trimmed)) {
      const updated = [...categoriesList, trimmed]
      setCategoriesList(updated)
      setCategory(trimmed)
      setNewCategoryName('')
      setIsAddingCategory(false)
    }
  }

  const addBlock = (type: BlockType) => {
    setBlocks([...blocks, { id: Math.random().toString(36).substr(2, 9), type, content: '', subContent: '' }])
  }

  const updateBlock = (id: string, field: 'content' | 'subContent', value: string) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, [field]: value } : b))
  }

  const moveBlock = (index: number, direction: -1 | 1) => {
    const newBlocks = [...blocks]
    if (index + direction < 0 || index + direction >= newBlocks.length) return
    const temp = newBlocks[index]
    newBlocks[index] = newBlocks[index + direction]
    newBlocks[index + direction] = temp
    setBlocks(newBlocks)
  }

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id))
  }

  const compileBlocksToHTML = () => {
    let html = `<!--BLOCKS_JSON=${JSON.stringify(blocks)}-->\n`;
    
    let inList = false;
    blocks.forEach((b) => {
      if (b.type === 'list_item' && !inList) { html += '<ul class="flex flex-col gap-4 my-2">\n'; inList = true; }
      if (b.type !== 'list_item' && inList) { html += '</ul>\n'; inList = false; }

      if (b.type === 'intro') html += `<p class="font-medium text-xl text-[#1E1B4B] leading-relaxed">${b.content}</p>\n`;
      if (b.type === 'h2') html += `<h2 class="text-3xl font-bold text-[#1E1B4B] mt-6 mb-2 tracking-tight">${b.content}</h2>\n`;
      if (b.type === 'p') html += `<p>${b.content}</p>\n`;
      if (b.type === 'quote') html += `<div class="bg-[#F7F8FA] border-l-4 border-[#5648FC] p-8 my-6"><p class="text-xl font-bold text-[#1E1B4B] italic mb-3">"${b.content}"</p><span class="text-xs font-bold text-gray-500 uppercase tracking-wider">— ${b.subContent}</span></div>\n`;
      if (b.type === 'list_item') html += `<li class="flex items-start gap-4 p-4 bg-[#F7F8FA] border border-gray-200 rounded-none"><div class="flex-shrink-0 w-6 h-6 bg-[#1E1B4B] text-white flex items-center justify-center mt-0.5 rounded-none font-bold text-xs"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[#86EFAC]"><polyline points="20 6 9 17 4 12"></polyline></svg></div><span class="text-gray-700 text-base"><strong>${b.content}:</strong> ${b.subContent}</span></li>\n`;
    });
    if (inList) html += '</ul>\n';
    return html;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setFeedback(null)

    const finalHTML = compileBlocksToHTML()

    const formData = new FormData()
    formData.append('title', title); formData.append('slug', slug); formData.append('category', category);
    formData.append('image_caption', imageCaption); formData.append('tags', tags); formData.append('content', finalHTML);
    
    if (coverImageFile) formData.append('cover_image_file', coverImageFile)
    formData.append('existing_cover_image', coverImage)

    const res = editingId ? await updateBlog(editingId, formData) : await addBlog(formData)
    
    if (res.success) {
      setFeedback({ type: 'success', text: res.message || 'Saved successfully' })
      handleCancelEdit() 
    } else {
      setFeedback({ type: 'error', text: res.error || 'Failed to save' })
    }
    
    setLoading(false)
    setTimeout(() => setFeedback(null), 4000)
  }

  function handleEdit(blog: Blog) {
    setEditingId(blog.id)
    setTitle(blog.title); setSlug(blog.slug); setCategory(blog.category || categoriesList[0]);
    setCoverImage(blog.cover_image || '/coil_img1.webp'); setCoverImageFile(null);
    setImageCaption(blog.image_caption || ''); setTags(blog.tags || '')
    
    const match = blog.content.match(/<!--BLOCKS_JSON=(.*?)-->/)
    if (match) {
      try {
        setBlocks(JSON.parse(match[1]))
      } catch {
        setBlocks([{ id: '1', type: 'p', content: 'Legacy content detected.' }])
      }
    } else {
      setBlocks([{ id: '1', type: 'p', content: 'Legacy content detected.' }])
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleCancelEdit() {
    setEditingId(null)
    setTitle(''); setSlug(''); setBlocks([]); setTags(''); setCoverImageFile(null)
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex">
      <AdminSidebar />

      <main className="flex-1 md:ml-64 p-4 md:p-8">
        <header className="mb-6 border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold text-[#1E1B4B] flex items-center gap-3">
            <FileText className="text-red-500" size={28} /> Advanced Content Studio
          </h1>
          <p className="text-gray-500 mt-1">Manage posts, categories, images, and blocks with live preview.</p>
        </header>

        <div className="flex flex-col xl:flex-row gap-8">
          
          {/* LEFT: BUILDER FORM */}
          <div className="w-full xl:w-5/12 flex flex-col gap-6">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
              
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-lg font-bold text-[#1E1B4B]">{editingId ? 'Edit Post' : 'Post Details'}</h2>
                {editingId && <button onClick={handleCancelEdit} className="text-xs font-bold text-red-500"><X size={14} className="inline" /> Cancel</button>}
              </div>

              {feedback && (
                <div className={`mb-4 p-3 rounded-lg text-sm font-bold ${feedback.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                  {feedback.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                <div className="grid grid-cols-2 gap-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="col-span-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Post Title</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="w-full border p-2 rounded text-sm outline-none font-bold text-[#1E1B4B]" />
                  </div>
                  
                  {/* Dynamic Category Dropdown with Plus (+) Button */}
                  <div className="col-span-2">
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-[10px] font-bold text-gray-500 uppercase">Category</label>
                      <button 
                        type="button" 
                        onClick={() => setIsAddingCategory(!isAddingCategory)} 
                        className="text-xs text-[#5648FC] font-bold flex items-center gap-1 hover:underline"
                      >
                        <Plus size={12} /> {isAddingCategory ? 'Select Existing' : 'Add New Category'}
                      </button>
                    </div>

                    {isAddingCategory ? (
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={newCategoryName} 
                          onChange={e => setNewCategoryName(e.target.value)} 
                          placeholder="Type new category..." 
                          className="w-full border p-2 rounded text-sm bg-white outline-none focus:border-[#5648FC]"
                        />
                        <button 
                          type="button" 
                          onClick={handleAddNewCategory} 
                          className="bg-[#5648FC] text-white px-4 py-2 rounded text-xs font-bold hover:bg-[#1E1B4B] transition-colors"
                        >
                          Add
                        </button>
                      </div>
                    ) : (
                      <select 
                        value={category} 
                        onChange={e => setCategory(e.target.value)} 
                        className="w-full border p-2 rounded text-sm bg-white outline-none focus:border-[#5648FC]"
                      >
                        {categoriesList.map((cat: string, i: number) => (
                          <option key={i} value={cat}>{cat}</option>
                        ))}
                      </select>
                    )}
                  </div>

                  <div className="col-span-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Slug</label>
                    <input type="text" value={slug} onChange={e => setSlug(e.target.value)} className="w-full border p-2 rounded text-sm" />
                  </div>
                  
                  <div className="col-span-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Upload Cover Image</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={e => setCoverImageFile(e.target.files?.[0] || null)} 
                      className="w-full border p-1 rounded text-xs bg-white file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-bold file:bg-[#5648FC] file:text-white hover:file:bg-[#1E1B4B]" 
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Image Caption</label>
                    <input type="text" value={imageCaption} onChange={e => setImageCaption(e.target.value)} className="w-full border p-2 rounded text-sm" />
                  </div>

                  <div className="col-span-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Tags (comma separated)</label>
                    <input type="text" value={tags} onChange={e => setTags(e.target.value)} className="w-full border p-2 rounded text-sm" />
                  </div>
                </div>

                {/* BLOCK BUILDER SECTION */}
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase mb-2 block">Content Blocks</label>
                  
                  <div className="flex flex-col gap-3 mb-4">
                    {blocks.map((block, index) => (
                      <div key={block.id} className="border border-gray-200 bg-white rounded-md flex flex-col group shadow-sm">
                        
                        <div className="bg-gray-50 border-b border-gray-100 px-3 py-2 flex justify-between items-center rounded-t-md">
                          <span className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1">
                            {block.type === 'intro' && <AlignLeft size={12} />}
                            {block.type === 'h2' && <Heading2 size={12} />}
                            {block.type === 'p' && <AlignLeft size={12} />}
                            {block.type === 'quote' && <Quote size={12} />}
                            {block.type === 'list_item' && <List size={12} />}
                            {block.type.replace('_', ' ')}
                          </span>
                          <div className="flex gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                            <button type="button" onClick={() => moveBlock(index, -1)} className="p-1 hover:bg-gray-200 rounded"><ArrowUp size={14}/></button>
                            <button type="button" onClick={() => moveBlock(index, 1)} className="p-1 hover:bg-gray-200 rounded"><ArrowDown size={14}/></button>
                            <button type="button" onClick={() => removeBlock(block.id)} className="p-1 hover:bg-red-100 text-red-500 rounded"><Trash2 size={14}/></button>
                          </div>
                        </div>

                        <div className="p-3 flex flex-col gap-2">
                          {block.type === 'h2' ? (
                            <input type="text" value={block.content} onChange={(e) => updateBlock(block.id, 'content', e.target.value)} placeholder="Heading text..." className="w-full text-sm font-bold text-[#1E1B4B] outline-none" />
                          ) : block.type === 'list_item' ? (
                            <>
                              <input type="text" value={block.content} onChange={(e) => updateBlock(block.id, 'content', e.target.value)} placeholder="List Title (Bold)" className="w-full text-sm font-bold text-gray-700 outline-none border-b border-gray-100 pb-1" />
                              <textarea value={block.subContent} onChange={(e) => updateBlock(block.id, 'subContent', e.target.value)} placeholder="List Description..." className="w-full text-sm text-gray-600 outline-none resize-none h-16 mt-1" />
                            </>
                          ) : block.type === 'quote' ? (
                            <>
                              <textarea value={block.content} onChange={(e) => updateBlock(block.id, 'content', e.target.value)} placeholder="Quote text..." className="w-full text-sm italic text-gray-700 outline-none resize-none h-16 border-b border-gray-100 pb-1" />
                              <input type="text" value={block.subContent} onChange={(e) => updateBlock(block.id, 'subContent', e.target.value)} placeholder="Author or Source" className="w-full text-xs text-gray-500 uppercase outline-none mt-1" />
                            </>
                          ) : (
                            <textarea value={block.content} onChange={(e) => updateBlock(block.id, 'content', e.target.value)} placeholder="Write your paragraph..." className={`w-full text-sm text-gray-700 outline-none resize-none h-20 ${block.type === 'intro' ? 'font-medium' : ''}`} />
                          )}
                        </div>

                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2 bg-gray-50 p-2 rounded-lg border border-gray-200">
                    <span className="text-[10px] font-bold text-gray-400 w-full uppercase mb-1">Add Element:</span>
                    <button type="button" onClick={() => addBlock('intro')} className="text-xs bg-white border border-gray-200 px-2 py-1 rounded hover:bg-gray-100">Lead Paragraph</button>
                    <button type="button" onClick={() => addBlock('h2')} className="text-xs bg-white border border-gray-200 px-2 py-1 rounded hover:bg-gray-100">Heading (H2)</button>
                    <button type="button" onClick={() => addBlock('p')} className="text-xs bg-white border border-gray-200 px-2 py-1 rounded hover:bg-gray-100">Paragraph</button>
                    <button type="button" onClick={() => addBlock('quote')} className="text-xs bg-white border border-gray-200 px-2 py-1 rounded hover:bg-gray-100">Quote Block</button>
                    <button type="button" onClick={() => addBlock('list_item')} className="text-xs bg-white border border-gray-200 px-2 py-1 rounded hover:bg-gray-100">List Item</button>
                  </div>
                </div>

                <button type="submit" disabled={loading} className="w-full bg-[#1E1B4B] hover:bg-[#5648FC] text-white p-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 mt-2 transition-colors">
                  {loading ? <Loader2 size={16} className="animate-spin" /> : null} {editingId ? 'Update Article' : 'Publish Article'}
                </button>
              </form>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
              <h3 className="text-xs font-bold text-gray-500 uppercase mb-3">Published Posts</h3>
              <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
                {initialBlogs.map(b => (
                  <div key={b.id} className="flex justify-between items-center p-2 hover:bg-gray-50 border border-gray-100 rounded">
                    <span className="text-xs font-bold truncate max-w-[150px]">{b.title}</span>
                    <div className="flex gap-1">
                      <button onClick={() => handleEdit(b)} className="p-1 text-[#5648FC] bg-indigo-50 rounded"><Edit2 size={12}/></button>
                      <button onClick={() => toggleBlogStatus(b.id, b.is_published ? 0 : 1)} className="p-1 text-amber-600 bg-amber-50 rounded">{b.is_published ? <Eye size={12}/> : <EyeOff size={12}/>}</button>
                      <button onClick={() => deleteBlog(b.id)} className="p-1 text-red-600 bg-red-50 rounded"><Trash2 size={12}/></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>


          {/* RIGHT: LIVE PREVIEW */}
          <div className="w-full xl:w-7/12 border-4 border-gray-300 rounded-xl overflow-hidden shadow-2xl relative bg-white h-fit overflow-y-auto">
            
            <div className="sticky top-0 bg-gray-200 text-center text-[10px] font-bold text-gray-500 py-1.5 z-50 uppercase tracking-widest border-b border-gray-300 flex justify-center items-center gap-2">
              <Eye size={14} className="text-[#5648FC]" /> Live Client Render
            </div>

            <main className="flex flex-col font-sans pointer-events-none">
              <section className="w-full bg-[#1E1B4B] pt-20 pb-20 px-4 sm:px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-[#5648FC]/5 border-l border-[#5648FC]/10 skew-x-12 translate-x-16"></div>

                <div className="max-w-4xl mx-auto relative z-10">
                  <div className="inline-flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest mb-8">
                    <ArrowLeft size={16} /> Back to Engineering Insights
                  </div>

                  <div className="flex items-center gap-3 mb-6">
                    <span className="bg-[#5648FC] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-none">
                      {category || 'Category'}
                    </span>
                    <span className="text-gray-400 text-xs font-mono">Today</span>
                  </div>

                  <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-8 leading-tight">
                    {title || 'Your Post Title Here'}
                  </h1>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 border-t border-gray-800">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#5648FC]/20 border border-[#5648FC]/50 flex items-center justify-center rounded-none text-white font-bold">
                        <User size={24} className="text-[#86EFAC]" />
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm">Admin (You)</p>
                        <p className="text-gray-400 text-xs">System Administrator</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {displayCover && (
                <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 -mt-12 relative z-20 mb-16">
                  <div className="bg-[#1E1B4B] p-2 shadow-2xl border border-gray-200 rounded-none">
                    <div className="w-full h-[250px] md:h-[350px] relative overflow-hidden bg-[#110f2a]">
                      <img src={displayCover} className="absolute inset-0 w-full h-full object-cover filter contrast-125" alt="Cover" />
                      {imageCaption && (
                        <div className="absolute bottom-4 right-4 bg-[#1E1B4B] text-white text-xs font-mono px-3 py-1 border border-gray-700">
                          {imageCaption}
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              )}

              <section className="w-full py-12 px-4 sm:px-6">
                <div className="max-w-3xl mx-auto flex flex-col gap-10 text-gray-700 text-lg leading-relaxed">
                  
                  {blocks.map((b, i) => {
                    if (b.type === 'intro') return <p key={i} className="font-medium text-xl text-[#1E1B4B] leading-relaxed">{b.content || '...'}</p>
                    if (b.type === 'h2') return <h2 key={i} className="text-3xl font-bold text-[#1E1B4B] mt-6 mb-2 tracking-tight">{b.content || '...'}</h2>
                    if (b.type === 'p') return <p key={i}>{b.content || '...'}</p>
                    if (b.type === 'quote') return (
                      <div key={i} className="bg-[#F7F8FA] border-l-4 border-[#5648FC] p-8 my-6">
                        <p className="text-xl font-bold text-[#1E1B4B] italic mb-3">&ldquo;{b.content || '...'}&rdquo;</p>
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">— {b.subContent || '...'}</span>
                      </div>
                    )
                    if (b.type === 'list_item') return (
                      <ul key={i} className="flex flex-col gap-4 my-2">
                        <li className="flex items-start gap-4 p-4 bg-[#F7F8FA] border border-gray-200 rounded-none">
                          <div className="flex-shrink-0 w-6 h-6 bg-[#1E1B4B] text-white flex items-center justify-center mt-0.5 rounded-none font-bold text-xs">
                            <Check size={14} className="text-[#86EFAC]" />
                          </div>
                          <span className="text-gray-700 text-base"><strong>{b.content || 'Title'}:</strong> {b.subContent || 'Description'}</span>
                        </li>
                      </ul>
                    )
                  })}

                </div>
              </section>
            </main>
          </div>
        </div>

      </main>
    </div>
  )
}