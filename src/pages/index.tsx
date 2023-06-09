import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { MainLayout } from "~/Layout/MainLayout";
import { api } from "~/utils/api";
import interaction from '~/assets/Interaction Design-pana.svg'
import mobile from '~/assets/Mobile development-amico.svg'
import openSource from '~/assets/Open source-bro.svg'
import FirstPage from "~/components/ScrollPage_One";
import  SecondPage  from "~/components/scrollpage_two";
import  ThirdPage  from "~/components/scrollpage_three";
import  Footer  from "~/components/Footer";
// import Image from "next/image";
// import dynamic from "next/dynamic";
import Landing from "~/components/Landing";
// export {interaction, mobile, open}

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <MainLayout>
      <Head>
        <title>Hack Hub</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Landing/>
        <FirstPage/>
        <SecondPage/>
        <ThirdPage/>

          <Footer/>
      </main>
    </MainLayout>
  );
};

export default Home;
{/* 
<div className='h-screen bg-white'>
<div className='grid grid-cols-12 place-items-center'>
<div className='col-span-6 h-full'>
<Image src={openSource} alt="opensource"/>
</div>
<div className='col-span-6  h-full mt-20 pt-20 items-center text-right flex flex-col  mr-15 pr-20'>
<p className='text-4xl font-bold text-black'>
<p
>Build relationships with like</p><p
>minded people</p>
</p >
{/* <p
className='text-4xl font-bold text-black text-right'
> minded people</p> */}
{/* <p className='text-2xl text-black'>
<p>Discover meaningful discussions , engage</p>
<p> In interactive Projects and Build</p>
<p> Your Own Community...</p>
</p>
</div>
</div>
</div>
<div className='bg-black h-screen'>
<div className='grid grid-cols-12 place-items-center'>
<div className='col-span-6 h-full justify-center items-center flex flex-col'>
<p>
Find a wealth of valuable insights, export tips and projects
</p>
<p>to help you grow your skills and knowledge.</p>
<p className='text-2xl text-white'>
<p>creativity and growth.</p>
<p>
On this exciting journey, as we explore new horizons
</p>
<p>and share our passion for knowledge,</p>
</p>
</div>
<div className='col-span-6 h-full'>
<Image src={mobile} alt="mobile" />
</div>

</div>
</div>
<div className='bg-white h-screen'>
<div className='grid grid-cols-12 place-items-center'>
<div className='col-span-6 h-full'>
<Image src={interaction} alt="interaction" />
</div>
<div className='col-span-6 h-full justify-center items-center flex flex-col ml-20'>
<h1 className='text-4xl font-bold text-black'>Interact with other hackers</h1>
<p className='text-2xl text-black text-right'>
<p>Join the community and find</p>
<p> like minded people to collaborate</p>
<p> with and build your own community</p>
</p>
</div>
</div>
</div> */} 
// const AuthShowcase: React.FC = () => {
//   const { data: sessionData } = useSession();

//   // const { data: secretMessage } = api.example.getSecretMessage.useQuery(
//   //   undefined, // no input
//   //   { enabled: sessionData?.user !== undefined },
//   // );

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <p className="text-center text-2xl text-white">
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {/* {secretMessage && <span> - {secretMessage}</span>} */}
//       </p>
//       <button
//         className="rounded-full px-10 py-3 font-semibold text-black no-underline transition hover:bg-white/20"
//         onClick={sessionData ? () => void signOut() : () => void signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// };
