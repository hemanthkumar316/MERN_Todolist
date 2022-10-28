import React,{useState,useEffect} from 'react'
import axios from'axios'
 const Todolist = () => {
 const [formvalues,setFormvalues]=useState({todo:''})
 const [getData,setGetdata]=useState([]);
 const [updateTable,setUpdatetable] = useState(false)
 const [search,setSearch]=useState('')
  useEffect(()=>{
  axios.get("http://localhost:5000/task/getdata").then((res)=>{
    setGetdata(res.data)
  }).catch((err)=>{
    console.log(err)
  })
 },[updateTable])
 const submithandler=(e)=>{
  e.preventDefault()
//http://localhost:5000/task/todo
  axios.post('http://localhost:5000/task/todo', formvalues).then((res)=>{
  console.log(res)
  setUpdatetable(!updateTable)
  })
 }
 const deletehandler=(id)=>{
  axios.delete(`http://localhost:5000/task/todo/${id}`).then((res)=>{
    console.log(res)
    setUpdatetable(!updateTable)
  }).catch((err)=>{
    console.log(err)
  })
 }
 const edithandler=(id)=>{
  axios.put(`http://localhost:5000/task/todo/${id}`,formvalues).then((res)=>{
    console.log(res)
    setUpdatetable(!updateTable)
  }).catch((err)=>{
    console.log(err)
  })
}
  return (
    <div className='container mt-5 mb-3'>
  {/*   {JSON.stringify(getData)} */}
    <div className='row m-md-auto'>
       <div className='col col-md-7 m-md-auto' >
       <div className="card mb-4">
       <div className='card-header bg-info text-white'>
   <h1 className='text-center'>TO-DO-LIST</h1>
       </div>
    <div className="card-body">
    <form onSubmit={submithandler}>
       <div className='form-group'>
       <input type='text' className='form-control mb-3 outline' placeholder='Enter Employee Name' name='todo' value={formvalues.todo} onChange={(e)=>setFormvalues({todo:e.target.value})}/>
       </div>
       <button className='btn btn-primary'>Add</button>
    </form>
    </div>
  </div>
  </div>
    </div>

 <div className='container mt-5'>
  <form>
    <div className='form-group'>
    <input type='search' className='form-control-lg' placeholder='Search Employee Name.......' value={search} onChange={(e)=>setSearch(e.target.value)} />
    </div>
  </form>
 </div>


    <div className='row m-md-auto'>
   <div className='col col-md-7 m-md-auto'>
   <table className='table table-hover  '>
    <thead className='bg-dark text-white'>
     <tr>
      <th>I.D</th>
      <th>Employee Names</th>
      <th>Edit & Delete</th>
     </tr>
    </thead>
    <tbody>
   {
    getData.filter(user=>user.todo.toLowerCase().includes(search.toLowerCase())).map((elem,index)=>{
     return(
      <tr key={index}>
       <td>{elem._id}</td>
       <td>{elem.todo}</td>
       <td>
       <i className="fa-solid fa-pen-to-square mr-4" onClick={()=>edithandler(elem._id)}></i>
       <i className="fa-solid fa-trash"  onClick={()=>deletehandler(elem._id)}></i>
       </td>
      </tr>
     )
    })
   }
    </tbody>
   </table>
   </div>
    </div>
    </div>
  )
}

export default Todolist