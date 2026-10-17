import { Heart } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postsApi } from '../../api/endpoints'
import toast from 'react-hot-toast'

export default function LikeButton({ post }){
  const qc=useQueryClient()
  const mutation=useMutation({
    mutationFn:()=>postsApi.like(post.slug),
    onMutate:async()=>{await qc.cancelQueries({queryKey:['post',post.slug]});const prev=qc.getQueryData(['post',post.slug]);qc.setQueryData(['post',post.slug],old=>old?{...old,is_liked:!old.is_liked,likes_count:old.likes_count+(old.is_liked?-1:1)}:old);return {prev}},
    onError:(_e,_v,ctx)=>{if(ctx?.prev)qc.setQueryData(['post',post.slug],ctx.prev);toast.error('Could not update like.')},
    onSuccess:(data)=>qc.setQueryData(['post',post.slug],old=>({...old,...data,is_liked:data.liked})),
  })
  return <button className="button secondary" onClick={()=>mutation.mutate()} disabled={mutation.isPending}><Heart size={18} fill={post.is_liked?'currentColor':'none'}/> {post.likes_count}</button>
}
