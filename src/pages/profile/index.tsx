import * as React from 'react';
import { LayoutWithSideBar } from '~/Layout/LayoutWithSidebar';
import { api } from '~/utils/api';
import {useState,useCallback} from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';


export interface IAppProps {
}

export default function App (props: IAppProps) {
  const [stepState, setStepState] = useState({
    showNameStep: true,
    showAboutStep: false,
    showEducationStep: false,
    showExperienceStep: false,
    showSkillsStep: false,
    showSocialLinksStep: false,
    showContactStep: false,
    showSubmitButton: false,
    showPreviousButton: true,
    showNextButton: true,
  });

  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = useCallback(() => {
    setCurrentStep((prevStep) => prevStep + 1);
  }, []);

  const previousStep = useCallback(() => {
          
    setCurrentStep((prevStep) => prevStep - 1);
  }, []);

  const updateProfileDetails = api.user.updateUserDetails.useMutation({
    onSuccess: () => {
      // console.log('success');
      toast.success('Profile updated successfully')
    },
  });

  const { register, handleSubmit } = useForm();

  const onSubmit = useCallback(
    (data:any) => {
      updateProfileDetails.mutate(
        
        {
          name: data.name,
          education: {
            currentcollege: data.currentcollege,
            degree: data.degree,
            fieldofstudy: data.fieldofstudy,
            startDate:data.startDateeducation,
            endDate: data.endDateeducation,
            description: data.descriptionedu,
          },
          experience: {
            company: data.company,
            position: data.position,

            //write end date using dayjs
            startDate: data.startDateexp,
            endDate: data.endDateexp,
            resume: data.resume,
            description: data.descriptionexperience,
          },
          about: {
            description: data.description,
          },
          socialLinks: {
            github: data.github,
            linkedin: data.linkedin,
            twitter: data.twitter,
            instagram: data.instagram,
          },
          skills: data.skills.split(','),
          contact: {
            email: data.email,
            phone: data.phone,
            address: data.address,
          },
        },
        
        {
          onSuccess: () => {
            // console.log('success');
            toast.success('user created')
          },
        }
      );
    },
    [updateProfileDetails]
  );

  const steps = [
    { title: 'Name' },
    { title: 'About' },
    { title: 'Education' },
    { title: 'Experience' },
    { title: 'Skills' },
    { title: 'Social Links' },
    { title: 'Contact' },
  ];

  const { showPreviousButton, showNextButton } = stepState;

  const previousButtonDisabled = currentStep === 0;
  const nextButtonDisabled = currentStep === steps.length - 1;

  return (
    <LayoutWithSideBar>
      {/* <div className='max-w-3xl justify-right mx-auto'> */}
        {/* <div className='flex flex-col'> */}
        <form 
        className='mt-8 grid lg:grid-cols-1 gap-4 space-y-3 mb-10'
        onSubmit={handleSubmit(onSubmit)}>
        {currentStep === 0 && (
          <div id="nameStep">
            <label htmlFor="name">Name</label>
            <input 
            className='bg-gray-200 border border-gray-200 rounded py-2 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
            type="text" {...register('name')} />
          </div>
        )}
        {currentStep === 1 && (
          <div id="aboutStep">
            <label 
            
            htmlFor="description">Description</label>
            <input type="text" 
            className='bg-gray-200 border border-gray-200 rounded py-2 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
            {...register('description')} />
          </div>
        )}
        {currentStep === 2 && (
          <div id="education"
          className='bg-gray-200 border border-gray-200 rounded py-2 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
          >
            <label htmlFor="currentCollege">Current College</label>
            <input 
            className='bg-gray-200 border border-gray-200 rounded py-2 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
            type="text" {...register('currentcollege')} />
            <label htmlFor="degree">Degree</label>
            <input type="text" 
            className='bg-gray-200 border border-gray-200 rounded py-2 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
            {...register('degree')} />
            <label htmlFor="fieldOfStudy">Field of Study</label>
            <input 
            className='bg-gray-200 border border-gray-200 rounded py-2 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
            type="text" {...register('fieldOfStudy')} />
            <label htmlFor="startDate">Start Date</label>
            <input 
            className='bg-gray-200 border border-gray-200 rounded py-2 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
            type="date" {...register('startDateeducation')} />
            <label htmlFor="endDate">End Date</label>
            <input 
            className='bg-gray-200 border border-gray-200 rounded py-2 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
            type="date" {...register('endDateeducation')} />
            <label htmlFor="description">Description</label>
            <input 
            className='bg-gray-200 border border-gray-200 rounded py-2 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
            type="text" {...register('descriptionedu')} />
          </div>
        )}
        {currentStep === 3 && (
            <div id="experience"
            className='bg-gray-200 border border-gray-200 rounded py-2 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
            >
                <label htmlFor="company">Company</label>
                <input 
                className='bg-gray-200 border border-gray-200 rounded py-2 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
                type="text" {...register('company')} />
                <label htmlFor="position">Position</label>
                <input 
                className='bg-gray-200 border border-gray-200 rounded py-2 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
                type="text" {...register('position')} />
                <label htmlFor="startDate">Start Date</label>
                <input 
                className='bg-gray-200 border border-gray-200 rounded py-2 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
                type="date" {...register('startDateexp')} />
                <label htmlFor="endDate">End Date</label>
                <input 
                className='bg-gray-200 border border-gray-200 rounded py-2 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
                type="date" {...register('endDateexp')} />
                <label htmlFor="resume">Resume</label>
                <input 
                className='bg-gray-200 border border-gray-200 rounded py-2 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
                type="text" {...register('resume')} />
                <label htmlFor="description">Description</label>
                <input 
                className='bg-gray-200 border border-gray-200 rounded py-2 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
                type="text" {...register('descriptionexperience')} />
            </div>
        )}
        {currentStep === 4 && (
            <div 
            className='bg-gray-200 border border-gray-200 rounded py-2 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
            id="skills">
                <label htmlFor="skills">Skills</label>
                <input 
                className='bg-gray-200 border border-gray-200 rounded py-2 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
                type="text" {...register('skills')} />
            </div>
        )}
        {currentStep === 5 && (
            <div 
            className='bg-gray-200 border border-gray-200 rounded py-2 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
            id="socialLinks">
                <label htmlFor="github">Github</label>
                <input 
                className='bg-gray-200 border border-gray-200 rounded py-2 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
                type="text" {...register('github')} />
                <label htmlFor="linkedin">Linkedin</label>
                <input 
                className='bg-gray-200 border border-gray-200 rounded py-2 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
                type="text" {...register('linkedin')} />
                <label htmlFor="twitter">Twitter</label>
                <input 
                className='bg-gray-200 border border-gray-200 rounded py-2 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
                type="text" {...register('twitter')} />
                <label htmlFor="instagram">Instagram</label>
                <input 
                className='bg-gray-200 border border-gray-200 rounded py-2 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
                type="text" {...register('instagram')} />
            </div>
        )}
        {currentStep === 6 && (
            <div 
            className='bg-gray-200 border border-gray-200 rounded py-2 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
            id="contact">
                <label htmlFor="email">Email</label>
                <input 
                className='bg-gray-200 border border-gray-200 rounded py-2 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
                type="text" {...register('email')} />
                <label htmlFor="phone">Phone</label>
                <input 
                className='bg-gray-200 border border-gray-200 rounded py-2 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
                type="text" {...register('phone')} />
                <label htmlFor="address">Address</label>
                <input 
                className='bg-gray-200 border border-gray-200 rounded py-2 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
                type="text" {...register('address')} />
            </div>
        )}
        {showPreviousButton && (
            <button type="button" 
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={previousStep} disabled={previousButtonDisabled}>
                {previousButtonDisabled ? 'Start' : 'Previous'}
            </button>
        )}
        {showNextButton && (
            <button type="button" 
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={nextStep}   disabled={nextButtonDisabled}>
                {nextButtonDisabled ? 'Finish' : 'Next'}
            </button>
        )}
        <button 
        className='btn btn-ghost border-gray-200 border-1 btn-block '
        type="submit">Submit</button>
        </form>
            
            {/* </div> */}
        {/* </div> */}
    </LayoutWithSideBar>
  );
}
// import { useForm } from 'react-hook-form';
// import { useSession } from 'next-auth/react';
// import { proxy } from 'valtio';
// import { api } from '~/utils/api';
// import { useState, useCallback } from 'react';
// import dayjs from 'dayjs';
// // import date from 'date-and-time';
// export default function Profile() {
//   const [stepState, setStepState] = useState({
//     showNameStep: true,
//     showAboutStep: false,
//     showEducationStep: false,
//     showExperienceStep: false,
//     showSkillsStep: false,
//     showSocialLinksStep: false,
//     showContactStep: false,
//     showSubmitButton: false,
//     showPreviousButton: true,
//     showNextButton: true,
//   });

