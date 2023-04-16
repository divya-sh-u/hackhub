import * as React from 'react';
import { LayoutWithSideBar } from '~/Layout/LayoutWithSidebar';
import { useRouter } from 'next/router';
import { FcLike,FcLikePlaceholder } from 'react-icons/fc';
import { api } from '~/utils/api';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import error from 'next/error';
export interface IAppProps {
}

export default function App (props: IAppProps) {

  const router = useRouter();
  const [showTextArea, setShowTextArea] = React.useState(false);
  const [comment, setComment] = React.useState('');
  const getPost = api.post.getPost.useQuery({ 
    slug: router.query.slug as string
  });

  const likePost= api.post.likePost.useMutation({
    onSuccess: () => {
      getPost.refetch();
    },
    onError: (error) => {
      toast.error(error.message as string);}
  });

  const disLikePost= api.post.disLikePost.useMutation({
    onSuccess: () => {
      getPost.refetch();
    },
    onError: (error) => {
      toast.error(error.message as string);}
  });
  const submitComment= api.post.submitComment.useMutation({
    onSuccess: () => {
      getComments.refetch();
    },
    onError: (error) => {
      toast.error(error.message as string);}
  });

  const getComments= api.post.getComments.useQuery({
    postId: getPost.data?.id as string,
  }
  
  
  );



  return (
    <LayoutWithSideBar>
      <div className='max-w-3xl justify-center mx-auto m-2'>
        {/* <div className='flex flex-col'> */}

        <div>
      <div>
        <div
          className="text-4xl font-bold m-2"
        >{getPost.data?.title}</div>
        
        <img
        alt={getPost.data?.title as string}
        src={getPost.data?.featuredImage as string} />
        <div className='flex flex-col  justify-between items-center m-3'>
        <div
        className='prose prose-slate text-2xl'
        >{getPost.data?.description}</div>
        <div className=' justify-center'>
        <div
        className='prose prose-h3:text-xl '
        >{getPost.data?.text}</div>
        {/* <div>{getPost.data?.}</div> */}
        <div 
        className='prose prose-h5:text-xl justify-end flex flex-col'
        >
          <div>
          <img
          className='rounded-full h-10 w-10 '
          src={getPost.data?.author.image as string} />
          </div><div>
          {getPost.data?.author.name}
          </div>
        </div>
        </div>
        </div>
      </div>
      <div className='flex justify-end m-3'>
  {getPost.data?.likes?.length ? (<>
    
    <FcLike className='w-8 h-8' onClick={() => disLikePost.mutate({ postId: getPost.data?.id as string })} />
    {getPost.data?.likes?.length}
    </>
 
    ) : (
      <>
    <FcLikePlaceholder className='w-8 h-8' onClick={() => likePost.mutate({ postId: getPost.data?.id as string })} />
    {getPost.data?.likes?.length}
    </>
  )}
</div>
<div className='flex flex-col items-end'>
  {
    getComments.data?.map((comment) => (
      <div key={comment.id} className='flex justify-end'>
        <div>{comment.user.name}</div>
        <div>{comment.text}</div>
        {/* <div>{comment.createdAt as string}</div> */}
      </div>))
  }
</div>
<div className='flex flex-col items-end w-full'>
  <button onClick={() => setShowTextArea(!showTextArea)}>Add Comment</button>
  {showTextArea && (
    <div>
      {/* style={{ display: 'flex', width: '100%' }} */}
      <textarea
        className="w-full h-20 bg-gray-100 rounded border border-gray-200 py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={() => submitComment.mutate({ text: comment, postId: getPost.data?.id as string })}>Submit</button>
    </div>
  )}
</div>

    </div>
            {/* </div> */}
        </div>
    </LayoutWithSideBar>
  );
}
{/* <div className="">
  <div className="w-full md:w-1/2 text-center md:text-right">
    <div className="prose prose-slate text-2xl">{getPost.data?.description}</div>
  </div>
  <div className="w-full md:w-1/2">
    <div className="prose prose-h3:text-xl">{getPost.data?.text}</div>
    <div className="flex justify-end items-center m-2">
      <img className="rounded-full h-10 w-10" src={getPost.data?.author.image as string} />
      <div className="ml-2">{getPost.data?.author.name}</div>
    </div>
  </div>
</div> */}