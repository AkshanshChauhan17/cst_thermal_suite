'use client'

import { useState } from 'react'
import { Trash2, Power, Loader2, PauseCircle, Edit3, X, UploadCloud } from 'lucide-react'
import { deleteCalculator, toggleCalculatorStatus, updateCalculator } from '@/app/actions/adminCalculators'

type Calculator = {
  id: string
  name: string
  slug: string
  api_url: string
  description: string
  price: number
  is_active: number
  image_url?: string
}

export default function CalculatorActions({ calculator }: { calculator: Calculator }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isToggling, setIsToggling] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState(calculator.image_url || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80')

  const [formData, setFormData] = useState({
    name: calculator.name || '',
    slug: calculator.slug || '',
    description: calculator.description || '',
    price: calculator.price || 0,
    api_url: calculator.api_url || '',
    image_url: calculator.image_url || ''
  })

  async function handleDelete() {
    if (confirm('Are you sure you want to completely remove this module?')) {
      setIsDeleting(true)
      await deleteCalculator(calculator.id)
      setIsDeleting(false)
    }
  }

  async function handleToggle() {
    setIsToggling(true)
    await toggleCalculatorStatus(calculator.id, calculator.is_active)
    setIsToggling(false)
  }

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault()
    setIsSaving(true)
    
    let finalImageUrl = formData.image_url

    if (imageFile) {
      const uploadData = new FormData()
      uploadData.append('file', imageFile)
      
      try {
        const res = await fetch('/api/admin/upload-image', {
          method: 'POST',
          body: uploadData
        })
        const data = await res.json()
        if (data.success) {
          finalImageUrl = data.url
        } else {
          alert('Failed to upload image')
          setIsSaving(false)
          return
        }
      } catch (err) {
        alert('Image upload error')
        setIsSaving(false)
        return
      }
    }

    await updateCalculator(calculator.id, { ...formData, image_url: finalImageUrl })
    setIsSaving(false)
    setIsEditing(false)
  }

  return (
    <>
      <div className="flex items-center gap-2 p-4 bg-gray-50/50 border-t border-gray-100 mt-auto">
        <button 
          onClick={handleToggle}
          disabled={isToggling || isDeleting || isSaving}
          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all disabled:opacity-50 ${
            calculator.is_active 
              ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' 
              : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
          }`}
        >
          {isToggling ? <Loader2 size={14} className="animate-spin" /> : calculator.is_active ? <PauseCircle size={14} /> : <Power size={14} />}
          {calculator.is_active ? 'Suspend' : 'Activate'}
        </button>

        <button 
          onClick={() => setIsEditing(true)}
          disabled={isDeleting || isToggling || isSaving}
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-indigo-200 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-all text-xs font-bold disabled:opacity-50 shrink-0"
        >
          <Edit3 size={14} />
          Edit
        </button>
        
        <button 
          onClick={handleDelete}
          disabled={isDeleting || isToggling || isSaving}
          className="flex items-center justify-center p-2 rounded-lg border border-red-200 bg-white text-red-500 hover:bg-red-50 transition-all disabled:opacity-50 shrink-0"
        >
          {isDeleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
        </button>
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-gray-200 max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 bg-[#1E1B4B] text-white flex justify-between items-center shrink-0">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Edit3 size={18} className="text-[#5648FC]" /> Edit Module
              </h3>
              <button onClick={() => setIsEditing(false)} className="text-gray-300 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="p-6 space-y-4 overflow-y-auto">
              
              <div className="w-full h-40 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 relative mb-2">
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <label className="cursor-pointer bg-white text-gray-800 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg">
                    <UploadCloud size={16} /> Change Cover Image
                    <input type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Module Name</label>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                  className="w-full p-2.5 bg-gray-50 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#5648FC]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Slug (URL Path)</label>
                  <input 
                    type="text" 
                    value={formData.slug} 
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })} 
                    className="w-full p-2.5 bg-gray-50 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#5648FC]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Price per Min (TKN)</label>
                  <input 
                    type="number" 
                    value={formData.price} 
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} 
                    className="w-full p-2.5 bg-gray-50 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#5648FC]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Python / API URL</label>
                <input 
                  type="text" 
                  value={formData.api_url} 
                  onChange={(e) => setFormData({ ...formData, api_url: e.target.value })} 
                  className="w-full p-2.5 bg-gray-50 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#5648FC]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Description</label>
                <textarea 
                  rows={3}
                  value={formData.description} 
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                  className="w-full p-2.5 bg-gray-50 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#5648FC]"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsEditing(false)} 
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-lg font-bold text-sm"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="flex-1 bg-[#1E1B4B] hover:bg-[#5648FC] text-white py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2"
                >
                  {isSaving && <Loader2 size={16} className="animate-spin" />}
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}