//   const [currentStep, setCurrentStep] = useState(0);

//   const nextStep = useCallback(() => {
//     setCurrentStep((prevStep) => prevStep + 1);
//   }, []);

//   const previousStep = useCallback(() => {
          
//     setCurrentStep((prevStep) => prevStep - 1);
//   }, []);

//   const updateProfileDetails = api.user.updateUserDetails.useMutation({
//     onSuccess: () => {
//       console.log('success');
//     },
//   });





//   const { register, handleSubmit } = useForm();

//   const onSubmit = useCallback(
//     (data:any) => {
//       updateProfileDetails.mutate(
        
//         {
//           name: data.name,
//           education: {
//             currentcollege: data.currentcollege,
//             degree: data.degree,
//             fieldofstudy: data.fieldofstudy,
//             startDate:data.startDateeducation,
//             endDate: data.endDateeducation,
//             description: data.descriptionedu,
//           },
//           experience: {
//             company: data.company,
//             position: data.position,

//             //write end date using dayjs
//             startDate: data.startDateexp,
//             endDate: data.endDateexp,
//             resume: data.resume,
//             description: data.descriptionexperience,
//           },
//           about: {
//             description: data.description,
//           },
//           socialLinks: {
//             github: data.github,
//             linkedin: data.linkedin,
//             twitter: data.twitter,
//             instagram: data.instagram,
//           },
//           skills: data.skills.split(','),
//           contact: {
//             email: data.email,
//             phone: data.phone,
//             address: data.address,
//           },
//         },
        
