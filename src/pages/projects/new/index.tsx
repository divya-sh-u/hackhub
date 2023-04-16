
import * as React from 'react';
import { LayoutWithSideBar } from '~/Layout/LayoutWithSidebar';
import { api } from '~/utils/api';
// import { supabase } from '~/utils/supabaseClient';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
export interface IAppProps {
}

export default function App (props: IAppProps) {
  const [imageAsDataUrl, setImageAsDataUrl] = React.useState<string | null>(null);
  // const getProjectId= api.projects.getProjectId.useQuery();
  const createProject = api.projects.createProject.useMutation({
    onSuccess: () => {
      void console.log('successfully created');
      
    },
  });

  const [projectId, setProjectId] = React.useState<string | null>(null);

  const addTeamMemberToProject = api.projects.addTeamMemberToProject.useMutation({
    onSuccess: () => {
      void console.log('successfully created');
    }});

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (file.size > 1.5 * 1000000) {
        return toast.error("images size should not be greater than 1MB");
        alert("images size should not be greater than 1MB");
      }
      const fileReader = new FileReader();
      URL.createObjectURL(file)
      fileReader.readAsDataURL(file);

      fileReader.onloadend = () => {
        if (fileReader.result) {
          const imageAsDataUrl = fileReader.result as string;
          setImageAsDataUrl(imageAsDataUrl);
        }
      
      };
    }
    
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  
  
  return (
    <LayoutWithSideBar>
      {/* <aside className=' col-span-4 flex flex-col space-y-4 p-6'> */}
        {/* <div className='flex'> */}

            {/* asdfsadf asdf asdf alore Lorem ipsum dolor sit amet consectetur 
            adipisicing elit. Sed ipsum suscipit laborum fuga enim aut harum 
            esse cumque, aspernatur voluptates neque repudiandae porro dolores 
            itaque culpa temporibus. Ipsum, numquam atque. */}
            {/* </div> */}
        {/* </aside> */}
        <div className="flex flex-col   min-h-screen py-2">
        <main className="flex flex-col rounded border border-gray-200 w-full flex-1 px-20 text-center">
          {!createProject.data?.id &&   <>  <h1 className="text-6xl font-Medium mt-4">
            Create Your  Project 🦾
          </h1>
          <form 
          className='mt-8 grid lg:grid-cols-1 gap-4 space-y-3 mb-10'
          onSubmit={handleSubmit((data) => {
            return createProject.mutate(
              {
                title: data.title,
                description: data.description,
                link: data.link,
                videoLink: data.videoLink,
                image: data.image,
                technologies: data.technologies.split(','),
                problemItSolves: data.problemItSolves,
                blogPostLink: data.blogPostLink,  
                imageAsDataUrl: imageAsDataUrl as string,
              },
              {
                onSuccess: () => {
                  reset()
                  toast.success('Project created successfully');
                  setProjectId(createProject.data?.id as string)
                },
              }
            )
            
          })}
          >
          <input
            type="text"
            placeholder="title"
            // value={title}
            // name='title'
            className='bg-gray-200 border border-gray-200 rounded py-2 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
            {...register('title', { required: true })}
            // onChange={void setProjectName()} 
          />
          {errors.title && <span>This field is required</span>}
          <input
            type="text"
            placeholder="description"
            className='bg-gray-200 border border-gray-200 rounded py-2 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
            {...register('description', { required: true })}
          />
          {errors.description && <span>This field is required</span>}
          <input
            type="text"
            placeholder="link"
            className='bg-gray-200 border border-gray-200 rounded py-2 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
            {...register('link', { required: true })}
          />
          {errors.link && <span>This field is required</span>}
          <input
            type="text"
            className='bg-gray-200 border border-gray-200 rounded py-2 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
            placeholder="videoLink"
            {...register('videoLink', { required: true })}
          />
          {errors.videoLink && <span>This field is required</span>}
          <input
            type="text"
            placeholder="image"
            {...register('image', { required: true })}
            className='bg-gray-200 border border-gray-200 rounded py-2 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
          /> 
          {errors.videoLink && <span>This field is required</span>}
          <input
            type="text"
            placeholder="technologies"
            {...register('technologies', { required: true })}
            className='bg-gray-200 border border-gray-200 rounded py-2 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
          />
          {errors.technologies && <span>This field is required</span>}
          <input
            type="text"
            placeholder="problemItSolves"
            {...register('problemItSolves', { required: true })}
            className='bg-gray-200 border border-gray-200 rounded py-2 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
          />
          {errors.problemItSolves && <span>This field is required</span>}
          <input
            type="text"
            placeholder="blogPostLink"
            className='bg-gray-200 border border-gray-200 rounded py-2 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
            {...register('blogPostLink', { required: true })}
          />
          {errors.blogPostLink && <span>This field is required</span>}
          <input {...register('imageAsDataUrl', { required: true })} 
          className='bg-gray-200 border border-gray-200 rounded py-3 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
          type="file" onChange={handleChangeImage}
                        multiple={false}/>
          {errors.image && <span>This field is required</span>}
          <button type="submit"
          className='btn btn-block btn-primary justify-center'
          >Submit</button>
          <button type="reset"
          onClick={() => {reset()}}
          className='btn btn-block btn-ghost justify-center border-1 border-gray-400 mb-10'
          >Reset</button>
          </form></>}
          
          {createProject.data?.id && <>
          <h1 className="text-6xl font-bold">
          Add team member to project
        </h1>
          <form 
          className='mt-8 grid lg:grid-cols-1 gap-4 space-y-3 mb-10'
          onSubmit={handleSubmit((data) => {
            return addTeamMemberToProject.mutate(
              {
                projectId: createProject.data?.id as string,
                name: data.name,
                role: data.role,
              },
              {
                onSuccess: () => {
                  reset()
                  toast.success('Team member added successfully');
                },
              }
            )
          })}>
            <input
            type="text"
            placeholder="name"
            className='bg-gray-200 border border-gray-200 rounded py-2 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
            {...register('name', { required: true })}
          />
          {errors.name && <span>This field is required</span>}
          <input
            type="text"
            className='bg-gray-200 border border-gray-200 rounded py-2 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
            placeholder="role"
            {...register('role', { required: true })}
          />
          {errors.role && <span>This field is required</span>}
          <button type="submit"
          className='btn btn-block btn-primary justify-center'
          >Submit</button>
          <button type="reset"
          className='btn btn-block btn-ghost justify-center border-1 border-gray-400 mb-10'
          onClick={() => {reset()}}
          >Reset</button>
          </form></>}
        </main>
      </div>
    </LayoutWithSideBar>
  );
}
{/* <a href="#_" class="relative inline-block text-lg group">
    <span class="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
        <span class="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
        <span class="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
        <span class="relative">Button Text</span>
    </span>
    <span class="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
</a> */}
{/* <div class="p-8 rounded border border-gray-200">
  <h1 class="font-medium text-3xl">Add User</h1>
  <p class="text-gray-600 mt-6">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos dolorem vel cupiditate laudantium dicta.</p>

  <form>
    <div class="mt-8 grid lg:grid-cols-2 gap-4">
      <div>
        <label for="name" class="text-sm text-gray-700 block mb-1 font-medium">Name</label>
        <input type="text" name="name" id="name" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Enter your name" />
      </div>

      <div>
        <label for="email" class="text-sm text-gray-700 block mb-1 font-medium">Email Adress</label>
        <input type="text" name="email" id="email" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="yourmail@provider.com" />
      </div>

      <div>
        <label for="job" class="text-sm text-gray-700 block mb-1 font-medium">Job title</label>
        <input type="text" name="job" id="job" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="(ex. developer)" />
      </div>

      <div>
        <label for="brithday" class="text-sm text-gray-700 block mb-1 font-medium">Birthday</label>
        <input type="text" name="brithday" id="brithday" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="(01/01/1993)" />
      </div>
    </div>

    <div class="space-x-4 mt-8">
      <button type="submit" class="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50">Save</button>

      <button class="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50">Cancel</button>
    </div>
  </form>
</div> */}
