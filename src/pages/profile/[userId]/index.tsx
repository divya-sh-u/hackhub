import * as React from 'react';
import { LayoutWithSideBar } from '~/Layout/LayoutWithSidebar';
import { useRouter } from 'next/router';
import { api } from '~/utils/api';
import {useEffect,useState} from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaGithub } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
export interface IAppProps {
}

export default function App (props: IAppProps) {
    const [userIsOwner, setUserIsOwner] = useState(false);

  const {data:session} = api.auth.getSession.useQuery();


  const { register, handleSubmit } = useForm();

  const router = useRouter();

  const showableProfileofUser = api.user.getshowableProfileofUser.useQuery({
    userId: router.query.userId as string,
  });

  const followUser = api.user.followUser.useMutation();

  const unfollowUser = api.user.unfollowUser.useMutation();

  const getAllFollowers = api.user.getAllFollowers.useQuery({
    userId: router.query.userId as string,
  });

  const getAllFollowing = api.user.getAllFollowing.useQuery({
    userId: router.query.userId as string,
  });

  const sendMessageToUser = api.message.sendMessageToUser.useMutation(
    {
      onSuccess: () => {
        toast.success('message sent')
      },
    }
  );

  const getUserMessages = api.message.getUserMessages.useQuery({
    recipientId: router.query.userId as string,
  },
    {
      onSuccess: () => {
        toast.success('messages loaded')
      }
    }
  );

  useEffect(() => {
    if (showableProfileofUser.data?.id === router.query.userId) {
      setUserIsOwner(true);
    } else {
      setUserIsOwner(false);
    }
  }, [showableProfileofUser.data?.id, router.query.userId]);
  


  const ifNotFollowed = getAllFollowers.data?.followedBy?.every(
    (follower) => follower.id !== session?.user.id 
  );

  const ifAlReadyFollowed = getAllFollowers.data?.followedBy?.some(
    (follower) => follower.id === session?.user.id
  );

 
  const [openForm, setOpenForm] = useState(false);
  const [openMessagePortal, setOpenMessagePortal] = useState(false);
  return (
    <LayoutWithSideBar>
      {/* <div className='max-w-3xl justify-right mx-auto'> */}
        {/* <div className='flex flex-col'> */}
        {  
         userIsOwner ? (
           <div className='top-15 right-5 fixed'>
             <button
               className='btn btn-primary'
               onClick={() => {
                 setOpenMessagePortal(true)
               }}
             >
               Show messages
             </button>
             {openMessagePortal && (
               <div>
                 {getUserMessages.data?.map((message) => (

                   <div><span>
                     {message.text}</span>
                   <span>
                     {message.sender.name}</span>
                   </div>))}
               </div>
             )}
           </div>
         ) : (
           <div className='top-15 right-5 fixed'>
             <button
              className='btn btn-primary'
               onClick={() => {
                 setOpenForm(true);
               }}>
               send message
             </button>
             {openForm && (
               <form
                 onSubmit={handleSubmit((data) => {
                   sendMessageToUser.mutate({
                     recipientId: showableProfileofUser.data?.id as string,
                     text: data.text,
                   });
                   setOpenForm(false);
                 })}
               >
                 <input
                   {...register('text')}
                   type="text"
                   placeholder="text"
                 />
                 <button type="submit">send</button>
               </form>)}
           </div>
         )
       }
             {/* <div className='max-w-3xl  '> */}

       
       {/* <div className="flex flex-col items-center justify-center h-screen bg-gray-100"> */}
  <div className=" w-full bg-white rounded-lg shadow-lg">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-40 h-40 rounded-full overflow-hidden">
        <img src={showableProfileofUser.data?.image as string} alt="Profile Picture"/>
      </div>
      <div className="text-2xl font-bold">
        {showableProfileofUser.data?.name}
      </div>
      <div className="text-xl font-bold text-black">
        {showableProfileofUser.data?.about?.description}
      </div>
      <div className="flex space-x-4 text-xl font-bold">
        <a href={showableProfileofUser.data?.socialLinks?.github as string}><FaGithub/></a>
        <a href={showableProfileofUser.data?.socialLinks?.linkedin as string}><FaLinkedin/></a>
        <a href={showableProfileofUser.data?.socialLinks?.twitter as string}><FaTwitter/></a>
        <a href={showableProfileofUser.data?.socialLinks?.instagram as string}><FaInstagram/></a>
      </div>
      <div className="flex flex-wrap justify-center space-x-4 text-xl font-bold">
        {showableProfileofUser.data?.skills?.map((skill) => {
          return (
            <div className="bg-blue-500 text-white rounded-full px-4 py-2">{skill.name}</div>
          );
        })}
      </div>
      <div className="flex justify-center space-x-6">
        {/* <div>Followed By {showableProfileofUser.data?.followedBy?.length}</div> */}
        <div>Following {getAllFollowers.data?.followedBy?.length}</div>
        <div>Followers {getAllFollowing.data?.followings?.length}</div>
      </div>
      {ifNotFollowed &&
        <div>
          <button className="btn btn-primary m-2" onClick={() => followUser.mutateAsync({ followingUserId: router.query.userId as string })}>
            follow
          </button>
        </div>
      }
      {followUser.isSuccess && <div>followed</div>}
      {followUser.isError && <div>error</div>}
      {ifAlReadyFollowed &&
        <div>
          <button className="btn btn-primary m-2" onClick={() => unfollowUser.mutateAsync({ followingUserId: router.query.userId as string })}>
            unfollow
          </button>
        </div>}
    </div>
  </div>
{/* </div> */}
  {/* </div> */}
            {/* </div> */}
        {/* </div> */}
    </LayoutWithSideBar>
  );
}
//  import * as React from 'react';
//  import { useRouter } from 'next/router';
//  import { api } from '~/utils/api';
//  import { useEffect, useState } from 'react';
//  import { useForm } from 'react-hook-form';