//         {
//           onSuccess: () => {
//             console.log('success');
//           },
//         }
//       );
//     },
//     [updateProfileDetails]
//   );

//   const steps = [
//     { title: 'Name' },
//     { title: 'About' },
//     { title: 'Education' },
//     { title: 'Experience' },
//     { title: 'Skills' },
//     { title: 'Social Links' },
//     { title: 'Contact' },
//   ];

//   const { showPreviousButton, showNextButton } = stepState;

//   const previousButtonDisabled = currentStep === 0;
//   const nextButtonDisabled = currentStep === steps.length - 1;




//   return (
//     <>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         {currentStep === 0 && (
//           <div id="nameStep">
//             <label htmlFor="name">Name</label>
//             <input type="text" {...register('name')} />
//           </div>
//         )}
//         {currentStep === 1 && (
//           <div id="aboutStep">
//             <label htmlFor="description">Description</label>
//             <input type="text" {...register('description')} />
//           </div>
//         )}
//         {currentStep === 2 && (
//           <div id="education">
//             <label htmlFor="currentCollege">Current College</label>
//             <input type="text" {...register('currentcollege')} />
//             <label htmlFor="degree">Degree</label>
//             <input type="text" {...register('degree')} />
//             <label htmlFor="fieldOfStudy">Field of Study</label>
//             <input type="text" {...register('fieldOfStudy')} />
//             <label htmlFor="startDate">Start Date</label>
//             <input type="date" {...register('startDateeducation')} />
//             <label htmlFor="endDate">End Date</label>
//             <input type="date" {...register('endDateeducation')} />
//             <label htmlFor="description">Description</label>
//             <input type="text" {...register('descriptionedu')} />
//           </div>
//         )}
//         {currentStep === 3 && (
//             <div id="experience">
//                 <label htmlFor="company">Company</label>
//                 <input type="text" {...register('company')} />
//                 <label htmlFor="position">Position</label>
//                 <input type="text" {...register('position')} />
//                 <label htmlFor="startDate">Start Date</label>
//                 <input type="date" {...register('startDateexp')} />
//                 <label htmlFor="endDate">End Date</label>
//                 <input type="date" {...register('endDateexp')} />
//                 <label htmlFor="resume">Resume</label>
//                 <input type="text" {...register('resume')} />
//                 <label htmlFor="description">Description</label>
//                 <input type="text" {...register('descriptionexperience')} />
//             </div>
//         )}
//         {currentStep === 4 && (
//             <div id="skills">
//                 <label htmlFor="skills">Skills</label>
//                 <input type="text" {...register('skills')} />
//             </div>
//         )}
//         {currentStep === 5 && (
//             <div id="socialLinks">
//                 <label htmlFor="github">Github</label>
//                 <input type="text" {...register('github')} />
//                 <label htmlFor="linkedin">Linkedin</label>
//                 <input type="text" {...register('linkedin')} />
//                 <label htmlFor="twitter">Twitter</label>
//                 <input type="text" {...register('twitter')} />
//                 <label htmlFor="instagram">Instagram</label>
//                 <input type="text" {...register('instagram')} />
//             </div>
//         )}
//         {currentStep === 6 && (
//             <div id="contact">
//                 <label htmlFor="email">Email</label>
//                 <input type="text" {...register('email')} />
//                 <label htmlFor="phone">Phone</label>
//                 <input type="text" {...register('phone')} />
//                 <label htmlFor="address">Address</label>
//                 <input type="text" {...register('address')} />
//             </div>
//         )}
//         {showPreviousButton && (
//             <button type="button" onClick={previousStep} disabled={previousButtonDisabled}>
//                 {previousButtonDisabled ? 'Start' : 'Previous'}
//             </button>
//         )}
//         {showNextButton && (
//             <button type="button" onClick={nextStep}   disabled={nextButtonDisabled}>
//                 {nextButtonDisabled ? 'Finish' : 'Next'}
//             </button>
//         )}
//         <button type="submit">Submit</button>
//         </form>
//     </>
//     );
// }

        














