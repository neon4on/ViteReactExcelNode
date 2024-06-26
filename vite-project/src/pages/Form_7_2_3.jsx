import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import M from 'materialize-css';

const now = new Date();
const expires = new Date(now.getFullYear() + 10, now.getMonth(), now.getDate());

const Form723 = (props) => {
  const { port, host } = props;

  const [cookies, setCookie] = useCookies(['tableData']);
  const [tableData, setTableData] = useState(
    () =>
      cookies.tableData || {
        winner: '',
        commandData1: '',
        commandData2: '',
        commandData3: '',
        personalData1: '',
        personalData2: '',
        personalData3: '',
        lackOfCompetitiveComponentData: '',
      },
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTableData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setCookie('tableData', { ...tableData, [name]: value }, { path: '/51', expires });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const key in tableData) {
      if (
        e.target.elements[key] &&
        e.target.elements[key].type === 'text' &&
        typeof tableData[key] === 'string' &&
        tableData[key].trim() !== '' &&
        !/^\d*$/.test(tableData[key])
      ) {
        M.toast({
          html: 'Пожалуйста, вводите только числа',
          classes: '#ef5350 red lighten-1 rounded',
        });
        return;
      }
    }
    try {
      console.log('Отправляемые данные:', tableData);
      const response = await axios.post(`${host}${port}/api/createExcel723`, tableData);
      console.log('Ответ сервера:', response.data);
      setTableData({
        winner: '',
        commandData1: '',
        commandData2: '',
        commandData3: '',
        personalData1: '',
        personalData2: '',
        personalData3: '',
        lackOfCompetitiveComponentData: '',
      });
      M.toast({ html: 'Данные успешно отправлены', classes: '#26a69a teal lighten-1 rounded' });
    } catch (error) {
      M.toast({ html: 'Данные не были отправлены', classes: '#ef5350 red lighten-1 rounded' });
      console.error('Ошибка при отправке данных:', error);
    }
  };

  useEffect(() => {
    M.AutoInit();
    setTableData((prevTableData) => ({
      ...prevTableData,
      ...cookies.tableData,
    }));
  }, [cookies.tableData, setTableData]);

  const handleKeyPress = (e) => {
    const { name, value } = e.target;
    if (!/^\d*$/.test(value)) {
      M.toast({ html: 'Пожалуйста, вводите только числа' });
      e.preventDefault();
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h5>
          Таблица "Участие работников в конкурсах профессионального мастерства в мероприятиях,
          проводимых для работников училищ (кадетских корпусов) по плану Минобороны России"
        </h5>
        <textarea
          required
          id="textarea1"
          className="materialize-textarea"
          type="text"
          name="winner"
          value={tableData.winner || ''}
          onChange={handleChange}
          rows="20"
          cols="20"
          wrap="hard"
          placeholder='Конкурс видеороликов для воспитателей довузовских образовательных организаций Минобороны России "Лучший классный час"'></textarea>
        <label htmlFor="textarea1">Название</label>
        <table className="iksweb">
          <tbody>
            <tr>
              <td rowSpan="3">Призовые места по итогам командного первенства в номинациях</td>
              <td>1-х мест</td>
              <td>
                <input
                  type="text"
                  className="input-field col s6"
                  name="commandData1"
                  value={tableData.commandData1 || ''}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                />
              </td>
            </tr>
            <tr>
              <td>2-х мест</td>
              <td>
                <input
                  type="text"
                  className="input-field col s6"
                  name="commandData2"
                  value={tableData.commandData2 || ''}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                />
              </td>
            </tr>
            <tr>
              <td>3-х мест</td>
              <td>
                <input
                  type="text"
                  className="input-field col s6"
                  name="commandData3"
                  value={tableData.commandData3 || ''}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                />
              </td>
            </tr>
            <tr>
              <td rowSpan="3">Призовые места по итогам личного первенства в номинациях</td>
              <td>1-х мест</td>
              <td>
                <input
                  type="text"
                  className="input-field col s6"
                  name="personalData1"
                  value={tableData.personalData1 || ''}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                />
              </td>
            </tr>
            <tr>
              <td>2-х мест</td>
              <td>
                <input
                  type="text"
                  className="input-field col s6"
                  name="personalData2"
                  value={tableData.personalData2 || ''}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                />
              </td>
            </tr>
            <tr>
              <td>3-х мест</td>
              <td>
                <input
                  type="text"
                  className="input-field col s6"
                  name="personalData3"
                  value={tableData.personalData3 || ''}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                />
              </td>
            </tr>

            <tr>
              <td colSpan="2">Отсутствие соревновательной составляющей</td>
              <td>
                <input
                  type="text"
                  className="input-field col s6"
                  name="lackOfCompetitiveComponentData"
                  value={tableData.lackOfCompetitiveComponentData || ''}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="wrapper-button">
          <button className="btn waves-effect waves-light input-field" type="submit" name="action">
            Отправить
            <i className="material-icons right"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form723;