//  export default function App() {


//    const [userIsOwner, setUserIsOwner] = useState(false);

//    const {data:session} = api.auth.getSession.useQuery();


//    const { register, handleSubmit } = useForm();

//    const router = useRouter();

//    const showableProfileofUser = api.user.getshowableProfileofUser.useQuery({
//      userId: router.query.userId as string,
//    });

//    const followUser = api.user.followUser.useMutation();

//    const unfollowUser = api.user.unfollowUser.useMutation();

//    const getAllFollowers = api.user.getAllFollowers.useQuery({
//      userId: router.query.userId as string,
//    });

//    const getAllFollowing = api.user.getAllFollowing.useQuery({
//      userId: router.query.userId as string,
//    });

//    const sendMessageToUser = api.message.sendMessageToUser.useMutation(
//      {
//        onSuccess: () => {
//          alert('message sent');
//        },
//      }
//    );

//    const getUserMessages = api.message.getUserMessages.useQuery({
//      recipientId: showableProfileofUser.data?.id as string,
//       userId: router.query.userId as string,
//    },
//      {
//        onSuccess: () => {
//          alert('messages fetched');
//        }
//      }
//    );

//    useEffect(() => {
//      if (showableProfileofUser.data?.id === router.query.userId) {
//        setUserIsOwner(true);
//      } else {
//        setUserIsOwner(false);
//      }
//    }, [showableProfileofUser.data?.id, router.query.userId]);
  


//    const ifNotFollowed = getAllFollowers.data?.followedBy?.every(
//      (follower) => follower.id !== session?.user.id 
//    );

//    const ifAlReadyFollowed = getAllFollowers.data?.followedBy?.some(
//      (follower) => follower.id === session?.user.id
//    );

 
//    const [openForm, setOpenForm] = useState(false);
//    const [openMessagePortal, setOpenMessagePortal] = useState(false);

//    return (
//      <div>

//        {
//          userIsOwner ? (
//            <div>
//              <button
//                onClick={() => {
//                  setOpenMessagePortal(true)
//                }}
//              >
//                show messages
//              </button>
//              {openMessagePortal && (
//                <div>
//                  {getUserMessages.data?.map((message) => (