// import { useForm } from 'react-hook-form';
// import { useSession } from 'next-auth/react';
// import { proxy, useSnapshot } from 'valtio';
// import { api } from '~/utils/api';
// import { ReactElement, useEffect, useState } from 'react';

// export default function Profile() {
//     const state = proxy({
//         showNameStep: false,
//         showAboutStep: false,
//         showEducationStep: false,
//         showExperienceStep: false,
//         showSkillsStep: false,
//         showSocialLinksStep: false,
//         showContactStep: false,
//         showSubmitButton: false,
//         showPreviousButton: false,
//         showNextButton: true,
//     });
//     // logic for showing buttons and steps
//     const [currentStep, setCurrentStep] = useState(0);
//     const [state, setState] = useState({
//         showNameStep: false,
//         showAboutStep: false,
//         showEducationStep: false,
//         showExperienceStep: false,
//         showSkillsStep: false,
//         showSocialLinksStep: false,
//         showContactStep: false,
//         showSubmitButton: false,
//         showPreviousButton: false,
//         showNextButton: true,
//       });
    
//       // ...
    
//       useEffect(() => {
//         switch (currentStep) {
//           case 0:
//             setState(prevState => ({ ...prevState, showNameStep: true }));
//             break;
//           case 1:
//             setState(prevState => ({ ...prevState, showAboutStep: true }));
//             break;
//           case 2:
//             setState(prevState => ({ ...prevState, showEducationStep: true }));
//             break;
//           case 3:
//             setState(prevState => ({ ...prevState, showExperienceStep: true }));
//             break;
//           case 4:
//             setState(prevState => ({ ...prevState, showSkillsStep: true }));
//             break;
//           case 5:
//             setState(prevState => ({ ...prevState, showSocialLinksStep: true }));
//             break;
//           case 6:
//             setState(prevState => ({ ...prevState, showContactStep: true }));
//             break;
//           default:
//             break;
//         }
    
//         setState(prevState => ({
//           ...prevState,
//           showPreviousButton: currentStep >= 1,
//           showNextButton: currentStep < steps.length - 1,
//           showSubmitButton: currentStep === steps.length - 1,
//         }));
//       }, [currentStep]);
//     const nextStep = () => {
//         setCurrentStep(currentStep + 1);
//     };
//     const previousStep = () => {
//         setCurrentStep(currentStep - 1);
//     };
//     if (currentStep>=1) {
//         state.showPreviousButton = true;
//     } else {
//         state.showPreviousButton = false;
//     }
//     const steps = [
//         {title: 'Name'},
//         {title: 'About'},
//         {title: 'Education'},
//         {title: 'Experience'},
//         {title: 'Skills'},
//         {title: 'Social Links'},
//         {title: 'Contact'}
//         ];

