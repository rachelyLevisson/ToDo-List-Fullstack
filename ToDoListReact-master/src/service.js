import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_KEY;

export default {
  getTasks: async () => {
    const result = await axios.get(`${apiUrl}/item`)    
    return result.data;
  },

  addTask: async(name)=>{
       try {
      console.log('addTask', name)
      const result = await axios.post(`${apiUrl}/item`, { name, isComplete: false })
      return result.data;
    }
    catch (error) {
      if (error.response) {
        console.log("Error adding task:", error.response.data);
        return { error: "Failed to add task. Reason: " + error.response.data.message };
      } else {
        console.log("Error:", error.message);
        return { error: "Failed to add task. Reason: " + error.message };
      }
    }

  },

  setCompleted: async(id, isComplete)=>{
   try {
      console.log('setCompleted', { id, isComplete })
      const obj = (await axios.get(`${apiUrl}/item/${id}`)).data
      const updateItem = {
        id: id,
        name: obj.name,
        isComplete: isComplete
      }

      const result = await axios.put(`${apiUrl}/item/${id}`, updateItem)
      return result.data;
    }
    catch (error) {
      if (error.response) {
        console.log("Error updating task completion:", error.response.data);
        return { error: "Failed to update task completion. Reason: " + error.response.data.message };
      } else {
        console.log("Error:", error.message);
        return { error: "Failed to update task completion. Reason: " + error.message };
      }
    }
  },

  deleteTask:async(id)=>{
    try {
      console.log('deleteTask')
      const res = await axios.delete(`${apiUrl}/item/${id}`);
      return res.data;
    }
    catch (error) {
      if (error.response) {
        console.log("Error deleting task:", error.response.data);
        return { error: "Failed to delete task. Reason: " + error.response.data.message };
      } else {
        console.log("Error:", error.message);
        return { error: "Failed to delete task. Reason: " + error.message };
      }
    }
  }

};
