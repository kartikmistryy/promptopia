import PromptCard from "./PromptCard"


const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="xl:text-6xl text-3xl font-semibold text-left text-wrap">
        <span className="blue_gradient mr-4">{name}</span>
         Profile
      </h1>
      <p className="text-left mt-4 text-[1.2rem]">{desc}</p>

      <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard 
        key={post._id}
        post={post}
        handleEdit={() => handleEdit && handleEdit(post)}
        handleDelete={() => handleDelete && handleDelete(post)}
        />
      ))}
    </div>

    </section>
  )
}

export default Profile