//     if (currentStep < steps.length - 1) {
//         state.showNextButton = true;
//     } else {
//         state.showSubmitButton = false;
//         state.showNextButton = false;
//     }
//     //change the state of the steps according to the current step
//     switch (currentStep) {
//         case 0:
//             state.showNameStep = true;        
//             break;
//         case 1:
//             state.showAboutStep = true;
//             break;
//         case 2:
//             state.showEducationStep = true;
//             break;
//         case 3:
//             state.showExperienceStep = true;
//             break;
//         case 4:
//             state.showSkillsStep = true;
//             break;
//         case 5:
//             state.showSocialLinksStep = true;
//             break;
//         case 6:
//             state.showContactStep = true;
//             break;
//     }
//     const updateProfileDetails = api.user.updateUserDetails.useMutation({
//         onSuccess: () => {
//             console.log('success');
//         },
//     });
//     const { register, handleSubmit } = useForm();
//     const snap = useSnapshot(state);
// return(
//     <>
//     <form onSubmit={handleSubmit(data => {
//         return updateProfileDetails.mutate({
//             name: data.name,
//             education: {
//                 currentCollege: data.currentCollege,
//                 degree: data.degree,
//                 fieldOfStudy: data.fieldOfStudy,
//                 startDate: data.startDate,
//                 endDate: data.endDate,
//                 description: data.description,
//             },
//             experience: {
//                 company: data.company,
//                 position: data.position,
//                 startDate: data.startDate,
//                 endDate: data.endDate,
//                 resume: data.resume,
//                 description: data.description,
//             },
//             about: {
//                 description: data.description,
//             },
//             socialLinks: {
//                 github: data.github,
//                 linkedin: data.linkedin,
//                 twitter: data.twitter,
//                 instagram: data.instagram,
//             },
//             skills: data.skills,
//             contact: {
//                 email: data.email,
//                 phone: data.phone,
//                 address: data.address,
//             },
//         },
//         {
//             onSuccess: () => {
//               console.log('success');
//             },
//           })
//         })}>
//             {snap.showNameStep &&
//             <div id="nameStep">
//                 <label htmlFor="name">Name</label>
//                 <input type="text" {...register('name')} />
//             </div>
//         }
//             {snap.showAboutStep &&
//             <div id='aboutStep'>
//                 <label htmlFor="description">Description</label>
//                 <input type="text" {...register('description')} />
//             </div>
//         }
//           {snap.showEducationStep && 
//             <div id='educationStep'>
//                 <label htmlFor="currentCollege">Current College</label>
//                 <input type="text" {...register('currentCollege')} />
//                 <label htmlFor="degree">Degree</label>
//                 <input type="text" {...register('degree')} />
//                 <label htmlFor="fieldOfStudy">Field of Study</label>
//                 <input type="text" {...register('fieldOfStudy')} />
//                 <label htmlFor="startDate">Start Date</label>
//                 <input type="date" {...register('startDate')} />
//                 <label htmlFor="endDate">End Date</label>
//                 <input type="date" {...register('endDate')} />
//                 <label htmlFor="description">Description</label>
//                 <input type="text" {...register('description')} />

//             </div>
            
//         } {snap.showExperienceStep &&
//             <div id='experienceStep'>
//                 <label htmlFor="company">Company</label>
//                 <input type="text" {...register('company')} />
//                 <label htmlFor="position">Position</label>
//                 <input type="text" {...register('position')} />
//                 <label htmlFor="startDate">Start Date</label>
//                 <input type="date" {...register('startDate')} />
//                 <label htmlFor="endDate">End Date</label>
//                 <input type="date" {...register('endDate')} />
//                 <label htmlFor="resume">Resume</label>
//                 <input type="file" {...register('resume')} />
//                 <label htmlFor="description">Description</label>
//                 <input type="text" {...register('description')} />

//             </div>
            
//         }{snap.showSkillsStep &&
//             <div id='skillsStep'>
//                 <label htmlFor="skills">Skills</label>
//                 <input type="text" {...register('skills')} />
//             </div>
            
//         }   {snap.showSocialLinksStep &&
//             <div id='contactStep'>
//                 <label htmlFor="github">Github</label>
//                 <input type="text" {...register('github')} />
//                 <label htmlFor="linkedin">Linkedin</label>
//                 <input type="text" {...register('linkedin')} />
//                 <label htmlFor="twitter">Twitter</label>
//                 <input type="text" {...register('twitter')} />
//                 <label htmlFor="instagram">Instagram</label>
//                 <input type="text" {...register('instagram')} />
//             </div>
            
//         }   {snap.showContactStep &&
//             <div id='socilLinkStep'>
//                 <label htmlFor="email">Email</label>
//                 <input type="text" {...register('email')} />
//                 <label htmlFor="phone">Phone</label>
//                 <input type="text" {...register('phone')} />
//                 <label htmlFor="address">Address</label>
//                 <input type="text" {...register('address')} />
//             </div>
//         }
//         {snap.showSubmitButton &&
//             <button type="submit">Submit</button>
//         }
//         {snap.showPreviousButton &&
//             <button 
//             onClick={() => {previousStep}}
//             type="button">Previous</button>
//         }
//         {snap.showNextButton &&
//             <button type="button"
//             onClick={() => {nextStep}}
//             >Next</button>
//         }
//         </form>
//     </>
// )
// }

// // Define the steps of the form

//     const steps = [
//         {title: 'Name', component: <NameStep />},
//         {title: 'About', component: <AboutStep/>},
//         {title: 'Education', component: <EducationStep/>},
//         {title: 'Experience', component: <ExperienceStep/>},
//         {title: 'Skills', component: <SkillsStep/>},
//         {title: 'Social Links', component: <SocialLinksStep/>},
//         {title: 'Contact', component: <ContactStep/>}
//         ];
 //         <form onSubmit={handleSubmit(data)=>{
