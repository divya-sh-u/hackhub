import * as React from 'react';
import { api } from '~/utils/api';
// import { useSession } from 'next-auth/react';
// import { getSession } from 'next-auth/react';
// import { Router } from 'react-router-dom';
import Image from 'next/image';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { LayoutWithSideBar } from '~/Layout/LayoutWithSidebar';
// export interface IAppProps {
// }

export default function App () {




  const router = useRouter();
  const projectRoute = api.useContext().projects;
  // const invalidateCurrentPostPage = useCallback(() => {
  //   postRoute.getPost.invalidate({ slug: router.query.slug as string });
  // }, [postRoute.getPost, router.query.slug]);

  // const likePost = trpc.post.likePost.useMutation({
  //   onSuccess: () => {
  //     invalidateCurrentPostPage();
  //   },
  // });

  // const dislikePost = trpc.post.disLikePost.useMutation({
  //   onSuccess: () => {
  //     invalidateCurrentPostPage();
  //   },
  // });

  const invalidateCurrentProjectPage = useCallback(() => {
    projectRoute.getProject.invalidate({ projectId: router.query.projectid as string });
  }, [projectRoute.getProject, router.query.projectid]);


  const [showTextArea, setShowTextArea] = React.useState(false);
  const [comment, setComment] = React.useState('');
  const getProject = api.projects.getProject.useQuery({
    projectId: router.query.projectid as string,  
    },
    );
      const likeProject = api.projects.likeProject.useMutation({
        onSuccess: () => {
          invalidateCurrentProjectPage();
        },
      })

    const unlikeProject = api.projects.unlikeProject.useMutation({
      onSuccess: () => {
        invalidateCurrentProjectPage();
      },
      })

    const commentOnProject = api.projects.commentOnProject.useMutation({
      onSuccess: () => {
        invalidateCurrentProjectPage();
      },
      })

    const getComments = api.projects.getCommentsOnProject.useQuery({
      projectId: router.query.projectid as string,
    })


  return (
    <LayoutWithSideBar >
      <div className='flex flex-col border-1 border-white rounded-lg max-w-3xl'>
        {/* <h1>Project</h1> */}
        <h1 className='text-center text-3xl'>
          {getProject.data?.title}
          </h1>
          <Image src={getProject.data?.snapshot as string}  
          alt={getProject.data?.title as string}
          width={500} height={500} />
        <p>{getProject.data?.description}</p>

        <p>{getProject.data?.likes.length}</p>
        {/* {void console.log(router.query)} */}
        {getProject.data?.likes && getProject.data?.likes.length > 0 ? (
                <FcLike
                  onClick={() =>
                    getProject.data?.id &&
                    unlikeProject.mutate({
                      projectId: getProject.data?.id,
                    },

                    )
                  }
                  className="cursor-pointer text-xl"
                />
              ) : (
                <FcLikePlaceholder
                  onClick={() =>
                    getProject.data?.id &&
                    likeProject.mutate({
                      projectId: getProject.data?.id,
                    },
                    )
                  }
                  className="cursor-pointer text-xl"
                />
              )}
              

              <button onClick={() => {setShowTextArea(true)}}>Comment</button>

              {getComments.data?.map((comment) => {
                return (
                  <div key={comment.id}>
                    <p>{comment.text}</p>
                    <p>{comment.user.name}</p>
                  </div>
                );
              })
              }
              

              {showTextArea && (
                <div>
                <label  className="text-sm text-gray-800 block mb-1 font-medium">
                  Comments
                </label>
                <textarea
                  rows={3}
                  cols={50}
                  value={comment}
                  className="bg-gray-100 rounded border border-gray-200 py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                  placeholder="Enter your comment"
                  onChange={(e) => {setComment(e.target.value)}}
                ></textarea>
                <div id="authorname">
                 {/* {getComments.data?.map((commentAuthor) => {
                return (
                  <div key={commentAuthor.id}>
                    <p>{commentAuthor.user.name}</p>
                  </div>
                 )})} */}
                </div>
                <div className="flex items-center mt-1">
                  <p className="text-xs text-gray-500">
                    {comment.length}/1000
                  </p>
                </div>
              </div>)}
              <button 
              disabled={showTextArea ? false : true}
              onClick={() => {
                commentOnProject.mutate({
                  projectId: getProject.data?.id as string,
                  text: comment,
                }),
                setShowTextArea(false)
              }
              }>Submit</button>
              </div>
    </LayoutWithSideBar>
  );
}