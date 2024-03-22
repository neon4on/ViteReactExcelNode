import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import M from 'materialize-css';

const now = new Date();
const expires = new Date(now.getFullYear() + 10, now.getMonth(), now.getDate());

const Form64 = (props) => {
  const { port, host } = props;

  const [cookies, setCookie] = useCookies(['tableData']);
  const [tableData, setTableData] = useState(
    () =>
      cookies.tableData || {
        winner: '',
        commandData1: '',
        select: '6.4.1',
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

  useEffect(() => {
    M.AutoInit();
    setTableData((prevTableData) => ({
      ...prevTableData,
      ...cookies.tableData,
    }));
  }, [cookies.tableData, setTableData]);

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
      const response = await axios.post(`${host}${port}/api/createExcel64`, tableData);
      console.log('Ответ сервера:', response.data);
      setTableData({
        winner: '',
        commandData1: '',
      });
      M.toast({ html: 'Данные успешно отправлены', classes: '#26a69a teal lighten-1 rounded' });
    } catch (error) {
      M.toast({ html: 'Данные не были отправлены', classes: '#ef5350 red lighten-1 rounded' });
      console.error('Ошибка при отправке данных:', error);
    }
  };

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
          Таблица "Количество победителей и призеров спортивных соревнований и
          физкультурно-спортивных мероприятий"
        </h5>
        <label className="labelSelect">
          Выберите тип соревнований:
          <select name="select" value={tableData.select || ''} onChange={handleChange} required>
            <option disabled value="DEFAULT">
              Не выбрано
            </option>
            <option value="6.4.1">Муниципальный</option>
            <option value="6.4.2">Региональный</option>
            <option value="6.4.3">Всероссийский</option>
            <option value="6.4.4">Международный</option>
          </select>
        </label>
        <textarea
          id="textarea1"
          className="materialize-textarea"
          type="text"
          name="winner"
          value={tableData.winner || ''}
          onChange={handleChange}
          rows="20"
          cols="20"
          wrap="hard"
          placeholder="Занятое место в Первенстве Санкт- Петербурга по легкой атлетике"></textarea>
        <label htmlFor="textarea1">Название</label>

        <input
          type="text"
          className="input-field col s6"
          name="commandData1"
          id="commandData1"
          value={tableData.commandData1 || ''}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <label htmlFor="commandData1">Количество</label>
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

export default Form64;