//             return updateProfileDetails.mutate(
//                 {
//                     name: data.name,
//                     education: {
//                         currentCollege: data.currentCollege,
//                         degree: data.degree,
//                         fieldOfStudy: data.fieldOfStudy,
//                         startDate: data.startDate,
//                         endDate: data.endDate,
//                         description: data.description,
//                     },
//                     experience: {
//                         company: data.company,
//                         position: data.position,
//                         startDate: data.startDate,
//                         endDate: data.endDate,
//                         resume: data.resume,
//                         description: data.description,
//                     },
//                     about: {
//                         description: data.description,
//                     },
//                     socialLinks: {
//                         github: data.github,
//                         linkedin: data.linkedin,
//                         twitter: data.twitter,
//                         instagram: data.instagram,
//                     },
//                     skills: data.skills,
//                     contact: {
//                         email: data.email,
//                         phone: data.phone,
//                         address: data.address,
//                     },
//                 },
//             }}>
    // const [showNameStep, setShowNameStep] = useState(true);
    // const [showAboutStep, setShowAboutStep] = useState(false);
    // const [showEducationStep, setShowEducationStep] = useState(false);
    // const [showExperienceStep, setShowExperienceStep] = useState(false);
    // const [showSkillsStep, setShowSkillsStep] = useState(false);
    // const [showSocialLinksStep, setShowSocialLinksStep] = useState(false);
    // const [showContactStep, setShowContactStep] = useState(false);
    // const [showSubmitStep, setShowSubmitStep] = useState(false);                   
//   // Get the session data
//   const updateProfileDetails = api.user.updateUserDetails.useMutation({
//     onSuccess: () => {
//       void console.log('successfully created');
//     },
//   });

//     const { register,handleSubmit } = useForm();
//   const snap = useSnapshot(state)
//   function EducationStep() {
//     // const { register } = useForm();
//     return (
//         <form onSubmit={handleUserDetails}>
//             <label htmlFor="currentCollege">Current College</label>
//             <input {...register('currentCollege')} type="text" />
//             <label htmlFor="degree">Degree</label>
//             <input  type="text" {...register('degree')} />
//             <label htmlFor="fieldOfStudy">Field Of Study</label>
//             <input type="text" {...register('fieldOfStudy')} />
//             <label htmlFor="startDate">Start Date</label>
//             <input type="date" {...register('startDate')} />
//             <label htmlFor="endDate">End Date</label>
//             <input type="date" {...register('endDate')} />
//             <label htmlFor="description">Description</label>
//             <input type="text" {...register('description')} />
//         </form>
//     );
// }
//  function ExperienceStep() {
//     // const { register } = useForm();
//     return (
//         <form onSubmit={handleUserDetails}>
//             <label htmlFor="company">Company</label>
//             <input type="text" {...register('company')} />
//             <label htmlFor="position">Position</label>
//             <input type="text" {...register('position')} />
//             <label htmlFor="startDate">Start Date</label>
//             <input type="date" {...register('startDate')} />
//             <label htmlFor="endDate">End Date</label>
//             <input type="date" {...register('endDate')} />
//             <label htmlFor="resume">Resume</label>
//             <input type="text" {...register('resume')} />
//             <label htmlFor="description">Description</label>
//             <input type="text" {...register('description')} />
//         </form>
//     );
// }   
//  function AboutStep() {
//     // const { register } = useForm();
//     return (
//         <form onSubmit={handleUserDetails}>
//             <label htmlFor="description">Description</label>
//             <input type="text" {...register('description')} />
//         </form>
//     );
// } 
//  function SocialLinksStep() {
//     // const { register } = useForm();
//     return (
//         <form onSubmit={handleUserDetails}>
//             <label htmlFor="github">Github</label>
//             <input type="text" {...register('github')} />
//             <label htmlFor="linkedin">Linkedin</label>
//             <input type="text" {...register('linkedin')} />
//             <label htmlFor="twitter">Twitter</label>
//             <input type="text" {...register('twitter')} />
//             <label htmlFor="instagram">Instagram</label>
//             <input type="text" {...register('instagram')} />
//         </form>
//     );
// }
//  function SkillsStep() {
//     // const { register } = useForm();
//     return (
//         <form onSubmit={handleUserDetails}>
//             <label htmlFor="skills">Skills</label>
//             <input type="text" {...register('skills')} />
//         </form>
//     );
// }
//  function ContactStep() {
//     // const { register } = useForm();
//     const {register,handleSubmit} = useForm();
//     return (
//         <>
//         <form onSubmit={handleSubmit(data)=>{
//             return updateProfileDetails.mutate(
//                 {
//                     name: data.name,
//                     education: {
//                         currentCollege: data.currentCollege,
//                         degree: data.degree,
//                         fieldOfStudy: data.fieldOfStudy,
//                         startDate: data.startDate,
//                         endDate: data.endDate,
//                         description: data.description,
//                     },
//                     experience: {
//                         company: data.company,
//                         position: data.position,
//                         startDate: data.startDate,
//                         endDate: data.endDate,
//                         resume: data.resume,
//                         description: data.description,
//                     },
//                     about: {
//                         description: data.description,
//                     },
//                     socialLinks: {
//                         github: data.github,
//                         linkedin: data.linkedin,
//                         twitter: data.twitter,
//                         instagram: data.instagram,
//                     },
//                     skills: data.skills,
//                     contact: {
//                         email: data.email,
//                         phone: data.phone,
//                         address: data.address,
//                     },
//                 },
//             }}>
//             <label htmlFor="email">Email</label>
//             <input type="text" {...register('email')} />
//             <label htmlFor="phone">Phone</label>
//             <input type="text" {...register('phone')} />
//             <label htmlFor="address">Address</label>
//             <input type="text" {...register('address')} />
//             <button type="submit">Submit</button>
//         </form>
//         </>
//     );
// }                   
//  function NameStep() {
//     // const { register } = useForm();
//     return (
//         <form>
//             <label htmlFor="name">Name</label>
//             <input type="text" {...register('name')}/>
//         </form>
//     );
// }
// const handleUserDetails = async (data :any) => {
//     // e.preventDefault();
    
