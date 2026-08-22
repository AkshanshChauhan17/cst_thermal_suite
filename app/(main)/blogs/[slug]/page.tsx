// app/blogs/[slug]/page.tsx
import { db } from '@/lib/db'
import CTASection from "@/src/components/layout/CTASection"
import { Clock, ArrowLeft, Share2, Bookmark, User, ArrowRight } from "lucide-react"
import Link from "next/link"
import { notFound } from 'next/navigation'
import type { RowDataPacket } from 'mysql2'

interface BlogRow extends RowDataPacket {
  id: number
  title: string
  slug: string
  category: string | null
  content: string
  created_at: string | Date
  author_name: string | null
  author_role: string | null
  cover_image: string | null
  image_caption: string | null
  tags: string | null
}

interface RelatedBlogRow extends RowDataPacket {
  id: number
  title: string
  slug: string
  category: string | null
  content: string
  created_at: string | Date
}

export const revalidate = 60 // 1 minute cache

export default async function BlogDetail({ params }: { params: Promise<{ slug: string }> }) {
  // Next.js 15/16 ke liye params ko await karna zaroori hai
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // 1. Fetch exact blog from DB using the slug
  const [rows] = await db.query<BlogRow[]>(
    'SELECT * FROM blogs WHERE slug = ? AND is_published = 1 LIMIT 1',
    [slug]
  )

  if (rows.length === 0) {
    notFound()
  }

  const blog = rows[0]

  // 2. Fetch 2 other published blogs for the "Further Reading" section
  const [relatedRows] = await db.query<RelatedBlogRow[]>(
    'SELECT id, title, slug, category, content, created_at FROM blogs WHERE slug != ? AND is_published = 1 ORDER BY created_at DESC LIMIT 2',
    [slug]
  )

  // Clean HTML content for display (strip hidden BLOCKS_JSON comments if any)
  const cleanContent = blog.content.replace(/<!--BLOCKS_JSON=[\s\S]*?-->/g, '')

  // Calculate read time dynamically
  const extractPlainText = (html: string) => html.replace(/<[^>]+>/g, '')
  const wordCount = extractPlainText(cleanContent).split(/\s+/).filter(w => w.length > 0).length
  const minutes = Math.ceil(wordCount / 200) || 1

  return (
    <main className="min-h-screen bg-white flex flex-col font-sans">
      
      {/* Header / Hero Section */}
      <section className="w-full bg-[#1E1B4B] pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#5648FC]/5 border-l border-[#5648FC]/10 skew-x-12 translate-x-16 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <Link href="/blogs" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-xs font-bold uppercase tracking-widest mb-8 transition-colors">
            <ArrowLeft size={16} />
            Back to Engineering Insights
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className="bg-[#5648FC] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-none">
              {blog.category || 'Updates'}
            </span>
            <span className="text-gray-400 text-xs font-mono">
              {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-8 leading-tight">
            {blog.title}
          </h1>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 border-t border-gray-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#5648FC]/20 border border-[#5648FC]/50 flex items-center justify-center rounded-none text-white font-bold">
                <User size={24} className="text-[#86EFAC]" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">{blog.author_name || 'Admin'}</p>
                <p className="text-gray-400 text-xs">{blog.author_role || 'System Administrator'}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-gray-400 text-xs font-mono">
              <span className="flex items-center gap-1.5"><Clock size={14} /> {minutes} min read</span>
              <div className="flex items-center gap-2 border-l border-gray-700 pl-4">
                <button className="p-2 bg-white/5 hover:bg-white/10 text-white transition-colors rounded-none" title="Share Article">
                  <Share2 size={16} />
                </button>
                <button className="p-2 bg-white/5 hover:bg-white/10 text-white transition-colors rounded-none" title="Bookmark">
                  <Bookmark size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cover Image Section */}
      {blog.cover_image && (
        <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 mb-16">
          <div className="bg-[#1E1B4B] p-2 shadow-2xl border border-gray-200 rounded-none">
            <div className="w-full h-[350px] md:h-[480px] relative overflow-hidden bg-[#110f2a]">
              <img 
                src={blog.cover_image} 
                alt={blog.title}
                className="absolute inset-0 w-full h-full object-cover filter contrast-125"
              />
              {blog.image_caption && (
                <div className="absolute bottom-4 right-4 bg-[#1E1B4B] text-white text-xs font-mono px-3 py-1 border border-gray-700">
                  {blog.image_caption}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Main Blog Content Section */}
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto flex flex-col gap-10 text-gray-700 text-lg leading-relaxed">
          
          <div dangerouslySetInnerHTML={{ __html: cleanContent }} />

          {/* Footer Tags & Share */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 mt-10 border-t border-gray-200">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-2">Tags:</span>
              {blog.tags && blog.tags.split(',').map((tag: string, i: number) => tag.trim() && (
                <span key={i} className="bg-[#F7F8FA] border border-gray-200 px-3 py-1 text-xs font-bold text-gray-700 rounded-none">
                  {tag.trim()}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Share:</span>
              <button className="bg-[#1E1B4B] text-white px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-[#5648FC] transition-colors rounded-none">
                Copy Link
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Further Reading / Related Articles Footer */}
      <section className="w-full bg-[#F7F8FA] py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-xs font-bold text-[#5648FC] uppercase tracking-widest block mb-2">Further Reading</span>
              <h3 className="text-3xl font-bold text-[#1E1B4B] tracking-tight">Related Technical Articles</h3>
            </div>
            <Link href="/blogs" className="hidden sm:inline-flex items-center gap-2 text-[#1E1B4B] font-bold text-sm hover:text-[#5648FC] transition-colors uppercase tracking-wide">
              View All Articles <ArrowRight size={16} />
            </Link>
          </div>
          
          {relatedRows.length === 0 ? (
            <p className="text-gray-500">No other articles available right now.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedRows.map((item) => {
                const plainExcerpt = item.content.replace(/<!--BLOCKS_JSON=[\s\S]*?-->/g, '').replace(/<[^>]+>/g, '').substring(0, 120) + '...';
                return (
                  <div key={item.id} className="bg-white border border-gray-200 p-8 flex flex-col justify-between shadow-sm hover:border-[#5648FC] transition-all rounded-none group">
                    <div>
                      <span className="text-xs font-bold text-[#5648FC] uppercase tracking-wider block mb-2">{item.category || 'Updates'}</span>
                      <h4 className="text-xl font-bold text-[#1E1B4B] mb-3 group-hover:text-[#5648FC] transition-colors line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">
                        {plainExcerpt}
                      </p>
                    </div>
                    <Link href={`/blogs/${item.slug}`} className="inline-flex items-center gap-2 text-[#1E1B4B] font-bold text-xs uppercase tracking-wider group-hover:text-[#5648FC]">
                      Read Article <ArrowRight size={14} />
                    </Link>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </main>
  )
}