//                    <div>
//                      {message.text}
//                    sadfasdfasd asdfsda
//                      {message.sender.name}
//                    </div>))}
//                </div>
//              )}
//            </div>
//          ) : (
//            <div>
//              <button
//                onClick={() => {
//                  setOpenForm(true);
//                }}>
//                send message
//              </button>
//              {openForm && (
//                <form
//                  onSubmit={handleSubmit((data) => {
//                    sendMessageToUser.mutate({
//                      recipientId: showableProfileofUser.data?.id as string,
//                      text: data.text,
//                    });
//                    setOpenForm(false);
//                  })}
//                >
//                  <input
//                    {...register('text')}
//                    type="text"
//                    placeholder="text"
//                  />
//                  <button type="submit">send</button>
//                </form>)}
//            </div>
//          )
//        }
//        <div>
//          <img src={showableProfileofUser.data?.image as string} />
//        </div>
//        <div>
//          {showableProfileofUser.data?.name}
//        </div>
//        <div>
//          {showableProfileofUser.data?.about?.description}
//        </div>
//        <div>
//          {showableProfileofUser.data?.socialLinks?.github}
//        </div>
//        <div>
//          {showableProfileofUser.data?.socialLinks?.linkedin}
//        </div>
//        <div>
//          {showableProfileofUser.data?.socialLinks?.twitter}
//        </div>
//        <div>
//          {showableProfileofUser.data?.socialLinks?.instagram}
//        </div>
//        <div>
//          {showableProfileofUser.data?.skills?.map((skill) => {
//            return (
//              <div>
//                {skill.name}
//              </div>
//            );
//          })}
//        </div>
//        <div>
//          {showableProfileofUser.data?.followedBy?.length}
//        </div>
//        <div>
//          {getAllFollowers.data?.followedBy?.length}
//        </div>
//        <div>
//          {getAllFollowing.data?.followings?.length}
//        </div>
//        {ifNotFollowed &&
//          <div>
//            <button onClick={() => followUser.mutateAsync({ followingUserId: router.query.userId as string })}>
//              follow
//            </button>
//          </div>
//        }
//        {followUser.isSuccess && <div>followed</div>}
//        {followUser.isError && <div>error</div>}
//        {ifAlReadyFollowed &&
//          <div>
//            <button onClick={() => unfollowUser.mutateAsync({ followingUserId: router.query.userId as string })}>
//              unfollow
//            </button>
//          </div>}
//      </div>
//    );
//  }


// {/* {/* {userIsOwner ? ( */ }
// {/* showableProfileofUser.data?.id === router.query.userId ? ( */ }
// {/* setUserIsOwner(true)  */ }
// {/* )) : ( */ }
// {/*  setUserIsOwner(false) */ }
// {/* ) */ }
// {/*  } */ }
// {/*  sendMessageToUser: protectedProcedure */ }
// {/*      .input(z.object({ */ }
// {/*          recipientId: z.string(),
//          text: z.string(),
//      }))
//      .mutation(async ({input,ctx}) => { */}
// {/*          const {recipientId,text} = input;
//          const message = await ctx.prisma.message.create({
//              data: {
//                  text,
//                  senderId: ctx.session.user.id,
//                  recipientId,
//              }
//          })
//          return message;
//      }),
//  getUserMessages: protectedProcedure
//      .input(z.object({
//          recipientId: z.string(),
//      }))
//      .query(async ({input,ctx}) => {
//          const {recipientId} = input;
//          const messages = await ctx.prisma.message.findMany({
//              where: {
//                  OR: [
//                      {
//                          senderId: ctx.session.user.id,
//                          recipientId,
//                      },
//                      {
//                          senderId: recipientId,
//                          recipientId: ctx.session.user.id,
//                      }
//                  ]
//              },
//              orderBy: {
//                  createdAt: 'desc'
//              },
//              take: 20,
//          })
//          return messages;
//      }), */}