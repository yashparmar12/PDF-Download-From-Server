import { useState } from "react";
import axios from "axios";
import './App.css'

function App() {

  const [formData, setformData] = useState({
    applicantName:'',
    startDate:'',
    endDate:'',
    reason:''
  });

  const handleChange = (e)=>{
      setformData({
        ...formData,
        [e.target.name]: e.target.value
      });
  }
  const handleSubmit = async(e)=>{

    e.preventDefault();

      try {
        
        const response = await axios.post('http://localhost:8000/api/generate-leave-application', formData,
          {responseType: 'blob'}
        );
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download','Leave_Application.pdf');
        document.body.appendChild(link);
        link.click();

        link.remove();
      } catch (error) {
        console.log(error);
      }
  }

  return (
    <div className="form">
      <form onSubmit={handleSubmit} >
        <input 
        type="text" 
        value={formData.applicantName} 
        name="applicantName" 
        placeholder="Applicant Name"
        onChange={handleChange}
        />
        
        <input 
        type="date" 
        value={formData.startDate} 
        name="startDate" 
        placeholder="Start Date"
        onChange={handleChange}
        />
        
        <input 
        type="date" 
        value={formData.endDate} 
        name="endDate" 
        placeholder="End Date"
        onChange={handleChange}
        />
        
        <input 
        type="text" 
        value={formData.reason} 
        name="reason" 
        placeholder="Reason"
        onChange={handleChange}
        />

        <button type="submit">Download Leave Application PDF</button>
      </form>
    </div>
  );
}

export default App;
