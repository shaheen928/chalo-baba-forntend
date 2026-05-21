import { useState } from "react";
import { useGetBannersQuery,useCreateBannerMutation,useDeleteBannerMutation,useUpLoadBannerImageMutation } from "../../slices/bannerApiSlice";
 import {toast} from 'react-toastify';
 import { FaTrash, FaUpload, FaSpinner } from 'react-icons/fa';


const BannerManageScreen = () => {
  const [title,setTitle] = useState('')
  const [subtitle,setSubtitle] = useState('')
  const [image,setImage] = useState('')
  const [link,setLink] = useState('')


  const {data: banners, isLoading:isLoadingBanners,refetch} = useGetBannersQuery();
  const [createBanner,{isLoading: isCreating}] = useCreateBannerMutation();
  const[deleteBanner] = useDeleteBannerMutation();
  const [uploadBannerImage,{isLoading: isUploading}] = useUpLoadBannerImageMutation()

  const uploadFileHandler = async (e) =>{
  
  const file = e.target.files[0]
 const formData = new FormData()
 formData.append('image',file)
 
 try {
  const res = await uploadBannerImage(formData).unwrap();
  setImage(res.image);
  toast.success('Image uploaded successfuly')
 } catch (err) {
  toast.error(err?.data?.message || err.error || 'Upload fialed')
 }
}
const submitHandler = async (e) => {
  e.preventDefault()
   if(!image) {
    toast.error('Please upload an image first')
    return
  }
  try {
     await createBanner({title,subtitle,image,link}).unwrap();
    toast.success('New banner added to slider');
    setTitle('')
    setSubtitle('');
    setImage('');
    setLink('');
  } catch (err) {
    toast.error(err?.data?.message || err.error || 'Something went wrong')
  }
}


const deleteHandler = async (id) => {
  if(window.confirm('Are you sure you whant to delete this bannar')) {
    try {
      await deleteBanner(id).unwrap()
      toast.success('Baner removed from slider ')
    } catch (err) {
      toast.error(err?.data?.message || 'Error deleteing banner')
    }
  }

}

 
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl animate-fadeIn">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4 border-b border-slate-100 pb-5">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Hero Banners Management</h1>
        <p className="text-sm text-slate-500 mt-1">Add, update, or remove slides for the homepage Hero Banner carousel.</p>
      </div>
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      
       <div className="lg:col-span-1 bg-white p-6 rounded-3xl shadow-xl border border-slate-100">
        <h2 className="text-lg font-bold text-slate-800 mb-5">Create New Slide</h2>
        
        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider">Main Title</label>
            <input 
              type="text" 
              placeholder="e.g., The best headphones" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
              className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition" 
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider">Subtitle</label>
            <input 
              type="text" 
              placeholder="e.g., A new experience of sound" 
              value={subtitle} 
              onChange={(e) => setSubtitle(e.target.value)} 
              required 
              className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition" 
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider">Redirect URL (Optional)</label>
            <input 
              type="text" 
              placeholder="e.g., /search/laptops or /product/id" 
              value={link} 
              className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition" 
              onChange={(e) => setLink(e.target.value)} 
            />
          </div>
          
           <div>
            <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider">Banner Image</label>
            <div className="border-2 border-dashed border-slate-200 p-5 rounded-2xl flex flex-col items-center justify-center bg-slate-50/50 text-center">
              <label className="cursor-pointer flex items-center gap-2 bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 shadow-sm transition-all">
                <FaUpload className={isUploading ? 'animate-bounce text-blue-500' : 'text-slate-400'} /> 
                {isUploading ? 'Uploading to Server...' : 'Choose File'}
                <input type="file" accept="image/*" onChange={uploadFileHandler} className="hidden" />
              </label>
              
              {image ? (
                  <div className="mt-4 w-full">
                  <p className="text-[11px] text-green-600 font-bold bg-green-50 border border-green-100 px-3 py-1.5 rounded-xl truncate">
                    ✓ Ready: {image}
                  </                p>
                  <img src={image} alt="Preview" className="mt-3 w-full aspect-21/9 sm:aspect-21/7 md:aspect-21/9  object-cover rounded-xl border shadow-inner" />
                </div>
              ) : (
                <p className="text-[11px] text-slate-400 mt-3">Recommended aspect ratio: 21:9 or 16:9 for clean view.</p>
              )}
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isCreating || isUploading || !image} 
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-blue-700 shadow-lg shadow-blue-100 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {isCreating ? 'Saving to Database...' : 'Publish Banner'}
          </button>
        </form>
      </div>

       <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-xl border border-slate-100 min-w-0">
        <h2 className="text-lg font-bold text-slate-800 mb-5">Active Carousel Slides ({banners?.length || 0})</h2>
        
        {isLoadingBanners ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-400 gap-2">
            <FaSpinner className="animate-spin text-blue-500" size={24} />
            <p className="text-sm font-medium">Fetching active banners...</p>
          </div>
        ) : banners && banners.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {banners.map((b) => (
              <div key={b._id} className="border border-slate-100 rounded-2xl overflow-hidden relative group shadow-sm bg-slate-950 aspect-21/9">
                <img 
                  src={b.image} 
                  alt={b.title} 
                  className="absolute inset-0 w-full h-full object-cover object-center opacity-80 transition duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent w-full flex flex-col justify-end p-4 text-white">
                  <h3 className="font-extrabold text-sm sm:text-base tracking-wide truncate">{b.title}</h3>
                  <p className="text-xs text-slate-300 line-clamp-1 opacity-90 mt-0.5">{b.subtitle}</p>
                  {b.link && (
                    <p className="text-[10px] text-blue-400 font-medium mt-1 truncate bg-slate-900/60 px-2 py-0.5 rounded-md inline-block w-max">
                      Route: {b.link}
                    </p>
                  )}
                </div>
                <button 
                  onClick={() => deleteHandler(b._id)} 
                  className="absolute top-3 right-3 bg-red-600/90 text-white p-2.5 rounded-full hover:bg-red-600 shadow-md transition-all transform hover:scale-110 active:scale-95"
                >
                  <FaTrash size={12} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/50">
            <p className="text-sm text-slate-400 font-medium">No banners uploaded yet. Use the form on the right to add your first slide.</p>
          </div>
        )}
      </div>

    </div>
  </div>
  )
}

export default BannerManageScreen;