//     // return await console.log(data);
// };
//     const { data: session } = useSession();

//     // const steps = [
//     //     {title: 'StepOne', component: <StepOne/>},
//     //     {title: 'StepTwo', component: <StepTwo/>},
//     //     {title: 'StepThree', component: <StepThree/>},
//     //     {title: 'StepFour', component: <StepFour/>}
//     //   ];
//     const steps = [
//         {title: 'Name', component: <NameStep />},
//         {title: 'About', component: <AboutStep/>},
//         {title: 'Education', component: <EducationStep/>},
//         {title: 'Experience', component: <ExperienceStep/>},
//         {title: 'Skills', component: <SkillsStep/>},
//         {title: 'Social Links', component: <SocialLinksStep/>},
//         {title: 'Contact', component: <ContactStep/>}
//         ];

// // Get the multistep form state and actions
//     // const { step ,currentStepIndex,goTo,isFirstStep,isLastStep,next,back} = useMultistepForm(steps);
    
//     // const increaseUrl = () => {
//     //     if (isLastStep) return;
//     //     goTo(currentStepIndex + 1);
        
//     // };
//     // const decreaseUrl = () => {
//     //     if (isFirstStep) return;
//     //     goTo(currentStepIndex - 1);
//     // };
 
 
 
 
 
//     // Handle form submission

//     const onSubmit = async (data: any) => {
//         // e.preventDefault();
//         // await updateProfileDetails.mutate(
//         //     {
//         //         name: data.name,
//         //         education: {
//         //             currentCollege: data.currentCollege,
//         //             degree: data.degree,
//         //             fieldOfStudy: data.fieldOfStudy,
//         //             startDate: data.startDate,
//         //             endDate: data.endDate,
//         //             description: data.description,
//         //         },
//         //         experience: {
//         //             company: data.company,
//         //             position: data.position,
//         //             startDate: data.startDate,
//         //             endDate: data.endDate,
//         //             resume: data.resume,
//         //             description: data.description,
//         //         },
//         //         about: {
//         //             description: data.description,
//         //         },
//         //         socialLinks: {
//         //             github: data.github,
//         //             linkedin: data.linkedin,
//         //             twitter: data.twitter,
//         //             instagram: data.instagram,
//         //         },
//         //         skills: data.skills.split(','),
//         //         contact: {
//         //             email: data.email,
//         //             phone: data.phone,
//         //             address: data.address,
//         //         },
//         //     },
//         // );
//         return await console.log(data);
//     };
//       // Update the user details with the input values
//   //return form ui 
//     return (
//         <>

//         <MultiStep activeStep={1} showNavigation={true} steps={steps} />
            

//         </>
//     );

        
// }
      {/* </form> */}
