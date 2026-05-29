// import React from "react";
// import { getUserInfo } from "../../../services/auth.service";
// import { useGetPostListsQuery } from "../../../redux/apis/post.api";

// const PublishedStoriesComponent = () => {
//   const user = getUserInfo();

//   const { data, isLoading, error } = useGetPostListsQuery({
//     author: user?.userId || "",
//     isPublished: "true",
//     page: 1,
//     limit: 10,
//   });

//   console.log("USER:", user);
//   console.log("DATA:", data);
//   console.log("LOADING", isLoading);
//   console.log("ERROR:", error);

//   // Loading state
//   if (isLoading) {
//     return <div className="p-6">Loading...</div>;
//   }

//   // Empty state
//   if (!isLoading && data?.posts?.length === 0) {
//     return (
//       <div className="p-6">
//         <h1 className="text-2xl font-bold mb-4">
//           Published Stories
//         </h1>

//         <div className="rounded-lg border p-8 text-center">
//           <p className="text-gray-500">
//             You haven't published any stories yet.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Published Stories</h1>

//       {data?.posts?.map((post: any) => (
//         <div
//           key={post._id}
//           className="border rounded-lg p-4 mb-4 shadow-sm"
//         >
//           <h2 className="text-xl font-semibold">{post.title}</h2>
//           <p>{post.content?.slice(0, 150)}...</p>
//           <p className="text-sm text-gray-500 mt-2">
//             {post.tag}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PublishedStoriesComponent;

// import React from "react";
// import { getUserInfo } from "../../../services/auth.service";
// import { useGetPostListsQuery } from "../../../redux/apis/post.api";

// const PublishedStoriesComponent: React.FC = () => {
//   const user = getUserInfo();

//   const { data, isLoading } = useGetPostListsQuery({
//     author: user?.userId || "",
//     isPublished: "true",
//     page: 1,
//     limit: 20,
//   });

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);

//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   if (isLoading) {

    
//     return (
//       <div className="p-6">
//         <h1 className="text-3xl font-bold mb-6">
//           Published Stories
//         </h1>

//         <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border p-6">
//           Loading...
//         </div>
//       </div>
//     );
//   }

//   if (!data?.posts?.length) {
//     return (
//       <div className="p-6">
//         <h1 className="text-3xl font-bold mb-6">
//           Published Stories
//         </h1>

//         <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border p-8 text-center">
//           <p className="text-gray-500 dark:text-gray-400">
//             You haven't published any stories yet.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6">
//         Published Stories
//       </h1>

//       <div className="space-y-4">
//         {data.posts.map((post: any) => (
//           <div
//             key={post._id}
//             className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border p-5"
//           >
//             <div className="flex gap-4">
//               {post.imageURL && (
//                 <img
//                   src={post.imageURL}
//                   alt={post.title}
//                   className="w-24 h-24 object-cover rounded-lg"
//                 />
//               )}
//               console.log(data?.posts);

//               <div className="flex-1">
//                 <h2 className="text-xl font-semibold mb-2">
//                   {post.title}
//                 </h2>

//                 <p className="text-gray-600 dark:text-gray-300 mb-3">
//                   {post.content?.slice(0, 180)}...
//                 </p>

//                 <div className="flex items-center justify-between">
//                   <span className="text-sm font-medium text-indigo-600">
//                     {post.tag}
//                   </span>

//                   <span className="text-xs text-gray-500">
//                     {formatDate(post.createdAt)}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PublishedStoriesComponent;



import React from "react";
import { getUserInfo } from "../../../services/auth.service";
import { useGetPostListsQuery } from "../../../redux/apis/post.api";

const PublishedStoriesComponent = () => {
  const user = getUserInfo();

  const { data, isLoading } = useGetPostListsQuery({
    author: user?.userId  || "",
    
    isPublished: "true",
    page: 1,
    limit: 20,
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Published Stories</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (!data?.posts?.length) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Published Stories</h1>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            You haven't published any stories yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Published Stories</h1>

      <div className="space-y-4">
        {data.posts.map((post: any) => (
          <div
            key={post._id}
            className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border p-5"
          >
            <div className="flex gap-4">
              {post.imageURL && (
                <img
  src={post.imageURL || "/placeholder-story.jpg"}
  alt={post.title}
  className="w-24 h-24 object-cover rounded-lg"
  onError={(e) => {
    e.currentTarget.style.display = "none";
  }}
/>
              )}

              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">
                  {post.title}
                </h2>

                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  {post.content?.slice(0, 180)}...
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-indigo-600">
                    {post.tag}
                  </span>

                  <span className="text-xs text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublishedStoriesComponent;