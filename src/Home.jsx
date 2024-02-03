import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

function Home() {
    const [data,setData] = useState([])
    const navigate = useNavigate();
    useState(()=>{
        axios.get('http://localhost:3000/users').then(res=>setData(res.data)).catch(err=> console.log(err));
    },[])
    const handleDelete = (id) =>{
        const confirm = window.confirm("would you like to Delete ?")
        if(confirm){
            axios.delete('http://localhost:3000/users/'+id).then(res =>{navigate('/')}).catch(err => console.log(err))
        }
      }
      
  return (
    <div className='d-flex flex-column justify-content-center align-items-center bg-light vh-100'>
      <h1>List of users</h1>
      <div className="w-75 rounded bg-white border shadow p-4">
        <div className='d-flex justify-content-end'><Link to="/create" className='btn btn-success'>Add +</Link> </div>
      <table className='table table-striped'>
        <thead>
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>PHONE</th>
                <th>ADDRESS</th>
                <th>ACTION</th>
            </tr>
        </thead>
        <tbody>
      {
        data.map((d,i)=>(
            <tr key={i}>
                <td>{d.id}</td>
                <td>{d.name}</td>
                <td>{d.email}</td>
                <td>{d.phone}</td>
                <td>{d.address}</td>
               
                <td>
                <Link to={`/read/${d.id}`} className='btn btn-sm btn-info me-2'>Read</Link>
                    <Link to={`/update/${d.id}`} className='btn btn-sm btn-primary me-2'>update</Link>
                    <button onClick={e=>handleDelete(d.id)} className='btn btn-sm btn-danger'>delete</button>
                </td>
            </tr>
        ))
      }
        </tbody>
      </table>
    
      </div>
    </div>
  )

}

export default Home