//         <form onSubmit={onSubmit}>
//             <ul className="grid grid-flow-col text-center border-b border-gray-200 text-gray-500">
//   <li>
//     <a href='profile/' className="flex justify-center border-b-4 border-transparent hover:text-indigo-600 hover:border-indigo-600 py-4">Name</a>
//   </li>
//   <li>
//     <a href="profile/About" className="flex justify-center border-b-4 border-transparent hover:text-indigo-600 hover:border-indigo-600 py-4">About</a>
//   </li>
//   <li>
//     <a href='profile/Education' className="flex justify-center border-b-4 border-transparent hover:text-indigo-600 hover:border-indigo-600 py-4">Education</a>
//   </li>
//   <li>
//     <a href="profile/Experience" className="flex justify-center border-b-4 border-transparent hover:text-indigo-600 hover:border-indigo-600 py-4">Experience</a>
//   </li>
//   <li>
//     <a href="profile/Skills" className="flex justify-center border-b-4 border-transparent hover:text-indigo-600 hover:border-indigo-600 py-4">Skills</a>
//   </li>
//   <li>
//     <a href="profile/Sociallinks" className="flex justify-center border-b-4 border-transparent hover:text-indigo-600 hover:border-indigo-600 py-4">Social Links</a>
//   </li>
//   <li>
//     <a href="profile/Contact" className="flex justify-center border-b-4 border-transparent hover:text-indigo-600 hover:border-indigo-600 py-4">Contact</a>
//   </li>
// </ul>
            {/* {step} */}

            {/* <div>
                <button onClick={back} disabled={isFirstStep}>Back
                </button>
                <button onClick={next} disabled={isLastStep}>
                    Next
                </button>
                <button type="submit" disabled={!isLastStep}>
                    Submit
                </button>
            </div> */}
  //define step Componets
    // function NameStep() {
    //     const { register } = useForm();
    //     return (
    //         <div>
    //             <label htmlFor="name">Name</label>
    //             <input type="text" {...register('name')} />
    //         </div>
    //     );
    // }
    // function EducationStep() {
    //     const { register } = useForm();
    //     return (
    //         <div>
    //             <label htmlFor="currentCollege">Current College</label>
    //             <input type="text" {...register('currentCollege')} />
    //             <label htmlFor="degree">Degree</label>
    //             <input type="text" {...register('degree')} />
    //             <label htmlFor="fieldOfStudy">Field Of Study</label>
    //             <input type="text" {...register('fieldOfStudy')} />
    //             <label htmlFor="startDate">Start Date</label>
    //             <input type="date" {...register('startDate')} />
    //             <label htmlFor="endDate">End Date</label>
    //             <input type="date" {...register('endDate')} />
    //             <label htmlFor="description">Description</label>
    //             <input type="text" {...register('description')} />
    //         </div>
    //     );
    // }
    // function ExperienceStep() {
    //     const { register } = useForm();
    //     return (
    //         <div>
    //             <label htmlFor="company">Company</label>
    //             <input type="text" {...register('company')} />
    //             <label htmlFor="position">Position</label>
    //             <input type="text" {...register('position')} />
    //             <label htmlFor="startDate">Start Date</label>
    //             <input type="date" {...register('startDate')} />
    //             <label htmlFor="endDate">End Date</label>
    //             <input type="date" {...register('endDate')} />
    //             <label htmlFor="resume">Resume</label>
    //             <input type="text" {...register('resume')} />
    //             <label htmlFor="description">Description</label>
    //             <input type="text" {...register('description')} />
    //         </div>
    //     );
    // }   
    // function AboutStep() {
    //     const { register } = useForm();
    //     return (
    //         <div>
    //             <label htmlFor="description">Description</label>
    //             <input type="text" {...register('description')} />
    //         </div>
    //     );
    // }
    // function SocialLinksStep() {
    //     const { register } = useForm();
    //     return (
    //         <div>
    //             <label htmlFor="github">Github</label>
    //             <input type="text" {...register('github')} />
    //             <label htmlFor="linkedin">Linkedin</label>
    //             <input type="text" {...register('linkedin')} />
    //             <label htmlFor="twitter">Twitter</label>
    //             <input type="text" {...register('twitter')} />
    //             <label htmlFor="instagram">Instagram</label>
    //             <input type="text" {...register('instagram')} />
    //         </div>
    //     );
    // }
    // function SkillsStep() {
    //     const { register } = useForm();
    //     return (
    //         <div>
    //             <label htmlFor="skills">Skills</label>
    //             <input type="text" {...register('skills')} />
    //         </div>
    //     );
    // }
    // function ContactStep() {
    //     const { register } = useForm();
    //     return (
    //         <div>
    //             <label htmlFor="email">Email</label>
    //             <input type="text" {...register('email')} />
    //             <label htmlFor="phone">Phone</label>
    //             <input type="text" {...register('phone')} />
    //             <label htmlFor="address">Address</label>
    //             <input type="text" {...register('address')} />
    //         </div>
    //     );
    // }
                        

                    
