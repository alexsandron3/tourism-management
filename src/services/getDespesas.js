import axios from 'axios';

const data = { id: 70 };
const formData = new FormData();
for (const key in data) {
  formData.append(key, data[key]);
}
const sendRequest = async () => {
  try {
    const resp = await axios.post('https://fabiopasseios.com.br/ap/Projetos/SistemaFabio-2.0/teste/findDespesa.php', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    const {data: {despesa}} = resp
    return despesa;
  } catch (err) {
    return err;
  }
}
export default sendRequest;