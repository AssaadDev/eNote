import axios from 'axios';

const sendDataToBackend = (rout, props) => {
  axios.post(rout, props) // your-backend-api-endpoint
    .then((response) => {
      // Handle success (e.g., show a success message)
      console.log('Data sent successfully:', response.data);
      console.log('Data sent successfully your id is ', response.data.id);
    })
    .catch((error) => {
      // Handle errors (e.g., show an error message)
      console.error('Error sending data:', error);
    });
};

// run the server
//php -S localhost:8000


export default sendDataToBackend;
