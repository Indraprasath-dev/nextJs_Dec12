
const DynamicPage = ({ params }: { params: { id: string } }) => {

    

    return (
        <div>
            <h1 className="m-10 p-10">Dynamic Page</h1>
            <p>Parameter: {params.id}</p>
        </div>
    );
};

export default DynamicPage;


// const response = await fetch(`https://api.example.com/cards/${params.id}`);
//   const card = await response.json();